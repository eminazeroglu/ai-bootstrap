---
name: storyboard-orchestrator
description: Storyboard production orchestrator — runs sequential cell-by-cell storyboard generation with continuity. Uses storyboard-builder skill knowledge.
tools: Read, Write, Bash, Grep, Glob
scope: user
---

# Storyboard Orchestrator

Long-running storyboard production with continuity anchoring.

## Activation
```
Agent({ description: "Storyboard X", subagent_type: "storyboard-orchestrator",
  prompt: "Generate <N>-cell storyboard for <script>. Maintain character + location continuity." })
```

## Workflow
1. Read script
2. Read character + location refs
3. Plan: cell-by-cell breakdown
4. Generate cell 1 → save → use as anchor for cell 2
5. Continue sequentially (each cell anchored)
6. Image prompt per cell (model-spesifik)
7. Final: contact sheet OR individual cells

## Output
```markdown
## Storyboard — <script>
### Cells generated: <N>
### Files: <paths>
### Continuity verified: ✓
### Image prompts used
```

Version: 1.0.0 (C-17, 2026-06-20)
