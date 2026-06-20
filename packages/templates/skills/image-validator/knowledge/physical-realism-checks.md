# Physical Realism Checks — Image Validator Checklist

**Sinxronizasiya qeydi:** Bu fayl `image-prompt-engineer/knowledge/physical-realism.md` master faylından **checklist version**-dur. Master dəyişəndə bu da yenilənməlidir (CLAUDE.md "sync rule").

Bu fayl image-validator-in **Qat A** üçün istifadə etdiyi 9 bölmə üzrə check-list-dir. Hər check üçün **soruş, vision input-da gör, ✅/❌/⚠️ ver**.

---

## Bölmə 1 — Gravity & support (cazibə, dayaq)

### A1.1 — Bütün obyektlər real dayaq üzərində
- Hər obyekt nəyə söykənir/dayanır? (yer, masa, divar, asma)
- Hər kontakt nöqtəsi vizual aşkardırmı?
- Floating obyekt varmı (havada bitən)?

**Pozulma misalı:** Şəfaq fəal: çay fincanı masaya tam toxunmur, ~3 mm aralıq görünür.

### A1.2 — Attachment məntiqi
- İp/zəncir/kabel hər iki ucunda bir şeyə bağlıdırmı?
- Asma obyektlər real attachment point-dən sallanırmı?
- Daddy-long-legs effekti yoxdurmu (uzun attachment olmayan)?

**Pozulma misalı:** Clothesline yalnız sol divarda bağlı, sağ ucu havada bitir.

### A1.3 — Yüklə uyğun sag/bend
- İp paltarla yüklənibsə, **catenary curve (V-şəkilli sag)** görünürmü?
- Düz xətt halında qalan ip → fiziki pozulma
- Heavy obyekt nazik shelf üzərində → shelf bend görünməlidir

### A1.4 — Insan dayaq nöqtələri
- Insan ayaq üstündə düzgün bal saxlayır?
- Oturmuşsa, kürəyi/oturacaq bir şeyə söykənir?
- Yıxılan halda dynamic balance görünür?

### A1.5 — Heyvan dayaq
- Pişik/it 4 ayaq distribution real?
- Ayaq pozisiyası bədən çəkisinə uyğun?
- Sıçrayış halında flight arc real?

---

## Bölmə 2 — Light sources & shadows

### A2.1 — Hər işıq mənbəyi vizual aydındır
- Pəncərə, lampa, atəş, günəş — biri vizual aydın olmalıdır
- Mənbəsiz işıq (subject parıldayan, mənbə yoxdur) → pozulma

### A2.2 — Kölgə işıq mənbəyinin əksinə düşür
- Bütün kölgələr **eyni istiqamətdə** düşürmü?
- Multi-light scene-də hər kölgə uyğun mənbəyə bağlıdırmı?
- Sol pəncərə → sağa kölgə (və əksinə)

**Pozulma misalı:** Tək pəncərə soldadır, lakin pişikin kölgəsi solada düşür (təbiətən imkansız).

### A2.3 — Kölgə uzunluğu işıq bucağına uyğun
- Aşağı sun (sübh/qürub) → uzun kölgə
- Yüksək sun (midday) → qısa kölgə
- Lamp/spot işıq → kölgə uzunluğu məsafə-asılı

**Pozulma misalı:** Midday yazılıb, lakin warm golden hour shadows uzun, yumuşaq.

### A2.4 — Color temperature uyğun
- Tungsten lamp = 3200K (warm orange)
- Daylight window = 5600K (neutral white)
- Candle = 1800K (deep orange)
- LED = mixed
- Mixed source scene-də hər mənbə öz temperatür yayır

### A2.5 — Specular highlight mənbə tərəfdə
- Şüşə, metal, parlaq səth — highlight işıq tərəfdə olmalıdır
- Highlight tərs istiqamətdə → pozulma

### A2.6 — Bounce light real
- Parlaq səthlər ətrafa rəng yayır (qırmızı divar → soft pink fill)
- Tam dark side without bounce → əksər real səhnələrdə pozulma

---

## Bölmə 3 — Time of day consistency

### A3.1 — Sky vəziyyəti saatla uyğun
- Pre-dawn = deep blue, no sun visible
- Sunrise = warm orange horizon
- Midday = neutral blue, no orange
- Golden hour = warm low sun
- Dusk = purple-orange transition
- Night = dark, stars/moon possible

### A3.2 — Praktik işıqlar saatla uyğun
- Gündüz mətbəxdə → lampa **yanmır**
- Gündüz şam **yanmır** (atmosferik olmaz)
- Gecə → bütün praktik işıqlar yana bilər

**Pozulma misalı:** Səhər 8:00 mətbəx, lampa yanır + sun şüası gəlir (mismatch).

### A3.3 — Sun direction logical
- Səhər = şərqdən
- Günorta = yuxarıdan
- Axşam = qərbdən
- Avropalı şəhərdə Bakı kimi → sun arc məntiqi

### A3.4 — Insan adları/həssas məsələlər
- Səhər 6:00 oyanma → unmade bed, sleepy expression
- Gecə yarısı → tired, lighting cool
- Cinema typical: səhər = enerjili, axşam = sakit

---

## Bölmə 4 — Weather & atmosphere

### A4.1 — Yağış logical
- Yağışda → wet səthlər, su gölməcələri, reflection
- Wet yer + dry insan → pozulma
- Şüşə üzərində water droplets məntiqli

### A4.2 — Qar/sleet
- Qarın altında footprint yarına bilər
- Heç bir footprint olmayan freshly fallen + insanlar arasında → pozulma
- Qar səthində kölgə soft blue

### A4.3 — Duman
- Duman uzaq obyektləri **azaldır** (atmospheric perspective)
- Tam dəqiq distant background through fog → pozulma
- Local duman patch real yoxdur (homogeneous spread)

### A4.4 — Külək
- Külək = paltar, saç, ağac yarpaqları **hər biri eyni istiqamətdə** hərəkət
- Saç sol → ağaç sağ → pozulma (külək istiqaməti tək olmalıdır)

---

## Bölmə 5 — Anatomy & biology

### A5.1 — İnsan əl 5 barmaq
- Hər əldə 5 barmaq, **görünən** sayılmalıdır
- 4 barmaq, 6 barmaq, melted barmaqlar → pozulma
- Barmaq proportion real (thumb shorter, index/middle longest)

### A5.2 — İnsan üz simmetriyası
- Iki göz eyni səviyyə (head tilt istisna)
- Iki qulaq eyni səviyyə
- Iki çiyin balanced

### A5.3 — İnsan proportion
- Head : body ratio yaşa uyğun
  - Bebek = 1:4
  - Uşaq = 1:5-6
  - Yetkin = 1:7-8
- Limb length proportion məntiqi

### A5.4 — Pişik anatomy
- 4 ayaq, 2 qulaq (uçlu), 2 göz, quyruq
- Whiskers symmetrical
- Eye position frontal (avtomatik konstrast vs köpək)

### A5.5 — Köpək anatomy
- 4 ayaq, 2 qulaq (cins-asılı), quyruq
- Eye position frontal-side (cins-asılı)

### A5.6 — Quş anatomy
- 2 qanad, 2 ayaq, gağaz
- Wing structure stiff bone + feather layer

### A5.7 — Saç physics
- Saç ucundan **aşağı düşür** (gravity)
- Külekli halda istiqamətli
- Wet saç → flat və stringy
- Dry saç → volume və separation

### A5.8 — Face diversity in multi-figure cells (HARD RULE)
Hər multi-figure kadrda **hər üz fərqli individualdır**. AI image modelləri default olaraq qrupdakı bütün figuralarda **eyni "face template"-i** təkrar edir — bu, ən geniş yayılmış realism failure-lərindən biridir.

**Hər multi-figure cell-də soruşulmalı:**
- Üz formaları varieties: oval / round / square / heart-shaped / long qarışıqdırmı?
- Göz yerləşməsi/ölçüsü/forması fərqlidirmi?
- Burun forması (uzunluq, körpü profili, dəlik eni) fərqlidirmi?
- Ağız forması (dodaq dolğunluğu, eni) fərqlidirmi?
- Komplekson eyni ethnicity daxilində nüanslı varieties göstərirmi?
- Saç (rəng və texture) ethnic range daxilində dəyişirmi?
- Yaşlar stated range daxilində ayırd edilə bilirmi (8-10 qrupunda 8 / 9 / 10 fərqi görünür)?
- Bədən tipləri (boy, build) varieties göstərirmi?
- Individual markers (freckle, mole, micro-asymmetry, kiçik scar) hər üzdə fərqlidirmi?
- Mikro-expressions (biri maraqlı, biri darıxmış, biri ayıq, biri xəyalda) varieties göstərirmi?

**Detection metodikası:**
1. Output şəkili 100% zoom-da aç
2. Hər görünən üzü ayrı-ayrı yan-yana müqayisə et
3. **2+ üz oxşardırsa → ❌ regenerate** (heç bir istisna yox)
4. Xüsusilə diqqətli yoxla: qadın qrupları, uşaq qrupları, uniformed qruplar (məktəb sinifləri, hərbi sıralar, xorlar, tibb bacıları formaları) — AI bunları template-clone etməyə ən meyllidir

**Pozulma misalı (2026-05-21, 28-may documentary):** k.4 schoolgirls cell-də dörd qız sıra ilə durmuşdu və hər dördünün **eyni üz template-i** var idi — eyni göz aralığı, eyni burun, eyni ağız forması. Hər üz fərqli individual olmalıdır.

**Pattern referansı:** image-prompt-engineer/knowledge/character-anatomy.md "FACE DIVERSITY" HARD RULE; əlaqəli rule composition.md "Cinematic lived moments" (varied blocking ↔ varied micro-expressions).

### A5.9 — Anti period-grit stereotype check (HARD RULE)
Hər period kadrda insanlar üzərində **motivasiyasız dirt/stain/grit** olub-olmadığını yoxla. AI image modelləri (və prompt yazarları) sıxlıqla "period authenticity" əldə etmək üçün **default Hollywood-grit** əlavə edirlər — mürəkkəbli yazıçı barmaqları, tozlu uşaq pinafore-u, üzü qaralmış fəhlə, tər-ləkəli yaxalıq. **Bu tarixi reallıq deyil — kino stereotipidir.** Tarixi insanlar dövrlərinin estetik/hijyenik standartlarına görə özlərini təmiz saxlayırdı, hətta mürəkkəb/kömür/boya ilə işləyəndə də.

**Hər insan figurası üçün soruş:**
- Əl, üz, yaxalıq, geyim ətəyi, dırnaq altında **motivasiyasız** dirt/stain/grit görünürmü?
- Əgər bəli — bu kadrın SPECIFIC səhnə kontekstinə **trigger** varmı? (mid-knead baker, mid-strike blacksmith, post-battle soldier, mid-harvest farmer, fire-fleeing refugee)
- Trigger YOX-dursa → ❌ (default "period look" üçün əlavə olunmuş Hollywood stereotipi)
- Trigger VARSA → ✅, lakin trigger action (un əldə, kömür forge-da, və s.) eyni kadrda visible olmalıdır

**Bilərək təmiz default sənariləri (grit AVOID):**
- Formal portret, ailə şəkili, rəsmi mərasim, məclis/iclas, məktəb sinif şəkli
- İş fasiləsi (worker washing up sonrası posed photo)
- İctimai toplaşma, küçə görüşü, küçədə gəzinti
- Yazıçı/redaktor/müəllim/deputat/tələbə masada — clean hands default

**Grit ALLOWED triggers (rare, scene-spesifik):**
- Mid-work active action visible kadrda (baker mid-knead, blacksmith mid-strike, miner mid-shift, soldier mid-battle/post-battle)
- Narrative tələbi (qaçqın, qəza, yanğın, müharibə anı)
- User explicit request emotional impact üçün

**Pozulma misalı (origin 2026-05-21):** Period kadrda yazıçı "ink-stained fingertips of a working writer" default ilə yazılmışdı — kadr formal masa səhnəsi idi, yazı action-ı mid-stroke yox, dignified portret tonu. Stereotip "period writer" trope-undan gəlmişdi, scene context tələb etmirdi. Fix: "clean hands of an experienced writer who knows how to handle a pen" — same dignity, no fake grit.

**Detection metodikası:**
1. Hər visible insan figurası üçün əl/üz/yaxalıq/geyim ətəyini 100% zoom-da yoxla
2. Hər grit elementi (dirt smudge, ink stain, soot, sweat, dust) üçün scene-də trigger axtar
3. Trigger yox → ❌ regenerate (clean default ilə əvəz et)
4. Pair this with composition.md "Cinematic lived moments" — lived-in ≠ dirty; varied blocking + dignified appearance birlikdə işləyir

**Pattern referansı:** image-prompt-engineer/knowledge/character-anatomy.md "ANTI period-grit stereotypes" HARD RULE (YES/NO cədvəli); əlaqəli rule composition.md "Cinematic lived moments" (lived-in materials YES, bodily filth NO).

---

## Bölmə 6 — Material physics

### A6.1 — Su
- Şəffaf, refractive
- Səthi refleksiya verir
- Hərəkətdə motion blur
- Şüşə içində bevel/refraction visible

### A6.2 — Şüşə
- Şəffaf with refraction
- Edge highlight
- Behind şüşə → slightly distorted

### A6.2b — Şüşə Fresnel dual-layer (F10 pattern)
- Night-time window scene-də şüşə **iki layer** eyni anda göstərə bilər: transparency (city through) + reflection (room on surface)
- Reflection layer **GLASS PLANE depth-də** olmalıdır (NOT scene depth-də)
- Reflection element-ləri: insan silueti translucent ghost kimi, lamp glow floating on surface
- **AI failure mode:** Model reflection-ı transparency scene-ə inteqrasiya edir (lamp → uzaq bina)
- **Doğru rendering:** layered + floating + position-matched + cinema reference (Sofia Coppola, Lost in Translation)
- **P-05 v1 bug → v2 fix:** Iter 1-də lamp city-ə inteqrasiya olunmuşdu. Iter 2-də spatial depth explicit + ghost language + ultra anti-default ilə düzəldi.

**Pattern referansı:** prompt-consistency-checks.md F10 + test-learnings.md P-05 entry

### A6.3 — Parça
- Linen → rumpled, soft drape
- Silk → smooth shine
- Wool → matte texture, slight nap
- Cotton → balanced drape
- Drape gravity-uyğun

### A6.4 — Metal
- Reflective səth
- Specular highlight sharp
- Brushed metal → directional highlight

### A6.5 — Saç
- Strand-based, mass deyil
- Light penetrate edir (translucency at edges)

### A6.6 — Ağac
- Grain pattern visible
- Joints (mortise/tenon) görünür stress-bearing yerlərdə
- Aged wood → patina

### A6.7 — Beton
- Rough texture, slight bilateral asymmetry
- Stain/weathering məntiqi

### A6.8 — Kağız
- Light və thin
- Easily creased, curled at edges

---

## Bölmə 7 — Architecture & structure

### A7.1 — Pəncərə struktur
- Frame solid material (wood, aluminum, PVC)
- Glass clear
- Sill və lintel structural
- Light passes through, refracts slightly

### A7.2 — Qapı struktur
- Hinges visible (or implied)
- Handle/knob əl səviyyəsində
- Frame thicker than wall opening

### A7.3 — Pilləkən (CRITICAL)
- **Bilateral struktur** — hər iki tərəfdə dayaq (inner wall + outer banister)
- Step rise (10-20 cm) və depth (25-30 cm) **bütün step üçün eyni**
- Hər step **complete** (tread + riser + nosing)
- Open edge yoxdur — bilateral protection
- Soviet Baku spesifik: iron banister with vertical bars, mosaic tile floor possible

**P-bug nümunəsi:** Pilləkənin **yarısı** yox idi — outer banister rendered, inner wall absent, steps disappearing into space.

### A7.3b — Spiral staircase (dual-banister rule)
- **TWO separate banister systems** mütləq görünsün:
  - Outer banister (step xarici kənarında, vertical iron posts + helical top rail)
  - **Inner handrail** (central column-a bracket-lərlə bağlı, helical iron rail) — AI sıxlıqla bunu DROP edir
- Bracket attachment points central post-da visible olmalıdır (L-shaped arms hər ~1m)
- Step rise consistent, no missing portions
- Outer banister hər visible turn-də (bottom, middle, top) görünsün

**P-03 v1 bug (2026-05-15):** Inner handrail tamamən rendered olunmamışdı — yalnız solid central post + outer banister. P-03 v2-də fix tətbiq olundu (numbered subsystems + brackets + verification clause).

### A7.4 — Divar
- Solid, no transparency
- Material consistent (brick, concrete, plaster)
- Edges/corners 90° (or designed otherwise)

### A7.5 — Damı
- Slope məntiqi (water drainage)
- Material consistent (tile, metal, flat membrane)
- Edge → wall transition clean

### A7.6 — Balkon (Soviet Bakı specific)
- Iron rail with vertical bars
- Concrete floor with slight age patina
- Often has rust on metal
- Hanging items (clothesline, plants) attached at BOTH ends

---

## Bölmə 8 — Composition with physical accuracy

### A8.1 — Perspective consistency
- Vanishing point single (or designed multiple)
- Horizon line consistent
- Object scale uyğun məsafəyə

### A8.2 — Depth of field məntiqli
- Focused subject sharp
- Background blur smooth (bokeh)
- Foreground blur (if subject mid-distance) məntiqli
- Sharp əvərdə fərqli depth-da artificial → pozulma

### A8.3 — Refleksiya physics
- Mirror = exact reflection (left-right flip)
- Water = wavy reflection
- Polished floor = slight reflection
- Glass = partial reflection + transparency

### A8.4 — Scale məntiqli
- Insan vs məkan ölçü
- Cat vs furniture ölçü
- Object vs hand ölçü

---

## Bölmə 9 — Cultural & geographic specifics

### A9.1 — Bakı / Azerbaijan
- Architecture: Soviet apartments (panel houses), pre-Soviet stone, modern (Flame Towers visible from rooftops)
- Streets: narrow old town, wider Soviet boulevards
- Climate: Caspian humid, mild winter
- Flora: ardıc, fig, pomegranate, cypress
- Cultural items: tea (in pear-shaped armudu glass), bread (tendir lavash)

### A9.2 — Etnik features (default = Azerbaijani Caucasian)
- Olive-tan skin (Fitzpatrick III)
- Hair: dark brown/black usually
- Eyes: varies (brown, hazel, green, blue possible)
- Facial structure: Caucasian features with Caspian/Caucasian variation

**İstisna:** Layihə-spesifik karakter etnikliyi WORKFLOW.md və ya character profile-da fərqli ola bilər.

### A9.3 — Geyim
- Modern urban Bakı: Western fashion + occasional traditional
- Rural: more conservative, less Western
- Religious context (mosque): traditional cover

### A9.4 — Time/season
- Summer in Baku = humid hot, light clothing
- Winter = mild but humid, layered
- Spring/fall = mild, breezy

### A9.5 — Landmark geographic positioning consistency (skyline & panoramic shots)
Real-world landmarks have **FIXED geographic coordinates**. In a panoramic skyline shot showing multiple landmarks, their relative LEFT/RIGHT placement in the frame MUST reflect real geography — the camera viewpoint + landmark coordinates dictate the composition, NOT aesthetic preference.

**AI failure mode:** Model places "iconic" landmarks on the visually dramatic side of the frame (often the right) for composition, ignoring real-world coordinates. Result: two landmarks shown on opposite sides of frame when in reality they're on the same side, or in inverted left/right order.

**Detection during validation:**
1. Identify each landmark's real coordinates (lat/lon)
2. Determine the implied camera viewpoint from the prompt
3. Compute each landmark's bearing from the camera
4. Verify each landmark's left/right placement in the frame matches its real bearing

**Baku-specific landmark coordinates (canonical):**
| Landmark | Coordinates | Position |
|---|---|---|
| Maiden Tower (Qız Qalası) | 40.366°N, 49.838°E | Old City, eastern coast |
| Flame Towers | 40.359°N, 49.829°E | Bayil hill, SOUTH-WEST of Maiden |
| Heydar Aliyev Center | 40.396°N, 49.867°E | NORTH-EAST of Old City (~5 km) |
| SOCAR Tower | 40.380°N, 49.852°E | NE of Maiden (~2 km) |
| Baku TV Tower | 40.404°N, 49.870°E | NORTH-EAST of Old City (~5 km) |
| Government House | 40.371°N, 49.851°E | Just north of Old City |
| Highland Park / Şəhidlər Xiyabanı | 40.359°N, 49.825°E | Adjacent to Flame Towers (same hill) |

**Canonical modern-Baku panorama view (CORRECTED 2026-05-19 from user reference photos):**
The iconic "modern Baku skyline" shot is taken **FROM the Baku Boulevard (Dənizkənarı Milli Park) promenade itself**, near the bay's curve, looking NORTH-WEST along the coastline. It is NOT a cross-bay shot with Maiden Tower in the foreground.

From this canonical Boulevard-vantage shot, visible elements:
- **Foreground:** the Boulevard's stepped stone promenade, modern WHITE-painted steel railings along the water, palm trees + green ornamental trees, warm-amber street lamps producing long-exposure starbursts, a few silhouetted people on the steps
- **Mid-water (right):** the Caspian Bay, warm street-lamp reflections as vertical orange-amber streaks on dark blue water
- **Background-right:** Flame Towers on the south-west Bayil hill (elevated, reflective glass, emerging tricolor LEDs at dusk)
- **Background-left:** Baku TV Tower (thin white-and-red metal antenna spike on a northern wooded hill)
- **Background-centre:** modern Baku hillside buildings with many warm window lights glowing amber at dusk
- **Mid-left:** a tall Azerbaijani national flagpole with the tricolor

**NOT visible from this Boulevard shot (do NOT include):**
- Maiden Tower (Qız Qalası) — sits inside Old City, INLAND, hidden behind coastal modern buildings
- Old City crenellated walls — INLAND, hidden behind Boulevard buildings
- Heydar Aliyev Center — north-east, out of frame
- SOCAR Tower — north-east, out of frame or barely visible as a small element

**The Old City + Maiden Tower deserve a SEPARATE close-up reference shot** — a close-medium framing of Maiden Tower with the crenellated Old City walls around it, photographed from inside the Old City or just outside its walls. That is a different iconic Baku image, distinct from the "modern skyline panorama."

**Common AI failure:** model conflates two separate iconic Baku images — the Boulevard skyline panorama AND the Old City close-up — into a single impossible composite. Detection: any frame showing Maiden Tower + Flame Towers + TV Tower together in one wide skyline shot is geographically impossible — these are SEPARATE iconic frames.

**Pozulma misalı (R-17 v1, 2026-05-18):** Bakı panoram kadrında Flame Towers (real-world WEST of Maiden) sağ tərəfdə göstərilib, Maiden Tower sol tərəfdə — bu coğrafi olaraq YANLIŞ-tərslənmişdir (WEST/EAST inversiyası). TV Qülləsi də səhv yerdə (NE-də olmalı, kadrda görünməyə də bilməz; göstərilibsə sağda olmalı, amma şəkildə sol kənarda göstərilib). Fix: promptda explicit "Flame Towers MUST be on LEFT", "Maiden Tower MUST be CENTRE-RIGHT", coordinates göstərildi, NOTHING ELSE clause-da TV/SOCAR/Aliyev Center explicit excluded.

**General qayda:** İstənilən real şəhərin panoram kadrını yazanda — landmark coordinates-i araşdır, viewpoint-i təyin et, sonra promptda **left/right placement-i explicit lock et** real geography əsasında. Aesthetic preference NEVER override edə bilməz real geography-ni.

### A9.6 — Baku coastline architecture: NO coastal fortress wall (modern Baku)
**Critical Baku-specific rule:** Modern Baku has **NO continuous coastal fortress wall** along the Caspian shore. The historic sea-wall (one of two original fortress walls, between the city and the sea) was **destroyed long ago**; only the inland Old City (Icherisheher) walls remain.

**Real-world Baku coast structure (from sea toward city):**
1. Caspian Sea / Baku Bay water
2. Coastal edge — low modern promenade railing (NOT a fortress wall, NOT crenellated)
3. **Baku Boulevard (Dənizkənarı Milli Park / Seaside National Park)** — a wide modern landscaped promenade: palm trees and ornamental trees, paved walking paths, street lamps, low landscaped gardens, pavilions, modern small structures. ~150–500 m wide depending on section.
4. Modern road / coastal avenue
5. **Old City (Icherisheher) walls** — set back **approximately 500 metres INLAND** from the water; 12th-century crenellated sandstone walls forming a contained inland enclosure
6. Maiden Tower (Qız Qalası) — inside the Old City, at its sea-facing edge
7. Modern Baku spreading inland behind

**AI failure mode:** Model renders the iconic Maiden Tower + crenellated walls **directly on the waterfront** as a coastal fortress, because that visually evokes "ancient citadel by the sea" archetype. This is **geographically wrong** for modern Baku — the walls are set back, the Boulevard separates them from the water.

**Pozulma misalı (R-17 v2, 2026-05-19):** Bakı panoramında Maiden Tower-in ətrafındakı qala divarları suya bitişik göstərilib — sahil bulvarı yox, bulvar ağacları yox, sahil promenadası yox. Bu, "dəniz kənarındakı qədim qala" arxetipi idi — real Bakı belə deyil. Fix: promptda explicit "walls set back ~500m, Baku Boulevard between walls and water, NO coastal fortress wall" anchoring.

**Detection during validation:** Look at the waterline of any Baku frame. Is there a crenellated fortress wall RIGHT on the water? If yes → ❌. Is there a modern Boulevard (trees, paths, lamps) along the coast with Old City walls visible INLAND behind it? If yes → ✅.

**General qayda for any city skyline:** Research the actual layered structure from waterline inland — many old cities have demolished their sea walls and replaced them with modern promenades. Don't assume "old walls = coastal walls". Always verify with real photos and city plans.

### A9.7 — Lighting technology vs city's electrification year (formal/state buildings)
Formal buildings (palaces, parliaments, government offices, theatres, embassies, prestige hotels) **adopt electric lighting first** in any electrified city, typically within years of the city receiving electric service. Candles, candelabras, and oil lamps in a formal/state building **AFTER the city's electrification year** are anachronistic — those buildings used electric chandeliers and electric sconces.

**City electrification reference (verified):**
| City | First electric lighting | Notes |
|---|---|---|
| Baku | 1880 | Major industrial city; early adopter |
| Tiflis (Tbilisi) | 1887 | Caucasian Viceroyalty capital |
| Istanbul | 1914 | Late but pre-WWI |
| Paris | 1881 | Early adopter |
| London | 1881 | Early adopter |
| Moscow | 1883 | Early adopter |

**AI failure mode:** Model defaults to "romantic candlelight" for any dignified period scene (signing ceremonies, diplomatic moments, formal portraits) because candlelight = cinematic-trope shorthand for "important historical moment." Ignores city's actual electrification status.

**Pozulma misalı (P-04 v1, 2026-05-20):** Tiflis 1918 (Russian Imperial Viceroy's Palace, Great Hall, 2-nd floor) — Azerbaijan Declaration of Independence signing prompt included "three-branch brass candelabra glowing warm flame yellow 1900K." But Tiflis electrified in 1887, and the Viceroy's Palace certainly had electric chandeliers by 1918. Lit candles in this setting = anachronism. Fix: candelabra removed; primary light = warm late-afternoon daylight through tall French windows; secondary practical = unlit brass-and-green-glass electric desk lamp (period 1900s, present but off because daylight sufficient).

**Detection during validation:** 
1. Identify the city + year of the scene
2. Check if the city was electrified by that year (use table above; for cities not listed, web search)
3. Identify the building's prestige tier (state palace > theatre > middle-class home > rural cottage)
4. If electrified AND prestige tier ≥ 2 → lit candles/oil lamps are ❌ anachronistic
5. Allowed exceptions: power outage scene, deliberate ceremonial candle (e.g., religious rite, birthday cake, séance, funeral) where the candle is the subject, not utility lighting

**General qayda:** "Period drama" ≠ "candles by default." Verify electrification + building tier. Pre-electric scenes get kerosene/gas/candles; post-electrification formal buildings get electric chandeliers and sconces. Romantic-candlelight trope must be earned by the scene's logic, not imported as default mood.

### A9.8 — State symbols verified against formal adoption year
National flags, coats of arms, state emblems, anthems, and seals each have a **formal adoption date**. Depicting any state symbol **before its adoption date** is an anachronism. Modern viewers often assume "this country always looked like this," but national symbols have specific historical timelines.

**AI failure mode:** Model fills in "Azerbaijani symbol" or "post-Soviet country emblem" by interpolating modern iconography (modern coat of arms, modern tricolor, modern flag motifs) into period scenes — without checking when those symbols were actually adopted.

**Azerbaijani state symbols — verified adoption timeline:**
| Symbol | Adopted | Notes |
|---|---|---|
| First Azerbaijani flag (red with white crescent + 8-pt star) | early 1918 (pre-Nov) | The ADR's original simple flag, used through summer 1918 |
| Tricolor flag (azure / red / green with crescent + 8-pt star) | 9 November 1918 (Ganja) | Adopted by ADR; modified slightly in 1919 |
| ADR state emblem / coat of arms | **NEVER FORMALLY ADOPTED** | Competitions ran March 1919 and Jan 1920; both failed; ADR fell April 1920 without an adopted emblem |
| Soviet Azerbaijan emblem | 1920 onward | Communist iconography (hammer + sickle + grain) |
| Modern Azerbaijani national emblem | 19 January 1993 | Based on a 1919–1920 ADR draft, modernised |
| Modern restored tricolor | 5 February 1991 | Re-adopted from ADR original |

**Pozulma misalı (P-05 v1, 2026-05-20):** Istanbul 1918 diplomatic dispatch prompt included "red wax seal bearing the impression of an early Azerbaijan Democratic Republic emblem (a crescent and star in a wreath)." But the ADR had NO formally adopted coat of arms — the competitions of 1919 and 1920 produced no approved emblem. The "crescent and star in a wreath" motif on a wax seal in 1918 is anachronistic invention. Fix: replaced state-emblem seal with a **personal diplomatic monogram seal** — three Arabic letters interlaced in a small cartouche (the cypher of the delegation's representative, in period 1910s Ottoman-Azerbaijani engraver style). Added explicit guard clause: tricolor flag motif also excluded (tricolor was adopted 9 November 1918 in Ganja — the dispatch predates it).

**Detection during validation:** For any state-symbol element in frame (flag, emblem, seal, coin, stamp, official letterhead):
1. Identify the symbol depicted
2. Look up its formal adoption date
3. Compare to the scene's date
4. If symbol's adoption > scene date → ❌ anachronistic
5. If unclear what symbol is depicted → ask user OR replace with a period-safe alternative (personal monogram, religious motif, generic period decorative pattern)

**General qayda:** Don't infer state symbols from modern reference — research the formal adoption date for every state symbol. Many newly-independent states (early 1918–1920 wave, post-1991 wave) had **multi-year gaps** between independence declaration and emblem adoption. During those gaps, official documents used personal monograms, religious invocations (besmele), Latin-script European-style letterhead, or Ottoman/Russian Imperial holdovers. Period-accurate render = NO state emblem during the gap.

### A9.9 — Lamp anatomy must be period-pure (no hybrid eras)
Choosing the right lighting *technology* for the year+city (A9.7) is not enough — the lamp's **anatomical parts** must all belong to the SAME lighting era. AI image models routinely render **hybrid lamps**: e.g., a kerosene fuel reservoir + visible flame at the bottom, BUT topped with an Edwardian electric-era frosted-glass dome shade. The "type" of lamp is technically correct (kerosene in a pre-electric scene) but the rendered object is an anachronistic Frankenstein of two eras. This rule applies to **any pre-electric period kadr and any early-electric period kadr** — both regimes have specific anatomies that must not bleed into each other.

**AI failure mode:** Training data labels "antique lamp" reference images across multiple decades (1850s–1930s) without anatomical separation. When a prompt says "period oil lamp" or "period table lamp," the model interpolates parts across the entire "antique-looking" cluster — typical hybrid = kerosene base + flame + glass chimney + frosted Edwardian dome shade on top.

**1850s–1880s kerosene lamp — period-correct anatomy:**
- BASE: brass OR clear/colored glass FUEL RESERVOIR (10–20 cm, bulbous or columnar)
- WICK MECHANISM: flat or round (Argand) cotton wick + small brass WICK ADJUSTMENT KNOB on the side
- CHIMNEY: CLEAR glass chimney (bulbous at base, narrowing toward top) — NEVER frosted, NEVER a colored shade over the chimney
- FLAME: VISIBLE yellow-orange flame inside the clear chimney
- OPTIONAL diffuser: simple brass REFLECTOR RING at chimney top, OR a metal SHADE pointing light downward, OR no shade at all
- FORBIDDEN parts (era-mixing): frosted-glass dome shade above, green banker's-lamp shade, Tiffany stained-glass shade, visible incandescent bulb, on/off switch, pull-chain, electrical cord

**1880s–1910s early electric lamp — period-correct anatomy:**
- BASE: brass or cast-iron pedestal
- NO fuel reservoir, NO wick, NO chimney, NO visible flame
- BULB: early carbon-filament Edison bulb visible through the shade (warm ~2400–2700K glow)
- SHADE: opal-glass dome, green-glass banker style, or Tiffany stained-glass (period-correct for electric only)
- CORD: visible cloth-wrapped electrical cord running off-frame
- FORBIDDEN parts: fuel reservoir bowl, wick adjustment knob, glass chimney with flame inside, kerosene-style brass fuel base

**Prompt templates (use verbatim; see also image-prompt-engineer/knowledge/lighting.md "Period lamp anatomy" section):**

Kerosene:
```
A period-correct KEROSENE OIL LAMP on the desk: brass fuel reservoir base
(holding kerosene fuel), small brass wick-adjustment knob on the side, a
CLEAR GLASS BULBOUS CHIMNEY above the wick (curved at the bottom, narrowing
toward top), with a VISIBLE YELLOW-ORANGE FLAME inside the chimney casting
warm ~3000K light. NO frosted shade, NO electric bulb, NO shade above the
chimney (or only a simple brass reflector ring). Period-pure kerosene
anatomy — NO Edwardian electric-era shade hybridized onto a kerosene base.
```

Early electric:
```
A period-correct EARLY ELECTRIC DESK LAMP: brass pedestal base, NO fuel
reservoir, NO wick, NO chimney, NO visible flame. An early Edison
carbon-filament bulb visible through an opal-glass / green-glass /
Tiffany-style shade, casting warm yellow tungsten light (~2700K). Cloth-
wrapped electrical cord running off-frame. Period-pure electric anatomy
— NO kerosene reservoir, NO wick mechanism, NO glass chimney with flame.
```

**Detection during validation:** Open the generated cell at 100% zoom on the lamp and run this 3-step check:
1. **Is there a visible flame inside a glass chimney?** → if YES, this is kerosene anatomy. Proceed to step 2.
2. **Is there a shade above the chimney/bulb?** If YES, what TYPE?
   - CLEAR glass chimney with nothing else above (or only a brass reflector ring) → ✅ OK for kerosene
   - Frosted glass dome / opal / green banker / Tiffany shade → ❌ ELECTRIC-only feature
3. **Conflict check:** flame inside chimney + electric-style shade above the chimney = ❌ HYBRID ANACHRONISM. Regenerate with explicit period-pure prompt (see templates above). Same in the other direction: an electric-style shade + bulb + cord but with a visible flame or fuel reservoir below = ❌ hybrid.

**General qayda:** A9.7 chooses the lighting *technology* (kerosene/gas/electric) from the city+year electrification timeline. A9.9 enforces that the lamp **rendered for that technology** uses only anatomically pure parts from that one era. Both checks must pass independently. Cross-reference: image-prompt-engineer/knowledge/lighting.md → "Period lamp anatomy — must be era-pure" section (full prompt templates + part lists); image-prompt-engineer/knowledge/physical-realism.md → "lit lamp ⇒ darker ambient" practical-source rule.

---

## Bölmə 10 — Functional placement (məntiqi yerləşmə)

Hər obyekt **funksional rolu olduğu nöqtədə** yerləşməlidir. Obyektin məqsədi (istifadə, danışıq, qeyd, hərəkət) anchor-dırsa, o anchor-a yaxın render olunmalıdır. Boş hava boşluğunda "dekorativ" yerləşdirmə məntiq pozulmasıdır — AI modeli sıxlıqla equipment-i estetik kompozisiya üçün boş yerə qoyur, funksional anchor olmadan.

### A10.1 — Mikrofonlar / qeyd alətləri
- Mikrofon **danışan adamın qarşısında** olmalıdır: sədrlik yeri, podium, intervyu obyekti, müsahibə masası
- Mikrofon stenddə, lakin **heç kimin qarşısında olmayan boş nöqtədə** dayanıbsa → pozulma
- Mətbuat brifinq səhnələri: mikrofon dəstəsi tribunada və ya natiqin qarşısında, NEVER otağın boş mərkəzində və ya divara yaxın "havada"

**Pozulma misalı (R-15 v1, 2026-05-18):** Konstitusiya Komissiyası iclas otağında mikrofon dəstəsi sağ tərəfdə kreslolarla pəncərə arasında dayanıb — heç bir natiqin qarşısında deyildi, sədrlik yerindən uzaq, tribunada yox. Mikrofonun funksional rolu (danışıq qeyd etmək) anchor-suz idi.

### A10.2 — Broadcast kameralar
- Tripoddа kamera fokus istiqaməti **səhnə nüvəsinə yönəlməlidir** (sədr, podium, action)
- Kamera havada kim bilir nəyə baxır → pozulma
- Press perimetrdə dayanırlar, lakin obyektivləri kadrın funksional nöqtəsinə yönəlir

### A10.3 — Podium / lectern
- Mikrofon + əyilmiş səth = natiqin yeri olmalıdır
- Heç kim üçün nəzərdə tutulmayan "dekorativ podium" → pozulma

### A10.4 — Telefon / kommunikasiya cihazı
- Masa telefonu = oturan adamın çatılan məsafəsində
- Divarda telefon = giriş zalı, koridor, praktik nöqtə
- Otağın ortasında stenddə telefon → pozulma

### A10.5 — Kresloların yönü
- Kresloların yönü = nəzərdə tutulan istifadəyə uyğun (masaya, ekrana, çıxışa)
- Boş istiqamətə baxan kreslo → pozulma və ya açıq səbəb (tərk edilmiş otaq, dağıdılmış səhnə)

### A10.6 — İş alətləri (faylar, qovluqlar, kompüterlər)
- Hər iş aləti **istifadə nöqtəsində** olmalıdır (masada, rəfdə, əllərdə)
- "Just decoration" obyektləri (vaza, bitki, dekorativ sənət) istisnadır — onlar funksional anchor tələb etmir, lakin **dekorativ niyyəti** açıq olmalıdır

### A10.7 — Press equipment cluster
- Mətbuat klasteri (mikrofon + kamera + işıq) **bir koordinat sistemi**ndə olmalıdır — hamısı eyni funksional fokusa
- Mikrofon bir tərəfə, kamera başqa tərəfə, işıq üçüncü tərəfə baxır → pozulma

### A10.8 — Place setting consistency (formal multi-seat meetings)
Formal çox-saatlıq oturmalar — komissiya, konfrans, dövlət şurası, məclis, parlament komitəsi, redaksiya yığıncağı — üçün **hər iştirakçı eyni baza place setting-ə malik olmalıdır**.

- Əgər **sədrlik yerində** su qarafası/stəkanı varsa → hər iştirakçının yerində də su olmalıdır (sadəcə stəkan, ya stəkan + intervallarla ortaq qarafa)
- Əgər **bir yerdə** kağız/qələm/qovluq varsa → hər yerdə təkrarlanmalıdır
- Mətbuat brifinq səhnələrində: hər jurnalist üçün eyni qeyd vasitəsi (notebook və ya kassetli diktofon)
- Hospitality məntiqi: çox-saatlıq iclasda iştirakçılara su təmin edilməməsi qeyri-real

**AI failure mode:** Model **VIP/sədr/lider** yerini ayrıca diqqətlə işləyir (su, qələm, qovluq), qalan yerləri "ekonomik" buraxır (yalnız kağız) — bu real protokol pozulmasıdır. Sədr üçün hospitality, qalanları üçün heç nə → vizual olaraq "yalnız bir adam üçün hazırlanmış otaq" effekti yaranır.

**Pozulma misalı (R-15 v2, 2026-05-18):** 1995 Azərbaycan Konstitusiya Komissiyasının iş otağında sədrin qarşısında su qarafası + stəkan var idi, lakin digər ~15 iştirakçının qarşısında **yalnız kağız stack** idi — su yox idi. Saatlarla davam edən rəsmi konstitusiya iş iclasında bu absurddur. Fix: hər iştirakçının yerinə clear-glass water tumbler + masa boyu intervallarla ortaq qarafalar əlavə olundu.

**Detection during validation:** Place setting-lərə bax, **birində olan amma digərlərində olmayan** elementi tap. Əgər həmin element hospitality/utility (su, qələm, qovluq, mikrofon əgər çox natiqdirsə) kateqoriyasındandırsa → ❌.

**General qayda:** Hər communication/recording/work equipment üçün **soruş**: "Bu nə üçün buradadır? Kim üçün? Nə zaman istifadə olunur?" Cavab **funksional anchor**-a aparmalıdır. Aparmırsa → ❌. Eyni qayda hospitality element-ləri üçün: "Hər iştirakçı saatlarla burada oturacaqsa, onlara nə lazımdır?" — su, kağız, qələm "hamı üçün" olmalıdır.

### A10.9 — Lived-in working zones (offices, studios, meeting rooms)
Hər **aktiv iş məkanı** (ofis, studio, redaksiya, prezident kabinetləri, dövlət iş otaqları) ən azı 2-3 funksional zona ehtiva etməlidir ki, "muzey eksponatı" görüntüsü yaratmasın:

1. **Primary work zone** (məcburi): iş masası + kreslo + masada istifadədə olan əşyalar (kağız, qələm, telefon, lampa)
2. **Secondary functional zone** (məcburi): qonaq oturma sahəsi (kreslolar/divan + aralıq masa), VƏ YA kitab rəfləri, VƏ YA məsləhət/arxiv küncü
3. **Tertiary period anchor details** (məcburi): dövrə uyğun office accessories — telefon, divar saatı, masa lampası, ofis xəritəsi, leather-bound books, period filing cabinet

**AI failure mode:** Model VIP/leader üçün yalnız "symbolic icons" yığır — desk + chair + flag + emblem + chandelier — bu **"memorial display of an office"** görüntüsü yaradır, real working office görüntüsü deyil. Real iş ofisləri **qonaq seating, reference books, dövr communication equipment, divar saatları** ehtiva edir.

**Pozulma misalı (R-18 v1, 2026-05-19):** 1990-cı illərin sonu Heydər Əliyev ofisi yalnız desk + leather chair + flag + emblem + chandelier + drapes + rug ilə yazılmışdı. Heç bir qonaq kreslosu, kitab rəfi, period telefon, divar saatı yox idi. Otaq "memorial display" kimi görünürdü — boş və lifeless. Fix: visitor armchairs + side table with armudu tea glasses + built-in bookshelves with mixed-color spines + 1990s desk telephone + brass wall clock + framed Azerbaijan map + desk lamp əlavə olundu — otaq lived-in working office görünüşü aldı.

**Detection during validation:** Boş işləyən məkana bax. Soruş: "Burada kim oturur? Onunla görüşməyə kim gəlir? Hansı işlə məşğul olurlar?" Cavablardan yaranan element-lər ekranda görünməlidir. Görünmürsə → ❌. 

**Balance qaydası:** Lived-in ≠ cluttered. Complexity budget hələ də (1 primary zone + 1-2 secondary zones + 5-9 materials + max 2-3 light sources) qalır. Boşluğu doldur, amma chaos yaratma.

**General qayda:** "Yox-opulence" = sober materials + restrained scale, NOT empty room. Sade dövlət ofisi belə **lived-in olmalıdır** — sadəcə qızıllı deyil. "Restrained dignity" ≠ "vacant memorial display".

### A10.10 — Two-handed operation devices
Bəzi alətlər **iki-əlli əməliyyat predmetləridir** — onları "mid-action" göstərən kadrda **hər iki əl çalışan vəziyyətdə olmalıdır**, tək əl yox:

- **Yazı makinası (typewriter)** — touch-typing və ya near-touch standart pozadır; tək-əllə "hunt and peck" amateur pozasıdır, professional jurnalist/typist üçün yanlış
- **Piano / fortepiano / organ** — iki əl, hər iki tərəfdə klaviaturada
- **Akkordeon / qarmon** — bir əl bass, bir əl klaviatura — hər ikisi həmişə aktivdir
- **Telephone switchboard (1900s–1970s)** — operator iki əllə kabel keçidləri edir
- **Sewing machine (treadle)** — bir əl parçada, bir əl çarx/fly-wheel-da
- **Tar / kamança / saz / setar** — bir əl pərdələrdə, bir əl mizrabda/yayda
- **Aşbazlıq aletləri** — bir əl bıçaqda, bir əl tərəvəzi tutur; tək əllə doğrama yanlış
- **Daktiloqraf, stenoqraf, mühasibat klaviaturası** — iki-əlli iş

**AI failure mode:** Model çox vaxt **tək-əl "casual" pozanı** seçir (training data Hollywood-cum-stock-photo stereotype: "thoughtful typist with one finger hovering"). Bu, real istifadə posturasını pozur və "qarşılaşma yaranır" mənasını verir, "iş gedir" yox.

**Pozulma misalı (P-06 v1, 2026-05-20):** 1919 Bakı "Azərbaycan" qəzeti redaksiyasında jurnalist Remington Arabic typewriter-də **tək sağ əllə** yazılı göstərilib. Real working journalist mid-deadline posturası iki-əlli touch-typing-dir. Fix: both hands at the keyboard explicit anchored — sol əl klaviaturanın sol yarısında, sağ əl sağ yarısında, hər iki index finger key strike pozisiyasında slight motion-blur ilə; hər iki qol eyni geyimdə (white linen cuff + navy waistcoat); hər iki əldə period-realistic ink-smudge fingertip pads-da.

**Detection during validation:** İki-əlli istifadə predmetinin "mid-action" kadrını yoxlayanda — soruş: "Bu alət ENSEMBLE-də iki əl tələb edirmi?" Cavab YES-dirsə və yalnız bir əl görünürsə → ❌ (digər əl çərçivədən çıxa bilər, amma şəkildə görünən əl tək başına o iş üçün məntiqsizdir).

**General qayda:** Hər tool/instrument üçün soruş: "Real professional bunu necə istifadə edir? Bir əllə? İki əllə? Hansı pozada?" Stock-photo stereotype yerinə real posturanı promptda explicit anchor et.

### A10.11 — Machine control placement (functional, not generic)
Mexaniki cihazların idarə qolları, düymələri, və ya levers **funksional, tarixi-konvensiya yerlərində** olmalıdır — "alətə yapışdırılmış generik qol" yox. Hər mexanizm üçün control elements **işləyəcəyi yerdə** olmalıdır (ergonomic + mechanical reason).

**Misalı (period machine-by-machine):**

| Cihaz | Kontrol element | Düzgün yer |
|---|---|---|
| Manual typewriter (Remington/Underwood/etc., 1900–1960s) | Carriage return lever | **Karetkanın (hərəkət edən üst hissə) sol-yuxarı ucunda**, yuxarı-xaricə əyilir; karetka ilə birgə hərəkət edir |
| Manual typewriter | Margin release | Klaviaturanın yuxarısında, sol-sağ ortada, kiçik düymə |
| Manual typewriter | Line-spacing knob | Karetkanın sağ ucunda, plateni döndərmək üçün |
| Vintage telephone (1900–1940s) | Receiver hook | Aparatın yuxarısında, U-şəkilli çəngəl |
| Vintage telephone | Rotary dial | Aparatın ön üzündə, düz mərkəzdə |
| Steam locomotive | Throttle / regulator | Operator's cab, sağ yan, böyük metal qol |
| Old camera (rangefinder) | Shutter release | Yuxarı üzdə, sağ tərəfdə (right-hand operation) |
| Sewing machine (treadle) | Fly-wheel | Sağ tərəfdə, böyük metal çarx |
| Old radio (Bakelite, 1930s–50s) | Tuning knob | Ön üzdə, ortada və ya sağda; volume knob ayrıca |

**AI failure mode:** Model machine ilə bağlı **generic curved metal arm**-ı uydura bilər və onu cihazın "estetik dramatic" yerinə yapışdırar — alt-sol, ön-sağ, və s. — funksional konvensiyanı tanımır. Sonda mexanizm məntiqsiz görünür: "bu nə qoldur, nə üçün burada?"

**Pozulma misalı (P-06 v1, 2026-05-20):** Remington Arabic typewriter şəklində carriage return lever **gövdənin alt-sol hissəsində** uzun nikellənmiş əyri qol kimi göstərilib. Bu mexaniki olaraq yanlışdır — Remington 10-da carriage return lever **karetkanın (hərəkət edən üst hissə) sol-yuxarı ucunda** olmalıdır, üfüqi olaraq yuxarı-xaricə əyilir; karetka ilə birgə hərəkət edir. Gövdənin altında belə bir qol yoxdur (yalnız margin release tab və line-spacing knob kompakt-integrated). Fix: "CRITICAL MECHANICAL DETAIL — CARRIAGE RETURN LEVER PLACEMENT" bloku promptda explicit yerləşdirildi, "NO curved lever protrudes from the lower body or base" exclusion clause ilə.

**Detection during validation:** Şəkildə mexaniki bir cihaz görünürsə (typewriter, telefon, kamera, lokomotiv, qatar, dirijabl, və s.):
1. Cihazın tarixi modelini tanı (Remington Standard №10? Ya Underwood №5? Ya Oliver?)
2. Real referans şəkillər üçün web search et (məs. "Remington Standard 10 typewriter carriage return lever")
3. Şəkildəki kontrol elementlərin yerini real konvensiya ilə müqayisə et
4. Generic "lever attached for drama" görürsənsə → ❌; əgər kontrol element historically-accurate yerdə deyilsə → ❌

**General qayda:** Mexaniki cihaz yazanda — istifadəçidən və ya web-dən **tarixi referans şəkilə bax** və kontrol element-lərin **funksional konvensiya yerini** promptda explicit anchor et. AI model machine-i "stylized stereotype"-də render edə bilər; explicit anchor olmadan kontrol element-lər səhv yerlərdə render olunur. Bu rule [[A10.1]] – [[A10.7]] (microphone/camera/podium/telephone/chair functional placement) sxemi cihaz-daxili kontrolların yerinə tətbiq olunur.

---

## Yoxlama cədvəli (final output şablonu)

```markdown
## Qat A — Physical realism

| # | Bölmə | Checkpoint | Verdikt | Qeyd |
|---|---|---|---|---|
| A1.1 | Gravity | Bütün obyektlər real dayaq üzərində | ✅ | — |
| A1.2 | Gravity | Attachment məntiqli (clothesline iki ucu) | ❌ | Sağ ucu havada bitir |
| A2.1 | Light | İşıq mənbəyi vizual aydın | ✅ | Sol pəncərə görünür |
| A2.2 | Light | Kölgə istiqaməti mənbəyə uyğun | ❌ | Pişik kölgəsi yanlış istiqamətdə |
| A3.1 | Time | Sky saatla uyğun | ✅ | Pre-dawn deep blue OK |
| A3.2 | Time | Praktik işıqlar saatla uyğun | ✅ | Gündüz, lampa söndürülmüş |
| A4 | Weather | Yağış/qar/duman logical | ✅ | Yox (interior scene) |
| A5.1 | Anatomy | İnsan 5 barmaq | ⚠️ | Sol əl yarımca, sayılmır |
| A5.4 | Anatomy | Pişik 4 ayaq + 2 qulaq | ✅ | Tam |
| A6.3 | Material | Parça (linen) drape məntiqli | ✅ | Soft rumple visible |
| A6.6 | Material | Ağac grain visible | ✅ | Masa OK |
| A7.3 | Architecture | Pilləkən bilateral struktur | N/A | Bu səhnədə yoxdur |
| A8.1 | Composition | Perspective consistent | ✅ | Single VP, OK |
| A9.1 | Cultural (Bakı) | Soviet balkon detalları | ✅ | Iron rail, concrete OK |
```

---

*Versiya: 1.10 | Sinxron: image-prompt-engineer/knowledge/lighting.md "Period lamp anatomy" + physical-realism.md v1.x | Son yenilənmə: 2026-05-21 (A9.9 Lamp anatomy must be period-pure — hibrid lampa anatomiyaları: kerosene base + flame + Edwardian electric frosted shade kimi; A9.7 lighting-tech choice-u tamamlayır). Əvvəlki yenilənmə 2026-05-21: A5.9 Anti period-grit stereotype check — Hollywood period-grit default-u universal AI failure mode; A5.8 Face diversity in multi-figure cells. 2026-05-20: A9.7 Lighting tech vs city electrification year — Tiflis 1918 candelabra anaxronizmi; A9.8 State symbols verified against formal adoption year — ADR 1918 coat-of-arms anaxronizmi; A10.10 Two-handed operation devices — single-hand typewriter posturası; A10.11 Machine control placement functional convention — carriage return lever yanlış yerdə)*
