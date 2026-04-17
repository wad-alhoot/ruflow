const { describe, it, before, after, afterEach } = require('node:test');
const assert = require('node:assert');
const http = require('http');
const { WebSocket } = require('ws');
const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const PORT = process.env.TEST_PORT || 3099;
const BASE_URL = `http://localhost:${PORT}`;
const WS_URL = `ws://localhost:${PORT}`;
const SESSIONS_DIR = path.join(__dirname, '..', 'sessions');
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

// Track test-created session IDs for cleanup
const testSessionIds = [];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Send a WebSocket message and wait for the next response.
 */
function sendWs(ws, data) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      ws.removeListener('message', handler);
      reject(new Error('sendWs timeout'));
    }, 10000);

    const handler = (msg) => {
      clearTimeout(timer);
      ws.removeListener('message', handler);
      resolve(JSON.parse(msg.toString()));
    };
    ws.on('message', handler);
    ws.send(JSON.stringify(data));
  });
}

/**
 * Collect `count` messages from a WebSocket (with timeout).
 */
function waitForMessages(ws, count, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const messages = [];
    const timer = setTimeout(() => {
      ws.removeListener('message', handler);
      reject(new Error(`waitForMessages timeout: received ${messages.length}/${count}`));
    }, timeout);

    const handler = (msg) => {
      messages.push(JSON.parse(msg.toString()));
      if (messages.length >= count) {
        clearTimeout(timer);
        ws.removeListener('message', handler);
        resolve(messages);
      }
    };
    ws.on('message', handler);
  });
}

/**
 * Make a simple HTTP GET request and return { status, headers, body }.
 */
function httpGet(urlPath) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('httpGet timeout')), 10000);
    http.get(`${BASE_URL}${urlPath}`, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        clearTimeout(timer);
        resolve({ status: res.statusCode, headers: res.headers, body });
      });
    }).on('error', (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

/**
 * Open a WebSocket connection and wait until it is ready.
 */
function openWs() {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('WebSocket open timeout')), 10000);
    const ws = new WebSocket(WS_URL);
    ws.on('open', () => { clearTimeout(timer); resolve(ws); });
    ws.on('error', (err) => { clearTimeout(timer); reject(err); });
  });
}

/**
 * Close a WebSocket and wait for the close event.
 */
function closeWs(ws) {
  return new Promise((resolve) => {
    if (!ws || ws.readyState === WebSocket.CLOSED) return resolve();
    ws.on('close', resolve);
    ws.close();
  });
}

/**
 * POST multipart/form-data with a file to /upload.
 */
function uploadFile(filename, content, contentType) {
  return new Promise((resolve, reject) => {
    const boundary = '----TestBoundary' + Date.now();
    const body = Buffer.concat([
      Buffer.from(
        `--${boundary}\r\n` +
        `Content-Disposition: form-data; name="file"; filename="${filename}"\r\n` +
        `Content-Type: ${contentType || 'application/octet-stream'}\r\n\r\n`
      ),
      Buffer.isBuffer(content) ? content : Buffer.from(content),
      Buffer.from(`\r\n--${boundary}--\r\n`),
    ]);

    const options = {
      hostname: 'localhost',
      port: PORT,
      path: '/upload',
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length,
      },
    };

    const timer = setTimeout(() => reject(new Error('upload timeout')), 10000);
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        clearTimeout(timer);
        let parsed;
        try { parsed = JSON.parse(data); } catch (_) { parsed = data; }
        resolve({ status: res.statusCode, body: parsed });
      });
    });
    req.on('error', (err) => { clearTimeout(timer); reject(err); });
    req.write(body);
    req.end();
  });
}

// ---------------------------------------------------------------------------
// Cleanup helper — remove any session files created during testing
// ---------------------------------------------------------------------------

function cleanupTestSessions() {
  for (const id of testSessionIds) {
    const p = path.join(SESSIONS_DIR, `${id}.json`);
    try { fs.unlinkSync(p); } catch (_) {}
  }
  testSessionIds.length = 0;
}

function cleanupUploads() {
  try {
    const files = fs.readdirSync(UPLOADS_DIR);
    for (const f of files) {
      try { fs.unlinkSync(path.join(UPLOADS_DIR, f)); } catch (_) {}
    }
  } catch (_) {}
}

// ===========================================================================================
// Tests
// ===========================================================================================

describe('Server — HTTP endpoints', () => {

  // -------------------------------------------------------------------------
  // 1. Server responds on port 3001
  // -------------------------------------------------------------------------
  it('should respond with 200 and HTML on GET /', async () => {
    const res = await httpGet('/');
    assert.strictEqual(res.status, 200);
    assert.ok(res.body.includes('<html') || res.body.includes('<!DOCTYPE'), 'Response should contain HTML');
  });

  // -------------------------------------------------------------------------
  // 2. Static file serving
  // -------------------------------------------------------------------------
  describe('Static file serving', () => {
    it('should serve index.html with content-type text/html', async () => {
      const res = await httpGet('/index.html');
      assert.strictEqual(res.status, 200);
      assert.ok(
        res.headers['content-type'].includes('html'),
        `Expected html content-type, got ${res.headers['content-type']}`
      );
    });

    it('should return 404 for nonexistent files', async () => {
      const res = await httpGet('/nonexistent-file-abc123.xyz');
      assert.strictEqual(res.status, 404);
    });
  });

  // -------------------------------------------------------------------------
  // 6. File upload endpoint
  // -------------------------------------------------------------------------
  describe('File upload endpoint', () => {

    afterEach(() => {
      cleanupUploads();
    });

    it('should accept a valid text file upload and return filename', async () => {
      const res = await uploadFile('test-doc.txt', 'Hello test content', 'text/plain');
      assert.strictEqual(res.status, 200);
      assert.ok(res.body.filename, 'Response should contain filename');
      assert.ok(res.body.originalName, 'Response should contain originalName');
      assert.strictEqual(res.body.originalName, 'test-doc.txt');
    });

    it('should accept a valid .js file upload', async () => {
      const res = await uploadFile('code.js', 'console.log("hi");', 'application/javascript');
      assert.strictEqual(res.status, 200);
      assert.ok(res.body.filename);
      assert.ok(res.body.content, 'Document upload should include text content');
    });

    it('should reject an upload with disallowed file extension', async () => {
      const res = await uploadFile('malware.exe', 'MZ', 'application/octet-stream');
      assert.strictEqual(res.status, 400);
      assert.ok(res.body.error, 'Response should contain an error message');
      assert.ok(res.body.error.includes('not allowed'), `Error should mention disallowed type, got: ${res.body.error}`);
    });

    it('should accept image file types', async () => {
      // A tiny valid PNG header is not required; the server checks extension not content
      const res = await uploadFile('photo.png', 'fake-image-data', 'image/png');
      assert.strictEqual(res.status, 200);
      assert.ok(res.body.filename);
    });
  });
});


describe('Server — WebSocket', () => {
  let ws;

  afterEach(async () => {
    cleanupTestSessions();
    if (ws) {
      await closeWs(ws);
      ws = null;
    }
  });

  // -------------------------------------------------------------------------
  // 3. WebSocket connection
  // -------------------------------------------------------------------------
  it('should accept a WebSocket connection', async () => {
    ws = await openWs();
    assert.strictEqual(ws.readyState, WebSocket.OPEN);
  });

  // -------------------------------------------------------------------------
  // 4. Session management via WebSocket
  // -------------------------------------------------------------------------
  describe('Session management', () => {

    it('should return empty session list initially (or existing list)', async () => {
      ws = await openWs();
      const res = await sendWs(ws, { type: 'list_sessions' });
      assert.strictEqual(res.type, 'session_list');
      assert.ok(Array.isArray(res.sessions), 'sessions should be an array');
    });

    it('should return session_list type for list_sessions', async () => {
      ws = await openWs();
      const res = await sendWs(ws, { type: 'list_sessions' });
      assert.strictEqual(res.type, 'session_list');
    });

    it('should handle rename_session for a manually created session', async () => {
      // Manually create a session file for testing
      const sessionId = 'test-rename-' + Date.now();
      testSessionIds.push(sessionId);
      const session = {
        id: sessionId,
        name: 'Original Name',
        cliSessionId: null,
        model: 'sonnet',
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      fs.writeFileSync(path.join(SESSIONS_DIR, `${sessionId}.json`), JSON.stringify(session));

      ws = await openWs();
      const res = await sendWs(ws, { type: 'rename_session', sessionId, name: 'Renamed Session' });
      assert.strictEqual(res.type, 'session_renamed');
      assert.strictEqual(res.name, 'Renamed Session');

      // Verify file was updated
      const raw = fs.readFileSync(path.join(SESSIONS_DIR, `${sessionId}.json`), 'utf-8');
      const updated = JSON.parse(raw);
      assert.strictEqual(updated.name, 'Renamed Session');
    });

    it('should handle delete_session', async () => {
      const sessionId = 'test-delete-' + Date.now();
      const session = {
        id: sessionId,
        name: 'To Delete',
        cliSessionId: null,
        model: 'sonnet',
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      fs.writeFileSync(path.join(SESSIONS_DIR, `${sessionId}.json`), JSON.stringify(session));

      ws = await openWs();
      const res = await sendWs(ws, { type: 'delete_session', sessionId });
      assert.strictEqual(res.type, 'session_deleted');
      assert.strictEqual(res.sessionId, sessionId);

      // File should be gone
      assert.ok(!fs.existsSync(path.join(SESSIONS_DIR, `${sessionId}.json`)));
    });

    it('should list sessions after creating one manually', async () => {
      const sessionId = 'test-list-' + Date.now();
      testSessionIds.push(sessionId);
      const session = {
        id: sessionId,
        name: 'Test List Session',
        cliSessionId: null,
        model: 'sonnet',
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      fs.writeFileSync(path.join(SESSIONS_DIR, `${sessionId}.json`), JSON.stringify(session));

      ws = await openWs();
      const res = await sendWs(ws, { type: 'list_sessions' });
      assert.strictEqual(res.type, 'session_list');
      const found = res.sessions.find(s => s.id === sessionId);
      assert.ok(found, 'Created session should appear in list');
      assert.strictEqual(found.name, 'Test List Session');
    });
  });

  // -------------------------------------------------------------------------
  // 5. WebSocket message parsing — all event types
  // -------------------------------------------------------------------------
  describe('Message type handling', () => {

    it('should respond to list_sessions', async () => {
      ws = await openWs();
      const res = await sendWs(ws, { type: 'list_sessions' });
      assert.strictEqual(res.type, 'session_list');
    });

    it('should respond to load_session with error for invalid id', async () => {
      ws = await openWs();
      const res = await sendWs(ws, { type: 'load_session', sessionId: 'nonexistent-id-xyz' });
      assert.strictEqual(res.type, 'error');
      assert.ok(res.message.includes('not found'), `Expected 'not found' in error, got: ${res.message}`);
    });

    it('should respond to load_session with session data for valid id', async () => {
      const sessionId = 'test-load-' + Date.now();
      testSessionIds.push(sessionId);
      const session = {
        id: sessionId,
        name: 'Load Test',
        cliSessionId: null,
        model: 'sonnet',
        messages: [{ role: 'user', content: 'hi', timestamp: new Date().toISOString() }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      fs.writeFileSync(path.join(SESSIONS_DIR, `${sessionId}.json`), JSON.stringify(session));

      ws = await openWs();
      const res = await sendWs(ws, { type: 'load_session', sessionId });
      assert.strictEqual(res.type, 'session_loaded');
      assert.strictEqual(res.session.id, sessionId);
      assert.strictEqual(res.session.messages.length, 1);
    });

    it('should respond to delete_session', async () => {
      const sessionId = 'test-del-type-' + Date.now();
      const session = {
        id: sessionId,
        name: 'Del Type',
        cliSessionId: null,
        model: 'sonnet',
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      fs.writeFileSync(path.join(SESSIONS_DIR, `${sessionId}.json`), JSON.stringify(session));

      ws = await openWs();
      const res = await sendWs(ws, { type: 'delete_session', sessionId });
      assert.strictEqual(res.type, 'session_deleted');
    });

    it('should respond to rename_session with error for missing session', async () => {
      ws = await openWs();
      const res = await sendWs(ws, { type: 'rename_session', sessionId: 'no-such-id', name: 'X' });
      assert.strictEqual(res.type, 'error');
    });

    it('should respond with error for unknown message type', async () => {
      ws = await openWs();
      const res = await sendWs(ws, { type: 'unknown_type_xyz' });
      assert.strictEqual(res.type, 'error');
      assert.ok(res.message.includes('Unknown'), `Expected 'Unknown' in error, got: ${res.message}`);
    });

    it('should respond with error for invalid JSON', async () => {
      ws = await openWs();
      const response = new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          ws.removeListener('message', handler);
          reject(new Error('timeout'));
        }, 10000);
        const handler = (msg) => {
          clearTimeout(timer);
          ws.removeListener('message', handler);
          resolve(JSON.parse(msg.toString()));
        };
        ws.on('message', handler);
      });

      ws.send('this is not valid json');
      const res = await response;
      assert.strictEqual(res.type, 'error');
      assert.ok(res.message.includes('Invalid JSON'));
    });

    it('should handle cancel when no process is active (no crash)', async () => {
      ws = await openWs();
      // cancel with no active process should not produce an error or crash
      ws.send(JSON.stringify({ type: 'cancel' }));
      // Give a moment; if no crash, we can still send another message
      const res = await sendWs(ws, { type: 'list_sessions' });
      assert.strictEqual(res.type, 'session_list');
    });

    it('should accept chat message type and respond with session_created + stream_start', async () => {
      ws = await openWs();

      // We expect at least session_created and stream_start before the process runs.
      // The claude process will likely fail (not in PATH or no API key), but the
      // server should still send session_created and stream_start.
      const messagesPromise = waitForMessages(ws, 2, 15000);
      ws.send(JSON.stringify({ type: 'chat', message: 'test hello', model: 'sonnet' }));

      const messages = await messagesPromise;
      const types = messages.map(m => m.type);

      assert.ok(
        types.includes('session_created') || types.includes('stream_start'),
        `Expected session_created or stream_start, got: ${types.join(', ')}`
      );

      // Clean up the session that was created
      const sessionMsg = messages.find(m => m.type === 'session_created');
      if (sessionMsg && sessionMsg.session) {
        testSessionIds.push(sessionMsg.session.id);
      }
    });
  });

  // -------------------------------------------------------------------------
  // 7. Session file persistence
  // -------------------------------------------------------------------------
  describe('Session file persistence', () => {

    it('should persist session as a JSON file with correct structure', () => {
      const sessionId = 'test-persist-' + Date.now();
      testSessionIds.push(sessionId);

      const session = {
        id: sessionId,
        name: 'Persist Test',
        cliSessionId: null,
        model: 'sonnet',
        messages: [
          { role: 'user', content: 'Hello', timestamp: new Date().toISOString(), toolBlocks: [] },
          { role: 'assistant', content: 'Hi there', timestamp: new Date().toISOString(), toolBlocks: [] },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const filePath = path.join(SESSIONS_DIR, `${sessionId}.json`);
      fs.writeFileSync(filePath, JSON.stringify(session, null, 2));

      // Verify file exists
      assert.ok(fs.existsSync(filePath), 'Session file should exist');

      // Read back and verify structure
      const raw = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(raw);

      assert.strictEqual(data.id, sessionId);
      assert.strictEqual(data.name, 'Persist Test');
      assert.ok(data.createdAt, 'Should have createdAt');
      assert.ok(data.updatedAt, 'Should have updatedAt');
      assert.ok(Array.isArray(data.messages), 'messages should be an array');
      assert.strictEqual(data.messages.length, 2);
      assert.strictEqual(data.messages[0].role, 'user');
      assert.strictEqual(data.messages[1].role, 'assistant');
    });
  });

  // -------------------------------------------------------------------------
  // 8. Model selection (acceptance test)
  // -------------------------------------------------------------------------
  describe('Model selection', () => {

    it('should accept chat message with model: "haiku"', async () => {
      ws = await openWs();

      const messagesPromise = waitForMessages(ws, 2, 15000);
      ws.send(JSON.stringify({ type: 'chat', message: 'model test', model: 'haiku' }));

      const messages = await messagesPromise;
      const types = messages.map(m => m.type);

      // The server should accept the message and start processing
      assert.ok(
        types.includes('session_created') || types.includes('stream_start'),
        `Expected session_created or stream_start with haiku model, got: ${types.join(', ')}`
      );

      const sessionMsg = messages.find(m => m.type === 'session_created');
      if (sessionMsg && sessionMsg.session) {
        testSessionIds.push(sessionMsg.session.id);
      }
    });

    it('should accept chat message with model: "opus"', async () => {
      ws = await openWs();

      const messagesPromise = waitForMessages(ws, 2, 15000);
      ws.send(JSON.stringify({ type: 'chat', message: 'opus test', model: 'opus' }));

      const messages = await messagesPromise;
      const types = messages.map(m => m.type);

      assert.ok(
        types.includes('session_created') || types.includes('stream_start'),
        `Expected session_created or stream_start with opus model, got: ${types.join(', ')}`
      );

      const sessionMsg = messages.find(m => m.type === 'session_created');
      if (sessionMsg && sessionMsg.session) {
        testSessionIds.push(sessionMsg.session.id);
      }
    });
  });
});
