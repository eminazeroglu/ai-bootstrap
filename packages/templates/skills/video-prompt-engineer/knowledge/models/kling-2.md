# Kling 2.x — Video Model Knowledge

## Provider
Kuaishou (China)

## Type
Diffusion

## Strengths

- **Realistic human motion** (best in class for walking, gesturing)
- **Lip sync** is strongest among AI video models
- More complex motion supported than Veo
- Cinematic look with proper prompting
- 10-second clips supported
- Good with Asian features (and others)
- Image-to-video conversion

## Weaknesses

- No audio dependency (must add audio in post)
- Long takes lose consistency
- Western faces sometimes "Asian-leaning"
- Verbose prompts confuse the model
- Documentation primarily Chinese

## Best Practices

1. **Structured key-value format** — not natural language
2. Maximum 80-100 words (much shorter than Veo)
3. Cinematic style MUST be explicitly stated
4. Aspect ratio and duration as parameters, not prompt text
5. Image input supported and recommended
6. Lip sync mode for dialogue scenes

## Prompt Anatomy

```
Subject: [description]
Action: [motion description]
Camera: [shot type, angle, movement]
Setting: [environment]
Lighting: [setup]
Style: [cinematic notes]
Duration: Ns
```

## Sample Prompt

```
Subject: 35-year-old man, charcoal wool coat, standing by window
Action: slow head turn from right to left, looks toward door, no body movement
Camera: medium shot, eye-level, completely static, no camera movement
Setting: 1960s diner interior at night, rain visible through window
Lighting: warm tungsten key from ceiling + cool blue window backlight
Style: cinematic, melancholic mood, shallow depth of field, photorealistic
Duration: 6s
```

## Lip Sync Mode

For dialogue clips, Kling has dedicated lip sync. Provide:
- Audio file (or text-to-speech reference)
- Subject framed for face visibility
- Static or minimal camera

```
Subject: woman, 30 years old, dark hair, professional attire
Action: speaking the dialogue, natural facial expression matching emotion
Camera: medium close-up, static, eye-level
Lip sync to: "I never expected to see you here." [tone: surprised, soft]
Duration: 5s
```

## Avatar Mode (Kling AI Avatar — image + audio → talking video)

Researched 2026-06-15 from official sources: kling.ai, higgsfield, scenario, pollo.

### Inputs (required)

- **Image**: static character image (close-up or chest-up, front-facing, single subject)
- **Audio**: clean voice file (the actual speech to be lip-synced — NOT a text dialogue tag like in 3.0 dialogue mode)
- **Prompt**: short performance guidance (NOT full Veo-style scene description)

### Image requirements (strict)

- Front-facing or near-frontal (slight 3/4 OK)
- Face well-lit, eyes open
- **No heavy occlusions on the face** — hands at face level, microphones, sunglasses block lip-sync
- Hands at chest level (selfie pose) are acceptable as long as the mouth is fully visible
- Supports photoreal portraits, anime, illustration, stylized avatars

### Audio requirements

- Minimal background noise
- Clear pronunciation
- Conversational pace — extremely fast or slow speech sync poorly
- Supports speech AND singing
- Multi-language (works with Azerbaijani, Turkish, Russian, etc.)

### Prompt structure (concise — NOT long)

The prompt describes 3 things in order:

1. **Persona** — who they are (age, brief context)
2. **Expression** — concrete emotional descriptors (NOT "happy" → use "smiling warmly", NOT "angry" → use "brows furrowed, lips pressed tight")
3. **Motion style** — gestures, head movement, body language, camera behavior, pace, language

### Avatar prompt length (researched 2026-06-14 from official + production sources)

**HARD finding**: Kling does NOT publish an explicit character/word limit for the Avatar prompt field. Avatar is officially documented as "optional text prompt to influence background style, mood, or framing." The IMAGE carries the scene, the AUDIO carries the speech — the prompt is performance guidance only.

**Practical word-count guidance** (across all credible 2026 sources):

| Range | Quality | Risk |
|---|---|---|
| **<15 words** | Vague, model defaults to generic motion | High under-instruction |
| **15-40 words** | Optimal for image-to-video / Avatar (matches image-to-video sweet spot per VEED) | Low — production-safe |
| **40-80 words** | Acceptable, but every additional sentence is potential contradiction | Low-medium |
| **80-100 words** | Approaching ceiling — possible only if instructions don't conflict | Medium |
| **>100 words** | High failure risk — contradictory instructions, ignored fields, generation hangs | HIGH |
| **>150 words** | Strongly discouraged for Avatar/image-to-video mode | Very high |

**Production rule of thumb**:
- **Default target**: 40-60 words (persona + expression + motion + gestures + eyes + camera + language)
- **Hard cap**: 100 words
- **If close to 100**: cut redundancy — language tag, "static camera", and "pace" can be 1-2 words each

**Why short matters for Avatar specifically**:
- The IMAGE is the scene anchor — repeating scene details in the prompt is wasted tokens and risks contradicting the image
- The AUDIO is the speech anchor — describing what they say is wasted; only describe HOW they perform it
- Avatar Mode is performance direction, NOT scene-building (which is Veo/Sora territory)

### Sources (Avatar prompt length, verified 2026-06-14)

- [VEED — Kling AI Prompts Complete Guide 2026](https://www.veed.io/learn/kling-ai-prompting-guide) — image-to-video sweet spot 15-40 words (Avatar matches this category)
- [Kling AI Avatar 2.0 User Guide — kling.ai](https://kling.ai/quickstart/kling-ai-avatar-2-user-guide) — official: "optional text prompt"
- [VideoAI — Kling AI Prompt Length Guide](https://videoai.me/blog/kling-ai-prompt-length) — general production data, 100+ words = failure risk
- [ReelMind — Kling AI Prompt Character Limit](https://reelmind.ai/blog/kling-ai-prompt-character-limit-ai-for-artistry-limits) — confirms no published hard limit

### Avatar prompt anti-patterns (drop these to stay under 100 words)

| Anti-pattern | Why drop |
|---|---|
| Full setting/scene description | The IMAGE already carries this — repeating wastes tokens |
| Describing what they say | The AUDIO carries speech — prompt only describes performance |
| Multiple example phrases ("on word X they do Y, on word Y they do Z") | The lip-sync engine handles word-level timing; high-level performance guidance is enough |
| Repeating identity details (face, clothing) | The IMAGE locks identity — only mention persona context briefly (age, role) |
| Long camera explanation | Avatar is static-camera by design — one line max ("static, 9:16, chest-up") |
| Verbose language tag ("the audio is in Russian and Azerbaijani mixed market vendor pidgin which the lip-sync should handle smoothly") → "Russian-Azerbaijani mix" |

### Avatar prompt template

```
A [persona — age, identifier, brief context], [setting].

Expression: [concrete emotional descriptors — eyebrow movement, mouth shape on emphasis, micro-expressions on specific words].

Motion style: [head tilts, body lean, breathing, energy level — animated/restrained/calm].

Gestures: [hand position, micro-movements, whether hands stay raised or drop, gesture frequency].

Eyes: [locked on camera / off-camera / shifting].

Camera: [static / minimal pan / movement], [aspect ratio], [framing].

Pace: [conversational / slow / fast — matching the audio rhythm].

Language: [language of the audio for lip-sync].
```

### Avatar prompt example (real-world, AZ context)

```
A 45-50 year old Azerbaijani woman with a distinctive larger nose, in her home kitchen, on a video call.

Expression: speaking confidently and assertively, slightly defiant, eyebrows lifted on emphasis, mouth fully articulating each Azerbaijani word, occasional knowing micro-smile on pointed lines.

Motion style: animated but controlled — small natural head tilts and slight head shakes on rejecting phrases, subtle forward lean on emphasized declarations.

Gestures: right hand stays raised at chest level (selfie-holding position) throughout, with small finger-pointing or open-palm emphasis gestures, never dropping.

Eyes: locked directly on the camera the entire time — direct, confident, slightly proud gaze.

Camera: static locked-off frame (this is a selfie video call), 9:16 vertical, chest-up framing.

Pace: conversational, matching the natural rhythm of the Azerbaijani audio.

Language: Azerbaijani.
```

### Common Avatar mistakes

- Writing Veo-style scene descriptions (Kling Avatar wants performance guidance, not scene-building — the IMAGE provides the scene)
- Using generic emotional words ("happy", "sad", "angry") — use concrete physical descriptors
- Heavy face occlusion in input image (hand covering mouth = bad lip-sync)
- Noisy audio (background music in voice file = lip-sync drift)
- Pacing instructions that contradict the audio's actual rhythm
- Forgetting to specify the language

### Sources (verified 2026-06-15)

- [kling.ai/quickstart/ai-lip-sync-guide](https://kling.ai/quickstart/ai-lip-sync-guide)
- [Higgsfield — Kling AI Avatar](https://higgsfield.ai/blog/Kling-AI-Avatar)
- [Scenario — Kling Pro AI Avatar](https://help.scenario.com/en/articles/kling-pro-ai-avatar-the-essentials/)
- [Pollo AI — Kling Lip Sync guide](https://pollo.ai/hub/how-to-use-kling-ai-lip-sync)

## Image-to-Video

### Mode A — Start frame only
Provide first frame as reference image:
```
[Reference image: starting frame]
Action: subject begins to walk forward, then stops
Camera: static medium shot
Duration: 5s
```

### Mode B — Start + End frame (key Kling 3.0 feature)
Kling 3.0 has **native start-and-end-frame** support. Provide TWO reference images, model generates the transition. The most powerful continuity tool — director-decided per shot (CLAUDE.md "Video prompt qaydaları" #3).

**Use Mode B when:**
- Emotional arc (exhaustion → smile, neutral → reaction)
- Specific action endpoint (hover → tap, closed → open)
- Pose evolution (standing → bent → straight)
- Continuity bridge between sequential clips

**Kling UI / API:**
- Upload `start_frame` (first image)
- Upload `end_frame` (last image)
- Prompt describes the transition

**Prompt format:**
```
Start frame: [reference image — initial state]
End frame: [reference image — final state]
Action: gradual transition from start state to end state — describe HOW (timing, micro-motions, expression evolution)
Camera: [shot type, angle, movement during transition]
Setting: [environment — constant across both frames]
Lighting: [setup — constant]
Style: [cinematic notes]
Duration: Ns (typically 3-6s for clean transitions)
```

**Sample Mode B prompt:**
```
Start frame: woman bent forward, hands on knees, exhausted, no expression
End frame: same woman, same pose, but with a small genuine smile, eyes lifting toward horizon
Action: 0-1s: heavy recovery breath, no expression change. 1-2s: subtle softening at corners of mouth. 2-3s: smile emerges gradually, eyes lift. 3-4s: final state held.
Camera: close-up, 85mm, hand-held respired, very slow push-in (10cm closer over duration)
Setting: pre-dawn park trail, warming light, mist still hanging
Lighting: warming pre-dawn ambient, faint horizon rim on cheekbone
Style: cinematic Wieden+Kennedy documentary, photorealistic, authentic smile (NOT posed)
Duration: 4s
Aspect: 9:16
```

**Mode B best practices:**
- **Start and end frames must share environment** — same location, similar lighting, same subject (different expression/pose OK)
- **Describe transition as time-segments** — "0-1s: ..., 1-2s: ..."
- **Subject identity must remain consistent** — Kling 3.0 handles this well if both frames are clearly the same person
- **Camera move can happen during transition** — slow push-in, drift, etc., but keep simple

## Aspect Ratios

- 16:9, 9:16, 1:1
- Set as parameter, not in prompt text

## Common Mistakes

- Verbose natural language prose
- Including audio cues (Kling doesn't generate audio)
- Multiple camera movements
- Multiple actions in sequence

## Pricing tier
$$$ — moderate-high

## Speed tier
Slow — 1-3 minutes per clip
