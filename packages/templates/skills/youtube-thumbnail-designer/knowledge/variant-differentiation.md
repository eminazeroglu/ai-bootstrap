# Variant Differentiation — 3 thumbnail-in real A/B test diversifikasiyası

> **Sərt qayda:** Mərhələ B-də 3 thumbnail variantı yaradılarkən, hər biri **eyni layihə DNA-sında** qalsa da, **5 əsas oxda** fərqlənməlidir. Yalnız kompozisiya formulu dəyişdirmək yetərli deyil — YouTube native A/B testing 3 variant arasında **real fərq** axtarır, qarışıq və ya köpük variantlar performans data-sını korlayır.

## Niyə bu qayda var

YouTube native A/B test alqoritmi:
- 3 thumbnail variantı qəbul edir
- Avtomatik trafik bölür
- "Watch time share" əsasında qalibi seçir
- Real fərq olmazsa → data noise → qalib təsadüfi seçilir

3 variant **fərqli stimul** vermədikdə:
- Hansı hook işləyir bilmirik (text mövzu / stat / manifest?)
- Hansı vizual yanaşma cəlb edir bilmirik (host shock / clean editorial / signature pose?)
- Hansı rəng punch işləyir bilmirik (red / yellow accent / teal-orange?)

**3 truly different variants → 3 distinct CTR signals → algorithm-driven winner selection.**

## 5 oxda differensiya (məcburi)

Hər variant aşağıdakı **5 oxun ən azı 4-ündə** fərqlənməlidir:

| # | Ox | Variant A | Variant B | Variant C |
|---|---|---|---|---|
| 1 | **On-thumbnail TEXT** | Question hook (curiosity) | Stat/concrete hook (shock) | Manifest/negation hook (statement) |
| 2 | **BACKGROUND scene** | Atmospheric, populated | Empty/abandoned (curiosity gap) | Symbolic/editorial (movie poster) |
| 3 | **TEXT color emphasis** | Primary red dominant | White-on-dark (urgency news-style) | Subdued red, atmosphere-led |
| 4 | **Composition formula** | Peace-sign-branding / channel signature | Shock-reaction / MrBeast pattern | Clean-center / editorial |
| 5 | **EMOTIONAL mode** | Curious / engaged | Urgent / shocked | Contemplative / declarative |

## Ox 1 — Text differentiation (3 hook tipi)

Hər video üçün skill **3 fərqli mətn hook** təklif edir, sonra istifadəçi seçir/dəyişir. 3 hook tipi:

### Hook tipi 1 — Question (curiosity)
- Sual işarəsi və ya sual formalı statement
- Reader brain-i "cavab" axtarmağa məcbur edir
- 3-5 söz
- Misal: "Bu doğrudurmu?", "Niyə belə oldu?", "Sən bunu bilirsən?"

### Hook tipi 2 — Stat/Concrete (urgency/shock)
- Rəqəm, müddət, faktiki claim
- Declarative, NOT a question
- Kliklə təsdiq olunan konkret iddia
- Misal: "10 İLDƏ HEÇ NƏ", "3 MİLYON İTKİ", "BU BİTDİ"

### Hook tipi 3 — Manifest/Negation (statement)
- Mənifestaya bənzər bəyanat
- Tez-tez negation ilə ("YOX", "DAHA YOX", "BİTDİ")
- Editorial impact
- Misal: "ZAMAN BİTDİ", "BU YOL DÜZGÜN DEYİL"

### Skill prosedur (Mərhələ B Addım B3) — script-first, bir-bir, user-driven

**Sərt qayda:** Hooks **avtomatik skill təxminindən deyil, mütləq əvvəlcə ssenaridən / transkriptdən** çıxarılır. Skill imagination ilə hook yaratmır — script-də olan **konkret cümlələri, retorik sualları, manifest-bənzər ifadələri** scan edir və hər hook tipinə uyğun olanı seçir.

#### Mənbə prioriteti (sıra ilə)

1. **Ssenari faylı** (varsa) — script-də olan konkret action satırları, VO, dialoq, müəllifin yazılı hook-ları
2. **Video transkripti** (yt-dlp ilə çəkilibsə) — host-un real söylədiyi konkret cümlələr, retorik suallar, ifadələr
3. **Video başlığı və description** (yalnız 1 və 2 yoxdursa, yoxsa zəif mənbə) — title remix variantları

**Niyə bu sıra:** Ssenari = müəllifin niyyəti, transkript = real söylənmiş, title = marketing meta. Hook müəllif niyyətinə yaxın olmalıdır.

#### One-by-one prosedur (sequential, CLAUDE.md "Sualları bir-bir ver" qaydası)

3 hook **eyni anda təklif olunmur**. Skill aşağıdakı sıra ilə **bir-bir** soruşur — istifadəçi cavab versin, sonra növbəti hook-a keç:

**Sub-step B3.2.1 — Variant A (Question hook):**
```
Variant A — question hook (curiosity).
Ssenari/transkriptdə tapdığım konkret variantlar:
  - "<sitatlanmış sətir 1>" (ssenari xx:xx)
  - "<sitatlanmış sətir 2>" (transkript)
  - "<sitatlanmış sətir 3>"

Tövsiyəm: "<proposal — 3-5 söz, sual formalı>"

Razısansa "ok" yaz, yoxsa öz versiyanı ver.
```

İstifadəçi cavab verir (ok / dəyişiklik). Skill cavabı locked qəbul edir → keç **B3.2.2**-yə.

**Sub-step B3.2.2 — Variant B (Stat/concrete hook):**
```
Variant B — stat/concrete hook (urgency/shock).
Ssenari/transkriptdə tapdığım konkret variantlar:
  - "<sitatlanmış sətir/iddia 1>"
  - "<sitatlanmış sətir 2>"

Tövsiyəm: "<proposal — 3-5 söz, declarative claim>"

Razısansa "ok", yoxsa öz versiyanı ver.
```

Cavab → locked → keç **B3.2.3**-ə.

**Sub-step B3.2.3 — Variant C (Manifest/negation hook):**
```
Variant C — manifest/negation hook (statement).
Ssenari/transkriptdə tapdığım konkret variantlar:
  - "<sitatlanmış sətir 1>"
  - "<sitatlanmış sətir 2>"

Tövsiyəm: "<proposal — 3-5 söz, manifestaya bənzər və ya negation>"

Razısansa "ok", yoxsa öz versiyanı ver.
```

Cavab → locked → keç **B3.3** (refs status).

#### Skill source citation (məcburi)

Hər proposal-da skill **harada tapdığını göstərməlidir** (transparency):
- Ssenari faylından sitat: "(ssenari, satır 47)" və ya "(action: parkda...)"
- Transkriptdən sitat: "(transkript, 1:32-də host deyir)"
- Title remix: "(title-dən qısaldılmış)"

Bu istifadəçiyə **mənbənin nə qədər güclü olduğunu** anlamağa kömək edir.

#### Hooks yox olarsa

Əgər script/transkript-də konkret hook tapılmırsa (məs. çox technical video, ya da müəllif hook yazmayıb), skill:
1. İstifadəçiyə açıq deyir: "Ssenaridə konkret hook tapmadım — sənin yazdığını gözləyirəm"
2. İstifadəçi 3 hook-u özü yazır
3. Skill yalnız format yoxlaması edir (3-5 söz, AZ glyph)

**Skill imagination ilə "creative" hook yazmaq qadağandır** — bu, müəllif niyyətindən kənara çıxa bilər.

## Ox 2 — Background differentiation

3 fərqli atmosfer/scene:

| Variant | Background tipi | Mood |
|---|---|---|
| A | Channel-default atmosfer (locations.md baseline + golden hour) | Familiar, engaging |
| B | Empty / abandoned / depopulated scene (curiosity gap) | Urgent, unsettling |
| C | Symbolic / editorial / movie-poster scene (abandoned object as focal) | Contemplative, cinematic |

**Niyə fərqli:** Vizual scan-stop trigger müxtəlif viewer arxetiplərinə uyğundur — bəzi viewer-lər "tanış" thumbnail-ə klikləyir, bəziləri "gizem" thumbnail-ə, bəziləri "premium editorial" thumbnail-ə.

## Ox 3 — Color emphasis differentiation

**Locked palette pozulmur** (stylistics.md Sahə 3) — lakin hər variant **palette daxilində** fərqli ox vurğulayır:

### Variant A — Primary red dominant
- Text: red `#DC2626` (saturated primary)
- Background: warm photograph + dark overlay
- Accent: white (subtle)
- **Feel:** energetic, signature

### Variant B — White-on-dark (urgency news-style)
- Text: white `#FFFFFF` (instead of red)
- Background: darker overall (50%+ dark overlay)
- Accent: red highlight on KEY word only (məs. "BOŞ" qırmızı, "MƏRKƏZ" ağ)
- **Feel:** urgent, breaking-news authority

### Variant C — Subdued red, atmosphere-led
- Text: red `#DC2626` lakin **smaller scale relative to scene**
- Background: cinematic teal-and-orange dominates visually
- Accent: white metadata caption (subtle 65% opacity)
- **Feel:** premium editorial, movie poster

**Niyə:** Eyni brand palitrasında 3 fərqli reading mode — viewer alqoritmik olaraq biri-birindən fərqli stimul alır.

## Ox 4 — Composition formula

Already documented in `ctr-formulas.md`. 3 variant üçün **stylistics.md Sahə 6** alternative formulas siyahısı locked.

Default niche → formula matrisi (ctr-formulas.md cədvəlindən):

| Niche | Variant A | Variant B | Variant C |
|---|---|---|---|
| commentary | peace-sign-branding | shock-reaction | clean-center |
| edu | shock-reaction | real-vs-AI | clean-center |
| vlog | peace-sign-branding | shock-reaction | clean-center |
| how-to | real-vs-AI | before-after | shock-reaction |

## Ox 5 — Emotional mode

Hər variant fərqli emosional state-ə hədəfləyir:

| Variant | Mode | Trigger |
|---|---|---|
| A | Curiosity / engagement | "Bunu görmək istəyirəm" |
| B | Urgency / shock | "Bunu indi bilməliyəm" |
| C | Contemplation / authority | "Bu ciddi bir məsələdir" |

3 fərqli viewer state → 3 fərqli CTR signal → algorithm winner selection.

## Praktik nümunə — cvn-gor-ne-deyirem

Video: "Gör Nə Deyirəm, Mərkəzə Niyə Gəlməyək?" (Bakı mərkəzi mövzusu)

### Variant A — Question hook + Channel atmosphere + Red dominant + Peace-sign
- Text: "GÖR NƏ DEYİRƏM, MƏRKƏZƏ?" (channel signature, sarkastik sual)
- Background: Nizami küçəsi golden hour, atmospheric blurred Flame Towers
- Color: red `#DC2626` text on dark plate
- Formula: peace-sign-branding (host signature thoughtful pose)
- Mode: curious / channel-engaged

### Variant B — Stat/shock hook + Empty scene + White-on-dark + Shock-reaction
- Text: "MƏRKƏZ ARTIQ BOŞDUR" (3 söz declarative shock)
- Background: Empty Bakı plaza widely depopulated, harsh midday or evening light, dramatic vignette
- Color: white text dominant, single red word "BOŞDUR" for accent emphasis
- Formula: shock-reaction (host asymmetric shock + hand-to-head action)
- Mode: urgent / news-flash

### Variant C — Manifest/negation hook + Symbolic scene + Subdued atmosphere + Clean-center
- Text: "MƏRKƏZƏ DAHA YOX!" (3 söz manifest negation)
- Background: Cinematic abandoned cafe chair midground, Flame Towers silhouette far distance, teal-and-orange grade
- Color: red text smaller in scale, cinematic atmospheric dominance
- Formula: clean-center (no host, editorial movie poster)
- Mode: contemplative / declarative

**3 fundamentally different stimuli → real A/B test data.**

## Verify checklist (hər brief yazılarkən)

Hər 3 variant brief-i yazıldıqdan sonra:

- [ ] **Text** 3-ündə fərqli (eyni söz kombinasiyası deyil)
- [ ] **Background scene** 3-ündə fərqli (eyni foto / eyni atmosfer deyil)
- [ ] **Text color emphasis** 3-ündə fərqli (eyni qırmızı dominant + ağ outline deyil)
- [ ] **Composition formula** 3-ündə fərqli (stylistics.md Sahə 6 alternatives siyahısından)
- [ ] **Emotional mode** 3-ündə fərqli (curious / shock / manifest)
- [ ] Bütün 3-də **brand DNA preserved** (palette / font / safe zones / logo / aspect locked from stylistics.md)

5/5 ox fərqlənirsə → ideal. 4/5 → acceptable. 3/5 və daha az → yenidən yaz, real differensiya yox.

## SKILL.md inteqrasiyası

`SKILL.md` Mərhələ B Addım B3 (sual klasteri) 4 sualdan ibarətdir:

```
B3.1/4 — Video başlığı və ya hook nədir? (1 cümlə)

B3.2/4 — 3 thumbnail variantı üçün 3 fərqli mətn hook (skill proposal + təsdiq):
  Variant A (question): "<...>"
  Variant B (stat/concrete): "<...>"
  Variant C (manifest/negation): "<...>"

B3.3/4 — Refs status (host face + logo + əlavə şəkillər)

B3.4/4 — Özəl istisna varmı?
```

`SKILL.md` Addım B5-də variant brief yazılarkən bu fayl Read olunur və **5/5 differensiya** məcburi yoxlanır.

## Cross-references

- `ctr-formulas.md` — niche → formula matrisi
- `color-strategies.md` — palette daxilində color emphasis variations
- `professional-techniques.md` — hər variantda 10 prinsipin tətbiqi (eyni qalır, fərqli icrada)
- `stylistics.md` — locked palette/font/safe zones (variant-larda dəyişməz)

## Sources

- YouTube Creator Academy A/B test methodology 2026
- Cənubi Koreya / ABŞ YT creator best practices (Pikzels, ThumbnailScout)
- Banana Thumbnail "3-variant strategy" guides
