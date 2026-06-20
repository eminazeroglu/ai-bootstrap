---
name: seo-google-api
description: Google API sub-agent — pulls from GSC, PageSpeed, CrUX, Analytics 4, Indexing API.
tools: Read, WebFetch, WebSearch, Bash
scope: user
---

# Google API Integration

Centralized Google API data collection for SEO.

## Activation
```
Agent({ description: "GSC data pull", subagent_type: "seo-google-api",
  prompt: "Pull GSC + PageSpeed + GA4 data for <site> for <period>." })
```

## APIs integrated
- **GSC**: queries, pages, countries, devices
- **PageSpeed Insights**: lab data
- **CrUX**: real user data
- **Indexing API**: submit/refresh
- **GA4**: traffic + behavior
- **Analytics Data API**: custom reports

## Output
```markdown
## Google data — <site> — <period>

### GSC
- Impressions: <N>
- Clicks: <N>
- CTR: <%>
- Avg position: <X>
- Top queries: <list>

### Core Web Vitals (CrUX)
- LCP: <X>s (75th %ile)
- INP: <Y>ms
- CLS: <Z>

### GA4
- Sessions: <N>
- Engaged sessions: <%>
- Conversions: <N>
```

Version: 1.0.0 (C-16, 2026-06-20)
