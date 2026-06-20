# Camera Recommendation Engine — Logic Rules

> How the system picks the right camera setup for any given shot context.

## Input context

```typescript
{
  shotType: 'wide' | 'medium' | 'close-up' | 'extreme-close-up' | 'over-shoulder' | 'pov' | 'establishing',
  mood: string,            // 'melancholic', 'epic', 'tense', 'warm', 'cold'
  subject: string,         // 'portrait', 'landscape', 'action', 'product'
  budget: 'high-end' | 'mid' | 'prosumer' | 'consumer',
  format: string,          // 'narrative-film', 'commercial', 'reel', 'documentary'
  lookReference?: string   // 'cinematic', 'documentary', 'social-media'
}
```

## Decision tree

### Step 1: Filter by budget tier
- high-end → ARRI / RED / Sony Venice
- mid-high → Sony FX9, RED Komodo, Canon C500
- mid → Sony FX3, BMD URSA
- prosumer → Sony A7S III/FX3, Canon R5
- consumer → iPhone, GoPro, DJI

### Step 2: Match by format
- narrative-film → ARRI Alexa family
- premium commercial → Sony Venice / ARRI Alexa
- music video → RED V-Raptor (sharpness) or ARRI (filmic)
- documentary → Sony FX9 (autofocus) or Canon C500
- reel/TikTok → Sony A7S III, FX3, or iPhone Pro

### Step 3: Match look to mood
- melancholic / drama → ARRI (filmic warmth)
- epic / sci-fi → RED (sharpness, vibrance) or Sony Venice
- documentary realism → Canon (color science) or Sony FX9
- vintage / nostalgia → Film cameras (Arriflex, Aaton)

## Output

```typescript
{
  camera: { /* full Camera object */ },
  lens: { /* see lens-knowledge */ },
  aperture: 'f/1.4' | 'f/2.0' | 'f/2.8' | 'f/4' | 'f/5.6',
  reasoning: {
    cameraReason: string,
    lensReason: string,
    apertureReason: string
  }
}
```

## Sample recommendations

### Portret + drama + high-end
- ARRI Alexa Mini LF + Cooke S4 85mm @ f/1.4
- Reason: Filmic warmth, beautiful skin, isolated subject

### Establishing wide + epic
- ARRI Alexa Mini LF + Cooke Anamorphic 32mm @ T2.3
- Reason: Anamorphic flares, epic 2.39:1 scale

### TikTok storytime + casual
- Sony FX3 + Sony G Master 24mm @ f/2.8
- Reason: Mobile-friendly, vlog framing, S-Log3

### Brand product shot
- Sony Venice 2 + ARRI Signature Prime 50mm @ f/2.0
- Reason: Premium product look, neutral color

## Override rules

User can manually override any recommendation. The recommendation engine is **opinionated default**, not a constraint.
