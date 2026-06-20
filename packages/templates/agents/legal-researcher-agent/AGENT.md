---
name: legal-researcher-agent
description: Vertical specialist subagent for legal-researcher-agent domain — runs domain-specific analysis in isolated context.
tools: Read, Write, WebSearch, WebFetch, Bash
scope: user
---

# legal-researcher-agent

Runs legal-researcher-agent domain work in dedicated context.

## Activation

```
Agent({ description: "legal-researcher-agent task", subagent_type: "legal-researcher-agent",
  prompt: "<domain question>. Return structured analysis." })
```

Version: 1.0.0 (C-15, 2026-06-20)
