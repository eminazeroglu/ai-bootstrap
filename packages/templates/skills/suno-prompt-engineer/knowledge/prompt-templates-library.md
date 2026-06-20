# Suno Prompt Templates Library

**Məqsəd:** Real-world viral patterns + Suno community best practices əsasında 15 production-ready prompt template. Hər template **paste-ready style field** + **lyrics structure skeleton** + **traps to avoid** verir.

**Mənbə:** 2026-05-27 araşdırması — Travis Nicholson 50+150 prompts, HookGenius v5.5 guide, Musci.io 100+ examples, SunoPrompt Middle Eastern guide, HookGenius Turkish guide, Billboard 2025 AI music charts (A Million Colors / Vinih Pray, We Are Charlie Kirk / Splaxema), Rolling Stone Soul of the Machine case study.

⚠️ **Çar limiti:** Hər template style field 500-750 chars hədəfləyir (Suno hard limit 800). Lyrics field 3500-4300 chars hədəfləyir (Suno hard limit 4500). Paste etməzdən əvvəl `wc -c` ilə yoxla.

---

## 1. Suno v5.5 Anatomy — 4-Layer Structure (Refresher)

v5.5-də model **4 layer**-də ən güclü reaksiya verir:

| Layer | Nə daxildir |
|---|---|
| **1. Tempo + Key + Energy** | "94 BPM, D minor, mid-tempo, brooding" |
| **2. Instrumentation** | "fingerpicked acoustic guitar, warm upright bass, brushed drums" |
| **3. Vocal direction** | "intimate female vocals, slightly raspy mid-register, breathy delivery" |
| **4. Negative constraints** | "no reverb wash, no synths, no autotune" |

**Köhnə (deprecated):** Tək sözlü janr tag-ları ("dark pop, brooding") indi **çox vague**dir — v5.5 production specifics tələb edir.

**v5.5 nümunə (paste-ready):**
```
indie folk, 94 BPM, key of D minor, fingerpicked acoustic guitar, warm upright bass, sparse brushed drums, intimate female vocals, slightly raspy mid-register, no reverb wash, no synths, no autotune
```

**Sweet spot:** 4-7 əsas descriptor. 20+ tag confuse edir, 2-3 tag generic verir.

**Position priority:** İlk 20-30 söz **ən güclü təsir** edir. Ən vacib descriptor-ları başa qoy.

---

## 2. Universal Metatag Reference

### Structure tags (Lyrics field-da, section başında)
```
[Intro] [Verse] [Verse 1] [Pre-Chorus] [Chorus] [Post-Chorus]
[Bridge] [Outro] [End] [Instrumental] [Interlude] [Break]
[Drop] [Build] [Hook] [Refrain] [Solo] [Guitar Solo] [Breakdown]
```

### Voice tags (Style field və ya Lyrics-də section ƏVVƏLİNDƏ)
```
[Whispered] [Soft] [Gentle] [Quiet] [Spoken] [Spoken Word]
[Falsetto] [Head Voice] [Chest Voice] [Breathy] [Raspy]
[Smooth] [Soulful] [Operatic] [Nasal] [Airy]
[Female Vocal] [Male Vocal] [Duet] [Group Vocals] [Choir]
```

### Performance tags
```
[Powerful] [Belted] [Shouted] [Screamed] [Growled] [Intense]
[Harmonies] [Ad-libs] [Vocal Run] [Melisma] [Vibrato]
[Staccato] [Legato] [Call and Response] [Chant]
[Rapped] [Fast Rap] [Slow Flow] [Melodic Rap] [Trap Flow]
```

### Effect tags
```
[Reverb] [Heavy Reverb] [No Reverb] [Dry] [Wet]
[Spacious] [Wide Stereo] [Intimate] [Room Sound]
[Hall Reverb] [Cathedral] [Fade In] [Fade Out]
[Swell] [Crescendo] [Decrescendo]
```

### Mid-song vocal style switch (peşəkar texnika)

Suno bir mahnı daxilində **vokal stilini dəyişə bilər** — voice tag-ı section başına yerləşdir:

```
[Verse 1]
[Whispered]
söz line 1
söz line 2

[Chorus]
[Belted]
söz line 1
söz line 2
```

---

## 3. Template Selection — Decision Tree

```
Mahnı nə üçündür?
│
├── TikTok / Reels viral (15-60s clip) ─────→ Template 1, 2, 11
├── YouTube full song (2-4 dəq)
│   ├── Janr Azərbaycan-yönəlik? ───────────→ Template 9, 10, 12, 13, 14
│   ├── Mainstream Western pop? ────────────→ Template 1, 4
│   ├── Hip-hop / trap / rap? ──────────────→ Template 5, 10
│   ├── Emotional ballad / cinematic? ──────→ Template 3, 6
│   ├── EDM / dance / club? ────────────────→ Template 2, 8
│   └── Lo-fi / chill / study? ─────────────→ Template 7
├── Reklam / advertisement spot ─────────────→ Template 4, 15
├── Cinematic / film score (instrumental) ──→ Template 6, 15
└── Funny / meme / parody ──────────────────→ Template 11
```

---

## 4. The 15 Templates

> **Format konvensiyası:** Hər template-də Style field **paste-ready** verilir (Suno UI Style box-una birbaşa yapışdır). Lyrics field skeleton **AZ və ya EN dil seçiminə görə** dəyişdirilir. Bütün template-lər **char count yoxlanılıb** ≤750 chars.

---

### Template 1 — Viral TikTok Pop Hook (AZ + EN versiyaları)

**Use case:** 30-60s viral klip, "text-to-song" trend, sosial media payı üçün hook-first track.
**BPM:** 110-128
**Reference vibe:** "A Million Colors" (Vinih Pray, 9.8M views 2026), modern viral pop chart toppers.

**Style field (paste-ready, ~280 chars):**
```
upbeat viral pop, 120 BPM, key of A major, bright synth leads, punchy clap-driven drums, glossy production, female vocal mid-register breathy, catchy chant-style hook, layered vocal stacks in chorus, modern radio mix, hook lands at 0:15, polished
```

**Lyrics skeleton (AZ):**
```
[Intro]
(hum 4 bar — vocal teaser)

[Verse 1]
[Soft]
Bu gecə fərqlidir, hər şey dəyişir
Telefonum yenə də əlimdə titrəyir
Saatım üçü göstərir, mən hələ də ayığam
Sən deyirsən "gəl" — mən gedirəm, hər zaman

[Pre-Chorus]
[Building]
Bilirəm bu səhvdir, bilirəm...
Amma bu hiss məni dartır səndən

[Chorus]
[Belted]
Sən mənim ən şirin günahımsan
Hər səhər yenidən sənə qayıdıram
Sən mənim ən şirin günahımsan
Bu mahnıda sənə dərdimi deyirəm

[Verse 2]
(eyni formada davam)

[Chorus]
[repeat]

[Bridge]
[Whispered]
Bəlkə bir gün bitir
Bəlkə bir gün... bəlkə bir gün də...

[Chorus]
[Belted, Ad-libs]
[repeat with vocal runs]

[Outro]
[Fade Out]
Sən mənim... sən mənim...
```

**Pitfalls:**
- Hook 15s-dən sonra düşürsə, TikTok algorithm tutmaz — Pre-Chorus qısa saxla
- 20+ tag yazma — Suno generic verir
- Reference artist adı (Avril, Olivia) yazma — copyright filter, "modern viral pop" yaxşıdır

---

### Template 2 — EDM Festival Drop (Anthem)

**Use case:** 2-3 dəq EDM track, club/festival energy, build + drop structure.
**BPM:** 126-132
**Reference vibe:** Festival mainstage EDM-pop crossover.

**Style field (~310 chars):**
```
festival big-room EDM, 128 BPM, F# minor, side-chained synth pads, pounding four-on-the-floor kick, rising white-noise riser, anthemic chord progression, punchy snare on 2 and 4, female vocal chant hook layered with male spoken adlib, drop at 1:00, no autotune wobble
```

**Lyrics skeleton:**
```
[Intro]
[Spoken, Whispered]
"Are you ready..."

[Verse 1]
(soft vocal over filtered synth)

[Pre-Drop / Build]
[Building, Crescendo]
Higher... higher... higher...

[Drop / Chorus]
[Instrumental]
(no vocals, full synth + kick)

[Verse 2]
(back to soft vocal, sparse beat)

[Build]
[repeat build]

[Drop]
[Instrumental]
(second drop, more layers)

[Outro]
[Fade Out]
```

**Pitfalls:**
- "no autotune wobble" əlavə et — v5.5 default-da çox autotune verir
- Drop section-da `[Instrumental]` istifadə et — vokal drop-u boğur
- 128 BPM exact yaz — "fast tempo" dağınıq verir

---

### Template 3 — Cinematic Indie Ballad (slow, emotional)

**Use case:** Film/reklam emotional moment, 2:30-3:30, qaşların qalxdığı close-up sequence.
**BPM:** 60-78
**Reference vibe:** Cinematic indie folk (Phoebe Bridgers / Bon Iver atmosphere).

**Style field (~340 chars):**
```
cinematic indie folk ballad, 72 BPM, D minor, slow tempo, felt piano with sustain pedal, cello sustained notes, brushed snare entering at 1:00, sparse upright bass, intimate female alto vocal close-mic breathy, subtle plate reverb on vocal, no autotune, ambient room noise preserved, builds to swell at bridge
```

**Lyrics skeleton (AZ):**
```
[Intro]
[Instrumental]
(felt piano solo, 16 bars)

[Verse 1]
[Whispered, Breathy]
Şəhər yağışında yenidən tək
Pəncərə arxasında bir kölgə var
Saatın əqrəbi yorğun döyünür
Sənin gəlişini gözləmək təktək

[Pre-Chorus]
[Soft]
Bilirəm gəlməyəcəksən, bilirəm
Amma hələ də kafedə oturmaq

[Chorus]
[Building, Soulful]
Tənha qış, sən mənim qəlbimə düşürsən
Hər damcıda bir xatirə yandırırsan
Tənha qış, mən səndən qaça bilmirəm
Sənin sözlərini içimdə yaşayıram

[Verse 2]
(cello daxil olur, eyni vocal intimacy)

[Bridge]
[Powerful, Vibrato]
Bəlkə bir gün qapı açılar
Bəlkə bir gün... bəlkə bir gün də...

[Chorus]
[Belted, Harmonies]
(swell — full instrumentation)

[Outro]
[Fade Out, Whispered]
Tənha qış... tənha qış... tənha qış...
```

**Pitfalls:**
- "no autotune" mütləqdir — emotional ballad-da Suno autotune varsa, hiss itir
- "close-mic" və "room noise" əlavə et — pro mix kimi sterilliyi qır
- Bridge-də vocal "[Belted]" → əvvəl çox yumşaqdırsa, kontrast güclü olur

---

### Template 4 — Lo-Fi Study / Chill Hip-Hop

**Use case:** YouTube faceless channel, ambient study, çox uzun loops (5-10 dəq).
**BPM:** 70-90
**Reference vibe:** Lofi Girl YouTube channel atmosphere.

**Style field (~250 chars):**
```
lo-fi hip-hop beat, 80 BPM, F major, jazzy chord progression on Rhodes electric piano, dusty boom-bap drums with vinyl crackle, mellow upright bass walking pattern, sparse muted trumpet melody, no vocals, warm tape saturation, soft rain ambience underneath
```

**Lyrics:** None — `[Instrumental]` flag yandır Suno-da.

**Pitfalls:**
- "no vocals" Style field-də mütləq → əks halda Suno hum vocal salır
- Vinyl crackle + tape saturation **ikisi də** lazımdır lo-fi authenticity üçün
- Çox alət siyahısı yazma — lo-fi minimalist

---

### Template 5 — Trap / Modern Hip-Hop (AZ + EN)

**Use case:** Rap track, 2-3 dəq, modern street aesthetic.
**BPM:** 140 (half-time feel = 70 BPM groove)
**Reference vibe:** Modern trap with 808 bass, AZ versiyada Middle Eastern flavor.

**Style field — global trap (~290 chars):**
```
modern trap hip-hop, 140 BPM half-time feel, key of A minor, deep 808 sub bass with slides, sparse rolling hi-hats with triplet pattern, sharp clap on beats 2 and 4, dark atmospheric piano loop, male rap flow confident mid-register, ad-libs in background, punchy mix, no melodic singing
```

**Style field — AZ trap (Middle Eastern flavor, ~330 chars):**
```
Azerbaijani trap, 140 BPM half-time feel, A minor with Middle Eastern phrygian flavor, deep 808 sub bass, rolling triplet hi-hats, sharp clap on 2 and 4, dark oud melody loop in background, male rap flow in Azerbaijani aggressive mid-register, sparse ad-libs, modern trap mix, no melodic singing chorus
```

**Lyrics skeleton:**
```
[Intro]
[Spoken]
(brand drop / intro adlib)

[Verse 1]
[Fast Rap, Confident]
(16 bars rap)

[Hook]
[Melodic Rap, Auto-tune light]
(8 bars catchy hook — repeated)

[Verse 2]
[Fast Rap]
(16 bars)

[Hook]
[repeat]

[Bridge]
[Slow Flow, Spoken]
(reflective 8 bars)

[Hook]
[Belted Hook]
(final repeat, full energy)

[Outro]
[Fade Out, Ad-libs]
```

**Pitfalls:**
- "no melodic singing" Style-da — yoxsa Suno rap-i singing-ə çevirir
- Half-time feel açıq yaz — yoxsa Suno 140 BPM-i sürətli pop kimi oxuyur
- AZ rap üçün lyrics tam **AZ scriptdə** yaz (Tənha NOT Tenha) — Suno v5+ qəbul edir

---

### Template 6 — Orchestral Cinematic Score (Instrumental, Film Trailer)

**Use case:** Reklam, film trailer, dramatic moment underscore.
**BPM:** 60-90 (variable, often build)
**Reference vibe:** Hans Zimmer trailer scores, modern epic orchestral.

**Style field (~310 chars):**
```
epic cinematic orchestral score, 80 BPM building to 100, D minor with key change to F major at bridge, sustained string section, low brass swells, taiko drum hits accenting downbeats, sparse piano melody motif, female choir oohs in second half, builds dramatically, dynamic range from pianissimo to fortissimo, no vocals lyrics
```

**Lyrics:** None — `[Instrumental]` flag.

**Structure (in Lyrics field as comments):**
```
[Intro]
[Instrumental]
(piano motif solo, 0-0:30)

[Build 1]
[Instrumental]
(strings enter, 0:30-1:00)

[Climax 1]
[Instrumental, Crescendo]
(full orchestra + taiko, 1:00-1:30)

[Bridge]
[Instrumental]
(key change F major, choir enters, 1:30-2:00)

[Climax 2]
[Instrumental, Fortissimo]
(maximum, 2:00-2:20)

[Outro]
[Decrescendo, Fade Out]
(piano motif returns, 2:20-2:45)
```

**Pitfalls:**
- "no vocals lyrics" Style-da — Suno cinematic scores-a vocal salmağa meyllidir
- Dynamic range açıq yaz ("pianissimo to fortissimo") — yoxsa flat verir
- Key change qeyd et — yoxsa Suno bir key-də qalır

---

### Template 7 — Synthwave / Retrowave (80s nostalgia)

**Use case:** Visual content (cyberpunk, neon), 80s nostalgia channel, gaming background.
**BPM:** 80-110
**Reference vibe:** The Midnight, FM-84, Carpenter Brut atmosphere.

**Style field (~270 chars):**
```
synthwave retrowave, 95 BPM, A minor, lush 80s analog synth pads, gated reverb snare, bright synth lead melody, sub bass arpeggio, glittering DX7 electric piano, distant sax solo at bridge, male vocal smooth tenor with chorus effect, neon nostalgia atmosphere, wide stereo reverb
```

**Lyrics skeleton (EN — synthwave is genre-coded EN):**
```
[Intro]
[Instrumental]
(synth arpeggio + pad swell)

[Verse 1]
[Smooth, Reverb]
Drove down the strip with the radio on
City lights painting amber on chrome
Your name still flickers in the rear-view glow
Some highways take you nowhere to go

[Chorus]
[Belted, Wide Stereo]
We were neon, we were never enough
Burning out before the dawn could break
We were neon, every kiss a goodbye
Every promise just a beautiful fake

[Verse 2]
(similar atmospheric verse)

[Bridge]
[Sax Solo]
[Instrumental]

[Chorus]
[repeat]

[Outro]
[Fade Out]
```

**Pitfalls:**
- "gated reverb snare" essential — synthwave defining sound
- AZ-də synthwave qeyri-trend — bu template EN saxla, ya da AZ üçün Template 1 istifadə et

---

### Template 8 — House / Deep House Club Track

**Use case:** Club, lounge, fashion content, 3-4 dəq energy.
**BPM:** 120-126
**Reference vibe:** Deep house club edit.

**Style field (~280 chars):**
```
deep house, 122 BPM, F minor, four-on-the-floor kick, off-beat open hi-hat, warm analog bassline locked with kick, smooth Rhodes electric piano chord stabs, female vocal soulful mid-register repeating short phrase, subtle vinyl crackle texture, wide hall reverb on vocals, no rap, no drop
```

**Lyrics skeleton:** Minimal vocal — repeating phrase pattern.
```
[Intro]
[Instrumental]
(kick + bass build, 16 bars)

[Verse / Hook]
[Soulful, Repeated]
"Sənsiz gecə uzanır
Sənsiz gecə uzanır
Mənə gəl, mənə gəl
Sənsiz gecə uzanır"

[Break / Drop]
[Instrumental]
(filter sweep + breakdown)

[Hook]
[repeat with vocal layers]

[Outro]
[Fade Out, Filter Sweep]
```

**Pitfalls:**
- Deep house **minimal lyrics** istəyir — verse-chorus tam yapı tətbiq etmə
- "no drop" yaz — house ≠ EDM, drop deyil, groove-driven

---

### Template 9 — AZ Modern Pop (Turkish pop + Azerbaijani language)

**Use case:** YouTube / Spotify chart-style AZ pop track, modern radio production.
**BPM:** 100-118
**Reference vibe:** Türk pop production (Hadise / Tarkan production style) + AZ sözlər.

**Style field (~360 chars):**
```
Turkish pop production style, 108 BPM, B minor with Middle Eastern phrygian flavor, polished modern radio mix, plucked oud melody motif, modern pop drums with side-chain, warm synth pads, sub bass, female vocal mid-register clear powerful with subtle Azerbaijani phrasing, vocal stacks in chorus, Anatolian melodic ornaments, romantic dance-ready energy, no autotune wobble
```

**Lyrics skeleton (AZ):**
```
[Intro]
[Instrumental]
(oud motif + drum entry)

[Verse 1]
[Soft]
Gəl mənim yanıma, dünya unudulsun
Sənin nəfəsindən günəş yenidən qalxsın
Bu şəhərdə təkəm, hər küçə soyuq
Ancaq səni görüb həyat olsun

[Pre-Chorus]
[Building]
Bir baxış kifayət, bir söz yetər
Bu ürək yenidən sənə qayıdır

[Chorus]
[Belted, Harmonies]
Sən mənim qismətim, sən mənim taleyim
Hər nəfəsdə sənin adın gəzir
Sən mənim qismətim, sən mənim taleyim
Bu eşqdən qaçmaq mümkün deyil

[Verse 2]
(eyni atmosfer)

[Bridge]
[Whispered, Vibrato]
Yağış damcıları kimi gəlirsən
Yağış damcıları kimi gedirsən

[Chorus]
[Belted, Vocal Run]
[repeat]

[Outro]
[Fade Out, Melisma]
Sən mənim qismətim...
```

**Pitfalls:**
- "Azerbaijani phrasing" Style-da yaz — Suno pure Turkish accent verə bilər
- AZ characters (ə, ı, ö, ü, ş, ç) saxla — v5+ qəbul edir; problem varsa romanization variant da sınaq et
- "no autotune wobble" mütləq — Türk pop AZ versiyada autotune over olarsa, lokal trendə zidd

---

### Template 10 — AZ Rap / Trap (Middle Eastern trap + AZ flow)

**Use case:** AZ rap scene, street content, modern hip-hop track.
**BPM:** 140 (half-time)
**Reference vibe:** Persian/Turkish trap + AZ phrasing.

**Style field (~370 chars):**
```
Azerbaijani trap, 140 BPM half-time feel, F# minor with Middle Eastern phrygian dominant scale, deep 808 sub bass with slides, dark oud loop in background, rolling triplet hi-hats, sharp clap on 2 and 4, sparse atmospheric synth pad, male rap flow in Azerbaijani aggressive mid-low register, ad-libs in background, modern trap mix, no melodic singing chorus, street confident energy
```

**Lyrics skeleton (AZ):**
```
[Intro]
[Spoken]
Bakı gecəsi, məhəllədən səs...

[Verse 1]
[Fast Rap, Aggressive]
Çıxdım küçəyə bu gecə yenidən
Cibim boş, ürəyim dolu, gəl izləyə
Hər addımda bir hekayə yatır
Bu şəhər məni böyütdü, bu şəhər mənim atam

[Hook]
[Melodic Rap, Confident]
Bu mənim küçəm, bu mənim səsim
Heç kim mənə demir nə eləyim
Bu mənim küçəm, bu mənim səsim
Yolum bağlıdır, amma gedirəm

[Verse 2]
[Fast Rap]
(16 bars)

[Hook]
[repeat]

[Bridge]
[Spoken, Slow Flow]
(reflective 8 bars — ailə, kök, məhəllə)

[Hook]
[Belted Hook, Ad-libs]
[repeat final]

[Outro]
[Spoken, Fade Out]
Bakı, mənim Bakım...
```

**Pitfalls:**
- "Middle Eastern phrygian dominant scale" mütləq — yoxsa generic Western trap çıxır
- Oud loop background-da olmalıdır, dominant deyil — yoxsa cliche "Arabic trap" alır
- AZ rap üçün lyrics 100% AZ scriptdə — phonetic spelling Suno-nu qarışdırır

---

### Template 11 — Meyxana Modern (rhythmic AZ street poetry over modern beat)

**Use case:** AZ-specific niche viral content, meyxana revival, social commentary tracks.
**BPM:** 100-130 (rhythmic, beat-driven)
**Reference vibe:** Traditional meyxana (def + clapping + rhythmic Azeri spoken-sung) + modern production.

**Style field (~380 chars):**
```
modern meyxana fusion, 115 BPM, D phrygian dominant Middle Eastern scale, traditional Azerbaijani def drum and qaval frame drum rhythm, hand clapping ostinato, sparse modern sub bass, male vocal rapid Azerbaijani street poetry mid-register percussive delivery between rapped and sung, call-and-response between two male voices, no melodic instruments dominating, raw percussive energy, Baku underground aesthetic
```

**Lyrics skeleton (AZ meyxana convention — improvisational, witty, rhymed couplets):**
```
[Intro]
[Spoken]
"Buyurun, meyxana başlayır..."
(def drum entry + clapping)

[Verse 1]
[Rapped, Call and Response]
Voice 1: Bu mahnını yazıram bu axşam dostlara
Voice 2: Söz tapmaq çətindir, amma çıxır bu sözdə
Voice 1: Şəhərdə hər kəs öz dərdini gəzdirir
Voice 2: Amma bu məclisdə dərd əyləncəyə dönür

[Hook / Refrain]
[Group Vocals, Chant]
Meyxana meydanı, meyxana meydanı
Hər kəlmə bir gülüş, hər söz bir mahnı
Meyxana meydanı, meyxana meydanı
Bu məclisdə dərdin də öz təlqini

[Verse 2]
[Rapped, Call and Response]
(another improvisational couplet exchange)

[Hook]
[repeat]

[Outro]
[Spoken, Group]
"Sağ olun, sağ olun..."
[Fade Out]
```

**Pitfalls:**
- ⚠️ **Suno v5.5 meyxana-nı tam tutmaya bilər** — training data-da limited. Take-lər zəifsə, "spoken-rapped Azerbaijani folk percussion" əvəz et
- Def + qaval **mütləq** — yoxsa darbuka kimi çıxır (Arabic, not Azerbaijani)
- Call-and-response struktur — meyxana ənənəvi 2 nəfərin "yarış"ıdır
- AZ scripts lazımdır — phonetic Suno-nu qarışdırır

---

### Template 12 — Aşıq-Modern Fusion (saz + modern production)

**Use case:** Cultural / heritage content, modern reinterpretation of Azerbaijani aşıq tradition.
**BPM:** 90-110
**Reference vibe:** Traditional aşıq (saz solo + epic poetry) + modern arrangement layer.

**Style field (~380 chars):**
```
Azerbaijani ashig modern fusion, 95 BPM, E minor with bayati shiraz mode, traditional saz string instrument as melodic lead with characteristic ornaments, sparse modern bass and pad, brushed cajon percussion, male vocal warm baritone Azerbaijani folk delivery with melisma, epic storytelling tone, occasional balaban wind instrument accents, organic recording feel, no autotune, no electronic drums
```

**Lyrics skeleton (AZ — qoşma form, 4-line stanzas, AABA rhyme pattern):**
```
[Intro]
[Instrumental]
(saz solo, traditional ornaments, 24 bars)

[Verse 1 — Qoşma form]
[Soulful, Vibrato]
Dağlar başı duman olub örtülər
Yarpaqlar yox, çiçəklər də saralıb
Bir vaxtlar gülən gözlər ağlayır
Zaman gedir, hər şey bizdən aralıb

[Refrain]
[Melisma]
Aman, dünya aman
Hər nə var, fanidir
Aman, dünya aman

[Verse 2]
(another qoşma stanza)

[Saz Solo / Interlude]
[Instrumental]
(saz solo + balaban entry)

[Verse 3]
(final qoşma stanza — epic conclusion)

[Refrain]
[Powerful, Melisma]
(repeat with vocal swell)

[Outro]
[Instrumental, Fade Out]
(saz solo close)
```

**Pitfalls:**
- ⚠️ Suno saz-ı bouzouki və ya bağlama kimi verə bilər — "Azerbaijani saz with characteristic ornaments" əlavə et
- "no electronic drums" mütləq — modernlik **arrangement** layer-də qalmalıdır, percussion organic
- Qoşma rhyme scheme AABA — lyrics-də saxla
- Melisma çoxdur aşıq tradition-da — `[Melisma]` tag açıq qoy

---

### Template 13 — AZ Romantic Ballad (Arabesque-style emotional)

**Use case:** AZ wedding sentimental, drama OST, emotional payoff scene.
**BPM:** 65-80
**Reference vibe:** Turkish arabesque + AZ sözlər; emotional, dramatic, swelling.

**Style field (~330 chars):**
```
Turkish arabesque style ballad in Azerbaijani, 72 BPM, B minor with Middle Eastern hijaz mode, lush string orchestra, dramatic kanun zither flourishes, plucked oud, sparse darbuka percussion entering at chorus, male vocal powerful tenor with vibrato and melisma, swelling emotional arrangement, no electronic elements, dramatic pause before final chorus
```

**Lyrics skeleton (AZ):**
```
[Intro]
[Instrumental]
(strings + kanun flourish, 16 bars)

[Verse 1]
[Soulful, Vibrato]
Sən getdin və mənim dünyam söndü
Bütün küçələr birdən tənha oldu
Yağışda durub adını çağırıram
Ürəyim hələ də sənə bağlı qaldı

[Pre-Chorus]
[Building, Melisma]
Niyə getdin, niyə? Mənə cavab ver
Bu ürək sənsiz necə döyünsün?

[Chorus]
[Belted, Powerful, Vibrato]
Sənsiz bu həyat mənə heç bir şey
Sənin sözlərin hələ də qulağımda
Sənsiz bu həyat mənə heç bir şey
Qayıt geriyə, sevgilim, qayıt yanıma

[Verse 2]
(eyni emotional intensity)

[Bridge]
[Whispered, Spoken]
Bəlkə... bəlkə bir gün qapı açılar
Bəlkə... bəlkə sənə yenidən baxaram

[Dramatic Pause]
[Instrumental]
(silence + single string note)

[Chorus]
[Belted, Full Vibrato, Ad-libs]
(final chorus, maximum drama)

[Outro]
[Fade Out, Melisma]
Qayıt... qayıt... qayıt...
```

**Pitfalls:**
- "Hijaz mode" mütləq — Western minor verirsə dramatic arabesque hiss itir
- "no electronic elements" mütləq — synth pad arabesque-i bozur
- Dramatic pause çox vacibdir — sözlü `[Dramatic Pause]` + `[Instrumental]` ardıcıllığı
- Vocal vibrato + melisma açıq — flat vokal arabesque deyil

---

### Template 14 — AZ Wedding Dance (Yallı / 6-8 rhythmic, energetic)

**Use case:** AZ toy mahnısı, wedding party, dance floor energy.
**BPM:** 120-140 (6/8 time signature feel)
**Reference vibe:** Modern Azerbaijani wedding dance tracks, accordion + percussion energy.

**Style field (~360 chars):**
```
Azerbaijani wedding dance music, 130 BPM in 6/8 time signature, D major with phrygian inflections, traditional Azerbaijani garmon accordion as melodic lead, lively zurna wind instrument accents, traditional nagara drum and def percussion, hand clapping ostinato, group male vocal call-and-response chant style, festive celebration energy, no modern EDM elements, organic live recording feel
```

**Lyrics skeleton (AZ):**
```
[Intro]
[Instrumental]
(garmon + zurna intro, 16 bars rhythmic)

[Verse 1]
[Group Vocals, Chant]
Bu gecə bizim toyumuzdur, dostlar gəlin
Süfrəmizdə şərab, masamızda mahnı
Oxuyaq, rəqs edək sübhə kimi
Bu sevincdə bütün dünya bizim olsun

[Hook / Chant]
[Group Vocals, Call and Response]
Yallı! Yallı! Bütün millət birgə
Yallı! Yallı! Əl-ələ tutub
Yallı! Yallı! Bizim toydur bu axşam
Yallı! Yallı! Sübhə kimi rəqs!

[Verse 2]
(another celebration verse)

[Zurna Solo / Interlude]
[Instrumental]
(zurna solo + clapping)

[Hook]
[repeat with more energy]

[Outro]
[Group Vocals, Cheering]
(festive close, applause feel)
```

**Pitfalls:**
- 6/8 time signature açıq yaz — Suno default 4/4-ə qaçır
- Zurna **mütləq** AZ wedding sound üçün — yoxsa generic Middle Eastern olur
- "Garmon" yaz, "accordion" yox — Suno bilir, AZ-spesifik tone verir
- "no modern EDM elements" — yoxsa Suno party tag-ından EDM drop salır

---

### Template 15 — Funny / Meme Parody (TikTok viral)

**Use case:** Komedi reklam, viral TikTok parodi, qrup chat tema mahnısı, "text-to-song" trend.
**BPM:** 100-130
**Reference vibe:** "We Are Charlie Kirk" / Splaxema meme viral pattern, exaggerated novelty pop.

**Style field (~280 chars):**
```
playful novelty pop, 118 BPM, C major, bouncy synth melody, cartoonish sound effects, light percussion, exaggerated female vocal cheerful mid-register, group backing vocal "hey hey" chants, simple repeating hook, comedic timing, glossy meme-pop production, hook lands at 0:10, intentionally silly energy
```

**Lyrics skeleton:** Comedic premise + repetitive hook.
```
[Intro]
[Spoken]
"Bu mahnı [komik premise haqqında]..."

[Verse 1]
[Cheerful, Playful]
(4-8 lines establishing comedic situation)

[Pre-Chorus]
[Building, Group Vocals]
"And then... and then... and then..."

[Chorus]
[Belted, Group Vocals, Ad-libs]
(absurd repeating hook, 4 lines)

[Verse 2]
(escalation of comedy)

[Chorus]
[repeat with more chaos]

[Bridge]
[Spoken, Exaggerated]
(comic monologue)

[Chorus]
[final repeat, maximum chaos]

[Outro]
[Group Vocals, Laughing]
[Fade Out]
```

**Pitfalls:**
- "Intentionally silly" mütləq Style-da — yoxsa Suno serious pop yazır
- Hook 0:10-da düşməlidir — TikTok loop pattern
- Lyrics 2-3 cümlə premise + 4-cümlə hook = viral formula
- Group vocals tag çoxlu istifadə et — "hey hey" chants viral signature

---

## 5. Necə template seçilir — Quick Reference

| Niyyət | Template | Süzgəc |
|---|---|---|
| 30s TikTok hook AZ | #1 (Pop) və ya #15 (Meme) | viral, 100-128 BPM |
| 30s TikTok hook EN | #1 (Pop) və ya #2 (EDM) | viral, 110-128 BPM |
| 2-3 dəq AZ pop YT track | #9 (AZ pop) | radio polish, AZ language |
| 2-3 dəq AZ rap | #10 (AZ trap) | half-time, ME flavor |
| Cinematic ballad film/reklam | #3 (Cinematic indie) | slow, emotional |
| Reklam underscore (instrumental) | #6 (Orchestral) | no vocals |
| Lo-fi background YT | #4 (Lo-fi) | loops, no vocals |
| Club / fashion | #8 (Deep house) | 122 BPM |
| EDM festival drop | #2 (EDM) | 128 BPM, build+drop |
| 80s nostalgia visual | #7 (Synthwave) | EN preferred |
| AZ wedding / yallı | #14 (Wedding) | 6/8, garmon |
| AZ traditional revival | #11 (Meyxana) və ya #12 (Aşıq) | niche, AZ scripts |
| AZ romantic drama OST | #13 (Arabesque) | hijaz, dramatic |
| Komedi / parodi | #15 (Meme) | intentionally silly |

---

## 6. Universal Pitfalls (bütün template-lər üçün)

### 1. Reference artist adı yazma
Suno copyright filter Adele, Drake, Tarkan, Aygün Kazımova kimi adları rədd edir. Bunun yerinə **stilistik descriptor** yaz: "soulful female alto vocal, big-band torch song production" ("Adele" əvəzinə).

### 2. Char limit yoxla (PASTE-DƏN ƏVVƏL)
```bash
cat << 'EOF' > /tmp/style.txt
<your style text>
EOF
wc -c /tmp/style.txt
```
Style ≤750, Lyrics ≤4300 hədəfləyir (real Suno hard limit 800/4500).

### 3. AZ characters
Suno v5+ ə, ı, ö, ü, ş, ç qəbul edir. **Lakin** vocal mispronunciation olursa:
- Variant A: Tam AZ saxla (default — düzgün yazılış)
- Variant B: Phonetic romanization sınaq et ("Tənha" → "Tenha", "şəhər" → "sheher")
- 2 take istifadə et — biri AZ scripts, biri phonetic, müqayisə et

### 4. Negative constraints məcburi v5.5-də
"no autotune", "no electronic drums", "no melodic singing chorus" kimi negative tag-lar **v5.5-də işləyir** və generic output-u bağlayır. Hər template-də negative ən azı 1-2 dənə var.

### 5. Tag sırası vacibdir
İlk 20-30 söz ən güclü təsirdir. **Genre + tempo + key** ən başda olmalıdır, **negative constraints** sonda.

### 6. "Custom Mode" istifadə et, "Quick Generation" deyil
Style field + Lyrics field ayrı-ayrı doldurmaq lazımdır → Custom Mode məcburi. Quick prompt single-field tək az control verir.

### 7. 2 take generate et, dinləyib daha yaxşısını seç
Suno hər prompt üçün 2 variant verir. Take-lər bir az fərqli olur — hər ikisi dinlənilməli, hətta birinci pis çıxırsa, ikinci əla ola bilər.

### 8. Lyrics section count
~6-8 section ən stable (Intro + 2 Verse + 2 Chorus + Bridge + Outro). 10+ section Suno-nu drift etdirir, müddət uzanır, struktur dağılır.

### 9. Vocal direction mütləqdir
"female vocals" deyil — "**female alto vocal mid-register breathy with subtle vibrato**" kimi. Range + texture + register hər biri ayrı tag.

### 10. Trend uyğunluğu yoxla
WebSearch ilə cari janr trendini araşdır (CLAUDE.md HARD RULE A). 2024-də işləyən pattern 2026-da köhnəlmiş ola bilər (məs. v4-də işləyən "single-phrase genre tags" v5.5-də deprecated).

---

## 7. Template yenilənmə qaydası

Bu fayl **canlı sənəddir**. Yeni viral pattern və ya knowledge ortaya çıxanda:
1. Bu fayla yeni template əlavə et (lazımdırsa) və ya mövcudu yenilə
2. Manbə qeydə al (URL + tarix)
3. CLAUDE.md "Skill söhbətləri qaydası" əsasında commit et

**Son yenilənmə:** 2026-05-27 — initial 15-template library, sources: Travis Nicholson articles, HookGenius v5.5 guide, Musci.io, SunoPrompt Middle Eastern guide, HookGenius Turkish guide, Billboard 2025 AI music recap.
