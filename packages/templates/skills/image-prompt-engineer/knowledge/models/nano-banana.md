# Nano Banana — Image Model Knowledge

## ⚠️ HARD RULE — Prompt Length Budget

Nano Banana üçün **API limit və web UI limit fərqlidir** — və əksər istifadəçi web UI istifadə edir.

| Parametr | Dəyər |
|---|---|
| API technical ceiling | **131,000 tokens (~500K char)** — Gemini 3.1 Flash Image |
| API praktik effektiv | **~8,000 char** (early-token bias-dan sonra ignor) |
| **Web UI hard limit** | **2,000 char** ← çox vaxt effektiv tavan |
| Tövsiyə hədəfi (web UI istifadəçi) | **≤2,000 char** |
| Tövsiyə hədəfi (API istifadəçi) | **≤2,800 char** |

**KRİTİK:** Əksər istifadəçi prompt-ları **web UI vasitəsilə paste edir** — yəni 2,000 char effektiv tavandır. Bu limit aşılarsa, **silently truncate** olur (heç bir error mesajı yoxdur, lakin sondakı kritik instruction-lar — anti-synthetic clause, aspect ratio, identity lock — kəsilir).

API istifadəsində belə, model **early-token bias** ilə işləyir — ilk ~500-800 token dominant olur, qalanı zəifləyir.

**Verification habit (məcburi):** Hər prompt yazandan sonra `wc -c` ilə yoxla:

```bash
cat prompt.txt | wc -c
```

Detection thresholds (web UI istifadəçi üçün):
- **≤1,800 char:** ✅ optimal
- **1,800-2,000 char:** ⚠️ tam pasta olur, lakin marginda
- **>2,000 char:** ❌ silent truncate baş verir — kritik instruction-lar son cümlədəndirsə itəcək
- **>4,000 char:** ❌ API-də belə quality drop, kompress et

**Compression strategy:** `knowledge/general/prompt-budget.md` faylına bax — universal cut/keep checklist + V1 (9168 char) → V2 (2713 char) before/after misalı.

---

## Provider
Google

## Type
Diffusion + transformer hybrid

## Strengths

- Photorealistic portraits with natural skin texture
- Strong character consistency with reference images (vision input)
- Cinematic look out-of-box, minimal "AI feel"
- Vision input — supports up to 5 reference images per prompt
- Fast generation (~3-5s)
- Excellent lighting handling
- Good with anatomical anchors

## Weaknesses

- Cannot render text/signs/captions reliably
- Hands and fingers occasionally distorted
- Complex multi-subject scenes can lose detail
- No native negative prompts (avoid via positive description)
- Sometimes adds elements not requested ("magic")

## Best Practices

1. **Subject first** — describe person before setting
2. Use natural English, story-driven prose
3. Specify camera body + lens explicitly
4. Use cinematography terminology, not photo hobbyist
5. "Shot on [camera] with [lens] at f/[aperture]" works as authority anchor
6. Include lighting setup explicitly (key, fill, rim)
7. Reference image upload boosts consistency 3x
8. Specify aspect ratio in prompt (16:9, 9:16, 1:1)
9. Re-state anatomical anchors even with reference images
10. Avoid stacked adjectives ("beautiful stunning epic")

## Prompt Anatomy

```
[Subject + physical description with anchors]
+ [Action / pose / expression]
+ [Setting and environment]
+ [Lighting (specific sources, color temp)]
+ [Camera body + lens + aperture]
+ [Style notes (photorealistic, cinematic color grading, mood)]
```

## Sample Prompt

```
A 35-year-old Azerbaijani man with athletic build, short dark wavy hair,
green eyes, charcoal wool coat. Standing by a rain-streaked window in a
dimly lit 1960s diner, looking outside with a melancholic expression.
Warm tungsten lighting from above creates rim on his shoulders, cool
blue spill from the window. Shot on Sony A7 IV with 85mm Cooke S4 at
f/1.4. Photorealistic, cinematic color grading, melancholic mood,
shallow depth of field, 9:16 vertical aspect.
```

## Common Mistakes

- **Generic adjectives** ("beautiful man") — produces generic AI output
- **Mixing styles** ("realistic anime") — confuses model
- **Skipping camera/lens** — flat hobbyist look
- **Over-stacking** ("stunning, epic, beautiful, gorgeous") — degrades quality
- **No lighting source** — flat or random lighting

## Aspect Ratio Notes

- 16:9 — works well
- 9:16 — explicitly state "vertical 9:16" in prompt
- 1:1 — works well
- 2.39:1 — possible but specify "anamorphic 2.39:1 cinematic widescreen"

## Vision Input

Up to 5 reference images. Order matters — first image is primary anchor.

```
[Image 1: full body reference]
[Image 2: front close reference]

Generate this same character in NEW pose: [pose description]
Setting: [new setting]
Camera: [camera setup]
IMPORTANT: maintain exact face, hair, body type from reference images.
```

## Pricing tier
$$ — moderate cost per generation

## Speed tier
Fast — 3-5s per image
