// Install selected skills to ~/.claude/skills/
// Copies skill directories from packages/templates/skills/<skill>/
//
// Why copy (not symlink): npm caches may be cleaned, breaking symlinks.
// Copying makes the install self-contained and survives any source removal.
// Templates are versioned via the npm package itself.

import { existsSync, cpSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ensureDir, SKILLS_DIR } from '../utils/paths.js';

/**
 * Resolve the absolute path to skills templates folder.
 *
 * Lookup order:
 *   1) ./templates/skills/    — published npm package (bundled via prepack)
 *   2) ../templates/skills/   — packages/cli/templates/skills/ (dev edit fallback)
 *   3) ../../templates/skills/ — packages/templates/skills/ (monorepo dev)
 *
 * Returns the first path that exists; otherwise the most-likely production path.
 */
function templatesSkillsPath(): string {
  const here = fileURLToPath(import.meta.url);
  // From dist/applier/skills-installer.js:
  //   - cli root = ../../../
  const cliRoot = resolve(here, '..', '..', '..');
  const candidates = [
    join(cliRoot, 'templates', 'skills'),                // 1) published npm pkg
    resolve(cliRoot, '..', 'templates', 'skills'),        // 2) sibling templates package (monorepo)
  ];
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  return candidates[0];
}

export interface SkillInstallResult {
  installed: string[];
  skipped: { skill: string; reason: string }[];
  errors: { skill: string; error: string }[];
}

export function installSkills(skillNames: string[]): SkillInstallResult {
  const result: SkillInstallResult = {
    installed: [],
    skipped: [],
    errors: [],
  };

  ensureDir(SKILLS_DIR);
  const templatesDir = templatesSkillsPath();

  if (!existsSync(templatesDir)) {
    for (const name of skillNames) {
      result.errors.push({
        skill: name,
        error: `Templates folder yoxdur: ${templatesDir}`,
      });
    }
    return result;
  }

  for (const name of skillNames) {
    const sourceDir = join(templatesDir, name);
    const targetDir = join(SKILLS_DIR, name);

    // Check source exists
    if (!existsSync(sourceDir)) {
      result.skipped.push({
        skill: name,
        reason: `Mənbə yoxdur: ${sourceDir} (skill hələ yazılmayıb)`,
      });
      continue;
    }

    // Check target already exists
    if (existsSync(targetDir)) {
      result.skipped.push({
        skill: name,
        reason: 'artıq install olunub',
      });
      continue;
    }

    // Copy recursively (npm-cache-safe; survives source removal)
    try {
      cpSync(sourceDir, targetDir, { recursive: true, dereference: true });
      result.installed.push(name);
    } catch (err) {
      try { rmSync(targetDir, { recursive: true, force: true }); } catch { /* best-effort cleanup */ }
      result.errors.push({
        skill: name,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return result;
}
