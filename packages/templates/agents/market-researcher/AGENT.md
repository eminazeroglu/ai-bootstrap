---
name: market-researcher
description: Marketing/growth specialist subagent for market-researcher domain. Heavy parallel work on dedicated context.
tools: Read, Write, WebSearch, WebFetch, Bash
scope: user
---

# market-researcher

Runs market-researcher work in isolated context.

## Activation

```
Agent({ description: "market-researcher task", subagent_type: "market-researcher",
  prompt: "<task description>. Return structured output." })
```

## Output

```markdown
## market-researcher deliverable
<structured per task type>
```

Version: 1.0.0 (C-15, 2026-06-20)
