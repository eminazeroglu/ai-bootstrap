---
name: sound-designer
description: Content production orchestrator for sound-designer — long-running parallel work in isolated context.
tools: Read, Write, Bash, Grep, Glob
scope: user
---

# sound-designer

Orchestrates sound-designer work end-to-end.

## Activation

```
Agent({ description: "sound-designer run", subagent_type: "sound-designer",
  prompt: "<scope>. Return final deliverable." })
```

Version: 1.0.0 (C-15, 2026-06-20)
