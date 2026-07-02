/**
 * TikTok platform — STUB (Mərhələ 2).
 *
 * TikTok Content Posting API ilə implement olunacaq.
 * Hələ çağırılırsa açıq xəta atır ki, səhvən sus durmasın.
 */

import type { Platform, PlatformCredentials, PublishRequest } from "./types.js";

export const tiktok: Platform = {
  name: "tiktok",
  async publish(_creds: PlatformCredentials, _req: PublishRequest) {
    throw new Error("TikTok platform hələ implement olunmayıb (Mərhələ 2)");
  },
};
