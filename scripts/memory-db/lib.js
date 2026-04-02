/**
 * Shared library for AgentDB memory system.
 * Provides: database initialization, TF-IDF engine, text chunking, ingestion helpers.
 */

const path = require("path");
const fs = require("fs");

// ---------------------------------------------------------------------------
// ANSI color helpers
// ---------------------------------------------------------------------------
const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
  white: "\x1b[37m",
  bgBlue: "\x1b[44m",
};

function log(msg) { console.log(`${C.dim}[agentdb]${C.reset} ${msg}`); }
function ok(msg)  { console.log(`${C.green}  [ok]${C.reset} ${msg}`); }
function warn(msg){ console.log(`${C.yellow}  [warn]${C.reset} ${msg}`); }
function err(msg) { console.error(`${C.red}  [err]${C.reset} ${msg}`); }

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const PROJECTS_DIR = path.join(
  "C:", "Users", "Qadri Laptop", ".claude", "projects",
  "D--Personal-Smarter-revolution-Ruflow"
);
const MEMORY_DIR = path.join(PROJECTS_DIR, "memory");
const DB_PATH = path.join(MEMORY_DIR, "agentdb.sqlite");

// ---------------------------------------------------------------------------
// Database initialization (sql.js WASM)
// ---------------------------------------------------------------------------
let _dbInstance = null;

async function getDb() {
  if (_dbInstance) return _dbInstance;

  const initSqlJs = require("sql.js");
  const SQL = await initSqlJs();

  let db;
  if (fs.existsSync(DB_PATH)) {
    const buf = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buf);
    log(`Opened existing database at ${C.cyan}${DB_PATH}${C.reset}`);
  } else {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    db = new SQL.Database();
    log(`Created new database at ${C.cyan}${DB_PATH}${C.reset}`);
  }

  _dbInstance = db;
  return db;
}

function saveDb(db) {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

function createTables(db) {
  db.run(`
    CREATE TABLE IF NOT EXISTS memories (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      type          TEXT NOT NULL DEFAULT 'project',
      name          TEXT NOT NULL,
      description   TEXT,
      content       TEXT NOT NULL,
      source_path   TEXT,
      created_at    TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at    TEXT NOT NULL DEFAULT (datetime('now')),
      session_id    TEXT,
      tags          TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id            TEXT PRIMARY KEY,
      started_at    TEXT,
      summary       TEXT,
      topics        TEXT,
      files_changed TEXT,
      commands_run  TEXT,
      model         TEXT,
      branch        TEXT,
      message_count INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS search_index (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      memory_id     INTEGER NOT NULL,
      chunk_text    TEXT NOT NULL,
      chunk_index   INTEGER NOT NULL DEFAULT 0,
      tokens        TEXT,
      FOREIGN KEY (memory_id) REFERENCES memories(id) ON DELETE CASCADE
    )
  `);

  // Indexes for fast lookups
  db.run(`CREATE INDEX IF NOT EXISTS idx_memories_type ON memories(type)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_memories_session ON memories(session_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_memories_created ON memories(created_at)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_search_memory ON search_index(memory_id)`);
  db.run(`CREATE UNIQUE INDEX IF NOT EXISTS idx_memories_source ON memories(source_path)`);
}

// ---------------------------------------------------------------------------
// Text processing / TF-IDF engine
// ---------------------------------------------------------------------------

// Common English stop words
const STOP_WORDS = new Set([
  "a","an","the","and","or","but","in","on","at","to","for","of","with","by",
  "from","is","it","its","was","are","were","be","been","being","have","has",
  "had","do","does","did","will","would","shall","should","may","might","can",
  "could","this","that","these","those","i","me","my","we","our","you","your",
  "he","him","his","she","her","they","them","their","not","no","so","if",
  "than","then","just","also","very","too","any","each","all","both","few",
  "more","most","some","such","only","own","same","as","up","out","about",
  "into","over","after","before","between","under","again","further","once",
  "here","there","when","where","why","how","what","which","who","whom",
  "because","until","while","during","through","above","below","down","off",
]);

function tokenize(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(t => t.length > 1 && !STOP_WORDS.has(t));
}

function termFrequency(tokens) {
  const tf = {};
  for (const t of tokens) {
    tf[t] = (tf[t] || 0) + 1;
  }
  const len = tokens.length || 1;
  for (const t in tf) {
    tf[t] /= len;
  }
  return tf;
}

function cosineSimilarity(tfA, tfB) {
  const allTerms = new Set([...Object.keys(tfA), ...Object.keys(tfB)]);
  let dot = 0, magA = 0, magB = 0;
  for (const t of allTerms) {
    const a = tfA[t] || 0;
    const b = tfB[t] || 0;
    dot += a * b;
    magA += a * a;
    magB += b * b;
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return denom === 0 ? 0 : dot / denom;
}

// ---------------------------------------------------------------------------
// Chunking
// ---------------------------------------------------------------------------
function chunkText(text, chunkSize = 500, overlap = 100) {
  if (!text) return [];
  const words = text.split(/\s+/);
  if (words.length <= chunkSize) return [text];

  const chunks = [];
  let start = 0;
  while (start < words.length) {
    const end = Math.min(start + chunkSize, words.length);
    chunks.push(words.slice(start, end).join(" "));
    start += chunkSize - overlap;
  }
  return chunks;
}

// ---------------------------------------------------------------------------
// Frontmatter parser (simple YAML-like)
// ---------------------------------------------------------------------------
function parseFrontmatter(content) {
  const meta = {};
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!match) return { meta, body: content };

  const yamlBlock = match[1];
  for (const line of yamlBlock.split("\n")) {
    const idx = line.indexOf(":");
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim();
      meta[key] = val;
    }
  }
  const body = content.slice(match[0].length);
  return { meta, body };
}

// ---------------------------------------------------------------------------
// JSONL session parser
// ---------------------------------------------------------------------------
function parseSessionJsonl(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const lines = raw.split("\n").filter(l => l.trim());

  let title = "Untitled Session";
  let model = "unknown";
  let branch = "unknown";
  const userMessages = [];
  const assistantSnippets = [];
  const filesTouched = new Set();
  const commands = new Set();

  for (const line of lines) {
    try {
      const obj = JSON.parse(line);

      // Title
      if (obj.aiTitle) title = obj.aiTitle;
      if (obj.model) model = obj.model;
      if (obj.gitBranch) branch = obj.gitBranch;

      // User messages
      if (obj.type === "user") {
        if (typeof obj.content === "string" && obj.content.length > 3) {
          userMessages.push(obj.content.slice(0, 300));
        } else if (Array.isArray(obj.content)) {
          for (const block of obj.content) {
            if (block.text && block.text.length > 3) {
              userMessages.push(block.text.slice(0, 300));
            }
          }
        }
      }

      // Assistant text
      if (obj.type === "assistant" && Array.isArray(obj.content)) {
        for (const block of obj.content) {
          if (block.type === "text" && block.text) {
            assistantSnippets.push(block.text.slice(0, 500));
          }
        }
      }

      // File paths from tool use
      const lineStr = line;
      const fpMatches = lineStr.matchAll(/"(?:file_path|path|file)":"([^"]+)"/g);
      for (const m of fpMatches) filesTouched.add(m[1]);

      const cmdMatches = lineStr.matchAll(/"command":"([^"]{1,300})"/g);
      for (const m of cmdMatches) commands.add(m[1]);
    } catch { /* skip malformed lines */ }
  }

  const fullText = [
    `Session: ${title}`,
    `Model: ${model}`,
    `Branch: ${branch}`,
    "",
    "User Messages:",
    ...userMessages,
    "",
    "Assistant Responses:",
    ...assistantSnippets.slice(0, 30),
    "",
    "Files Touched:",
    ...[...filesTouched],
    "",
    "Commands:",
    ...[...commands],
  ].join("\n");

  return {
    sessionId: path.basename(filePath, ".jsonl"),
    title,
    model,
    branch,
    userMessages,
    filesTouched: [...filesTouched],
    commands: [...commands],
    messageCount: lines.length,
    fullText,
  };
}

// ---------------------------------------------------------------------------
// Ingestion helpers
// ---------------------------------------------------------------------------

function ingestMemoryFile(db, filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const { meta, body } = parseFrontmatter(content);

  const name = meta.name || path.basename(filePath, ".md");
  const type = meta.type || "project";
  const description = meta.description || "";
  const sessionId = meta.session_id || null;
  const tags = meta.tags || null;
  const createdAt = meta.date || new Date().toISOString();

  // Upsert by source_path
  const existing = db.exec(
    `SELECT id FROM memories WHERE source_path = ?`, [filePath]
  );

  let memoryId;
  if (existing.length > 0 && existing[0].values.length > 0) {
    memoryId = existing[0].values[0][0];
    db.run(
      `UPDATE memories SET name=?, type=?, description=?, content=?, session_id=?, tags=?, updated_at=datetime('now')
       WHERE id=?`,
      [name, type, description, content, sessionId, tags, memoryId]
    );
    // Clear old chunks
    db.run(`DELETE FROM search_index WHERE memory_id=?`, [memoryId]);
  } else {
    db.run(
      `INSERT INTO memories (type, name, description, content, source_path, session_id, tags, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [type, name, description, content, filePath, sessionId, tags, createdAt]
    );
    const res = db.exec(`SELECT last_insert_rowid()`);
    memoryId = res[0].values[0][0];
  }

  // Chunk and index
  const chunks = chunkText(body);
  const stmtInsert = db.prepare(
    `INSERT INTO search_index (memory_id, chunk_text, chunk_index, tokens) VALUES (?, ?, ?, ?)`
  );
  for (let i = 0; i < chunks.length; i++) {
    const tokens = tokenize(chunks[i]);
    stmtInsert.run([memoryId, chunks[i], i, JSON.stringify(tokens)]);
  }
  stmtInsert.free();

  return memoryId;
}

function ingestSessionFile(db, filePath) {
  const session = parseSessionJsonl(filePath);

  // Upsert session record
  const existing = db.exec(
    `SELECT id FROM sessions WHERE id = ?`, [session.sessionId]
  );

  if (existing.length > 0 && existing[0].values.length > 0) {
    db.run(
      `UPDATE sessions SET summary=?, topics=?, files_changed=?, commands_run=?, model=?, branch=?, message_count=?
       WHERE id=?`,
      [
        session.title,
        session.userMessages.join("\n"),
        session.filesTouched.join("\n"),
        session.commands.join("\n"),
        session.model,
        session.branch,
        session.messageCount,
        session.sessionId,
      ]
    );
  } else {
    db.run(
      `INSERT INTO sessions (id, started_at, summary, topics, files_changed, commands_run, model, branch, message_count)
       VALUES (?, datetime('now'), ?, ?, ?, ?, ?, ?, ?)`,
      [
        session.sessionId,
        session.title,
        session.userMessages.join("\n"),
        session.filesTouched.join("\n"),
        session.commands.join("\n"),
        session.model,
        session.branch,
        session.messageCount,
      ]
    );
  }

  // Also store as a memory record for unified search
  const existing2 = db.exec(
    `SELECT id FROM memories WHERE source_path = ?`, [filePath]
  );

  let memoryId;
  if (existing2.length > 0 && existing2[0].values.length > 0) {
    memoryId = existing2[0].values[0][0];
    db.run(
      `UPDATE memories SET name=?, content=?, session_id=?, updated_at=datetime('now') WHERE id=?`,
      [`Session: ${session.title}`, session.fullText, session.sessionId, memoryId]
    );
    db.run(`DELETE FROM search_index WHERE memory_id=?`, [memoryId]);
  } else {
    db.run(
      `INSERT INTO memories (type, name, description, content, source_path, session_id, tags)
       VALUES ('session', ?, ?, ?, ?, ?, 'session,transcript')`,
      [
        `Session: ${session.title}`,
        `Session transcript: ${session.title}`,
        session.fullText,
        filePath,
        session.sessionId,
      ]
    );
    const res = db.exec(`SELECT last_insert_rowid()`);
    memoryId = res[0].values[0][0];
  }

  // Chunk and index the full session text
  const chunks = chunkText(session.fullText);
  const stmtInsert = db.prepare(
    `INSERT INTO search_index (memory_id, chunk_text, chunk_index, tokens) VALUES (?, ?, ?, ?)`
  );
  for (let i = 0; i < chunks.length; i++) {
    const tokens = tokenize(chunks[i]);
    stmtInsert.run([memoryId, chunks[i], i, JSON.stringify(tokens)]);
  }
  stmtInsert.free();

  return memoryId;
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

function search(db, query, { type = null, recentDays = null, limit = 5 } = {}) {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const queryTf = termFrequency(queryTokens);

  // Build WHERE clause
  let where = "1=1";
  const params = [];
  if (type) {
    where += " AND m.type = ?";
    params.push(type);
  }
  if (recentDays) {
    where += " AND m.created_at >= datetime('now', ?)";
    params.push(`-${recentDays} days`);
  }

  const rows = db.exec(`
    SELECT si.id, si.memory_id, si.chunk_text, si.tokens, si.chunk_index,
           m.name, m.type, m.description, m.source_path, m.session_id, m.created_at
    FROM search_index si
    JOIN memories m ON m.id = si.memory_id
    WHERE ${where}
  `, params);

  if (!rows.length || !rows[0].values.length) return [];

  const columns = rows[0].columns;
  const results = [];

  for (const row of rows[0].values) {
    const obj = {};
    columns.forEach((col, i) => { obj[col] = row[i]; });

    let chunkTokens;
    try {
      chunkTokens = JSON.parse(obj.tokens);
    } catch {
      chunkTokens = tokenize(obj.chunk_text);
    }

    const chunkTf = termFrequency(chunkTokens);
    const score = cosineSimilarity(queryTf, chunkTf);

    if (score > 0.01) {
      results.push({
        memoryId: obj.memory_id,
        name: obj.name,
        type: obj.type,
        description: obj.description,
        sourcePath: obj.source_path,
        sessionId: obj.session_id,
        createdAt: obj.created_at,
        chunkIndex: obj.chunk_index,
        snippet: obj.chunk_text.slice(0, 300),
        score,
      });
    }
  }

  // Deduplicate by memory_id (keep highest score per memory)
  const best = new Map();
  for (const r of results) {
    const existing = best.get(r.memoryId);
    if (!existing || r.score > existing.score) {
      best.set(r.memoryId, r);
    }
  }

  return [...best.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

module.exports = {
  C, log, ok, warn, err,
  PROJECTS_DIR, MEMORY_DIR, DB_PATH,
  getDb, saveDb, createTables,
  tokenize, termFrequency, cosineSimilarity,
  chunkText, parseFrontmatter, parseSessionJsonl,
  ingestMemoryFile, ingestSessionFile,
  search,
};
