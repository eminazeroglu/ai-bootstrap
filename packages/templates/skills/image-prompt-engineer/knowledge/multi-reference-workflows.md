# Multi-Reference Image Workflows — Industry Best Practices

**Niyə:** Reference şəkillərini istifadə edərək yeni kadr yaratmaq **GENERATE prompt** yox, **EDIT prompt** problemi-dir. Bu fayl hər major model üçün industry-correct multi-reference yanaşmasını saxlayır. Sənaye standartı 2026.

**Mənbələr:** OpenAI Cookbook (gpt-image-1.5 prompting guide), Black Forest Labs (Flux Kontext docs), Google DeepMind (Nano Banana Pro), Midjourney (v7 docs), Ideogram v3 docs.

---

## I. Universal printsiplər (bütün modellərə şamil olunur)

### Printsip 1 — Generate vs Edit endpoint fərqi
**KRITİK fərq:**
- **Generate mode** (text-to-image, no refs): Uzun deskriptiv prompt OK — modelə nə generasiya edəcəyini başdan-sona izah edirsən
- **Edit mode** (with refs): **Qısa prompt** + **preserve list** + **change list** — model refs-i təməl götürür, prompt yalnız dəyişiklikləri təsvir edir

**Hər iki halda fərqli "mental model" lazımdır:**

| Generate mode (rec yox) | Edit mode (refs var) |
|---|---|
| "A Pixar 3D animated 8-year-old Azerbaijani girl named Ayşən..." (1000 söz təsvir) | "Place Ayşən [image 1] on this balcony [image 2]. Pose: chin on hand. Mood: quiet sad. Preserve face, hair, dress exactly." (50 söz) |
| Model hər detalı sıfırdan yaradır | Model refs-dən detalları saxlayır, yalnız dəyişikliklər tətbiq edir |
| Karakter drift normaldır | Karakter preservation əsas məqsəddir |

### Printsip 2 — Preserve list language (universal pattern)
Bütün modellərdə işləyən format:

```
PRESERVE EXACTLY (do not change):
- [element 1 from reference]
- [element 2 from reference]
- ...

REPLACE ONLY:
- [what's new in this scene]

DO NOT ADD:
- [elements that must not appear]
```

**Misal:**
```
PRESERVE EXACTLY (do not change):
- Ayşən's face: same olive-green eyes, same round cheeks, same wavy dark-brown hair from the first reference photo
- Ayşən's dress: same pink dress with white Peter Pan collar and heart pendant
- Ayşən's white socks with lace and grey-white sandals from the reference
- The balcony: same metal railing with chipped sage paint, same clothesline geometry, same wall texture from the second reference

REPLACE ONLY:
- Pose: seated on wooden stool, left elbow on railing, left hand cradling chin
- Expression: quiet sadness — drowsy eyes, gaze toward distant horizon, mouth neutral with slight downturn
- Time: golden hour with warm rim light from camera-right

DO NOT ADD:
- No cat anywhere in frame
- No other people
- No tears or crying
```

### Printsip 3 — First image priority (sıra önəmlidir)
**Sənaye sübuti:** OpenAI cookbook (gpt-image-1.5 docs):
> "while all input images are preserved with high fidelity, **only the first one you provide is preserved with extra richness**"

Eyni printsip Flux Kontext-də də işləyir (left-most position composite-də mərkəz olur).

**Tətbiq:**
- Karakter üzü = **HƏMİŞƏ birinci** upload
- Məkan = ikinci
- Stil ref = sonuncu

### Printsip 4 — Visual content > position labels (Flux Kontext kəşfi)
Flux Kontext docs:
> "Kontext doesn't understand positional labels like 'Image 1' and 'image 2' because the model sees a single wide composite image with no internal labels"

**Doğru pattern (Flux üçün):**
- ❌ "image 1 character"
- ✅ "the woman with curly dark hair"
- ✅ "the balcony with chipped sage railing"

GPT-Image və Nano Banana Pro **həm** position label-i **həm** content description-u qəbul edir, lakin content description daha güclüdür.

### Printsip 5 — Concise > Verbose
**1000-söz prompt zəifdir, 100-söz prompt güclüdür** çünki:
- Model refs-i təməl alır — uzun yenidən-təsvir refs-i "override" edir
- Uzun prompt karakter drift-i artırır (cumulative token bias)
- Refs-də olmayan elementləri prompt əlavə edə bilər (bu bizə "lazımdır" deyə təxmin edir)

**Maksimum 200 söz** edit-mode promptda. Daha çox lazım deyilsə, refs özü göstərir.

### Printsip 6 — Reuse exact tokens (Nano Banana)
Google DeepMind tövsiyəsi:
> "If you describe a character as having 'emerald eyes' in panel one, do not switch to 'green eyes' in panel two"

Hər generasiyada **eyni dəqiq sözləri** istifadə et:
- ❌ Cell 1: "olive-green eyes" → Cell 2: "yashil-zeytun gözlü"
- ✅ Cell 1: "olive-green eyes" → Cell 2: "olive-green eyes" (eyni)

---

## II. Model-spesifik syntax

### 1. GPT-Image-1 / GPT-Image-1.5 / GPT-Image-2 (OpenAI)

**Endpoint:** `images.edit()` (NOT `images.generate()`)

**API parametri:**
```python
client.images.edit(
    model="gpt-image-1.5",  # or gpt-image-2
    image=[
        open("aysen-ref.png", "rb"),    # FIRST = face (extra richness)
        open("balcony-ref.png", "rb"),  # SECOND = location
    ],
    prompt="...",
    input_fidelity="high",   # CRITICAL — preserves face
    quality="high",
    n=1
)
```

**ChatGPT GUI istifadəçiləri üçün:** ChatGPT Plus arayüzü adətən edit mode-u **avtomatik** seçir reference şəkilləri yükləndikdə. `input_fidelity` parametri GUI-də əlçatan deyil — API tələb olunur.

**Prompt template (OpenAI cookbook 5.8):**
```
Place [character] from the first reference into the setting of the second 
reference. Use the same lighting, composition, and style. Do not change anything 
else.

PRESERVE EXACTLY:
- [list of features from first ref]
- [list of features from second ref]

REPLACE ONLY:
- [pose / action / mood / lighting changes]

DO NOT ADD:
- [forbidden elements]
```

**Reference syntax in prompt:**
- "Image 1 shows X..." və ya "the first reference shows X..." — hər ikisi işləyir
- "the woman with [features]" — daha güclü identity bind

**Karakter drift bilinən problemi:** GPT-Image-1 uzun deskriptiv promptlarda character drift edir. Qısa edit-mode prompt güclü preserve list ilə bunu azaldır.

### 2. Flux Kontext (Black Forest Labs)

**Endpoint:** `flux-pro/kontext` (fal.ai, Replicate, BFL API)

**API:**
```python
{
    "image_url": "ref1.png",
    "image_url_2": "ref2.png",  # optional
    "image_url_3": "ref3.png",  # optional
    "prompt": "...",
    "aspect_ratio": "9:16"
}
```

**Position-aware syntax (KRITİK):**
Şəkillər **horizontal composite**-ə yığılır (sol→sağ). Promptda **left/center/right** referansı istifadə et:

```
The girl from the LEFT reference, standing on the balcony from the RIGHT reference.
Use her exact face, hair, and dress from the left. Match the balcony's railing 
and clothesline from the right.

PRESERVE:
- Face, hair, dress from left reference
- Railing, wall, clothesline from right reference

CHANGE:
- Pose: seated on stool, chin on hand
- Mood: quiet sad expression
```

**Position labels qadağan:**
- ❌ "image 1", "image 2"
- ✅ "left reference", "right reference", "the woman with [features]"

**Character consistency güclüdür:** 0.92 cosine similarity 6 successive edits boyu (industry leader).

### 3. Nano Banana Pro (Gemini 3 Pro Image)

**Endpoint:** Gemini API / AI Studio

**Image input:** Up to **14 images**, **5 person consistency**.

**KRITİK pattern — karakter adlandırma:**
```
This is Ayşən (image 1) and her balcony (image 2). Place Ayşən on this balcony, 
seated on a wooden stool, chin resting on her left hand, looking off into the 
distance with a quiet sad expression.

PRESERVE:
- Ayşən's face, hair, dress exactly as shown in image 1
- The balcony details from image 2

REPLACE:
- Pose: seated, chin on hand
- Time: golden hour
```

Nano Banana **karakterin adını öyrənir** və hər prompt-da eyni ada istinad edirsən. Bu identity bind-i çox güclü edir.

**6 ref maksimum** tövsiyə (technical limit 14, lakin keyfiyyət üçün 6 optimal).

### 4. Midjourney v7

**Omni-Reference syntax:**
```
a young Azerbaijani girl seated on a balcony at golden hour, quiet sad expression, 
chin resting on hand, looking toward distant Caspian Sea, Pixar 3D animation style 
--oref <URL_TO_AYSEN_REF> --ow 150 --ar 9:16 --v 7
```

**Parametrlər:**
- `--oref <URL>` — omni-reference URL
- `--ow 100` default, range 0-1000. 150-200 strong preservation üçün
- `--ar 9:16` — aspect
- `--v 7` — version

**Multi-character / pose:**
```
[prompt] --oref <character> --cref <pose_ref> --ow 150 --cw 100
```

**Limit:** Single primary ref. Location ref olaraq əlavə image upload zəif işləyir — yalnız character.

### 5. Ideogram v3

**API (V3 endpoints):**
```python
{
    "prompt": "...",
    "character_reference": {
        "image_url": "ref.png"
    },
    "aspect_ratio": "9:16"
}
```

**Limit:** Single character reference. Style reference əlavə oluna bilər, lakin location ref native dəstək yox.

**Üstünlük:** Text rendering kralı (AZ/RU/EN sign və label-lər).

### 6. Imagen 4 (Google)

Single reference, multi-character zəif. Recraft v3 və SD 3.5 də single-ref domain-də.

---

## III. Layihə üçün model qərarı (decision matrix)

| Tələb | Tövsiyə model | Niyə |
|---|---|---|
| **Character + location strict consistency** | **Flux Kontext** | 0.92 cosine similarity, multi-image native, sənaye lideri |
| **Multi-character (3+ person)** | **Nano Banana Pro** | 5 person consistency, named characters |
| **Single character + many scenes** | **Midjourney v7 (--oref)** | Stylized + güclü preservation |
| **Text rendering vacib** | **Ideogram v3** | Text quality lider |
| **OpenAI ecosystem locked** | **GPT-Image-1.5/2 + input_fidelity=high** | Native OpenAI, lakin drift risk |
| **Budget tight** | **Flux Kontext Pro** | GPT-Image-1-dən 1/4 qiymət |

---

## IV. Failure pattern-lər və düzəliş

### Failure 1 — Identity drift (yeni-generate ə bənzəyir)
**Səbəb:** Generate-mode prompt yazıldı, edit-mode lazım idi.
**Düzəliş:** Prompt-u qısalt (200 söz max), preserve list əlavə et, edit-mode endpoint istifadə et.

### Failure 2 — Clothing/accessories changed
**Səbəb:** Preserve list-də dress/accessories yox idi.
**Düzəliş:** Preserve list-ə dəqiq paltar elementlərini əlavə et ("pink dress with white Peter Pan collar, heart pendant, white lace socks, grey-white sandals").

### Failure 3 — Location elements drifted
**Səbəb:** Location ref attach olundu, lakin promptda preserve list-də location yox idi.
**Düzəliş:** Preserve list-ə location elementlərini ayrıca əlavə et.

### Failure 4 — Unwanted elements appeared (Cell 2 v1 pişik)
**Səbəb:** Lazımsız ref attach olundu və/və ya prompt elementi söylədi.
**Düzəliş:** Yalnız beat-strict refs attach et + "DO NOT ADD" siyahısı.

### Failure 5 — Style drift (Pixar → photoreal)
**Səbəb:** Preserve list-də visual style yox idi.
**Düzəliş:** "Match the Pixar 3D animation style of the reference photos" preserve list-ə əlavə et.

---

## V. Cell prompt template (universal — bütün modellər)

```markdown
# Cell <N> — <Beat name>

## Upload order
1. **First (highest priority):** `<path-to-character-ref>` (face/identity)
2. **Second:** `<path-to-location-ref>` (scene/background)
3. (more if needed, in priority order)

## API params (if applicable)
- input_fidelity: "high" (GPT-Image)
- --ow 150 (Midjourney)
- character_reference (Ideogram)

## Prompt (concise, edit-mode)

[ONE-SENTENCE scene description.]

PRESERVE EXACTLY (do not change):
- [character feature 1]
- [character feature 2]
- [character clothing/accessories]
- [location element 1]
- [location element 2]
- [visual style — Pixar 3D / photoreal / etc.]

REPLACE ONLY:
- Pose: [specific pose]
- Expression: [specific expression]
- Lighting: [specific lighting]
- Camera: [close-up / wide / etc.]

DO NOT ADD:
- [forbidden element 1 — e.g., no cat]
- [forbidden element 2]

[Optional: Cinema reference for emotional register]
```

---

*Versiya: 1.0 | Source: OpenAI Cookbook + BFL Flux docs + Google DeepMind + Midjourney V7 + Ideogram | 2026-05-15*
