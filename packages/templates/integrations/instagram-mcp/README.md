---
name: Instagram MCP — @azerogluemin_ai avtomatlaşdırma
status: aktiv
last_updated: 2026-06-18
---

# Instagram MCP — @azerogluemin_ai

Bu qovluq Eminin Instagram hesabını Claude Code-dan tam idarə etmək üçün **Meta Graph API + MCP server** infrastrukturunun konfiqurasiyasını saxlayır.

## Məqsəd

Claude Code-dan @azerogluemin_ai hesabında:
- Real analytics çəkmək (like, view, save, share, reach, impressions)
- Post + Reel publish etmək
- Comment-lərə cavab yazmaq
- DM göndərmək və cavablamaq

## Cari status (2026-06-18)

| # | Addım | Status |
|---|---|---|
| 1 | Meta Developer App yaradılması | ✅ Tamam |
| 2 | Instagram API use case əlavəsi | ✅ Tamam |
| 3 | 5 icazənin aktivləşdirilməsi | ✅ Tamam |
| 4 | Instagram Tester əlavəsi (@azerogluemin_ai) | ✅ Tamam |
| 5 | Access token generation | ✅ Tamam |
| 6 | App secret çıxarılması | ✅ Tamam |
| 7 | Token-in Graph API ilə test edilməsi | ✅ Tamam (54,690 izləyici, 330 post təsdiqləndi) |
| 8 | MCP server seçimi və quraşdırılması | ✅ Tamam (14 tool, custom Node.js) |
| 9 | Real Instagram dataları docs-a inteqrasiya | ✅ Tamam (2026-06-18 baseline snapshot) |

## Faylların izahı

| Fayl | Nə üçündür | Git-də? |
|---|---|---|
| `README.md` (bu fayl) | Ümumi vəziyyət | ✅ Bəli |
| `SETUP-GUIDE.md` | Sıfırdan başlayan kompüter üçün addım-addım yenidən-quraşdırma | ✅ Bəli |
| `meta-app-config.md` | Meta app məlumatları (App ID, account ID, və s — gizli olmayan) | ✅ Bəli |
| `.env.example` | Lazımi gizli açarların şablonu | ✅ Bəli |
| `.env` | **Real gizli açarlar** (token, app secret) | ❌ **Yox** (gitignored) |
| `mcp-server-config.md` | Seçilmiş MCP server və onun konfiqurasiyası | ✅ Bəli |

## Yeni kompüterə keçəndə nə etmək

1. **Repo-nu klon et**: `git clone git@github.com:eminazeroglu/azerogluemin-az.git`

2. **Dependency-ləri qur**:
   ```bash
   cd projects/azerogluemin-ai/instagram-mcp/server
   npm install
   ```

3. **`.env` faylını yarat** (köhnə kompüterdən kopyala yaxud yenidən token çıxar):
   ```bash
   cp projects/azerogluemin-ai/instagram-mcp/.env.example \
      projects/azerogluemin-ai/instagram-mcp/.env
   # sonra real dəyərləri əlavə et: META_APP_ID, META_APP_SECRET, IG_ACCESS_TOKEN
   ```

4. **`.mcp.json`-da yolu yenilə** (repo root-da):
   - Köhnə yol: `/Users/eminazeroglu/MyJobs/azerogluemin.az/projects/...`
   - Yeni yolu öz kompüterinin path-ı ilə əvəz et

5. **Claude Code-u yenidən başlat** — MCP server avtomatik bağlanır

6. **Test et**: Claude-da soruş "mcp__instagram__ig_profile çağır" — profil qayıtmalıdır

## Təhlükəsizlik

- `.env` faylındakı token Instagram hesabına **tam giriş** verir
- Heç vaxt screenshot-da göstərmə
- Heç vaxt git-ə commit etmə (`.gitignore`-da var)
- Token oğurlansa: dərhal Meta Developer Dashboard-da → App roles → həmin hesabı **Remove tester** → yenidən əlavə et (köhnə token bağlanır)

## Əlaqəli layihələr

- ChatPlace artıq @azerogluemin_ai-yə bağlıdır (comment auto-reply + DM kampaniya). Bu MCP onunla **paralel** işləyir — ChatPlace daimi servis, MCP isə Claude Code interaktiv idarəetmə üçün.

## Növbəti baxım nöqtəsi

Setup tamamlandıqdan sonra: hər 50-60 gündə bir Instagram Long-Lived Token yeniləməlidir. Tarix `meta-app-config.md`-də qeyd olunur.
