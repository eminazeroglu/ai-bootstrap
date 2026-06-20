# Subject Motion — Video Generation

> How subjects (people, animals, objects) should move in video prompts. AI models handle motion very differently from static images.

## Motion types

### Subtle motion (RECOMMENDED for stability)
- Breathing
- Blinking
- Slight head turns
- Hair movement in wind
- Fabric rustle
- Eyes shifting

These work reliably in ALL AI video models.

### Moderate motion
- Walking
- Standing up / sitting down
- Reaching for object
- Turning whole body
- Talking (lip movement)
- Pouring liquid
- Opening door

Most models handle these but watch for artifacts.

### Complex motion
- Running
- Dancing
- Fighting
- Jumping
- Throwing
- Multi-person interaction
- Sports

Risky — models often produce distortions, weird limb behavior.

### Extreme motion
- High-speed action
- Acrobatics
- Vehicle stunts
- Crowds in motion

Avoid unless using Sora or Veo for short clips with careful prompting.

## Motion description language

### USE ACTION VERBS WITH MODIFIERS

GOOD:
```
She slowly turns her head from right to left, eyes scanning the room.
```

GOOD:
```
He gradually raises his hand to his face, fingers brushing his temple.
```

BAD:
```
She moves her head.    // Too vague
```

BAD:
```
He does a thing.       // No specificity
```

### USE "BEGINS TO" FOR NATURAL TIMING

GOOD:
```
She begins to walk slowly toward the door, taking three measured steps.
```

This gives the model timing cues — start state, action, end state.

### SPECIFY START AND END STATE

GOOD:
```
Starting position: standing still, hands at sides, looking forward.
Action: slowly turns head 45° to the left, eyes following.
End position: head turned, looking off-screen left, body still facing forward.
```

This gives clear motion vector.

### AVOID INSTANT TRANSITIONS

BAD:
```
He walks across the room.    // No timing — model guesses
```

GOOD:
```
He takes 3 slow steps across the room over the duration of the clip.
```

## Lip sync notes

If subject is speaking:
- Kling 2.x has best lip sync
- Veo 3.1 is acceptable
- Most others: avoid showing speaking from front (use OTS or back)

For dialogue:
```
Camera: medium shot from front
Subject speaks slowly, calmly: "I waited for you."
Lip movements should match this dialogue.
```

## Multi-subject motion

When two subjects move together:
- Specify each independently
- Specify spatial relationship
- Specify timing relationship

```
Subject A (left of frame) raises her hand in greeting.
Subject B (right of frame) responds by stepping forward and nodding.
Action timing: A's gesture begins first, B responds 1 second later.
```

## Physics constraints

AI models struggle with:
- Defying gravity
- Object permanence (object disappearing)
- Mass/weight realism (light vs heavy objects move similarly)
- Liquid dynamics (water, fire are tricky)
- Rapid acceleration

Use motion within natural human range.

## Default for AI video

When unsure: **minimal motion**. A subtle breath + slight head turn is more reliable than complex action.

---

## Director thinking — actions are AUTHORED, not extracted

The video-prompt-engineer is not a passive interpreter of the script. The script gives the **frame** (location, mood, characters, camera intent). The **specific actions inside the frame are the director's decision** — and in the AI pipeline, the prompt writer IS the director.

This means: if the script says "an old Baku street, a parked carriage, a man on it, two distant pedestrians" — it is **not enough** to write "the driver does something." You must decide, as a director:

- **What is this character doing in this moment?** (waiting for market, returning from work, dropping off a passenger, just arrived)
- **What is the inner story of the frame?** (a city waking up, an evening winding down, a moment before something changes)
- **What concrete physical action shows that inner story?** (adjusting his cap against the chill, glancing down the street, lighting a pipe, checking a pocket watch)
- **What does the animal do in this moment?** (resting head down, alert with ears forward, drinking from a trough, standing patiently)
- **Why are the pedestrians walking down this street?** (residents going to work, mother and child returning home, two merchants in quiet conversation)

Every prompt must carry a **specific, authored moment** — not a vague checklist of "natural motion." Vague prompts produce vague clips that feel like stock footage. Authored prompts produce clips that feel like cinema.

### How to author the moment

For every frame, write a one-line **inner story** before writing the action list:

```
Inner story: a quiet street wakes up at dawn — the man with the cart is
waiting for market, the city is yawning into the day, light is climbing.
```

Then derive every action from that inner story:

- The man's action **expresses** waiting + dawn (cap adjust against chill, long look toward the light)
- The horse's action **expresses** patience + early morning (head low, weight shift, ear swivel)
- The pedestrians' action **expresses** unhurried morning (calm walk, quiet conversation)
- The environment's action **expresses** awakening (curtain stirs in opened window, lantern flame thinning in daylight, dust in golden light)

Every action serves the inner story. Nothing is generic.

### What to refuse in the brief

If you receive a brief that only says "subject moves naturally" or "make it feel alive" — **push back**. Ask the script writer / director persona what the inner moment is, or, if you are the director in the pipeline, decide it yourself and state your decision in the AZ description. Do not generate a prompt with unauthored, generic motion.

---

## Forbidden actions need a real reason — never write groundless prohibitions

When you write `the horse does not step, the driver does not turn his head, the pedestrians do not stop walking` — every one of those negatives must answer the question **"why?"** with a real, story-grounded reason. If you cannot answer it, you are not directing — you are restricting blindly.

### The two prohibitions are universal — everything else needs justification

In observational documentary grammar, only two prohibitions apply by default to every subject:

1. **No direct camera awareness** — characters do not look at the camera, wave at it, perform for it, or break the fourth wall. The camera is observing; subjects do not know it is there.
2. **No anachronistic / modern behavior** — period subjects do not check phones, make modern gestures, wear modern clothing, ride in cars not yet invented.

Beyond these two, every additional "subject must not do X" needs a story reason:

| Restriction | Valid reason (allow) | No reason (drop the restriction) |
|---|---|---|
| Horse does not bolt | Yes — bolting would tear the carriage out of frame, breaks composition | — |
| Horse does not step at all | Where's the reason? Horses shift weight constantly. **DROP** |
| Driver does not dismount | Yes — dismounting changes the staging, leaves an empty bench | — |
| Driver does not turn his head | Where's the reason? Real humans look around. **DROP** |
| Pedestrians do not stop | Yes — they're walking past, stopping would make them a focal point | — |
| Pedestrians do not breathe | Where's the reason? They're alive. **DROP** |

### The reflex to "lock everything down" is wrong

A common failure mode: the prompt writer reads a poetic script line ("frozen time", "still photograph", "the world holds its breath") and reflexively writes a wall of negatives that turn every living subject into a statue. The result on screen is dead: a CGI freeze-frame, not a documentary.

The right reflex is the opposite — **start from "everything is alive"** and only forbid what would genuinely damage the story (camera awareness, dramatic action that doesn't fit the inner moment, anachronism). Everything else stays.

### Audit your own prompt

Before you ship a prompt, read every negative line and ask: **"If I delete this restriction, what bad thing happens on screen?"**

- If you can name a concrete bad outcome → keep the restriction
- If your answer is "I don't know, I just felt like it shouldn't move" → delete the restriction

This audit will cut 50–70% of the negatives in a typical first draft, and the resulting prompt will produce a clip that feels alive instead of taxidermied.
