# Camera Movements — Video Generation

> How cameras move in cinema. Critical for video prompts because each model handles movement differently.

## Movement types

### Static (default — RECOMMENDED for AI video)
- Camera doesn't move
- Subject can move within frame
- Most stable, lowest artifact risk
- Best for dialogue, reaction shots, contemplative moments
- All AI models excel at static

### Pan (horizontal rotation)
- Camera rotates left or right on axis
- Subject typically tracks across
- Specify: "slow pan left 90°" or "quick whip pan right"
- Works in: Veo, Runway, Sora; risky in Kling, Pika

### Tilt (vertical rotation)
- Camera rotates up or down on axis
- Reveals subjects taller than frame
- Specify: "slow tilt up to reveal building"
- Works similarly to pan

### Dolly (forward/backward)
- Whole camera moves toward or away
- "Dolly in" creates intimacy/tension
- "Dolly out" reveals context, creates distance
- Specify: "slow dolly in 2 feet"
- Works in Veo, Sora; harder in Kling

### Truck / Track (sideways)
- Camera moves left or right
- Like pan but whole camera shifts
- Used for following subject walking
- Specify: "tracking shot, camera moves right with subject"

### Crane / Jib (vertical move)
- Camera moves up or down
- Can combine with tilt
- Reveals scale, drama
- Specify: "crane up from ground level to overhead"

### Handheld
- Subtle natural shake
- Documentary feel, intimacy
- Specify: "subtle handheld camera, slight movement"

### Steadicam / Gimbal
- Smooth glide as if floating
- Long takes following subject
- Specify: "smooth steadicam following subject through hallway"

### Zoom (lens, not camera)
- Camera doesn't move; lens focal length changes
- "Zoom in" / "Zoom out"
- Less cinematic than dolly
- Use sparingly

### Push-in / Pull-out (combination)
- Dolly + zoom hybrid
- "Vertigo effect" / Dolly zoom: dolly forward + zoom out (or opposite)
- Iconic Hitchcock effect
- Very hard for AI

## CRITICAL RULE for AI video

**Combine movements with caution.**

- Single movement: ✅ usually works
- Two simultaneous: ⚠️ risky in most models
- Three+: ❌ fails or produces artifacts

Veo handles single movements best. Kling prefers static. Sora attempts combinations.

## Movement speed

- Slow — most cinematic, most stable for AI
- Medium — natural
- Fast / whip — high artifact risk, use only when style demands

## Prompt vocabulary

GOOD:
```
Camera: static medium shot, eye-level, no movement.
```

GOOD:
```
Camera: slow dolly in from medium to close-up over the duration,
following subject's eyes. No pan or tilt.
```

BAD:
```
Dynamic camera with cool moves.
```

BAD:
```
Camera pans left while dollying in and tilting up.  // Too much
```

## Movement-to-emotion mapping

- Static → contemplation, dialogue, focus
- Slow dolly in → intimacy, tension building
- Slow dolly out → reveal, isolation, ending
- Tracking → following journey, momentum
- Handheld → urgency, realism, chaos
- Crane up → freedom, scale, finality
- Crane down → entering scene, intimacy

## Default for AI video

When unsure: **static**. Add movement only when scene demands it.
