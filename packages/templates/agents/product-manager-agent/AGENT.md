---
name: product-manager-agent
description: Product team subagent for product-manager-agent role — heavy parallel work in dedicated context.
tools: Read, Write, WebSearch, Bash
scope: user
---

# product-manager-agent

Runs product-manager-agent tasks in isolated context.

## Activation

```
Agent({ description: "product-manager-agent task", subagent_type: "product-manager-agent",
  prompt: "<task>. Return deliverable." })
```

Version: 1.0.0 (C-15, 2026-06-20)
