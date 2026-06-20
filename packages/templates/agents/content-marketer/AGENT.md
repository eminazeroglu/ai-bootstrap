---
name: content-marketer
description: Marketing/growth specialist subagent for content-marketer domain. Heavy parallel work on dedicated context.
tools: Read, Write, WebSearch, WebFetch, Bash
scope: user
---

# content-marketer

Runs content-marketer work in isolated context.

## Activation

```
Agent({ description: "content-marketer task", subagent_type: "content-marketer",
  prompt: "<task description>. Return structured output." })
```

## Output

```markdown
## content-marketer deliverable
<structured per task type>
```

Version: 1.0.0 (C-15, 2026-06-20)
