# Consistency Anchors — Music Knowledge

> When generating multiple versions of a song or related songs, what to keep consistent.

## The problem

AI music models (Suno, Udio) can vary outputs. Same prompt can produce different songs. For:
- Multiple versions of same song
- Album cohesion (multiple songs)
- Remix consistency

Consistency requires anchors.

## Per-song anchors

These should stay identical across all versions of one song:

### Lyrics
- Exact text
- Same line breaks
- Same section labels

### Key signature
- Same key throughout (unless intentional modulation)

### BPM
- Same tempo across versions

### Genre
- Same genre and sub-genre

### Vocal type
- Same voice (male baritone, female alto, etc.)
- Same vocal style

### Song structure
- Same section order
- Same section lengths

These can vary per take:
- Specific instrumentation choices (within genre)
- Production polish level
- Vocal performance subtleties
- Mix balance

## Per-album / per-artist anchors

For multiple songs by "same artist":

### Sonic palette
- Similar instrument set
- Similar production aesthetic
- Recognizable "sound"

### Vocal identity
- Same vocal type and style
- Similar range
- Same delivery

### Lyrical themes
- Similar subject matter (album thematic)
- Similar register (formal/casual)
- Similar perspective

### Tempo range
- Album BPMs in similar range
- Or intentional variety with structure

### Key relationships
- Songs in related keys (Circle of Fifths)
- Or intentional contrast

## Audio reference anchoring

Some AI music platforms support audio reference:
- Upload existing song
- New generation matches style
- Most consistent results

Suno supports this via "extend" feature.

## Lyric consistency techniques

### Recurring phrases
Use specific phrases that appear in chorus and outro for cohesion.

### Imagery threads
Repeated images / metaphors throughout song.

### Rhyme scheme consistency
Same rhyme pattern in V1 and V2.

### Section parallel structure
V2 mirrors V1 structurally even with different content.

## Production consistency

### EQ similar
Same frequency profile across versions.

### Reverb similar
Same spatial feel.

### Compression similar
Same loudness profile.

### Vocal mix
Vocal at similar level vs instrumentation.

## For multiple Suno generations

To get consistent variations:
1. Use exact same prompt text
2. Use same lyrics
3. Generate multiple times
4. Pick best
5. Use Suno's "extend" / "remix" features to refine

For sequel song or album:
1. Reference previous song's specs in new prompt:
```
[Style: same as Song "Yağışlı Axşam" — 75 BPM, F minor, 
indie folk, female alto vocal, soft piano + light strings]
```

## Album cohesion approaches

### Single producer / engineer feel
All songs sound recorded by same person.

### Concept album
Lyrical / thematic thread across songs.

### Sonic identity
Specific instrument palette repeated.

### Vocalist identity
Same voice across all songs.

### Tempo journey
Album flows from slow → fast → slow OR builds throughout.

## Common consistency mistakes

- Different keys per generation (jarring)
- Different vocal types in "same artist"
- Genre drift across album
- Production style mismatch
- Lyric variations between versions
