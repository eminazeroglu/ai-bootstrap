# Composition — Image Generation

> How subjects are arranged in frame. Critical for cinematic feel.

## Core composition rules

### Rule of Thirds
Divide frame into 3x3 grid. Place subjects on intersections, not center.
- Eyes typically on upper third line
- Horizons on upper or lower third (not middle)

### Leading Lines
Use lines (roads, walls, light beams) to direct eye to subject.

### Framing within frame
Use doorways, windows, foreground objects to frame subject.

### Negative Space
Empty space around subject creates isolation, mood, scale.

### Symmetry vs Asymmetry
- Symmetry: formal, eerie, controlled (Wes Anderson, Kubrick)
- Asymmetry: dynamic, natural, tension

### Depth Layering
Foreground + Midground + Background creates 3D feel.

**For multi-figure / crowd scenes — MANDATORY depth distribution** (see `character-anatomy.md` "HARD RULE — Directorial Realism Density" for the full rule): never cluster all figures on one plane. Distribute across 3 layers — **FG hero figures** (2-4, full facial detail, the scene's protagonists) + **MG support figures** (2-5, contextualising roles like a vendor, a horseman, a teacher at a doorway, smaller in frame, less detail) + **BG silhouette figures** (2-6+, atmospheric "life continues" presence, near-silhouette, no face-quality concern). A real wide shot of a busy period public space typically lands at 8-14 total figures across these 3 layers; theatre/parade/bazaar scenes can exceed 50+ because BG silhouettes absorb the count with no AI face-quality penalty. Same-plane crowds (all figures at one depth) read as posed/staged and collapse face quality — always redistribute in depth.

## Headroom & Lookroom

- **Headroom**: space above head (not too much, not cropping)
- **Lookroom/Noseroom**: space in direction subject is looking
- **Leadroom**: space ahead of moving subject

## Camera angles

### Eye-level
Neutral, default. Audience equal to subject.

### Low angle (looking up)
Subject powerful, dominant, heroic, threatening.

### High angle (looking down)
Subject vulnerable, small, weak, submissive.

### Bird's eye / Top-down (90° from above)
Detached, godlike, scale, geometry emphasis.

### Dutch angle (tilted)
Tension, unease, drunk, off-balance, psychological disturbance.

### Worm's eye (extreme low)
Heroic monumental, towering subject.

## Framing types (recap from cinematography)

- ECU, CU, MS, MWS, WS, EWS, OTS, POV, 2-shot

## Aspect ratio composition tips

### 16:9 (landscape standard)
- Horizontal balance
- Subjects positioned thirds-based
- Headroom and lookroom standard

### 9:16 (vertical for mobile)
- Subject vertically centered or upper-third
- Leave bottom for UI overlays (caption, music)
- Avoid crucial detail at very top/bottom

### 1:1 (square)
- Subject centered
- Strong negative space
- Symmetry-friendly

### 2.39:1 (cinemascope)
- Wide horizontal real estate
- Negative space possible
- Anamorphic feel

## Composition phrases for prompts

- "Subject offset to right-third with empty leadroom on left"
- "Symmetrical composition, subject centered"
- "Low angle from below, subject dominates frame"
- "Foreground bokeh frames midground subject"
- "Dutch tilt 15° clockwise creates tension"
- "Negative space above subject emphasizes isolation"

## DON'T

- Don't say "well-composed" without specifying how
- Don't center every subject by default
- Don't crop subjects awkwardly (mid-knee, mid-forehead)
- Don't ignore where subject is looking

---

## 🔴 HARD RULE — CINEMATIC LIVED MOMENTS, never posed group photos

**Every cell must feel like a LIVED MOMENT observed by a fly-on-the-wall camera from inside the era.** NEVER a posed group portrait. Even when the script reads "archive photo" or "group portrait," the underlying CELL has natural blocking, mid-action subjects, and cinematic depth — the **sepia / archive feel is applied in post** (see `color-grading.md` HARD RULE on cells in full colour).

### Director's pre-prompt mindset (5 steps — mandatory before writing the cell)

1. **Read the script** — what is this moment's essential meaning? What is the audience supposed to feel?
2. **Interpret screenwriter's intent** — why this composition? What is the dramatic purpose?
3. **Analyse the location** — how did this place actually work? What was the natural daily flow of people, light, sound? Where do bodies naturally cluster, where do they pass through?
4. **Choose observer position** — where are WE (the camera) standing in the scene? At what eye level? Why from there and not elsewhere?
5. **Choose mid-action moment** — what specifically is happening at this exact second? Subjects in motion verbs ("crossing," "leaning," "adjusting," "turning toward"), not static states ("standing," "posing," "looking at camera").

### Natural blocking rules

- **NOT** all subjects facing camera
- **NOT** symmetric arrangement (no three-row choir formation, no row of soldiers at attention)
- **3/4 angles preferred** over frontal
- Some subjects **unaware of camera**; at most one or two **briefly aware** (and even then mid-glance, not posed)
- **Imperfection is essential** — one fidgets, one adjusts clothing, one looks elsewhere, one bends down to pick something up, one is mid-yawn, one whispers to a neighbour. Natural human chaos. Real lived bodies in real lived space.

### Language to AVOID in prompts

- "posed for formal portrait"
- "standing at attention"
- "all looking at camera"
- "symmetric arrangement"
- "stiff stillness"
- "lined up neatly"
- "row of [subjects]"
- "formal group photograph"

### Language to USE in prompts

- "caught mid-X" (mid-stride, mid-laugh, mid-glance, mid-pour)
- "one looking at Y, two others at Z, the rest unaware of the camera"
- "natural variation in posture — some leaning, some upright, some half-turned"
- "we observe from across the courtyard / from the back of the hall / from behind a pillar"
- "subjects unaware of the camera"
- "asymmetric clustering — three near the window, two by the door, one alone in the foreground"

### Special case — script says "archive photograph" / "old newsreel" / "B&W still"

The underlying cell is still a **natural lived moment**. The sepia / monochrome / vignette / grain that sells the "archive" feel is applied in **post-production** in the video editor's LUT chain (see `color-grading.md` HARD RULE on cells in full colour). Do NOT generate the cell as a stiff posed studio portrait merely because the script labels it "archive."

### Pairing with other hard rules

This rule **multiplies** with two others — they only work together:

- **FACE DIVERSITY** (`character-anatomy.md`) — varied blocking naturally produces varied faces; cloned faces and posed formations always co-occur
- **PERIOD + PLACE COSTUME RESEARCH** (`character-anatomy.md`) — once you know who was actually in the room, the natural blocking writes itself (gender separation rules, social hierarchy, who clusters with whom)

### Cross-references

- `cinematography.md` → "Director's pre-prompt mindset" (full version with shot-list integration)
- `character-anatomy.md` → "Face diversity" + "Period + place costume research"
- `image-validator/knowledge/script-consistency-checks.md` — "posed vs lived" is a Qat B checkpoint

**Origin:** 2026-05-21, 28-may documentary k.4 — schoolgirls cell was initially written as a stiff symmetric three-row formation posed straight at the camera. User feedback: "Burda elə bil yığılıb şəkil çəkdirirlər. Bütün kadrlarda sanki biz o dövrün içindəymişik kimi kənardan baxırıq belə olmalıdır." Rule promoted to universal toolkit knowledge.
