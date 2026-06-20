// Install selected skills to ~/.claude/skills/
// Uses symlinks to packages/templates/skills/<skill>/SKILL.md

import { symlinkSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ensureDir, SKILLS_DIR } from '../utils/paths.js';

/**
 * Resolve the absolute path to packages/templates/skills/
 * Works whether running from dist/ (production) or src/ (dev).
 */
function templatesSkillsPath(): string {
  // __dirname equivalent in ESM
  const here = fileURLToPath(import.meta.url);
  // walk up to find packages/templates/skills/
  // typical: <repo>/packages/cli/dist/applier/skills-installer.js
  //          → ../../../templates/skills
  const candidate = resolve(here, '..', '..', '..', 'templates', 'skills');
  return candidate;
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
    const targetLink = join(SKILLS_DIR, name);

    // Check source exists
    if (!existsSync(sourceDir)) {
      result.skipped.push({
        skill: name,
        reason: `Mənbə yoxdur: ${sourceDir} (skill hələ yazılmayıb)`,
      });
      continue;
    }

    // Check target already exists
    if (existsSync(targetLink)) {
      result.skipped.push({
        skill: name,
        reason: 'artıq install olunub',
      });
      continue;
    }

    // Create symlink
    try {
      symlinkSync(sourceDir, targetLink, 'dir');
      result.installed.push(name);
    } catch (err) {
      result.errors.push({
        skill: name,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return result;
}
