# Sora — Video Model Knowledge

## Provider
OpenAI

## Type
Transformer-based diffusion

## Strengths

- **Long-form** — 1+ minute clips
- Strong physics simulation
- Narrative understanding
- Storyworld generation
- Complex scenes possible
- Multi-shot stitching attempts
- Audio support (improving)

## Weaknesses

- **Limited access** — invite/waitlist
- Very expensive
- Slow generation
- API access restricted

## Best Practices

1. **Narrative description** — describe like writing prose
2. Less technical, more storytelling
3. Establish setting first, then action
4. Specify duration explicitly
5. Camera direction in narrative form
6. Multi-shot scenes possible

## Prompt Anatomy

```
[Narrative scene description — setting, mood, atmosphere first]

[Subject established in scene — who, what they wear, what they're doing]

[Action — what unfolds during the clip]

[Camera and time direction]

[Audio if any]

Duration: Ns
```

## Sample Prompt

```
A medium-shot of a 35-year-old man in a charcoal coat standing alone
by a window in a 1960s diner. The exterior shows heavy rain falling
under streetlamp light. The interior is warmly lit by tungsten ceiling
pendants. He has been waiting. After holding still for a moment of
quiet contemplation, he slowly turns his head to the left, his eyes
finding the door. The camera holds steady throughout, observing.

[Audio: heavy rain on the window glass, distant traffic, soft jazz
playing from a jukebox somewhere off-screen, the man's quiet,
shallow breathing.]

The shot lasts 8 seconds.
```

## Long-Form Capability

Sora can generate longer clips than competitors. Use this for:
- Continuous action sequences
- Long takes (one-shot scenes)
- Establishing sequences
- Documentary-style observation

```
A 30-second continuous shot following a young woman as she walks
through a Tokyo neon-lit alleyway at night. She passes vendors,
glances at signs, occasionally smiles at strangers. Camera tracks
alongside her at medium distance, smooth steadicam motion. Practical
neon and shop lights illuminate her face in shifting colors as she
moves. Ambient city sounds throughout.

Duration: 30 seconds.
```

## Multi-Shot Mode

Sora attempts to handle scene with multiple shots:
```
Scene: Two people meet at a cafe.
Shot 1 (4s): Wide establishing shot of cafe exterior, woman approaches.
Shot 2 (3s): Medium shot, woman opens door, enters.
Shot 3 (4s): Two-shot interior, she sees man at table, he stands up.
Total duration: 11 seconds.
```

Results vary; for production-quality multi-shot, generate separate clips.

## Aspect Ratios

- 16:9, 9:16, 1:1
- Wide aspect (2.39:1) supported

## Common Mistakes

- Treating like image generator (Sora wants narrative)
- Too short prompts (Sora rewards detail)
- Mixing styles within prompt
- Forgetting duration

## Pricing tier
$$$$$ — highest

## Speed tier
Slow — several minutes per clip
