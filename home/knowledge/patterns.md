# Detected Patterns

> Patterns are emergent behaviors detected by `learning-keeper` across multiple sessions, projects, or mistake clusters.
> When a pattern crystallizes (3+ instances), it gets promoted from `mistakes-log.md` to here, and (with user approval) to CLAUDE.md as a hard rule.

## Format

```markdown
## Pattern #NNN — <short title>

**Cluster source**: <reference to 3+ mistakes-log entries that formed this pattern>
**Pattern**: <the behavioral pattern detected>
**Detection rule**: <what triggers this in future>
**Recommended action**: <how to handle when detected>
**Status**: detected / proposed-to-CLAUDE.md / promoted-to-rule
**Date detected**: YYYY-MM-DD
```

---

<!-- learning-keeper appends entries below this line as patterns crystallize -->

## Pattern #001 — Industry standard research before icon decisions

**Cluster source**: mistakes-log entries 2026-06-19 (sparkle stars, phone+heart) — both for Reklam highlight cover icon
**Pattern**: When proposing icons for a specific domain (advertising, navigation, action), I tend to pick aesthetically pleasing options without checking what the industry conventionally uses.
**Detection rule**: When user asks "what icon for X" or proposes an icon, ALWAYS first ask "what's the industry standard for X?" via WebSearch.
**Recommended action**: 
1. Search "industry standard icon for [domain]" (Material Symbols, IconScout, Noun Project)
2. Find the conventional symbol
3. Propose it WITH the conventional + 1 alternative if creative variation desired
4. Cite sources
**Status**: detected (pending CLAUDE.md promotion review)
**Date detected**: 2026-06-19

---

## Pattern #002 — AZ slang detection needed pre-copy

**Cluster source**: mistakes-log entry 2026-06-19 (postlamaq) + risk of similar (lol, ok, follow etmək)
**Pattern**: When writing AZ copy, I tend to use English-derived verb forms ("X-ləmək") without checking if they're in the official AMEA dictionary.
**Detection rule**: When generating AZ copy, scan for any verb formed from an English root + AZ verb suffix.
**Recommended action**: 
1. Before output, check each verb against `mistakes-log.md` forbidden-words list
2. Cross-reference with multilingual-copywriter `knowledge/languages/az.md` forbidden table
3. If new English-derived verb appears, FLAG to user: "Is X-ləmək acceptable, or should we use AZ equivalent?"
**Status**: PROMOTED to CLAUDE.md Rule 23 (AZ grammar mandatory pre-flight)
**Date detected**: 2026-06-19
**Promoted to**: CLAUDE.md Rule 23

---

**Maintenance**: 
- Append only. Don't delete patterns even if they're promoted to rules — keep history.
- Status changes update inline (don't create new entries for status transitions).
- When pattern promotes to rule, note the rule number under "Promoted to".

**Version**: `1.0.0` template (Mərhələ B-3, 2026-06-20)
