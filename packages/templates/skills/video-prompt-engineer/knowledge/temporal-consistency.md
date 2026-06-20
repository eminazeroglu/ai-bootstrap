# Temporal Consistency — Video Generation

> Frame-to-frame consistency. The hardest problem in AI video. Subject morphing, lighting flicker, object disappearing — all temporal failures.

## What can go wrong

### Subject morphing
- Face slowly changes between frames
- Outfit shifts color or detail
- Body proportions vary

### Lighting flicker
- Brightness changes between frames
- Color temperature shifts
- Shadows move unnaturally

### Object permanence loss
- Held object disappears mid-clip
- Background element vanishes
- Hand goes through solid object

### Background drift
- Walls slowly distort
- Texture patterns shift
- Background subjects appear/disappear

## Mitigation strategies

### 1. Strong reference image (most important)
For image-to-video models (Luma, Runway, Pika):
- Provide highest-quality starting image
- Image should be clean, sharp, well-composed
- Avoid busy backgrounds (more to keep consistent)

### 2. Short duration
- 4-6 seconds: most stable
- 6-8 seconds: usable
- 8-10 seconds: degradation likely
- 10+ seconds: significant artifacts

### 3. Minimal motion
- Less motion = more frames look similar = less drift
- Static or subtle motion = highest stability
- Complex action = highest drift

### 4. Simple background
- Plain walls, gradient backgrounds, blurred backgrounds = stable
- Detailed textures, crowds, foliage = unstable

### 5. Single subject focus
- One person in frame: stable
- Two people: doable
- Three+ people: high drift risk

### 6. Consistent lighting setup
- Natural single source = stable
- Multi-source mixed lighting = drift risk
- Practical lights that flicker (candles, screens) = use cautiously

### 7. Stable camera
- Static = best
- Single slow movement = ok
- Complex movement = drift compounds

## Prompt phrases that help

```
Maintain exact visual consistency throughout the clip.
Subject's appearance must NOT change frame-to-frame.
Lighting setup remains constant.
Background details are static and unchanging.
No transformations or morphing.
```

## Prompt phrases that hurt

```
Dynamic transitions
Changing perspective
Morphing scenery
Time-lapse
Multiple cuts
```

These trigger model into "creative" mode = inconsistency.

## Continuity between clips

When making multiple clips that should connect:

```
Clip 1: Subject in scene X with lighting Y, ends at position Z.
Clip 2: Subject continues from position Z, lighting Y unchanged,
scene X unchanged. NEW action begins.
```

Use last frame of Clip 1 as reference image for Clip 2.

## Trade-off

More motion = more cinematic feel BUT less consistency.
Less motion = more stable BUT can feel like "moving photo".

For AI video right now (2026), prefer stability over dynamism.

## Quality check

After generating, watch for:
- Face stability frame-by-frame
- Outfit color consistency
- Background object permanence
- Smooth motion (no jumps)
- Consistent lighting

If multiple failures: regenerate with simpler prompt.

---

## HARD RULE — Lit objects must stay lit consistently from frame 0 (no "re-ignition" artifact)

**Failure mode**: when the start frame shows a candle, oil lamp, lantern, screen, fireplace, or any lit light source, image-to-video models (Kling, Runway, Hailuo, Pika) often **animate the lighting up** of that source across the clip — the flame grows, the glow brightens, the lit object appears to *ignite* or *power on* mid-clip. The viewer reads this as "the candle just lit itself," which breaks both physical realism and temporal continuity.

This happens because the model interprets ambiguous "flicker softly" or "burns warmly" language as a *change in lighting* rather than a *stable lit state*.

**Real-world cost**: this artifact is among the most expensive AI-video failures because (a) it nearly always recurs on regeneration if the prompt isn't restructured, (b) it costs the user real credit dollars per failed attempt, and (c) it is often hard to spot until the clip is fully rendered. Solve it with prompt structure, not negative-list whack-a-mole.

### The MOST RELIABLE prompt structure for Ken Burns / photo-doc frames containing lit objects

**Do NOT describe flames as "living", "flickering softly", or "burning" anywhere in the prompt.** Those positive words tell the model to animate the flame. Negative-prompt entries cannot cleanly override positive-prompt cues — model behavior follows positive cues first.

Instead, restructure the prompt around the **"Frozen Still-Life Treatment"** pattern:

```
CRITICAL RULE — FROZEN STILL-LIFE TREATMENT:
This clip is to be filmed AS IF it were a still photograph being slowly pushed into by the camera. The reference image is to be treated as a photograph — an unmoving artifact. The ONLY motion permitted in this clip is the camera's slow forward dolly push-in. EVERY OTHER pixel of the frame is to be rendered as completely frozen.

This explicitly includes — but is not limited to:
- The candle flames: TREATED AS PHOTOGRAPHIC ELEMENTS, NOT AS LIVING FLAMES. Zero flicker, zero growth, zero shrinkage, zero brightness change, zero position change, zero ignition, zero re-lighting, zero pulsation. The candle flames are visual ornaments in a still image — they have ALREADY existed in their exact rendered state at the moment the photograph was taken.
- The lamp glow: FROZEN at exactly the brightness, color, and reach shown in the reference frame. The lamp does not warm up, ramp up, intensify, dim, or change in any way.
- The overall scene exposure: identical at frame 0 and at frame final. No general fade-in, no scene-wide brightening, no exposure pump.

Action — ONLY THE FOLLOWING MOTIONS ARE PERMITTED IN THIS CLIP. NO OTHER MOTION OF ANY KIND IS ALLOWED:
1. [explicit motion 1, e.g. subject breathes once]
2. [explicit motion 2, e.g. subject blinks once]
3. The camera performs one single continuous very slow dolly push-in.

All other elements in the frame are completely frozen — treat them as photographic elements that the camera is gently entering.
```

The two changes that make this work versus the previous (failing) pattern:

| Pattern that FAILS | Pattern that WORKS |
|---|---|
| `lit white tapered candles ... real living candle flames flicker softly` | `white tapered candles ... visible as decorative composition elements` |
| `warm flickering candle fill ... candle flames themselves flicker softly` | `light sources rendered as elements of a still photograph — they do not produce dynamic light` |
| `cinematic period-drama documentary still that breathes` | `Ken Burns documentary photograph — slow push into still image. Museum diorama photograph.` |
| Motion limitation implicit (via negative list) | Motion limitation **EXPLICIT** — a 1-2-3 numbered list of the only motions allowed, then "All other elements are completely frozen" |
| "alive but reverent" | "completely frozen still photograph" |

### Mandatory negative-prompt block (still required, but secondary defense)

```
candle flames flickering, candle flames moving, candle flames growing, candle flames growing larger, candle flames growing taller, candle flames shrinking, candle flames pulsing, candle flames pulsating, candle flames brightening, candle flames dimming, candle flames re-igniting, candle flames lighting up, candle flames appearing mid-clip, candle flames materializing, candle flames animating, candle flame size changing, candle flame shape changing, candle flame position shifting, candle wick wobbling, candles starting to burn, candles ignition, lamp brightening, lamp warming up, lamp glow intensifying, lamp glow growing, lamp ramping up, lamp turning on, lamp powering on, lamp glow shrinking, scene brightening over time, scene exposure ramping up, scene fade-in, overall fade-in, exposure pump, brightness pump, ambient warming over time, light source intensifying, light source dimming over time, light source pulsing, light source flickering, dramatic flicker, ambient flicker, scene-wide flicker, fireplace appearing, glow expanding
```

### Kling-specific panel settings to add on top

For Kling 3.0 specifically, the panel settings also matter:
- **Creativity / Relevance slider: MINIMUM (≈0.1)** — Kling's default creativity actively re-imagines flames as living
- **Motion intensity: MINIMUM** (or "None"/"Static" if available)
- **Camera control: Manual Zoom In at LOWEST intensity** — do not let the model improvise camera moves on top of an already-fragile still-life prompt

### Fallback plan if the Frozen Still-Life prompt still fails

Kling 3.0 has a fundamental bias toward animating fire/light. If three attempts with the Frozen Still-Life pattern still produce re-ignition, the problem is no longer the prompt — it is the model + reference combination. Two real fixes:

1. **Regenerate the reference image without the lit object visible.** Send back to image-prompt-engineer with the instruction to remove the flames (or render unlit candles, or remove the candle from the composition entirely). The model cannot animate flames it cannot see in the reference.
2. **Switch model for this specific clip.** Runway Gen-4 and Pika 2 are more conservative on flame physics. Generate the one problematic clip on a different model and accept the small stylistic break.

Do not keep regenerating on Kling with the same reference image and the same prompt — that is how user credit budgets get destroyed.

### What it looks like on screen

- Candle starts dim, flame grows over 2–3 seconds
- Lamp starts dark, intensity ramps up
- Fireplace glow pulses from nothing to full brightness
- LCD/CRT screen brightens from black
- Streetlamp warms up like a slow incandescent
- The whole frame brightens slightly across the duration (general "fade-in" artifact)

None of these are realistic for already-lit sources.

### Mandatory prompt clause for every lit-object frame

Whenever the start frame contains a lit light source, append this clause to the Action block of the prompt:

```
Lit-object continuity: All lit light sources visible in the start frame (candles, lamps, fireplace, screens, streetlamps, etc.) are already burning at the start of the clip and remain lit identically throughout — flame size, flame brightness, flame position, glow radius, and color temperature stay constant. They do NOT ignite, brighten, dim, grow, shrink, pulse dramatically, or re-light during the clip. Only the smallest natural micro-flicker is permitted on living flames (real wick wobble), not brightness modulation.
```

### Mandatory negative-prompt entries

Always include in the negative-prompt field:

```
candles re-igniting, candles lighting up, candle flames appearing mid-clip, candle flames materializing, candle flames growing, candle flames shrinking, candle flames pulsing dramatically, lamp brightening over time, lamp warming up, lamp glow intensifying, lamp glow growing, flame size changing, flame position shifting, light source intensifying, light source dimming over time, fireplace brightening, fireplace lighting up, dramatic flicker, screen brightening from black, streetlamp warming up
```

### Why this rule exists

A lit candle in a 19th-century interior is a **stable element of the scene** — the character lit it before the moment we are filming. Animating it as it lights up tells a different story than the script intends ("this is happening NOW") and breaks the documentary spell ("this already exists, we are observing it"). The same applies to lamps, fireplaces, screens, and any glowing object.

This rule is non-negotiable for every clip that contains a lit source in the reference image. Add the clause and negative entries by default — do not wait to encounter the artifact in a regenerate cycle.

Related: [[motion-vs-static]] (ambient micro-motion vs dramatic motion), [[physical-realism]] (light source physics).
