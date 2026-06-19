---
name: ai-bootstrap — locked architectural decisions
description: Mərhələ A sonunda Eminin verdiyi 6 qətiyyətli qərar
last_updated: 2026-06-19
status: LOCKED
---

# Locked Architectural Decisions

Bu sənəddə Mərhələ A sonunda **Eminin verdiyi qərarlar** rəsmiləşdirilir. Bu qərarlar **Mərhələ B-də implementasiya olunur**.

## Decision #001 — Project Name

**Qərar**: `ai-bootstrap`

**Səbəb**: Aydın, descriptive, "AI infrastructure bootstrap" mənası. Google-friendly.

**Alternativlər nəzərdən keçirildi**:
- `claude-brain` (ilkin) — saxlanmadı
- `claude-os`, `mind-kit`, `ai-companion`

## Decision #002 — License

**Qərar**: MIT

**Səbəb**: 
- Bütün oxşar AI proyektlər (Mem0, alirezarezvani/claude-skills, Notion MCP) MIT istifadə edir
- Sadə, problemsiz, fork-friendly
- Sənin halın üçün patent əhəmiyyət kəsb etmir
- Maximum adoption potential

**Alternative**: Apache 2.0 (patent protection) — kiçik proyekt üçün overkill

## Decision #003 — Vertical Specialist Agents

**Qərar**: BÜTÜN xüsusi sahə köməkçiləri **default avtomatik install** olunur

**Daxildir**:
- `legal-researcher` (Harvey-style)
- `healthcare-compliance` (Hippocratic-style, HIPAA)
- `finance-analyst` (SaaS metrics, DCF)
- `education-curriculum`
- `e-commerce-optimizer`
- `real-estate-analyzer`
- `gaming-balance-designer`
- `fintech-compliance`

**Səbəb (Eminin yanaşması)**: "Hər ehtimala qarşı hər şey var" — istifadəçi sonra lazımsız olanı söndürə bilər. Default-da hamısı.

## Decision #004 — C-Level Advisory Agents

**Qərar**: BÜTÜN 10 C-Level məsləhətçi **default avtomatik install** olunur

**Daxildir**:
1. `ceo-advisor` — ümumi strategiya
2. `cto-advisor` — texniki qərarlar
3. `cfo-advisor` — maliyyə, büdcə
4. `cmo-advisor` — marketinq strategiya
5. `coo-advisor` — əməliyyat
6. `cro-advisor` — satış
7. `chro-advisor` — insan resursları
8. `ciso-advisor` — təhlükəsizlik
9. `gc-advisor` — General Counsel (hüquqi)
10. `founder-mode` — yeni sahibkar üçün

**Səbəb**: Sahibkar/founder olan istifadəçi üçün **tam komanda** dərhal hazır olur.

## Decision #005 — Memory Storage Architecture

**Qərar**: Markdown faylları + git (Layer 2 base)

**Struktur**:
```
~/.claude/knowledge/
├── user-profile.md              # Sən kimsən
├── mistakes-log.md              # Hər səhv + düzəliş
├── verified-facts.md            # Araşdırılmış faktlar + mənbə
├── coaching-mode.md             # Rol/davranış
├── languages/                   # Dil kitabları
│   ├── az.md
│   ├── ru.md
│   ├── en.md
│   ├── tr.md
│   └── es.md
└── projects/                    # Layihə manifest
    ├── README.md
    └── <slug>.md per project
```

**Səbəb**:
- **Sürətli** — Markdown+git 25-50× sürətli vector DB-dən <100K entry-də (Extency 2026, memweave araşdırması)
- **Human-readable** — Emin birbaşa açıb oxuya bilər, səhv görsə düzəldə bilər
- **Portable** — git ilə backup + sync
- **No vendor lock-in** — gələcəkdə Mem0/SQLite əlavə etmək olar (composable)

**Gələcək opt-in upgrade**:
- SQLite FTS5 index — 10K+ entry-də sürət artır
- Mem0 vector layer — 100K+ entry-də semantic search

## Decision #006 — Multilingual Copywriter Architecture

**Qərar**: Universal `multilingual-copywriter` skill + ayrı dil knowledge faylları

**Struktur**:
```
~/.claude/skills/multilingual-copywriter/SKILL.md
~/.claude/knowledge/languages/
├── az.md   # AZ qrammatika + reklam standartları
├── ru.md   # RU rules
├── en.md   # EN rules (Ogilvy, PAS, AIDA, BAB)
├── tr.md   # TR rules
└── es.md   # ES rules
```

**Səbəb**:
- **Elegant** — bir skil, çoxlu dil
- **Genişlənmə asan** — yeni dil = yeni knowledge fayl, eyni skil işləyir
- **Eminin layihələri çoxdilli** — Cavably (AZ+RU+EN), Etehsil (AZ+RU+EN), restoran-crm
- **Global cəlbedici** — Türk, Rus, Avropa istifadəçi də faydalanır
- **Az clutter** — `~/.claude/skills/` qovluğunda az fayl

**Alternative**: `az-copywriter` standalone — rədd edildi (limited scope, başqaları üçün istifadəsiz)

---

## Tətbiq sırası (Mərhələ B-də)

| Mərhələ | Tətbiq | Sıra |
|---|---|---|
| Decision #001 | Folder rename `claude-brain` → `ai-bootstrap` | ✅ done |
| Decision #002 | LICENSE faylı (MIT) | 🟡 next |
| Decision #003 | Tier 10 agents — default install list-ə əlavə | Mərhələ B-3 |
| Decision #004 | Tier 9 agents — default install list-ə əlavə | Mərhələ B-3 |
| Decision #005 | `~/.claude/knowledge/` skeleton + fayl şablonları | Mərhələ B-3 |
| Decision #006 | `multilingual-copywriter` skill + `languages/` qovluq | Mərhələ B-2 |

---

**Bu qərarlar Eminin tələbi ilə locked-dir. Dəyişdirmək üçün Eminin açıq icazəsi lazımdır.**
