// Pool — single source of truth for skill + agent templates.
//
// Architecture (v0.5.0):
//   ~/.claude/skills-pool/<skill>/    — every skill, ONE copy on disk
//   ~/.claude/agents-pool/<agent>/    — every agent, ONE copy
//   ~/.claude/skills/<skill>          — symlink → pool (user scope)
//   <project>/.claude/skills/<skill>  — symlink → pool (project scope)
//
// Pool is populated from the bundled templates on first run (or update).
// pnpm-style: many references, one underlying store.
//
// Cross-platform:
//   macOS / Linux / WSL2 — symlinkSync('dir')
//   Windows native       — try junction ('junction'); fall back to copy if no admin
//
// When a new version of @azerogluemin/ai-bootstrap is installed:
//   - `ai-bootstrap update` re-runs ensurePool() → pool gets new content
//   - All symlinks in user-scope + projects auto-see the update
//   - No per-project re-install needed

import { existsSync, readdirSync, statSync, lstatSync, cpSync, symlinkSync, rmSync, realpathSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { IS_WINDOWS, SKILLS_POOL_DIR, AGENTS_POOL_DIR, ensureDir } from '../utils/paths.js';

/**
 * Resolve absolute path to the bundled templates folder.
 * Same lookup as skills-installer used in v0.4.x.
 */
function templatesRoot(): string {
  const here = fileURLToPath(import.meta.url);
  const cliRoot = resolve(here, '..', '..', '..');
  const candidates = [
    join(cliRoot, 'templates'),                // published npm pkg (prepack)
    resolve(cliRoot, '..', 'templates'),        // monorepo dev sibling
  ];
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  return candidates[0];
}

export interface PoolResult {
  skillsPool: string;
  agentsPool: string;
  skillsAdded: number;
  skillsUpdated: number;
  agentsAdded: number;
  agentsUpdated: number;
  errors: { item: string; error: string }[];
}

/**
 * Ensure the pool exists and is up-to-date with the bundled templates.
 * Idempotent: safe to call on every install/update.
 *
 * Strategy: compare modification times. If template is newer, refresh pool entry.
 */
export function ensurePool(): PoolResult {
  const result: PoolResult = {
    skillsPool: SKILLS_POOL_DIR,
    agentsPool: AGENTS_POOL_DIR,
    skillsAdded: 0,
    skillsUpdated: 0,
    agentsAdded: 0,
    agentsUpdated: 0,
    errors: [],
  };

  ensureDir(SKILLS_POOL_DIR);
  ensureDir(AGENTS_POOL_DIR);

  const root = templatesRoot();
  syncCategory(join(root, 'skills'), SKILLS_POOL_DIR, result, 'skills');
  syncCategory(join(root, 'agents'), AGENTS_POOL_DIR, result, 'agents');

  return result;
}

function syncCategory(
  src: string,
  dst: string,
  result: PoolResult,
  category: 'skills' | 'agents',
): void {
  if (!existsSync(src)) return;
  const items = readdirSync(src);
  for (const name of items) {
    const srcItem = join(src, name);
    const dstItem = join(dst, name);
    try {
      const srcStat = statSync(srcItem);
      if (!srcStat.isDirectory()) continue;

      if (!existsSync(dstItem)) {
        cpSync(srcItem, dstItem, { recursive: true, dereference: true });
        if (category === 'skills') result.skillsAdded++;
        else result.agentsAdded++;
        continue;
      }

      // Update check: if template SKILL.md/AGENT.md is newer than pool's, refresh
      const markerFile = category === 'skills' ? 'SKILL.md' : 'AGENT.md';
      const srcMarker = join(srcItem, markerFile);
      const dstMarker = join(dstItem, markerFile);
      if (existsSync(srcMarker) && existsSync(dstMarker)) {
        const srcM = statSync(srcMarker).mtimeMs;
        const dstM = statSync(dstMarker).mtimeMs;
        if (srcM > dstM) {
          rmSync(dstItem, { recursive: true, force: true });
          cpSync(srcItem, dstItem, { recursive: true, dereference: true });
          if (category === 'skills') result.skillsUpdated++;
          else result.agentsUpdated++;
        }
      }
    } catch (err) {
      result.errors.push({ item: name, error: err instanceof Error ? err.message : String(err) });
    }
  }
}

/**
 * Create a cross-platform link from a pool entry to a target location.
 * - POSIX: symlink
 * - Windows: try junction (no admin needed for dirs), fall back to copy on failure
 *
 * Returns 'symlink' | 'junction' | 'copy' to indicate what was used.
 */
export function linkFromPool(poolEntry: string, targetPath: string): 'symlink' | 'junction' | 'copy' {
  const parent = dirname(targetPath);
  ensureDir(parent);

  if (existsSync(targetPath) || isBrokenSymlink(targetPath)) {
    // Caller is responsible for skipping; we don't overwrite blindly
    throw new Error(`Target already exists: ${targetPath}`);
  }

  if (!IS_WINDOWS) {
    symlinkSync(poolEntry, targetPath, 'dir');
    return 'symlink';
  }

  // Windows: try junction first (no admin needed for directories)
  try {
    symlinkSync(poolEntry, targetPath, 'junction');
    return 'junction';
  } catch {
    // Fall back to copy (admin required for true symlinks; junctions failed too)
    cpSync(poolEntry, targetPath, { recursive: true, dereference: true });
    return 'copy';
  }
}

function isBrokenSymlink(p: string): boolean {
  try {
    const ls = lstatSync(p);
    if (!ls.isSymbolicLink()) return false;
    try {
      realpathSync(p);
      return false;
    } catch {
      return true;
    }
  } catch {
    return false;
  }
}

/**
 * Check whether a pool entry exists for the given name.
 */
export function poolHasSkill(name: string): boolean {
  return existsSync(join(SKILLS_POOL_DIR, name));
}

export function poolHasAgent(name: string): boolean {
  return existsSync(join(AGENTS_POOL_DIR, name));
}

export function poolSkillPath(name: string): string {
  return join(SKILLS_POOL_DIR, name);
}

export function poolAgentPath(name: string): string {
  return join(AGENTS_POOL_DIR, name);
}
