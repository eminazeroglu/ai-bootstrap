# Veo 3.1 — Video Model Knowledge

## Provider
Google DeepMind

## Type
Diffusion + transformer hybrid

## Strengths

- **Audio sync supported** via `[Audio: ...]` syntax — UNIQUE among models
- Natural language prompts work best
- Up to 8 seconds with high stability
- Excellent for long static takes
- Strong physics simulation
- Photorealistic skin, lighting, fabric
- Cinematic look out-of-box

## Weaknesses

- Cannot render text, signs, captions
- Fast motion creates artifacts
- Camera move + subject move simultaneously is hard
- Sometimes adds "magic" elements not requested
- Limited to 8s clips

## Best Practices

1. **Story-driven natural language** — write like screenplay action
2. Specify "static" for camera when possible
3. Audio cues in `[Audio: ...]` brackets
4. 6-8 seconds optimal duration
5. "Slowly" prefer over instant verbs
6. NO negative prompts — just don't mention unwanted
7. Reference cinematic style, not photo style
8. Specify single camera movement if any

## Prompt Anatomy

```
[Camera setup — angle, shot type, movement]

[Subject + action description in natural language]

[Audio: ambient sounds, specific sounds, dialogue]

Lighting: [setup description]
Duration: Ns
```

## Sample Prompt

```
[Static medium shot, eye-level]

A 35-year-old man in a charcoal coat stands by a rain-streaked window
in a dimly lit 1960s diner. He slowly turns his head left to look
toward the entrance. Subtle breathing motion. Camera holds steady — 
no movement.

[Audio: heavy rain on glass, distant traffic, soft jazz from jukebox,
his quiet exhale]

Lighting: warm tungsten from above, cool blue from window.
Duration: 6 seconds.
```

## Audio Cue Examples

```
[Audio: city ambient — distant traffic, occasional horn, street vendor calling]
[Audio: woman's voice, soft, urgent: "We need to leave now."]
[Audio: piano playing slow melancholic melody, minor key, distant]
[Audio: silence except wind and breathing]
```

## Common Mistakes

- Asking for text rendering ("sign reading 'OPEN'") — Veo can't
- Multiple simultaneous camera moves
- Action verbs without "slowly" or timing
- Too much happening in 4 seconds
- Negative prompts (use positive descriptions instead)

## Aspect Ratios

- 16:9 — primary
- 9:16 — supported, specify in prompt
- 1:1 — supported

## Pricing tier
$$$$ — premium

## Speed tier
Medium — 30-60s per clip
