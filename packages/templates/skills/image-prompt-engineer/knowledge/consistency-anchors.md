# Consistency Anchors — Image Generation

> The hardest problem in AI image generation: keeping the same character/location consistent across multiple shots.

## The problem

Each generation is independent. Prompt "young woman with red hair" produces a DIFFERENT woman every time. We need anchors to keep her recognizably the same person across 10+ generations.

## Solution stack

### 1. Reference images (primary mechanism)

When user uploads their first generation, that image becomes the anchor. Subsequent prompts include it as **vision reference input**:

```
[Image: character_full_body.png]
[Image: character_front_close.png]

Generate the same character in a different setting:
- Setting: hospital corridor, sterile lighting
- Action: walking briskly toward camera
- Camera: medium shot, 50mm at f/2.8
- IMPORTANT: maintain exact facial features, hair, body type from references.
```

### 2. Anatomical anchor list (text-based)

Even with images, prompt should re-state non-negotiable features:

```
Character: 35-year-old Azerbaijani man (refer to character sheet for
exact face). Anatomical anchors that MUST match references:
- Hair: short dark wavy, swept right
- Eyes: deep green
- Build: athletic, 5'11"
- Distinctive: small scar above right eyebrow, slight stubble
- Skin tone: Fitzpatrick scale 4
```

### 3. Style anchor (per project)

Single style note repeated across all character generations:
```
Style: photorealistic cinematic, ARRI Alexa color science,
shallow DOF, neutral exposure, 2024 contemporary realism.
```

## What can change vs what can't

### MUST stay identical
- Face shape, features, structure
- Hair color (length/style can vary slightly)
- Eye color
- Body proportions
- Skin tone
- Scars, tattoos, glasses, distinctive marks

### Can vary intentionally
- Outfit (separate "outfit variant" prompts)
- Pose, expression
- Lighting and setting
- Hair styling (tied/loose, but not color/length)
- Time of day on subject

### Should change with story
- Age progression (over years/scenes)
- Wardrobe based on scene
- Emotional state via expression
- Wet vs dry hair (weather)

## Location consistency

Same logic for locations:

### MUST stay
- Architecture
- Wall colors
- Major furniture
- Practical light positions

### Can vary
- Time of day (sunlight angle)
- Weather visible through windows
- Props on tables
- Camera angle within space

## Multi-character consistency

When two characters in same shot:
1. Generate each independently first (turnaround)
2. Use BOTH reference image sets as vision input
3. Specify spatial relationship: "Character A on left, Character B on right, eye-line connecting"
4. Specify both characters' features again in prompt

## DON'T

- Don't expect consistency without references
- Don't change too many anchors at once
- Don't rely only on names ("ƏLİ" doesn't anchor anything visually)
- Don't skip the description even when sending images

## Workflow recommendation

1. Generate character turnaround (5 views) → pick best
2. Upload best to library as anchor
3. For every subsequent shot, send 1-2 best-matching references
4. Re-state anatomical anchors in prompt text
5. Validate: does generated character match? If not, iterate

## Cross-reference

- character-anatomy.md — what to describe
- cinematography.md — how to frame for consistency
