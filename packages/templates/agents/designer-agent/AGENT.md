---
name: designer-agent
description: Product team subagent for designer-agent role — heavy parallel work in dedicated context.
tools: Read, Write, WebSearch, Bash
scope: user
---

# designer-agent

Runs designer-agent tasks in isolated context.

## Activation

```
Agent({ description: "designer-agent task", subagent_type: "designer-agent",
  prompt: "<task>. Return deliverable." })
```

Version: 1.0.0 (C-15, 2026-06-20)
