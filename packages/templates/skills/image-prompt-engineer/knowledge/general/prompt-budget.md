# Prompt Length Budget — Universal Compression Strategy

> **HARD RULE — image generation promptları char budget-ə uyğun olmalıdır.** Verbose 8,000-9,000 char promptlar AI image modellərində ya **silent quality drop** ya da **explicit "prompt too long" error** verir. Bu fayl model-aqnostik kompresiya strategiyasıdır — `models/gpt-image-2.md` və `models/nano-banana.md` HARD RULE bölmələri ilə birlikdə oxunmalıdır.

---

## Niyə char budget məcburidir

AI image modelləri **early-token bias** ilə işləyir:

- Promptun **ilk ~500-800 tokeni** dominant olur
- ~500 tokendən sonra instruction-ların effektivliyi **kəskin düşür**
- 9,000 char promptda kritik detallar (refs, identity locks, anti-grit, lighting, anti-synthetic) **sondadırsa**, model onları **görməyəcək**
- Texniki "hard limit" ≠ effektiv limit
- Web UI-lərdə isə hətta soft limit də 2,000-4,000 char-dadır

---

## Verified char limits (web research, 2026-05-21)

| Model | Hard limit | Praktik effektiv | Web UI cap |
|---|---|---|---|
| GPT-Image-2 (OpenAI) | 32,000 char | **~3,000 char (~500 söz)** | dəyişir |
| Nano Banana 2 (Gemini 3.1 Flash Image) | 131K tokens API | ~8,000 char API | **2,000 char web** |
| Nano Banana Pro (Gemini 3 Pro Image) | 65K tokens API | ~8,000 char API | 2,000 char web |
| Midjourney v7 | 6,000 char | ~3,500 char | 6,000 char |
| Flux Pro | ~512 tokens optimal | ~2,000 char | dəyişir |

**Universal target (parallel multi-model istifadədə):**
- **Hədəf:** ≤2,800 char per prompt
- **Maksimum:** 3,000 char (mütləq aşma)
- **Səbəb:** Hər iki modelə eyni prompt yapışdırılır → ən kiçik effektiv limit (~3,000) hökm edir

---

## Detection thresholds (`wc -c` verification habit)

Hər prompt yazandan sonra **gözlə ölçmə, hesabla**:

```bash
cat prompt.txt | wc -c
```

| Char count | Verdikt | Action |
|---|---|---|
| **≤2,500** | ✅ optimal | Davam et |
| **2,500-3,000** | ⚠️ pass | Aggressive compression mümkündür |
| **3,000-4,000** | ⚠️ risk | GPT-Image-2-də quality drop, kompress et |
| **>4,000** | ❌ critical | Aggressive cut LAZIMDIR |
| **>8,000** | ❌ blocker | Multiple model error riski, mütləq yenidən yaz |

---

## How to apply (compression strategy)

### 1. CUT aggressive — bu sektorları SİL və ya KOMPRESS et

- ❌ **Verbose color hex palette (~500 char)** — modeldə **rəng adı** kifayətdir, hex lazım deyil
- ❌ **Lengthy "NOTHING ELSE" lists** — 1 cümləyə sıxış
- ❌ **Verbose lighting breakdown** ("KEY: ... FILL: ... BACKGROUND: ...") — 2-3 cümlə bəs
- ❌ **Material palette section** — material adlarını subject description-da inline yaz
- ❌ **Extensive lamp/prop anatomy paragraph** — 1-2 cümlə (clear glass chimney + flame + brass base)
- ❌ **Multi-line camera/grade block** — 1 cümlə (ARRI ALEXA 35 + Cooke S7/i 50mm + Kodak Vision3 5219)
- ❌ **Aspect ratio repetition** — 1 dəfə kifayətdir
- ❌ **Repeated identity recap** — bir cümlədə anchor instruction + bir cümlədə action (təkrar yox)

### 2. KEEP these (kritik info, kompromiss yox)

- ✅ **Subject identity** + age + ethnicity + critical wardrobe (1-2 cümlə)
- ✅ **ATTACH/anchor reference instruction** ("preserve face from image 1")
- ✅ **Camera angle + lens + DOF** (1 cümlə)
- ✅ **Primary action / mid-action moment** (1 cümlə)
- ✅ **Lived-moment / fly-on-the-wall clause** (1 cümlə)
- ✅ **Lighting source + temperature** (1 cümlə)
- ✅ **Period-specific HARD RULE flags relevant to THIS kadr** (lamp anatomy IF lamp visible, anti-grit IF hands visible, face diversity IF multi-figure, flag IF flag visible)
- ✅ **Full color + post-grade clause** (1 cümlə)
- ✅ **Anti-synthetic clause** (1 short sentence: "Avoid photorealistic, HDR, AI art aesthetic — film frame look")
- ✅ **Aspect ratio** (4-5 words)

### 3. Template (≤2,800 char skeleton)

```
[SHOT TYPE + CAMERA ANGLE + SUBJECT IDENTITY with anchor preserve instruction in 2-3 sentences]

[PRIMARY ACTION + LIVED MOMENT framing in 1-2 sentences]

[WARDROBE + period-specific HARD RULE flags relevant to this kadr in 2-3 sentences]

[SETTING + BACKGROUND in 2-3 sentences]

[LIGHTING source + temperature + key direction in 1-2 sentences. If lamp visible: 1-sentence period-pure anatomy.]

[Lens + DOF + camera grade: 1 sentence with ARRI ALEXA 35 + Cooke S7/i + Kodak Vision3 5219]

[Full color, sepia/grade in post: 1 sentence]

[Anti-synthetic + anti-AI-art: 1 short sentence]

[Aspect ratio: 21:9 cinemascope]
```

---

## Concrete example — compression demonstration

### ❌ V1 (9,168 char — TOO LONG, GPT-Image-2 "prompt too long" error)

```
PRIMARY SUBJECT — An over-the-shoulder (OTS) cinematic shot, looking PAST the right shoulder of a seated/standing 38-year-old man (the SAME PERSON FROM IMAGE 1, attached as anchor reference: preserve EXACTLY his face structure, dark full beard, dark hair, complexion — even though only the back/side of his head, shoulder, and hands are visible in this shot, identity must match the anchor for video editing continuity). We see him from behind and slightly to his right, the camera positioned just over his right shoulder, looking down at what he is holding.

[...8,000 more chars of verbose layout / materials / colour palette hex codes / per-light breakdown / lamp anatomy / repeated identity recap / multi-line camera spec...]
```

**Failure mode:** Model ya error atır, ya ilk 500 token-dən sonra hər şeyi ignor edir (identity lock, anti-grit, lighting timeline sondadırsa itir).

### ✅ V2 (2,713 char — IDEAL, eyni kritik info, effektiv limit içində)

```
Over-the-shoulder cinematic shot looking past the right shoulder of a 38-year-old man (same face as IMAGE 1, preserve identity exactly). Top of frame: back-right of his dark fur hat. Upper-right: his dark wool jacket shoulder (soft defocus). Lower foreground: his clean lean hands holding a newspaper (no ink stains — historical intellectual, anti-period-grit rule).

The newspaper fills 60% of frame, held at ~15° angle, masthead-up. [Period-specific masthead + body text description in 2-3 sentences.]

Background soft bokeh defocus: dark cast-iron platen press at right, wooden type cases at left, kerosene lamp glow lower-left edge, pressman silhouette far back. Aged warm-cream plaster walls.

Setting: [period + place] evening — PRE-electric era. The lamp at lower-left edge is a period-pure KEROSENE lamp: brass fuel reservoir base, brass wick-knob, clear glass bulbous chimney with visible yellow-orange flame inside (~2700K). NO frosted shade, NO electric bulb.

Key light: warm kerosene lamp from camera-left foreground casting raking light across newspaper page. Subtle fill from second off-frame oil lamp. Background ambient very dim.

Lived moment, fly-on-the-wall observer behind him — NOT a posed prop shot.

Camera: 50mm lens equivalent on ARRI ALEXA 35 + Cooke S7/i at T/2.0 (newspaper masthead and upper body text sharp, foreground hands/shoulder slightly soft, background dreamy bokeh). Kodak Vision3 5219 emulation, warm amber-ochre period grade, ~15% desaturated, lifted filmic blacks, visible 500T grain, mild vignette.

Full color period-drama register (sepia applied in DaVinci post, NEVER baked here). Avoid photorealistic, HDR, magazine aesthetic, AI art look — this is a Barry-Lyndon-style film frame.

Aspect ratio: 21:9 cinemascope.
```

**Səbəb V2 işləyir:**
- Eyni kritik info (identity lock, lighting, period anatomy, anti-grit, anti-synthetic, aspect)
- GPT-Image-2 limit-i içində (~3,000 char altında)
- Nano Banana web UI yaxınlığında (2,000-2,800)
- Bütün important instruction-lar **ilk 500 token-də** və ya yaxın yerdə
- Heç bir repeated info, heç bir verbose hex palette, heç bir multi-line lighting breakdown

---

## Workflow integration

Bu rule **bütün AI creator layihələrində** tətbiq olunur — universal AI image generation limit reality. Knowledge tree-də yer alır:

- `models/gpt-image-2.md` — GPT-Image-2 üçün model-spesifik HARD RULE
- `models/nano-banana.md` — Nano Banana API vs web UI fərqi
- `general/prompt-budget.md` — bu fayl, universal compression strategy
- `SKILL.md` "Davranış qaydaları" — `wc -c` verification habit reminder
- `image-validator/knowledge/prompt-consistency-checks.md` — F-15 checkpoint (validator side)

---

## Related rules

- `models/midjourney-v7.md` — MJ 6,000 char hard limit, ~3,500 char effective
- `models/flux-pro.md` — Flux ~512 token sweet spot
- Prompt complexity budget (max ~1 primary zone + 1 secondary + 5-7 materials + 2 lights) — ayrı qayda, bu char budget-dən fərqlidir, lakin paralel tətbiq olunur

---

*Versiya: 1.0 | Yaradılma: 2026-05-21 (real production incident-dən sonra: 9,168 char prompt GPT-Image-2-də "prompt too long" error verdi, web research ilə model-spesifik limitlər təsdiq olundu).*
