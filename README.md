# ai-bootstrap

> **Bir komanda. Hər layihə. Hər maşın. Claude Code hər şeyi yadda saxlayır.**

[![npm](https://img.shields.io/npm/v/@azerogluemin/ai-bootstrap.svg?logo=npm&label=npm)](https://www.npmjs.com/package/@azerogluemin/ai-bootstrap)
[![Release](https://img.shields.io/github/v/release/eminazeroglu/ai-bootstrap?logo=github&label=release)](https://github.com/eminazeroglu/ai-bootstrap/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node ≥22](https://img.shields.io/badge/Node-%E2%89%A522-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Tests](https://img.shields.io/badge/tests-142%20passing-brightgreen)](./packages/cli/tests)

## Quick start (2 addım)

```bash
# 1) Bir dəfə maşına (universal foundation)
npx @azerogluemin/ai-bootstrap

# 2) Hər yeni layihədə (layihəyə xas bundle)
cd ~/Projects/yeni-layihə
ai-bootstrap new
```

Bitdi. Hər layihədə sadəcə `claude` — uyğun skill dəsti özü yüklənir.

---

## Niyə ai-bootstrap?

Claude Code-da skill, agent, MCP, knowledge — hamısı `~/.claude/`-də saxlanır. Amma:
- Hər yeni layihədə əldə qurmaq vaxt aparır
- Bir maşından digərinə köçəndə hər şeyi sıfırdan qurmaq lazımdır
- Müxtəlif layihələr fərqli skill dəsti istəyir (AI Creator ≠ SaaS dev ≠ SMM)

ai-bootstrap bunu **2 səviyyəli sistem** ilə həll edir:

| Səviyyə | Yer | Nə vaxt yüklənir |
|---|---|---|
| **User scope** (qlobal) | `~/.claude/skills/` | Hər layihədə, hər session |
| **Project scope** (lokal) | `<layihə>/.claude/skills/` | YALNIZ o qovluqda |

`npx @azerogluemin/ai-bootstrap` user scope-a **foundation** (10 universal skill) qurur.
`ai-bootstrap new` hər layihəyə **layihə-spesifik bundle** qurur (creator / developer / marketer / founder / full-stack).

Token israfı yoxdur, skill qarışıqlığı yoxdur.

---

## Bundle siyahısı

| Bundle | Skill | Agent | Kim üçün |
|---|---|---|---|
| `foundation` | 10 | 2 | Universal əsas (user scope) |
| `developer` | 21 | 18 | SaaS, fullstack, mobile, data, OSS |
| `creator` | 26 | 13 | Video, Reel, sosial, brand |
| `marketer` | 24 | 29 | SEO + SMM + ads + copywriting |
| `founder` | 35 | 38 | C-Level + product + marketing + coaching |
| `full-stack` | 52+ | 75+ | Hamısı — multi-rol agency |

---

## İçərisində nə var

- **85+ skill** — Foundation, Product/UX, Marketing, Social, Creator, Graphic Design, Coaching, Productivity, Engineering, C-Level, Vertical specialists
- **75+ agent** — SEO suite (18), Engineering (14), C-Level mirrors (10), Vertical (8), Social orchestrators (5), Product (5), Marketing (6), Content (4), Business (3)
- **63 MCP server** — github, postgres, supabase, notion, slack, atlassian, gmail, twilio, sendgrid, spotify, kubernetes, instagram, openai, elevenlabs, ... (real install command + OAuth/credential helper)
- **3 səviyyəli yaddaş** — universal CLAUDE.md + cross-layihə knowledge files + learning-keeper auto-capture

---

## Komandalar — qısa siyahı

```bash
# Setup
npx @azerogluemin/ai-bootstrap     # ilk qurulum (user scope)
ai-bootstrap new                     # layihə bundle (project scope)

# Skill management
ai-bootstrap add <names>             # əlavə skill/agent
ai-bootstrap add --bundle creator    # bütün bundle əlavə
ai-bootstrap remove <name>           # sil (rm)
ai-bootstrap list [--all]            # quraşdırılanlar (ls)

# Sync + diagnostika
ai-bootstrap update                  # yeni versiyada yenilə
ai-bootstrap doctor                  # sağlamlıq yoxlaması

# MCP
ai-bootstrap mcp list                # 63 mövcud server
ai-bootstrap mcp credentials         # token-ləri əlavə et

# Backup
ai-bootstrap backup init/sync/pull   # private GitHub backup

# Telemetry (opt-in, default OFF)
ai-bootstrap telemetry on/off/status
```

Detallı istifadə → [packages/cli/README.md](./packages/cli/README.md).

---

## Real istifadə nümunələri

```bash
# AI Creator layihə (Instagram brand)
cd ~/Projects/azerogluemin-content && ai-bootstrap new
# → "AI Creator content" → creator bundle (showrunner, character-designer,
#    image-prompt-engineer, brand-identity-designer, instagram-expert, ...)
claude
> "10 günlük IG calendar AZ-də"

# SaaS layihə
cd ~/Projects/restoran-crm && ai-bootstrap new
# → "SaaS / Fullstack" → developer bundle (architect, devops, security, ...)

# Müştəri SMM
cd ~/Clients/restoran-smm && ai-bootstrap new
# → "Marketing / SMM" → marketer bundle (seo, copywriter, social, paid-ads, ...)

# Bundle əskik gəlir, əlavə et
ai-bootstrap add showrunner image-prompt-engineer
ai-bootstrap add --bundle creator
```

---

## Privacy + safety

- **Telemetry**: strict opt-in, OFF default. `AI_BOOTSTRAP_TELEMETRY_URL` env var yoxdursa heç yerə data getmir
- **Credentials**: MCP key-lər `~/.ai-bootstrap.env`-də (`chmod 600`), backup tərəfindən izlənmir
- **Backup**: SSH + HTTPS qəbul edir, public repo seçirsənsə xəbərdarlıq + təsdiq, ai-bootstrap token saxlamır
- **Verified packages only**: hər MCP catalog girişi `source:` ilə attribution daşıyır (official / community). Uydurma paket adı yox

Tam [SECURITY.md](./SECURITY.md).

---

## Proyekt strukturu

```
ai-bootstrap/
├── packages/
│   ├── cli/                  # Published npm paket
│   │   ├── src/{applier,commands,steps,utils}/
│   │   ├── bin/init.js
│   │   └── tests/            # 142 test (87 smoke + 55 e2e)
│   └── templates/            # Source skills + agents + home/
├── docs/                     # Proposal, decisions, publishing
└── README.md
```

---

## Contributing

PR welcome → [CONTRIBUTING.md](./CONTRIBUTING.md). Non-trivial dəyişiklik üçün əvvəlcə issue aç.

## License

[MIT](./LICENSE) — fork, modify, distribute.

## Author

Built by [Emin Azəroğlu](https://github.com/eminazeroglu) ([@azerogluemin_ai](https://instagram.com/azerogluemin_ai)).
Built with Claude Code, Azerbaijani as a first-class language.
