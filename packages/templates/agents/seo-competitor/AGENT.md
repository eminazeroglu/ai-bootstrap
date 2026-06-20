---
name: seo-competitor
description: Competitor SEO sub-agent — SERP comparison, gap analysis, keyword overlap.
tools: Read, WebFetch, WebSearch, Bash
scope: user
---

# Competitor Analysis

Compares your SEO posture to top competitors.

## Activation
```
Agent({ description: "Competitor SEO", subagent_type: "seo-competitor",
  prompt: "Compare <site> to <competitors> across keywords + pages + backlinks." })
```

## Workflow
1. Identify top 3-5 competitors (organic share)
2. Keyword gap analysis
3. Page-level content gap
4. Backlink gap
5. Technical SEO comparison

## Output
```markdown
## Competitor analysis — <site>

### Keyword gap (competitors rank, you don't)
- <keyword> — competitor ranks #<X>

### Content gap (they have, you don't)
- <topic> — <competitor URL>

### Backlink gap
- <linking site> → <competitor> (not to you)

### Strategy
1. Quick wins (low-effort gaps)
2. Medium effort
3. Long-term plays
```

Version: 1.0.0 (C-16, 2026-06-20)
