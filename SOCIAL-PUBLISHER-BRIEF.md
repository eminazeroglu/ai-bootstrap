# Social Publisher — Brief (ai-bootstrap üçün yeni paket)

> Bu sənəd Sahil Transport sessiyasında alınan qərarları ai-bootstrap işinə ötürür.
> Tarix: 2026-06-24. Müəllif konteksti: Emin + Claude (Sahil Transport sosial media işi).

---

## Məqsəd

ai-bootstrap-a **yenidən istifadə oluna bilən "social-publisher" paketi** əlavə etmək.
Bir dəfə yazılır, **hər müştəri layihəsi** onu ai-bootstrap-dan götürür və öz token-i ilə deploy edir.
Sahil Transport = **ilk istifadəçi.** Sonra restoran, başqa brendlər.

## Nə edir

Sosial media postlarını **cədvəllə (schedule) avtomatik paylaşan 24/7 servis.**
- Instagram API "gələcəyə qoy" demir → bizim servis növbə saxlayır, vaxtı çatanda paylaşır.
- Çoxplatformalı: **indi Instagram**, gələcəkdə TikTok, LinkedIn.
- Çoxmüştərili: hər müştəri öz token + config.

## Harada yerləşir

```
ai-bootstrap/packages/social-publisher/   ← YENİ paket
├── src/
│   ├── platforms/
│   │   ├── instagram.ts    ← graph.instagram.com (HAZIR REFERANS var, aşağı bax)
│   │   ├── tiktok.ts       ← gələcək (stub)
│   │   └── linkedin.ts     ← gələcək (stub)
│   ├── queue/              ← növbə (JSON fayl və ya Railway Postgres)
│   ├── publisher.ts        ← cron loop: hər 5 dəq növbəni yoxla, vaxtı çatanı paylaş
│   ├── api.ts              ← REST: post əlavə et / növbəni gör / sil
│   └── index.ts
├── Dockerfile + railway.json   ← Railway deploy (24/7)
├── .env.example
└── package.json  (@ai-bootstrap/social-publisher)
```

## Deploy hədəfi: **Railway** (qərar verilib)
- Səbəb: kommersiya pulsuz/$5, davamlı servis (state saxlayır), 5-dəq cron bəsdir.
- Vercel YOX (Hobby kommersiya qadağa + serverless state çətin).
- Railway: davamlı servis + cron (min 5 dəq) + pulsuz Postgres mövcuddur.

## HAZIR REFERANS — Instagram publish artıq işləyən kod var
İşləyən, sınanmış Instagram MCP serveri:
`/Users/eminazeroglu/MyJobs/azerogluemin.az/projects/azerogluemin-ai/instagram-mcp/server/`
- `graph.instagram.com` istifadə edir (Instagram Login API — DÜZGÜN host)
- `src/ig-client.js`, `src/tools/publish.js` — publish məntiqi hazırdır
- publisher-in `platforms/instagram.ts`-i bu məntiqi təkrar istifadə etməlidir.

## Token modeli (Instagram, sınanmış)
- `INSTAGRAM_ACCESS_TOKEN` (IGAA..., 60 gün) — `graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token` ilə yenilənir
- `INSTAGRAM_ACCOUNT_ID` (Business ID)
- ⚠️ `graph.facebook.com` ig_exchange_token İŞLƏMİR ("session invalid") — refresh endpoint istifadə et.
- Publisher token-i 60 gündə bir avtomatik refresh ETMƏLİDİR (cron job).

## Arxitektura axını
```
Claude (və ya müştəri) → API: "bu postu <tarix>-ə qoy" → queue
Railway cron (hər 5 dəq) → vaxtı çatan post? → platforms/instagram.publish() → IG
                                              → queue-dən sil, posted-ə yaz
```

## ai-bootstrap inteqrasiyası (vacib — "global" tələbi budur)
1. `packages/mcps/` kataloqundakı SAXTA Instagram girişini düzəlt:
   - ❌ `@modelcontextprotocol/server-instagram` (npm 404) → ✅ işləyən referans server
   - ❌ `@meta/mcp-ads` → ✅ `https://mcp.facebook.com/ads` (Meta rəsmi, OAuth, type:http)
2. social-publisher-i preset/bundle-a əlavə et ki, "social" tipli layihələrdə avtomatik gəlsin.
3. `ai-bootstrap new` (social preset) → publisher şablonu + deploy təlimatı.

## Mərhələli plan
- **Mərhələ 1 (indi):** social-publisher paketi skeleti + Instagram platform + queue + cron + API. Railway deploy. Sahil Transport ilə test.
- **Mərhələ 2:** token auto-refresh, TikTok platform.
- **Mərhələ 3:** LinkedIn, web UI / dashboard (opsional).
- **Mərhələ 4:** mcp-catalog düzəlişi + preset inteqrasiyası.

## Texniki qeydlər
- Dil: TypeScript (ai-bootstrap monorepo TS-dir, pnpm + turbo).
- Repo: github.com/eminazeroglu/ai-bootstrap, branch main.
- Sahil Transport tokenləri Sahil layihəsinin `.env`-indədir (publisher-ə nümunə kimi).
- Təhlükəsizlik: bütün token Railway env vars-da, kodda yox.

## Sahil Transport tərəfində NƏ HAZIRDIR (kontekst)
- Instagram MCP qoşulub işləyir (669 follower təsdiq).
- Meta-ads MCP qoşulub (rəsmi, OAuth).
- Strategiya, brand guide, content research hazırdır (`sahil_transport/strategy/`).
- Qalan: bu publisher qurulandan sonra content plan + ilk schedule.

---

## YENİLƏMƏ (2026-07-02) — 2 funksiya + Cavably referans kodu

İstifadəçi 2 funksiya istəyir ( hər ikisi bu servisdə):
1. **Post Scheduler** — postları gələcək tarixə qoy, avtomat paylaş (əsas).
2. **Ad Watcher** — Meta reklam hesablarını izlə, problem olanda (UNSETTLED/DISABLED/büdcə) **Telegram-a bildiriş**.

### Referans kod (MyJobs/cavably-dən öyrənildi — eyni pattern işlət)
**Cron pattern** (`cavably/apps/api/src/payments/reminder.cron.ts`):
- `@Cron(EVERY_MINUTE)` (scheduler) / 30 dəq (ad watcher)
- **Lock** ilə multi-replica tək-fire (`lock.acquire("job", 55_000)`)
- test-də işləməsin (`if NODE_ENV==="test" return`)
- try/catch + logger

**Telegram send** (`cavably/apps/api/src/channels/drivers/telegram.driver.ts`):
```
await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ chat_id: to, text: body }),
});
```
Sadə fetch — kitabxana lazım deyil.

**Deploy:** Railway (`cavably/railway.json` referans). ~$5/ay, 24/7.

### social-publisher komponentləri (yenilənmiş)
```
packages/social-publisher/src/
├── platforms/instagram.ts   (graph.instagram.com publish — azerogluemin-ai mcp referans)
├── scheduler/               (cron hər dəq → queue yoxla → publish)
├── ad-watcher/              (cron hər 30 dəq → Meta API status → problem? → Telegram)
├── telegram/notify.ts       (fetch sendMessage — Cavably pattern)
├── queue/                   (JSON və ya Postgres — Railway pulsuz PG)
└── api.ts                   (post əlavə et / status)
```

### Env (Sahil ilk müştəri)
- `IG_ACCESS_TOKEN`, `IG_BUSINESS_ACCOUNT_ID` (Sahil .env-də var)
- `META_ACCESS_TOKEN` (reklam watcher — OAuth)
- `META_AD_ACCOUNT_IDS` = 964182699719334,24446894524972112 (Sahil hesabları)
- `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` (bildiriş üçün)

### Ad Watcher məntiqi
Hər 30 dəq hər ad_account status yoxla → ACTIVE deyilsə (UNSETTLED/DISABLED) və ya büdcə/rədd problemi → Telegram: "⚠️ <hesab> <status> oldu".
