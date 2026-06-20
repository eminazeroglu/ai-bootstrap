# Safe Zones — YouTube UI overlay pixel map

> YouTube interface thumbnail-in üzərinə **timestamp**, **channel overlay**, **progress bar** və digər UI elementləri yerləşdirir. Subject, üz, mətn bu zonalara düşərsə **kəsilir** və ya **gizlədir**. Bu fayl 1280×720 üzərində piksel xəritəsini saxlayır.

## Canvas: 1280 × 720 pixel (16:9, YouTube native)

> Aşağıdakı piksel koordinatları **industry approximation**-dur. YouTube UI overlay-i cihaz/tema/render-ə görə kiçik dəyişə bilər — kontekst koordinatları **konservativ** (geniş) saxlayır ki, hər halda kəsim olmasın.

```
       0px                                      1280px
        ┌─────────────────────────────────────┐  0px
        │  ╔════════════════════════════════╗ │
        │  ║                              ▓ ║ │   ← Top-right 12% (channel overlay)
        │  ║   SAFE ZONE                    ║ │
        │  ║   (subject, text, logo here)   ║ │
        │  ║                                ║ │
        │  ║                                ║ │
        │  ║                                ║ │
        │  ║                                ║ │
        │  ║                          ▓▓▓▓ ║ │   ← Bottom-right 16% (timestamp)
        │  ╚════════════════════════════════╝ │
        │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │   ← Bottom 8% (progress bar — mobile)
        └─────────────────────────────────────┘  720px
```

---

## Zone 1 — Bottom-right timestamp (sərt overlap zone)

**Koordinatlar (1280×720):**
- X: 1075 → 1280 (width: 205px = 16% of width)
- Y: 620 → 720 (height: 100px = 14% of height)

**Hesablama:** sağ-altda **~16% × ~14%** dikdörtbucaq

**Nə overlay olur:**
- Video duration timestamp (məs. "10:23")
- Yarı-şəffaf qara dikdörtbucaq (rgba(0,0,0,0.75)) + ağ mətn
- Padding ~8px

**Qayda:** Bu zonada:
- ❌ Mətn yerləşdirmə (overlay-ə qarışır)
- ❌ Subject (üz) yerləşdirmə (kəsilir)
- ❌ Logo yerləşdirmə (gizlədir)
- ⚠️ Mühüm vizual element (subject hand, brand product) → çox riskli
- ✅ Boş gradient, blurred background, decorative texture

**Vizual model üçün prompt:**
> "Reserve the bottom-right corner area (approximately 16% width × 14% height — pixel range x:1075-1280, y:620-720 on a 1280×720 canvas) as empty space. No text, no subject elements, no logo in this region — only background gradient or texture. This zone is occupied by YouTube's duration timestamp overlay."

---

## Zone 2 — Top-right channel overlay (mobile / Home feed)

**Koordinatlar (1280×720):**
- X: 1130 → 1280 (width: 150px = 12% of width)
- Y: 0 → 90 (height: 90px = 12.5% of height)

**Hesablama:** sağ-yuxarıda **~12% × ~12.5%** dikdörtbucaq

**Nə overlay olur:**
- Mobil Home feed-də channel logo + handle (məs. "@channelname")
- Şəffaf overlay (faktiki kanal logosu)

**Qayda:**
- ❌ Critical subject (host face) yerləşdirmə
- ⚠️ Mətn (məxsusi mobile-də gizlədilir)
- ✅ Decorative element, background texture, neutral gradient

**Vizual model üçün prompt:**
> "Reserve the top-right corner area (approximately 12% width × 12.5% height — pixel range x:1130-1280, y:0-90) as non-critical space. Avoid placing the host's face or primary text here. This region may display the channel's logo overlay in YouTube's mobile feed."

---

## Zone 3 — Bottom progress bar (mobile playback)

**Koordinatlar (1280×720):**
- X: 0 → 1280 (full width)
- Y: 660 → 720 (height: 60px = 8% of height — bottom strip)

**Nə overlay olur:**
- Mobil oynatma zamanı progress bar (qırmızı xətt + chrome)
- Yarı-şəffaf

**Qayda:**
- ❌ Critical text (alt strip-də başlıq mətni)
- ⚠️ Logo (gizlədilir)
- ✅ Background, gradient continuation, decorative

**Vizual model üçün prompt:**
> "Reserve the bottom 8% horizontal strip (pixel range x:0-1280, y:660-720) as non-critical space. Avoid placing primary text or logo in this strip. This region may display the YouTube progress bar during mobile playback."

---

## Safe zone master diagram (image-prompt-engineer brief-də)

Hər brief-də bu paragrafı daxil et:

```
SAFE ZONES (məcburi — heç bir subject/text/logo bu zonalarda):

1. Bottom-right corner: 205×100px area (x:1075-1280, y:620-720) — YT timestamp.
2. Top-right corner: 150×90px area (x:1130-1280, y:0-90) — channel overlay.
3. Bottom horizontal strip: 1280×60px (y:660-720) — progress bar.

Subject (host face), main text, and logo MUST be positioned in the central
safe area: x:80-1100, y:80-620 (approximate). Verify clause: if any
critical element overlaps with the listed zones, regenerate.
```

---

## Optimal placement zones (positive map)

```
        80px                                  1100px
        ╔═══════════════════════════════════╗  80px
        ║                                   ║
        ║   SUBJECT (face) here             ║
        ║   left third: x: 80-460           ║
        ║   center: x: 460-820              ║
        ║   right third: x: 820-1100        ║  ← right third tərk olunmalı
        ║                                   ║     timestamp-a yaxın
        ║                                   ║
        ║   TEXT here                       ║
        ║   center horizontal: y: 200-500   ║
        ║                                   ║
        ║   LOGO here                       ║
        ║   bottom-left: x: 80-200, y: 580-680  ← logo bottom-LEFT, never bottom-right
        ║                                   ║
        ╚═══════════════════════════════════╝  620px
```

### Subject placement
- **Sol üçdə-bir** (shock-reaction formula) — x: 80-460, üz center ~270
- **Mərkəz** (clean-center, peace-sign formula) — x: 460-820
- **Sağ üçdə-bir** — `⚠️ AVOID` — timestamp-a yaxın

### Text placement
- **Mərkəz horizontal** (clean-center) — x: 200-1080 width, y: 200-500
- **Sağ blok** (shock-reaction) — x: 500-1075, y: 150-500 (sağ-alt 16% boş)
- **Yuxarı strip** (real-vs-AI labels) — x: 80-1130, y: 80-150

### Logo placement
- **Bottom-LEFT default** — x: 80-200, y: 580-680
- Heç vaxt bottom-right (timestamp overlap)
- Heç vaxt top-right (channel overlay overlap)

---

## Verify clauses (image-prompt-engineer-ə ötürmək)

```
VERIFY CLAUSES (safe zones):
- Bottom-right 205×100px (x:1075-1280, y:620-720) empty — no text, no face, no logo
- Top-right 150×90px (x:1130-1280, y:0-90) empty of critical elements
- Bottom 60px strip (y:660-720) clear of primary text/logo
- Subject placement within central safe area x:80-1100, y:80-620
- Logo positioned bottom-LEFT (x:80-200, y:580-680), not bottom-right
- If any rule violated, regenerate
```

---

## Şort-form istisna (YouTube Shorts — 9:16)

YouTube Shorts thumbnail-də safe zone fərqlidir:
- Aspect: 9:16 (1080×1920)
- Bottom 25% — UI overlay (like, comment, share buttons sağ tərəfdə)
- Top 10% — channel handle

Bu skill **landscape 16:9 thumbnail** üçündür (regular video). Shorts üçün ayrı pipeline lazımdır — gələcəkdə `youtube-shorts-thumbnail-designer` skill-i ayrıca yaradılacaq.
