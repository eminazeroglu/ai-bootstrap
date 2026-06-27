// Preset scaffolder — writes folder structure + CLAUDE.md per preset.
//
// Each preset defines:
//   - List of folders to create (some may be empty placeholders)
//   - Skeleton files to write (CLAUDE.md, README.md, docs/*.md template)
//
// Folders are created idempotently (no overwrites if exists).
// Files are written ONLY IF they don't exist (CLAUDE.md is sacred — never overwrite).

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { PresetId } from './preset-definitions.js';

export interface ScaffoldResult {
  foldersCreated: string[];
  filesWritten: string[];
  filesSkipped: string[];
}

interface ScaffoldOptions {
  cwd: string;
  projectName: string;
  description: string;
  bundles?: string[];
}

export function scaffoldPreset(presetId: PresetId, opts: ScaffoldOptions): ScaffoldResult {
  switch (presetId) {
    case 'saas-development':
      return scaffoldSaas(opts);
    case 'social-page':
      return scaffoldSocialPage(opts);
    case 'ai-studio':
      return scaffoldAiStudio(opts);
  }
}

// ════════════════════════════════════════════════════════════
//  SaaS Development
// ════════════════════════════════════════════════════════════

function scaffoldSaas(opts: ScaffoldOptions): ScaffoldResult {
  const r: ScaffoldResult = { foldersCreated: [], filesWritten: [], filesSkipped: [] };

  // Top-level folders
  const folders = [
    'apps/web',
    'apps/api',
    'apps/admin',
    'packages/ui',
    'packages/db',
    'packages/shared',
    'docs',
    'scripts',
    'infra',
  ];
  for (const f of folders) ensureFolder(opts.cwd, f, r);

  // docs/ — numbered template files
  const docs: { name: string; body: string }[] = [
    { name: '00-claude-code-guide.md', body: '# 00 — Claude Code Guide\n\n<!-- Necə Claude Code istifadə olunur bu layihədə -->\n' },
    { name: '01-overview.md', body: '# 01 — Layihə icmal\n\n<!-- Bu SaaS nə həll edir, kim üçündür -->\n' },
    { name: '02-architecture.md', body: '# 02 — Arxitektura\n\n<!-- Yüksək səviyyə komponent diaqramı -->\n' },
    { name: '03-stack-decisions.md', body: '# 03 — Stack qərarları\n\n<!-- Niyə bu framework, DB, deploy hostu -->\n' },
    { name: '04-multi-tenant-model.md', body: '# 04 — Multi-tenant model\n\n<!-- Shared schema / RLS / schema-per-tenant / DB-per-tenant -->\n' },
    { name: '05-auth-strategy.md', body: '# 05 — Auth strategiyası\n\n<!-- JWT/session, OAuth, RBAC vs ABAC -->\n' },
    { name: '06-api-design.md', body: '# 06 — API dizayn\n\n<!-- REST/GraphQL, naming, error format, versioning -->\n' },
    { name: '07-data-model.md', body: '# 07 — Data model\n\n<!-- Əsas entity-lər, relations, indexes -->\n' },
    { name: '08-frontend-architecture.md', body: '# 08 — Frontend arxitektura\n\n<!-- State mgmt, routing, design tokens -->\n' },
    { name: '09-decisions-log.md', body: '# 09 — Decisions log\n\nAppend-only. Hər mühüm qərar #NNN ilə qeyd olunur.\n\n## #001 — <decision title>\n**Date**: YYYY-MM-DD\n**Context**: \n**Decision**: \n**Alternatives**: \n**Tradeoff**: \n**Reversibility**: reversible / one-way\n' },
    { name: '10-open-questions.md', body: '# 10 — Open questions\n\n<!-- Cavabsız strateji suallar -->\n' },
    { name: '11-backlog.md', body: '# 11 — Backlog\n\n<!-- Növbə işlər, RICE/ICE prioritetlə -->\n' },
    { name: '12-modules.md', body: '# 12 — Modul status\n\n| Modul | Status | Owner | Notlar |\n|---|---|---|---|\n' },
    { name: '13-database.md', body: '# 13 — Database\n\n<!-- Schema, migration, RLS policies -->\n' },
    { name: '14-deployment.md', body: '# 14 — Deployment\n\n<!-- Production deploy axını, env-lər -->\n' },
    { name: '15-monitoring.md', body: '# 15 — Monitoring + observability\n\n<!-- Metrics, traces, logs, SLOs -->\n' },
    { name: '16-security.md', body: '# 16 — Security\n\n<!-- OWASP checklist, secrets, audit log -->\n' },
    { name: '17-compliance.md', body: '# 17 — Compliance\n\n<!-- GDPR/CCPA/AZ data protection -->\n' },
    { name: '18-i18n.md', body: '# 18 — Internationalization\n\n<!-- Dil dəstəyi, fallback, RTL -->\n' },
    { name: '19-testing.md', body: '# 19 — Testing\n\n<!-- Unit, integration, E2E strategiyası -->\n' },
    { name: '20-performance.md', body: '# 20 — Performance\n\n<!-- Lighthouse targets, p95 latency, optimization log -->\n' },
    { name: '21-pricing-model.md', body: '# 21 — Pricing model\n\n<!-- Tier-lər, qiymət, billing, Stripe events -->\n' },
    { name: '22-onboarding.md', body: '# 22 — Onboarding flow\n\n<!-- Signup → first value, time-to-value target -->\n' },
    { name: '23-support-runbook.md', body: '# 23 — Support runbook\n\n<!-- Customer support proseslər, response SLA -->\n' },
    { name: '24-incident-response.md', body: '# 24 — Incident response\n\n<!-- SEV1/2/3 təriflər, on-call, post-mortem template -->\n' },
    { name: '25-marketing.md', body: '# 25 — Marketing\n\n<!-- Acquisition kanallar, SEO target, paid ads -->\n' },
    { name: '26-sales-playbook.md', body: '# 26 — Sales playbook\n\n<!-- ICP, qualification, demo script -->\n' },
    { name: '27-go-live-runbook.md', body: '# 27 — Go-live runbook\n\n<!-- Production launch checklist -->\n' },
  ];
  for (const d of docs) writeIfNew(opts.cwd, `docs/${d.name}`, d.body, r);

  // Root files
  writeIfNew(opts.cwd, 'CLAUDE.md', saasClaudeMd(opts), r);
  writeIfNew(opts.cwd, 'README.md', saasReadme(opts), r);
  writeIfNew(opts.cwd, '.gitignore', saasGitignore(), r);

  return r;
}

function saasClaudeMd(o: ScaffoldOptions): string {
  return `# CLAUDE.md — ${o.projectName}

Bu fayl bu layihə üçün xüsusi instruksiyalardır. Hər söhbətdə avtomatik yüklənir.

## Layihə haqqında

${o.description || '(təsvir verilməyib — buraya yaz)'}

## Preset

SaaS Development — fullstack web + mobile + API + DB.

## Skill + agent

Project-scope skill və agent-lər \`.claude/skills/\` və \`.claude/agents/\` qovluqlarındadır.

## Strukrur

\`\`\`
apps/
├── web/         # Frontend (React/Next/Vue/Svelte)
├── api/         # Backend (NestJS/Hono/FastAPI)
└── admin/       # Admin dashboard
packages/
├── ui/          # Shared design system
├── db/          # Shared DB (Prisma schema, migrations)
└── shared/      # Shared types, utils
docs/            # 28 numbered docs (00-27)
infra/           # IaC (Terraform/Pulumi)
scripts/         # Build, deploy, seed scripts
\`\`\`

## Sərt qaydalar

1. **TypeScript strict** — \`any\` qadağa. Hər boundary-də Zod/class-validator.
2. **Multi-tenant** — hər DB sorğusunda \`tenantId\` filter. RLS Postgres-də mümkünsə.
3. **Auth** — JWT 15min + refresh rotating. Cookie HttpOnly + Secure + SameSite.
4. **Test piramida** — unit (vitest/jest), integration (testcontainers), E2E (Playwright).
5. **OWASP Top 10** — hər PR-da security-auditor agent.
6. **decisions-log** append-only — \`docs/09-decisions-log.md\`-ə hər mühüm qərar #NNN.
7. **Living docs** — kod dəyişdikdə \`docs/12-modules.md\` status yenilənir.
8. **No silent catch** — error-lar həmişə loglanır + struktur cavab.

## Custom rules (bu layihəyə xas)

<!-- Buraya layihəyə xas qaydalar yaz -->
`;
}

function saasReadme(o: ScaffoldOptions): string {
  return `# ${o.projectName}

${o.description || '(qısa təsvir)'}

## Quick start

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

## Docs

Bütün sənədlər \`docs/\` qovluğunda (00-27 numbered).

- [01 — Overview](./docs/01-overview.md)
- [02 — Architecture](./docs/02-architecture.md)
- [03 — Stack decisions](./docs/03-stack-decisions.md)
- [09 — Decisions log](./docs/09-decisions-log.md)
- [14 — Deployment](./docs/14-deployment.md)
`;
}

function saasGitignore(): string {
  return [
    'node_modules/', 'dist/', '.next/', '.nuxt/', '.svelte-kit/', 'build/',
    '.env', '.env.local', '.env.*.local', '*.log',
    '.DS_Store', '.idea/', '.vscode/',
    'coverage/', '*.tsbuildinfo',
    '',
  ].join('\n');
}

// ════════════════════════════════════════════════════════════
//  Social Page
// ════════════════════════════════════════════════════════════

function scaffoldSocialPage(opts: ScaffoldOptions): ScaffoldResult {
  const r: ScaffoldResult = { foldersCreated: [], filesWritten: [], filesSkipped: [] };

  // Strategy folders
  ensureFolder(opts.cwd, 'strategy', r);
  ensureFolder(opts.cwd, 'calendar', r);

  // Today's daily folder (auto-create with date)
  const today = todayDateStr();
  const dailyBase = `days/${today}`;
  for (const sub of ['characters', 'shots', 'video', 'music', 'thumbnail', 'final']) {
    ensureFolder(opts.cwd, `${dailyBase}/${sub}`, r);
  }

  // Prompts library
  for (const sub of ['characters', 'shots', 'thumbnails', 'music']) {
    ensureFolder(opts.cwd, `prompts-library/${sub}`, r);
  }

  // Assets, analytics, references
  for (const f of ['assets/brand-logo', 'assets/fonts', 'assets/color-palette', 'analytics']) {
    ensureFolder(opts.cwd, f, r);
  }

  // Strategy MD skeletons
  writeIfNew(opts.cwd, 'strategy/brand-guide.md', socialBrandGuide(opts), r);
  writeIfNew(opts.cwd, 'strategy/content-pillars.md', socialContentPillars(opts), r);
  writeIfNew(opts.cwd, 'strategy/audience-personas.md', socialAudiencePersonas(), r);
  writeIfNew(opts.cwd, 'strategy/competitors.md', socialCompetitors(), r);

  // Calendar
  writeIfNew(opts.cwd, `calendar/content-plan-${today.slice(0, 7)}.md`, socialMonthlyPlan(today), r);

  // Root files
  writeIfNew(opts.cwd, 'CLAUDE.md', socialClaudeMd(opts), r);
  writeIfNew(opts.cwd, 'README.md', socialReadme(opts), r);
  writeIfNew(opts.cwd, '.gitignore', socialGitignore(), r);

  return r;
}

function socialClaudeMd(o: ScaffoldOptions): string {
  return `# CLAUDE.md — ${o.projectName}

Bu fayl bu sosial brand üçün xüsusi instruksiyalardır.

## Brand haqqında

${o.description || '(təsvir verilməyib — buraya yaz)'}

## Preset

Social Page — sosial brand idarəsi (kontent + strateji + analitika).

## Strukrur

\`\`\`
strategy/
├── brand-guide.md          # Voice, tone, do/don't
├── content-pillars.md      # 4-6 pillar
├── audience-personas.md    # 3-5 persona
└── competitors.md
calendar/
└── content-plan-YYYY-MM.md
days/
└── YYYY-MM-DD/
    ├── characters/  shots/  video/  music/  thumbnail/  final/
prompts-library/             # Təsdiqlənmiş prompt-lar
├── characters/  shots/  thumbnails/  music/
assets/
├── brand-logo/  fonts/  color-palette/
analytics/
\`\`\`

## Sərt qayda — Prompt əvvəl, MD sonra (vizual təsdiqsiz fayl yaratma)

Vizual layihələrdə (obraz, shot, thumbnail, video keyframe):
1. **Prompt-u chat-də yaz** (paste-ready) — istifadəçi generate edir
2. **İstifadəçi şəkili göstərir** — bəyənir/bəyənmir
3. **Təsdiq olsa** → həmin prompt MD-yə yaxud uyğun qovluğa yazılır (\`prompts-library/\`-ə əlavə)
4. **Təsdiq olmasa** → düzəliş, yenidən prompt
5. **Vizual təsdiqsiz fayl qadağa**

## Sərt qayda — Günlük qovluğa təşkilatlılıq

Hər gün öz qovluğunda işləyirik (\`days/YYYY-MM-DD/\`). İşlərin qarışmaması üçün:
- Bu günün karakterləri → \`days/<today>/characters/\`
- Bu günün shot-ları → \`days/<today>/shots/\`
- Final video → \`days/<today>/final/\`

Strategy / calendar (uzunmüddətli) ayrıca qalır.

## Sərt qayda — Mütəxəssis-səviyyə araşdırma

Hər iddia / tövsiyə / copy üçün:
- Web search / faktiki mənbə yoxlanır
- "Düşünürəm ki..." yerinə "Mənbə X-də bu yazılıb..."
- Uydurma yox

## Custom rules

<!-- Buraya brand-spesifik qaydalar yaz -->
`;
}

function socialBrandGuide(o: ScaffoldOptions): string {
  return `# Brand Guide — ${o.projectName}

## Voice
<!-- Brand necə danışır? 1-2 cümlə. Misal: "AI komediya creator, sözünü kəsməyən, müsbət enerjili" -->

## Tone (per context)
- **Educational post**:
- **Komediya Reel**:
- **BTS story**:
- **DM cavab**:

## Visual identity
- **Rəng palitrası** (hex codes):
- **Tipoqrafiya** (font ailəsi):
- **Logo qaydaları**:

## Do (mütləq et)
-

## Don't (mütləq etmə)
-

## Voice nümunələri (real post-lardan)
> "..."

## Brand əsas hekayəsi
<!-- 2-3 cümlə — sən kimsən, nə üçün varsan -->
`;
}

function socialContentPillars(o: ScaffoldOptions): string {
  return `# Content Pillars — ${o.projectName}

4-6 pillar. Hər post bir pillarə düşməlidir.

## Pillar 1: <ad>
- **Məqsəd**: <educational / entertainment / inspiration / community / promotion>
- **Format-lar**: <Reel / Story / Carousel / Static>
- **Tezlik**: hər həftədə X dəfə
- **Pillar nümunəsi**:

## Pillar 2:

## Pillar 3:

## Pillar 4:

## Distribution (haftalıq cədvəl)
| Gün | Pillar | Format |
|---|---|---|
| Mon | | |
| Tue | | |
| Wed | | |
| Thu | | |
| Fri | | |
| Sat | | |
| Sun | | |
`;
}

function socialAudiencePersonas(): string {
  return `# Audience Personas

## Persona 1: <ad>
- **Yaş**:
- **İş**:
- **Pain point**:
- **Niyə bizi izləyir**:
- **Hansı pillar ona xitab edir**:

## Persona 2:

## Persona 3:
`;
}

function socialCompetitors(): string {
  return `# Competitors

| Brand | Handle | Niye baxırıq | Nə öyrənirik |
|---|---|---|---|

`;
}

function socialMonthlyPlan(today: string): string {
  const ym = today.slice(0, 7);
  return `# Content Plan — ${ym}

## Theme this month
<!-- 1 cümlə — ayın əsas mövzusu -->

## Goals
- Reach:
- Engagement:
- Follower growth:
- Saved posts:

## Weekly cadence
| Week | Theme | Posts |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
`;
}

function socialReadme(o: ScaffoldOptions): string {
  return `# ${o.projectName}

${o.description || '(qısa təsvir)'}

## Workflow

1. Strategy yenilə → \`strategy/\`
2. Aylıq plan → \`calendar/\`
3. Hər gün öz qovluğu → \`days/YYYY-MM-DD/\`
4. Təsdiqlənmiş prompt-lar → \`prompts-library/\`

## Claude Code

Bu layihə \`ai-bootstrap\` ilə qurulub. Skills + agents \`.claude/\` qovluğundadır.
\`\`\`bash
claude
\`\`\`
`;
}

function socialGitignore(): string {
  return [
    '.DS_Store', '*.log',
    'days/*/video/*.mp4', 'days/*/music/*.wav', 'days/*/music/*.mp3',
    '# Large media — store via Drive/Dropbox if needed:',
    '# days/*/final/*.mp4',
    '',
  ].join('\n');
}

// ════════════════════════════════════════════════════════════
//  AI Studio
// ════════════════════════════════════════════════════════════

function scaffoldAiStudio(opts: ScaffoldOptions): ScaffoldResult {
  const r: ScaffoldResult = { foldersCreated: [], filesWritten: [], filesSkipped: [] };

  // Projects — hər iş bir project kimi açılır (days/ YOXDUR)
  ensureFolder(opts.cwd, 'projects', r);

  // References
  for (const f of ['references/pixar-style', 'references/cinematography', 'references/color-grading']) {
    ensureFolder(opts.cwd, f, r);
  }

  // Prompts library
  for (const sub of ['characters', 'shots', 'video', 'music']) {
    ensureFolder(opts.cwd, `prompts-library/${sub}`, r);
  }

  // Root files
  writeIfNew(opts.cwd, 'CLAUDE.md', aiStudioClaudeMd(opts), r);
  writeIfNew(opts.cwd, 'README.md', aiStudioReadme(opts), r);
  writeIfNew(opts.cwd, '.gitignore', socialGitignore(), r); // same as social

  return r;
}

function aiStudioClaudeMd(o: ScaffoldOptions): string {
  return `# CLAUDE.md — ${o.projectName}

Bu fayl bu AI Studio üçün xüsusi instruksiyalardır.

## Studio haqqında

${o.description || '(təsvir verilməyib — buraya yaz)'}

## Preset

AI Studio — AI ilə video / şəkil / musiqi production. Müştəri sifarişləri + şəxsi eksperimentlər. Sosial nəşr yoxdur.

## Struktur

\`\`\`
projects/                    # Bütün işlər BURDA — hər iş = bir project
├── <project-name>/
│   ├── brief.md             # Project məlumatları (ssenari, məqsəd, stil, deadline)
│   ├── characters/  locations/  shots/  video/  music/  final/
references/                  # Stil + texniki referans
├── pixar-style/
├── cinematography/
└── color-grading/
prompts-library/             # Təsdiqlənmiş prompt-lar
├── characters/  shots/  video/  music/
\`\`\`

> \`days/\` qovluğu **yoxdur**. Bu studio sırf project-əsaslıdır. Gündəlik eksperiment də olsa, bir project kimi \`projects/\`-də açılır.

## Sərt qayda — Project-əsaslı iş axını (entry flow)

Bu studioda hər iş **bir project** kimi başlayır. İstifadəçi yeni işə başlamaq istəyəndə bu addımları SIRAYLA izlə:

1. **Project adı soruş** — "Project adı nədir?" → \`projects/<project-name>/\` yarat (kebab-case).
2. **Project məlumatlarını soruş** — ardıcıl olaraq:
   - Ssenari / brief (var? yox? danış)
   - Məqsəd / format (reel, qısa film, reklam, klip, video, şəkil, musiqi...)
   - Stil / referans (pixar, cinematic, və s.)
   - Deadline / müştəri (varsa)
3. **\`brief.md\` yaz** — toplanan bütün məlumatı \`projects/<project-name>/brief.md\`-ə yaz ki, Claude Code bu projecti tanısın.
4. **Projecti tanı** — bundan sonra bu project üzərində işləyirik. Hər referans \`projects/<project-name>/\` daxilindədir.
5. **İşə başla** — pipeline-a keç (script → storyboard → image → video → music), uyğun skill-ləri çağır.

> Mövcud project açılırsa: \`projects/<project-name>/brief.md\` oxu → kontekst bərpa et → davam et.

## Sərt qayda — Prompt əvvəl, MD sonra (vizual təsdiqsiz fayl yaratma)

Vizual layihələrdə:
1. Prompt-u chat-də yaz → istifadəçi generate edir
2. Şəkil göstərilir → bəyənilir/yox
3. Təsdiq olsa → prompt MD-yə + \`prompts-library/\`-ə yazılır
4. Vizual təsdiqsiz fayl qadağa

## Sərt qayda — Stil referansı əvvəl, prompt sonra

Yeni layihəyə başlamadan əvvəl:
1. Müştəri / brief stilini araşdır (\`references/\`-də referans top)
2. Stil prinsipləri çıxar (color, lighting, character design rules)
3. **Sonra** prompt yaz

## Sərt qayda — Workflow file naming

- Characters: \`obraz-1.png\`, \`obraz-2.png\`, ... (sıra ilə)
- Shots: \`kadr-1.png\`, \`kadr-2.png\`, ...
- Videos: \`video-1.mp4\`, \`video-2.mp4\`
- Music: \`music-1.mp3\`, \`music-final.wav\`
- Final: \`final-9x16.mp4\`, \`final-16x9.mp4\`

## Custom rules

<!-- Buraya studio-spesifik qaydalar yaz -->
`;
}

function aiStudioReadme(o: ScaffoldOptions): string {
  return `# ${o.projectName}

${o.description || '(qısa təsvir)'}

## Workflow

Hər iş = bir project. Yeni işə başlayanda Claude Code:
1. Project adı soruşur → \`projects/<name>/\` yaradır
2. Project məlumatlarını soruşur (ssenari, məqsəd, stil, deadline) → \`brief.md\`-ə yazır
3. Projecti tanıyır → işə başlayır
4. Stil refs → \`references/\`-yə top
5. Uğurlu prompt → \`prompts-library/\`-yə əlavə

## Claude Code

\`\`\`bash
claude
\`\`\`
`;
}

// ════════════════════════════════════════════════════════════
//  Helpers
// ════════════════════════════════════════════════════════════

function ensureFolder(cwd: string, relPath: string, r: ScaffoldResult): void {
  const full = join(cwd, relPath);
  if (!existsSync(full)) {
    mkdirSync(full, { recursive: true });
    r.foldersCreated.push(relPath);
  }
}

function writeIfNew(cwd: string, relPath: string, body: string, r: ScaffoldResult): void {
  const full = join(cwd, relPath);
  if (existsSync(full)) {
    r.filesSkipped.push(relPath);
    return;
  }
  // Ensure parent exists
  const parent = full.substring(0, full.lastIndexOf('/'));
  if (parent && !existsSync(parent)) mkdirSync(parent, { recursive: true });
  writeFileSync(full, body, 'utf-8');
  r.filesWritten.push(relPath);
}

function todayDateStr(): string {
  // Use TZ-aware date (local time, ISO format)
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
