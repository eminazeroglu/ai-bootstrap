// Install selected agents to ~/.claude/agents/
// Copies agent directories from packages/templates/agents/<name>/
// (Copy not symlink: npm cache may be cleaned, breaking symlinks.)

import { existsSync, cpSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ensureDir, AGENTS_DIR } from '../utils/paths.js';

function templatesAgentsPath(): string {
  // Lookup order:
  //   1) ./templates/agents/  — published npm package (bundled via prepack)
  //   2) ../templates/agents/ — sibling templates package (monorepo dev)
  const here = fileURLToPath(import.meta.url);
  const cliRoot = resolve(here, '..', '..', '..');
  const candidates = [
    join(cliRoot, 'templates', 'agents'),
    resolve(cliRoot, '..', 'templates', 'agents'),
  ];
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  return candidates[0];
}

export interface AgentInstallResult {
  installed: string[];
  skipped: { agent: string; reason: string }[];
  errors: { agent: string; error: string }[];
}

export function installAgents(agentNames: string[]): AgentInstallResult {
  const result: AgentInstallResult = {
    installed: [],
    skipped: [],
    errors: [],
  };

  ensureDir(AGENTS_DIR);
  const templatesDir = templatesAgentsPath();

  if (!existsSync(templatesDir)) {
    for (const name of agentNames) {
      result.skipped.push({
        agent: name,
        reason: 'agents templates folder yoxdur (Mərhələ C-5-də yaradılır)',
      });
    }
    return result;
  }

  for (const name of agentNames) {
    const sourceDir = join(templatesDir, name);
    const targetDir = join(AGENTS_DIR, name);

    if (!existsSync(sourceDir)) {
      result.skipped.push({
        agent: name,
        reason: `template yoxdur: ${name} (skill hələ yazılmayıb)`,
      });
      continue;
    }

    if (existsSync(targetDir)) {
      result.skipped.push({
        agent: name,
        reason: 'artıq install olunub',
      });
      continue;
    }

    try {
      cpSync(sourceDir, targetDir, { recursive: true, dereference: true });
      result.installed.push(name);
    } catch (err) {
      try { rmSync(targetDir, { recursive: true, force: true }); } catch { /* best-effort */ }
      result.errors.push({
        agent: name,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return result;
}
