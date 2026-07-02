/**
 * Giriş nöqtəsi — API serverini və publisher cron loop-unu birlikdə start edir.
 *
 * Railway-də tək proses: HTTP API (post əlavə/gör/sil) + arxa fonda
 * hər 5 dəq növbəni yoxlayan publisher.
 */

import { config as loadEnv } from "dotenv";
import { buildApi } from "./api.js";
import { ClientRegistry, loadServerConfig } from "./config.js";
import { Publisher } from "./publisher.js";
import { JsonQueueStore } from "./queue/json-store.js";
import { AdWatcher, loadAdWatcherConfig } from "./ad-watcher/watcher.js";
import { loadTelegramConfig } from "./telegram/notify.js";
import { TokenRefresher, loadRefresherConfig } from "./token-refresh/refresher.js";

loadEnv();

async function main(): Promise<void> {
  const config = loadServerConfig();
  const clients = await ClientRegistry.load();
  const store = new JsonQueueStore(config.queueFile);
  await store.init();

  // Publisher loop (post scheduler).
  const publisher = new Publisher({ store, clients, config });
  publisher.start();

  // Ad Watcher (Meta reklam nəzarəti → Telegram). Opsional — env varsa başlayır.
  let adWatcher: AdWatcher | null = null;
  const watcherCfg = loadAdWatcherConfig();
  const tgCfg = loadTelegramConfig();
  if (watcherCfg && tgCfg) {
    adWatcher = new AdWatcher(watcherCfg);
    adWatcher.start();
  } else {
    console.log(
      `[ad-watcher] deaktiv — ${!watcherCfg ? "META_ACCESS_TOKEN/META_AD_ACCOUNT_IDS yox" : "TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID yox"}`,
    );
  }

  // Token Auto-Refresh — token-ləri müddəti bitməzdən əvvəl avtomatik yeniləyir.
  const refresher = new TokenRefresher(loadRefresherConfig());
  refresher.start();

  // HTTP API.
  const app = buildApi({ store, clients, config });
  await app.listen({ port: config.port, host: "0.0.0.0" });

  if (!config.apiKey) {
    app.log.warn("API_KEY təyin olunmayıb — auth DEAKTİVDİR (yalnız local üçün).");
  }

  // Təmiz dayanma.
  const shutdown = async (signal: string) => {
    app.log.info(`${signal} alındı — dayanılır...`);
    publisher.stop();
    adWatcher?.stop();
    refresher.stop();
    await app.close();
    process.exit(0);
  };
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
  process.on("SIGINT", () => void shutdown("SIGINT"));
}

main().catch((err) => {
  console.error("Başlatma xətası:", err);
  process.exit(1);
});
