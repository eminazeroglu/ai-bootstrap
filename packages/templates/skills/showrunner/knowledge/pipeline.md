# Pipeline Map — AI Creator İstehsal Zənciri

Bu, `showrunner`-in istinad etdiyi tam pipeline xəritəsidir. Hər mərhələ üçün:
hansı skill, giriş, çıxış qovluğu, nə **ATTACH** edilməli, fayl adı.

---

## İki başlanğıc yolu

```
İstifadəçi → showrunner (açılış müsahibəsi)
                │
       ┌────────┴─────────┐
   Ssenari YOX        Ssenari VAR
       │                  │
  screenwriter         director
  janr seç →           ssenarini oxu →
  ssenarist personası  janr təyin et →
  → ssenari yaz        rejissor personası
       │                  │
       └────────┬─────────┘
                ▼
         Element çıxarışı
        (obraz, məkan, ...)
```

**Fərq:** ssenari yoxdursa, `screenwriter` janrın **ən güclü ssenaristlərini** təqdim edir və
onların üslubunda yazır. Ssenari varsa, `director` janrın **ən güclü rejissorlarını** təqdim
edir və onların gözü ilə kadrı qurur. Hər iki halda persona seçimi mütəxəssis skill-də olur —
`showrunner` yalnız yönləndirir.

---

## Tam istehsal zənciri (mərhələ-mərhələ)

| # | Mərhələ | Skill | Giriş (ATTACH) | Çıxış qovluğu |
|---|---|---|---|---|
| 1 | Ssenari | `screenwriter` | brief (showrunner-dən) | `01-script/` |
| 2 | Rejissor baxışı | `director` | ssenari | `01-script/` qeydləri |
| 3 | Obrazlar | `character-designer` | ssenari element siyahısı | `02-characters/` |
| 4 | Məkanlar | `location-designer` | ssenari element siyahısı | `03-locations/` |
| 5 | Shot list | `director` | ssenari + məkan ref | `04-storyboard/` |
| 6 | Storyboard | `storyboard-builder` | obraz ref + məkan ref + shot list | `04-storyboard/` |
| 7 | Şəkil promptu | `image-prompt-engineer` | storyboard cell + anchor-lar | `05-image-prompts/` |
| 8 | Video promptu | `video-prompt-engineer` | generasiya edilmiş şəkil + motion intent | `06-video-prompts/` |
| 9 | Səsləndirmə + SFX | `elevenlabs` | ssenari dialoqları + kadr konteksti | `08-audio/` |
| M1 | Musiqi əsası | `composer` | mövzu / ssenari mood-u | `07-music/` |
| M2 | Sözlər | `lyricist` | composition planı | `07-music/` |
| M3 | Suno promptu | `suno-prompt-engineer` | composition + sözlər | `07-music/` |

**Qızıl qayda:** hər mərhələ şəkil çıxarır, o şəkil növbəti mərhələnin **reference input**-u
olur. Mərhələləri atlamaq olmaz. Hər promptda iki şey açıq yazılır:
`📎 ATTACH:` (əvvəlki mərhələdən gələn reference şəkillər) və `💾 OUTPUT:` (dəqiq fayl adı).

---

## Mərhələ detalları

### 1 — Ssenari (`screenwriter`)
- `showrunner` brief-i verir: layihə tipi + janr + platforma + dil seçimləri.
- `screenwriter` o janrın güclü ssenarist personalarını təqdim edir, beat sheet → təsdiq → tam
  ssenari (Fountain formatı) yazır.
- Sonda **avtomatik element çıxarışı**: karakterlər, məkanlar, səhnələr.
- Çıxış: `01-script/v1-<qısa-ad>.md` və ya `.fountain`.

### 2 — Rejissor baxışı (`director`, ssenari VAR yolunda)
- Ssenari oxunur, janr təyin edilir, janrın güclü **rejissor personaları** təqdim edilir.
- Seçilən rejissorun üslubu bütün sonrakı kadr / işıq / kamera qərarlarına hopur.

### 3 — Obrazlar (`character-designer`)
- Ssenaridən obrazlar cast direktoru kimi çıxarılır: geyim ssenariyə uyğunlaşdırılır, üz
  cizgiləri ssenaridəki məlumata əsasən qurulur.
- Hər obraz üçün **tək birləşmiş reference şəkil** promptu: full body + 4 yaxın bucaq, bir
  şəkildə.
- Çıxış: `02-characters/<obraz-adı>.md` + `02-characters/images/` (istifadəçi generasiya edir).

### 4 — Məkanlar (`location-designer`)
- Ssenaridə kadrlarda istifadə olunacaq bütün məkanlar çıxarılır, ssenariyə uyğun dizayn edilir.
- Hər məkan üçün reference şəkil promptları (establishing / wide / medium).
- Çıxış: `03-locations/<məkan-adı>.md` + `03-locations/images/`.

### 5 — Shot list (`director`)
- Məkan + ssenari + rejissor tövsiyəsinə əsasən hər səhnə shot-lara bölünür: kamera + lens +
  bucaq + işıq + hərəkət.
- Çıxış: `04-storyboard/shotlist-<səhnə>.md`.

### 6 — Storyboard (`storyboard-builder`)
- Bütün əvvəlki skill-lərlə məsləhətləşərək grid qurulur (2x2 / 3x3 / 4x3 — səhnənin
  sıxlığına görə təklif edilir).
- Soldan-sağa **continuity qorunur** — eyni obraz, məkan, işıq, palitra.
- İki çıxış: **(a)** tək-şəkil contact-sheet mega-promptu (sürətli exploration), **(b)** hər
  cell üçün ayrı production kartı.
- İstifadəçi şəkli generasiya edib `04-storyboard/`-a yükləyir. Sonra "sütun 1, sətir 2-dən
  kadrı çıxart" deyəndə — həmin cell `image-prompt-engineer`-ə ötürülür.
- Çıxış: `04-storyboard/sb-<səhnə>.md`.

### 7 — Şəkil promptu (`image-prompt-engineer`)
- Storyboard cell-ini (və ya yüklənmiş storyboard şəklini) alıb, **sıfırdan** target model üçün
  (Nano Banana / GPT-Image-2 / Flux / Midjourney / Imagen) dəqiq prompt yazır.
- Eyni skill kadr / səhnə üçün lazım olan **SFX promptlarını** da yazır (`elevenlabs` SFX
  biliyinə istinadla).
- Çıxış: `05-image-prompts/<cell-adı>.md`.

### 8 — Video promptu (`video-prompt-engineer`)
- Generasiya edilmiş kadr şəklini alıb, onu canlandıracaq promptu yazır (Veo 3.1 / Kling 3.0 /
  Seedance 2.0 / Runway / və s.).
- Lazım olduqda `screenwriter`, `director` ilə məsləhətləşir.
- **Dialoq qolu:** kadrda dialoq varsa və ssenaridə həmin dialoq mövcuddursa:
  - Səs `elevenlabs`-də ayrıca yaradılacaqsa → əvvəlcə `elevenlabs`-ə yönləndir.
  - Səs Veo/Kling daxilində yaradılacaqsa → bunu dəqiqləşdir, dialoqu video promptuna daxil et.
- Çıxış: `06-video-prompts/<cell-adı>.md`.

### 9 — Səsləndirmə + SFX (`elevenlabs`)
- Ssenarini və ssenarist qeydlərini oxuyub, dialoqları **emosiyaları nəzərə alaraq** TTS üçün
  hazırlayır.
- Kadr / səhnə üçün lazım olan səs effektlərinin promptlarını yazır.
- Çıxış: **iki ayrı fayl** — `08-audio/vo-<səhnə>.md` (dialoq səsləndirmə) və
  `08-audio/sfx-<səhnə>.md` (səs effektləri). VO və SFX müstəqil yenidən generasiya edilə
  bilsin deyə ayrılır; səhnədə yalnız bir növ varsa, yalnız o fayl yaradılır.

### M1–M3 — Musiqi zənciri (paralel)
- `composer` musiqi əsasını qurur (janr, BPM, key, aranjman, vokal direksiyası).
- `lyricist` sözləri yazır — əvvəlcə şeirin hekayəsi, təsdiqdən sonra kuplet-kuplet.
- `suno-prompt-engineer` hazır composition + sözləri Suno / Udio paste-ready promptuna çevirir;
  həmçinin musiqinin trend potensialını araşdırır.
- Çıxış: `07-music/composition-<ad>.md`, `lyrics-<ad>.md`, `suno-<ad>.md`.

---

## Miqyası formata uyğunlaşdır

Hər layihə eyni dərəcədə ağır deyil — **lazımsız mürəkkəblik yaratma**:

| Format | Məkan ref | Kadr başına | Qeyd |
|---|---|---|---|
| Sənədli / Ken Burns | məkan başına ~1 | shot başına ~1 kompozisiya | minimal |
| Bədii film | məkan başına 3-shot triplet | tam storyboard | tam zəncir |
| Reels / Short-form | ən yığcam | 1 grid, qısa | sürətli |

---

## outputs/ qovluğu

Real generasiya edilmiş media (`outputs/`) git-ə commit edilmir — `.gitignore`-dadır. Promptlar
və `.md` faylları commit edilir; binary media yox.

---

## Plan tracking faylları (proactive future-scope confirmation üçün)

Multi-stage pipeline-da istifadəçi mütəmadi olaraq "Z element planda var?" soruşur. Showrunner
(və bütün skill-lər) **plan faylını dərhal oxuyub** reassurance + seçim verməlidir (CLAUDE.md
"Proactive future-scope confirmation qaydası").

**Default plan tracking fayllar (sıra ilə yoxla):**

1. `cells-ready-to-copy.md` — production cell siyahısı (layihə-spesifik ad ola bilər)
2. `04-storyboard/storyboard-plan.md` — storyboard-builder Faza 1 çıxışı
3. `04-storyboard/shot-list.md` — director çıxışı
4. `WORKFLOW.md` — layihə statusu + növbəti addım
5. `04-storyboard/` qovluğundakı digər `.md` fayllar

**Qayda:** istifadəçi plana daxil olan element haqqında danışsa, ilk **mövcud** plan faylını
Read et, elementi axtara, sonra reassurance + (a/b/c) seçim ver. Heç vaxt sakit jump etmə.
