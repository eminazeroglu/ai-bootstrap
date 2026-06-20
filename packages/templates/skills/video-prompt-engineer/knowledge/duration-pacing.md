# Duration & Pacing — Video Generation

> How long should AI video clips be, and how to pace action within that duration.

## Duration capabilities by model

| Model | Min | Max | Optimal |
|-------|-----|-----|---------|
| Veo 3.1 | 4s | 8s | 6-8s |
| Kling 2.x | 5s | 10s | 5-7s |
| Seedance 2 | 4s | 6s | 4-5s |
| Runway Gen-4 | 5s | 10s | 5-7s |
| Sora | 4s | 60s+ | 5-15s |
| Pika 2 | 3s | 4s | 3-4s |
| Luma | 5s | 5s | 5s (fixed) |
| Hailuo | 4s | 6s | 4-6s |

## Optimal duration by use case

### Reaction shot (subtle): 4-5s
- Single emotion beat
- Facial expression change
- Static camera
- Minimal motion

### Establishing shot: 5-6s
- Slow reveal
- Subject in environment
- Optional slow camera movement
- Atmospheric

### Action beat: 6-8s
- One complete action
- Walk to door, sit down, raise glass
- Camera follows or static
- Clear start/end

### Dialogue clip: 6-8s
- 2-3 sentences max
- Lip sync visible
- Static or slow camera
- Audio cue for delivery

### Transition / B-roll: 4-5s
- Quick visual moment
- Mood/atmosphere
- Static or single move

## Pacing within clip

### 4-second clip
```
0.0s — Start state established
0.5-3.0s — Single action beat
3.0-4.0s — End state held
```

### 6-second clip
```
0.0-0.5s — Hold start state
0.5-2.0s — Action begins
2.0-4.0s — Action continues
4.0-5.5s — Action completes
5.5-6.0s — End state held
```

### 8-second clip
```
0.0-1.0s — Establishing beat (subject visible, scene set)
1.0-3.0s — Action initiation
3.0-5.0s — Action peak
5.0-7.0s — Action resolution
7.0-8.0s — End state, hold
```

## Prompt phrases for pacing

```
Duration: 6 seconds.
The action unfolds slowly:
- Frames 0-1: subject is still, looking forward
- Frames 1-4: subject begins to turn head left, gradually
- Frames 4-5: head reaches final position
- Frames 5-6: subject holds, eyes finishing the look
```

This timing breakdown helps Veo and Sora especially.

## Common mistakes

### Too much in too little time
```
BAD: In 4 seconds, the subject walks across the room, sits down,
picks up a cup, takes a sip, looks out the window, and sighs.
```
Result: rushed, jittery, artifacts.

### Too little in too much time
```
BAD: 10-second clip of someone blinking once.
```
Result: model fills with random motion.

### No duration specified
```
BAD: A man turns his head.
```
Result: model picks duration randomly, often poorly.

## Format-specific durations

### Social media reel
- 4-6s clips that loop or chain together
- Multiple short clips edited externally

### Cinematic short film
- 5-8s clips
- Plan for editing transitions

### Brand commercial
- 6-8s hero clips
- Multiple beats per scene

### Music video
- 4-6s clips
- Cut to beat externally

## Default for AI video

When unsure: **6 seconds**. Long enough for one beat, short enough to stay stable.
