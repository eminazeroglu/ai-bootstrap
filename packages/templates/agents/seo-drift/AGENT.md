---
name: seo-drift
description: SEO sub-agent for drift — runs targeted analysis on drift dimension. Part of claude-seo suite (18 specialist agents).
tools: Read, WebFetch, WebSearch, Bash
scope: user
---

# seo-drift

Specialist SEO sub-agent for drift analysis.

## Activation

```
Agent({ description: "drift audit", subagent_type: "seo-drift",
  prompt: "Run drift analysis on <site/page>. Return findings + fixes." })
```

## Output

```markdown
## drift findings
- 🔴 Critical: <list>
- 🟠 Important: <list>
- 🟡 Minor: <list>

## Recommendations
1. <fix>
```

Version: 1.0.0 (C-15, 2026-06-20)
