# VPS Autonomous Training Prompt

> **How to use:** SSH into the VPS, switch to claude-user, then run:
> ```bash
> cd /home/claude-user/workspace/repos/ruflow
> git pull origin main
> claude --dangerously-skip-permissions -p "$(cat docs/VPS_AUTONOMOUS_PROMPT.md)"
> ```
> Claude Code will execute everything below autonomously.

---

## BEGIN AUTONOMOUS PROMPT

You are Claude Code running autonomously on a VPS. Your job is to fully set up, train yourself on ALL 1,331 skills, and be ready to work. Execute every step below without asking questions. Be thorough — read EVERYTHING.

### PHASE 1: Pull Latest Code & Install Skills

Run these commands:

```bash
cd /home/claude-user/workspace/repos/ruflow
git pull origin main
npx antigravity-awesome-skills --claude
test -d ~/.claude/skills && echo "SKILLS INSTALLED: $(ls ~/.claude/skills | wc -l) skills"
```

### PHASE 2: Read ALL 1,331 Skills (Complete Training)

A pre-built training corpus exists with EVERY skill combined into one file. Read it ALL:

**File:** `.agents/skills/antigravity-awesome-skills/data/training-corpus.md`

This file contains the complete text of ALL 1,331+ SKILL.md files concatenated together. Read it in chunks using the Read tool — it is approximately 280,000+ lines. Read it systematically:

```
Read the file in batches:
- Lines 1-2000
- Lines 2001-4000
- Lines 4001-6000
... continue until you've read the entire file
```

Use multiple parallel Agent calls to read different sections simultaneously for speed. Spawn 10+ agents, each reading a different chunk of ~25,000 lines. This ensures you absorb ALL skills, not just a subset.

**If the corpus file doesn't exist yet, build it first:**
```bash
bash scripts/build-training-corpus.sh
```

### PHASE 3: Read All Bundle & Workflow Documentation

Read these files completely — they teach you how skills combine together:

1. `.agents/skills/antigravity-awesome-skills/docs/users/bundles.md` — All 36 curated bundles by role
2. `.agents/skills/antigravity-awesome-skills/docs/users/workflows.md` — 5 multi-skill workflow playbooks
3. `.agents/skills/antigravity-awesome-skills/docs/users/claude-code-skills.md` — Claude Code integration
4. `.agents/skills/antigravity-awesome-skills/docs/contributors/skill-anatomy.md` — Skill structure
5. `.agents/skills/antigravity-awesome-skills/docs/users/plugins.md` — Plugin system
6. `.agents/skills/antigravity-awesome-skills/docs/users/security-skills.md` — Security skills guide
7. `.agents/skills/antigravity-awesome-skills/docs/QUALITY_BAR.md` — Quality standards
8. `.agents/skills/antigravity-awesome-skills/docs/SECURITY_GUARDRAILS.md` — Security guardrails
9. `.agents/skills/antigravity-awesome-skills/docs/WORKFLOWS.md` — Workflow reference
10. `.agents/skills/antigravity-awesome-skills/docs/EXAMPLES.md` — Usage examples

### PHASE 4: Read the Skills Index

Read the complete skills index for search capability:
- `.agents/skills/antigravity-awesome-skills/skills_index.json`

This contains metadata (name, description, category, risk level) for every skill. Internalize it so you can find any skill by keyword.

### PHASE 5: Read All Plugin Bundle Contents

Read each bundle's included skills. There are 38 bundles in:
`.agents/skills/antigravity-awesome-skills/plugins/`

Each bundle directory contains a `skills/` subdirectory with the curated skill set. Read the bundle structure to know which skills belong to which role.

### PHASE 6: Store Everything in Memory

Save a comprehensive memory file with:

**Skill Ecosystem Summary:**
- 1,331 skills across 58 categories
- 38 plugin bundles, 5 workflow playbooks
- Skills location: `~/.claude/skills/` and `.agents/skills/antigravity-awesome-skills/skills/`
- Skills index: `.agents/skills/antigravity-awesome-skills/skills_index.json`
- Training corpus: `.agents/skills/antigravity-awesome-skills/data/training-corpus.md`
- Source repo: `https://github.com/FaizanAshrafJatt/ruflow`
- Always `git pull origin main` before starting work

**All 58 categories with counts:**
135 cloud, 131 development, 102 ai-ml, 85 uncategorized, 75 security, 64 business, 53 workflow, 45 marketing, 45 web-development, 45 content, 44 automation, 28 meta, 27 backend, 26 devops, 25 architecture, 23 api-integration, 21 mobile, 18 project-management, 18 code, 17 health, 16 game-development, 16 granular-workflow-bundle, 15 design, 15 ai-agents, 15 data, 15 testing, 15 code-quality, 14 reliability, 14 front-end, 14 database, 13 data-ai, 13 framework, 11 productivity, 10 science, 9 workflow-bundle, 9 test-automation, 8 legal, 8 data-science, 7 blockchain, 6 memory, 6 frontend, 6 database-processing, 6 planning, 6 development-and-testing, 5 graphics-processing, 5 voice-agents, 5 presentation-processing, 5 media, 4 spreadsheet-processing, 4 document-processing, 4 app-builder, 3 andruia, 1 ai-testing, 1 ai-research, 1 tool-quality, 1 data-engineering, 1 collaboration

**All 36 Bundles:**
Essentials, Security Engineer, Security Developer, Web Wizard, Web Designer, Full-Stack Developer, Agent Architect, LLM App Developer, Python Pro, TypeScript & JavaScript, Systems Programming, DevOps & Cloud, Observability & Monitoring, Data & Analytics, Data Engineering, Startup Founder, Business Analyst, Marketing & Growth, SEO Specialist, QA & Testing, Mobile Developer, Architecture & Design, DDD & Evented Architecture, Automation Builder, RevOps & CRM Automation, Commerce & Payments, Creative Director, Documents & Presentations, Indie Game Dev, Integration & APIs, OSS Maintainer, Expo & React Native, Apple Platform Design, Azure AI & Cloud, Odoo ERP, Makepad Builder

**Key bundles with their skills:**
- **Essentials:** concise-planning, lint-and-validate, git-pushing, kaizen, systematic-debugging
- **Security Engineer:** ethical-hacking-methodology, burp-suite-testing, top-web-vulnerabilities, linux-privilege-escalation, cloud-penetration-testing, security-auditor, vulnerability-scanner
- **Security Developer:** api-security-best-practices, auth-implementation-patterns, backend-security-coder, frontend-security-coder, cc-skill-security-review, pci-compliance
- **Full-Stack:** senior-fullstack, frontend-developer, backend-dev-guidelines, api-patterns, database-design, stripe-integration
- **AI Agent Architect:** agent-evaluation, langgraph, mcp-builder, prompt-engineering, ai-agents-architect, rag-engineer
- **Web Wizard:** frontend-design, react-best-practices, react-patterns, nextjs-best-practices, tailwind-patterns, form-cro, seo-audit
- **DevOps & Cloud:** docker-expert, aws-serverless, kubernetes-architect, terraform-specialist, environment-setup-guide, deployment-procedures, bash-linux
- **Python Pro:** python-pro, python-patterns, fastapi-pro, fastapi-templates, django-pro, python-testing-patterns, async-python-patterns
- **TypeScript/JS:** typescript-expert, javascript-pro, react-best-practices, nodejs-best-practices, nextjs-app-router-patterns
- **QA & Testing:** test-driven-development, systematic-debugging, browser-automation, e2e-testing-patterns, ab-test-setup, code-review-checklist, test-fixing
- **Architecture:** senior-architect, architecture-patterns, microservices-patterns, event-sourcing-architect, architecture-decision-records
- **DDD:** domain-driven-design, ddd-strategic-design, ddd-context-mapping, ddd-tactical-patterns, cqrs-implementation, event-store-design, saga-orchestration, projection-patterns
- **Startup Founder:** product-manager-toolkit, competitive-landscape, competitor-alternatives, launch-strategy, copywriting, stripe-integration
- **Marketing & Growth:** content-creator, seo-audit, programmatic-seo, analytics-tracking, ab-test-setup, email-sequence
- **Mobile:** mobile-developer, react-native-architecture, flutter-expert, ios-developer, app-store-optimization
- **Data Engineering:** data-engineer, airflow-dag-patterns, dbt-transformation-patterns, embedding-strategies, vector-database-engineer
- **Observability:** observability-engineer, distributed-tracing, incident-responder, performance-engineer, postmortem-writing, slo-implementation
- **LLM App Dev:** llm-app-patterns, rag-implementation, prompt-caching, context-window-management, langfuse
- **Automation:** workflow-automation, mcp-builder, make-automation, airtable-automation, notion-automation, slack-automation, googlesheets-automation
- **Commerce:** stripe-integration, paypal-integration, plaid-fintech, hubspot-integration, algolia-search, monetization

**5 Workflow Playbooks:**
1. Ship a SaaS MVP: plan → backend → frontend → test → ship
2. Security Audit: scope → auth review → API assessment → harden
3. Build AI Agent System: define behavior → retrieval/memory → orchestration → evaluate
4. QA & Browser Automation: strategy → implement → triage/harden
5. DDD Core Domain: assess fit → strategic model → context mapping → tactical → event patterns

### PHASE 7: Verify Complete Training

```bash
echo "=== FULL TRAINING VERIFICATION ==="
echo "Skills in Claude Code: $(ls ~/.claude/skills/ 2>/dev/null | wc -l)"
echo "Skills in repo: $(find .agents/skills/antigravity-awesome-skills/skills/ -name 'SKILL.md' 2>/dev/null | wc -l)"
echo "Plugin bundles: $(ls .agents/skills/antigravity-awesome-skills/plugins/ 2>/dev/null | wc -l)"
echo "Training corpus: $(wc -l < .agents/skills/antigravity-awesome-skills/data/training-corpus.md 2>/dev/null) lines"
echo "Skills index: $(test -f .agents/skills/antigravity-awesome-skills/skills_index.json && echo YES || echo NO)"
echo "Workflows: $(test -f .agents/skills/antigravity-awesome-skills/data/workflows.json && echo YES || echo NO)"
echo "=== TRAINING COMPLETE - ALL 1,331 SKILLS ABSORBED ==="
```

### PHASE 8: How to Work Going Forward

**Before EVERY work session:**
```bash
cd /home/claude-user/workspace/repos/ruflow && git pull origin main
```

**Finding the right skill for any task:**
```bash
cat .agents/skills/antigravity-awesome-skills/skills_index.json | node -e "
  const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
  const q=process.argv[1].toLowerCase();
  d.filter(s=>(s.description||'').toLowerCase().includes(q)||(s.name||'').includes(q))
   .slice(0,10).forEach(s=>console.log(s.name+': '+(s.description||'').slice(0,80)));
" "KEYWORD"
```

**Reading a specific skill when needed:**
```bash
cat .agents/skills/antigravity-awesome-skills/skills/SKILL_NAME/SKILL.md
```

**Task execution pattern:**
1. Identify task type (feature, bug, security, refactor, deploy, etc.)
2. Search the skills index for matching skills
3. Read those SKILL.md files
4. Follow the skill's instructions precisely
5. Validate with lint-and-validate before completing
6. Verify with verification-before-completion before claiming done
7. If task spans multiple domains, use a workflow playbook to sequence skills

### OPERATING RULES (Always Follow — No Exceptions)

1. **Read ALL before acting** — You trained on 1,331 skills. Use them. Search the index before doing anything from scratch.
2. **Root cause first** — Never propose fixes without investigating the root cause (from @systematic-debugging)
3. **Test first** — Write failing test before writing production code (from @test-driven-development)
4. **Verify before claiming** — Run verification commands before saying "done" (from @verification-before-completion)
5. **Small improvements** — Make smallest viable change, verify, then iterate (from @kaizen)
6. **Plan before code** — Generate atomic action items before implementing (from @concise-planning)
7. **Design before build** — Brainstorm and validate design before coding (from @brainstorming)
8. **Validate always** — Run linters/type checks after every code change (from @lint-and-validate)
9. **Evidence over confidence** — "Should work" is not verification. Run the command.
10. **Pull before work** — Always pull latest from repo before starting any work session

## END AUTONOMOUS PROMPT
