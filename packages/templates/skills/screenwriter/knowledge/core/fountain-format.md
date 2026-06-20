# Fountain Format — Script Core

> Fountain is the industry-standard plain-text screenplay format. Like Markdown for screenplays. The system uses Fountain internally for parseable scripts.

## Why Fountain

- Plain text (version-controllable, AI-readable)
- Parseable (scenes, characters, locations auto-extracted)
- Industry standard (Highland, Final Draft import)
- Readable as-is

## Core syntax

### Scene Heading (Slug Line)
```
INT. KAFETERİYA - GECƏ
EXT. KÜÇƏ - GÜNDÜZ
INT./EXT. AVTOMOBIL - DAWN
```

Pattern: `INT.` or `EXT.` + LOCATION + ` - ` + TIME

### Action
```
ƏLİ pəncərə yanında oturub. Yağış yağır pəncərəyə.
```

Plain text, present tense, third person. Describes what is seen and heard.

### Character (introducing dialogue)
```
ƏLİ
```

ALL CAPS. New line. The character about to speak.

### Dialogue
```
ƏLİ
O qayıtmayacaq.
```

Indented under character (in screenplay rendering). What they say.

### Parenthetical
```
ƏLİ
(öz-özünə)
O qayıtmayacaq.
```

Stage direction within dialogue. Use sparingly.

### Transition
```
> CUT TO:
> FADE OUT.
> SMASH CUT TO:
```

Transitions between scenes. End-of-scene action.

### Centered text
```
> THE END <
```

For special centered moments.

### Notes (will not appear in final)
```
[[This is a note for the writer, not in final script]]
```

### Section / Synopsis (organizational)
```
# Act 1
## Sequence A
```

## Sample full Fountain

```fountain
Title: Yağışlı Axşam
Credit: Written by
Author: Emin
Draft date: 4/5/2026

FADE IN:

INT. KAFETERİYA - GECƏ

Yağış pəncərəyə vurur. Diner sakitdir. ƏLİ (35), atletik, çal palto-da,
pəncərə yanında oturub. Çay fincanını əlində fırladır.

ƏLİ
(öz-özünə)
O qayıtmayacaq.

Qapı zəngi səslənir. LEYLA (30), saçları islaq, içəri girir.
Onun gözü dərhal Əliyə düşür.

LEYLA
Səhv edirsən.

Əli başını qaldırır. Donur.

> CUT TO:

EXT. KÜÇƏ - DAVAMI

İki adam pəncərə kənarında. Yağış davam edir.

FADE OUT.
```

## Auto-extraction rules

System parses Fountain to extract:
- **Scenes**: every `INT.` / `EXT.` heading
- **Characters**: every ALL-CAPS name introducing dialogue
- **Locations**: text between `INT./EXT.` and ` - `
- **Time of day**: text after ` - `
- **Action**: paragraph text not under character

This automated extraction populates `characters[]` and `locations[]` in DB.

## Multi-language note

Fountain works in any language. Use language of script naturally:
- Azerbaijani scenes = `İNT. KAFETERİYA — GECƏ` (AZ-native, tövsiyə) və ya `INT. KAFETERİYA - GECƏ` (klassik parser-compatible)
- English scenes = `INT. CAFETERIA - NIGHT`
- Russian scenes = `ИНТ. КАФЕТЕРИЯ - НОЧЬ`

System detects language and parses accordingly.

## AZ-native Fountain (tam Azərbaycanca ssenari üçün)

Bu layihənin default qaydası: **ssenari tam AZ olur** (oxunan sənəd). Aşağıdakı AZ-native konvensiyalar Fountain spirit-inə uyğundur:

| Element | Klassik (EN) | AZ-native (tövsiyə) |
|---|---|---|
| Interior | `INT.` | `İNT.` |
| Exterior | `EXT.` | `EKS.` |
| Interior/Exterior | `INT./EXT.` | `İNT./EKS.` |
| Cut | `> CUT TO:` | `> KƏSİK:` |
| Smash cut | `> SMASH CUT TO:` | `> SƏRT KƏSİK:` |
| Dissolve | `> DISSOLVE TO:` | `> SOLUR:` |
| Cut to black | `> CUT TO BLACK:` | `> QARANLIĞA KƏSİK:` |
| Fade in | `FADE IN:` | `QARANLIQDAN AÇIL:` |
| Fade out | `FADE OUT.` | `QARANLIĞA SOLUR.` |
| Voice-over | `(V.O.)` | `(SƏS ARXASI)` |
| Off-screen | `(O.S.)` / `(O.C.)` | `(KADRDAN KƏNAR)` |
| Time of day separator | ` - ` | ` — ` (em-dash) |

Tam AZ Fountain nümunəsi (`İNT./EKS.` + AZ transition + AZ parenthetical):

```fountain
QARANLIQDAN AÇIL:

İNT. AYTACIN YATAQ OTAĞI — SÜBHDƏN ƏVVƏL

Qaranlıq otaq. Telefonun mavi parıltısı. AYTAC (28) çarpayının kənarında oturur.

                    AYTAC (SƏS ARXASI)
                    (sakit, intim)
              Bəzi səhərlər ağırdır.

> KƏSİK:

EKS. PARK YOLU — SÜBH

Soyuq mavi işıq. Aytac qaçır. Nəfəs görünür.

QARANLIĞA SOLUR.
```

**Parser qeydi:** auto-extraction üçün parser həm `INT./EXT.` həm də `İNT./EKS.` prefikslərini tanımalıdır. Layihə default-u — AZ-native.

## Common mistakes

- Forgetting INT./EXT. prefix
- Missing time of day after ` - `
- Lowercase character names (must be ALL CAPS)
- Mixing dialogue and action in same paragraph

## Conversion from natural prose

If user writes plain prose, system uses Claude to convert to Fountain. Claude will:
1. Identify scene breaks → add INT./EXT. headings
2. Identify dialogue → CAPS character names + lines
3. Identify action → keep as paragraph
4. Add transitions where appropriate
