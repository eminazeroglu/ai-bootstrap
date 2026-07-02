# @azerogluemin/social-publisher

Cədvəllə (schedule) sosial media postlarını **avtomatik paylaşan 24/7 servis.**
Çoxplatformalı (indi **Instagram**, gələcəkdə TikTok/LinkedIn) və çoxmüştərili.

Instagram API "gələcəyə qoy" demir — bu servis növbə saxlayır və vaxtı çatanda
özü paylaşır. Railway-də davamlı işləməyə dizayn olunub.

## Niyə Railway

- Davamlı servis (state saxlayır — növbə faylı yaşayır).
- Daxili cron loop (hər 5 dəq) — ayrıca cron servisi lazım deyil.
- Kommersiya üçün pulsuz/$5 plan uyğundur.
- Vercel YOX (Hobby kommersiya qadağası + serverless state çətin).

## Arxitektura

```
Claude / müştəri → POST /posts (scheduledAt) → queue (JSON fayl)
Publisher loop (hər 5 dəq) → dueNow() → platforms[platform].publish() → Instagram
                                       → status=posted (uğur) | failed (təkrar bitəndə)
```

| Qat | Fayl | Vəzifə |
|-----|------|--------|
| Platform | `src/platforms/instagram.ts` | `graph.instagram.com` publish (image/video/reel/carousel) |
| | `src/platforms/{tiktok,linkedin}.ts` | stub (Mərhələ 2/3) |
| Queue | `src/queue/json-store.ts` | JSON fayl store (atomik yazı) |
| | `src/queue/types.ts` | `QueueStore` interfeysi → sonra Postgres-ə keçid |
| Loop | `src/publisher.ts` | cron: vaxtı çatanı paylaş, xətada təkrar |
| API | `src/api.ts` | Fastify REST + Bearer auth |
| Config | `src/config.ts` | server config + çoxmüştəri (clients.json + env) |

## Lokal işə salma

```bash
cd packages/social-publisher
pnpm install
cp .env.example .env            # tokenləri doldur
cp clients.example.json clients.json   # müştəriləri təyin et (opsional)
pnpm dev
```

## API

Auth: `API_KEY` təyin olunubsa, `/health`-dən başqa bütün sorğular
`Authorization: Bearer <API_KEY>` tələb edir.

### `POST /posts` — növbəyə əlavə et
```json
{
  "clientId": "sahil-transport",
  "platform": "instagram",
  "type": "image",
  "mediaUrls": ["https://res.cloudinary.com/.../post.jpg"],
  "caption": "Salam dünya 👋",
  "scheduledAt": "2026-06-25T09:00:00Z"
}
```
- `type`: `image` | `video` | `reel` | `carousel`
- `mediaUrls`: **public** http(s) URL-lər (carousel üçün 2-10).
- `scheduledAt`: ISO 8601. Bu vaxt çatanda növbəti loop dövründə paylaşılır.

### `GET /posts?clientId=&platform=&status=` — növbəni gör
### `GET /posts/:id` — bir post
### `DELETE /posts/:id` — sil
### `GET /clients` — konfiqurasiya olunmuş müştərilər
### `GET /health` — Railway healthcheck (auth yox)

## Çoxmüştərilik

`clients.json` müştəri metadata + hər platforma üçün **hansı env dəyişəninin**
token/account daşıdığını göstərir (dəyər yox — yalnız ad). Real tokenlər
Railway env vars-dadır.

```json
{
  "clients": [{
    "id": "sahil-transport",
    "name": "Sahil Transport",
    "platforms": {
      "instagram": {
        "accessTokenEnv": "SAHIL_INSTAGRAM_ACCESS_TOKEN",
        "accountIdEnv": "SAHIL_INSTAGRAM_ACCOUNT_ID"
      }
    }
  }]
}
```

`clients.json` yoxdursa, servis `INSTAGRAM_ACCESS_TOKEN` / `INSTAGRAM_ACCOUNT_ID`
env-dən `default` müştəri qurur (tək müştəri deploy üçün).

## Instagram token modeli (sınanmış)

- `graph.instagram.com` (Instagram Login API) — **DÜZGÜN host.**
- ⚠️ `graph.facebook.com` `ig_exchange_token` İŞLƏMİR ("session invalid").
- Token IGAA... ilə başlayır, 60 günlük.
- Refresh: `graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token`
  (Mərhələ 2-də cron ilə avtomatlaşacaq).

## Railway deploy

1. Railway-də yeni servis → bu repo, root directory `packages/social-publisher`.
2. Build: Dockerfile (railway.json göstərir).
3. Env vars: `.env.example`-dakı dəyişənləri təyin et (`API_KEY`, tokenlər).
4. Persistent volume mount et → `/app/data` (növbə faylı yaşasın).
5. `clients.json` lazımdırsa repo-ya əlavə et və ya volume-a qoy.
6. Healthcheck `/health` avtomatik.

## Mərhələlər

- **Mərhələ 1 (hazır):** skelet + Instagram + JSON queue + cron + API + Railway.
- **Mərhələ 2:** token auto-refresh (cron), TikTok platform.
- **Mərhələ 3:** LinkedIn, web dashboard (opsional).
- **Mərhələ 4:** ai-bootstrap preset inteqrasiyası + mcp-catalog düzəlişi.
