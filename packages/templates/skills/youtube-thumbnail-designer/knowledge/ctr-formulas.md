# CTR Formulas — 5 yoxlanmış kompozisiya pattern-i

> Industry consensus 2026: high-CTR thumbnail-lər **bir subject, 2-3 rəng, 3-5 söz** prinsipini izləyir. Bu fayl 5 isbatlanmış kompozisiya formulunu sıralayır — niçə-ə uyğunluğu, psixoloji əsası, vizual struktur şablonu.

## Contents

1. shock-reaction
2. real-vs-AI split
3. before-after
4. clean-center
5. peace-sign-branding

---

## 1. shock-reaction

**Psixoloji əsas:** İnsan üzü thumbnail-də **+20-30% CTR** artırır (Awisee 2026 məlumatları). Şokda olan üz — geniş gözlər, açıq ağız, qalxan qaşlar — izləyicinin **mirror neuron** sistemini aktivləşdirir: "nə baş verdi?" reaksiyası kliki tetikləyir.

**Vizual struktur:**
```
┌──────────────────────────────────┐
│                                  │
│   [FACE]      ┌─BIG TEXT─────┐  │
│   shock       │ 3-5 söz, all │  │
│   pose        │ caps, bold   │  │
│   sol         │              │  │
│   üçdə-bir    │ sağ-mərkəz   │  │
│              └──────────────┘   │
│   logo                          │
│   sol-alt                       │
└──────────────────────────────────┘
              ↑ sağ-alt 16% boş (YT timestamp)
```

- Subject placement: **sol üçdə-bir**, üz frame-in **40-45%**-i
- Eye line: kameraya **birbaşa**
- Expression: geniş gözlər (white sclera görünən), açıq ağız (V-shape), qalxan qaşlar
- Text: sağda, 2-sətrli, böyük, kontrast rəng (qırmızı və ya sarı dark fonda)
- Background: **dark gradient** (üz parlaq görünsün)

**Best for:** drama, news, commentary, edu (controversial topic), reaction videos
**Avoid for:** calm/atmospheric content (atmospheric-cinematic janr), corporate B2B

**Prompt template (image-prompt-engineer-ə ötürmək üçün):**
- "Host on the left third, face occupying ~40% of frame, eyes wide open with surprised expression, mouth slightly open, eyebrows raised"
- "Large bold sans-serif text on the right side, all-caps, 2 lines, high contrast color from project palette"
- "Dark gradient background, subject lit from camera-right, rim light on cheekbone"

---

## 2. real-vs-AI split

**Psixoloji əsas:** İki obyekt yan-yana → **müqayisə marağı** (curiosity gap). İzləyici soruşur: "fərq nədir?" — və cavab üçün klikləyir. 2026-da AI mövzularında dominant pattern.

**Vizual struktur:**
```
┌──────────────────────────────────┐
│            │                     │
│   LEFT     │     RIGHT           │
│   (real)   │     (AI / new)      │
│            │                     │
│   subject  │     subject         │
│            │                     │
│            │                     │
│    "VS" ortada və ya "→" arrow  │
└──────────────────────────────────┘
```

- Frame ortadan **bölünür** (vertical line, ~5% gap)
- Sol tərəf: "before" və ya "real" (subject, location, product)
- Sağ tərəf: "after" və ya "AI" (paralel kontent)
- Mərkəzdə kiçik "VS" və ya "→" işarəsi
- Mətn: yuxarı və ya alt strip-də, hər iki tərəfi əhatə edir

**Best for:** edu (tutorial), tech, how-to, AI-related content, product reviews
**Avoid for:** music, atmospheric, podcast

**Prompt template:**
- "Two-panel composition split vertically down the middle, 5% gap between panels"
- "Left panel: <real subject description>, Right panel: <AI/new subject description>"
- "Centered small 'VS' label at the midpoint, ~5% of frame width"
- "Single unified background gradient across both panels for visual cohesion"

---

## 3. before-after

**Psixoloji əsas:** Transformation narrative — izləyici **dəyişimi** görmək istəyir. Fitness, design, tutorial niche-lərində dominant. Real-vs-AI ilə eyni split-pattern, lakin **eyni subject** iki vəziyyətdə.

**Vizual struktur:**
```
┌──────────────────────────────────┐
│ "BEFORE"   ┊   "AFTER"           │
│            ┊                     │
│ subject    ┊  subject            │
│ vəziyyət A ┊  vəziyyət B         │
│            ┊                     │
│ <desaturated, dimmer>  <vivid>   │
└──────────────────────────────────┘
```

- Sol: əvvəlki vəziyyət (desaturated rəng, dim işıq)
- Sağ: yeni vəziyyət (vivid rəng, parlaq işıq)
- Eyni subject hər iki tərəfdə (eyni pose və ya pose dəyişikliyi)
- "BEFORE" / "AFTER" yazıları yuxarıda kiçik (text > 4 söz olmamalı)

**Best for:** how-to, fitness, design tutorials, makeover, productivity
**Avoid for:** news, drama, commentary

**Prompt template:**
- "Two-panel composition, same subject in both panels"
- "Left panel: <before state> — desaturated colors, dim ambient lighting, slightly muted contrast"
- "Right panel: <after state> — vivid colors, bright key light, high contrast"
- "Small labels 'BEFORE' top-left of left panel, 'AFTER' top-left of right panel"

---

## 4. clean-center

**Psixoloji əsas:** Minimalism + güclü tipoqrafiya. Subject yoxdur (və ya çox kiçik), **mesaj birinci**. Premium kanal estetikası — Wong Kar-wai aesthetic-i thumbnail-ə tətbiq edilmiş forması. Az saytın yapışdığı pattern, lakin **doğru audience**-də (gen-Z, dizayn-yönlü) yüksək CTR.

**Vizual struktur:**
```
┌──────────────────────────────────┐
│                                  │
│                                  │
│        BIG TEXT MƏRKƏZDƏ        │
│        3-5 SÖZ, ALL CAPS         │
│                                  │
│                                  │
│   kiçik subject və ya yoxdur    │
└──────────────────────────────────┘
```

- Subject **yoxdur** və ya çox kiçik (frame-in <10%-i, alt-sağda kiçik avatar)
- Text **mərkəz**dədir, frame-in 60-70%-ini doldurur
- Background: **solid** və ya minimal gradient
- Font: çox böyük, qalın, tək vurğu rəngi
- Whitespace: çox — frame "boş" hiss verir

**Best for:** podcast, music (cover style), commentary essays, atmospheric content, design/aesthetic channels
**Avoid for:** vlog (üz lazımdır), reaction, drama

**Prompt template:**
- "Minimalist composition, large centered text occupies 60-70% of frame"
- "Background: solid color from project palette, or subtle gradient"
- "No subject in frame, or tiny corner avatar at bottom-right (excluded from YT timestamp safe zone)"
- "Generous negative space, sans-serif heavy font, all-caps"

---

## 5. peace-sign-branding

**Psixoloji əsas:** Host **branding signal** + **trust** — host eyni jest, eyni outfit, eyni pose hər thumbnail-də. İzləyici kanal-ı **bir görüntüdə tanıyır**. MrBeast, Casey Neistat, Marques Brownlee tipli kanal pattern-i.

**Vizual struktur:**
```
┌──────────────────────────────────┐
│                                  │
│              [HOST]              │
│              center              │
│              peace-sign jest     │
│              və ya signature pose│
│                                  │
│       sub-text alt strip         │
└──────────────────────────────────┘
```

- Host **mərkəzdə**, üz frame-in 30-40%-i
- **Signature jest** — peace sign, point, double thumbs-up — hər thumbnail-də eyni
- Outfit/colour scheme: eyni (brand-locked)
- Mətn alt strip-də və ya yan tərəfdə (minimal — 2-3 söz)
- Background: dynamic (location-related) lakin host **dominant** qalır

**Best for:** personal brand, vlog, lifestyle, established creator (kanalı tanınan)
**Avoid for:** brandsiz kanal, news, edu (text-heavy)

**Prompt template:**
- "Host centered in frame, face occupying 30-40%, performing signature pose <specify pose>"
- "Host wears <signature outfit colors from stylistics>"
- "Background: location-related, but host remains dominant focal point"
- "Sub-text in lower strip, 2-3 words max"

---

## Formula seçimi — niche → tövsiyə cədvəli

| Niche | A (default) | B (alt) | C (alt) |
|---|---|---|---|
| edu | shock-reaction | real-vs-AI | clean-center |
| vlog | peace-sign | shock-reaction | clean-center |
| podcast | clean-center | peace-sign | shock-reaction |
| how-to | real-vs-AI | before-after | shock-reaction |
| drama | shock-reaction | clean-center | real-vs-AI |
| music | clean-center | peace-sign | shock-reaction |
| news | shock-reaction | clean-center | real-vs-AI |
| commentary | shock-reaction | clean-center | real-vs-AI |

`stylistics.md` Sahə 6-da **3 alternativ formul** locked saxlanır — Mərhələ B-də 3 variant generasiyası bu siyahıdan götürülür.

---

## Universal yoxlama (hər formul üçün)

Hər formul üzərində bu 7-element checklist:

- [ ] Bir dominant subject (>30% frame ratio) və ya 0 subject (clean-center)
- [ ] 2-3 rəng max (palette dispersion)
- [ ] 3-5 söz max (text count)
- [ ] Sağ-alt 16% boş (YT timestamp safe zone)
- [ ] Top-right 12% boş (channel overlay)
- [ ] Kontrast: bright subject on dark, və ya dark text on bright
- [ ] Mobil 120px test (mobile-legibility.md)

Hər brief sonunda image-prompt-engineer-ə **verify clauses** kimi ötürülür.
