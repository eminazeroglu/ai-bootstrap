// Main applier — orchestrates all writers

import chalk from 'chalk';
import ora from 'ora';
import { writeUserProfile } from './profile-writer.js';
import { writeProjectManifest } from './projects-writer.js';
import { writeSettings } from './settings-writer.js';
import { writeMcpConfig } from './mcp-config.js';
import { installSkills } from './skills-installer.js';
import { installAgents } from './agents-installer.js';
import { resolvePlan } from './bundle-definitions.js';
import type { WizardState } from '../types.js';

export interface ApplyResult {
  filesWritten: string[];
  symlinksCreated: string[];
  errors: string[];
  warnings: string[];
  skipped: string[];
}

export async function applyState(state: WizardState): Promise<ApplyResult> {
  const result: ApplyResult = {
    filesWritten: [],
    symlinksCreated: [],
    errors: [],
    warnings: [],
    skipped: [],
  };

  console.log('');
  console.log(chalk.bold.cyan('💾 State-i diskə tətbiq edirəm...'));
  console.log('');

  // 1. User profile
  if (state.profile) {
    const spinner = ora('Profil yazılır...').start();
    try {
      const path = writeUserProfile(state.profile);
      result.filesWritten.push(path);
      spinner.succeed(`Profil: ${chalk.dim(path)}`);
    } catch (err) {
      spinner.fail('Profil yazılarkən xəta');
      result.errors.push(`profile: ${err}`);
    }
  }

  // 2. Project manifest
  if (state.projects.length > 0) {
    const spinner = ora(`${state.projects.length} layihə manifest yazılır...`).start();
    try {
      const paths = writeProjectManifest(state.projects);
      result.filesWritten.push(...paths);
      spinner.succeed(`Layihə manifest: ${chalk.dim(paths.length + ' fayl')}`);
    } catch (err) {
      spinner.fail('Layihə manifest yazılarkən xəta');
      result.errors.push(`projects: ${err}`);
    }
  }

  // 3. Settings.json
  {
    const spinner = ora('Settings.json yazılır...').start();
    try {
      const path = writeSettings(state);
      result.filesWritten.push(path);
      spinner.succeed(`Settings: ${chalk.dim(path)}`);
    } catch (err) {
      spinner.fail('Settings yazılarkən xəta');
      result.errors.push(`settings: ${err}`);
    }
  }

  // 4. MCP config
  const mcps = (state as any).mcps as string[] | undefined;
  if (mcps && mcps.length > 0) {
    const spinner = ora(`${mcps.length} MCP konfiqurasiyası yazılır...`).start();
    try {
      const mcpResult = writeMcpConfig(mcps);
      result.filesWritten.push(mcpResult.claudeJsonPath, mcpResult.trackingPath);
      spinner.succeed(
        `MCP config: ${chalk.green(mcpResult.installed.length)} yeni, ${chalk.dim(mcpResult.skipped.length + ' artıq var')}`,
      );
      if (mcpResult.missingFromCatalog.length > 0) {
        console.log(
          chalk.yellow(`   ⚠ Kataloqda yoxdur: ${mcpResult.missingFromCatalog.join(', ')}`),
        );
      }
      if (mcpResult.credentialsRequired.length > 0) {
        console.log(
          chalk.dim(
            `   ${mcpResult.credentialsRequired.length} MCP credential gözləyir. İçin: ${chalk.cyan('ai-bootstrap mcp credentials')}`,
          ),
        );
      }
    } catch (err) {
      spinner.fail('MCP config yazılarkən xəta');
      result.errors.push(`mcps: ${err}`);
    }
  }

  // 5. Install skills + agents
  const plan = resolvePlan(state.selectedBundles.skills, state.selectedBundles.agents);

  if (plan.skills.length > 0) {
    const spinner = ora(`${plan.skills.length} skill install edilir...`).start();
    try {
      const skillResult = installSkills(plan.skills);
      const summary = `${skillResult.installed.length} install, ${skillResult.skipped.length} skip, ${skillResult.errors.length} xəta`;
      if (skillResult.errors.length > 0) {
        spinner.warn(`Skills: ${summary}`);
      } else {
        spinner.succeed(`Skills: ${chalk.dim(summary)}`);
      }
      for (const s of skillResult.installed) {
        result.symlinksCreated.push(`skills/${s}`);
      }
      for (const sk of skillResult.skipped) {
        result.skipped.push(`skill ${sk.skill}: ${sk.reason}`);
      }
      for (const e of skillResult.errors) {
        result.errors.push(`skill ${e.skill}: ${e.error}`);
      }
    } catch (err) {
      spinner.fail('Skill install xətası');
      result.errors.push(`skills-install: ${err}`);
    }
  }

  if (plan.agents.length > 0) {
    const spinner = ora(`${plan.agents.length} agent install edilir...`).start();
    try {
      const agentResult = installAgents(plan.agents);
      const summary = `${agentResult.installed.length} install, ${agentResult.skipped.length} skip`;
      spinner.info(`Agents: ${chalk.dim(summary)} ${chalk.dim('(C-5-də yaradılır)')}`);
      for (const sk of agentResult.skipped) {
        result.skipped.push(`agent ${sk.agent}: ${sk.reason}`);
      }
    } catch (err) {
      result.errors.push(`agents-install: ${err}`);
    }
  }

  // 6. GitHub backup (deferred to C-5 — needs OAuth flow)
  if (state.memoryConfig.syncToGithub) {
    result.warnings.push(
      'GitHub backup: Mərhələ C-5-də implementasiya gəlir. Manual setup: git init ~/.claude && git remote add origin <url>',
    );
  }

  // Summary
  console.log('');
  if (result.errors.length === 0) {
    console.log(chalk.green(`✓ ${result.filesWritten.length} fayl yazıldı, ${result.symlinksCreated.length} symlink yaradıldı`));
  } else {
    console.log(
      chalk.yellow(
        `⚠️  ${result.filesWritten.length} fayl, ${result.symlinksCreated.length} symlink, ${result.errors.length} xəta`,
      ),
    );
    for (const err of result.errors) {
      console.log(chalk.red(`   ✗ ${err}`));
    }
  }

  if (result.warnings.length > 0) {
    console.log('');
    console.log(chalk.yellow('Xəbərdarlıqlar:'));
    for (const w of result.warnings) {
      console.log(chalk.yellow(`   ⚠ ${w}`));
    }
  }

  return result;
}
