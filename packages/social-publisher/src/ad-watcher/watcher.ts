/**
 * Ad Watcher — Meta reklam hesablarını izləyir, problem olanda Telegram bildirişi.
 *
 * Cron pattern: MyJobs/cavably (reminder.cron.ts) referansı —
 *   interval loop + təkfire guard + try/catch + logger.
 *
 * Hər `intervalMs` (default 30 dəq):
 *   1. hər ad_account üçün Meta Graph API status çək
 *   2. status ACTIVE deyilsə (UNSETTLED / DISABLED / və s.) VƏ ya
 *      əvvəlki yoxlamadan dəyişibsə → Telegram bildiriş
 *   3. yalnız DƏYİŞİKLİK olanda bildir (spam olmasın)
 *
 * Env:
 *   META_ACCESS_TOKEN      — reklam icazəli token (ads_read)
 *   META_AD_ACCOUNT_IDS    — vergüllə ayrılmış hesab ID-ləri
 *   META_API_VERSION       — default v21.0
 *   AD_WATCH_INTERVAL_MS   — default 1800000 (30 dəq)
 */

import { notify } from "../telegram/notify.js";

/** Meta hesab statusu — rəqəm kodları Graph API-dən. */
const ACCOUNT_STATUS: Record<number, string> = {
  1: "ACTIVE",
  2: "DISABLED",
  3: "UNSETTLED",
  7: "PENDING_RISK_REVIEW",
  8: "PENDING_SETTLEMENT",
  9: "IN_GRACE_PERIOD",
  100: "PENDING_CLOSURE",
  101: "CLOSED",
  201: "ANY_ACTIVE",
  202: "ANY_CLOSED",
};

export interface AdWatcherConfig {
  accessToken: string;
  accountIds: string[];
  apiVersion: string;
  intervalMs: number;
}

export function loadAdWatcherConfig(env = process.env): AdWatcherConfig | null {
  const accessToken = env.META_ACCESS_TOKEN;
  const idsRaw = env.META_AD_ACCOUNT_IDS;
  if (!accessToken || !idsRaw) return null; // konfiqurasiya yoxdursa watcher deaktiv
  const accountIds = idsRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (accountIds.length === 0) return null;
  return {
    accessToken,
    accountIds,
    apiVersion: env.META_API_VERSION ?? "v21.0",
    intervalMs: Number(env.AD_WATCH_INTERVAL_MS ?? 30 * 60 * 1000),
  };
}

interface AccountState {
  id: string;
  name: string;
  status: string;
  healthy: boolean;
}

async function fetchAccountState(
  cfg: AdWatcherConfig,
  accountId: string,
): Promise<AccountState | null> {
  // act_ prefiksi Graph API üçün lazımdır
  const act = accountId.startsWith("act_") ? accountId : `act_${accountId}`;
  const url =
    `https://graph.facebook.com/${cfg.apiVersion}/${act}` +
    `?fields=name,account_status,disable_reason,balance,amount_spent` +
    `&access_token=${cfg.accessToken}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as {
      name?: string;
      account_status?: number;
      disable_reason?: number;
    };
    const status = ACCOUNT_STATUS[data.account_status ?? -1] ?? `UNKNOWN(${data.account_status})`;
    return {
      id: accountId,
      name: data.name ?? accountId,
      status,
      healthy: status === "ACTIVE",
    };
  } catch {
    return null;
  }
}

export class AdWatcher {
  private timer: NodeJS.Timeout | null = null;
  private running = false;
  private readonly cfg: AdWatcherConfig;
  private readonly log: (msg: string) => void;
  private readonly env: NodeJS.ProcessEnv;
  /** Sonuncu bilinən status (dəyişiklik aşkarlamaq üçün). */
  private lastStatus = new Map<string, string>();

  constructor(cfg: AdWatcherConfig, opts: { log?: (m: string) => void; env?: NodeJS.ProcessEnv } = {}) {
    this.cfg = cfg;
    this.log = opts.log ?? ((m) => console.log(`[ad-watcher] ${m}`));
    this.env = opts.env ?? process.env;
  }

  start(): void {
    this.log(`başladı — ${this.cfg.accountIds.length} hesab, hər ${this.cfg.intervalMs / 60000} dəq`);
    void this.tick(); // dərhal bir dəfə
    this.timer = setInterval(() => void this.tick(), this.cfg.intervalMs);
  }

  stop(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  async tick(): Promise<void> {
    if (this.running) return; // təkfire guard (Cavably lock pattern-i)
    this.running = true;
    try {
      for (const accountId of this.cfg.accountIds) {
        const state = await fetchAccountState(this.cfg, accountId);
        if (!state) {
          this.log(`hesab sorğusu alınmadı: ${accountId}`);
          continue;
        }
        const prev = this.lastStatus.get(accountId);
        this.lastStatus.set(accountId, state.status);

        // Yalnız DƏYİŞİKLİK olanda bildir (spam olmasın)
        if (prev !== undefined && prev !== state.status) {
          if (!state.healthy) {
            await notify(
              `⚠️ <b>Reklam problemi</b>\n\n` +
                `Hesab: <b>${state.name}</b>\n` +
                `Status: <b>${state.status}</b> (əvvəl: ${prev})\n` +
                `ID: ${state.id}\n\n` +
                `Meta Ads Manager-də yoxla.`,
              this.env,
            );
            this.log(`BİLDİRİŞ: ${state.name} → ${state.status}`);
          } else {
            // problemdən ACTIVE-ə qayıdıb — yaxşı xəbər
            await notify(
              `✅ <b>Reklam bərpa oldu</b>\n\n` +
                `Hesab: <b>${state.name}</b>\n` +
                `Status: <b>ACTIVE</b> (əvvəl: ${prev})`,
              this.env,
            );
            this.log(`BƏRPA: ${state.name} → ACTIVE`);
          }
        } else {
          this.log(`${state.name}: ${state.status}${state.healthy ? "" : " ⚠️"}`);
        }
      }
    } catch (err) {
      this.log(`tick xətası: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      this.running = false;
    }
  }
}
