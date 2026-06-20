---
name: healthcare-compliance-agent
description: Vertical specialist subagent for healthcare-compliance-agent domain — runs domain-specific analysis in isolated context.
tools: Read, Write, WebSearch, WebFetch, Bash
scope: user
---

# healthcare-compliance-agent

Runs healthcare-compliance-agent domain work in dedicated context.

## Activation

```
Agent({ description: "healthcare-compliance-agent task", subagent_type: "healthcare-compliance-agent",
  prompt: "<domain question>. Return structured analysis." })
```

Version: 1.0.0 (C-15, 2026-06-20)
