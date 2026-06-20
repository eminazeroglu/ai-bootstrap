# Mistakes Log

> Auto-appended by `learning-keeper` skill every time the user corrects a mistake.
> Each entry: what was wrong + what's correct + why + when to apply.
> Pattern detection: 3+ similar mistakes → propose CLAUDE.md rule.

## Format

```markdown
## YYYY-MM-DD — <short title>

**Mistake**: <what was wrong, verbatim quote>
**Correction**: <what's correct>
**Reason**: <why, with source if available>
**Context**: <which project, what task>
**Applies to**: <future situations where this rule applies>
**Trigger words to watch**: <signal phrases that should activate this rule>
```

## Patterns promoted to CLAUDE.md

When 3+ mistakes cluster on a single theme, `learning-keeper` proposes a CLAUDE.md rule.
Each promotion is noted here:

- (none yet — will be filled as patterns emerge)

---

## Mistakes

<!-- learning-keeper appends entries below this line. Most recent at bottom. -->

<!-- Example seed entries from real corrections (replace at install): -->

## 2026-06-19 — "postlamaq" is not a valid AZ word

**Mistake**: Used "postlamaq" in AZ Instagram story copy
**Correction**: Use "paylaşmaq" (most common), "yerləşdirmək" (formal), or "dərc etmək" (publish) instead
**Reason**: "Postlamaq" not in AMEA Dilçilik İnstitutu official dictionary; colloquial slang only. Confirmed via Terminologiya Komissiyası 2015 decree on social media terminology.
**Context**: azerogluemin.az project, AI Video story hook
**Applies to**: All AZ copy in social media, marketing, customer DM
**Trigger words to watch**: post, share, yerləşdir, dərc, publish, any verb describing content publishing

---

## 2026-06-19 — Sparkle stars icon invented without research

**Mistake**: Proposed "5-pointed star with sparkle accents" for Reklam highlight cover without researching what icons the industry actually uses for advertising
**Correction**: Megaphone is the universal industry-standard icon for advertising (confirmed by Material Symbols `campaign` icon, IconScout 621 marketing megaphones, Noun Project advertising category #1)
**Reason**: Star = "premium/featured", not "advertising". Megaphone = "broadcast/announcement" = advertising semantically.
**Context**: azerogluemin.az Instagram highlight cover design
**Applies to**: All icon design decisions
**Trigger words to watch**: icon, simvol, işarə, design decision, what icon should I use

---

## 2026-06-19 — "Phone + heart" icon proposed without grounding

**Mistake**: Suggested "vertical smartphone with heart on screen" as alternative to megaphone for Reklam icon
**Correction**: Phone+heart reads as "favorite content" or "engagement metric", not "advertising". User feedback caught this. Megaphone is correct.
**Reason**: User asked "have you researched what advertising icon is?" — I admitted no, then researched, then recommended megaphone (industry standard)
**Context**: Same icon design context
**Applies to**: All proposals when industry standard exists
**Trigger words to watch**: alternative icon, instead of, fərqli icon

---

**Maintenance**: append-only. NEVER delete entries. Mark superseded with "SUPERSEDED by entry YYYY-MM-DD" but keep original.

**Version**: `1.0.0` template (Mərhələ B-3, 2026-06-20)
