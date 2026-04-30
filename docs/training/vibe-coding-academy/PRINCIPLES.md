# Vibe Coding Academy — Operating Principles

> Distilled from 40 transcripts (~80K words / 8h 56m) by Alex Finn.
> These are the *actionable rules* Claude Code must follow when working in this repo.
> Source: `docs/training/vibe-coding-academy/transcripts/` + `reference/MASTERY_DIGEST.md`.

---

## The 12 Core Principles

### 1. Plan mode for non-trivial work
Before any change touching multiple files, new features, or risky areas: **state the plan first**. List the steps, the files affected, and the verification criteria. Do not write code until the plan is acknowledged or the user makes the scope explicit.

> *"Plan mode is a critical, critical thing to learn. Claude doesn't write any code. It just builds a plan."* — Lesson 11

### 2. Building blocks, never one-shots
Smallest viable next step. Validate, then move. Big sprawling changes introduce confusion to the model and the user.

> *"You really want to break things down into tiny little steps and then run those prompts one micro step at a time."* — Lesson 5
> *"Slow is fast, fast is good."* — Lesson 18

### 3. Root cause, never temp fixes
When debugging, find the actual cause and fix it permanently. No workarounds, no "TODO: revisit", no comment-out-and-move-on.

> *"Do not be lazy. Never be lazy. If there's a bug, find the root cause and fix it. No temporary fixes."* — Lesson 13

### 4. Surgical changes only
Every change should impact as little code as possible. Don't refactor adjacent code that isn't broken. Don't "improve" comments or formatting on the way through.

> *"Make every task and code change as simple as possible. Avoid massive or complex changes. Every change should impact as little code as possible."* — Lesson 13

### 5. The universal debug loop
1. **Reproduce** (restart `npm run dev` after backend changes)
2. **Capture** the literal error text
3. **Check both error sources** (browser DevTools console + terminal/network)
4. **Paste verbatim** — never paraphrase
5. **Describe what you saw** in plain English
6. **Escalate when stuck**: *"This is broken. Try something dramatically different — all of your attempts up to here have not worked."*

### 6. Talk like a coworker, not a robot
No advanced prompt engineering theatrics. Plain language. Admit what you don't know.

> *"You don't need to talk to it like it's a robot. Just talk to it like it's a human being. Be honest about what you do or don't know."* — Lesson 16

### 7. Two-window pattern (cross-LLM validation)
For complex architecture or strategy: validate with a second LLM before acting. Use ChatGPT-5.5 Pro as anti-drift architect, Claude Code as senior implementer.

> *"A lot of the time I spend vibe coding is chatting with ChatGPT to make sure before I give instructions to Claude code we're going in the right direction. I'm not drifting."* — Live Session 2
> *"AI is the best at writing prompts for other AIs."* — Live Session 2

### 8. Push to branch as soon as a feature works
Commit + push immediately on any working state. The branch is your safety net. Don't accumulate untested local-only changes.

> *"Anytime you make any changes, you test them and they work — make sure to push your changes to the branch."* — Deepdives Lesson 4

### 9. Productive idle time
When a long operation is running: don't sit idle. Update task lists, validate the next step with the co-pilot, draft the next prompt, write the commit message.

> *"Most people while their AI is building out code are going to pick up their phone, start scrolling Twitter or TikTok or Instagram. Not you, not you, not you."* — Lesson 14

### 10. Multi-agent worktrees for parallel work
For 2–3 independent features, use git worktrees + separate Claude instances rather than queuing changes serially. Cap at 3 — beyond that, humans lose track.

### 11. Linear as the persistent second brain
Use Linear (via Connectors) as external task graph. Issues become persistent context across sessions. Claude reads issues to know what to work on next.

> *"It's actually going to work as a good second brain for your Claude Code."* — AI Workflows Lesson 3

### 12. Push back on AI defaults
Claude has bad UI taste defaults (blue/purple gradients, generic stack choices, hot pink magenta). Reject them explicitly. Trust your taste over Claude's.

> *"Hot pink magenta is the absolute worst choice I can possibly imagine. We are not doing that. AI still does not have good taste."* — Lesson 21

---

## Locked stack (when applicable)

| Layer | Tool |
|---|---|
| IDE | VS Code + Claude Code extension (NOT Cursor — extension is unreliable there) |
| Stack | Next.js + TypeScript + Tailwind |
| DB + Auth | Supabase (both — drop Clerk) |
| Payments | Stripe |
| Hosting | Vercel |
| Project mgmt | Linear (with Connectors) |
| Skills | Anthropic `front-end-design` Skill (CLI-installed only) |

---

## The CLAUDE.md 9 Rules (always-on, ship with every prompt)

1. Think through the problem, read the codebase for relevant files, write a plan to `tasks/todo.md`.
2. The plan should have a list of checkable to-do items.
3. Check in with the user to verify the plan before starting work.
4. Begin work, marking items complete as you go.
5. Give a high-level explanation of every change.
6. Make every task and code change as simple as possible — every change impacts as little code as possible.
7. Don't be lazy — find the root cause and fix it. No temporary fixes.
8. All fixes/code changes as simple as possible — only impact code relevant to the task.
9. Add a final review section to `todo.md` summarizing what changed.

---

## Universal debug prompts (verbatim)

```
This is broken. Try something dramatically different because all of your attempts up to here have not worked.
```

```
GPT 5 is 100% available. Make it work. [paste docs URL]
```

```
Make sure I don't have any environment variables in my front end and they're all in my .env files.
```

```
Make sure my Supabase has row-level security everywhere needed. Walk through with me, give me SQL queries to show current RLS policies, work with me to make my database as secure as possible.
```

```
Make sure this is production ready. Do a security check across our app for any vulnerabilities.
```

---

## Anti-patterns (don't do these)

- ❌ One-shotting a whole feature in one prompt
- ❌ Skipping plan mode for non-trivial changes
- ❌ Adding "temporary fixes" instead of root causes
- ❌ Refactoring adjacent code that wasn't broken
- ❌ Letting Claude make sprawling changes
- ❌ Defaulting to blue/purple gradient UIs
- ❌ Putting secrets in `.env.example` instead of `.env.local`
- ❌ Forgetting to manually run SQL migrations in Supabase
- ❌ Not restarting dev server after env-var changes
- ❌ Skipping the immediate commit-and-push after a feature works

---

## Source materials in this repo

- **Full transcripts:** `docs/training/vibe-coding-academy/transcripts/`
- **Mastery digest:** `docs/training/vibe-coding-academy/reference/MASTERY_DIGEST.md`
- **Per-lesson structured summaries:** `docs/training/vibe-coding-academy/reference/lesson-summaries.json`
- **Skill (invokable):** `.claude/skills/vibe-coding-academy/SKILL.md`
- **Public site (for humans):** http://187.77.130.210/vca/
