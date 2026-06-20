# Changelog

All notable changes to `@eminazeroglu/ai-bootstrap` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
