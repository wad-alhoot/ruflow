#!/usr/bin/env node
/**
 * Ruflow Memory System - Database Initialization
 *
 * Initializes the SQLite database (via sql.js WASM) with all tables needed
 * for persistent cross-session memory.
 *
 * Database location: data/memory/ruflow.db (project-local)
 */

const fs = require('fs');
const path = require('path');

function getProjectRoot() {
  let dir = __dirname;
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'package.json')) &&
        fs.existsSync(path.join(dir, '.claude'))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return path.resolve(__dirname, '..', '..');
}

const PROJECT_ROOT = getProjectRoot();
const DB_DIR = path.join(PROJECT_ROOT, 'data', 'memory');
const DB_PATH = path.join(DB_DIR, 'ruflow.db');
const SQLJS_PATH = path.join(PROJECT_ROOT, 'scripts', 'memory-db', 'node_modules', 'sql.js');

let _dbInstance = null;
let _SQL = null;

async function getSqlJs() {
  if (_SQL) return _SQL;
  const initSqlJs = require(SQLJS_PATH);
  _SQL = await initSqlJs();
  return _SQL;
}

async function getDb() {
  if (_dbInstance) return _dbInstance;
  const SQL = await getSqlJs();
  if (fs.existsSync(DB_PATH)) {
    const buf = fs.readFileSync(DB_PATH);
    _dbInstance = new SQL.Database(buf);
  } else {
    fs.mkdirSync(DB_DIR, { recursive: true });
    _dbInstance = new SQL.Database();
  }
  return _dbInstance;
}

function saveDb(db) {
  fs.mkdirSync(DB_DIR, { recursive: true });
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

function closeDb() {
  if (_dbInstance) {
    saveDb(_dbInstance);
    _dbInstance.close();
    _dbInstance = null;
  }
}

const SCHEMA_SQL = [
  "CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, started_at TEXT NOT NULL, ended_at TEXT, summary TEXT, model TEXT, total_tasks INTEGER DEFAULT 0, total_edits INTEGER DEFAULT 0, total_errors INTEGER DEFAULT 0, branch TEXT, working_dir TEXT)",
  "CREATE TABLE IF NOT EXISTS conversations (id INTEGER PRIMARY KEY AUTOINCREMENT, session_id TEXT, timestamp TEXT NOT NULL, role TEXT NOT NULL, content_summary TEXT, tokens_used INTEGER, FOREIGN KEY (session_id) REFERENCES sessions(id))",
  "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, session_id TEXT, description TEXT NOT NULL, status TEXT DEFAULT 'pending', started_at TEXT, completed_at TEXT, result TEXT, skills_used TEXT, agents_used TEXT, files_modified TEXT, FOREIGN KEY (session_id) REFERENCES sessions(id))",
  "CREATE TABLE IF NOT EXISTS skills_used (id INTEGER PRIMARY KEY AUTOINCREMENT, skill_name TEXT NOT NULL, used_at TEXT NOT NULL, session_id TEXT, task_id INTEGER, success INTEGER DEFAULT 1, context TEXT, FOREIGN KEY (session_id) REFERENCES sessions(id))",
  "CREATE TABLE IF NOT EXISTS learnings (id INTEGER PRIMARY KEY AUTOINCREMENT, session_id TEXT, category TEXT NOT NULL, content TEXT NOT NULL, importance TEXT DEFAULT 'normal', created_at TEXT NOT NULL, tags TEXT, FOREIGN KEY (session_id) REFERENCES sessions(id))",
  "CREATE TABLE IF NOT EXISTS errors (id INTEGER PRIMARY KEY AUTOINCREMENT, session_id TEXT, error_type TEXT, error_message TEXT, fix_applied TEXT, file_path TEXT, created_at TEXT NOT NULL, FOREIGN KEY (session_id) REFERENCES sessions(id))",
  "CREATE TABLE IF NOT EXISTS embeddings (id INTEGER PRIMARY KEY AUTOINCREMENT, source_type TEXT NOT NULL, source_id TEXT NOT NULL, content TEXT NOT NULL, embedding BLOB, created_at TEXT NOT NULL)",
  "CREATE TABLE IF NOT EXISTS knowledge (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT NOT NULL, key TEXT NOT NULL, value TEXT NOT NULL, metadata TEXT, updated_at TEXT NOT NULL, UNIQUE(category, key))",
  "CREATE TABLE IF NOT EXISTS search_chunks (id INTEGER PRIMARY KEY AUTOINCREMENT, source_table TEXT NOT NULL, source_id INTEGER NOT NULL, chunk_text TEXT NOT NULL, chunk_index INTEGER NOT NULL DEFAULT 0, tokens TEXT)",
];

const INDEX_SQL = [
  "CREATE INDEX IF NOT EXISTS idx_sessions_started ON sessions(started_at)",
  "CREATE INDEX IF NOT EXISTS idx_conversations_session ON conversations(session_id)",
  "CREATE INDEX IF NOT EXISTS idx_conversations_ts ON conversations(timestamp)",
  "CREATE INDEX IF NOT EXISTS idx_tasks_session ON tasks(session_id)",
  "CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status)",
  "CREATE INDEX IF NOT EXISTS idx_skills_name ON skills_used(skill_name)",
  "CREATE INDEX IF NOT EXISTS idx_skills_session ON skills_used(session_id)",
  "CREATE INDEX IF NOT EXISTS idx_learnings_category ON learnings(category)",
  "CREATE INDEX IF NOT EXISTS idx_learnings_session ON learnings(session_id)",
  "CREATE INDEX IF NOT EXISTS idx_learnings_importance ON learnings(importance)",
  "CREATE INDEX IF NOT EXISTS idx_errors_session ON errors(session_id)",
  "CREATE INDEX IF NOT EXISTS idx_errors_type ON errors(error_type)",
  "CREATE INDEX IF NOT EXISTS idx_embeddings_source ON embeddings(source_type, source_id)",
  "CREATE INDEX IF NOT EXISTS idx_knowledge_category ON knowledge(category)",
  "CREATE INDEX IF NOT EXISTS idx_search_chunks_source ON search_chunks(source_table, source_id)",
];

function createTables(db) {
  for (const sql of SCHEMA_SQL) db.run(sql);
  for (const sql of INDEX_SQL) db.run(sql);
}

async function init() {
  const db = await getDb();
  createTables(db);
  saveDb(db);
  return db;
}

module.exports = {
  PROJECT_ROOT, DB_DIR, DB_PATH, SQLJS_PATH,
  getDb, saveDb, closeDb, createTables, init,
};

if (require.main === module) {
  (async () => {
    try {
      console.log('Ruflow Memory Init');
      console.log('Project root:', PROJECT_ROOT);
      console.log('Database:', DB_PATH);

      const existed = fs.existsSync(DB_PATH);
      const db = await init();

      console.log(existed ? 'Database opened and schema verified.' : 'New database created with all tables.');

      const tables = ['sessions','conversations','tasks','skills_used','learnings','errors','embeddings','knowledge','search_chunks'];
      console.log('Table row counts:');
      for (const table of tables) {
        try {
          const result = db.exec('SELECT COUNT(*) FROM ' + table);
          console.log('  ' + table + ': ' + result[0].values[0][0]);
        } catch (e) {
          console.log('  ' + table + ': error');
        }
      }

      const size = fs.existsSync(DB_PATH) ? fs.statSync(DB_PATH).size : 0;
      console.log('Database size: ' + (size / 1024).toFixed(1) + ' KB');
      console.log('Memory system ready.');
      closeDb();
    } catch (e) {
      console.error('Init failed:', e.message);
      process.exit(1);
    }
  })();
}
