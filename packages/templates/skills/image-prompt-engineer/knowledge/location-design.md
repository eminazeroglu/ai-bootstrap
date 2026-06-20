# Location Design — Image Generation

> How to describe environments for cinematic image prompts.

---

## 🔴 HARD RULE #0 — Location reference = EMPTY OF PEOPLE

**In the 5-stage AI-creator pipeline, a LOCATION REFERENCE is an ANCHOR IMAGE of the empty environment.** People are added later, at the cell-generation stage, by combining the location reference with the relevant CHARACTER REFERENCES.

```
LOCATION REF  =  empty environment (room / street / hall / courtyard — NO living figures)
                                +
CHARACTER REF =  the specific person's identity (anchor portrait pack)
                                +
SCENE PROMPT  =  "this person stands in that location in this pose, doing this action"
                                ↓
                       FINAL KADR (cell image)
```

### Why this matters

- **Cross-shot consistency:** the same location ref serves multiple kadrs (e.g. a parliament hall serves wide / medium / close-up variants — all with the same architectural identity). If people are baked into the location ref, every reuse forces the same figures to reappear.
- **Character identity preservation:** characters come from their own anchor packs (precise face, hair, costume). If a generic "diplomat-looking man" is rendered inside a location ref, the model fights against the actual character anchor at cell stage.
- **Modular asset library:** locations are reusable across many projects; characters are project-specific. Coupling them in one image destroys reuse.
- **Group photo kadrs:** even kadrs that depict "a group of people in a room" should be built as (empty room ref) + (multiple character refs) + (group-composition prompt). The crowd is composed at cell stage, not pre-baked.

### What IS allowed in a location reference

The location ref describes the **physical environment a person could walk into**. Allowed:

- **Architecture:** walls, ceilings, floors, columns, arches, doors, windows, stairs
- **Furniture:** chairs, tables, sofas, beds, bookshelves, desks, podiums
- **Décor:** rugs, curtains, paintings, mirrors, sculptures, flags on stands, wall plaques
- **Lighting fixtures:** chandeliers, sconces, table lamps, candles (lit or unlit per scene logic — see physical-realism A9.7), street lamps
- **Static infrastructure:** water taps, fireplaces, radiators, telephones on desks, typewriters at workstations, microphones on stands at empty podiums
- **Stationary props / set dressing:** books, papers, glasses of water, fruit bowls, vases of flowers, ashtrays, period objects (qalamdan, samovar, gramophone, etc.)
- **Natural elements:** trees, plants, sky visible through windows, water, terrain (in exteriors)
- **Parked / stationary vehicles** that are NOT being operated: empty parked carriages, parked cars without drivers (if they're permanent set-dressing for the location)
- **Animals only if permanent fixtures of the environment:** a stuffed mounted animal on a wall, a statue of a horse (a real living animal = not allowed unless the scene is literally about that animal)

### What is NOT allowed in a location reference

- **Any human figure** — no faces, no silhouettes, no shadows of people, no "distant figures" in deep background, no defocused person, no "hand at frame edge"
- **Any operated vehicle** — no horse-cart with a driver, no carriage with passengers, no car being driven (these imply people)
- **Any depicted "in-use" action** — no mid-stroke pen, no mid-strike typewriter, no half-eaten food on a plate, no mid-conversation tea-glasses with rising steam (these imply an off-frame person at this exact moment)
- **Body-parts at frame edge** — no hand, no shoulder, no foot intruding from off-frame
- **Crowd shadows** — no shadows on the wall that suggest off-frame people
- **Anything implying recent human presence at a specific moment** — a half-smoked cigarette in an ashtray IS allowed if it's general set-dressing showing "this place is lived-in," but freshly-poured tea with rising steam IS NOT (too time-specific, implies the drinker just stepped away)

### How to enforce in the prompt itself

In the V7 expanded prompt format, add to the "NOTHING ELSE in the frame" section explicit exclusions:

```
NOTHING ELSE in the frame — NO human figures, NO silhouettes, NO defocused people in background,
NO body parts at frame edge, NO operated vehicles, NO hands holding objects. This is a pure
location/environment reference — people are composed in at cell-generation stage from
character anchor packs.
```

### Exception — single-pass (non-pipeline) generation

If you are generating a one-off image with NO multi-stage character refs (e.g. a stock illustration, a single editorial frame with no continuity needs), then location + people may live in one prompt. But the moment a project uses character anchor packs and plans multiple cells per location, the location reference MUST be empty per the rule above.

### Common AI failure mode

AI image models — trained heavily on photographs that include people — frequently insert "a small figure for scale" or "a distant pedestrian for atmosphere" even when the prompt doesn't ask for one. The "NO human figures" guard clause in NOTHING ELSE must be explicit and aggressive, otherwise the model adds people by default.

**Detection during validation:** scan every location-ref output for any human figure (foreground, mid-ground, background, silhouette, shadow). Even one figure = ❌, regenerate with stronger exclusion.

**Origin:** rule set by user 2026-05-21 during the 28-may documentary project, after L-01/L-02/L-03A were initially written WITH people embedded (horse-cart driver silhouette, stagehand behind curtain, 22+ schoolgirls posed in courtyard). All three location refs had to be rewritten as empty environments.

### HARD RULE #0 — what about CELLS?

**Clarification (added 2026-05-21):** HARD RULE #0 (empty location refs) applies **ONLY** to **L-XX location anchor refs**. It does **NOT** apply to cells.

For **CELLS** (final kadr images, the actual frames the audience sees) at the cell-generation stage, the cell MUST include **all elements specified by the script** — horses, vehicles being driven, pedestrians, crowds, performers, hands holding objects, mid-action subjects, every living and moving thing the script calls for.

### The distinction in plain language

- **LOCATION REF (L-XX)** = empty stage set, no actors yet
- **CELL** = the actual filmed shot, fully populated with actors, vehicles, animals, action per the script

### Concrete example

The script says: *"Şəkər küçəsi, səhər saat 8. Uzaqda at-arabası dayanıb, ətrafda ilk gəzərlər."* ("Şəkər street, 8 AM. A horse-cart waits in the distance, first pedestrians around.")

- **L-01 (location ref):** empty Şəkər street — buildings, paving, gas lamps, awnings, posters on walls. **No horse, no cart, no pedestrians.** This ref is reusable across many cells set on Şəkər street.
- **k.1 (cell):** Şəkər street **+** horse **+** cart **+** driver **+** ~3 pedestrians **+** mid-action moment. The cell is built from (L-01 location ref) **+** (character refs for each pedestrian and the driver) **+** (composition + action description).

### Mistake to avoid

Do NOT apply the empty-location rule to cells. That produces sterile, abstract scenes that contradict the script's intent — empty streets where the script said "first pedestrians," empty halls where the script said "audience applauding," empty offices where the script said "the editor types at the desk."

### Quick decision tree

```
Is this asset an L-XX location anchor reference?
├── YES → EMPTY of all living/operated elements (HARD RULE #0 above)
└── NO (this is a cell / kadr) → POPULATE per script: every person, vehicle,
                                  animal, action the script names is RENDERED
                                  in the cell, composed from (L-XX) + (char refs).
```

### Cross-references

- `composition.md` → "Cinematic lived moments" (how to populate cells naturally, not as posed photos)
- `character-anatomy.md` → "Face diversity" + "Period + place costume research" (every figure in the cell needs an anchor and varied face)
- `image-validator/knowledge/prompt-consistency-checks.md` F13 — F13 still applies to L-XX refs only

**Origin of clarification:** 2026-05-21, 28-may documentary k.1 — cell was initially written as an empty street with a parked, horseless cart (because the prompt author wrongly applied the empty-location rule to a cell). This contradicted the script's "uzaqda at-arabası dayanıb." Rule clarified universally: empty applies to L-XX refs; cells are populated per script.

---

## MANDATORY location attributes

For every location prompt, specify:

### 1. Interior or Exterior (INT./EXT.)
- INT. = inside
- EXT. = outside

### 2. Time of day
- Dawn, morning, midday, afternoon, golden hour, dusk, night, blue hour
- Or specific: "3 AM", "6:45 PM"

### 3. Weather (if exterior or visible)
- Clear, overcast, rain, snow, fog, storm
- Wind level if relevant

### 4. Period
- Modern, 1950s, 1970s, 1980s, futuristic, indeterminate
- Be specific to influence design

### 5. Mood / Atmosphere (3-5 descriptors)
- Melancholic, tense, romantic, oppressive, hopeful, nostalgic, sterile
- Cozy, sterile, decaying, pristine, cluttered

### 6. Key visual elements
- Furniture types
- Architectural features
- Practical lighting sources
- Props that matter

### 7. Color palette
- Dominant colors (warm wood, cool steel, faded green)
- Accent colors (neon pink, bright orange)

## Common location archetypes

### Diner / Cafe
- Booths, counter, neon sign
- Warm tungsten lighting
- Period reference (1960s American, modern European)
- Menu boards, jukebox, coffee machine

### Apartment Interior
- Style (minimalist, cluttered, family, bachelor)
- Furniture period
- Wall color and art
- Window light direction

### Office
- Open plan vs cubicle vs private office
- Monitor light, fluorescent vs natural
- Era (1990s vs modern)

### Street / Alley
- City type (Tokyo, NYC, Baku, Paris)
- Time period
- Wet (rain reflections) vs dry
- Practical signs, neon, streetlamps

### Forest / Nature
- Tree type
- Season
- Time of day (filtered light)
- Ground cover (leaves, snow, moss)

### Bedroom
- Made vs unmade bed
- Wall color
- Window light
- Personal items (period-specific)

## Lighting consideration per location

Always describe how light enters and what it touches:
- "Soft afternoon light through gauze curtain illuminates dust particles"
- "Cool blue moonlight through window casts grid of frame on bedsheets"
- "Warm tungsten ceiling lamp pools light on table, edges of room dim"

## Sample full location description

```
INT. 1960s American diner at night, melancholic and sleepy atmosphere.
Long counter with chrome stools, padded leather booths along window
wall, period jukebox glowing in corner. Walls in cream tile and dark
wood paneling. Practical lighting: warm tungsten ceiling pendants
(3200K) creating pools of light, neon "OPEN" sign in window casting
red glow, cool blue spill from rain-streaked window. Empty except
for a single coffee cup and crumpled newspaper on counter. Color
palette: warm browns and creams contrasted with cool blue exterior.
Period accuracy: chrome napkin holders, vintage Coca-Cola signs,
pressed tin ceiling.
```

## Multi-shot prompts per location

Each location should have 3 prompts:

### Establishing shot
- Wide perspective showing whole space
- Subject(s) small or absent
- Architectural emphasis
- Lens: 24-35mm, f/5.6+

### Wide shot
- Showing space + subject(s)
- Subject relationship to environment
- Lens: 35-50mm, f/4

### Medium shot
- Zoom-in on functional area
- Subject(s) and immediate surroundings
- Lens: 50mm, f/2.8

## DON'T

- "Nice cafe"
- "Cozy room"
- "Modern office"
- "Beautiful nature"
- Generic descriptions without period/style
- Lighting without source attribution
