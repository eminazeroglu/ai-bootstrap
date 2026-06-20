# Projects Manifest

> Catalog of all projects the user works on across machines.
> Each project gets one MD file with metadata + link to project repo.
> Auto-populated by ai-bootstrap wizard at install via folder scan.

## Format

Each project file: `<slug>.md`

```markdown
---
name: <project-name>
slug: <kebab-case-slug>
type: saas-fullstack-pro / saas-ai-pro / ai-studio / brand-site / social-ops / data-platform
status: active / paused / archived
last_active: YYYY-MM-DD
repo: <local path>
github: <github URL if applicable>
---

# <Project Name>

## What it is
<2-3 sentences>

## Current state
- **Stage**: <prototype / MVP / production / scale>
- **Users**: <number or "internal" or "client">
- **Revenue**: <if applicable>

## Stack
<technical stack summary>

## Cross-references
- Skills used: <list of skills used in this project>
- Agents used: <list of agents>
- MCPs used: <list of MCPs>

## Open loops
- <pending tasks>

## Last session
- Date: YYYY-MM-DD
- Summary: <one paragraph>

## Custom rules
<if project has CLAUDE.md, mention key rules>
```

---

## Project list

<!-- ai-bootstrap wizard populates this list from folder scan -->

(Empty — will be populated at install)

---

## Maintenance

- Each project file updated when working on that project
- `handoff-log.md` references which project each session worked on
- `learning-keeper` cross-references mistakes to projects

**Version**: `1.0.0` template (Mərhələ B-3, 2026-06-20)
