# ai-bootstrap

> One command. Every project. Every machine. Claude Code remembers everything.

[![npm](https://img.shields.io/npm/v/@eminazeroglu/ai-bootstrap.svg?logo=npm&label=npm)](https://www.npmjs.com/package/@eminazeroglu/ai-bootstrap)
[![CI](https://img.shields.io/github/actions/workflow/status/eminazeroglu/ai-bootstrap/ci.yml?branch=main&label=CI&logo=github)](https://github.com/eminazeroglu/ai-bootstrap/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/eminazeroglu/ai-bootstrap?logo=github&label=release)](https://github.com/eminazeroglu/ai-bootstrap/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node ≥22](https://img.shields.io/badge/Node-%E2%89%A522-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-124%20passing-brightgreen)](./packages/cli/tests)

## Quick start

```bash
npx @eminazeroglu/ai-bootstrap
```

Interactive 6-step wizard installs **85+ skills, 75+ agents, 63 MCP servers**
into `~/.claude/`, hooks up cross-project memory, and (optionally) backs the
whole thing up to a private git repo.

## What you get

| Layer | What it does |
|---|---|
| **CLAUDE.md** | Universal rules loaded every session |
| **~/.claude/knowledge/** | Cross-project markdown memory |
| **learning-keeper skill** | Auto-captures corrections, promotes project knowledge to universal |
| **85+ skills** | Foundation, Product, Marketing, Social, Creator, Graphic Design, Coaching, Productivity, Engineering, C-Level, Verticals |
| **75+ agents** | SEO suite (18), Engineering (14), C-Level mirrors (10), Vertical specialists (8), Social orchestrators (5), Product team (5) |
| **63 MCP servers** | github, postgres, supabase, notion, slack, atlassian, gmail, twilio, sendgrid, spotify, kubernetes, ElevenLabs, OpenAI, ... — all with verified install commands |

## Architecture

```
┌──────────────────────────────────────────┐
│  Layer 1: ~/.claude/CLAUDE.md            │  ← universal rules, every session
└──────────────────────────────────────────┘
                ↑ promote
┌──────────────────────────────────────────┐
│  Layer 2: ~/.claude/knowledge/           │  ← cross-project memory
└──────────────────────────────────────────┘
                ↑ auto-write
┌──────────────────────────────────────────┐
│  Layer 3: learning-keeper skill          │  ← captures corrections
└──────────────────────────────────────────┘
```

## Commands

```bash
ai-bootstrap                  # Interactive 6-step setup wizard
ai-bootstrap update           # Re-sync skills + agents from latest bundle
ai-bootstrap doctor           # Diagnose install health
ai-bootstrap mcp list         # List 63 available MCP servers
ai-bootstrap mcp credentials  # Interactively fill MCP credentials
ai-bootstrap backup init      # Set up git backup of ~/.claude/
ai-bootstrap backup sync      # Commit + push current state
ai-bootstrap backup pull      # Restore on a new machine
ai-bootstrap telemetry on     # Opt in to anonymous usage data (default off)
```

See the [CLI README](./packages/cli/README.md) for the full reference.

## Bundles

Pick the bundle that matches what you do:

| Bundle | Skills | Agents | Best for |
|---|---|---|---|
| `foundation` | 10 | 2 | Minimal — try it out |
| `developer` | 21 | 18 | Engineering work |
| `marketer` | 24 | 29 | SEO + social + growth |
| `creator` | 26 | 13 | Video, music, storyboard |
| `founder` | 35 | 38 | C-Level advisory + product + marketing |
| `full-stack` | 52+ | 75+ | Everything |

## Why this exists

When you sit at a new computer and run one command, Claude Code remembers:

- Who you are (profile + goals)
- Every project you work on (catalog with CLAUDE.md detection)
- Every skill, agent, MCP you use (installed + tracked)
- Every decision, mistake, and learning (knowledge layer + learning-keeper)

No re-explanation. No re-configuration. Just continuity.

## Project layout

```
ai-bootstrap/
├── packages/
│   ├── cli/                  # Published npm package
│   │   ├── src/{applier,commands,steps,utils}/
│   │   ├── bin/init.js       # npm bin entry
│   │   └── tests/            # 124 tests (81 smoke + 43 e2e)
│   └── templates/            # Source skills + agents + home/
├── .github/
│   ├── workflows/            # CI + auto-publish on tag
│   └── ISSUE_TEMPLATE/
├── docs/                     # Proposal, decisions, publishing notes
└── README.md
```

## Privacy + safety

- **Telemetry**: strict opt-in, OFF by default. No data leaves your machine
  unless you opt in AND set `AI_BOOTSTRAP_TELEMETRY_URL` to a collector.
- **Credentials**: MCP keys live in `~/.ai-bootstrap.env` with `chmod 600` —
  never committed by `backup`, never embedded in `~/.claude.json`.
- **Backup**: refuses public repos. Uses your existing git auth (gh / SSH /
  credential helper) — ai-bootstrap does not store tokens.
- **Verified packages only**: every MCP catalog entry attributes its source
  (`official: X` or `community: GitHub/owner`). No fabricated package names.

See [SECURITY.md](./SECURITY.md) for the full threat model + disclosure process.

## Contributing

PRs welcome — start with [CONTRIBUTING.md](./CONTRIBUTING.md). For non-trivial
changes please open an issue first to align on the approach.

## License

[MIT](./LICENSE) — fork, modify, distribute freely.

## Author

Built by [Emin Azəroğlu](https://github.com/eminazeroglu) ([@azerogluemin_ai](https://instagram.com/azerogluemin_ai)).

Built with Claude Code, Azerbaijani as a first-class language.
