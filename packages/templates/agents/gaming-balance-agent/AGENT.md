---
name: gaming-balance-agent
description: Vertical specialist subagent for gaming-balance-agent domain — runs domain-specific analysis in isolated context.
tools: Read, Write, WebSearch, WebFetch, Bash
scope: user
---

# gaming-balance-agent

Runs gaming-balance-agent domain work in dedicated context.

## Activation

```
Agent({ description: "gaming-balance-agent task", subagent_type: "gaming-balance-agent",
  prompt: "<domain question>. Return structured analysis." })
```

Version: 1.0.0 (C-15, 2026-06-20)
