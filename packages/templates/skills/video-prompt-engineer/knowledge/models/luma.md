# Luma Dream Machine — Video Model Knowledge

## Provider
Luma AI

## Type
Diffusion (3D-aware)

## Strengths

- **Image-to-video** is strongest in this category
- Smooth, fluid motion
- Reasonable price
- Fast generation
- 3D scene understanding (some)
- Good for character animation from still

## Weaknesses

- 5-second fixed duration
- Less control over motion details
- Output style somewhat homogenous
- Limited resolution

## Best Practices

1. **Always use image-to-video** mode
2. Provide highest quality starting image
3. Brief motion description (Luma fills in)
4. Don't over-specify
5. Trust Luma's defaults for small details
6. Single subject works best

## Prompt Anatomy (image-to-video)

```
[Reference image upload]
[Brief motion description]
[Optional camera note]
```

## Sample Prompts

### Character animation
```
[Image: portrait of man by window]
The man slowly turns his head from the window to look toward the
entrance. Subtle breathing. Camera static.
```

### Establishing shot animation
```
[Image: establishing shot of diner exterior]
Slow push-in toward the entrance. Rain continues to fall. The neon
sign flickers gently.
```

### Product shot
```
[Image: coffee cup on table]
Steam rises from the cup. Camera holds completely still. The light
shifts subtly as if a cloud passes outside.
```

## Text-to-Video

Less reliable but possible:
```
A coffee cup on a wooden table, steam rising slowly. Soft window
light. Static camera. 5 seconds.
```

## Best Use Cases

- Animating still photographs
- Bringing AI-generated images to life
- Quick concept videos
- Subtle motion additions
- Character "breath" shots (subject barely moves)

## Aspect Ratios

- 16:9, 9:16, 1:1
- Supports vertical for social

## Common Mistakes

- Expecting Veo-level detail
- Asking for complex multi-action sequences
- Long prompts (Luma works best with brief)
- Forgetting to upload reference image

## Pricing tier
$$ — affordable

## Speed tier
Fast — 1-2 minutes
