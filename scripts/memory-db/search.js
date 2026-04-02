#!/usr/bin/env node
/**
 * search.js - Semantic search across AgentDB memory.
 *
 * Usage:
 *   node scripts/memory-db/search.js "what pizza website did we build"
 *   node scripts/memory-db/search.js --type session "authentication"
 *   node scripts/memory-db/search.js --recent 7 "agents"
 *   node scripts/memory-db/search.js --limit 10 "memory system"
 */

const {
  C, log, err,
  getDb, search,
} = require("./lib.js");

function parseArgs(argv) {
  const args = argv.slice(2);
  const opts = { type: null, recentDays: null, limit: 5, query: null };

  let i = 0;
  while (i < args.length) {
    if (args[i] === "--type" && args[i + 1]) {
      opts.type = args[++i];
    } else if (args[i] === "--recent" && args[i + 1]) {
      opts.recentDays = parseInt(args[++i], 10);
    } else if (args[i] === "--limit" && args[i + 1]) {
      opts.limit = parseInt(args[++i], 10);
    } else if (args[i] === "--help" || args[i] === "-h") {
      console.log(`
${C.bold}AgentDB Search${C.reset}

${C.cyan}Usage:${C.reset}
  node search.js <query>
  node search.js --type session <query>
  node search.js --recent 7 <query>
  node search.js --limit 10 <query>

${C.cyan}Options:${C.reset}
  --type <type>     Filter by type: session, user, project, feedback
  --recent <days>   Only search entries from last N days
  --limit <n>       Max results (default: 5)
  --help            Show this help

${C.cyan}Examples:${C.reset}
  node search.js "pizza website"
  node search.js --type session "authentication"
  node search.js --recent 7 --limit 3 "agents"
`);
      process.exit(0);
    } else if (!args[i].startsWith("--")) {
      opts.query = args[i];
    }
    i++;
  }

  return opts;
}

async function main() {
  const opts = parseArgs(process.argv);

  if (!opts.query) {
    err("No query provided. Usage: node search.js <query>");
    err('Example: node search.js "pizza website"');
    process.exit(1);
  }

  const db = await getDb();

  console.log(`\n${C.bgBlue}${C.white}${C.bold} AgentDB Search ${C.reset}`);
  console.log(`${C.dim}Query: "${opts.query}"${C.reset}`);
  if (opts.type) console.log(`${C.dim}Filter: type=${opts.type}${C.reset}`);
  if (opts.recentDays) console.log(`${C.dim}Filter: last ${opts.recentDays} days${C.reset}`);
  console.log();

  const results = search(db, opts.query, {
    type: opts.type,
    recentDays: opts.recentDays,
    limit: opts.limit,
  });

  if (results.length === 0) {
    console.log(`${C.yellow}No results found.${C.reset}`);
    console.log(`${C.dim}Try broader terms or remove filters.${C.reset}\n`);
    return;
  }

  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    const scoreBar = "=".repeat(Math.round(r.score * 50));
    const scorePercent = (r.score * 100).toFixed(1);

    console.log(`${C.bold}${C.cyan}#${i + 1}${C.reset} ${C.bold}${r.name}${C.reset}`);
    console.log(`   ${C.dim}Type:${C.reset} ${r.type}  ${C.dim}Score:${C.reset} ${scorePercent}% ${C.green}${scoreBar}${C.reset}`);
    if (r.createdAt) console.log(`   ${C.dim}Date:${C.reset} ${r.createdAt}`);
    if (r.sessionId) console.log(`   ${C.dim}Session:${C.reset} ${r.sessionId}`);
    if (r.sourcePath) console.log(`   ${C.dim}Source:${C.reset} ${r.sourcePath}`);
    console.log(`   ${C.dim}---${C.reset}`);

    // Show snippet with query terms highlighted
    let snippet = r.snippet;
    const queryWords = opts.query.toLowerCase().split(/\s+/);
    for (const w of queryWords) {
      if (w.length > 2) {
        const re = new RegExp(`(${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
        snippet = snippet.replace(re, `${C.yellow}${C.bold}$1${C.reset}`);
      }
    }
    console.log(`   ${snippet}`);
    console.log();
  }

  console.log(`${C.dim}Found ${results.length} result(s).${C.reset}\n`);
}

main().catch(e => {
  err(`Search failed: ${e.message}`);
  process.exit(1);
});
