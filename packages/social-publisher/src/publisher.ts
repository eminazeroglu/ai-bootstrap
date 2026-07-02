/**
 * Publisher — cron loop.
 *
 * Hər `pollIntervalMs` (default 5 dəq) bir dəfə növbəni yoxlayır:
 *   1. dueNow() → vaxtı çatmış pending postları al
 *   2. hər biri üçün düzgün müştəri credentials-larını həll et
 *   3. platforms[platform].publish() çağır
 *   4. uğur → status=posted + publishedMediaId
 *      xəta → attempts++, maxAttempts-ə çatanda status=failed
 *
 * Loop ardıcıldır (bir post bir-bir) — Instagram rate limit-ə hörmət üçün
 * və JSON store yarışlarından qaçmaq üçün.
 */

import type { ClientRegistry, ServerConfig } from "./config.js";
import { getPlatform } from "./platforms/index.js";
import type { QueueStore, ScheduledPost } from "./queue/types.js";

export interface PublisherDeps {
  store: QueueStore;
  clients: ClientRegistry;
  config: ServerConfig;
  /** Test üçün indiki vaxt mənbəyi. */
  now?: () => Date;
  /** Test üçün logger. */
  log?: (msg: string) => void;
}

export class Publisher {
  private timer: NodeJS.Timeout | null = null;
  private running = false;
  private readonly store: QueueStore;
  private readonly clients: ClientRegistry;
  private readonly config: ServerConfig;
  private readonly now: () => Date;
  private readonly log: (msg: string) => void;

  constructor(deps: PublisherDeps) {
    this.store = deps.store;
    this.clients = deps.clients;
    this.config = deps.config;
    this.now = deps.now ?? (() => new Date());
    this.log = deps.log ?? ((m) => console.log(`[publisher] ${m}`));
  }

  /** Loop-u başlat (dərhal bir dəfə işlədir, sonra interval). */
  start(): void {
    if (this.timer) return;
    this.log(`başladı — interval ${this.config.pollIntervalMs}ms`);
    void this.tick();
    this.timer = setInterval(() => void this.tick(), this.config.pollIntervalMs);
  }

  stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /** Bir dövr: vaxtı çatan bütün postları işlə. */
  async tick(): Promise<void> {
    if (this.running) return; // əvvəlki dövr bitməyibsə üst-üstə düşmə.
    this.running = true;
    try {
      const due = await this.store.dueNow(this.now());
      if (due.length > 0) this.log(`${due.length} post vaxtı çatıb`);
      for (const post of due) {
        await this.publishOne(post);
      }
    } catch (err) {
      this.log(`tick xətası: ${(err as Error).message}`);
    } finally {
      this.running = false;
    }
  }

  private async publishOne(post: ScheduledPost): Promise<void> {
    // Yarışdan qaçmaq üçün dərhal "publishing" işarələ.
    await this.store.update(post.id, {
      status: "publishing",
      attempts: post.attempts + 1,
    });

    try {
      const creds = this.clients.resolveCredentials(post.clientId, post.platform);
      const platform = getPlatform(post.platform);
      const result = await platform.publish(creds, {
        type: post.type,
        mediaUrls: post.mediaUrls,
        caption: post.caption,
      });
      await this.store.update(post.id, {
        status: "posted",
        publishedMediaId: result.mediaId,
        error: undefined,
      });
      this.log(`✓ paylaşıldı ${post.id} (${post.platform}) → ${result.mediaId}`);
    } catch (err) {
      const message = (err as Error).message;
      const attempts = post.attempts + 1;
      const failed = attempts >= this.config.maxAttempts;
      await this.store.update(post.id, {
        status: failed ? "failed" : "pending", // pending → növbəti dövrdə təkrar.
        error: message,
      });
      this.log(
        `✗ xəta ${post.id} (cəhd ${attempts}/${this.config.maxAttempts})` +
          `${failed ? " — FAILED" : " — təkrar olunacaq"}: ${message}`,
      );
    }
  }
}
