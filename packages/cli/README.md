# ai-bootstrap

> Personal AI infrastructure bootstrap for Claude Code — one command sets up skills, agents, MCPs, and cross-project memory.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![GitHub](https://img.shields.io/badge/GitHub-eminazeroglu%2Fai--bootstrap-181717?logo=github)](https://github.com/eminazeroglu/ai-bootstrap)

## Quick start

```bash
npx ai-bootstrap init
```

Walks you through a 6-step interactive setup:
1. **Profile** — who you are, what you do
2. **Projects** — scan your folders, catalog projects
3. **Bundles** — pick skill + agent bundle (Foundation / Developer / Marketer / Creator / Founder / Full Stack)
4. **MCPs** — choose Model Context Protocol servers
5. **Memory** — configure cross-session knowledge storage
6. **GitHub** — optional backup of `~/.claude/`

Result: a Claude Code workstation that remembers everything, across projects and machines.

## What you get

- **10 production-ready skills** (Foundation tier): learning-keeper, multilingual-copywriter, architect, doc-writer, test-writer, code-reviewer, security-auditor, simplify, verify, refactor
- **1 production-ready agent**: code-reviewer subagent
- **Universal CLAUDE.md** with 8 foundation rules
- **Knowledge skeleton**: user-profile, mistakes-log, verified-facts, user-rules, patterns, handoff-log, language guides, projects manifest
- **MCP catalog** (configured at install)
- **Interactive permission gates** — explicit OK before every sensitive action

## Architecture (3 layers)

```
Layer 1: ~/.claude/CLAUDE.md       — universal rules
Layer 2: ~/.claude/knowledge/      — cross-project memory (markdown + git)
Layer 3: learning-keeper skill     — auto-captures corrections
```

## Configuration

Stored in `~/.claude/`:
- `CLAUDE.md` — universal rules
- `settings.json` — permissions, model, hooks
- `mcp.json` — MCP server configuration
- `knowledge/` — cross-project knowledge files
- `skills/` — installed skill symlinks
- `agents/` — installed agent symlinks

## Requirements

- Node.js ≥22
- pnpm ≥11 (recommended) or npm

## Development

```bash
# Clone the repo
git clone https://github.com/eminazeroglu/ai-bootstrap.git
cd ai-bootstrap/packages/cli

# Install + build + test
pnpm install
pnpm test                       # runs 55 smoke tests
pnpm build                      # compiles TypeScript

# Run locally
node bin/init.js
```

## License

MIT — fork, modify, distribute freely.

## Author

Built by [Emin Azəroğlu](https://github.com/eminazeroglu) (@azerogluemin_ai).

## Links

- [GitHub](https://github.com/eminazeroglu/ai-bootstrap)
- [Issues](https://github.com/eminazeroglu/ai-bootstrap/issues)
- [Documentation](https://github.com/eminazeroglu/ai-bootstrap/blob/main/docs/PROPOSAL.md)
