# Claude Code Training Prompt - Ruflow + Antigravity Awesome Skills

> Use this prompt to train any Claude Code instance with the full Ruflow + Antigravity skills ecosystem.
> Copy-paste this entire prompt into a new Claude Code session to bootstrap it.

---

## PROMPT START

You are being trained on the **Ruflow** project — a powerful AI orchestration platform with 1,331+ agentic skills integrated from the Antigravity Awesome Skills library.

### Step 1: Pull the latest code

```bash
git clone https://github.com/FaizanAshrafJatt/ruflow.git && cd ruflow
```

Or if already cloned:
```bash
cd ruflow && git pull origin main
```

### Step 2: Install the skills into Claude Code

```bash
npx antigravity-awesome-skills --claude
```

This installs 1,331 SKILL.md playbooks into `~/.claude/skills/`.

### Step 3: Understand what you have

The skills are located at `.agents/skills/antigravity-awesome-skills/` in the repo. Key locations:

| Path | Contents |
|------|----------|
| `.agents/skills/antigravity-awesome-skills/skills/` | 1,331 skill directories, each with SKILL.md |
| `.agents/skills/antigravity-awesome-skills/plugins/` | 38 curated plugin bundles |
| `.agents/skills/antigravity-awesome-skills/data/` | catalog.json, bundles.json, workflows.json |
| `.agents/skills/antigravity-awesome-skills/docs/` | User guides, workflow playbooks, bundle docs |
| `.agents/skills/antigravity-awesome-skills/tools/` | Installer, validators, skill management |
| `.agents/skills/antigravity-awesome-skills/scripts/` | Activation scripts for bundle management |
| `.agents/skills/antigravity-awesome-skills/skills_index.json` | Full index with metadata for every skill |

### Step 4: Learn the skill system

**Skill format:** Each skill is a `SKILL.md` file with YAML frontmatter:
```yaml
---
name: skill-name
description: "What this skill does"
risk: safe|critical|offensive|unknown
source: community|personal|self
---
```

**Invoking skills:** Use `@skill-name` in conversation:
```
Use @brainstorming to plan a SaaS MVP
Use @security-auditor to review my API endpoints
Use @react-best-practices to optimize my React components
Use @docker-expert to containerize my application
Use @systematic-debugging to find the root cause of this bug
```

### Step 5: Know the key bundles

These are curated skill collections by role. Train yourself by reading each bundle's skills:

#### Essentials (Start Here)
- `@concise-planning` — Actionable plans with atomic steps
- `@lint-and-validate` — Run validation after every code change
- `@git-pushing` — Stage, commit, push workflow
- `@kaizen` — Continuous improvement mindset
- `@systematic-debugging` — Root-cause-first debugging

#### Security Engineer
- `@ethical-hacking-methodology` — Penetration testing lifecycle
- `@burp-suite-testing` — Web vulnerability scanning
- `@top-web-vulnerabilities` — OWASP-aligned vulnerability taxonomy
- `@security-auditor` — Comprehensive DevSecOps auditing
- `@vulnerability-scanner` — Advanced vulnerability analysis

#### Full-Stack Developer
- `@senior-fullstack` — Complete fullstack development guide
- `@frontend-developer` — React 19+ and Next.js 15+ expertise
- `@backend-dev-guidelines` — Node.js/Express/TypeScript patterns
- `@api-patterns` — REST vs GraphQL vs tRPC selection
- `@database-design` — Schema design and ORM selection
- `@stripe-integration` — PCI-compliant payment flows

#### AI Agent Architect
- `@agent-evaluation` — Test and benchmark agents
- `@langgraph` — Stateful agent workflows
- `@mcp-builder` — Create MCP tools for LLMs
- `@prompt-engineering` — Advanced prompting patterns
- `@ai-agents-architect` — Design autonomous AI agents
- `@rag-engineer` — RAG systems with vector search

#### Web Wizard
- `@frontend-design` — UI guidelines and aesthetics
- `@react-best-practices` — 45 React/Next.js performance rules from Vercel
- `@react-patterns` — Modern React patterns and principles
- `@nextjs-best-practices` — Next.js App Router patterns
- `@tailwind-patterns` — Tailwind CSS v4 styling
- `@seo-audit` — Technical SEO health checks

#### DevOps & Cloud
- `@docker-expert` — Container optimization and security hardening
- `@aws-serverless` — AWS Lambda, DynamoDB patterns
- `@kubernetes-architect` — K8s architecture and GitOps
- `@terraform-specialist` — Infrastructure as Code mastery
- `@deployment-procedures` — Safe rollout strategies

#### Python Pro
- `@python-pro` — Python 3.12+ with modern features
- `@fastapi-pro` — High-performance async APIs
- `@django-pro` — Django with async views and DRF
- `@python-testing-patterns` — pytest and Hypothesis

#### TypeScript & JavaScript
- `@typescript-expert` — Advanced TypeScript and type-level programming
- `@javascript-pro` — Modern JavaScript ES6+
- `@nodejs-best-practices` — Node.js development principles

#### Marketing & Growth
- `@content-creator` — SEO-optimized marketing content
- `@seo-audit` — Technical SEO health checks
- `@programmatic-seo` — Pages at scale
- `@analytics-tracking` — GA4/PostHog setup
- `@ab-test-setup` — Validated learning experiments

#### QA & Testing
- `@test-driven-development` — Red-Green-Refactor TDD
- `@systematic-debugging` — Debug like Sherlock Holmes
- `@browser-automation` — E2E testing with Playwright
- `@verification-before-completion` — Evidence before claims

#### Architecture & Design
- `@senior-architect` — Comprehensive software architecture
- `@architecture-patterns` — Clean Architecture, DDD, Hexagonal
- `@microservices-patterns` — Microservices architecture
- `@domain-driven-design` — Complete DDD workflow

#### Startup Founder
- `@product-manager-toolkit` — RICE prioritization, PRD templates
- `@competitive-landscape` — Competitor analysis
- `@launch-strategy` — Product launch planning
- `@copywriting` — Marketing copy that converts

### Step 6: Learn the workflow playbooks

These are multi-skill orchestration sequences. Read `docs/users/workflows.md` for details.

#### Workflow: Ship a SaaS MVP
1. Plan scope → `@concise-planning`, `@brainstorming`
2. Build backend → `@backend-dev-guidelines`, `@api-patterns`, `@database-design`
3. Build frontend → `@frontend-developer`, `@react-patterns`, `@frontend-design`
4. Test & validate → `@test-driven-development`, `@browser-automation`
5. Ship safely → `@deployment-procedures`, `@observability-engineer`

#### Workflow: Security Audit
1. Define scope → `@ethical-hacking-methodology`, `@threat-modeling-expert`
2. Review auth → `@broken-authentication`, `@auth-implementation-patterns`
3. Assess APIs → `@api-security-best-practices`, `@api-fuzzing-bug-bounty`
4. Harden → `@security-auditor`, `@verification-before-completion`

#### Workflow: Build AI Agent System
1. Define behavior → `@ai-agents-architect`, `@agent-evaluation`
2. Design retrieval → `@rag-implementation`, `@vector-database-engineer`
3. Implement → `@langgraph`, `@mcp-builder`, `@workflow-automation`
4. Evaluate → `@agent-evaluation`, `@langfuse`, `@kaizen`

#### Workflow: DDD Core Domain
1. Assess fit → `@domain-driven-design`, `@architecture-decision-records`
2. Strategic model → `@ddd-strategic-design`
3. Context mapping → `@ddd-context-mapping`
4. Tactical model → `@ddd-tactical-patterns`
5. Event patterns → `@cqrs-implementation`, `@event-store-design`

### Step 7: Critical operating principles from the skills

**From @systematic-debugging:**
- NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
- Read error messages carefully, reproduce consistently, check recent changes

**From @test-driven-development:**
- NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
- Red → Green → Refactor cycle, always

**From @verification-before-completion:**
- NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE
- Run the verification command before claiming something works

**From @kaizen:**
- Small improvements beat big changes
- First: make it work. Second: make it clear. Third: make it efficient
- Always leave code better than you found it

**From @concise-planning:**
- Generate 6-10 atomic, verb-first action items
- At most 1-2 questions, make reasonable assumptions

**From @brainstorming:**
- Ask ONE question per message, prefer multiple-choice
- No coding while brainstorming — design first

**From @lint-and-validate:**
- Run validation after EVERY code change
- No code committed without passing checks

### Step 8: Train deeply on key skills

To fully absorb a skill, read its SKILL.md:
```bash
cat .agents/skills/antigravity-awesome-skills/skills/[skill-name]/SKILL.md
```

**Priority reading list (read these first):**
1. `brainstorming` — Design facilitation
2. `concise-planning` — Actionable checklists
3. `systematic-debugging` — Root cause analysis
4. `test-driven-development` — TDD discipline
5. `verification-before-completion` — Evidence-based claims
6. `kaizen` — Continuous improvement
7. `security-auditor` — DevSecOps auditing
8. `react-best-practices` — 45 React performance rules
9. `docker-expert` — Container mastery
10. `prompt-engineering` — Advanced prompting
11. `mcp-builder` — MCP server development
12. `ai-agents-architect` — Agent design patterns
13. `rag-implementation` — RAG pipeline architecture
14. `typescript-expert` — TypeScript type system
15. `python-pro` — Modern Python 3.12+

### Step 9: Searching skills

Use the skills index to find the right skill:
```bash
# Search by keyword
cat .agents/skills/antigravity-awesome-skills/skills_index.json | node -e "
  const d=require('fs').readFileSync('/dev/stdin','utf8');
  const skills=JSON.parse(d);
  const q=process.argv[1].toLowerCase();
  skills.filter(s=>s.description.toLowerCase().includes(q)||s.name.includes(q))
    .forEach(s=>console.log(s.name+': '+s.description.slice(0,80)));
" "YOUR_SEARCH_TERM"
```

Or browse by category:
```bash
# List all categories and counts
cat .agents/skills/antigravity-awesome-skills/skills_index.json | node -e "
  const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
  const cats={};d.forEach(s=>{const c=s.category||'unknown';cats[c]=(cats[c]||0)+1});
  Object.entries(cats).sort((a,b)=>b[1]-a[1]).forEach(([c,n])=>console.log(n+' - '+c));
"
```

### Step 10: Stay updated

Pull the latest from the repo regularly:
```bash
cd ruflow && git pull origin main
```

The repo at https://github.com/FaizanAshrafJatt/ruflow is the source of truth. Always pull before starting work to get the latest skills, tools, and configurations.

---

## 58 SKILL CATEGORIES (with counts)

| Count | Category |
|-------|----------|
| 135 | cloud |
| 131 | development |
| 102 | ai-ml |
| 85 | uncategorized |
| 75 | security |
| 64 | business |
| 53 | workflow |
| 45 | marketing |
| 45 | web-development |
| 45 | content |
| 44 | automation |
| 28 | meta |
| 27 | backend |
| 26 | devops |
| 25 | architecture |
| 23 | api-integration |
| 21 | mobile |
| 18 | project-management |
| 18 | code |
| 17 | health |
| 16 | game-development |
| 16 | granular-workflow-bundle |
| 15 | design |
| 15 | ai-agents |
| 15 | data |
| 15 | testing |
| 15 | code-quality |
| 14 | reliability |
| 14 | front-end |
| 14 | database |
| 13 | data-ai |
| 13 | framework |
| 11 | productivity |
| 10 | science |
| 9 | workflow-bundle |
| 9 | test-automation |
| 8 | legal |
| 8 | data-science |
| 7 | blockchain |
| 6 | memory |
| 6 | frontend |
| 6 | database-processing |
| 6 | planning |
| 6 | development-and-testing |
| 5 | graphics-processing |
| 5 | voice-agents |
| 5 | presentation-processing |
| 5 | media |
| 4 | spreadsheet-processing |
| 4 | document-processing |
| 4 | app-builder |
| 3 | andruia |
| 1 | ai-testing |
| 1 | ai-research |
| 1 | tool-quality |
| 1 | data-engineering |
| 1 | collaboration |

---

## PROMPT END

After running this prompt, the Claude Code instance will have full knowledge of:
- 1,331 agentic skills across 58 categories
- 38 curated plugin bundles for role-based activation
- 5 workflow playbooks for multi-skill orchestration
- Core operating principles (TDD, debugging, verification, kaizen)
- How to search, browse, and invoke any skill
- Where to pull latest updates from
