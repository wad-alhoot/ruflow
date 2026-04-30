# Vibe Coding Academy — Mastery Digest

> Synthesis of 40 transcripts (~80K words / 8h 56m) across 4 courses, by Alex Finn.
> Built from 6 parallel Opus 4.7 deep-reads, 2026-04-28.

## What's Inside (the 4 courses)

| Course | Lessons | Duration | Theme |
|---|---|---|---|
| Claude Code Masterclass | 30 (29 with video) | ~5h | Idea → V1 → launched, monetized SaaS |
| Claude Code Deepdives | 5 | ~30m | Multi-agent + GitHub worktrees workflow |
| AI Workflows | 4 | ~25m | Linear as the orchestration layer for Claude + OpenClaw |
| Live Vibe Coding Sessions | 2 | ~4h | Unfiltered live builds of "HIM" (Henry Intelligent Machines) |

---

## 1. The Through-Line: Vibe Coding as a Discipline

The course's central claim is that the cost barrier from idea → product has collapsed to zero, and the only remaining bottleneck is **agency** — the reflex to ask AI rather than ask people, and the willingness to ship imperfect work over and over. "Vibe coding" is reframed as a thinking discipline, not a coding skill: solve your own annoyances, hunt challenges constantly, never one-shot, work in micro-steps, never sit idle while Claude works.

Three foundational dogmas:

1. **Building blocks, never one-shots.** Plan-mode for anything non-trivial. Smallest viable prompt at every step.
2. **Senior dev + CEO partner.** Claude Code = senior implementer. A second AI in another window (GPT-5 Thinking or Claude Desktop) = CEO/product manager partner. Always two windows open.
3. **Productive idle time.** When Claude is working you talk to the co-pilot, triage Kanban, draft tweets — never doom-scroll.

---

## 2. The Locked Stack (no choosing)

| Layer | Tool | Why |
|---|---|---|
| IDE | **VS Code** + Claude Code extension | Free, reliable; Cursor offers nothing extra. He explicitly dismisses Cursor: extension reliability issues are an active reason to avoid it. |
| AI Agent | **Claude Code** (desktop / extension / CLI) | "Best piece of software I ever use" — best coding model, best UX. |
| Co-pilot | **GPT-5 Thinking** (or Claude Desktop) | Ideation/strategy partner in a separate window. |
| Frontend+Backend | **Next.js + TypeScript + Tailwind** | AI-friendly defaults. |
| Database+Auth | **Supabase** (replaces Clerk mid-course) | Free tier, mature SQL+auth combo. |
| Payments | **Stripe** | "Best payment processor on Planet Earth." |
| Hosting | **Vercel** | Custom domains, env vars, GitHub-connected previews. |
| Email | Resend | Mentioned but not implemented in masterclass. |
| Project Mgmt | **Linear** (replacing earlier "TickTick" → "Mission Control" recommendations) | Integrates with Claude Code, GitHub, Vercel; serves as agent's "second brain." |
| Skills | **Anthropic's `front-end-design`** Skill (CLI-installed only) | Saves UIs from "blue/purple AI slop." |
| OS | Mac preferred | AI tools ship to macOS first. |

---

## 3. The CLAUDE.md Rules (the single biggest leverage point)

Place at `.claude/CLAUDE.md`. Ships with every prompt. Alex says these rules eliminated nearly all errors in his daily 12-hour Claude Code workflow:

1. Think through the problem, read the codebase, write a plan to `tasks/todo.md`.
2. The plan should be a checkable to-do list.
3. Check in with me to verify the plan before starting work.
4. Begin work, marking items complete as you go.
5. Give a high-level explanation of each change.
6. Make every task and code change as simple as possible — every change should impact as little code as possible.
7. Don't be lazy — find the **root cause** and fix it. No temporary fixes.
8. Make all fixes/code changes as simple as possible — only impact code relevant to the task.
9. Add a final review section to `todo.md` summarizing changes.

---

## 4. The Foundational Workflow (build a SaaS from scratch)

### Phase 1 — Idea generation (Lesson 4-5)
1. List 3 overlapping interests of yours.
2. Prompt the chatbot: *"Help me brainstorm app ideas based on my genuine interests… For each interest, identify three to four specific day-to-day challenges… Focus on small annoying repetitive problems, not huge industry-wide issues."*
3. Drill into the most resonant category for 10 challenges.
4. Prompt: *"Suggest three simple app ideas… V1 buildable in two weeks. Each should require only basic features, simple UI, AI functionality, and be something people would pay $10–15/month for."*
5. Ask for a full PRD.
6. Ask for the **first** Claude Code prompt — restricted to "just the initial UI" — injecting the locked stack.

### Phase 2 — V0 setup (Lesson 8-11)
1. Install VS Code (free), then Claude Code extension. `/login` to authenticate.
2. Open ChatGPT (or Claude) Desktop in another window. Prime it: *"I want you to be my AI co-pilot for an app I'm building. I want you to kind of be the CEO product manager for it."*
3. Get its first Claude prompt (must be brutally minimal: chatbot UI only, no DB, no auth, no models plural).
4. Open VS Code → new folder → Claude Code panel.
5. **Shift+Tab twice** = plan mode.
6. Paste the prompt → review plan → "Yes and auto-accept."
7. `npm run dev` → `localhost:3000`.

### Phase 3 — AI features (Lesson 12)
1. `platform.openai.com` → put credit on file → API Keys → Create new secret key.
2. Create `.env.local` (NOT `.env.example` — that's committed).
3. Add `OPENAI_API_KEY=...`. Refresh app, test with content prompt.

### Phase 4 — Database & auth (Lesson 14)
1. Tell Claude: *"I want to use Supabase for both auth and the database."* (drops Clerk).
2. Claude generates `supabase/migrations/*.sql` → **manually copy/paste into Supabase SQL Editor → click Run** (Claude can't do this).
3. Copy 3 env vars to `.env.local`: URL, anon key, service role key.
4. Verify via Table Editor; users live under Authentication tab.
5. Restart dev server: `Ctrl+C` → up arrow → Enter.

### Phase 5 — Build features (Lesson 16-20)
- One feature per chat. `/clear` between unrelated features.
- Plan mode for non-trivial. Skip plan mode for trivial UI tweaks.
- Periodically prompt: *"Check over our entire app. Create a markdown file describing how it works and all features built."* → paste that into the co-pilot for new ideas.
- Apply Anthropic's `front-end-design` Skill (CLI-only install, works across all projects after install): *"Right now the UI looks really plain. Let's redesign using the front-end-design skill. Make our app look sharp, mostly dark mode and have pops of color."*

### Phase 6 — Landing page (Lesson 21)
- Use the `@CodeBucks` design prompt as the template.
- Pre-prompt Claude: *"I'm looking to build the marketing landing page… Are you prepared for this task?"* (forces it to investigate codebase first).
- Iterate one screenshot, one issue at a time.
- Reject AI defaults: blue/purple gradients = AI slop. Push back hard.

### Phase 7 — GitHub + Vercel + custom domain (Lesson 15, 22)
1. New private GitHub repo. Tell Claude: *"Upload this code to GitHub. This is my first time using GitHub on this computer. Walk me through setup."*
2. Vercel → Add New Project → import from GitHub → fill env vars (use **placeholder strings** for keys you don't have yet so the build can succeed).
3. Buy domain inside Vercel (~$140 for `.ai`).

### Phase 8 — Stripe + webhooks (Lesson 22-23)
1. Stripe → Product Catalog → recurring product, e.g. $12/mo. Copy `price_*` ID + secret + publishable key into `.env.local`.
2. Webhook subscribes to 4 events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`.
3. Webhook signing secret → BOTH `.env.local` AND Vercel env vars.
4. Supabase → Authentication → URL Configuration → set Site URL to your custom domain (otherwise email confirms redirect to localhost).
5. Test end-to-end: signup → email confirm → Stripe checkout → verify in Supabase `subscriptions` table, Stripe Customers tab, AND the app.

### Phase 9 — Security hardening (Lesson 24)
Six prompts to run before launch:
1. *"Check that I don't have any environment variables in my front end and they're all in `.env` files."*
2. *"I want to make sure my Supabase is secure with row-level security everywhere needed. Walk through with me, give me SQL queries to show you my current RLS policies, work with me to make my database as secure as possible."*
3. *"Make sure we have proper API route protection across the board."*
4. *"Make sure I'm rate-limited everywhere we need to be."*
5. *"Make sure none of our prompts are in the front end. Want them all in the back end."*
6. *"Make sure this is production ready. Do a security check across our app for any vulnerabilities."*

---

## 5. The Universal Debug Loop

Used in every lesson, every error scenario:

1. **Reproduce** — restart `npm run dev` after backend changes.
2. **Capture** — `Cmd+Ctrl+Shift+4` (macOS region screenshot).
3. **Two error sources, always check both:**
   - Browser DevTools Console (frontend)
   - VS Code terminal where `npm run dev` runs (backend / network)
   - Plus: Vercel logs, Stripe Events, Supabase tables for production issues
4. **Paste verbatim** — literal error text, no paraphrasing.
5. **Describe what you saw in plain English** — *"I clicked optimize, got a 500. Network tab shows model field invalid."*
6. **If Claude only adds logging instead of fixing**, run again, capture more specific error, paste again.
7. **If Claude is wrong about a fact** (e.g., "GPT-5 might not be available"), assert with docs URL: *"GPT 5 is 100% available. Make it work. [paste OpenAI docs URL]"*. Claude can fetch URLs.
8. **Escalate when stuck**: *"This is broken. Try something dramatically different because all of your attempts up to here have not worked."*
9. **Reinforce wins**: *"Excellent. That worked great."* Alex believes this trains the model.

---

## 6. The Multi-Agent Workflow (Deepdives course)

**Problem solved:** Single-agent work means watching Claude think between prompts. Multi-agent = 3x throughput, no downtime, no risk of agents stepping on each other (filesystem-partitioned).

**Cap:** 3 agents per human ("my brain can only comprehend three").

### Recipe
1. Fork the source repo into your own GitHub.
2. Make a parent folder: `mkdir PM-app-demo && cd PM-app-demo`.
3. Open 3 terminal windows (Ghostty preferred — terminal beats IDEs because it uses negligible memory).
4. In each window: `claude` to launch.
5. Window 1 prompt: *"Pull down this code into a new branch and worktree called `notes`. [paste GitHub URL]"*
6. Window 2: same template, branch name `to-do-list`.
7. Window 3: same template, branch name `calendar`. **Don't forget to `claude` first** (Alex's own mistake on stream).
8. In each window, prompt the agent its feature in plan mode. Each agent has zero context — write prompts as if for an agent that's never seen the code.
9. Cycle through windows: while one is reading, give the next its prompt.
10. Hit "Yes and auto-accept" so they run unattended.
11. Each spawns its own dev server on its own port (3003, 3004, 3005). Test each in the browser.
12. **As soon as a feature works**, commit + push to its branch (the safety net): *"Commit and push these changes to the notes branch."*
13. Merge in turn: *"Please merge this code with the master branch and push it."*
14. Conflicts on the 2nd/3rd merge are normal — let Claude auto-resolve. Pre-AI, this took 8 hours; now 3 minutes.
15. Verify all features coexist in master via dev server.

**PR vs direct-merge tradeoff:** PR route is best practice for teams; AI-direct-merge is the "move fast" path used in the course for solo work.

---

## 7. The Linear Orchestration Loop (AI Workflows course)

Linear becomes the **persistent shared brain** for Claude Code + OpenClaw, bypassing context-window limits via an external task graph.

### Setup (Lesson 3)
1. Use **Claude Code Desktop** (the connector UI lives there).
2. Bottom-left → Settings → Connectors → connect **Linear**, **GitHub**, **Vercel**.
3. Keep these docs in your project folder: Vision Doc, V1 PRD, Current State.
4. Bootstrap prompt: *"Take a look at my Linear and fill the roadmap as Linear issues into existing projects or new projects if need be."*
5. Loop prompt (repeat indefinitely): *"Find the next high-urgency issue and build it out."*

Each new Claude session pulls fresh Linear state — no manual catch-up.

### OpenClaw as a 2nd Linear Member (Lesson 4)
The instructor's OpenClaw agent (named "Lola") gets its own Linear seat:

1. Linear sidebar → Invite people → use an alternate email.
2. From the **agent's account** (not yours): Settings → API → Security and access → New API key.
3. Tell OpenClaw: *"I have a Linear setup right now with all the tasks and issues in it. I want to plug you in and build a system where you're my 24/7 AI engineer. Please integrate with my Linear account."*
4. Reverse-prompt for implementation: *"Here's the system on you to build out. How do you recommend we do this?"* (let the agent design its own integration).
5. **Use polling, NOT cron jobs** — polling = lightweight script every 5 min that alerts the agent only when work exists. Cron jobs re-invoke the AI repeatedly = burns tokens.
6. Trust ramp: agent posts plan as a comment first → wait for human reply → THEN writes code.

End-state: Claude Code is main driver while OpenClaw works in parallel on separate Linear-assigned issues. Human's job = test + approve.

---

## 8. Distribution Playbook (Lesson 25)

Core thesis: **distribution beats product**. Creator Buddy hit $300K ARR because of an audience built over years of Sharing the Journey (SYJ). SEO is explicitly a bad bet.

### Channels in priority order
1. **X (Twitter)** — 10 sec/tweet, viable with a 9-to-5. Start here.
2. **YouTube** — "Best social media platform on Planet Earth" — 2% of all human time. Highest barrier, biggest reward.
3. **Substack** — only if you genuinely love long-form writing. Email is the most personal sell.
4. **SEO** — "a very hard game that is constantly changing that you really can't win." Avoid.

### Tactics
- Tweet/film/post each feature as you build it (1–2 min demo videos).
- Lead with feature value ("here's what topics are going viral"), then mention the app.
- "RT + like for free beta access" giveaways tied to feature launches.
- Personal-narrative content (purpose, struggles, lessons learned).
- Tweet about the *tools* you use to attract your future buyer demographic.

### Higher barrier = higher reward
Once a tactic gets popular and copied, it dies. Lean into livestreams, X Spaces, long-form YouTube specifically *because* they're hard.

---

## 9. Pricing Framework (Lesson 27)

Three variables in priority order:

1. **Margins** — calculate per-user monthly cost (AI APIs + data APIs). Aim for **50–70% margin**. ("If it costs $10/month per user, charge $20 minimum; $25–30 is solid.") Set fair usage limits.
2. **Audience leverage** — strong personal brand → premium pricing power. No audience → shrink margin, lower price.
3. **Competitor benchmark** — similar tools at similar price.

### Validate pre-launch with beta testers (verbatim)
- *"How much would you be willing to pay for this?"*
- *"I'm thinking about doing this price. If I set it at this price, would you still subscribe?"*
- *"Please be honest, I don't care if you hurt my feelings."*

### Diagnose post-launch with churn
Above 10–15–20% → price ≠ value → consider lowering.

**Anchor case:** Creator Buddy was $50/mo because the X API alone cost $5K/month. High data-cost dependencies → premium pricing, not consumer pricing.

---

## 10. Launch Day (Lesson 28)

1. **Week before:** 3 hype tweets — anticipation, not announcements.
2. **Launch morning:** Message the beta-tester X group chat first (most qualified buyers). Optional launch-day discount.
3. **Launch tweet:** Full demo video walking through the app.
4. **Personal-journey tweet (same day):** Challenges, decisions, what you learned. *"It's there as much buying into you as they are buying into your product."*
5. **Stay on standby 24h.** Alex didn't sleep. A month of beta testing won't catch what happens "when you open the floodgates."
6. **First-reply self-plug:** Any tweet about your niche → reply to yourself first plugging the app. ("This is how you're gonna drive a ton of traffic.")
7. **Apply Gary Vee's jab-jab-hook ratio:** 90% value, 10% promo. Anyone who only talks about their app kills their distribution.

---

## 11. Feedback Loop (Lesson 29)

> "The best marketing is improvement of your product."

The days Alex gets the most customers are days he ships *and* tweets about the ship. The loop:

1. **Proactively DM** anyone tweeting/replying about your app: *"Hey, notice you're a customer — any feedback? What worked? What didn't?"*
2. **Implement fast** (bugs and features both).
3. **Tweet the ship** — every shipped improvement gets a tweet.
4. **Repeat forever.** Your app is never "done."

Channels: X DMs (primary bug reports), domain email surfaced inside the app.

---

## 12. The Real Working Style (from Live Sessions)

The polished masterclass content cuts most of what real vibe coding looks like. The two live sessions (~4h, building "HIM" / Henry Intelligent Machines) reveal:

### What "HIM" is
A venture-backed startup ($500K pre-seed from Alex Wisner Gross / Moonshots) — *"a 24/7/365 system that finds business opportunities online and then builds and launches you micro businesses to capitalize on them."* Built on:
- **Anthropic Managed Agents** (cloud-sandboxed Claude Code) as the production runtime — each user "venture" spawns a managed agent in Anthropic's cloud.
- **Convex** backend + **Vercel** hosting + **Stripe** payments + **Clerk** auth + **GitHub** integration.
- A single master template — agent only fills content/CTA/color, "didn't butcher the components."
- Local AI models (Qwen 3, GLM) on Mac Studios + DGX Sparks polling for opportunities every 20 min.
- **Linear** as Claude Code's persistent second brain.
- **GPT-5.5 Pro** as anti-drift architecture validator (4-min response time in Pro mode).

### Operational truths the polished course doesn't show
1. **The actual coding is small.** Across 4 hours of stream, ~15-20 prompts. The other 95% = managing parallel agents, validating with another LLM, fielding chat, narrating, eating, monologuing strategy, *waiting*. Real skill = orchestration, not artisanal coding.
2. **He doesn't read his own code.** Desktop app shows app/Vercel preview/PR — never the diff.
3. **Bypass-permissions is foundational, not a shortcut.** Ask/Accept-Edits modes are "basically unusable." Zero gates between intent and shipped code.
4. **Cross-LLM laundering** as anti-drift insurance: ChatGPT-Pro writes plans → Claude implements. *"AI is the best at writing prompts for other AIs."*
5. **He won't fight tooling.** *"Every time a new model comes out I try to switch it the hacky way. Breaks 100% of time. I don't anymore. I just wait a few hours."*
6. **Linear bypasses context-window limits entirely** by serving as external task graph.
7. **Eating, profanity, casual cruelty** toward bait questions are part of the working style. The polished masterclass is genuinely a different mode.

### Standard rig (from sessions)
- Top-right monitor: Claude Code Desktop (3 sessions in left sidebar)
- Bottom-right: ChatGPT (project-specific) for branding/strategy/architecture
- Left main monitor: HIM web app (running locally)
- Second physical monitor: Telegram + Open Claude + terminal
- MacBook Pro for couch-coding at night, syncing via GitHub
- Linear in browser, accessed via integration

### The vibe coding meta-truth
> *"You're gonna have a lot of downtime as agents work. You always want to make sure something's going. If you get distracted scrolling X, you lose out on a lot of the efficiency gains from AI."*

The skill being demonstrated isn't "how to write code with Claude" — it's **how to spend 60% of your day waiting on agents productively**, by having three of them running and using the gaps for branding/strategy/admin.

---

## 13. Notable Contrarian Positions

1. **Cursor is dead.** Most vibe-coding instructors push Cursor; Alex says Claude Code in plain VS Code beats it on every axis, plus Cursor has Claude-Code-extension reliability issues.
2. **"Yes and auto-accept" without reviewing diffs.** Plan mode + CLAUDE.md = the safety net. Human review is not the gate.
3. **YouTube > X** as the most valuable platform if you can stomach the work.
4. **SEO is explicitly a bad bet** — skip it entirely.
5. **First-reply self-plug** as primary acquisition channel — not ads, not influencer outreach.
6. **Skills are mostly noise** — but Anthropic's `front-end-design` is the one exception worth installing.
7. **Skills must be installed via the CLI**, NOT the VS Code extension (easy to miss).
8. **Don't build vibe-coding tools** — *"Anthropic will just copy it and make a significantly better version. Very easy to win races you're the only one running in."*
9. **Reinforce Claude with positive feedback** — Alex believes "that worked great" trains the model.
10. **Use placeholder env vars to unblock Vercel deploys** when you can't get a webhook secret without a public URL (chicken-and-egg).
11. **Polling, not cron** for agent automation — cron re-invokes the AI = burns tokens.
12. **Reverse-prompt the agent** for its own integration design — *"How do you recommend we do this?"* — instead of dictating specs.

---

## 14. The Prompts Library (verbatim)

### Idea generation
> *"Help me brainstorm app ideas based on my genuine interests. Here's what I'm passionate about and spend time on… For each interest, identify three to four specific day-to-day challenges. Focus on small annoying repetitive problems that waste time, not huge industry-wide issues."*

> *"Suggest three simple app ideas that solve that challenge, V1 buildable in two weeks. Each should require only basic features off database, simple UI, AI functionality, and be something people would pay $10–15/month for."*

> *"Build me a full PRD for this application."*

### Co-pilot priming
> *"I want you to be my AI co-pilot for an app I'm building. Be the CEO product manager. As I build out with Claude Code who will be doing all the coding, I'll come to you for advice and help."*

### V0 prompt (minimal)
> *"Let's start super simple with one main core piece of functionality. Just the basic chatbot functionality… No database or auth for now… Give me the simplest prompt possible."*

### Database/auth pivot
> *"Let's implement the database. I want to use Supabase for both auth and the database."*

### Debug-symptom report
> *"I [action]. I see no errors in any of my logs. [Describe symptoms in 2-3 sentences.]"*

### Stuck-loop escalation
> *"This is broken. Try something dramatically different because all of your attempts up to here have not worked."*

### Feature snapshot for co-pilot
> *"Check over our entire app to see how we are doing. Create a markdown file describing how the app works and all features built out."*

Then to co-pilot:
> *"I have a rundown of the entire app so far. Take a look. Let me know if you have other crucial ideas we need to implement immediately."*

### Skill activation
> *"Right now the UI looks really plain. Let's redesign using the front-end-design skill. Make our app look sharp, mostly dark mode and have pops of color."*

### Landing page primer
> *"I'm looking to build the marketing landing page for our app. This should be the first website the user sees… Are you prepared for this task?"*

### Stripe walkthrough
> *"OK everything looks great. I just signed up for a Stripe account. Walk me through implementing Stripe. I imagine this will also include changes to Supabase."*

### Security audit (run all six)
> *"Check I don't have any environment variables in my front end."*
> *"Make sure my Supabase has row-level security everywhere needed."*
> *"Make sure we have proper API route protection across the board."*
> *"Make sure I'm rate-limited everywhere we need to be."*
> *"Make sure none of our prompts are in the front end."*
> *"Make sure this is production ready. Security check across our app for vulnerabilities."*

### Multi-agent worktree
> *"Pull down this code into a new branch and worktree called `<feature>`. [paste GitHub URL]"*

### Linear bootstrap
> *"Take a look at my Linear and fill the roadmap as Linear issues into existing projects or new projects if need be."*

### Linear loop
> *"Find the next high-urgency issue and build it out."*

### OpenClaw integration
> *"I have a Linear setup with all the tasks and issues. I want to plug you in and build a system where you're my 24/7 AI engineer. Please integrate with my Linear account."*

> *"How do you recommend we do this?"* (reverse prompt for the implementation)

### Customer outreach
> *"Hey, notice you're a customer — any feedback? What worked? What didn't? What would you like to see?"*

### Pricing validation
> *"How much would you be willing to pay for this? I'm thinking about [price]. Please be honest, I don't care if you hurt my feelings."*

---

## 15. Common Beginner Mistakes (called out across courses)

- Asking *people* (or even Alex) instead of asking AI first
- Waiting for the perfect idea before shipping
- One-shotting the entire app in a single prompt
- Doom-scrolling while Claude executes
- Putting secrets in `.env.example` (committed) instead of `.env.local`
- Skipping plan mode for non-trivial changes
- Letting Claude make sprawling changes (defended via CLAUDE.md)
- Accepting temporary fixes instead of root-cause fixes
- Forgetting to manually run SQL migrations in Supabase's SQL Editor
- Not restarting dev server after env-var changes
- Not pushing feature branches as soon as they work (loses the safety net)
- Forgetting to launch `claude` before prompting in a new terminal window
- Treating Skills like the VS Code extension would handle them (they're CLI-only)
- Trying to hack new model versions in via config-fiddling instead of waiting for official support

---

*Files synthesized: 40 transcripts at `/home/claude-user/workspace/skool-archive/vibe-coding-academy/{claude-code-masterclass,claude-code-deepdives,ai-workflows,live-vibe-coding-sessions}/*/transcript.md`. Source extraction by 6 parallel Opus 4.7 agents on 2026-04-28.*
