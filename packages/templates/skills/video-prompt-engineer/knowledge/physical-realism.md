# Physical Realism Knowledge — Video Prompts

> Bu fayl real dünya fiziki qanunlarını sıralayır. Video promptlarda **mütləq nəzərə alınmalıdır**.

> **Sinxronizasiya qeydi:** Bu faylın bölmələri 1-11 image-prompt-engineer-in physical-realism.md faylı ilə **eyni content saxlayır** (skill knowledge isolated-dir, cross-skill reference işləmir). Bölmə 12 (motion physics) yalnız video-spesifikdir. Hər iki fayl manual sinxronlaşdırılır — biri dəyişəndə digəri də yenilənməlidir.

---

## 0. Niyə bu qayda var

AI video modelləri (Veo 3.1, Kling 3.0, Runway Gen-4, Hailuo 02, Seedance 2, Pika 2, Luma Ray 2) **real fizikadan deyil, training data piksellərindən** öyrənir. Onların "fizikası" statistik korrelyasiyadır, qanunlar deyil. Misal: yüz minlərlə "clothesline + balkon" şəklində ip arada divara bərkidilməyib (lakin foreground-da ipə paltar asılıb), model bunu "doğru clothesline" sanır. Nəticədə **havada bitən ip** yaranır. Video-da bu daha şiddətli olur — motion frame-rate × pixel = exponential səhv ehtimalı.

Prompt yazan **explicit fiziki məhdudiyyət əlavə etməlidir**:
- "clothesline securely attached at BOTH ends"
- "shadow falling opposite to the sun direction, sustained throughout clip"
- "hand showing exactly 5 fingers, motion preserves count"
- "cat motion fluid and physically natural, NOT robotic"

---

## 1. Gravity & support (cazibə qüvvəsi və dayaq)

### Qayda: Hər obyekt bir yerə dayanır və ya bir yerə bağlıdır

| Element | Doğru | Yanlış |
|---|---|---|
| Stol | 4 ayaq üstə dayanır, döşəmədə | Havada üzür |
| Lampa | masa üstündə, tavandan asılı (kabel), divara bərkidilmiş | Tutucu yox, kabel yox |
| Şəkil | divara mıxla, asılı | Divara toxunmadan üzür |
| Bardaq | masa üstündə, əldə | Boş havada |
| **Clothesline / paltar ipi** | **HƏR İKİ UC** divara, dirəyə, qrm-yə bağlı | Bir ucu havada bitir |
| Paltar asma | clip / clothespin / qarmaq ilə ipdə | Yapışqansız üzür |
| Dairə (necklace, bracelet) | bədənə düşür gravity ilə (boyun, biləyə) | Havada formada qalmır |
| Saç | Aşağı düşür gravity ilə, ya küləklə yan | Yuxarı dik dayanır səbəbsiz |
| Su | Aşağı tökülür gravity ilə | Yuxarı axır |
| Yağış | Şaquli düşür (külək yan əyər) | Yatay və ya yuxarı |
| Qar | Yavaş, üfqi səthə qalır | Şaquli divara qalır |
| İnsan / heyvan | Ayaq / dayaq nöqtəsi üstündə | Üzür, dayağı yox |

### Video-spesifik gravity
- Hərəkət zamanı obyekt dayağı **dəyişməməlidir** — əgər stol yerdədirsə, klipdə yerdə qalmalıdır
- Düşən obyekt **acceleration** (9.8 m/s²) ilə artırır — sabit sürət yanlışdır
- Atılan obyekt **parabolic arc**-da hərəkət edir

---

## 2. Light sources & shadows (işıq mənbələri və kölgələr)

### Qayda: Hər işıq mənbəyinin kölgəsi əksi istiqamətindədir

- **Günəş camera-sağ** → kölgə camera-sola düşür
- **Çoxlu işıq** → hər biri öz kölgəsini verir, lakin tək obyektdə **bir əsas kölgə**
- **Soft light (overcast)** → yumşaq, geniş kölgə
- **Hard light (günəş)** → sərt, dəqiq edge
- **Lampa açıq** → kabel + güc mənbəyi məntiqli, frame-də işıq saçır
- **Lampa söndü** → işıq vermir

### Video-spesifik shadow continuity
- **Shadow direction sustained** klip boyu — günəş saatda 15° hərəkət edir, 6s klipdə kölgə yön dəyişməz
- **Shadow intensity gradual** — bulud keçər → kölgə yumşalır, sonra geri sərt olur (smooth transition)
- **Lampa açılır / söndü** — gradual fade, instant deyil (CFL/LED) və ya hard cut (switch click)
- **Object hərəkət edir** → kölgəsi də uyğun hərəkət edir, eyni rate ilə

### Color temperature (saxlanılır klip boyu)
- Tungsten: 2700-3200K warm
- Daylight: 5600K neutral
- Overcast: 6500-7500K cool
- Candle: 1800-2200K very warm
- Mixed lighting: explicit qeyd et hansı dominantdır

---

## 3. Time of day consistency (vaxt ardıcıllığı)

### Qayda: Sky color + shadow + practical lights eyni vaxta uyğun olmalıdır

| Vaxt | Sky | Shadow | Practicals | Common mistake |
|---|---|---|---|---|
| Sübh | Pre-dawn pale blue | Heç biri yox | Street lights ON | Günəş shadow yaradır — yanlış |
| Səhər | Warm gold horizon | Long warm-orange | Some practicals ON | Both street + interior all ON — yanlış |
| Günorta | Bright blue | Short, hard | All practicals OFF | Candles, lamps daytime — **YANLIŞ** |
| Golden hour | Amber-rose-purple | Very long, warm | Practicals starting | Sky too bright + lights all on |
| Blue hour | Deep cool blue | No direct shadow | Practicals dominant | Direct sun shadows — yanlış |
| Night | Black | Practical-only | All artificial ON | Daylight wash — yanlış |

### Video-spesifik time continuity
- 6-10s klip boyunda **vaxt dəyişməz** — sübh-də başladı, klipdə hələ sübhdür
- Sky color sustained
- Practical lights state (on/off) sustained, yalnız story-əsas tetik dəyişdirə bilər (lampa söndü gözəl plot device-dir)

### Midday lighting — aggressive instruction tələb olunur (P-01 öyrənmə)
AI default bias = "golden hour everything". Midday üçün:
- "Sun at zenith (80-90° elevation), shadows directly below objects, very short"
- "5600K cool daylight, NOT warm/golden"
- "Hard-edged sharp shadows, NO atmospheric softening"

---

## 4. Weather & atmosphere

### Yağış
- Şaquli düşür, küləklə yan (~5-15° standart)
- Səth yaş — torpaq parıldayır, beton tutqun
- İnsan saçı yaş, paltar tutqun, ağırlaşır
- Damla səthə düşəndə splash + ripple

### Qar
- Yavaş yağır, üfqi səthə qalır (damlar, döşəmə)
- Şaquli divarda qalmaz
- İz qoyur — addım, təkər

### Duman / haze
- Distance contrast azaldır
- Atmospheric perspective güclənir
- Light beams duman-da visible olur

### Külək — VIDEO ÜÇÜN KRİTİK
- **Bütün elementlər eyni istiqamətdə** hərəkət etməlidir — yarpaq, saç, parça
- Külək sustained, ya da gust pattern (random güclü-zəif)
- Klipdə əsən istiqamət dəyişməz (yalnız genuine wind shift)

---

## 5. Anatomy & biology

### İnsan
- **Əldə 5 barmaq** (4 finger + 1 thumb) — modeli hər frame-də check etməlidir
- **Ayaqda 5 barmaq**
- **2 göz, 1 burun, 1 ağız, 2 qulaq**
- **Proporsiya yaşa uyğun:** uşaq baş/bədən böyük nisbət
- **Eye catchlight** işıq mənbəyi istiqamətində (hər iki gözdə eyni)
- **Symmetry** mütləq — bir göz fərqli rəng yox, qulaqlar simmetrik

### Pişik (və ya heyvan)
- **2 qulaq, 4 ayaq, 1 quyruq, 2 göz**
- Qulaqlar üçbucaq, simmetrik
- Whiskers (bığlar) simmetrik
- Quyruq base qalın, uc nazikləşir
- Göz pupil işığa görə dəyişir (gündüz nazik şaquli, gecə geniş)

### Video-spesifik anatomy
- **Anatomy frame-rate boyu sabit** — barmaq sayı, qulaq sayı klipdə dəyişməz
- **Motion natural** — barmaqlar bend at joint, kol shoulder-də pivot
- **Walk cycle realistic** — uşaq addımı yetkindən fərqlidir (qısa, daha hopping)

---

## 6. Material physics

### Su
- Şəffaf, parıldayan, refraksiya edir
- Damla / splash physics — yığılır səthə düşəndə, sıçrayır
- Reflective on still surface, distorted on moving

### Şüşə
- Şəffaf (clean) və ya əks edici (reflective)
- Fresnel effect: direct angle clear, glancing angle reflective

### Parça (fabric) — VIDEO ÜÇÜN ÇOX VACIB
- Gravity-affected, draping
- **Hərəkətə uyğun ripple** — bədən hərəkət edir, parça da
- Wind interaction
- Wrinkle stress points

### Saç — VIDEO ÜÇÜN VACIB
- Gravity, body movement, küləklə follow
- **Static saç + hərəkət bədən = YANLIŞ**
- Long hair daha çox motion, short daha az
- Wet hair ağır, slow follow

### Metal, ağac, beton
- Reflective vs matt
- Surface texture (grain, rust, crack)

---

## 7. Architecture & structure

### Buildings
- Foundation + sütun + divar — strukturlar dayanır
- Doors: hinge mechanism, açılır içəri ya çölə
- Windows: frame, şüşə, opens correctly
- Balcony: cantilevered və ya sütunlu

### Stairs (kritik — AI modelləri sıxlıqla pozur)

1. **Hər pilləkənin İKİ TƏRƏFİ olmalıdır** — daxili divar + xarici handrail/banister. Heç bir pilləkənin "açıq havaya bitən kənarı" YOX
2. **Step dimensions consistent** — eyni rise (~17-19cm) və depth (~25-29cm) hər pillədə
3. **Step structure complete** — half-step / kəsilmiş yox, hər pillə tam (tread + riser + edge)
4. **Handrail continuous + mounted** — divara bracket-lər (1.5m-də bir) + əla qısalmır
5. **Landing strukturu tam** — dörd kənar dayanır, açıq void üzərində landing yoxdur
6. **Banister / balustrade** — açıq tərəfdə vertical posts (12-15cm-də bir) və ya half-wall ya da hybrid

### Soviet apartment specifics (Bakı kontekstdə)
- Pilləkən: concrete steps + iron handrail wall-mounted + half-wall partition between flights və ya iron banister posts

### Soviet apartment specifics (Bakı kontekstdə)
- 1960s-80s tipik 5-9 mərtəbəli concrete block
- Balcony dar (1.2-1.5m), iron railing (3 horizontal bar)
- Light cream plaster, peeling edges
- Double-pane window, white frame, opens inward
- Air conditioning units altında pəncərələrdə
- Yard: beton, paslı qarajlar, ağaclar (tut, çinar)

---

## 8. Composition with physical accuracy

### Perspective
- Vanishing point eye level-də
- Parallel lines converge correctly
- Foreshortening: yaxın böyük, uzaq kiçik
- Atmospheric perspective: uzaq mavi-boz

### Depth of field
- Focal plane sharp, foreground/background blur
- Bokeh shape lens aperture

### Reflections
- Mirror əks etdiyi nə qarşıdadırsa
- Su əks etdiyi göy / üst obyektlər
- **Video-da: kamera hərəkət edir → reflection update edir**

---

## 9. Cultural & geographic specifics

### Bakı / Azerbaijan kontekst
- Caspian Sea east-of-city — günəş şərqdən doğur, qərbdən batır
- Khazri (north wind), Gilavar (south wind)
- Mediterranean climate
- Architecture: Old City (12th c stone), Tsarist (1900s), Soviet (1960-80s concrete), Modern (2000s+ glass)
- Vegetation: çinar, tut, əncir, nar, zeytun
- Common balcony plants: məhəmmədği (geranium), reyhan, nana

---

## 10. Common mistakes catalog

### Top 20 AI səhvləri (image və video)

1. Floating objects (havada üzən)
2. Multiple shadows from single light
3. Wrong finger count (4, 6, 7)
4. Daytime + candles/lamps ON
5. Clothesline single attachment (havada bitir)
6. Shadow opposite direction
7. Door without handle
8. Window without frame
9. Stairs inconsistent rise
10. Person in puddle dry feet
11. Fire without smoke
12. Hands warped / morphed
13. Sky and ground time-of-day mismatch
14. Cat with 3 ears / wrong eye count
15. Catchlight wrong position
16. Glass refraction missing
17. Hair levitating
18. Person too small/big proportion
19. Mirror wrong reflection
20. Rain sideways without wind

---

## 11. How to apply (image-də əsas — video başlanğıc state-i)

Hər video promptun **başlanğıc kadrı** image-prompt-engineer mərhələsində yaradılır. Orada bu fayl tam tətbiq olunur. Video prompt yazılarkən:
1. Başlanğıc kadrın fizikası artıq doğru qoyulub (image mərhələsində)
2. Drift guard footer ilə model kadrı saxlayır
3. **Motion bu fizikanı pozmamalıdır** — bölmə 12-yə bax

---

## 12. Video-spesifik motion physics (yalnız video-da)

### Motion physics

| Element | Doğru | Yanlış |
|---|---|---|
| Düşən obyekt | Acceleration 9.8 m/s² | Sabit sürət |
| İnsan addımı | Realistic cadence, weight shift, foot-to-floor | Robotic, sliding |
| Pişik addımı | Predatory smooth, fluid spine | Rigid joints |
| Saç hərəkəti | Body + air movement-lə follow | Static while body moves |
| Parça | Wind / movement-ə uyğun ripple | Frozen |
| Su splash | Physics-based drops, ripples | Cartoonish |
| Atəş / tüstü | Yuxarı qalxır (hot air) | Yan / aşağı |
| Yarpaq | Külək istiqamətində eyni | Random |
| Qol hərəkəti | Joint-də natural bend | Stretched, elongated |

### Continuity in time (vaxt davamlılığı)

- **Shadow direction sustained** — günəş 15°/saat
- **Light intensity gradual** — sürətli on/off yox (story tetik istisna)
- **Reflections shift with camera** — mirror əksi update edir
- **Smoke rises continuously** — bir frame yuxarı, sonra aşağı yox
- **Color temperature sustained** — golden hour amber sustained throughout

### Frame-to-frame consistency

- **Subject teleport YOX** — A nöqtəsindən B-yə smoothly
- **Motion blur** = exposure × velocity (natural)
- **Inertia** — Newton's 1st law
- **Action → reaction** — Newton's 3rd law (əl pişikə → pişiyin tüyü hərəkət edir)

### Camera movement physics

- Camera hərəkət edir → parallax effect (yaxın obyekt sürətli hərəkət, uzaq yavaş)
- Camera shake → tutucu cihaz davranışı (hand-held səhərlən fərqlidir)
- Focus pull → focal plane dəyişir (DOF shifts)
- Zoom (optical) vs dolly (pozisiya) — fərqli perspective effect

### Mode B specific (Kling Mode B — start + end frame)

- Start frame fizikası → tamamilə doğru
- End frame fizikası → eyni qanunlara uyğun
- Transition realistic — A-dan B-yə fiziki şəkildə mümkün hərəkət
- Misal: exhaustion-dan smile-a → faza dəyişikliyi smooth, "instant change" yox
- Misal: əl çatdı-pişik toxundu → əl və pişik motion-u parallel uzanır

### Common video physics mistakes

1. Subject teleporting frame-to-frame
2. Reflections not moving with camera
3. Hair static while walking
4. Object falling at wrong speed
5. Smoke sideways without wind context
6. Water flowing uphill
7. Cat moving like a robot
8. Lights flickering randomly (no source)
9. Shadow not following object motion
10. Fabric / hair frozen while body moves
11. Catchlight static when head turns
12. Footstep without ground contact

### Prompt formulasiyası (motion)

**Yanlış:**
> "Girl reaches her hand toward the cat."

**Doğru:**
> "Girl extends her hand slowly toward the cat — palm up, 5 fingers visible. The motion is gentle, deceleration as the hand approaches the cat. Cat's whiskers and ears twitch slightly in response (action-reaction). Girl's hair sways naturally with the slight forward lean of her shoulder. Shadow of her arm extends consistently to camera-left throughout the motion (sun stationary at camera-right ~25° elevation)."

---

## 13. How to apply (video prompt workflow)

1. **Read başlanğıc kadrın image promptunu** — fizika qanunları artıq tətbiq olunub
2. **Motion intent qur** — nə hərəkət edir, kim, necə
3. **Bu fayldakı bölmə 12 tətbiq et:**
   - Motion physics realistic?
   - Continuity in time qoruyur?
   - Frame-to-frame consistent?
   - Camera move physics doğru?
4. **Common video mistakes list-ə qarşı yoxla**
5. **Drift guard footer əlavə et** (CLAUDE.md "Vizual stil qaydası" → drift guard)
6. **Prompt yenidən oxu** — hər motion fiziki mümkündürmü?

---

## 14. References

- Cinematography: Roger Deakins, Vittorio Storaro, Hoyte van Hoytema, Lance Acord
- Animation: Pixar "Lighting & Rendering", Frank Thomas & Ollie Johnston "Illusion of Life", Disney 12 Principles
- Physics: Newton's laws, gravity 9.8 m/s², Snell's law, Fresnel
- Anatomy: Loomis (human), Ken Hultgren (animals)

---

*Versiya: 1.1 | Son yenilənmə: 2026-05-15 | Sinxronizasiya: image-prompt-engineer/knowledge/physical-realism.md ilə bölmə 1-11 eyni, bölmə 12-13 yalnız video-da*
