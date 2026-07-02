/**
 * Platform abstraksiyası.
 *
 * Hər platforma (Instagram, TikTok, LinkedIn) bu interfeysi implement edir.
 * Publisher yalnız bu kontrakt vasitəsilə platformalarla danışır —
 * yeni platforma əlavə etmək üçün qalan kod dəyişmir.
 */

import type { PostType } from "../queue/types.js";

/** Bir müştərinin bir platforma üçün token + identifikatorları. */
export interface PlatformCredentials {
  /** Uzunömürlü access token. */
  accessToken: string;
  /** Platforma hesab ID (məs. Instagram Business Account ID). */
  accountId: string;
  /** Token refresh üçün lazım ola biləcək əlavə sahələr (Mərhələ 2). */
  appId?: string;
  appSecret?: string;
}

/** Bir paylaşım sorğusu (platformadan asılı olmayan ümumi forma). */
export interface PublishRequest {
  type: PostType;
  /** Public media URL-ləri. */
  mediaUrls: string[];
  caption?: string;
}

/** Uğurlu paylaşımın nəticəsi. */
export interface PublishResult {
  /** Platforma media ID. */
  mediaId: string;
  /** Varsa, post linki. */
  permalink?: string;
}

/** Platforma kontraktı. */
export interface Platform {
  readonly name: string;
  /**
   * Postu dərhal paylaş. Xəta atırsa publisher onu failed kimi qeyd edir.
   */
  publish(creds: PlatformCredentials, req: PublishRequest): Promise<PublishResult>;
  /**
   * Tokeni yenilə (Mərhələ 2). Yeni token + bitmə müddətini qaytarır.
   * Hələ implement olunmayıbsa not-implemented xətası atır.
   */
  refreshToken?(creds: PlatformCredentials): Promise<{ accessToken: string; expiresInSeconds: number }>;
}
