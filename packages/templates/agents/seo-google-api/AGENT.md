---
name: seo-google-api
description: SEO sub-agent for google-api — runs targeted analysis on google-api dimension. Part of claude-seo suite (18 specialist agents).
tools: Read, WebFetch, WebSearch, Bash
scope: user
---

# seo-google-api

Specialist SEO sub-agent for google-api analysis.

## Activation

```
Agent({ description: "google-api audit", subagent_type: "seo-google-api",
  prompt: "Run google-api analysis on <site/page>. Return findings + fixes." })
```

## Output

```markdown
## google-api findings
- 🔴 Critical: <list>
- 🟠 Important: <list>
- 🟡 Minor: <list>

## Recommendations
1. <fix>
```

Version: 1.0.0 (C-15, 2026-06-20)
