// ai-bootstrap update — re-sync skills + agents from current template bundle
// Reads ~/.claude/ai-bootstrap-state.json (saved from initial wizard) and re-applies.

import chalk from 'chalk';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CLAUDE_DIR, ensureDir } from '../utils/paths.js';
import { installSkills } from '../applier/skills-installer.js';
import { installAgents } from '../applier/agents-installer.js';
import { resolvePlan } from '../applier/bundle-definitions.js';

const STATE_FILE = join(CLAUDE_DIR, 'ai-bootstrap-state.json');

interface SavedState {
  version: string;
  selectedBundles: { skills: string; agents: string };
  lastSync: string;
}

export function saveState(state: { selectedBundles: { skills: string; agents: string } }): void {
  ensureDir(CLAUDE_DIR);
  const saved: SavedState = {
    version: '1.0',
    selectedBundles: state.selectedBundles,
    lastSync: new Date().toISOString(),
  };
  writeFileSync(STATE_FILE, JSON.stringify(saved, null, 2), 'utf-8');
}

function readState(): SavedState | null {
  if (!existsSync(STATE_FILE)) return null;
  try {
    return JSON.parse(readFileSync(STATE_FILE, 'utf-8')) as SavedState;
  } catch {
    return null;
  }
}

export function runUpdate(): void {
  console.log(chalk.bold('\nai-bootstrap update — re-sync skills + agents\n'));

  const state = readState();
  if (!state) {
    console.error(
      chalk.red('✗ No saved state found.') +
        ' İlk dəfə qurmaq üçün: ' +
        chalk.cyan('ai-bootstrap'),
    );
    process.exit(1);
  }

  console.log(chalk.dim(`  Last sync: ${state.lastSync}`));
  console.log(chalk.dim(`  Skills bundle: ${state.selectedBundles.skills}`));
  console.log(chalk.dim(`  Agents bundle: ${state.selectedBundles.agents}\n`));

  const plan = resolvePlan(state.selectedBundles.skills, state.selectedBundles.agents);

  console.log(chalk.bold('Skills:'));
  const skillResult = installSkills(plan.skills);
  console.log(
    `  ${chalk.green('✓')} ${skillResult.installed.length} installed (synced)` +
      `${skillResult.skipped.length > 0 ? `, ${chalk.dim(skillResult.skipped.length + ' skipped')}` : ''}` +
      `${skillResult.errors.length > 0 ? `, ${chalk.red(skillResult.errors.length + ' errors')}` : ''}`,
  );
  for (const err of skillResult.errors) {
    console.log(chalk.red(`    ✗ ${err.skill}: ${err.error}`));
  }

  console.log(chalk.bold('\nAgents:'));
  const agentResult = installAgents(plan.agents);
  console.log(
    `  ${chalk.green('✓')} ${agentResult.installed.length} installed (synced)` +
      `${agentResult.skipped.length > 0 ? `, ${chalk.dim(agentResult.skipped.length + ' skipped')}` : ''}` +
      `${agentResult.errors.length > 0 ? `, ${chalk.red(agentResult.errors.length + ' errors')}` : ''}`,
  );
  for (const err of agentResult.errors) {
    console.log(chalk.red(`    ✗ ${err.agent}: ${err.error}`));
  }

  saveState(state);

  console.log(chalk.green('\n✓ Update tamamlandı\n'));
}
