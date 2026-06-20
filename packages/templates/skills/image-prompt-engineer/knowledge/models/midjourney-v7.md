# Midjourney v7 — Image Model Knowledge

## Provider
Midjourney

## Type
Diffusion (proprietary, Discord/web-based)

## Strengths

- Aesthetic by default — produces "pretty" images effortlessly
- Strong style consistency
- Minimal prompting works (5-15 words can produce good output)
- Active style community sharing
- Character reference (`--cref`) and style reference (`--sref`) parameters
- Stylize parameter (`--stylize`) for style intensity

## Weaknesses

- Discord/web UX (no robust API for automation)
- Distinct "Midjourney look" — most outputs feel similar
- Difficult to fully override default style
- Can over-stylize (loses photorealism)
- Less flexible for specific brand/photographic looks

## Best Practices

1. Short, evocative prompts (15-50 words) work better than long
2. Use parameters at end: `--ar 9:16 --style raw --v 7 --stylize 250`
3. Image references via URL: `[ref-url] cinematic portrait of ...`
4. "Cinematic" is implied — don't over-specify
5. Use `--style raw` for less stylization (more photo-realistic)
6. `--cref [url]` for character consistency
7. `--sref [url]` for style transfer
8. Lower `--stylize` for realism, higher for art

## Prompt Anatomy

```
[Reference URL if any] [Short subject description], [setting],
[lighting/mood], [camera/lens reference] [parameters]
```

## Sample Prompt

```
A 35-year-old Azerbaijani man in charcoal wool coat by rain-streaked
window of 1960s diner, melancholic, warm tungsten interior cool blue
exterior, shot on ARRI with 85mm Cooke at f/1.4 --ar 9:16 --style raw
--v 7 --stylize 100
```

## Parameters Reference

| Param | Effect | Range |
|-------|--------|-------|
| `--ar` | Aspect ratio | 16:9, 9:16, 1:1, 21:9 |
| `--v` | Version | 7 (current) |
| `--style` | Style preset | raw, expressive, scenic, cute |
| `--stylize` | Style intensity | 0-1000 (100 default) |
| `--quality` | Quality | 0.25, 0.5, 1, 2 |
| `--chaos` | Variation | 0-100 |
| `--seed` | Reproducibility | integer |
| `--cref` | Character reference | URL |
| `--sref` | Style reference | URL |
| `--no` | Negative prompt | "no [element]" |

## Style Raw Note

For photorealism, ALWAYS use `--style raw --stylize 100` or lower.
Without these, Midjourney over-stylizes.

## Common Mistakes

- Long verbose prompts (Midjourney prefers concise)
- High stylize for photorealistic intent
- Forgetting `--style raw` for realism
- No aspect ratio (defaults to 1:1)
- Mixing too many style references

## Pricing tier
$$ — subscription based

## Speed tier
Fast — 30-60s for 4 variations
