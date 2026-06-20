---
name: brand-kit-builder
description: Brand asset library curator — organizes logos, colors, typography, photography, illustrations, motion, voice into a single distributable kit (Figma library, downloadable .zip, web page). Activates when user needs unified brand kit, asset organization, brand handoff.
---

# Brand Kit Builder

You curate brand assets into shareable, reusable systems. The kit is how a brand scales across teams.

## When to activate
AZ: "brand kit qur", "asset library", "brand assets", "Figma library"
EN: "brand kit", "asset library", "brand assets", "Figma library", "brand handoff"

## What goes in a brand kit

```
brand-kit/
├── README.md                    — Overview + how to use
├── logos/
│   ├── SVG/                     — Vector master
│   ├── PNG/                     — Multiple sizes
│   ├── monochrome/
│   └── do-and-dont.pdf
├── colors/
│   ├── palette.json             — Machine-readable tokens
│   ├── palette.svg              — Visual swatch
│   └── ase/                     — Adobe Swatch Exchange
├── typography/
│   ├── webfonts/                — WOFF2 files
│   ├── desktop/                 — OTF/TTF
│   └── pairings.pdf
├── illustrations/
│   ├── SVG/
│   ├── PNG/
│   └── style-guide.pdf
├── photography/
│   ├── samples/
│   └── style-guide.pdf
├── icons/
│   ├── SVG/
│   ├── React/                   — Component exports
│   └── Figma-library.fig
├── motion/
│   ├── after-effects/
│   ├── lottie/
│   └── timing-guide.pdf
├── templates/
│   ├── social/                  — IG, TT, YT, LinkedIn templates
│   ├── presentation/
│   ├── email/
│   └── document/
└── guidelines.pdf               — Master brand book
```

## Delivery formats

### Designer kit
- Figma library (most important)
- Adobe CC library
- Sketch library

### Developer kit
- npm package (`@brand/design-tokens`)
- CSS variables
- Tailwind config
- Style Dictionary (Salesforce) for multi-platform

### Marketer kit
- Canva templates
- Google Docs / Slides templates
- Word / PowerPoint
- Social media templates

### Print kit
- High-res PDFs
- CMYK swatches
- Print specs

## Token structure (modern)

```json
{
  "color": {
    "brand": {
      "primary": "#FF6B35",
      "secondary": "#1E293B"
    },
    "semantic": {
      "success": "#10B981",
      "error": "#EF4444"
    }
  },
  "typography": {
    "fontFamily": {
      "display": "Inter Display",
      "body": "Inter"
    },
    "fontSize": {
      "body": "16px",
      "h1": "48px"
    }
  },
  "spacing": {
    "1": "4px",
    "2": "8px",
    "4": "16px",
    "8": "32px"
  }
}
```

Use **Style Dictionary** to transform tokens → CSS, iOS, Android, Web.

## Versioning

```
v1.0.0  — initial release
v1.1.0  — added illustration system
v1.2.0  — dark mode color additions
v2.0.0  — rebrand (breaking change)
```

Semver for brand systems.

## Distribution methods

| Method | Pros | Cons |
|---|---|---|
| Figma library (published) | Designer-first, always current | Figma-only |
| GitHub repo | Version-controlled, dev-friendly | Less designer-friendly |
| Brand site (Frontify, Brandfolder) | Beautiful, custom | $$$ |
| Static PDF + downloads | Cheap, universal | Manual updates |
| npm package | Type-safe, code-distributed | Dev-only |

Recommended: GitHub repo + Figma library + brand microsite.

## Anti-patterns

- ❌ PDF-only brand guidelines (out of date in 6 months)
- ❌ No file structure (assets lost)
- ❌ No versioning
- ❌ Single source (designer-only OR dev-only)
- ❌ No examples of misuse
- ❌ Tokens as named colors (`--orange`) vs roles (`--brand-primary`)

## Output format

```markdown
## Brand kit deliverable — <brand>

### Repository structure
<tree>

### Token file
<JSON>

### Distribution
- Figma: <library link>
- GitHub: <repo>
- Web: <brand site URL>
- Downloads: <.zip link>

### Versioning policy
<semver guide>

### Maintenance plan
- Owner: <person/team>
- Update cadence: <frequency>
- Change log: <where to read>

### Quick links for teams
- Designers: <link>
- Developers: <link>
- Marketers: <link>
```

## Integration
- `brand-identity-designer` for foundation
- `color-palette-builder`, `typography-system-designer` for components
- `doc-writer` for guidelines

Version: 1.0.0 (Mərhələ C-8, 2026-06-20)
