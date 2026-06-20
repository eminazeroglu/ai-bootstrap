# Topic-Specific Enrichment Research — Per-Thumbnail Protocol (Sərt qayda)

> Stylistics.md **brand DNA** (locked palette, font, composition) verir — bütün thumbnail-larda eyni. Lakin hər thumbnail-ın **konkret mövzusu** unikal vizual zənginləşdirmə tələb edir: topic-specific colors, icons, props, location-specific elements. **Template tətbiqi qadağan** — hər thumbnail üçün **research-driven enrichment** məcburidir.

## Fundamental qayda

Stylistics-də locked olanlar **invariant** (hər thumbnail-da eyni):
- Brand palette (məs. yellow + black + white)
- Brand font family (məs. Bangers / Anton)
- Brand composition formulas (3 variant formula)
- Safe zones, host identity, logo position

Hər thumbnail-da əlavə olunan **topic enrichment** (variant):
- Topic-spesifik **icon və ya badge** (məs. ⚽ futbol üçün, ₼ qiymət üçün, ⚠️ trafik üçün)
- Topic-spesifik **color accent** (məs. Real Madrid white-navy-gold, fitness energy orange, finance green)
- Topic-spesifik **prop və ya small image** (məs. trophy silhouette, gym dumbbell, microphone, dollar bill)
- Topic-spesifik **background location** (məs. specific stadium, specific Bakı intersection, specific brand context)
- Topic-spesifik **cultural references** (məs. Azerbaijani manat symbol ₼, AZ flag, regional architecture)

Template + topic enrichment = world-class thumbnail. Yalnız template = amateur.

---

## Per-thumbnail research procedure (4 addım)

### Addım 1 — Topic extraction (transkriptdən / ssenaridən)

Hər variant üçün **mövzu specifics** çıxarılır:
- Konkret event nədir? (məs. "Real Madrid biz olardıq" → Real Madrid Champions League referencesi)
- Konkret yer adı var? (məs. "28 mol qarşısı" → Bakı 28 May metro intersection)
- Konkret brand / şəxs / qrup var? (məs. "Tramp atışma" → Trump campaign event)
- Konkret obyekt var? (məs. "parikinə güvənib oğurluq" → wig, theft props)
- Konkret rəqəm / valyuta? (məs. "200 manat" → AZ manat symbol ₼)
- Konkret mədəni reference? (məs. "Çempionlar Liqası" → UEFA CL trophy, stars, sound effect)

### Addım 2 — Visual research (lazım gəlsə WebSearch)

Mövzu spesifik vizual elementlər araşdırılır:

**Sport teams / clubs:**
- Kit colors (məs. Real Madrid = white kit, navy crest, gold accents)
- Stadium aesthetic (məs. Bernabéu interior, Camp Nou)
- Trophy / cup specific (məs. UEFA CL big-ear trophy, FA Cup)
- Iconic numbers (məs. Real Madrid "15" CL titles, Jordan #23)

**Brands / products:**
- Brand colors (məs. Apple = silver/space-grey, Samsung = blue, Tesla = red-white)
- Product silhouettes
- Logo aesthetics (lakin CLAUDE.md "Brand logo qaydası" — POST-COMPOSITE only, AI generation-da yox)

**Geographic locations:**
- City-specific architecture (məs. Bakı = Flame Towers, Soviet-era apartments, boulevard)
- Specific intersections / landmarks (məs. 28 May metro, Fountain Square, Nizami küç)
- Cultural specifics (məs. armudu istəkanı, kimono, traditional clothing)
- Per CLAUDE.md "Geographic/Landmark accuracy research" — internet research **məcburi** specific location varsa

**Cultural / national:**
- National colors (məs. AZ flag = mavi-qırmızı-yaşıl)
- Currency symbols (məs. ₼ AZ manat, ₺ TR lira, $ USD)
- Traditional objects (məs. samovar, tar, lavash)
- Local idioms / catchphrases (məs. "Ay millət")

**Topic categories (icons / colors):**
- Money / finance → ₼ $ € ₿ + green (gain) / red (loss) / gold
- Time / urgency → ⏰ ⏳ + countdown red
- Safety / warning → ⚠️ ⛔ + yellow-black hazard
- Sport → ⚽ 🏀 🏆 + team colors
- Food → 🍞 🍕 + warm appetizing tones
- Tech → 🖥️ 📱 🔋 + dark + brand colors
- Travel → ✈️ 📍 🗺️ + sky blue + sunset
- Music → 🎤 🎵 + neon stage lights
- Health → 💊 💉 🩺 + clinical white + green
- Politics → 🏛️ 🇦🇿 + national colors

### Addım 3 — Decision matrix (nə əlavə olunur, nə yox)

Hər topic element üçün soruş:

| Element | Əlavə et? |
|---|---|
| Topic recognition-i instant artırırmı? | ✅ ƏLAVƏ ET |
| Composition artıq doludursa və element bloklayır? | ❌ ETMƏ |
| Element təkrardırsa (host artıq tutur, bg artıq göstərir)? | ❌ ETMƏ |
| Element generic emoji clip-art görünür? | ❌ Custom vector formatda yenidən düşün, yoxsa skip |
| Element cultural confusion / insensitivity yaradır? | ❌ ETMƏ |
| Element brand-specific (məs. real Real Madrid logo)? | ❌ AVOID — generic reference istifadə et (məs. "white kit football team" not "Real Madrid logo") — CLAUDE.md "Brand logo qaydası" tətbiq |

Bu icon-and-graphic-elements.md decision matrix ilə birgə işləyir, lakin **fərqli scope**: bu fayl mövzu-spesifik enrichment, o fayl ümumi icon usage.

### Addım 4 — Prompt-a inteqrasiya

Seçilən topic enrichment elementlər prompt-a **konkret olaraq** yazılır:

```
TOPIC ENRICHMENT (this thumbnail's specific elements):
- Color accent (topic-derived): <hex + topic justification>
  e.g. "#FFD700 gold (Champions League trophy / Real Madrid era reference)"
- Background topic anchor: <specific scene + topic justification>
  e.g. "blurred white-clad football team celebrating with silver big-ear trophy, golden stadium lights — generic enough to suggest Real Madrid energy without team logo"
- Icon / badge (if applicable): <description + position + topic justification>
  e.g. "small gold star badge with '15' (Champions League titles count reference) — top-right area, 8% frame height"
- Prop / object: <description if needed>
  e.g. "subtle trophy silhouette in background gradient"
- Cultural specific: <description if needed>
  e.g. "Azerbaijani manat ₼ currency symbol on price-related text"
```

---

## Per-thumbnail example walkthroughs

### Example 1 — Variant B "REAL MADRİD BİZ OLARDIQ!" (cvn-ay-millet)

**Topic extraction:** "Real Madrid" = Spanish football club, Champions League dominant, 15 CL titles, white kit ("Los Blancos"), Bernabéu stadium

**Visual research:**
- Real Madrid kit: white shirts + white shorts (full white identity)
- Crest colors: navy blue (#001D3D) + gold (#FFD700) + red accent
- Champions League trophy: silver "big-ear" trophy
- Bernabéu stadium: white-trimmed iconic stadium
- Iconic number reference: "15" CL titles (as of 2024-2025)
- Madrid city colors: red + gold (Madrid flag)

**Decision matrix:**
- ✅ Background: generic European football stadium aerial with white-clad players celebrating with silver trophy (suggests Real Madrid without team branding)
- ✅ Color accent: **GOLD #FFD700** (CL trophy color) instead of generic stylistics yellow — topic-specific signal
- ✅ Star/number element: subtle "15" or star pattern in background (CL anthem stars reference)
- ❌ Real Madrid actual logo (brand legal risk + AI logo fidelity issue)
- ❌ Specific player faces (recognizable likeness issue)
- ❌ White football emoji ⚽ (redundant with background)

**Prompt enrichment add:**
- Topic color: #FFD700 GOLD (CL trophy) — punchline word "REAL MADRİD" in gold instead of generic yellow
- Topic bg: white-uniformed football team celebrating silver big-ear trophy in golden stadium lights
- Topic prop: faint star pattern in background gradient (CL Champions anthem stars)

### Example 2 — Variant A "İKİ GÜN ARD-ARDA?!" (pedestrian fine repeat)

**Topic extraction:** Repeated pedestrian fine offender, Bakı central intersection (transcript mentions "28 mol qarşısı" = 28 May metro intersection)

**Visual research:**
- Bakı 28 May metro intersection: central busy multi-lane road, traffic light, pedestrian crossing
- Traffic safety symbology: yellow + black hazard pattern, red traffic light
- AZ traffic police: high-visibility yellow vest + dark uniform
- Pedestrian crossing signs: white pedestrian silhouette on blue square (international)
- AZ manat ₼ symbol (fine amount reference)
- Dash-cam aesthetic: timestamp overlay, surveillance footage feel

**Decision matrix:**
- ✅ Background: specific 28 May metro intersection blurred (city recognition)
- ✅ Small ⚠️ warning triangle icon in corner (instant "traffic violation" recognition)
- ✅ Color accent: traffic safety YELLOW (already in palette OK) + warning red
- ❌ Specific police officer (legal/recognizability)
- ❌ Specific car license plates (recognizability)
- ✅ Optional: small ₼ "fine" badge if space allows

**Prompt enrichment add:**
- Topic bg: specifically blurred 28 May metro intersection (Soviet-era + modern mix architecture, multi-lane boulevard, pedestrian crossing visible)
- Topic icon: small yellow warning triangle ⚠️ in top-right corner area (12% frame height)
- Topic color reinforcement: dash-cam timestamp overlay aesthetic adds surveillance credibility

### Example 3 — Variant C "BU İNSANLAR BAŞA DÜŞMÜR" (sermon)

**Topic extraction:** Pedestrian safety sermon, "these people" reference, host direct address

**Visual research:**
- Bakı specific busy intersections (Fountain Square, Nizami küç, 28 May, Targovi)
- Crosswalk markings (white stripes)
- Mixed-demographic pedestrians (business casual + casual + elderly + youth)
- Crowd composition aesthetic

**Decision matrix:**
- ✅ Background: specific Bakı intersection wide-shot with diverse pedestrians (recognition + accuracy)
- ✅ Crosswalk stripes visible in bg (semantic anchor — "they're not using crosswalks")
- ❌ Icon overlay (sermon style + crowd bg = composition full)
- ❌ Specific recognizable individuals (use blurred composite)
- ✅ Color accent: editorial red (#B00020) on accusation word — already in plan

**Prompt enrichment add:**
- Topic bg: specifically Bakı central intersection (mention boulevard / Targovi / Fountain Square aesthetic), crosswalk markings visible, mixed-demographic pedestrians mid-crossing wide-shot

---

## When skipping research is OK

Research is **default-mandatory**, lakin atlanma şərtləri:

- **Abstract topic** (philosophy, opinion, internal thought) — heç bir konkret event/object yoxdur → topic enrichment minimal, brand palette dominant
- **Pure host commentary** with no external reference (host just sharing personal view) → background can be neutral gradient + reaction face
- **Topic onsuz da artıq vizual açıqdır** — məsələn ssenari konkret action göstərir, bg + face yetərlidir

Lakin bu hallarda da prompt-da **açıq qeyd olunmalıdır**: "Topic abstract — no specific topic enrichment beyond brand palette. Background: neutral [stylistics-derived]."

---

## Anti-patterns (avoid)

1. **"Generic gym background"** (when topic is specific fitness sketch) → research what specific exercise/equipment was discussed
2. **"Stylized colors"** when topic has known brand/team colors → use the real topic colors
3. **"Universal icon"** when topic has cultural/local-specific symbol → use the local
4. **Random emoji dump** instead of researched topic icon → custom topic-derived element
5. **Same background pattern across all variants** → each variant gets topic-driven differentiation
6. **Skip research due to "stylistics handles it"** → stylistics handles invariants, NOT topic enrichment

---

## Workflow integration

`storyboard-builder` skill-də olan SKILL.md Addım B5 (production cell brief) format-da TOPIC ENRICHMENT bölməsi məcburidir:

```
**TOPIC ENRICHMENT (this thumbnail's specific elements — Addım B5 research output):**
- Topic extraction: <konkret event/object/location/brand from script/transcript>
- Visual research findings: <bullet list of topic-specific visuals>
- Decision matrix application:
  - Bg topic anchor: <decision>
  - Icon/badge: <decision>
  - Color accent: <decision>
  - Prop/object: <decision>
  - Cultural specific: <decision>
- Prompt integration: <konkret sözlər prompt-a əlavə olunur>
```

---

## Cross-references

- `world-class-design-baseline.md` — niche DNA + reference channels (invariant)
- `icon-and-graphic-elements.md` — ümumi icon decision matrix (universal)
- `professional-techniques.md` — 12 design principles (universal)
- `variant-differentiation.md` — 5-axis variant difference rule
- CLAUDE.md "Geographic/Landmark accuracy research qaydası" — internet research mandatory for specific real-world locations
- CLAUDE.md "Brand logo / brand mark qaydası" — POST-COMPOSITE, AI generation-da yox

---

## Niyə bu fayl yaradıldı

İstifadəçinin 2026-05-22 göstərişi (cvn-ay-millet test): "yenə eyni şeylər edirik standart thumbnail yaradılır. Mən dedim bu bir qayda olmalıdır hər thumbnail yaradılanda ordakı mövzuya uyğun araşdırma et sonra lazım olarasa icon lazım olarasa kiçik başqa şəkil və s kimi şeylər əlavə etməliyik. Hər thumbnaildə movzuya uyğun rəng və ya başqa nələr olmalıdırsa thubnaildə onuda prompta yazmalısan."

Skill stylistics.md (locked brand DNA) tətbiq edirdi, lakin **per-thumbnail topic-specific enrichment** etmirdi. Hər thumbnail "Real Madrid biz olardıq" üçün eyni generic stylistics tətbiq olunurdu — gold trophy colors, white kit reference, CL star pattern enrichment yox idi. Bu fayl topic research-ı sərt qayda kimi sistemə tikir.
