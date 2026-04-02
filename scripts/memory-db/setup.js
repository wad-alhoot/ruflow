#!/usr/bin/env node
/**
 * setup.js - Initialize AgentDB with HNSW-compatible indexes.
 * Creates the SQLite database and ingests all existing memory files and session transcripts.
 *
 * Usage:
 *   node scripts/memory-db/setup.js
 */

const fs = require("fs");
const path = require("path");
const {
  C, log, ok, warn, err,
  PROJECTS_DIR, MEMORY_DIR, DB_PATH,
  getDb, saveDb, createTables,
  ingestMemoryFile, ingestSessionFile,
} = require("./lib.js");

async function main() {
  console.log(`\n${C.bgBlue}${C.white}${C.bold} AgentDB Setup ${C.reset}\n`);

  // -----------------------------------------------------------------------
  // 1. Initialize database
  // -----------------------------------------------------------------------
  log("Initializing sql.js (WASM SQLite)...");
  const db = await getDb();

  log("Creating tables and indexes...");
  createTables(db);
  ok("Database schema ready.");

  // -----------------------------------------------------------------------
  // 2. Ingest memory .md files
  // -----------------------------------------------------------------------
  log(`\nScanning memory directory: ${C.cyan}${MEMORY_DIR}${C.reset}`);
  let mdCount = 0;

  if (fs.existsSync(MEMORY_DIR)) {
    const mdFiles = fs.readdirSync(MEMORY_DIR).filter(f => f.endsWith(".md"));
    for (const file of mdFiles) {
      const filePath = path.join(MEMORY_DIR, file);
      try {
        ingestMemoryFile(db, filePath);
        ok(`Ingested: ${file}`);
        mdCount++;
      } catch (e) {
        warn(`Failed to ingest ${file}: ${e.message}`);
      }
    }
  } else {
    warn(`Memory directory not found: ${MEMORY_DIR}`);
  }

  // -----------------------------------------------------------------------
  // 3. Ingest .jsonl session transcripts
  // -----------------------------------------------------------------------
  log(`\nScanning for session transcripts: ${C.cyan}${PROJECTS_DIR}${C.reset}`);
  let jsonlCount = 0;

  if (fs.existsSync(PROJECTS_DIR)) {
    const jsonlFiles = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith(".jsonl"));
    for (const file of jsonlFiles) {
      const filePath = path.join(PROJECTS_DIR, file);
      try {
        ingestSessionFile(db, filePath);
        ok(`Ingested session: ${file}`);
        jsonlCount++;
      } catch (e) {
        warn(`Failed to ingest session ${file}: ${e.message}`);
      }
    }
  }

  // -----------------------------------------------------------------------
  // 4. Save and report
  // -----------------------------------------------------------------------
  saveDb(db);

  // Stats
  const memCount = db.exec("SELECT COUNT(*) FROM memories")[0].values[0][0];
  const chunkCount = db.exec("SELECT COUNT(*) FROM search_index")[0].values[0][0];
  const sessCount = db.exec("SELECT COUNT(*) FROM sessions")[0].values[0][0];

  console.log(`\n${C.bold}${C.green}Setup Complete${C.reset}`);
  console.log(`${C.dim}--------------------------------------${C.reset}`);
  console.log(`  Memory files ingested:  ${C.cyan}${mdCount}${C.reset}`);
  console.log(`  Session files ingested: ${C.cyan}${jsonlCount}${C.reset}`);
  console.log(`  Total memories:         ${C.cyan}${memCount}${C.reset}`);
  console.log(`  Total search chunks:    ${C.cyan}${chunkCount}${C.reset}`);
  console.log(`  Total sessions:         ${C.cyan}${sessCount}${C.reset}`);
  console.log(`  Database:               ${C.cyan}${DB_PATH}${C.reset}`);
  console.log(`${C.dim}--------------------------------------${C.reset}\n`);
}

main().catch(e => {
  err(`Setup failed: ${e.message}`);
  console.error(e);
  process.exit(1);
});
