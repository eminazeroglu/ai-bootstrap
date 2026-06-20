---
name: seo-brief
description: SEO sub-agent for brief — runs targeted analysis on brief dimension. Part of claude-seo suite (18 specialist agents).
tools: Read, WebFetch, WebSearch, Bash
scope: user
---

# seo-brief

Specialist SEO sub-agent for brief analysis.

## Activation

```
Agent({ description: "brief audit", subagent_type: "seo-brief",
  prompt: "Run brief analysis on <site/page>. Return findings + fixes." })
```

## Output

```markdown
## brief findings
- 🔴 Critical: <list>
- 🟠 Important: <list>
- 🟡 Minor: <list>

## Recommendations
1. <fix>
```

Version: 1.0.0 (C-15, 2026-06-20)
