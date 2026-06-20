# Lens Selection — Image Generation

> When generating image prompts, lens choice impacts subject feel. Always specify focal length and aperture.

## Quick lens matrix by shot

| Shot type | Focal length | Aperture | Reason |
|-----------|--------------|----------|--------|
| ECU (eye, hand) | 85-100mm or macro | f/2.8 | Compression + sharpness |
| Close-up portrait | 85mm | f/1.4-f/2.0 | Subject isolation |
| Medium shot | 50mm | f/2.0-f/2.8 | Natural perspective |
| Two-shot conversation | 35mm | f/2.8 | Both subjects in DOF |
| Wide environmental | 24-35mm | f/4-f/5.6 | Subject + context |
| Establishing | 16-24mm | f/5.6-f/8 | Maximum environment |
| POV | 8-16mm wide | f/4 | Wide perspective |
| Anamorphic cinematic | 32-50mm anamorphic | T2.3 | Cinemascope feel |

## Aperture decision tree

```
Subject isolation priority? → f/1.2 - f/1.4
Cinematic shallow DOF? → f/2.0
Environment matters? → f/2.8 - f/4
Group / wide shot? → f/5.6 - f/8
Maximum sharpness? → f/8 - f/11
Architectural / hyperfocal? → f/11+
```

## Lens character for prompts

When you want this feel, specify this lens:

| Want | Specify |
|------|---------|
| Warm vintage glow | Cooke S4 |
| Razor sharp clinical | Zeiss Master Prime |
| Anamorphic flares | Cooke / Kowa Anamorphic |
| Modern premium | ARRI Signature Prime |
| Vintage swirly bokeh | Helios 44-2 |
| Hybrid mirrorless cinema | Sony G Master, Canon RF |
| Macro detail | 100mm macro lens |
| POV action | GoPro lens / 8mm fisheye |

## Prompt examples

### Portrait close-up
```
Shot on ARRI Alexa Mini LF with Cooke S4 85mm at T2.0, medium close-up,
shallow depth of field, soft Cooke bokeh in background, subject in
sharp focus.
```

### Wide establishing
```
Shot on Sony Venice 2 with Cooke Anamorphic 32mm at T2.3, extreme wide
establishing shot, 2.39:1 cinemascope aspect, horizontal lens flares
visible from off-screen sun.
```

### Documentary medium
```
Shot on Sony FX9 with Sony G Master 35mm at f/2.8, medium shot,
naturalistic perspective, minimal depth of field separation.
```

### Mobile vlog
```
Captured on iPhone 15 Pro at 4K ProRes, ultra-wide 13mm equivalent
lens at f/2.2, vlog framing.
```

## DON'T

- Don't say "with a nice lens"
- Don't mismatch focal length to shot type (50mm for ECU is wrong)
- Don't always max out aperture (f/1.2 is bad for groups)
- Don't mix anamorphic with consumer cameras

## Cross-reference

For full lens database: [shared/lens-knowledge/lenses.json]
For camera + lens pairing: [shared/lens-knowledge/selection-guide.md]
