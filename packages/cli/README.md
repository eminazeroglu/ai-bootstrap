# @azerogluemin/ai-bootstrap

> **Bir komanda. Hər layihə. Hər maşın. Claude Code hər şeyi yadda saxlayır.**

[![npm](https://img.shields.io/npm/v/@azerogluemin/ai-bootstrap.svg?logo=npm&label=npm)](https://www.npmjs.com/package/@azerogluemin/ai-bootstrap)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node ≥22](https://img.shields.io/badge/Node-%E2%89%A522-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

## TL;DR — 3 addım

```bash
# 1) Bir dəfə qlobal install (ai-bootstrap komandasını maşına əlavə edir)
npm install -g @azerogluemin/ai-bootstrap

# 2) Bir dəfə user-scope wizard (foundation: 10 universal skill)
ai-bootstrap

# 3) Hər yeni layihədə (bundle: layihənin növünə uyğun skill-lər)
cd ~/Projects/yeni-layihə
ai-bootstrap new
```

Bitdi. Hər layihədə sadəcə `claude` yaz — uyğun skill + agent dəstləri özü yüklənir.

> **Niyə qlobal install?** `npx @azerogluemin/ai-bootstrap` paketi bir dəfə işlədir,
> sonra `ai-bootstrap new` komandası tapılmır. Qlobal install ilə komanda hər yerdə əlçatandır.
> Alternativ: hər dəfə `npx @azerogluemin/ai-bootstrap@latest <command>` yazmaq (uzun).

---

## Necə işləyir — 2 səviyyəli skill sistemi

Claude Code skill-ləri **2 səviyyəlidir**:

| Səviyyə | Yer | Nə vaxt yüklənir |
|---|---|---|
| **User scope** (qlobal) | `~/.claude/skills/` | Hər layihədə, hər session-da |
| **Project scope** (lokal) | `<layihə>/.claude/skills/` | YALNIZ o qovluqda |

ai-bootstrap bunun ikisini də idarə edir:
- **`npx @azerogluemin/ai-bootstrap`** → user scope (foundation: 10 əsas skill, universal lazımdır)
- **`ai-bootstrap new`** → project scope (layihə növünə uyğun bundle)

Beləliklə **AI Creator** layihən və **SaaS** layihən fərqli skill dəstləri görür. Token israfı yoxdur.

---

## İlk dəfə qurulum (bir dəfə maşına)

```bash
# Qlobal install — ai-bootstrap komandasını maşına əlavə edir
npm install -g @azerogluemin/ai-bootstrap

# Sonra wizard:
ai-bootstrap
```

Wizard 6 addım soruşur:

1. **Profile** — adın, rolun, dillərin, 6/12/24 ay məqsədlərin
2. **Projects** — mövcud layihələri scan etmək istəyirsən? (boş burax — sonra qurarsan)
3. **Bundle** — **`foundation`** seç (qlobal yalnız əsas 10 skill lazımdır; qalanlar project scope-da)
4. **MCPs** — istədiyin MCP server-ləri seç (məs. github, instagram, brave-search)
5. **Memory** — `markdown-only` (default tövsiyə)
6. **GitHub backup** — istərsən qur, istəməsən boş burax (sonra `ai-bootstrap backup init`)

Yoxla:
```bash
ai-bootstrap doctor
```
Hər şey ✓ olmalıdır.

MCP credential əlavə et (məs. github, instagram tokenları):
```bash
ai-bootstrap mcp credentials
```

`~/.zshrc`-ə (yaxud `~/.bashrc`) bir dəfə əlavə et:
```bash
echo 'set -a; [ -f ~/.ai-bootstrap.env ] && source ~/.ai-bootstrap.env; set +a' >> ~/.zshrc
source ~/.zshrc
```

---

## Hər yeni layihədə (1 komanda)

```bash
cd ~/Projects/yeni-layihə
ai-bootstrap new
```

Wizard soruşur: **"Bu qovluqda nə etmək istəyirsən?"**

| Sənin cavab | Bundle | Skill | Agent |
|---|---|---|---|
| SaaS / Fullstack web app | `developer` | 21 | 18 |
| AI Creator content | `creator` | 26 | 13 |
| Marketing / SMM | `marketer` | 24 | 29 |
| Mobile app | `developer` | 21 | 18 |
| Data analysis / dashboard | `developer` | 21 | 18 |
| Client agency work | `full-stack` | 52+ | 75+ |
| Startup / founder | `founder` | 35 | 38 |
| Open source library | `developer` | 21 | 18 |
| Just basics | `foundation` | 10 | 2 |

Yazır:
- `<layihə>/.claude/skills/` — layihəyə xas skill-lər
- `<layihə>/.claude/agents/` — layihəyə xas agent-lər
- `<layihə>/CLAUDE.md` — layihə qaydaları + təsvir

İndi:
```bash
claude
```
Yalnız bu layihənin skill dəsti yüklənir.

---

## Real istifadə nümunələri

### Senaryo 1: AI Creator layihəsi (məs. Instagram brand)

```bash
mkdir -p ~/Projects/azerogluemin-content && cd ~/Projects/azerogluemin-content
ai-bootstrap new
# Soruşur → "AI Creator content" seç → creator bundle
# 26 skill: showrunner, character-designer, image-prompt-engineer,
#          video-prompt-engineer, youtube-thumbnail-designer,
#          brand-identity-designer, instagram-expert, ...
# 13 agent: video-pipeline, storyboard-orchestrator, sound-designer, ...

claude
> "10 günlük IG content calendar yarat — AZ-də, mövzu AI-creator workflow"
> "Reel hook yaz: developer → AI creator pivot"
> "YouTube thumbnail dizayn et: AI bootstrap launch"
```

### Senaryo 2: SaaS layihə

```bash
mkdir -p ~/Projects/restoran-crm && cd ~/Projects/restoran-crm
ai-bootstrap new
# → "SaaS / Fullstack web app" → developer bundle
# 21 skill: architect, backend, frontend, devops, security-auditor, ...
# 18 agent: code-reviewer, backend-engineer, frontend-engineer, db-migrator, ...

claude
> "Multi-tenant restoran CRM arxitekturası dizayn et"
> "Postgres RLS policy yaz hər tenant üçün"
```

### Senaryo 3: Müştəri SMM işi

```bash
mkdir -p ~/Clients/restoran-smm && cd ~/Clients/restoran-smm
ai-bootstrap new
# → "Marketing / SMM" → marketer bundle
# 24 skill: seo-optimizer, copywriter-pro, social-strategist,
#          paid-ads-strategist, content-strategist, ...
# 29 agent: 18 SEO agent + social orchestrators + marketing agents

claude
> "Restoran üçün 30 günlük IG content plan + Reel hook-lar"
> "SEO audit et müştərinin saytında"
```

### Senaryo 4: Bundle əskik gəlir, əlavə skill lazımdır

```bash
cd ~/Projects/restoran-crm   # developer bundle qurulub
# İndi müştəri marketing landing page istəyir, creator skill-ləri lazımdır:
ai-bootstrap add showrunner image-prompt-engineer brand-identity-designer

# Yaxud bütün creator bundle əlavə et:
ai-bootstrap add --bundle creator
```

### Senaryo 5: İstifadə etmədiyini sil

```bash
ai-bootstrap list                # bu layihənin skill-ləri
ai-bootstrap list --all          # user + bu layihə yan-yana
ai-bootstrap remove security-auditor   # silmək
```

---

## Bütün komandalar

### Setup + sync
```bash
npm install -g @azerogluemin/ai-bootstrap    # bir dəfə qlobal install
ai-bootstrap                                   # ilk wizard (user scope foundation)
ai-bootstrap new                               # bu qovluğa layihə bundle (hər layihə)
ai-bootstrap update                            # yeni versiyada skill-ləri yenilə
ai-bootstrap doctor                            # sağlamlıq yoxlaması
```

### Skill management
```bash
ai-bootstrap add <name1> <name2>            # konkret skill/agent əlavə
ai-bootstrap add --bundle <name>            # bütün bundle əlavə
ai-bootstrap remove <name>                  # sil (alias: rm)
ai-bootstrap list                           # bu scope-da quraşdırılanlar
ai-bootstrap list --all                     # user + project hamısı (alias: ls)
ai-bootstrap list --user                    # yalnız user scope
ai-bootstrap list --project                 # yalnız bu layihə
```

### MCP servers (Instagram, GitHub, Supabase və s.)
```bash
ai-bootstrap mcp list               # 63 mövcud MCP göstər
ai-bootstrap mcp installed          # quraşdırılan MCP-lər
ai-bootstrap mcp credentials        # token-ləri əlavə et
```

### Backup (xeyrli)
```bash
ai-bootstrap backup init            # private GitHub repo-ya bağla
ai-bootstrap backup sync            # dəyişikliyi push et
ai-bootstrap backup pull            # yeni maşında bərpa
ai-bootstrap backup status          # son sinx + remote
```

### Telemetry (default OFF, opt-in)
```bash
ai-bootstrap telemetry on/off/status
```

---

## Bundle siyahısı

| Bundle | Skill | Agent | Nə üçün |
|---|---|---|---|
| `foundation` | 10 | 2 | Universal əsas — user scope-a tövsiyə |
| `developer` | 21 | 18 | SaaS, fullstack, mobile, data, open source |
| `creator` | 26 | 13 | Video, Reel, sosial content, brand |
| `marketer` | 24 | 29 | SEO, SMM, copywriting, ads (18 SEO agent) |
| `founder` | 35 | 38 | C-Level advisory + product + marketing |
| `full-stack` | 52+ | 75+ | Hamısı — multi-rol agency işi |

Tam siyahı: `npx @azerogluemin/ai-bootstrap mcp list` (MCP-lər) yaxud GitHub repo-da [packages/templates/](https://github.com/eminazeroglu/ai-bootstrap/tree/main/packages/templates).

---

## 63 MCP server (real install komanda-ları ilə)

**Dev**: github, gitlab, filesystem, git, fetch, puppeteer, playwright, vercel, cloudflare, aws, netlify, brave-search, firecrawl, tavily, exa, kubernetes, browserbase, apify, time

**Data**: postgres, supabase, mongodb, sqlite, redis, airtable

**Productivity**: notion, linear, obsidian, slack, discord, memory, atlassian (Jira + Confluence), trello, asana, clickup

**Social**: instagram, twitter, meta, youtube, linkedin, tiktok, telegram

**AI**: openai, anthropic, elevenlabs, replicate, perplexity

**Creator**: figma, spotify, youtube-transcript

**Business**: stripe, hubspot, salesforce, twilio, sendgrid

**Analytics**: ga4, sentry, posthog

**Research**: arxiv

**Google Workspace** (HTTP/OAuth): gmail, google-drive, google-calendar, google-chat

---

## 3 səviyyəli yaddaş

```
~/.claude/CLAUDE.md           ← universal qaydalar (hər session)
~/.claude/knowledge/          ← cross-layihə yaddaş (markdown + git)
learning-keeper skill         ← səhvləri yadda saxlayır, qaydaya çevirir
```

learning-keeper skill xüsusi: söhbətdə düzəliş edirsənsə ("yox elə yox, belə"), bu skill o düzəlişi `~/.claude/knowledge/mistakes-log.md`-ə yazır. Növbəti dəfə həmin səhvi etməyəcək.

---

## Files written

| Yer | Nə üçün |
|---|---|
| `~/.claude/CLAUDE.md` | Universal foundation qaydalar |
| `~/.claude/settings.json` | Permission, model, hook |
| `~/.claude/knowledge/*.md` | Cross-layihə yaddaş |
| `~/.claude/skills/<name>/` | User-scope skill (qlobal) |
| `~/.claude/agents/<name>/` | User-scope agent (qlobal) |
| `~/.claude.json` | MCP server konfiqurasiyaları |
| `~/.claude/mcp-tracking.json` | ai-bootstrap metadata |
| `~/.ai-bootstrap.env` | MCP credential-lar (chmod 600) |
| `<layihə>/CLAUDE.md` | Layihə qaydaları |
| `<layihə>/.claude/skills/` | Project-scope skill (yalnız bu qovluqda) |
| `<layihə>/.claude/agents/` | Project-scope agent |
| `<layihə>/.claude/ai-bootstrap-project.json` | Layihə bundle state |

---

## Tələblər

- **Node.js ≥ 22**
- **macOS / Linux / WSL2** — primary; Windows native best-effort
- **Disk**: ~3 MB templates + sənin yaratdığın yaddaş

---

## Problem həlli

### `ai-bootstrap: command not found`
`npx @azerogluemin/ai-bootstrap` ilə qaçırılırsa global yox. Düzəliş: ya `npm i -g @azerogluemin/ai-bootstrap`, yaxud həmişə `npx @azerogluemin/ai-bootstrap@latest <command>`.

### `npm publish` 404
Scope səhvdir. Paket adı `@<sənin npm username>/...` ilə başlamalıdır.

### `ai-bootstrap doctor` failure göstərir
- Symlink qırılıbsa → `ai-bootstrap update` qaçır
- MCP creds yoxdursa → `ai-bootstrap mcp credentials`
- CLAUDE.md yoxdursa → `npx @azerogluemin/ai-bootstrap` yenidən qaçır

### Skill aktivləşmir Claude-da
- Doğru qovluqda olduğunu yoxla (`pwd`)
- Project scope qurulubsa → `<layihə>/.claude/skills/` mövcuddur?
- `ai-bootstrap list` ilə təsdiq et

### MCP server connect olmur
- `~/.ai-bootstrap.env`-də credential-lar var?
- Shell yenidən load et: `source ~/.zshrc`
- `ai-bootstrap doctor` yoxla

---

## Development (contribute etmək üçün)

```bash
git clone https://github.com/eminazeroglu/ai-bootstrap.git
cd ai-bootstrap

pnpm install
pnpm --filter @azerogluemin/ai-bootstrap build
pnpm --filter @azerogluemin/ai-bootstrap test    # 134+ test (smoke + e2e)

# Lokal test isolated HOME-da:
HOME=/tmp/ab-sandbox node packages/cli/bin/init.js
```

Detallı [CONTRIBUTING.md](https://github.com/eminazeroglu/ai-bootstrap/blob/main/CONTRIBUTING.md).

---

## License

[MIT](./LICENSE) — fork, modify, distribute.

## Author

Built by [Emin Azəroğlu](https://github.com/eminazeroglu) ([@azerogluemin_ai](https://instagram.com/azerogluemin_ai)).

## Links

- [GitHub repo](https://github.com/eminazeroglu/ai-bootstrap)
- [Issues](https://github.com/eminazeroglu/ai-bootstrap/issues)
- [Changelog](./CHANGELOG.md)
- [Security policy](https://github.com/eminazeroglu/ai-bootstrap/blob/main/SECURITY.md)
