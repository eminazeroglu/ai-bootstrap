# Mobile Legibility — 120px test prosedur

> YouTube-da **70%+ trafik mobil**-dir. Mobil-də thumbnail **120px enində** görsənir (Home feed). Hər thumbnail bu ölçüdə **oxunabilən və başa düşüləbilən** olmalıdır. Bu fayl 120px test proseduru və min tələbləri saxlayır.

## Contents

1. 120px test — niyə vacibdir
2. Min font size hesablama
3. Min subject face ratio
4. Min kontrast yoxlaması
5. 5-saniyəlik test (real workflow)
6. Verify clauses

---

## 1. 120px test — niyə vacibdir

### Real istifadə senariosu
İzləyici mobil-də Home feed-i scroll edir. Hər thumbnail **120-160px enində** görsənir (cihaza görə dəyişir, 120px ən sıxılmış variant). İzləyici **0.5-1.5 saniyə** baxır — qərar verir: kliklə, yoxsa scroll davam.

Bu vəziyyətdə:
- Mətn **aydın oxunmalıdır** — saniyə-ə görə oxu vaxtı yoxdur, **anlıq** tanımalı
- Subject (üz) **dərhal tanımalı** — kim, hansı emosion
- Layihənin **brand DNA-sı** anlamalı — kanal-ı tanıt

Əgər thumbnail 1280×720-də gözəl görünür amma 120px-də **bulanıq** çıxır → mobil-də CTR sıfıra düşür.

### Test metodu
1. Thumbnail-i 1280×720-də yarat
2. **120px enə sıxışdır** (Photoshop, Preview, və ya `sips -Z 120 input.png output.png` macOS-da)
3. Mobil ekranda (real telefon və ya emulyator) bax
4. **2 saniyəyə** soruş:
   - Mətn oxundu?
   - Subject (kim, hansı emosion) tanındı?
   - Brand (kanal) tanındı?

Hər üç sual **bəli** isə → ✅. Hər hansı **xeyr** isə → ❌ regenerate.

---

## 2. Min font size hesablama

### Formula
Thumbnail-də font size 1280×720 canvas-da **min 80px** olmalıdır əsas heading üçün. Sub-text üçün **min 50px**.

**Niyə:**
- 1280→120 sıxılma: 10.67× scale-down
- 80px → 7.5px mobil-də (oxunur)
- 60px → 5.6px mobil-də (sərhəd)
- 40px → 3.75px mobil-də (oxunmaz)

### Praktik tövsiyə (`stylistics.md` Sahə 4-də)
- Heading: 100-180px (1280×720-də) — ən təhlükəsiz aralıq
- Sub-text: 50-80px
- Logo text: 30-50px (yalnız brand isim, kontekst-əsaslı)

### Sözlərin sayı vs ölçü
| Söz sayı | Tövsiyə font size | Mobil 120px-də |
|---|---|---|
| 1 söz | 200-280px | 18-26px (rahat oxunur) |
| 2 söz | 150-200px | 14-18px (oxunur) |
| 3-4 söz | 100-150px | 9-14px (sərhəd) |
| 5+ söz | 80-100px | 7.5-9px (zəif, avoid) |

**Sərt qayda:** 6+ söz qadağan — mobile-də oxunmur.

---

## 3. Min subject face ratio

### Face ratio formulası
Subject (host üzü) thumbnail-də frame-in **min 25%**-ini tutmalıdır. 30-45% optimal aralıq.

**Niyə:**
- 1280×720 frame area: 921,600 px²
- 25% face area: 230,400 px² → kvadrat root: 480×480 ekvivalent
- 120px mobil-də: face area 25% = ~14,400 px² → 60×60 px görsənir (üz tanınır)

### Üz "tanına bilmə" hədəfləri (mobile 120px):
- Çəlləng yox — üz **kvadrat 60×60px**-də olmalı min
- Gözlər ayırd edilir (~6-10px hər biri)
- Ağız ifadəsi (smile/shock/serious) görsənir (~10-15px geniş)

### Tövsiyə subject placement (1280×720-də)
- Üz width: 320-480px (frame width-in 25-37%-i)
- Üz height: 360-540px (frame height-in 50-75%-i)
- Üz center koordinatları: shock-reaction → x: 270, y: 360; clean-center → x: 640, y: 360

### Sub-saniyəlik tanına bilmə test
- Üz **dominant focal point** olmalıdır
- Background-da rəqib elements yoxdur (3-4 obyekt simultan attentional pull-da)
- Hər thumbnail **bir** focal element: ya üz, ya text, ya subject obyekti — heç vaxt 2+ rəqib

---

## 4. Min kontrast yoxlaması

### WCAG kontrast standartları (mobil oxu üçün)
- **Text on background:** min **4.5:1** (WCAG AA) — heading + body
- **Large text (24px+ visible):** min **3:1** (WCAG AA Large) — thumbnail mətnləri (1280-də 80px+ → mobile-də 7.5px-də belə "large" hesab olunur)
- **Subject on background:** min **3:1** (subject ayrılır)
- **Logo on background:** min **3:1** brand colour saxlanır

### Tez yoxlama
Online tool: WebAIM Contrast Checker (https://webaim.org/resources/contrastchecker/) — hex daxil et, kontrast oxu.

### Layihə palettes üçün ümumi yoxlama
`stylistics.md`-də Sahə 3 (palette) yazılarkən:
- Text colour vs Background colour → contrast >= 4.5:1
- Subject (skin) vs Background → contrast >= 3:1
- Logo vs Background → contrast >= 3:1

Bunlar pozulursa → palette dəyişdirilməlidir (Setup mərhələsində).

---

## 5. 5-saniyəlik test (real workflow)

Hər generasiya olunan thumbnail aşağıdakı testdən keçirilməlidir **istifadəçi yükləyəndən sonra**:

```
1. Thumbnail-i 120px enə sıxışdır
2. Telefon ekranında bax (və ya 120px window simulyator)
3. 2-saniyə bax → 3 sual:
   a) Mətn oxundu?
   b) Subject (kim, mood) tanındı?
   c) Kanal/brand tanındı?

4. Hər ✅ → thumbnail keçərlidir
   Hər ❌ → regenerate (fix instruction-larla)
```

### Skill bu testi necə tətbiq edir
Bu skill image generasiya etmir (image-prompt-engineer + AI model edir). Lakin:
- **Hər image-prompt-engineer brief-də** mobile 120px verify clauses daxil edir
- İstifadəçi thumbnail yüklədikdən sonra, **image-validator skill-i** avtomatik işə düşür və 120px testi yoxlayır

Validator-da Layer A (physical realism) + Layer B (script consistency) + Layer C (prompt instruction) yoxlamasının bir hissəsi olaraq:
- Text size sufficient (≥80px heading, ≥50px sub-text)
- Face ratio ≥25%
- Contrast ratios met
- Safe zones respected

---

## 6. Verify clauses (image-prompt-engineer-ə ötürmək)

Hər thumbnail brief-də bu verify clauses bloku:

```
VERIFY CLAUSES (mobile legibility):
- Heading text size ≥ 80px on 1280×720 canvas (readable when scaled to 120px mobile)
- Sub-text size ≥ 50px on 1280×720 canvas
- Max 5 words on-thumbnail text (3-4 ideal)
- Subject (host face) occupies ≥ 25% of frame area, ideally 30-45%
- Single dominant focal element — no competing focal points
- Text-background contrast ≥ 4.5:1 (WCAG AA)
- Subject-background contrast ≥ 3:1
- All-caps for heading text (lowercase loses x-height at mobile scale)
- Tight letter spacing (-1% to -3%) for compact mobile rendering
- Stroke 4-8px on text for contrast preservation when scaled down
- If any rule violated, regenerate
```

---

## 7. Niçə test olunmuş misal

### ✅ Yaxşı thumbnail (mobile-friendly)
- "AI MƏNİ ƏVƏZ ETDİ?" — 4 söz, 160px font, all-caps, qırmızı stroke 6px black outline
- Host üzü sol üçdə-bir, frame-in 40%-i, expression shock
- Background: dark gradient
- Logo: sol-altda kiçik, 6% frame height
- 120px-də: mətn 15px oxunur, üz 60×60px tanınır, logo görünür

### ❌ Pis thumbnail (mobile-unfriendly)
- "Bu videoda mən sizə süni intellektin necə işlədiyini izah edirəm" — 12 söz, 50px font
- Host üzü frame-in 15%-i — mobile-də 7×9px → tanına bilmir
- Background: photo + 5 rəng noise
- 120px-də: mətn oxunmur, üz görsənmir, brand DNA itir

---

## 8. Cross-reference

- `ctr-formulas.md` — kompozisiya formul-larına safe zone tələbləri inteqrasiya
- `typography.md` — font size + stroke + drop shadow tövsiyələri 120px-ə uyğun
- `safe-zones.md` — UI overlay xəritə (kontrast yoxlanmasına paralel)
- `color-strategies.md` — palette kontrast hesablamaları
