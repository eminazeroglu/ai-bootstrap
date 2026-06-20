# ElevenLabs — Azərbaycan dilində səsləndirmə

AZ kontent üçün ElevenLabs istifadəsinin spesifik qeydləri. Bu user AZ-da işləyir — AZ dialoq səsləndirmə tez-tez lazım olacaq.

> ElevenLabs-in dil dəstəyi dəyişir. Azərbaycan dilinin cari dəstək vəziyyətini və keyfiyyətini **WebSearch ilə yoxla** — köhnə məlumatla "dəstəkləyir" demə.

## Hansı modellər

- **Eleven v3** — 70+ dil elan edilib; Azərbaycan dili adətən bu siyahıya daxildir. Audio tag dəstəyi olduğu üçün **AZ dramatik dialoq üçün ən yaxşı seçim**.
- **Multilingual v2** — ~29 dil; Azərbaycan dəstəyi modeldən-modelə dəyişə bilər — yoxla.
- Dəstək qeyri-müəyyəndirsə: **test et** (qısa nümunə generasiya et) və ya AZ aksentli Voice Design istifadə et.

## Xüsusi hərflər

AZ əlifbasının xüsusi hərfləri: **ə, ı, ö, ü, ş, ç, ğ**.
- Adətən qəbul olunur, amma bəzən mis-tələffüzə səbəb olur.
- Problem olarsa: sözü **fonetik yenidən yaz** və ya alternativ romanizasiya təklif et (`ə → e`, `ı → i`) — amma bu mənanı dəyişməməlidir, istifadəçiyə təsdiqlət.

## Vurğu və tələffüz

- Azərbaycan dilində vurğu adətən **son hecada**dır. Model səhv hecaya vurğu qoyarsa:
  - Sözü defislə böl: `Bakı → Ba-kı`
  - Durğu işarəsi ilə ritmi yönləndir.
- **Çətin sözlər** (yer adları, şəxs adları, terminlər) — fonetik yaz, və ya pronunciation hint əlavə et.
- Uzun cümlələri qısa hissələrə böl — AZ intonasiya əyrisi uzun cümlədə pozula bilər.

## Qarışıq dilli dialoq

AZ kontentdə **kod dəyişmə** (AZ + RU/EN) çox yayılıb. Hər seqment üçün:
- Mümkünsə hər dili **ayrı generasiya** et, montajda birləşdir — model bir generasiyada dil keçidlərini həmişə təmiz çıxarmır.
- Və ya v3 ilə sına — v3 çoxdilli keçidləri daha yaxşı tutur.

## Kritik AZ səsləndirmə üçün

- **Voice Design** prompt-una aksenti açıq yaz: `...with a natural Azerbaijani accent...`.
- Yüksək keyfiyyət lazımdırsa: real AZ səs aktyorundan **PVC** (Professional Voice Clone) düşün.
- Mütləq **2 take** dinlə — AZ TTS keyfiyyəti dəyişkən ola bilər, daha yaxşı performansı seç.
- Tələffüz şübhəlidirsə — istifadəçidən yoxlamasını xahiş et, "düzgündür" deyə təxmin etmə.

## Tövsiyə olunan iş axını (AZ dialoq)

1. Model: **Eleven v3**, Stability: **Natural**.
2. Səs: `character-designer` profilinə uyğun Voice Design (AZ aksent prompt-da).
3. Mətn: ssenarinin AZ dialoqu, v3 audio tag-ləri ingiliscə.
4. Çətin söz/ad varsa — fonetik düzəliş, istifadəçiyə təsdiqlət.
5. 2 take → daha yaxşısını seç → `08-audio/vo-<səhnə>.md`.
