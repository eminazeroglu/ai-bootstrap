---
name: ux-researcher-agent
description: Product team subagent for ux-researcher-agent role — heavy parallel work in dedicated context.
tools: Read, Write, WebSearch, Bash
scope: user
---

# ux-researcher-agent

Runs ux-researcher-agent tasks in isolated context.

## Activation

```
Agent({ description: "ux-researcher-agent task", subagent_type: "ux-researcher-agent",
  prompt: "<task>. Return deliverable." })
```

Version: 1.0.0 (C-15, 2026-06-20)
