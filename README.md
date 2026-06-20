# ai-bootstrap

> Personal AI infrastructure bootstrap for Claude Code — one command, every project, every machine.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![Status](https://img.shields.io/badge/Status-Mərhələ_C-orange.svg)](docs/PROPOSAL.md)
[![GitHub](https://img.shields.io/badge/GitHub-eminazeroglu%2Fai--bootstrap-181717?logo=github)](https://github.com/eminazeroglu/ai-bootstrap)

**Status**: 🟢 Mərhələ A + B + C-2/3/4 done — CLI tested, TypeScript builds clean, 12 commits, public on GitHub.

## What is this?

`ai-bootstrap` is an open-source, npm-distributed bootstrap kit that turns any computer into a fully-equipped Claude Code workstation in one command:

```bash
npx ai-bootstrap init
```

It walks you through an interactive setup wizard, asks permission to scan your projects, builds your AI profile, installs essential MCP servers, configures specialized skills + agents, and sets up cross-project memory — all backed up to GitHub.

## Vision

When you sit at a new computer and run one command, Claude Code remembers:
- Who you are (profile)
- Every project you work on
- Every skill, agent, MCP you use
- Every decision, mistake, and learning across sessions

No re-explanation. No re-configuration. Just continuity.

## How it works (3 layers)

```
┌──────────────────────────────────────────┐
│  Layer 1: CLAUDE.md (universal rules)    │
│  Auto-loaded in every session             │
└──────────────────────────────────────────┘
              ↑ promote
┌──────────────────────────────────────────┐
│  Layer 2: ~/.claude/knowledge/            │
│  Cross-project memory (markdown + git)    │
└──────────────────────────────────────────┘
              ↑ auto-write
┌──────────────────────────────────────────┐
│  Layer 3: learning-keeper skill           │
│  Auto-captures corrections, builds rules  │
└──────────────────────────────────────────┘
```

## What's in it

- **5 project presets** — SaaS Fullstack, SaaS AI, AI Studio, Brand Site, Social Ops, Data Platform
- **~85 specialized skills** in 10 tiers (foundation, marketing, creator, business, ...)
- **~75 subagents** in 10 tiers (code-reviewer, SEO orchestrator, C-level advisors, ...)
- **~80 MCP servers** in 15 categories (auto-installed with bundle selection)
- **Interactive setup wizard** — first-run permission gates, profile builder, project scanner

## Locked Architectural Decisions (Mərhələ A son)

1. **Project name**: `ai-bootstrap`
2. **License**: MIT — fork, modify, distribute freely
3. **Vertical specialists**: All auto-installed (legal, medical, finance, education, e-commerce, real-estate)
4. **C-Level advisors**: All 10 auto-installed (CEO, CTO, CFO, CMO, COO, CRO, CHRO, CISO, GC, Founder-mode)
5. **Memory storage**: Markdown files + git (simple, human-readable, portable)
6. **Multilingual**: Universal `multilingual-copywriter` skill + language knowledge files (`languages/{az,ru,en,tr,es}.md`)

## License

MIT — fork, modify, distribute. Community contributions welcome.

## Status

See [docs/PROPOSAL.md](docs/PROPOSAL.md) for the complete research synthesis and roadmap.
See [docs/DECISIONS.md](docs/DECISIONS.md) for the locked architectural decisions.

---

**Author**: Emin Azəroğlu ([@azerogluemin](https://github.com/eminazeroglu))
**Built with**: Claude Code, AZ language as first-class citizen
