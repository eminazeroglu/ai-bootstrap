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

---

## HARD RULE — Camera motion must be smooth. No shake, no wobble, no jitter (default)

**By default, every camera movement in a video prompt must be SMOOTH and MECHANICALLY STABLE** — as if mounted on a polished dolly track, a motion-controlled crane, or a high-end gimbal. Zero handheld float, zero micro-jitter, zero wobble, zero shake, zero parallax tremor.

### Why this rule is non-negotiable

Image-to-video models (Kling, Runway, Hailuo, Sora, Veo) have a strong **default bias toward adding handheld instability** — even when the prompt asks for a static or smooth move. They interpret "natural" as "amateur handheld" because most of their training data is consumer footage. Without an explicit anti-shake instruction, the output will almost always carry visible micro-jitter that ruins the cinematic feel and creates motion-sickness in long sequences.

This is a **default rule** — applies to every shot unless the script explicitly demands handheld documentary aesthetic.

### How to enforce smoothness in the prompt

Add an explicit smoothness clause to **every camera description**, regardless of movement type:

GOOD — explicit smoothness:
```
Camera: one single continuous slow dolly push-in along the street axis.
Movement is mechanical-smooth, as if on a polished dolly track or
motion-controlled crane. Zero handheld float, zero micro-jitter, zero
wobble, zero shake, zero camera-body tremor. No rotation, no tilt, no
parallax sliding. Perfectly stabilized motion throughout.
```

GOOD — explicit smoothness for static:
```
Camera: completely static and locked off. Tripod-stable. Zero drift,
zero breathing, zero handheld float, zero micro-jitter. Frame edges
do not move. Treat as a locked tripod shot.
```

BAD — silent on smoothness:
```
Camera: slow dolly in.    // Model will add wobble by default
```

BAD — silent on smoothness for "static":
```
Camera: static medium shot.    // Model will still drift
```

### Negative-prompt block for shake (paste into negative-prompt field when available)

```
camera shake, handheld wobble, micro-jitter, frame jitter, parallax
sliding, drifting frame, breathing camera, vlogger handheld, amateur
shake, motion-sickness wobble, unstable frame, drifting horizon, tilted
frame drift
```

### When handheld IS the intent (exception)

Only when the **script explicitly calls for documentary handheld** (Saving Private Ryan / Children of Men aesthetic, urgent vérité scene, found-footage horror, etc.) do you allow shake — and even then, specify the type and amount:

```
Camera: subtle controlled handheld, gentle organic breathing motion
(2–3% drift), no jerky moves, no whip pans. War-documentary aesthetic
in the tradition of Janusz Kamiński's Saving Private Ryan operator
work — alive, but composed.
```

Notice: even "intentional handheld" is *controlled* — never the raw amateur jitter the model produces by default.

### The two-line smoothness block (drop into every prompt)

Until this rule becomes muscle memory, append this exact block to the Camera section of every prompt:

```
Movement is mechanical-smooth — as if on a polished dolly track or motion-controlled gimbal. Zero handheld float, zero micro-jitter, zero wobble, zero shake. Perfectly stabilized cinematic motion.
```

This single addition consistently eliminates the most common "AI video looks amateur" failure mode.
