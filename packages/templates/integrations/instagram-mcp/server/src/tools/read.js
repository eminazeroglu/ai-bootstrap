import { ig } from "../ig-client.js";

export const readTools = [
  {
    name: "ig_profile",
    description: "@azerogluemin_ai profil məlumatı: izləyici sayı, post sayı, bio, hesab növü, ad. Heç bir parametr lazım deyil.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
    handler: async () => {
      const fields = [
        "user_id",
        "username",
        "account_type",
        "media_count",
        "followers_count",
        "follows_count",
        "name",
        "biography",
        "profile_picture_url",
        "website",
      ].join(",");
      return ig.get("/me", { fields });
    },
  },

  {
    name: "ig_list_media",
    description: "@azerogluemin_ai-nın son post-larını siyahı şəklində qaytarır. Hər post üçün caption, tarix, media tipi, like/comment sayı, permalink. Default: 25 post.",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "integer",
          description: "Neçə post qaytarılsın (1-100). Default 25.",
          default: 25,
          minimum: 1,
          maximum: 100,
        },
      },
      required: [],
    },
    handler: async (args) => {
      const limit = args.limit ?? 25;
      const fields = [
        "id",
        "caption",
        "media_type",
        "media_product_type",
        "media_url",
        "thumbnail_url",
        "permalink",
        "timestamp",
        "like_count",
        "comments_count",
      ].join(",");
      return ig.get("/me/media", { fields, limit });
    },
  },

  {
    name: "ig_media_insights",
    description: "Konkret post / Reel üçün dərin analytics — reach, impressions, saves, shares, plays (Reel üçün), total_interactions. Lazımdır: media_id (ig_list_media-dan götür).",
    inputSchema: {
      type: "object",
      properties: {
        media_id: {
          type: "string",
          description: "Post-un ID-si (ig_list_media nəticəsindəki 'id' sahəsi)",
        },
        media_type: {
          type: "string",
          enum: ["IMAGE", "VIDEO", "REELS", "CAROUSEL_ALBUM"],
          description: "Post tipinə görə fərqli metrikalar mövcuddur. Bilmirsənsə boş qoy — VIDEO/REELS metrikaları cəhd edəcək.",
        },
      },
      required: ["media_id"],
    },
    handler: async (args) => {
      const { media_id, media_type } = args;

      // Different media types have different available metrics
      let metrics;
      if (media_type === "REELS" || media_type === "VIDEO") {
        metrics = "reach,plays,likes,comments,saved,shares,total_interactions,ig_reels_video_view_total_time,ig_reels_avg_watch_time";
      } else if (media_type === "CAROUSEL_ALBUM") {
        metrics = "reach,impressions,saved,shares,likes,comments,total_interactions";
      } else if (media_type === "IMAGE") {
        metrics = "reach,impressions,saved,shares,likes,comments,total_interactions";
      } else {
        // Best-effort default
        metrics = "reach,impressions,likes,comments,saved,shares,total_interactions";
      }

      try {
        return await ig.get(`/${media_id}/insights`, { metric: metrics });
      } catch (e) {
        // Fall back to most basic metrics if first set fails
        return await ig.get(`/${media_id}/insights`, {
          metric: "reach,likes,comments,saved,shares",
        });
      }
    },
  },

  {
    name: "ig_account_insights",
    description: "Hesab səviyyəli analytics — impressions, reach, profile_views, follower_count dəyişməsi. Period: 'day' / 'week' / 'days_28'. Tarix aralığı vermək olar.",
    inputSchema: {
      type: "object",
      properties: {
        metrics: {
          type: "string",
          description: "Vergüllə ayrılmış metrikalar. Default: 'impressions,reach,profile_views,follower_count'",
          default: "impressions,reach,profile_views,follower_count",
        },
        period: {
          type: "string",
          enum: ["day", "week", "days_28"],
          default: "day",
        },
        since: {
          type: "string",
          description: "Başlama tarixi (UNIX timestamp və ya YYYY-MM-DD). Boş qoymaq olar.",
        },
        until: {
          type: "string",
          description: "Bitmə tarixi (UNIX timestamp və ya YYYY-MM-DD). Boş qoymaq olar.",
        },
      },
      required: [],
    },
    handler: async (args) => {
      const params = {
        metric: args.metrics ?? "impressions,reach,profile_views,follower_count",
        period: args.period ?? "day",
      };
      if (args.since) params.since = args.since;
      if (args.until) params.until = args.until;
      return ig.get("/me/insights", params);
    },
  },

  {
    name: "ig_list_comments",
    description: "Konkret post-da olan comment-ləri siyahı şəklində qaytarır.",
    inputSchema: {
      type: "object",
      properties: {
        media_id: { type: "string", description: "Post ID" },
        limit: { type: "integer", default: 50, minimum: 1, maximum: 100 },
      },
      required: ["media_id"],
    },
    handler: async (args) => {
      const fields = "id,text,timestamp,username,like_count,user{username,id},replies{id,text,timestamp,username,like_count}";
      return ig.get(`/${args.media_id}/comments`, {
        fields,
        limit: args.limit ?? 50,
      });
    },
  },

  {
    name: "ig_reply_comment",
    description: "Konkret comment-ə cavab yazır.",
    inputSchema: {
      type: "object",
      properties: {
        comment_id: { type: "string", description: "Cavab veriləcək comment ID" },
        message: { type: "string", description: "Cavab mətni" },
      },
      required: ["comment_id", "message"],
    },
    handler: async (args) => {
      return ig.post(`/${args.comment_id}/replies`, { message: args.message });
    },
  },

  {
    name: "ig_delete_comment",
    description: "Konkret comment-i silir (yalnız öz hesab post-larındakı comment-lər silinə bilər).",
    inputSchema: {
      type: "object",
      properties: {
        comment_id: { type: "string", description: "Silinəcək comment ID" },
      },
      required: ["comment_id"],
    },
    handler: async (args) => {
      return ig.delete(`/${args.comment_id}`);
    },
  },
];
