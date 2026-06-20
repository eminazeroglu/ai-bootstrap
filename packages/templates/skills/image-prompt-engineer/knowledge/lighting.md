# Lighting — Image Generation

> Lighting is 50% of cinematic feel. Always specify lighting setup explicitly.

## MUST INCLUDE

- Key light direction and quality (hard/soft)
- Fill light or absence (high contrast vs balanced)
- Rim/back light (separation from background)
- Practical sources (visible lamps, screens, signs)
- Color temperature (warm/cool/mixed)
- Time of day / atmospheric condition

## Three-point lighting (default)

```
KEY LIGHT      — main light, defines subject
FILL LIGHT     — softens shadows on opposite side
RIM/BACK LIGHT — separates subject from background
```

Specify for each: direction (front, side, back), height, intensity, color.

## Color temperature scale (Kelvin)

| Source | Kelvin | Look |
|--------|--------|------|
| Candle / fire | 1500-2000K | Very warm orange |
| Tungsten bulb | 2700-3200K | Warm yellow |
| Sunset / sunrise | 3000-3500K | Golden warm |
| Halogen | 3200K | Warm |
| Studio standard | 3200K or 5600K | Mixed |
| Daylight noon | 5500-5600K | Neutral white |
| Overcast | 6500-7500K | Cool white |
| Deep shade / blue hour | 8000K+ | Very cool blue |

Mix sources for visual interest:
- Warm key + cool window = classic cinematic
- Cool moonlight + warm interior = night drama

## Lighting moods

### Golden Hour (cinematic warm)
- Color: 3500K
- Direction: low side angle (sun position)
- Quality: soft (atmosphere diffuses)
- Use: romantic, hopeful, ending scenes

### Blue Hour (melancholic cool)
- Color: 6500K+
- Direction: ambient, no hard source
- Quality: very soft
- Use: melancholic, contemplative, dawn

### Tungsten Interior (warm cozy)
- Color: 3200K
- Direction: from above (ceiling lamps)
- Quality: hard if direct, soft if shaded
- Use: home, diner, bar, intimate

### Daylight Through Window (clean modern)
- Color: 5600K
- Direction: side
- Quality: soft (large source)
- Use: office, modern home, morning

### Practical Only (realistic)
- Color: mixed
- Direction: from visible sources
- Quality: depends on source
- Use: realism-first scenes

### Chiaroscuro (high contrast drama)
- Color: variable
- Direction: extreme single source
- Quality: hard
- Fill: minimal or none
- Use: noir, thriller, drama

### High Key (bright soft)
- Color: 5600K daylight
- Direction: even, multiple sources
- Quality: very soft
- Fill: heavy (no shadows)
- Use: comedy, commercial, lifestyle

### Low Key (dark mood)
- Color: warm, often 3200K
- Direction: single side source
- Quality: hard
- Fill: minimal
- Use: thriller, horror, drama

### Neon Night (saturated colors)
- Color: highly mixed (pink, cyan, magenta)
- Direction: from signs/practicals
- Quality: variable
- Use: cyberpunk, music video, night city

## Lighting language for prompts

GOOD:
```
Warm tungsten ceiling light at 3200K creates soft key on subject from
upper-left. Cool blue daylight (5600K) spills through window behind,
acting as rim. No fill light — shadows remain dark. Practical neon
sign just out of frame casts subtle pink glow on right side.
```

BAD:
```
Nice lighting, atmospheric mood.
```

## Avoid

- "Cinematic lighting" alone (too vague — describe it)
- "Dramatic" without specifying contrast
- "Natural light" without time of day
- "Studio lighting" without setup type

---

## Period lamp anatomy — must be era-pure (no hybrid lamps)

> **HARD RULE.** When a period scene specifies a practical lamp, the lamp's **anatomical parts** must all belong to the same lighting era. AI image models routinely render **hybrid lamps** — e.g., a kerosene fuel reservoir + visible flame at the bottom, BUT topped with an Edwardian electric-era frosted-glass dome shade. The "lighting technology choice" (kerosene vs. electric) is correct, but the rendered object is an anachronistic Frankenstein. Choosing the right *type* of lamp is not enough — you must also describe its **period-correct parts** explicitly, and explicitly forbid the parts that belong to the other era.

Use this rule together with the city-electrification timeline (see `image-validator/knowledge/physical-realism-checks.md` A9.7 and the realism rule "lit lamp ⇒ darker ambient" in `physical-realism.md`). First decide *which* lighting tech the year + city + building tier allows; then describe the lamp with anatomically pure parts for that tech.

### 1850s–1880s kerosene oil lamp — period-correct anatomy

- **BASE:** brass OR clear/colored glass FUEL RESERVOIR (holds the kerosene) — bulbous or columnar, usually 10–20 cm tall
- **WICK MECHANISM:** flat or round (Argand-style) cotton wick rising from the reservoir, with a small brass WICK ADJUSTMENT KNOB on the side
- **CHIMNEY:** CLEAR GLASS CHIMNEY (curved/bulbous at the base, narrowing toward the top) — controls airflow and protects the flame. NEVER frosted, NEVER a colored shade over the chimney itself
- **FLAME:** VISIBLE yellow-orange flame inside the clear chimney (tall, flickering)
- **OPTIONAL diffuser:** simple brass REFLECTOR RING at chimney top, OR a metal SHADE pointing light downward, OR no shade at all
- **WHAT NOT TO ADD (era-mixing forbidden):** frosted-glass round/dome shade above (electric Edwardian style), green glass banker's-lamp shade (1900s+ electric desk lamp), Tiffany stained-glass shade (1890s+ electric), visible incandescent bulb, on/off switch, pull-chain, electrical cord

### 1880s–1910s early electric lamp — period-correct anatomy

- **BASE:** brass or cast-iron pedestal
- **NO fuel reservoir** (it runs on electricity)
- **NO wick, NO chimney, NO visible flame**
- **BULB:** early carbon-filament Edison bulb (visible warm yellow-orange glow, ~2400–2700K) — often visible THROUGH the shade
- **SHADE:** opal-glass dome, green-glass banker style, or Tiffany stained-glass — these are PERIOD-CORRECT for electric, NOT for kerosene
- **CORD:** visible cloth-wrapped electrical cord running off-frame
- **WHAT NOT TO ADD:** fuel reservoir bowl, wick adjustment knob, glass chimney with flame inside, kerosene-style brass fuel base

### Prompt-writing templates (paste verbatim, adapt the surrounding scene)

**Kerosene scene template:**
```
A period-correct KEROSENE OIL LAMP on the desk: brass fuel reservoir base
(holding kerosene fuel), small brass wick-adjustment knob on the side, a
CLEAR GLASS BULBOUS CHIMNEY above the wick (curved at the bottom, narrowing
toward top), with a VISIBLE YELLOW-ORANGE FLAME inside the chimney casting
warm ~3000K light. NO frosted shade, NO electric bulb, NO shade above the
chimney (or only a simple brass reflector ring). Period-pure kerosene
anatomy — NO Edwardian electric-era shade hybridized onto a kerosene base.
```

**Early electric scene template:**
```
A period-correct EARLY ELECTRIC DESK LAMP: brass pedestal base, NO fuel
reservoir, NO wick, NO chimney, NO visible flame. An early Edison
carbon-filament bulb visible through an opal-glass / green-glass /
Tiffany-style shade, casting warm yellow tungsten light (~2700K). Cloth-
wrapped electrical cord running off-frame. Period-pure electric anatomy
— NO kerosene reservoir, NO wick mechanism, NO glass chimney with flame.
```

### Why this rule exists

In any pre-electric period kadr (and in early-electric kadr too), the model will hybridize anatomies by default because its training data mixes "antique lamp" reference images across eras. The fix is to (a) name the era explicitly, (b) enumerate the required parts, and (c) enumerate the forbidden parts. Choosing kerosene vs. electric is only half the work — anatomy is the other half. See also `image-validator/knowledge/physical-realism-checks.md` checkpoint A9.9 for the validation-side detection routine.
