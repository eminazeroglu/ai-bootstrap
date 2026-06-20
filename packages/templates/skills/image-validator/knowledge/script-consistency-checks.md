# Script Consistency Checks — Image Validator

Bu fayl image-validator-in **Qat B** üçün istifadə etdiyi check-list-dir. Şəkil ssenarinin niyyətinə uyğundurmu?

---

## Şəkil növünə görə yoxlama

### Character ref (karakter reference şəkli)

| # | Checkpoint | Ssenaridə yoxla | Şəkildə yoxla |
|---|---|---|---|
| B-C1 | Yaş | Karakter yaşı yazılıb? | Vizual yaş təxminən uyğundurmu? |
| B-C2 | Etniklik | "Azerbaijani" / "Japanese" / başqa? | Üz cizgiləri, dəri tonu uyğundurmu? |
| B-C3 | Saç (rəng + uzunluq + stil) | "Dark brown short side-part" və s. | Rəng, uzunluq, stil eyni mi? |
| B-C4 | Göz (rəng + forma) | "Hazel almond" və s. | Rəng, forma uyğundurmu? |
| B-C5 | Bədən tipi | "Slim athletic" / "stocky" və s. | Build uyğundurmu? |
| B-C6 | Boy/proportion | "185cm tall, lean" | Vizual proportion uyğundurmu? |
| B-C7 | Distinctive features | Scar, mole, glasses, beard? | Görünürmü? |
| B-C8 | Default outfit | Geyim təsviri | Şəkildə geyim eyni mi? |
| B-C9 | 6-view layout | Contact sheet 2+4 panel layout | Layout doğrudurmu? |
| B-C10 | Backdrop neutral | Studio grey, no distraction | Backdrop təmiz mi? |

### Location ref (məkan reference şəkli)

| # | Checkpoint | Ssenaridə yoxla | Şəkildə yoxla |
|---|---|---|---|
| B-L1 | Interior/exterior | INT. / EKS. | Uyğundurmu? |
| B-L2 | Time-of-day | Beat hansı saatda? | Sky/işıq saatla uyğundurmu? |
| B-L3 | Season | Spring/summer/fall/winter? | Vegetation/atmosphere uyğundurmu? |
| B-L4 | Atmosphere mood | "Cozy / oppressive / dilapidated" | Mood uyğundurmu? |
| B-L5 | Color palette | "Warm amber / cool blue" | Color grade uyğundurmu? |
| B-L6 | Key features | Pəncərə, qapı, mebel, props | Hamısı var mı? |
| B-L7 | Materials | Floor, wall, furniture material | Uyğundurmu? |
| B-L8 | Scale | Otaq ölçüsü skripta uyğundurmu? | İnsan/məkan proportion |
| B-L9 | Cultural context | Bakı / Tokyo / başqa? | Architectural details uyğundurmu? |
| B-L10 | No human (location ref) | Reference şəkildə əsas karakter olmamalı | Yalnız məkan görünürmü? |

### Production cell (storyboard kadrı)

| # | Checkpoint | Ssenaridə yoxla | Şəkildə yoxla |
|---|---|---|---|
| B-P1 | Karakter eyni | Bu beat-də hansı karakter? | Şəkildə karakter ref ilə match? |
| B-P2 | Karakter geyim | Bu beat-də geyim dəyişib? | Geyim uyğundurmu? |
| B-P3 | Karakter saç | Bu beat-də saç dəyişib? (məs. yağışdan sonra wet) | Saç state uyğundurmu? |
| B-P4 | Karakter expression | Beat mood (qorxu, sevinc, üzgünlük) | Şəkildə expression uyğundurmu? |
| B-P5 | Karakter action/poza | "Çömbəlir", "qaçır", "oturur" | Şəkildə poza uyğundurmu? |
| B-P6 | Məkan eyni | Bu beat hansı məkanda? | Location ref ilə match? |
| B-P7 | Time-of-day | Beat saatı | Sky/işıq saatla uyğundurmu? |
| B-P8 | Mood/atmosphere | Beat mood | Color grade uyğundurmu? |
| B-P9 | Props in scene | Skripta görə hansı props görünür? | Şəkildə var mı? |
| B-P10 | Camera angle | Director shot list nə deyir? | Camera angle uyğundurmu? |
| B-P11 | Lens implied | Wide / medium / close-up / ECU | Frame composition uyğundurmu? |
| B-P12 | Aspect | Layihə aspect (9:16 / 16:9 / 2.39:1) | Cropping doğrudurmu? |
| B-P13 | Continuity (əvvəlki cell) | Cell N-1 ilə continuity link | Eyni geyim, eyni location state? |
| B-P14 | Continuity (sonrakı cell) | Cell N+1-ə keçid | End state başlanğıc olabilərmi? |
| B-P15 | Visual style | Layihə style (pixar-3d / photoreal və s.) | Style uyğundurmu? |

---

## Necə oxuyursan ssenarini

### 1. Beat-i tap

Ssenari Fountain formatda. Hər səhnə `İNT./EKS.` ilə başlayır. Beat-ləri:
- Action sətirlərinə bax (hadisə nədir?)
- Parenthetical-lərə bax (`(qorxu içində)` — mood)
- Dialoq/VO-ya bax (intent)
- Transition-lara bax (`> KƏSİK:`)

Şəkil hansı beat-ə aiddir? Cell N → beat M.

### 2. Karakter durumu

Beat-də karakter:
- Nə geyinib? (skripta görə dəyişiklik?)
- Necə görünür? (yorğun, oyaq, tər, quru, wet)
- Nə hiss edir? (parenthetical / mood)
- Nə edir? (action verb)
- Harada baxır? (eye-line)

### 3. Məkan durumu

Beat-də məkan:
- Time-of-day (saat dəyişdirilibmi?)
- Weather (yağış başlamış?)
- Praktik işıqlar (lampa söndürülüb / yandırılıb?)
- Müzakirə olunan obyektlər ortada görünürmü?

### 4. Continuity link

Cell N-1 ilə Cell N arasında nə dəyişib?
- Geyim eyni? (sənarist bunu açıq deməyibsə, dəyişməməlidir)
- Saç eyni? (rüzgar/yağışdan kənar, dəyişməməlidir)
- Məkan state eyni? (lampa state, qapı open/closed)
- Time eyni? (eyni beat-də saat keçmir)

---

## Misal — Cell 3 (Aytac qaçış, Beat 3)

**Ssenaridə (`01-script/v1-friendship-30s.md` beat 3):**

```
İNT./EKS. KÜÇƏ — SÜBH (7-14s)
                       Aytac
              (gözləri irəli, dərin nəfəs)
Aytac sübh saatlarında parkda qaçır. Üzündə tər damlaları. Üfüqdə günəş görünməyə başlayır.
```

**Şəkil yoxlamaları (Qat B):**

| # | Checkpoint | Ssenaridə | Şəkildə | Verdikt |
|---|---|---|---|---|
| B-P1 | Karakter | Aytac | Aytac (ref ilə match) | ✅ |
| B-P2 | Geyim | "Athletic running gear" (Cell 2-dən eyni) | Athletic top + leggings, eyni | ✅ |
| B-P3 | Saç | "Pulled back ponytail" | Ponytail, tıxac olmuş wet at temple | ✅ |
| B-P4 | Expression | "Gözləri irəli, dərin nəfəs" | Eyes forward, mouth slightly open | ✅ |
| B-P5 | Action | "Qaçır" | Running pose, hands moving | ✅ |
| B-P6 | Məkan | KÜÇƏ (park yolu) | Park yolu | ✅ |
| B-P7 | Time | Sübh (sun emerging) | Sky cool blue → warm horizon | ✅ |
| B-P8 | Mood | Wieden documentary realism | Mood: gritty, real exhaustion | ✅ |
| B-P9 | Props | Sweat at temple | Sweat visible | ✅ |
| B-P10 | Camera | 85mm close-up (shot list) | Close-up frame OK | ✅ |
| B-P11 | Lens | 85mm shallow DOF | Background blur soft | ✅ |
| B-P12 | Aspect | 9:16 | 9:16 vertical OK | ✅ |
| B-P13 | Continuity (Cell 2) | Eyni geyim, eyni saç | Eyni — OK | ✅ |
| B-P15 | Visual style | photoreal-documentary | Photoreal, no glamour | ✅ |

**Verdikt:** 13/13 ✅ — Qat B təsdiqlənir.

---

## Period + place accuracy check (HARD RULE — cells with people)

Hər production cell-də **insanlar varsa** (kostyumlu kadrlar, audience, qruplar, kütləvi səhnələr), **period + place + social context research** edilmiş olmalıdır. Validator yoxlayır:

| # | Element | Research-də yoxlanır | Cell-də yoxlanır | Verdikt |
|---|---|---|---|---|
| PP-1 | Concrete year + place | "1908 Bakı" yox "1900s Caucasus" | Costume era + city stil match | ✅/❌ |
| PP-2 | Ethnic composition of crowd | Research file faktiki nisbət göstərir? | Cell-də qarışıq görünür mü? | ✅/❌ |
| PP-3 | Period-correct dress per ethnic group | Hər qrupun dövr-dəqiq geyimi | Hər figure düzgün geyinib? | ✅/❌ |
| PP-4 | Event-specific nuance | Premiere vs daily, formal vs casual | Cell-də uyğun formality? | ✅/❌ |
| PP-5 | Social rules (gender separation, observance) | Dövrün konvensiyaları | Cell-də gözlənilir? | ✅/❌ |
| PP-6 | Real archive photo reference cited | `02-characters/<period>-research.md` mövcuddur? | Cell faktiki photo ilə uyğundur? | ✅/❌ |
| PP-7 | Figure density realistic for scene type + time + place | Bu səhnə tipi + saat + dövr üçün realistic period density nə olardı? (məs. busy morning public building = 8-14, theatre premiere = 80-120, quiet street early morning = 3-5, empty office at night = 0-2) | Cell-də faktiki figur sayı + dərinlik paylanması (FG/MG/BG) uyğundurmu? Sterile-empty (real density-dən xeyli aşağı, BG figur yox) və ya chaotically-crowded (15+ same plane, üz keyfiyyəti pozulur) və ya same-plane crowd (bütün figurlar bir dərinlikdə) → ❌ | ✅/❌ |

**Research file yoxdursa** → validator dayanır və xəbərdar edir: "Bu cell konkret tarixi dövr + məkan ehtiva edir (insanlarla). character-designer və ya screenwriter çağırılıb period + place + costume research edilməyincə validation davam edə bilməz." (Pair with mandatory-research-and-honesty user memory rule.)

**PP-7 validation pattern:** Validator cell-ə baxır və hər dərinlik təbəqəsindəki figur sayını ayrı sayır (FG / MG / BG). Sonra səhnə tipini ssenari/beat təsvirindən təyin edir (busy public morning / theatre premiere / quiet street / cabinet meeting / etc.) və `character-anatomy.md` "HARD RULE — Directorial Realism Density" cədvəli ilə tutuşdurur. Üç failure mode: (a) **sterile-empty** = total count realistic density-dən çox aşağı, BG layer ümumiyyətlə yox → regenerate with depth-distributed crowd added; (b) **chaotically-crowded** = 15+ figur same plane-də, AI üz keyfiyyəti collapsing → regenerate with same total redistributed in depth OR FG count reduced; (c) **same-plane crowd** = total count uyğun, lakin bütün figurlar bir dərinlikdə → regenerate with explicit FG/MG/BG distribution. Self-check sualı: "Bu səhnənin dövründə + yerində + saatında dayanmış real bir rejissor bu frame-i bu density + distribution ilə çəkərdimi?" Cavab yox → ❌.

**Pattern referansı:** `image-prompt-engineer/knowledge/character-anatomy.md` "MANDATORY period + place costume research per kadr" HARD RULE + "HARD RULE — Directorial Realism Density"; `composition.md` depth-distribution model; `physical-realism-checks.md` A9.x verified period tables (electrification, state symbols).

**Origin:** 2026-05-21, 28-may documentary k.3 — audience cell research edilmədən yazılmışdı; user demanded universal rule.

---

## Geographic/Landmark accuracy check (sərt — CLAUDE.md qaydası)

Production cell-də konkret real-world məkan (Baku, Tokyo, Flame Towers və s.) varsa, **Qat B-də geographic research file-a müraciət olunmalıdır**:

1. `03-locations/<məkan>-research.md` faylı mövcuddurmu? Oxu.
2. Hər geographic claim research ilə tutuşdurulsun:

| # | Element | Research-də nə deyir | Cell-də nə görünür | Verdikt |
|---|---|---|---|---|
| GEO-1 | Landmark elevation | "Hill ~80m above boulevard" | Sea level near boulevard | ❌ |
| GEO-2 | Landmark distance | "15-min walk inland" | At boulevard edge | ❌ |
| GEO-3 | Sun direction at sunset | "West, behind city" | West behind city | ✅ |
| GEO-4 | Surrounding architecture | "Modern + traditional mix" | Generic skyline | ⚠️ |
| GEO-5 | Cultural details | "Bakı boulevard tile pattern" | Generic paving | ⚠️ |

**Geographic ❌ kritikdir** — bu, real-world məkanın AI generic stock-a çevrilməsidir. Fix prompt-da research file referansı + anti-default clauses tələb olunur.

**Research file mövcud deyilsə** → validator dayanır və xəbərdar edir: "Bu cell konkret real-world məkan ehtiva edir, lakin `03-locations/<məkan>-research.md` yoxdur. location-designer çağırıldıqdan və research edildikdən sonra validation davam etsin."

---

## Reference identity matching (sərt — CLAUDE.md qaydası)

Production cell yoxlananda **iki şəkil paralel oxunmalıdır**:
1. Production cell şəkili (istifadəçinin yüklədiyi)
2. Reference şəkil(lər)i (`02-characters/<obraz>-ref.png` + `03-locations/<məkan>-ref.png`)

"Oxşar görünür" yetərli deyil. **Birə-bir identity match** yoxlanır.

### Karakter identity check cədvəli (hər karakter üçün ayrı)

| # | Element | Ref-də nə görünür | Cell-də nə görünür | Verdikt |
|---|---|---|---|---|
| ID-C1 | Üz forması | Oval / round / square | Eyni | ✅ / ❌ |
| ID-C2 | Burun (forma + uzunluq) | Düz / qabarıq, orta uzunluq | Eyni | ✅ / ❌ |
| ID-C3 | Göz rəngi (dəqiq nuance) | Olive-green | Eyni — brown deyil | ✅ / ❌ |
| ID-C4 | Göz forması | Almond / round | Eyni | ✅ / ❌ |
| ID-C5 | Qaş forması | Arched / straight, density | Eyni | ✅ / ❌ |
| ID-C6 | Saç rəngi | Dark brown, NOT black | Eyni | ✅ / ❌ |
| ID-C7 | Saç uzunluğu | Shoulder-length | Eyni | ✅ / ❌ |
| ID-C8 | Saç stil/texture | Wavy / straight / curly | Eyni | ✅ / ❌ |
| ID-C9 | Saç xətti | Heart-shaped / straight | Eyni | ✅ / ❌ |
| ID-C10 | Dəri tonu | Olive-tan (Fitzpatrick III) | Eyni | ✅ / ❌ |
| ID-C11 | Dəri texture | Smooth / freckled / aged | Eyni | ✅ / ❌ |
| ID-C12 | Distinctive features | Scar / mole / dimple / freckle | Hamısı görünür | ✅ / ❌ |
| ID-C13 | Bədən tipi | Slim / athletic / stocky | Eyni | ✅ / ❌ |
| ID-C14 | Boy proportion | Tall / short | Eyni | ✅ / ❌ |
| ID-C15 | Yaş görünüşü | 8 yaş ref | 8 yaş cell | ✅ / ❌ |

**İstisna sahələri** (production cell-də fərqli ola bilər — ref-də fərqli olduğu üçün ❌ deyil):
- Geyim (ssenaridə dəyişikliyə icazə varsa)
- Makiyaj (ssenaridə dəyişiklik tələbi varsa)
- Saç stylin (məs. ref-də açıq, cell-də ponytail)
- Expression (mood beat-ə uyğun fərqli)
- Pose/action

### Məkan identity check cədvəli

| # | Element | Ref-də | Cell-də | Verdikt |
|---|---|---|---|---|
| ID-L1 | Architectural type | Soviet panel apartment / Modern villa / etc. | Eyni | ✅ / ❌ |
| ID-L2 | Pəncərə sayı və forması | 2 arched windows | Eyni | ✅ / ❌ |
| ID-L3 | Qapı yeri/forması | Single door, frame style | Eyni | ✅ / ❌ |
| ID-L4 | Divar rəngi/material | Cream plaster | Eyni | ✅ / ❌ |
| ID-L5 | Döşəmə material | Wooden parquet / tile / concrete | Eyni | ✅ / ❌ |
| ID-L6 | Tavan struktur | Flat / coffered / sloped | Eyni | ✅ / ❌ |
| ID-L7 | Furniture (eyni props) | Wooden table + 2 chairs + lamp | Hamısı var | ✅ / ❌ |
| ID-L8 | Lighting setup | Sol pəncərə key + sağ lampa | Eyni mənbə yerləri | ✅ / ❌ |
| ID-L9 | Atmospheric details | Plants, art, decorations | Eyni | ✅ / ❌ |
| ID-L10 | Spatial proportion | Wide / cramped / tall ceiling | Eyni | ✅ / ❌ |

**İstisna sahələri** (cell-də fərqli ola bilər):
- Time-of-day dəyişikliyi (ref dawn, cell midday — işıq dəyişir, struktur eyni)
- Window/lamp state (ref-də pəncərə bağlı, cell-də açıq — OK)
- Camera angle (ref establishing shot, cell close-up — OK)
- Karakter mövqeyi (ref-də əsas karakter yoxdur, cell-də var — OK)

### Multi-character cell üçün

Cell-də 2+ karakter varsa, **hər karakter üçün ayrı ID cədvəli**:
- Karakter 1 (Aytac) → 15 element ✅/❌
- Karakter 2 (Tural) → 15 element ✅/❌
- Karakter 3 → ...

### Identity ❌ kritikdir

Bir element ❌ olarsa, bütün cədvəl identity failure sayılır. Səbəbi: video continuity-də start frame kimi istifadə olunarsa, video clip də səhv karakter daşıyacaq.

Fix prompt template:
```
PRIMARY identity anchor: 02-characters/<obraz>-ref.png (image 1)

Open prompt with: "The character in image 1 (<NAME>) — preserve EXACT identity:
- Face shape: <oval/round/square>
- Nose: <description>
- Eyes: <colour, shape> (NOT <wrong colour seen in failed image>)
- Hair: <colour, length, style>
- Skin: <tone, texture>
- Distinctive: <scar/mole/freckle if any>

Verify clause: 'If face does not match image 1 exactly, regenerate.'"
```

---

## Davranış qaydaları

### Ssenari mətni hər zaman oxunmalıdır
Sən şəklə baxır, sonra ssenari faylını **birbaşa Read** edirsən (yaddaşdan deyil). Skript hər layihədə fərqli olduğu üçün generalizasiya etmə.

### Karakter ref ilə müqayisə et (sərt)
Character ref şəkili `02-characters/<obraz>-ref.png` var. Production cell yoxlananda **ref şəkilinə də bax** — eyni karakterdirmi? Yuxarıdakı 15 element üzrə dəqiq yoxla.

### Continuity əsas dəyərdir
Cell N-1 və Cell N arasında "səhv olmayan dəyişiklik" → pozulma. Skript açıq desə "Aytac geyimini dəyişir" — onda OK. Demədisə, eyni qalmalıdır.

### Visual style filter
Layihə `WORKFLOW.md` faylında `Visual style:` sahəsi var (pixar-3d / photoreal-documentary və s.). Şəkil bu stilə uyğundurmu? Pixar layihədə photoreal şəkil → pozulma.

---

*Versiya: 1.1 | Son yenilənmə: 2026-05-21 (Period + place accuracy check bölməsi əlavə olundu — cells with people üçün PP-1..PP-6 checkpoint cədvəli. 28-may documentary k.3 audience research-without yazılmışdı; rule universalised. Sinxron: character-anatomy.md "MANDATORY period + place costume research per kadr" HARD RULE).*
