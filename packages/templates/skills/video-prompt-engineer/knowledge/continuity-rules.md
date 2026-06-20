# Continuity Rules — Video Generation

> When making multiple clips that should connect (a scene of multiple shots), continuity must be maintained explicitly.

## What continuity means

Across multiple clips that depict the same scene:
- Same character looks identical
- Same lighting setup
- Same wardrobe (unless intentional change)
- Same props in same positions
- Time of day consistent
- Same general environment

## The 4 continuity dimensions

### 1. Spatial continuity
Position of subjects and objects in space.
- If subject ended on right side of frame, next shot should start with them on right
- Eyeline match: where subject was looking, next shot should reflect

### 2. Temporal continuity
Time within scene.
- If it was raining, next clip rains (unless time-passed cut)
- If subject was holding cup, they should still hold it (or visibly put it down)

### 3. Visual continuity
Look and style.
- Same lighting setup
- Same color grading
- Same lens character

### 4. Audio continuity
- Same ambient sound bed
- Music tempo/mood consistent
- Voice quality matches

## Continuity prompt strategy

### For each clip after the first

Include explicit continuity reference:

```
CONTINUITY FROM PREVIOUS CLIP:
- Subject: [same character description]
- Wardrobe: [exact same outfit]
- Lighting: [exact same setup]
- Props: [what they're holding, what's around them]
- Position: [where they are in space]
- Mood: [emotional state]

THIS CLIP'S NEW ACTION:
[describe what changes]
```

### Example: 3-clip scene

#### Clip 1 — Establishing
```
[Wide shot]
A 35-year-old man enters a 1960s diner from the rain. He removes his
coat and hangs it. Walks to counter. Sits on stool.

[Audio: rain, door bell, footsteps, jazz from jukebox]
Duration: 8 seconds.
```

#### Clip 2 — Medium (continuity)
```
CONTINUITY: Same man, now seated at counter from clip 1. Wet hair
from rain, coat now hanging on hook visible in background. Same
warm tungsten + cool window lighting. Jazz still playing.

[Medium shot, eye-level]
He looks down at the menu, then up at the empty stool beside him.

[Audio: jazz continues, his quiet breathing, distant rain]
Duration: 6 seconds.
```

#### Clip 3 — Close-up (continuity)
```
CONTINUITY: Same man from clips 1 and 2. Wet hair, looking at empty
stool. Same lighting. Same audio bed.

[Close-up, slight low angle]
His expression shifts from neutral to melancholic. A subtle exhale.
He looks back down at the menu.

[Audio: jazz, his exhale]
Duration: 5 seconds.
```

## Reference image strategy

For best continuity:
1. Generate Clip 1
2. Extract last frame
3. Use as reference image for Clip 2
4. Repeat

Models that support this well:
- Runway (image-to-video)
- Luma (image-to-video)
- Kling (with first frame reference)

## Common continuity errors

### Wardrobe drift
Solution: re-state outfit in EVERY clip prompt.

### Lighting flicker
Solution: lock lighting setup in every prompt with same exact words.

### Hair changes
Solution: re-state hair description identically.

### Background props move
Solution: simplify background, re-list in continuity.

### Time-of-day shift
Solution: explicitly state time of day each time.

## Match cuts

When you want a deliberate visual match between clips:
- Same composition
- Same focal point
- Match action mid-motion

```
Clip 1 ends: subject reaches for cup
Clip 2 begins: hand grasping cup at exactly same position
```

This requires very precise prompting.

## Eyeline match

When two characters look at each other:
- Subject A looks screen-right at 30° down
- Subject B should be looking screen-left at 30° up
- Heights must match

## Default approach

For multi-clip scenes:
1. Plan all clips upfront
2. Write continuity-aware prompts
3. Re-state EVERYTHING that should stay constant
4. Only describe what's changing
