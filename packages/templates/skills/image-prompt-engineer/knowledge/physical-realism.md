# Physical Realism Knowledge — Image & Video Prompts

> Bu fayl real dünya fiziki qanunlarını, anatomik və ekoloji məntiqi sıralayır. Hər image/video prompt yazılarkən **mütləq nəzərə alınmalıdır**. AI modelləri bu qanunları default-dan pozur — prompt yazan onları **açıq sıralamalıdır**.

> **Eyni fayl video-prompt-engineer/knowledge/-də də referans verilir.** Hər iki skill bu məntiqi tətbiq etməlidir.

---

## 0. Niyə bu qayda var

AI image və video modelləri (GPT-Image-2, Nano Banana, Flux, Midjourney, Veo, Kling, Runway) **fiziki dünyadan deyil, training data piksellərindən** öyrənir. Onların "fizikası" statistik korrelyasiyadır, qanunlar deyil. Misal: yüz minlərlə "clothesline + balkon" şəklində ip arada divara bərkidilməyib (lakin foreground-da ipə paltar asılıb), model bunu "doğru clothesline" sanır. Nəticədə **havada bitən ip** yaranır.

Prompt yazan **explicit fiziki məhdudiyyət əlavə etməlidir**:
- "clothesline securely attached at BOTH ends to wall hooks"
- "shadow falling opposite to the sun direction"
- "candle NOT lit because it's daytime"
- "hand showing exactly 5 fingers"

Bu fayl bütün kateqoriyaları sıralayır.

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

### Prompt formulasiyası

**Yanlış:**
> "A clothesline with clothes drying."

**Doğru:**
> "A clothesline **securely attached at BOTH ends** — one end to a metal hook embedded in the cream wall on the left, the other end to a vertical post at the balcony corner on the right. Clothes are pegged with wooden clothespins, fabric hanging vertically under gravity."

### Catenary sag emphasis (P-02 stress test learning)

AI modelləri clothesline-i çox vaxt **straight (taut)** kimi render edir, halbuki ip ağır paltarların altında **görünən V-formada sag** atmalıdır. "Sags under weight" yazmaq kifayət deyil — model gentle/subtle curve verir.

**Aggressive sag instruction tələb olunur:**
- "The clothesline forms a CLEAR CATENARY CURVE (V-shape sagging downward in the middle). It is NOT taut, NOT straight."
- "Height difference: at the endpoints the line is at ~2m height, at the lowest sag point in the middle it is at ~1.5m height — a clear 50cm vertical drop visible."
- "The sag is most dramatic UNDER the heaviest items (wet bath towel, jeans). The line dips lower there. Lighter items (handkerchief, sock) appear higher because the line rises between heavy items."
- "Multiple weight-induced curves — line is not a single smooth arc, it has local dips where heavy items hang."

Bu pattern bütün rope/cable/wire scenarios üçün — telephone wires (poles arası sag), suspension cables, hanging garden ropes.

### Real-world checklist (hər səhnə üçün)
- [ ] Hər obyektin **dayağı və ya bağlantısı** açıqdır
- [ ] İp, kabel, zəncir → iki uc müəyyəndir
- [ ] Asılı obyekt → asma mexanizm görünür (qarmaq, mıxla, clip)
- [ ] Fluid / parça → gravity istiqamətindədir

---

## 2. Light sources & shadows (işıq mənbələri və kölgələr)

### Qayda: Hər işıq mənbəyinin kölgəsi əksi istiqamətindədir

| Element | Doğru | Yanlış |
|---|---|---|
| Günəş camera-sağ | kölgə camera-sola düşür | kölgə aşağıya / üst düşür |
| Çoxlu işıq | hər biri öz kölgəsini verir | tək obyekt, çoxlu kölgə yox səbəb |
| Soft light (overcast) | yumşaq, geniş kölgə | sərt edge |
| Hard light (günəş) | sərt, dəqiq edge | yumşaq, yuyulmuş |
| Lampa açıq | kabel + güc mənbəyi məntiqli | havada yanır |
| Lampa söndü | işıq vermir | hələ də işıq saçır |

### Qayda: Kölgə uzunluğu işıq bucağına uyğundur

- **Günorta (sun ~90° elevation):** çox qısa kölgə (obyektin altında)
- **Səhər/axşam (sun ~25°):** uzun kölgə (obyekt boyu 2-3 dəfə)
- **Golden hour (~10-20°):** çox uzun, dramatik kölgə
- **Gecə (sun yox):** kölgə yalnız practical lampa-dan

### Qayda: İşıq rəngi mənbə temperatur-una uyğun

- **Tungsten/incandescent lamp:** 2700-3200K warm orange
- **Halogen:** 3200K
- **Day balanced:** 5600K neutral white
- **Overcast sky:** 6500-7500K cool blue
- **Candle / fire:** 1800-2200K very warm orange
- **LED (modern):** 3000-5000K (variable)
- **Moonlight:** 4100K cool blue (lakin film/photo-da çox vaxt göy-mavi stylized)

### Qayda: İşıq mənbəyinin frame-də göründüyü hallar
Lampa, şam, pəncərə, atəş **frame-də görünürsə**, onun işığı səhnədə **olmalıdır**. Tərsi də doğru — kölgədə yanır görünsə də, yanan lampa yoxsa, işıq olmamalıdır.

### Reflective / specular (parıltılar)
- Metal səthlər ətraf işığı əks edir (matt yox)
- Şüşə şəffaf və ya əks edici (işıq bucağına görə)
- Su həm şəffaf həm əks edir
- Catchlight (göz parıltısı) işıq mənbəyi istiqamətindədir

### Prompt formulasiyası

**Yanlış:**
> "A cozy living room with warm lighting."

**Doğru:**
> "A warm 3200K table lamp (visible in frame, on a small side table) is the **primary light source** — it casts warm orange light to the left side of the room, with corresponding soft shadows falling to the right side. Ambient daylight from a window adds cool 5600K fill from camera-left at low intensity (1/4 ratio). No other practical lights are on."

---

## 3. Time of day consistency (vaxt ardıcıllığı)

### Qayda: Sky color + shadow + practical lights eyni vaxta uyğun olmalıdır

| Vaxt | Sky | Shadow | Practicals | Common mistake |
|---|---|---|---|---|
| Sübh (5-6 AM yazda) | Pre-dawn pale blue, faint warm horizon | Heç biri yox (no direct sun) | Street lights ON | Günəş şüası shadow yaradır — yanlış |
| Səhər (7-9 AM) | Warm gold horizon, blue above | Long, warm-orange directional | Street lights OFF, interior lights ON if dark | Both street + interior all ON — yanlış |
| Günorta (12 PM) | Bright blue, neutral white sun | Short, hard | All practicals OFF (no need) | Candles, lamps ON daytime — **YANLIŞ** |
| Late afternoon (4-6 PM) | Soft warm | Medium, golden | Practicals starting | All daytime lights still off |
| Golden hour (~30 min before sunset) | Amber-rose-purple gradient | Very long, warm-orange directional | Some practicals starting to turn on (interior windows glow) | Sky too bright + lights all on |
| Blue hour (~20 min after sunset) | Deep cool blue, faint warm horizon | No direct shadow | Practicals dominant, balanced with sky | Direct sun shadows — yanlış |
| Night (10 PM+) | Black (or city light reflection) | Practical-only shadows | All artificial lights ON | Daylight wash — yanlış |

### Cultural / regional adjustments
- Bakı (40°N, Caspian Sea east): günəş şərqdən doğur, qərbdən batır
- Şəhərdə pəncərələrdən gələn işıq tez yanır (5 PM sonbaharda artıq)
- Yayda işıq 9 PM-ə qədər
- Khazri (north wind) küləklə bağlı atmosfer

### Midday lighting — explicit override required (P-01 stress test learning)

AI modelləri default-da "indoor + window" üçün **morning/afternoon golden warm light** seçir (training data bias). "Midday" və ya "12:00 PM" yazmaq **kifayət deyil** — model uzun yumşaq warm kölgələr verir.

**Aggressive midday instruction tələb olunur:**
- "Sun position: 80-90° elevation (zenith, almost directly overhead). NO low-angle sun."
- "Color temperature: 5600K cool neutral daylight, NOT warm/golden."
- "Shadow length: VERY SHORT, falling almost directly below objects (zenith sun). Shadows extend less than 1/3 of the object's height."
- "Shadow quality: hard-edged, sharp (direct sunlight, no atmospheric haze softening)."
- "NO golden hour, NO warm tone, NO long shadows — this is midday with sun overhead."

Eyni mexanizm digər unusual time-of-day-lər üçün:
- **Solar noon emphasis:** "sun at zenith, short hard shadows directly below objects"
- **Pre-dawn/dawn emphasis:** "sun BELOW horizon, NO direct sunlight, only ambient blue sky light"
- **High-noon emphasis:** "sun ELEVATION above 75°, shadows under feet not behind"

Default AI bias = "golden hour everything". Hər zaman qəti instruction lazımdır.

### Prompt formulasiyası

**Yanlış:**
> "A girl reads by candlelight in her room."

**Doğru variantları:**
- Əgər **gündüzdür:** "A girl reads by daylight streaming through her window. NO candles, NO lamps lit." (gündüzdə şam yoxdur)
- Əgər **gecə və candle dramatic-dir:** "A girl reads by a single candle on the desk. The room is otherwise dark (it is nighttime — no daylight from window, only the cold blue moonlight outside the window pane is visible)."

---

## 4. Weather & atmosphere (hava və atmosfer)

### Yağış
- Şaquli düşür, kiçik küləklə yan
- Səth yaş olur — torpaq, beton parıldayır
- Çətir altında quru, kənarda yaş
- İnsan saçı yaş, paltar tutqun rəng (yaş audion daha tutqun görünür)

### Qar
- Yavaş yağır, üfqi səthə qalır (damlar, döşəmə)
- Şaquli divarda qalmaz çox vaxt
- İz qoyur — addım, təkər
- Atmosfer parlaq olur (qar əks edir)

### Duman / haze
- Distance contrast azaldır
- Atmospheric perspective güclənir — uzaq obyektlər mavi-boz, sönük
- Light beams duman-da visible olur (god rays)

### Külək
- Yarpaq xışıltı
- Saç hərəkəti istiqamət göstərir
- Parça (clothesline, bayraq) küləyə doğru həm formalanır
- **Tüm hərəkətlər eyni istiqamətdə olmalıdır** (yarpaqlar bir tərəfə, saç fərqli tərəfə = yanlış)

### Bulud kölgəsi
- Buludlar var → günəş hər zaman görünmür → buludlu sahələrdə kölgə zəifdir

### Prompt formulasiyası

**Yanlış:**
> "A rainy day in the park."

**Doğru:**
> "A rainy autumn afternoon in the park. Rain falls vertically with a slight angle from camera-right (light breeze). The asphalt path is dark and reflective with puddles. The girl's hair has begun to dampen, her coat shoulders darker where rain has soaked in. Atmospheric haze reduces background contrast. Distant trees lose detail to mist."

---

## 5. Anatomy & biology (anatomiya)

### İnsan
- **Əldə 5 barmaq** (4 finger + 1 thumb) — model bunu pozur, hər zaman açıq yaz
- **Ayaqda 5 barmaq**
- **2 göz, 1 burun, 1 ağız, 2 qulaq, 1 boyun**
- **Boyu və proporsiya yaşa uyğun:** uşaqda baş/bədən oranı böyükdür, böyükdə daha kiçik nisbət
- **Qol uzunluğu:** Standing-də əllər baş yarısı ortasındadır (alt yarıda)
- **Diz** ayaq orta nöqtəsindədir
- **Eyni gözdə eyni rəng** — heteroxromiya rare, açıq yazılmalıdır
- **Catchlight (göz parıltısı)** işıq mənbəyi istiqamətindədir (hər iki gözdə eyni)

### Pişik
- **2 qulaq, 4 ayaq, 1 quyruq, 2 göz**
- Qulaqlar üçbucaq, simmetrik
- Whiskers (bığlar) simmetrik, hər tərəfdə 8-12 dənə
- Quyruq uzunluğu bədən uzunluğunun 70-80%-i
- Göz pupil-i şərait işığına görə dəyişir (gündüz nazik şaquli, gecə geniş yuvarlaq)

### Animals (general)
- Quadruped: 4 ayaq simmetrik
- Hər heyvan üçün doğru sayda barmaq və pəncə
- Tüy / lələk gravity-affected
- Quyruq base-də qalın, uca doğru nazikləşir

### Prompt formulasiyası

**Yanlış:**
> "A girl reaches her hand toward the cat."

**Doğru:**
> "A girl reaches her hand toward the cat — palm up, **5 fingers clearly visible and natural** (4 fingers + thumb), gentle relaxed posture."

---

## 6. Material physics (material fizikası)

### Su
- Şəffaf, parıldayan, refraksiya edir
- Damla / splash physics — yığılır səthə düşəndə, sıçrayır
- Sürət ilə davranış: yavaş axın - smooth, sürətli - foam
- Reflective on still surface, distorted on moving

### Şüşə
- Şəffaf (clean) və ya əks edici (reflective)
- Bucağa görə hər ikisi (Fresnel effect — direct angle = clear, glancing angle = reflective)
- Qırılma görünür kenarda

### Şüşə Fresnel dual-layer rendering (kəşf: P-05 iter 1→2, 2026-05-15)

**Real fiziki qanun:** Şüşə eyni anda **iki layer** rendered edə bilər:
- **Transparency layer** — şüşə arxasındakı səhnə (görmək)
- **Reflection layer** — şüşə qarşısındakı səhnə (əksini görmək)

**Tipik scene:** Night-time window — interior lit + exterior dark = glass acts as partial mirror. Audience sees BOTH city through glass AND room reflected on glass.

**AI failure mode (F10 — Glass surface dual-layer bias):** Model şüşəni **tək layer** kimi render edir — adətən yalnız transparency. Reflection element-lərini (lamp, person) **scene-ə spatial integration** edir (məs. lamp → uzaq bina interyeri kimi).

**Doğru prompt format (P-05 v2-də sınanmış və işləyən):**

```
The window glass has TWO LAYERS visible simultaneously. This is a Fresnel partial reflection scene.

REFERENCE: Think of films like "Lost in Translation" (Sofia Coppola) where a character at a hotel window — you see the cityscape through the glass AND the character's face reflected back on the same pane.

LAYER A — TRANSPARENCY (the world OUTSIDE, far away at deep spatial depth):
- [city, distant buildings, etc.]

LAYER B — REFLECTION (the room INSIDE, mirrored on glass surface):
- THIS LAYER FLOATS AT THE GLASS PLANE — NOT at city depth
- Overlaid like a translucent ghost on top of the city view (~25% opacity)
- The lamp reflection POSITIONED AT GLASS-PLANE DEPTH (floating on near surface)

ANTI-DEFAULT (3+ NOT-clauses):
- The reflected lamp is NOT a streetlight outside
- The reflected lamp is NOT a window in a distant city building
- The reflected lamp is NOT an outdoor lamp
- The reflected lamp IS A REFLECTION ON THE GLASS PLANE

VERIFICATION:
- [ ] Is reflection FLOATING on the glass plane (not integrated with cityscape)?
- [ ] Is the woman's translucent ghost visible overlaid?
- If reflected lamp blends INTO the city → FAILURE → regenerate
```

**Anti-pattern (P-05 v1 bug):**
- "Lamp visible in reflection" yetərli deyil — model lamp-ı city scene-ə inteqrasiya edir
- "Moderate brightness" subjective term — `~30%` opacity numeric ilə əvəz et
- Reflection element-lərini ayrı LAYER kimi qruplaşdırmamaq → model dual layer-ı bilməyə bilmir

### Parça (fabric)
- Gravity-affected — düşür, drape olur
- Wrinkle stress points-də (kürək, dirsək)
- Yaş parça daha tutqun rəng və ağır draping

### Metal
- Reflective, lakin perfect mirror deyil (bir balaca pürüzlü)
- Rust = oxidation, vaxtla
- Polish vs matte — surface treatment

### Saç
- Gravity-affected (uzun saç düşür)
- Wet hair daha ağır, daha tünd
- Wind-blown saç istiqamət göstərir
- Strand-level detail

### Wood
- Damar (grain) görünür
- Knot-lar
- Vaxtla weather — colour fades, surface roughens
- Texture finer or rougher depending on finish

### Concrete
- Crack-lar vaxtla
- Stains rain və mineral leaching-dan
- Texture rough vs smooth (finish dependent)
- Cold colour cast

### Prompt formulasiyası

**Yanlış:**
> "Water in a glass."

**Doğru:**
> "Clear water inside a clean glass, half-full. Light refracts through the water, slight magnification of the table edge visible behind. The water surface is still, reflecting the ceiling lamp above. A small condensation droplet runs down the outside of the glass (room temperature drink, slightly cool)."

---

## 7. Architecture & structure (memarlıq)

### Buildings
- **Strukturlar dayanır** — foundation, sütun, divar
- **Doors** açılır içəri və ya çölə — konsistent
- **Windows** çərçivəli, şüşə şəffaf
- **Roof** angle suya yön verir
- **Balconies** cantilevered (asma) və ya sütunlu

### Stairs (xüsusi diqqət — AI modelləri sıxlıqla bu pozur)

Pilləkənlər **çoxlu fiziki sub-qanunlar** saxlayır. Yalnız "stairs" yazmaq kifayət deyil:

1. **Hər pilləkənin İKİ TƏRƏFİ olmalıdır** (BOTH sides must be physically defined):
   - **Inner side (divar tərəfi):** strukturlu daxili divar — concrete, painted, doludur
   - **Outer side (açıq tərəfi):** mütləq **handrail VƏ ya banister/balustrade** olmalıdır — adamın yıxılmasının qarşısını alır
   - Heç bir pilləkənin "açıq havaya bitən kənarı" YOX (qoruma olmadan açıq pillə = real dünyada qanunsuz, təhlükəsizlik pozulması)

2. **Step dimensions consistent** — Bütün pillələrdə **eyni rise (~17-19cm)** və **eyni depth (~25-29cm)**. Bir pillə qısa, biri uzun = yanlış

3. **Step structure complete** — Hər pillə tam görünür, "half-step" yox, kəsilmiş yox. Step əsl bir nodal düzbucaqlı: tread (üst) + riser (qabaq) + edge (kenar/nosing)

4. **Handrail əlavə qanunları:**
   - **Continuous** — hər flight boyunca uzanır, bitməz orta yerdə
   - **Mounted** — duvara metal brackets-lə (every ~1.5m) və ya separate vertical posts-la (banister)
   - **Height** ~90cm yerdən
   - **Returns** — flight başlanğıcında və sonunda divara qayıdır, açıq ucla bitməz
   - **Landing-də banister/balusters** — yan boş tərəfdə vertical posts (her 12-15cm) qoruyucu məqsədli

5. **Landing structure** — flight-lər arasındakı platform tam strukturlu, **bütün dörd kənarı dayanır** (divara və ya structural beam-ə). Open void üzərində landing = yanlış (struktural support görsənməlidir)

6. **Banister / balustrade configuration** (Soviet apartment-də tipik):
   - Open stair-də banister vertical iron posts (every 12-15cm) yeli üfqi top rail-ə birləşir
   - Half-wall variant: pilləkənin açıq tərəfində ~90cm half-wall ola bilər (concrete və ya brick)
   - Hybrid: half-wall + handrail üstdə
   - **HEÇR halda boş açıq kənar yoxdur** — security pozulması

### Spiral staircase — dual-banister rule (kəşf: P-03 iter 1, 2026-05-15)

Tower / library spiral staircase-ləri **İKİ ayrı banister sistemi** saxlayır:

1. **Outer banister** — step-lərin xarici (uzaq) kənarında, vertical iron posts hər 12-15cm + horizontal helical top rail ~90cm. Bu, ümumi spiral staircase üçün AI model-in default render etdiyi sistemdir.

2. **Inner handrail** — central wooden/iron column-a **bracket-lərlə** bərkidilmiş ikinci helical iron rail. Climbing zamanı handhold məqsədli, hand-height (~90cm above each tread). **AI model bu ikinci sistemi sıxlıqla DROP edir** (statistical bias — dual-element rendering bias, F9 failure pattern).

**Doğru prompt format (P-03 iter 2-də sınanmış və işləyən):**
```
TWO SEPARATE BANISTER SYSTEMS — both MUST be rendered (this is non-negotiable):

3A. OUTER BANISTER (along outer edge of steps):
    - Vertical iron posts, ~1.5cm thick, spaced every 12-15cm
    - Continuous helical iron top rail at ~90cm height
    - On EVERY visible turn — bottom, middle, top
    - Perspective compression makes upper turns appear DENSER, not sparser

3B. INNER HANDRAIL (attached to central column):
    - A SECOND helical iron rail, separate from the outer banister
    - Attached to the central column BY VISIBLE METAL BRACKETS (L-shaped arms every ~1m)
    - Hand height ~90cm above each tread
    - For handhold while climbing
    - Brackets are visible attachment points

Without inner handrail, the prompt fails: ascending a tall spiral with no handhold is physically dangerous and architecturally incorrect.

VERIFY before finalizing:
- [ ] Outer iron banister visible on every turn (count posts)
- [ ] Inner helical rail visible attached to column (count brackets)
```

**Anti-pattern:**
- Parantezdə inner handrail-i qeyd etmə ("central post (with handrail)") — model parantezi opsional kimi drop edir
- "Inner side IS the central post" tək cümlədə yetərli deyil — model post-u tək struktur kimi qəbul edir, attached rail-i drop edir
- "Handhold via attached helical iron handrail" parantezdə yazılırsa → ❌

### Soviet apartment specifics (Bakı kontekstdə)
- 1960s-80s tipikdir 5-9 mərtəbəli concrete block
- Balcon dar (1.2-1.5m derinlik)
- İron railing (3 horizontal bar)
- Cement / plaster exterior, light cream paint (often peeling)
- Window: double-pane, white frame, opens inward
- Pəncərə altında **air conditioning units** çox vaxt
- Roof access pilləkənlər
- Yard: beton, paslı qarajlar, köhnə avtomobil, ağaclar (tut, çinar, plane)
- **Pilləkən specifics:** concrete steps + iron handrail wall-mounted + half-wall partition between flights (very common) və ya iron banister posts

### Soviet apartment specifics (Bakı kontekstdə)
- 1960s-80s tipikdir 5-9 mərtəbəli concrete block
- Balcon dar (1.2-1.5m derinlik)
- İron railing (3 horizontal bar)
- Cement / plaster exterior, light cream paint (often peeling)
- Window: double-pane, white frame, opens inward
- Pəncərə altında **air conditioning units** çox vaxt
- Roof access pilləkənlər
- Yard: beton, paslı qarajlar, köhnə avtomobil, ağaclar (tut, çinar, plane)

### Modern Bakı specifics
- Glass towers (Flame Towers — yalnız Old City üzərindən görünür)
- Şopinq mərkəzləri modern (Port Baku)
- Yeni rezidential complex-lər (Khazar Islands və s.)
- Eski daş Old City binalarının üzü (Maiden Tower, Şirvanşahlar)

### Prompt formulasiyası

**Yanlış:**
> "A Soviet apartment building."

**Doğru:**
> "A 5-story post-Soviet residential block, typical 1970s Bakı construction. Light cream plastered exterior, slightly peeling at corners. Each apartment has a small cantilevered balcony with a 3-bar dark iron railing, hip-height. Window frames are white double-pane, some with air conditioning units below. The building has a flat tar roof. Concrete foundation visible at the base."

---

## 8. Composition with physical accuracy (kompozisiyada fiziki doğruluq)

### Perspective
- Vanishing point eye level-də
- Parallel lines converge correctly
- Foreshortening yaxın obyekt böyük, uzaq kiçik
- Atmospheric perspective: distance reduces contrast, saturates toward blue

### Depth of field
- Focal plane sharp
- Foreground/background blur amount = aperture × distance physics
- Bokeh shape lens aperture shape (hexagonal, circular)

### Reflections in frame
- Mirror əks etdiyi yön nəyə baxırsa
- Su əks etdiyi göy / üst-üstə düşmüş obyektlər
- Glass partial reflection + partial transparency

### Prompt formulasiyası

**Yanlış:**
> "Wide shot of the room."

**Doğru:**
> "Wide shot, 35mm lens equivalent, eye-level camera, vanishing point at center of frame. Foreground (table, 2m from camera) sharp, midground (sofa, 4m) slightly soft, background (window, 6m+) softer with atmospheric haze. Mirror on left wall reflects the lamp on the opposite side of the room."

---

## 9. Cultural & geographic specifics (mədəni və coğrafi)

### Bakı / Azerbaijan kontekst
- **Caspian Sea east-of-city** — sun rises over sea (səhər), sets behind city (axşam)
- **Khazri** north wind, **Gilavar** south wind
- **Mediterranean climate** — sun-baked summer (40°C+), cool winter (~5°C)
- **Geographic features:** Caspian, Yanardağ (fire mountain), Apsheron peninsula
- **Architecture eras:** Old City (12th c. stone), Tsarist (1900s, Italian style), Soviet (1960s-80s concrete), Modern (2000s+ glass)
- **Vegetation:** Plane trees (chinar), mulberry (tut), fig (əncir), pomegranate (nar), olive (zeytun)
- **Common balcony plants:** geranium (məh­əmməd­ği), basil (rey­han), mint (na­na)

### Per-project country/city
WORKFLOW.md-də `Country:` və `City:` sahələri default verir. Hər country üçün benzer cultural-physical specifics oxunmalıdır.

### Prompt formulasiyası

**Yanlış:**
> "A Bakı courtyard."

**Doğru:**
> "A typical Bakı residential courtyard (heyət) between three Soviet-era 5-story apartment blocks. Cracked concrete ground, two old paslı (rusted) sheet-metal garages on the side, a single mulberry tree (tut) in the center, a wooden bench (often broken slat). One vintage Lada parked in the corner. Power lines visible above between buildings."

---

## 10. Common mistakes catalog (qadağan olunan səhvlər)

### Top 20 AI-image səhvləri

1. **Floating objects** — havada üzən stol, lampa, vase
2. **Multiple shadows from single light** — bir günəş, çoxlu kölgə
3. **Wrong finger count** — 4, 6, 7 barmaq
4. **Daytime + candles/lamps ON** — gündüzdə şam yanır
5. **Clothesline single attachment** — bir ucu havada bitir
6. **Shadow opposite direction** — kölgə işıq mənbəyi tərəfindən deyil
7. **Door without handle** — açılışda heç bir mexanizm yox
8. **Window without frame** — şüşə havada üzür
9. **Stairs inconsistent rise** — bir pillə yüksək, biri alçaq
10. **Person standing in puddle but dry feet** — fizika işləməz
11. **Fire without smoke (in normal conditions)** — yanan obyekt tüstüsüz
12. **Hands warped / morphed** — barmaqlar bir-birinə qarışmış
13. **Sky and ground time-of-day mismatch** — gecə səması + gündüz aksesuarları
14. **Cat with 3 ears or wrong eye count**
15. **Catchlight wrong position** — gözdə parıltı işığa zidd
16. **Glass refraction missing** — tam şəffaf, lakin refraction yox
17. **Hair levitating** — gravity yox
18. **Person too small/big for environment** — proportion səhv
19. **Mirror showing wrong reflection** — mirror əksi rotated / wrong scene
20. **Rain falling sideways without wind context** — şiddətli külək olmadan yan yağış

### Hər prompt-da əlavə "negative" və ya "explicit" instruction

- "Anatomically accurate: 5 fingers per hand visible and natural"
- "Physically accurate clothesline: both ends visibly attached"
- "Single light source from [direction]: shadows fall opposite, no contradictory shadows"
- "Time of day [X]: practical lights match (on/off per [X] logic)"
- "Reflection physics: mirror/water reflects what's actually in front of it"

---

## 11. How to apply (image prompt yazılarkən)

### Workflow
1. **Səhnəni təsvir et** (subject, environment, mood)
2. **Obyekt siyahısı çıxar** — frame-də hər nə var
3. **Hər obyekt üçün:**
   - Dayağı / bağlantısı nədir?
   - İşıq nəzərə alınıb?
   - Material physics doğru?
4. **İşıq mənbəyini lock et** — tək və ya çox? Hardadır? Vaxt nə?
5. **Vaxt ardıcıllığını yoxla** — gündüz/gecə + practical lights uyğun?
6. **Anatomy yoxla** — hər canlı, doğru sayda extremities
7. **Cultural / geographic specifics əlavə et** — country/city WORKFLOW.md-dən
8. **Negative / explicit instruction-lar yaz** — top 20 common mistake-lərə uyğun
9. **Prompt yenidən oxu** — fiziki olaraq mümkündürmü?

### Checklist (prompt yazıldıqdan sonra)
- [ ] Hər obyektin dayağı / bağlantısı açıqdır
- [ ] Işıq mənbəyi tək (və ya çox açıq qeyd olunub) və kölgəsi əksi istiqamətdədir
- [ ] Vaxt + sky + shadow + practical lights bir-birinə uyğundur
- [ ] Anatomy: 5 barmaq, 2 göz, doğru proportion
- [ ] Material physics: water, glass, fabric davranır kimi olmalıdır
- [ ] Cultural/geographic specifics WORKFLOW.md-yə uyğundur
- [ ] Common mistakes top 20-dən qaçınılmışdır

---

## 12. How to apply (video prompt yazılarkən — əlavə qaydalar)

Image promptun bütün qanunlarına **əlavə**:

### Motion physics
- Acceleration / deceleration smooth, instant deyil
- Falling object accelerates with gravity (9.8 m/s²)
- Throwing → arc path
- Walking → realistic cadence (not robotic)
- Cat motion → fluid, predatory, never rigid
- Cloth / hair → moves with body movement + air

### Continuity in time
- Shadow direction sustained (sun moves slowly — 15° per hour)
- Light intensity changes gradually
- Reflections shift with camera angle
- Smoke rises (hot air physics)
- Steam dissipates

### Frame-to-frame physics
- Object can't teleport between frames
- Motion blur amount = exposure × velocity
- Inertia continues if no force applied
- Reaction follows action (Newton's third law)

### Common video physics mistakes
- Subject teleporting frame-to-frame
- Reflections not moving with camera
- Hair static while walking
- Object falling at unrealistic speed (too slow, too fast)
- Smoke rising sideways (unless strong wind)
- Water flowing uphill in static frame

---

## 13. References (real dünya)

Bu fayl real fizika qanunlarına və cinematography conventions-larına əsaslanır:
- **Cinematography:** Roger Deakins, Vittorio Storaro, Hoyte van Hoytema, Lance Acord teaching materials
- **Animation reference:** Pixar's "Lighting & Rendering" course (Disney+ Insider), Frank Thomas & Ollie Johnston "Illusion of Life"
- **Physics:** Standard mechanical physics (gravity 9.8 m/s², Newton's laws), optics (Snell's law for refraction, Fresnel for reflection-transparency)
- **Anatomy:** Standard human/animal anatomy references (Loomis for human, Ken Hultgren for animals)

---

*Versiya: 1.0 | Son yenilənmə: 2026-05-15 | İstifadə edən skill-lər: image-prompt-engineer, video-prompt-engineer, location-designer, character-designer, storyboard-builder*
