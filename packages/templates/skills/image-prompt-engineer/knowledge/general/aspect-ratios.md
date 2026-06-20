# Aspect Ratio Decision Guide — Universal

> **HARD RULE — every image prompt MUST explicitly declare an aspect ratio at the end.** Never leave aspect to model default. The aspect is chosen ONCE at project intake (showrunner Addım 1B) and inherited by every downstream skill — director, storyboard-builder, image-prompt-engineer, video-prompt-engineer. Per-cell aspect drift is forbidden.

This guide is **project-agnostic**. It gives the decision criteria; each project picks its aspect ratio during showrunner intake and locks it in `WORKFLOW.md` → `Aspect:` field. Every prompt then inherits that aspect — no per-cell guessing, no model defaults.

---

## Why this rule exists

Real production incident (2026-05-21): A documentary project's first 6+ cell prompts were written at **21:9 cinemascope** by default. The actual delivery target was **YouTube + community-event projector**, which is **16:9 native**. All 6 prompts had to be rewritten or post-letterboxed. Root cause: skill defaulted to "cinematic = 21:9" without checking the delivery target.

**Lesson:** Default to **16:9**, not 21:9. Cinemascope (21:9) is **cinema-only** — theatrical release, festival, prestige HDR streaming. Everything else (YouTube, TV, web, projector, social) is 16:9 native and renders 21:9 as letterboxed bars.

---

## Decision table — delivery target → aspect ratio

| Delivery target | Aspect ratio | Why this aspect |
|---|---|---|
| **YouTube standard video** | **16:9 widescreen** | Native player aspect. 21:9 gets letterboxed (black bars top + bottom). |
| **TV broadcast** (any region) | **16:9 widescreen** | Industry standard since ~2009. |
| **Web embed / corporate / event projector** | **16:9 widescreen** | All standard projectors and web players are 16:9 native. |
| **Documentary delivered to community event / streaming** | **16:9 widescreen** | Plays correctly on every device without letterbox. |
| **Reel / TikTok / IG Story / YouTube Shorts / vertical mobile** | **9:16 vertical** | Mobile-first social, vertical viewport. |
| **IG feed post (square)** | **1:1 square** | IG feed native; older convention but still common. |
| **IG portrait feed post** | **4:5 portrait** | Modern IG feed default; takes more vertical real estate than 1:1. |
| **Theatrical cinema release** | **21:9 cinemascope** (2.39:1) | True cinema aspect; designed for theatre screens. |
| **Film festival submission** | **21:9 cinemascope** (or 1.85:1 flat) | Festival projection standards. |
| **Prestige streaming HDR cinema** (e.g. Netflix premium cinematic) | **21:9 cinemascope** | Cinema-grade delivery. |
| **Magazine / print spread / editorial card** | **varies — ASK USER** | Project-specific; depends on layout. |
| **Character anchor / 6-view turnaround reference sheet** | **1:1 square** | Multi-panel grid is an internal asset, independent of project aspect (see `character-designer` SKILL.md HARD RULE). |
| **Character outfit variant / single-figure reference** | **inherit project aspect** | Reference is for downstream cells, so it adopts project aspect. |

---

## MOST PROJECTS = 16:9

**Default to 16:9 unless the project explicitly states one of:**
- Theatrical cinema release → 21:9
- Film festival submission → 21:9 (or 1.85:1)
- Prestige HDR streaming cinema → 21:9
- Mobile vertical (reel/short/story) → 9:16
- IG square feed → 1:1

If unsure → ask the user **before** writing any prompt. Never assume "cinematic look = 21:9".

---

## Per-aspect composition implications

Choosing the aspect ratio changes how every shot is framed. Same scene, different aspect = different headroom, different subject sizing, different background reveal.

### 16:9 widescreen (1.78:1) — THE DEFAULT

**Frame proportions:** moderate horizontal, balanced vertical.

- **Wide establishing:** subject 35-50% frame width. Sky/ceiling AND ground visible. Comfortable vertical context.
- **Portrait / face shots:** head and shoulders fit naturally. Small headroom at top. Eye-line on upper third.
- **OTS (over-the-shoulder):** shoulder/back of head occupies meaningful vertical space. Subject sits centered-to-third.
- **Macro / detail (page, hand, object):** subject centered; horizontal trim minimal.
- **Lateral pan in post:** still works — crop window slides L→R inside the 16:9 frame; pan range is shorter than 21:9 but smooth.
- **Best for:** documentary, YouTube, TV, web, projector, corporate, multi-platform.

### 21:9 cinemascope (2.39:1) — CINEMA ONLY

**Frame proportions:** strongly horizontal, narrow vertical.

- **Wide establishing:** subject 25-40% frame width. Sky and ground COMPRESSED — vertical context minimal. Landscape rules.
- **Portrait / face shots:** face occupies less vertical space; needs more horizontal context around it (off-center placement common). Headroom often dropped.
- **OTS:** shoulder takes more horizontal real estate; subject pushed further from center.
- **Macro / detail:** strong horizontal subject (book spine, weapon, line of objects) reads well; tall narrow subjects feel cramped.
- **Lateral pan in post:** native — designed for it. Sweeping vista moves.
- **Best for:** theatrical, festival, prestige drama, large-format cinema.

### 9:16 vertical (0.5625:1) — MOBILE SOCIAL

**Frame proportions:** strongly vertical, narrow horizontal.

- **Wide establishing:** subject 50-70% frame width (subject dominates because horizontal context is squeezed). Vertical space lets you stack foreground + mid + background up the frame.
- **Portrait / face shots:** face fills most of frame; close framing is the default. Headroom often increased to leave space for text overlays at top.
- **OTS:** rare — vertical aspect doesn't suit OTS. Prefer direct close-up or POV.
- **Macro / detail:** vertical subjects (face, body, tall objects) read well; horizontal subjects feel cropped at edges.
- **Lateral pan in post:** awkward — vertical frame doesn't support horizontal motion. Vertical pan / tilt works better.
- **Best for:** Reels, TikTok, YouTube Shorts, IG Story, mobile-first social.

### 1:1 square (1:1) — IG FEED + REF SHEETS

**Frame proportions:** equal both axes.

- **Wide establishing:** subject 40-50% frame width. Symmetrical compositions work best.
- **Portrait / face shots:** head + shoulders fit; eye-line center or upper third.
- **OTS:** works but feels static; both subjects roughly equal weight.
- **Multi-panel grid (6-view reference sheet):** ideal — 2x3 or 3x2 panel layouts fit naturally in 1:1.
- **Best for:** IG feed posts, character reference sheets, symmetrical compositions.

### 4:5 portrait (0.8:1) — IG PORTRAIT FEED

**Frame proportions:** slightly vertical, near-square.

- **Wide establishing:** similar to 1:1 but with extra vertical breathing room.
- **Portrait / face shots:** excellent for single-figure portraits — face capture is generous, body extends down into frame.
- **Macro:** vertical objects read well.
- **Best for:** IG portrait feed posts, magazine portrait editorial.

---

## How to declare aspect ratio in a prompt

Every image prompt ends with an explicit aspect declaration. Model-specific syntax:

| Model | Syntax |
|---|---|
| **Midjourney v7** | `--ar 16:9` (parameter) |
| **Flux Pro / SD 3.5** | `aspect_ratio: "16:9"` (API param) + sentence in prompt: "Aspect ratio: 16:9 widescreen." |
| **Nano Banana 2 / Nano Banana Pro** | Sentence in prompt: "Aspect ratio: 16:9 widescreen." |
| **GPT-Image-2** | `size: "1792x1024"` (API param — closest preset to declared aspect) + sentence in prompt: "Aspect ratio: 16:9 widescreen." |
| **Imagen 4** | `aspectRatio: "16:9"` (API param) + sentence in prompt |
| **Ideogram v3** | `aspect_ratio: "16:9"` (API param) + sentence in prompt |
| **Recraft v3** | `size: "1820x1024"` (closest preset) + sentence in prompt |

**Universal rule:** ALWAYS declare aspect in BOTH the API parameter AND a final sentence in the prompt text. Some models ignore one or the other; declaring both is the only reliable way.

**Sentence template (paste verbatim at end of prompt):**
```
Aspect ratio: <16:9 widescreen / 21:9 cinemascope / 9:16 vertical / 1:1 square / 4:5 portrait>.
```

---

## Decision workflow (apply BEFORE writing any prompt)

```
Step 1: Read WORKFLOW.md → Aspect: field
   ↓
Step 1a: Is the aspect field present?
   - YES → use it. Done.
   - NO → STOP. Ask user: "What's the delivery target?
     (YouTube → 16:9 / Cinema → 21:9 / Reel → 9:16 /
      IG square → 1:1 / Other → tell me)"
   ↓
Step 2: Write prompt with the declared aspect.
   - End the prompt with: "Aspect ratio: <X>."
   - Set the API parameter to match.
   ↓
Step 3: Verify after writing — does the aspect declaration appear in the
   final prompt? If missing → add it before delivering.
```

---

## Common errors to avoid

### Error 1 — "Cinematic = 21:9" assumption
"Cinematic" is a **visual style** (anamorphic look, controlled lighting, film stock), NOT an aspect ratio. A 16:9 documentary can absolutely be "cinematic." Do not equate cinema look with cinema aspect.

### Error 2 — Defaulting to model preset
GPT-Image-2 defaults to 1024x1024 (1:1). Midjourney defaults to 1:1. If you don't declare aspect, you get the model's preset — often wrong for the project.

### Error 3 — Per-cell aspect drift
Every cell in a project MUST use the same aspect. If Cell 1 is 16:9 and Cell 2 is 21:9, they cannot be cut together. Aspect is a project-level decision, not a per-cell decision.

### Error 4 — Forgetting the API parameter
Declaring aspect in the prompt text alone is unreliable — some models ignore prompt aspect and use the API parameter only. Always set BOTH.

### Error 5 — Choosing aspect to match the location
"This is a wide landscape, so 21:9." NO. Aspect is chosen by delivery target, not by scene content. A wide landscape in a YouTube documentary is still 16:9 — just frame the landscape to read inside 16:9.

### Error 6 — Mid-project aspect change
Once aspect is locked in `WORKFLOW.md`, all already-generated assets (character refs, location refs, cells) are tied to it. Changing aspect mid-project means re-generating everything or post-cropping (with loss). Lock the aspect at intake, not later.

---

## Cross-references

- **Showrunner intake:** `showrunner/SKILL.md` → Addım 1B captures aspect ratio as the second project-level question.
- **Image prompt writing:** `image-prompt-engineer/SKILL.md` → "Davranış qaydaları" → Aspect ratio HARD RULE.
- **Storyboard cell inheritance:** `storyboard-builder/SKILL.md` → every cell prompt inherits project aspect, no per-cell override.
- **Director shot composition:** `director/SKILL.md` → framing decisions adapt to declared aspect.
- **Image validation:** `image-validator/knowledge/prompt-consistency-checks.md` → F-16 checks aspect ratio match against project standard.
- **Character reference sheet exception:** `character-designer/SKILL.md` → 6-view turnaround stays 1:1 regardless of project aspect.

---

*Version: 1.0 | Created: 2026-05-21 | Trigger: real production incident — project defaulted to 21:9 when delivery was 16:9 YouTube/event.*
