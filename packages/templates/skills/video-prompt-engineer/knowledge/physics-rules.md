# Physics Rules — Video Generation

> What AI video models can and cannot simulate physically. Understanding these saves regenerations.

## What works WELL

### Gravity (basic)
- Objects fall down
- Hair hangs naturally
- Clothes drape
- Liquid pours into containers

### Walking and standing
- Single person walking on flat surface
- Standing up from sitting
- Sitting down
- Natural gait

### Subtle interactions
- Picking up small objects
- Drinking from cup (if not too detailed)
- Opening doors slowly
- Touching face

### Wind effects
- Hair blowing
- Curtains moving
- Leaves rustling
- Subtle dust

### Rain and snow
- Falling precipitation
- Pooling water (slow)
- Snow accumulation (static)

### Fire (small scale)
- Candle flames
- Stove burner
- Fireplace (don't expect detail)

## What works POORLY

### Complex liquid dynamics
- Splashing
- Pouring with detail
- Drinking (often weird)
- Water sports

### Collision physics
- Things bouncing realistically
- Chain reactions
- Domino effects

### Mass and weight
- Light vs heavy objects look similar
- Throwing/catching
- Lifting heavy items

### Object permanence in motion
- Fast-moving objects can disappear
- Held objects can vanish mid-clip
- Background props shift

### Multi-body interactions
- Two people fighting
- Sports plays
- Crowded scenes
- Hugs/intimate touch can look uncanny

### Fast vehicle motion
- Cars at speed
- Aircraft
- Trains
- Generally avoid showing fast vehicles

### Particle effects
- Smoke (basic ok, complex fails)
- Explosions (artificial-looking)
- Dust clouds

## What FAILS

### Defying gravity intentionally
- Floating objects
- Levitation
- Surreal scenes (unless model trained for it)

### Real-time text rendering
- Text typing on screen
- Signs that change
- Captions overlays (use post-production)

### Reflections
- Mirror reflections of moving subjects
- Water reflections of action
- Glass surface reflections

### Transparent materials in motion
- Glass breaking
- Water drops on lens
- Steam interacting with objects

### Hands doing detailed work
- Writing
- Typing on keyboard
- Crafts
- Tying shoelaces

### Animals (complex)
- Animal movement is generally weak
- Non-mammals especially fail
- Birds flying, fish swimming = artifacts

## Workarounds

### When physics fails
- Cut around the moment (show before/after, not during)
- Use static camera + subtle motion
- Hide complex action behind subject (close-up reaction)
- Use practical effects in post

### When animals needed
- Static animal poses work better
- Avoid complex behavior
- Show animal briefly, not as main subject

### When text needed
- Add in post-production
- Pre-render text on signs/screens

## Prompt awareness

DON'T request things models can't do:
- "She catches the ball mid-air with grace"
- "He pours wine perfectly into glass"
- "The cat jumps over the fence"
- "Two people embrace with realistic detail"

DO request what they can:
- "She holds the ball, looking at it"
- "He lifts the wine glass to his lips" (don't show drinking)
- "The cat sits on the fence, looking down"
- "Two people stand facing each other, hands clasped"

## Default principle

When unsure: **less physics**. Static moments, subtle motion, suggested action better than attempted complex physics.
