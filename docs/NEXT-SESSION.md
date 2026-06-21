---
name: Next session entry point
description: Növbəti söhbətdə təzə Claude — bu faylı oxu, sonra davam et
last_updated: 2026-06-20 final session
status: v0.0.1 publish-ready (manual npm publish gözlənilir) — sonra v0.1.0 üçün C-10
---

# 🎯 Növbəti Söhbət — Buradan Başla

> **Salam, gələn Claude.** Bu rekord söhbət idi: 2026-06-19 → 2026-06-20.
> **22 commit**, **GitHub public**, **52 production skill**, **~15,000+ sətr** kod.
> Sən təzə yaddaşla başlayırsan. Tam mənzərə üçün PROPOSAL.md + DECISIONS.md + bu fayl oxu.

## 🌐 LIVE

**GitHub**: https://github.com/eminazeroglu/ai-bootstrap (public, MIT)
**npm package adı**: `@azerogluemin/ai-bootstrap` (scoped, sərbəst, hazırdır)
**Lokal**: `~/MyJobs/ai-bootstrap/`
**Owner**: Emin Azəroğlu (@eminazeroglu)

## 🔑 Vacib qaydalar (UNUTMA)

home/CLAUDE.md-də 8 foundation rule. Ümumi:
1. Sadə dil, jarqon qadağa
2. Bir sual hər mesajda
3. Visual approval first → MD sonra
4. Expert research hər iddiada
5. Dürüst müzakirə, sus qalma
6. Sorulmadan qərar vermə
7. AZ qrammatika SOV + slang qadağa (postlamaq → paylaşmaq)
8. No superlatives (faktlar bəs)

## ✅ TAM bitənlər (22 commits)

| Mərhələ | Status |
|---|---|
| A — Research | ✅ 100% |
| 6 decisions | ✅ locked |
| B-1...B-6 — Skeleton + 5 skill + knowledge + install | ✅ |
| C-1 — GitHub public | ✅ |
| C-2 — CLI wizard (12 TS files) | ✅ |
| C-3 — Applier (3 writers) | ✅ |
| C-4 — Full applier + test PASSED | ✅ |
| C-5 — +2 skill +1 agent | ✅ |
| C-6 — simplify, verify, refactor | ✅ |
| C-7 — 13 skill (product/marketing/social) | ✅ |
| C-8 — 14 skill (creator suite copy) | ✅ |
| C-9 — 15 skill (graphic/coaching/productivity) | ✅ |
| C-11 — Smoke tests + BUG FIX | ✅ |
| C-12 — npm pack ready, name scoped | ✅ |

## 📊 Cari STATS

| | Saytı |
|---|---|
| Commits | **22** |
| Production skills | **52/85 (61%)** |
| Production agents | 1/75 (1.3%) |
| TypeScript CLI files | 16 |
| Test assertions | **63/63 ✅** |
| Bash scripts | 2 |
| Knowledge files | 10 |
| Docs files | 5 |
| **Lines total** | **~15,000+** |
| TS build | ✅ sıfır xəta |
| GitHub | ✅ public |
| npm name | `@azerogluemin/ai-bootstrap` (reserved) |

## 🎯 52 Production Skills

### Foundation (10)
learning-keeper, multilingual-copywriter, architect, doc-writer, test-writer, code-reviewer, security-auditor, simplify, verify, refactor

### Product/UX (4)
product-manager, ux-researcher, landing-page-builder, accessibility-auditor

### Marketing (5)
seo-optimizer, aeo-specialist, copywriter-pro, email-sequence-builder, growth-strategist

### Social per-platform (5)
instagram-expert, tiktok-expert, youtube-expert, linkedin-expert, social-strategist

### Creator Suite (14)
showrunner, screenwriter, character-designer, location-designer, director, storyboard-builder, image-prompt-engineer, image-validator, video-prompt-engineer, composer, lyricist, suno-prompt-engineer, elevenlabs, youtube-thumbnail-designer

### Graphic Design (5)
brand-identity-designer, logo-designer, color-palette-builder, typography-system-designer, brand-kit-builder

### Coaching (5)
business-coach, growth-coach, life-coach, psychologist, journal-keeper

### Productivity (4)
inbox-triage, meeting-notes, decision-maker, knowledge-base-builder

## 🟡 EMININ MANUAL İCRASI lazım

```bash
cd ~/MyJobs/ai-bootstrap/packages/cli

# 1. npm login (interactive — username, password, 2FA)
npm login

# 2. Verify auth
npm whoami
# → eminazeroglu (yaxud sənin npm username)

# 3. Final dry-run
npm publish --dry-run

# 4. PUBLISH
npm publish --access public

# 5. Verify on npm
npm view @azerogluemin/ai-bootstrap

# 6. Test global install
npm install -g @azerogluemin/ai-bootstrap
ai-bootstrap

# 7. Test npx (no install)
npx @azerogluemin/ai-bootstrap
```

PUBLISHING.md-də tam guide var.

## 🟡 Növbəti söhbətdə (C-10+)

### Skill genişlənmə (~33 qalıb)
**Tier 2 expansion** (4): experiment-designer, analytics-expert, product-strategist, ui-ux-pro-max
**Tier 3 expansion** (7): content-strategist, competitive-intel, brand-marketer, brand-voice-analyzer, attribution-analyst, conversion-optimizer, paid-ads-strategist
**Tier 4 expansion** (3): twitter-expert, telegram-expert, cross-platform-strategist, community-manager
**Tier 8 expansion** (4): handoff-specialist, process-mapper, vendor-manager, capacity-planner
**Tier 9 multilingual** (3): cultural-translator, localization-strategist, multilingual-content
**Tier 10 advanced eng** (8): rag-architect, mcp-server-builder, ci-cd-builder, chaos-engineer, kubernetes-operator, incident-commander, tech-debt-tracker, migration-architect
**+ C-Level (10)**: ceo-advisor, cto-advisor, cfo-advisor, cmo-advisor, cro-advisor, coo-advisor, chro-advisor, ciso-advisor, gc-advisor, founder-mode
**+ Vertical (8)**: legal-researcher, healthcare-compliance, finance-analyst, education-curriculum, e-commerce-optimizer, real-estate-analyzer, gaming-balance-designer, fintech-compliance

### Agents (74 qalıb)
SEO suite 18, role specialists 8, content orchestrators 6, ...

### MCP installer kodu (80)
Hər MCP üçün:
- catalog.json metadata
- Per-MCP installer
- Credential collector

### Digər iş
- GitHub OAuth backup flow
- Interactive TTY end-to-end test
- Documentation site (Astro/Mintlify)
- Update mechanism (`ai-bootstrap update`)
- Telemetry opt-in
- Launch

## 🎬 Necə davam et

1. **Oxu**: README + PROPOSAL.md + DECISIONS.md + bu fayl
2. **Salam ver Eminə**:
   - Əgər v0.0.1 publish olub: "ai-bootstrap-da davam edirik — Mərhələ C-10 (qalan skill genişlənmə)?"
   - Əgər publish olmayıb: "Publish-i bitirək, sonra C-10?"
3. **Eminin cavabına görə icra**

## ⏱️ Vaxt smetası

- Qalan 33 skill: 20-30 saat (3-5 söhbət)
- 74 agent: 25-35 saat (4-6 söhbət)
- 80 MCP installer: 15-20 saat
- GitHub OAuth: 4-6 saat
- Documentation site: 8-10 saat
- Launch: 2-3 saat

**Cəmi qalan**: 75-105 saat (3-4 həftə dolğun iş)

## 🚨 Vacib qaydalar (təkrar)

1. **Sorulmadan qərar vermə** — Emin sərt qaydası
2. **Hər skill commit + push** — kiçik atomic
3. **TypeScript build yoxla** — hər skill batch sonra
4. **Tests run et** — hər bundle update sonra
5. **Söhbət uzun olsa fasilə təklif et** — keyfiyyət qoruyucu
6. **Şəkilsiz MD yazma** — visual approval first (vizual üçün)
7. **AZ slang qadağa** — paylaşmaq vs postlamaq

Uğur! 🚀

---

**Bu sənəd 2026-06-20 sonunda yazıldı.**
**22 commit, 52 skill, GitHub public, npm publish-ə hazır.**
**61% complete toward 85-skill vision.**
