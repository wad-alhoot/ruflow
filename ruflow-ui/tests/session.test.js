const { describe, it, before, after, afterEach } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const SESSIONS_DIR = path.join(__dirname, '..', 'sessions');

// Track files created during tests for cleanup
const createdFiles = [];

// ---------------------------------------------------------------------------
// Helpers — mirror the server's session logic for unit-level testing
// ---------------------------------------------------------------------------

function sessionPath(id) {
  const safe = path.basename(id);
  return path.join(SESSIONS_DIR, `${safe}.json`);
}

function loadSession(id) {
  const p = sessionPath(id);
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf-8'));
  } catch (_) {
    return null;
  }
}

function saveSession(session) {
  session.updatedAt = new Date().toISOString();
  fs.writeFileSync(sessionPath(session.id), JSON.stringify(session, null, 2));
}

function deleteSession(id) {
  const p = sessionPath(id);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

function listSessions() {
  const files = fs.readdirSync(SESSIONS_DIR).filter(f => f.endsWith('.json'));
  const sessions = [];
  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(SESSIONS_DIR, file), 'utf-8');
      const data = JSON.parse(raw);
      sessions.push({
        id: data.id,
        name: data.name,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        messageCount: (data.messages || []).length,
      });
    } catch (_) {
      // skip corrupt files
    }
  }
  sessions.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  return sessions;
}

function createTestSession(overrides = {}) {
  const id = overrides.id || `test-session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const session = {
    id,
    name: overrides.name || 'Test Session',
    cliSessionId: overrides.cliSessionId || null,
    model: overrides.model || 'sonnet',
    messages: overrides.messages || [],
    createdAt: overrides.createdAt || new Date().toISOString(),
    updatedAt: overrides.updatedAt || new Date().toISOString(),
  };
  return session;
}

// ---------------------------------------------------------------------------
// Setup / Teardown
// ---------------------------------------------------------------------------

function cleanup() {
  for (const filePath of createdFiles) {
    try { fs.unlinkSync(filePath); } catch (_) {}
  }
  createdFiles.length = 0;
}

function trackSession(id) {
  createdFiles.push(sessionPath(id));
}

// ===========================================================================================
// Tests
// ===========================================================================================

describe('Session — create session file', () => {

  afterEach(() => { cleanup(); });

  it('should create a session file and read it back with all fields', () => {
    const session = createTestSession({ name: 'Create Test' });
    trackSession(session.id);

    saveSession(session);

    const filePath = sessionPath(session.id);
    assert.ok(fs.existsSync(filePath), 'Session file should exist on disk');

    const loaded = loadSession(session.id);
    assert.ok(loaded, 'loadSession should return the session');
    assert.strictEqual(loaded.id, session.id);
    assert.strictEqual(loaded.name, 'Create Test');
    assert.strictEqual(loaded.model, 'sonnet');
    assert.ok(loaded.createdAt, 'Should have createdAt');
    assert.ok(loaded.updatedAt, 'Should have updatedAt');
    assert.ok(Array.isArray(loaded.messages), 'messages should be an array');
  });

  it('should update updatedAt when saving', () => {
    const session = createTestSession();
    trackSession(session.id);
    session.updatedAt = '2020-01-01T00:00:00.000Z';

    saveSession(session);

    const loaded = loadSession(session.id);
    assert.notStrictEqual(loaded.updatedAt, '2020-01-01T00:00:00.000Z',
      'updatedAt should be refreshed on save');
  });
});

describe('Session — list sessions', () => {

  afterEach(() => { cleanup(); });

  it('should list multiple sessions sorted by updatedAt descending', async () => {
    // Create 3 sessions with different updatedAt times
    const ids = [];
    for (let i = 0; i < 3; i++) {
      const session = createTestSession({
        name: `Session ${i}`,
        // Stagger creation times by 1 second each
        updatedAt: new Date(Date.now() - (2 - i) * 1000).toISOString(),
      });
      trackSession(session.id);
      ids.push(session.id);
      // Write directly to preserve the updatedAt we set (saveSession overwrites it)
      fs.writeFileSync(sessionPath(session.id), JSON.stringify(session, null, 2));
    }

    const sessions = listSessions();

    // Filter to only our test sessions
    const testSessions = sessions.filter(s => ids.includes(s.id));
    assert.strictEqual(testSessions.length, 3);

    // Should be sorted newest first
    for (let i = 0; i < testSessions.length - 1; i++) {
      const current = new Date(testSessions[i].updatedAt);
      const next = new Date(testSessions[i + 1].updatedAt);
      assert.ok(current >= next, 'Sessions should be sorted by updatedAt descending');
    }
  });

  it('should include messageCount in listed sessions', () => {
    const session = createTestSession({
      messages: [
        { role: 'user', content: 'Hello' },
        { role: 'assistant', content: 'Hi' },
      ],
    });
    trackSession(session.id);
    fs.writeFileSync(sessionPath(session.id), JSON.stringify(session, null, 2));

    const sessions = listSessions();
    const found = sessions.find(s => s.id === session.id);
    assert.ok(found, 'Should find the session');
    assert.strictEqual(found.messageCount, 2);
  });
});

describe('Session — delete session', () => {

  afterEach(() => { cleanup(); });

  it('should delete a session file', () => {
    const session = createTestSession();
    // Do not track for cleanup since we are deleting it in the test
    saveSession(session);

    assert.ok(fs.existsSync(sessionPath(session.id)), 'File should exist before delete');

    deleteSession(session.id);

    assert.ok(!fs.existsSync(sessionPath(session.id)), 'File should not exist after delete');
  });

  it('should not throw when deleting a nonexistent session', () => {
    assert.doesNotThrow(() => {
      deleteSession('nonexistent-session-id-xyz-' + Date.now());
    });
  });
});

describe('Session — rename session', () => {

  afterEach(() => { cleanup(); });

  it('should update the name field and persist it', () => {
    const session = createTestSession({ name: 'Original' });
    trackSession(session.id);
    saveSession(session);

    // Rename
    const loaded = loadSession(session.id);
    loaded.name = 'Renamed Session';
    saveSession(loaded);

    // Verify
    const reloaded = loadSession(session.id);
    assert.strictEqual(reloaded.name, 'Renamed Session');
  });

  it('should handle renaming to an empty string', () => {
    const session = createTestSession({ name: 'Has Name' });
    trackSession(session.id);
    saveSession(session);

    const loaded = loadSession(session.id);
    loaded.name = '';
    saveSession(loaded);

    const reloaded = loadSession(session.id);
    assert.strictEqual(reloaded.name, '');
  });

  it('should handle renaming with special characters', () => {
    const session = createTestSession({ name: 'Basic' });
    trackSession(session.id);
    saveSession(session);

    const loaded = loadSession(session.id);
    loaded.name = 'Test "quotes" & <brackets> and unicode: \u00e9\u00e0\u00fc';
    saveSession(loaded);

    const reloaded = loadSession(session.id);
    assert.strictEqual(reloaded.name, 'Test "quotes" & <brackets> and unicode: \u00e9\u00e0\u00fc');
  });
});

describe('Session — with messages', () => {

  afterEach(() => { cleanup(); });

  it('should store and retrieve a session with multiple messages', () => {
    const now = new Date().toISOString();
    const messages = [
      { role: 'user', content: 'What is 2+2?', timestamp: now, toolBlocks: [] },
      { role: 'assistant', content: '2+2 equals 4.', timestamp: now, toolBlocks: [] },
      { role: 'user', content: 'And 3+3?', timestamp: now, toolBlocks: [] },
      { role: 'assistant', content: '3+3 equals 6.', timestamp: now, toolBlocks: [] },
    ];

    const session = createTestSession({ messages });
    trackSession(session.id);
    saveSession(session);

    const loaded = loadSession(session.id);
    assert.strictEqual(loaded.messages.length, 4);

    // Verify alternating roles
    assert.strictEqual(loaded.messages[0].role, 'user');
    assert.strictEqual(loaded.messages[1].role, 'assistant');
    assert.strictEqual(loaded.messages[2].role, 'user');
    assert.strictEqual(loaded.messages[3].role, 'assistant');

    // Verify content
    assert.strictEqual(loaded.messages[0].content, 'What is 2+2?');
    assert.strictEqual(loaded.messages[1].content, '2+2 equals 4.');

    // Verify timestamps exist
    for (const msg of loaded.messages) {
      assert.ok(msg.timestamp, 'Each message should have a timestamp');
    }
  });

  it('should store messages with toolBlocks', () => {
    const messages = [
      {
        role: 'assistant',
        content: 'Let me read that file.',
        timestamp: new Date().toISOString(),
        toolBlocks: [
          {
            toolId: 'toolu_abc',
            toolName: 'Read',
            toolInput: { file_path: '/tmp/test.js' },
            toolOutput: 'console.log("hello");',
            isError: false,
          },
        ],
      },
    ];

    const session = createTestSession({ messages });
    trackSession(session.id);
    saveSession(session);

    const loaded = loadSession(session.id);
    assert.strictEqual(loaded.messages[0].toolBlocks.length, 1);
    assert.strictEqual(loaded.messages[0].toolBlocks[0].toolName, 'Read');
    assert.strictEqual(loaded.messages[0].toolBlocks[0].isError, false);
  });
});

describe('Session — handle missing session gracefully', () => {

  it('should return null for a nonexistent session ID', () => {
    const result = loadSession('absolutely-nonexistent-id-' + Date.now());
    assert.strictEqual(result, null);
  });

  it('should return null for an empty session ID', () => {
    const result = loadSession('');
    // path.basename('') returns '', so the file would be '.json' which should not exist
    assert.strictEqual(result, null);
  });
});

describe('Session — handle corrupted session file', () => {

  afterEach(() => { cleanup(); });

  it('should return null when session file contains invalid JSON', () => {
    const id = 'test-corrupt-' + Date.now();
    trackSession(id);
    const filePath = sessionPath(id);
    fs.writeFileSync(filePath, 'this is not valid json {{{');

    const result = loadSession(id);
    assert.strictEqual(result, null, 'Should return null for corrupted session file');
  });

  it('should return null when session file is empty', () => {
    const id = 'test-empty-' + Date.now();
    trackSession(id);
    const filePath = sessionPath(id);
    fs.writeFileSync(filePath, '');

    const result = loadSession(id);
    assert.strictEqual(result, null, 'Should return null for empty session file');
  });

  it('should skip corrupted files when listing sessions', () => {
    // Create one valid and one corrupted session
    const validSession = createTestSession({ name: 'Valid' });
    trackSession(validSession.id);
    saveSession(validSession);

    const corruptId = 'test-corrupt-list-' + Date.now();
    trackSession(corruptId);
    fs.writeFileSync(sessionPath(corruptId), 'NOT JSON!!!');

    // listSessions should not throw and should include the valid session
    const sessions = listSessions();
    const validFound = sessions.find(s => s.id === validSession.id);
    assert.ok(validFound, 'Valid session should appear in list');

    const corruptFound = sessions.find(s => s.id === corruptId);
    assert.ok(!corruptFound, 'Corrupted session should not appear in list');
  });
});

describe('Session — directory traversal prevention', () => {

  it('should sanitize session IDs with path traversal attempts', () => {
    // sessionPath uses path.basename which strips directory components
    const maliciousId = '../../../etc/passwd';
    const p = sessionPath(maliciousId);
    assert.ok(!p.includes('..'), 'Path should not contain directory traversal');
    assert.ok(p.startsWith(SESSIONS_DIR), 'Path should be within sessions directory');
  });

  it('should sanitize session IDs with absolute paths', () => {
    const maliciousId = '/etc/passwd';
    const p = sessionPath(maliciousId);
    assert.ok(p.startsWith(SESSIONS_DIR), 'Path should be within sessions directory');
  });
});
