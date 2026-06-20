---
name: Next session entry point
description: Növbəti söhbətdə təzə Claude — bu faylı oxu, sonra davam et
last_updated: 2026-06-20 (session 2 final)
status: HANDOFF — Mərhələ A + B + C-1/2/3/4/5/6 done — C-7+ growth phase
---

# 🎯 Növbəti Söhbət — Buradan Başla

> **Salam, gələn Claude.** Bu söhbət 2026-06-19 → 2026-06-20-də 2 günlük marafon idi.
> **15 commit**, **GitHub public**, **9,000+ sətr** kod/sənəd.
> Sən təzə yaddaşla başlayırsan. Bu fayl tam mənzərəni verir.

## 🌐 LIVE

**GitHub**: https://github.com/eminazeroglu/ai-bootstrap (public, MIT)
**Lokal**: `~/MyJobs/ai-bootstrap/`
**Owner**: Emin Azəroğlu (@eminazeroglu)

## 🔑 Vacib qaydalar (UNUTMA — `home/CLAUDE.md`-də 8 foundation rule)

1. **Rule 1 — sadə dil**: texniki jarqon qadağa, sadə AZ
2. **Rule 2 — bir sual**: hər mesajda yalnız 1 sual
3. **Rule 3 — visual approval first**: prompt inline → user görsün → SONRA MD
4. **Rule 4 — expert research**: hər iddiaya WebSearch + mənbə
5. **Rule 5 — honest discussion**: dürüst fikir, sus qalma qadağa
6. **Rule 6 — don't decide without asking**: Eminin sərt qaydası
7. **Rule 7 — AZ grammar mandatory**: SOV, hal şəkilçi, AMEA lüğət
8. **Rule 8 — no superlatives**: faktlar bəs ("110K"), "yeganə" YOX

**Critical AZ slang qadağa** (`home/knowledge/languages/az.md`):
- `postlamaq` → `paylaşmaq`
- `lol`, `ok`, `pliz`, `sori`, `tşk` → AZ qarşılıq

## 📁 Layihə

```
~/MyJobs/ai-bootstrap/   (ayrı layihə, azerogluemin.az DEYİL)
```

## 🧠 Bu layihə nədir?

`ai-bootstrap` — `npx ai-bootstrap init` ilə hər kompüteri tam Claude Code workstation-a çevirən open-source bootstrap kit.

**HƏR ÜÇÜ OXU** (15 dəq):
1. `README.md` — proyekt giriş + badges
2. `docs/PROPOSAL.md` — tam plan (~540 sətr)
3. `docs/DECISIONS.md` — 6 architectural decision locked

## ✅ TAM bitənlər (15 commits)

| Mərhələ | Output | Commit |
|---|---|---|
| **A — Research** | PROPOSAL.md, 5 preset, 85 skill catalog, 75 agent catalog, 80 MCP catalog | 3b0f00c, f92b8e7 |
| **B-1 — Skeleton** | Monorepo (cli/templates/mcps) | 13882ef |
| **B-2 — 5 skills** | learning-keeper, multilingual-copywriter, architect, doc-writer, test-writer | dd23d20 |
| **B-3 — Knowledge** | home/CLAUDE.md (8 rules) + 10 knowledge files | 3e86d91 |
| **B-4 — Install** | install.sh + uninstall.sh (bash strict) | 1b0f0aa |
| **B-5/6 — Test + Docs** | Mock test passed + PROPOSAL update | 1b52900 |
| **C-1 — GitHub** | PUBLIC repo + badges + topics | aca9839 |
| **C-2 — CLI Wizard** | 12 TypeScript files, 6-step orchestrator | 8d5e9c8 |
| **C-3 — Applier** | profile-writer, projects-writer, settings-writer | d49153e |
| **C-4 — Full Applier** | mcp-config, skills-installer, bundle-definitions + TS build + smoke test PASSED | f21ab5a, 2b919b8 |
| **C-5 — +2 skills +1 agent** | code-reviewer, security-auditor, code-reviewer AGENT.md | 4388198 |
| **C-6 — +3 engineering skills** | simplify, verify, refactor | 70b9411 |

## 📊 Cari Stats

| Metric | Saytı |
|---|---|
| **Commits** | 15 |
| **TypeScript files** | 16 (CLI) |
| **Production skills** | **10** (Foundation tier TAM) |
| **Production agents** | 1 |
| **Knowledge files** | 10 |
| **Bash scripts** | 2 |
| **Docs files** | 4 |
| **TS build** | ✅ sıfır xəta |
| **Smoke test** | ✅ profile-writer real fayl yazdı |
| **GitHub** | ✅ public, MIT |
| **Lines** | ~9,000+ |

## 🎯 10 Production Skills (Foundation tier complete)

| # | Skill | Funksiya |
|---|---|---|
| 1 | learning-keeper | auto-capture corrections, mistakes, facts |
| 2 | multilingual-copywriter | universal copy + AZ knowledge base |
| 3 | architect | system design + multi-tenancy |
| 4 | doc-writer | numbered docs pattern (00-27) |
| 5 | test-writer | Vitest/Jest/Playwright |
| 6 | code-reviewer | 4-tier finding categorization |
| 7 | security-auditor | OWASP Top 10 audit |
| 8 | simplify | find + apply quality simplifications |
| 9 | verify | observable behavior verification |
| 10 | refactor | Fowler-style structural changes |

## 🟡 Növbəti — Mərhələ C-7+

### C-7 — Daha çox skill (75 qalıb)
- **Tier 2 Product/UX** (8): product-manager, ux-researcher, landing-page-builder, accessibility-auditor, analytics-expert, experiment-designer, product-strategist, ui-ux-pro-max
- **Tier 3 Marketing** (12): seo-optimizer, aeo-specialist, copywriter-pro, email-sequence-builder, cro-specialist, growth-strategist, content-strategist, competitive-intel, brand-marketer, social-strategist, attribution-analyst, brand-voice-analyzer
- **Tier 4 Social per-platform** (8): instagram-expert, tiktok-expert, youtube-expert, linkedin-expert, twitter-expert, telegram-expert, cross-platform-strategist, community-manager
- **Tier 5 Creator suite** (14): showrunner, screenwriter, character-designer, location-designer, director, storyboard-builder, image-prompt-engineer, image-validator, video-prompt-engineer, composer, lyricist, suno-prompt-engineer, elevenlabs, youtube-thumbnail-designer
- **Tier 6 Graphic Design** (6): brand-identity-designer, logo-designer, color-palette-builder, typography-system-designer, brand-kit-builder, graphic-designer
- **Tier 7 Personal** (5): business-coach, growth-coach, life-coach, psychologist, journal-keeper
- **Tier 8 Productivity** (8): inbox-triage, meeting-notes, decision-maker, handoff-specialist, process-mapper, vendor-manager, capacity-planner, knowledge-base-builder
- **Tier 9 Multilingual** (3): cultural-translator, localization-strategist, multilingual-content
- **Tier 10 Advanced eng** (8): rag-architect, mcp-server-builder, ci-cd-builder, chaos-engineer, kubernetes-operator, incident-commander, tech-debt-tracker, migration-architect

### C-8 — Agents (74 qalıb)
Tier 1-10 üzrə 74 agent template (`packages/templates/agents/<name>/AGENT.md`)
- Tier 5 ən böyük: 18 SEO sub-agent

### C-9 — MCP catalog implementation
- `packages/mcps/catalog.json` (80 MCP metadata)
- Per-MCP installers
- Credential collector (`ai-bootstrap mcp configure <id>`)

### C-10 — GitHub OAuth flow
- `ai-bootstrap github-backup setup`
- Auto-creates private/public repo
- git init ~/.claude + remote add + push

### C-11 — Interactive end-to-end test
- Real TTY test: `node dist/index.js` interactive run
- Mock HOME ilə Wizard tam icra
- Bütün step-lərdə observe

### C-12 — npm publish
- `npm publish --access public`
- Verify `npx ai-bootstrap init` globalda işləyir

### C-13 — Documentation site
- Astro yaxud Mintlify
- `ai-bootstrap.dev` (domain registration lazımdır)
- Multilingual (AZ + EN)

### C-14 — Launch
- ProductHunt
- HackerNews
- Twitter / X
- AZ creator community

## 📋 Növbəti söhbətdə tövsiyə yön

**Birinci variant — Skill genişlənmə** (C-7):
- Bir-bir Tier 2-10-dan high-value skill yaz
- Hər skill ~200-300 sətr, paste-ready
- Cəmi ~75 skill — 50+ saat iş (bir necə həftə)

**İkinci variant — Quality first** (C-11):
- Mövcud 10 skill + 1 agent + CLI gerçəkdən tam test
- Real interactive TTY run
- Bug-fix
- Production-ready proof
- 2-3 saat iş

**Üçüncü variant — Distribution** (C-12):
- npm publish (need npm account auth)
- Real users tap edə bilərlər
- Feedback loop başlayır
- 1-2 saat iş

**Mənim tövsiyəm**: C-11 (test) → C-12 (publish) → SONRA C-7 (genişlənmə).
Niyə: 10 working skill, published > 100 untested skill in repo.

## 🚨 Vacib qeydlər

1. **Mənə sorulmadan qərar vermə** — Emin sərt qaydası
2. **Hər söhbət uzun olsa fasilə təklif et** — kontekst dolur, keyfiyyət düşür
3. **TypeScript build həmişə yoxla** — `cd packages/cli && ./node_modules/.bin/tsc`
4. **Hər skill commit edilsin** — kiçik atomic commit-lər
5. **GitHub push hər commit-dən sonra** — Rule 6 (git push)

## 🎬 Necə davam et

1. **Oxu**: README.md → docs/PROPOSAL.md → docs/DECISIONS.md → bu fayl
2. **Salam ver Eminə**: "ai-bootstrap-da davam edirik — hansı yön? C-7 skill, C-11 test, yoxsa C-12 publish?"
3. **Eminin cavabına görə icra et**

Uğur!

---

**Bu sənəd 2026-06-20 axşamında yazıldı.**
**15 commit, GitHub public, 10 skills production-ready.**
