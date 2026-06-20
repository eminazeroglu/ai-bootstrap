# Tempo / BPM Guide — Music Knowledge

> BPM (beats per minute) defines song's energy and pace. Critical first decision.

## BPM ranges by feel

| BPM | Feel | Use case |
|-----|------|----------|
| 40-60 | Very slow | Ballad, ambient, funeral |
| 60-80 | Slow | Slow ballad, folk, R&B slow jam |
| 80-100 | Moderate slow | Pop ballad, mid-tempo R&B, hip-hop |
| 100-120 | Moderate | Pop, rock, indie, modern hip-hop |
| 120-140 | Upbeat | Dance pop, rock, EDM intro |
| 140-160 | Energetic | Drum and bass, fast rock, EDM |
| 160-180 | Very fast | Hardcore, speed metal, jungle |
| 180+ | Extreme | Speedcore, gabber |

## BPM by genre

### Slow (60-90 BPM)
- Ballads (60-75)
- Slow R&B (70-85)
- Slow hip-hop (70-85)
- Folk (75-95)
- Ambient (60-90)

### Mid (90-120 BPM)
- Pop (95-115)
- Rock (100-120)
- Hip-hop (90-110)
- Modern R&B (90-115)
- Indie (95-115)
- Country (95-115)

### Fast (120-150 BPM)
- Dance pop (120-130)
- House (120-130)
- Disco (115-130)
- Punk (140-180)
- Modern rock (110-140)

### Very fast (140+ BPM)
- EDM (128-140)
- Drum and bass (160-180)
- Trap (130-150 typical, but doubled feel)
- Hardcore (150-180)

## BPM and mood

### Slow BPM
- Reflective
- Melancholic
- Romantic
- Sad
- Atmospheric

### Mid BPM
- Conversational
- Mid-energy emotional
- Most pop / radio
- Universal

### Fast BPM
- Energetic
- Joyful
- Aggressive (in metal)
- Dancing
- Excitement

## Cultural BPM norms

### Azerbaijani folk
- Slow mugham: 60-80
- Folk dance (yallı, vagzalı): 110-140
- Modern Azerbaijani pop: 95-120

### Hip-hop regional differences
- Trap (Atlanta): 130-150 doubled
- East Coast: 90-95
- West Coast: 90-105

### Dance subgenres
- House: 120-130
- Techno: 125-150
- Trance: 130-145
- Drum and bass: 160-180

## How to pick BPM

### Match the lyrics
- Slow lyrics need slow BPM
- Fast wordplay needs fast BPM (or doubled feel)

### Match the mood
- Sad → slow
- Energetic → fast
- Reflective → mid-slow

### Match genre conventions
Don't break genre BPM unless intentionally (e.g., slow trap for atmospheric)

## "Doubled" feel

Trap and drum-and-bass often have doubled feel:
- Drums at 75 BPM
- Hi-hats at 150 BPM (double)
- Listener perceives both

For Suno, specify:
```
[BPM: 75 with doubled hi-hat feel, trap style]
```

## For AI music (Suno)

Always specify BPM in prompt:
```
[Style: indie folk, 75 BPM, F minor]
```

Suno will compose at that tempo. Don't omit BPM — it's foundational.

## Tempo changes within song

Most songs maintain consistent BPM. Exceptions:
- Half-time bridge (suddenly 1/2 speed feel)
- Double-time bridge (suddenly 2x speed)
- Accelerando (gradually speeding up)
- Ritardando (gradually slowing)

Specify if used:
```
[Bridge: half-time feel for emotional emphasis]
```

## Common BPM mistakes

- Mismatched BPM and lyric pacing
- BPM outside genre conventions (without intention)
- Too fast for vocal performance
- Tempo unclear (Suno picks randomly)
