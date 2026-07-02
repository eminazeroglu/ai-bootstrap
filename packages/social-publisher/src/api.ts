/**
 * REST API (Fastify).
 *
 * Endpoints:
 *   GET  /health            → Railway healthcheck (auth yox)
 *   GET  /clients           → konfiqurasiya olunmuş müştərilər
 *   POST /posts             → növbəyə post əlavə et
 *   GET  /posts             → növbəni gör (filter: clientId, platform, status)
 *   GET  /posts/:id         → bir post
 *   DELETE /posts/:id       → postu sil
 *
 * Auth: API_KEY varsa, /health-dən başqa bütün route-lar
 *   `Authorization: Bearer <API_KEY>` tələb edir.
 */

import Fastify, { type FastifyInstance } from "fastify";
import type { ClientRegistry, ServerConfig } from "./config.js";
import type {
  NewPostInput,
  PlatformName,
  PostStatus,
  PostType,
  QueueStore,
} from "./queue/types.js";

export interface ApiDeps {
  store: QueueStore;
  clients: ClientRegistry;
  config: ServerConfig;
}

const VALID_PLATFORMS: PlatformName[] = ["instagram", "tiktok", "linkedin"];
const VALID_TYPES: PostType[] = ["image", "video", "reel", "carousel"];
const VALID_STATUSES: PostStatus[] = ["pending", "publishing", "posted", "failed"];

/** POST /posts gövdəsini doğrula. Xəta mesajı qaytarır (yoxdursa null). */
function validateNewPost(
  body: any,
  clients: ClientRegistry,
): { ok: true; value: NewPostInput } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "JSON gövdə lazımdır" };

  const { clientId, platform, type, mediaUrls, caption, scheduledAt } = body;

  if (!clientId || typeof clientId !== "string")
    return { ok: false, error: "clientId tələb olunur" };
  if (!clients.has(clientId))
    return { ok: false, error: `Naməlum clientId: ${clientId}` };
  if (!VALID_PLATFORMS.includes(platform))
    return { ok: false, error: `platform biri olmalıdır: ${VALID_PLATFORMS.join(", ")}` };
  if (!VALID_TYPES.includes(type))
    return { ok: false, error: `type biri olmalıdır: ${VALID_TYPES.join(", ")}` };
  if (!Array.isArray(mediaUrls) || mediaUrls.length === 0)
    return { ok: false, error: "mediaUrls boş olmayan massiv olmalıdır" };
  if (!mediaUrls.every((u) => typeof u === "string" && /^https?:\/\//.test(u)))
    return { ok: false, error: "hər mediaUrl public http(s) URL olmalıdır" };
  if (type === "carousel" && (mediaUrls.length < 2 || mediaUrls.length > 10))
    return { ok: false, error: "carousel 2-10 mediaUrl tələb edir" };
  if (caption !== undefined && typeof caption !== "string")
    return { ok: false, error: "caption mətn olmalıdır" };
  if (!scheduledAt || typeof scheduledAt !== "string" || Number.isNaN(Date.parse(scheduledAt)))
    return { ok: false, error: "scheduledAt düzgün ISO 8601 tarix olmalıdır" };

  return {
    ok: true,
    value: { clientId, platform, type, mediaUrls, caption, scheduledAt },
  };
}

export function buildApi(deps: ApiDeps): FastifyInstance {
  const { store, clients, config } = deps;
  const app = Fastify({ logger: true });

  // Bearer auth (health-dən başqa).
  app.addHook("onRequest", async (req, reply) => {
    if (req.url === "/health" || req.url.startsWith("/health?")) return;
    if (!config.apiKey) return; // açar yoxdursa auth deaktiv (local).
    const auth = req.headers.authorization ?? "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (token !== config.apiKey) {
      reply.code(401).send({ error: "Yetkisiz — Bearer API_KEY lazımdır" });
    }
  });

  app.get("/health", async () => ({ status: "ok" }));

  app.get("/clients", async () => ({ clients: clients.list() }));

  app.post("/posts", async (req, reply) => {
    const result = validateNewPost(req.body, clients);
    if (!result.ok) {
      return reply.code(400).send({ error: result.error });
    }
    const post = await store.add(result.value);
    return reply.code(201).send(post);
  });

  app.get("/posts", async (req) => {
    const q = req.query as Record<string, string | undefined>;
    const filter: { clientId?: string; platform?: PlatformName; status?: PostStatus } = {};
    if (q.clientId) filter.clientId = q.clientId;
    if (q.platform && VALID_PLATFORMS.includes(q.platform as PlatformName))
      filter.platform = q.platform as PlatformName;
    if (q.status && VALID_STATUSES.includes(q.status as PostStatus))
      filter.status = q.status as PostStatus;
    const posts = await store.list(filter);
    return { posts };
  });

  app.get("/posts/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const post = await store.get(id);
    if (!post) return reply.code(404).send({ error: "Post tapılmadı" });
    return post;
  });

  app.delete("/posts/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const removed = await store.remove(id);
    if (!removed) return reply.code(404).send({ error: "Post tapılmadı" });
    return reply.code(204).send();
  });

  return app;
}
