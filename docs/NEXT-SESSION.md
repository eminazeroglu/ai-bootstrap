---
name: Next session entry point
description: Növbəti söhbətdə təzə Claude — bu faylı oxu, sonra davam et
last_updated: 2026-06-20
status: HANDOFF — Mərhələ B tam done, C-2 (CLI wizard) yarıda
---

# 🎯 Növbəti Söhbət — Buradan Başla

> **Salam, gələn Claude.** Bu söhbət 2026-06-20-də marafon olaraq davam etdi.
> Mərhələ A (research) + Mərhələ B (skeleton + skills + scripts) tam tamamlandı.
> Sən təzə yaddaşla başlayırsan. Bu fayl + PROPOSAL.md + DECISIONS.md → tam kontekst.

## 🔑 Vacib qaydalar (UNUTMA — `home/CLAUDE.md`-də 8 foundation rule)

1. **Rule 1 — sadə dil**: Emin texniki söz qadağa, sadə AZ
2. **Rule 2 — bir sual**: hər mesajda yalnız 1 sual
3. **Rule 3 — visual approval first**: prompt inline → user görsün → SONRA MD
4. **Rule 4 — expert research**: hər iddiaya WebSearch + mənbə
5. **Rule 5 — honest discussion**: dürüst fikir bil, susmurmuyam
6. **Rule 6 — don't decide without asking**: Emin tələbi
7. **Rule 7 — AZ grammar mandatory**: SOV, hal şəkilçi, AMEA lüğət yoxla
8. **Rule 8 — no superlatives**: faktlar bəs ("110K izləyici"), "yeganə" YOX

**Critical AZ rules** (`home/knowledge/languages/az.md`-də tam siyahı):
- `postlamaq` → `paylaşmaq` (slang qadağa)
- `lol`, `ok`, `pliz`, `sori`, `tşk` → AZ qarşılıq istifadə et
- Bütün loanword verb (`X-ləmək`) → AMEA-da yoxla

## 📁 Layihə yeri

```
~/MyJobs/ai-bootstrap/
```

(Yox, bu **azerogluemin.az layihəsi DEYİL**. Ayrı global open-source layihə.)

## 🧠 Bu layihə nədir?

`ai-bootstrap` — `npx ai-bootstrap init` ilə hər kompüteri tam Claude Code workstation-a çevirən bootstrap kit.

**Hazırda nə var**:
- `README.md`, `LICENSE` (MIT), `.gitignore`
- `docs/PROPOSAL.md` — tam plan (Mərhələ A nəticələri + B nəticələri + C planı)
- `docs/DECISIONS.md` — 6 architectural decision locked
- 8 commit, 35 fayl, ~3000+ sətr code/markdown
- `install.sh` + `uninstall.sh` (test passed)
- `home/CLAUDE.md` (universal qaydalar)
- `home/knowledge/` (8 fayl + 6 user-taught rule + 6 verified fact + 3 mistake seed entries)
- `home/skills/` (5 yeni skill symlinked)
- `packages/templates/skills/` — 5 SKILL.md yazıldı (learning-keeper, multilingual-copywriter, architect, doc-writer, test-writer)
- `packages/cli/`, `packages/templates/`, `packages/mcps/` — skeleton

**HƏR ÜÇÜ OXU**: PROPOSAL.md (15 dəq) + DECISIONS.md (5 dəq) + README.md. Sonra hər şey aydındır.

## ✅ Tam bitənlər

| Faza | Status | Output |
|---|---|---|
| Mərhələ A — research | ✅ done | PROPOSAL.md (5 preset, 85 skill, 75 agent, 80 MCP) |
| 6 architectural decision | ✅ done | DECISIONS.md (locked) |
| Mərhələ B-1 — skeleton | ✅ done | Monorepo + 3 paket |
| Mərhələ B-2 — 5 skill | ✅ done | learning-keeper, multilingual-copywriter, architect, doc-writer, test-writer |
| Mərhələ B-3 — home/ | ✅ done | CLAUDE.md + 10 knowledge fayl |
| Mərhələ B-4 — install | ✅ done | install.sh + uninstall.sh |
| Mərhələ B-5 — test | ✅ done | Mock HOME test passed |
| Mərhələ B-6 — PROPOSAL update | ✅ done | Tam status docs |

8 commit: `3b0f00c` → `f92b8e7` → `13882ef` → `38cbc5f` → `dd23d20` → `3e86d91` → `1b0f0aa` → `1b52900`

## 🟡 İndi nə var — Mərhələ C başlayır

### C-2 — Real CLI wizard (ən vacib, indi başlamalıyıq)

Hazırda `packages/cli/bin/init.js` placeholder-dır:
```javascript
console.log('🧠 ai-bootstrap');
console.log('Mərhələ B-1: skeleton OK');
```

**Lazım olan**: real interactive wizard:
- 6 mərhələ (profile → projects → bundles → MCPs → memory → github)
- @inquirer/prompts ilə (artıq dependencies-də)
- Permission gates hər mərhələdə
- Progress göstərir (ora package)
- AZ + EN dil dəstəyi

### C-2 Plan

**Adım 1** — Struktur:
```
packages/cli/src/
├── index.ts          (main entry, calls wizard)
├── wizard.ts         (orchestrates 6 steps)
├── steps/
│   ├── 1-profile.ts  (interactive profile builder)
│   ├── 2-projects.ts (folder scanner + permission)
│   ├── 3-bundles.ts  (skill/agent bundle selection)
│   ├── 4-mcps.ts     (MCP selection + credentials)
│   ├── 5-memory.ts   (~/.claude/knowledge/ setup)
│   └── 6-github.ts   (optional backup setup)
├── utils/
│   ├── scanner.ts    (project folder scanner)
│   ├── permissions.ts (gate logic)
│   └── paths.ts      (cross-platform path handling)
└── types.ts          (shared types)
```

**Adım 2** — Adım 1 (profile) implementasiyası
- @inquirer/prompts ilə
- Ad, dil, rol, ölkə, hədəflər
- Output: ~/.claude/knowledge/user-profile.md doldurulur

**Adım 3** — Adım 2-6 implementasiyası
- Hər biri ayrı PR/commit

**Adım 4** — Test
- Local test: `pnpm install` + `npx ai-bootstrap init`
- Mock HOME ilə E2E

### C-3 (sonra)
Qalan ~80 skill yazmaq:
- SEO suite (18 skill)
- Marketing (12)
- Social per-platform (8)
- C-Level (10)
- Productivity (8)
- Multilingual (4)
- Advanced engineering (8)

### C-4 (sonra)
~75 agent yazmaq

### C-5 (sonra)
MCP catalog implementation

### C-6 (sonra)
npm publish

### C-7 (sonra)
Documentation site

### C-8 (sonra)
Launch

## 📋 C-2 birinci addım — sənin sıran

```typescript
// packages/cli/src/index.ts
import { runWizard } from './wizard.js';

async function main() {
  console.log('🧠 ai-bootstrap — Personal AI infrastructure\n');
  await runWizard();
}

main().catch((err) => {
  console.error('✗ Setup failed:', err);
  process.exit(1);
});
```

```typescript
// packages/cli/src/wizard.ts
import { profileStep } from './steps/1-profile.js';
import { projectsStep } from './steps/2-projects.js';
// ... etc

export async function runWizard() {
  const profile = await profileStep();
  const projects = await projectsStep(profile);
  // ... etc
}
```

Plus each step uses @inquirer/prompts.

## ❓ Açıq Suallar (C-2-də həll oluna bilər)

1. CLI interface — yalnız AZ-də, yoxsa AZ + EN hybrid (Emin oxuyur EN, lakin response AZ)?
2. Mock data — test mode-u olsun? (`--mock` flag → real fayl yazmadan dry-run)
3. Telemetry — install-da əsas (anonim, opt-in) yoxsa zero-telemetry?
4. Update mechanism — `ai-bootstrap update` komandası ya manual `git pull`?

## 🎬 Necə davam et

1. **Oxu**: PROPOSAL.md + DECISIONS.md + bu fayl
2. **Salam ver Eminə**: "ai-bootstrap-da Mərhələ C-2 başlayaq?"
3. **C-2 Adım 1-dən başla**: src/index.ts + src/wizard.ts + steps/1-profile.ts
4. **Hər addımı göstər**: Emin gözəl uzun search döngüsündən sıxılır, qısa kommunikasiya
5. **Commit hər step-də**: kiçik commit-lər, oxunaqlı tarix

## ⏱️ Vaxt smetası

- C-2 (CLI implementation): 4-6 saat
- C-3 (80 skill): 20-30 saat (parallel-də Anthropic API ilə də edilə bilər)
- C-4 (75 agent): 15-20 saat
- C-5 (MCP catalog): 10-15 saat
- C-6 (npm publish): 1 saat
- C-7 (docs site): 8-10 saat
- C-8 (launch): 2-3 saat

**Cəmi C = 60-90 saat**. Tək bir söhbətdə olmaz. Bir necə həftə.

## 🚨 Son qeyd

Bu söhbətdə Emin:
- Bütün qərarları özü verdi (Rule 6)
- "Mənə sorulmadan qərar vermə" — locked rule
- Lakin C opsiyaları üçün "sən tövsiyə et" qəbul olunur
- Texniki söz qadağa (Rule 1) — sadə AZ
- Mərhələ uzun olsa fasilə təklif et (kontekst dolur)

Uğur!

---

**Bu sənəd 2026-06-20-də yazıldı.**
**8 commit, Mərhələ A + B tam, Mərhələ C başlanğıc nöqtəsində.**
