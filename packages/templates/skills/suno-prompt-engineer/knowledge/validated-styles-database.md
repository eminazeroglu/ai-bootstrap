# Validated Styles Database

**Məqsəd:** Bu fayl skill-in **canlı yaddaşıdır**. İstifadəçi YouTube/streaming-də mahnı göndərir, mən stilini analiz edib Suno prompt yazıram, istifadəçi test edib təsdiqləyir → həmin stil bura `V###` ID-si ilə qeyd olunur. Hər yeni layihədə bu database **baseline kitabxanası** kimi istifadə olunur.

`prompt-templates-library.md` 15 generic janr template-i saxlayır. Bu fayl isə **konkret istifadəçi-təsdiqlənmiş** stilləri saxlayır — daha dəqiq, daha layihə-uyğun.

---

## Validation status legend

| İşarə | Mənası |
|---|---|
| ✅ **Suno-validated** | İstifadəçi Suno-da test edib, output stilə uyğun çıxıb |
| 👁️ **Approved-on-inspection** | İstifadəçi prompt-u oxuyub bəyənib, lakin hələ Suno test olunmayıb |
| 🧪 **Draft** | Mən analiz edib yazmışam, hələ istifadəçi rəyi yoxdur |
| ⚠️ **Partially validated** | Bəzi elementlər tutub, bəziləri tutmayıb (qeyd olunan adjustment-lər) |
| ❌ **Failed** | Suno test fail oldu — saxlanılır təhsil üçün (niyə işləmədi) |

---

## Database protocol (necə qurulur)

İstifadəçi yeni mahnı / link göndərəndə:

```
1. Reference analyzer (mən):
   - yt-dlp ilə metadata çıxar
   - description, hashtag, title-da AI signal axtar
   - channel pattern yoxla (eyni creator-ın başqa AI tracks-ları)
   - audio-listening edə bilmirəm → text-based reverse-engineer

2. Prompt drafter (mən):
   - prompt-templates-library.md baseline götür
   - validated-styles-database.md-də oxşar entry varsa baxla
   - reverse-engineered descriptor-ları (genre, BPM, key, instrumentation,
     vocal, production) yığ
   - Style field + Title + Lyrics structure (skeleton) yarat
   - Char count yoxla (Style ≤750, Lyrics ≤4300)
   - Chat-də paste-ready inline ver

3. User validation (istifadəçi):
   - Suno-da test et (2 take)
   - Stilə uyğunluq qiymətləndir (genre/tempo/vocal/instrumentation/AZ pronunciation)
   - "OK" və ya "şu element səhvdir, düzəlt" cavabı

4. Database update (mən):
   - "OK" → entry V### kimi əlavə olunur, status ✅ Suno-validated
   - Adjustment → prompt tüne edirik, retest, sonra add
   - 4-5 variasiya da yazılır (lighter / heavier / different vocal gender / different tempo)
   - Commit + push
```

---

## Variation pattern

Hər təsdiqlənmiş stil üçün **4 oxşar variasiya** yazılır ki, database geniş olsun:

| Variasiya | Nə dəyişir |
|---|---|
| **(base)** | Orijinal təsdiqlənmiş prompt |
| **(a) heavier** | Daha dramatic, daha güclü janr fokus (məs. arabesque-ə yaxın) |
| **(b) lighter** | Daha modern, daha minimalist, polished |
| **(c) opposite gender** | Eyni stil amma vocal gender dəyişir |
| **(d) faster/slower** | Tempo ±15-20 BPM, eyni atmosfer |

Bu cür hər təsdiqlənmiş stil **5 entry-li ailə** olur. İstifadəçi gələcəkdə "AZ breakup ballad lazımdır, amma qadın səsi" desə, V001c hazırdır.

---

## Genre family index

| Family | Validated entries |
|---|---|
| **AZ Pop-Folk Fusion** | V001 (base + a,b,c,d) — uptempo tar lead + electronic drums |
| AZ Modern Pop | — |
| AZ Trap/Rap | — |
| AZ Meyxana | — |
| AZ Aşıq/Folk | — |
| AZ Wedding/Yallı | — |
| Turkish Pop | — |
| Global Pop | — |
| EDM | — |
| Hip-Hop/Trap | — |
| Cinematic | — |
| Lo-fi | — |

---

# Entries

---

## V001 — AZ Pop-Folk Fusion (uptempo with tar/saz lead)

**Status:** ✅ Suno-validated (2026-05-27) — verified prompt sourced from user-confirmed working track
**Analyzed:** 2026-05-27
**Inspired by:** AZ pop-folk fusion channels (e.g., Qurban Qurbanzadə pattern). Track example: "Səni Kimdən Soruşum" stylistic family — uptempo electronic production with traditional tar lead, melancholic lyrics over driving beat.
**Genre family:** AZ Pop-Folk Fusion (renamed from "AZ Romantic Ballad" — verified base is NOT a slow ballad; it's uptempo pop with melancholic lyrics, a distinctly AZ pattern)
**BPM:** 120 (4/4 time, uptempo)
**Key/mode:** B minor (no exotic mode — tar provides folk flavor naturally)
**Vocal:** Male, passionate melodic with traditional ornamentation
**Mood:** Sad lyrics over driving uptempo beat — bittersweet, dance-able grief, AZ pop-folk tradition

### Style field (paste-ready, ~620 chars — verified working version)
```
Azerbaijani pop with folk influences. Features a prominent tar or saz playing intricate melodic riffs and solos. The arrangement includes a driving synth bass, electronic drum kit with a crisp snare and steady kick, and bright synthesizer pads. Male vocals are delivered in a passionate, melodic style with traditional ornamentation. The track is in 4/4 time at 120 BPM in the key of B minor. The tar provides rhythmic and melodic counterpoint throughout, often doubling the vocal lines or playing rapid-fire staccato runs. Acoustic guitar strumming adds harmonic density in the background.
```

### Lyrics structure pattern (verified — inline tar tags vacibdir)

Bu pattern **dəqiq verified working strukturdur**. Sözlər ayrıca yazılır (lyricist skill və ya istifadəçi briefi); aşağıda yalnız **section sıralaması + inline metatag yerləşməsi + sətir sayı**.

```
[Intro]
[tar riff, synth pads, electronic drums]

[Chorus]
[male vocals]
(4 sətir hook — repeating central question/phrase pattern)
[tar doubles melody and flourishes inline between phrases]

[Verse 1]
(6 sətir narrative — emotional setup, longing/atmosphere)
[acoustic guitar strumming]

[Chorus]
(repeat full — second iteration may add intro tag like "Ay, ..." before hook)
[tar doubles melody and riff between phrases]

[Instrumental Solo]
[tar solo with rapid staccato picking and trills]
[synth bass and electronic drums continue]

[Verse 2]
(6 sətir narrative — escalation / acceptance / final reflection theme)

[Chorus]
(repeat full)

[Outro]
[tar solo riff]
[drums fade out]
[final tar flourish]
```

**Inline metatag patternləri (bu janrda təkrarlanır — generalizable):**
- `[tar riff]` — section başında atmospheric setup
- `[tar doubles melody]` — vocal line ilə paralel
- `[tar flourish]` — phrase sonunda ornament
- `[tar solo with rapid staccato picking and trills]` — instrumental break
- `[acoustic guitar strumming]` — verse-də harmonic density
- `[synth bass and electronic drums continue]` — instrumental solo-da continuity

### Themes that work
Breakup, longing, suffering, asking who to turn to about the lost love, broken memory of past relationship, framed photo metaphors, "sənsiz" (without you), "həsrət" (longing), "xatirə" (memory), "yoxluğun" (your absence). Tipik AZ pop-folk: melancholic lyric over driving uptempo beat — emotional contrast.

### Pitfalls discovered (calibration insights — verified vs my initial guess)
- ⚠️ **BPM was guessed wrong** — mən 92 BPM (slow ballad) düşündüm; verified 120 BPM. AZ pop-folk ənənəsi: **sad lyrics + driving uptempo beat**, slow ballad deyil. Title-da "sevgimizin sonu" görüb avtomatik slow düşündüm — yanlış prior.
- ⚠️ **Oud vs tar** — mən oud yazdım (Turkish/Arabic), verified tar/saz (AZ folk core). Coğrafi-spesifik instrumentation vacibdir.
- ⚠️ **Hijaz mode lazım deyil** — verified prompt sadə B minor istifadə edir; tar onsuz da AZ folk flavor verir. Exotic mode əlavə etmək over-spice idi.
- ✅ **Inline instrument role tags master technique** — `[tar doubles melody]`, `[tar riff]`, `[tar flourish]` lyrics içində dəqiq harada texnika baş verdiyini göstərir. Sadəcə Style field-də "tar" yazmaq zəifdir.
- ✅ **Functional role description** — "tar provides rhythmic and melodic counterpoint, doubling vocal lines, rapid-fire staccato runs" — sadəcə alət adı yox, **rol** yazılır. Bu generalizable bütün AZ folk alətləri üçün (saz, balaban, qaval, def, kamança).
- ✅ **Electronic drum kit** tag-ı "modern pop drums + side-chain"-dən daha güclüdür AZ pop-folk üçün — crisp snare + steady kick birbaşa təyin edir.
- Reference artist adı yazma (Suno copyright filter) — yalnız stilistik descriptor.

### Variations: V001a, V001b, V001c, V001d (aşağıda — recalibrated to new base)

---

## V001a — AZ Pop-Folk Fusion (slower dramatic variant)

**Status:** 🧪 Draft
**Difference from base:** Tempo yavaş (78-85 BPM), daha dramatic. Tar hələ də lead-dir amma daha sparse, vocal ön planda. Wedding sentimental / drama OST üçün.

### Style field (paste-ready, ~590 chars)
```
Azerbaijani pop with folk influences, slow dramatic ballad version. Features a prominent tar or saz playing sparse melodic phrases and emotional flourishes. The arrangement includes a sustained sub bass, restrained acoustic drum kit with brushed snare entering at chorus, and warm ambient synthesizer pads. Male vocals are delivered in a powerful, emotional style with extensive traditional ornamentation and strong vibrato. The track is in 4/4 time at 80 BPM in the key of B minor. The tar plays mournful melodic lines doubling and answering the vocal phrases. Acoustic guitar fingerpicking adds harmonic warmth in the background. Dramatic pause before final chorus.
```

### Use case
Daha old-school AZ romantic, wedding sentimental moments, drama/film OST. V001-dən fərq: 40 BPM yavaş, electronic drums → brushed acoustic, tar mournful (rapid staccato yox), vocal daha güclü dramatic.

---

## V001b — AZ Modern Pop (no folk instruments)

**Status:** 🧪 Draft
**Difference from base:** Tar/saz tam çıxır, pure modern AZ pop production. Eyni 120 BPM uptempo amma Western-influenced arrangement.

### Style field (paste-ready, ~565 chars)
```
Modern Azerbaijani pop, contemporary production. Features bright piano chord stabs and shimmering synth leads as primary melodic elements. The arrangement includes a driving synth bass, modern electronic drum kit with crisp snare and steady kick, side-chained synth pads, and layered string section entering at chorus. Male vocals are delivered in a clean modern pop style with subtle harmonies, no traditional ornamentation, slight vibrato on sustained notes only. The track is in 4/4 time at 118 BPM in the key of B minor. Vocal stacks in chorus, polished radio mix, contemporary streaming aesthetic. No tar, no saz, no oud, no acoustic guitar, no Middle Eastern flavor.
```

### Use case
"Western-influenced" AZ pop — gənc auditoriya, Spotify/Apple Music chart estetikası. V001-dən fərq: AZ folk instrumentation YOX (tar/saz/acoustic guitar), pure modern production. Eyni uptempo enerji və AZ language qalır.

---

## V001c — AZ Pop-Folk Fusion (female vocal variant)

**Status:** 🧪 Draft
**Difference from base:** Vocal gender dəyişir — qadın səsi, eyni AZ folk + electronic arrangement. Lyrics pronouns uyğun dəyişir.

### Style field (paste-ready, ~625 chars)
```
Azerbaijani pop with folk influences. Features a prominent tar or saz playing intricate melodic riffs and solos. The arrangement includes a driving synth bass, electronic drum kit with a crisp snare and steady kick, and bright synthesizer pads. Female vocals are delivered in a passionate, emotional mid-range alto style with traditional ornamentation, breathy intimate verses powerful belted chorus, vocal stacks and harmonies in chorus. The track is in 4/4 time at 118 BPM in the key of B minor. The tar provides rhythmic and melodic counterpoint throughout, often doubling the vocal lines or playing rapid-fire staccato runs. Acoustic guitar strumming adds harmonic density in the background.
```

### Use case
Eyni AZ pop-folk fusion stil amma qadın artisti üçün. V001-dən yalnız vocal direction dəyişir, instrumentation və BPM eyni qalır.

---

## V001d — AZ Pop-Folk Fusion (acoustic unplugged variant)

**Status:** 🧪 Draft
**Difference from base:** **Electronic drums tam çıxır, acoustic gitar ön plana keçir**. Tar hələ də iştirak edir amma daha sparse. Daha organic, "unplugged" hiss — istifadəçinin əvvəlki "akustik gitarla yenidən yaradım" tələbinə uyğun.

### Style field (paste-ready, ~615 chars)
```
Acoustic Azerbaijani pop-folk unplugged version. Features a prominent fingerpicked acoustic guitar as primary harmonic and melodic foundation. The arrangement includes a sparse warm upright bass, light brushed cajon or bongo percussion, and a tar or saz playing intricate folk melodic counterpoint. Male vocals are delivered in a warm intimate close-mic style with traditional ornamentation, soft vocal harmonies in chorus. The track is in 4/4 time at 102 BPM in the key of B minor. The tar provides mournful melodic accents doubling vocal lines on chorus phrases. No electronic drums, no synth bass, no synthesizer pads. Organic unplugged radio session aesthetic.
```

### Use case
**İstifadəçinin earlier request-i — "eyni stilistikanı saxlayıb akustik gitarla yenidən yaradım"** patterni. Organic, intimate, unplugged hiss. V001-dən fərq: bütün electronic elements (synth bass, electronic drums, synth pads) çıxır; acoustic guitar primary olur; tar still in (folk DNA qoruyur) amma sparse. Tempo orta-yavaş (102 BPM) — uptempo deyil ama ballad da deyil.

---

## Master techniques discovered (database-wide insights)

Validated entry-lərdən çıxan **generalizable patterns**. Bunlar gələcək bütün entry-lərdə tətbiq olunur, hətta fərqli genre family-də olsa belə.

### MT-001 — Inline instrument role metatags (V001-dən kəşf, 2026-05-27)

**Pattern:** Lyrics field içində section başına və ortasına **inline metatag** qoyulur — Suno-ya **dəqiq harada hansı texnika** baş verdiyini deyir.

**Sintaksis nümunələri:**
```
[Chorus]
[male vocals]
(hook line 1)
[tar doubles melody]
(hook line 2)
[tar flourish]
(hook line 3)
```

```
[Instrumental Solo]
[tar solo with rapid staccato picking and trills]
[synth bass and electronic drums continue]
```

**Niyə işləyir:** Style field umumi atmosfer verir; inline metatag-lar **konkret texnika yeri** təyin edir. Suno bu nüansı tutur.

**Tətbiq olunan alətlər:** AZ folk — tar, saz, balaban, qaval, def, garmon, kamança. ME — oud, kanun, ney, darbuka. Western — guitar (acoustic/electric), piano, sax, violin.

**Misal — saz/qaval üçün:**
```
[Chorus]
[saz doubles vocal melody]
(line)
[qaval rhythmic accent]
(line)
[saz ornamental run]
```

### MT-002 — Functional role description (V001-dən kəşf)

**Pattern:** Style field-də alət adı **tək başına yazılmır** — alətin **funksional rolu** açıq təsvir olunur.

**Zəif:** `tar, acoustic guitar, synth bass`
**Güclü:** `The tar provides rhythmic and melodic counterpoint throughout, often doubling the vocal lines or playing rapid-fire staccato runs. Acoustic guitar strumming adds harmonic density in the background. Driving synth bass.`

**Niyə işləyir:** "Tar" tək sözü Suno üçün ambiguous — necə çalınır? lead? background? rhythm? Funksional rol birbaşa təyin edir.

**Template — hər alət üçün:**
```
The [INSTRUMENT] [VERB: provides/plays/adds/drives] [ROLE: melodic counterpoint / rhythmic foundation / harmonic density / atmospheric texture] [WHERE: throughout / in chorus / at bridge / in background], [SPECIFIC TECHNIQUE: doubling vocal lines / staccato runs / sustained pads / strumming pattern].
```

**Tətbiq olunan janrlar:** Hamısı — xüsusən folk fusion (AZ pop-folk, Turkish arabesque, Indian classical fusion, flamenco fusion) burada instrumentation çox spesifikdir.

### MT-003 — Sad lyrics over uptempo beat (AZ pop-folk pattern, V001-dən)

**Pattern:** Verified V001 göstərir ki, AZ pop-folk fusion-da **melancholic/breakup lyrics 120+ BPM uptempo beat üzərində** səslənir. Bu Türk pop-da da var amma AZ-da daha güclüdür.

**Mənim əvvəlki səhvim:** "Breakup song" → "slow ballad" assumed. Yanlış. AZ tradition-da sad lyrics + driving beat (uptempo electronic drums + tar lead) = emotional contrast.

**Future detection:** Title-da "sevgi", "həsrət", "ayrılıq", "yoxluq" kimi sözlər varsa, avtomatik 70-90 BPM ballad düşünmə. Çox vaxt 110-130 BPM uptempo olur — emotional contrast technique.

### MT-004 — Geographic-specific instrument precision (V001-dən)

**Pattern:** AZ track-da oud yazma — **tar/saz** yaz. Türk track-da saz yazma — **bağlama** yaz. Persian track-da tar yazma — **setar** yaz.

**Niyə vacibdir:** Suno bu nuance-ı bilir. Səhv alət coğrafi authenticity-i pozur.

**Geographic instrument map:**
| Region | Folk lead instrument | Frame drum | Wind |
|---|---|---|---|
| Azerbaijan | **tar, saz** | def, qaval | balaban |
| Turkey | bağlama, ud | def, darbuka | zurna, ney |
| Iran | setar, tar (Persian) | daf | ney |
| Arabic | oud | darbuka, riq | ney |
| Central Asia | dombra, dutar | doira | sybyzgy |

---

## Future entries

İstifadəçi yeni track göndərəndə bura `V002`, `V003`, ... əlavə olunacaq. Hər biri **5-entry-li ailə** (base + a/b/c/d).

Genre family index (yuxarıda) avtomatik yenilənir.

Master techniques (MT-###) də ayrıca toplanır — generalizable insights gələcək entry-lər üçün baseline knowledge.

---

## Database maintenance qaydaları

1. **Hər entry tarixli olur** — "Analyzed: YYYY-MM-DD", "Validated: YYYY-MM-DD"
2. **Status update edilir** — 👁️ approved → ✅ Suno-validated (test sonra)
3. **Failed entries silinmir** — ❌ kimi saxlanılır, niyə işləmədiyi qeyd olunur (gələcək Claude öyrənsin)
4. **Char count yoxlanılır** — hər Style field 750 alt limitdə
5. **Reference artist adı YAZILMIR** — yalnız "channel pattern" və ya "tradition" göstərilir
6. **Lyrics YAZILMIR** — yalnız struktur skeleton (copyright qorunur)
7. **Commit message-də entry ID-si** — `feat(suno): V002 — <name> validated`

---

*Yaradılma: 2026-05-27 — V001 base + 4 variation. Same-day update: V001 ✅ Suno-validated (verified prompt sourced from user); V001a-d recalibrated to corrected base (uptempo 120 BPM tar-lead, NOT slow ballad); MT-001 through MT-004 master techniques documented (inline tags, functional role, sad-over-uptempo pattern, geographic instrument precision).*
