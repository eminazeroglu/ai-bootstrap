---
name: ecommerce-optimizer-agent
description: Vertical specialist subagent for ecommerce-optimizer-agent domain — runs domain-specific analysis in isolated context.
tools: Read, Write, WebSearch, WebFetch, Bash
scope: user
---

# ecommerce-optimizer-agent

Runs ecommerce-optimizer-agent domain work in dedicated context.

## Activation

```
Agent({ description: "ecommerce-optimizer-agent task", subagent_type: "ecommerce-optimizer-agent",
  prompt: "<domain question>. Return structured analysis." })
```

Version: 1.0.0 (C-15, 2026-06-20)
