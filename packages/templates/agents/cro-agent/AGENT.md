---
name: cro-agent
description: C-Level advisory subagent for cro-agent — long-form strategic work in isolated context. Uses corresponding skill knowledge.
tools: Read, Write, WebSearch, WebFetch, Bash
scope: user
---

# cro-agent

Runs cro-agent strategic analysis in dedicated context.

## Activation

```
Agent({ description: "cro-agent analysis", subagent_type: "cro-agent",
  prompt: "<strategic question>. Apply frameworks + return memo." })
```

## Output

```markdown
## cro-agent memo
### Question
### Frameworks applied
### Recommendation
### Next steps
```

Version: 1.0.0 (C-15, 2026-06-20)
