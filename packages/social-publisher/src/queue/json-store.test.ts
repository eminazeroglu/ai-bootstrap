/**
 * JsonQueueStore üçün testlər (node:test).
 * İşə sal: pnpm build && node --test dist/queue/json-store.test.js
 */

import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { JsonQueueStore } from "./json-store.js";
import type { NewPostInput } from "./types.js";

function sample(overrides: Partial<NewPostInput> = {}): NewPostInput {
  return {
    clientId: "sahil-transport",
    platform: "instagram",
    type: "image",
    mediaUrls: ["https://example.com/a.jpg"],
    caption: "test",
    scheduledAt: "2026-06-25T09:00:00Z",
    ...overrides,
  };
}

async function freshStore() {
  const dir = await mkdtemp(join(tmpdir(), "sp-test-"));
  const store = new JsonQueueStore(join(dir, "queue.json"));
  await store.init();
  return { store, dir };
}

test("add + get + list", async () => {
  const { store, dir } = await freshStore();
  const post = await store.add(sample());
  assert.equal(post.status, "pending");
  assert.equal(post.attempts, 0);
  assert.ok(post.id);

  const got = await store.get(post.id);
  assert.equal(got?.id, post.id);

  const all = await store.list();
  assert.equal(all.length, 1);
  await rm(dir, { recursive: true, force: true });
});

test("list filtri", async () => {
  const { store, dir } = await freshStore();
  await store.add(sample({ clientId: "a", platform: "instagram" }));
  await store.add(sample({ clientId: "b", platform: "instagram" }));
  assert.equal((await store.list({ clientId: "a" })).length, 1);
  assert.equal((await store.list({ platform: "instagram" })).length, 2);
  assert.equal((await store.list({ status: "posted" })).length, 0);
  await rm(dir, { recursive: true, force: true });
});

test("update + remove", async () => {
  const { store, dir } = await freshStore();
  const post = await store.add(sample());
  const updated = await store.update(post.id, { status: "posted", publishedMediaId: "123" });
  assert.equal(updated?.status, "posted");
  assert.equal(updated?.publishedMediaId, "123");

  assert.equal(await store.remove(post.id), true);
  assert.equal(await store.remove(post.id), false);
  assert.equal(await store.get(post.id), null);
  await rm(dir, { recursive: true, force: true });
});

test("dueNow yalnız vaxtı çatmış pending postları qaytarır", async () => {
  const { store, dir } = await freshStore();
  await store.add(sample({ scheduledAt: "2026-06-25T09:00:00Z" })); // keçmiş
  await store.add(sample({ scheduledAt: "2099-01-01T00:00:00Z" })); // gələcək
  const posted = await store.add(sample({ scheduledAt: "2020-01-01T00:00:00Z" }));
  await store.update(posted.id, { status: "posted" });

  const due = await store.dueNow(new Date("2026-06-26T00:00:00Z"));
  assert.equal(due.length, 1);
  assert.equal(due[0].scheduledAt, "2026-06-25T09:00:00Z");
  await rm(dir, { recursive: true, force: true });
});

test("ardıcıl yazılar itmir (concurrent add)", async () => {
  const { store, dir } = await freshStore();
  await Promise.all(Array.from({ length: 20 }, () => store.add(sample())));
  assert.equal((await store.list()).length, 20);
  await rm(dir, { recursive: true, force: true });
});
