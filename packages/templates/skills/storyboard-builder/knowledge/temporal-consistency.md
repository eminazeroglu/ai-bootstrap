# Temporal Consistency — Video Generation

> Frame-to-frame consistency. The hardest problem in AI video. Subject morphing, lighting flicker, object disappearing — all temporal failures.

## What can go wrong

### Subject morphing
- Face slowly changes between frames
- Outfit shifts color or detail
- Body proportions vary

### Lighting flicker
- Brightness changes between frames
- Color temperature shifts
- Shadows move unnaturally

### Object permanence loss
- Held object disappears mid-clip
- Background element vanishes
- Hand goes through solid object

### Background drift
- Walls slowly distort
- Texture patterns shift
- Background subjects appear/disappear

## Mitigation strategies

### 1. Strong reference image (most important)
For image-to-video models (Luma, Runway, Pika):
- Provide highest-quality starting image
- Image should be clean, sharp, well-composed
- Avoid busy backgrounds (more to keep consistent)

### 2. Short duration
- 4-6 seconds: most stable
- 6-8 seconds: usable
- 8-10 seconds: degradation likely
- 10+ seconds: significant artifacts

### 3. Minimal motion
- Less motion = more frames look similar = less drift
- Static or subtle motion = highest stability
- Complex action = highest drift

### 4. Simple background
- Plain walls, gradient backgrounds, blurred backgrounds = stable
- Detailed textures, crowds, foliage = unstable

### 5. Single subject focus
- One person in frame: stable
- Two people: doable
- Three+ people: high drift risk

### 6. Consistent lighting setup
- Natural single source = stable
- Multi-source mixed lighting = drift risk
- Practical lights that flicker (candles, screens) = use cautiously

### 7. Stable camera
- Static = best
- Single slow movement = ok
- Complex movement = drift compounds

## Prompt phrases that help

```
Maintain exact visual consistency throughout the clip.
Subject's appearance must NOT change frame-to-frame.
Lighting setup remains constant.
Background details are static and unchanging.
No transformations or morphing.
```

## Prompt phrases that hurt

```
Dynamic transitions
Changing perspective
Morphing scenery
Time-lapse
Multiple cuts
```

These trigger model into "creative" mode = inconsistency.

## Continuity between clips

When making multiple clips that should connect:

```
Clip 1: Subject in scene X with lighting Y, ends at position Z.
Clip 2: Subject continues from position Z, lighting Y unchanged,
scene X unchanged. NEW action begins.
```

Use last frame of Clip 1 as reference image for Clip 2.

## Trade-off

More motion = more cinematic feel BUT less consistency.
Less motion = more stable BUT can feel like "moving photo".

For AI video right now (2026), prefer stability over dynamism.

## Quality check

After generating, watch for:
- Face stability frame-by-frame
- Outfit color consistency
- Background object permanence
- Smooth motion (no jumps)
- Consistent lighting

If multiple failures: regenerate with simpler prompt.
