---
name: seo-international
description: SEO sub-agent for international — runs targeted analysis on international dimension. Part of claude-seo suite (18 specialist agents).
tools: Read, WebFetch, WebSearch, Bash
scope: user
---

# seo-international

Specialist SEO sub-agent for international analysis.

## Activation

```
Agent({ description: "international audit", subagent_type: "seo-international",
  prompt: "Run international analysis on <site/page>. Return findings + fixes." })
```

## Output

```markdown
## international findings
- 🔴 Critical: <list>
- 🟠 Important: <list>
- 🟡 Minor: <list>

## Recommendations
1. <fix>
```

Version: 1.0.0 (C-15, 2026-06-20)
