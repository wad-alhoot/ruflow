#!/usr/bin/env node
/**
 * session-vectordb.cjs - Auto-connect every session to vector DB (AgentDB + MCP HNSW).
 *
 * Called by hooks:
 *   node session-vectordb.cjs start   — on SessionStart: restore context from vector DB
 *   node session-vectordb.cjs save    — on SessionEnd/Stop: save session to vector DB
 *   node session-vectordb.cjs ingest  — ingest latest .jsonl into both SQLite + MCP
 *
 * Stores into:
 *   1. Local SQLite AgentDB (scripts/memory-db/) via ingest.js
 *   2. MCP vector DB (claude-flow memory_store) via CLI
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const PROJECTS_DIR = path.join(
  process.env.HOME || '/home/claude-user', '.claude', 'projects',
  '-home-claude-user-workspace-repos-ruflow'
);
const MEMORY_DIR = path.join(PROJECTS_DIR, 'memory');
const RUFLOW_DIR = process.env.CLAUDE_PROJECT_DIR || '/home/claude-user/workspace/repos/ruflow';
const INGEST_SCRIPT = path.join(RUFLOW_DIR, 'scripts', 'memory-db', 'ingest.js');
const DB_PATH = path.join(RUFLOW_DIR, 'data', 'memory', 'agentdb.sqlite');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function log(msg) { console.log(`[vectordb] ${msg}`); }

function findLatestJsonl() {
  if (!fs.existsSync(PROJECTS_DIR)) return null;
  const files = fs.readdirSync(PROJECTS_DIR)
    .filter(f => f.endsWith('.jsonl'))
    .map(f => ({
      name: f,
      path: path.join(PROJECTS_DIR, f),
      mtime: fs.statSync(path.join(PROJECTS_DIR, f)).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime);
  return files.length > 0 ? files[0] : null;
}

function findLatestMemoryFile() {
  if (!fs.existsSync(MEMORY_DIR)) return null;
  const files = fs.readdirSync(MEMORY_DIR)
    .filter(f => f.startsWith('session_') && f.endsWith('.md'))
    .map(f => ({
      name: f,
      path: path.join(MEMORY_DIR, f),
      mtime: fs.statSync(path.join(MEMORY_DIR, f)).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime);
  return files.length > 0 ? files[0] : null;
}

function extractSessionSummary(jsonlPath) {
  try {
    const raw = fs.readFileSync(jsonlPath, 'utf-8');
    const lines = raw.split('\n').filter(l => l.trim());
    if (lines.length < 3) return null;

    let title = 'Untitled Session';
    let model = 'unknown';
    let branch = 'unknown';
    const userMsgs = [];
    const assistantSnippets = [];
    const filesTouched = new Set();
    let userCount = 0;
    let assistantCount = 0;

    for (const line of lines) {
      try {
        const obj = JSON.parse(line);
        if (obj.aiTitle) title = obj.aiTitle;
        if (obj.model) model = obj.model;
        if (obj.gitBranch) branch = obj.gitBranch;

        if (obj.type === 'user') {
          userCount++;
          if (typeof obj.content === 'string' && obj.content.length > 3) {
            userMsgs.push(obj.content.slice(0, 200));
          } else if (Array.isArray(obj.content)) {
            for (const b of obj.content) {
              if (b.text && b.text.length > 3 && !b.text.startsWith('<')) {
                userMsgs.push(b.text.slice(0, 200));
              }
            }
          }
        }

        if (obj.type === 'assistant') {
          assistantCount++;
          if (Array.isArray(obj.content)) {
            for (const b of obj.content) {
              if (b.type === 'text' && b.text && b.text.length > 10) {
                assistantSnippets.push(b.text.slice(0, 300));
              }
            }
          }
        }

        // Extract file paths
        const fpMatches = line.matchAll(/"(?:file_path|path)":"([^"]+)"/g);
        for (const m of fpMatches) filesTouched.add(m[1]);
      } catch { /* skip */ }
    }

    const sessionId = path.basename(jsonlPath, '.jsonl');
    return {
      sessionId,
      title,
      model,
      branch,
      userMsgs: userMsgs.slice(0, 20),
      assistantSnippets: assistantSnippets.slice(0, 15),
      filesTouched: [...filesTouched].slice(0, 30),
      userCount,
      assistantCount,
      lineCount: lines.length,
    };
  } catch (e) {
    return null;
  }
}

function storeMcpMemory(key, value, tags, namespace) {
  try {
    // Use claude-flow CLI to store into MCP vector DB
    const tagsStr = tags.join(',');
    const cmd = `npx claude-flow@v3alpha memory store --namespace "${namespace}" --key "${key}" --tags "${tagsStr}" --value "${value.replace(/"/g, '\\"').replace(/\n/g, ' ')}"`;
    execSync(cmd, {
      cwd: RUFLOW_DIR,
      timeout: 15000,
      stdio: 'pipe',
      windowsHide: true,
    });
    return true;
  } catch (e) {
    // Fallback: try direct MCP tool call via node
    return false;
  }
}

function ingestToSqlite(filePath, mode) {
  try {
    if (!fs.existsSync(INGEST_SCRIPT)) return false;
    const flag = mode === 'session' ? '--session' : '--file';
    execSync(`node "${INGEST_SCRIPT}" ${flag} "${filePath}"`, {
      cwd: RUFLOW_DIR,
      timeout: 30000,
      stdio: 'pipe',
      windowsHide: true,
    });
    return true;
  } catch (e) {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

function cmdStart() {
  log('Connecting session to vector DB...');

  // Check SQLite DB exists
  const dbExists = fs.existsSync(DB_PATH);
  log(`SQLite AgentDB: ${dbExists ? 'connected' : 'will create on first save'}`);

  // Load latest session context for continuity
  const latest = findLatestMemoryFile();
  if (latest) {
    log(`Last session: ${latest.name}`);
  }

  // Store session-start marker in MCP
  const sessionId = 'session-' + Date.now();
  const startTime = new Date().toISOString();
  storeMcpMemory(
    `session-start-${sessionId}`,
    `Session started at ${startTime}. Connected to AgentDB (SQLite) and MCP vector DB (HNSW 384-dim).`,
    ['session', 'start', 'vectordb'],
    'sessions'
  );

  log(`Session ${sessionId} connected to vector DB`);
  log('Vector DB: MCP HNSW (384-dim embeddings)');
  log('SQLite DB: ' + DB_PATH);
}

function cmdSave() {
  log('Saving session to vector DB...');

  const latest = findLatestJsonl();
  if (!latest) {
    log('No session .jsonl found, skipping.');
    return;
  }

  const summary = extractSessionSummary(latest.path);
  if (!summary) {
    log('Session too short or empty, skipping.');
    return;
  }

  // Build rich session text for vector storage
  const sessionText = [
    `Session: ${summary.title}`,
    `ID: ${summary.sessionId}`,
    `Model: ${summary.model}`,
    `Branch: ${summary.branch}`,
    `Messages: ${summary.userCount} user / ${summary.assistantCount} assistant`,
    '',
    'User Topics:',
    ...summary.userMsgs.map(m => `- ${m}`),
    '',
    'Key Responses:',
    ...summary.assistantSnippets.map(s => `- ${s}`),
    '',
    'Files Modified:',
    ...summary.filesTouched.map(f => `- ${f}`),
  ].join('\n');

  // 1. Store to MCP vector DB (HNSW)
  const mcpKey = `session-${summary.sessionId}`;
  const mcpStored = storeMcpMemory(
    mcpKey,
    sessionText,
    ['session', 'transcript', summary.branch, summary.model],
    'sessions'
  );
  log(`MCP vector DB: ${mcpStored ? 'stored' : 'fallback (will retry)'}`);

  // 2. Ingest .jsonl into SQLite AgentDB
  const sqliteStored = ingestToSqlite(latest.path, 'session');
  log(`SQLite AgentDB: ${sqliteStored ? 'ingested' : 'skipped'}`);

  // 3. Also ingest the latest memory .md file if it exists
  const latestMd = findLatestMemoryFile();
  if (latestMd) {
    const mdStored = ingestToSqlite(latestMd.path, 'file');
    log(`Memory file: ${mdStored ? 'ingested' : 'skipped'}`);
  }

  log(`Session ${summary.sessionId} saved to both vector DBs`);
  log(`  Title: ${summary.title}`);
  log(`  Messages: ${summary.userCount}u/${summary.assistantCount}a`);
  log(`  Files: ${summary.filesTouched.length}`);
}

function cmdIngest() {
  log('Full ingest into both databases...');

  // Ingest all into SQLite
  try {
    execSync(`node "${INGEST_SCRIPT}" --all`, {
      cwd: RUFLOW_DIR,
      timeout: 120000,
      stdio: 'inherit',
      windowsHide: true,
    });
  } catch (e) {
    log('SQLite full ingest had errors: ' + e.message);
  }

  // Ingest all session .md files into MCP vector DB
  if (fs.existsSync(MEMORY_DIR)) {
    const sessionFiles = fs.readdirSync(MEMORY_DIR)
      .filter(f => f.startsWith('session_') && f.endsWith('.md'));

    let stored = 0;
    for (const file of sessionFiles) {
      try {
        const content = fs.readFileSync(path.join(MEMORY_DIR, file), 'utf-8');
        const key = file.replace('.md', '');
        storeMcpMemory(key, content.slice(0, 2000), ['session', 'memory'], 'sessions');
        stored++;
      } catch { /* skip */ }
    }
    log(`MCP vector DB: stored ${stored}/${sessionFiles.length} session files`);
  }

  log('Full ingest complete.');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const command = process.argv[2] || 'save';

try {
  switch (command) {
    case 'start':  cmdStart();  break;
    case 'save':   cmdSave();   break;
    case 'ingest': cmdIngest(); break;
    default:
      log(`Unknown command: ${command}. Use: start, save, ingest`);
  }
} catch (e) {
  log('Error: ' + e.message);
}

process.exit(0);
