/**
 * Instagram platform — graph.instagram.com (Instagram Login API).
 *
 * Məntiq sınanmış referans serverdən götürülüb:
 *   azerogluemin.az/.../instagram-mcp/server/src/{ig-client.js,tools/publish.js}
 *
 * VACİB host qeydi (briefdən):
 *   ✅ graph.instagram.com — DÜZGÜN (Instagram Login API)
 *   ❌ graph.facebook.com ig_exchange_token — İŞLƏMİR ("session invalid")
 *
 * Paylaşım iki addımdır: media container yarat (/me/media) → publish
 * (/me/media_publish). VIDEO/REELS üçün container "FINISHED" olana qədər
 * gözlənilir (waitForContainer).
 *
 * Bütün media public URL olmalıdır (Cloudinary/S3/Imgur — fayl yox, URL).
 */

import type {
  Platform,
  PlatformCredentials,
  PublishRequest,
  PublishResult,
} from "./types.js";

const GRAPH_VERSION = "v22.0";
const BASE = `https://graph.instagram.com/${GRAPH_VERSION}`;

/** Bir Graph API sorğusu (referansdakı request() ilə eyni davranış). */
async function igRequest(
  token: string,
  method: "GET" | "POST" | "DELETE",
  path: string,
  opts: { params?: Record<string, unknown>; body?: Record<string, unknown> } = {},
): Promise<any> {
  const url = new URL(`${BASE}${path}`);
  url.searchParams.set("access_token", token);
  if (!opts.body && opts.params) {
    for (const [k, v] of Object.entries(opts.params)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    }
  }

  const init: RequestInit = { method, headers: {} };
  if (opts.body) {
    const form = new URLSearchParams();
    form.set("access_token", token);
    for (const [k, v] of Object.entries(opts.body)) {
      if (v !== undefined && v !== null) form.set(k, String(v));
    }
    init.body = form;
    (init.headers as Record<string, string>)["Content-Type"] =
      "application/x-www-form-urlencoded";
  }

  const res = await fetch(url.toString(), init);
  const text = await res.text();
  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Graph API qeyri-JSON cavab: ${res.status} — ${text.slice(0, 200)}`);
  }

  if (!res.ok || data.error) {
    const err = data.error || { message: `HTTP ${res.status}` };
    throw new Error(
      `Graph API xətası (${err.code || res.status}): ${err.message}` +
        (err.error_subcode ? ` [subcode: ${err.error_subcode}]` : ""),
    );
  }
  return data;
}

/** Media container işlənməni bitirənə qədər gözlə (VIDEO/REELS üçün). */
async function waitForContainer(
  token: string,
  creationId: string,
  maxSeconds = 120,
): Promise<void> {
  const start = Date.now();
  while ((Date.now() - start) / 1000 < maxSeconds) {
    const res = await igRequest(token, "GET", `/${creationId}`, {
      params: { fields: "status_code,status" },
    });
    if (res.status_code === "FINISHED") return;
    if (res.status_code === "ERROR" || res.status_code === "EXPIRED") {
      throw new Error(`Container ${res.status_code}: ${res.status || "naməlum xəta"}`);
    }
    await new Promise((r) => setTimeout(r, 3000));
  }
  throw new Error(`Container ${maxSeconds}s-də finish olmadı (timeout)`);
}

async function publishImage(
  token: string,
  imageUrl: string,
  caption: string,
): Promise<PublishResult> {
  const created = await igRequest(token, "POST", "/me/media", {
    body: { image_url: imageUrl, caption },
  });
  const published = await igRequest(token, "POST", "/me/media_publish", {
    body: { creation_id: created.id },
  });
  return {
    mediaId: published.id,
    permalink: `https://www.instagram.com/p/${published.id}/`,
  };
}

async function publishVideo(
  token: string,
  videoUrl: string,
  caption: string,
  mediaType: "VIDEO" | "REELS",
): Promise<PublishResult> {
  const created = await igRequest(token, "POST", "/me/media", {
    body: {
      media_type: mediaType,
      video_url: videoUrl,
      caption,
      ...(mediaType === "REELS" ? { share_to_feed: true } : {}),
    },
  });
  await waitForContainer(token, created.id);
  const published = await igRequest(token, "POST", "/me/media_publish", {
    body: { creation_id: created.id },
  });
  return { mediaId: published.id };
}

async function publishCarousel(
  token: string,
  urls: string[],
  caption: string,
): Promise<PublishResult> {
  const childIds: string[] = [];
  for (const url of urls) {
    // Sadəlik üçün carousel elementləri şəkil kimi qəbul olunur.
    // (Brief Mərhələ 1 = Instagram şəkil/carousel; video carousel sonra.)
    const child = await igRequest(token, "POST", "/me/media", {
      body: { is_carousel_item: true, image_url: url },
    });
    childIds.push(child.id);
  }
  const parent = await igRequest(token, "POST", "/me/media", {
    body: { media_type: "CAROUSEL", children: childIds.join(","), caption },
  });
  const published = await igRequest(token, "POST", "/me/media_publish", {
    body: { creation_id: parent.id },
  });
  return {
    mediaId: published.id,
    permalink: `https://www.instagram.com/p/${published.id}/`,
  };
}

export const instagram: Platform = {
  name: "instagram",

  async publish(creds: PlatformCredentials, req: PublishRequest): Promise<PublishResult> {
    const token = creds.accessToken;
    const caption = req.caption ?? "";
    const urls = req.mediaUrls;

    if (urls.length === 0) {
      throw new Error("mediaUrls boşdur — ən azı bir public URL lazımdır");
    }

    switch (req.type) {
      case "image":
        return publishImage(token, urls[0], caption);
      case "video":
        return publishVideo(token, urls[0], caption, "VIDEO");
      case "reel":
        return publishVideo(token, urls[0], caption, "REELS");
      case "carousel":
        if (urls.length < 2 || urls.length > 10) {
          throw new Error("carousel 2-10 element tələb edir");
        }
        return publishCarousel(token, urls, caption);
      default:
        throw new Error(`Naməlum post tipi: ${req.type}`);
    }
  },

  /**
   * Token refresh (Mərhələ 2-də tam aktivləşəcək).
   * graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token
   * Qeyd: token ən azı 24 saatlıq və 60 günlük olmalıdır ki refresh işləsin.
   */
  async refreshToken(creds: PlatformCredentials) {
    const url = new URL(`${BASE}/refresh_access_token`);
    url.searchParams.set("grant_type", "ig_refresh_token");
    url.searchParams.set("access_token", creds.accessToken);
    const res = await fetch(url.toString());
    const data: any = await res.json();
    if (!res.ok || data.error) {
      throw new Error(
        `Token refresh xətası: ${data.error?.message || res.status}`,
      );
    }
    return {
      accessToken: data.access_token as string,
      expiresInSeconds: Number(data.expires_in ?? 0),
    };
  },
};
