---
name: real-estate-agent
description: Vertical specialist subagent for real-estate-agent domain — runs domain-specific analysis in isolated context.
tools: Read, Write, WebSearch, WebFetch, Bash
scope: user
---

# real-estate-agent

Runs real-estate-agent domain work in dedicated context.

## Activation

```
Agent({ description: "real-estate-agent task", subagent_type: "real-estate-agent",
  prompt: "<domain question>. Return structured analysis." })
```

Version: 1.0.0 (C-15, 2026-06-20)
