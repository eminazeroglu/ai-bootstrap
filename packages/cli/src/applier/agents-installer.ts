// Install agents into a target agents directory by linking from the pool.
// Same architecture as skills-installer (v0.5.0 Pool+Symlink).

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { ensureDir, AGENTS_DIR } from '../utils/paths.js';
import { ensurePool, linkFromPool, poolHasAgent, poolAgentPath } from './pool.js';

export interface AgentInstallResult {
  installed: string[];
  skipped: { agent: string; reason: string }[];
  errors: { agent: string; error: string }[];
  linkMode?: 'symlink' | 'junction' | 'copy';
}

export function installAgents(
  agentNames: string[],
  targetAgentsDir: string = AGENTS_DIR,
): AgentInstallResult {
  const result: AgentInstallResult = { installed: [], skipped: [], errors: [] };

  ensurePool();
  ensureDir(targetAgentsDir);

  for (const name of agentNames) {
    if (!poolHasAgent(name)) {
      result.skipped.push({ agent: name, reason: `Pool-da yoxdur: ${name}` });
      continue;
    }

    const target = join(targetAgentsDir, name);
    if (existsSync(target)) {
      result.skipped.push({ agent: name, reason: 'artıq quraşdırılıb' });
      continue;
    }

    try {
      const mode = linkFromPool(poolAgentPath(name), target);
      result.installed.push(name);
      if (!result.linkMode) result.linkMode = mode;
    } catch (err) {
      result.errors.push({ agent: name, error: err instanceof Error ? err.message : String(err) });
    }
  }

  return result;
}
