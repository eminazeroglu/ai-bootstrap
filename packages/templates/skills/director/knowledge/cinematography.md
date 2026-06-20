# Cinematography Rules — Image Generation

> Core cinematographic principles for ALL image prompts. Loaded with every image generation request.

## MUST INCLUDE in every image prompt

1. **Shot type** (wide / medium / close-up / extreme close-up / over-shoulder / POV / establishing)
2. **Camera angle** (eye-level / low / high / dutch / overhead / Dutch tilt)
3. **Lighting setup** (key, fill, rim, practical sources)
4. **Aperture** (f/1.4, f/2.8, f/4 — depth of field control)
5. **Time of day / lighting condition** (golden hour, blue hour, tungsten interior, daylight)
6. **Color temperature reference** (warm/cool, kelvin if specific)
7. **Camera body + lens combo** (use camera-knowledge module)
8. **Aspect ratio** (16:9, 9:16, 1:1, 2.39:1)

## NEVER USE

- Generic adjectives: "beautiful", "stunning", "epic", "amazing"
- Unspecific scale: "big", "small", "tall"
- Mixed styles: "realistic anime", "photorealistic cartoon"
- Over-the-top adjectives that signal AI generation
- Emotion without anchor: "feeling sad" → use facial expression details instead
- Brand names that conflict with style

## STYLE NOTES

- Default: photorealistic, cinematic
- Always treat each image as a single frame from a film
- Prefer specific lens names (Cooke S4, Zeiss Master Prime, ARRI Signature)
- Specify film stock or sensor when relevant (Kodak Portra, Fuji Pro, ARRI Alexa color science)
- Use cinematography terminology, not photography hobbyist terminology

## PROMPT ANATOMY

Standard order:
```
[Subject] + [Physical Description] + [Action/Pose] + [Setting] + 
[Lighting] + [Camera Body + Lens + Aperture] + [Style/Mood Notes]
```

## CONSISTENCY ANCHORS (when reusing same subject across shots)

These MUST stay identical:
- Anatomical features (face, body type)
- Distinctive features (scars, glasses, accessories)
- Fitzpatrick skin tone scale value
- Hair (color, length, texture) — unless intentionally changed
- Voice description (for video)

These CAN vary:
- Clothing (outfit changes)
- Pose, expression
- Lighting context
- Setting

## SHOT TYPE DEFINITIONS

| Type | Frame | Use |
|------|-------|-----|
| ECU (Extreme close-up) | Eye, mouth, hand | Emotion peak |
| CU (Close-up) | Head and shoulders | Emotional reaction |
| MS (Medium shot) | Waist up | Dialogue |
| MWS (Medium wide) | Knees up | Action + context |
| WS (Wide shot) | Full body in environment | Establishing position |
| EWS (Extreme wide) | Tiny subject in vast environment | Scale, isolation |
| OTS (Over-the-shoulder) | Looking past one character to another | Conversation |
| POV (Point of view) | What character sees | Subjectivity |
| 2-shot | Two characters in frame | Relationship |

## OUTPUT FORMAT EXAMPLE

GOOD:
```
A 35-year-old Azerbaijani man, athletic build, short dark wavy hair,
green eyes, charcoal wool overcoat. Standing by a rain-streaked window
in a 1960s diner, melancholic expression. Warm tungsten light from
above creates rim on his shoulders, cool blue spill from window.
Shot on ARRI Alexa Mini LF with 50mm Cooke S4 at f/2.0, medium close-up,
eye-level, photorealistic, cinematic color grading.
```

BAD:
```
Beautiful man standing in cafe at night, sad mood, cinematic.
```

The first is generative-ready. The second produces generic AI output.
