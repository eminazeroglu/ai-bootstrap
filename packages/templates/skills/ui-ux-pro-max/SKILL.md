---
name: ui-ux-pro-max
description: Senior UI/UX design intelligence — 50+ styles, color palettes, font pairings, components, layout patterns, animations, accessibility. Covers React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind, shadcn/ui, HTML/CSS. Activates on UI/UX design + build requests.
---

# UI/UX Pro Max

You design + ship UI. 50+ styles in muscle memory. Components by default, custom by exception.

## When to activate
AZ: "UI dizayn", "ekran qur", "komponent", "tailwind", "shadcn"
EN: "UI design", "design screen", "build UI", "Tailwind", "shadcn", "component", "page layout"

## Stack defaults (2026)

| Need | Default |
|---|---|
| React app | Next.js 15 + Tailwind v4 + shadcn/ui |
| Mobile | Expo + NativeWind (Tailwind for RN) |
| iOS native | SwiftUI |
| Static site | Astro |
| Quick UI prototype | v0.dev / shadcn/ui |

## Component library priority

Always:
1. Use existing component if exists
2. Compose existing primitives
3. Extend with variant
4. New component (last resort)

NEVER raw HTML form elements in production code (use button, input, select via UI lib).

## Style references (2026 trending)

| Style | Use case |
|---|---|
| **Refined minimalism** | SaaS dashboards |
| **Neo-brutalism** | Creator brands, indie products |
| **Glassmorphism** | Hero sections, premium |
| **Bento grid** | Marketing pages |
| **Skeuomorphic v3** | Apple Vision Pro tier |
| **Hand-drawn** | Friendly, approachable |
| **Editorial** | Content-heavy |
| **3D illustrations** | Hero, marketing |

## Color systems

Use semantic tokens (not raw colors):
```css
--color-brand-primary
--color-text-primary
--color-bg-surface
--color-state-error
```

Tailwind config + CSS variables = dark mode + theming.

## Typography (2026)

| Display | Body | Use |
|---|---|---|
| Geist | Geist Sans | Tech, modern |
| Inter Display | Inter | SaaS |
| Cal Sans | Inter | Friendly tech |
| IBM Plex | IBM Plex | Editorial, serious |
| Fraunces | Inter | Premium |
| Tiempos | Inter | Editorial premium |

Vary weight, not face. 2-3 weights = clean.

## Layout patterns

### Hero (3-zone)
- Left 60%: H1 + subtitle + CTA
- Right 40%: visual (screenshot, illustration, video)

### Marketing page sections
1. Hero
2. Social proof bar
3. Problem
4. Solution overview
5. Features (alternating left/right)
6. Pricing
7. FAQ
8. Final CTA

### Dashboard
- Sidebar nav (collapsible)
- Top bar (user menu, search)
- Main content (cards/grid)
- Footer (status, links)

### Forms
- Single column (no exceptions)
- Label above input
- Required indicated
- Inline validation
- Submit at bottom, right-aligned (desktop)

## Animation principles

- Duration: 150ms (UI), 300ms (page), 500ms+ (delight)
- Easing: ease-out (entering), ease-in (leaving)
- 60fps mandatory
- `prefers-reduced-motion` respected

## Accessibility (mandatory)

- Color contrast 4.5:1 (text), 3:1 (large/UI)
- Keyboard navigable
- Focus indicators visible
- Touch targets ≥44×44
- ARIA where semantic HTML doesn't suffice

## Output format

Build paste-ready React/Tailwind/shadcn code. Mobile-first. Accessibility built-in.

```tsx
// Example
export function HeroSection() {
  return (
    <section className="grid lg:grid-cols-2 gap-12 py-24">
      <div className="space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">
          {/* outcome promise */}
        </h1>
        <p className="text-xl text-muted-foreground">
          {/* support */}
        </p>
        <div className="flex gap-4">
          <Button size="lg">Primary CTA</Button>
          <Button size="lg" variant="outline">Secondary</Button>
        </div>
      </div>
      <div className="lg:order-last">
        {/* visual */}
      </div>
    </section>
  );
}
```

## Integration
- `landing-page-builder` for marketing pages
- `accessibility-auditor` for WCAG
- `brand-identity-designer` for design system

Version: 1.0.0 (Mərhələ C-12, 2026-06-20)
