#!/usr/bin/env node
/**
 * Karpathy Coding Principles — Hook Enforcement Module
 *
 * Injects principle-aware guidance into hook events:
 *   route      → Think Before Coding (surface assumptions)
 *   pre-task   → Goal-Driven Execution (require success criteria)
 *   post-edit  → Surgical Changes (flag scope creep)
 *   post-task  → Simplicity First (verify minimal solution)
 */

const PRINCIPLES = {
  THINK: {
    name: 'Think Before Coding',
    short: 'State assumptions before implementing. If uncertain, ask.',
  },
  SIMPLICITY: {
    name: 'Simplicity First',
    short: 'Minimum code that solves the problem. Nothing speculative.',
  },
  SURGICAL: {
    name: 'Surgical Changes',
    short: 'Every changed line must trace to the request.',
  },
  GOAL: {
    name: 'Goal-Driven Execution',
    short: 'Define success criteria. Loop until verified.',
  },
};

// Complexity signals — tasks that benefit most from principle reminders
const COMPLEXITY_SIGNALS = [
  /multi.?file/i, /refactor/i, /redesign/i, /migrate/i,
  /architect/i, /overhaul/i, /rewrite/i, /implement.*feature/i,
  /add.*support.*for/i, /integrate/i, /security/i, /performance/i,
];

function isComplex(task) {
  if (!task) return false;
  return COMPLEXITY_SIGNALS.some(function(rx) { return rx.test(task); });
}

/**
 * Route hook — Think Before Coding
 * Returns guidance string to inject into route output
 */
function onRoute(task) {
  if (!task || task.length < 10) return '';
  var lines = [];
  if (isComplex(task)) {
    lines.push('[KARPATHY] Complex task detected — principles active:');
    lines.push('  1. Think: State assumptions before coding');
    lines.push('  2. Simplicity: Minimum viable solution only');
    lines.push('  3. Surgical: Touch only what the request requires');
    lines.push('  4. Goal: Define verify steps before starting');
  }
  return lines.join('\n');
}

/**
 * Pre-task hook — Goal-Driven Execution
 * Reminds agent to define success criteria
 */
function onPreTask(task) {
  if (!task) return '';
  var lines = [];
  lines.push('[KARPATHY:GOAL] Define success criteria before executing:');
  lines.push('  Pattern: [Step] → verify: [check]');
  if (isComplex(task)) {
    lines.push('[KARPATHY:THINK] State assumptions explicitly. Ask if unclear.');
  }
  return lines.join('\n');
}

/**
 * Post-edit hook — Surgical Changes
 * Reminds to check that edits are scoped to the request
 */
function onPostEdit(filePath) {
  var lines = [];
  lines.push('[KARPATHY:SURGICAL] Verify: every changed line traces to the request');
  if (filePath) {
    lines.push('  File: ' + filePath);
  }
  return lines.join('\n');
}

/**
 * Post-task hook — Simplicity First
 * Reminds to verify the solution isn't overengineered
 */
function onPostTask(success) {
  var lines = [];
  if (success) {
    lines.push('[KARPATHY:SIMPLICITY] Check: could this be simpler?');
    lines.push('[KARPATHY:GOAL] Verify: success criteria met?');
  }
  return lines.join('\n');
}

module.exports = {
  PRINCIPLES: PRINCIPLES,
  isComplex: isComplex,
  onRoute: onRoute,
  onPreTask: onPreTask,
  onPostEdit: onPostEdit,
  onPostTask: onPostTask,
};
