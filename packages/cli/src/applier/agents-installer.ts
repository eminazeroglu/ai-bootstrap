// Install selected agents to ~/.claude/agents/
// Currently a stub — agents will be implemented in Mərhələ C-5
// Built-in agents (Explore, Plan, general-purpose) come with Claude Code, no install needed

import { ensureDir, AGENTS_DIR } from '../utils/paths.js';

export interface AgentInstallResult {
  installed: string[];
  skipped: { agent: string; reason: string }[];
  errors: { agent: string; error: string }[];
}

export function installAgents(agentNames: string[]): AgentInstallResult {
  ensureDir(AGENTS_DIR);

  const result: AgentInstallResult = {
    installed: [],
    skipped: [],
    errors: [],
  };

  // For now, all agents are stubs (Mərhələ C-5 implementation)
  for (const name of agentNames) {
    result.skipped.push({
      agent: name,
      reason: 'Mərhələ C-5-də yaradılır',
    });
  }

  return result;
}
