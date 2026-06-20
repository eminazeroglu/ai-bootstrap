# Character Anatomy — Image Generation

> How to describe humans for consistent, photorealistic generation across multiple prompts.

## MANDATORY anatomical attributes

For every character, specify ALL:

### 1. Age (specific number)
- ❌ "young", "middle-aged", "old"
- ✅ "25-year-old", "42", "67"

### 2. Ethnicity / Origin
- Be specific: "Azerbaijani", "Korean-American", "Brazilian"
- Avoid generic: "white", "Asian"

### 3. Body Type
- Athletic / lean / muscular / heavy-set / petite / tall slim
- Specify height when relevant: "5'11", "6'2"

### 4. Hair
- Color: dark brown, blonde, jet black, salt-and-pepper
- Length: cropped, shoulder-length, waist-length
- Style: straight, wavy, curly, braided, undercut, buzz cut, pixie cut

### 5. Eye Color
- Brown, blue, green, hazel, amber, grey

### 6. Distinctive Features (essential for recognition)
- Scars, freckles, moles, birthmarks
- Glasses (style: round, square, aviator)
- Tattoos (location only, not full design)
- Beard / mustache (style)

### 7. Skin Tone (Fitzpatrick scale 1-6)
- Type 1: very pale (rare burn, never tan)
- Type 2: pale (often burn, lightly tan)
- Type 3: light medium (sometimes burn, gradually tan)
- Type 4: olive medium (rarely burn, easily tan)
- Type 5: brown (very rarely burn, very easily tan)
- Type 6: dark brown / black (never burn, deeply pigmented)

## CONSISTENCY ANCHORS

These MUST stay identical across all generations of same character:
- Age
- Ethnicity
- Body type, height
- Hair color, length, style (unless intentionally changed)
- Eye color
- Distinctive features
- Skin tone

These CAN vary:
- Outfit / wardrobe
- Pose, expression
- Lighting / setting
- Hairstyle (if minor: tied vs loose)

## Outfit description

### Layers
- Coat / Jacket type (wool, leather, denim, blazer)
- Shirt / Top (cotton, silk, knit; collar style)
- Pants / Skirt (slim-fit, baggy, tailored)
- Shoes (oxford, sneaker, boot, heel)
- Accessories (watch, scarf, glasses, hat)

### Colors and conditions
- Specific colors (charcoal grey, deep navy, burgundy)
- Condition (crisp, wrinkled, distressed, faded)

### Cultural context
- Be aware of cultural specificity
- Avoid stereotypes
- Be authentic

## Expression vocabulary

Avoid generic:
- ❌ "happy", "sad", "angry"

Use specific:
- ✅ "subtle smile, eyes warm"
- ✅ "brow furrowed, lips pressed tight"
- ✅ "eyes wide, mouth slightly parted in surprise"
- ✅ "gaze averted, jaw set"
- ✅ "vacant stare, slack expression"

## Pose vocabulary

- Neutral standing: weight on one leg slightly, hands relaxed
- Defensive: arms crossed, slight lean back
- Confident: chin up, shoulders square, hands on hips
- Vulnerable: shoulders rounded, hands clasped
- Action mid-stride: leading leg bent, opposite arm forward

## Sample full description

```
A 35-year-old Azerbaijani man, athletic build, 5'11" height, short
dark wavy hair, green eyes, clean-shaven with subtle stubble,
Fitzpatrick scale 4 skin tone, small scar above right eyebrow.
Wearing a charcoal grey wool overcoat, dark navy slim-fit trousers,
black leather oxford shoes, plain white cotton shirt. Standing in
neutral pose, hands relaxed at sides, weight slightly on left leg,
melancholic but composed expression with eyes warm and lips slightly
parted, looking forward at camera.
```

## DON'T

- "Beautiful woman" — not specific
- "Handsome man" — same
- "Young person" — vague
- "Asian" — too broad
- "Tall" without context
- "Wearing nice clothes"
- "Smiling" without facial detail

---

## 🔴 HARD RULE — FACE DIVERSITY in multi-figure cells

**AI image models default to a single "face template" replicated across all figures in a group**, producing clone-like results — every schoolgirl with the same nose, every soldier with the same jawline, every audience member with the same eyes. This is one of the most common and most damaging realism failures in any multi-figure shot.

**Every multi-figure prompt MUST explicitly demand individual facial variation across the following dimensions:**

| Dimension | Required variation |
|---|---|
| Face shape | mix of oval / round / square / heart-shaped / long across the group |
| Eye placement, size, shape | vary spacing, lid heaviness, almond vs round vs hooded |
| Nose shape | vary length, bridge profile (straight / aquiline / button / wide), nostril width |
| Mouth shape | vary lip fullness, width, philtrum depth, natural resting expression |
| Complexion | subtle variation within the stated ethnicity (not a uniform skin tone) |
| Hair | colour + texture variation within the ethnic range (not all jet-black or all chestnut) |
| Age | distinct ages within the stated range (in a "8-10 year-olds" group, render 8 / 9 / 10 visibly) |
| Body type | varied heights, builds, postures (no two siblings the same silhouette) |
| Individual markers | freckles, slight asymmetries, moles, a small scar, a chipped tooth — micro-difference per face |
| Expressions | varied micro-emotions (one curious, one bored, one alert, one daydreaming) — not all "neutral" |

### Mandatory anti-clone clause

Every multi-figure prompt must contain a version of this clause near the subjects block:

```
Each face is a different individual — different face shape, different eye spacing,
different nose, different mouth, different complexion shade within [ethnicity],
different hair colour/texture within the ethnic range, distinct ages within
the stated range, varied micro-expressions. NO repeated face template.
NO identical faces. NO cloned siblings. Each subject is a unique person.
```

### Detection during validation

- Scan every visible face at 100% zoom; compare faces side-by-side
- **2+ similar faces in the same frame = ❌ regenerate** (no exceptions)
- Especially scrutinise: groups of women, groups of children, uniformed groups (school classes, military rows, choirs, nurses) — AI is most prone to template-clone these
- Pair this check with the lived-moments rule in `composition.md` (varied micro-expressions naturally come from varied blocking)

### Cross-references

- `composition.md` → "Cinematic lived moments" (varied expressions ↔ varied blocking)
- `image-validator/knowledge/physical-realism-checks.md` § A5.x (anatomy)
- `image-validator/knowledge/script-consistency-checks.md` (period+place research drives ethnic mix per scene)

**Origin:** 2026-05-21, 28-may documentary — first multi-figure cell (k.4 schoolgirls) rendered four identical face templates across the formation. Rule promoted to universal toolkit knowledge.

---

## 🔴 HARD RULE — MANDATORY period + place costume research per kadr

**Before writing any kadr prompt that contains people, research the SPECIFIC year + place + social context.** Never generalise from "1900s" or "early 20th century" or "Soviet era" — research the **exact** year, the **exact** city, the **exact** event (e.g. 1908 Baku Mailov Theatre opera premiere, OR 1919 Paris Peace Conference reception, OR 1995 Baku presidential office). Costume, ethnic composition, and social rules differ by decade, by city, by gender, by class, by event.

### Pre-prompt research checklist (mandatory before writing prompt body)

1. **Concrete year + place** — not "early 20th century", not "Caucasus region". "1908 Baku" or "1919 Paris" specifically.
2. **Ethnic composition** of the audience / gathering at that specific year + place — what percentage of attendees were of each ethnic group? (e.g. 1908 Baku public opera audience ≠ 1908 Tbilisi audience ≠ 1908 Istanbul audience).
3. **Period-correct dress** per ethnic group × social class × gender × age — a 1908 Azerbaijani merchant's wife dressed differently from a 1908 Azerbaijani peasant woman; both differed from Russian or Armenian women in the same hall the same evening.
4. **Event-specific nuance** — premiere vs daily wear, political event vs casual gathering, religious occasion vs secular. Same person dresses differently for each.
5. **Social rules of the era** — gender separation rules, religious observance (head-covering customs, beard codes), seating conventions, who attends what.

### Required research tools

- **WebSearch + WebFetch** for archive photographs (primary source — actual period photos beat textual descriptions)
- **Wikipedia** for outline (necessary but **insufficient alone** — text descriptions miss visual nuance)
- **Academic / museum sources** when available (costume history books, ethnographic archives, period press)
- **Real archive photographs** are mandatory — text alone is not enough. Without a real photo, the model defaults to Hollywood-period-drama generic.

### Knowledge loop

Every research discovery becomes one of:
- A **project-specific memory file** (e.g. "1908 Baku audience ethnic mix and dress" → project memory, since it's about that one scene)
- A **toolkit knowledge update** (e.g. "city electrification dates" → universal, added to `image-prompt-engineer/knowledge/physical-realism.md` § A9.7)

This rule is paired with the **mandatory-research-and-honesty** rule in user memory: never fabricate or skip research; never claim research that wasn't done.

### Cross-references

- `physical-realism.md` § A9.x — verified period-specific tables (electrification, state symbols)
- `image-validator/knowledge/script-consistency-checks.md` — period accuracy is a Qat B checkpoint
- `composition.md` → "Cinematic lived moments" (research feeds the natural blocking, who-stands-where reflects social rules of the era)

**Origin:** 2026-05-21, 28-may documentary k.3 — audience kadr was initially generated without ethnic-mix or period-dress research. User demanded the rule be universalised across all future kadrs containing people.

---

## 🔴 HARD RULE — ANTI period-grit stereotypes (clean by default)

**Never add "Hollywood period-grit" stereotype details** (ink-stained writer hands, dusty pinafores, soot-smudged children, sweat-stained collars, coal-blackened miner fingers, tear-streaked dirty child faces) to a cell prompt **just to make the scene look "period-authentic."** Historical people kept themselves clean and presentable — **even when working with messy materials** (ink, charcoal, paint, coal, flour, grease). The "grimy peasant / ink-fingered writer / soot-faced urchin" trope is a 20th-century cinema invention, not a historical fact.

**Why this matters:**
- Writers — especially academics and intellectuals — knew how to handle a pen; permanently ink-stained hands were rare, not the norm
- Manual workers washed thoroughly after a shift and posed for photos in clean Sunday clothes
- Children in formal/family photos were kept clean and presentable by their parents
- Teachers, students, deputies, clerks, merchants — all dressed and groomed to the dignified standards of their era (often different from today, but not lower)

Adding grit by default **demeans the historical subject**, implying they didn't know cleanliness. They did — to their era's standards, which were rigorously upheld in any depicted moment that has social/public/family weight.

### YES / NO examples

| ❌ AVOID (default period-grit stereotype) | ✅ USE INSTEAD |
|---|---|
| "ink-stained fingertips of a working writer" | "clean hands of an experienced writer who knows how to handle a pen" |
| "dusty white pinafore hem from the morning street" | "white starched cotton pinafore, fresh and cared-for" |
| "soot smudge on his cheek from the engine" | "clean face, his work coat carefully removed before this moment" |
| "coal-blackened hands of the miner" | "the miner has just bathed after his shift — hands clean, posing in his Sunday best" |
| "sweat-stained shirt collar" | "neat collar, slightly worn at the edge from daily use" (lived-in YES, gross-dirty NO) |
| "tear-streaked dirty face of the child" | "the child's face is composed but the eyes show recent emotion" (psychological depth YES, physical dirt NO) |

### When grit IS appropriate (rare, scene-specific)

Grit details are added **ONLY when the SPECIFIC scene context demands it** — never as default "period authenticity" decoration. Allowed cases:

- ✅ Scene shows a **mid-work active moment**: baker actively mid-knead with flour on apron, blacksmith mid-strike at forge with soot on forearm, farmer mid-harvest with dirt on boots
- ✅ Narrative requires it: post-battle soldier face, refugee fleeing fire, accident aftermath
- ✅ User explicitly requests it for deliberate emotional impact (e.g. "dirty-faced refugee child")

In every other context — formal moment, family scene, work pause, public gathering, signing, meeting, portrait, walk, conversation — **default to clean, dignified, presentable**.

### Self-check before submitting any prompt mentioning hands/face/clothing condition

Ask: **"Is this grit detail REQUIRED by the specific scene context, or am I adding it just to achieve a 'period look'?"**
- If the second → **DELETE**.
- If the first → keep it, but pair with the explicit triggering action (mid-knead, post-battle, etc.) so the model understands WHY the grit is there.

### Detection during validation

- Scan each person in frame for unmotivated dirt/stain/wear on hands, face, collars, hems
- For each grit element found, identify the scene trigger that justifies it
- No trigger → ❌ regenerate with clean default

### Cross-references

- `composition.md` → "Cinematic lived moments" (lived-in ≠ dirty; natural blocking + dignified appearance)
- `image-validator/knowledge/physical-realism-checks.md` § A5.9 — anti-period-grit validation checkpoint
- `mandatory-period-costume-research` rule above — period-correct clothing IS dignified and cared-for, not visibly worn-down
- User memory: `anti-synthetic-photoreal` (imperfection vocabulary refers to lived-in materials, NOT bodily filth on people)
- User memory: `lighting-technology-timeline` (pair with this when researching whether a "grimy era" stereotype even applies to the actual year/place)

**Origin:** Rule established 2026-05-21 after a period kadr prompt described a writer with "ink-stained fingertips" as default period-flavour. User: "don't give people ink-stained hands — even in eras when people worked with ink, their hands could be normal/clean." Universalised across all AI creator projects: Hollywood period-grit is a universal AI image-generation failure mode, not a one-project quirk.

---

## ⚠️ HARD RULE — Directorial Realism Density (figure count per kadr)

**Every wide/establishing/crowd cell MUST declare figure count based on what a REAL DIRECTOR standing in that scene's exact era + place + time would actually see — distributed in depth across foreground / midground / background.** Never pick the minimum count "to protect AI face quality." Never pick the maximum count "for impact." Both are failure modes.

### The principle (think like a director on set)

A director walking onto a real period set does NOT count to a safe number. They look around and ask: *"At this hour, in this place, in this era — who is actually here? Why is each person here? Where would the camera naturally observe them from?"* Every figure is placed for a reason; the crowd is distributed across depth because real life is never one flat plane.

The two failure modes both come from ignoring real density:

| Failure mode | Result | Cause |
|---|---|---|
| **V1 — too many in same plane** (~14 figures clustered at one depth) | Chaotic frame, AI face quality collapses, crowd reads as "stock crowd," not lived moment | Stuffing impact into one plane |
| **V2 — too few** (~5-6 figures, sterile) | "Staged-empty" feel, like a film set with extras absent, period reality broken | Over-correcting V1 by capping count |
| **V3 — correct: depth-distributed real density** (10-14 total, split FG/MG/BG) | Lived period moment, faces stay sharp where they need to (FG), atmosphere reads (BG silhouettes) | Director-realism thinking |

### Step-by-step: how to apply (director-on-set mindset)

**Step 1 — Real context analysis** (ask yourself, before writing the figure list):

1. **What hour is it?** Early morning / mid-morning / lunch / afternoon / evening / night?
2. **What is the NORMAL density for this place + this hour + this era?** (use the table below as anchor)
3. **Why is each person here?** Every figure must have a reason — going to work, walking a child, running an errand, posted at a doorway, passing through. If you can't name the reason, cut the figure.
4. **How will they be distributed in depth?** Never all on the same plane — distribute across 3 layers.

**Step 2 — Distribute in depth (critical — see Step 3 for the 3-layer model).**

**Step 3 — Match count to scene type** (table below — generic scene types, adjust to the exact period + place):

| Scene type | Realistic figure count | Notes |
|---|---|---|
| Quiet residential street, early morning | 3-5 | Lone pedestrian, vendor opening shutters, one passer-by |
| Morning at a busy public building (school, office, station) | 8-14 | Arrivals + staff + 1-2 vehicles/animals + 1-2 supporting roles |
| Busy commercial street / bazaar at peak | 30-50+ | Real crowd, still depth-distributed |
| Theatre / concert hall at premiere | 80-120 | Full house, balconies populated |
| Parliament / legislative session in full sitting | 50-80 | Most seats filled |
| Office or study room at night | 0-2 | The subject and maybe one assistant |
| Cabinet / boardroom meeting | 6-12 | Around a table |
| Family dinner / domestic scene | 4-8 | Around the table or hearth |
| Battle / mass-event / parade | 100+ | Massed, deep-stacked, depth + scale critical |
| Religious service mid-prayer | 20-60 | Depth-stacked rows, varying engagement |
| Train platform at departure | 15-30 | FG travellers + MG porters + BG silhouettes |
| Quiet park / boulevard, off-peak | 4-8 | Walkers, a bench occupant, distant figure |

These are anchors, not hard caps. Always adjust to the **specific** year + place + time + event. A morning bazaar in a small town ≠ a morning bazaar in a capital city, even if both are "morning bazaar."

### The 3-layer depth distribution model (MANDATORY for any wide/establishing shot)

Real frames distribute figures across **3 depth layers** — never on one flat plane:

**FOREGROUND (close, large, hero figures — 2-4 figures)**
- The scene's protagonists / key subjects
- Faces clearly identifiable, age and clothing detail readable
- AI quality concentrates here — these are the figures the validator scrutinises most
- Pose, expression, costume rendered in full

**MIDGROUND (mid-distance, supporting figures — 2-5 figures)**
- Supporting roles that contextualise the scene (a vehicle and its driver, a doorman, a teacher at a threshold, a vendor at a stall, a parent with a child, a horseman passing)
- Smaller in frame, less facial detail required, still recognisable as individuals
- They explain what kind of place this is and why the FG figures are there

**BACKGROUND (distant, small silhouettes — 2-6 figures or more)**
- Atmospheric "life continues" figures — pedestrians at distance, a second vehicle silhouette, a small group at the end of the street, a figure crossing a far doorway
- **Face detail is NOT required** — silhouette or near-silhouette
- Their job is to break the staged-empty feel; AI face-quality concerns DO NOT apply here because faces aren't legible at this scale anyway

**TOTAL for a typical real-density wide shot: 8-14 figures, distributed across all 3 depth layers.** Crowd scenes (theatre, bazaar, parliament, parade) can run much higher because the BG layer absorbs most of the figure count without any AI face-quality penalty.

### Supersession of prior "max 5-7 in frame" assumptions

Any earlier guidance suggesting "cap subjects at 5-7 to protect AI face quality" applies **ONLY to same-plane multi-subject framing** (a row of 5 portraits at one depth). For depth-distributed scenes, the cap is irrelevant — BG silhouettes carry no face-quality cost, so total figure counts of 10-14+ are not only allowed but **required** when the scene's real period density demands it.

Restated cleanly:
- **Same-plane (one depth) multi-subject shot:** 5-7 max for AI face quality
- **Depth-distributed wide / establishing shot:** match real period density (often 10-14, sometimes 50+), since FG keeps 2-4 hero faces and BG figures are silhouettes

Related: the materials/lights complexity budget in `general/prompt-budget.md` (1 primary zone + 1 secondary + 5-7 materials + 2 lights) is a separate axis — it caps MATERIAL variety, not figure count. Do not conflate.

### Self-check questions (before submitting any wide/establishing prompt)

Ask, in order:

1. **"If I were physically standing in this exact place, at this exact hour, in this exact year — what would my eyes actually see?"** Imagine the soundtrack, the smells, the movement. Now count.
2. **"Why is each figure I've listed here? What is each one's reason for being in this frame?"** If any figure has no reason → cut it. If a missing role would obviously be there → add it.
3. **"Are my figures distributed in depth, or am I clustering them at one plane?"** If clustered → redistribute across FG / MG / BG.
4. **"Does the frame feel sterile-empty, chaotically-crowded, or REAL?"** Real = ship it. Either of the other two → revise.
5. **"Would a documentary photographer of that era have shot it this way, with this density, from this position?"** If no, the density is wrong.

### Detection during validation

- Count visible figures per depth layer (FG / MG / BG).
- Cross-check against the scene-type density table above (adjusted for the specific period + place).
- **Sterile-empty** (count well below realistic period density, no BG figures at all) → ❌ regenerate with depth-distributed crowd added
- **Chaotically-crowded** (15+ figures clustered at one depth, face quality collapsing) → ❌ regenerate with same total figures redistributed in depth, or with FG count reduced
- **Same-plane crowd** (all figures at one depth even if total count is fine) → ❌ regenerate with explicit FG/MG/BG distribution

### Pairing with the other multi-figure hard rules

This rule **multiplies** with the rules above — they only work together:

- **FACE DIVERSITY** (`character-anatomy.md` above) — every FG and MG figure needs varied facial features; BG silhouettes are exempt (no faces legible)
- **ANTI period-grit** (`character-anatomy.md` above) — every figure, FG/MG/BG, is clean and dignified unless the specific scene context demands grit
- **CINEMATIC LIVED MOMENTS** (`composition.md`) — depth-distributed figures naturally produce the observer / fly-on-the-wall feel; same-plane clustering forces the posed-photo failure mode
- **PERIOD + PLACE COSTUME RESEARCH** (above) — research drives the realistic density: you can't know the count without knowing who-was-there-and-why for that specific year + place + event

### Cross-references

- `composition.md` → "Depth layering" + summary of this rule (links back here for the full version)
- `director/SKILL.md` → "Davranış qaydaları" — director must apply this thinking before specifying figure count in any wide/establishing shot
- `storyboard-builder/SKILL.md` → cell-prompt generation must declare realistic period density + depth distribution per wide/establishing cell
- `image-validator/knowledge/script-consistency-checks.md` → PP-7 checkpoint validates this on every cell with figures
- `image-prompt-engineer/knowledge/general/prompt-budget.md` → materials/lights complexity budget is a SEPARATE axis (don't conflate with figure count)

**Origin:** Rule established 2026-05-21 after a real period production cell cycled V1 (~14 figures clustered, chaotic, AI face quality dropped) → V2 (~6 figures, sterile/staged-empty) → V3 (depth-distributed real density, ~10-12 figures across FG/MG/BG, lived period feel). User: *"bütün kadrları yaradarkən bir rejissor kimi həmin dövrü təsəvvür et, sanki ordayıkmış kimi yarat"* — figure count comes from real-director realism of the era + place + hour, NOT from AI-quality minimum NOR impact-driven maximum. Universalised across all AI creator projects: applies to every period and every modern scene, since the failure mode (sterile or chaotic crowd) is universal.
