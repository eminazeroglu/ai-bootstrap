# Changelog

All notable changes to `@eminazeroglu/ai-bootstrap` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
