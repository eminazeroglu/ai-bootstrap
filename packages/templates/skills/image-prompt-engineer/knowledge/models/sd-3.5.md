# Stable Diffusion 3.5 — Image Model Knowledge

## Provider
Stability AI

## Type
Diffusion (open weights, self-hostable)

## Strengths

- Open source — fully customizable
- ControlNet ecosystem (pose, depth, edge control)
- LoRA support (fine-tuned styles)
- Self-hostable (no API costs after setup)
- Negative prompts strongly supported
- Active community models

## Weaknesses

- Requires technical setup (Comfy UI, A1111)
- Quality varies dramatically by checkpoint/model
- Less accessible to non-technical users
- Inconsistent without proper LoRA stack
- Default base model less polished than competitors

## Best Practices

1. Use weighted prompts: `(important:1.3)` or `((emphasis))`
2. Negative prompts are essential
3. Specify checkpoint/LoRA for desired style
4. ControlNet for pose/composition control
5. CFG scale 7-12 for prompt adherence
6. Sample steps 25-50 for quality
7. Use specific samplers (DPM++ 2M Karras for quality)

## Prompt Anatomy

```
[Subject with weighted features]
+ [Action / pose]
+ [Setting]
+ [Lighting + camera]
+ [Style + quality boosters]
+ [Negative prompts]
```

## Sample Prompt

```
photo of a 35-year-old Azerbaijani man, ((athletic build)), short dark
wavy hair, (green eyes:1.2), wearing a charcoal wool overcoat,
standing by rain-streaked window in 1960s diner, melancholic
expression, warm tungsten lighting from above creating (rim light:1.3),
cool blue spill from window, shot on Sony A7 IV with Cooke S4 85mm
at f/1.4, shallow depth of field, photorealistic, cinematic color
grading, film grain, masterpiece, 8k quality

Negative prompt: cartoon, anime, painting, illustration, drawing, 3d
render, low quality, blurry, distorted, deformed, extra fingers,
mutation, watermark, signature, text, amateur, snapshot, oversaturated
```

## Quality Boosters (positive)

- masterpiece, best quality, 8k, sharp focus, cinematic
- Use sparingly — too many degrades

## Standard Negative Prompt

For photorealism baseline:
```
cartoon, anime, painting, illustration, drawing, 3d render, CGI,
low quality, worst quality, blurry, distorted, deformed, extra
fingers, missing fingers, mutation, mutated, watermark, signature,
text, amateur, snapshot, oversaturated, plastic skin, fake
```

## ControlNet Use Cases

When advanced control needed:
- **Pose** — match exact pose from reference
- **Depth** — preserve composition depth
- **Canny** — keep exact edges/structure
- **OpenPose** — body/face landmarks

## Pricing tier
Free if self-hosted, $ if via API

## Speed tier
Variable — depends on hardware
