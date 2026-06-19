# claude-brain

> Personal AI infrastructure bootstrap for Claude Code — one command, every project, every machine.

**Status**: 🟡 Mərhələ A tamamlandı (research). Mərhələ B (proof of concept) hazırlanır.

## What is this?

`claude-brain` is an open-source, npm-distributed bootstrap kit that turns any computer into a fully-equipped Claude Code workstation in one command:

```bash
npx claude-brain init
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
│  Layer 3: ae-learning-keeper skill        │
│  Auto-captures corrections, builds rules  │
└──────────────────────────────────────────┘
```

## What's in it

- **5 project presets** — SaaS Fullstack, SaaS AI, AI Studio, Brand Site, Social Ops, Data Platform
- **~85 specialized skills** in 10 tiers (foundation, marketing, creator, business, ...)
- **~75 subagents** in 10 tiers (code-reviewer, SEO orchestrator, C-level advisors, ...)
- **~80 MCP servers** in 15 categories (auto-installed with bundle selection)
- **Interactive setup wizard** — first-run permission gates, profile builder, project scanner

## License

MIT — fork, modify, distribute. Community contributions welcome.

## Status

See [docs/PROPOSAL.md](docs/PROPOSAL.md) for the complete research synthesis and roadmap.

---

**Author**: Emin Azəroğlu ([@azerogluemin](https://github.com/eminazeroglu))
**Built with**: Claude Code, AZ language as first-class citizen
