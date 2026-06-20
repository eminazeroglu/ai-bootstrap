---
name: finance-analyst-agent
description: Vertical specialist subagent for finance-analyst-agent domain — runs domain-specific analysis in isolated context.
tools: Read, Write, WebSearch, WebFetch, Bash
scope: user
---

# finance-analyst-agent

Runs finance-analyst-agent domain work in dedicated context.

## Activation

```
Agent({ description: "finance-analyst-agent task", subagent_type: "finance-analyst-agent",
  prompt: "<domain question>. Return structured analysis." })
```

Version: 1.0.0 (C-15, 2026-06-20)
