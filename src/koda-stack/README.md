# The Koda Creative Stack

**10 creative agents for Claude Code that automate your full content pipeline — from script to published reel.**

One line. Full creative team. Zero overhead.

```bash
git clone https://github.com/timkoda/koda-stack.git ~/.claude/skills/koda-stack
```

## What is the Koda Creative Stack?

The Koda Creative Stack turns Claude Code into a full creative studio. Each skill is a specialized agent that handles one step of your content pipeline — scriptwriting, art direction, storyboarding, editing, publishing, and more.

You brief once. They handle everything.

## The 10 Skills

| Skill | Role | What it does |
|-------|------|-------------|
| `/brief` | The Planner | Turns a vague idea into a structured creative brief |
| `/trends` | The Scout | Finds trending topics and angles in your niche |
| `/concept` | The Creative Director | Builds 3 creative concepts from your brief |
| `/script` | The Scriptwriter | Writes dense, punchy video scripts |
| `/art-direction` | The Art Director | Sets the visual direction — palette, mood, lighting |
| `/storyboard` | The Storyboarder | Maps every shot with timing and descriptions |
| `/generate` | The Producer | Generates images via AI (fal.ai, Midjourney, etc.) |
| `/assemble` | The Editor | Assembles your reel from shots + voiceover |
| `/publish` | The Social Manager | Writes captions, hashtags, and posting strategy |
| `/repurpose` | The Content Multiplier | Adapts your reel into threads, carousels, stories |

## How It Works

### 1. Install

```bash
git clone https://github.com/timkoda/koda-stack.git ~/.claude/skills/koda-stack
```

### 2. Set Up Your DNA

Edit `CLAUDE.md` in the root with your brand identity — tone, colors, tools, audience. Every skill reads this file so your content always sounds like you.

### 3. Start Creating

```
You: /brief I want a reel about building an AI creative workflow
```

Claude Code picks up the brief and routes it through each skill. Your script gets written, your visuals get directed, your shots get generated, your reel gets assembled.

## Your Creative DNA

The `CLAUDE.md` file is your brand fingerprint. Fill it with:

- **Voice** — How you talk (casual, technical, bold, intimate)
- **Visual style** — Your aesthetic (colors, lighting, composition)
- **Tools** — What you use (fal.ai, Runway, Remotion, etc.)
- **Audience** — Who you create for
- **Rules** — Your non-negotiables (format, length, tone)

Every skill reads your DNA before creating anything. No more explaining your brand every time.

## Pipeline Flow

```
/brief → /trends → /concept → /script → /art-direction → /storyboard → /generate → /assemble → /publish → /repurpose
```

Run them in sequence or pick the ones you need. Each skill works standalone or as part of the full pipeline.

## Requirements

- [Claude Code](https://claude.ai/claude-code) installed and configured
- Skills directory at `~/.claude/skills/`

## License

MIT — use it, fork it, make it yours.

## Built by Tim Koda

AI Creative Director — cinema-quality AI workflows for creators.

[![Instagram](https://img.shields.io/badge/Instagram-@timkoda__-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/timkoda_)
[![TikTok](https://img.shields.io/badge/TikTok-@timkoda__-000000?style=for-the-badge&logo=tiktok&logoColor=white)](https://tiktok.com/@timkoda_)

Inspired by [GSTACK](https://github.com/garrytan/gstack) by Garry Tan.
