#!/usr/bin/env node
/**
 * Ruflow Memory Status - Shows database stats and recent activity.
 * Run: node scripts/memory-status.js
 */

const path = require('path');
const fs = require('fs');
const mq = require(path.join(__dirname, '..', '.claude', 'helpers', 'memory-query.cjs'));
const { DB_PATH } = require(path.join(__dirname, '..', '.claude', 'helpers', 'memory-init.cjs'));

const C = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  green: '\x1b[32m', cyan: '\x1b[36m', yellow: '\x1b[33m',
  red: '\x1b[31m', bgBlue: '\x1b[44m', white: '\x1b[37m',
};

(async () => {
  try {
    console.log('\n' + C.bgBlue + C.white + C.bold + ' Ruflow Memory Status ' + C.reset + '\n');

    // Database info
    console.log(C.dim + 'Database: ' + C.cyan + DB_PATH + C.reset);
    if (fs.existsSync(DB_PATH)) {
      const size = fs.statSync(DB_PATH).size;
      console.log(C.dim + 'Size:     ' + C.cyan + (size / 1024).toFixed(1) + ' KB' + C.reset);
    } else {
      console.log(C.red + 'Database not found! Run: node .claude/helpers/memory-init.cjs' + C.reset);
      process.exit(1);
    }

    // Stats
    const stats = await mq.getStats();
    console.log('\n' + C.bold + 'Record Counts:' + C.reset);
    for (const [table, count] of Object.entries(stats)) {
      console.log('  ' + table.padEnd(16) + C.cyan + count + C.reset);
    }

    // Recent sessions
    const sessions = await mq.getRecentSessions(5);
    if (sessions.length > 0) {
      console.log('\n' + C.bold + 'Recent Sessions:' + C.reset);
      for (const s of sessions) {
        const summary = s.summary ? s.summary.slice(0, 60) : 'No summary';
        const date = s.started_at ? s.started_at.slice(0, 19) : 'unknown';
        console.log('  ' + C.cyan + date + C.reset + '  ' + summary);
      }
    }

    // Skill stats
    const skills = await mq.getSkillStats();
    if (skills.length > 0) {
      console.log('\n' + C.bold + 'Most Used Skills:' + C.reset);
      for (const s of skills.slice(0, 10)) {
        console.log('  ' + s.skill_name.padEnd(30) + C.cyan + s.usage_count + C.reset + ' uses');
      }
    }

    // Recent learnings
    const learnings = await mq.getImportantLearnings(3);
    if (learnings.length > 0) {
      console.log('\n' + C.bold + 'Important Learnings:' + C.reset);
      for (const l of learnings) {
        console.log('  [' + C.yellow + l.importance + C.reset + '] ' + l.content.slice(0, 80));
      }
    }

    console.log('\n' + C.green + C.bold + 'Memory system operational.' + C.reset + '\n');

  } catch (e) { console.error(C.red + 'Status check failed: ' + e.message + C.reset); process.exit(1); }
})();