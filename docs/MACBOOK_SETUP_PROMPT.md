# COMPLETE RUFLOW BOOTSTRAP PROMPT FOR MACBOOK

> Copy-paste everything below the `---` line into Claude Code on your MacBook.
> This will set up the ENTIRE Ruflow ecosystem: repo, skills, agents, hooks, settings, graphify, and all instructional documents.

---

You are being bootstrapped with the **Ruflow** project — a full AI orchestration platform (formerly "Claude Flow"). This prompt contains EVERYTHING you need to replicate the setup from my Windows machine. Execute every step carefully.

## PHASE 1: Clone the Repo

```bash
cd ~ && git clone https://github.com/FaizanAshrafJatt/ruflow.git && cd ruflow
```

If already cloned:
```bash
cd ~/ruflow && git pull origin main
```

Then install dependencies:
```bash
npm install
```

## PHASE 2: Install 1,333 Global Skills (Antigravity Awesome Skills)

These go into `~/.claude/skills/` and give you access to 1,333 skills across 58+ categories.

```bash
npx antigravity-awesome-skills --claude
```

Verify:
```bash
ls ~/.claude/skills/ | wc -l
# Should be ~1333
```

## PHASE 3: Set Up Global CLAUDE.md

Create `~/.claude/CLAUDE.md` with this exact content:

```markdown
# graphify
- **graphify** (`~/.claude/skills/graphify/SKILL.md`) - any input to knowledge graph. Trigger: `/graphify`
When the user types `/graphify`, invoke the Skill tool with `skill: "graphify"` before doing anything else.
```

## PHASE 4: Set Up Project Settings (.claude/settings.json)

The repo already includes `.claude/settings.json` with all hooks and configuration. After cloning, verify it exists:

```bash
cat ruflow/.claude/settings.json | head -5
```

Here is what it contains (for reference — it's already in the repo):

### Settings Overview
- **Model**: `claude-opus-4-6`
- **Agent Teams**: Enabled with auto-assign on idle, pattern training on complete
- **Swarm Topology**: `hierarchical-mesh`, max 15 agents
- **Memory Backend**: `hybrid` (SQLite AgentDB + HNSW vector search)
- **Neural Learning**: Enabled with SONA
- **Daemon Workers**: map, audit, optimize, consolidate, testgaps, ultralearn, deepdive, document, refactor, benchmark
- **Security**: Auto-scan on edit, CVE checking, threat modeling

### Environment Variables in Settings
```json
{
  "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1",
  "CLAUDE_FLOW_V3_ENABLED": "true",
  "CLAUDE_FLOW_HOOKS_ENABLED": "true"
}
```

### Hooks System (Already Configured in Repo)
The settings.json has these hooks wired up:

| Hook Event | What It Does |
|------------|-------------|
| **PreToolUse (Bash)** | Runs `hook-handler.cjs pre-bash` for safety checks |
| **PreToolUse (Glob/Grep)** | Points to graphify knowledge graph if available |
| **PostToolUse (Write/Edit)** | Runs `hook-handler.cjs post-edit` for pattern learning |
| **UserPromptSubmit** | Runs `hook-handler.cjs route` for intelligent task routing |
| **SessionStart** | Restores session, imports auto-memory, connects to vector DB |
| **SessionEnd** | Saves session state, persists to vector DB |
| **Stop** | Syncs auto-memory, final save to vector DB |
| **PreCompact** | Saves session state before context compaction |
| **SubagentStart** | Status tracking for spawned agents |
| **TeammateIdle** | Auto-assigns pending tasks to idle teammates |
| **TaskCompleted** | Trains patterns from successful work |

### Permissions (Already in Repo)
Allows: all claude-flow/ruv-swarm/flow-nexus MCP tools, git operations, node/npx commands, jq, ls, pwd, which.
Denies: reading .env files, `rm -rf /`.

## PHASE 5: Set Up MCP Servers

Run these commands to register MCP servers:

```bash
claude mcp add claude-flow npx claude-flow@v3alpha mcp start
claude mcp add ruv-swarm npx ruv-swarm mcp start
```

## PHASE 6: Read All Key Instructional Documents

These documents are in the repo and you MUST read them to understand the full system:

### Primary Instruction Files

| File | Purpose | Priority |
|------|---------|----------|
| `CLAUDE.md` | Main project instructions — behavioral rules, architecture, swarm protocols, CLI commands, publishing, Karpathy principles. **44KB, the bible of this project.** | CRITICAL |
| `INSTRUCTIONS.md` | Complete setup and installation guide — prerequisites, step-by-step install, autonomous setup prompt. **47KB.** | CRITICAL |
| `AGENTS.md` | Agent guide — 60+ agent types, division of labor between Claude Code and MCP, swarm coordination patterns. **22KB.** | HIGH |
| `README.md` | Project overview, features, quick start. **43KB.** | HIGH |
| `CLAUDE.local.md` | Local dev config — env vars, plugin registry, hooks quick reference, intelligence system. | MEDIUM |

### Training and Setup Docs (in /docs/)

| File | Purpose |
|------|---------|
| `docs/TRAINING_PROMPT.md` | Training prompt for new Claude Code instances — skill installation, learning the 1,331 skills |
| `docs/VPS_PASTE_THIS_PROMPT.md` | VPS-specific copy-paste prompt with full autonomous training steps |
| `docs/VPS_AUTONOMOUS_PROMPT.md` | Autonomous VPS training — phases for pulling code, reading ALL skills, saving to memory |
| `docs/training/cinematic-3d-websites-clean.md` | Training doc for cinematic 3D website development |
| `docs/training/cinematic-3d-websites-full.md` | Full cinematic 3D websites reference |
| `docs/training/claude-code-master-guide-2026.md` | Master guide for Claude Code usage in 2026 |

### Read them now:

```
Read CLAUDE.md (full file — it's ~44KB, read in chunks)
Read INSTRUCTIONS.md (full file — ~47KB, read in chunks)  
Read AGENTS.md (full file — ~22KB)
Read README.md (full file — ~43KB, read in chunks)
Read docs/TRAINING_PROMPT.md
Read docs/VPS_PASTE_THIS_PROMPT.md
Read docs/VPS_AUTONOMOUS_PROMPT.md
Read docs/training/claude-code-master-guide-2026.mdnah w
```

## PHASE 7: Understand the Directory Structure

```
ruflow/
├── .agents/                    # Agent configs + 1,522 skill definitions
│   ├── config.toml             # Agent configuration
│   └── skills/                 # 1,522 skills (antigravity-awesome-skills)
├── .claude/                    # Claude Code configuration
│   ├── settings.json           # Hooks, permissions, env vars, agent teams config
│   ├── settings.local.json     # Local overrides (session memory hook)
│   ├── mcp.json                # MCP server definitions
│   ├── statusline.mjs          # Status line display
│   ├── agents/                 # 34 agent definition directories
│   │   ├── core/               # Core agents (coder, reviewer, tester, etc.)
│   │   ├── swarm/              # Swarm coordination agents
│   │   ├── security/           # Security agents
│   │   ├── v3/                 # V3 specialized agents
│   │   ├── hive-mind/          # Hive-mind consensus agents
│   │   ├── github/             # GitHub integration agents
│   │   └── ...                 # 28 more agent directories
│   ├── commands/               # 28 slash command directories (140+ subcommands)
│   │   ├── sparc/              # SPARC methodology commands
│   │   ├── swarm/              # Swarm management commands
│   │   ├── github/             # GitHub workflow commands
│   │   ├── memory/             # Memory management commands
│   │   ├── hive-mind/          # Hive-mind commands
│   │   ├── coordination/       # Task orchestration commands
│   │   ├── automation/         # Auto-agent, self-healing commands
│   │   ├── analysis/           # Performance analysis commands
│   │   ├── monitoring/         # Real-time monitoring commands
│   │   ├── optimization/       # Topology, caching, parallel execution
│   │   ├── training/           # Neural training, pattern learning
│   │   ├── hooks/              # Hook management commands
│   │   ├── flow-nexus/         # Flow Nexus platform commands
│   │   ├── pair/               # Pair programming commands
│   │   ├── verify/             # Verification commands
│   │   ├── workflows/          # Workflow automation commands
│   │   ├── stream-chain/       # Stream chaining commands
│   │   └── truth/              # Truth verification commands
│   ├── helpers/                # 46 hook scripts
│   │   ├── hook-handler.cjs    # Main hook dispatcher
│   │   ├── intelligence.cjs    # Pattern matching intelligence
│   │   ├── karpathy.cjs        # Karpathy coding principles enforcement
│   │   ├── session-vectordb.cjs # Vector DB session persistence
│   │   ├── auto-memory-hook.mjs # Auto memory import/sync
│   │   ├── memory-init.cjs     # Memory database initialization
│   │   ├── memory-query.cjs    # Memory search/query
│   │   ├── router.cjs          # Task routing logic
│   │   ├── statusline.cjs      # Status line renderer
│   │   └── ...                 # 37 more helper scripts
│   ├── skills/                 # 73 project-level skills
│   │   ├── CATALOG.md          # Complete skill catalog (72 skills listed)
│   │   ├── ui-ux-pro-max/      # Full UI/UX design intelligence
│   │   ├── design/             # Brand identity, logos, design tokens
│   │   ├── swarm-orchestration/ # Multi-agent swarm coordination
│   │   ├── dual-mode/          # Claude + Codex hybrid workflows
│   │   ├── ruflow-memory/      # Persistent memory database
│   │   └── ...                 # 67 more skill directories
│   └── checkpoints/            # Session checkpoints
├── src/                        # Source code
├── v3/                         # V3 packages
│   └── @claude-flow/
│       ├── cli/                # CLI entry point (26 commands)
│       ├── codex/              # Dual-mode Claude + Codex
│       ├── guidance/           # Governance control plane
│       ├── hooks/              # 17 hooks + 12 workers
│       ├── memory/             # AgentDB + HNSW search
│       └── security/           # Input validation, CVE remediation
├── scripts/                    # Utility scripts
│   ├── memory-db/              # AgentDB ingest, search, setup scripts
│   └── session-memory-hook.sh  # Session memory extraction
├── graphify-out/               # Knowledge graph output
│   ├── graph.json              # Graph data
│   ├── graph.html              # Visual graph explorer
│   └── GRAPH_REPORT.md         # God nodes and community analysis
├── docs/                       # Documentation
│   ├── TRAINING_PROMPT.md      # Training prompt for new instances
│   ├── VPS_PASTE_THIS_PROMPT.md # VPS setup prompt
│   ├── VPS_AUTONOMOUS_PROMPT.md # Autonomous VPS training
│   └── training/               # Training documents
├── agents/                     # Additional agent definitions
├── ruflo/                      # ruflo npm package wrapper
├── plugin/                     # Plugin system
├── tests/                      # Test files
├── data/                       # Data directory
├── CLAUDE.md                   # Project instructions (44KB)
├── CLAUDE.local.md             # Local dev config
├── INSTRUCTIONS.md             # Full setup guide (47KB)
├── AGENTS.md                   # Agent guide (22KB)
├── README.md                   # Project overview (43KB)
├── SECURITY.md                 # Security policy
├── CHANGELOG.md                # Change log
├── package.json                # npm package config
└── tsconfig.json               # TypeScript config
```

## PHASE 8: Understand Available Skills (72 Project Skills + 1,333 Global Skills)

### Project Skills (in .claude/skills/) — 72 Skills in 10 Categories

**Design and UI (7):** ui-ux-pro-max, ui-styling, design, design-system, slides, banner-design, brand

**Video Production - Koda Stack (10):** brief, trends, concept, script, art-direction, storyboard, generate, assemble, publish, repurpose
Pipeline: `/brief` -> `/trends` -> `/concept` -> `/script` -> `/art-direction` -> `/storyboard` -> `/generate` -> `/assemble` -> `/publish` -> `/repurpose`

**Development Workflow (14):** brainstorming, writing-plans, executing-plans, dispatching-parallel-agents, subagent-driven-development, test-driven-development, systematic-debugging, using-git-worktrees, finishing-a-development-branch, requesting-code-review, receiving-code-review, verification-before-completion, using-superpowers, writing-skills

**Memory and Persistence (6):** claude-mem, agentdb-advanced, agentdb-learning, agentdb-memory-patterns, agentdb-optimization, agentdb-vector-search

**Swarm and Orchestration (8):** swarm-orchestration, swarm-advanced, hive-mind-advanced, hooks-automation, worker-benchmarks, worker-integration, dual-mode, stream-chain

**GitHub Integration (5):** github-code-review, github-multi-repo, github-project-management, github-release-management, github-workflow-automation

**Architecture and V3 (9):** v3-cli-modernization, v3-core-implementation, v3-ddd-architecture, v3-integration-deep, v3-mcp-optimization, v3-memory-unification, v3-performance-optimization, v3-security-overhaul, v3-swarm-coordination

**Intelligence and Neural (2):** reasoningbank-agentdb, reasoningbank-intelligence

**Platform and Integration (7):** flow-nexus-neural, flow-nexus-platform, flow-nexus-swarm, agentic-jujutsu, website-builder-setup, skill-builder, performance-analysis

**Quality and Verification (3):** verification-quality, pair-programming, sparc-methodology

**Memory Database (1):** ruflow-memory

### Global Skills (in ~/.claude/skills/) — 1,333 Skills

Installed via `npx antigravity-awesome-skills --claude`. Categories include: cloud, development, ai-ml, security, business, workflow, marketing, web-development, content, automation, and 48 more. Search with:
```bash
cat .agents/skills/antigravity-awesome-skills/skills_index.json | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); const q=process.argv[1].toLowerCase(); d.filter(s=>(s.description||'').toLowerCase().includes(q)||(s.name||'').includes(q)).slice(0,10).forEach(s=>console.log(s.name+': '+(s.description||'').slice(0,80)));" "KEYWORD"
```

## PHASE 9: Understand Available Agents (60+ Types)

### Agent Categories

**Core Development:** coder, reviewer, tester, planner, researcher
**V3 Specialized:** security-architect, security-auditor, memory-specialist, performance-engineer
**Swarm Coordination:** hierarchical-coordinator, mesh-coordinator, adaptive-coordinator, collective-intelligence-coordinator, swarm-memory-manager
**Consensus & Distributed:** byzantine-coordinator, raft-manager, gossip-coordinator, consensus-builder, crdt-synchronizer, quorum-manager, security-manager
**Performance:** perf-analyzer, performance-benchmarker, task-orchestrator, memory-coordinator, smart-agent
**GitHub:** github-modes, pr-manager, code-review-swarm, issue-tracker, release-manager, workflow-automation, project-board-sync, repo-architect, multi-repo-swarm
**SPARC:** sparc-coord, sparc-coder, specification, pseudocode, architecture, refinement
**Specialized:** backend-dev, mobile-dev, ml-developer, cicd-engineer, api-docs, system-architect, code-analyzer
**Testing:** tdd-london-swarm, production-validator

## PHASE 10: Understand Slash Commands (28 Categories, 140+ Subcommands)

Key slash commands available:

| Command | What It Does |
|---------|-------------|
| `/sparc` | SPARC methodology orchestrator |
| `/swarm:swarm-init` | Initialize multi-agent swarm |
| `/swarm:swarm-spawn` | Spawn swarm agents |
| `/swarm:swarm-status` | Check swarm status |
| `/hive-mind:hive-mind-init` | Initialize hive-mind consensus |
| `/memory:memory-search` | Search persistent memory |
| `/memory:memory-persist` | Persist data to memory |
| `/github:code-review` | AI code review |
| `/github:pr-manager` | PR lifecycle management |
| `/coordination:swarm-init` | Coordination init |
| `/coordination:agent-spawn` | Spawn coordinated agents |
| `/automation:smart-agents` | Intelligent agent spawning |
| `/automation:self-healing` | Self-healing automation |
| `/pair:start` | Start pair programming session |
| `/verify:start` | Start verification pipeline |
| `/training:neural-train` | Neural pattern training |
| `/hooks:setup` | Hook configuration |
| `/monitoring:status` | System monitoring |
| `/optimization:parallel-execute` | Parallel execution |
| `/analysis:performance-report` | Performance analysis |
| `/brainstorm` | Brainstorming session |
| `/graphify` | Generate knowledge graph from any input |
| `/write-plan` | Create implementation plan |
| `/execute-plan` | Execute a written plan |
| `/evaluate-repository` | Full repository evaluation |
| `/review` | Code review |
| `/security-review` | Security audit |
| `/init` | Initialize new project |

## PHASE 11: Key Behavioral Rules (From CLAUDE.md)

1. Do what has been asked; nothing more, nothing less
2. NEVER create files unless absolutely necessary
3. ALWAYS prefer editing existing files over creating new ones
4. NEVER proactively create documentation unless explicitly requested
5. NEVER save working files to root folder — use /src, /tests, /docs, /config, /scripts, /examples
6. ALWAYS read a file before editing it
7. NEVER commit secrets, credentials, or .env files
8. All operations MUST be concurrent/parallel in a single message
9. ALWAYS batch ALL todos in ONE TodoWrite call
10. ALWAYS spawn ALL agents in ONE message
11. Follow Karpathy Coding Principles: think before coding, simplicity first, surgical changes, goal-driven execution

## PHASE 12: Graphify Knowledge Graph

The `/graphify` skill converts any input into a knowledge graph. It's registered in `~/.claude/CLAUDE.md` and triggers via the Skill tool. The output goes to `graphify-out/` with:
- `graph.json` — structured graph data
- `graph.html` — interactive visual explorer
- `GRAPH_REPORT.md` — god nodes and community analysis

## PHASE 13: Vector Database (Session Persistence)

Every session auto-connects to dual vector databases:
- **SQLite AgentDB** at `memory/agentdb.sqlite` — TF-IDF + cosine similarity for local persistent search
- **MCP HNSW** — 384-dim semantic embeddings for live session queries (150x-12,500x faster)

Scripts for manual operations:
```bash
node scripts/memory-db/ingest.js --all        # Re-ingest everything
node scripts/memory-db/search.js "query"       # Search AgentDB
node scripts/memory-db/setup.js               # Initialize schema
```

## PHASE 14: Verification

After setup, verify everything:

```bash
# Check repo
ls CLAUDE.md INSTRUCTIONS.md AGENTS.md README.md

# Check project skills
ls .claude/skills/ | wc -l
# Should be ~73

# Check project agents
ls .claude/agents/ | wc -l  
# Should be ~34

# Check project commands
ls .claude/commands/ | wc -l
# Should be ~28

# Check global skills
ls ~/.claude/skills/ | wc -l
# Should be ~1333

# Check global CLAUDE.md has graphify
cat ~/.claude/CLAUDE.md

# Check settings.json has hooks
cat .claude/settings.json | head -5

# Check helpers exist
ls .claude/helpers/ | wc -l
# Should be ~46

# Check MCP
claude mcp list
```

## PHASE 15: How To Work From Now On

1. Always `git pull origin main` first to get latest updates
2. For any task, search skills index for relevant skills matching the task
3. Read those SKILL.md files before starting work
4. For complex tasks (3+ files), auto-invoke swarm with hierarchical topology
5. For simple tasks (1-2 files), work directly without swarm
6. Use `/graphify` to build knowledge graphs from any input
7. Use `/brainstorm` before creative/implementation work
8. Use `/write-plan` then `/execute-plan` for multi-step tasks
9. Use `/verify:start` before claiming anything is done
10. All operations should be batched and parallelized in single messages

## SUMMARY OF WHAT YOU NOW HAVE

| Component | Count | Location |
|-----------|-------|----------|
| Global Skills | 1,333 | `~/.claude/skills/` |
| Project Skills | 73 | `.claude/skills/` |
| Agent Skills (.agents) | 1,522 | `.agents/skills/` |
| Agent Definitions | 34 dirs | `.claude/agents/` |
| Slash Commands | 28 categories (140+) | `.claude/commands/` |
| Hook Scripts | 46 | `.claude/helpers/` |
| Agent Types | 60+ | Spawnable via Task tool |
| MCP Servers | 2-3 | claude-flow, ruv-swarm |
| Graphify | 1 skill | `~/.claude/skills/graphify/` |
| Vector DBs | 2 | SQLite AgentDB + MCP HNSW |
| V3 Packages | 6 | `v3/@claude-flow/` |
| Instructional Docs | 7 key files | Root + /docs/ |

You are now fully equipped. Read all the instructional documents listed in Phase 6, then confirm you're ready.
