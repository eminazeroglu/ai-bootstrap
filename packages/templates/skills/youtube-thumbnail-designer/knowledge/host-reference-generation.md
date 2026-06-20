# Host Reference Generation — Setup mode Addım A6

> **Trigger:** Yalnız `stylistics.md` Sahə 7 (face expression archetype) `no-face` deyilsə — yəni host üzü hər thumbnail-də görünəcəksə — bu addım icra olunur. `no-face` stilistikalarda atlanır.

## Niyə bu addım var

Hər thumbnail-da host üzünün **birə-bir eyni** görünməsi üçün ref şəkillər lazımdır. Skill image generasiya etmir — `image-prompt-engineer`-ə **5 ayrı brief** ötürür, o, model dialect-ində 5 prompt yazır, istifadəçi modelə paste edib refləri çıxarır.

5 fərqli ekspresiya/angle saxlanır — hər CTR formula üçün uyğun ref:

| Variant fayl adı | Expression | Angle | Use case (formula) |
|---|---|---|---|
| `host-face-neutral.png` | Neutral, kameraya birbaşa | Front, eye-level | Clean-center, default |
| `host-face-shock.png` | Geniş gözlər (white sclera visible), açıq ağız, qalxan qaşlar | Front, eye-level | Shock-reaction |
| `host-face-smile.png` | Səmimi gülüş, gözlər canlı | Front, eye-level | Peace-sign-branding |
| `host-face-profile-left.png` | Neutral, **90° profil sola** | Profile, eye-level | Real-vs-AI split (sol panel) |
| `host-face-3quarter.png` | Düşüncəli (hand on chin OK), yumşaq frown | **3/4 angle (45°)**, eye-level | Default commentary pose |

---

## Addım A6.1 — Host identity məlumatı topla (sual klasteri, bir-bir)

İstifadəçidən aşağıdakı 8 sahəni bir-bir topla. Hər cavab sonra növbəti sual:

```
A6.1/8 — Yaş təxminən (məs. 28-32, 35-40)?
A6.2/8 — Cins (kişi/qadın)?
A6.3/8 — Etniklik (məs. Azərbaycanlı/Caucasian, East Asian, Sub-Saharan African)?
A6.4/8 — Üz xüsusiyyətləri:
   • Üz forması (oval / round / square / heart)
   • Saqqal var/yox (varsa: trim stili, rəng)
   • Distinctive feature (mole, freckle, dimple, scar — varsa)
A6.5/8 — Saç:
   • Rəng (dark brown, black, blonde, grey-and-pepper və s.)
   • Uzunluq (qısa, orta, uzun)
   • Stil (side-part, slicked-back, curly, straight, wavy)
A6.6/8 — Dəri tonu:
   • Fitzpatrick scale (I-VI) və ya
   • Undertone (warm / cool / neutral)
A6.7/8 — Signature geyim (hər thumbnail-də eyni qalacaq):
   • Type (T-shirt, button-down, suit, hoodie)
   • Rəng (məs. dark charcoal, navy, white)
   • Stil (casual smart, formal, casual)
A6.8/8 — Mövcud base fotosu varmı?
   • Varsa: `refs/host-base.png` kimi yüklə (identity anchor olur — A6.3-də edit-mode istifadə olunur)
   • Yoxsa: generate-mode, sıfırdan synthetic host yaradılır
```

---

## Addım A6.2 — Stylistics.md Sahə 13-ə yaz

Yığılan məlumat `stylistics.md` Sahə 13-ə locked olaraq yazılır:

```markdown
## 13. Host identity (locked across all thumbnails)
- Age: 30-35
- Gender: male
- Ethnicity: Azerbaijani, Caucasian features
- Face shape: oval, balanced proportions
- Facial hair: trimmed dark beard, short, well-groomed
- Hair: dark brown, short, side-parted, slight wave
- Skin tone: Fitzpatrick III, warm olive undertone
- Eye color: brown
- Distinctive features: none
- Signature outfit: dark charcoal grey crew-neck T-shirt, casual smart
- Base photo: refs/host-base.png (mövcuddur)
- Vizual model üçün açıq təsvir:
  "A 30-35 year old Azerbaijani man with a trimmed dark beard,
   short dark-brown side-parted hair with slight wave, warm olive
   skin (Fitzpatrick III), brown eyes, oval face — wearing a dark
   charcoal crew-neck T-shirt — chest-up portrait framing."
```

Bu açıq təsvir paragrafı **hər gələcək thumbnail brief-də reuse** olunur — Mərhələ B-də image-prompt-engineer-ə ötürülür.

---

## Addım A6.3 — 5 brief hazırla və image-prompt-engineer-ə hand-off

Hər brief eyni identity-ni saxlayır, yalnız **ifadə + angle** dəyişir. Aşağıdakı template-i 5 dəfə təkrar et — hər variant üçün:

### Brief template (bir variant)

```markdown
### 🎬 youtube-thumbnail-designer → 🖼️ image-prompt-engineer (Host ref brief — <variant>)

**Project:** <layihə-adı>
**Stylistic profile:** thumbnail-projects/<layihə>/stylistics.md (Sahə 13 host identity oxu)
**Purpose:** Generate host reference portrait — <variant adı>
**Output file:** thumbnail-projects/<layihə>/refs/host-face-<variant>.png

**Mode:**
- Generate-mode (refs yox — bu, identity-nin ilk yaradılmasıdır)
- ŞƏRT: refs/host-base.png mövcuddursa, edit-mode istifadə et:
  - Image 1: refs/host-base.png (identity anchor, first-image priority)
  - PRESERVE: face features, skin tone, eye color, distinctive features
  - REPLACE: expression, angle, outfit (to match Sahə 13), lighting, background

**Locked host identity (stylistics.md Sahə 13-dən tam mətn):**
<paste full visual description paragraph>

**Variant-specific:**
- Expression: <bu variant üçün dəqiq təsvir>
- Angle: <front / profile-left / 3-quarter>
- Eye line: <direct to camera / off-camera at 45° (profile-də)>

**Composition (locked across all 5 variants):**
- Aspect: 1:1 (square portrait reference)
- Framing: chest-up, head occupies ~50% of frame height
- Background: neutral mid-grey (#888888) studio backdrop, completely empty
- Lighting: soft three-point studio (key 45° camera-right, fill camera-left low-intensity, rim back-top), warm 5200K, no harsh shadows
- Camera: 85mm equivalent (portrait-flattering), f/2.8 shallow DOF
- Style: photorealistic, professional studio portrait quality

**Image model:**
- Primary: <stylistics.md Sahə 11-dən — məs. GPT-Image-2 / Nano Banana 2>
- AZ glyph yox bu portret-də → text fallback rule tətbiq olunmur

**Verify clauses:**
- Face features match Sahə 13 description EXACTLY (age, ethnicity, beard, hair, skin tone, eye color)
- Wearing the signature outfit from Sahə 13 (color + style)
- Background is completely neutral (no objects, no scene elements)
- Lighting is soft and even (no harsh contrast, no dramatic shadows, no colored lights)
- Expression is precisely <variant expression description>
- Aspect 1:1, chest-up framing, head ~50% of frame
- If any face cizgi mismatches Sahə 13, regenerate
- If background contains any objects/scene, regenerate

→ Sən (image-prompt-engineer) prompt yaz: <model> dialect-ində, mode-a uyğun struktur, verify clauses daxil. Çıxış:
1. Inline code block-da chat-də (istifadəçi modelə paste edəcək)
2. thumbnail-projects/<layihə>/outputs/host-ref-<variant>-prompt.md faylına yazılır
```

### 5 variantın expression detalları

**Variant 1 — `host-face-neutral`:**
- Expression: "neutral relaxed face, mouth closed naturally, eyes calm and open looking directly at camera, eyebrows neutral position, no smile no frown"
- Angle: front (camera dead-center)
- Eye line: direct to camera

**Variant 2 — `host-face-shock`:**
- Expression: "shocked expression — eyes wide open with visible white sclera around the iris, mouth open in O-shape or slightly agape, eyebrows raised high, forehead slightly creased, expression of genuine surprise"
- Angle: front (camera dead-center)
- Eye line: direct to camera

**Variant 3 — `host-face-smile`:**
- Expression: "warm genuine smile — corners of mouth turned up, teeth slightly visible, eyes crinkled at corners (Duchenne smile), eyebrows naturally lifted, conveying warmth and approachability"
- Angle: front (camera dead-center)
- Eye line: direct to camera

**Variant 4 — `host-face-profile-left`:**
- Expression: "neutral profile expression — mouth relaxed, eye looking forward in profile, eyebrow neutral"
- Angle: 90° left profile (subject's left side visible to camera — subject's body faces camera-left)
- Eye line: off-camera, looking forward in profile direction

**Variant 5 — `host-face-3quarter`:**
- Expression: "thoughtful pensive expression — slight frown of concentration, mouth closed, eyes engaged with camera, optional hand on chin (knuckles to jaw), conveying contemplation"
- Angle: 3/4 angle, 45° rotation (body turned 45° toward camera-left, head turned slightly less to maintain eye contact with camera)
- Eye line: direct to camera

---

## Addım A6.4 — User feedback loop

5 brief image-prompt-engineer-ə hand-off olunduqdan sonra, 5 GPT-Image-2 (və ya layihə model-i) promptu istifadəçiyə inline code block-da verilir. İstifadəçi:

1. Hər promptu modelə paste edir
2. 5 şəkil generasiya olunur
3. Hər birini `refs/host-face-<variant>.png` adı ilə yükləyir
4. **image-validator skill avtomatik işə düşür** (CLAUDE.md "Image validation qaydası") — hər ref şəkili 3 qatda yoxlayır:
   - Qat A (physical realism) — universal qayda
   - Qat B (identity consistency) — Sahə 13 ilə match yoxlanır
   - Qat C (prompt match) — expression/angle/background/lighting prompt instruction-larına uyğun mu

❌ varsa → image-prompt-engineer fix mode-da yenidən yazır → istifadəçi yeni şəkil yükləyir → loop davam edir.

5 ✅ olduqda → Setup tamamlandı, Mərhələ B-yə hazır.

---

## Cross-reference

- `typography.md` — host portret-də text yoxdur, AZ glyph rule tətbiq olmur
- `safe-zones.md` — host portret 1:1 aspect-də, YouTube safe zone qaydaları tətbiq olmur (sonradan thumbnail-də crop ediləndə tətbiq olur)
- `color-strategies.md` — host portret neutral grey backdrop, palitra qaydaları yalnız thumbnail compose mərhələsində
- `ctr-formulas.md` — hər formula üçün hansı host-face variant istifadə olunur (yuxarıdakı cədvələ uyğun)

---

## Sonradan yenilənmə

Host görünüşü dəyişərsə (məs. yeni saç stili, yeni geyim trend) → istifadəçi açıq tələb edir → Sahə 13 yenilənir → A6.3 5 brief yenidən generasiya olunur → yeni ref şəkillər köhnələri əvəz edir. **Stylistics.md immutability qaydası bu addımda istisna olur** (host evolves over time, brand identity adapts).
