# Color Grading — Image Generation

> Post-production color treatment that defines visual mood. Specify in every prompt.

## Color grading concepts

### Hue
Color itself (red, blue, green).

### Saturation
Color intensity (vibrant vs muted).

### Luminance
Brightness of color.

### Contrast
Difference between dark and light.

## Common cinematic looks

### Teal & Orange (Hollywood blockbuster)
- Shadows pushed cool teal
- Highlights/skin pushed warm orange
- High saturation in those two
- Use: action, blockbuster, modern commercial

### Bleach Bypass (high contrast desaturated)
- Reduced saturation
- Increased contrast
- Cool overall
- Use: war films, gritty drama (Saving Private Ryan)

### Day-for-Night (blue tint)
- Heavy blue/cyan
- Reduced exposure
- Use: cost-saving night scenes, dreamy

### Warm Nostalgic (vintage)
- Warm tones throughout
- Slightly desaturated
- Faded blacks (lifted)
- Use: period, memory, romance

### Cold Clinical
- Desaturated overall
- Cool tones
- Sharp contrast
- Use: thriller, modern drama, sci-fi

### Pastel Soft (Wes Anderson)
- Specific color palette per scene
- Symmetric balance
- Slight warmth
- Use: stylized comedy-drama

### Neon Night (cyberpunk)
- Saturated pinks, cyans, magentas
- Very dark blacks
- Sharp falloff
- Use: cyberpunk, music video, night city

### Natural / Documentary
- Minimal grading
- Accurate skin tones
- Realistic
- Use: documentary, news, naturalism

### High Key (bright commercial)
- Lifted shadows
- Bright highlights
- Soft saturation
- Use: lifestyle commercial, comedy

### Noir Black & White
- B&W or monochrome
- Extreme contrast
- Deep shadows
- Use: classic noir, art film

## Color grading language for prompts

GOOD:
```
Cinematic color grading: shadows pushed cool teal, skin tones warm,
slight desaturation in midtones, deep blacks, vintage 1970s film
emulation reference (Kodak Portra 400)
```

GOOD:
```
Wes Anderson pastel palette: muted yellow walls, soft teal accents,
balanced symmetric color, slightly lifted blacks
```

BAD:
```
Nicely color-graded.
```

## Reference ladder (specific looks)

| Want this look | Reference | Key colors |
|----------------|-----------|------------|
| "Blade Runner 2049" | Roger Deakins | Amber, teal, smoke |
| "Mad Max Fury Road" | John Seale | Orange-yellow desert, teal night |
| "The Grand Budapest Hotel" | Robert Yeoman | Pastel pink, mint, cream |
| "Joker" | Lawrence Sher | Sickly green-yellow, orange |
| "Moonlight" | James Laxton | Magenta-cyan, naturalistic skin |
| "Drive" | Newton Thomas Sigel | Pink neon, deep shadows |
| "The Revenant" | Emmanuel Lubezki | Cool blue, white snow |
| "Her" | Hoyte van Hoytema | Warm orange-red |

## DO

- Reference film stocks: "Kodak Portra 400", "Fuji Velvia", "ARRI Alexa Reveal"
- Reference DPs: "shot like Roger Deakins", "Hoyte van Hoytema lighting"
- Specify saturation level (muted, balanced, vibrant)
- Mention black levels (lifted vs crushed)

## DON'T

- "Cinematic colors" alone (vague)
- "Beautiful grading" (subjective)
- Mix incompatible references ("Wes Anderson Mad Max look")
