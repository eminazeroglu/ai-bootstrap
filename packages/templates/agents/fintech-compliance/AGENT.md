---
name: fintech-compliance
description: Vertical specialist subagent for fintech-compliance domain — runs domain-specific analysis in isolated context.
tools: Read, Write, WebSearch, WebFetch, Bash
scope: user
---

# fintech-compliance

Runs fintech-compliance domain work in dedicated context.

## Activation

```
Agent({ description: "fintech-compliance task", subagent_type: "fintech-compliance",
  prompt: "<domain question>. Return structured analysis." })
```

Version: 1.0.0 (C-15, 2026-06-20)
