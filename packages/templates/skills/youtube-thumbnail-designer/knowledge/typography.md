# Typography — Font ailələri + AZ glyph dəstəyi + niche tövsiyələri

> Thumbnail tipoqrafiya **2-əhəmiyyət**dir: oxunur mu (mobil 120px test) + brand DNA-sını daşıyır mı. Bu fayl niche-ə görə font tövsiyələri, AZ-spesifik glyph dəstəyi, vizual model üçün təsvir formulalarını saxlayır.

## Contents

1. Mobil oxunma əsas qaydaları
2. Font kateqoriyaları (4 ailə)
3. Niche → tövsiyə cədvəli
4. AZ glyph dəstəyi (Ə, Ş, Ç, Ö, Ü, Ğ)
5. Vizual model üçün font təsviri (prompt-da nə yazılır)
6. Text effects (stroke, shadow, outline)

---

## 1. Mobil oxunma əsas qaydaları

- **Letter spacing: -1% to -3%** (sıx) — geniş tracking-də mobil-də blur olunur
- **All-caps üstün** — kiçik hərflərdə x-height itir, mobil 120px-də ölünmür
- **Stroke kritikdir** — qara outline 4-8px, mətni hər fondan ayırır
- **Drop shadow opsional** — depth artırır, lakin stroke-suz işləmir
- **Font weight: black/heavy minimum** — regular/medium thumbnail-də çox incədir
- **Max 5 söz** — 6+ söz mobil-də oxunmaz
- **Letter case mix QADAĞAN** — yalnız ALL-CAPS və ya yalnız Title Case, qarışdırma

---

## 2. Font kateqoriyaları (4 ailə)

### A. Bold Condensed Sans (ən yayılmış)
- **Misallar:** Anton, Bebas Neue, Oswald, Roboto Condensed Black, Barlow Condensed
- **Görünüş:** uzun və dar hərflər, all-caps optimal
- **Best for:** news, drama, shock-reaction formul
- **AZ glyph dəstəyi:** Anton (✓ tam), Bebas Neue (✓ tam), Oswald (✓ tam), Roboto Condensed (✓ tam)
- **Vizual model təsviri:** "bold condensed sans-serif, all-caps, tight letter spacing, slim aspect ratio"

### B. Heavy Display (impact-focused)
- **Misallar:** Impact, Arial Black, Helvetica Black, Inter Black, Plus Jakarta Sans Black
- **Görünüş:** geniş, qalın, dominant
- **Best for:** edu, how-to, real-vs-AI formul
- **AZ glyph dəstəyi:** Impact (⚠️ Ə qismən), Arial Black (✓ tam), Helvetica Black (✓ tam), Inter Black (✓ tam), Plus Jakarta Sans (✓ tam)
- **Vizual model təsviri:** "heavy display sans-serif, wide x-height, all-caps, dominant visual weight"

### C. Geometric Modern (premium / minimal)
- **Misallar:** Montserrat Black, Poppins Black, DM Sans Bold, Manrope Bold
- **Görünüş:** geometric round, modern, balanced
- **Best for:** podcast, music, clean-center formul, atmospheric content
- **AZ glyph dəstəyi:** Montserrat (✓ tam), Poppins (✓ tam), DM Sans (✓ tam), Manrope (✓ tam)
- **Vizual model təsviri:** "geometric sans-serif, rounded terminals, balanced weight, modern minimal aesthetic"

### D. Slab/Display Special (statement)
- **Misallar:** Bungee, Rubik Mono One, Black Ops One, Russo One
- **Görünüş:** xüsusi, eye-catching, brand-ləşdirici
- **Best for:** music, gaming, vlog (personality-driven channels)
- **AZ glyph dəstəyi:** Bungee (⚠️ qismən — Ş/Ə var, Ğ yoxdur), Rubik Mono One (✓ tam), Black Ops One (⚠️ qismən), Russo One (✓ tam)
- **Vizual model təsviri:** "stylized display sans-serif, distinctive character shapes, statement typography"

### E. Comic / Comedy Display (sketch, parody, gaming reaction)
- **Misallar:** Bangers, Permanent Marker, Luckiest Guy, Ultra, Modak
- **Görünüş:** comic-book reaction, hand-drawn marker, chunky cartoon, balloon letters — exaggerated emotion vehicle
- **Best for:** **comedy**, **sketch**, **parody**, **gaming reaction**, **slapstick** (sərt: ciddi niche-lərdə qadağan)
- **AZ glyph dəstəyi:** Bangers (✓ tam — Google Fonts Latin Extended-A, Ə U+018F), Permanent Marker (✓ tam), Luckiest Guy (⚠️ Ə qismən — yoxla per project), Ultra (✓ tam), Modak (⚠️ Latin minimal — Ə yox)
- **Vizual model təsviri:** "comic-book reaction display font, bouncy uneven baseline, slightly tilted letters, thick uniform strokes, hand-drawn comic energy"
- **Niyə category ayrıdır:** comedy genre signal **fundamental fərqlidir** — Anton/Bebas Neue (editorial) comedy-yə zidd, dramatik news vibe verir. Bangers comic-book panel-də olur kimi reaction-energy daşıyır.

---

## 3. Niche → tövsiyə cədvəli (world-class baseline)

| Niche | Primary | Fallback | Sub-text | Mənbə |
|---|---|---|---|---|
| **comedy / sketch / parody** | **Bangers** | Permanent Marker | Inter Bold | world-class-design-baseline.md §2 |
| **hybrid (commentary-comedy)** | **Anton** (editorial base) + accent word in **Bangers** | Bebas Neue | Inter SemiBold | world-class-design-baseline.md §1b (Trevor Noah / John Oliver pattern) |
| commentary | Anton | Impact | Inter SemiBold | (commentary = editorial) |
| edu / education / science | Inter Black | Bebas Neue | Inter SemiBold | world-class-design-baseline.md §6 (Veritasium) |
| vlog / lifestyle | Caveat | Poppins SemiBold | Inter Medium | world-class-design-baseline.md §4 (Casey Neistat) |
| podcast | Montserrat Black | DM Sans Bold | DM Sans Regular | (podcast = clean modern) |
| how-to | Inter Black | Roboto Condensed Black | Inter SemiBold | (how-to = utility) |
| drama | Bebas Neue | Anton | Roboto Condensed Bold | (drama = editorial intensity) |
| **serial-drama** | **Bebas Neue** (massive episode title) | Anton, Cinzel (prestige) | Inter SemiBold | world-class-design-baseline.md §1c (Netflix/Turkish serials) |
| music | Bungee | Russo One | Inter Bold | world-class-design-baseline.md §7 |
| news | Roboto Condensed Black | Anton | Inter SemiBold | (news = editorial) |
| tech / reviews | Inter Bold | SF Pro Display | Inter Medium | world-class-design-baseline.md §3 (MKBHD) |
| gaming | Bangers | Russo One | Inter Bold | world-class-design-baseline.md §5 |
| sports / fitness | Anton | Bebas Neue | Inter SemiBold | world-class-design-baseline.md §8 |
| beauty / fashion | Poppins SemiBold | Cormorant | Inter Medium | world-class-design-baseline.md §9 |
| finance / business | Inter Bold | Anton | Inter SemiBold | world-class-design-baseline.md §10 |

`stylistics.md` Sahə 4 (heading) və Sahə 5 (subtext) bu cədvəldən götürülür — istifadəçi başqasını üstün tutsa, override edilir.

**Sərt qayda:** Comedy niche-də **Anton, Bebas Neue, Impact istifadə etmə** — editorial signal comedy energy-ni öldürür. World-class baseline → Bangers.

---

## 4. AZ glyph dəstəyi (Ə, Ş, Ç, Ö, Ü, Ğ)

Azərbaycan dilində 6 əlavə glyph var ki, bütün font ailələrində tam render olunmur:

| Font | Ə | Ş | Ç | Ö | Ü | Ğ | Status |
|---|---|---|---|---|---|---|---|
| Anton | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Tam dəstək |
| Bebas Neue | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Tam dəstək |
| Oswald | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Tam dəstək |
| Impact | ⚠️ | ✓ | ✓ | ✓ | ✓ | ⚠️ | Qismən — Ə və Ğ köhnə versiyada zəif |
| Inter Black | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Tam dəstək |
| Montserrat Black | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Tam dəstək |
| Bungee | ✓ | ✓ | ✓ | ✓ | ✓ | ❌ | Ğ render olmur |
| Russo One | ✓ | ✓ | ✓ | ✓ | ✓ | ⚠️ | Ğ zəif diacritic |
| **Bangers** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Tam dəstək (Google Fonts Latin Extended-A) — **comedy default** |
| **Permanent Marker** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Tam dəstək — comedy alternative |
| **Luckiest Guy** | ⚠️ | ✓ | ✓ | ✓ | ✓ | ⚠️ | Ə və Ğ qismən — per project yoxla |
| **Ultra** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Tam dəstək — retro comedy/sitcom |
| **Caveat** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Tam dəstək — vlog handwritten |
| **Poppins** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Tam dəstək — beauty / clean modern |

**Decision rule (`stylistics.md` Sahə 2-də locked):**
- AZ glyph > 2 olan mətn üçün **Anton, Bebas Neue, Inter Black, Montserrat Black** üstün tut
- Bungee/Impact yalnız Ğ-siz mətndə işlət

**Image model side:**
- **Ideogram v3** — text rendering üçün industry leader, AZ glyph dəstəyi güclü
- **Nano Banana 2** — orta dəstək (qismən səhv render edə bilər)
- **GPT-Image-2** — diacritics-də zəif
- **Flux 1 Pro** — orta
- **Midjourney v7** — zəif text rendering ümumi

**Sərt qayda:** Stylistics-də `text > 4 words` VƏ YA `AZ glyph count > 2` → primary model `Ideogram v3` olur (project default override).

---

## 5. Vizual model üçün font təsviri

AI image model-i Anton, Bebas Neue, Montserrat **adlarını bilməyəcək**. Model üçün vizual təsvir lazımdır. Bu lookup-da hər font ailəsi üçün model-friendly təsvir:

| Font/family | AI image model üçün təsvir |
|---|---|
| Anton, Bebas Neue, Oswald | "bold condensed sans-serif, all-caps, tight letter spacing, slim vertical proportions, no serifs" |
| Impact, Helvetica Black | "heavy display sans-serif, wide x-height, all-caps, dominant visual weight, no serifs" |
| Inter Black, Plus Jakarta Sans Black | "geometric modern sans-serif, balanced proportions, all-caps, heavy weight, contemporary" |
| Montserrat Black, Poppins Black | "geometric sans-serif, rounded terminals, all-caps, heavy weight, modern minimal aesthetic" |
| Bungee, Rubik Mono One | "stylized display sans-serif, distinctive character shapes, equal stroke widths, statement typography" |
| Black Ops One, Russo One | "military-stencil display sans-serif, angular, all-caps, bold strokes" |
| **Bangers** | "comic-book reaction display font, bouncy uneven baseline, slightly tilted letters, thick uniform strokes, hand-drawn comic energy, like classic Marvel/DC sound-effect lettering" |
| **Permanent Marker** | "handwritten marker brush font, casual rebellious vibe, irregular stroke endings, slightly ragged edges, mid-thick weight, like a real marker on cardboard" |
| **Luckiest Guy** | "chunky cartoon display font, rounded balloon letterforms, friendly playful character, thick uniform strokes, all-caps youth-appeal aesthetic" |
| **Ultra** | "heavy retro slab serif, condensed, 1970s sitcom title aesthetic, strong horizontal serifs, all-caps" |
| **Caveat** | "casual handwritten script, friendly slant, varying stroke weight, like a real handwritten note, warm vlog-style personality" |

`stylistics.md` Sahə 4-də həm **font adı (istifadəçi üçün)** həm də **vizual təsvir (model üçün)** saxlanır — image-prompt-engineer-ə ötürülərkən vizual təsvir prompt-a daxil edilir.

---

## 6. Text effects (universal)

Thumbnail mətni **hər zaman** bu effekt stack-i istifadə edir (kontrast üçün):

### Stack (top-to-bottom rendering order):
1. **Drop shadow** (background) — y+8px, blur 4-6px, #000 @ 50% opacity
2. **Stroke / outline** — 4-8px solid, kontrast rəng (dark mətndə white stroke, white mətndə dark stroke)
3. **Fill** — palette colour (primary və ya accent)

### Stroke qalınlıq seçimi:
- Mətn font size > 100px → stroke 6-8px
- Mətn font size 60-100px → stroke 4-6px
- Mətn font size < 60px → stroke 3-4px

### Drop shadow kontekst:
- Dark background + light text → drop shadow lazımdır (depth üçün)
- Light background + dark text → stroke kifayətdir, drop shadow opsional
- Photo background → həm stroke həm drop shadow məcburi

### Vizual model üçün prompt formulu:
```
"<TEXT> rendered in <font description from §5>, color <hex from palette>,
with thick <stroke px> solid outline in <stroke color>, subtle drop shadow
y+8px blur 4px black 50% opacity. All-caps, tight letter spacing -2%."
```

---

## Image model side — text rendering güvənliyi

Hər model üçün text rendering güvənlik səviyyəsi:

| Model | Text quality | AZ glyph | Tövsiyə |
|---|---|---|---|
| Ideogram v3 | ★★★★★ | ✓ | Default for text-heavy |
| Recraft v3 | ★★★★ (vector + text) | ✓ | Brand typography |
| Flux 1 Pro | ★★★ | Orta | Acceptable |
| Nano Banana 2 | ★★★ | Orta | Acceptable, lakin text > 4 söz risklidir |
| GPT-Image-2 | ★★★ | Zəif | Avoid AZ-də |
| Midjourney v7 | ★★ | Zəif | Avoid text-heavy |

`stylistics.md` Sahə 11 (image model preference) bu cədvələ əsasən locked qərar verilir.
