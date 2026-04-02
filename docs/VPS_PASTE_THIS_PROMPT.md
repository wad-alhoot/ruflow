# COPY-PASTE THIS INTO CLAUDE CODE ON THE VPS

> SSH into VPS → `su - claude-user` → `cd /home/claude-user/workspace/repos/ruflow` → `claude --dangerously-skip-permissions`
> Then paste everything below the line:

---

Pull the latest code from the repo and train yourself on everything in it. Here's exactly what to do:

## Step 1: Pull latest code
```bash
cd /home/claude-user/workspace/repos/ruflow
git pull origin main
```

## Step 2: Install all 1,331 skills
```bash
npx antigravity-awesome-skills --claude
```

## Step 3: Train on ALL skills
There is a training corpus at `.agents/skills/antigravity-awesome-skills/data/training-corpus.md` — it contains ALL 1,340 skills (351,886 lines, 12MB). Read the ENTIRE file using the Read tool. Read it in chunks of 2000 lines at a time, from line 1 all the way to the end. Use parallel agents to speed this up — spawn 10+ agents, each reading a different 25,000-line section simultaneously. Do NOT skip any section. Read every single line.

Also read these docs completely:
- `.agents/skills/antigravity-awesome-skills/docs/users/bundles.md`
- `.agents/skills/antigravity-awesome-skills/docs/users/workflows.md`
- `.agents/skills/antigravity-awesome-skills/docs/users/claude-code-skills.md`
- `.agents/skills/antigravity-awesome-skills/skills_index.json`

## Step 4: Save to memory
After reading everything, save a memory file so you remember all of this in future sessions. Key things to remember:
- You have 1,331 skills installed across 58 categories (cloud, development, ai-ml, security, business, workflow, marketing, web-development, content, automation, and 48 more)
- Skills are at `~/.claude/skills/` and `.agents/skills/antigravity-awesome-skills/skills/`
- Search skills with: `cat .agents/skills/antigravity-awesome-skills/skills_index.json | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); const q=process.argv[1].toLowerCase(); d.filter(s=>(s.description||'').toLowerCase().includes(q)||(s.name||'').includes(q)).slice(0,10).forEach(s=>console.log(s.name+': '+(s.description||'').slice(0,80)));" "KEYWORD"`
- Read any skill with: `cat .agents/skills/antigravity-awesome-skills/skills/SKILL_NAME/SKILL.md`
- Repo: https://github.com/FaizanAshrafJatt/ruflow — always `git pull origin main` before working
- 38 plugin bundles available (Essentials, Security, Full-Stack, AI Agent, Web, DevOps, Python, TypeScript, QA, Architecture, DDD, Startup, Marketing, Mobile, Data, Automation, etc.)
- 5 workflow playbooks: SaaS MVP, Security Audit, AI Agent System, QA Automation, DDD Core Domain

## Step 5: How you work from now on
From now on, whenever you get a task:
1. Always `git pull origin main` first to get latest updates
2. Search the skills index for relevant skills matching the task
3. Read those SKILL.md files before starting work
4. Follow the skill's instructions and principles
5. For multi-step tasks, use a workflow playbook to sequence skills
6. Always run validation (lint, type check, tests) before saying you're done
7. Never claim something is done without running verification commands first

Your operating principles (learned from the skills):
- **Root cause first** — investigate before fixing (from @systematic-debugging)
- **Test first** — write failing test before production code (from @test-driven-development)
- **Verify before done** — run the command, don't assume (from @verification-before-completion)
- **Small steps** — smallest viable change, verify, iterate (from @kaizen)
- **Plan before code** — make an action plan first (from @concise-planning)
- **Design before build** — brainstorm before implementing (from @brainstorming)
- **Validate always** — run linters after every change (from @lint-and-validate)

## Step 6: Verify training
Run this to confirm everything is set up:
```bash
echo "Skills in Claude Code: $(ls ~/.claude/skills/ 2>/dev/null | wc -l)"
echo "Skills in repo: $(find .agents/skills/antigravity-awesome-skills/skills/ -name 'SKILL.md' 2>/dev/null | wc -l)"
echo "Training corpus: $(wc -l < .agents/skills/antigravity-awesome-skills/data/training-corpus.md 2>/dev/null) lines"
echo "Bundles: $(ls .agents/skills/antigravity-awesome-skills/plugins/ 2>/dev/null | wc -l)"
```

Now do all of this. Start with Step 1 and go through every step. Read ALL the training data. Don't skip anything. When done, tell me the verification results.
