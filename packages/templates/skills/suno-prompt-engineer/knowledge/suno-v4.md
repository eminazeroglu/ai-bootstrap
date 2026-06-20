# Suno v4 — Model Specification

> Suno's flagship model (pre-v5). Strong vocal coherence + lyric adherence. Best for structured songs.

## Model identity
- **Provider**: Suno AI (suno.com)
- **Version**: v4 (often called "Chirp" internally)
- **Released**: Late 2024
- **Generates**: Full songs with vocals or instrumentals
- **Output length**: Up to ~4 minutes per generation
- **Audio format**: MP3 / WAV
- **Cost basis**: Credit-based subscription

## Strengths
- Excellent vocal coherence (lyrics actually sung, not garbled)
- Lyric adherence (sings what you write — mostly)
- Strong genre adherence
- Good structure handling ([Verse], [Chorus], [Bridge])
- Multilingual (Azerbaijani, Russian, Turkish, English all good)
- Section transitions handled
- Production polish (commercial-sounding)

## Weaknesses
- Sometimes pronounces non-English oddly
- Long-form coherence drops past 3 min
- Outro fades sometimes abrupt
- Specific instrument requests sometimes ignored
- Vocal gender sometimes ambiguous if not specified
- BPM not always exact

## Prompt format

### Two main fields with HARD CHARACTER LIMITS
1. **Style of Music** — **MAX 800 characters (Suno UI hard limit)**
2. **Lyrics** — **MAX 4500 characters (Suno UI hard limit)**

> ⚠️ **HARD RULE:** Suno UI rejects prompts exceeding these limits. Always count characters BEFORE submitting. Trim aggressively if over — do not assume tolerance.

### Style field example
```
indie folk with fingerpicked acoustic guitar, female vocal soft 
intimate, melancholy atmosphere, BPM 80, key D minor
```

### Lyrics field with tags
```
[Intro]
(soft guitar fingerpicking)

[Verse 1]
Walking through the empty streets tonight
Stars above are burning out of sight

[Pre-Chorus]
And I think of you again
Wondering where you've been

[Chorus]
Come back to me, come back to me
The morning won't break without your light

[Verse 2]
...

[Bridge]
[soaring strings enter]

[Final Chorus]
[full instrumentation, harmonies stacked]

[Outro]
(fade with guitar)
```

## Recognized structure tags
- `[Intro]`, `[Outro]`
- `[Verse 1]`, `[Verse 2]`, etc.
- `[Pre-Chorus]`
- `[Chorus]`
- `[Bridge]`
- `[Hook]`
- `[Refrain]`
- `[Drop]` (for EDM)
- `[Instrumental]`, `[Solo]`
- `[Spoken Word]`

## Inline production directives (parentheses)
```
(soft piano enters)
(drums kick in)
(harmony joins)
(reverb-heavy guitar solo)
(fade out)
```

## Best practices for v4
- Keep Style field tight, specific (not vague)
- Use ALL structure tags for clearer sections
- Specify vocal gender explicitly ("male tenor", "female alto")
- BPM in style helps but not always honored
- Key signatures help mood (D minor = melancholy default)
- For non-English, be patient — may need 2-3 tries
- Avoid contradictions (e.g., "soft loud aggressive gentle")

## Multilingual notes
- Azerbaijani: works well, occasional mispronunciation of ə/ı
- Russian: very good
- Turkish: very good
- English: native quality

## When to use Suno v4 vs v5+
- **v4**: production-ready stable, predictable
- **v5+**: more experimental, longer form, but more variance

## Suno-specific quirks
- Cover art auto-generated (ignore for prompt purposes)
- Stems available for paid tiers
- "Persona" feature lets you save voice for reuse
- "Cover" feature reinterprets existing audio

## Anti-patterns
- Don't put ALL details in Style field (use Lyrics structure)
- Don't request impossible specifics ("solo by John Coltrane")
- Don't expect exact BPM — give range tolerance
- Don't expect lyric mistakes corrected (write phonetically clear)
