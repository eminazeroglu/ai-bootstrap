import { ig } from "../ig-client.js";

// Helper: wait for media container to finish processing (for VIDEO/REELS)
async function waitForContainer(creationId, maxSeconds = 120) {
  const start = Date.now();
  while ((Date.now() - start) / 1000 < maxSeconds) {
    const res = await ig.get(`/${creationId}`, { fields: "status_code,status" });
    if (res.status_code === "FINISHED") return res;
    if (res.status_code === "ERROR" || res.status_code === "EXPIRED") {
      throw new Error(`Container ${res.status_code}: ${res.status || "naməlum xəta"}`);
    }
    await new Promise((r) => setTimeout(r, 3000));
  }
  throw new Error(`Container ${maxSeconds}s-də finish olmadı (timeout)`);
}

export const publishTools = [
  {
    name: "ig_publish_image",
    description: "Şəkil post-u publish edir. ŞƏKİL ƏVVƏLCƏDƏN PUBLIC URL-DƏ OLMALIDIR (Cloudinary, S3, Imgur, və s — fayl yox, URL).",
    inputSchema: {
      type: "object",
      properties: {
        image_url: { type: "string", description: "Public şəkil URL (https://...)" },
        caption: { type: "string", description: "Post mətni (caption)" },
      },
      required: ["image_url"],
    },
    handler: async (args) => {
      // Step 1: create media container
      const created = await ig.post("/me/media", {
        image_url: args.image_url,
        caption: args.caption ?? "",
      });
      const creationId = created.id;

      // Step 2: publish
      const published = await ig.post("/me/media_publish", {
        creation_id: creationId,
      });

      return {
        creation_id: creationId,
        media_id: published.id,
        permalink: `https://www.instagram.com/p/${published.id}/`,
        note: "Permalink aktivləşməsi 1-2 dəqiqə çəkə bilər",
      };
    },
  },

  {
    name: "ig_publish_video",
    description: "Video post publish edir. Video MP4/MOV formatında, public URL-də. Maksimum 60 saniyə adi feed video üçün.",
    inputSchema: {
      type: "object",
      properties: {
        video_url: { type: "string", description: "Public video URL (mp4)" },
        caption: { type: "string", description: "Post mətni" },
        thumb_offset: { type: "integer", description: "Thumbnail-ın millisaniyəsi (default 0)" },
      },
      required: ["video_url"],
    },
    handler: async (args) => {
      const created = await ig.post("/me/media", {
        media_type: "VIDEO",
        video_url: args.video_url,
        caption: args.caption ?? "",
        thumb_offset: args.thumb_offset,
      });

      await waitForContainer(created.id);

      const published = await ig.post("/me/media_publish", {
        creation_id: created.id,
      });

      return {
        creation_id: created.id,
        media_id: published.id,
        note: "Video publish edildi",
      };
    },
  },

  {
    name: "ig_publish_reel",
    description: "Reel publish edir. Video aspect 9:16, public URL. Auto share to feed.",
    inputSchema: {
      type: "object",
      properties: {
        video_url: { type: "string", description: "Public Reel video URL (mp4, 9:16)" },
        caption: { type: "string", description: "Reel caption" },
        cover_url: { type: "string", description: "Cover şəkil URL (opsional)" },
        share_to_feed: { type: "boolean", default: true },
        audio_name: { type: "string", description: "Audio adı (orijinal səs)" },
      },
      required: ["video_url"],
    },
    handler: async (args) => {
      const created = await ig.post("/me/media", {
        media_type: "REELS",
        video_url: args.video_url,
        caption: args.caption ?? "",
        cover_url: args.cover_url,
        share_to_feed: args.share_to_feed ?? true,
        audio_name: args.audio_name,
      });

      await waitForContainer(created.id);

      const published = await ig.post("/me/media_publish", {
        creation_id: created.id,
      });

      return {
        creation_id: created.id,
        media_id: published.id,
        note: "Reel publish edildi",
      };
    },
  },

  {
    name: "ig_publish_carousel",
    description: "Çoxşəkilli (carousel) post publish edir. 2-10 element. Hər element URL formatında.",
    inputSchema: {
      type: "object",
      properties: {
        items: {
          type: "array",
          description: "2-10 element. Hər biri: { url, type ('IMAGE' yaxud 'VIDEO') }",
          minItems: 2,
          maxItems: 10,
          items: {
            type: "object",
            properties: {
              url: { type: "string" },
              type: { type: "string", enum: ["IMAGE", "VIDEO"] },
            },
            required: ["url"],
          },
        },
        caption: { type: "string" },
      },
      required: ["items"],
    },
    handler: async (args) => {
      // Step 1: create container for each item
      const childIds = [];
      for (const item of args.items) {
        const isVideo = item.type === "VIDEO";
        const body = {
          is_carousel_item: true,
          ...(isVideo
            ? { media_type: "VIDEO", video_url: item.url }
            : { image_url: item.url }),
        };
        const child = await ig.post("/me/media", body);
        if (isVideo) await waitForContainer(child.id);
        childIds.push(child.id);
      }

      // Step 2: create carousel container
      const parent = await ig.post("/me/media", {
        media_type: "CAROUSEL",
        children: childIds.join(","),
        caption: args.caption ?? "",
      });

      // Step 3: publish
      const published = await ig.post("/me/media_publish", {
        creation_id: parent.id,
      });

      return {
        creation_id: parent.id,
        media_id: published.id,
        child_count: childIds.length,
        note: "Carousel publish edildi",
      };
    },
  },
];
