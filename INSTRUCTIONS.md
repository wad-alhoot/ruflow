# Ruflow (Claude Flow) -- Complete Setup and Installation Guide

> **Version**: 3.5.x | **Last Updated**: 2026-04-07
>
> This document provides a complete, step-by-step guide for setting up the Ruflow
> training directory from scratch on any machine. It covers prerequisites,
> installation, configuration, verification, and includes a full autonomous setup
> prompt for Claude Code at the end.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Installation Steps](#2-installation-steps)
3. [What to Scan and Learn](#3-what-to-scan-and-learn)
4. [Full Autonomous Setup Prompt](#4-full-autonomous-setup-prompt)
5. [Quick Start Commands](#5-quick-start-commands)
6. [Troubleshooting](#6-troubleshooting)
7. [Environment Variables](#7-environment-variables)
8. [Directory Structure Reference](#8-directory-structure-reference)

---

## 1. Prerequisites

### Required Software

| Software     | Minimum Version | Check Command          | Notes                              |
|--------------|-----------------|------------------------|------------------------------------|
| Node.js      | >= 20.0.0       | `node --version`       | LTS recommended (20.x or 22.x)    |
| npm          | >= 9.0.0        | `npm --version`        | Ships with Node.js                 |
| Git          | >= 2.30         | `git --version`        | Required for cloning and hooks     |
| Claude Code  | Latest          | `claude --version`     | Anthropic CLI for agent execution  |
| TypeScript   | >= 5.0.0        | `npx tsc --version`    | Required for V3 package builds     |

### Optional Software

| Software     | Purpose                                    | Check Command       |
|--------------|--------------------------------------------|---------------------|
| pnpm         | V3 workspace management                   | `pnpm --version`    |
| tmux         | Agent Teams split-pane display (Linux/Mac) | `tmux -V`           |
| jq           | JSON processing in hooks                   | `jq --version`      |
| gh           | GitHub CLI for PR/issue workflows          | `gh --version`      |

### System Requirements

- **Disk Space**: At least 2 GB free for node_modules, memory databases, and caches.
- **RAM**: 4 GB minimum; 8 GB recommended for concurrent agent swarms.
- **OS**: Windows 10/11, macOS 12+, or Linux (Ubuntu 22.04+). Windows requires
  Git Bash (installed with Git for Windows).

### Accounts and Keys

- **Anthropic API Key**: Required for Claude Code operation. Set via
  `ANTHROPIC_API_KEY` environment variable or `claude auth login`.
- **GitHub Account**: Required if using GitHub integration features (optional).
- **Pinata Account**: Required only for IPFS plugin registry maintenance (optional).

---

## 2. Installation Steps

### Step 1: Clone the Repository

```bash
git clone https://github.com/ruvnet/claude-flow.git Ruflow
cd Ruflow
```

If you already have the repository, pull the latest:

```bash
cd Ruflow
git pull origin main
```

### Step 2: Install Root Dependencies

```bash
npm install
```

This installs the root package dependencies (semver, zod, and dev tools). The
`node_modules` directory will be created at the project root.

### Step 3: Install Sub-Package Dependencies

Several sub-packages have their own dependency trees:

```bash
# Claude Memory system
cd src/claude-mem && npm install && cd ../..

# UI/UX Pro Max Skill CLI
cd src/ui-ux-pro-max-skill/cli && npm install && cd ../../..
```

### Step 4: Build V3 Packages (Optional but Recommended)

If you need to run the V3 CLI locally:

```bash
cd v3/@claude-flow/cli && npm install && npm run build && cd ../../..
```

### Step 5: Authenticate Claude Code

```bash
# Login to Anthropic (opens browser for authentication)
claude auth login

# Verify authentication
claude auth status
```

### Step 6: Configure Claude Code for Autonomous Operation

```bash
# Enable dangerous mode skip for autonomous workflows
# (This allows Claude Code to run without permission prompts)
claude config set --global skipDangerousModePermissionPrompt true

# Enable Agent Teams experimental feature
claude config set --project env.CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS 1
```

### Step 7: Add MCP Servers

MCP (Model Context Protocol) servers provide 259+ tools for agent coordination:

```bash
# Primary MCP server -- claude-flow (required)
claude mcp add claude-flow -- npx claude-flow@v3alpha mcp start

# Secondary MCP server -- ruv-swarm (optional, for swarm coordination)
claude mcp add ruv-swarm -- npx ruv-swarm mcp start

# Tertiary MCP server -- flow-nexus (optional, for cloud features)
claude mcp add flow-nexus -- npx flow-nexus@latest mcp start
```

### Step 8: Configure Git Bash Path (Windows Only)

On Windows, Claude Code hooks require Git Bash. You must point to its location:

```bash
# Common Git Bash locations:
# C:\Program Files\Git\bin\bash.exe
# D:\Personal\Git\bin\bash.exe

# Set the environment variable (PowerShell)
$env:CLAUDE_CODE_GIT_BASH_PATH = "C:\Program Files\Git\bin\bash.exe"

# Or set it permanently (PowerShell, run as Administrator)
[System.Environment]::SetEnvironmentVariable("CLAUDE_CODE_GIT_BASH_PATH", "C:\Program Files\Git\bin\bash.exe", "User")

# Or set it in Command Prompt
set CLAUDE_CODE_GIT_BASH_PATH=C:\Program Files\Git\bin\bash.exe

# Or add to your shell profile (.bashrc / .zshrc) if using WSL or Git Bash
export CLAUDE_CODE_GIT_BASH_PATH="/c/Program Files/Git/bin/bash.exe"
```

### Step 9: Verify Installation

```bash
# Check Claude Code configuration
claude config list

# Check authentication
claude auth status

# Check MCP servers
claude mcp list

# Run doctor diagnostics (auto-fix issues)
npx claude-flow@v3alpha doctor --fix

# Verify Node.js version
node --version

# Verify npm version
npm --version

# Verify Git
git --version
```

---

## 3. What to Scan and Learn

The Ruflow directory contains a massive training corpus. Here is the complete
inventory of what Claude Code should internalize, listed in recommended scan order.

### 3.1 Project Instructions (Priority: Critical)

| File                       | Size  | Purpose                                    |
|----------------------------|-------|--------------------------------------------|
| `CLAUDE.md`                | ~39KB | Master project instructions and guidelines |
| `CLAUDE.local.md`          | ~2KB  | Local development configuration overrides  |
| `.claude/settings.json`    | ~8KB  | Runtime configuration, hooks, permissions  |
| `.claude/settings.local.json` | varies | Local settings overrides                |

### 3.2 Skills (Priority: Critical) -- 71 Skills

Location: `.claude/skills/*/SKILL.md`

Each skill directory contains a `SKILL.md` file that defines a specialized
capability. These are invoked via slash commands (e.g., `/ui-ux-pro-max`,
`/brainstorm`, `/brief`).

Full list of 71 skills:

```
agentdb-advanced          agentdb-learning          agentdb-memory-patterns
agentdb-optimization      agentdb-vector-search     agentic-jujutsu
art-direction             assemble                  banner-design
brainstorming             brand                     brief
claude-mem                concept                   design
design-system             dispatching-parallel-agents  dual-mode
executing-plans           finishing-a-development-branch  flow-nexus-neural
flow-nexus-platform       flow-nexus-swarm          generate
github-code-review        github-multi-repo         github-project-management
github-release-management github-workflow-automation hive-mind-advanced
hooks-automation          pair-programming          performance-analysis
publish                   reasoningbank-agentdb     reasoningbank-intelligence
receiving-code-review     repurpose                 requesting-code-review
script                    skill-builder             slides
sparc-methodology         storyboard                stream-chain
subagent-driven-development  swarm-advanced         swarm-orchestration
systematic-debugging      test-driven-development   trends
ui-styling                ui-ux-pro-max             using-git-worktrees
using-superpowers         v3-cli-modernization      v3-core-implementation
v3-ddd-architecture       v3-integration-deep       v3-mcp-optimization
v3-memory-unification     v3-performance-optimization  v3-security-overhaul
v3-swarm-coordination     verification-before-completion  verification-quality
website-builder-setup     worker-benchmarks         worker-integration
writing-plans             writing-skills
```

### 3.3 Commands (Priority: High) -- 172 Commands

Location: `.claude/commands/`

Commands are organized into subdirectories by domain:

| Directory        | Purpose                                     |
|------------------|---------------------------------------------|
| `agents/`        | Agent spawning and coordination commands    |
| `analysis/`      | Performance and code analysis               |
| `automation/`    | Workflow automation and smart spawning       |
| `coordination/`  | Task orchestration and swarm initialization |
| `flow-nexus/`    | Cloud platform integration commands         |
| `github/`        | GitHub workflow, PR, and issue management   |
| `hive-mind/`     | Consensus and distributed coordination      |
| `hooks/`         | Hook lifecycle management                   |
| `memory/`        | Memory storage, search, and persistence     |
| `monitoring/`    | Real-time status and metrics monitoring     |
| `optimization/`  | Performance tuning and caching              |
| `pair/`          | Pair programming session management         |
| `sparc/`         | SPARC methodology workflow commands         |
| `stream-chain/`  | Pipeline and streaming operations           |
| `swarm/`         | Multi-agent swarm management                |
| `training/`      | Neural pattern training and specialization  |
| `truth/`         | Verification and truth checking             |
| `verify/`        | Installation and setup verification         |
| `workflows/`     | Workflow creation and execution             |

Top-level command files:
- `brainstorm.md` -- Creative brainstorming sessions
- `claude-flow-help.md` -- Help and guidance
- `claude-flow-memory.md` -- Memory operations
- `claude-flow-swarm.md` -- Swarm operations
- `evaluate-repository.md` -- Repository analysis
- `execute-plan.md` -- Plan execution
- `sparc.md` -- SPARC methodology
- `write-plan.md` -- Plan creation

### 3.4 Agent Definitions (Priority: High) -- 34 Agent Types

Location: `.claude/agents/`

Agent definitions are organized by domain:

| Directory/File                | Purpose                              |
|-------------------------------|--------------------------------------|
| `core/`                       | Base agent templates                 |
| `development/`                | Development-focused agents           |
| `testing/`                    | Testing and QA agents                |
| `security-auditor.md`         | Security audit agent                 |
| `code-reviewer.md`            | Code review agent                    |
| `project-coordinator.md`      | Project coordination agent           |
| `database-specialist.md`      | Database operations agent            |
| `python-specialist.md`        | Python development agent             |
| `typescript-specialist.md`    | TypeScript development agent         |
| `base-template-generator.md`  | Template generation agent            |
| `architecture/`               | Architecture design agents           |
| `consensus/`                  | Distributed consensus agents         |
| `custom/`                     | Custom agent definitions             |
| `data/`                       | Data processing agents               |
| `devops/`                     | DevOps and deployment agents         |
| `documentation/`              | Documentation generation agents      |
| `dual-mode/`                  | Dual-mode (Claude + Codex) agents    |
| `flow-nexus/`                 | Cloud platform agents                |
| `github/`                     | GitHub integration agents            |
| `goal/`                       | Goal-oriented planning agents        |
| `hive-mind/`                  | Hive-mind consensus agents           |
| `neural/`                     | Neural learning agents               |
| `optimization/`               | Performance optimization agents      |
| `payments/`                   | Payment processing agents            |
| `reasoning/`                  | Reasoning and analysis agents        |
| `security-auditor.md`         | Security scanning agent              |
| `sona/`                       | SONA neural architecture agents      |
| `sparc/`                      | SPARC methodology agents             |
| `specialized/`                | Domain-specific agents               |
| `sublinear/`                  | Sublinear algorithm agents           |
| `swarm/`                      | Swarm coordination agents            |
| `templates/`                  | Agent template library               |
| `v3/`                         | V3-specific agent definitions        |

### 3.5 Agent Skills Corpus (Priority: Medium) -- 1,521 Skills

Location: `.agents/skills/`

This is the antigravity-awesome-skills corpus containing 1,521 agentic skill
definitions. These provide broad domain coverage across development, security,
design, DevOps, data engineering, and more. Claude Code should be aware of the
index but does not need to read every file -- scan the directory listing and
read individual skills on demand.

### 3.6 Source Repositories (Priority: Medium)

Location: `src/`

| Directory                  | Purpose                                        |
|----------------------------|-------------------------------------------------|
| `antigravity-awesome-skills/` | 1,332 skills from the antigravity corpus     |
| `awesome-claude-code/`     | Claude Code best practices and patterns        |
| `claude-mem/`              | Claude Memory system (standalone)              |
| `koda-stack/`              | Koda development stack                         |
| `superpowers/`             | Claude Code superpowers extensions             |
| `ui-ux-pro-max-skill/`    | UI/UX design skill with CLI                    |
| `website-builder-setup/`  | Website builder configuration                  |

### 3.7 V3 Packages (Priority: Medium) -- 21 Packages

Location: `v3/@claude-flow/`

| Package        | Purpose                                          |
|----------------|--------------------------------------------------|
| `agents/`      | Agent type definitions and lifecycle             |
| `aidefence/`   | AI defense and safety tools                      |
| `browser/`     | Browser automation tools                         |
| `claims/`      | Claims-based authorization                       |
| `cli/`         | CLI entry point (26 commands, 140+ subcommands)  |
| `codex/`       | Dual-mode Claude + Codex collaboration           |
| `deployment/`  | Deployment management                            |
| `embeddings/`  | Vector embeddings with HNSW                      |
| `guidance/`    | Governance control plane                         |
| `hooks/`       | 17 hooks + 12 background workers                 |
| `integration/` | External integrations                            |
| `mcp/`         | MCP server implementation                        |
| `memory/`      | AgentDB + HNSW vector search                     |
| `neural/`      | Neural pattern training (SONA, MoE, EWC++)       |
| `performance/` | Performance profiling and benchmarking           |
| `plugins/`     | Plugin system (discovery, store, IPFS registry)  |
| `providers/`   | AI provider abstractions                         |
| `security/`    | Input validation, CVE remediation                |
| `shared/`      | Shared utilities and types                       |
| `swarm/`       | Multi-agent swarm coordination                   |
| `testing/`     | Testing utilities and frameworks                 |

### 3.8 Hooks and Helpers (Priority: High)

Location: `.claude/helpers/`

These are the runtime hooks that power autonomous behavior:

| File                          | Purpose                                    |
|-------------------------------|--------------------------------------------|
| `hook-handler.cjs`            | Central hook dispatcher                    |
| `auto-memory-hook.mjs`        | Automatic memory import/sync               |
| `router.cjs`                  | Intelligent task routing                   |
| `intelligence.cjs`            | Intelligence and learning system           |
| `memory.cjs`                  | Memory operations                          |
| `session.cjs`                 | Session lifecycle management               |
| `statusline.cjs`              | Status bar display                         |
| `learning-service.mjs`        | Pattern learning service                   |
| `metrics-db.mjs`              | Metrics database                           |
| `context-persistence-hook.mjs`| Context persistence across sessions        |
| `security-scanner.sh`         | Security scanning hook                     |
| `health-monitor.sh`           | Health monitoring                          |
| `worker-manager.sh`           | Background worker management               |
| `swarm-monitor.sh`            | Swarm monitoring                           |
| `daemon-manager.sh`           | Daemon lifecycle management                |

---

## 4. Full Autonomous Setup Prompt

Copy and paste the following prompt into Claude Code to have it scan, learn, and
activate everything in the Ruflow directory. Run Claude Code with the
`--dangerously-skip-permissions` flag for fully autonomous operation:

```bash
claude --dangerously-skip-permissions
```

Then paste this prompt:

````
You are initializing a Ruflow (Claude Flow) v3.5 training environment. This is a
comprehensive AI agent orchestration platform with 71 skills, 172 commands, 34
agent definitions, 1,521 agent skills, 21 V3 packages, and 259+ MCP tools.

Your task is to systematically scan, learn, and activate everything in this
directory. Follow each phase in order. Do not skip any phase. Report completion
status after each phase.

========================================================================
PHASE 1: ENVIRONMENT VERIFICATION
========================================================================

Verify all prerequisites are met. Run these checks and report results:

```bash
echo "=== ENVIRONMENT VERIFICATION ==="
echo "Node.js: $(node --version 2>/dev/null || echo 'NOT FOUND')"
echo "npm: $(npm --version 2>/dev/null || echo 'NOT FOUND')"
echo "Git: $(git --version 2>/dev/null || echo 'NOT FOUND')"
echo "TypeScript: $(npx tsc --version 2>/dev/null || echo 'NOT FOUND')"
echo "Claude Code: $(claude --version 2>/dev/null || echo 'NOT FOUND')"
echo "pnpm: $(pnpm --version 2>/dev/null || echo 'NOT FOUND - optional')"
echo "jq: $(jq --version 2>/dev/null || echo 'NOT FOUND - optional')"
echo "gh: $(gh --version 2>/dev/null || echo 'NOT FOUND - optional')"
echo "================================="
```

If Node.js is below 20.0.0 or npm is below 9.0.0, STOP and report the issue.
Otherwise continue.

========================================================================
PHASE 2: DEPENDENCY VERIFICATION
========================================================================

Check that all npm dependencies are installed. If node_modules is missing or
incomplete, run npm install.

```bash
echo "=== DEPENDENCY CHECK ==="
echo "Root node_modules: $(ls node_modules 2>/dev/null | wc -l) packages"
npm ls --depth=0 2>/dev/null | tail -5
echo ""
echo "claude-mem node_modules: $(ls src/claude-mem/node_modules 2>/dev/null | wc -l) packages"
echo "ui-ux-pro-max CLI node_modules: $(ls src/ui-ux-pro-max-skill/cli/node_modules 2>/dev/null | wc -l) packages"
echo "================================="
```

If any dependency set is missing (0 packages), install it:
- Root: `npm install`
- claude-mem: `cd src/claude-mem && npm install && cd ../..`
- ui-ux-pro-max CLI: `cd src/ui-ux-pro-max-skill/cli && npm install && cd ../../..`

========================================================================
PHASE 3: READ MASTER INSTRUCTIONS
========================================================================

Read and fully internalize the project instructions. These define all behavioral
rules, concurrency requirements, swarm protocols, and coordination patterns.

Read these files in order:
1. Read CLAUDE.md -- This is the master instruction set (~39KB). Pay special
   attention to:
   - Behavioral Rules section (what to never do)
   - File Organization rules
   - Concurrency requirements (1 MESSAGE = ALL OPERATIONS)
   - Swarm configuration and anti-drift defaults
   - Agent routing table (codes 1-13)
   - Task complexity detection rules
   - V3 CLI commands (26 commands, 140+ subcommands)
   - Hooks system (17 hooks + 12 workers)
   - Publishing rules for npm packages

2. Read CLAUDE.local.md -- Local development overrides.

3. Read .claude/settings.json -- Runtime configuration including:
   - Model preferences (claude-opus-4-6 default)
   - Hook definitions (PreToolUse, PostToolUse, SessionStart, etc.)
   - Permission allow/deny lists
   - Agent Teams configuration
   - Swarm topology (hierarchical-mesh, 15 agents max)
   - Memory backend (hybrid with HNSW)
   - Daemon worker schedules
   - Learning configuration
   - Security settings (autoScan, CVE check, threat model)

========================================================================
PHASE 4: SCAN ALL SKILLS (71 Skills)
========================================================================

Read every SKILL.md file in the skills directory. Each skill defines a
specialized capability with specific triggers, instructions, and outputs.

```bash
echo "=== SCANNING 71 SKILLS ==="
skill_count=0
for dir in .claude/skills/*/; do
    skill_name=$(basename "$dir")
    if [ -f "$dir/SKILL.md" ]; then
        skill_count=$((skill_count + 1))
        echo "[$skill_count] Scanning: $skill_name"
    fi
done
echo "Total skills found: $skill_count"
echo "================================="
```

For each skill, read the SKILL.md file and note:
- Skill name and trigger pattern (slash command)
- What it does (purpose)
- Required inputs
- Expected outputs
- Any dependencies on other skills or tools

Read EVERY SKILL.md file. Do not skip any. Use parallel reads where possible
to batch file operations.

```bash
for dir in .claude/skills/*/; do
    cat "$dir/SKILL.md" 2>/dev/null
done
```

Build a mental index: skill name -> trigger command -> capability summary.

========================================================================
PHASE 5: SCAN ALL COMMANDS (172 Commands)
========================================================================

Read all command definitions. These are slash commands organized by domain.

```bash
echo "=== SCANNING 172 COMMANDS ==="
find .claude/commands -name "*.md" -type f | sort | while read f; do
    echo "Command: $f"
done
echo "================================="
```

Read each command file:

```bash
find .claude/commands -name "*.md" -exec cat {} \;
```

Organize commands by domain:
- agents/ -- Agent lifecycle commands
- analysis/ -- Code and performance analysis
- automation/ -- Smart automation and workflows
- coordination/ -- Task and swarm orchestration
- flow-nexus/ -- Cloud platform operations
- github/ -- GitHub integration
- hive-mind/ -- Consensus operations
- hooks/ -- Hook management
- memory/ -- Memory CRUD and search
- monitoring/ -- Real-time monitoring
- optimization/ -- Performance tuning
- pair/ -- Pair programming
- sparc/ -- SPARC methodology
- stream-chain/ -- Pipeline operations
- swarm/ -- Swarm management
- training/ -- Neural training
- truth/ -- Verification
- verify/ -- Setup verification
- workflows/ -- Workflow management

========================================================================
PHASE 6: SCAN AGENT DEFINITIONS (34 Types)
========================================================================

Read all agent definition files. These define the 60+ specialized agent types
available for swarm coordination.

```bash
echo "=== SCANNING AGENT DEFINITIONS ==="
find .claude/agents -name "*.md" -type f | sort | while read f; do
    echo "Agent: $f"
done
echo "================================="
```

Read each agent definition:

```bash
for file in $(find .claude/agents -name "*.md" -type f); do
    cat "$file" 2>/dev/null
done
```

For each agent, note:
- Agent type name
- Role and responsibilities
- Tools it can use
- How it coordinates with other agents
- When to spawn it (task complexity routing)

========================================================================
PHASE 7: INDEX AGENT SKILLS CORPUS (1,521 Skills)
========================================================================

The .agents/skills/ directory contains 1,521 agent skill definitions from
the antigravity-awesome-skills corpus. Do NOT read every file -- just build
an awareness index.

```bash
echo "=== INDEXING 1,521 AGENT SKILLS ==="
total=$(ls -1 .agents/skills/ 2>/dev/null | wc -l)
echo "Total agent skills: $total"
echo ""
echo "First 50 skills:"
ls -1 .agents/skills/ 2>/dev/null | head -50
echo ""
echo "Last 50 skills:"
ls -1 .agents/skills/ 2>/dev/null | tail -50
echo "================================="
```

Store awareness that 1,521 agent skills exist and can be accessed on demand.
When a user requests a skill not in the 71 core skills, check .agents/skills/
for it.

========================================================================
PHASE 8: SCAN SOURCE REPOSITORIES
========================================================================

Survey the source code repositories for awareness of available codebases.

```bash
echo "=== SOURCE REPOSITORIES ==="
for dir in src/*/; do
    name=$(basename "$dir")
    files=$(find "$dir" -type f 2>/dev/null | wc -l)
    echo "$name: $files files"
done
echo "================================="
```

Read the README or main entry point of each:
- src/antigravity-awesome-skills/ -- Read CATALOG.md for skill index
- src/awesome-claude-code/ -- Read README.md for patterns
- src/claude-mem/ -- Read package.json for capabilities
- src/koda-stack/ -- Read README.md for stack overview
- src/superpowers/ -- Read README.md for extensions
- src/ui-ux-pro-max-skill/ -- Read README.md for design capabilities
- src/website-builder-setup/ -- Read README.md for builder setup

========================================================================
PHASE 9: SCAN V3 PACKAGES
========================================================================

Survey the V3 package architecture for awareness of available modules.

```bash
echo "=== V3 PACKAGES ==="
for dir in v3/@claude-flow/*/; do
    name=$(basename "$dir")
    if [ -f "$dir/package.json" ]; then
        version=$(node -e "console.log(require('./$dir/package.json').version)" 2>/dev/null || echo "unknown")
        echo "$name: v$version"
    else
        echo "$name: (no package.json)"
    fi
done
echo "================================="
```

Read the package.json of each V3 package to understand:
- Package name and version
- Dependencies
- Available commands/exports
- Build scripts

========================================================================
PHASE 10: SCAN HELPERS AND HOOKS
========================================================================

Read the hook handler and key helper files that power autonomous behavior.

```bash
echo "=== HELPERS ==="
ls -la .claude/helpers/
echo "================================="
```

Read these critical files:
1. .claude/helpers/hook-handler.cjs -- Central hook dispatcher
2. .claude/helpers/router.cjs -- Task routing logic
3. .claude/helpers/intelligence.cjs -- Intelligence system
4. .claude/helpers/memory.cjs -- Memory operations
5. .claude/helpers/session.cjs -- Session management
6. .claude/helpers/statusline.cjs -- Status display
7. .claude/helpers/auto-memory-hook.mjs -- Memory sync

Understanding these files tells you how the hook system works:
- PreToolUse hooks run before each tool call
- PostToolUse hooks run after Write/Edit/MultiEdit
- UserPromptSubmit hooks route incoming prompts
- SessionStart hooks restore previous session state
- SessionEnd hooks persist session state
- Stop hooks sync memory on shutdown
- PreCompact hooks handle context compaction
- SubagentStart hooks report status
- TeammateIdle hooks auto-assign tasks
- TaskCompleted hooks train patterns

========================================================================
PHASE 11: VERIFY MCP CONNECTIONS
========================================================================

Check that MCP servers are configured and responsive.

```bash
echo "=== MCP SERVER CHECK ==="
claude mcp list 2>/dev/null || echo "MCP list command not available"
echo ""
cat .claude/mcp.json 2>/dev/null || echo "No mcp.json found"
echo "================================="
```

The project uses these MCP servers:
- claude-flow: Primary (259+ tools for agent/swarm/memory/hooks/neural)
- ruv-swarm: Secondary (swarm coordination)
- flow-nexus: Tertiary (cloud platform, optional)

If MCP servers are not listed, they need to be added:
```bash
claude mcp add claude-flow -- npx claude-flow@v3alpha mcp start
claude mcp add ruv-swarm -- npx ruv-swarm mcp start
```

========================================================================
PHASE 12: TEST HOOKS
========================================================================

Verify the hook system is functional.

```bash
echo "=== HOOK TEST ==="
npx claude-flow@v3alpha hooks session-start 2>/dev/null && echo "session-start: OK" || echo "session-start: FAILED (non-critical)"
npx claude-flow@v3alpha hooks worker list 2>/dev/null && echo "worker-list: OK" || echo "worker-list: FAILED (non-critical)"
echo "================================="
```

Hook failures are non-critical -- they indicate the daemon may not be running.
Start it with: `npx claude-flow@v3alpha daemon start`

========================================================================
PHASE 13: CREATE SESSION AND STORE CAPABILITIES
========================================================================

Initialize a session and store the capability map in memory.

```bash
echo "=== SESSION INITIALIZATION ==="
npx claude-flow@v3alpha hooks session-start --session-id "training-init-$(date +%s)" 2>/dev/null || echo "Session start via CLI not available"
echo "================================="
```

Store the following capability summary in your working memory:

CAPABILITY MANIFEST:
- 71 core skills (invoke via /skill-name)
- 172 slash commands (invoke via /domain:command-name)
- 34 agent type definitions (spawn via agent system)
- 1,521 agent skills in corpus (access on demand)
- 21 V3 packages (@claude-flow/*)
- 259+ MCP tools (mcp__claude-flow__*)
- 17 hooks + 12 background workers
- 40+ helper scripts for automation
- 7 source repositories
- 60+ agent types available for swarm coordination

SWARM DEFAULTS:
- Topology: hierarchical (anti-drift)
- Max agents: 8 (tight coordination)
- Strategy: specialized (clear roles)
- Consensus: raft (leader authority)
- Memory: hybrid (SQLite + AgentDB)

AGENT ROUTING:
- Code 1 (Bug Fix): coordinator, researcher, coder, tester
- Code 3 (Feature): coordinator, architect, coder, tester, reviewer
- Code 5 (Refactor): coordinator, architect, coder, reviewer
- Code 7 (Performance): coordinator, perf-engineer, coder
- Code 9 (Security): coordinator, security-architect, auditor
- Code 11 (Memory): coordinator, memory-specialist, perf-engineer
- Code 13 (Docs): researcher, api-docs

========================================================================
PHASE 14: COMPLETION REPORT
========================================================================

Generate a final report summarizing everything discovered:

```
=== RUFLOW TRAINING INITIALIZATION COMPLETE ===

Environment:
  Node.js:     [version]
  npm:         [version]
  Git:         [version]
  Claude Code: [version]

Dependencies:
  Root:        [count] packages
  claude-mem:  [count] packages
  ui-ux-cli:   [count] packages

Capabilities Loaded:
  Skills:      [count]/71
  Commands:    [count]/172
  Agents:      [count]/34
  Agent Skills: [count] indexed
  V3 Packages: [count]/21
  MCP Tools:   259+ available
  Hooks:       17 defined
  Workers:     12 defined

MCP Servers:
  claude-flow: [status]
  ruv-swarm:   [status]
  flow-nexus:  [status]

Hook System:
  PreToolUse:        [status]
  PostToolUse:       [status]
  UserPromptSubmit:  [status]
  SessionStart:      [status]
  SessionEnd:        [status]

Ready for operation. All capabilities loaded and indexed.
Ask me to use any skill, command, or agent type.
=== END REPORT ===
```

========================================================================
IMPORTANT BEHAVIORAL RULES (FROM CLAUDE.md)
========================================================================

After initialization, always follow these rules:

1. Do what has been asked; nothing more, nothing less.
2. NEVER create files unless absolutely necessary.
3. ALWAYS prefer editing existing files over creating new ones.
4. NEVER proactively create documentation files unless requested.
5. NEVER save files to the root folder -- use src/, tests/, docs/, config/,
   scripts/, or examples/.
6. ALWAYS read a file before editing it.
7. NEVER commit secrets, credentials, or .env files.
8. All operations MUST be concurrent/parallel in a single message.
9. ALWAYS batch ALL todos in ONE call.
10. ALWAYS spawn ALL agents in ONE message.
11. ALWAYS batch ALL file reads/writes/edits in ONE message.
12. For complex tasks (3+ files, new features, refactoring), AUTO-INVOKE
    the swarm protocol.
13. For simple tasks (single file, 1-2 line fixes, docs), skip swarm.

You are now fully initialized. Report completion and await instructions.
````

---

## 5. Quick Start Commands

After setup is complete, use these commands for common operations.

### Swarm Operations

```bash
# Initialize a swarm for multi-agent work
npx claude-flow@v3alpha swarm init --v3-mode

# Check swarm status
npx claude-flow@v3alpha swarm status

# Shut down swarm
npx claude-flow@v3alpha swarm shutdown
```

### System Health

```bash
# Run diagnostics (auto-fix mode)
npx claude-flow@v3alpha doctor --fix

# Check system status
npx claude-flow@v3alpha status

# View system info
npx claude-flow@v3alpha system info
```

### Daemon and Workers

```bash
# Start daemon with all background workers
npx claude-flow@v3alpha daemon start

# Check daemon status
npx claude-flow@v3alpha daemon status

# List active workers
npx claude-flow@v3alpha hooks worker list

# Dispatch a specific worker
npx claude-flow@v3alpha hooks worker dispatch --trigger audit
```

### Memory Operations

```bash
# Store a value
npx claude-flow@v3alpha memory store --namespace swarm --key "task-context" --value "..."

# Search memory
npx claude-flow@v3alpha memory search -q "authentication patterns"

# Retrieve a value
npx claude-flow@v3alpha memory retrieve --namespace swarm --key "task-context"

# List all memory entries
npx claude-flow@v3alpha memory list
```

### Agent Management

```bash
# Spawn an agent
npx claude-flow@v3alpha agent spawn -t coder --name my-coder

# List active agents
npx claude-flow@v3alpha agent list

# Check agent health
npx claude-flow@v3alpha agent health

# Stop an agent
npx claude-flow@v3alpha agent stop --name my-coder
```

### Hooks

```bash
# Start a session
npx claude-flow@v3alpha hooks session-start --session-id "my-session"

# Pre-task hook
npx claude-flow@v3alpha hooks pre-task --description "Implement user auth"

# Post-task hook
npx claude-flow@v3alpha hooks post-task --task-id "task-123" --success true

# Route a task
npx claude-flow@v3alpha hooks route --task "Fix login bug"
```

### Neural Training

```bash
# Train patterns
npx claude-flow@v3alpha neural train --model-type moe --epochs 10

# Check neural status
npx claude-flow@v3alpha neural status

# View learned patterns
npx claude-flow@v3alpha neural patterns
```

### Security

```bash
# Run security scan
npx claude-flow@v3alpha security scan --depth full

# Audit dependencies
npx claude-flow@v3alpha security audit

# Check for CVEs
npx claude-flow@v3alpha security cve
```

### Performance

```bash
# Run benchmarks
npx claude-flow@v3alpha performance benchmark --suite all

# Profile a component
npx claude-flow@v3alpha performance profile

# Generate performance report
npx claude-flow@v3alpha performance report
```

### Using Skills (Slash Commands)

Skills are invoked directly in Claude Code conversation:

```
/ui-ux-pro-max      -- Professional UI/UX design
/brainstorm          -- Creative brainstorming
/brief               -- Project brief creation
/design              -- Design workflow
/brand               -- Brand identity design
/concept             -- Concept development
/slides              -- Presentation creation
/script              -- Script writing
/generate            -- Content generation
/storyboard          -- Storyboard creation
/banner-design       -- Banner and ad design
/art-direction       -- Art direction guidance
/swarm-orchestration -- Multi-agent swarm setup
/sparc               -- SPARC methodology workflow
/test-driven-development -- TDD workflow
/systematic-debugging    -- Debug workflow
/pair-programming        -- Pair programming session
/publish                 -- npm publishing workflow
```

---

## 6. Troubleshooting

### Git Bash Path Issues (Windows)

**Problem**: Hooks fail with "bash not found" or "ENOENT" errors on Windows.

**Solution**: Set the Git Bash path environment variable.

```bash
# Find your Git installation
where git

# Common Git Bash locations:
# C:\Program Files\Git\bin\bash.exe
# C:\Program Files (x86)\Git\bin\bash.exe

# Set the path (PowerShell)
$env:CLAUDE_CODE_GIT_BASH_PATH = "C:\Program Files\Git\bin\bash.exe"
```

### Node.js Version Too Low

**Problem**: `npx claude-flow@v3alpha` fails or behaves unexpectedly.

**Solution**: Upgrade Node.js to version 20 or higher.

```bash
# Check current version
node --version

# Using nvm (recommended)
nvm install 20
nvm use 20

# Or download from https://nodejs.org/
```

### MCP Server Connection Failures

**Problem**: MCP tools return errors or are unavailable.

**Solution**:

```bash
# List configured servers
claude mcp list

# Remove and re-add the server
claude mcp remove claude-flow
claude mcp add claude-flow -- npx claude-flow@v3alpha mcp start

# Test the server
npx claude-flow@v3alpha mcp status
```

### Hook Timeout Issues

**Problem**: Hooks take too long and timeout.

**Solution**: Increase timeout values in `.claude/settings.json`. The default
timeouts are:

| Hook           | Default Timeout | Max Recommended |
|----------------|-----------------|-----------------|
| PreToolUse     | 5000ms          | 10000ms         |
| PostToolUse    | 10000ms         | 20000ms         |
| SessionStart   | 15000ms         | 30000ms         |
| SessionEnd     | 10000ms         | 20000ms         |
| UserPromptSubmit| 10000ms        | 15000ms         |

Edit `.claude/settings.json` and increase the `timeout` value for the
problematic hook.

### npm Dependency Resolution Errors

**Problem**: `npm install` fails with dependency conflicts.

**Solution**:

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# If conflicts persist, use legacy peer deps
npm install --legacy-peer-deps
```

### Daemon Won't Start

**Problem**: `npx claude-flow@v3alpha daemon start` fails.

**Solution**:

```bash
# Check if another daemon is running
npx claude-flow@v3alpha daemon status

# Stop existing daemon
npx claude-flow@v3alpha daemon stop

# Start fresh
npx claude-flow@v3alpha daemon start

# Check logs
npx claude-flow@v3alpha daemon logs 2>/dev/null
```

### Agent Teams Not Working

**Problem**: Task tool or teammate features not available.

**Solution**: Ensure the experimental flag is set:

```bash
claude config set --project env.CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS 1

# Verify
claude config list | grep AGENT_TEAMS
```

### Memory Database Errors

**Problem**: Memory operations fail with database errors.

**Solution**:

```bash
# Run migration
npx claude-flow@v3alpha memory migrate

# Or reset (WARNING: destroys data)
npx claude-flow@v3alpha system reset --component memory

# Or run doctor fix
npx claude-flow@v3alpha doctor --fix
```

### Permission Denied Errors

**Problem**: Claude Code blocks operations with permission errors.

**Solution**: Check the allow/deny lists in `.claude/settings.json` under
`permissions`. Add the required pattern to the `allow` array. Common patterns:

```json
{
  "permissions": {
    "allow": [
      "Bash(npx claude-flow*)",
      "Bash(npm *)",
      "Bash(git *)",
      "Bash(node *)",
      "mcp__claude-flow__*"
    ]
  }
}
```

For autonomous operation, use `--dangerously-skip-permissions` flag.

---

## 7. Environment Variables

### Required Variables

```bash
# Claude Code configuration
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

### Recommended Variables

```bash
# Ruflow configuration
CLAUDE_FLOW_V3_ENABLED=true
CLAUDE_FLOW_HOOKS_ENABLED=true
CLAUDE_FLOW_CONFIG=./claude-flow.config.json
CLAUDE_FLOW_LOG_LEVEL=info

# Memory backend
CLAUDE_FLOW_MEMORY_BACKEND=hybrid
CLAUDE_FLOW_MEMORY_PATH=./data/memory

# MCP server
CLAUDE_FLOW_MCP_PORT=3000
CLAUDE_FLOW_MCP_HOST=localhost
CLAUDE_FLOW_MCP_TRANSPORT=stdio
```

### Optional Variables

```bash
# API keys (for provider integration)
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GOOGLE_API_KEY=...

# Git Bash path (Windows only)
CLAUDE_CODE_GIT_BASH_PATH=C:\Program Files\Git\bin\bash.exe

# IPFS Plugin Registry (maintainers only)
PINATA_API_KEY=...
PINATA_API_SECRET=...
PINATA_API_JWT=...

# Supabase (for Flow Nexus cloud features)
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```

### Setting Variables

**Linux/macOS** -- Add to `~/.bashrc` or `~/.zshrc`:

```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
export CLAUDE_FLOW_V3_ENABLED=true
export CLAUDE_FLOW_HOOKS_ENABLED=true
```

**Windows (PowerShell)** -- Add to `$PROFILE`:

```powershell
$env:CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS = "1"
$env:CLAUDE_FLOW_V3_ENABLED = "true"
$env:CLAUDE_FLOW_HOOKS_ENABLED = "true"
```

**Windows (System)** -- Use System Properties or:

```powershell
[System.Environment]::SetEnvironmentVariable("CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS", "1", "User")
```

---

## 8. Directory Structure Reference

```
Ruflow/
|
|-- CLAUDE.md                    # Master project instructions (39KB)
|-- CLAUDE.local.md              # Local development overrides
|-- INSTRUCTIONS.md              # This file
|-- package.json                 # Root package (v3.5.x)
|-- package-lock.json            # Dependency lock file
|-- tsconfig.json                # TypeScript configuration
|-- LICENSE                      # MIT License
|-- README.md                    # Project readme
|-- CHANGELOG.md                 # Version history
|-- SECURITY.md                  # Security policy
|-- AGENTS.md                    # Agent documentation
|
|-- .claude/
|   |-- settings.json            # Runtime configuration + hooks
|   |-- settings.local.json      # Local settings overrides
|   |-- mcp.json                 # MCP server configuration
|   |-- statusline.cjs           # Status bar script
|   |
|   |-- skills/                  # 71 skill definitions
|   |   |-- ui-ux-pro-max/SKILL.md
|   |   |-- brainstorming/SKILL.md
|   |   |-- swarm-orchestration/SKILL.md
|   |   +-- ... (71 directories)
|   |
|   |-- commands/                # 172 slash commands
|   |   |-- agents/
|   |   |-- analysis/
|   |   |-- automation/
|   |   |-- coordination/
|   |   |-- github/
|   |   |-- hive-mind/
|   |   |-- hooks/
|   |   |-- memory/
|   |   |-- monitoring/
|   |   |-- optimization/
|   |   |-- pair/
|   |   |-- sparc/
|   |   |-- swarm/
|   |   |-- training/
|   |   |-- workflows/
|   |   +-- ... (27 directories + 8 top-level files)
|   |
|   |-- agents/                  # 34 agent type definitions
|   |   |-- core/
|   |   |-- development/
|   |   |-- testing/
|   |   |-- security-auditor.md
|   |   |-- code-reviewer.md
|   |   +-- ... (34 entries)
|   |
|   |-- helpers/                 # 40 hook handlers and scripts
|   |   |-- hook-handler.cjs     # Central dispatcher
|   |   |-- router.cjs           # Task routing
|   |   |-- intelligence.cjs     # Intelligence system
|   |   |-- memory.cjs           # Memory operations
|   |   |-- session.cjs          # Session lifecycle
|   |   +-- ... (40 files)
|   |
|   +-- config/                  # Configuration files
|
|-- .agents/
|   +-- skills/                  # 1,521 agent skills corpus
|       +-- ... (1,521 directories)
|
|-- src/
|   |-- antigravity-awesome-skills/  # 1,332 skill definitions
|   |-- awesome-claude-code/         # Claude Code patterns
|   |-- claude-mem/                  # Memory system
|   |-- koda-stack/                  # Development stack
|   |-- superpowers/                 # Extensions
|   |-- ui-ux-pro-max-skill/        # UI/UX design skill
|   +-- website-builder-setup/       # Website builder
|
|-- v3/
|   +-- @claude-flow/
|       |-- agents/              # Agent definitions package
|       |-- aidefence/           # AI defense tools
|       |-- browser/             # Browser automation
|       |-- claims/              # Authorization
|       |-- cli/                 # CLI (26 commands)
|       |-- codex/               # Dual-mode collaboration
|       |-- deployment/          # Deployment management
|       |-- embeddings/          # Vector embeddings
|       |-- guidance/            # Governance
|       |-- hooks/               # Hooks + workers
|       |-- integration/         # External integrations
|       |-- mcp/                 # MCP server
|       |-- memory/              # AgentDB + HNSW
|       |-- neural/              # Neural training
|       |-- performance/         # Profiling
|       |-- plugins/             # Plugin system
|       |-- providers/           # AI providers
|       |-- security/            # Security tools
|       |-- shared/              # Shared utilities
|       |-- swarm/               # Swarm coordination
|       +-- testing/             # Testing utilities
|
|-- ruflo/                       # Ruflo npm package wrapper
|-- scripts/                    # Utility scripts
|-- tests/                      # Test files
|-- docs/                       # Documentation
|-- bin/                        # CLI entry points
+-- plugin/                     # Plugin infrastructure
```

---

## Support

- **Repository**: https://github.com/ruvnet/claude-flow
- **Issues**: https://github.com/ruvnet/claude-flow/issues
- **Documentation**: See `docs/` directory and CLAUDE.md
- **npm Packages**: `claude-flow`, `@claude-flow/cli`, `ruflo`
