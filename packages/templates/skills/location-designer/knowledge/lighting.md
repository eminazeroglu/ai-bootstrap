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
