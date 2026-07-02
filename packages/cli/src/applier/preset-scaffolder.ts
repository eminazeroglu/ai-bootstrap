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

  // STANDARDS.md — tək həqiqət mənbəyi (dünya-standartı qaydalar)
  writeIfNew(opts.cwd, 'docs/STANDARDS.md', saasStandardsMd(), r);
  // Plan qovluğu indeksi (PLAN-FIRST qaydası — planlar git-ə MD düşür)
  writeIfNew(opts.cwd, 'docs/plans/README.md', saasPlansReadme(), r);

  // Root files
  writeIfNew(opts.cwd, 'CLAUDE.md', saasClaudeMd(opts), r);
  writeIfNew(opts.cwd, 'README.md', saasReadme(opts), r);
  writeIfNew(opts.cwd, '.gitignore', saasGitignore(), r);

  return r;
}

function saasStandardsMd(): string {
  return `# STANDARDS.md — Dünya standartı qaydalar (tək həqiqət mənbəyi)

> Bu sənəd **hər kod yazılmadan ƏVVƏL** baxılır. Qaydalar **konkret, yoxlana bilən** olmalıdır — təxmin yox.
> Yeni qayda yalnız real tapıntı/maintainer-docs/audit əsasında əlavə olunur. CLAUDE.md "MÜHƏNDİS KİMİ DÜŞÜN" qaydası bu sənədi məcburi edir.
>
> ⛔ İş sonu DOORS-check (CLAUDE.md): yazdığın kodu bu siyahıya qarşı yoxla. Pozuntu → düzəlt, sonra "bitdi".

## Texnologiya bazası

<!-- Stack seçildikdə doldur: NestJS/Hono · Prisma · Postgres (RLS) · React/Next · TanStack Query · Tailwind · zod · vitest. Yeni texnologiya gələndə bu siyahını yenilə + decisions-log. -->

---

## Backend

- **MƏCBURİ — atomik idempotency:** "oxu-sonra-yaz" (token rotation, finance, enrollment) tək \`$transaction\` daxilində compare-and-swap (\`updateMany({where:{...,revokedAt:null}})\` / \`SELECT FOR UPDATE\`). **QADAĞAN:** transaction-dan kənar read-then-write.
- **MƏCBURİ — controller yalnız \`HttpException\` alt sinifləri** (Unauthorized/BadRequest/NotFound...). **QADAĞAN:** çılpaq \`throw new Error()\` (500 + yanlış status).
- **MƏCBURİ — auth sabit-zaman:** login not-found yolunda dummy hash-verify (timing enumeration yox). Per-user failed-attempt lockout.
- **MƏCBURİ — mərkəzi cookie:** maxAge mərkəzi servisdə config TTL-dən. **QADAĞAN:** cookie magic-number controller-də.
- **MƏCBURİ — rate-limit** auth/mutasiya route-larda (Redis store) + global \`helmet\`. (OWASP A05/A07)
- **MƏCBURİ — test:** hər endpoint ≥1 inteqrasiya testi (supertest+testcontainers); hər tenant modul iki-tenant izolyasiya testi (guard + RBAC fail-closed + throttle). **QADAĞAN:** yalnız service-unit "bitdi".
- **QADAĞAN:** biznes modulda \`unscoped\` Prisma client (ESLint ilə bloklan; RLS backstop var). \`unscoped\` yalnız super-admin/auth.

## Frontend

- **⛔⛔ MƏCBURİ — SHARED KOMPONENT (BAŞ QAYDA):** UI element lazım olanda İŞDƏN ƏVVƏL \`packages/ui\` export-larını yoxla. Varsa işlət; yoxdursa əvvəl ui-a əlavə et. **QADAĞAN:** səhifə içində əl ilə \`<button>\`/\`<div>\` tab/badge "öz versiyam"; eyni UI 2+ yerdə.
- **MƏCBURİ — session mərkəzi:** tək \`useMe()\` hook + key factory + staleTime. **QADAĞAN:** \`['me']\` inline string, ikiqat session sorğusu.
- **MƏCBURİ — query-key yalnız factory-dən** (feature başına \`keys.ts\`). Kontekst keçidi = mərkəzi \`queryClient.clear()\` (açara ctx prefiksi yox).
- **MƏCBURİ — tək axios instansı:** ui öz client export etməsin; token-li factory ötür. **401 → refresh-rotation interceptor** (tək in-flight promise).
- **MƏCBURİ — modal request izolyasiyası:** hər modal \`withModalGuard\` (open=false → render yox). **QADAĞAN:** açılmamış komponentdən sorğu.
- **MƏCBURİ — bir CRUD = \`useMutation\`** (əl-invalidate yox). Hər form = \`zodResolver\`+\`<Form><Field>\` (manual useState yox).
- **MƏCBURİ — route:** data-router, \`route.lazy\`, hər ağaca \`errorElement\`.
- **MƏCBURİ — i18n tam:** bütün user-facing mətn \`t()\`. Namespace başına fayl + lazy-load. **QADAĞAN:** hardcoded string, flat mega-JSON.
- **MƏCBURİ — permission mərkəzi:** tək \`me.permissions\` Set lookup. **QADAĞAN:** rol-hardcode + divergent məntiq.

## DB (Prisma + Postgres)

- **MƏCBURİ — timestamptz:** instant sütunları \`@db.Timestamptz(3)\`; yalnız təqvim tarixləri \`@db.Date\`. **QADAĞAN:** instant üçün \`timestamp without time zone\`.
- **MƏCBURİ — RLS hər tenant cədvəl/pivot:** \`tenant_id\` + \`ENABLE\`+\`FORCE ROW LEVEL SECURITY\` + policy (manual SQL migration — Prisma policy idarə etmir). **QADAĞAN:** yalnız app-filter.
- **MƏCBURİ — referential integrity DB-də:** cross-cədvəl FK; cross-tenant istinadda membership assert.
- **MƏCBURİ — adlandırılmış migration** (\`migrate dev --name\`); \`db push\` yalnız local throwaway.
- **MƏCBURİ — runtime DB rolu non-owner** (RLS-ə tabe); migration owner \`DIRECT_URL\`.
- **MƏCBURİ — index:** tez-tez range/sort olunan sütunlara (\`tenant_id\` + status/tarix) composite index.

## Security / Crypto / DevSecOps

- **MƏCBURİ — sirlər şifrəli istirahətdə:** bərpa edilə bilən sirlər AES-256-GCM envelope encryption.
- **MƏCBURİ — CI security:** bloklayıcı gitleaks + \`pnpm audit --audit-level=high\` + Dependabot.
- **MƏCBURİ — enumeration qoruması:** register/forgot enumeration-həssas axınlarda per-email throttle/captcha; forgot HƏMİŞƏ uğur qaytarır.
- **MƏCBURİ — cookie:** HttpOnly + Secure + SameSite; access memory-only, refresh HttpOnly + rotating + reuse-detection.
- **MƏCBURİ — OWASP Top 10:** hər PR-da nəzərə alınır (A01 access control / tenant izolyasiya başda).

---

## İstifadə qaydası

1. **İşdən ƏVVƏL:** müvafiq bölməni oxu. Yeni pattern lazımdırsa — maintainer docs araşdır (təxmin yox), bura əlavə et.
2. **İş SONU (DOORS-check):** yazdığını bu siyahıya qarşı yoxla. Pozuntu → düzəlt.
3. **Yeni qayda:** yalnız real tapıntı/standart əsasında; decisions-log #NNN + bura.
`;
}

function saasPlansReadme(): string {
  return `# Planlar (docs/plans/)

> Hər modul/böyük işdən ƏVVƏL plan burada MD olaraq saxlanır (CLAUDE.md PLAN-FIRST qaydası).
> Plan \`~/.claude/plans/\`-də (git-dən kənar) QALMAMALIDIR — bütün qərarlar git-ə düşür.
> İş bitəndə plan qalır (tarixçə).

## İndeks

| Plan | Modul | Status |
|---|---|---|
| _(hələ plan yoxdur)_ | — | — |

## Format (hər plan faylı üçün)

1. **Əhatə** — nə qurulur, nə qurulmur.
2. **Mənbə/standart** — hansı docs/STANDARDS bölmələri, qərarlar.
3. **Addımlar** — DB → backend → frontend → test → verification (faza sırası).
4. **Test planı** — unit + inteqrasiya + izolyasiya + E2E.
5. **Verification** — "bitdi" meyarları (yoxlana bilən).
6. **Risklər / açıq suallar.**
`;
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

## ⛔ Dünya-standartı sərt qaydalar (hər layihədə MÜTLƏQ)

Bunlar universal mühəndislik prinsipləridir — primitiv/sızma xətalarının qarşısını alır. **Tək həqiqət mənbəyi:** \`docs/STANDARDS.md\` (işdən ƏVVƏL oxunur).

### ⛔⛔⛔ KEYFİYYƏT > SÜRƏT (heç vaxt köşə kəsmə)

**Heç vaxt modulu tez bitirmək üçün sürətli, keyfiyyətsiz həll təklif etmə.** Modulun DÜZGÜN işləməsi və iş axışının DOĞRU olması həmişə sürətli/keyfiyyətsiz bitməsindən üstündür. ❌ "MVP üçün sadələşdirək / sonra edək / əsas işləyir" deyib iş axınının hissəsini atlamaq QADAĞAN. ✅ Hər iş axını TAM, düzgün, real işləyən — bütün addımlar, edge case, validasiya, təhlükəsizlik. "Bitdi" yalnız test+doğrulama ilə. Şübhə olanda keyfiyyəti seç.

### ⛔⛔⛔ PLAN-FIRST (hər modul/böyük işdən ƏVVƏL)

Hər modul/böyük işə başlamazdan ƏVVƏL plan: (1) mənbə oxu (\`docs/STANDARDS.md\` + modul docs) → müzakirə (real qərarlar AskUserQuestion) → təsdiq; (2) plan modu — əhatə + DB/backend/frontend addımları + test + faza sırası → ExitPlanMode; (3) plana sadiq qal — hər faza: kod→test→MD→commit. ⛔ Plan faylı git-ə MD düşməlidir (\`docs/plans/<modul>.md\`) — \`~/.claude/plans/\`-də QALMAMALIDIR. Heç bir qərar/plan git-dən kənarda qalmasın.

### ⛔⛔⛔ MƏRKƏZLƏŞDİR: az kod, çox iş (HƏR İŞDƏ — backend + frontend)

Problemi **bir mərkəzi yerdə** həll et; hər feature/səhifə/endpoint-də təkrarlama (boilerplate) QADAĞAN. Kod yazmadan ƏVVƏL soruş: "təkrar yazacağam, yoxsa bir yerdə həll edib avtomatik istifadə etdirə bilərəm?" Eyni şeyi 3+ yerdə → helper/hook/guard/interceptor/factory-yə çıxar. **Boilerplate = bug riski** ("hər yerdə X yazmağı unutma" tələb edən həll YANLIŞ — biri unudulanda səssiz bug). Nümunələr: 401=mərkəzi interceptor; form=\`<Form><Field>\`+zod; RLS=tenant-extension; xəta=mərkəzi exception filter.

### ⛔⛔⛔ DÜNYA SƏVİYYƏLİ MÜHƏNDİS KİMİ DÜŞÜN (primitiv xəta qarşısı)

1. **SİMPTOM YOX, KATEQORIYA** — bug tapanda: "bu TƏKdir, yoxsa nümunədir? Eyni kök harada var?" Whack-a-mole QADAĞAN — kateqoriyanı mərkəzi yerdə həll et.
2. **MÖVCUD KODU SORĞULA** — "bu hissə dünya standartıdırmı, yoxsa köhnə/səhvdir?" Köhnədirsə bildir + düzgününü təklif et (təxminlə yox — maintainer docs).
3. **PRIMITIV YOXLAMA (hər iş sonu):** login olmayan istifadəçi sorğu göndərirmi? Açılmamış modal/tab request edirmi? State iki yerdə saxlanırmı? "Hər yerdə X" tələb edən həll varmı?

**4 mexanizm:** (A) STANDARDS.md = tək həqiqət (işdən əvvəl oxu); (B) plan-fazasında dərin araşdırma (maintainer docs, təxmin yox); (C) DOORS-check — iş sonu adversarial audit (security-auditor; xətanı istifadəçi tapmadan ƏVVƏL özün tap); (D) audit borc-siyahısı (yeni modulla əlaqəli açıq tapıntını da həll et).

### ⛔ Living docs (hər iş sonunda MÜTLƏQ)

Toxunduğun sahənin MD-si yenilənməlidir (DB→13/07, auth→05, tenant→04, API→06, RBAC→16, i18n→18, test→19, stack→03, qərar→09 #NNN, modul status→12). MD source-of-truth. "Bitdi" = decisions-log + modul status yenilənib (MINIMUM).

### ⛔ SHARED komponent (frontend BAŞ qaydası)

Hər UI elementi = paylaşılan \`packages/ui\` komponenti. İşdən ƏVVƏL ui export-larını yoxla; varsa işlət, yoxdursa əvvəl ui-a əlavə et. ⛔ Səhifə içində əl ilə \`<button>\`/\`<div>\` ilə tab/badge "öz versiyam" QADAĞAN.

### ⛔⛔⛔ DESIGN-FIRST (hər səhifə/UI-dan ƏVVƏL — prototip → təsdiq → kod)

**Heç bir səhifə/komponenti real React/Vue kodu kimi yazmazdan ƏVVƏL, əvvəlcə onun prototipini hazırla və istifadəçinin TƏSDİQİNİ al.** İstifadəçi nə qurduğunu görməmişdən kod yazmaq QADAĞAN — "kor-koranə səhifə" = təkrar iş + yanlış istiqamət.

**⛔ MƏCBURİ — \`ui-ux-pro-max\` skill:** hər yeni ekran/UI dizaynında (prototip + sonra real kod) \`ui-ux-pro-max\` skill-ini İŞLƏT. Bu skill dizayn ağlını (50+ stil, semantik token, dashboard/form layout patternləri, a11y, tipoqrafiya, animasiya) verir — prototipdən ƏVVƏL aktivləşdir, dizayn qərarları onun prinsiplərinə tabe olsun. (SaaS/idarəetmə paneli üçün ən uyğun skill — araşdırma ilə təsdiqlənib.)

**Sıra (hər səhifə/ekran üçün):**
1. **Prototip hazırla** (\`ui-ux-pro-max\` ilə) — tək fayl, statik **HTML + Tailwind (CDN)**, real məzmun + real layout (placeholder "lorem" yox; əsl sahələr/düymələr/state-lər). Fayl \`docs/prototypes/<səhifə>.html\` (git-ə düşür — dizayn tarixçəsi).
2. **İstifadəçiyə göstər** — brauzerdə açıb görsün (lokal yol və ya \`open\` ilə). İstifadəçi interaktiv baxır (responsive, hover, vəziyyətlər).
3. **Təsdiq gözlə.** İstifadəçi bəyənməsə → düzəlt VƏ YA istəsə ChatGPT/dizayn üçün **şəkil prompt-u** yaz (səhifənin dizaynını təsvir edən detallı prompt — istifadəçi şəkli sənə göndərəcək, ona uyğun prototipi yenidən qur).
4. **Yalnız təsdiqdən sonra** real komponenti yaz — prototipdəki **eyni Tailwind class/struktur** birbaşa \`packages/ui\` + səhifəyə köçür (sıfır təkrar iş; prototip = komponentin əsası).

**Niyə:** prototip ucuz + sürətli düzəliş; istifadəçi erkən yönləndirir; təsdiqlənmiş dizayn birbaşa koda çevrilir (mərkəzləşdir prinsipi — dizayn tokenləri prototipdən komponentə). ⛔ Prototip atlamaq = istifadəçinin görmədiyi UI = sonradan yenidən-yazma riski.

**İstisna:** kiçik dəyişiklik (mövcud təsdiqlənmiş səhifədə tək düymə/mətn) — prototip lazım deyil. Yeni səhifə/ekran/böyük UI dəyişikliyi — MÜTLƏQ prototip.

### ⛔⛔⛔ FORM VALİDASİYA — error mesajı HƏMİŞƏ input-un ALTINDA

**Hər form validasiya error mesajı MÜTLƏQ müvafiq input-un BİRBAŞA ALTINDA göstərilməlidir.** İstisna YOX. Hər field öz error-unu öz altında daşıyır — istifadəçi hansı sahənin səhv olduğunu dərhal görür.

- ❌ QADAĞAN: error-ları yuxarıda tək siyahıda yığmaq; alert/toast ilə "form yanlışdır"; error-u input-dan uzaqda göstərmək; error-suz sadəcə border qırmızı.
- ✅ MƏCBURİ: hər \`<input>\`/\`<select>\`/\`<textarea>\` altında \`errors.<field>\` mesajı (məs. \`{errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}\`).
- ✅ Mərkəzi field komponenti (\`<FormField>\` — label + input + error bir yerdə) ilə bunu bir dəfə həll et; hər səhifədə təkrar yox (boilerplate = unudulan error = bug). Server validasiya error-ları da müvafiq field-ə map olunur (mümkünsə), ümumi server xətası ayrıca yuxarıda.

### ⛔⛔⛔ NATIVE HTML INPUT QADAĞAN — hər input shared komponent

**Heç bir halda native HTML form elementi birbaşa istifadə etmə.** Xüsusilə date/time/color picker — bunlar MÜTLƏQ \`packages/ui\` shared komponentlərdir.

- ❌ QADAĞAN: \`<input type="date">\`, \`<input type="time">\`, \`<input type="month">\`, \`<input type="color">\`, \`<input type="file">\`, \`<select>\`, xam \`<input>\`/\`<textarea>\`/\`<checkbox>\` səhifə içində.
- ✅ MƏCBURİ: \`packages/ui\`-dan — \`<Input>\`, \`<DatePicker>\`, \`<TimePicker>\`, \`<DateRangePicker>\`, \`<Select>\`, \`<Textarea>\`, \`<Checkbox>\`, \`<Switch>\`, \`<FileButton>\` və s. Yoxdursa əvvəl ui-a əlavə et, sonra işlət.
- **Səbəb:** native picker-lər brauzerdən-brauzerə fərqlidir, lokal dili dəstəkləmir, dizayn sistemindən kənardır, əlçatanlıq zəifdir. Shared komponent = vahid UX + lokal dil + dizayn tokenləri.

### ⛔⛔⛔ REACT ROUTER — object config + ayrıca router qovluğu

**React Router HƏMİŞƏ object konfiqurasiyası ilə (\`createBrowserRouter([...])\`) — JSX \`<Routes><Route>\` QADAĞAN.** Bütün route tərifləri ayrıca \`src/router/\` qovluğunda saxlanılır.

- ✅ MƏCBURİ: \`createBrowserRouter\` (və ya freymvork ekvivalenti) route obyektləri massivi ilə; \`<RouterProvider router={router} />\`.
- ✅ Route-lar \`src/router/\` qovluğunda (məs. \`src/router/index.tsx\` — əsas; lazımsa modul-route-ları ayrı fayllarda \`src/router/payroll.routes.tsx\` və birləşdir). Mərkəzi yer — bütün naviqasiya bir baxışda görünür (data loader, lazy, guard tək yerdə).
- ❌ QADAĞAN: səhifə komponentləri içində səpələnmiş \`<Routes>\`/\`<Route>\` JSX; route tərifini səhifə faylına yazmaq.
- Üstünlük: data router imkanları (loader/action/lazy), tip-təhlükəsiz route, mərkəzi guard/layout nesting.

### ⛔⛔⛔ IMPORT ALIAS — dərin nisbi yol QADAĞAN

**İki səviyyədən dərin nisbi import (\`../../\` və daha çox) QADAĞAN — hamısı alias (\`@/\`) ilə.** Workspace paketləri \`@scope/paket\` ilə.

- ❌ QADAĞAN: \`../../../../shared/api/client\`, \`../../lib/api\`, \`../../../components/Button\` — dərin nisbi yollar (kövrək, köçürəndə sınır, oxunmur).
- ✅ MƏCBURİ: \`@/lib/api\`, \`@/features/payroll/api\`, \`@/components/...\` — app-daxili alias (\`@/*\` → \`./src/*\`); workspace paketləri \`@scope/ui\`, \`@scope/shared\` (cross-package üçün heç vaxt nisbi yol yox).
- ✅ Eyni qovluq və ya bir səviyyə (\`./x\`, \`../x\`) nisbi qala bilər (lokal, oxunaqlı). İki+ səviyyə (\`../../\`) → alias.
- **Quraşdırma MƏCBURİ HƏR İKİSİNDƏ:** \`tsconfig.json\` \`paths\` (\`"@/*": ["./src/*"]\`) **VƏ** bundler alias (Vite \`resolve.alias\`, və ya \`vite-tsconfig-paths\` plugin). Yalnız tsconfig-də paths qoymaq YANLIŞdır — runtime-da (Vite/bundler) işləməz, səssiz sınar. Hər ikisi sinxron olmalı.

### ⛔ Dayanmadan davam (autonomous flow)

Sual/qərar yoxdursa dayanma. Yalnız bunlarda dayan: real qərar lazımdır (stack/dizayn/biznes), bloklayıcı problem, faza bitdi. Aksi: kod→test→MD→növbəti, fasiləsiz.

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
│   ├── brief.md             # Project məlumatları: məqsəd, format, stil, deadline, müştəri
│   ├── script.md            # Ssenari / skript (səhnələr, dialoqlar)
│   ├── characters.md        # Obrazların siyahısı + təsviri (reference promptlar bura bağlanır)
│   ├── WORKFLOW.md          # Pipeline state: hansı mərhələdəyik (showrunner bunu izləyir)
│   └── characters/  locations/  shots/  video/  music/  final/
references/                  # Stil + texniki referans
├── pixar-style/
├── cinematography/
└── color-grading/
prompts-library/             # Təsdiqlənmiş prompt-lar
├── characters/  shots/  video/  music/
\`\`\`

> \`days/\` qovluğu **yoxdur**. Bu studio sırf project-əsaslıdır. Gündəlik eksperiment də olsa, bir project kimi \`projects/\`-də açılır.

> **Hər projectin özünə aid MD faylları var.** Yeni project açılanda bu 4 fayl həmişə yaranır: \`brief.md\`, \`script.md\`, \`characters.md\`, \`WORKFLOW.md\`. Bunlar projectin "yaddaşıdır" — Claude Code projecti bunlardan tanıyır.

## Sərt qayda — Project-əsaslı iş axını (entry flow)

Bu studioda hər iş **bir project** kimi başlayır. İstifadəçi yeni işə başlamaq istəyəndə bu addımları SIRAYLA izlə:

1. **Project adı soruş** — "Project adı nədir?" → \`projects/<project-name>/\` yarat (kebab-case).
2. **Project məlumatlarını soruş** — ardıcıl olaraq:
   - Ssenari / brief (var? yox? danış)
   - Məqsəd / format (reel, qısa film, reklam, klip, video, şəkil, musiqi...)
   - Stil / referans (pixar, cinematic, və s.)
   - Deadline / müştəri (varsa)
3. **Project MD fayllarını yarat** — \`projects/<project-name>/\` daxilində bu 4 fayl həmişə yaranır:
   - \`brief.md\` — toplanan bütün məlumat (məqsəd, format, stil, deadline, müştəri)
   - \`script.md\` — ssenari mətni (varsa doldur, yoxdursa şablon saxla)
   - \`characters.md\` — obrazlar siyahısı (ssenaridən çıxar, yoxdursa boş şablon)
   - \`WORKFLOW.md\` — pipeline state tracker (cari mərhələ qeyd olunur)
4. **Projecti tanı** — bundan sonra bu project üzərində işləyirik. Hər referans və hər iş faylı \`projects/<project-name>/\` daxilindədir.
5. **İşə başla** — pipeline-a keç (script → storyboard → image → video → music), uyğun skill-ləri çağır. Hər mərhələdə \`WORKFLOW.md\`-i yenilə.

> Mövcud project açılırsa: əvvəlcə \`brief.md\` + \`WORKFLOW.md\` oxu → kontekst və cari mərhələni bərpa et → davam et.

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
