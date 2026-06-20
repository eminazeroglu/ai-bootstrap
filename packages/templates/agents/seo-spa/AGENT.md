---
name: seo-spa
description: Visual + SPA SEO sub-agent — Playwright-based screenshot analysis, hydration check, JS rendering.
tools: Read, WebFetch, WebSearch, Bash
scope: user
---

# Visual / SPA

Validates SEO for JavaScript-rendered (SPA) sites.

## Activation
```
Agent({ description: "SPA SEO", subagent_type: "seo-spa",
  prompt: "Audit <SPA URL>. Check hydration, JS rendering, crawler view." })
```

## Workflow
1. Fetch as Googlebot (no JS)
2. Compare with rendered (with JS)
3. Identify content only visible after JS
4. Check Largest Contentful Paint
5. Verify navigation works without JS

## Output
```markdown
## SPA SEO — <URL>

### Crawler view (no JS) — content available
- Title: ✓/✗
- Meta description: ✓/✗
- H1: ✓/✗
- Body content: <% of rendered>
- Internal links: ✓/✗

### Rendering issues
<list>

### Fixes
- SSR / pre-render for: <list>
- Lazy load only below fold
```

Version: 1.0.0 (C-16, 2026-06-20)
