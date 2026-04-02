#!/usr/bin/env bash
# session-memory-hook.sh
# Automatically saves Claude Code session data into structured memory files.
# Designed for Windows (Git Bash) with portable tools (no jq dependency).
#
# Usage:
#   bash /path/to/session-memory-hook.sh [session-id]
#
# If no session-id is provided, finds the most recently modified .jsonl file.

set -euo pipefail

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
PROJECTS_DIR="C:/Users/Qadri Laptop/.claude/projects/D--Personal-Smarter-revolution-Ruflow"
MEMORY_DIR="${PROJECTS_DIR}/memory"
MEMORY_INDEX="${MEMORY_DIR}/MEMORY.md"

# Timestamp for file naming
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M")
TIMESTAMP_DISPLAY=$(date +"%Y-%m-%d %H:%M")
DATE_ISO=$(date +"%Y-%m-%dT%H:%M:%S")

# Output file
OUTPUT_FILE="${MEMORY_DIR}/session_${TIMESTAMP}.md"

# ---------------------------------------------------------------------------
# Ensure memory directory exists
# ---------------------------------------------------------------------------
mkdir -p "${MEMORY_DIR}"

# ---------------------------------------------------------------------------
# Find the most recent .jsonl session file
# ---------------------------------------------------------------------------
find_latest_session() {
    local session_id="${1:-}"

    if [ -n "${session_id}" ]; then
        local target="${PROJECTS_DIR}/${session_id}.jsonl"
        if [ -f "${target}" ]; then
            echo "${target}"
            return 0
        fi
    fi

    # Find the most recently modified .jsonl file
    local latest=""
    local latest_time=0

    for f in "${PROJECTS_DIR}"/*.jsonl; do
        [ -f "$f" ] || continue
        # Use stat for modification time; portable across Git Bash
        local mtime
        mtime=$(stat -c '%Y' "$f" 2>/dev/null || stat -f '%m' "$f" 2>/dev/null || echo "0")
        if [ "${mtime}" -gt "${latest_time}" ]; then
            latest_time="${mtime}"
            latest="$f"
        fi
    done

    if [ -z "${latest}" ]; then
        echo ""
        return 1
    fi

    echo "${latest}"
}

SESSION_FILE=$(find_latest_session "${1:-}")

if [ -z "${SESSION_FILE}" ] || [ ! -f "${SESSION_FILE}" ]; then
    echo "[session-memory-hook] No session .jsonl files found in ${PROJECTS_DIR}" >&2
    exit 0
fi

SESSION_ID=$(basename "${SESSION_FILE}" .jsonl)
echo "[session-memory-hook] Processing session: ${SESSION_ID}"

# ---------------------------------------------------------------------------
# Check for empty / trivially small sessions (< 5 lines)
# ---------------------------------------------------------------------------
LINE_COUNT=$(wc -l < "${SESSION_FILE}" 2>/dev/null || echo "0")
LINE_COUNT=$(echo "${LINE_COUNT}" | tr -d '[:space:]')

if [ "${LINE_COUNT}" -lt 5 ]; then
    echo "[session-memory-hook] Session too short (${LINE_COUNT} lines), skipping." >&2
    exit 0
fi

# ---------------------------------------------------------------------------
# Skip if we already saved a memory file this minute (idempotency)
# ---------------------------------------------------------------------------
if [ -f "${OUTPUT_FILE}" ]; then
    echo "[session-memory-hook] Output file ${OUTPUT_FILE} already exists, skipping." >&2
    exit 0
fi

# ---------------------------------------------------------------------------
# Extract session title
# ---------------------------------------------------------------------------
SESSION_TITLE=$(grep -o '"aiTitle":"[^"]*"' "${SESSION_FILE}" 2>/dev/null \
    | head -1 \
    | sed 's/"aiTitle":"//;s/"//' \
    || echo "Untitled Session")

if [ -z "${SESSION_TITLE}" ] || [ "${SESSION_TITLE}" = "" ]; then
    SESSION_TITLE="Untitled Session"
fi

# ---------------------------------------------------------------------------
# Extract user messages (topics discussed)
# ---------------------------------------------------------------------------
extract_user_messages() {
    # User messages can have content as a plain string or as an array of {text} objects.
    # Strategy: extract both "content":"<string>" (plain) and "text":"<string>" patterns
    # from lines that are user messages, then filter noise.
    {
        # Plain string content: "content":"some user text"
        grep '"type":"user"' "${SESSION_FILE}" 2>/dev/null \
            | grep -oE '"content":"[^"]{1,300}' \
            | sed 's/"content":"//'

        # Array content: "text":"some user text"
        grep '"type":"user"' "${SESSION_FILE}" 2>/dev/null \
            | grep -oE '"text":"[^"]{1,300}' \
            | sed 's/"text":"//'
    } \
        | grep -v '^<ide_opened_file>' \
        | grep -v '^<system' \
        | grep -v '^<task-notification>' \
        | grep -v '^<' \
        | grep -v '^Async agent' \
        | grep -v 'agentId:' \
        | grep -v '(internal ID' \
        | grep -v '^total [0-9]' \
        | grep -v '^drwx' \
        | grep -v '^-rw-' \
        | grep -v '^Exit code' \
        | grep -v '^File created' \
        | grep -v '^# Memory' \
        | grep -v '^user$' \
        | grep -v '^---' \
        | grep -v '^name: ' \
        | grep -v '^description: ' \
        | grep -v '^type: ' \
        | grep -E '.{3,}' \
        | sed 's/\\n/ /g;s/\\"/"/g;s/\\t/ /g' \
        | sort -u \
        | head -30 \
        || true
}

# ---------------------------------------------------------------------------
# Extract files created/modified (from tool_use calls)
# ---------------------------------------------------------------------------
extract_files_touched() {
    # Look for file paths in Write, Edit, MultiEdit, Read tool calls
    # Patterns: "file_path":"...", "path":"...", "file":"..."
    grep -oE '"(file_path|path|file)":"[^"]*"' "${SESSION_FILE}" 2>/dev/null \
        | sed 's/"[^"]*":"//;s/"$//' \
        | grep -vE '^\.' \
        | sort -u \
        | head -50 \
        || true
}

# ---------------------------------------------------------------------------
# Extract bash commands run
# ---------------------------------------------------------------------------
extract_commands() {
    # Extract bash commands from tool_use calls, filtering out hook infrastructure
    grep -oE '"command":"[^"]{1,300}' "${SESSION_FILE}" 2>/dev/null \
        | sed 's/"command":"//' \
        | grep -v '^node ' \
        | grep -v 'hook-handler' \
        | grep -v 'statusline' \
        | grep -v 'auto-memory-hook' \
        | grep -v '^callback$' \
        | grep -v '^$' \
        | sed 's/\\n/ /g;s/\\"/"/g;s/\\t/ /g' \
        | sort -u \
        | head -40 \
        || true
}

# ---------------------------------------------------------------------------
# Extract assistant text responses (decisions, explanations)
# ---------------------------------------------------------------------------
extract_assistant_text() {
    # Get text blocks from assistant messages, truncate each to ~200 chars
    grep '"type":"assistant"' "${SESSION_FILE}" 2>/dev/null \
        | grep -oE '"type":"text","text":"[^"]{1,500}' \
        | sed 's/"type":"text","text":"//;s/\\n/ /g;s/\\"/"/g' \
        | head -20 \
        || true
}

# ---------------------------------------------------------------------------
# Extract git branch
# ---------------------------------------------------------------------------
GIT_BRANCH=$(grep -o '"gitBranch":"[^"]*"' "${SESSION_FILE}" 2>/dev/null \
    | head -1 \
    | sed 's/"gitBranch":"//;s/"//' \
    || echo "unknown")

# ---------------------------------------------------------------------------
# Extract model used
# ---------------------------------------------------------------------------
MODEL_USED=$(grep -o '"model":"[^"]*"' "${SESSION_FILE}" 2>/dev/null \
    | head -1 \
    | sed 's/"model":"//;s/"//' \
    || echo "unknown")

# ---------------------------------------------------------------------------
# Collect data
# ---------------------------------------------------------------------------
USER_MESSAGES=$(extract_user_messages)
FILES_TOUCHED=$(extract_files_touched)
COMMANDS_RUN=$(extract_commands)
ASSISTANT_TEXT=$(extract_assistant_text)

# ---------------------------------------------------------------------------
# Count messages
# ---------------------------------------------------------------------------
USER_MSG_COUNT=$(grep -c '"type":"user"' "${SESSION_FILE}" 2>/dev/null || echo "0")
ASSISTANT_MSG_COUNT=$(grep -c '"type":"assistant"' "${SESSION_FILE}" 2>/dev/null || echo "0")

# ---------------------------------------------------------------------------
# Build topics list from user messages
# ---------------------------------------------------------------------------
build_topics() {
    if [ -z "${USER_MESSAGES}" ]; then
        echo "- No user messages extracted"
        return
    fi

    echo "${USER_MESSAGES}" | while IFS= read -r line; do
        # Truncate long lines
        local truncated
        truncated=$(echo "${line}" | cut -c1-150)
        if [ ${#line} -gt 150 ]; then
            truncated="${truncated}..."
        fi
        echo "- ${truncated}"
    done
}

# ---------------------------------------------------------------------------
# Build files list
# ---------------------------------------------------------------------------
build_files_list() {
    if [ -z "${FILES_TOUCHED}" ]; then
        echo "- No files detected"
        return
    fi

    echo "${FILES_TOUCHED}" | while IFS= read -r line; do
        echo "- \`${line}\`"
    done
}

# ---------------------------------------------------------------------------
# Build commands list
# ---------------------------------------------------------------------------
build_commands_list() {
    if [ -z "${COMMANDS_RUN}" ]; then
        echo "- No commands detected"
        return
    fi

    echo "${COMMANDS_RUN}" | while IFS= read -r line; do
        # Truncate very long commands
        local truncated
        truncated=$(echo "${line}" | cut -c1-200)
        echo "- \`${truncated}\`"
    done
}

# ---------------------------------------------------------------------------
# Build decisions / key assistant content
# ---------------------------------------------------------------------------
build_decisions() {
    if [ -z "${ASSISTANT_TEXT}" ]; then
        echo "- No decisions extracted"
        return
    fi

    echo "${ASSISTANT_TEXT}" | while IFS= read -r line; do
        local truncated
        truncated=$(echo "${line}" | cut -c1-200)
        if [ ${#line} -gt 200 ]; then
            truncated="${truncated}..."
        fi
        echo "- ${truncated}"
    done
}

# ---------------------------------------------------------------------------
# Generate one-line description
# ---------------------------------------------------------------------------
DESCRIPTION="${SESSION_TITLE} - ${USER_MSG_COUNT} user msgs, ${ASSISTANT_MSG_COUNT} assistant msgs on branch ${GIT_BRANCH}"

# ---------------------------------------------------------------------------
# Write the memory file
# ---------------------------------------------------------------------------
TOPICS_CONTENT=$(build_topics)
FILES_CONTENT=$(build_files_list)
COMMANDS_CONTENT=$(build_commands_list)
DECISIONS_CONTENT=$(build_decisions)

cat > "${OUTPUT_FILE}" << MEMEOF
---
name: Session Summary ${TIMESTAMP_DISPLAY}
description: ${DESCRIPTION}
type: project
session_id: ${SESSION_ID}
date: ${DATE_ISO}
model: ${MODEL_USED}
branch: ${GIT_BRANCH}
---

## Session: ${TIMESTAMP_DISPLAY}

**Title:** ${SESSION_TITLE}
**Session ID:** ${SESSION_ID}
**Model:** ${MODEL_USED}
**Branch:** ${GIT_BRANCH}
**Messages:** ${USER_MSG_COUNT} user / ${ASSISTANT_MSG_COUNT} assistant

### Topics Discussed
${TOPICS_CONTENT}

### Files Created/Modified
${FILES_CONTENT}

### Decisions Made
${DECISIONS_CONTENT}

### Commands Run
${COMMANDS_CONTENT}

### Session Metadata
- **Source:** ${SESSION_FILE}
- **Lines in log:** ${LINE_COUNT}
- **Saved at:** ${DATE_ISO}
MEMEOF

echo "[session-memory-hook] Saved session summary to: ${OUTPUT_FILE}"

# ---------------------------------------------------------------------------
# Append entry to MEMORY.md index
# ---------------------------------------------------------------------------
# Create MEMORY.md if it does not exist
if [ ! -f "${MEMORY_INDEX}" ]; then
    cat > "${MEMORY_INDEX}" << IDXEOF
# Memory Index

## Sessions
IDXEOF
fi

# Ensure a Sessions section exists
if ! grep -q '## Sessions' "${MEMORY_INDEX}" 2>/dev/null; then
    printf '\n## Sessions\n' >> "${MEMORY_INDEX}"
fi

# Append the new entry at the end of MEMORY.md (under Sessions section)
ENTRY="- [session_${TIMESTAMP}.md](session_${TIMESTAMP}.md) - ${SESSION_TITLE} (${TIMESTAMP_DISPLAY})"
echo "${ENTRY}" >> "${MEMORY_INDEX}"

echo "[session-memory-hook] Updated memory index: ${MEMORY_INDEX}"

# ---------------------------------------------------------------------------
# Auto-ingest into AgentDB (runs in background, non-blocking)
# ---------------------------------------------------------------------------
node "D:/Personal/Smarter revolution/Ruflow/scripts/memory-db/ingest.js" --file "$OUTPUT_FILE" 2>/dev/null &

echo "[session-memory-hook] Done."
