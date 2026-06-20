# ElevenLabs — Voice Design

Voice Design mətn təsvirindən **sıfırdan yeni səs** yaradır — voice library-də uyğun səs olmayanda, obraz üçün dəqiq səs lazım olanda istifadə olunur.

> **Yenilənmiş 2026-05-21:** Bu sənəd rəsmi ElevenLabs Voice Design sənədinə (elevenlabs.io/docs/eleven-creative/voices/voice-design) və 28-may layihəsində aşkar edilmiş bug-lara görə yenidən yazılıb. Köhnə "long prose paragraph" yanaşması rəsmi şablona uyğun deyildi.

## Necə işləyir

1. **Səs təsviri** yazırsan (ingiliscə) — yaş, cins, aksent, tembr, xasiyyət, çatdırılma.
2. **Preview cümləsi** verirsən — səs onu danışacaq.
3. Model bir neçə variant generasiya edir → seçirsən → library-yə saxlayırsan.
4. Saxlanan səs bütün layihədə həmin obraz üçün istifadə olunur (consistency anchor).

## Rəsmi prompt şablonu (ElevenLabs)

```
Native <Language>. <Gender>, <Age range>. <Quality level>.
Persona: <2-5 words>. Emotion: <2-3 adjectives>.
<1-2 sentences about timbre, pacing, delivery>.
```

**Tövsiyə olunan uzunluq:** 250+ char, struktur təmiz qalsın. Uzun proza paraqraf YOX — strukturlu şablon model tərəfindən daha düzgün interpretasiya edilir.

### Nümunələr (rəsmi formatda)

**Sənədli narrator (kişi):**
```
Native American English. Male, late 40s to mid-50s. Studio-grade, high quality recording. Persona: seasoned historical documentary narrator. Emotion: restrained, dignified, reflective. Warm rich baritone with a slight gravelly texture, calm and deliberate pacing with measured pauses. For a historical documentary narration.
```

**Sənədli narrator (AZ aksentli):**
```
Native Azerbaijani man speaking English with a subtle Azerbaijani accent. Male, mid 50s to early 60s. Studio-grade recording. Persona: dignified cultural elder. Emotion: warm, weathered, reflective. Resonant baritone with a slight grain, unhurried pacing with thoughtful pauses, gentle cultural gravitas. For an Azerbaijani national documentary.
```

**Gənc qadın obraz (dramatik):**
```
Native English. Female, late 20s. Studio-grade recording. Persona: emotionally vulnerable young woman. Emotion: expressive, breathy, intimate. Clear mezzo voice with subtle warmth, natural conversational pacing with moments of held breath. For an intimate drama scene.
```

## Yaxşı prompt qaydaları

### ✅ Etməli olduqların

- **Strukturlu şablon istifadə et** — rəsmi format yuxarıda
- **Konkret ol** — "young" yox, "in her early twenties"
- **Aksent dəqiq adlandır** — "thick" / "subtle" / "neutral" prefiksi ilə (məs. `subtle Azerbaijani accent`, `neutral American`)
- **Tembr + çatdırılma birlikdə** — "deep voice" azdır; "deep voice, slow and deliberate, with long pauses"
- **İstifadə konteksti əlavə et** — "for a historical documentary" / "for a tense thriller"
- **Preview cümləsi emosional olsun** — neytral cümlə səsin diapazonunu göstərmir
- **Bir neçə generasiya götür** — ən yaxşısını seç, dərhal library-yə saxla

### ❌ Etməməli olduqların

- **Real şəxs adı YAZMA** — "Peter Coyote", "David Attenborough", "Morgan Freeman" — model bu adları **filtrləyir və ya nəzərə almır**. Rəsmi sənəd impersonation tövsiyə etmir. Boş yer tutur.
- **Ziddiyyətli aksent yazma** — "Mid-Atlantic accent" (1940-cı illər radio) və "Ken Burns narrator" eyni promptda olmaz: Ken Burns narratorları Standart Amerika aksenti danışır, Mid-Atlantic yox. Aksent + referans uyğun gəlməlidir.
- **Dynamic acting direction qoyma** — "The tone leans contemplative on intimate beats and lifts on declarative statements" — bu Voice Design-da yer tutmamalıdır. Voice Design BAZIS səsi tutur; emosional dəyişiklik **TTS-də audio tag-lər və per-block stability ilə** idarə edilir.
- **Uzun proza paraqraf yazma** — 100+ söz proza model tərəfindən qarışıq qəbul edilir. Strukturlu şablon (~50-80 söz) daha effektivdir.
- **Vague terms** — "exotic", "foreign", "different" — heç bir məna vermir. Konkret dialekt yaz.

## Aksent qaydaları (rəsmi)

> "Be explicit about language and dialect — always specify the language and regional variant in the first sentence."

| Qaydam | Misal |
|---|---|
| Prefiks: `thick` / `subtle` / `neutral` / `slight` | `thick French accent`, `subtle Italian accent` |
| Yer/regional | `Native American English`, `British RP`, `Australian (Sydney)`, `Azerbaijani-accented English` |
| Aksent + ton birlikdə | `thick Scottish accent, warm and weathered` |

## Konseptual fit (millət sənədliləri üçün xüsusi)

Sənədli filmlərdə narrator seçimi **kulturoloji məna daşıyır**:

- **Öz milli hekayə** → o millətin öz səsi (Ken Burns Amerikanı, BBC Britaniyanı, Werner Herzog Almanı danışdırır)
- **Beynəlxalq tarixi mövzu** → neytral Anglo-Amerika sənədli narrator-u
- **Xarici millətin hekayəsi** → konsept təftişi: "ana dildə narrator + İngilis subtitlə" və ya "incə öz aksentli İngilis narrator"

**28-may layihəsi** — Azərbaycan milli hekayə, lakin İngilis VO. Konseptual variant:
- **(A)** Native American narrator → beynəlxalq export, lakin "xarici səs öz hekayəni danışır" qopuğu
- **(B)** Subtle AZ-accented English → "millətin öz səsi" + adların düzgün tələffüzü ⭐
- **(C)** British archival narrator → imperial/festival tonu

Layihə direktor + brieflə əvvəlcədən razılaşdır.

## Voice Design vs Library vs Cloning

| Yanaşma | Nə vaxt |
|---|---|
| **Voice Library** (hazır səslər) | Tez başlamaq, ümumi obraz, eksperiment |
| **Voice Design** (mətndən) | Spesifik obraz, library-də uyğun yoxdur, tam nəzarət |
| **Instant Voice Clone (IVC)** | Real bir səsi tez klonlamaq (qısa nümunə) |
| **Professional Voice Clone (PVC)** | Yüksək keyfiyyət, real səs aktyoru, uzun layihə |

AI video obrazları üçün adətən **Voice Design** ən yaxşı balansdır — `character-designer` profilinə uyğun dəqiq səs, klonlama üçün real nümunə tələb etmir.

## Mənbələr

- [ElevenLabs Voice Design — rəsmi şablon və qaydalar](https://elevenlabs.io/docs/eleven-creative/voices/voice-design)
- [ElevenLabs TTS Best Practices](https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices)