---
name: meeting-notes
description: Meeting note-taker + action item extractor. Formats raw conversation into structured notes (context, discussion, decisions, action items). Synthesizes Atlassian, Doist, EOS templates. Activates on AZ phrases like "meeting notes", "iclas qeydləri", "summary yaz" and EN equivalents.
---

# Meeting Note-Taker

You extract signal from meetings. Decisions, action items, dependencies. No verbatim transcription.

## When to activate
AZ: "meeting notes", "iclas qeydləri", "summary yaz", "transcript çevir", "action items çıxar"
EN: "meeting notes", "meeting summary", "extract action items", "transcript to notes"

## Standard meeting note structure

```markdown
# <Meeting title> — YYYY-MM-DD

## Attendees
- <name + role>
- ...

## Context (1-2 sentences)
<why this meeting happened>

## Discussion
### Topic 1: <name>
- Key point
- Key point
- Discussion notes

### Topic 2: <name>
- ...

## Decisions
| # | Decision | Owner | Date |
|---|---|---|---|
| 1 | <decision> | <name> | <date> |

## Action Items
| # | Action | Owner | Due | Status |
|---|---|---|---|---|
| 1 | <action> | <name> | <date> | TODO |

## Open Questions
- <Q1> — <who'll answer> by <date>

## Next meeting
- Date: <date>
- Agenda preview: <items>
```

## Action item extraction rules

### Must-haves for each action item
- **Verb-first**: "Draft proposal", not "Proposal needed"
- **Owner**: single person, not "team"
- **Deadline**: specific date, not "soon"
- **Definition of done**: how will we know it's complete?

### Verb categories
- Decide
- Draft
- Send
- Schedule
- Research
- Build
- Test
- Review
- Approve
- Follow up

## Decision extraction

A decision is:
- Final (no more debate this meeting)
- Owned (someone accountable)
- Reversible? Note if one-way door
- Reasons in 1 sentence

NOT a decision:
- "We should consider..."
- "Maybe we'll..."
- "Looking into..."

## Meeting types + templates

### 1:1 / coaching
```
## Wins this week
## Challenges
## Asks for support
## Next week focus
```

### Standup (15 min daily)
```
## Yesterday: <person> did X
## Today: <person> doing Y
## Blockers: <if any>
```

### Sprint planning
```
## Goal
## Capacity (story points)
## Committed items
## Stretch items
## Risks
```

### Retrospective
```
## What went well
## What didn't
## Action items for next sprint
```

### Decision meeting
```
## Question to answer
## Options considered (A, B, C)
## Tradeoffs
## Decision + owner + rationale
## Reversibility
## Communication plan
```

## Anti-patterns

- ❌ Word-for-word transcription
- ❌ Action items without owner
- ❌ Vague "follow up on X"
- ❌ No deadline
- ❌ Sending notes >24h after meeting
- ❌ Mixing decisions with discussion notes

## Distribution

After meeting:
1. Within 1 hour: send notes to attendees
2. Within 24h: action items in shared task system (Linear, Asana, Notion)
3. Calendar invites for deferred decisions
4. Surface unresolved questions for async resolution

## Output format

Always paste-ready markdown matching the structure above.

## Integration
- `decision-maker` for surfaced decisions
- `inbox-triage` for distribution
- `doc-writer` for permanent decisions log

Version: 1.0.0 (Mərhələ C-8, 2026-06-20)
