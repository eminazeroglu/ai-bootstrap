# Eleven v3 — Audio Tag Sistemi

Eleven v3 mətnin içində **kvadrat mötərizəli tag-larla** emosiya, çatdırılma və qeyri-verbal səsləri idarə edir. Tag-lar yalnız **v3 modelində** işləyir — digər modellərdə mətn kimi oxunur.

> Tag dəsti dəyişə bilər. Layihədə kritik tag varsa **WebSearch ilə yoxla**.

## Tag kateqoriyaları

### Emosiya / ton
`[happy]` `[sad]` `[angry]` `[excited]` `[nervous]` `[tense]` `[calm]` `[fearful]`
`[sarcastic]` `[curious]` `[regretful]` `[warmly]` `[coldly]` `[seriously]`

### Çatdırılma / səs səviyyəsi
`[whispers]` `[shouting]` `[quietly]` `[loudly]` `[firm]` `[hesitant]` `[rushed]` `[slowly]`

### Qeyri-verbal səslər
`[sighs]` `[laughs]` `[chuckles]` `[gasps]` `[exhales]` `[breathes deeply]`
`[crying]` `[clears throat]` `[pauses]`

### Aksent / üslub
`[strong Azerbaijani accent]` `[neutral accent]` — kontekstə uyğun

## İstifadə qaydaları

- **Tag replikadan ƏVVƏL gəlir** və ondan sonrakı hissəyə təsir edir:
  ```
  [quietly, tense] Hələ də gəlmir...
  [sighs] Bəlkə də heç gəlməyəcək.
  ```
- **Az işlət** — replika başına 1–2 tag idealdır. Hər cümləyə tag yığsan, səs süni və qarışıq olur.
- **Tag-ları birləşdirə bilərsən**: `[whispers, fearful]` — amma 2-dən çox yığma.
- **Punktuasiya ilə birgə** — tag emosiyanı verir, punktuasiya tempi: `[nervous] Mən... mən bilmirəm.`
- **Qeyri-verbal tag-lar tək də dura bilər**: `[laughs]` bir sətirdə, sonra replika.

## Multi-speaker dialoq formatı

v3 bir generasiyada bir neçə danışanı dəstəkləyir. Hər danışanı adı ilə işarələ:

```
ƏLİ: [tense] Hələ də gəlmir...
AYTƏN: [firm] Mən gəldim. Gec oldu, bilirəm.
ƏLİ: [sighs, relieved] Düşünmüşdüm ki...
```

Hər danışan üçün ayrıca voice anchor seçilir. Multi-speaker generasiyada təbii növbələşmə alınır, amma **kritik replikalar üçün tək-tək generasiya daha çox kontrol verir**.

## Anti-pattern

- ❌ Hər cümləyə tag — `[happy] Salam. [excited] Necəsən? [warmly] Səni gördüyümə sevindim.`
- ✅ Bir emosional vəziyyət, bir tag — `[warmly] Salam, necəsən? Səni gördüyümə sevindim.`
- ❌ Ziddiyyətli tag-lar — `[shouting, whispers]`
- ❌ Tag-ı replikanın ortasında — yalnız əvvəldə.
