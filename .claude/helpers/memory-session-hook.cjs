#!/usr/bin/env node
/**
 * Ruflow Memory System - Session Hook Integration
 * Hooks into session lifecycle to record activity in the memory database.
 */

const path = require('path');
const mq = require(path.join(__dirname, 'memory-query.cjs'));

// Current session ID (set on session-start)
let currentSessionId = null;

// --- Hook: session-start ---
async function onSessionStart(opts) {
  const id = (opts && opts.id) || 'session-' + Date.now();
  currentSessionId = id;
  await mq.storeSession({
    id: id,
    model: (opts && opts.model) || null,
    branch: (opts && opts.branch) || null,
    working_dir: (opts && opts.working_dir) || process.cwd(),
  });

  // Load recent context for the session
  const recentSessions = await mq.getRecentSessions(3);
  const importantLearnings = await mq.getImportantLearnings(5);

  console.log('Session started: ' + id);
  if (recentSessions.length > 0) {
    console.log('Recent sessions: ' + recentSessions.map(s => s.summary || s.id).join(', '));
  }
  if (importantLearnings.length > 0) {
    console.log('Key learnings loaded: ' + importantLearnings.length);
  }

  return { sessionId: id, recentSessions, importantLearnings };
}

// --- Hook: session-end ---
async function onSessionEnd(opts) {
  const id = (opts && opts.id) || currentSessionId;
  if (!id) return;
  const summary = (opts && opts.summary) || null;
  await mq.endSession(id, summary);
  console.log('Session ended: ' + id);
  currentSessionId = null;
}

// --- Hook: post-task ---
async function onPostTask(opts) {
  const { description, result, skills_used, agents_used, files_modified, success } = opts || {};
  if (!description) return;

  const taskId = await mq.storeTask({
    session_id: currentSessionId,
    description: description,
    status: success === false ? 'failed' : 'completed',
    result: result || null,
    skills_used: skills_used || null,
    agents_used: agents_used || null,
    files_modified: files_modified || null,
  });

  // Track skill usage if provided
  if (skills_used && Array.isArray(skills_used)) {
    for (const skill of skills_used) {
      await mq.trackSkillUsage({
        skill_name: skill,
        session_id: currentSessionId,
        task_id: taskId,
        success: success !== false,
      });
    }
  }

  console.log('Task recorded: ' + description.slice(0, 80));
  return taskId;
}

// --- Hook: post-edit ---
async function onPostEdit(opts) {
  const { file_path, description } = opts || {};
  if (!file_path) return;

  await mq.storeKnowledge({
    category: 'file_edits',
    key: file_path,
    value: description || 'File modified',
    metadata: { session_id: currentSessionId, timestamp: mq.now() },
  });
}

// --- Hook: on-error ---
async function onError(opts) {
  const { error_type, error_message, fix_applied, file_path } = opts || {};
  if (!error_message) return;

  await mq.storeError({
    session_id: currentSessionId,
    error_type: error_type,
    error_message: error_message,
    fix_applied: fix_applied,
    file_path: file_path,
  });

  console.log('Error recorded: ' + (error_type || 'unknown') + ' - ' + error_message.slice(0, 80));
}

// --- Hook: on-learning ---
async function onLearning(opts) {
  const { category, content, importance, tags } = opts || {};
  if (!content) return;

  return await mq.storeLearning({
    session_id: currentSessionId,
    category: category || 'general',
    content: content,
    importance: importance || 'normal',
    tags: tags,
  });
}

function getCurrentSessionId() { return currentSessionId; }

module.exports = {
  onSessionStart, onSessionEnd, onPostTask, onPostEdit, onError, onLearning,
  getCurrentSessionId,
};

// CLI
if (require.main === module) {
  const [,, cmd, ...args] = process.argv;
  (async () => {
    try {
      switch (cmd) {
        case 'start':
          await onSessionStart({ id: args[0] || 'session-' + Date.now() });
          break;
        case 'end':
          currentSessionId = args[0] || 'session-unknown';
          await onSessionEnd({ id: args[0], summary: args[1] });
          break;
        case 'task':
          currentSessionId = 'cli-session';
          await onPostTask({ description: args.join(" ") || "CLI task" });
          break;
        default:
          console.log('Usage: memory-session-hook.cjs <start|end|task> [args...]');
      }
    } catch (e) { console.error('Error:', e.message); process.exit(1); }
  })();
}