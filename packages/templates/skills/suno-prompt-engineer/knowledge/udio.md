# Udio — Model Specification

> Suno's main competitor. Stronger on instrumental detail, sample-quality output. Tag-based prompting.

## Model identity
- **Provider**: Udio (udio.com)
- **Generates**: Full songs with vocals or instrumentals
- **Output length**: 32 seconds per generation, extendable
- **Audio format**: MP3 / WAV
- **Cost basis**: Credit-based subscription
- **Released**: 2024

## Strengths
- Tag-based prompting (very specific control)
- High-fidelity instrumental detail
- Good for sample-style output (loop-quality)
- Strong genre adherence (with tags)
- Can extend tracks indefinitely (32s + 32s + ...)
- Strong on hip-hop, electronic genres
- Audio quality often more "produced" sounding
- Good for instrumental beat production

## Weaknesses
- Vocal coherence weaker than Suno (lyrics sometimes garbled)
- Multilingual weaker than Suno (English-dominant)
- Short initial generation (32s — must extend)
- Extension can drift from original mood
- Less intuitive for full-song writing
- Lyrics adherence less consistent
- Fewer structure tags supported

## Prompt format

### Tag-based system
Tags entered like searchable keywords, comma-separated.

### Example prompt
```
hip-hop, boom bap, jazz samples, vinyl crackle, BPM 90, key A minor, 
introspective male vocal, 90s east coast aesthetic, MF DOOM influence
```

### Lyrics input (optional)
- Can input lyrics for vocal versions
- Less reliable adherence than Suno
- Better for instrumental-only

## Supported tag categories
- **Genre tags**: "indie folk", "trap", "house", "ambient"
- **Mood tags**: "melancholy", "uplifting", "aggressive"
- **Instrument tags**: "acoustic guitar", "synth lead", "808 drums"
- **Production tags**: "lo-fi", "polished", "vinyl crackle"
- **Era tags**: "90s", "80s synth-wave", "vintage"
- **Vocal tags**: "male vocal", "female vocal", "rap"
- **Tempo tags**: "BPM 120", "fast", "slow"
- **Key tags**: "key C major", "minor key"
- **Reference tags**: "MF DOOM influence", "Burial style"

## Best practices for Udio
- 8-15 tags optimal (more = confusion)
- Specific over vague ("808 drums" not just "drums")
- Use BPM tag for tempo control
- Use instrumental tags for beat production
- Extend in 32s chunks for full song (re-prompt each extend if drifting)
- Best for instrumental — vocal less reliable

## Extension workflow
1. Generate initial 32 seconds
2. Click "Extend" → adds 32 more seconds
3. Can adjust prompt for each extension
4. Build to 3-4 minute full song
5. Each extension = chance for drift

## Multilingual notes
- English: native quality
- Spanish: decent
- Other languages (Azerbaijani, Russian, Turkish): weaker
- Best for English-language output

## When to use Udio vs Suno
- **Udio**: instrumental beats, hip-hop, electronic, sample-quality output
- **Suno**: full songs with vocals, multilingual, structure-heavy
- **Both**: try both for important projects, pick better take

## Udio-specific features
- Extension system (key feature)
- Inpainting (regenerate specific sections)
- Stems (paid tier)
- Style transfer between generations

## Best fit genres
- Hip-hop / boom bap / lo-fi hip-hop
- Electronic / house / techno
- Ambient / drone
- Jazz instrumental
- Sample-based production
- Beat production for rappers

## Anti-patterns
- Don't expect coherent multi-minute song from one prompt
- Don't expect non-English vocals to work well
- Don't use vague tags ("good music", "nice")
- Don't ignore extension drift — re-prompt actively
