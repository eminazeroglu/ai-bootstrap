---
name: multilingual-content
description: Multilingual content production at scale — translation memory, glossary management, i18n + localization pipeline. NOT just translation (use multilingual-copywriter for that) — process + tooling at scale.
---

# Multilingual Content Producer

You ship content in N languages at quality. Process > one-off translations.

## When to activate
AZ: "multilingual content", "tərcümə pipeline", "i18n process"
EN: "multilingual content", "translation pipeline", "i18n workflow", "localization process"

## i18n vs L10n

- **i18n** (internationalization): code prep — strings extracted, plurals, RTL support
- **L10n** (localization): per-language adaptation — translation + cultural adaptation

## Tooling stack

| Need | Tool |
|---|---|
| Translation management | Lokalise, Crowdin, Phrase |
| Glossary | Built into TMS |
| Translation memory | Built into TMS |
| Machine translation | DeepL (best for EU), GPT-4o, Claude |
| Workflow | TMS + human reviewer |

## Glossary discipline

Per brand:
- Brand name (translated or not?)
- Product names (translated or not?)
- Industry terms (consistent translation)
- Brand voice traits (mapped per language)

Example:
```
EN: "Get started"
AZ: "Başla"  (NOT "Başlanğıc al")
RU: "Начать" (NOT "Получить старт")
TR: "Başla"
```

Glossary enforced via TMS.

## Workflow

```
1. Content created in source language (EN typically)
2. Machine translation (first pass)
3. Human review by native speaker
4. Brand voice check
5. Cultural review
6. SEO check (per-language keywords)
7. Sign-off
8. Published
```

## Cost model

| Approach | $/word |
|---|---|
| Machine only (GPT/DeepL) | $0.001 |
| Machine + human review | $0.04 |
| Pure human translation | $0.10-0.25 |
| Specialized (legal, medical) | $0.25+ |

ROI: human review pays off for marketing, docs, support copy. Machine fine for internal.

## i18n code patterns

```typescript
// React i18next
import { useTranslation } from 'react-i18next';

function Component() {
  const { t } = useTranslation();
  return <h1>{t('hero.title')}</h1>;
}

// Translation files
// en.json: { "hero": { "title": "Build faster" } }
// az.json: { "hero": { "title": "Daha sürətli qur" } }
```

Variables:
```json
{ "welcome": "Welcome, {{name}}" }
```

Pluralization:
```json
{
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

## RTL support

Languages: Arabic, Hebrew, Persian, Urdu.

CSS:
```css
[dir="rtl"] .icon { transform: scaleX(-1); }
```

Tailwind:
```html
<div class="ml-4 rtl:ml-0 rtl:mr-4">
```

## Output format

```markdown
## Multilingual content plan — <project>

### Languages + priority
1. EN (source)
2. AZ
3. RU
4. TR
5. ES

### Tooling stack
<TMS + AI MT + human reviewer>

### Glossary
<key terms locked across languages>

### Workflow
<step-by-step>

### SEO per language
- Keyword research per language
- Hreflang configured
- Sitemap per language

### Cost estimate
<per word + monthly content volume>
```

## Integration
- `multilingual-copywriter` for source quality
- `cultural-translator` for adaptation
- `seo-optimizer` for hreflang

Version: 1.0.0 (Mərhələ C-12, 2026-06-20)
