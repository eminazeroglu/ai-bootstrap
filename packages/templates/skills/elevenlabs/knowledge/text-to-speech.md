# ElevenLabs — Text to Speech (TTS)

ElevenLabs-in əsas modulu: mətni təbii səsə çevirir. AI video layihələrində obraz dialoqlarının səsləndirilməsi üçün istifadə olunur.

> **Diqqət:** ElevenLabs model adları və limitləri tez-tez dəyişir. Aşağıdakılar erkən 2026 vəziyyətidir — kritik qərar verməzdən əvvəl **WebSearch ilə cari vəziyyəti yoxla**.

## Modellər

| Model | Güclü tərəfi | Nə vaxt |
|---|---|---|
| **Eleven v3** | Ən ekspressiv; **audio tag** dəstəyi (`[whispers]`, `[laughs]`); 70+ dil | Emosional dialoq, dramatik səhnələr — **dialoq səsləndirmə üçün default** |
| **Multilingual v2** | Sabit, etibarlı, production workhorse; ~29 dil | Uzun forma, ardıcıllıq vacib olanda, audio tag lazım deyilsə |
| **Flash v2.5** | Ultra-aşağı latency (~75ms) | Real-time, conversational — video layihələrində nadir |
| **Turbo v2.5** | Sürət + keyfiyyət balansı | Tez iterasiya |

**Dialoq səsləndirmə üçün:** Eleven v3 — emosiya audio tag-lərlə idarə olunur (`audio-tags.md`).

## Voice Settings

| Parametr | Aralıq | Aşağı | Yüksək |
|---|---|---|---|
| **Stability** | 0–1 (v2) / 3 rejim (v3) | ekspressiv, dəyişkən, emosional | sabit, monoton, proqnozlaşdırıla bilən |
| **Similarity Boost** | 0–1 | orijinal səsdən uzaq | orijinal səsə sadiq (bəzən artefakt) |
| **Style Exaggeration** | 0–1 (v2 modelləri) | neytral | danışıq üslubunu gücləndirir (latency artır) |
| **Speaker Boost** | on/off | — | aydınlıq və oxşarlıq artır |

**v3-də Stability 3 rejimdir:**
- **Creative** — ən ekspressiv, audio tag-lərə güclü reaksiya, bəzən qeyri-sabit
- **Natural** — balanslı, **dialoq üçün default**
- **Robust** — ən sabit, audio tag-lərə zəif reaksiya, uzun forma üçün

### Səhnəyə görə tövsiyə
- **Sakit / intim səhnə:** Stability Natural-Robust, Style aşağı
- **Dramatik / emosional:** Stability Creative-Natural, Style yüksək
- **Səlis nəql (narrator):** Stability Robust, Style aşağı, Similarity yüksək

## Best practices

- **Durğu işarələri vacibdir** — vergül qısa pauza, nöqtə tam dayanma, `...` uzun fasilə, `—` kəsilmə.
- **Düzgün böyük/kiçik hərf** — CAPS bəzən qışqırıq kimi oxunur; lazımsız böyük hərf istifadə etmə.
- **Uzun mətni böl** — bir generasiyada çox uzun mətn drift yaradır; səhnə/abzas-larla böl.
- **Çətin sözlər** — adlar, terminlər mis-tələffüz olunursa: fonetik yaz, defislə böl, və ya pronunciation dictionary (v2) / SSML phoneme tag istifadə et.
- **2 take dinlə** — eyni promptla iki generasiya, daha yaxşı performansı seç.
- **Bir obraz = bir səs** — layihə boyu obrazın səsi dəyişməməlidir (consistency anchor).

## AI video pipeline-da yeri

1. `character-designer` obrazın profilini verir (yaş, cins, xasiyyət, səs təsviri).
2. Sən hər obraz üçün səs təyin edirsən — library voice və ya Voice Design.
3. `screenwriter`/ssenaridən dialoq + emosiya çıxarılır.
4. v3 audio tag-ləri ilə işarələnir.
5. Çıxış `08-audio/vo-<səhnə>.md`-ə — sonra `video-prompt-engineer` lip-sync üçün istifadə edir.
