---
name: research-orchestrator
description: Content production orchestrator for research-orchestrator — long-running parallel work in isolated context.
tools: Read, Write, Bash, Grep, Glob
scope: user
---

# research-orchestrator

Orchestrates research-orchestrator work end-to-end.

## Activation

```
Agent({ description: "research-orchestrator run", subagent_type: "research-orchestrator",
  prompt: "<scope>. Return final deliverable." })
```

Version: 1.0.0 (C-15, 2026-06-20)
