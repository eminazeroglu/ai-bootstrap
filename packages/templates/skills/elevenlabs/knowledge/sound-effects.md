# ElevenLabs — Sound Effects (SFX)

Sound Effects modulu mətn promptundan **səs effekti** generasiya edir. Kadr və səhnələr üçün foley, ambient, impact, kinematik effektlər yaratmaqda istifadə olunur.

> **Yenilənmiş 2026-05-18:** Bu sənəd real ElevenLabs API + rəsmi nümunələr + 28-may layihəsində aşkar edilmiş silent-output problemlərinə görə yenidən yazılıb. Köhnə "uzun mürəkkəb prompt" yanaşması **silent output yaradır**. Bu sənədin qaydaları məcburidir.

## Rəsmi parametrlər (eleven_text_to_sound_v2)

| Parametr | Aralıq / Default | Təfsilat |
|---|---|---|
| `duration_seconds` | 0.5 – **30** (default: auto) | Maks 30 saniyə |
| `prompt_influence` | 0 – 1, **default 0.3** | Yüksək = literal, aşağı = creative |
| `loop` | boolean, default false | Yalnız `eleven_text_to_sound_v2` |
| `model_id` | `eleven_text_to_sound_v2` | Cari production model |
| Prompt uzunluğu | **3–60 söz / maks ~450 char** | Rəsmi help: 10–60 söz optimal |

## ⚠️ Silent-output səbəbləri (bunlar olmamalıdır)

ElevenLabs SFX **diffusion-based modeldir** — text describing silence → audio that IS silence. Bunlardan qaç:

### 1. Negation sözlər
❌ `no music, no voices, no impact, no traffic, no clock`
**Niyə:** Diffusion modellər negasiyanı over-correct edir (arXiv 2406.02965) → sukunet/sıfır amplitud.
✅ Negation lazımdırsa, **prompt-da deyil, başqa generasiyada**.

### 2. Abstract vibe descriptor-lər
❌ `archival, negative space, contemplative, cinematic, weighted silence, almost imperceptible, subliminal, dignified breath`
**Niyə:** Bunlar **səs deyil, kayfiyyət** — model "audio-reduce" kimi qəbul edir.
✅ Konkret səs mənbəyi adlandır.

### 3. Multi-subject overload
❌ Bir promptda 4-6 fərqli səs mənbəyi.
**Niyə:** Model bunları bir audio bloka yığa bilmir, hamısını ortalayır → formasız/sakit.
✅ Hər mənbəyə **ayrı qısa generasiya**, DaVinci-də layer.

### 4. Uzun prompt
❌ 60+ söz, 450+ char.
**Niyə:** Limiti keçir, model qəbul etmir və ya kəsir.
✅ 3-7 söz optimal.

### 5. Temporal scheduling cəhdi
❌ `pen scratch occurring twice — once at "takes his seat" beat, once at "writes the future" beat`
**Niyə:** Model zamanlamanı bilmir, "ortalanmış" çıxış verir.
✅ Tək hadisəni generasiya et, DaVinci-də istənilən beats-ə qoy.

## Rəsmi nümunələr (elevenlabs.io/sound-effects/room-ambience)

ElevenLabs öz galereyasında bu **3-5 söz** nümunələri verir:

```
Cozy cafe background chatter
Distant clock ticking steadily
Gentle wind rustling leaves
Muffled footsteps on carpet
Barely audible subtle conversations
Light furniture creaking softly
Faint electrical hum flickering
Quiet rain on windowpane
Distant soft dog barking
Distant city traffic sounds
Warm nostalgic record music
```

**Şablon:** `[volume/distance qualifier] + [CONCRETE SOUND SOURCE] + [optional acoustic context]`

`quiet` / `distant` / `muffled` / `gentle` / `soft` / `faint` — bunlar **OK**, çünki həmişə **konkret mənbə** ilə birlikdə gəlir.

## Yaxşı vs zəif prompt

| ❌ Zəif | ✅ Yaxşı |
|---|---|
| `A reverent atmospheric bed for a national leader's portrait, almost silent, no music, no voices, archival breath of remembrance` | `Quiet memorial chamber room tone` |
| `The hushed atmosphere of a small chamber on historic signing night with pen scratch occurring twice and chair creak` | `Fountain pen scratching on parchment` (+ ayrı: `Old wooden chair creaking`) |
| `Distant subtle archival air of empty room with no music no voices` | `Distant clock ticking steadily` |

## Layihə tipinə görə qaydalar

### Ken Burns sənədli (photo-doc)
**Qayda:** Statik arxiv fotoları üzərində kamera hərəkəti zamanı **room-tone SFX süni gəlir**. Tamaşaçı o məkana girmir, sadəcə fotonu görür.

SFX yalnız **vizual motivli anlar** üçün:
- Səhifə vərəqlənir → `Old manuscript page slowly turning`
- Sənəd imzalanır → `Fountain pen scratching on parchment`
- Bayraq dalğalanır → `Flag fluttering softly in wind`
- Külək / vaxt keçidi → `Old book pages flipping rapidly`

**Statik portret / qrup foto üçün SFX YOXDUR** — yalnız musiqi.

### Canlı çəkilmiş səhnələr (fiction / reklam / klip)
Adi yanaşma: ambient bed (Loop on) + foley + impact-lər ayrı.

### Modern footage (drone, real shoot)
Mühit səsi qanunidir — `Modern city skyline wind ambience`, `Distant crowd cheering` və s.

## Qatlama (layering) — düzgün yanaşma

Mürəkkəb səhnəni **bir promptda yığma** — ayrı-ayrı qısa generasiyalar, sonra DaVinci/Premiere-də mix:

> Yağışlı küçə səhnəsi (DOĞRU)
> - `Steady rain on pavement` (Loop on)
> - `Distant thunder rumble` (Loop off)
> - `Car tires passing through puddle` (Loop off)
> - `Hurried footsteps on wet pavement` (Loop off)

> Yağışlı küçə (YANLIŞ — silent output yaradır)
> ❌ `Heavy rain on pavement with distant thunder and cars passing through puddles and hurried footsteps, atmospheric, archival, no birds`

## prompt_influence istifadəsi

| Dəyər | İstifadə |
|---|---|
| 0.2 – 0.3 (default) | Ambient bed, mühit səsi, ümumi atmosfer (model creative qalsın) |
| 0.4 – 0.5 | Konkret tək hadisə (pen scratch, paper rustle) |
| 0.6 – 0.8 | Çox spesifik kinematik effekt (braam, riser, impact) |
| > 0.8 | NADIR — yalnız çox dəqiq mətnə hərfi sadiqlik lazım olanda |

**Default 0.3-i tutmaq əksər hallarda doğrudur.**

## AI video pipeline-da yeri

- `storyboard-builder` / `video-prompt-engineer` kadrı verir → sən o kadrın SFX promptlarını yazırsan.
- **Kadr tipini yoxla:** statik arxiv foto = SFX azaltma; canlı / drone = normal SFX yanaşması.
- Çıxış: `08-audio/audio-<səhnə>.md` — hər effekt ayrıca code block, parametrlərlə.
- Hər SFX-də `📎 Kadr:` qeyd et — hansı vizualla sinxronlaşacaq.

## Mənbələr

- [ElevenLabs SFX API](https://elevenlabs.io/docs/api-reference/text-to-sound-effects/convert) — parametrlər
- [Room Ambience galereyası](https://elevenlabs.io/sound-effects/room-ambience) — rəsmi qısa nümunələr
- [How do I prompt for SFX](https://help.elevenlabs.io/hc/en-us/articles/25735604945041) — 10-60 söz qaydası
- arXiv 2406.02965 — diffusion modellərdə negative prompt over-correction