/** Platforma registri — ada görə platforma tap. */

import type { PlatformName } from "../queue/types.js";
import { instagram } from "./instagram.js";
import { linkedin } from "./linkedin.js";
import { tiktok } from "./tiktok.js";
import type { Platform } from "./types.js";

const registry: Record<PlatformName, Platform> = {
  instagram,
  tiktok,
  linkedin,
};

export function getPlatform(name: PlatformName): Platform {
  const p = registry[name];
  if (!p) throw new Error(`Naməlum platforma: ${name}`);
  return p;
}

export { instagram, tiktok, linkedin };
export type { Platform } from "./types.js";
