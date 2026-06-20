# Flux Pro — Image Model Knowledge

## Provider
Black Forest Labs

## Type
Diffusion (open architecture, hosted)

## Strengths

- Extreme detail rendering
- Excellent text rendering
- Realistic skin texture (better than most)
- Open ecosystem (LoRAs, ControlNet)
- Strong prompt adherence
- Negative prompts supported
- Good for hero / detailed shots

## Weaknesses

- Slow generation (~20-30s for highest quality)
- Expensive per image
- Reference image complexity (requires control nets)
- Photorealism can be too "perfect" / uncanny
- Less out-of-box cinematic look (needs styling)

## Best Practices

1. Detailed natural language
2. Use weight syntax: `(((emphasis)))` for important elements
3. Negative prompts work — list what to avoid
4. Specify lighting carefully (Flux interprets very literally)
5. Use camera + lens for cinematic feel
6. Avoid contradictions (Flux is literal-minded)
7. Long prompts (200+ words) work well
8. Reference film stocks or photo styles by name

## Prompt Anatomy

```
[Detailed subject with anchor features]
+ [Specific action and pose]
+ [Environmental detail]
+ [Lighting sources with color temperature]
+ [Camera + lens + aperture + style]
+ [Reference style: photographer, film stock]

Negative: [unwanted elements, common artifacts]
```

## Sample Prompt

```
Photorealistic cinematic portrait: a 35-year-old Azerbaijani man with
((athletic build)), ((short dark wavy hair)), green eyes, clean-shaven
with light stubble, wearing a charcoal wool overcoat over a plain
white shirt. Standing in a 1960s diner interior, hands in coat
pockets, looking out a rain-streaked window with melancholic
expression, eyes slightly downcast. Lighting: warm tungsten ceiling
pendant at 3200K from above-left creating soft rim on shoulders,
cool blue daylight spill from window at 5600K behind him as fill,
practical neon sign just out of frame casting subtle red glow on
right side. Shot on ARRI Alexa Mini LF with Cooke S4 50mm at f/2.0,
medium close-up, eye-level, 9:16 vertical aspect. Style: cinematic,
shallow depth of field, vintage Kodak Portra 400 emulation, slightly
desaturated tones, slight film grain.

Negative: cartoon, anime, illustration, painting, oversaturated,
plastic skin, blurry, deformed hands, extra fingers, watermark, text.
```

## Negative Prompt Common Items

For photorealism, always negative-prompt:
- cartoon, anime, illustration, painting, drawing
- 3d render, CGI, video game
- oversaturated, plastic, fake
- blurry, low quality, distorted, deformed
- extra fingers, missing fingers
- watermark, signature, text
- amateur, snapshot

## Pricing tier
$$$$ — highest among major models

## Speed tier
Slow — 20-30s
