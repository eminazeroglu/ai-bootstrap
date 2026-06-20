# @eminazeroglu/ai-bootstrap

> Personal AI infrastructure bootstrap for Claude Code — one command sets up skills, agents, MCPs, and cross-project memory.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![Node ≥22](https://img.shields.io/badge/Node-%E2%89%A522-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![GitHub](https://img.shields.io/badge/GitHub-eminazeroglu%2Fai--bootstrap-181717?logo=github)](https://github.com/eminazeroglu/ai-bootstrap)

## Quick start

```bash
npx @eminazeroglu/ai-bootstrap
```

Interactive 6-step setup:

1. **Profile** — name, role, languages, experience, 6/12/24-month goals
2. **Projects** — scan your folders, catalog projects with CLAUDE.md detection
3. **Bundles** — pick skill + agent bundle:
   - `foundation` — 10 essential skills, 2 agents (smallest)
   - `developer` — 21 skills, 18 agents (engineering focus)
   - `marketer` — 24 skills, 29 agents (SEO + social + growth)
   - `creator` — 26 skills, 13 agents (video, music, storyboard)
   - `founder` — 35 skills, 38 agents (C-Level + business + product)
   - `full-stack` — 52+ skills, 75+ agents (everything)
4. **MCPs** — pick from 63 Model Context Protocol servers (github, postgres, supabase, notion, slack, atlassian, gmail, twilio, sendgrid, spotify, kubernetes, …)
5. **Memory** — markdown + git knowledge architecture (25-50× faster than vector DB at <100K entries)
6. **GitHub** — optional `~/.claude/` backup repo

Result: a Claude Code workstation that remembers everything across projects, machines, and sessions.

## What you get

- **85+ production skills** spanning Foundation, Product, Marketing, Social, Creator, Graphic Design, Coaching, Productivity, Engineering, C-Level Advisory, Verticals
- **75+ specialized agents** including SEO suite (18), C-Level mirrors (10), Engineering (14), Social orchestrators (5), Marketing (6), Vertical specialists (8), Product team (5)
- **63 MCP servers** in catalog with real install commands + OAuth/credential helpers (stdio + HTTP transports)
- **Universal CLAUDE.md** with 8 foundation rules (docs-first, learning-keeper auto-promotion, dürüst dialoq, etc.)
- **Knowledge skeleton**: `user-profile`, `mistakes-log`, `verified-facts`, `user-rules`, `patterns`, `handoff-log`, language guides, projects manifest
- **Interactive permission gates** via Claude Code's settings.json

## Commands

```bash
# Default
ai-bootstrap                  # Interactive 6-step wizard

# Sync + diagnose
ai-bootstrap update           # Re-sync skills + agents from latest bundle
ai-bootstrap doctor           # Diagnose install health (symlinks, MCPs, creds)

# MCP management
ai-bootstrap mcp list         # List all 63 MCP servers available
ai-bootstrap mcp installed    # List MCPs configured on this machine
ai-bootstrap mcp credentials  # Interactively fill MCP credentials

# Git backup of ~/.claude/
ai-bootstrap backup init      # Initialize: git init + remote + first push
ai-bootstrap backup sync      # Stage + commit + push current state
ai-bootstrap backup pull      # Restore on a new machine
ai-bootstrap backup status    # Show remote + last sync

# Telemetry (opt-in, default OFF)
ai-bootstrap telemetry status # Show current setting
ai-bootstrap telemetry on     # Opt in (anonymous: version, bundles, MCP IDs)
ai-bootstrap telemetry off    # Opt out

# Meta
ai-bootstrap --version
ai-bootstrap --help
```

## Architecture (3-layer memory)

```
Layer 1: ~/.claude/CLAUDE.md       — universal rules loaded every session
Layer 2: ~/.claude/knowledge/      — cross-project markdown memory
Layer 3: learning-keeper skill     — auto-captures corrections + promotes
                                     project knowledge → universal when applicable
```

## Files written

| Path | Purpose |
|---|---|
| `~/.claude/CLAUDE.md` | Universal foundation rules |
| `~/.claude/settings.json` | Permissions, model preference, hooks |
| `~/.claude/knowledge/*.md` | Cross-project knowledge |
| `~/.claude/skills/<name>/` | Installed skill (copied from template) |
| `~/.claude/agents/<name>/` | Installed agent (copied from template) |
| `~/.claude.json` | MCP server configs (Claude Code reads this) |
| `~/.claude/mcp-tracking.json` | ai-bootstrap metadata: which MCPs, what creds needed |
| `~/.claude/ai-bootstrap-state.json` | Saved bundle selection (for `update`) |
| `~/.ai-bootstrap.env` | MCP credentials (chmod 600, source in shell) |

## MCP credentials

After setup, fill credentials:

```bash
ai-bootstrap mcp credentials
```

This writes `~/.ai-bootstrap.env` (chmod 600). Source in your shell so Claude Code picks up `${VAR}` substitutions in `~/.claude.json`:

```bash
# In ~/.zshrc or ~/.bashrc:
set -a; source ~/.ai-bootstrap.env; set +a
```

## Requirements

- **Node.js ≥ 22** — uses native ESM, fs/promises, modern path helpers
- **macOS / Linux / WSL2** — primary targets (Windows native is best-effort)
- **Disk** — ~3 MB for templates + your generated `~/.claude/` content

## Development

```bash
git clone https://github.com/eminazeroglu/ai-bootstrap.git
cd ai-bootstrap

pnpm install                   # install monorepo deps
pnpm --filter @eminazeroglu/ai-bootstrap build
pnpm --filter @eminazeroglu/ai-bootstrap test    # runs 124 tests (81 smoke + 43 e2e)

# Run locally without npx
node packages/cli/bin/init.js

# Test in isolated HOME (no risk to your real ~/.claude/)
HOME=/tmp/ab-sandbox node packages/cli/bin/init.js
```

## License

MIT — fork, modify, distribute freely.

## Author

Built by [Emin Azəroğlu](https://github.com/eminazeroglu) ([@azerogluemin_ai](https://instagram.com/azerogluemin_ai)).

## Links

- [GitHub repo](https://github.com/eminazeroglu/ai-bootstrap)
- [Issues](https://github.com/eminazeroglu/ai-bootstrap/issues)
- [npm](https://www.npmjs.com/package/@eminazeroglu/ai-bootstrap)
