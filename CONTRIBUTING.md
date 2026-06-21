# Contributing to ai-bootstrap

Thanks for the interest. This guide covers setup, conventions, and the path
from idea → merged PR.

## Quick links

- Bug? → [open a bug issue](https://github.com/eminazeroglu/ai-bootstrap/issues/new?template=bug_report.yml)
- Idea? → [open a feature issue](https://github.com/eminazeroglu/ai-bootstrap/issues/new?template=feature_request.yml)
- Question? → [Discussions](https://github.com/eminazeroglu/ai-bootstrap/discussions)
- Security? → [private advisory](https://github.com/eminazeroglu/ai-bootstrap/security/advisories/new) — see [SECURITY.md](./SECURITY.md)

## Development setup

```bash
git clone https://github.com/eminazeroglu/ai-bootstrap.git
cd ai-bootstrap

# Requires Node ≥ 22 and pnpm ≥ 11
pnpm install
pnpm --filter @eminazeroglu/ai-bootstrap build
pnpm --filter @eminazeroglu/ai-bootstrap test    # 124 tests
```

## Project layout

```
packages/
  cli/                      # The published npm package
    src/
      applier/              # Writers: profile, projects, settings, MCP, skills, agents
      commands/             # CLI subcommands: mcp, doctor, update, backup, telemetry
      steps/                # 6 wizard steps (1-profile … 6-github)
      utils/                # paths, permissions, scanner, telemetry
    bin/init.js             # npm bin entry → dist/index.js
    templates/              # (build artifact) bundled skill + agent templates
    tests/
      smoke.test.mjs        # 81 unit-style tests on the applier
      e2e.test.mjs          # 43 subprocess CLI tests
  templates/                # Source skill + agent templates (the real ones)
    skills/<name>/SKILL.md
    agents/<name>/AGENT.md
    home/                   # Universal CLAUDE.md + knowledge files
```

## Common contribution types

### 1. New skill

1. `mkdir packages/templates/skills/<my-skill>`
2. Add `SKILL.md` with the [standard frontmatter](./packages/templates/skills/architect/SKILL.md)
3. Add to a bundle in `packages/cli/src/applier/bundle-definitions.ts` if it should auto-install
4. Run `pnpm test`

### 2. New agent

1. `mkdir packages/templates/agents/<my-agent>`
2. Add `AGENT.md` with `name`, `description`, `tools`, `scope` frontmatter
3. Add to `AGENT_BUNDLES` if appropriate
4. Run `pnpm test`

### 3. New MCP server in catalog

1. Verify the package exists today (npm, GitHub, official docs). **No fabricated names** — see the strict rule below.
2. Add entry to `packages/cli/src/applier/mcp-catalog.ts`
3. Set `source:` to `'official: X'` or `'community: GitHub/owner/repo'`
4. Run `pnpm test` — add an assertion in `tests/smoke.test.mjs` if it's a flagship MCP

### 4. New CLI subcommand

1. Create `packages/cli/src/commands/<name>.ts` exporting `run<Name>Command(args)`
2. Wire into `packages/cli/src/index.ts` router
3. Add help text to the main help block
4. Add e2e test in `tests/e2e.test.mjs`

## Code conventions

- **TypeScript strict** — no `any` leaks. The `tsc --noEmit` typecheck must pass.
- **ESM only** — `import/export`, no `require`.
- **No fabricated packages** — every catalog entry, every `npx <pkg>`, every download command must be verified. If unsure, leave it out. [See Rule 16 in CLAUDE.md.](./CLAUDE.md)
- **Minimal comments** — comment the WHY (a constraint, an invariant), not the WHAT. Identifiers should tell the story.
- **No telemetry collection by default** — opt-in only, see `packages/cli/src/utils/telemetry.ts`.

## Test before pushing

```bash
pnpm --filter @eminazeroglu/ai-bootstrap typecheck
pnpm --filter @eminazeroglu/ai-bootstrap test       # smoke + e2e
```

Both must be green. Run locally before opening a PR.

## Commit + PR conventions

- One logical change per commit
- Commit message: `<area>: <imperative sentence>` (e.g. `mcp-catalog: add Linear v2 server`)
- PR title same style
- Fill in the [PR template](./.github/PULL_REQUEST_TEMPLATE.md)
- For user-visible changes, update `packages/cli/CHANGELOG.md` under the `## Unreleased` heading (create it if missing)

## Release process (maintainers)

1. Move CHANGELOG `## Unreleased` → `## [X.Y.Z] — YYYY-MM-DD`
2. Bump `packages/cli/package.json` version
3. Commit: `chore: release vX.Y.Z`
4. Tag: `git tag -a vX.Y.Z -m "..."` + `git push origin vX.Y.Z`
5. From `packages/cli`, run `npm publish --access public` (requires `npm login` first)
6. Create GitHub Release from tag with CHANGELOG section as notes

## License

By contributing, you agree your work is licensed under [MIT](./LICENSE).
