# Changelog

All notable changes to `@azerogluemin/ai-bootstrap` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.2] — 2026-06-24

Instagram MCP server **bundled inside ai-bootstrap package** — works on any computer.

### Fixed (the real fix)

v0.6.1 added the `integration` command but the Instagram MCP server source was
NOT inside the ai-bootstrap package. Users on a fresh machine had nothing to install.

v0.6.2 bundles the full 15-tool Instagram MCP server (5 source files + package.json
+ .env.example + README + meta-app-config docs) inside the npm tarball.

### Architecture

- New: `packages/templates/integrations/<name>/` — source-of-truth for local MCP servers
- `prepack` (copy-templates.mjs) now includes `integrations/` alongside skills/agents
- `ai-bootstrap integration install <name>`:
  1. Looks up bundled source from package's `templates/integrations/<name>/`
  2. Copies to `~/.claude/integrations/<name>/`
  3. Runs `npm install` in `server/`
  4. Seeds `.env` from `.env.example` (idempotent — won't overwrite existing)
  5. Prints next-steps (fill .env, doctor, mcp add)

### Workflow on a fresh machine

```bash
npm install -g @azerogluemin/ai-bootstrap@latest
ai-bootstrap                                    # foundation + free MCPs
ai-bootstrap integration install instagram      # copy + npm install + seed .env
nano ~/.claude/integrations/instagram-mcp/.env  # add Meta App ID + token
ai-bootstrap integration doctor instagram       # 5/5 health check
ai-bootstrap mcp add instagram                  # bind to Claude Code
claude                                          # ig_profile etc. available
```

### Tarball impact

- v0.6.1 → v0.6.2: +9 files, ~26 KB (server code + docs)
- Still under 1.3 MB total

[0.6.2]: https://github.com/eminazeroglu/ai-bootstrap/releases/tag/v0.6.2

## [0.6.1] — 2026-06-24

Real Instagram MCP fix + new `integration` command for local MCP servers.

### Fixed

- **Instagram MCP catalog entry was fabricated**: pointed to `@modelcontextprotocol/server-instagram` which does NOT exist on npm (Rule 16 violation discovered in real testing).
- Now uses a LOCAL Node server at `~/.claude/integrations/instagram-mcp/` (15-tool real Graph API implementation: ig_profile, ig_publish_reel, ig_list_messages, etc.). Server is shipped separately and copied from a working source (e.g., `azerogluemin.az/projects/azerogluemin-ai/instagram-mcp`).
- Env vars (META_APP_ID, IG_ACCESS_TOKEN, IG_BUSINESS_ACCOUNT_ID, etc.) are loaded by the server itself from `~/.claude/integrations/instagram-mcp/.env` — no shell env required.

### Added — `ai-bootstrap integration <sub>` command

For MCP servers that ship as local Node code instead of public npm packages:

- `ai-bootstrap integration status` — list installed integrations + health
- `ai-bootstrap integration install <name>` — npm install deps + verify .env + first boot
- `ai-bootstrap integration doctor <name>` — full health check (file/deps/env/boot)

Currently supports: `instagram` (15-tool local server). Architecture is extensible — drop a new server into `~/.claude/integrations/<name>/` and register it in `INTEGRATIONS` map.

### Why

Some valuable MCP integrations exist only as project-local code (custom Graph API clients, internal tools). ai-bootstrap now first-classes that pattern instead of forcing everything through the npm registry.

[0.6.1]: https://github.com/eminazeroglu/ai-bootstrap/releases/tag/v0.6.1

## [0.6.0] — 2026-06-21

Preset-based project bootstrap — folder scaffolding + CLAUDE.md per preset.

### Added — 8 new production skills

Real production-quality content (~150-280 lines each, with sources):

Dev specialists:
- `frontend-developer` — React 19/Next 16/Vue 3/Svelte 5, state mgmt, performance, WCAG 2.2, testing
- `backend-developer` — REST/GraphQL, NestJS/Hono/FastAPI, multi-tenant, OWASP, caching, queues
- `devops-developer` — Docker, K8s, CI/CD, IaC, secrets, monitoring, SLOs
- `mobile-developer` — React Native (New Arch), Flutter, native iOS/Android, offline sync

Film production specialists:
- `editor` — Cut grammar, J/L cuts, vertical pacing, sound editing, Resolve/Premiere/FCP/CapCut
- `colorist` — Scopes (waveform/vector/parade), LUT design, Pixar/Wong Kar-wai/Deakins/A24 looks
- `art-director` — Visual treatment, mood board, palette per scene/character, era research (AZ-specific)
- `cinematographer` — Camera/lens/light decision trees, Deakins/Lubezki/Fraser craft

### Added — 3 project presets

Replaces bundle abstraction in user-facing CLI. Each preset includes
folder structure + CLAUDE.md template + skill+agent install list + MCP suggestions.

**SaaS Development** (~58 skills, ~50 agents, ~22 MCPs)
- Folders: \`apps/{web,api,admin}\`, \`packages/{ui,db,shared}\`, \`docs/00-27\`, \`infra/\`, \`scripts/\`
- CLAUDE.md rules: TS strict, multi-tenant, JWT+refresh, OWASP, decisions-log append-only
- 28 numbered docs scaffolded (00-claude-code-guide → 27-go-live-runbook)

**Social Page** (~44 skills, ~22 agents, ~21 MCPs)
- Folders: \`strategy/\`, \`calendar/\`, \`days/YYYY-MM-DD/{characters,shots,video,music,thumbnail,final}\`,
  \`prompts-library/\`, \`assets/\`, \`analytics/\`
- CLAUDE.md rules: **Prompt-first** (vizual təsdiqsiz fayl qadağa), daily folder isolation
- Strategy MD skeletons: brand-guide, content-pillars, audience-personas, competitors

**AI Studio** (~34 skills, ~11 agents, ~14 MCPs)
- Folders: \`projects/<client>/{brief,characters,locations,shots,video,music}\`,
  \`days/YYYY-MM-DD/\`, \`references/{pixar-style,cinematography,color-grading}\`,
  \`prompts-library/\`
- CLAUDE.md rules: Prompt-first, style refs before prompt, file naming convention
- NO social platform skills/MCPs (studio doesn't publish)

### Changed — `ai-bootstrap new` is now preset-based

Previous (v0.5.0): multi-select bundle checkbox
New (v0.6.0): single-select preset → 3 questions only:
1. Layihə adı?
2. Bu qovluqda nə qurmaq istəyirsən? (SaaS / Social Page / AI Studio)
3. Qısa təsvir?

After selection: skills+agents symlinked from pool, MCPs auto-suggested,
folder structure scaffolded, CLAUDE.md written with preset-specific rules.

### Architecture

- New: \`packages/cli/src/applier/preset-definitions.ts\` — 3 preset metadata
- New: \`packages/cli/src/applier/preset-scaffolder.ts\` — folder scaffolder per preset
- Bundles still exist internally (\`resolvePlan\`, \`SKILL_BUNDLES\`, \`AGENT_BUNDLES\`)
  but no longer surface to users — presets replaced them
- Project state schema bumped to v2.0: \`{ preset, name, description, createdAt }\`

### Tests

- 176 passing (was 142): 121 smoke + 55 e2e
- New: 30+ preset definition assertions (skill counts, MCP presence, preset uniqueness)
- New: 11 scaffolder assertions (SaaS 28 docs, Social strategy MDs, AI Studio refs)

### Migration

- v0.5.0 projects (multi-bundle): continue to work; new \`ai-bootstrap new\` writes preset state
- Old multi-bundle CLAUDE.md template still readable; project state v2.0 backward compat

[0.6.0]: https://github.com/eminazeroglu/ai-bootstrap/releases/tag/v0.6.0

## [0.5.0] — 2026-06-21

Big architectural + UX redesign from real-world test feedback.

### Added — Pool + Symlink architecture

- `~/.claude/skills-pool/` — ALL skills stored ONCE on disk (~3.8 MB total)
- `~/.claude/agents-pool/` — same for agents
- User-scope (`~/.claude/skills/`) and project-scope (`<project>/.claude/skills/`)
  are now **symlinks** pointing to pool entries (POSIX), junctions (Windows),
  or copies (Windows fallback when admin not available)
- **Result**: 10 creator projects = 1 pool copy + 260 symlinks, not 260 file copies
- Updates to a skill propagate to every project automatically (pnpm-style pattern)

### Changed — wizard simplified 6 steps → 1

Previous (v0.4.x): 15+ questions across 6 steps. Real user got overwhelmed,
hit SIGINT mid-flow, asked "why is this asking globally?".

New (v0.5.0): **3 questions only**:
1. Adın?
2. Əsas dilin? (az/en/ru/tr)
3. Sən kimsən, nə edirsən? (1-2 cümlə)

Removed entirely:
- Projects scan step (no projects on fresh machine — `ai-bootstrap scan <path>` later)
- Bundle selection step (auto-installs `foundation` user-scope; project bundles via `new`)
- MCPs full picker (auto-installs 9 free MCPs: filesystem, memory, git, fetch,
  time, arxiv, youtube-transcript, puppeteer, playwright)
- Memory configuration step (defaults: markdown-only, learning-keeper ON, all logs ON)
- GitHub backup step (use `ai-bootstrap backup init` when ready)

### Changed — `ai-bootstrap new` simplified

Previous: 5 questions (single-bundle + override confirm + custom rules).
New: **3 questions only**:
1. Layihə adı?
2. Bundle(lər)? (**multi-select checkbox** — pick multiple at once)
3. Qısa təsvir? (1-2 cümlə)

Removed:
- Single-bundle intent selection (replaced by multi-select)
- Bundle override confirm (multi-select handles it)
- Custom rules question (placeholder added to CLAUDE.md instead)

### Added — new commands

- `ai-bootstrap help` — comprehensive guide (full tour, not just brief --help)
- `ai-bootstrap add` (no args) — **interactive multi-select** of all bundles + skills + agents
- `ai-bootstrap mcp add` — multi-select MCP picker (was missing)
- `ai-bootstrap mcp add github notion slack` — direct add
- `ai-bootstrap scan ~/MyJobs` — manual project scan (replaces removed wizard step)

### Quality

- Cross-platform link helper: `linkFromPool()` tries symlink → junction → copy
- Pool sync detects newer template versions and refreshes pool entries
- 142 tests still passing (87 smoke + 55 e2e)

### Workflow

```bash
# 1) Maşına bir dəfə (3 sual, 30 saniyə):
npm install -g @azerogluemin/ai-bootstrap@latest
ai-bootstrap

# 2) Hər yeni layihə (3 sual, 20 saniyə):
cd ~/Projects/yeni-layihə
ai-bootstrap new
```

### Migration

- v0.4.x project copies → v0.5.0 symlinks: run `ai-bootstrap update` to switch
- Or `ai-bootstrap remove --all` then `ai-bootstrap new` per project

[0.5.0]: https://github.com/eminazeroglu/ai-bootstrap/releases/tag/v0.5.0

## [0.4.2] — 2026-06-21

README quick-start fixed — global install upfront.

### Changed

- README quick-start was inconsistent: step 1 used `npx` (one-shot, no install),
  step 2 used `ai-bootstrap new` (requires global install). Users hit
  `zsh: command not found: ai-bootstrap` after the wizard.
- Quick-start is now 3 steps: `npm install -g` → `ai-bootstrap` (wizard) →
  `ai-bootstrap new` (per project)
- Explanation added: why global install (so `new` / `add` / `doctor` are
  available everywhere) + alternative (always-`npx`)
- No functional code changes vs. 0.4.1.

[0.4.2]: https://github.com/eminazeroglu/ai-bootstrap/releases/tag/v0.4.2

## [0.4.1] — 2026-06-21

README rewrite — published so npm.com lands on the new usage guide.

### Changed

- packages/cli/README.md — full rewrite (AZ):
  - 2-step TL;DR quick start
  - User scope vs. project scope explained with table
  - 5 real workflow scenarios (Creator/IG, SaaS, SMM, add bundle, remove)
  - All commands grouped by purpose (setup, mgmt, MCP, backup, telemetry)
  - 63 MCP server categorized list
  - Troubleshooting section (5 common issues)
- No functional code changes vs. 0.4.0.

[0.4.1]: https://github.com/eminazeroglu/ai-bootstrap/releases/tag/v0.4.1

## [0.4.0] — 2026-06-21

Incremental skill + agent management — add / remove / list.

### Added

- **`ai-bootstrap add <names>`** — install additional skills or agents
  - Auto-detects skill vs agent by template lookup
  - `--bundle <name>` merges an entire bundle
  - Auto-detects scope (project if CLAUDE.md / .claude/ in cwd, else user)
  - `--user` / `--project` flags force scope
- **`ai-bootstrap remove <names>` (alias: `rm`)** — uninstall skills/agents
  - Same scope auto-detection
  - Removes from both skills/ and agents/ if name matches both
- **`ai-bootstrap list` (alias: `ls`)** — list installed skills/agents
  - Current scope by default
  - `--user`, `--project`, or `--all` flags
  - `--all` shows user scope + current project side-by-side

### Why

v0.3.0 introduced `new` for project bootstrap with a single bundle. But real
users hit edge cases:
- Picked `developer` bundle, later need `showrunner` for a marketing page
- Picked `creator`, later need `seo-technical` for SEO audit
- Want to remove unused skills to reduce context noise

`add` / `remove` / `list` give granular control without re-running the whole wizard.

### Workflow examples

```bash
# Already have a developer-bundle project, need creator skills too:
ai-bootstrap add showrunner character-designer image-prompt-engineer

# Or merge whole creator bundle on top:
ai-bootstrap add --bundle creator

# See what's installed in this project:
ai-bootstrap list

# See user + project side by side:
ai-bootstrap list --all

# Drop a skill you don't use:
ai-bootstrap remove security-auditor
```

### Tests

- New e2e tests: add help, list empty user scope, remove non-existent graceful
- 134 passing (was 131): 87 smoke + 47 e2e

[0.4.0]: https://github.com/eminazeroglu/ai-bootstrap/releases/tag/v0.4.0

## [0.3.0] — 2026-06-21

Project-scope skills + agents — different bundles per project.

### Added

- **`ai-bootstrap new` subcommand** — bootstrap any folder as a project:
  1. Ask the project name (defaults to folder name)
  2. Ask "what is this project?" with 9 intent choices that auto-map to a bundle:
     - SaaS / Fullstack → developer
     - AI Creator content → creator
     - Marketing / SMM → marketer
     - Mobile app → developer
     - Data analysis / dashboard → developer
     - Client agency work → full-stack
     - Startup / founder → founder
     - Open source library → developer
     - Just basics → foundation
  3. Allow bundle override
  4. Ask for 1-2 sentence project description (goes into CLAUDE.md)
  5. Allow custom project-specific rules
  6. Install skills to `<project>/.claude/skills/` (PROJECT scope)
  7. Install agents to `<project>/.claude/agents/` (PROJECT scope)
  8. Write `<project>/CLAUDE.md` with project metadata + bundle reference
  9. Save state to `<project>/.claude/ai-bootstrap-project.json`

### Why this matters

Previously, ai-bootstrap installed ONE bundle globally (`~/.claude/`). Every
project saw the same skill set. Real users have multiple identities — AI
creator on Monday, full-stack dev on Tuesday, marketer on Wednesday — and
need different skills per project.

Claude Code's project-scope skills (`<project>/.claude/skills/`) load ONLY
when working inside that project. This gives you the right tools per context
without polluting every session.

### Changed

- `installSkills(names, targetDir?)` — second arg defaults to `~/.claude/skills/`
  for backward compat; project install passes `<project>/.claude/skills/`
- `installAgents(names, targetDir?)` — same pattern
- Help text reorganized: user-scope wizard vs project-scope `new`

### Testing

- New smoke test: 'project-scope install' — verifies skills install to
  project dir, user-scope dir NOT affected
- E2E test updated for help text changes
- 127 tests passing (was 124)

### Workflow

```bash
# Once per machine — universal foundation:
npx @azerogluemin/ai-bootstrap   # picks foundation/minimal user-scope

# Then per project:
cd ~/Projects/my-saas && ai-bootstrap new     # → developer bundle
cd ~/Projects/azerogluemin-content && ai-bootstrap new   # → creator bundle
cd ~/Clients/restaurant-smm && ai-bootstrap new   # → marketer bundle
```

Each project sees only its own bundle. No skill pollution.

[0.3.0]: https://github.com/eminazeroglu/ai-bootstrap/releases/tag/v0.3.0

## [0.2.2] — 2026-06-21

User-autonomy fixes from first real-world test feedback.

### Fixed

- **Wizard step 6 (GitHub backup) over-validated URLs**:
  - Now accepts both SSH (`git@github.com:user/repo`) and HTTPS
  - Empty input is now allowed → defer URL to `ai-bootstrap backup init` later
  - User no longer locked into giving a URL at wizard time
- **`backup init` refused public repos outright**:
  - Now warns + asks for explicit confirmation instead of hard-blocking
  - Rationale: user autonomy — the user knows their threat model

### Why

In v0.2.1 test, the wizard rejected a valid SSH URL and refused to proceed.
Two design errors: (1) regex was https-only, (2) URL was mandatory if user
said "yes" to backup. Both fixed.

[0.2.2]: https://github.com/eminazeroglu/ai-bootstrap/releases/tag/v0.2.2

## [0.2.1] — 2026-06-21

First published version on npm.

### Changed

- No functional code changes vs. 0.2.0.
- Released manually via `npm publish` from a logged-in local environment
  (the v0.2.0 commit existed only on GitHub; this is the npm-first release).

[0.2.1]: https://github.com/eminazeroglu/ai-bootstrap/releases/tag/v0.2.1

## [0.2.0] — 2026-06-20

Second release — closes the "post-launch roadmap" gaps from v0.1.0.

### Added

- **MCP catalog expanded 41 → 63 servers** (all verified against official docs or
  npm/GitHub as of 2026-06-20; no fabricated packages):
  - Atlassian (Jira + Confluence) via `uvx mcp-atlassian` (sooperset)
  - Twilio via `@twilio-alpha/mcp` (official alpha)
  - SendGrid via `sendgrid-mcp` (Garoth)
  - Trello via `@delorenj/mcp-server-trello`
  - Asana via `mcp-server-asana`
  - ClickUp via `clickup-mcp-server`
  - Spotify via `spotify-mcp-server` (marcelmarais)
  - YouTube Transcript via `@sinco-lab/mcp-youtube-transcript`
  - arXiv via `uvx mcp-simple-arxiv`
  - Kubernetes via `docker ghcr.io/alexei-led/k8s-mcp-server`
  - Browserbase via `@browserbasehq/mcp`
  - Apify via `@apify/actors-mcp-server` (4500+ scrapers)
  - Time via `uvx mcp-server-time` (no creds, timezone utils)
  - **Google Workspace official remote MCPs** (HTTP transport + OAuth):
    Gmail, Google Drive, Google Calendar, Google Chat
- **HTTP transport support** in catalog schema:
  - `transport: 'stdio' | 'http'`, `serverUrl`, `oauth: { clientIdEnv, clientSecretEnv }`
  - `writeMcpConfig` writes either stdio command/args/env OR serverUrl/oauth JSON
- **New CLI command: `ai-bootstrap backup <sub>`**
  - `backup init` — git init + remote + initial push (uses system git auth)
  - `backup sync` — stage + commit + push current state
  - `backup pull` — clone or pull from remote (restore on new machine)
  - `backup status` — show remote, last sync, last commit
  - Auto-generates `.gitignore` excluding mcp-tracking.json (no creds leaked)
- **New CLI command: `ai-bootstrap telemetry <sub>`**
  - `telemetry on/off/status` — strict opt-in (default off)
  - Writes `~/.claude/telemetry.json` with random install UUID
  - Endpoint configured via `AI_BOOTSTRAP_TELEMETRY_URL` env (no default —
    no data goes anywhere unless user sets a collector)
  - Collects: version, Node, platform, bundle choice, MCP IDs, event name
  - Never collects: profile, project names/paths, knowledge files, credentials
  - 2-second timeout, silent failure (never breaks CLI)
- **E2E test suite** (`tests/e2e.test.mjs`): 43 tests covering compiled CLI
  via subprocess — --version, --help, doctor on empty HOME, mcp list/installed,
  update with no state, telemetry status/on/off, backup status, error handling
- **New category**: `research` for arxiv, youtube-transcript

### Changed

- `package.json scripts`:
  - `test` = smoke + e2e (was: smoke only)
  - `test:smoke` and `test:e2e` for individual runs
  - `prepublishOnly` now runs e2e too before publish
- Help text reorganized to show new subcommands

### Quality

- **124 tests passing** (was 81): 81 smoke + 43 e2e
- All MCP catalog entries include `source:` field attributing the maintainer
  (official vs community) for transparency
- HTTP transport entries clearly marked with `transport: 'http'`

### Known limitations (still post-launch)

- Documentation site (ai-bootstrap.dev) — separate marketing project
- Some MCPs depend on npm packages that may rename; catalog will need refresh
- Telemetry collector backend is user-provided (intentional — privacy-first)
- ProductHunt / HackerNews launch — manual

[0.2.0]: https://github.com/eminazeroglu/ai-bootstrap/releases/tag/v0.2.0

## [0.1.0] — 2026-06-20

First public release on npm.

### Added

- **Interactive 6-step setup wizard** (`ai-bootstrap`)
  - Profile, Projects, Bundles, MCPs, Memory, GitHub backup steps
- **6 bundle presets** with cumulative inheritance:
  - `foundation` (10 skills, 2 agents)
  - `developer` (21 skills, 18 agents) — engineering focus
  - `marketer` (24 skills, 29 agents) — SEO + social + growth
  - `creator` (26 skills, 13 agents) — video, music, storyboard
  - `founder` (35 skills, 38 agents) — C-Level + business + product
  - `full-stack` (52+ skills, 75+ agents) — everything
- **85+ production skills** across 12 categories:
  - Foundation (10), Product/UX (7), Marketing (8), Social (7), Creator (14),
    Graphic Design (5), Coaching (5), Productivity (5), Engineering (7),
    C-Level (10), Vertical specialists (5), Multilingual (2)
- **75+ specialized agents** including:
  - SEO suite (18) — technical, content, schema, AEO, local, maps, backlinks,
    ecommerce, international, SPA, semantic, drift, google-api, brief,
    programmatic, competitor, SXO, image
  - Engineering (14), Marketing (6), Social platform orchestrators (5),
    Content orchestrators (4), Product team (5), C-Level mirrors (10),
    Vertical specialists (8), Business (3)
- **41 MCP servers** catalog with real install metadata:
  - Dev: github, gitlab, filesystem, git, fetch, puppeteer, playwright,
    vercel, cloudflare, aws, netlify, brave-search, firecrawl, tavily, exa
  - Data: postgres, supabase, mongodb, sqlite, redis, airtable
  - Productivity: notion, linear, obsidian, slack, discord, memory
  - Social: instagram, twitter, meta, youtube, linkedin, tiktok, telegram
  - AI: openai, anthropic, elevenlabs, replicate, perplexity
  - Creator: figma
  - Business: stripe, hubspot, salesforce
  - Analytics: ga4, sentry, posthog
- **3-layer memory architecture**:
  - Layer 1: `~/.claude/CLAUDE.md` (universal rules)
  - Layer 2: `~/.claude/knowledge/` (markdown + git cross-project)
  - Layer 3: `learning-keeper` skill (auto-promotion of project knowledge)
- **CLI subcommands**:
  - `ai-bootstrap update` — re-sync skills + agents from latest bundle
  - `ai-bootstrap doctor` — diagnose install health (symlinks, MCPs, creds)
  - `ai-bootstrap mcp list` — list catalog by category
  - `ai-bootstrap mcp installed` — list configured MCPs
  - `ai-bootstrap mcp credentials` — interactive password prompts → `~/.ai-bootstrap.env`
- **State persistence**: `~/.claude/ai-bootstrap-state.json` saves bundle
  selection so `update` is idempotent
- **Real Claude Code integration**: writes `mcpServers` to `~/.claude.json`
  with `${VAR}` placeholders that resolve from `~/.ai-bootstrap.env`
- **MIT license**

### Quality

- **81 smoke tests passing** — cover profile, projects, settings, MCP catalog,
  bundle resolution, skills installer, agents installer
- **TypeScript strict mode** — no `any` leaks, full type safety
- **Templates bundled in tarball** — self-contained 1.1 MB pkg with 827 files,
  no external download dependency
- **Copy semantics** (not symlinks) — survives npm cache cleanup

### Known limitations (post-launch roadmap)

- Telemetry not yet implemented (opt-in)
- Documentation site (ai-bootstrap.dev) pending
- GitHub OAuth backup uses personal access token (no device-code flow yet)
- ProductHunt / HackerNews launch pending

[0.1.0]: https://github.com/eminazeroglu/ai-bootstrap/releases/tag/v0.1.0
