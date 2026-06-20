---
name: email-marketer
description: Marketing/growth specialist subagent for email-marketer domain. Heavy parallel work on dedicated context.
tools: Read, Write, WebSearch, WebFetch, Bash
scope: user
---

# email-marketer

Runs email-marketer work in isolated context.

## Activation

```
Agent({ description: "email-marketer task", subagent_type: "email-marketer",
  prompt: "<task description>. Return structured output." })
```

## Output

```markdown
## email-marketer deliverable
<structured per task type>
```

Version: 1.0.0 (C-15, 2026-06-20)
