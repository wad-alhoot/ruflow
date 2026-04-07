# Ruflow -- Complete Training Guide for Claude Code

> **Ruflow v3.5** (formerly "Claude Flow") -- 5,900+ commits, 55 alpha iterations, 259 MCP tools, 60+ agents, 8 AgentDB controllers.
> Packages: `@claude-flow/cli@3.5.0`, `claude-flow@3.5.0`, `ruflo@3.5.0`

This is NOT a typical project README. This is a **training manual**. Any Claude Code instance that opens this directory gets immediate access to the entire Ruflow skill, agent, and asset library described below.

---

## Table of Contents

1. [What Is Ruflow](#1-what-is-ruflow)
2. [Directory Structure Map](#2-directory-structure-map)
3. [Complete Skill Catalog (71 Skills)](#3-complete-skill-catalog-71-skills)
4. [Agent Skills Library (1,521 Skills)](#4-agent-skills-library-1521-skills)
5. [Commands Reference (172 Commands)](#5-commands-reference-172-commands)
6. [Source Repositories in Detail](#6-source-repositories-in-detail)
7. [V3 Packages (@claude-flow)](#7-v3-packages-claude-flow)
8. [Assets and Resources Available](#8-assets-and-resources-available)
9. [Configuration Reference](#9-configuration-reference)
10. [When to Use What (Decision Matrix)](#10-when-to-use-what-decision-matrix)
11. [Swarm Orchestration Guide](#11-swarm-orchestration-guide)
12. [Hooks System](#12-hooks-system)

---

## 1. What Is Ruflow

Ruflow is a training directory that equips any Claude Code instance with a massive library of capabilities the moment the directory is opened. It is not a single application -- it is an orchestration layer, skill corpus, and toolchain combined.

### Key Stats

| Metric | Count |
|--------|-------|
| Total files (excluding node_modules/.git) | 36,788 |
| Claude Code skills (.claude/skills/) | 71 |
| Agent skills (.agents/skills/) | 1,521 |
| Slash commands (.claude/commands/) | 172 |
| Agent definitions (.claude/agents/) | 34 |
| Background helpers (.claude/helpers/) | 40 |
| MCP tools available | 259 |
| Source repositories (src/) | 7 |
| @claude-flow packages (v3/) | 21 |
| TTF fonts bundled | 54 |
| Design data CSVs | 60 |

### Purpose

When Claude Code opens this directory, it automatically loads:

- **CLAUDE.md** (39KB of project instructions) via the project config system
- **71 invocable skills** from `.claude/skills/`
- **172 slash commands** from `.claude/commands/`
- **34 agent definitions** from `.claude/agents/`
- **40 background helpers** from `.claude/helpers/`
- **MCP server connections** from `.claude/mcp.json` and `.claude/settings.json`

The 1,521 agent skills in `.agents/skills/` are available for reference and can be loaded on demand. The 7 source repositories in `src/` provide raw skill data, CLI tools, memory systems, and content pipelines.

---

## 2. Directory Structure Map

```
Ruflow/
|
|-- .claude/                           # Claude Code configuration system
|   |-- skills/ (71 skills)            # Directly invocable skills (see Section 3)
|   |-- commands/ (172 commands)       # Slash commands organized by domain (see Section 5)
|   |-- agents/ (34 agents)            # Agent type definitions with SKILL.md files
|   |-- helpers/ (40 helpers)          # Background hooks, workers, and automation scripts
|   |-- config/                        # Performance and dependency configs
|   |   |-- v3-dependency-optimization.json
|   |   +-- v3-performance-targets.json
|   |-- checkpoints/                   # Session checkpoint storage
|   |-- settings.json                  # Main project settings (model, permissions, hooks)
|   |-- settings.local.json            # Local overrides
|   |-- mcp.json                       # MCP server configuration
|   |-- statusline.mjs                 # Status line display script
|   |-- statusline.sh                  # Shell status line
|   +-- statusline-command.sh          # Status line command handler
|
|-- .agents/
|   +-- skills/ (1,521 skills)         # Full agent skill library (see Section 4)
|
|-- src/                               # Source repositories (7 repos)
|   |-- antigravity-awesome-skills/    # 8,418 files -- skill corpus source
|   |-- claude-mem/                    # 24,921 files -- persistent memory system
|   |-- awesome-claude-code/           # 681 files -- curated tools and resources
|   |-- ui-ux-pro-max-skill/          # 964 files -- UI/UX design CLI and data
|   |-- superpowers/                   # 124 files -- workflow skills and commands
|   |-- koda-stack/                    # 13 files -- video production pipeline
|   +-- website-builder-setup/         # 2 files -- web builder installer
|
|-- v3/                                # V3 monorepo
|   |-- @claude-flow/ (21 packages)    # Core packages (see Section 7)
|   |-- agents/                        # V3 agent system
|   |-- helpers/                       # V3 helper scripts
|   |-- implementation/                # Implementation tracking
|   |-- mcp/                           # MCP server source
|   |-- plugins/                       # Plugin system
|   |-- scripts/                       # Build and utility scripts
|   |-- src/                           # V3 core source
|   |-- __tests__/                     # V3 test suite
|   +-- docs/                          # V3 documentation
|
|-- v2/                                # V2 stable production code
|-- ruflo/                             # Ruflo SDK/CLI wrapper package
|-- bin/                               # CLI entry points (cli.js)
|-- scripts/                           # Build, utility, and memory-db scripts
|-- docs/                              # Documentation
|-- tests/                             # Test suite
|-- agents/                            # Legacy agent definitions
|-- plugin/                            # Plugin source
|
|-- CLAUDE.md                          # Project instructions (39KB) -- loaded automatically
|-- CLAUDE.local.md                    # Local development config
|-- AGENTS.md                          # Agent reference documentation
|-- package.json                       # Main package config (v3.5.48)
|-- tsconfig.json                      # TypeScript configuration
|-- CHANGELOG.md                       # Release history
|-- SECURITY.md                        # Security policy
+-- LICENSE                            # License file
```

---

## 3. Complete Skill Catalog (71 Skills)

All 71 skills live in `.claude/skills/` and each contains a `SKILL.md` file that Claude Code loads when the skill is invoked. Skills are grouped below by function.

### Design and UI Skills (7)

| Skill | Purpose | Key Assets |
|-------|---------|------------|
| `ui-ux-pro-max` | Full UI/UX design system -- the most comprehensive skill (45KB SKILL.md) | References all 60 CSVs, 16 stack configs, design reasoning data |
| `ui-styling` | CSS/styling utilities and font library | 54 TTF fonts in canvas-fonts/, style references |
| `design` | Design patterns, components, and layout guidelines | Reference docs, templates |
| `design-system` | Design token systems, color scales, spacing, typography tokens | Token generation templates |
| `slides` | Presentation creation (HTML/CSS slide decks) | Slide templates, layout patterns |
| `banner-design` | Marketing banner and hero image design | Banner templates, size presets |
| `brand` | Brand identity design with automation scripts | 4 CJS scripts: extract-colors, inject-brand-context, sync-brand-to-tokens, validate-asset |

### Video Production Skills -- Koda Stack (10)

These 10 skills form a complete video content creation pipeline. Execute them in order:

| Order | Skill | Purpose |
|-------|-------|---------|
| 1 | `brief` | Define the creative brief and objectives |
| 2 | `trends` | Research current trends and audience data |
| 3 | `concept` | Develop the creative concept |
| 4 | `script` | Write the video script |
| 5 | `art-direction` | Define visual style, mood boards, color palettes |
| 6 | `storyboard` | Create shot-by-shot storyboard |
| 7 | `generate` | Generate visual assets |
| 8 | `assemble` | Assemble assets into the final video |
| 9 | `publish` | Publish to platforms with metadata |
| 10 | `repurpose` | Repurpose content for other formats and channels |

Source: `src/koda-stack/skills/`

### Development Workflow Skills (14, from Superpowers)

| Skill | Purpose |
|-------|---------|
| `brainstorming` | Structured brainstorming sessions with frameworks |
| `dispatching-parallel-agents` | Spawn and coordinate multiple sub-agents |
| `executing-plans` | Execute step-by-step implementation plans |
| `finishing-a-development-branch` | Complete branch work: cleanup, squash, PR prep |
| `receiving-code-review` | Process and respond to code review feedback |
| `requesting-code-review` | Structure and submit code review requests |
| `subagent-driven-development` | Development driven by sub-agent delegation |
| `systematic-debugging` | Structured debugging methodology |
| `test-driven-development` | TDD red-green-refactor workflow |
| `using-git-worktrees` | Parallel development with git worktrees |
| `using-superpowers` | Meta-skill: how to use all superpowers skills |
| `verification-before-completion` | Pre-completion verification checklist |
| `writing-plans` | Structured plan authoring methodology |
| `writing-skills` | How to write new Claude Code skills |

Source: `src/superpowers/skills/`

### Memory and Persistence Skills (6)

| Skill | Purpose |
|-------|---------|
| `claude-mem` | Persistent memory across Claude Code sessions (full system) |
| `agentdb-advanced` | Advanced AgentDB patterns and operations |
| `agentdb-learning` | Self-learning memory patterns |
| `agentdb-memory-patterns` | Memory storage and retrieval patterns |
| `agentdb-optimization` | Memory system performance optimization |
| `agentdb-vector-search` | HNSW vector search for semantic memory |

### Swarm and Orchestration Skills (6)

| Skill | Purpose |
|-------|---------|
| `swarm-orchestration` | Multi-agent swarm setup and coordination |
| `swarm-advanced` | Advanced swarm patterns (topologies, consensus) |
| `hive-mind-advanced` | Byzantine fault-tolerant consensus, queen-worker model |
| `hooks-automation` | Hook-based automation and lifecycle management |
| `worker-benchmarks` | Background worker benchmarking |
| `worker-integration` | Worker system integration patterns |

### GitHub Integration Skills (5)

| Skill | Purpose |
|-------|---------|
| `github-code-review` | Automated code review workflows |
| `github-multi-repo` | Multi-repository coordination |
| `github-project-management` | GitHub Projects board management |
| `github-release-management` | Release workflows and changelog generation |
| `github-workflow-automation` | GitHub Actions and CI/CD automation |

### Architecture and V3 Skills (13)

| Skill | Purpose |
|-------|---------|
| `v3-cli-modernization` | V3 CLI architecture and command patterns |
| `v3-core-implementation` | V3 core system implementation |
| `v3-ddd-architecture` | Domain-Driven Design patterns for V3 |
| `v3-integration-deep` | Deep integration patterns across V3 modules |
| `v3-mcp-optimization` | MCP server and tool optimization |
| `v3-memory-unification` | Unified memory architecture (SQLite + HNSW + AgentDB) |
| `v3-performance-optimization` | Performance profiling and optimization |
| `v3-security-overhaul` | Security hardening and vulnerability remediation |
| `v3-swarm-coordination` | V3 swarm coordination system |
| `sparc-methodology` | SPARC (Specification, Pseudocode, Architecture, Refinement, Completion) |
| `stream-chain` | Stream processing pipelines |
| `verification-quality` | Quality assurance and verification protocols |
| `pair-programming` | Pair programming workflow with another agent or human |

### Intelligence and Neural Skills (3)

| Skill | Purpose |
|-------|---------|
| `reasoningbank-agentdb` | ReasoningBank + AgentDB integration for pattern storage |
| `reasoningbank-intelligence` | ReasoningBank intelligence and retrieval system |
| `flow-nexus-neural` | Neural network coordination and training |

### Platform and Integration Skills (7)

| Skill | Purpose |
|-------|---------|
| `flow-nexus-platform` | Flow Nexus platform operations |
| `flow-nexus-swarm` | Flow Nexus swarm coordination |
| `agentic-jujutsu` | Advanced agent manipulation techniques |
| `dual-mode` | Claude + Codex dual-mode collaboration |
| `website-builder-setup` | 4-tool web stack installer (UI/UX Pro Max + Framer Motion + 21st.dev + shadcn/ui) |
| `skill-builder` | Create new Claude Code skills |
| `performance-analysis` | Performance analysis and reporting |

---

## 4. Agent Skills Library (1,521 Skills)

The `.agents/skills/` directory contains 1,521 pre-built agent skills. Each skill is a directory with a `SKILL.md` file defining the agent's capabilities, instructions, and domain knowledge. These cover virtually every technology domain.

### Coverage by Category

| Category | Example Skills | Approximate Count |
|----------|---------------|-------------------|
| **Web Frontend** | react, angular, vue, nextjs, svelte, astro, sveltekit, react-native, expo, flutter | 80+ |
| **Backend** | nodejs, fastapi, django, laravel, nestjs, hono, rails | 50+ |
| **Languages** | typescript-pro, python-pro, golang-pro, rust-pro, java-pro, ruby-pro, c-pro, cpp-pro, elixir-pro, haskell-pro, kotlin, swift, scala-pro, php-pro | 30+ |
| **Cloud -- AWS** | aws-serverless, aws-cost-optimizer, aws-penetration-testing, aws-cost-cleanup, cdk-patterns, cloudformation, sam | 20+ |
| **Cloud -- Azure** | 70+ Azure SDK skills covering AI, cosmos, identity, storage, eventhub, keyvault, monitor, search, functions, servicebus | 70+ |
| **Cloud -- GCP/Other** | gcp-cloud-run, cloudflare-workers, vercel-deployment, render-automation | 10+ |
| **DevOps/Infra** | docker, kubernetes, terraform, helm, gitops, k8s-security, istio, linkerd, cicd-automation | 40+ |
| **Databases** | postgresql, database-architect, database-migration, drizzle-orm, prisma, neon-postgres, nosql, snowflake, sql-optimization | 25+ |
| **Security** | penetration testing, vulnerability scanning, red team, ethical hacking, burp suite, metasploit, SAST, secrets management, solidity security | 50+ |
| **AI/ML** | ml-engineer, mlops, rag-engineer, llm-ops, pydantic-ai, langchain, langgraph, crewai, embeddings, vector-database | 30+ |
| **Data Science** | data-engineer, data-scientist, polars, matplotlib, seaborn, plotly, statsmodels, scikit-learn, spark-optimization | 20+ |
| **Design/UI** | ui-ux-designer, figma-automation, design-orchestration, tailwind, shadcn, radix-ui, threejs (10 sub-skills) | 30+ |
| **Content/Marketing** | seo (20+ sub-skills), content-creator, copywriting, social media, email-sequence, blog-writing, podcast-generation | 60+ |
| **Business Tools** | product-manager, startup-analyst, financial-modeling, sales-automator, hr-pro, legal-advisor, risk-manager | 30+ |
| **SaaS Integrations** | salesforce, hubspot, slack, zapier, make, n8n, airtable, notion, jira, linear, asana, trello, monday, clickup | 50+ |
| **Automation** | github-actions, gitlab-ci, circleci, workflow-patterns, n8n (6 sub-skills), make-automation, zapier-make-patterns | 20+ |
| **Mobile** | ios-developer, android, react-native, flutter, expo (6 sub-skills), swiftui (5 sub-skills), jetpack-compose | 25+ |
| **Game Dev** | unity-developer, godot, unreal-engine, bevy-ecs, game-development | 10+ |
| **Health/Science** | health-analyzer, nutrition, sleep, fitness, mental-health, biopython, pubmed, qiskit | 15+ |
| **Desktop/Systems** | electron, makepad (12 sub-skills), avalonia, macos, windows, robius (5 sub-skills), firmware-analyst | 25+ |
| **Documentation** | documentation, api-documentation, changelog, readme, wiki (6 sub-skills), technical writing | 15+ |
| **Video/Media** | remotion, videodb, comfyui-gateway, stability-ai, image-studio, seek-and-analyze-video | 10+ |
| **Odoo ERP** | 25 Odoo-specific skills covering modules, ORM, views, security, migration, performance | 25 |
| **Functional Programming** | fp-ts (14 sub-skills), fp-pragmatic, fp-react, fp-backend | 15+ |
| **Observability** | grafana, prometheus, datadog, sentry, distributed-tracing, opentelemetry | 10+ |

### How to Use Agent Skills

Agent skills are loaded by reading their `SKILL.md` file. To use a skill:

```
# Read the skill definition
Read .agents/skills/<skill-name>/SKILL.md

# Follow the instructions in the SKILL.md to apply the skill's capabilities
```

The skill definitions contain detailed instructions, patterns, code templates, and domain knowledge that Claude Code can follow to perform specialized tasks.

---

## 5. Commands Reference (172 Commands)

Commands live in `.claude/commands/` and are invoked as slash commands. There are 8 top-level command files and 19 command directories containing 164 sub-commands.

### Top-Level Commands (8)

| Command | Purpose |
|---------|---------|
| `/brainstorm` | Interactive brainstorming session |
| `/execute-plan` | Execute an implementation plan step by step |
| `/write-plan` | Create a detailed implementation plan |
| `/evaluate-repository` | Analyze and evaluate a repository |
| `/sparc` | Run SPARC methodology |
| `/claude-flow-help` | Claude Flow help and guidance |
| `/claude-flow-memory` | Memory operations |
| `/claude-flow-swarm` | Swarm operations |

### Command Directories (19 directories, 164 sub-commands)

#### `/agents` (5 commands)
agent-capabilities, agent-coordination, agent-spawning, agent-types, README

#### `/analysis` (7 commands)
bottleneck-detect, COMMAND_COMPLIANCE_REPORT, performance-bottlenecks, performance-report, README, token-efficiency, token-usage

#### `/automation` (7 commands)
auto-agent, README, self-healing, session-memory, smart-agents, smart-spawn, workflow-select

#### `/coordination` (7 commands)
agent-spawn, init, orchestrate, README, spawn, swarm-init, task-orchestrate

#### `/flow-nexus` (9 commands)
app-store, challenges, login-registration, neural-network, payments, sandbox, swarm, user-tools, workflow

#### `/github` (19 commands)
code-review, code-review-swarm, github-modes, github-swarm, issue-tracker, issue-triage, multi-repo-swarm, pr-enhance, pr-manager, project-board-sync, README, release-manager, release-swarm, repo-analyze, repo-architect, swarm-issue, swarm-pr, sync-coordinator, workflow-automation

#### `/hive-mind` (12 commands)
hive-mind, hive-mind-consensus, hive-mind-init, hive-mind-memory, hive-mind-metrics, hive-mind-resume, hive-mind-sessions, hive-mind-spawn, hive-mind-status, hive-mind-stop, hive-mind-wizard, README

#### `/hooks` (8 commands)
overview, post-edit, post-task, pre-edit, pre-task, README, session-end, setup

#### `/memory` (5 commands)
memory-persist, memory-search, memory-usage, neural, README

#### `/monitoring` (6 commands)
agent-metrics, agents, README, real-time-view, status, swarm-monitor

#### `/optimization` (6 commands)
auto-topology, cache-manage, parallel-execute, parallel-execution, README, topology-optimize

#### `/pair` (7 commands)
commands, config, examples, modes, README, session, start

#### `/sparc` (32 commands)
analyzer, architect, ask, batch-executor, code, coder, debug, debugger, designer, devops, docs-writer, documenter, innovator, integration, mcp, memory-manager, optimizer, orchestrator, post-deployment-monitoring-mode, refinement-optimization-mode, researcher, reviewer, security-review, sparc, sparc-modes, spec-pseudocode, supabase-admin, swarm-coordinator, tdd, tester, tutorial, workflow-manager

#### `/stream-chain` (2 commands)
pipeline, run

#### `/swarm` (17 commands)
analysis, development, examples, maintenance, optimization, README, research, swarm, swarm-analysis, swarm-background, swarm-init, swarm-modes, swarm-monitor, swarm-spawn, swarm-status, swarm-strategies, testing

#### `/training` (6 commands)
model-update, neural-patterns, neural-train, pattern-learn, README, specialization

#### `/truth` (1 command)
start

#### `/verify` (2 commands)
check, start

#### `/workflows` (6 commands)
development, README, research, workflow-create, workflow-execute, workflow-export

---

## 6. Source Repositories in Detail

Seven source repositories live in `src/`, totaling 35,123 files. Each serves a distinct purpose.

### ui-ux-pro-max-skill (964 files)

The most comprehensive UI/UX design toolkit. Contains a full CLI application built with TypeScript, commander, chalk, and ora.

**Structure:**
- `cli/` -- CLI application source
- `src/ui-ux-pro-max/` -- Core skill data and scripts
- `docs/` -- Documentation
- `preview/` and `screenshots/` -- Visual previews

**Data Assets (60 CSVs):**

14 general design data CSVs (each appears in both cli/assets/data/ and src/ui-ux-pro-max/data/):

| CSV File | Content |
|----------|---------|
| app-interface.csv | App interface patterns and guidelines |
| charts.csv | Chart and data visualization patterns |
| colors.csv | Color palettes, scales, and accessibility data |
| design.csv | General design patterns and principles |
| draft.csv | Draft/wireframe patterns |
| google-fonts.csv | Google Fonts catalog with pairings |
| icons.csv | Icon libraries and usage patterns |
| landing.csv | Landing page design patterns |
| products.csv | Product page and e-commerce design |
| react-performance.csv | React rendering performance patterns |
| styles.csv | CSS and styling patterns |
| typography.csv | Typography scales and font systems |
| ui-reasoning.csv | UI decision-making reasoning data |
| ux-guidelines.csv | UX best practice guidelines |

16 stack-specific CSVs (in `cli/assets/data/stacks/`):

angular, astro, flutter, html-tailwind, jetpack-compose, laravel, nextjs, nuxtjs, nuxt-ui, react, react-native, shadcn, svelte, swiftui, threejs, vue

**Python Scripts (4):**
- `_sync_all.py` -- Sync data across directories
- `core.py` -- Core design system operations
- `design_system.py` -- Design system generation
- `search.py` -- Design data search

**When to use:** Any UI/UX design work, component generation, design system creation, landing page design, or stack-specific UI patterns.

---

### superpowers (124 files)

A structured development workflow toolkit providing 14 skills, 3 commands, and 1 agent.

**Structure:**
- `skills/` -- 14 workflow skills (see Development Workflow Skills above)
- `commands/` -- brainstorm.md, execute-plan.md, write-plan.md
- `agents/` -- code-reviewer.md
- `hooks/` -- Git and session hooks
- `scripts/` -- Utility scripts
- `tests/` -- Test suite
- `CLAUDE-SUPERPOWERS.md` -- Full superpowers documentation
- `GEMINI.md` -- Gemini adapter configuration

**When to use:** Planning features, conducting code reviews, TDD, systematic debugging, brainstorming, Git workflow management, or parallel agent dispatch.

---

### claude-mem (24,921 files)

A persistent memory system that survives across Claude Code sessions. The largest source repo by file count due to its dependency tree.

**Structure:**
- `src/` -- Core memory system source
- `scripts/` -- Memory management scripts
- `conductor.json` -- Conductor configuration
- `cursor-hooks/` -- Cursor IDE adapter
- `docs/` -- Memory system documentation
- `tests/` -- Test suite
- `CLAUDE-CLAUDEMEM.md` -- Full memory system documentation

**Key Features:**
- Multi-tier storage architecture (short-term, long-term, episodic)
- CLI adapters for claude-code, cursor, gemini, windsurf
- MCP server integration for cross-session memory
- UI viewer with fonts and assets

**When to use:** Cross-session memory persistence, storing decisions and context that should survive conversation resets, building agents that learn over time.

---

### awesome-claude-code (681 files)

A curated resource library for Claude Code tooling, templates, and best practices.

**Structure:**
- `THE_RESOURCES_TABLE.csv` -- 222 curated entries of Claude Code tools and resources
- `scripts/` -- 15 utility scripts
- `data/` -- Resource data
- `templates/` -- Project and configuration templates
- `tools/` -- Utility tools
- `resources/` -- Reference materials
- `assets/` -- Static assets
- `docs/` -- Documentation

**When to use:** Finding Claude Code resources, looking up community tools, referencing best practices, or using project templates.

---

### antigravity-awesome-skills (8,418 files)

The source corpus for the 1,521 agent skills in `.agents/skills/`. Contains the raw skill definitions, indexes, and metadata.

**Structure:**
- `skills/` -- Raw skill source files
- `data/` -- Skill metadata and indexes
- `docs/` -- Skill documentation
- `scripts/` -- Build and sync scripts
- `tools/` -- Skill management tools
- `plugins/` -- Plugin integrations

All "antigravity" references in the source have been renamed to "claude-code" for consistency.

**When to use:** Referencing the raw source of agent skills, understanding skill structure, or building new skills from templates.

---

### website-builder-setup (2 files)

A minimal installer skill that sets up a 4-tool web development stack:

1. **UI/UX Pro Max** -- Full design system
2. **Framer Motion** -- Animation library
3. **21st.dev Magic** -- AI component generation
4. **shadcn/ui** -- Component library

**When to use:** Quick scaffolding of a new website project with a complete design and component stack.

---

### koda-stack (13 files)

A creative video production pipeline with 10 specialized agents.

**Structure:**
- `skills/` -- 10 production skills (brief, trends, concept, script, art-direction, storyboard, generate, assemble, publish, repurpose)
- `CLAUDE-KODA.md` -- Creative DNA configuration for tone, style, and brand voice
- `README.md` -- Usage guide

**When to use:** Video content creation, from initial brief through final publication and repurposing.

---

## 7. V3 Packages (@claude-flow)

The `v3/@claude-flow/` directory contains 21 packages that make up the V3 monorepo:

| Package | Purpose |
|---------|---------|
| `cli` | CLI entry point -- 26 commands, 140+ subcommands |
| `mcp` | MCP server implementation and tool handlers |
| `guidance` | Governance control plane and capability discovery |
| `neural` | SONA neural architecture, MoE routing, pattern learning |
| `shared` | Shared types, utilities, and constants |
| `plugins` | Plugin system core (manager, discovery, IPFS store) |
| `memory` | AgentDB + HNSW vector search (150x-12,500x faster) |
| `swarm` | Multi-agent swarm coordination engine |
| `browser` | Browser automation (Playwright-based) |
| `codex` | Dual-mode Claude + Codex collaboration |
| `security` | Input validation, CVE remediation, path security |
| `embeddings` | Vector embeddings with sql.js, HNSW, hyperbolic support |
| `hooks` | 17 lifecycle hooks + 12 background workers |
| `claims` | Claims-based authorization and task ownership |
| `integration` | Token optimizer and agentic-flow integration |
| `performance` | Performance profiling, benchmarking, metrics |
| `deployment` | Deployment management and release workflows |
| `providers` | AI provider management (Anthropic, OpenAI, Google) |
| `aidefence` | AI safety scanning, PII detection, content analysis |
| `agents` | Agent type definitions and lifecycle management |
| `testing` | Test utilities and assertion helpers |

---

## 8. Assets and Resources Available

### Fonts (54 TTF files)

Location: `.claude/skills/ui-styling/canvas-fonts/`

54 TTF font files available for canvas rendering, image generation, and design work. These are loaded by the `ui-styling` skill.

### Design Data (60 CSVs)

Location: `src/ui-ux-pro-max-skill/cli/assets/data/`

- 14 general design reference CSVs (colors, typography, icons, charts, etc.)
- 16 stack-specific CSVs (angular, react, nextjs, flutter, svelte, vue, etc.)
- Duplicated in `src/ui-ux-pro-max-skill/src/ui-ux-pro-max/data/` for the core skill

### Brand Automation Scripts (4 CJS)

Location: `.claude/skills/brand/scripts/`

| Script | Purpose |
|--------|---------|
| `extract-colors.cjs` | Extract brand colors from images or assets |
| `inject-brand-context.cjs` | Inject brand context into templates |
| `sync-brand-to-tokens.cjs` | Sync brand definitions to design tokens |
| `validate-asset.cjs` | Validate brand asset compliance |

### Website Builder Stack

The `website-builder-setup` skill installs:
- **Framer Motion** -- React animation library
- **21st.dev Magic** -- AI component generation
- **shadcn/ui** -- Accessible component library
- **UI/UX Pro Max** -- Complete design system

### Resource Library

Location: `src/awesome-claude-code/THE_RESOURCES_TABLE.csv`

222 curated Claude Code tools, templates, and resources indexed by category.

### Memory Database

Location: `scripts/memory-db/` (build scripts), runtime at `data/memory/`

SQLite + HNSW vector index for semantic memory search. Uses WASM sql.js for cross-platform compatibility.

### MCP Tools (259 tools)

Available via MCP server connections defined in `.claude/settings.json`:

| Namespace | Tool Count | Purpose |
|-----------|------------|---------|
| `mcp__claude-flow__agent_*` | 8 | Agent lifecycle (spawn, list, status, terminate, health, etc.) |
| `mcp__claude-flow__agentdb_*` | 16 | AgentDB memory operations |
| `mcp__claude-flow__aidefence_*` | 6 | AI safety and PII detection |
| `mcp__claude-flow__analyze_*` | 6 | Diff analysis and risk assessment |
| `mcp__claude-flow__autopilot_*` | 11 | Autonomous operation management |
| `mcp__claude-flow__browser_*` | 22 | Browser automation |
| `mcp__claude-flow__claims_*` | 12 | Task ownership and authorization |
| `mcp__claude-flow__config_*` | 6 | Configuration management |
| `mcp__claude-flow__coordination_*` | 7 | Swarm coordination |
| `mcp__claude-flow__daa_*` | 8 | Dynamic agent adaptation |
| `mcp__claude-flow__embeddings_*` | 7 | Vector embeddings |
| `mcp__claude-flow__github_*` | 5 | GitHub integration |
| `mcp__claude-flow__guidance_*` | 5 | Capability discovery |
| `mcp__claude-flow__hive-mind_*` | 9 | Hive mind consensus |
| `mcp__claude-flow__hooks_*` | 27 | Lifecycle hooks and workers |
| `mcp__claude-flow__memory_*` | 7 | Memory store/retrieve/search |
| `mcp__claude-flow__neural_*` | 6 | Neural pattern training |
| `mcp__claude-flow__performance_*` | 6 | Performance profiling |
| `mcp__claude-flow__progress_*` | 4 | Progress tracking |
| `mcp__claude-flow__ruvllm_*` | 9 | LLM routing and HNSW operations |
| `mcp__claude-flow__session_*` | 5 | Session management |
| `mcp__claude-flow__swarm_*` | 4 | Swarm init/status/health/shutdown |
| `mcp__claude-flow__system_*` | 5 | System health and metrics |
| `mcp__claude-flow__task_*` | 8 | Task CRUD and assignment |
| `mcp__claude-flow__terminal_*` | 5 | Terminal management |
| `mcp__claude-flow__transfer_*` | 10 | Plugin store and PII detection |
| `mcp__claude-flow__wasm_*` | 8 | WASM agent management |
| `mcp__claude-flow__workflow_*` | 10 | Workflow execution |

---

## 9. Configuration Reference

### .claude/settings.json

Main project configuration. Key sections:

```json
{
  "model": "claude-opus-4-6",
  "customInstructions": "Follow CLAUDE.md guidelines...",
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1",
    "CLAUDE_FLOW_V3_ENABLED": "true",
    "CLAUDE_FLOW_HOOKS_ENABLED": "true"
  },
  "permissions": {
    "allow": ["Bash(npx claude-flow*)", "mcp__claude-flow__*", "..."],
    "deny": ["Read(./.env)", "Read(./.env.*)", "Bash(rm -rf /)"]
  },
  "hooks": {
    "PreToolUse": ["..."],
    "PostToolUse": ["..."]
  }
}
```

### .claude/mcp.json

MCP server connections. Currently configured:
- `flow-nexus` -- Supabase-backed MCP server (requires SUPABASE_URL and SUPABASE_ANON_KEY)

The main MCP servers (claude-flow, ruv-swarm) are started via npx commands defined in permissions.

### CLAUDE.md (39KB)

The primary project instructions file. Loaded automatically by Claude Code. Contains:
- Behavioral rules
- File organization requirements
- Project architecture
- Concurrency patterns (batch all operations)
- Swarm orchestration protocols
- Agent routing tables
- V3 CLI command reference (26 commands, 140+ subcommands)
- Publishing procedures
- Plugin registry maintenance

### CLAUDE.local.md

Local development configuration with environment variables, quick references, and local overrides. Not committed to git.

### package.json

```
Name: claude-flow
Version: 3.5.48
Type: ES module
Main: dist/index.js
Bin: ./bin/cli.js
```

---

## 10. When to Use What (Decision Matrix)

| Task | Skills to Use | Commands to Use |
|------|--------------|-----------------|
| **Build a website** | website-builder-setup, ui-ux-pro-max, design, ui-styling | -- |
| **Design UI components** | ui-ux-pro-max, design-system, ui-styling | -- |
| **Create a brand identity** | brand (4 CJS scripts), design-system, ui-styling | -- |
| **Build presentations** | slides, banner-design | -- |
| **Create video content** | brief, trends, concept, script, art-direction, storyboard, generate, assemble, publish, repurpose | -- |
| **Plan a feature** | writing-plans, brainstorming | /write-plan, /brainstorm |
| **Execute a plan** | executing-plans | /execute-plan |
| **Code review** | requesting-code-review, receiving-code-review | /github/code-review |
| **Debug issues** | systematic-debugging, verification-before-completion | /sparc/debug, /sparc/debugger |
| **TDD development** | test-driven-development, verification-quality | /sparc/tdd |
| **Git workflows** | using-git-worktrees, finishing-a-development-branch | -- |
| **Multi-agent work** | swarm-orchestration, dispatching-parallel-agents, subagent-driven-development | /swarm/swarm-init, /coordination/spawn |
| **Hive mind consensus** | hive-mind-advanced | /hive-mind/hive-mind-init |
| **Memory persistence** | claude-mem, agentdb-* skills | /memory/memory-persist, /memory/memory-search |
| **GitHub automation** | github-code-review, github-multi-repo, github-project-management, github-release-management, github-workflow-automation | /github/* (19 commands) |
| **Security audit** | v3-security-overhaul | /sparc/security-review |
| **Performance optimization** | v3-performance-optimization, performance-analysis | /analysis/performance-report |
| **Architecture design** | sparc-methodology, v3-ddd-architecture | /sparc/architect, /sparc/spec-pseudocode |
| **Neural training** | reasoningbank-intelligence, flow-nexus-neural | /training/neural-train |
| **Hook automation** | hooks-automation, worker-benchmarks, worker-integration | /hooks/setup, /hooks/overview |
| **Stream processing** | stream-chain | /stream-chain/pipeline |
| **Pair programming** | pair-programming | /pair/start, /pair/session |
| **Evaluate a repo** | -- | /evaluate-repository |
| **Monitor agents** | -- | /monitoring/agents, /monitoring/swarm-monitor |
| **Topology optimization** | -- | /optimization/auto-topology, /optimization/topology-optimize |
| **Workflow management** | -- | /workflows/workflow-create, /workflows/workflow-execute |

### For Any Technology-Specific Task

Check `.agents/skills/` for a dedicated skill. Examples:

| Domain | Skill Path |
|--------|-----------|
| React app | `.agents/skills/react-best-practices/` |
| FastAPI backend | `.agents/skills/fastapi-pro/` |
| Kubernetes deployment | `.agents/skills/kubernetes-architect/` |
| Terraform infrastructure | `.agents/skills/terraform-specialist/` |
| Security pen test | `.agents/skills/pentest-checklist/` |
| SEO optimization | `.agents/skills/seo/` (20+ sub-skills) |
| Odoo ERP | `.agents/skills/odoo-*/` (25 skills) |
| Azure services | `.agents/skills/azure-*/` (70+ skills) |
| Three.js 3D | `.agents/skills/threejs-*/` (10 skills) |
| SwiftUI iOS | `.agents/skills/swiftui-*/` (5 skills) |
| n8n workflows | `.agents/skills/n8n-*/` (6 skills) |
| HuggingFace ML | `.agents/skills/hugging-face-*/` (12 skills) |

---

## 11. Swarm Orchestration Guide

Ruflow uses a multi-agent swarm system where MCP tools handle coordination and Claude Code's Task tool handles execution.

### Default Configuration (Anti-Drift)

```
Topology:    hierarchical (central coordinator prevents drift)
Max Agents:  8 (smaller team = less drift)
Strategy:    specialized (clear roles, no overlap)
Consensus:   raft (leader maintains authoritative state)
Memory:      hybrid (SQLite + AgentDB)
```

### Initialization

```javascript
// Initialize swarm via MCP
mcp__claude-flow__swarm_init({
  topology: "hierarchical",
  maxAgents: 8,
  strategy: "specialized"
})
```

### Agent Routing Table

| Code | Task Type | Agents to Spawn |
|------|-----------|----------------|
| 1 | Bug Fix | coordinator, researcher, coder, tester |
| 3 | Feature | coordinator, architect, coder, tester, reviewer |
| 5 | Refactor | coordinator, architect, coder, reviewer |
| 7 | Performance | coordinator, perf-engineer, coder |
| 9 | Security | coordinator, security-architect, auditor |
| 11 | Memory | coordinator, memory-specialist, perf-engineer |
| 13 | Docs | researcher, api-docs |

Codes 1-11 use hierarchical/specialized topology. Code 13 uses mesh/balanced.

### When to Auto-Invoke Swarm

**Use swarm for:**
- Multi-file changes (3+ files)
- New feature implementation
- Refactoring across modules
- API changes with tests
- Security-related changes
- Performance optimization
- Database schema changes

**Skip swarm for:**
- Single file edits
- Simple bug fixes (1-2 lines)
- Documentation updates
- Configuration changes
- Quick questions

### Topology Options

| Topology | Use Case |
|----------|----------|
| `hierarchical` | Default for coding tasks -- coordinator controls workers |
| `mesh` | Fully connected peer network for collaborative exploration |
| `hierarchical-mesh` | Hybrid -- recommended for complex tasks |
| `adaptive` | Dynamic topology based on load |

### Consensus Strategies

| Strategy | Fault Tolerance | Use Case |
|----------|----------------|----------|
| `byzantine` | f < n/3 faulty nodes | High-stakes decisions |
| `raft` | f < n/2 faulty nodes | Default for coding (leader-based) |
| `gossip` | Eventual consistency | Large-scale distribution |
| `crdt` | Conflict-free | Concurrent state updates |
| `quorum` | Configurable | Custom requirements |

---

## 12. Hooks System

### 17 Lifecycle Hooks

| Hook | Trigger | Purpose |
|------|---------|---------|
| `pre-edit` | Before file edit | Validate changes, check permissions |
| `post-edit` | After file edit | Train patterns, update metrics |
| `pre-command` | Before bash command | Security validation |
| `post-command` | After bash command | Result capture, logging |
| `pre-task` | Before task execution | Context loading, routing |
| `post-task` | After task completion | Pattern learning, cleanup |
| `session-start` | Session begins | Load context, restore state |
| `session-end` | Session ends | Save state, export metrics |
| `session-restore` | Session resumed | Restore checkpoint |
| `notify` | Notification event | Alert dispatching |
| `route` | Task routing decision | Model/agent selection |
| `explain` | Explanation request | Generate explanations |
| `pretrain` | Pre-training trigger | Neural model training |
| `build-agents` | Agent creation | Configure agent types |
| `transfer` | Knowledge transfer | Cross-agent learning |
| `teammate-idle` | Teammate finishes | Auto-assign pending tasks |
| `task-completed` | Task marked done | Train patterns, notify lead |

### 12 Background Workers

| Worker | Priority | Purpose |
|--------|----------|---------|
| `ultralearn` | normal | Deep knowledge acquisition from code patterns |
| `optimize` | high | Performance optimization suggestions |
| `consolidate` | low | Memory consolidation and deduplication |
| `predict` | normal | Predictive preloading of likely-needed context |
| `audit` | critical | Security analysis and vulnerability detection |
| `map` | normal | Codebase mapping and dependency graphing |
| `preload` | low | Resource preloading for anticipated operations |
| `deepdive` | normal | Deep code analysis for complex modules |
| `document` | normal | Auto-documentation generation |
| `refactor` | normal | Refactoring opportunity detection |
| `benchmark` | normal | Performance benchmarking |
| `testgaps` | normal | Test coverage gap analysis |

### 40 Helper Scripts

Location: `.claude/helpers/`

| Helper | Type | Purpose |
|--------|------|---------|
| `hook-handler.cjs` | CJS | Main hook dispatcher |
| `intelligence.cjs` | CJS | Intelligence routing |
| `memory.cjs` | CJS | Memory operations |
| `router.cjs` | CJS | Task routing |
| `session.cjs` | CJS | Session management |
| `statusline.cjs` | CJS | Status line display |
| `github-safe.js` | JS | GitHub operations safety wrapper |
| `auto-memory-hook.mjs` | MJS | Automatic memory persistence |
| `context-persistence-hook.mjs` | MJS | Context persistence across sessions |
| `learning-service.mjs` | MJS | Learning service |
| `aggressive-microcompact.mjs` | MJS | Aggressive context compaction |
| `metrics-db.mjs` | MJS | Metrics database |
| `patch-aggressive-prune.mjs` | MJS | Context pruning |
| `adr-compliance.sh` | Shell | Architecture Decision Record compliance |
| `auto-commit.sh` | Shell | Auto-commit hook |
| `checkpoint-manager.sh` | Shell | Checkpoint save/restore |
| `daemon-manager.sh` | Shell | Background daemon management |
| `ddd-tracker.sh` | Shell | DDD compliance tracking |
| `github-setup.sh` | Shell | GitHub configuration |
| `guidance-hook.sh` | Shell | Guidance hook handler |
| `guidance-hooks.sh` | Shell | Guidance hooks collection |
| `health-monitor.sh` | Shell | System health monitoring |
| `learning-hooks.sh` | Shell | Learning automation |
| `learning-optimizer.sh` | Shell | Learning optimization |
| `pattern-consolidator.sh` | Shell | Pattern consolidation |
| `perf-worker.sh` | Shell | Performance worker |
| `quick-start.sh` | Shell | Quick start setup |
| `security-scanner.sh` | Shell | Security scanning |
| `setup-mcp.sh` | Shell | MCP server setup |
| `standard-checkpoint-hooks.sh` | Shell | Standard checkpoint hooks |
| `swarm-comms.sh` | Shell | Swarm communication |
| `swarm-hooks.sh` | Shell | Swarm lifecycle hooks |
| `swarm-monitor.sh` | Shell | Swarm monitoring |
| `sync-v3-metrics.sh` | Shell | V3 metrics synchronization |
| `update-v3-progress.sh` | Shell | V3 progress tracking |
| `v3.sh` | Shell | V3 operations |
| `v3-quick-status.sh` | Shell | V3 quick status |
| `validate-v3-config.sh` | Shell | V3 config validation |
| `worker-manager.sh` | Shell | Background worker management |

---

## Quick Reference: CLI Commands

```bash
# Initialize project
npx claude-flow@v3alpha init --wizard

# Start daemon
npx claude-flow@v3alpha daemon start

# Spawn an agent
npx claude-flow@v3alpha agent spawn -t coder --name my-coder

# Initialize swarm
npx claude-flow@v3alpha swarm init --v3-mode

# Search memory
npx claude-flow@v3alpha memory search -q "pattern query"

# Run diagnostics
npx claude-flow@v3alpha doctor --fix

# Security scan
npx claude-flow@v3alpha security scan --depth full

# Performance benchmark
npx claude-flow@v3alpha performance benchmark --suite all

# Hook operations
npx claude-flow@v3alpha hooks pre-task --description "task"
npx claude-flow@v3alpha hooks post-task --task-id "id" --success true
npx claude-flow@v3alpha hooks session-start --session-id "id"

# Worker management
npx claude-flow@v3alpha hooks worker list
npx claude-flow@v3alpha hooks worker dispatch --trigger audit
```

---

## Links

- Repository: https://github.com/ruvnet/claude-flow
- Issues: https://github.com/ruvnet/claude-flow/issues
- Funding: https://github.com/sponsors/ruvnet
