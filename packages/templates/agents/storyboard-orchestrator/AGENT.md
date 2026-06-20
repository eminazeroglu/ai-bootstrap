---
name: storyboard-orchestrator
description: Content production orchestrator for storyboard-orchestrator — long-running parallel work in isolated context.
tools: Read, Write, Bash, Grep, Glob
scope: user
---

# storyboard-orchestrator

Orchestrates storyboard-orchestrator work end-to-end.

## Activation

```
Agent({ description: "storyboard-orchestrator run", subagent_type: "storyboard-orchestrator",
  prompt: "<scope>. Return final deliverable." })
```

Version: 1.0.0 (C-15, 2026-06-20)
