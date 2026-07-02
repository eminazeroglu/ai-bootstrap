/**
 * Token Auto-Refresh — token-ləri müddəti bitməzdən əvvəl avtomatik yeniləyir.
 *
 * Problem: həm Instagram (IGAA, 60 gün), həm Meta ads (EAAB, 60 gün) token-ləri
 * müddətlidir. Əl ilə yeniləmək = sistem 2 ayda bir dayanır. Bu, davamlı həll deyil.
 *
 * Həll: gündə bir dəfə yoxla, token 10 gündən az qalıbsa yenilə.
 *
 * Env vars deploy zamanı təyin olunur və prosesdən dəyişdirilə bilməz.
 * Ona görə yenilənmiş token-lər PERSISTENT fayla (TOKEN_STORE_FILE) yazılır.
 * Proses işə düşəndə əvvəl bu faylı yoxlayır — varsa, oradakı təzə token-i işlədir.
 *
 * Cron pattern: MyJobs/cavably (reminder.cron.ts) — interval + təkfire guard + try/catch.
 *
 * Env:
 *   TOKEN_STORE_FILE       — yenilənmiş token-lərin saxlandığı fayl (default ./data/tokens.json)
 *   TOKEN_REFRESH_CRON_MS  — yoxlama intervalı (default 24 saat)
 *   META_APP_ID, META_APP_SECRET — Meta token exchange üçün
 *   INSTAGRAM_ACCESS_TOKEN, META_ACCESS_TOKEN — başlanğıc token-lər
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { notify } from "../telegram/notify.js";

/** Saxlanılan token qeydi. */
interface StoredToken {
  token: string;
  /** Token-in müddətinin bitmə vaxtı (epoch ms). */
  expiresAt: number;
  refreshedAt: number;
}

interface TokenStore {
  instagram?: StoredToken;
  meta?: StoredToken;
}

const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;

export interface RefresherConfig {
  storeFile: string;
  intervalMs: number;
  metaAppId?: string;
  metaAppSecret?: string;
}

export function loadRefresherConfig(env = process.env): RefresherConfig {
  return {
    storeFile: env.TOKEN_STORE_FILE ?? "./data/tokens.json",
    intervalMs: Number(env.TOKEN_REFRESH_CRON_MS ?? 24 * 60 * 60 * 1000),
    metaAppId: env.META_APP_ID,
    metaAppSecret: env.META_APP_SECRET,
  };
}

async function readStore(file: string): Promise<TokenStore> {
  try {
    return JSON.parse(await readFile(file, "utf8")) as TokenStore;
  } catch {
    return {};
  }
}

async function writeStore(file: string, store: TokenStore): Promise<void> {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(store, null, 2), "utf8");
}

/**
 * Effektiv token-i qaytarır: store-da təzə varsa onu, yoxsa env-dəkini.
 * Publisher/ad-watcher bunu çağırıб həmişə ən aktual token-i alır.
 */
export async function getEffectiveToken(
  which: "instagram" | "meta",
  envToken: string,
  storeFile = process.env.TOKEN_STORE_FILE ?? "./data/tokens.json",
): Promise<string> {
  const store = await readStore(storeFile);
  const stored = store[which];
  if (stored && stored.expiresAt > Date.now()) return stored.token;
  return envToken;
}

/** Instagram token-i yenilə (graph.instagram.com/refresh_access_token). */
async function refreshInstagram(currentToken: string): Promise<StoredToken | null> {
  try {
    const url =
      `https://graph.instagram.com/refresh_access_token` +
      `?grant_type=ig_refresh_token&access_token=${currentToken}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as { access_token?: string; expires_in?: number };
    if (!data.access_token) return null;
    return {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in ?? 5_184_000) * 1000,
      refreshedAt: Date.now(),
    };
  } catch {
    return null;
  }
}

/** Meta ads token-i yenilə (fb_exchange_token). */
async function refreshMeta(
  currentToken: string,
  appId: string,
  appSecret: string,
): Promise<StoredToken | null> {
  try {
    const url =
      `https://graph.facebook.com/v21.0/oauth/access_token` +
      `?grant_type=fb_exchange_token&client_id=${appId}` +
      `&client_secret=${appSecret}&fb_exchange_token=${currentToken}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as { access_token?: string; expires_in?: number };
    if (!data.access_token) return null;
    return {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in ?? 5_184_000) * 1000,
      refreshedAt: Date.now(),
    };
  } catch {
    return null;
  }
}

export class TokenRefresher {
  private timer: NodeJS.Timeout | null = null;
  private running = false;
  private readonly cfg: RefresherConfig;
  private readonly log: (m: string) => void;
  private readonly env: NodeJS.ProcessEnv;

  constructor(cfg: RefresherConfig, opts: { log?: (m: string) => void; env?: NodeJS.ProcessEnv } = {}) {
    this.cfg = cfg;
    this.log = opts.log ?? ((m) => console.log(`[token-refresh] ${m}`));
    this.env = opts.env ?? process.env;
  }

  start(): void {
    this.log(`başladı — hər ${this.cfg.intervalMs / 3600000} saat yoxlanır`);
    void this.tick();
    this.timer = setInterval(() => void this.tick(), this.cfg.intervalMs);
  }

  stop(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  async tick(): Promise<void> {
    if (this.running) return;
    this.running = true;
    try {
      const store = await readStore(this.cfg.storeFile);
      let changed = false;

      // --- Instagram ---
      const igCur = store.instagram?.token ?? this.env.INSTAGRAM_ACCESS_TOKEN;
      const igExp = store.instagram?.expiresAt ?? 0;
      if (igCur && (igExp === 0 || igExp - Date.now() < TEN_DAYS_MS)) {
        const fresh = await refreshInstagram(igCur);
        if (fresh) {
          store.instagram = fresh;
          changed = true;
          this.log(`Instagram token yeniləndi (${Math.round((fresh.expiresAt - Date.now()) / 86400000)} gün)`);
        } else {
          await notify("⚠️ Instagram token yenilənmədi — əl ilə yoxla.", this.env);
          this.log("Instagram refresh ALINMADI");
        }
      }

      // --- Meta ads ---
      const metaCur = store.meta?.token ?? this.env.META_ACCESS_TOKEN;
      const metaExp = store.meta?.expiresAt ?? 0;
      if (metaCur && this.cfg.metaAppId && this.cfg.metaAppSecret &&
          (metaExp === 0 || metaExp - Date.now() < TEN_DAYS_MS)) {
        const fresh = await refreshMeta(metaCur, this.cfg.metaAppId, this.cfg.metaAppSecret);
        if (fresh) {
          store.meta = fresh;
          changed = true;
          this.log(`Meta token yeniləndi (${Math.round((fresh.expiresAt - Date.now()) / 86400000)} gün)`);
        } else {
          await notify("⚠️ Meta ads token yenilənmədi — əl ilə yoxla.", this.env);
          this.log("Meta refresh ALINMADI");
        }
      }

      if (changed) await writeStore(this.cfg.storeFile, store);
      else this.log("token-lər hələ təzədir, yeniləmə lazım deyil");
    } catch (err) {
      this.log(`tick xətası: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      this.running = false;
    }
  }
}
