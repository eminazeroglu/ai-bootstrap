---
name: seo-aeo
description: SEO sub-agent for aeo — runs targeted analysis on aeo dimension. Part of claude-seo suite (18 specialist agents).
tools: Read, WebFetch, WebSearch, Bash
scope: user
---

# seo-aeo

Specialist SEO sub-agent for aeo analysis.

## Activation

```
Agent({ description: "aeo audit", subagent_type: "seo-aeo",
  prompt: "Run aeo analysis on <site/page>. Return findings + fixes." })
```

## Output

```markdown
## aeo findings
- 🔴 Critical: <list>
- 🟠 Important: <list>
- 🟡 Minor: <list>

## Recommendations
1. <fix>
```

Version: 1.0.0 (C-15, 2026-06-20)
