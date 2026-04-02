#!/usr/bin/env node
/**
 * ingest.js - Ingest new content into AgentDB.
 *
 * Usage:
 *   node scripts/memory-db/ingest.js --file <path-to-md-file>
 *   node scripts/memory-db/ingest.js --session <path-to-jsonl-file>
 *   node scripts/memory-db/ingest.js --all
 */

const fs = require("fs");
const path = require("path");
const {
  C, log, ok, warn, err,
  PROJECTS_DIR, MEMORY_DIR,
  getDb, saveDb, createTables,
  ingestMemoryFile, ingestSessionFile,
} = require("./lib.js");

function parseArgs(argv) {
  const args = argv.slice(2);
  const opts = { file: null, session: null, all: false };

  let i = 0;
  while (i < args.length) {
    if (args[i] === "--file" && args[i + 1]) {
      opts.file = args[++i];
    } else if (args[i] === "--session" && args[i + 1]) {
      opts.session = args[++i];
    } else if (args[i] === "--all") {
      opts.all = true;
    } else if (args[i] === "--help" || args[i] === "-h") {
      console.log(`
${C.bold}AgentDB Ingest${C.reset}

${C.cyan}Usage:${C.reset}
  node ingest.js --file <path>       Ingest a single .md memory file
  node ingest.js --session <path>    Ingest a single .jsonl session transcript
  node ingest.js --all               Re-ingest all memory files and sessions

${C.cyan}Examples:${C.reset}
  node ingest.js --file memory/session_2026-03-29.md
  node ingest.js --session c6ea6f7f-300a-4172-bdbb-1de2b7cdba02.jsonl
  node ingest.js --all
`);
      process.exit(0);
    }
    i++;
  }

  return opts;
}

async function main() {
  const opts = parseArgs(process.argv);

  if (!opts.file && !opts.session && !opts.all) {
    err("No action specified. Use --file, --session, or --all.");
    err("Run with --help for usage.");
    process.exit(1);
  }

  const db = await getDb();
  createTables(db);

  let ingested = 0;

  if (opts.all) {
    console.log(`\n${C.bgBlue}${C.white}${C.bold} AgentDB Full Ingest ${C.reset}\n`);

    // Ingest all .md files
    if (fs.existsSync(MEMORY_DIR)) {
      const mdFiles = fs.readdirSync(MEMORY_DIR).filter(f => f.endsWith(".md"));
      log(`Found ${mdFiles.length} memory file(s) in ${MEMORY_DIR}`);
      for (const file of mdFiles) {
        const filePath = path.join(MEMORY_DIR, file);
        try {
          ingestMemoryFile(db, filePath);
          ok(`${file}`);
          ingested++;
        } catch (e) {
          warn(`Failed: ${file} - ${e.message}`);
        }
      }
    }

    // Ingest all .jsonl files
    if (fs.existsSync(PROJECTS_DIR)) {
      const jsonlFiles = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith(".jsonl"));
      log(`\nFound ${jsonlFiles.length} session file(s) in ${PROJECTS_DIR}`);
      for (const file of jsonlFiles) {
        const filePath = path.join(PROJECTS_DIR, file);
        try {
          ingestSessionFile(db, filePath);
          ok(`${file}`);
          ingested++;
        } catch (e) {
          warn(`Failed: ${file} - ${e.message}`);
        }
      }
    }
  }

  if (opts.file) {
    // Resolve the path - could be relative to MEMORY_DIR or absolute
    let filePath = opts.file;
    if (!path.isAbsolute(filePath)) {
      // Try relative to MEMORY_DIR first, then CWD
      const memPath = path.join(MEMORY_DIR, filePath);
      if (fs.existsSync(memPath)) {
        filePath = memPath;
      } else {
        filePath = path.resolve(filePath);
      }
    }

    if (!fs.existsSync(filePath)) {
      err(`File not found: ${filePath}`);
      process.exit(1);
    }

    log(`Ingesting memory file: ${C.cyan}${filePath}${C.reset}`);
    try {
      ingestMemoryFile(db, filePath);
      ok("Ingested successfully.");
      ingested++;
    } catch (e) {
      err(`Failed: ${e.message}`);
      process.exit(1);
    }
  }

  if (opts.session) {
    let filePath = opts.session;
    if (!path.isAbsolute(filePath)) {
      const projPath = path.join(PROJECTS_DIR, filePath);
      if (fs.existsSync(projPath)) {
        filePath = projPath;
      } else {
        filePath = path.resolve(filePath);
      }
    }

    if (!fs.existsSync(filePath)) {
      err(`Session file not found: ${filePath}`);
      process.exit(1);
    }

    log(`Ingesting session: ${C.cyan}${filePath}${C.reset}`);
    try {
      ingestSessionFile(db, filePath);
      ok("Ingested successfully.");
      ingested++;
    } catch (e) {
      err(`Failed: ${e.message}`);
      process.exit(1);
    }
  }

  saveDb(db);

  // Stats
  const memCount = db.exec("SELECT COUNT(*) FROM memories")[0].values[0][0];
  const chunkCount = db.exec("SELECT COUNT(*) FROM search_index")[0].values[0][0];

  console.log(`\n${C.green}${C.bold}Done.${C.reset} Ingested ${C.cyan}${ingested}${C.reset} file(s).`);
  console.log(`${C.dim}Total memories: ${memCount} | Total chunks: ${chunkCount}${C.reset}\n`);
}

main().catch(e => {
  err(`Ingest failed: ${e.message}`);
  process.exit(1);
});
