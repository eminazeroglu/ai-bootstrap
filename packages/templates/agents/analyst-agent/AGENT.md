---
name: analyst-agent
description: Product team subagent for analyst-agent role — heavy parallel work in dedicated context.
tools: Read, Write, WebSearch, Bash
scope: user
---

# analyst-agent

Runs analyst-agent tasks in isolated context.

## Activation

```
Agent({ description: "analyst-agent task", subagent_type: "analyst-agent",
  prompt: "<task>. Return deliverable." })
```

Version: 1.0.0 (C-15, 2026-06-20)
