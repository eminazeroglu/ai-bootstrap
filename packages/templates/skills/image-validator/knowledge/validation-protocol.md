# Image Validation Protocol — 3-mənbə workflow

Bu fayl image-validator skill-inin əsas iş protokoludur. Hər validation **eyni 3 mərhələdə** keçir.

---

## Birinci prinsip: 3 mənbə, paralel oxunur

Hər image validation-da **3 mənbə eyni anda yoxlanır**:

```
       ┌─────────────┐
       │   ŞƏKİL     │  (vision input — istifadəçinin yüklədiyi)
       └──────┬──────┘
              │
              ▼
       ┌─────────────┐
       │  PROMPT     │  (image generation üçün yazılan mətn)
       └──────┬──────┘
              │
              ▼
       ┌─────────────┐
       │  SSENARİ    │  (storyteller niyyəti — beat, mood, action)
       └─────────────┘

              ↓
       ┌─────────────┐
       │ PHYSICAL    │  (universal qanunlar — gravity, light, anatomy)
       │ REALISM     │
       └─────────────┘
```

Validator **dörd qaynağı** birgə baxır, **3 qatda** verdikt verir:

- **Qat A** — Şəkil ↔ Physical realism qanunları (universal)
- **Qat B** — Şəkil ↔ Ssenari niyyəti (layihə-spesifik)
- **Qat C** — Şəkil ↔ Image prompt instruction-ları (layihə-spesifik)

---

## Addım 1 — Trigger və kontekst yığ

### Şəkil yüklənibmi?

Trigger-lər:
- İstifadəçi mesajında **image content** var (multimodal upload)
- İstifadəçi fayl yolu deyir (`/tmp/.../cell-N.png`)
- İstifadəçi açıq deyim: "şəkili yoxla", "bax", "validate", "burda bax"

### Hansı layihədir?

Fayl yolundan layihə kökü tap (məs. `/tmp/creator-test-3/girl-and-cat-friendship/`).
Layihə kökündə bunlar olmalıdır:
- `WORKFLOW.md` — layihə metadata
- `01-script/` — ssenari
- `05-image-prompts/` və ya `02-characters/` və ya `03-locations/` — promptlar

Tapılmırsa, istifadəçidən soruş: "Hansı layihə qovluğundadır bu şəkil?"

### Şəkil hansı növdür?

| Növ | Yer | Necə tanırsan |
|---|---|---|
| Character ref | `02-characters/<obraz>-ref.png` | 6-view contact sheet layout, neutral grey backdrop |
| Location ref | `03-locations/<məkan>-ref.png` | establishing shot, no central character |
| Storyboard contact sheet | `04-storyboard/contact-sheet.png` | grid layout, çox panel bir şəkildə |
| Production cell | `04-storyboard/cells/cell-N.png` | tək kadr, 9:16 / 16:9 / 2.39:1 aspect |
| Başqa | — | İstifadəçidən soruş |

---

## Addım 2 — Mənbələri oxu (paralel)

5 paralel Read:

1. **Şəkil** (vision) — bu sənə **birbaşa görünür** chat-də (multimodal)
2. **Ssenari** — `<layihə>/01-script/v1-*.md` (ən son versiya)
3. **Prompt** — şəklin növünə uyğun:
   - Character ref → `02-characters/<obraz>.md`
   - Location ref → `03-locations/<məkan>.md`
   - Cell → `05-image-prompts/cell-N.md`
4. **Physical realism checks** — `knowledge/physical-realism-checks.md`
5. **Script/prompt consistency checks** — uyğun knowledge faylı

Əgər (3) tapılmırsa, istifadəçidən soruş: "Bu şəklin promptu hansı faylda?"

---

## Addım 3 — Qat A: Physical realism

`physical-realism-checks.md` faylında **9 bölmə** var (gravity, light, time-of-day, weather, anatomy, materials, architecture, composition, cultural).

Hər bölmə içində 5-15 checkpoint var. Hər checkpoint üçün:
- Şəkilə bax
- "Bu qayda pozulurmu?" sualını cavabla
- ✅ / ❌ / ⚠️ verdikt + 1-2 cümlə qeyd

**Vacib:** "Yox, pozulmur" cavabını **konkret elementlə dəstəklə**. Misal: "✅ Gravity OK — bütün obyektlər (masa, qab, pişik, ip) real dayaq üzərindədir, heç bir floating element yoxdur."

**Cədvəl şablonu:**

```markdown
## Qat A — Physical realism

| # | Bölmə | Checkpoint | Verdikt | Qeyd |
|---|---|---|---|---|
| A1 | Gravity | Bütün obyektlər real dayaq üzərində | ✅ | Masa zəmində, qab masada, pişik masada — hamısı OK |
| A2 | Light → shadow | Işıq mənbəyi və kölgə istiqaməti uyğun | ❌ | Pəncərə sol tərəfdə, lakin pişikin kölgəsi solada düşür — light fizikası pozulub |
| A3 | Time-of-day | Praktik işıqlar saatla uyğun | ✅ | Səhər 7:00 — pəncərədən gündüz işıq, lampa yanmır, real |
| A4 | Anatomy (qız) | 5 barmaq, simmetriya, proportion | ⚠️ | Sol əl yarımca görünür, dəqiq sayıla bilmir |
| A5 | Anatomy (pişik) | 4 ayaq, 2 qulaq, quyruq, gözlər | ✅ | Tam, simmetriya OK |
| A6 | Materials | Parça, su, şüşə, metal, ağac real | ✅ | Linen parça düzgün drape, ağac masa qoltuq olmuş təbii |
| A7 | Architecture | Pəncərə, qapı, pilləkən struktur | ✅ | Pəncərə düzgün proportion, frame realistik |
| A8 | Composition | Perspective, DOF, reflections | ✅ | Bir perspektiv vanishing point, DOF təbii |
| A9 | Cultural (Bakı) | Material/coğrafiya uyğun | ✅ | Soviet-era balkon detalları (rust, iron rail) görünür |
```

---

## Addım 4 — Qat B: Script consistency

`script-consistency-checks.md` faylından istifadə et. Şəklin növünə uyğun bölməni seç:

- Character ref → "Character ref checks"
- Location ref → "Location ref checks"
- Cell → "Production cell checks"

Hər checkpoint üçün **ssenari mətninə müraciət et** ("Beat 2-də Aytac başını əyir" deyir, şəkildə nə görünür?).

**Cədvəl şablonu:**

```markdown
## Qat B — Script consistency

| # | Checkpoint | Ssenaridə nə deyir | Şəkildə nə var | Verdikt |
|---|---|---|---|---|
| B1 | Karakter yaşı | "8 yaşlı qız" | Görünüş 7-9 yaş aralığında | ✅ |
| B2 | Karakter etnikliyi | "Azərbaycanlı, olive-tan dəri" | Olive-tan dəri görünür | ✅ |
| B3 | Geyim | "rose-pink linen dress" | Pink linen dress, slight off-pink (close enough) | ✅ |
| B4 | Action | "Beat 3: küncdə çömbəlir, qorxudan" | Qız ayaq üstündə, neutral pose | ❌ |
| B5 | Mood | "Qorxu, yalqızlıq" | Mood: neutral, smiling slightly | ❌ |
| B6 | Time-of-day | "Səhər 7:00" | Səhər işığı görünür, OK | ✅ |
| B7 | Məkan | "Mətbəx — tək lampa söndürülmüş" | Mətbəx, lampa söndürülmüş | ✅ |
| B8 | Continuity (əvvəlki cell) | Cell 2-də eyni geyim, eyni saç | Cell 2 ilə eyni — OK | ✅ |
```

---

## Addım 5 — Qat C: Prompt → image uyğunluğu

`prompt-consistency-checks.md` faylından istifadə et. **Prompt mətnini parça-parça** oxu, hər instruction üçün şəkildə icra yoxla.

**Cədvəl şablonu:**

```markdown
## Qat C — Prompt → image uyğunluğu

| # | Promptdə yazılan instruction | Şəkildə icra | Verdikt |
|---|---|---|---|
| C1 | "8-year-old Azerbaijani girl, olive-tan skin" | Tam icra olunub | ✅ |
| C2 | "Rose-pink linen dress, knee-length, slight rumple" | Dress var, lakin yaxasında lace görünür — promptdə yox idi | ⚠️ |
| C3 | "Soft single key light from camera-left at 45°" | Işıq sağdan gəlir — pozulma | ❌ |
| C4 | "Calico cat (grey-white-orange) at her feet" | Pişik var, lakin rəng tam orange — promptdə "calico mix" idi | ❌ |
| C5 | "No clothesline visible (interior scene)" | Pəncərədən ip görünür — promptdə yox idi | ⚠️ |
| C6 | "Aspect 9:16" | 9:16 vertical | ✅ |
| C7 | "Pixar 3D animation style, appeal-driven" | Pixar style görünür | ✅ |
| C8 | "Background: kitchen, single light source unlit lamp" | Kitchen, lamp unlit — OK | ✅ |
```

---

## Addım 6 — Ümumi verdikt və fix instructions

Hər qatdan sonra say:
- ✅ keçən: N
- ⚠️ diqqət: N
- ❌ pozulma: N

Toplam pozulma 0 → şəkil təsdiqlənir.
Toplam pozulma 1+ → yenidən generasiya tövsiyə olunur.

**Hər ❌ üçün fix instruction yaz:**

```markdown
## 🔧 Fix instructions

### Problem 1 — A2 (light/shadow pozulması)
**Nə oldu:** Şəkildə pəncərə sol tərəfdədir, lakin pişikin kölgəsi də sola düşür. Knowledge fayl bölmə 2.3-də "Shadow falls OPPOSITE the light source" qaydası var.

**Fix prompt-da:** Mövcud promptə əlavə et:
> "Light source: large window at camera-left, 5600K daylight. ALL shadows (character, cat, furniture, props) MUST fall toward camera-right at consistent ~30° angle. Verify shadow direction against light source — no shadows pointing toward the light."

### Problem 2 — C3 (light direction tərs)
**Nə oldu:** Promptdə `key light from camera-left` yazılıb, lakin model işığı sağdan rendered etdi.

**Fix prompt-da:** Aqressiv instruction əlavə et:
> "CRITICAL: Single key light positioned at CAMERA-LEFT. Verify by checking that the LEFT side of subject's face is brightly lit while the RIGHT side is in shadow. Reject any rendering where lighting comes from camera-right."

### Problem 3 — C4 (cat colour pozulması)
**Nə oldu:** Promptdə "calico mix grey-white-orange" yazılıb, lakin model tam orange tabby çəkdi.

**Fix prompt-da:** Daha dəqiq əlavə et:
> "Cat: CALICO pattern — distinct patches of THREE colours: white belly and chest, grey back and head, orange on rear quarters and ears. NOT a tabby pattern, NOT solid orange. Use attached cat-ref.png as exact identifier."
```

---

## Addım 7 — Knowledge gap loop

Əgər yoxlama prosesində **yeni pattern** kəşf edirsən (knowledge faylda hələ yazılmayıb):

```markdown
## 📚 Knowledge gap kəşfi

**Pattern:** AI model midday saat 12:00 deyiləndə də uzun warm shadows çəkir (golden hour bias).

**Mənbə:** Bu yoxlamada (P-01) və əvvəlki testlərdə təkrar müşahidə olundu.

**Tövsiyə knowledge update:** `image-prompt-engineer/knowledge/physical-realism.md` faylının **bölmə 3 (Time of day)** bölməsinə əlavə olunsun:

> Midday (11:00-14:00) lighting — explicit override required:
> "Midday vertical sunlight, sun directly overhead. Shadows are SHORT (max 30% of object height) and SHARP. NO golden warmth — neutral white-yellow daylight (5600-6000K). Verify shadow length against object height."

İstifadəçi razı qaldıqdan sonra knowledge yenilənsin.
```

---

## Davranış qaydaları

### Hər checkpoint açıq cavablandırılmalıdır
"Ümumi baxış yaxşıdır" qadağandır. Hər element üçün ayrı verdikt + qeyd.

### Konkret element göstər
Vision input-da nəyi gördüyünü deməlisən. "Anatomy səhvdir" yox — "Sol əl 4 barmaq görünür".

### Subjektiv estetik fikir vermə
Sən fact-checker-sən. "Mood biraz darıxdırıcıdır" → bu validation deyil. "Promptdə 'tense, melancholic' yazılıb, şəkildə neutral expression var" → bu validation-dur.

### Knowledge sinxronizasiyası
`physical-realism-checks.md` faylı `image-prompt-engineer/knowledge/physical-realism.md` ilə **sinxron** olmalıdır (CLAUDE.md "sync rule"). Master orada — burada checklist version yaşayır.

---

*Versiya: 1.0 | Son yenilənmə: 2026-05-15*
