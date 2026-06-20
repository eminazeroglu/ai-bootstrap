# Color Grading — Image Generation

> Post-production color treatment that defines visual mood. Specify in every prompt.

## Color grading concepts

### Hue
Color itself (red, blue, green).

### Saturation
Color intensity (vibrant vs muted).

### Luminance
Brightness of color.

### Contrast
Difference between dark and light.

## Common cinematic looks

### Teal & Orange (Hollywood blockbuster)
- Shadows pushed cool teal
- Highlights/skin pushed warm orange
- High saturation in those two
- Use: action, blockbuster, modern commercial

### Bleach Bypass (high contrast desaturated)
- Reduced saturation
- Increased contrast
- Cool overall
- Use: war films, gritty drama (Saving Private Ryan)

### Day-for-Night (blue tint)
- Heavy blue/cyan
- Reduced exposure
- Use: cost-saving night scenes, dreamy

### Warm Nostalgic (vintage)
- Warm tones throughout
- Slightly desaturated
- Faded blacks (lifted)
- Use: period, memory, romance

### Cold Clinical
- Desaturated overall
- Cool tones
- Sharp contrast
- Use: thriller, modern drama, sci-fi

### Pastel Soft (Wes Anderson)
- Specific color palette per scene
- Symmetric balance
- Slight warmth
- Use: stylized comedy-drama

### Neon Night (cyberpunk)
- Saturated pinks, cyans, magentas
- Very dark blacks
- Sharp falloff
- Use: cyberpunk, music video, night city

### Natural / Documentary
- Minimal grading
- Accurate skin tones
- Realistic
- Use: documentary, news, naturalism

### High Key (bright commercial)
- Lifted shadows
- Bright highlights
- Soft saturation
- Use: lifestyle commercial, comedy

### Noir Black & White
- B&W or monochrome
- Extreme contrast
- Deep shadows
- Use: classic noir, art film

## Color grading language for prompts

GOOD:
```
Cinematic color grading: shadows pushed cool teal, skin tones warm,
slight desaturation in midtones, deep blacks, vintage 1970s film
emulation reference (Kodak Portra 400)
```

GOOD:
```
Wes Anderson pastel palette: muted yellow walls, soft teal accents,
balanced symmetric color, slightly lifted blacks
```

BAD:
```
Nicely color-graded.
```

## Reference ladder (specific looks)

| Want this look | Reference | Key colors |
|----------------|-----------|------------|
| "Blade Runner 2049" | Roger Deakins | Amber, teal, smoke |
| "Mad Max Fury Road" | John Seale | Orange-yellow desert, teal night |
| "The Grand Budapest Hotel" | Robert Yeoman | Pastel pink, mint, cream |
| "Joker" | Lawrence Sher | Sickly green-yellow, orange |
| "Moonlight" | James Laxton | Magenta-cyan, naturalistic skin |
| "Drive" | Newton Thomas Sigel | Pink neon, deep shadows |
| "The Revenant" | Emmanuel Lubezki | Cool blue, white snow |
| "Her" | Hoyte van Hoytema | Warm orange-red |

## DO

- Reference film stocks: "Kodak Portra 400", "Fuji Velvia", "ARRI Alexa Reveal"
- Reference DPs: "shot like Roger Deakins", "Hoyte van Hoytema lighting"
- Specify saturation level (muted, balanced, vibrant)
- Mention black levels (lifted vs crushed)

## DON'T

- "Cinematic colors" alone (vague)
- "Beautiful grading" (subjective)
- Mix incompatible references ("Wes Anderson Mad Max look")

---

## 🔴 HARD RULE — CELLS generate in FULL COLOR, never native sepia / B&W

**All cells (final kadr images) must be generated in full color** using the project's unified color register (e.g. Kodak Vision3 5219 + warm amber-ochre + ~15% desaturation + lifted blacks, or whatever the project's master grade is). **Native sepia or black-and-white generation is FORBIDDEN**, even when the script says "sepia archive photo" or "1920s B&W photograph" or "old-newsreel still."

### Why

Sepia / B&W is a **post-production grade** applied in the video editor (DaVinci Resolve, Premiere, FCP) to the final timeline. Generating native sepia / B&W breaks three things:

1. **Reusability** — a single full-color cell can be regraded sepia for an "archive flashback" cut, then regraded warm for the live moment in the next sequence, then desaturated for a dream beat. Native sepia locks the cell into one use.
2. **Consistency with character + location anchors** — character refs and location refs are full-color. A native-sepia cell instantly mismatches the rest of the pipeline; the character's eye colour, costume colour, and skin tone all silently drift because the model is no longer rendering them in the same color space as the reference packs.
3. **Post-prod color grading workflow** — the colorist (DaVinci / Resolve / Premiere LUT chain) expects full-color RAW-equivalent input. Sepia from generation = sepia twice over after grading = unusable.

### What the script means when it says "sepia archive photograph"

The script is describing the **final post-graded look** as seen by the audience in the timeline — NOT the raw generation specification. The CELL is generated in full color; the **video editor** applies the sepia LUT, vignetting, grain, and any frame border in post. Same for "1940s B&W newsreel" or "faded Polaroid" — these are all grades, not generation tags.

### Prompt-level enforcement

Every cell prompt must explicitly include the project's master color register, e.g.:

```
COLOR: rendered in full colour using the project master grade
(Kodak Vision3 5219 emulation, warm amber-ochre highlights,
~15% midtone desaturation, lifted blacks at IRE ~5).
NOT sepia. NOT black-and-white. NOT monochrome.
NOT silver-gelatin. Full chromatic information preserved
for downstream post-grading.
```

### Detection during validation

- Open the cell in any image viewer; check the histogram — if the R/G/B channels are collapsed into a single luminance band → ❌ regenerate
- Eye colour, costume colour, skin Fitzpatrick value must all be **measurable** in the rendered cell — if everything is brown or grey → ❌
- If the script asked for "archive look" and the cell is sepia → ❌ (the sepia belongs in post, not generation)

### Exception — single-pass deliverable for static use

If the final asset is a static still that will **never** enter a video timeline (e.g. a print poster, a single editorial card, a one-off illustration), and the deliverable spec explicitly says "sepia toned final," then native sepia generation is allowed. The moment the asset is destined for a timeline, the rule applies.

### Cross-references

- `image-validator/knowledge/prompt-consistency-checks.md` — color-register verification is a Qat C checkpoint
- User memory: feedback-no-unilateral-changes-to-approved-work (never silently sepia-grade an approved full-color cell)

**Origin:** 2026-05-21, 28-may documentary — k.1–k.4 cell prompts were initially written specifying native sepia silver-gelatin generation because the script narrated "sepia archive photographs." This contradicted the full-color character anchors and the post-prod grading workflow. All cells rewritten to full color; sepia moved to post.
