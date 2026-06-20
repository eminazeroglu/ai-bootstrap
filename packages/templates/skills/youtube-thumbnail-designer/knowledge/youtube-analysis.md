# YouTube Analysis — Link parse + script analysis procedure

> Skill iki input mode-u qəbul edir: YouTube link və ya ssenari fayl yolu. Bu fayl analiz prosedurunu və çıxarılacaq field-ləri saxlayır.

## Contents

1. Input mode tanıma
2. YouTube link parse — WebFetch addımları
3. Transkript fallback (WebFetch kifayət etmədikdə)
4. Ssenari fayl analizi
5. Çıxarılan field-lər (uniform schema)

---

## 1. Input mode tanıma

İstifadəçinin verdiyi input-a baxıb mode-u təyin et:

| Input pattern | Mode |
|---|---|
| `https://youtube.com/watch?v=...` və ya `youtu.be/...` | YouTube link mode |
| `https://www.youtube.com/shorts/...` | Shorts mode — bu skill landscape üçündür, Shorts üçün xəbərdar et |
| Fayl yolu (.md, .txt, .docx, .pdf) | Ssenari fayl mode |
| Çıplaq mətn (paste edilmiş ssenari) | Inline script mode |
| YouTube link + ssenari yol — hər ikisi | Combined mode (link → context, script → detail) |

İstifadəçi heç birini verməyibsə, soruş:
> "Hansı input verirsən? YouTube link, ssenari fayl yolu, ya hər ikisi?"

---

## 2. YouTube link parse — 3-tier prosedur

`WebFetch` YouTube üzərində praktiki olaraq işləmir — YouTube SPA-dır (JS-rendered), static HTML boşdur. Bunun əvəzinə **3 səviyyəli avtomatik prosedur**:

### Addım 2.1 — URL normallaşdır
```
https://youtu.be/ABC123 → https://www.youtube.com/watch?v=ABC123
https://www.youtube.com/watch?v=ABC123&t=42s → https://www.youtube.com/watch?v=ABC123
https://www.youtube.com/shorts/ABC123 → Shorts mode (§ 7 edge case)
```

### Tier 1 — oEmbed (instant, ZERO setup, always works)

YouTube-un rəsmi public oEmbed endpoint-i. Heç bir API key, heç bir install lazım deyil.

```bash
curl -sL "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<VIDEO_ID>&format=json"
```

Çıxan JSON-da bu sahələr var (məcburi):
- `title` — video başlığı (AZ glyphs daxil)
- `author_name` — channel name
- `author_url` — channel URL (handle-i çıxar)
- `thumbnail_url` — mövcud thumbnail URL
- `provider_name`, `html` — minor

Bu, hər video üçün dərhal işləyir. Çatışmayan: description, transcript, tags.

### Tier 2 — yt-dlp (preferred, one-time install)

`yt-dlp` lokal mövcuddursa, **tam metadata + auto-subtitles** çıxır.

#### Yoxla:
```bash
which yt-dlp && yt-dlp --version
```

#### Mövcud deyilsə → istifadəçiyə install təklifi (məcburi disclosure):
```
"yt-dlp mövcud deyil. Bu alət YouTube-dan tam məlumat çıxarmaq üçündür
(title, description, tags, transkript). 10 saniyəlik bir-dəfəlik install:

  brew install yt-dlp

Mən sənin üçün indi quraşdırım? (bəli/xeyr)
- Bəli: install edirəm, sonra tam avtomatik analiz davam edir
- Xeyr: yalnız Tier 1 (oEmbed) + transkript paste lazım gələcək"
```

İstifadəçi razıdırsa → `brew install yt-dlp` icra et.

#### yt-dlp ilə tam metadata çıxar:
```bash
yt-dlp --skip-download \
  --print "%(title)s|%(channel)s|%(upload_date)s|%(view_count)s|%(duration)s|%(categories)s|%(tags)s" \
  "<URL>"
```

Çıxan format: pipe-separated values. Field-lər:
- Title
- Channel name
- Upload date (YYYYMMDD)
- View count
- Duration (seconds)
- Categories (Entertainment, Education, Music, və s.)
- Tags (siyahı kvadrat mötərizədə)

#### Description ayrıca:
```bash
yt-dlp --skip-download --print "%(description)s" "<URL>"
```

#### AZ auto-subtitle çəkmə (real transkript):
```bash
yt-dlp --skip-download \
  --write-auto-sub --sub-lang az --sub-format vtt \
  "<URL>" \
  -o "/tmp/yt-transcript.%(ext)s"
```

VTT formatda fayl `/tmp/yt-transcript.az.vtt` olaraq yazılır.

#### Transkripti təmizlə (timestamp və duplikatları sil):
```bash
grep -v "^[0-9]" /tmp/yt-transcript.az.vtt | \
  grep -v "WEBVTT" | grep -v "^$" | \
  grep -v "Kind:" | grep -v "Language:" | grep -v "^align" | \
  sed 's/<[^>]*>//g' | awk '!seen[$0]++'
```

#### Mövcud dilləri yoxla (əgər AZ yoxdursa):
```bash
yt-dlp --list-subs "<URL>" | grep -E "(Language|Available)"
```

AZ yoxdursa, mövcud bir dili seç (en, ru, tr) və xəbərdar et:
> "Bu videoda AZ auto-subtitle yoxdur. <En/Ru/Tr> versiya çəkim, yoxsa transkripti manual paste edəcəksən?"

### Tier 3 — Manual paste (fallback)

Tier 1 və Tier 2 hər ikisi uğursuz olarsa (məs. video private, internet kəsilir, yt-dlp install rədd edilir):

> "Avtomatik məlumat çəkilmədi. Sən manual yardım et:
> 1. YouTube videoya gir → '...' menyusu → 'Show transcript' → bütün mətni kopya et → buraya yapışdır
> 2. Yoxsa sadəcə 4-5 cümlə ilə kontekst de (kanal, mövzu, niche, audience)"

### Addım 2.5 — Yetərlilik testi (3 tier birləşdirildikdən sonra)

Aşağıdakı sahələr doldurulubsa → davam et:
- [ ] Title var (oEmbed-dən gəlir, həmişə)
- [ ] Channel name var (oEmbed-dən gəlir, həmişə)
- [ ] Topic / niche hint var (description + tags + transcript-dən)
- [ ] Tone hint var (transcript-dən və ya istifadəçinin verdiyi kontekstdən)

**Hər dörd ✅** → Addım 4-ə keç (script analysis lazım deyil — meta-data + transcript-dən çıxan field-lər kifayət edir).

**Hər hansı ❌** → istifadəçidən kontekst soruş.

---

## 4. Ssenari fayl analizi

### Addım 4.1 — Fayl Read
İstifadəçinin verdiyi fayl yolunu Read et. Fayl tipləri:
- `.md`, `.txt` — birbaşa
- `.docx` — Bash + python-docx və ya pandoc
- `.pdf` — Read tool PDF dəstəyi var (pages: "1-N" parametri)

### Addım 4.2 — Struktur çıxar
Ssenari oxunduqdan sonra çıxar:
- **Scene heading-lər** (`İNT.`, `EKS.`)
- **Action satırları** (vizual təsvirlər)
- **Dialoqlar** (kim danışır + nə)
- **Transitions** (`> KƏSİK:`, `> SOLUR:`)
- **VO / off-screen text** (varsa)

### Addım 4.3 — 5 key field çıxar

Bu skill üçün ən vacib məlumatlar:

```yaml
topic: <1 cümlə mövzu — "AI mənim işimi əvəz edirmi?">
hook_moment: <vizual qənaət ediləcək an — şok, sürpriz, sual>
emotional_payoff: <baxan nə hiss etməlidir — qorxu, maraq, ümid, sürpriz>
audience: <yaş aralığı + dil + niche>
subject: <kim/nə kadrda — host adı, abstract konsept, multi-subject>
```

### Addım 4.4 — Hook moment-i identifikasiya et

Hook moment = video-nun **vizual zirvəsi** — thumbnail bu anı vizuallaşdırır.

Ssenaridə tap:
- **Climax beat** (genəlliklə 60-80% bölgədə)
- **En çətin sual** (rhetorical question, "Hmm" moment)
- **Visual surprise** (transformation, reveal, unexpected obj)
- **Emotional break** (laughter, tears, gasp)

Bunlardan **bir** hook moment seç → thumbnail bu anı təsvir edir.

### Addım 4.5 — Subject identifikasiya et

Hook moment-də kim/nə kadrda olacaq?

- **Host kadrda?** → host face required (refs/host-face.png lazım)
- **Multi-character?** → hər karakter üçün ref
- **Abstract** (yalnız obyekt, mətn) → host face lazım deyil
- **Mixed** (subject + obyekt) → həm host həm obyekt ref

---

## 5. Çıxarılan field-lər (uniform schema)

Hansı mode (YouTube link / transkript / ssenari fayl / inline script) istifadə olunsa da, çıxarılan field-lər **eyni schema**-dadır:

```yaml
# Standart input analysis output
input_source: <youtube_link | youtube_link+transcript | script_file | inline_script | combined>
source_url_or_path: <URL və ya fayl yolu>

# Content
title: <video başlığı və ya 1-cümlə özet>
topic: <1 cümlə mövzu>
hook_moment: <vizual hook an — 1-2 cümlə>
emotional_payoff: <1 cümlə>
subject: <kim/nə kadrda — açıq sıralanmış>

# Audience hints
niche_hint: <edu / vlog / podcast / how-to / drama / music / news / commentary>
audience_hint: <yaş + dil + xüsusiyyət>
tone_hint: <serious / playful / dramatic / authoritative / friendly>

# Channel context (yalnız YouTube link mode)
channel_name: <if available>
channel_handle: <if available>
existing_thumbnail_style: <əgər mövcud thumbnail-lara baxa bilərikdirsə>
```

Bu schema → Mərhələ A Addım A3 sual klasterinin **default cavabları** ola bilər (istifadəçi təsdiqləyir və ya dəyişdirir).

---

## 6. Misal — workflow icra

### Senario A: YouTube link
İstifadəçi: "https://www.youtube.com/watch?v=ABC123 üçün thumbnail layihəsi qurmaq istəyirəm"

1. URL normallaşdır
2. WebFetch çağır
3. Title: "Will AI Replace Programmers in 2026?"
4. Description: "I explore the latest AI tools and..."
5. Niche hint: edu / tech
6. Audience hint: developers, tech-curious, EN dominant
7. Tone hint: question-based → curious + slightly alarming
8. Transkript test: title + desc kifayətdir → davam et
9. → A3 sual klasterini başlat, bu hint-ləri default cavab kimi istifadə et

### Senario B: AZ ssenari fayl
İstifadəçi: "`01-script/v1-stride-30s.md` üçün thumbnail layihəsi"

1. Fayl oxu
2. Scene-headings, action, dialoglarını parse et
3. Hook moment: Beat 3 (emotional climax — "Sənə uyğunlaşır" voiceover)
4. Subject: Aytac (host), park yolu
5. Emotional payoff: empowerment, breakthrough
6. Audience: AZ-speaking, fitness/lifestyle niche
7. Niche hint: vlog / lifestyle / sport
8. → A3 sual klasteri, defaults preset

### Senario C: Mixed (link + ssenari)
İstifadəçi həm link, həm ssenari versə → ikisini birləşdir:
- Link → channel context, tone
- Ssenari → hook moment, subject, emotional arc
- Daha zəngin input → daha dəqiq stylistic plan

---

## 7. Edge cases

### YouTube Shorts URL
Skill xəbərdar et:
> "Bu YouTube Shorts URL-dir (9:16 aspect). Bu skill landscape 16:9 thumbnail üçündür. Shorts üçün ayrı pipeline lazımdır — istəyirsən regular 16:9 thumbnail kimi davam edək, yoxsa Shorts pattern üçün gözləyək?"

### Private / unlisted video
WebFetch nəticəsi 403 və ya boş olsa:
> "Bu video private/unlisted görünür — WebFetch açıq məlumat çıxara bilmədi. Title və mövzu mənə paste edə bilərsən, yoxsa ssenari faylı versən?"

### Multi-language description
Description AZ+EN qarışıqdırsa, dominant dili çıxar (söz sayı), həm də qeyd et: "Channel multi-lingual — thumbnail dilini istifadəçi seçəcək (Sahə 2)."

### Heç bir input
İstifadəçi heç bir input vermədən "thumbnail yaradaq" desə:
> "Yeni layihə yaratmaq üçün input lazımdır:
> 1. YouTube link (mövcud video)
> 2. Ssenari faylı (planlaşdırılan video)
> 3. Hər ikisi (ideal)
>
> Hansını verirsən?"
