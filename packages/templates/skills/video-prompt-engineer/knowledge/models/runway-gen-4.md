# Runway Gen-4 — Video Model Knowledge

## Provider
Runway

## Type
Diffusion

## Strengths

- Strong text-to-video and image-to-video
- Multi-shot consistency improving
- Large user community + tutorials
- Director/style references work
- Up to 10s clips
- Stylization control
- Camera move presets

## Weaknesses

- Pricier than alternatives
- Veo more cinematic in head-to-head
- Motion can feel "cartoony" in fast scenes
- Less reliable for photorealistic faces

## Best Practices

1. Aesthetic-driven descriptions
2. Director/photographer references work
3. Image-to-video stronger than text-to-video
4. Camera move keywords from preset list
5. Aspect ratio explicit
6. Style references via `--style`

## Prompt Anatomy

```
[Cinematic style declaration with reference]
[Subject + setting + action]
[Camera move preset or "static"]
[Mood / aesthetic / color grading]
Duration: Ns
```

## Sample Prompt

```
Cinematic medium shot in the style of Wong Kar-wai, 1960s diner
interior at night, melancholic mood. A man in a charcoal coat stands
by a rain-streaked window, slowly turning his head to look toward
the entrance. Camera: static medium shot, eye-level. Lighting: warm
tungsten key with cool blue window backlight. Color grading: muted
warm tones with cool shadows, slight film grain. Shallow depth of
field. Duration: 6s.
```

## Image-to-Video Strength

Runway excels at animating still images:
1. Generate image elsewhere (Nano Banana, Midjourney)
2. Upload to Runway
3. Add motion description
4. Generate video

```
[Reference image: portrait of subject]
Animation: subject begins to slowly turn head left, eyes following.
Subtle breathing motion. Hair slightly catches air movement. Static
camera. Duration: 5s.
```

## Camera Presets

Runway has built-in camera presets:
- Static
- Pan left/right
- Tilt up/down
- Dolly in/out
- Zoom in/out
- Orbit left/right
- Crane up/down
- Tracking left/right

Specify by name in prompt.

## Aspect Ratios

- 16:9, 9:16, 1:1, 21:9
- Wide format support

## Common Mistakes

- Treating like Veo (different model, different prompt style)
- Forgetting style references
- Combining too many camera movements
- Long verbose prompts (medium length is sweet spot)

## Pricing tier
$$$$ — premium

## Speed tier
Fast — 30-90s
