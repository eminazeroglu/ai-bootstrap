/**
 * LinkedIn platform — STUB (Mərhələ 3).
 *
 * LinkedIn Posts API (UGC / Share) ilə implement olunacaq.
 */

import type { Platform, PlatformCredentials, PublishRequest } from "./types.js";

export const linkedin: Platform = {
  name: "linkedin",
  async publish(_creds: PlatformCredentials, _req: PublishRequest) {
    throw new Error("LinkedIn platform hələ implement olunmayıb (Mərhələ 3)");
  },
};
