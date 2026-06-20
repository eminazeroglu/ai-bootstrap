# Stable Audio — Model Specification

> Stability AI's audio generation model. Best for short loops, sound design, and background music.

## Model identity
- **Provider**: Stability AI (stableaudio.com)
- **Generates**: Instrumental audio (vocals weak/limited)
- **Output length**: Up to 3 minutes (Stable Audio 2.0)
- **Audio format**: WAV / MP3
- **Cost basis**: Subscription + commercial license tiers
- **Released**: 2023, v2.0 in 2024

## Strengths
- Strong instrumental quality
- Good for loops / samples (loop-perfect option)
- Sound design / SFX capable
- Background music / underscore quality
- Audio-to-audio style transfer
- Commercial license clarity (paid tier)
- Stable, predictable output
- Open weights (Stable Audio Open) — can run locally

## Weaknesses
- Vocals weak (basically not for songs with lyrics)
- Less "musical structure" than Suno/Udio
- Better for atmosphere than hooks
- Multilingual not relevant (instrumental focus)
- Less coherent for long-form pop song format

## Prompt format

### Text prompt
Natural language description of desired audio.

### Example prompts

**Background music**:
```
ambient cinematic underscore, soft piano with sustained string pads, 
slow tempo BPM 60, melancholy contemplative atmosphere, 2 minutes 
duration
```

**Loop / sample**:
```
hip-hop boom bap drum loop, 90 BPM, dusty vinyl crackle, 4-bar loop 
seamless, Dilla-style swing
```

**Sound design**:
```
sci-fi spaceship interior ambient hum, deep low frequency drone, 
occasional electronic beep, 30 seconds
```

**Underscore for video**:
```
emotional cinematic underscore for documentary, slow piano motif over 
sustained orchestral strings, building gradually, 3 minutes, no vocals
```

## Best uses
- **Background music** for video
- **Sound design** for film/games
- **Loops** for sample packs (loop mode)
- **Stems** for further production
- **Atmospheric pads** and drones
- **Royalty-free music** for commercial use

## Avoid for
- Songs with vocals (use Suno/Udio instead)
- Hook-driven pop
- Lyric-based work
- Multilingual songs

## Audio-to-audio feature
Stable Audio 2.0 lets you upload reference audio + prompt to transform style. Useful for:
- Variations on existing tracks
- Style transfers
- Remixing approaches

## Best practices
- Be SPECIFIC about instruments (it honors instrument requests well)
- Use BPM tag (it honors well)
- Use genre tag for production style
- Specify duration explicitly
- For loops, request "loop" or "seamless" in prompt
- For SFX, describe environment + sound character

## When to use Stable Audio vs Suno/Udio
- **Stable Audio**: instrumental background, loops, SFX, commercial use clarity
- **Suno**: full songs with vocals, multilingual
- **Udio**: hip-hop / electronic instrumental beats, sample-quality

## Commercial use note
Stable Audio's paid tier provides clearer commercial licensing than competitors. For commercial projects (ads, films, products), this matters significantly.

## Anti-patterns
- Don't use for vocal-heavy work
- Don't expect Suno-style "song" output
- Don't ignore the loop mode for samplework (huge feature)
- Don't expect non-instrumental success
