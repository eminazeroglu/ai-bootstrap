/**
 * JSON fayl-əsaslı QueueStore (Mərhələ 1).
 *
 * Bütün postlar tək bir JSON faylında saxlanılır. Yazı atomikdir
 * (müvəqqəti fayl → rename) ki, prosess yarıda dayansa fayl korlanmasın.
 *
 * Railway-də fayl saxlanması üçün persistent volume lazımdır
 * (railway.json-da mount edilir). Postgres-ə keçid üçün eyni
 * QueueStore interfeysini implement edən pg-store.ts yazmaq kifayətdir.
 */

import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import type {
  NewPostInput,
  PostFilter,
  QueueStore,
  ScheduledPost,
} from "./types.js";

export class JsonQueueStore implements QueueStore {
  private readonly filePath: string;
  /** Eyni anda iki yazının yarışmaması üçün serial lock. */
  private writeChain: Promise<void> = Promise.resolve();

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async init(): Promise<void> {
    await mkdir(dirname(this.filePath), { recursive: true });
    try {
      await readFile(this.filePath, "utf8");
    } catch {
      await this.writeAll([]);
    }
  }

  private async readAll(): Promise<ScheduledPost[]> {
    try {
      const raw = await readFile(this.filePath, "utf8");
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as ScheduledPost[]) : [];
    } catch {
      return [];
    }
  }

  private async writeAll(posts: ScheduledPost[]): Promise<void> {
    const tmp = `${this.filePath}.${randomUUID()}.tmp`;
    await writeFile(tmp, JSON.stringify(posts, null, 2), "utf8");
    await rename(tmp, this.filePath);
  }

  /** Read-modify-write əməliyyatlarını serial edir (yarış olmasın). */
  private mutate<T>(fn: (posts: ScheduledPost[]) => { posts: ScheduledPost[]; result: T }): Promise<T> {
    const run = this.writeChain.then(async () => {
      const posts = await this.readAll();
      const { posts: next, result } = fn(posts);
      await this.writeAll(next);
      return result;
    });
    // writeChain həmişə resolve olsun (xəta zənciri qırmasın).
    this.writeChain = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  }

  async add(input: NewPostInput): Promise<ScheduledPost> {
    const now = new Date().toISOString();
    const post: ScheduledPost = {
      id: randomUUID(),
      clientId: input.clientId,
      platform: input.platform,
      type: input.type,
      mediaUrls: input.mediaUrls,
      caption: input.caption,
      scheduledAt: input.scheduledAt,
      status: "pending",
      attempts: 0,
      createdAt: now,
      updatedAt: now,
    };
    return this.mutate((posts) => {
      posts.push(post);
      return { posts, result: post };
    });
  }

  async get(id: string): Promise<ScheduledPost | null> {
    const posts = await this.readAll();
    return posts.find((p) => p.id === id) ?? null;
  }

  async list(filter: PostFilter = {}): Promise<ScheduledPost[]> {
    const posts = await this.readAll();
    return posts
      .filter((p) => (filter.clientId ? p.clientId === filter.clientId : true))
      .filter((p) => (filter.platform ? p.platform === filter.platform : true))
      .filter((p) => (filter.status ? p.status === filter.status : true))
      .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));
  }

  async remove(id: string): Promise<boolean> {
    return this.mutate((posts) => {
      const next = posts.filter((p) => p.id !== id);
      return { posts: next, result: next.length !== posts.length };
    });
  }

  async update(id: string, patch: Partial<ScheduledPost>): Promise<ScheduledPost | null> {
    return this.mutate((posts) => {
      const idx = posts.findIndex((p) => p.id === id);
      if (idx === -1) return { posts, result: null };
      const updated: ScheduledPost = {
        ...posts[idx],
        ...patch,
        id: posts[idx].id,
        updatedAt: new Date().toISOString(),
      };
      posts[idx] = updated;
      return { posts, result: updated };
    });
  }

  async dueNow(now: Date): Promise<ScheduledPost[]> {
    const posts = await this.readAll();
    const nowMs = now.getTime();
    return posts
      .filter((p) => p.status === "pending")
      .filter((p) => new Date(p.scheduledAt).getTime() <= nowMs)
      .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));
  }
}
