# Prompt → Image Consistency Checks — Image Validator

Bu fayl image-validator-in **Qat C** üçün istifadə etdiyi check-list-dir. Promptdə yazılan **hər instruction faktiki şəkildə icra olunubmu**?

---

## Əsas prinsip

Promptdə yazılan **hər cümlə instruction-dur**. Şəkil onu icra etməlidir. Əgər icra olunmayıbsa → bu image model failure (estetik məsələ deyil, fakt məsələsi).

---

## Yoxlama metodologiyası

### 1. Promptu parça-parça oxu

Prompt mətnini cümlə-cümlə (və ya phrase-phrase) ayır. Hər birini **müstəqil instruction** kimi qəbul et.

**Misal prompt:**
> "Generate a photorealistic film still of an 8-year-old Azerbaijani girl with olive-tan skin, long dark wavy hair, and large olive-green eyes. She is sitting cross-legged on a kitchen floor at 7am morning light. Wearing a rose-pink linen dress, knee-length, slightly rumpled. A calico cat (grey-white-orange patches) curls beside her. Soft single key light from the camera-left window, neutral 5600K daylight, gentle shadows falling to camera-right. No lamps lit, no candles. Pixar 3D animation style, emotional truth, appeal-driven. Aspect 9:16 vertical."

**Instruction çıxarışı:**

| # | Instruction phrase |
|---|---|
| 1 | 8-year-old |
| 2 | Azerbaijani girl |
| 3 | olive-tan skin |
| 4 | long dark wavy hair |
| 5 | large olive-green eyes |
| 6 | sitting cross-legged |
| 7 | kitchen floor |
| 8 | 7am morning light |
| 9 | rose-pink linen dress |
| 10 | knee-length |
| 11 | slightly rumpled |
| 12 | calico cat |
| 13 | grey-white-orange patches |
| 14 | curls beside her |
| 15 | soft single key light |
| 16 | camera-left window |
| 17 | 5600K daylight |
| 18 | shadows to camera-right |
| 19 | no lamps lit |
| 20 | no candles |
| 21 | Pixar 3D animation style |
| 22 | emotional truth |
| 23 | appeal-driven |
| 24 | aspect 9:16 vertical |

### 2. Hər instruction üçün şəkili yoxla

Hər element üçün:
- ✅ — promptdə yazılan tam icra olunub
- ❌ — promptdə yazılan icra olunmayıb (yox, yanlış, fərqli)
- ⚠️ — instruction icra olunub, lakin əlavə şeylər də var (promptdə yox idi)
- N/A — instruction subyektiv/qiymətləndirilə bilməz (məs. "emotional truth")

### 3. Cədvələ yaz

```markdown
## Qat C — Prompt → image uyğunluğu

| # | Instruction | İcra | Verdikt | Qeyd |
|---|---|---|---|---|
| C1 | 8-year-old | Vizual yaş 7-9 | ✅ | — |
| C2 | Azerbaijani girl | Caucasian features OK | ✅ | — |
| C3 | olive-tan skin | Skin tone match | ✅ | — |
| C4 | long dark wavy hair | Long dark hair, wavy slight | ✅ | — |
| C5 | large olive-green eyes | Eyes olive-green, large | ✅ | — |
| C6 | sitting cross-legged | Cross-legged pose | ✅ | — |
| C7 | kitchen floor | Kitchen floor visible | ✅ | — |
| C8 | 7am morning light | Light source cool, low angle morning OK | ✅ | — |
| C9 | rose-pink linen dress | Dress pink linen | ✅ | — |
| C10 | knee-length | Length knee-level | ✅ | — |
| C11 | slightly rumpled | Smooth, no rumple visible | ⚠️ | Drape too perfect |
| C12 | calico cat | Cat present | ✅ | — |
| C13 | grey-white-orange patches | Mostly orange tabby, no grey/white | ❌ | Colour pattern wrong |
| C14 | curls beside her | Cat sitting, not curled | ⚠️ | Sitting upright |
| C15 | soft single key light | Single light source visible | ✅ | — |
| C16 | camera-left window | Window left | ✅ | — |
| C17 | 5600K daylight | Cool white light OK | ✅ | — |
| C18 | shadows to camera-right | Shadows fall right | ✅ | — |
| C19 | no lamps lit | One lamp on table — lit | ❌ | Lamp visibly on |
| C20 | no candles | No candles | ✅ | — |
| C21 | Pixar 3D style | Pixar render style | ✅ | — |
| C22 | emotional truth | N/A | N/A | Subjective |
| C23 | appeal-driven | N/A | N/A | Subjective |
| C24 | aspect 9:16 vertical | 9:16 | ✅ | — |
```

---

## Tipik prompt instruction kateqoriyaları

### Karakter
- Yaş, etniklik, dəri tonu, saç, göz
- Geyim (rəng, material, kəsim, uzunluq, state)
- Distinctive features (scar, glasses, jewelry, makeup)
- Action/poza (sitting, standing, running, holding)
- Expression (smiling, frowning, neutral, crying)

### Məkan
- Type (interior/exterior, room type)
- Time-of-day
- Weather
- Props (specific items mentioned)
- Materials (floor, wall, furniture)

### İşıq
- Source (window, lamp, sun, candle, fire)
- Direction (camera-left/right/up/down, frontal, backlit)
- Color temperature (3200K / 5600K / mixed)
- Intensity (soft, hard, dim, bright)
- Shadow direction (consequence of source)

### Kamera
- Lens (focal length implied — wide/medium/telephoto)
- Angle (eye-level, low, high, overhead)
- Distance (ELS / LS / MS / MCU / CU / ECU)
- Aspect (9:16 / 16:9 / 2.39:1 / 1:1)
- DOF (deep / shallow)

### Stil
- Visual style (photoreal / pixar-3d / anime / vintage-film / etc.)
- Render quality (high detail, painterly, sketch)
- Film stock (35mm, 16mm grain)
- Color grading (warm / cool / desaturated / vivid)

### Negative (NO instructions)
- "No candles lit" → şəkildə şam yox olmalıdır
- "No lamps on" → lampa söndürülmüş olmalıdır
- "No additional people" → tək karakter olmalıdır
- "No floating elements" → hər şey dayaq üzərində

### Aspect & technical
- Aspect ratio
- Resolution implied
- Frame composition (rule of thirds, centered, asymmetric)

---

## Tipik failure pattern-lər

### F1 — Negative instruction ignored
"No lamps lit" yazılıb, lakin model lampa yandırır. Bu **AI üçün ən tipik failure**-dir — negative instruction-ları zəif icra edir.

**Fix tövsiyəsi:** Negative-i aqressiv yenidən yaz: "ALL lamps in the scene are OFF — bulbs dark, no warm glow. Verify by checking each lamp object."

### F2 — Multi-colour pattern simplified
"Calico cat (grey-white-orange)" → model orange tabby çəkir. AI multi-colour pattern-ları **birinci colour-a basit edir**.

**Fix tövsiyəsi:** Colour distribution dəqiq yaz: "Cat with three colour patches: WHITE belly and chest (40%), GREY back and head (35%), ORANGE rear quarters and ears (25%). Distinct patches, not a tabby pattern."

### F3 — Light direction ignored
"Light from camera-left" → model işığı sağdan və ya yuxarıdan rendered edir. Camera-relative directions **AI üçün çətindir**.

**Fix tövsiyəsi:** Verify clause əlavə et: "Light from camera-LEFT. The LEFT side of subject's face is bright, RIGHT side in soft shadow. Verify by checking which cheekbone is highlighted."

### F4 — Material ignored
"Linen dress, slightly rumpled" → model silk-smooth dress çəkir. Texture mood subordinate olur.

**Fix tövsiyəsi:** Material aqressiv: "LINEN fabric — visible WEAVE texture, NATURAL rumples and creases at waist and elbows. NOT silk, NOT polyester, NOT smooth."

### F5 — Visual style drift
Pixar-3d layihədə photoreal şəkil çıxır (və ya əksinə).

**Fix tövsiyəsi:** Style aqressiv yenidən yaz: "Rendered in PIXAR 3D ANIMATION style — stylized characters with appeal-driven features, NOT photoreal. Reference: Toy Story, Up, Inside Out. NO realistic skin, NO photo-realistic textures."

### F6 — Number ignored
"5 fingers" yazılıb, lakin model 4 və ya 6 barmaq çəkir. AI counting-də zəifdir.

**Fix tövsiyəsi:** "Hand visible with exactly FIVE fingers — thumb, index, middle, ring, pinky. Verify by counting."

### F7 — Aspect ignored
9:16 yazılıb, lakin model 1:1 və ya 16:9 çıxarır. Model parametri override edib.

**Fix tövsiyəsi:** Aspect-i model parametri kimi qoy (API-də `aspect_ratio: "9:16"`) — yalnız prompt mətnində yazmaqla yetinmə.

### F8 — Time-of-day drift
"Midday 12:00" yazılıb, lakin golden hour shadows çıxır.

**Fix tövsiyəsi:** "Midday at 12:00 noon — sun directly OVERHEAD. Shadows are SHORT (30% of object height) and NEUTRAL white-yellow. NOT warm orange, NOT golden hour. Verify shadow length against object."

### F11 — Model intrinsic limitations (2-iteration threshold)
Bəzi failure pattern-lər **prompt failure deyil, model intrinsic limitation**-dur. 2 iterasiyada eyni ⚠️/❌ təkrar olunarsa, 3-cü cəhd əvəzinə alternative təklif edilir.

**Discovered limitations (per model):**

**GPT-Image-2:**
- **Strong diagonal rain bias** — 15°+ angle rendering zəifdir, model vertical-a yaxınlaşdırır. (Source: P-06 v1→v2)
- **Dark fabric wet/dry contrast in low-light** — black/navy fabric night scene-də wet sheen render etmir. Specular response zəif. (Source: P-06 v1→v2)

**Bu pattern-də necə davranılır:**
1. **Model limitation flag** qaldır
2. **Alternative model təklif et:**
   - Strong diagonal rain → **Flux Kontext** və ya **Midjourney v7** (`--style raw` + storm reference)
   - Dark fabric wet contrast → **Scene preconditioning**: fabric rəngi light dəyiş (beige, light grey, tan) və ya wet area-da bright light source yerləşdir
3. **İstifadəçi qərarına buraxılır** — accept, change model, change scene element

### F12 — Cinema reference as fix tool (universal pattern)
3+ test-də həlledici rol oynayan pattern — master knowledge-ə promote olunma kandidatı.

**Pattern:** Kompleks vizual situations üçün uyğun film/director reference promptə əlavə et. Model film aesthetic-i statistical olaraq güclü association saxlayır.

**Sübut olunmuş istifadə:**
- **Sofia Coppola "Lost in Translation"** → window Fresnel reflection (P-05 v2)
- **Roger Deakins "Blade Runner 2049" / "Sicario"** → wet street + neon reflection + warm orange (P-06 v1+v2)
- **Andrew Stanton "WALL-E"** → silent storytelling emotional truth (Reels test layihəsi)

**Necə tətbiq olunur:**
- Reference adı + film adı + (lazımdırsa) konkret elements ("Lost in Translation hotel window aesthetic" )
- "Like a film scene where..." compositional language
- Director's signature elements (Deakins → warm reflective surfaces; Coppola → intimate cinematography)

### F10 — Glass/mirror surface dual-layer bias
Şüşə və ya mirror səthində **iki layer** (transparency + reflection) eyni anda render edilməlidir, lakin model yalnız bir layer-ə fokuslanır (adətən transparency, reflection drop). Reflection element-lərini scene-ə spatial integration edir (məs. lamp → uzaq bina interyeri kimi).

**Tipik nümunələr:**
- Window night scene: city through glass + room reflected on glass → yalnız city rendered, room reflection lamp-ı city içində rendered (P-05 v1 bug)
- Mirror in lit room: room + person's reflection → yalnız room rendered, mirror surface treats as transparent
- Wet street puddle: ground + sky reflection → yalnız ground rendered, reflection missing

**Root cause:** AI training data-da glass/mirror surface-ləri ya **tamamilə transparent** ya da **tamamilə reflective** kimi statistic dominate edir. Hybrid Fresnel layering (eyni səthdə iki layer eyni anda) zəif association.

**Fix tövsiyəsi:**
1. **Spatial depth explicit positioning:** "Reflection layer AT THE GLASS PLANE depth, NOT at scene depth"
2. **Ghost overlay language:** "translucent ghost", "double-exposure", "X% opacity overlay"
3. **Cinema reference:** Film/director adı istifadə et (məs. "Sofia Coppola Lost in Translation aesthetic") — modelin film training-ini istifadə et
4. **Ultra-aggressive anti-default:** 3+ NOT-clauses ("NOT a streetlight, NOT a distant window, NOT an outdoor lamp")
5. **Position match:** Reflection-ın kadrda harada görünməsi (screen area, height level)
6. **Failure-conditional verification:** "If reflection blends into scene depth → FAILURE → regenerate"

**Discovered by:** P-05 iter 1 (2026-05-15).

### F9 — Dual/Multi-element rendering bias
Prompt-da multiple similar elements yazılıb (məs. iki banister sistemi, üç işıq mənbəyi, dörd dayaq sütunu), lakin model yalnız bir/iki render edir, qalanlarını drop edir.

**Tipik nümunələr:**
- Spiral staircase + outer banister + inner handrail → yalnız outer rendered olunur (P-03 v1 bug)
- Theatre with key + fill + back light → yalnız key və fill rendered olunur
- Bridge with handrails on both sides → yalnız bir tərəfdə handrail rendered olunur

**Root cause:** Statistical association — model "spiral staircase" + "banister" → bir banister sistemi olaraq öyrəndiyi üçün ikincini opsional kimi qəbul edir.

**Fix tövsiyəsi:**
1. **Numbered subsystem headers:** "TWO SEPARATE banister systems — both MUST be rendered" + "3A. Outer banister: ..." + "3B. Inner handrail: ..."
2. **Explicit attachment description** hər subsystem üçün ayrı
3. **"ALL MUST be rendered"** opening clause
4. **Per-element verification:** "- [ ] OUTER banister visible. - [ ] INNER handrail visible. Count brackets."
5. **Parantezdə yazma** — hər vacib element ayrı numbered cümlədə olsun (modelin parantez drop bias-ından qaçın)
6. **Safety/fail language:** "Without [element X], the prompt fails — this is non-negotiable"

**Confirmed by:** P-03 iteration 1 → 2 success.

### F14 — Cell generated in native sepia / B&W instead of full colour
Cell (final kadr şəkili) **native sepia və ya black-and-white** kimi generated olunub, lakin master qaydaya görə cell **full color**-da generated olunmalıdır (sepia/B&W post-production grading-dir, video editorda LUT-la tətbiq olunur).

**AI failure mode:** Skripta "sepia archive photograph" və ya "1920s black-and-white photo" yazılıbsa, prompt yazan **bunu generation specification** kimi qəbul edə bilər və promptda "sepia silver-gelatin", "monochrome", "B&W" yazır. Model də uyğun olaraq native sepia/B&W çıxarır.

**Niyə bu yanlışdır:**
1. Reusability pozulur — full color cell post-prod-da sepia/B&W kimi qrade oluna bilər; tərsi mümkün deyil
2. Character + location anchors full color-dur — cell native sepia olarsa eye colour, kostyum rəngi, skin Fitzpatrick tone silently drift edir
3. Color grading workflow pozulur — DaVinci/Premiere LUT chain full-color input gözləyir

**Detection during validation:**
1. Cell-i image viewer-də aç, histogram-a bax
2. R/G/B kanalları tək luminance band-a yığılıbmı? → ❌ native sepia/B&W
3. Eye colour, kostyum rəngi, skin tone **ölçülə bilirmi**? — yox → ❌
4. Skript "archive look" deyibsə və cell sepia çıxıbsa → ❌ (sepia post-da olmalıdır)

**Fix tövsiyəsi:**
Promptun COLOR bloku yenidən yaz:
```
COLOR: rendered in full colour using project master grade
(Kodak Vision3 5219 emulation, warm amber-ochre highlights,
~15% midtone desaturation, lifted blacks at IRE ~5).
NOT sepia. NOT black-and-white. NOT monochrome.
NOT silver-gelatin. Full chromatic information preserved.
```

**Exception:** Static single-pass deliverable timeline-a girməyəcəksə (poster, editorial card), native sepia generation icazəlidir.

**Pattern referansı:** `image-prompt-engineer/knowledge/color-grading.md` — "Cells in full colour" HARD RULE.

**Discovered:** 2026-05-21, 28-may documentary k.1-k.4 cell promptları native sepia silver-gelatin generation kimi yazılmışdı, full-color character anchors ilə uyğunsuzluq yaradırdı. Bütün cells yenidən yazıldı, sepia post-a köçürüldü.

### F13 — Location reference contains people (pipeline-role violation)
Bu xəta **prompt instruction-failure deyil**, **asset-role failure**-dir. Location ref-də heç bir insan figuru olmamalıdır — insanlar character ref-dən gəlir cell-generation stage-də. (Bax: `location-design.md` HARD RULE #0.)

**AI failure mode:** Modellər insanları default olaraq əlavə edir (training data foto-əksəriyyəti insan içərir). Hətta promptda explicit guard clause olmasa, model "atmosfer üçün bir kiçik figura" və ya "kompozisiya üçün dərinlikdə bir silhouette" yerləşdirir.

**Tipik nümunələr:**
- Boş küçə establishing — modelin əlavə etdiyi distant horse-cart driver silueti
- Boş teatr interyeri — model parterdə dirijor silueti və ya pərdə arxasında stagehand əlavə edir
- Boş otaq — modelin əlavə etdiyi kresloda "defocused figure" və ya hand-at-frame-edge
- Boş həyət — model həyətdə "child silhouette for atmosphere" əlavə edir

**Pozulma misalı:**
- L-01 v1 (2026-05-21, 28-may layihəsi): "boş Köhnə Bakı küçəsi" ref-i yazılıb, amma at-arabası + sürücü silueti distant-dərinlikdə əlavə olunub. Yenidən-yazıldı, at-arabası tamamilə silindi
- L-02 v1: "boş Tağıyev Teatrı" ref-ində iki figura silhouette saxlanılıb (stagehand pərdə arxasında, dirijor parterdə) — yenidən-yazıldı
- L-03A v1: "boş məktəb həyəti" yerinə 22-26 şagird + 2 müəllim qrup foto kimi yazılıb — fundamental asset-role səhvi, character ref ilə combine olunan boş həyət olmalı idi

**Detection during validation:**
1. Output şəkili açın, hər bölmədə (foreground, mid-ground, background, deep background, küncələr) **insan-formalı element** axtarın
2. Silueti, defokuslandırılmış üzü, kölgəni, əli, ayağı, çiyni saymayın "də" — hər biri ❌-dir
3. **Counting question:** "Bu məkanda neçə canlı şey var?" — Cavab >0 olarsa, location ref pozulub

**Fix tövsiyəsi:**
1. Promptun "NOTHING ELSE in the frame" clause-una explicit əlavə edin:
   ```
   NO human figures, NO silhouettes, NO defocused people in background, NO body parts at frame edge,
   NO operated vehicles (no horse-cart driver, no carriage with passengers), NO hands holding objects,
   NO crowd shadows. This is a pure location/environment reference — people are composed in at
   cell-generation stage from character anchor packs.
   ```
2. Stationary atmosfer obyektləri (boş kresloar, mebel, lit/unlit lampalar, statik infrastruktur) — saxlanılır
3. Operated vehicles → parked stationary boş variantla əvəz olunur
4. Hand-at-edge / silhouette → tamamilə silinir

**General qayda:** Hər location ref render olunduqdan sonra **canlı-element-axtarış** keçməlidir. Sıfır insan/silhouette/vehicle-with-driver = ✅; bir və ya çox = ❌, yenidən-generasiya stronger exclusion ilə.

### F15 — Prompt length under budget (char budget violation)

Promptun **char count-u praktik effektiv limit-i aşır**, və nəticədə model ya **silent quality drop** verir (early-token bias-dan sonra son instruction-lar ignor olunur), ya **explicit "prompt too long" error** atır (GPT-Image-2), ya **silently truncate** edir (Nano Banana web UI 2,000 char tavanı).

Bu xəta **prompt instruction-failure deyil**, **prompt-asset-physical-limit failure**-dir. Promptun məzmunu doğru olsa belə, model onu tam görmür.

**AI failure mode:** Model promptun ilk ~500-800 tokenini dominant emal edir, qalanını zəifləyir və ya tamamilə ignor edir. Verbose 8,000-9,000 char promptda kritik instruction-lar (refs identity lock, anti-grit clause, anti-synthetic clause, aspect ratio, lighting timeline) **sondadırsa**, model onları **görməyəcək** — bu da silent quality drop kimi göstərir.

**Verified char limits (web research, 2026-05-21):**

| Model | Technical ceiling | Praktik effektiv | Web UI cap |
|---|---|---|---|
| GPT-Image-2 | 32,000 char | ~3,000 char | dəyişir |
| Nano Banana 2 | 131K tokens API | ~8,000 char API | **2,000 char web** |
| Nano Banana Pro | 65K tokens API | ~8,000 char API | 2,000 char web |
| Midjourney v7 | 6,000 char | ~3,500 char | 6,000 char |
| Flux Pro | ~512 tokens optimal | ~2,000 char | dəyişir |

**Detection during validation:**

1. Validation prosesində **prompt faylının `wc -c` count-unu ölç**:
   ```bash
   cat 05-image-prompts/cell-N.md | wc -c
   ```
2. Thresholds:
   - **≤2,500 char:** ✅ optimal
   - **2,500-3,000 char:** ⚠️ pass, lakin aggressive compression mümkündür
   - **3,000-4,000 char:** ⚠️ quality drop riski, kompress et — flag as warning
   - **>4,000 char:** ❌ aggressive cut LAZIMDIR
   - **>8,000 char:** ❌ multiple model error riski, mütləq yenidən yaz
3. Əgər image-də **kritik instruction icra olunmayıb** (məs. anti-synthetic clause, identity lock, aspect ratio) **VƏ** prompt >3,000 char-dırsa → root cause F15 (length-driven instruction drop), bu instruction-larını ayrı F-checkpoint kimi yazmaq əvəzinə F15 altında qruplaşdır.

**Fix tövsiyəsi:**

Promptu yenidən yaz — `image-prompt-engineer/knowledge/general/prompt-budget.md` faylındakı kompresiya strategiyasını tətbiq et:

1. **CUT:**
   - Verbose color hex palette → rəng adı kifayətdir
   - Lengthy "NOTHING ELSE" lists → 1 cümlə
   - Verbose KEY/FILL/BACK lighting breakdown → 2-3 cümlə
   - Material palette section → subject description-da inline
   - Repeated identity recap → bir dəfə
   - Multi-line camera/grade block → 1 cümlə
2. **KEEP:**
   - Identity + anchor instruction (1-2 cümlə)
   - Camera + lens + DOF (1 cümlə)
   - Primary action + lived moment (1-2 cümlə)
   - Lighting source + temperature (1 cümlə)
   - Period HARD RULE flags relevant to THIS kadr
   - Anti-synthetic + aspect ratio
3. **Verify:** Yenidən yazdıqdan sonra `wc -c` ilə yoxla — ≤2,800 char hədəfdir.

**Concrete reduction misalı:** V1 9,168 char → V2 2,713 char (eyni kritik info saxlanır, verbose / repeated / unnecessary sections silinir). Detallı before/after: `image-prompt-engineer/knowledge/general/prompt-budget.md`.

**Validator output format:**

```markdown
| C-XX | Prompt char budget | wc -c = 4,720 char | ❌ | Praktik limit ~3,000 char aşılıb — F15. Kompress et: bax `prompt-budget.md`. |
```

**Discovered:** 2026-05-21, real production incident — 9,168 char prompt GPT-Image-2-də "prompt too long" error verdi, Nano Banana web UI-də silently truncate olundu (sondakı anti-synthetic clause kəsildi). Web research ilə model-spesifik limitlər təsdiq olundu.

**Pattern referansı:** `image-prompt-engineer/knowledge/general/prompt-budget.md` — universal compression strategy + V1→V2 misalı. Model-spesifik: `image-prompt-engineer/knowledge/models/gpt-image-2.md` + `image-prompt-engineer/knowledge/models/nano-banana.md` HARD RULE bölmələri.

### F-16 — Aspect ratio mismatch (project standard violation)

Promptun aspect ratio declaration-ı **layihənin `WORKFLOW.md` → `Aspect:` sahəsi ilə uyğun deyil**, və ya prompt-da heç bir aspect declaration **yoxdur** (model default-a düşür).

Bu xəta **prompt instruction-failure deyil**, **project-standard violation**-dir. Hər layihə intake-də (showrunner Addım 1B) **bir** aspect seçir, bütün cell-lər həmin aspect-i inherit edir. Drift = post-prod-da letterbox və ya re-generation tələbi.

**AI failure mode:**
1. Prompt-yazan skill aspect declaration-ı **unudur** → model default-a düşür (məs. GPT-Image-2 → 1024x1024, Midjourney → 1:1)
2. Prompt-yazan skill **yanlış aspect** yazır (məs. "cinematic" hiss edib 21:9 yazır, halbuki layihə 16:9 YouTube-dur)
3. Prompt-yazan skill aspect-i **prompt mətnində yazır, lakin API param-da yox** (bəzi modellər yalnız API param-ı oxuyur)
4. Per-cell drift — Cell 1 = 16:9, Cell 2 = 21:9, Cell 3 = 16:9 (kəsişməz, layihə birləşmir)

**Detection during validation:**

1. **WORKFLOW.md → Aspect: sahəsini oxu** — layihənin declared standard-ı nədir? (məs. `Aspect: 16:9`)
2. **Prompt faylını oxu** — sonunda `Aspect ratio: <X>.` cümləsi varmı?
   - Yoxdur → ❌ F-16 (declaration missing)
   - Var, lakin layihə standard-ı ilə **uyğun deyil** → ❌ F-16 (mismatch)
3. **API param yoxla** — prompt-da `--ar 16:9` (MJ) və ya `aspect_ratio: "16:9"` (Flux) varmı? Yoxdursa → ⚠️ F-16 (prompt-only declaration, model ignore edə bilər)
4. **Output şəkilin dimension-larını ölç** — actual aspect declared aspect-lə uyğundurmu? (məs. 1920x1080 = 16:9 ✅; 2560x1080 = 21:9 ❌ əgər layihə 16:9-dursa)
5. **Multi-cell consistency** — bütün cell prompt-larında eyni aspect deklarasiya edilirmi? Drift varsa → ❌

**Fix tövsiyəsi:**

1. **Aspect declaration əlavə et və ya düzəlt** — prompt sonunda:
   ```
   Aspect ratio: 16:9 widescreen.
   ```
   (Layihə standard-ına uyğun)
2. **API param-ı qoy** — model-spesifik syntax:
   - Midjourney v7: `--ar 16:9 --v 7`
   - Flux Pro / SD 3.5: `aspect_ratio: "16:9"`
   - Imagen 4 / Ideogram v3: `aspect_ratio: "16:9"`
   - GPT-Image-2: `size: "1792x1024"` (closest preset)
3. **Re-generation:** Şəkil artıq generated olubsa və yanlış aspect-dədirsə:
   - **16:9 declared, 21:9 generated** → post-prod-da letterbox crop (asan)
   - **16:9 declared, 9:16 generated** → re-generation lazımdır (vertical-dan horizontal yenidən qurmaq mümkün deyil)
   - **Per-cell drift** → drift olan cell-ləri yenidən-yaz, bütün cell-lər layihə standard-ında

**Validator output format:**

```markdown
| C-XX | Aspect ratio declaration | Prompt sonu: "Aspect ratio: 21:9 cinemascope." — WORKFLOW.md Aspect: 16:9 | ❌ | F-16 mismatch. Layihə 16:9, prompt 21:9 yazıb. Replace: "Aspect ratio: 16:9 widescreen." + API param `--ar 16:9` / `aspect_ratio: "16:9"`. |
| C-XX | Aspect ratio declaration | Prompt-da aspect deklarasiya YOX | ❌ | F-16 missing. Əlavə et: "Aspect ratio: <project-aspect>." + API param. |
```

**Pattern referansı:** `image-prompt-engineer/knowledge/general/aspect-ratios.md` — universal decision guide + composition implications per aspect + model-spesifik syntax cədvəli.

**Discovered:** 2026-05-21, real production incident — documentary layihəsində 6+ kadr prompts 21:9 cinemascope yazıldı, əsl delivery 16:9 YouTube + community event idi. Hamısı yenidən-yazıldı. Root cause: prompt-yazan skill default-da "cinematic = 21:9" qəbul edirdi, delivery target yoxlamırdı.

---

## Misal — Cell 3 (Aytac qaçış)

**Prompt** (excerpt):
> "Photorealistic film still of a 28-year-old Azerbaijani woman running on a park path at dawn. Tied-back dark hair, sweat at temple, athletic top and leggings. Close-up 85mm, eye-level, shallow DOF, background blur soft. Pre-dawn cool blue ambient + warm horizon rim at cheekbone. Documentary realism, hand-held respired, no glamour, no retouching. Aspect 9:16."

**Yoxlama cədvəli:**

| # | Instruction | İcra | Verdikt |
|---|---|---|---|
| C1 | 28-year-old | Vizual yaş 25-30 | ✅ |
| C2 | Azerbaijani woman | Caucasian features OK | ✅ |
| C3 | Running on park path | Running pose, park visible | ✅ |
| C4 | Dawn | Sky cool blue → warm horizon | ✅ |
| C5 | Tied-back dark hair | Ponytail dark | ✅ |
| C6 | Sweat at temple | Sweat visible | ✅ |
| C7 | Athletic top + leggings | Athletic wear OK | ✅ |
| C8 | 85mm close-up | Close-up frame | ✅ |
| C9 | Eye-level | Eye-level OK | ✅ |
| C10 | Shallow DOF | Background blur soft | ✅ |
| C11 | Pre-dawn cool blue ambient | Cool blue ambient | ✅ |
| C12 | Warm horizon rim at cheekbone | Faint warm rim visible | ✅ |
| C13 | Documentary realism | Photoreal, no stylization | ✅ |
| C14 | No glamour | No fitness-model smile | ✅ |
| C15 | No retouching | Skin texture real, sweat real | ✅ |
| C16 | 9:16 aspect | 9:16 vertical | ✅ |

**Verdikt:** 16/16 ✅ — Qat C təsdiqlənir.

---

## Davranış qaydaları

### Promptə əməl olunmayan hər instruction ❌-dir
Estetik fikir deyil. "Linen rumple yox idi → ❌". Sənin işin fact-checking.

### Subyektiv termin (N/A)
"Emotional truth", "appeal-driven", "cinematic mood" və s. → N/A (qiymətləndirilə bilməz).

### Əlavə şey varsa ⚠️
Promptdə yazılmamış element şəkildə varsa (məs. promptdə "no jewelry" yox idi, lakin şəkildə qadın boyunbağı taxır) → ⚠️ (instruction violation deyil, lakin diqqət).

### Fix instructions konkret olsun
Hər ❌ üçün **prompt rewrite təklif et**. Ümumi "promptu yaxşılaşdır" yox, **dəqiq mətn təklif**.

---

*Versiya: 1.4 | Son yenilənmə: 2026-05-21 (F-16 əlavə olundu — Aspect ratio mismatch / project standard violation: real production incident, documentary 6+ kadr prompts 21:9 yazıldı, əsl delivery 16:9 idi. Sinxron: image-prompt-engineer/knowledge/general/aspect-ratios.md + image-prompt-engineer/SKILL.md HARD RULE + storyboard-builder/SKILL.md + director/SKILL.md + showrunner/SKILL.md Addım 1B. Əvvəlki: F15 əlavə olundu — Prompt length under budget: 9,168 char prompt GPT-Image-2-də "prompt too long" error verdi, Nano Banana web UI-də silently truncate olundu. Sinxron: image-prompt-engineer/knowledge/general/prompt-budget.md + models/gpt-image-2.md + models/nano-banana.md HARD RULE bölmələri. Əvvəlki: F14 — Cell generated in native sepia/B&W instead of full colour: 28-may documentary k.1-k.4 v1 cells native sepia silver-gelatin yazılmışdı, tamamı yenidən-yazıldı full color-a. Sinxron: color-grading.md "Cells in full colour" HARD RULE. F13 — Location reference contains people: asset-role failure. 28-may layihəsində L-01/L-02/L-03A v1-ləri insanlar daxil yazılmışdı, üçü də yenidən-yazıldı. Sinxron: location-design.md HARD RULE #0).*
