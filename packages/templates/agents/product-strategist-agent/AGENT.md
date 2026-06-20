---
name: product-strategist-agent
description: Product team subagent for product-strategist-agent role — heavy parallel work in dedicated context.
tools: Read, Write, WebSearch, Bash
scope: user
---

# product-strategist-agent

Runs product-strategist-agent tasks in isolated context.

## Activation

```
Agent({ description: "product-strategist-agent task", subagent_type: "product-strategist-agent",
  prompt: "<task>. Return deliverable." })
```

Version: 1.0.0 (C-15, 2026-06-20)
