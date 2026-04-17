const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const PORT = process.env.PORT || 3001;
const WORK_DIR = '/home/claude-user/workspace/repos/ruflow/';
const SESSIONS_DIR = path.join(__dirname, 'sessions');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const PUBLIC_DIR = path.join(__dirname, 'public');
const MAX_MESSAGE_SIZE = 10 * 1024 * 1024; // 10 MB
const IMAGE_MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const DOC_MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const CANCEL_KILL_TIMEOUT = 5000; // ms before SIGKILL after SIGTERM
const HEARTBEAT_FILE = path.join(__dirname, 'HEARTBEAT.md');
const MEMORY_DIR = path.join(__dirname, 'memory');
const MEMORY_FILE = path.join(MEMORY_DIR, 'store.json');

// ---------------------------------------------------------------------------
// Memory System — persistent cross-session memory with search
// ---------------------------------------------------------------------------

fs.mkdirSync(MEMORY_DIR, { recursive: true });

function loadMemoryStore() {
  try {
    if (fs.existsSync(MEMORY_FILE)) return JSON.parse(fs.readFileSync(MEMORY_FILE, 'utf-8'));
  } catch (_) {}
  return { entries: [], version: 1 };
}

function saveMemoryStore(store) {
  fs.writeFileSync(MEMORY_FILE, JSON.stringify(store, null, 2));
}

function addMemory(key, value, tags = [], source = 'user') {
  const store = loadMemoryStore();
  // Update existing or add new
  const existing = store.entries.findIndex(e => e.key === key);
  const entry = {
    id: uuidv4(),
    key,
    value,
    tags,
    source,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  if (existing >= 0) {
    entry.id = store.entries[existing].id;
    entry.createdAt = store.entries[existing].createdAt;
    store.entries[existing] = entry;
  } else {
    store.entries.push(entry);
  }
  saveMemoryStore(store);
  return entry;
}

function searchMemory(query, limit = 10) {
  const store = loadMemoryStore();
  const q = query.toLowerCase();
  return store.entries
    .filter(e => e.key.toLowerCase().includes(q) || e.value.toLowerCase().includes(q) ||
      (e.tags || []).some(t => t.toLowerCase().includes(q)))
    .slice(0, limit)
    .map(e => ({ id: e.id, key: e.key, value: e.value.slice(0, 200), tags: e.tags, updatedAt: e.updatedAt }));
}

function deleteMemory(id) {
  const store = loadMemoryStore();
  store.entries = store.entries.filter(e => e.id !== id);
  saveMemoryStore(store);
}

function listMemory(limit = 20) {
  const store = loadMemoryStore();
  return store.entries.slice(-limit).reverse()
    .map(e => ({ id: e.id, key: e.key, value: e.value.slice(0, 200), tags: e.tags, source: e.source, updatedAt: e.updatedAt }));
}

// Auto-extract memories from conversation (simple keyword extraction)
function autoExtractMemory(userText, assistantText, sessionName) {
  // Store significant exchanges as memories
  if (!userText || userText.length < 20) return;
  if (!assistantText || assistantText.length < 50) return;

  // Create a condensed summary as memory
  const key = (sessionName || userText.slice(0, 50)).replace(/\n/g, ' ').trim();
  const value = 'Q: ' + userText.slice(0, 200) + '\nA: ' + assistantText.slice(0, 500);
  const tags = ['auto', 'conversation'];

  // Only store if it seems meaningful (has code, commands, or technical content)
  const isTechnical = /function |class |import |require\(|def |sudo |npm |git |docker |curl /i.test(userText + assistantText);
  if (isTechnical) {
    addMemory(key, value, tags, 'auto');
  }
}

// ---------------------------------------------------------------------------
// AgentDB Integration — sync Ruflow Chat sessions to vector database
// ---------------------------------------------------------------------------

const AGENTDB_SCRIPT = path.join(WORK_DIR, 'scripts/memory-db/lib.js');
let agentDb = null;

async function getAgentDb() {
  if (agentDb) return agentDb;
  try {
    const lib = require(AGENTDB_SCRIPT);
    agentDb = await lib.getDb();
    return agentDb;
  } catch (e) {
    console.error('[agentdb] Failed to connect:', e.message);
    return null;
  }
}

async function syncSessionToVectorDb(session) {
  try {
    const db = await getAgentDb();
    if (!db) return;

    // Store session metadata
    db.run(`INSERT OR REPLACE INTO sessions (id, started_at, summary, topics, model, message_count)
            VALUES (?, ?, ?, ?, ?, ?)`,
      [session.id, session.createdAt, session.name,
       (session.messages || []).map(m => m.content?.slice(0, 100)).join(' | ').slice(0, 500),
       session.model || 'sonnet',
       (session.messages || []).length]);

    // Store each message exchange as a searchable memory
    for (let i = 0; i < (session.messages || []).length; i += 2) {
      const user = session.messages[i];
      const assistant = session.messages[i + 1];
      if (!user || !assistant) continue;

      const name = 'chat:' + session.id + ':' + i;
      const content = 'Q: ' + (user.content || '').slice(0, 300) + '\nA: ' + (assistant.content || '').slice(0, 500);

      db.run(`INSERT OR REPLACE INTO memories (type, name, description, content, source_path, session_id, tags)
              VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ['chat', name, (user.content || '').slice(0, 200), content, 'ruflow-ui', session.id, 'chat,ruflow-ui']);

      // Add to search index
      const lastId = db.exec('SELECT last_insert_rowid()')[0].values[0][0];
      const searchText = (user.content || '') + ' ' + (assistant.content || '').slice(0, 500);
      db.run(`INSERT OR REPLACE INTO search_index (memory_id, chunk_text, chunk_index, tokens)
              VALUES (?, ?, ?, ?)`,
        [lastId, searchText.slice(0, 2000), 0, searchText.slice(0, 2000)]);
    }

    // Persist to disk
    const data = db.export();
    const dbPath = path.join(WORK_DIR, 'data/memory/agentdb.sqlite');
    fs.writeFileSync(dbPath, Buffer.from(data));
  } catch (e) {
    console.error('[agentdb] Sync error:', e.message);
  }
}

// Write heartbeat file on startup and every 60 seconds
function writeHeartbeat() {
  const uptime = process.uptime();
  const mem = process.memoryUsage();
  const sessions = listSessions ? listSessions().length : 0;
  const content = `# Ruflow Chat Heartbeat\n\n` +
    `- **Status**: Running\n` +
    `- **PID**: ${process.pid}\n` +
    `- **Uptime**: ${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s\n` +
    `- **Memory**: ${Math.round(mem.rss / 1024 / 1024)}MB RSS\n` +
    `- **Sessions**: ${sessions}\n` +
    `- **Last Beat**: ${new Date().toISOString()}\n` +
    `- **Port**: ${PORT}\n` +
    `- **Working Dir**: ${WORK_DIR}\n`;
  try { fs.writeFileSync(HEARTBEAT_FILE, content); } catch (_) {}
}

const ALLOWED_IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp']);
const ALLOWED_DOC_EXTS = new Set(['.pdf', '.txt', '.md', '.js', '.ts', '.json', '.py', '.html', '.css']);

// ---------------------------------------------------------------------------
// Ensure required directories exist
// ---------------------------------------------------------------------------

for (const dir of [SESSIONS_DIR, UPLOADS_DIR, PUBLIC_DIR]) {
  fs.mkdirSync(dir, { recursive: true });
}

// ---------------------------------------------------------------------------
// Smart Skill Router — auto-detects task type and loads relevant skills
// ---------------------------------------------------------------------------

const SKILLS_DIR = path.join(WORK_DIR, '.agents/skills/antigravity-awesome-skills/skills');

const SKILL_ROUTES = [
  {
    patterns: [/codebase.*structure|explain.*code|refactor.*module|which file.*handles|entry.?point|god.?node|how.*architecture|code.*organized|module.*depends/i],
    skills: [],
    instructions: `CODE ARCHITECTURE QUESTION — read graphify-out/GRAPH_REPORT.md for god nodes and community structure before answering. The graph has 2,094 nodes across 42 communities.`
  },
  {
    patterns: [/redesign|website|landing.?page|web.?page|html.*css|build.*site|frontend|UI|homepage|hero.?section/i],
    skills: ['ui-ux-pro-max', 'frontend-design', 'theme-factory', 'landing-page-generator', 'wcag-audit-patterns', 'seo-technical'],
    instructions: `WEBSITE/DESIGN TASK DETECTED. You MUST:
1. If a URL is provided, fetch it with WebFetch first to understand the existing site
2. NEVER use dark/neon/cyberpunk themes unless explicitly requested. Default to clean, professional, light design
3. Ask about brand colors, target audience, and tone BEFORE coding if not provided
4. Use professional fonts (Inter, DM Sans, Geist, Poppins) — never monospace for body
5. Make it mobile responsive (375px, 768px, 1024px, 1440px)
6. WCAG AA: 4.5:1 contrast, 44px touch targets, semantic HTML
7. Write real copy from the site content — no lorem ipsum
8. Include: hero, features/services, about, testimonials, CTA, footer
9. Present your design approach BEFORE coding — get approval first
10. Run accessibility check on the output`
  },
  {
    patterns: [/react|next\.?js|vue|angular|svelte|component|state.?management/i],
    skills: ['react-best-practices', 'react-patterns', 'nextjs-best-practices', 'frontend-developer', 'typescript-pro'],
    instructions: `FRONTEND FRAMEWORK TASK DETECTED. Follow the skill best practices for components, state management, and performance.`
  },
  {
    patterns: [/api|endpoint|rest|graphql|backend|server|express|fastapi|django/i],
    skills: ['api-design-principles', 'api-patterns', 'backend-dev-guidelines', 'api-security-best-practices'],
    instructions: `API/BACKEND TASK DETECTED. Follow RESTful design, proper error handling, input validation, and security patterns.`
  },
  {
    patterns: [/security|pentest|vulnerability|audit|owasp|xss|sql.?inject|auth/i],
    skills: ['security-auditor', 'ethical-hacking-methodology', 'top-web-vulnerabilities', 'api-security-best-practices'],
    instructions: `SECURITY TASK DETECTED. Follow the security skill methodology systematically.`
  },
  {
    patterns: [/docker|kubernetes|k8s|deploy|ci.?cd|pipeline|terraform|aws|gcp|azure/i],
    skills: ['docker-expert', 'kubernetes-architect', 'terraform-specialist', 'deployment-procedures'],
    instructions: `DEVOPS/INFRA TASK DETECTED. Follow infrastructure best practices from the skills.`
  },
  {
    patterns: [/test|spec|coverage|unit.?test|e2e|playwright|jest|pytest/i],
    skills: ['test-driven-development', 'e2e-testing-patterns', 'testing-patterns'],
    instructions: `TESTING TASK DETECTED. Follow TDD methodology from the skills.`
  },
  {
    patterns: [/python|pip|flask|django|pandas|numpy/i],
    skills: ['python-pro', 'python-patterns', 'python-testing-patterns'],
    instructions: `PYTHON TASK DETECTED. Follow Pythonic best practices from the skills.`
  },
  {
    patterns: [/seo|search.?engine|meta.?tag|sitemap|schema.?markup|ranking/i],
    skills: ['seo-audit', 'seo-technical', 'seo-content', 'seo-schema'],
    instructions: `SEO TASK DETECTED. Run a systematic audit using the SEO skills.`
  },
  {
    patterns: [/database|sql|postgres|mongo|redis|schema|migration/i],
    skills: ['database-design', 'postgresql', 'nosql-expert'],
    instructions: `DATABASE TASK DETECTED. Follow data modeling best practices from the skills.`
  },
  {
    patterns: [/mobile|react.?native|ios|android|flutter|expo/i],
    skills: ['react-native-architecture', 'mobile-design', 'mobile-developer'],
    instructions: `MOBILE TASK DETECTED. Follow mobile-first patterns from the skills.`
  },
];

// Load skills index once at startup for fast searching
let skillsIndex = [];
try {
  const indexPath = path.join(WORK_DIR, '.agents/skills/antigravity-awesome-skills/skills_index.json');
  if (fs.existsSync(indexPath)) {
    skillsIndex = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
    console.log('[skills] Loaded', skillsIndex.length, 'skills from index');
  }
} catch (e) {
  console.error('[skills] Failed to load index:', e.message);
}

function detectSkillsForMessage(userText) {
  const matched = [];
  // First: check hardcoded routes for critical task types
  for (const route of SKILL_ROUTES) {
    if (route.patterns.some(p => p.test(userText))) {
      matched.push(route);
    }
  }
  return matched;
}

// Dynamic skill search — find relevant skills from the 1,330+ index
function searchSkillsForMessage(userText, limit = 5) {
  if (!skillsIndex.length) return [];
  const words = userText.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  if (words.length === 0) return [];

  const scored = skillsIndex.map(skill => {
    const text = ((skill.name || '') + ' ' + (skill.description || '') + ' ' + (skill.tags || []).join(' ')).toLowerCase();
    let score = 0;
    for (const word of words) {
      if (text.includes(word)) score++;
      if ((skill.name || '').toLowerCase().includes(word)) score += 2; // name match is stronger
    }
    return { skill, score };
  }).filter(s => s.score > 0);

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.skill);
}

function loadSkillContent(skillName) {
  const skillPath = path.join(SKILLS_DIR, skillName, 'SKILL.md');
  try {
    if (fs.existsSync(skillPath)) {
      const content = fs.readFileSync(skillPath, 'utf-8');
      // Load first section — key guidelines
      return content.slice(0, 1500);
    }
  } catch (_) {}
  return null;
}

// ---------------------------------------------------------------------------
// Express app
// ---------------------------------------------------------------------------

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(express.static(PUBLIC_DIR));

// ---------------------------------------------------------------------------
// File upload endpoint
// ---------------------------------------------------------------------------

const upload = multer({
  dest: UPLOADS_DIR,
  limits: { fileSize: IMAGE_MAX_SIZE },
});

function handleUpload(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const originalName = req.file.originalname;
    const ext = path.extname(originalName).toLowerCase();

    // Sanitize — prevent directory traversal
    const safeName = path.basename(originalName);

    const isImage = ALLOWED_IMAGE_EXTS.has(ext);
    const isDoc = ALLOWED_DOC_EXTS.has(ext);

    if (!isImage && !isDoc) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: `File type ${ext} not allowed` });
    }

    if (isDoc && req.file.size > DOC_MAX_SIZE) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Document exceeds 5MB limit' });
    }

    const storedName = `${uuidv4()}-${safeName}`;
    const storedPath = path.join(UPLOADS_DIR, storedName);
    fs.renameSync(req.file.path, storedPath);

    const result = {
      filename: storedName,
      originalName: safeName,
      size: req.file.size,
      path: storedPath,
    };

    // For document files, read and include text content
    if (isDoc && ext !== '.pdf') {
      try {
        result.content = fs.readFileSync(storedPath, 'utf-8');
      } catch (_) {
        // binary or unreadable — skip content
      }
    }

    return res.json(result);
  } catch (err) {
    console.error('[upload] error:', err);
    return res.status(500).json({ error: 'Upload failed' });
  }
}

// Multer error handler wrapper
function uploadMiddleware(req, res, next) {
  upload.single('file')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File exceeds maximum size limit (10MB)' });
      }
      return res.status(400).json({ error: err.message || 'Upload failed' });
    }
    next();
  });
}

app.post('/upload', uploadMiddleware, handleUpload);
app.post('/api/upload', uploadMiddleware, handleUpload);

// ---------------------------------------------------------------------------
// Health check endpoint
// ---------------------------------------------------------------------------

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    sessions: listSessions().length,
    version: '1.0.0'
  });
});

app.get('/api/memory', (req, res) => {
  const q = req.query.q;
  if (q) {
    res.json({ results: searchMemory(q, parseInt(req.query.limit) || 10) });
  } else {
    res.json({ entries: listMemory(parseInt(req.query.limit) || 20) });
  }
});

app.post('/api/memory', express.json(), (req, res) => {
  const { key, value, tags } = req.body;
  if (!key || !value) return res.status(400).json({ error: 'key and value required' });
  res.json({ entry: addMemory(key, value, tags || [], 'api') });
});

// ---------------------------------------------------------------------------
// HTTP + WebSocket server
// ---------------------------------------------------------------------------

const server = http.createServer(app);

const wss = new WebSocketServer({
  server,
  maxPayload: MAX_MESSAGE_SIZE,
});

// ---------------------------------------------------------------------------
// Session helpers
// ---------------------------------------------------------------------------

function sessionPath(id) {
  // Sanitize to prevent directory traversal
  const safe = path.basename(id);
  return path.join(SESSIONS_DIR, `${safe}.json`);
}

function loadSession(id) {
  const p = sessionPath(id);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function saveSession(session) {
  session.updatedAt = new Date().toISOString();
  fs.writeFileSync(sessionPath(session.id), JSON.stringify(session, null, 2));
}

const TRASH_DIR = path.join(__dirname, 'sessions', '.trash');
fs.mkdirSync(TRASH_DIR, { recursive: true });

function deleteSessionFile(id) {
  // Don't actually delete — mark as archived
  const session = loadSession(id);
  if (session) {
    session.archived = true;
    session.archivedAt = new Date().toISOString();
    saveSession(session);
  }
}

function permanentDeleteSession(id) {
  const p = sessionPath(id);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

// Auto-cleanup trash older than 7 days
function cleanupTrash() {
  try {
    const files = fs.readdirSync(TRASH_DIR);
    const now = Date.now();
    for (const f of files) {
      const fp = path.join(TRASH_DIR, f);
      const stat = fs.statSync(fp);
      if (now - stat.mtimeMs > 30 * 24 * 60 * 60 * 1000) {
        fs.unlinkSync(fp);
      }
    }
  } catch (_) {}
}
setInterval(cleanupTrash, 24 * 60 * 60 * 1000); // daily

function getDateGroup(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return 'Past 7 Days';
  if (days < 30) return 'Past 30 Days';
  return 'Older';
}

function listSessions() {
  const files = fs.readdirSync(SESSIONS_DIR).filter(f => f.endsWith('.json'));
  const sessions = [];
  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(SESSIONS_DIR, file), 'utf-8');
      const data = JSON.parse(raw);
      sessions.push({
        id: data.id,
        name: data.name,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        messageCount: (data.messages || []).length,
        group: getDateGroup(data.updatedAt),
        pinned: !!data.pinned,
        archived: !!data.archived,
      });
    } catch (_) {
      // skip corrupt files
    }
  }
  // Sort newest first
  sessions.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  return sessions;
}

function createSession(model) {
  const session = {
    id: uuidv4(),
    name: 'New Chat',
    cliSessionId: null,
    model: model || 'sonnet',
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  saveSession(session);
  return session;
}

// ---------------------------------------------------------------------------
// Broadcast to all connected clients (live sync)
// ---------------------------------------------------------------------------

function broadcast(data, excludeWs) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client !== excludeWs && client.readyState === 1) {
      client.send(msg);
    }
  });
}

function broadcastSessionUpdate() {
  const sessions = listSessions();
  broadcast({ type: 'session_list', sessions });
}

// ---------------------------------------------------------------------------
// WebSocket connection handler
// ---------------------------------------------------------------------------

wss.on('connection', (ws) => {
  let activeProcess = null;
  let killTimer = null;
  const messageQueue = [];
  let processing = false;

  function send(obj) {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(obj));
    }
  }

  function cleanupProcess() {
    if (killTimer) {
      clearTimeout(killTimer);
      killTimer = null;
    }
    activeProcess = null;
    // Process next queued message if any
    if (messageQueue.length > 0) {
      const next = messageQueue.shift();
      setImmediate(() => handleChat(next));
    }
  }

  ws.on('close', () => {
    if (activeProcess) {
      try { activeProcess.kill('SIGTERM'); } catch (_) {}
      cleanupProcess();
    }
  });

  ws.on('message', (raw) => {
    let msg;
    try {
      msg = JSON.parse(raw.toString());
    } catch (_) {
      return send({ type: 'error', message: 'Invalid JSON' });
    }

    try {
      handleMessage(msg);
    } catch (err) {
      console.error('[ws] handler error:', err);
      send({ type: 'error', message: err.message || 'Internal error' });
    }
  });

  function handleMessage(msg) {
    switch (msg.type) {
      case 'list_sessions':
        return send({ type: 'session_list', sessions: listSessions() });

      case 'load_session':
        return handleLoadSession(msg);

      case 'delete_session':
        return handleDeleteSession(msg);

      case 'restore_session':
        return handleRestoreSession(msg);

      case 'list_trash':
        return handleListTrash();

      case 'rename_session':
        return handleRenameSession(msg);

      case 'pin_session':
        return handlePinSession(msg);

      case 'unpin_session':
        return handleUnpinSession(msg);

      case 'update_system_prompt':
        return handleUpdateSystemPrompt(msg);

      case 'auto_title':
        return handleAutoTitle(msg);

      case 'export_session':
        return handleExportSession(msg);

      case 'search_sessions':
        return handleSearchSessions(msg);

      case 'memory_add':
        return send({ type: 'memory_added', entry: addMemory(msg.key, msg.value, msg.tags || [], msg.source || 'user') });

      case 'memory_search':
        return send({ type: 'memory_results', results: searchMemory(msg.query || '', msg.limit || 10) });

      case 'memory_list':
        return send({ type: 'memory_list', entries: listMemory(msg.limit || 20) });

      case 'memory_delete':
        deleteMemory(msg.id);
        return send({ type: 'memory_deleted', id: msg.id });

      case 'memory_clear':
        saveMemoryStore({ entries: [], version: 1 });
        return send({ type: 'memory_cleared' });

      case 'get_status':
        return send({
          type: 'status_info',
          gateway: { uptime: process.uptime(), memory: process.memoryUsage(), pid: process.pid },
          session: msg.sessionId ? (() => { const s = loadSession(msg.sessionId); return s ? { id: s.id, name: s.name, model: s.model, messageCount: (s.messages||[]).length, cliSessionId: s.cliSessionId, createdAt: s.createdAt } : null; })() : null,
          activeSessions: listSessions().length,
          workDir: WORK_DIR
        });

      case 'compact_session':
        return handleCompactSession(msg);

      case 'get_session_stats':
        return handleSessionStats(msg);

      case 'duplicate_session':
        return handleDuplicateSession(msg);

      case 'edit_message':
        return handleEditMessage(msg);

      case 'regenerate':
        return handleRegenerate(msg);

      case 'chat':
        if (activeProcess) {
          if (!msg.sessionId) {
            // New chat — kill old process and start fresh
            messageQueue.length = 0;
            try { activeProcess.kill('SIGTERM'); } catch (_) {}
            // Wait briefly for cleanup, then start new chat
            setTimeout(() => {
              cleanupProcess();
              handleChat(msg);
            }, 500);
          } else {
            // Same session — queue the message
            messageQueue.push(msg);
            send({ type: 'chat_queued', position: messageQueue.length });
          }
        } else {
          handleChat(msg);
        }
        return;

      case 'unarchive_session':
        return handleUnarchiveSession(msg);

      case 'permanent_delete_session':
        return handlePermanentDelete(msg);

      case 'cancel':
        // Clear the queue too
        messageQueue.length = 0;
        return handleCancel();

      default:
        return send({ type: 'error', message: `Unknown message type: ${msg.type}` });
    }
  }

  // --- Session operations ---------------------------------------------------

  function handleListTrash() {
    try {
      const files = fs.readdirSync(TRASH_DIR).filter(f => f.endsWith('.json'));
      const trashItems = [];
      for (const f of files) {
        try {
          const data = JSON.parse(fs.readFileSync(path.join(TRASH_DIR, f), 'utf-8'));
          trashItems.push({ file: f, id: data.id, name: data.name, deletedAt: fs.statSync(path.join(TRASH_DIR, f)).mtimeMs });
        } catch (_) {}
      }
      trashItems.sort((a, b) => b.deletedAt - a.deletedAt);
      send({ type: 'trash_list', items: trashItems });
    } catch (_) {
      send({ type: 'trash_list', items: [] });
    }
  }

  function handleRestoreSession(msg) {
    const fileName = msg.file;
    if (!fileName) return send({ type: 'error', message: 'No file specified' });
    const trashPath = path.join(TRASH_DIR, path.basename(fileName));
    if (!fs.existsSync(trashPath)) return send({ type: 'error', message: 'File not found in trash' });
    try {
      const data = JSON.parse(fs.readFileSync(trashPath, 'utf-8'));
      const restorePath = sessionPath(data.id);
      fs.renameSync(trashPath, restorePath);
      send({ type: 'session_restored', session: { id: data.id, name: data.name } });
      broadcastSessionUpdate();
    } catch (e) {
      send({ type: 'error', message: 'Failed to restore: ' + e.message });
    }
  }

  function handleUnarchiveSession(msg) {
    const session = loadSession(msg.sessionId);
    if (!session) return send({ type: 'error', message: 'Session not found' });
    session.archived = false;
    delete session.archivedAt;
    saveSession(session);
    send({ type: 'session_unarchived', sessionId: msg.sessionId });
    broadcastSessionUpdate();
  }

  function handlePermanentDelete(msg) {
    permanentDeleteSession(msg.sessionId);
    send({ type: 'session_deleted', sessionId: msg.sessionId });
    broadcast({ type: 'session_deleted', sessionId: msg.sessionId }, ws);
    broadcastSessionUpdate();
  }

  function handleLoadSession(msg) {
    const session = loadSession(msg.sessionId);
    if (!session) {
      return send({ type: 'error', message: 'Session not found' });
    }
    send({ type: 'session_loaded', session });
  }

  function handleDeleteSession(msg) {
    deleteSessionFile(msg.sessionId);
    send({ type: 'session_deleted', sessionId: msg.sessionId });
    broadcast({ type: 'session_deleted', sessionId: msg.sessionId }, ws);
    broadcastSessionUpdate();
  }

  function handleRenameSession(msg) {
    const session = loadSession(msg.sessionId);
    if (!session) {
      return send({ type: 'error', message: 'Session not found' });
    }
    session.name = msg.name;
    saveSession(session);
    send({ type: 'session_renamed', sessionId: msg.sessionId, name: msg.name });
    broadcast({ type: 'session_renamed', sessionId: msg.sessionId, name: msg.name }, ws);
    broadcastSessionUpdate();
  }

  function handleExportSession(msg) {
    const session = loadSession(msg.sessionId);
    if (!session) return send({ type: 'error', message: 'Session not found' });
    let md = `# ${session.name}\n\n`;
    for (const m of session.messages || []) {
      if (m.role === 'user') {
        md += `## User\n\n${m.content}\n\n`;
      } else {
        md += `## Assistant\n\n${m.content}\n\n`;
        for (const tb of m.toolBlocks || []) {
          md += `> **${tb.toolName}**\n`;
          if (tb.toolInput) md += `> Input: \`${JSON.stringify(tb.toolInput).slice(0, 200)}\`\n`;
          md += '\n';
        }
      }
    }
    send({ type: 'session_exported', sessionId: msg.sessionId, markdown: md });
  }

  function handleSearchSessions(msg) {
    const query = (msg.query || '').toLowerCase();
    if (!query) return send({ type: 'search_results', results: [] });
    const files = fs.readdirSync(SESSIONS_DIR).filter(f => f.endsWith('.json'));
    const results = [];
    for (const file of files) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(SESSIONS_DIR, file), 'utf-8'));
        const nameMatch = (data.name || '').toLowerCase().includes(query);
        const contentMatch = (data.messages || []).some(m =>
          (m.content || '').toLowerCase().includes(query)
        );
        if (nameMatch || contentMatch) {
          results.push({ id: data.id, name: data.name, updatedAt: data.updatedAt,
            messageCount: (data.messages || []).length });
        }
      } catch (_) {}
    }
    send({ type: 'search_results', results });
  }

  function handlePinSession(msg) {
    const session = loadSession(msg.sessionId);
    if (!session) return send({ type: 'error', message: 'Session not found' });
    session.pinned = true;
    saveSession(session);
    send({ type: 'session_pinned', sessionId: msg.sessionId });
    broadcastSessionUpdate();
  }

  function handleUnpinSession(msg) {
    const session = loadSession(msg.sessionId);
    if (!session) return send({ type: 'error', message: 'Session not found' });
    session.pinned = false;
    saveSession(session);
    send({ type: 'session_unpinned', sessionId: msg.sessionId });
    broadcastSessionUpdate();
  }

  function handleUpdateSystemPrompt(msg) {
    const session = loadSession(msg.sessionId);
    if (!session) return send({ type: 'error', message: 'Session not found' });
    session.systemPrompt = msg.prompt || '';
    saveSession(session);
    send({ type: 'system_prompt_updated', sessionId: msg.sessionId });
  }

  function handleAutoTitle(msg) {
    // This uses claude to generate a title — we'll just do a simple extraction
    const session = loadSession(msg.sessionId);
    if (!session || !session.messages || session.messages.length < 2) return;
    const firstUser = session.messages.find(m => m.role === 'user');
    const firstAssistant = session.messages.find(m => m.role === 'assistant');
    if (!firstUser || !firstAssistant) return;
    // Generate a title from the content (simple heuristic - take first sentence of assistant)
    let title = (firstAssistant.content || '').split(/[.\n!?]/)[0].trim();
    if (title.length > 50) title = title.slice(0, 47) + '...';
    if (title.length < 3) title = (firstUser.content || '').slice(0, 40).trim();
    session.name = title || session.name;
    saveSession(session);
    send({ type: 'session_renamed', sessionId: msg.sessionId, name: session.name });
    broadcastSessionUpdate();
  }

  // --- Compact, Stats, Duplicate handlers -----------------------------------

  function handleCompactSession(msg) {
    const session = loadSession(msg.sessionId);
    if (!session) return send({ type: 'error', message: 'Session not found' });
    const keepCount = msg.keepCount || 10; // keep last N messages
    const originalCount = session.messages.length;
    if (session.messages.length > keepCount) {
      const summary = 'Context compacted: ' + (session.messages.length - keepCount) + ' older messages removed.';
      session.messages = session.messages.slice(-keepCount);
      // Prepend a system note about compaction
      session.messages.unshift({ role: 'assistant', content: '[Context compacted — ' + (originalCount - keepCount) + ' earlier messages removed]', timestamp: new Date().toISOString(), toolBlocks: [] });
    }
    saveSession(session);
    send({ type: 'session_compacted', sessionId: msg.sessionId, originalCount, newCount: session.messages.length });
  }

  function handleSessionStats(msg) {
    const session = loadSession(msg.sessionId);
    if (!session) return send({ type: 'error', message: 'Session not found' });
    const msgs = session.messages || [];
    const userMsgs = msgs.filter(m => m.role === 'user');
    const assistantMsgs = msgs.filter(m => m.role === 'assistant');
    const totalToolBlocks = msgs.reduce((sum, m) => sum + (m.toolBlocks || []).length, 0);
    const totalChars = msgs.reduce((sum, m) => sum + (m.content || '').length, 0);
    send({
      type: 'session_stats',
      sessionId: msg.sessionId,
      stats: {
        messageCount: msgs.length,
        userMessages: userMsgs.length,
        assistantMessages: assistantMsgs.length,
        toolCalls: totalToolBlocks,
        totalCharacters: totalChars,
        estimatedTokens: Math.round(totalChars / 4),
        model: session.model,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt
      }
    });
  }

  function handleDuplicateSession(msg) {
    const source = loadSession(msg.sessionId);
    if (!source) return send({ type: 'error', message: 'Session not found' });
    const newSession = createSession(source.model);
    newSession.name = source.name + ' (copy)';
    newSession.messages = JSON.parse(JSON.stringify(source.messages));
    newSession.systemPrompt = source.systemPrompt;
    saveSession(newSession);
    send({ type: 'session_created', session: { id: newSession.id, name: newSession.name } });
  }

  // --- Edit / Regenerate handlers -------------------------------------------

  function handleEditMessage(msg) {
    const session = loadSession(msg.sessionId);
    if (!session) return send({ type: 'error', message: 'Session not found' });
    const idx = session.messages.findIndex(m => m.timestamp === msg.timestamp && m.role === 'user');
    if (idx < 0) return send({ type: 'error', message: 'Message not found' });
    // Truncate conversation at this point (branch)
    session.messages = session.messages.slice(0, idx);
    session.messages.push({ role: 'user', content: msg.newContent, timestamp: new Date().toISOString(), toolBlocks: [] });
    // Clear CLI session so it starts fresh from this branch point
    session.cliSessionId = null;
    saveSession(session);
    send({ type: 'message_edited', sessionId: msg.sessionId, messages: session.messages });
  }

  function handleRegenerate(msg) {
    const session = loadSession(msg.sessionId);
    if (!session || !session.messages.length) return send({ type: 'error', message: 'Nothing to regenerate' });
    // Remove last assistant message, keep the user message before it
    while (session.messages.length > 0 && session.messages[session.messages.length - 1].role === 'assistant') {
      session.messages.pop();
    }
    const lastUserMsg = session.messages[session.messages.length - 1];
    if (!lastUserMsg || lastUserMsg.role !== 'user') return send({ type: 'error', message: 'No user message to regenerate from' });
    saveSession(session);
    // Re-send the last user message as a new chat
    handleChat({ type: 'chat', message: lastUserMsg.content, sessionId: msg.sessionId, model: msg.model || session.model || 'sonnet' });
  }

  // --- Follow-up suggestion generator ----------------------------------------

  function generateFollowUps(assistantText, toolBlocks) {
    const suggestions = [];
    if (toolBlocks.length > 0) {
      const toolNames = [...new Set(toolBlocks.map(t => t.toolName))];
      if (toolNames.includes('Read')) suggestions.push('Can you explain what this code does?');
      if (toolNames.includes('Write') || toolNames.includes('Edit')) suggestions.push('Can you add tests for this?');
      if (toolNames.includes('Bash')) suggestions.push('What was the output? Any issues?');
    }
    if (assistantText.includes('```')) suggestions.push('Can you improve this code?');
    if (assistantText.includes('error') || assistantText.includes('Error')) suggestions.push('How can we fix this error?');
    if (suggestions.length < 3) suggestions.push('Tell me more about this');
    if (suggestions.length < 3) suggestions.push('What should I do next?');
    if (suggestions.length < 3) suggestions.push('Can you explain this differently?');
    return suggestions.slice(0, 3);
  }

  // --- Chat / Claude CLI ---------------------------------------------------

  function handleChat(msg) {
    const userText = msg.message || '';
    const model = msg.model || 'sonnet';
    const images = msg.images || [];
    const files = msg.files || [];

    // Resolve or create session
    let session;
    if (msg.sessionId) {
      session = loadSession(msg.sessionId);
    }
    if (!session) {
      session = createSession(model);
      // Set session name from first user message
      if (userText) {
        session.name = userText.slice(0, 40).replace(/\n/g, ' ').trim() || 'New Chat';
        saveSession(session);
      }
      send({ type: 'session_created', session: { id: session.id, name: session.name } });
      broadcastSessionUpdate();
    }

    // Build the prompt — save images to disk (base64 is too large for stdin)
    let prompt = '';
    const tempImagePaths = [];

    for (const img of images) {
      try {
        const imgName = `${uuidv4()}-${path.basename(img.name || 'image.png')}`;
        const imgPath = path.join(UPLOADS_DIR, imgName);
        fs.writeFileSync(imgPath, Buffer.from(img.data, 'base64'));
        tempImagePaths.push(imgPath);
        prompt += `[The user uploaded an image: ${imgPath}]\n`;
      } catch (e) {
        console.error('[image save]', e.message);
      }
    }
    for (const file of files) {
      prompt += `[File: ${file.name}]\n---\n${file.content}\n---\n\n`;
    }
    prompt += userText;

    // Build CLI command args
    const args = [
      '-p',
      '--output-format', 'stream-json',
      '--verbose',
      '--include-partial-messages',
      '--dangerously-skip-permissions',
      '--model', model,
    ];

    if (session.cliSessionId) {
      args.push('--resume', session.cliSessionId);
    }

    // Add system prompt with professional standards and skill routing
    const systemParts = [];
    systemParts.push(`You are Ruflow — a professional AI assistant with 1,340+ skills. You run on a VPS (Ubuntu Linux) as user claude-user. Working directory: ${WORK_DIR}

You have full filesystem access, can run shell commands, read/write/edit files, and use all tools without permission prompts.

KARPATHY CODING PRINCIPLES (follow these for ALL coding work):

THINK BEFORE CODING: State assumptions explicitly. If uncertain, ASK. If multiple interpretations exist, present them — don't pick silently. If a simpler approach exists, say so.

SIMPLICITY FIRST: Minimum code that solves the problem. No features beyond what was asked. No abstractions for single-use code. If you write 200 lines and it could be 50, rewrite it.

SURGICAL CHANGES: Touch only what you must. Don't "improve" adjacent code. Match existing style. Every changed line should trace to the user's request.

GOAL-DRIVEN EXECUTION: Define success criteria before starting. "Add validation" → write tests first. "Fix bug" → reproduce it first. Verify each step.

PROFESSIONAL STANDARDS:
- You represent Ruflow to clients. No sloppy work.
- Ask clarifying questions before making assumptions (especially design).
- Present your approach BEFORE implementing. Get approval for big tasks.
- Read existing code/content before modifying. Understand first, then act.
- Run linters and tests after changes. Verify before claiming done.
- Explain WHY you made choices, not just what you did.
- NEVER use dark/neon/cyberpunk themes unless explicitly asked. Default: clean, professional, light.
- For website work: fetch the existing site first, preserve brand identity, use professional typography.
- Skills matching your task are AUTO-LOADED below. Follow their guidance.

GRAPHIFY (use ONLY for code/architecture tasks — not for general chat):
- When working on code, architecture, or codebase questions: read graphify-out/GRAPH_REPORT.md for structure
- After modifying code files: run graphify update to keep graph current
- For normal conversation, questions, or non-code tasks: do NOT use graphify — just respond naturally`);

    if (session.systemPrompt) {
      systemParts.push(session.systemPrompt);
    }

    // Smart skill auto-loading: detect task type and inject relevant skill content
    const detectedRoutes = detectSkillsForMessage(prompt);
    const loadedSkillNames = new Set();

    // 1. Load skills from hardcoded routes (critical patterns)
    if (detectedRoutes.length > 0) {
      for (const route of detectedRoutes) {
        systemParts.push('--- AUTO-DETECTED TASK INSTRUCTIONS ---\n' + route.instructions);
        const loadedSkills = [];
        for (const skillName of route.skills.slice(0, 3)) {
          const content = loadSkillContent(skillName);
          if (content) {
            loadedSkills.push('### Skill: ' + skillName + '\n' + content);
            loadedSkillNames.add(skillName);
          }
        }
        if (loadedSkills.length > 0) {
          systemParts.push('--- LOADED SKILL REFERENCE ---\n' + loadedSkills.join('\n\n---\n\n'));
        }
      }
    }

    // 2. Dynamic skill search — find additional relevant skills from the 1,330+ index
    const dynamicSkills = searchSkillsForMessage(prompt, 5);
    const extraSkills = dynamicSkills.filter(s => !loadedSkillNames.has(s.name)).slice(0, 3);
    if (extraSkills.length > 0) {
      const skillList = extraSkills.map(s => '- ' + s.name + ': ' + (s.description || '').slice(0, 100)).join('\n');
      systemParts.push('--- ADDITIONAL RELEVANT SKILLS (read these if needed) ---\n' +
        'These skills match your task. Read them with: cat ' + SKILLS_DIR + '/SKILL_NAME/SKILL.md\n\n' + skillList);
      // Load the top dynamic skill's content if no hardcoded route matched
      if (detectedRoutes.length === 0 && extraSkills[0]) {
        const content = loadSkillContent(extraSkills[0].name);
        if (content) {
          systemParts.push('### Skill: ' + extraSkills[0].name + '\n' + content);
        }
      }
    }

    args.push('--append-system-prompt', systemParts.join('\n\n'));

    // Prepare env — full VPS access, no nested session conflicts
    const env = { ...process.env, CLAUDE_ENTRYPOINT: 'worker' };
    delete env.CLAUDE_SESSION_ID;
    delete env.CLAUDE_PARENT_SESSION_ID;
    // Ensure PATH includes common tool locations
    env.PATH = '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:'
      + '/home/claude-user/.local/bin:/home/claude-user/.nvm/versions/node/v22.22.0/bin:'
      + (env.PATH || '');
    env.HOME = '/home/claude-user';
    env.USER = 'claude-user';

    const child = spawn('claude', args, {
      stdio: ['pipe', 'pipe', 'pipe'],
      env,
      cwd: WORK_DIR,
    });

    activeProcess = child;

    send({ type: 'stream_start', sessionId: session.id });

    // Write prompt to stdin and close
    child.stdin.write(prompt);
    child.stdin.end();

    // --- Stream parsing state -----------------------------------------------
    let stdoutBuffer = '';
    let accumulatedText = '';
    let lastSentTextLength = 0;
    let toolBlocks = [];
    let assistantContent = '';
    let costInfo = null;
    let stderrOutput = '';
    let messagesSaved = false;

    // Timeout: if no output after 30 seconds, something's wrong
    const spawnTimeout = setTimeout(() => {
      if (!accumulatedText && toolBlocks.length === 0 && !costInfo) {
        send({ type: 'stream_error', error: 'Claude is taking too long to respond. The process may be stuck.' });
        try { child.kill('SIGTERM'); } catch (_) {}
        cleanupProcess();
      }
    }, 90000); // 90s timeout — skill-loaded tasks take longer to start

    child.stdout.on('data', (chunk) => {
      clearTimeout(spawnTimeout);
      stdoutBuffer += chunk.toString();

      // Process complete lines
      const lines = stdoutBuffer.split('\n');
      // Keep the last (possibly incomplete) line in the buffer
      stdoutBuffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        let parsed;
        try {
          parsed = JSON.parse(trimmed);
        } catch (_) {
          continue; // not JSON, skip
        }

        processStreamEvent(parsed, session);
      }
    });

    child.stderr.on('data', (chunk) => {
      stderrOutput += chunk.toString();
    });

    child.on('error', (err) => {
      clearTimeout(spawnTimeout);
      console.error('[claude] spawn error:', err);
      let errorMsg = err.message;
      if (err.code === 'ENOENT') {
        errorMsg = 'Claude CLI not found. Ensure "claude" is installed and available in PATH.';
      } else if (err.code === 'EACCES') {
        errorMsg = 'Permission denied when launching Claude CLI. Check file permissions.';
      } else if (err.code === 'ENOMEM') {
        errorMsg = 'Not enough memory to spawn Claude process.';
      }
      send({ type: 'stream_error', error: errorMsg });
      cleanupProcess();
    });

    child.on('close', (code) => {
      clearTimeout(spawnTimeout);
      // Process any remaining buffered data
      if (stdoutBuffer.trim()) {
        try {
          const parsed = JSON.parse(stdoutBuffer.trim());
          processStreamEvent(parsed, session);
        } catch (_) {}
      }

      if (stderrOutput.trim()) {
        console.error('[claude] stderr:', stderrOutput.trim());
      }

      if (code !== 0 && code !== null) {
        send({ type: 'stream_error', error: `Claude process exited with code ${code}` });
      }

      // Save the exchange if not already saved by result handler
      if (!messagesSaved && (accumulatedText || toolBlocks.length > 0)) {
        session.messages.push({
          role: 'user',
          content: userText,
          timestamp: new Date().toISOString(),
          toolBlocks: [],
        });
        session.messages.push({
          role: 'assistant',
          content: accumulatedText,
          timestamp: new Date().toISOString(),
          toolBlocks: [...toolBlocks],
        });
        saveSession(session);
      }

      if (!costInfo) {
        send({ type: 'stream_end', cost: null, duration: null, sessionId: session.id });
      }

      cleanupProcess();
    });

    // --- Stream event processor ---------------------------------------------

    function processStreamEvent(event, session) {
      if (!event || !event.type) return;

      // System init — capture CLI session ID
      if (event.type === 'system' && event.subtype === 'init') {
        if (event.session_id) {
          session.cliSessionId = event.session_id;
          saveSession(session);
        }
        return;
      }

      // Assistant message (potentially partial with --include-partial-messages)
      const assistantContent = event.type === 'assistant'
        ? (event.message?.content || event.content)
        : null;
      if (event.type === 'assistant' && Array.isArray(assistantContent)) {
        for (const block of assistantContent) {
          if (block.type === 'text') {
            const fullText = block.text || '';
            accumulatedText = fullText;

            // Send only the delta
            if (fullText.length > lastSentTextLength) {
              const delta = fullText.slice(lastSentTextLength);
              send({ type: 'stream_text', text: delta });
              lastSentTextLength = fullText.length;
            }
          } else if (block.type === 'tool_use') {
            const toolId = block.id || uuidv4();
            send({
              type: 'stream_tool_start',
              toolId,
              toolName: block.name,
              toolInput: block.input,
            });
            toolBlocks.push({
              toolId,
              toolName: block.name,
              toolInput: block.input,
              toolOutput: null,
              isError: false,
            });
          }
        }
        return;
      }

      // User message containing tool results
      const userContent = event.type === 'user'
        ? (event.message?.content || event.content)
        : null;
      if (event.type === 'user' && Array.isArray(userContent)) {
        for (const block of userContent) {
          if (block.type === 'tool_result') {
            const toolId = block.tool_use_id;
            const content = typeof block.content === 'string'
              ? block.content
              : JSON.stringify(block.content);
            const isError = !!block.is_error;

            send({ type: 'stream_tool_result', toolId, content, isError });

            // Update the matching tool block
            const existing = toolBlocks.find(t => t.toolId === toolId);
            if (existing) {
              existing.toolOutput = content;
              existing.isError = isError;
            }
          }
        }
        return;
      }

      // Stream event — token-by-token delta from --include-partial-messages
      if (event.type === 'stream_event') {
        const delta = event.event?.delta;
        if (delta?.type === 'text_delta' && delta.text) {
          accumulatedText += delta.text;
          lastSentTextLength = accumulatedText.length;
          send({ type: 'stream_text', text: delta.text });
        }
        return;
      }

      // Result — final message with cost info; save session immediately
      if (event.type === 'result') {
        const usage = event.usage || {};
        const modelUsage = event.modelUsage || {};
        const modelKey = Object.keys(modelUsage)[0] || '';
        const modelInfo = modelUsage[modelKey] || {};
        costInfo = {
          cost: event.total_cost_usd ?? event.cost_usd ?? null,
          duration: event.duration_ms ?? null,
        };

        // Save messages now (before close) so load_session works immediately
        if (accumulatedText || toolBlocks.length > 0) {
          session.messages.push({
            role: 'user',
            content: userText,
            timestamp: new Date().toISOString(),
            toolBlocks: [],
          });
          session.messages.push({
            role: 'assistant',
            content: accumulatedText,
            timestamp: new Date().toISOString(),
            toolBlocks: [...toolBlocks],
          });
          saveSession(session);
          messagesSaved = true;
          // Auto-extract memories from this exchange
          try { autoExtractMemory(userText, accumulatedText, session.name); } catch (_) {}
          // Sync to AgentDB vector database
          syncSessionToVectorDb(session).catch(() => {});
          // Broadcast session update to all connected clients
          broadcastSessionUpdate();
        }

        send({
          type: 'stream_end',
          cost: costInfo.cost,
          duration: costInfo.duration,
          sessionId: session.id,
          model: modelKey.replace(/\[.*\]/, '') || model,
          inputTokens: modelInfo.inputTokens ?? usage.input_tokens ?? null,
          outputTokens: modelInfo.outputTokens ?? usage.output_tokens ?? null,
          cacheReadTokens: modelInfo.cacheReadInputTokens ?? usage.cache_read_input_tokens ?? null,
          tokensPerSecond: costInfo.duration > 0 ? Math.round((modelInfo.outputTokens || 0) / (costInfo.duration / 1000)) : null,
          followUps: generateFollowUps(accumulatedText, toolBlocks),
        });
        return;
      }
    }
  }

  // --- Cancel handling ------------------------------------------------------

  function handleCancel() {
    if (!activeProcess) return;

    try {
      activeProcess.kill('SIGTERM');
    } catch (_) {}

    killTimer = setTimeout(() => {
      if (activeProcess) {
        try {
          activeProcess.kill('SIGKILL');
        } catch (_) {}
      }
      cleanupProcess();
    }, CANCEL_KILL_TIMEOUT);
  }
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

server.listen(PORT, () => {
  console.log(`Ruflow UI server running on http://localhost:${PORT}`);
  console.log(`  Static files: ${PUBLIC_DIR}`);
  console.log(`  Sessions dir: ${SESSIONS_DIR}`);
  console.log(`  Working dir:  ${WORK_DIR}`);
  writeHeartbeat();
  setInterval(writeHeartbeat, 60000);
});
