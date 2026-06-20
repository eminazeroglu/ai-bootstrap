# Color Strategies — Palette by niche + contrast rules

> Thumbnail-də **2-3 rəng max**. Çox rəng → mobil-də noise → CTR aşağı düşür. Bu fayl niche-ə görə palette şablonları və universal kontrast qaydalarını saxlayır.

## Contents

1. Universal kontrast qaydaları
2. Niche → palette tövsiyə cədvəli
3. Psixoloji rəng → emosion bağı
4. Dark vs bright thumbnail tezliyi
5. Skin tone calibration

---

## 1. Universal kontrast qaydaları

### Əsas prinsip
**Parlaq subject + tünd fon** vinç. Industry consensus: high-CTR thumbnail-lərin **78%-i** dark background + light/saturated subject istifadə edir (ThumbMagic 2026).

### Kontrast rasiyaları
- **Text on background:** min **4.5:1** kontrast (WCAG AA — mətn oxunması)
- **Subject on background:** min **3:1** kontrast (subject ayrılması)
- **Logo on background:** min **3:1**, brand colour saxlanır

### Palette dispersion (sərt qayda)
Max **3 dominant rəng** thumbnail-də (palette-də ola bilər çox, lakin frame-də 3-dən artıq görünməməlidir):

1. **Primary** — subject və ya əsas vizual element rəngi (frame-in 40-50%)
2. **Accent** — vurğu (mətn, rəqəm, highlight obyekt) (frame-in 15-25%)
3. **Neutral background** — fon (frame-in 30-40%)

4-cü rəng əlavə edilsə: dispersion pozulur, **CTR -15%** (Ampifire 2026 məlumatları).

---

## 2. Niche → palette tövsiyə cədvəli

### Edu / How-to
**Default palette:**
- Primary: `#FF4747` (electric red) və ya `#FFD700` (qızılı)
- Accent: ağ `#FFFFFF`
- Neutral bg: `#0A0A0A` (qara-yaxın) və ya `#1A237E` (deep blue)

**Niyə:** Edu kanallar **urgency** və **expert authority** ötürür. Qırmızı → təcili, sarı → diqqət, qara fon → focus.

### Vlog / Lifestyle
**Default palette:**
- Primary: `#FF6B35` (warm orange) və ya `#06D6A0` (mint green)
- Accent: `#F8F9FA` (cream white)
- Neutral bg: `#264653` (deep teal) və ya `#2A2A2A` (dark grey)

**Niyə:** Lifestyle kanallar **warmth + accessibility** ötürür. Warm tones → personal, mint → fresh.

### Podcast
**Default palette:**
- Primary: `#F7B801` (mustard yellow) və ya `#A663CC` (purple)
- Accent: `#0A0A0A`
- Neutral bg: `#FFFFFF` (sərbəst) və ya `#1D1D1D` (premium dark)

**Niyə:** Podcast — minimal, premium aesthetic. Yellow + black classic editorial; purple + white → indie/thoughtful.

### Drama / Commentary
**Default palette:**
- Primary: `#E63946` (blood red)
- Accent: `#FFFFFF`
- Neutral bg: `#000000` (pure black) və ya `#14213D` (navy)

**Niyə:** Drama → tension. Qırmızı + qara klassik kombinasiya, mətn ağ.

### Music / Cover-style
**Default palette:**
- Primary: depends on genre — pop: `#FF006E` (pink), rock: `#D62828` (red), electronic: `#7B2CBF` (purple), jazz: `#FFB627` (amber)
- Accent: `#FFFFFF`
- Neutral bg: `#0A0A0A`

**Niyə:** Music thumbnail-lər **emosiya rəngi** üzərindən seçilir — janr fərqli rəng diktə edir.

### News
**Default palette:**
- Primary: `#D90429` (urgent red)
- Accent: `#FFFFFF` və `#FFD700`
- Neutral bg: `#000000`

**Niyə:** News = urgency. Qırmızı dominant, mətn ağ + sarı highlight.

### Tech / Gaming
**Default palette:**
- Primary: `#00F5FF` (cyan neon) və ya `#39FF14` (neon green)
- Accent: `#FF00FF` (magenta)
- Neutral bg: `#0D0221` (deep purple-black)

**Niyə:** Tech/gaming audience neon + cyberpunk aesthetic-i tanıyır. Yüksək saturation + dark bg.

### Commentary / Essay
**Default palette:**
- Primary: `#FF4747` və ya `#FFFFFF`
- Accent: `#FFD700`
- Neutral bg: `#1A1A1A`

**Niyə:** Commentary — opinion-yönlü. Qırmızı vurğu (passion), ağ neutrallıq.

---

## 3. Psixoloji rəng → emosion bağı

| Rəng | Emosion | İstifadə yeri |
|---|---|---|
| Red (#FF0000-#E63946) | Urgency, passion, anger | News, drama, shock-reaction |
| Orange (#FF6B35) | Friendly, energy, warmth | Vlog, lifestyle, casual edu |
| Yellow (#FFD700) | Attention, optimism, caution | Highlight aksent, never primary |
| Green (#06D6A0) | Calm, growth, success | How-to, productivity, fitness |
| Blue (#1A237E) | Trust, calm, professional | Corporate, tech edu, news (calm tone) |
| Purple (#7B2CBF) | Mystery, premium, creativity | Music, art, podcast |
| Pink (#FF006E) | Playful, romantic, attention | Music, lifestyle (gen-Z) |
| Cyan (#00F5FF) | Tech, futuristic | Gaming, tech edu, AI content |
| Black (#0A0A0A) | Premium, dark, focus | Neutral bg universal |
| White (#FFFFFF) | Clean, minimal | Mətn dark fonda; ya da minimal palette neutral |

---

## 4. Dark vs bright thumbnail tezliyi

### Dark background (78% of high-CTR)
**Niyə dominant:** YouTube mobil interface ağ/light-dir → dark thumbnail **kontrast yaradır**, scrolling-də gözə dəyir.

**Pattern:**
- Background: #000-#1A1A1A range
- Subject: vivid, parlaq rəng (parlaqlıq qaranlıqdan ayrılır)
- Text: bright (ağ, sarı, qırmızı)
- Logo: bright accent

### Bright background (22%)
**Niyə az:** Mobil interface-də ağ thumbnail **yox olur**, scroll-da görsənmir.

**İstisna:** Premium minimal aesthetic kanal (podcast, atmospheric, dizayn). Tonu yumşaq olmamalı — **saturated bright** (sarı, narıncı, pink) işləyir, **soft pastel** zəifdir.

**Pattern:**
- Background: #FFD700, #FF6B35, #FF006E kimi saturated bright
- Text: dark (#0A0A0A) — ağ deyil
- Subject: dark və ya neutral (subject brigh fonda dark olmalıdır → kontrast)

**`stylistics.md` Sahə 8-də locked:**
Dark default (78% case). Premium/podcast/music için bright override-i istifadəçi açıq tələb etməlidir.

---

## 5. Skin tone calibration

### Subject (host üzü) thumbnail-də olduqda
Layihə palitrasında **skin tone-a uyğun** **accent rəng** seçilməlidir:

| Skin tone | Tövsiyə accent rəng |
|---|---|
| Cool undertone (pink, blue cast) | Cool accent: blue, purple, mint |
| Warm undertone (yellow, golden cast) | Warm accent: orange, red, yellow |
| Neutral | İstənilən, lakin saturated |

### Lighting calibration prompt-da
Thumbnail prompt-da:
- Warm undertone host → "subject lit with warm 3200K key light, golden hour palette"
- Cool undertone host → "subject lit with cool 5600K daylight key light, neutral palette"

Bu, **host şəkli ilə thumbnail rəng-i uyğunlaşır** — mismatch-də host "Photoshopped" görünür.

---

## 6. Verify clauses (image-prompt-engineer-ə ötürmək)

Hər thumbnail brief-də bu kontrast yoxlamaları:

```
VERIFY CLAUSES (color):
- Primary/Accent/Neutral palette uyğunluğu — yalnız stylistics-də locked 3 hex
- Heç bir 4-cü rəng əlavə edilməsin (yalnız project palette)
- Subject-background contrast min 3:1
- Text-background contrast min 4.5:1
- Skin tone undertone palitra ilə uyğun (warm host → warm accent)
```

`stylistics.md` Sahə 3 (color palette) bu 5 rəng locked saxlanır — image-prompt-engineer hər prompt-da bu hex-ləri istifadə edir, **AI-in "yaxın rəng" üçün dəyişməsi qadağandır**.
