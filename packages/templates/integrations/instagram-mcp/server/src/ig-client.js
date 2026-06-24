import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../../.env") });

const TOKEN = process.env.IG_ACCESS_TOKEN;
const IG_USER_ID = process.env.IG_BUSINESS_ACCOUNT_ID;
const APP_SECRET = process.env.META_APP_SECRET;
const APP_ID = process.env.META_APP_ID;

if (!TOKEN || !IG_USER_ID) {
  throw new Error(
    "IG_ACCESS_TOKEN və ya IG_BUSINESS_ACCOUNT_ID .env-də tapılmadı"
  );
}

const BASE = "https://graph.instagram.com/v22.0";

function buildUrl(path, params = {}) {
  const url = new URL(`${BASE}${path}`);
  url.searchParams.set("access_token", TOKEN);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  }
  return url.toString();
}

async function request(method, path, { params = {}, body } = {}) {
  const url = buildUrl(path, body ? {} : params);
  const init = { method, headers: {} };

  if (body) {
    const formBody = new URLSearchParams();
    formBody.set("access_token", TOKEN);
    for (const [k, v] of Object.entries(body)) {
      if (v !== undefined && v !== null) formBody.set(k, String(v));
    }
    init.body = formBody;
    init.headers["Content-Type"] = "application/x-www-form-urlencoded";
  }

  const res = await fetch(url, init);
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Graph API qeyri-JSON cavab: ${res.status} — ${text.slice(0, 200)}`);
  }

  if (!res.ok || data.error) {
    const err = data.error || { message: `HTTP ${res.status}` };
    const msg = `Graph API xətası (${err.code || res.status}): ${err.message}${err.error_subcode ? ` [subcode: ${err.error_subcode}]` : ""}`;
    throw new Error(msg);
  }

  return data;
}

export const ig = {
  userId: IG_USER_ID,
  appId: APP_ID,
  appSecret: APP_SECRET,

  get: (path, params) => request("GET", path, { params }),
  post: (path, body) => request("POST", path, { body }),
  delete: (path) => request("DELETE", path),

  async paginate(path, params = {}, maxPages = 5) {
    const items = [];
    let next = buildUrl(path, params);
    let pages = 0;
    while (next && pages < maxPages) {
      const res = await fetch(next);
      const data = await res.json();
      if (data.error) throw new Error(`Graph API: ${data.error.message}`);
      if (Array.isArray(data.data)) items.push(...data.data);
      next = data.paging?.next || null;
      pages++;
    }
    return items;
  },
};
