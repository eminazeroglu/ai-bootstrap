---
name: claude-brain — full proposal
description: Mərhələ A research synthesis — vizyon, arxitektur, presetlər, skill/agent/MCP kataloqları
status: Mərhələ A tamamlandı (2026-06-19)
last_updated: 2026-06-19
---

# claude-brain — tam təklif

## 🎯 Vizyon

**Şəxsi AI infrastrukturu npm paketi.** Hər kəs yazır:

```bash
npx claude-brain init
```

Və avtomatik interactive wizard:
- Layihə qovluqlarını soruşur (vergullə ayrılır, MyJobs spesifik deyil)
- Layihələri tarayır, kataloqa salır
- AI profilini sual ilə qurur
- Essential MCP-ləri install edir
- Skill + agent bundle seçimi
- Cross-project yaddaş quruluşu
- GitHub backup (opsional)

Sonra yeni kompüterdə bir komanda → Claude Code hər şeyi xatırlayır.

## 🏗️ Arxitektura

### 3-qatlı yaddaş

```
LAYER 1: ~/.claude/CLAUDE.md          (universal qaydalar)
LAYER 2: ~/.claude/knowledge/         (cross-project bilgi)
LAYER 3: ae-learning-keeper skill     (avto-capture səhvlər)
```

### Necə yüklənir

```bash
git clone github.com/eminazeroglu/claude-brain ~/claude-brain
cd ~/claude-brain && ./install.sh
```

`install.sh` nə edir:
1. Köhnə `~/.claude/`-i backup edir
2. `home/` qovluğunu symlink ilə `~/.claude/`-ə bağlayır
3. settings.json template-ni kopyalayır
4. Interactive wizard işə düşür

### Repo strukturu

```
claude-brain/
├── README.md
├── LICENSE                            ← MIT
├── packages/
│   ├── cli/                           ← @claude-brain/cli (npx entry)
│   ├── templates/                     ← skil/agent template-lər
│   └── mcps/                          ← MCP installer logic
├── presets/                           ← 5 layihə preset
├── docs/                              ← bütün sənədlər
├── examples/                          ← real-world setups
└── scripts/                           ← install, backup, sync
```

---

## 📦 5 Layihə Preset (Phase 4-5 nəticəsi)

### Level 1 — Layihə növü (5)

| # | Növ | Variant | Default stack |
|---|---|---|---|
| 1 | **SaaS** | Classic Fullstack (`saas-fullstack-pro`) | Turborepo + NestJS + Prisma + Vite + React + Tailwind + shadcn |
| 1 | | AI-First (`saas-ai-pro`) | + pgvector + Claude API + RAG |
| 2 | **AI Studio** | `ai-studio` | FastAPI (Python) + React + RunPod GPU |
| 3 | **Brand Site** | `brand-site` | Astro + React islands + Tailwind v4 |
| 4 | **Social Ops** | `social-ops` | Folder + asset library (kod DEYİL — content workflow) |
| 5 | **Data Platform** | `data-platform` | pnpm workspaces + ETL pipeline + real-time monitoring |

### Universal pattern (4/5 layihədə eyni)

- ✅ Monorepo `apps/` + `packages/`
- ✅ TypeScript strict, `any` qadağa
- ✅ CLAUDE.md primary instruction
- ✅ `docs/` numbered (00 → 27)
- ✅ Multi-tenant / tenant-aware
- ✅ JWT auth + RBAC
- ✅ PostgreSQL + Prisma
- ✅ AZ-first i18n
- ✅ Decisions log (append-only #NNN)
- ✅ External APIs mock-da test

### Living docs pattern (ortaq)
- `09-decisions-log.md` — append-only
- `10-open-questions.md`
- `11-backlog.md`
- `12-modules.md` (status)

---

## 🛠️ Universal Skills Kataloqu — 10 Tier × ~85 Skill (Phase 1)

### Tier 1 — Foundation (12)
deep-research ✅, code-review ✅, simplify ✅, verify ✅, security-review ✅, project-bootstrap ✅, architect, database-designer, api-designer, doc-writer, test-writer, learning-keeper

### Tier 2 — Product & UX (8)
product-manager, product-strategist, ux-researcher, ui-ux-pro-max ✅, landing-page-builder, analytics-expert, experiment-designer, accessibility-auditor (WCAG 2.2)

### Tier 3 — Marketing & Growth (12)
seo-optimizer, aeo-specialist (Answer Engine Optimization — 2026 yeni), email-sequence-builder, cro-specialist, growth-strategist, content-strategist, competitive-intelligence, copywriter-pro (PAS/AIDA/BAB), brand-marketer ✅, social-strategist ✅, attribution-analyst, brand-voice-analyzer

### Tier 4 — Social Media Operations (8)
instagram-expert ✅, tiktok-expert, youtube-expert, linkedin-expert, twitter-expert, telegram-expert, cross-platform-strategist, community-manager

### Tier 5 — Creator Suite (14)
showrunner ✅, screenwriter ✅, character-designer ✅, location-designer ✅, director ✅, storyboard-builder ✅, image-prompt-engineer ✅, image-validator ✅, video-prompt-engineer ✅, composer ✅, lyricist ✅, suno-prompt-engineer ✅, elevenlabs ✅, youtube-thumbnail-designer ✅, watch ✅

### Tier 6 — Graphic Design & Brand (6)
brand-identity-designer, logo-designer, color-palette-builder, typography-system-designer, brand-kit-builder, graphic-designer ✅

### Tier 7 — Personal/Coaching (5)
business-coach ✅, growth-coach ✅, life-coach ✅, psychologist ✅, journal-keeper ✅

### Tier 8 — Productivity & Operations (8)
inbox-triage, meeting-notes, decision-maker (founder-mode), handoff-specialist, process-mapper, vendor-manager, capacity-planner, knowledge-base-builder

### Tier 9 — Multilingual & Cultural (4)
az-copywriter ❌ NEW, multilingual-content, cultural-translator, localization-strategist

### Tier 10 — Advanced Engineering (8 — opsional)
rag-architect, mcp-server-builder, ci-cd-builder, chaos-engineer, kubernetes-operator, incident-commander, tech-debt-tracker, migration-architect

### Quick install bundle-lər
- **Developer** — Tier 1, 8, 10 (~28 skill)
- **Marketer** — Tier 1, 2, 3, 4 (~32 skill)
- **Creator (AI)** — Tier 1, 4, 5, 6 (~30 skill)
- **Founder** — Tier 1, 2, 3, 7, 8 (~35 skill)
- **Full Stack (Emin)** — Bütün tier-lər (~85 skill)

---

## 🤖 Universal Agents Kataloqu — 10 Tier × ~75 Agent (Phase 2)

### Tier 1 — Foundation (5)
Explore ✅, Plan ✅, general-purpose ✅, code-reviewer, researcher

### Tier 2 — Engineering Core (10)
code-explorer, code-architect, stack-tester ⚠️ (3 layihədə var), db-migrator ⚠️, security-auditor, performance-profiler, refactor-planner, debugger, devops-engineer, ai-ml-engineer

### Tier 3 — Role Specialists (8)
backend-engineer ⚠️ (etehsil_app), frontend-engineer ⚠️, qa-reviewer ⚠️, render-engineer ⚠️ (design-ai), data-engineer, mobile-engineer, fullstack-engineer, frontend-designer ⚠️

### Tier 4 — Product Team (5)
product-manager, ux-researcher, product-strategist, designer, analyst

### Tier 5 — SEO Suite (18 — claude-seo-dən)
Technical SEO, Content Quality (E-E-A-T), Schema Validation, AI Search (GEO/AEO), Local SEO, Maps Intelligence, Backlinks, E-commerce, International (Hreflang), Visual/SPA, Semantic Clustering, Drift Monitor, Google API, Content Brief, Programmatic SEO, Competitor Pages, SXO, Image Optimization

### Tier 6 — Marketing & Growth (8)
content-marketer, social-media-manager, email-marketer, growth-hacker, paid-ads-strategist, competitive-intel, market-researcher, conversion-optimizer

### Tier 7 — Social Per-Platform (5)
instagram-orchestrator ✅, tiktok-orchestrator, youtube-orchestrator, linkedin-orchestrator, twitter-orchestrator

### Tier 8 — Content/Creator Orchestrators (6)
video-pipeline, storyboard-orchestrator, research-orchestrator, publishing-orchestrator, content-calendar-orchestrator, sound-designer

### Tier 9 — C-Level Advisory (10 — alirezarezvani-dən)
ceo-advisor, cto-advisor, cfo-advisor, cmo-advisor, cro-advisor, coo-advisor, chro-advisor, ciso-advisor, gc-advisor, founder-mode

### Tier 10 — Vertical Specialists (~10+ opsional)
legal-researcher (Harvey), healthcare-compliance (Hippocratic), finance-analyst, education-curriculum, e-commerce-optimizer, real-estate-analyzer, ...

### Agent vs Skill — fərq

| | Skill | Agent |
|---|---|---|
| Context | Main thread | Müstəqil window |
| İstifadə | Knowledge | Heavy/parallel work |
| Sayı | ~85 | ~75 |
| Vaxt | Anında | Uzun (dəqiqələr) |

---

## 🌐 MCP Kataloqu — 15 Tier × ~80 MCP (Phase 3)

> **Vacib qayda**: ≤10 MCP aktiv (agent yavaşlamasın — Totalum 2026)

### Tier 1 — Day-1 Essential (8 — default install)
Filesystem · GitHub (rəsmi) · Postgres · Brave Search · Context7 · Notion (rəsmi, 22 tools) · Playwright (94k stars) · Memory (local SQLite yaxud Mem0)

### Tier 2 — Communication (5)
Slack (rəsmi) · Discord · Telegram · Gmail · Microsoft Teams

### Tier 3 — Databases (7)
Postgres · Supabase · MySQL · MongoDB · Redis · BigQuery · Snowflake

### Tier 4 — Cloud & Deploy (6)
Vercel · AWS · GCP · Cloudflare · Railway · Render

### Tier 5 — Payments & E-commerce (5)
Stripe (rəsmi, Q1-Q2 2026) · Shopify (rəsmi) · PayPal · Square · Lemon Squeezy

### Tier 6 — CRM (4)
HubSpot · Salesforce · Attio · Pipedrive

### Tier 7 — Project Management (6)
Linear (rəsmi) · Jira · Asana · Trello · ClickUp · Monday

### Tier 8 — Social Media (8)
**Meta** (Apr 2026 rəsmi) · YouTube Data · TikTok · LinkedIn · Twitter/X · Telegram Bot · WhatsApp Business · Threads

### Tier 9 — Analytics (5)
Google Analytics GA4 · Mixpanel · Amplitude · PostHog · Segment

### Tier 10 — Marketing & Email (6)
Mailchimp · Brevo · Resend · Constant Contact · SendGrid · ConvertKit

### Tier 11 — AI Providers (11)
OpenAI · Anthropic Claude · Google Gemini · xAI Grok · ElevenLabs (rəsmi) · Replicate · HuggingFace · fal.ai · Stable Diffusion · Ollama (local) · Mistral

### Tier 12 — Browser & Scraping (5)
Playwright · Puppeteer · Browserbase (anti-detection) · Firecrawl FIRE-1 (interactive) · Apify Crawlee

### Tier 13 — Observability (5)
Sentry · Cloudflare · DataDog · New Relic · LogRocket

### Tier 14 — Design (3)
Figma · Canva · Adobe

### Tier 15 — Storage & CDN (4)
S3 · R2 (Cloudflare) · Backblaze · Google Drive

### Quick install bundle-lər
- **Essential** (8) — sadə start
- **Developer** (~18) — kod + DB + cloud + observ
- **Marketer** (~25) — CRM + PM + social + analytics + email
- **Creator** (~22) — PM + social + AI + scraping
- **Founder** (~22) — DB + payment + CRM + PM + analytics
- **Full Stack (Emin)** (~50) — bütün relevantlar

---

## 🎬 İnteractive Wizard Flow

```
$ npx claude-brain init

🧠 Welcome to claude-brain
   Personal AI infrastructure bootstrap

⚠️ İcazə lazımdır:
  - Layihə qovluqlarını oxumaq
  - AI profilini qurmaq
  - ~/.claude/ konfiqurasiya etmək

Davam edək? [Y/n] _

────────────────────────────────────

1/6  Sən kimsən?
     Ad? > Emin
     Əsas dil? > Azərbaycan
     Rol? > AI creator + tech founder

2/6  Layihə qovluqları (vergullə)?
     > ~/MyJobs, ~/Projects, ~/Code
     
     ✓ 26 layihə tapdım:
       [×] azerogluemin.az
       [×] restoran-crm
       [×] cavably
       [×] etehsil_app
       [ ] (uncheck istəmədiyini)

3/6  Yeni layihə yaradanda — hansı növ?
     [1] SaaS
        [a] Classic (saas-fullstack-pro) — restoran-crm style
        [b] AI-First (saas-ai-pro) — cavably style
     [2] AI Studio (design-ai style)
     [3] Brand Site (azerogluemin.az style)
     [4] Social Ops (content workflow)
     [5] Data Platform (sahil-transport style)

4/6  Skill bundle?
     [×] Foundation (12)
     [ ] Developer
     [ ] Marketer
     [ ] Creator
     [×] Founder
     [×] Full Stack (Emin) — bütün tier-lər

5/6  Agent bundle?
     [×] Foundation (5)
     [×] Engineering Core (10)
     [×] SEO Suite (18 — claude-seo)
     [ ] Vertical (legal/medical/finance)

6/6  MCP bundle?
     [×] Day-1 Essential (8)
     [×] Communication (Slack, Telegram)
     [×] Cloud (Vercel, Cloudflare)
     [×] AI Providers (OpenAI, Anthropic, ElevenLabs, Replicate)
     [×] Browser (Playwright, Browserbase)
     [ ] Per MCP credential (sonra hər biri üçün)

─────────────────────────────────────

✓ Setup tamamlandı!

İndi sına:
  $ claude          # interaktiv başlat
```

---

## 🛡️ Privacy & Permission

Hər mərhələdə **explicit OK**:
- ⚠️ Layihə qovluğunu oxumaq?
- ⚠️ ~/.claude/ yazmaq?
- ⚠️ Meta MCP qoşmaq?
- ⚠️ GitHub backup repo yaratmaq?

User imtina edirsə → adaptiv davranır.

---

## 📦 Distribution

### Mərhələ B (1-2 həftə)
- Lokal proof of concept
- Sənin kompüterində test
- ~/MyJobs/claude-brain/ repo, lokal

### Mərhələ C (2-3 həftə)
- GitHub public repo
- npm publish: `npx claude-brain init`
- README EN + AZ
- Documentation site
- ProductHunt + Twitter launch

### Mərhələ D (3+ ay)
- Community presets (PR)
- Hosted memory (opsional alternative)
- Pro presets (curated)

---

## 🎯 Mərhələ B Plan (sıradakı söhbət)

### B-1: Repo skeleton (1 saat)
- packages/cli/, packages/templates/, packages/mcps/ qovluqları
- LICENSE, .gitignore
- package.json workspace

### B-2: 5 NEW skill yarat (2-3 saat)
- `learning-keeper` — bizim öyrənmə sistemi
- `az-copywriter` — AZ qrammatika
- `architect` — system design
- `doc-writer` — auto README/API docs
- `test-writer` — Vitest/Playwright generator

### B-3: home/ qovluğu hazırla (2 saat)
- CLAUDE.md universal qaydalar
- home/skills/, home/agents/, home/knowledge/
- Mövcud skill-ləri symlink/kopya

### B-4: install.sh + uninstall.sh (1 saat)
- ~/.claude/ backup → symlink → test

### B-5: Lokal test (1 saat)
- Sənin kompüterində install
- claude code başlat
- knowledge avtomatik yüklənirmi?
- skill-lər trigger olurmu?

### B-6: PROPOSAL.md update (30 dəq)
- Mərhələ B nəticələri əlavə
- Açıq suallar siyahı

---

## ❓ Açıq Suallar (Mərhələ B-də həll olunacaq)

1. **Vertical agents (Tier 10)** — hansılar daxil olsun default? (legal, medical, finance, education, e-commerce, real-estate)
2. **C-Level advisors (Tier 9)** — opsional bundle yoxsa Founder bundle-da default?
3. **Memory layer 3** — local SQLite kifayətdir, yoxsa Mem0 ilə inteqrasiya?
4. **AZ-specific skills** — `az-copywriter`-i universal `multilingual-copywriter`-ə əlavə etmək olar?
5. **Distribution naming** — `claude-brain` saxla, yoxsa nəyəsə dəyiş?
6. **License** — MIT (sərbəst), yoxsa Apache 2.0 (patent qoruyucu)?

---

## 📊 Mərhələ A Statistikası

| | Saytı | Hazırda |
|---|---|---|
| Layihə audit | 26 (5 dərin, 21 səthi) | ✅ done |
| Preset | 5 layihə növü + 2 SaaS variant | ✅ locked |
| Skills | ~85 (10 tier) | ✅ catalog |
| Agents | ~75 (10 tier) | ✅ catalog |
| MCPs | ~80 (15 tier) | ✅ catalog |
| YENI yaradılacaq | 20+ skill, 17+ agent | 🟡 Mərhələ B-də |
| Sources | 35+ research links | ✅ cited |

---

**Növbəti söhbət**: Mərhələ B-1 (repo skeleton) ilə başlayırıq.
