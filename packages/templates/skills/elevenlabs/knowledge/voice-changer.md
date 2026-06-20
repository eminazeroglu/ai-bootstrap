# ElevenLabs — Voice Changer (Speech to Speech)

Voice Changer (Speech-to-Speech, STS) **mövcud bir səs yazısını alıb başqa səsə çevirir** — emosiyanı, ritmi, çatdırılmanı, intonasiyanı qoruyaraq.

## TTS vs Voice Changer

| | Text to Speech | Voice Changer (STS) |
|---|---|---|
| Giriş | yazılı mətn | səs yazısı (performans) |
| Nəzarət | audio tag-lər, settings | **sənin öz aktyorluğun** — birbaşa performans |
| Nə vaxt | sürətli, mətn əsaslı | dəqiq emosional nəzarət, vaxt/ritm vacibdirsə |

## Nə vaxt istifadə et

- **Dəqiq performans nəzarəti** — replikanı özün (və ya aktyor) oynayırsan, sonra obraz səsinə çevirirsən. TTS-in çıxara bilmədiyi incə emosional nüanslar.
- **Lip-sync vaxtlaması** — video kadrında dodaq hərəkəti ilə dəqiq uyğunluq lazımdırsa, performansı kadra görə oynayıb çevirmək daha dəqiqdir.
- **Spesifik intonasiya** — sarkazm, tərəddüd, kəsilən nəfəs kimi şeyləri "oynamaq" daha asandır.

## Giriş keyfiyyəti

STS-in nəticəsi **giriş yazısının keyfiyyətindən** asılıdır:
- Təmiz yazı — fon səsi yox, exo yox, klipləşmə yox.
- Aydın artikulyasiya — model giriş intonasiyasını köçürür.
- Bir danışan — qarışıq səslər nəticəni korlayır.

## Settings

TTS-ə oxşardır — **Stability** və **Similarity Boost** əsas parametrlərdir:
- Similarity yüksək → hədəf səsə daha sadiq
- Stability aşağı → giriş performansının emosional dəyişkənliyini daha çox saxlayır

## AI video pipeline-da iş axını

1. `video-prompt-engineer` dialoqlu kadrı göndərir.
2. Creator (sən / istifadəçi) replikanı kadra baxaraq **özü oynayır** və yazır.
3. STS ilə həmin yazı obrazın səsinə (Voice Design / library) çevrilir.
4. Çıxış `08-audio/`-a — `video-prompt-engineer` lip-sync üçün istifadə edir.

> STS opsional yoldur. Əksər hallarda TTS + audio tag-lər kifayətdir; STS yalnız emosional dəqiqlik kritik olanda lazımdır.
