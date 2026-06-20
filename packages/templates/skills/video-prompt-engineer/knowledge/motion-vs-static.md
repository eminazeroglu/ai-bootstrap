# Motion vs Static — Video Generation

> When to use static cameras vs movement. The most important creative decision in AI video, given current model limitations.

## Default: STATIC

For AI video in 2026, static camera is almost always the safer choice:
- Most stable output
- Lowest artifact risk
- All models excel
- Subject motion can still be present

## When STATIC is right

### Dialogue scenes
- Two people talking
- Single character monologue
- Voiceover with character listening

### Reaction shots
- Emotional close-ups
- Subject responding to news
- Face changing expression

### Atmospheric establishing
- Wide shot of location
- Subject placed in environment
- Subtle ambient motion (curtain, smoke)

### Product shots
- Hero product views
- 360 rotations should be done in post
- Static highlights texture and shape

### Contemplative moments
- Subject thinking, looking
- Lone figure in landscape
- Quiet moments

## When MOVEMENT is justified

### Following action
- Subject walking through space
- Tracking shot accompanying motion
- Camera follows the eye

### Revealing information
- Pan to reveal character
- Tilt up to reveal scale
- Dolly out to show context

### Building tension
- Slow dolly in on subject
- Push toward subject's eyes
- Crane down into scene

### Stylistic intent
- Music video aesthetic
- Documentary handheld
- Whip pans for energy

## Movement complexity ladder

From safest to riskiest:

### Level 1: Static (safest)
```
Camera: static, no movement.
```

### Level 2: Single slow movement
```
Camera: slow dolly in over 6 seconds, no other movement.
```

### Level 3: Single medium movement
```
Camera: pan right 45° following subject's gaze.
```

### Level 4: Combined movement (risky)
```
Camera: subtle handheld tracking shot following subject walking.
```

### Level 5: Complex (failure-prone)
```
Camera: crane down combined with slow pan and gradual zoom in.
```

Don't go above Level 3 unless you understand the model's limits.

## Subject motion within static frame

A static camera doesn't mean a static scene. Subject can:
- Move within frame
- Enter/exit frame
- Change pose
- Express emotion
- Interact with props

Static camera + subject motion = most successful AI video formula.

## Movement direction guide

### Camera moves IN (dolly/zoom in)
- Increases intimacy
- Builds tension
- Focuses attention
- "Coming closer to truth"

### Camera moves OUT (dolly/zoom out)
- Increases context
- Releases tension
- Reveals isolation
- "Stepping back from intensity"

### Camera moves UP (crane/tilt up)
- Reveals scale
- Hopeful/aspirational
- Subject becomes smaller
- Heavenward / future

### Camera moves DOWN (crane/tilt down)
- Lowers status
- Defeated / grounded
- Earthbound / reality
- Subject becomes accessible

### Camera moves LEFT or RIGHT (pan/track)
- Following action
- Comparing two things
- Westward (left) tends to feel like ending
- Eastward (right) tends to feel like beginning

## Prompt phrasing

### For static
```
Camera: completely static, no movement.
```

### For dolly in
```
Camera: medium shot at start. Slow dolly in over the duration of the
clip, ending in close-up. No pan, tilt, or zoom — only forward
movement.
```

### For tracking
```
Camera: medium shot. Tracks right alongside the subject as they walk,
maintaining same distance and framing throughout.
```

### For crane up
```
Camera: starts at eye-level. Slowly cranes up over 6 seconds, ending
in high-angle bird's-eye view of the scene below.
```

## Decision checklist

Before adding movement, ask:
1. Does the scene require it? (or is it tradition/habit?)
2. Will the model handle this movement reliably?
3. Is the duration enough for the movement to feel natural?
4. Will subject motion suffice instead?
5. Can I add this in post (zoom in editing)?

If answer to any is doubtful → use static.

## Default for AI video

When unsure: **static**. Always.

---

## Ken Burns archive / photo-doc — interpreting "frozen photo" cues correctly

When a script says **"frozen photo"**, **"still photograph"**, **"donmuş zaman"**, **"the image is not alive"**, or similar poetic cues, this is **NEVER a literal taxidermy command.** Do not write a prompt that forbids breathing, blinking, fabric in wind, animal life signs, or natural ambient motion. A scene with zero subject motion looks like a CGI freeze-frame, not an archival photograph, and breaks the documentary spell the script is trying to create.

### What "frozen photo" actually means in documentary grammar

The Ken Burns / Adam Curtis / Errol Morris tradition has a precise meaning for this:

| Yes (preserve) | No (avoid) |
|---|---|
| Camera as primary motion (slow push, pan, tilt) | Subject driving the narrative through action |
| Natural micro-life (breath, blink, hair, fabric, ambient sway, light flicker) | Dramatic action (running, gesturing, shouting, turning to camera) |
| Subjects continuing what they were already doing (walking, waiting, looking) | Subjects changing what they're doing mid-clip (sudden gestures, reactions) |
| Soft ambient motion (dust in light, breeze, drifting smoke) | Acted "events" that didn't exist in the still frame |
| Animals breathing / shifting weight / swiveling ears | Animals bolting, rearing, walking out of frame |
| Pedestrians continuing to walk at their original pace | Pedestrians stopping, turning back, addressing the camera |

The script's intent is observational stillness — the world keeps existing, but no one performs for the camera. **Life continues; drama doesn't.**

### Prompt phrasing for "frozen photo" cues

GOOD — preserves the breath of life:
```
Action — natural observational life, no drama, no camera awareness:
- The horse breathes gently, shifts weight, mane catches the breeze
- The driver sits with the reins, glances down the street once
- Distant pedestrians continue walking at the same calm pace
- A curtain stirs in a window, dust drifts in the backlight
- The lantern flame flickers softly

Camera: very slow continuous push-in. No subject performs for camera.
```

BAD — kills the scene (literal interpretation):
```
NO subject motion of any kind. The horse does not breathe, blink, or shift.
The driver does not move. Pedestrians remain locked in mid-stride. No fabric
flutter, no dust, no wind, no flame flicker. This is a still photograph;
only the camera moves.
```

The "BAD" version is what an inexperienced prompt writer produces when they translate "frozen photo" word-for-word. It looks dead on screen.

### When literal full-freeze IS correct

There are exactly two cases where every subject must be truly motionless:

1. **Photo of a photo** — the camera is filming a printed photograph hanging on a wall, lying on a table, or being held in hand. The photograph is an object inside the scene; objects don't move.
2. **Title-card / typography / inanimate-only frames** — manuscript pages, documents, signs, statues with no living subject in frame.

For frames containing living subjects (people, animals) in an archival aesthetic, micro-life is mandatory, not optional.
