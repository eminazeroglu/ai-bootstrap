// ai-bootstrap wizard — orchestrates the 6-step interactive setup

import chalk from 'chalk';
import { confirm } from '@inquirer/prompts';
import { profileStep } from './steps/1-profile.js';
import { projectsStep } from './steps/2-projects.js';
import { bundlesStep } from './steps/3-bundles.js';
import { mcpsStep } from './steps/4-mcps.js';
import { memoryStep } from './steps/5-memory.js';
import { githubStep } from './steps/6-github.js';
import type { WizardState } from './types.js';

export async function runWizard(): Promise<WizardState> {
  // Banner
  console.log('');
  console.log(chalk.bold.cyan('🧠 ai-bootstrap'));
  console.log(chalk.dim('   Personal AI infrastructure bootstrap for Claude Code'));
  console.log('');

  // Initial permission gate
  console.log(chalk.yellow('⚠️  İcazə lazımdır:'));
  console.log(chalk.dim('   - Layihə qovluqlarını oxumaq (read-only)'));
  console.log(chalk.dim('   - AI profilini qurmaq (sual verir)'));
  console.log(chalk.dim('   - ~/.claude/ konfiqurasiya etmək'));
  console.log(chalk.dim('   - MCP-lər üçün credential istəmək'));
  console.log('');

  const proceed = await confirm({
    message: 'Davam edək?',
    default: true,
  });

  if (!proceed) {
    console.log(chalk.yellow('Ləğv edildi.'));
    process.exit(0);
  }

  // Run 6 steps sequentially
  const state: Partial<WizardState> = {
    projectPaths: [],
    projects: [],
  };

  // Step 1: Profile
  state.profile = await profileStep();

  // Step 2: Projects
  const projectsResult = await projectsStep();
  state.projectPaths = projectsResult.paths;
  state.projects = projectsResult.selected;

  // Step 3: Bundles
  const bundlesResult = await bundlesStep();
  state.selectedBundles = {
    skills: bundlesResult.skills,
    agents: bundlesResult.agents,
    mcps: 'custom', // determined in step 4
  };

  // Step 4: MCPs
  const mcpsResult = await mcpsStep();
  (state as any).mcps = mcpsResult.selected;

  // Step 5: Memory
  const memoryResult = await memoryStep();
  state.memoryConfig = {
    storage: memoryResult.storage,
    autoLearn: memoryResult.autoLearn,
    syncToGithub: false, // determined in step 6
  };

  // Step 6: GitHub
  const githubResult = await githubStep();
  state.memoryConfig.syncToGithub = githubResult.enabled;
  if (githubResult.repoUrl) {
    state.memoryConfig.githubRepo = githubResult.repoUrl;
  }

  // Final summary
  console.log('');
  console.log(chalk.bold.green('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
  console.log(chalk.bold.green('✓ Setup tamamlandı!'));
  console.log(chalk.bold.green('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
  console.log('');
  console.log(chalk.bold('Yığım:'));
  console.log(`  Ad:          ${chalk.cyan(state.profile.name)}`);
  console.log(`  Dil:         ${chalk.cyan(state.profile.primaryLanguage)}`);
  console.log(`  Rol:         ${chalk.cyan(state.profile.role)}`);
  console.log(`  Layihələr:   ${chalk.cyan(state.projects.length)} əlavə edildi`);
  console.log(`  Skill bundle:${chalk.cyan(state.selectedBundles.skills)}`);
  console.log(`  Agent bundle:${chalk.cyan(state.selectedBundles.agents)}`);
  console.log(`  MCP-lər:     ${chalk.cyan(mcpsResult.selected.length)} aktiv`);
  console.log(`  Yaddaş:      ${chalk.cyan(state.memoryConfig.storage)}`);
  console.log(`  GitHub sync: ${chalk.cyan(state.memoryConfig.syncToGithub ? 'aktiv' : 'qeyri-aktiv')}`);
  console.log('');
  console.log(chalk.bold('Yaddaşın yeri:'));
  console.log(`  ${chalk.dim('~/.claude/')}                 ${chalk.dim('— Claude Code config')}`);
  console.log(`  ${chalk.dim('~/.claude/knowledge/')}      ${chalk.dim('— cross-project memory')}`);
  console.log(`  ${chalk.dim('~/.claude/skills/')}         ${chalk.dim('— skill-lər')}`);
  console.log(`  ${chalk.dim('~/.claude/agents/')}         ${chalk.dim('— agent-lər')}`);
  console.log('');
  console.log(chalk.bold('Növbəti addım:'));
  console.log(`  ${chalk.cyan('claude')}                       — interaktiv sessiya başlat`);
  console.log(`  ${chalk.cyan('claude /help')}                 — komandalar`);
  console.log('');

  return state as WizardState;
}
