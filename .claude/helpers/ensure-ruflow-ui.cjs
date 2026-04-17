#!/usr/bin/env node
// Ensure ruflow-ui server is running on :3001. No-op if already responsive.
const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const UI_DIR = path.resolve(__dirname, '..', '..', 'ruflow-ui');
const PORT = 3001;

function isUp() {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:${PORT}/`, { timeout: 1500 }, (res) => {
      res.resume();
      resolve(res.statusCode && res.statusCode < 500);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
  });
}

(async () => {
  if (await isUp()) {
    console.log(`[ruflow-ui] already running on :${PORT}`);
    return;
  }
  const logFile = require('fs').openSync('/tmp/ruflow-ui.log', 'a');
  const child = spawn('node', ['server.js'], {
    cwd: UI_DIR,
    detached: true,
    stdio: ['ignore', logFile, logFile],
    env: process.env,
  });
  child.unref();
  console.log(`[ruflow-ui] started pid=${child.pid} on :${PORT}`);
})();
