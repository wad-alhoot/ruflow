# OpenClaw — Complete Feature Reference (From Source Code)

> Extracted from actual source code at https://github.com/openclaw/openclaw
> 14,935 files | 11,517 TypeScript | 61 tool implementations | 427 doc pages

---

## 1. CHAT COMMANDS (from src/auto-reply/commands-registry.shared.ts)

| Command | Key | Description |
|---------|-----|-------------|
| `/help` | help | Show available commands |
| `/commands` | commands | List all slash commands |
| `/tools` | tools | List available runtime tools |
| `/skill <name>` | skill | Run a skill by name |
| `/status` | status | Show current status (model, tokens, cost) |
| `/tasks` | tasks | List background tasks for this session |
| `/allowlist` | allowlist | List/add/remove allowlist entries |
| `/approve` | approve | Approve or deny exec requests |
| `/context` | context | Explain how context is built and used |
| `/btw` | btw | Ask a side question without changing session context |
| `/export-session` | export-session | Export session to HTML with full system prompt |
| `/tts` | tts | Control text-to-speech |
| `/whoami` | whoami | Show your sender ID |
| `/session` | session | Manage session-level settings (e.g. `/session idle`) |
| `/subagents` | subagents | List, kill, log, spawn, or steer subagent runs |
| `/new` or `/reset` | — | Clear/reset session context |
| `/compact` | — | Summarize and compress context |
| `/think <level>` | — | Thinking depth: off/minimal/low/medium/high/xhigh |
| `/verbose on\|off` | — | Toggle verbose output |
| `/usage off\|tokens\|full` | — | Per-response usage footer |
| `/restart` | — | Restart gateway (owner-only) |
| `/activation mention\|always` | — | Group activation toggle |
| `/elevated on\|off` | — | Toggle elevated bash access |
| `/dock-<channel>` | dock | Switch replies to a specific channel |

---

## 2. AGENT TOOLS (61 files in src/agents/tools/)

### Communication Tools
- `message-tool.ts` — Send messages to channels
- `sessions-send-tool.ts` — Send messages to other sessions
- `sessions-send-tool.a2a.ts` — Agent-to-agent communication
- `sessions-list-tool.ts` — Discover active agents/sessions
- `sessions-history-tool.ts` — Retrieve session transcripts
- `sessions-spawn-tool.ts` — Spawn new agent sessions
- `sessions-yield-tool.ts` — Yield control to another agent
- `agents-list-tool.ts` — List available agents
- `subagents-tool.ts` — Manage sub-agents
- `chat-history-text.ts` — Get chat history as text
- `session-message-text.ts` — Get session messages
- `session-status-tool.ts` — Get session status

### Automation Tools
- `cron-tool.ts` — Create/manage scheduled tasks (add, edit, remove, list, run, wake)
- `gateway-tool.ts` — Direct gateway API calls
- `update-plan-tool.ts` — Update task plans

### Media Generation Tools
- `image-generate-tool.ts` — Generate images (Stability AI, etc.)
- `image-tool.ts` — Image manipulation
- `video-generate-tool.ts` — Generate videos
- `video-generate-background.ts` — Background video generation
- `music-generate-tool.ts` — Generate music
- `music-generate-background.ts` — Background music generation
- `pdf-tool.ts` — PDF processing and generation

### Web Tools
- `web-fetch.ts` — Fetch and parse web pages
- `web-search.ts` — Search the web (Brave Search)
- `web-tools.ts` — Combined web utilities
- `web-guarded-fetch.ts` — Safe URL fetching with guards
- `web-search-citation-redirect.ts` — Citation handling

### Device/Node Tools
- `nodes-tool.ts` — Device node commands
- `nodes-tool-commands.ts` — System commands (system.run, system.notify)
- `nodes-tool-media.ts` — Camera snap, screen record, etc.

### Voice Tools
- `tts-tool.ts` — Text-to-speech (ElevenLabs, OpenAI, Edge, system)

### Visual Tools
- `canvas-tool.ts` — Canvas/A2UI workspace manipulation

### Step Tools
- `agent-step.ts` — Agent execution steps

---

## 3. SOURCE MODULES (60+ in src/)

### Core Runtime
| Module | Files | Purpose |
|--------|-------|---------|
| `agents/` | 652 | Agent lifecycle, Pi runtime, tool execution, skill loading |
| `auto-reply/` | 273 | Message processing, command detection, reply dispatch |
| `gateway/` | 290 | WebSocket server, session management, auth, broadcasting |
| `infra/` | 314 | Approval system, event handling, voice wake, utilities |
| `cli/` | 217 | Command-line interface, all CLI commands |
| `config/` | 173 | Configuration management, schema, types |
| `sessions/` | 180 | Session store, isolation, routing |
| `commands/` | 292 | User-facing commands, doctor, model picker |
| `channels/` | 143 | Channel plugins, pairing, routing |
| `memory-host-sdk/` | — | Memory and dreaming system |

### Feature Modules
| Module | Files | Purpose |
|--------|-------|---------|
| `cron/` | 66 | Scheduled tasks, heartbeat, job management |
| `hooks/` | 33 | Event hooks, session-memory handler, command logger |
| `tts/` | 23 | Text-to-speech providers and playback |
| `realtime-voice/` | — | Real-time voice streaming |
| `realtime-transcription/` | — | Real-time speech-to-text |
| `image-generation/` | 6 | Image generation providers |
| `video-generation/` | 16 | Video generation providers |
| `music-generation/` | 13 | Music generation providers |
| `media/` | — | Media pipeline (images, audio, video) |
| `media-understanding/` | — | Image/video/audio analysis |
| `canvas-host/` | 3 | A2UI canvas server |
| `link-understanding/` | 6 | URL content extraction |
| `web-fetch/` | — | Web page fetching |
| `web-search/` | — | Web search (Brave) |
| `web/` | — | WebChat static hosting |
| `context-engine/` | 7 | Context window management |
| `flows/` | 9 | Workflow orchestration |
| `tasks/` | — | Background task management |
| `pairing/` | 22 | DM pairing system |
| `security/` | — | Security scanning |
| `secrets/` | — | Secrets management |
| `plugins/` | — | Plugin system |
| `plugin-sdk/` | — | Plugin development SDK |
| `i18n/` | — | Internationalization |
| `logging/` | 19 | Structured logging |
| `daemon/` | 33 | Gateway daemon management |
| `terminal/` | — | Terminal integration |
| `tui/` | — | Terminal UI |
| `wizard/` | — | Onboarding wizard |
| `polls/` | 5 | In-chat polling |
| `proxy-capture/` | — | Network proxy capture |

---

## 4. MEMORY SYSTEM (from src/memory-host-sdk/dreaming.ts)

### Dreaming / REM Backfill (actual constants from code)

**Three Sleep Phases:**

| Phase | Cron | Purpose |
|-------|------|---------|
| **Light Dreaming** | `0 */6 * * *` (every 6h) | Lookback 2 days, limit 100 entries, dedupe at 0.9 similarity |
| **Deep Dreaming** | `0 3 * * *` (daily 3am) | Min score 0.8, min 3 recalls, min 3 unique queries, 30-day max age |
| **REM Dreaming** | `0 5 * * 0` (weekly Sun 5am) | Lookback 7 days, limit 10, min pattern strength 0.75 |

**Deep Dreaming Recovery:**
- Auto-triggers when health drops below 0.35
- Lookback 30 days, max 20 candidates
- Auto-write at confidence > 0.97
- Min confidence 0.9 for suggestions

**Configuration Options:**
- `speed`: fast / balanced / slow
- `thinking`: low / medium / high
- `budget`: cheap / medium / expensive
- `storageMode`: inline / separate / both
- `frequency`: cron expression
- `timezone`: configurable

### Memory Sources
- Light: daily files, sessions, recall history
- Deep: daily files, memory entries, sessions, logs, recall
- REM: memory entries, daily files, deep dreaming results

---

## 5. APPROVAL SYSTEM (71 files in src/)

- `approval-classifier.ts` — Classifies approval requests
- `bash-tools.exec-approval-request.ts` — Request approval for bash execution
- `bash-tools.exec-approval-followup.ts` — Follow up on pending approvals
- `exec-approval-result.ts` — Handle approval decisions
- `approval-handler-runtime.ts` — Runtime approval handler
- Per-channel native approval UI
- Gateway resolver for approvals

---

## 6. CRON/AUTOMATION (82 files)

### Cron Tool Actions
- `status` — Show cron system status
- `list` — List all scheduled jobs
- `add` — Create new cron job
- `update` — Modify existing job
- `remove` — Delete a job
- `run` — Manually trigger a job (modes: due, force)
- `runs` — Show run history
- `wake` — Wake up immediately (modes: now, next-heartbeat)

### Schedule Types
- `at` — One-time at specific date/time
- `every` — Recurring interval
- `cron` — Full cron expression

### Delivery Modes
- `none` — No notification
- `announce` — Announce in channel
- `webhook` — POST to URL

### Heartbeat System (15 files)
- `heartbeat-system-prompt.ts` — System prompt for heartbeat
- `heartbeat-filter.ts` — Filter heartbeat events
- `heartbeat-reply-payload.ts` — Reply payload for heartbeat
- `heartbeat-policy.ts` — Heartbeat scheduling policy

---

## 7. SESSION SYSTEM (180 files)

### Session Features
- Session store with persistence
- Session key utilities
- Session-level async task status
- Session idle management (`/session idle`)
- Session interaction modes
- Session identity reconciliation
- Session actor queues (ACP)
- Session meta information

### Context Engine (7 files)
- `delegate.ts` — Context delegation
- `registry.ts` — Context providers registry
- `init.ts` — Initialization
- Context compaction (31 files):
  - `compaction.ts` — Main compaction logic
  - `compact-reasons.ts` — Why compaction happened
  - `compact.hooks.harness.ts` — Hooks during compaction
  - `compaction-instructions.ts` — Instructions for compaction
  - `compaction-safeguard-quality.ts` — Quality checks

---

## 8. AGENT SYSTEM (652 files in src/agents/)

### Key Components
- `pi-embedded-runner/` — Core agent execution runtime
- `skills-clawhub.ts` — ClawHub skill marketplace integration
- `skills-install-download.ts` — Skill download
- `skills-install-extract.ts` — Skill extraction
- `memory-search.ts` — Memory search for agents
- `failover-policy.ts` — Model failover logic
- `failover-error.ts` — Failover error handling
- `bootstrap-hooks.ts` — Agent lifecycle hooks
- `compaction.ts` — Context window compaction
- `heartbeat-system-prompt.ts` — System prompt additions

### Agent-to-Agent Communication
- `sessions_list` — Discover active agents
- `sessions_history` — Get session transcripts
- `sessions_send` — Message other agents
- `sessions_spawn` — Create new agent sessions
- `sessions_yield` — Transfer control

### Sub-agents
- `subagent-registry-memory.ts` — Sub-agent state
- `subagents-tool.ts` — Manage running sub-agents

---

## 9. HOOKS SYSTEM (33 files in src/hooks/)

### Bundled Hooks
- `boot-md/handler.ts` — Boot markdown hook
- `bootstrap-extra-files/handler.ts` — Extra files on bootstrap
- `command-logger/handler.ts` — Log commands
- `session-memory/handler.ts` — Session memory persistence
- `session-memory/transcript.ts` — Transcript management

### Hook Configuration
- `config.ts` — Hook configuration schema
- `fire-and-forget.ts` — Async hook execution
- Event types: message, tool_call, session_start, session_end, compaction, etc.

---

## 10. CHANNEL SYSTEM (143 files)

### Per-Channel Features
- Pairing (22 files) — DM security with codes
- Allowlists — Per-sender access control
- Broadcast groups — One-to-many messaging
- Group messages — Mention-gating, activation modes
- Channel routing — Message routing rules
- Account snapshots — Channel state
- Ack reactions — Read receipts

### Supported Channels
WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage, IRC, Teams, Matrix, Feishu, LINE, Mattermost, Nextcloud Talk, Nostr, Synology, Tlon, Twitch, Zalo, WeChat, QQ, WebChat

---

## 11. MEDIA CAPABILITIES (actual tool files)

### Generation
- `image-generate-tool.ts` — AI image generation (multiple providers)
- `video-generate-tool.ts` — AI video generation
- `music-generate-tool.ts` — AI music generation
- `pdf-tool.ts` — PDF generation/processing
- Background generation for long tasks

### Understanding
- `media-understanding/` — Analyze images, video, audio
- `link-understanding/` — Extract content from URLs
- `image-tool.ts` — Image manipulation

---

## 12. VOICE SYSTEM (actual files)

### Input
- `realtime-transcription/` — Live speech-to-text
- `realtime-voice/` — Real-time voice streaming
- Voice wake (macOS/iOS) — `src/infra/voicewake.ts`
- Talk mode (Android) — `src/plugin-sdk/talk-voice.ts`
- Voice calls — `src/plugin-sdk/voice-call.ts`

### Output
- `tts-tool.ts` — TTS control (ElevenLabs, OpenAI, Edge, system fallback)
- `src/tts/` — 23 TTS implementation files

---

## 13. SECURITY (actual implementations)

- **DM Pairing** (22 files) — Codes for unknown senders
- **Elevated Bash** (3 files) — `/elevated on|off` for dangerous commands
- **Approval System** (71 files) — Approve/deny tool executions
- **Secrets Management** — `src/secrets/` module
- **Proxy Capture** — `src/proxy-capture/` for traffic inspection
- **Security Module** — `src/security/` for scanning
- **Config**: `.detect-secrets.cfg`, `.secrets.baseline`

---

## 14. MODEL MANAGEMENT (actual code)

- `model-picker.ts` — Interactive model selection
- `failover-policy.ts` — Automatic failover rules
- `failover-error.ts` — Error classification for retry
- `failover-matches.ts` — Match errors to fallback models
- `assistant-failover.ts` — Runtime failover execution
- `failover-observation.ts` — Track failover patterns

---

## 15. PLUGIN SYSTEM (actual modules)

- `src/plugin-sdk/` — Plugin development SDK
- `src/plugins/` — Plugin runtime
- `plugin-activation-boundary.ts` — Plugin scope control
- `webhook-ingress.ts` — Plugin webhook handler
- `webhook-memory-guards.ts` — Memory protection
- `realtime-voice.ts` — Voice plugin API
- `talk-voice.ts` — Talk mode plugin
- `voice-call.ts` — Voice call plugin
- `video-generation-core.ts` — Video gen plugin API

---

## 16. DEPLOYMENT & INFRASTRUCTURE

### Daemon (33 files)
- Gateway daemon management
- Auto-restart / respawn logic
- Container context handling
- Diagnostics

### Docker
- Dockerfile with sandbox variants
- Build cache management
- Image digest tracking

### Process Management
- Entry point with respawn
- Version fast-path updates
- Global state management

---

## SOURCE CODE STATISTICS

| Metric | Count |
|--------|-------|
| Total files | 14,935 |
| TypeScript files | 11,517 |
| Agent tools | 61 |
| Source modules | 60+ |
| Agent system files | 652 |
| Gateway files | 290 |
| Infrastructure files | 314 |
| Auto-reply files | 273 |
| CLI files | 217 |
| Session files | 180 |
| Config files | 173 |
| Channel files | 143 |
| Memory files | 105 |
| Cron files | 82 |
| Hooks files | 74 |
| Approval files | 71 |
| Documentation pages | 427 |
| Chat commands | 24+ |
| Dreaming phases | 3 (Light/Deep/REM) |
