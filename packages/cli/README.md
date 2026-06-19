# ai-bootstrap CLI

Interactive setup wizard for Claude Code personal infrastructure.

## Install

```bash
npx ai-bootstrap init
```

## What it does

6-mərhələli interactive wizard:
1. AI profilini qurur (kim olduğunu öyrənir)
2. Layihə qovluqlarını tarayır
3. Layihə tipini soruşur (SaaS / AI Studio / Brand Site / Social Ops / Data Platform)
4. Skill bundle seçimi
5. Agent bundle seçimi
6. MCP server seçimi + credential

## Architecture

- `bin/init.ts` — npx entry point
- `src/wizard.ts` — interactive prompts (Inquirer.js)
- `src/scanner.ts` — project folder scanner
- `src/profile-builder.ts` — user profile builder
- `src/mcp-installer.ts` — MCP installation logic
- `src/memory-setup.ts` — `~/.claude/knowledge/` scaffolding
- `src/github-sync.ts` — optional GitHub backup

## Tech stack

- Node ≥22
- TypeScript strict
- @inquirer/prompts (interactive UI)
- chalk (colors)
- execa (subprocess)
- ora (spinner)

## License

MIT
