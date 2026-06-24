import { ig } from "../ig-client.js";

export const dmTools = [
  {
    name: "ig_list_conversations",
    description: "DM söhbətlərini siyahı şəklində qaytarır. Hər söhbət: id, son mesaj vaxtı, iştirakçılar. Yalnız son 24 saatda kimsə yazdığı söhbətlər API-də görünür.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "integer", default: 25, minimum: 1, maximum: 100 },
      },
      required: [],
    },
    handler: async (args) => {
      const fields = "participants{id,username,name},updated_time,messages.limit(1){id,from,message,created_time}";
      return ig.get("/me/conversations", {
        platform: "instagram",
        fields,
        limit: args.limit ?? 25,
      });
    },
  },

  {
    name: "ig_list_messages",
    description: "Konkret söhbətin mesajlarını qaytarır. conversation_id ig_list_conversations-dan götür.",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: { type: "string", description: "Söhbət ID-si" },
        limit: { type: "integer", default: 25, minimum: 1, maximum: 100 },
      },
      required: ["conversation_id"],
    },
    handler: async (args) => {
      const fields = `messages.limit(${args.limit ?? 25}){id,from,to,message,created_time,attachments}`;
      return ig.get(`/${args.conversation_id}`, { fields });
    },
  },

  {
    name: "ig_send_dm",
    description: "Konkret istifadəçiyə DM göndərir. recipient_id Instagram user ID olmalıdır (numerik). Yalnız 24 saatlıq müştəri xidməti pəncərəsi açıqdır (user əvvəlcə yazmalıdır).",
    inputSchema: {
      type: "object",
      properties: {
        recipient_id: {
          type: "string",
          description: "Alıcı Instagram user ID (numerik) — conversation participants-dan götür",
        },
        message: { type: "string", description: "Mesaj mətni" },
      },
      required: ["recipient_id", "message"],
    },
    handler: async (args) => {
      return ig.post("/me/messages", {
        recipient: JSON.stringify({ id: args.recipient_id }),
        message: JSON.stringify({ text: args.message }),
      });
    },
  },
];
