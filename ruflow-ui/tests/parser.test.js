const { describe, it } = require('node:test');
const assert = require('node:assert');

// ---------------------------------------------------------------------------
// parseStreamLine — extracts structured data from an NDJSON stream line
//
// This function mirrors the parsing logic in server.js processStreamEvent but
// is designed as a pure, testable function that can be reused anywhere.
// ---------------------------------------------------------------------------

/**
 * Parse a single line from the Claude CLI stream-json output.
 *
 * @param {string} line - A single line of text (may or may not be valid JSON)
 * @returns {object|null} Parsed event object with a normalized shape, or null
 *   if the line is empty, not valid JSON, or has no recognizable type.
 *
 * Returned shapes (by .eventType):
 *   - { eventType: 'init', sessionId }
 *   - { eventType: 'text', text }
 *   - { eventType: 'tool_use', toolId, toolName, toolInput }
 *   - { eventType: 'tool_result', toolUseId, content, isError }
 *   - { eventType: 'result', cost, duration, sessionId, subtype }
 *   - { eventType: 'text_delta', text }
 *   - { eventType: 'assistant', content }   (catch-all for assistant messages)
 *   - { eventType: 'user', content }         (catch-all for user messages)
 *   - { eventType: 'unknown', raw }          (valid JSON but unrecognized type)
 */
function parseStreamLine(line) {
  if (typeof line !== 'string') return null;

  const trimmed = line.trim();
  if (!trimmed) return null;

  let parsed;
  try {
    parsed = JSON.parse(trimmed);
  } catch (_) {
    return null; // not valid JSON
  }

  if (!parsed || typeof parsed !== 'object') return null;
  if (!parsed.type) return { eventType: 'unknown', raw: parsed };

  // --- system init ---
  if (parsed.type === 'system' && parsed.subtype === 'init') {
    return {
      eventType: 'init',
      sessionId: parsed.session_id || null,
    };
  }

  // --- assistant message ---
  if (parsed.type === 'assistant') {
    // Content may be at parsed.content or parsed.message.content
    const content = Array.isArray(parsed.content)
      ? parsed.content
      : (parsed.message && Array.isArray(parsed.message.content))
        ? parsed.message.content
        : null;

    if (!content || content.length === 0) {
      return { eventType: 'assistant', content: [] };
    }

    // Try to find the most specific block
    const textBlock = content.find(b => b.type === 'text');
    if (textBlock) {
      return { eventType: 'text', text: textBlock.text || '' };
    }

    const toolUseBlock = content.find(b => b.type === 'tool_use');
    if (toolUseBlock) {
      return {
        eventType: 'tool_use',
        toolId: toolUseBlock.id || null,
        toolName: toolUseBlock.name || null,
        toolInput: toolUseBlock.input || null,
      };
    }

    return { eventType: 'assistant', content };
  }

  // --- user message (tool results) ---
  if (parsed.type === 'user') {
    const content = Array.isArray(parsed.content)
      ? parsed.content
      : (parsed.message && Array.isArray(parsed.message.content))
        ? parsed.message.content
        : null;

    if (!content || content.length === 0) {
      return { eventType: 'user', content: [] };
    }

    const toolResultBlock = content.find(b => b.type === 'tool_result');
    if (toolResultBlock) {
      return {
        eventType: 'tool_result',
        toolUseId: toolResultBlock.tool_use_id || null,
        content: typeof toolResultBlock.content === 'string'
          ? toolResultBlock.content
          : JSON.stringify(toolResultBlock.content),
        isError: !!toolResultBlock.is_error,
      };
    }

    return { eventType: 'user', content };
  }

  // --- result ---
  if (parsed.type === 'result') {
    return {
      eventType: 'result',
      subtype: parsed.subtype || null,
      cost: parsed.total_cost_usd ?? parsed.cost_usd ?? null,
      duration: parsed.duration_ms ?? null,
      sessionId: parsed.session_id || null,
    };
  }

  // --- stream_event (deltas) ---
  if (parsed.type === 'stream_event') {
    const event = parsed.event;
    if (event && event.type === 'content_block_delta' && event.delta) {
      if (event.delta.type === 'text_delta') {
        return {
          eventType: 'text_delta',
          text: event.delta.text || '',
        };
      }
    }
    return { eventType: 'unknown', raw: parsed };
  }

  return { eventType: 'unknown', raw: parsed };
}

// ---------------------------------------------------------------------------
// LineBuffer — accumulates partial lines, emits complete ones
// ---------------------------------------------------------------------------

class LineBuffer {
  constructor() {
    this.buffer = '';
  }

  /**
   * Feed data into the buffer and return an array of complete lines.
   */
  feed(data) {
    this.buffer += data;
    const parts = this.buffer.split('\n');
    // Last element is the incomplete portion
    this.buffer = parts.pop() || '';
    return parts.filter(l => l.trim() !== '');
  }

  /**
   * Flush any remaining buffered data as a final line.
   */
  flush() {
    const remaining = this.buffer.trim();
    this.buffer = '';
    return remaining ? [remaining] : [];
  }
}

// ===========================================================================================
// Tests
// ===========================================================================================

describe('parseStreamLine — system init event', () => {
  it('should extract session_id from a system init event', () => {
    const line = '{"type":"system","subtype":"init","session_id":"sess_123"}';
    const result = parseStreamLine(line);
    assert.strictEqual(result.eventType, 'init');
    assert.strictEqual(result.sessionId, 'sess_123');
  });

  it('should return null sessionId when session_id is missing', () => {
    const line = '{"type":"system","subtype":"init"}';
    const result = parseStreamLine(line);
    assert.strictEqual(result.eventType, 'init');
    assert.strictEqual(result.sessionId, null);
  });
});

describe('parseStreamLine — assistant text event', () => {
  it('should extract text from assistant message with message.content wrapper', () => {
    const line = '{"type":"assistant","message":{"content":[{"type":"text","text":"Hello world"}]}}';
    const result = parseStreamLine(line);
    assert.strictEqual(result.eventType, 'text');
    assert.strictEqual(result.text, 'Hello world');
  });

  it('should extract text from assistant message with direct content array', () => {
    const line = '{"type":"assistant","content":[{"type":"text","text":"Direct text"}]}';
    const result = parseStreamLine(line);
    assert.strictEqual(result.eventType, 'text');
    assert.strictEqual(result.text, 'Direct text');
  });

  it('should handle empty text', () => {
    const line = '{"type":"assistant","content":[{"type":"text","text":""}]}';
    const result = parseStreamLine(line);
    assert.strictEqual(result.eventType, 'text');
    assert.strictEqual(result.text, '');
  });
});

describe('parseStreamLine — tool_use event', () => {
  it('should extract tool name, id, and input', () => {
    const line = JSON.stringify({
      type: 'assistant',
      message: {
        content: [{
          type: 'tool_use',
          id: 'toolu_123',
          name: 'Read',
          input: { file_path: '/tmp/test.js' },
        }],
      },
    });
    const result = parseStreamLine(line);
    assert.strictEqual(result.eventType, 'tool_use');
    assert.strictEqual(result.toolId, 'toolu_123');
    assert.strictEqual(result.toolName, 'Read');
    assert.deepStrictEqual(result.toolInput, { file_path: '/tmp/test.js' });
  });

  it('should handle tool_use with missing id', () => {
    const line = JSON.stringify({
      type: 'assistant',
      content: [{
        type: 'tool_use',
        name: 'Bash',
        input: { command: 'ls' },
      }],
    });
    const result = parseStreamLine(line);
    assert.strictEqual(result.eventType, 'tool_use');
    assert.strictEqual(result.toolId, null);
    assert.strictEqual(result.toolName, 'Bash');
  });
});

describe('parseStreamLine — tool_result event', () => {
  it('should extract tool_use_id, content, and is_error', () => {
    const line = JSON.stringify({
      type: 'user',
      message: {
        content: [{
          type: 'tool_result',
          tool_use_id: 'toolu_123',
          content: 'file contents here',
          is_error: false,
        }],
      },
    });
    const result = parseStreamLine(line);
    assert.strictEqual(result.eventType, 'tool_result');
    assert.strictEqual(result.toolUseId, 'toolu_123');
    assert.strictEqual(result.content, 'file contents here');
    assert.strictEqual(result.isError, false);
  });

  it('should handle error tool results', () => {
    const line = JSON.stringify({
      type: 'user',
      content: [{
        type: 'tool_result',
        tool_use_id: 'toolu_456',
        content: 'Permission denied',
        is_error: true,
      }],
    });
    const result = parseStreamLine(line);
    assert.strictEqual(result.eventType, 'tool_result');
    assert.strictEqual(result.isError, true);
    assert.strictEqual(result.content, 'Permission denied');
  });

  it('should stringify non-string content', () => {
    const line = JSON.stringify({
      type: 'user',
      content: [{
        type: 'tool_result',
        tool_use_id: 'toolu_789',
        content: { some: 'object' },
        is_error: false,
      }],
    });
    const result = parseStreamLine(line);
    assert.strictEqual(result.eventType, 'tool_result');
    assert.strictEqual(result.content, '{"some":"object"}');
  });
});

describe('parseStreamLine — result event', () => {
  it('should extract cost, duration, and session_id', () => {
    const line = '{"type":"result","subtype":"success","duration_ms":3200,"total_cost_usd":0.0042,"session_id":"sess_123"}';
    const result = parseStreamLine(line);
    assert.strictEqual(result.eventType, 'result');
    assert.strictEqual(result.cost, 0.0042);
    assert.strictEqual(result.duration, 3200);
    assert.strictEqual(result.sessionId, 'sess_123');
    assert.strictEqual(result.subtype, 'success');
  });

  it('should handle cost_usd fallback', () => {
    const line = '{"type":"result","cost_usd":0.001,"duration_ms":1000}';
    const result = parseStreamLine(line);
    assert.strictEqual(result.eventType, 'result');
    assert.strictEqual(result.cost, 0.001);
  });

  it('should handle missing cost and duration', () => {
    const line = '{"type":"result","subtype":"error"}';
    const result = parseStreamLine(line);
    assert.strictEqual(result.eventType, 'result');
    assert.strictEqual(result.cost, null);
    assert.strictEqual(result.duration, null);
  });
});

describe('parseStreamLine — stream_event delta', () => {
  it('should extract text delta', () => {
    const line = JSON.stringify({
      type: 'stream_event',
      event: {
        type: 'content_block_delta',
        delta: { type: 'text_delta', text: 'Hello ' },
      },
    });
    const result = parseStreamLine(line);
    assert.strictEqual(result.eventType, 'text_delta');
    assert.strictEqual(result.text, 'Hello ');
  });

  it('should handle empty text delta', () => {
    const line = JSON.stringify({
      type: 'stream_event',
      event: {
        type: 'content_block_delta',
        delta: { type: 'text_delta', text: '' },
      },
    });
    const result = parseStreamLine(line);
    assert.strictEqual(result.eventType, 'text_delta');
    assert.strictEqual(result.text, '');
  });

  it('should return unknown for non-text deltas', () => {
    const line = JSON.stringify({
      type: 'stream_event',
      event: {
        type: 'content_block_start',
        content_block: { type: 'text' },
      },
    });
    const result = parseStreamLine(line);
    assert.strictEqual(result.eventType, 'unknown');
  });
});

describe('parseStreamLine — malformed input', () => {
  it('should return null for invalid JSON', () => {
    const result = parseStreamLine('not valid json');
    assert.strictEqual(result, null);
  });

  it('should return null for empty string', () => {
    assert.strictEqual(parseStreamLine(''), null);
  });

  it('should return null for whitespace-only string', () => {
    assert.strictEqual(parseStreamLine('   \n  '), null);
  });

  it('should return null for null input', () => {
    assert.strictEqual(parseStreamLine(null), null);
  });

  it('should return null for undefined input', () => {
    assert.strictEqual(parseStreamLine(undefined), null);
  });

  it('should return null for number input', () => {
    assert.strictEqual(parseStreamLine(42), null);
  });

  it('should return unknown for JSON without type field', () => {
    const result = parseStreamLine('{"foo":"bar"}');
    assert.strictEqual(result.eventType, 'unknown');
  });

  it('should return null for JSON primitive values', () => {
    assert.strictEqual(parseStreamLine('"just a string"'), null);
    assert.strictEqual(parseStreamLine('42'), null);
    assert.strictEqual(parseStreamLine('true'), null);
    assert.strictEqual(parseStreamLine('null'), null);
  });
});

describe('parseStreamLine — empty content arrays', () => {
  it('should handle assistant with empty content array', () => {
    const line = '{"type":"assistant","message":{"content":[]}}';
    const result = parseStreamLine(line);
    assert.strictEqual(result.eventType, 'assistant');
    assert.deepStrictEqual(result.content, []);
  });

  it('should handle user with empty content array', () => {
    const line = '{"type":"user","content":[]}';
    const result = parseStreamLine(line);
    assert.strictEqual(result.eventType, 'user');
    assert.deepStrictEqual(result.content, []);
  });

  it('should handle assistant with no content key', () => {
    const line = '{"type":"assistant"}';
    const result = parseStreamLine(line);
    assert.strictEqual(result.eventType, 'assistant');
    assert.deepStrictEqual(result.content, []);
  });
});

describe('LineBuffer — partial line handling', () => {
  it('should buffer partial lines until newline', () => {
    const buf = new LineBuffer();

    const lines1 = buf.feed('{"type":"sys');
    assert.deepStrictEqual(lines1, []);

    const lines2 = buf.feed('tem","subtype":"init","session_id":"s1"}\n');
    assert.strictEqual(lines2.length, 1);
    assert.strictEqual(lines2[0], '{"type":"system","subtype":"init","session_id":"s1"}');
  });

  it('should emit multiple complete lines at once', () => {
    const buf = new LineBuffer();
    const lines = buf.feed('{"type":"a"}\n{"type":"b"}\n');
    assert.strictEqual(lines.length, 2);
    assert.strictEqual(lines[0], '{"type":"a"}');
    assert.strictEqual(lines[1], '{"type":"b"}');
  });

  it('should flush remaining buffer', () => {
    const buf = new LineBuffer();
    buf.feed('{"type":"partial"');
    buf.feed(',"key":"value"}');
    const remaining = buf.flush();
    assert.strictEqual(remaining.length, 1);
    assert.strictEqual(remaining[0], '{"type":"partial","key":"value"}');
  });

  it('should return empty array when flushing empty buffer', () => {
    const buf = new LineBuffer();
    assert.deepStrictEqual(buf.flush(), []);
  });

  it('should skip empty lines', () => {
    const buf = new LineBuffer();
    const lines = buf.feed('{"a":1}\n\n\n{"b":2}\n');
    assert.strictEqual(lines.length, 2);
  });
});

describe('Full conversation flow parsing', () => {
  it('should parse a complete conversation in sequence', () => {
    const events = [
      '{"type":"system","subtype":"init","session_id":"sess_abc"}',
      '{"type":"assistant","content":[{"type":"text","text":"Let me help you."}]}',
      '{"type":"assistant","content":[{"type":"tool_use","id":"toolu_1","name":"Read","input":{"file_path":"/tmp/x"}}]}',
      '{"type":"user","content":[{"type":"tool_result","tool_use_id":"toolu_1","content":"file data","is_error":false}]}',
      '{"type":"assistant","content":[{"type":"text","text":"I read the file. Here are the results."}]}',
      '{"type":"result","subtype":"success","duration_ms":5000,"total_cost_usd":0.01,"session_id":"sess_abc"}',
    ];

    const results = events.map(e => parseStreamLine(e));

    assert.strictEqual(results.length, 6);
    assert.strictEqual(results[0].eventType, 'init');
    assert.strictEqual(results[0].sessionId, 'sess_abc');

    assert.strictEqual(results[1].eventType, 'text');
    assert.strictEqual(results[1].text, 'Let me help you.');

    assert.strictEqual(results[2].eventType, 'tool_use');
    assert.strictEqual(results[2].toolName, 'Read');

    assert.strictEqual(results[3].eventType, 'tool_result');
    assert.strictEqual(results[3].toolUseId, 'toolu_1');
    assert.strictEqual(results[3].isError, false);

    assert.strictEqual(results[4].eventType, 'text');
    assert.ok(results[4].text.includes('results'));

    assert.strictEqual(results[5].eventType, 'result');
    assert.strictEqual(results[5].cost, 0.01);
    assert.strictEqual(results[5].duration, 5000);
  });

  it('should work with LineBuffer for streaming simulation', () => {
    const buf = new LineBuffer();
    const allParsed = [];

    // Simulate chunked delivery
    const chunk1 = '{"type":"system","subtype":"init","session_id":"s1"}\n{"type":"as';
    const chunk2 = 'sistant","content":[{"type":"text","text":"Hi"}]}\n';
    const chunk3 = '{"type":"result","duration_ms":100}\n';

    for (const line of buf.feed(chunk1)) {
      allParsed.push(parseStreamLine(line));
    }
    assert.strictEqual(allParsed.length, 1);
    assert.strictEqual(allParsed[0].eventType, 'init');

    for (const line of buf.feed(chunk2)) {
      allParsed.push(parseStreamLine(line));
    }
    assert.strictEqual(allParsed.length, 2);
    assert.strictEqual(allParsed[1].eventType, 'text');

    for (const line of buf.feed(chunk3)) {
      allParsed.push(parseStreamLine(line));
    }
    assert.strictEqual(allParsed.length, 3);
    assert.strictEqual(allParsed[2].eventType, 'result');
  });
});

// Export for use in other modules
module.exports = { parseStreamLine, LineBuffer };
