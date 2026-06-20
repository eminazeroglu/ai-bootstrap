---
name: content-calendar-orchestrator
description: Content production orchestrator for content-calendar-orchestrator — long-running parallel work in isolated context.
tools: Read, Write, Bash, Grep, Glob
scope: user
---

# content-calendar-orchestrator

Orchestrates content-calendar-orchestrator work end-to-end.

## Activation

```
Agent({ description: "content-calendar-orchestrator run", subagent_type: "content-calendar-orchestrator",
  prompt: "<scope>. Return final deliverable." })
```

Version: 1.0.0 (C-15, 2026-06-20)
