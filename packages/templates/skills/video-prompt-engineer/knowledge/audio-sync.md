# Audio Sync — Video Generation

> How to specify audio cues. Currently only Veo 3.1 robustly supports embedded audio. Other models need separate audio.

## Veo 3.1 audio (PRIMARY support)

### Syntax
```
[Audio: ambient sound, specific sounds, dialogue if any]
```

Always wrap in square brackets at appropriate point in prompt.

### Audio types Veo handles

#### Ambient
```
[Audio: rain on glass, distant traffic, soft jazz from jukebox]
```

#### Specific actions
```
[Audio: footsteps on wood floor, door creaking open, cup placed on table]
```

#### Dialogue
```
[Audio: woman's voice, soft, melancholic: "I waited for you."]
```

Specify:
- Voice type (woman/man/child)
- Tone (soft, urgent, whispered)
- Exact dialogue in quotes

#### Music
```
[Audio: melancholic piano playing in background, slow tempo, minor key]
```

#### Silence with subtle ambience
```
[Audio: near-silence, only the sound of distant wind and her breathing]
```

### Best practices for Veo audio

1. List ambient first, then specific, then dialogue
2. Be specific about source location
3. Match audio to visible action
4. Don't conflict (visible thunderstorm with [Audio: silent])
5. Multiple audio layers supported (3-5 elements work)

### Sample full Veo prompt with audio

```
[Static medium shot, eye-level]

A 35-year-old man in a charcoal coat stands by a rain-streaked window
in a dimly lit 1960s diner. He slowly turns his head left to look
toward the entrance.

[Audio: heavy rain on glass behind him, distant traffic from the
street outside, soft jazz playing from a jukebox in the corner,
his quiet shallow breathing, the muffled hum of the diner
refrigerator]

Lighting: warm tungsten from above, cool blue from window.
Duration: 6 seconds.
```

## Other models (NO embedded audio)

### Kling 2.x — silent output
Don't waste tokens on audio cues. Generate visual only:
```
Subject: man in coat by window
Action: slow head turn left
Camera: medium static
Setting: 1960s diner night
Lighting: tungsten + window blue
Style: cinematic
Duration: 6s
```

Add audio in post-production (pre-existing music, ElevenLabs voiceover).

### Sora — limited audio
Some audio cues respected. Use Veo-style brackets but expect inconsistency.

### Runway Gen-4 — silent
Visual only. Add audio post.

### Seedance, Pika, Luma, Hailuo — silent
Visual only.

## Audio replacement workflow (for non-Veo models)

1. Generate video clip (silent)
2. Use Suno AI for music
3. Use ElevenLabs for voiceover/dialogue
4. Mix in DaVinci Resolve / Premiere / Final Cut

## Pre-mixing approach

When multiple clips will be edited together, ALL clips silent + single audio bed:
- Easier to mix
- Consistent ambient
- No conflicting per-clip audio

## Sound design principles

When briefing Veo for audio:
- Diegetic (from scene): rain, footsteps, dialogue
- Non-diegetic (added): music score, narration
- Atmosphere: subtle constant ambient (refrigerator hum, distant city)
- Punctuation: specific moments (door slam, cup placed)

Layer all 4 for cinematic feel.

## Default for video prompts

If using Veo: include `[Audio: ...]`
If using other model: omit audio specs, plan for post-production.
