# Vibe Coding Academy — Training Materials

Local copy of all 40 lesson transcripts from Alex Finn's Vibe Coding Academy, plus distilled principles that this repo's Claude Code follows by default.

## Why this exists

The user has formally adopted this methodology for working in this repo. Future Claude Code sessions automatically apply the 12 core principles (see `PRINCIPLES.md`) — they're loaded via:

1. **The Skill** at `.claude/skills/vibe-coding-academy/SKILL.md` — invokable rules
2. **CLAUDE.md** — top-level reminder pointing to the skill (always loaded)
3. **AgentDB** — all 40 transcripts ingested for semantic search
4. **This directory** — full source-of-truth transcripts and reference

## Layout

```
docs/training/vibe-coding-academy/
├── README.md                            # This file
├── PRINCIPLES.md                        # The 12 actionable rules (read this first)
├── transcripts/                         # All 40 raw transcripts, by course
│   ├── claude-code-masterclass/         # 29 lessons (idea → launched SaaS)
│   ├── claude-code-deepdives/           # 5 lessons (multi-agent + GitHub)
│   ├── ai-workflows/                    # 4 lessons (Linear + OpenClaw)
│   └── live-vibe-coding-sessions/       # 2 long sessions (~4h, building HIM)
└── reference/
    ├── MASTERY_DIGEST.md                # Synthesized teaching digest
    └── lesson-summaries.json            # Structured per-lesson TL;DR + highlights + quotes
```

## How to query the training material

### From the CLI (semantic search of transcripts)
```bash
node scripts/memory-db/search.js "<keywords>"
# e.g.
node scripts/memory-db/search.js "stripe webhook setup"
node scripts/memory-db/search.js "claude.md rules"
node scripts/memory-db/search.js "security rate limiting"
```

### Direct grep
```bash
grep -rn "topic" docs/training/vibe-coding-academy/transcripts/
```

### As a Claude Code skill
Invoke via prompt: *"use the vibe-coding-academy skill"* or just describe a vibe-coding-related task and the skill auto-activates.

## How to teach the user (and yourself) something specific

When the user asks *"how does Alex say to do X"*:

1. Grep the transcripts for the topic
2. Pull verbatim quotes with timestamps
3. If multi-step (Stripe, security audit, etc.), reference `MASTERY_DIGEST.md` for the consolidated playbook
4. Apply directly to the current task — don't paraphrase Alex's prompts

## Re-train / refresh

If transcripts are updated, re-ingest into AgentDB:

```bash
for f in docs/training/vibe-coding-academy/transcripts/**/*.md; do
  node scripts/memory-db/ingest.js --file "$f"
done
node scripts/memory-db/ingest.js --file docs/training/vibe-coding-academy/reference/MASTERY_DIGEST.md
node scripts/memory-db/ingest.js --file docs/training/vibe-coding-academy/PRINCIPLES.md
```

## Public companion site (for humans, not Claude)

Deployed at http://187.77.130.210/vca/ — same content, animated UI, copy-paste prompts.

## Source

Alex Finn — Vibe Coding Academy on Skool. Captured during paid subscription period.
