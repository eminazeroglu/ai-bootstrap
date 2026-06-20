---
name: Next session entry point
description: Növbəti söhbətdə təzə Claude — bu faylı oxu, sonra davam et
last_updated: 2026-06-20
status: HANDOFF — Mərhələ B-1 done, B-2 start
---

# 🎯 Növbəti Söhbət — Buradan Başla

> **Salam, gələn Claude.** Bu söhbət 2026-06-19/20 axşamında bağlandı.
> Söhbət çox uzun idi → kontekst dolurdu → Emin təzə start istədi.
> Sən təzə yaddaşla başlayırsan. Bu fayl hər şeyi sənə deyir.

## 🔑 Vacib qaydalar (UNUTMA)

1. **Rule 4a — sadə dil**: Emin texniki söz qadağa, sadə AZ
2. **Rule 20 — bir sual**: hər mesajda yalnız 1 sual
3. **Rule 21 — vizual təsdiqi**: prompt əvvəl chat, sonra MD (vizual üçün)
4. **Rule 22 — araşdırma**: hər iddiaya WebSearch/WebFetch + mənbə
5. **Rule 23 — AZ qrammatika**: copy yazmadan əvvəl AZ qaydaları yoxla
6. **`postlamaq` qadağa** — `paylaşmaq` istifadə et

## 📁 Layihə yeri

```
~/MyJobs/ai-bootstrap/
```

Yox, bu **azerogluemin.az layihəsi DEYİL**. Ayrı layihədir — Emin üçün **global AI infrastruktur npm paketi**.

## 🧠 Bu layihə nədir?

`ai-bootstrap` — `npx ai-bootstrap init` ilə hər kompüteri tam Claude Code workstation-a çevirən bootstrap kit.

Detallar:
- **`README.md`** — proyekt giriş
- **`docs/PROPOSAL.md`** — tam research synthesis (Mərhələ A nəticəsi)
- **`docs/DECISIONS.md`** — Eminin 6 qətiyyətli qərarı

**HƏR İKİSİNİ OXU ƏVVƏLCƏ.** Sonra hər şey aydındır.

## ✅ Bitənlər

| Faza | Status | Output |
|---|---|---|
| Mərhələ A — research | ✅ done | PROPOSAL.md (5 preset, 85 skill, 75 agent, 80 MCP) |
| 6 architectural qərar | ✅ done | DECISIONS.md (locked) |
| Mərhələ B-1 — skeleton | ✅ done | Monorepo + 3 paket (cli, templates, mcps) |

3 commit: `13882ef` → `f92b8e7` → `3b0f00c`

## 🟡 İndi nə var

**Mərhələ B-2** — 5 yeni skill yazmaq:

```
packages/templates/skills/
├── learning-keeper/SKILL.md       # bizim öyrənmə sistemi
├── multilingual-copywriter/SKILL.md # AZ+RU+EN+TR... copywriting
├── architect/SKILL.md              # system design
├── doc-writer/SKILL.md             # auto README/API docs generator
└── test-writer/SKILL.md            # Vitest/Playwright generator
```

Hər skill üçün:
- SKILL.md (50-150 sətr) — frontmatter (name, description) + body (when to use, how to operate)
- Knowledge faylları (varsa, məs. multilingual üçün `knowledge/languages/az.md`)

## 📋 B-2 Plan

### Adım 1 — learning-keeper skili (ən vacib)
- Trigger sözləri: "düz deyil", "səhv", "yox", "araşdırmadım"
- Action: hər səhvi avtomatik `~/.claude/knowledge/mistakes-log.md`-yə yazır
- Pattern detection: 3+ oxşar səhv → CLAUDE.md-yə qayda təklifi

### Adım 2 — multilingual-copywriter skili
- Universal copy yazma skili
- Trigger: "AZ-də post yaz", "RU-da slogan yaz", "EN copy", və s.
- Pre-flight check: dil knowledge faylından qaydaları oxu
- AZ rules: SOV, hal şəkilçiləri, postlamaq qadağası, Ogilvy 6-12 söz

### Adım 3 — architect skili
- System design specialist (Senior Architect)
- Monolith vs microservices trade-off
- Database schema (RLS, multi-tenant)
- API design (REST + GraphQL)
- ARCHITECTURE.md generation

### Adım 4 — doc-writer skili
- Kod oxuyub README + API docs + architecture diagram yaradır
- Numbered docs pattern (Eminin restoran-crm-də 00-27 sistem)
- Living docs (decisions-log, open-questions, backlog, modules)

### Adım 5 — test-writer skili
- Vitest, Playwright, Jest universal
- Unit + integration + E2E
- Mock external APIs default

## ❓ Açıq Suallar (B-2-də həll oluna bilər)

1. Hər skill-də **persona** olmalıdır (məs. "Sən Senior Architect-sən, Pentagram + IBM Carbon + 2026 trendləri bilirsən")?
2. Skill-də **versiya** olmalıdır (məs. `version: 1.0.0` frontmatter)?
3. Knowledge fayllarının formatı necə olsun? (məs. AZ rules — bullet point yoxsa numbered?)

## 🎬 Necə davam et

1. **Oxu**: PROPOSAL.md (15 dəq) + DECISIONS.md (5 dəq)
2. **Salam ver Eminə**: "Salam, NEXT-SESSION.md oxudum, hər şey aydındır. Mərhələ B-2 başlayaq?"
3. **B-2 Adım 1-dən başla**: learning-keeper SKILL.md
4. **Bir-bir göstər Eminə**: hər skill yazdıqdan sonra göstər, təsdiq al, commit et, növbəti

## ⏱️ Vaxt smetası

- B-2 (5 skill): 2-3 saat
- B-3 (home/ qovluq + knowledge skeleton): 2 saat
- B-4 (install.sh): 1 saat
- B-5 (lokal test): 1 saat
- B-6 (PROPOSAL.md update + commit): 30 dəq

**Cəmi B = 7-8 saat** (1-2 söhbətdə)

## 🚨 Son qeyd

Bu söhbətdə Emin **bütün qərarları özü verdi**. Sən qərar verməyə **çalışma** — soruş, sonra icra et. "C — sən tövsiyə et" opsiyası vardırsa qəbul olunur, lakin yalnız user verirsə.

`Mənə sorulmadan qərar vermə` — Eminin sözü, 2026-06-19.

Uğur!

---

**Bu sənəd 2026-06-20-də yazıldı, məsuliyyət növbəti Claude-dadır.**
