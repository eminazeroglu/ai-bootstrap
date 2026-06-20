# GPT-Image-2 — Image Model Knowledge

## ⚠️ HARD RULE — Prompt Length Budget

GPT-Image-2 promptları üçün **char budget məcburidir**. Texniki tavan ≠ effektiv tavan.

| Parametr | Dəyər |
|---|---|
| Technical ceiling (API qəbul edir) | **32,000 char** |
| Praktik effektiv limit | **~3,000 char (~500 söz)** |
| Tövsiyə hədəfi | **≤2,800 char** |
| Aggressive cut tələbi | **>3,000 char** |
| Critical regenerate threshold | **>4,000 char** |

**Niyə:** Model **early-token bias** ilə işləyir — promptun ilk ~500-800 tokeni dominant olur, **~500 tokendən sonra** instruction-lar zəifləyir və ya tamamilə ignor olunur. 9,000 char promptda kritik detallar (refs, identity locks, anti-grit, lighting, anti-synthetic) sondadırsa, model onları **görməyəcək**. Daha pisi, **explicit "prompt too long" error** atır və generation fail olur.

**Verification habit (məcburi):** Hər prompt yazandan sonra `wc -c` ilə yoxla:

```bash
cat prompt.txt | wc -c
```

Detection thresholds:
- **≤2,500 char:** ✅ optimal
- **2,500-3,000 char:** ⚠️ pass, lakin aggressive compression mümkündür
- **3,000-4,000 char:** ⚠️ quality drop riski, kompress et
- **>4,000 char:** ❌ aggressive cut LAZIMDIR
- **>8,000 char:** ❌ "prompt too long" error riski, mütləq yenidən yaz

**Compression strategy:** `knowledge/general/prompt-budget.md` faylına bax — universal cut/keep checklist + V1 (9168 char) → V2 (2713 char) before/after misalı.

---

## Provider
OpenAI

## Type
Multimodal transformer (DALL-E successor)

## Strengths

- Detailed scene compositions (multiple subjects + environment)
- Renders text/signs/captions reliably
- Strong understanding of complex prompts
- Good hands and fingers
- Spatial relationship comprehension
- Style adherence

## Weaknesses

- Sometimes "AI look" sneaks in (over-rendered)
- Heavy stylistic bias toward "polished" aesthetic
- Reference image support is limited compared to Nano Banana
- Less photorealistic than Nano Banana for portraits
- Slower generation (~10-15s)

## Best Practices

1. **Cinematic photograph framing** — start with this phrase
2. Specify scene context first, then subject
3. Use "shot in the style of [photographer/director]" sparingly
4. Describe scene first (location, time, mood), then subject within it
5. Avoid generic adjectives
6. Specify aspect ratio clearly
7. Lighting analysis is interpreted well
8. Use natural prose, not bullet lists

## Prompt Anatomy

```
Cinematic photograph: [Setting context — time, place, mood first]
+ [Subject in scene with action]
+ [Lighting analysis — key, fill, rim, color]
+ [Camera + lens specifics]
+ [Mood / style / color grading notes]
```

## Sample Prompt

```
Cinematic photograph: 1960s American diner interior at night,
melancholic atmosphere, period accurate. A 35-year-old Azerbaijani
man (athletic build, short dark hair, charcoal wool coat) sits by
a rain-streaked window, looking outside with quiet melancholy.
Warm tungsten ceiling lights at 3200K create soft rim on his
shoulders, cool blue daylight spill from window behind him acts
as fill. Shot on Sony A7 IV with 85mm at f/1.4. Melancholic mood,
shallow depth of field, photorealistic, vintage film color grading
referencing Kodak Portra 400, 9:16 vertical aspect ratio.
```

## Common Mistakes

- Starting with subject only (works better with scene context first)
- Over-stylization ("epic dramatic stunning")
- Forgetting to mention "cinematic photograph"
- Mixing director references that conflict

## Aspect Ratio

Specify clearly:
- "9:16 vertical aspect ratio"
- "16:9 widescreen"
- "Square 1:1"
- "Anamorphic 2.39:1 cinemascope"

## Text Rendering

GPT-Image-2 can render text in image:
- "Neon sign reading 'OPEN' in red script"
- "Newspaper headline visible: 'STORM WARNING'"
- "Storefront with text 'PHARMACY' in 1950s typography"

Use this strength when scene calls for it.

## Pricing tier
$$$ — higher than Nano Banana

## Speed tier
Medium — 10-15s
