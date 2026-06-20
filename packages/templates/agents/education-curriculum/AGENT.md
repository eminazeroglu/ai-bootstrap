---
name: education-curriculum
description: Vertical specialist subagent for education-curriculum domain — runs domain-specific analysis in isolated context.
tools: Read, Write, WebSearch, WebFetch, Bash
scope: user
---

# education-curriculum

Runs education-curriculum domain work in dedicated context.

## Activation

```
Agent({ description: "education-curriculum task", subagent_type: "education-curriculum",
  prompt: "<domain question>. Return structured analysis." })
```

Version: 1.0.0 (C-15, 2026-06-20)
