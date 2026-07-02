/**
 * Konfiqurasiya — server config + çoxmüştəri credentials.
 *
 * Multi-client modeli (brief tələbi: "token kodda yox, env-də"):
 *   - clients.json → müştəri metadata + hər platforma üçün hansı env
 *     dəyişənlərinin token/account daşıdığını GÖSTƏRİR (referans, dəyər yox).
 *   - Real tokenlər Railway env vars-dadır.
 *
 * clients.json nümunəsi:
 * {
 *   "clients": [
 *     {
 *       "id": "sahil-transport",
 *       "name": "Sahil Transport",
 *       "platforms": {
 *         "instagram": {
 *           "accessTokenEnv": "SAHIL_INSTAGRAM_ACCESS_TOKEN",
 *           "accountIdEnv": "SAHIL_INSTAGRAM_ACCOUNT_ID"
 *         }
 *       }
 *     }
 *   ]
 * }
 *
 * Tək müştəri üçün clients.json olmasa belə, default env-dən
 * (INSTAGRAM_ACCESS_TOKEN / INSTAGRAM_ACCOUNT_ID) "default" müştəri qurulur.
 */

import { readFile } from "node:fs/promises";
import type { PlatformName } from "./queue/types.js";
import type { PlatformCredentials } from "./platforms/types.js";

/** clients.json-dakı bir platforma üçün env referansları. */
interface PlatformEnvRef {
  accessTokenEnv: string;
  accountIdEnv: string;
  appIdEnv?: string;
  appSecretEnv?: string;
}

interface ClientConfigFile {
  id: string;
  name?: string;
  platforms: Partial<Record<PlatformName, PlatformEnvRef>>;
}

interface ClientsFile {
  clients: ClientConfigFile[];
}

export interface ServerConfig {
  port: number;
  /** API auth açarı (Bearer). Boş olsa auth deaktivdir (yalnız local). */
  apiKey: string;
  /** Queue JSON faylının yolu. */
  queueFile: string;
  /** Cron loop intervalı (ms). Default 5 dəq. */
  pollIntervalMs: number;
  /** Uğursuz postun maksimum cəhd sayı. */
  maxAttempts: number;
}

export function loadServerConfig(env = process.env): ServerConfig {
  return {
    port: Number(env.PORT ?? 3000),
    apiKey: env.API_KEY ?? "",
    queueFile: env.QUEUE_FILE ?? "./data/queue.json",
    pollIntervalMs: Number(env.POLL_INTERVAL_MS ?? 5 * 60 * 1000),
    maxAttempts: Number(env.MAX_ATTEMPTS ?? 3),
  };
}

export class ClientRegistry {
  private clients = new Map<string, ClientConfigFile>();

  constructor(clients: ClientConfigFile[]) {
    for (const c of clients) this.clients.set(c.id, c);
  }

  /** clients.json-dan yüklə; tapılmasa env-dən "default" müştəri qur. */
  static async load(
    clientsFilePath = process.env.CLIENTS_FILE ?? "./clients.json",
    env = process.env,
  ): Promise<ClientRegistry> {
    try {
      const raw = await readFile(clientsFilePath, "utf8");
      const parsed = JSON.parse(raw) as ClientsFile;
      if (Array.isArray(parsed.clients) && parsed.clients.length > 0) {
        return new ClientRegistry(parsed.clients);
      }
    } catch {
      // clients.json yoxdursa default-a düş.
    }

    // Default tək müştəri (sadə deploy üçün).
    const fallback: ClientConfigFile = {
      id: "default",
      name: "Default",
      platforms: {
        instagram: {
          accessTokenEnv: "INSTAGRAM_ACCESS_TOKEN",
          accountIdEnv: "INSTAGRAM_ACCOUNT_ID",
          appIdEnv: "INSTAGRAM_APP_ID",
          appSecretEnv: "INSTAGRAM_APP_SECRET",
        },
      },
    };
    void env;
    return new ClientRegistry([fallback]);
  }

  has(clientId: string): boolean {
    return this.clients.has(clientId);
  }

  list(): { id: string; name?: string; platforms: PlatformName[] }[] {
    return [...this.clients.values()].map((c) => ({
      id: c.id,
      name: c.name,
      platforms: Object.keys(c.platforms) as PlatformName[],
    }));
  }

  /**
   * Bir müştərinin bir platforma üçün credentials-larını env-dən oxu.
   * Token tapılmasa açıq xəta atır.
   */
  resolveCredentials(
    clientId: string,
    platform: PlatformName,
    env = process.env,
  ): PlatformCredentials {
    const client = this.clients.get(clientId);
    if (!client) throw new Error(`Müştəri tapılmadı: ${clientId}`);
    const ref = client.platforms[platform];
    if (!ref) {
      throw new Error(`Müştəri ${clientId} üçün ${platform} konfiqurasiya olunmayıb`);
    }
    const accessToken = env[ref.accessTokenEnv];
    const accountId = env[ref.accountIdEnv];
    if (!accessToken || !accountId) {
      throw new Error(
        `Env tapılmadı: ${ref.accessTokenEnv} / ${ref.accountIdEnv} (müştəri ${clientId}, ${platform})`,
      );
    }
    return {
      accessToken,
      accountId,
      appId: ref.appIdEnv ? env[ref.appIdEnv] : undefined,
      appSecret: ref.appSecretEnv ? env[ref.appSecretEnv] : undefined,
    };
  }
}
