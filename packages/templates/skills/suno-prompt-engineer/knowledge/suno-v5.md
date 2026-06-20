# Suno v5+ — Model Specification

> Suno's next-generation model. Longer form, richer arrangements, more expressive — with more variance.

## Model identity
- **Provider**: Suno AI (suno.com)
- **Version**: v5 and beyond (rolling updates)
- **Released**: 2025+
- **Generates**: Full songs with vocals or instrumentals
- **Output length**: Up to ~8 minutes per generation (longer than v4)
- **Audio format**: MP3 / WAV / stems
- **Cost basis**: Premium credit tier required

## Strengths over v4
- Longer coherent generations (5-8 min realistic)
- Richer arrangements (more instruments per song)
- Better vocal expressiveness (emotion, dynamics)
- Improved multilingual (Azerbaijani notably better)
- Better section transitions
- Higher fidelity audio (closer to studio quality)
- Better instrument-specific requests honored
- Better adherence to BPM / key
- Stems output (separate vocal, drums, bass, etc.)

## Weaknesses
- More variance per generation (less predictable)
- Sometimes too ambitious (overproduces simple briefs)
- Costs more credits per generation
- Can be slower to generate
- Occasional "creative" departures from prompt
- Stems quality varies

## Prompt format

### Two fields with HARD CHARACTER LIMITS
1. **Style of Music** — **MAX 800 characters (Suno UI hard limit)**
2. **Lyrics** — **MAX 4500 characters (Suno UI hard limit)**

> ⚠️ **HARD RULE:** Suno UI rejects prompts exceeding these limits. Always count characters BEFORE submitting. Even v5+ does NOT increase these limits despite richer vocabulary tolerance.

### Same structure as v4 (Style + Lyrics)
But with richer accepted vocabulary and more honored directives within the same character budget.

### Style field (richer accepted)
```
indie folk in Bon Iver tradition, fingerpicked acoustic guitar with 
reverb-drenched ambience, female vocal soft intimate building to 
falsetto in chorus, layered self-harmonies, melancholy autumnal 
atmosphere, BPM 78, key D minor, 4-minute song form with cathartic 
bridge climax
```

### Lyrics field — same tag system
```
[Intro - 8 bars]
(fingerpicked guitar establishes)

[Verse 1]
...

[Pre-Chorus - building]
...

[Chorus - full]
...

[Verse 2 - drums enter]
...

[Bridge - cathartic, harmonies stacked]
...

[Final Chorus - even bigger]
...

[Outro - guitar alone again]
```

## New v5+ features
- **Bar count hints**: `[Intro - 8 bars]` honored more
- **Dynamic directives**: `(building)`, `(soft)`, `(loud)`, `(climax)`
- **Instrument-specific entries**: `(strings enter)`, `(drums kick in)` work better
- **Persona/voice cloning**: stronger, more consistent
- **Stems output**: separate vocal/drums/bass/other tracks
- **Style references**: can point to artist styles more reliably (still risky)

## Inline directive vocabulary (expanded)
```
(soft acoustic intro)
(drums enter with brushes)
(strings swell)
(modulate up)
(key change)
(double-time feel)
(half-time feel)
(harmonies stack)
(falsetto break)
(spoken word interlude)
(instrumental break - 16 bars)
(big finish)
(fade outro)
(sudden stop)
(quiet ending)
```

## Best practices for v5+
- Use richer Style descriptions (it can handle complexity)
- Use bar counts for important sections
- Specify dynamic arc explicitly
- Use multiple Verse / Chorus iterations to show evolution
- Stems output for editable workflow (DAW import)
- Run multiple generations — variance means best take varies
- Save successful "Persona" for series/album work

## Multilingual notes
- Azerbaijani: notably improved over v4 (ə, ı, ş, ç pronunciation)
- Russian: excellent
- Turkish: excellent
- English: native quality
- Mixed-language verses: work better in v5+

## When to use v5+ vs v4
- **v5+**: longer songs, complex arrangements, multilingual deep
- **v4**: simple structured pop, predictable output, lower cost

## Anti-patterns
- Don't expect 100% prompt adherence — variance is feature
- Don't underdescribe (v5+ rewards rich Style field)
- Don't ignore stems for serious projects (huge editability win)
- Don't compare 1-take to v4 — generate 4-5, pick best
