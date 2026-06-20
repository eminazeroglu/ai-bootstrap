---
name: social-media-manager
description: Marketing/growth specialist subagent for social-media-manager domain. Heavy parallel work on dedicated context.
tools: Read, Write, WebSearch, WebFetch, Bash
scope: user
---

# social-media-manager

Runs social-media-manager work in isolated context.

## Activation

```
Agent({ description: "social-media-manager task", subagent_type: "social-media-manager",
  prompt: "<task description>. Return structured output." })
```

## Output

```markdown
## social-media-manager deliverable
<structured per task type>
```

Version: 1.0.0 (C-15, 2026-06-20)
