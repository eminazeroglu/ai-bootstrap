// Install skills into a target skills directory by linking from the pool.
//
// v0.5.0 changed:
//   - Used to COPY skill dirs from templates (~10KB each) per project
//   - Now ensures pool is up-to-date, then SYMLINKS from pool → target
//   - One copy on disk in pool; many lightweight links across projects
//   - Updates to pool (via ai-bootstrap update) propagate automatically
//
// Cross-platform: POSIX symlink, Windows junction, copy fallback.

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { ensureDir, SKILLS_DIR } from '../utils/paths.js';
import { ensurePool, linkFromPool, poolHasSkill, poolSkillPath } from './pool.js';

export interface SkillInstallResult {
  installed: string[];
  skipped: { skill: string; reason: string }[];
  errors: { skill: string; error: string }[];
  /** What link strategy was used (per the first link; consistent across the batch). */
  linkMode?: 'symlink' | 'junction' | 'copy';
}

/**
 * Install skills into a target skills directory.
 * @param skillNames List of skill IDs to install (must exist in pool)
 * @param targetSkillsDir Absolute path. Default `~/.claude/skills/` (user scope).
 *                       Pass `<project>/.claude/skills/` for project scope.
 */
export function installSkills(
  skillNames: string[],
  targetSkillsDir: string = SKILLS_DIR,
): SkillInstallResult {
  const result: SkillInstallResult = { installed: [], skipped: [], errors: [] };

  // Ensure the pool has the latest templates (no-op if already up-to-date)
  ensurePool();
  ensureDir(targetSkillsDir);

  for (const name of skillNames) {
    if (!poolHasSkill(name)) {
      result.skipped.push({ skill: name, reason: `Pool-da yoxdur: ${name}` });
      continue;
    }

    const target = join(targetSkillsDir, name);
    if (existsSync(target)) {
      result.skipped.push({ skill: name, reason: 'artıq quraşdırılıb' });
      continue;
    }

    try {
      const mode = linkFromPool(poolSkillPath(name), target);
      result.installed.push(name);
      if (!result.linkMode) result.linkMode = mode;
    } catch (err) {
      result.errors.push({ skill: name, error: err instanceof Error ? err.message : String(err) });
    }
  }

  return result;
}
