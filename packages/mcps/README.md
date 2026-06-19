# @ai-bootstrap/mcps

MCP (Model Context Protocol) server catalog and installer logic.

## Catalog

15-tier kataloqu (~80 MCP server):

1. **Tier 1 — Day-1 Essential** (8): Filesystem, GitHub, Postgres, Brave Search, Context7, Notion, Playwright, Memory
2. **Tier 2 — Communication** (5): Slack, Discord, Telegram, Gmail, MS Teams
3. **Tier 3 — Databases** (7): Postgres, Supabase, MySQL, MongoDB, Redis, BigQuery, Snowflake
4. **Tier 4 — Cloud & Deploy** (6): Vercel, AWS, GCP, Cloudflare, Railway, Render
5. **Tier 5 — Payments & E-commerce** (5): Stripe, Shopify, PayPal, Square, Lemon Squeezy
6. **Tier 6 — CRM** (4): HubSpot, Salesforce, Attio, Pipedrive
7. **Tier 7 — Project Management** (6): Linear, Jira, Asana, Trello, ClickUp, Monday
8. **Tier 8 — Social Media** (8): Meta, YouTube, TikTok, LinkedIn, Twitter, Telegram Bot, WhatsApp, Threads
9. **Tier 9 — Analytics** (5): GA4, Mixpanel, Amplitude, PostHog, Segment
10. **Tier 10 — Marketing & Email** (6): Mailchimp, Brevo, Resend, etc.
11. **Tier 11 — AI Providers** (11): OpenAI, Claude, Gemini, Grok, ElevenLabs, etc.
12. **Tier 12 — Browser & Scraping** (5): Playwright, Puppeteer, Browserbase, Firecrawl, Apify
13. **Tier 13 — Observability** (5): Sentry, Cloudflare, DataDog, New Relic, LogRocket
14. **Tier 14 — Design** (3): Figma, Canva, Adobe
15. **Tier 15 — Storage & CDN** (4): S3, R2, Backblaze, Google Drive

## Files

- `catalog.json` — bütün MCP-lərin metadata (Mərhələ B-2-də doldurulur)
- `installers/` — hər MCP üçün install logic
- `src/index.ts` — main installer API

## License

MIT
