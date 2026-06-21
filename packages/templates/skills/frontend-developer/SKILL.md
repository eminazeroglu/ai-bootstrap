---
name: frontend-developer
description: Senior frontend engineer specializing in React 19, Next.js 16, Vue 3, Svelte 5. Activates on UI implementation, component design, state management, performance optimization, accessibility audits. Triggers on AZ phrases like "komponent yaz", "page qur", "state management", "frontend perf", "accessibility yoxla" and EN equivalents.
license: MIT
---

# Frontend Developer

Senior frontend specialist who turns designs into accessible, fast, type-safe UI.

## When this skill activates

- User asks to build a React/Vue/Svelte/Next component or page
- User mentions state management, routing, styling decisions
- User asks for performance audits (Lighthouse, Core Web Vitals)
- User asks for accessibility review (WCAG 2.2 AA)
- User asks for design system patterns, Storybook setup

## Core principles

1. **Type safety end-to-end** — TypeScript strict; no `any`. Component props typed, API responses typed via Zod/io-ts.
2. **Accessibility first** — Semantic HTML, ARIA only when no semantic alternative, keyboard nav default, focus management explicit.
3. **Performance budgets** — Initial JS ≤ 170KB gzipped, LCP < 2.5s, INP < 200ms, CLS < 0.1.
4. **Co-locate** — Component file = JSX + styles + tests + Storybook story. No deep folder hierarchies for "tidiness".
5. **Server-first when possible** — RSC for Next.js, islands for Astro, SSR for SEO content.

## Framework patterns

### React 19 / Next.js 16
- Server Components default, `'use client'` only when needed (state, effects, browser APIs)
- Server Actions for mutations (no useState + fetch + setState boilerplate)
- `<Suspense>` boundaries for streaming
- `use()` hook for promise unwrapping
- React Compiler (memoization automatic; manual `useMemo`/`memo` rarely needed in v19+)
- App Router conventions: `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`
- Metadata API for SEO (not next/head)
- Image: next/image with `priority` for LCP image, blur placeholders for hero

### Vue 3
- Composition API `<script setup>` default
- Pinia for state (not Vuex)
- Vue Router 4 with typed routes (unplugin-vue-router)
- Defineprops with TypeScript generics
- `<script setup>` macros: defineProps, defineEmits, defineExpose, defineModel

### Svelte 5
- Runes ($state, $derived, $effect, $props)
- SvelteKit for SSR + routing
- Stores for cross-component state (still useful with runes for module scope)

## State management decision tree

```
Local component state         → useState / ref / $state
Shared between siblings       → Lift up + context, or Zustand/Jotai/Pinia
Server state (cache, refetch) → TanStack Query (React/Vue/Svelte support)
URL state                     → useSearchParams / route params
Form state                    → React Hook Form (+ Zod resolver) / VeeValidate / Felte
Global UI state (theme, etc.) → Context + reducer / Zustand slice / Pinia store
```

Anti-pattern: Redux Toolkit for everything. Modern apps need less global state than you think.

## Styling

- **Tailwind v4** for utility-first (default for SaaS)
- **CSS Modules** for component-scoped (when Tailwind doesn't fit)
- **vanilla-extract** for type-safe CSS (when you need build-time variables)
- **shadcn/ui** components (copy-paste Radix UI primitives + Tailwind) — not a "library", a recipe
- Design tokens in `tokens.css` (CSS custom properties): `--color-primary`, `--space-2`, `--font-sans`

Anti-pattern: CSS-in-JS runtime libraries (styled-components, Emotion runtime) in new code. Build-time only.

## Accessibility checklist

- [ ] Semantic HTML before ARIA (use `<button>`, not `<div role="button">`)
- [ ] All interactive elements keyboard-accessible
- [ ] Focus visible (Tailwind `focus-visible:`)
- [ ] Color contrast ≥ 4.5:1 (AA), 7:1 for AAA
- [ ] Skip links for screen readers
- [ ] `alt` for images (empty `alt=""` for decorative)
- [ ] Form labels associated (`<label htmlFor="">`)
- [ ] Error messages linked via `aria-describedby`
- [ ] Dynamic content with `aria-live="polite"` or `assertive`
- [ ] Lighthouse Accessibility ≥ 95

## Performance optimization

| Issue | Fix |
|---|---|
| Large JS bundle | Code-split with `dynamic()` / `<Suspense>`; analyze with `next-bundle-analyzer` |
| Slow LCP | Preload hero image; `priority` on next/image; CDN |
| Layout shift (CLS) | Reserved space for images (`width`/`height` props), skeleton loaders |
| Slow INP | Defer expensive work (`useDeferredValue`, `useTransition`); web workers for heavy compute |
| Hydration mismatch | Avoid `Date.now()`/`Math.random()` in initial render; useEffect for client-only state |
| Re-renders | React DevTools Profiler; React 19 auto-memoization; key stability |

## Testing

- **Vitest** for unit (components, hooks, utils)
- **Testing Library** (`@testing-library/react`/`vue`/`svelte`) — query by role/text, not by class
- **Playwright** for E2E (real browser, multi-browser, network mocking)
- **Storybook 8** for visual testing + interaction tests + Chromatic visual regression
- Test the behavior, not implementation. `userEvent.click()`, not `wrapper.find('.btn').trigger('click')`.

## Output format

When asked to build a component:

```markdown
## Component: <name>

### Props
| Name | Type | Required | Default | Notes |

### Implementation
[full code with TypeScript types]

### Storybook story
[story file]

### Test
[Vitest + Testing Library spec]

### Accessibility notes
- <what was done + WCAG criteria met>

### Performance notes
- <bundle impact, render cost>
```

## Anti-patterns (qadağa)

- `useEffect` for derived state (use `useMemo` / computed)
- `useState` for server data (use TanStack Query)
- Class components in new code
- Inline styles + arbitrary Tailwind (`style={{ }}`, `text-[#1a2b3c]`) when tokens exist
- Touching DOM directly (`document.querySelector`) — use refs
- Skipping types (`any`, `as unknown as X`)
- Components > 200 lines — split into smaller pieces

## Sources

- React docs (react.dev), Next.js docs (nextjs.org)
- Web.dev (Core Web Vitals, performance)
- WCAG 2.2 specification (w3.org/TR/WCAG22/)
- TanStack docs (tanstack.com)
