// Install selected agents to ~/.claude/agents/
// Symlinks AGENT.md files from packages/templates/agents/<name>/AGENT.md

import { symlinkSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ensureDir, AGENTS_DIR } from '../utils/paths.js';

function templatesAgentsPath(): string {
  const here = fileURLToPath(import.meta.url);
  // <repo>/packages/cli/dist/applier/agents-installer.js
  //   4 levels up to repo packages/ + templates/agents
  return resolve(here, '..', '..', '..', '..', 'templates', 'agents');
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
    const targetLink = join(AGENTS_DIR, name);

    if (!existsSync(sourceDir)) {
      result.skipped.push({
        agent: name,
        reason: `template yoxdur: ${name} (skill hələ yazılmayıb)`,
      });
      continue;
    }

    if (existsSync(targetLink)) {
      result.skipped.push({
        agent: name,
        reason: 'artıq install olunub',
      });
      continue;
    }

    try {
      symlinkSync(sourceDir, targetLink, 'dir');
      result.installed.push(name);
    } catch (err) {
      result.errors.push({
        agent: name,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return result;
}
