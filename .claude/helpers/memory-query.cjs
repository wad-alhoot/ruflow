#!/usr/bin/env node
/**
 * Ruflow Memory System - Query Helper
 * Provides functions to store and retrieve sessions, tasks, learnings,
 * errors, skills usage, and knowledge entries.
 */

const path = require('path');
const { getDb, saveDb, DB_PATH } = require(path.join(__dirname, 'memory-init.cjs'));

function now() { return new Date().toISOString(); }

function queryOne(db, sql, params) {
  const result = db.exec(sql, params || []);
  if (!result.length || !result[0].values.length) return null;
  const cols = result[0].columns;
  const row = result[0].values[0];
  const obj = {};
  cols.forEach((c, i) => { obj[c] = row[i]; });
  return obj;
}

function queryAll(db, sql, params) {
  const result = db.exec(sql, params || []);
  if (!result.length || !result[0].values.length) return [];
  const cols = result[0].columns;
  return result[0].values.map(row => {
    const obj = {};
    cols.forEach((c, i) => { obj[c] = row[i]; });
    return obj;
  });
}

// --- Session operations ---
async function storeSession(opts) {
  const db = await getDb();
  const { id, summary, model, branch, working_dir } = opts;
  db.run('INSERT OR REPLACE INTO sessions (id, started_at, summary, model, branch, working_dir) VALUES (?, ?, ?, ?, ?, ?)',
    [id, now(), summary || null, model || null, branch || null, working_dir || null]);
  saveDb(db);
  return id;
}

async function endSession(id, summary) {
  const db = await getDb();
  const taskCount = queryOne(db, 'SELECT COUNT(*) as cnt FROM tasks WHERE session_id = ?', [id]);
  const errorCount = queryOne(db, 'SELECT COUNT(*) as cnt FROM errors WHERE session_id = ?', [id]);
  db.run('UPDATE sessions SET ended_at = ?, summary = ?, total_tasks = ?, total_errors = ? WHERE id = ?',
    [now(), summary || null, taskCount ? taskCount.cnt : 0, errorCount ? errorCount.cnt : 0, id]);
  saveDb(db);
}

async function getRecentSessions(limit) {
  const db = await getDb();
  return queryAll(db, 'SELECT * FROM sessions ORDER BY started_at DESC LIMIT ?', [limit || 10]);
}

async function getSession(id) {
  const db = await getDb();
  return queryOne(db, 'SELECT * FROM sessions WHERE id = ?', [id]);
}

// --- Task operations ---
async function storeTask(opts) {
  const db = await getDb();
  const { session_id, description, status, result, skills_used, agents_used, files_modified } = opts;
  db.run('INSERT INTO tasks (session_id, description, status, started_at, result, skills_used, agents_used, files_modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [session_id || null, description, status || 'in_progress', now(), result || null,
     skills_used ? JSON.stringify(skills_used) : null,
     agents_used ? JSON.stringify(agents_used) : null,
     files_modified ? JSON.stringify(files_modified) : null]);
  saveDb(db);
  const row = queryOne(db, 'SELECT last_insert_rowid() as id');
  return row ? row.id : null;
}

async function completeTask(taskId, result, filesModified) {
  const db = await getDb();
  db.run("UPDATE tasks SET status = 'completed', completed_at = ?, result = ?, files_modified = ? WHERE id = ?",
    [now(), result || null, filesModified ? JSON.stringify(filesModified) : null, taskId]);
  saveDb(db);
}

async function getRecentTasks(limit) {
  const db = await getDb();
  return queryAll(db, 'SELECT * FROM tasks ORDER BY started_at DESC LIMIT ?', [limit || 20]);
}

// --- Learning operations ---
async function storeLearning(opts) {
  const db = await getDb();
  const { session_id, category, content, importance, tags } = opts;
  db.run('INSERT INTO learnings (session_id, category, content, importance, created_at, tags) VALUES (?, ?, ?, ?, ?, ?)',
    [session_id || null, category, content, importance || 'normal', now(), tags ? JSON.stringify(tags) : null]);
  saveDb(db);
  const row = queryOne(db, 'SELECT last_insert_rowid() as id');
  return row ? row.id : null;
}

async function searchLearnings(keyword, opts) {
  const db = await getDb();
  const limit = (opts && opts.limit) || 10;
  const category = opts && opts.category;
  let sql = 'SELECT * FROM learnings WHERE content LIKE ?';
  const params = ['%' + keyword + '%'];
  if (category) { sql += ' AND category = ?'; params.push(category); }
  sql += ' ORDER BY created_at DESC LIMIT ?';
  params.push(limit);
  return queryAll(db, sql, params);
}

async function getImportantLearnings(limit) {
  const db = await getDb();
  return queryAll(db, "SELECT * FROM learnings WHERE importance IN ('critical', 'high') ORDER BY created_at DESC LIMIT ?", [limit || 20]);
}

// --- Error operations ---
async function storeError(opts) {
  const db = await getDb();
  const { session_id, error_type, error_message, fix_applied, file_path } = opts;
  db.run('INSERT INTO errors (session_id, error_type, error_message, fix_applied, file_path, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [session_id || null, error_type || 'unknown', error_message, fix_applied || null, file_path || null, now()]);
  saveDb(db);
}

async function searchErrors(keyword, limit) {
  const db = await getDb();
  return queryAll(db, 'SELECT * FROM errors WHERE error_message LIKE ? OR fix_applied LIKE ? ORDER BY created_at DESC LIMIT ?',
    ['%' + keyword + '%', '%' + keyword + '%', limit || 10]);
}

// --- Skills usage ---
async function trackSkillUsage(opts) {
  const db = await getDb();
  const { skill_name, session_id, task_id, success, context } = opts;
  db.run('INSERT INTO skills_used (skill_name, used_at, session_id, task_id, success, context) VALUES (?, ?, ?, ?, ?, ?)',
    [skill_name, now(), session_id || null, task_id || null, success !== undefined ? (success ? 1 : 0) : 1, context || null]);
  saveDb(db);
}

async function getSkillStats() {
  const db = await getDb();
  return queryAll(db, 'SELECT skill_name, COUNT(*) as usage_count, SUM(success) as success_count, MAX(used_at) as last_used FROM skills_used GROUP BY skill_name ORDER BY usage_count DESC');
}

// --- Knowledge base ---
async function storeKnowledge(opts) {
  const db = await getDb();
  const { category, key, value, metadata } = opts;
  db.run('INSERT OR REPLACE INTO knowledge (category, key, value, metadata, updated_at) VALUES (?, ?, ?, ?, ?)',
    [category, key, value, metadata ? JSON.stringify(metadata) : null, now()]);
  saveDb(db);
}

async function getKnowledge(category, key) {
  const db = await getDb();
  if (key) return queryOne(db, 'SELECT * FROM knowledge WHERE category = ? AND key = ?', [category, key]);
  return queryAll(db, 'SELECT * FROM knowledge WHERE category = ? ORDER BY updated_at DESC', [category]);
}

async function searchKnowledge(keyword, limit) {
  const db = await getDb();
  return queryAll(db, 'SELECT * FROM knowledge WHERE value LIKE ? OR key LIKE ? ORDER BY updated_at DESC LIMIT ?',
    ['%' + keyword + '%', '%' + keyword + '%', limit || 10]);
}

// --- Stats ---
async function getStats() {
  const db = await getDb();
  const tables = ['sessions','conversations','tasks','skills_used','learnings','errors','embeddings','knowledge'];
  const stats = {};
  for (const table of tables) {
    try {
      const row = queryOne(db, 'SELECT COUNT(*) as cnt FROM ' + table);
      stats[table] = row ? row.cnt : 0;
    } catch (e) { stats[table] = 0; }
  }
  return stats;
}

module.exports = {
  storeSession, endSession, getRecentSessions, getSession,
  storeTask, completeTask, getRecentTasks,
  storeLearning, searchLearnings, getImportantLearnings,
  storeError, searchErrors,
  trackSkillUsage, getSkillStats,
  storeKnowledge, getKnowledge, searchKnowledge,
  getStats, queryOne, queryAll, now,
};

if (require.main === module) {
  const [,, cmd, ...args] = process.argv;
  (async () => {
    try {
      switch (cmd) {
        case 'stats': console.log(JSON.stringify(await getStats(), null, 2)); break;
        case 'sessions': console.log(JSON.stringify(await getRecentSessions(parseInt(args[0]) || 5), null, 2)); break;
        case 'search-learnings': console.log(JSON.stringify(await searchLearnings(args[0] || ''), null, 2)); break;
        case 'search-errors': console.log(JSON.stringify(await searchErrors(args[0] || ''), null, 2)); break;
        case 'skills': console.log(JSON.stringify(await getSkillStats(), null, 2)); break;
        case 'knowledge': console.log(JSON.stringify(await getKnowledge(args[0], args[1]), null, 2)); break;
        default: console.log('Commands: stats, sessions, search-learnings, search-errors, skills, knowledge');
      }
    } catch (e) { console.error('Error:', e.message); process.exit(1); }
  })();
}