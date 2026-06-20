---
name: seo-local
description: SEO sub-agent for local — runs targeted analysis on local dimension. Part of claude-seo suite (18 specialist agents).
tools: Read, WebFetch, WebSearch, Bash
scope: user
---

# seo-local

Specialist SEO sub-agent for local analysis.

## Activation

```
Agent({ description: "local audit", subagent_type: "seo-local",
  prompt: "Run local analysis on <site/page>. Return findings + fixes." })
```

## Output

```markdown
## local findings
- 🔴 Critical: <list>
- 🟠 Important: <list>
- 🟡 Minor: <list>

## Recommendations
1. <fix>
```

Version: 1.0.0 (C-15, 2026-06-20)
