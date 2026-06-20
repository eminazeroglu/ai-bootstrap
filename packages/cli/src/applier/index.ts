// Main applier — orchestrates all writers

import chalk from 'chalk';
import ora from 'ora';
import { writeUserProfile } from './profile-writer.js';
import { writeProjectManifest } from './projects-writer.js';
import type { WizardState } from '../types.js';

export async function applyState(state: WizardState): Promise<{
  filesWritten: string[];
  errors: string[];
}> {
  const filesWritten: string[] = [];
  const errors: string[] = [];

  console.log('');
  console.log(chalk.bold.cyan('💾 State-i diskə tətbiq edirəm...'));
  console.log('');

  // Write user profile
  if (state.profile) {
    const spinner = ora('Profil yazılır...').start();
    try {
      const path = writeUserProfile(state.profile);
      filesWritten.push(path);
      spinner.succeed(`Profil: ${path}`);
    } catch (err) {
      spinner.fail('Profil yazılarkən xəta');
      errors.push(String(err));
    }
  }

  // Write project manifest
  if (state.projects.length > 0) {
    const spinner = ora('Layihə manifest yazılır...').start();
    try {
      const paths = writeProjectManifest(state.projects);
      filesWritten.push(...paths);
      spinner.succeed(`Layihə manifest: ${paths.length} fayl`);
    } catch (err) {
      spinner.fail('Layihə manifest yazılarkən xəta');
      errors.push(String(err));
    }
  }

  // TODO (C-4): install skills, agents, configure MCPs, GitHub backup
  console.log('');
  console.log(chalk.dim('(Skill/agent/MCP install — Mərhələ C-4 implementasiya gəlir)'));

  console.log('');
  if (errors.length === 0) {
    console.log(chalk.green(`✓ ${filesWritten.length} fayl yazıldı`));
  } else {
    console.log(chalk.yellow(`⚠️  ${filesWritten.length} fayl yazıldı, ${errors.length} xəta`));
    for (const err of errors) {
      console.log(chalk.red(`   ✗ ${err}`));
    }
  }

  return { filesWritten, errors };
}
