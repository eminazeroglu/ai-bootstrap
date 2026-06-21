<!--
Thanks for the PR! Please fill in the sections below.
Trivial fixes (typos, dependency bumps) can skip Test plan.
-->

## Summary

<!-- 1-3 bullets — what changes and why -->

## Related issue

<!-- Closes #N / Refs #N -->

## Test plan

- [ ] `pnpm --filter @azerogluemin/ai-bootstrap typecheck` passes
- [ ] `pnpm --filter @azerogluemin/ai-bootstrap test` passes (smoke + e2e)
- [ ] Manual sanity: `HOME=/tmp/ab-prtest node packages/cli/bin/init.js <relevant-command>`
- [ ] Updated CHANGELOG.md if user-visible

## For catalog additions

If adding a skill, agent, MCP server, or bundle:

- [ ] Source verified — npm package or repo exists today (no fabricated names)
- [ ] `source:` field populated (official vs community attribution)
- [ ] Bundle membership decided (foundation / dev / marketer / creator / founder / full-stack)
- [ ] Smoke test asserts the new entry (count + lookup)

## For breaking changes

- [ ] Bumped MAJOR version in package.json
- [ ] CHANGELOG documents the migration path
- [ ] README updated if user-facing
