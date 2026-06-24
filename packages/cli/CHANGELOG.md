## [0.6.4] — 2026-06-24

Full project audit + fix missing agent file.

### Fixed

- `paid-ads-strategist-agent` was missing AGENT.md (empty folder). Created
  full production-quality agent file with paid ads strategy framework.

### Audit results

Ran comprehensive audit on all subsystems:

| Component | Result |
|---|---|
| Build (tsc) | ✓ Clean |
| Tests (smoke + e2e) | ✓ 176/176 passing |
| Skills | ✓ 93 — all SKILL.md valid frontmatter |
| Agents | 78 — 1 fixed in this commit |
| MCP catalog | ✓ 62 — all 49 npm packages verified on registry |
| Pool + symlink | ✓ Creates, links, content accessible |
| Preset scaffolding | ✓ All 3 (SaaS 40 items, Social 24, AI Studio 16) |
| Pack size | ✓ 1.2 MB, 879 files |
| Commands non-interactive | ✓ All 9 tested pass |
| Integration install | ✓ Fresh HOME works end-to-end |

[0.6.4]: https://github.com/eminazeroglu/ai-bootstrap/releases/tag/v0.6.4

## [0.6.3] — 2026-06-24
