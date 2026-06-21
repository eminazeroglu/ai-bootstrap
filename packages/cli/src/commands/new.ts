// ai-bootstrap new — preset-based project bootstrap (v0.6.0)
//
// User picks a PRESET (SaaS / Social Page / AI Studio).
// Each preset:
//   - Installs its skills + agents (symlinked from pool)
//   - Suggests MCPs (user-scope; auto-add if not already configured)
//   - Scaffolds folder structure
//   - Writes CLAUDE.md with preset-specific rules
//
// Bundles no longer surface in user-facing CLI — presets replace them.

import chalk from 'chalk';
import { basename, join } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';
import { input, select, confirm } from '@inquirer/prompts';
import { installSkills } from '../applier/skills-installer.js';
import { installAgents } from '../applier/agents-installer.js';
import { writeMcpConfig } from '../applier/mcp-config.js';
import { listPresets, getPreset, type PresetId } from '../applier/preset-definitions.js';
import { scaffoldPreset } from '../applier/preset-scaffolder.js';
import { writeFileSync } from 'node:fs';

export async function runNewCommand(_args: string[]): Promise<void> {
  const cwd = process.cwd();
  const folderName = basename(cwd);

  console.log(chalk.bold(`\nai-bootstrap new — layihə bootstrap\n`));
  console.log(chalk.dim(`  Qovluq: ${cwd}\n`));

  // 1) Project name
  const projectName = await input({
    message: '1/3 — Layihə adı?',
    default: folderName,
  });

  // 2) Preset
  const presetId = (await select({
    message: '2/3 — Bu qovluqda nə qurmaq istəyirsən?',
    choices: listPresets().map((p) => ({
      name: `${chalk.cyan(p.label.padEnd(20))} ${chalk.dim(p.description)}`,
      value: p.id,
    })),
  })) as PresetId;

  const preset = getPreset(presetId);

  // 3) Description
  const description = await input({
    message: '3/3 — Qısa təsvir (1-2 cümlə) — CLAUDE.md-yə yazılacaq:',
    default: '',
  });

  // ════ Install ════
  const projectClaudeDir = join(cwd, '.claude');
  const projectSkillsDir = join(projectClaudeDir, 'skills');
  const projectAgentsDir = join(projectClaudeDir, 'agents');

  if (!existsSync(projectClaudeDir)) mkdirSync(projectClaudeDir, { recursive: true });

  console.log('');
  console.log(chalk.bold(`Quraşdırılır: ${chalk.cyan(preset.label)}`));
  console.log(chalk.dim(`  ${preset.skills.length} skill, ${preset.agents.length} agent, ${preset.mcps.length} MCP suggested\n`));

  // Install skills
  console.log(chalk.dim(`  Skills (${preset.skills.length})...`));
  const sr = installSkills(preset.skills, projectSkillsDir);
  console.log(
    `  ${chalk.green('✓')} ${sr.installed.length} installed` +
      (sr.skipped.length > 0 ? `, ${chalk.dim(sr.skipped.length + ' skipped')}` : '') +
      (sr.errors.length > 0 ? `, ${chalk.red(sr.errors.length + ' errors')}` : '') +
      (sr.linkMode ? chalk.dim(`  [${sr.linkMode}]`) : ''),
  );

  // Install agents
  console.log(chalk.dim(`  Agents (${preset.agents.length})...`));
  const ar = installAgents(preset.agents, projectAgentsDir);
  console.log(
    `  ${chalk.green('✓')} ${ar.installed.length} installed` +
      (ar.skipped.length > 0 ? `, ${chalk.dim(ar.skipped.length + ' skipped')}` : '') +
      (ar.errors.length > 0 ? `, ${chalk.red(ar.errors.length + ' errors')}` : ''),
  );

  // MCPs — ask if user wants to auto-add suggested
  console.log(chalk.dim(`  MCPs (${preset.mcps.length} təklif olunur)...`));
  const addMcps = await confirm({
    message: `  ${preset.mcps.length} MCP təklif olunur — avtomatik konfiq edək? (credentials sonra)`,
    default: true,
  });
  if (addMcps) {
    const mcpResult = writeMcpConfig(preset.mcps);
    console.log(
      `  ${chalk.green('✓')} ${mcpResult.installed.length} yeni MCP` +
        (mcpResult.skipped.length > 0 ? `, ${chalk.dim(mcpResult.skipped.length + ' artıq var')}` : '') +
        (mcpResult.missingFromCatalog.length > 0 ? chalk.yellow(`, ${mcpResult.missingFromCatalog.length} kataloqda yox`) : ''),
    );
    if (mcpResult.credentialsRequired.length > 0) {
      console.log(chalk.dim(`    Credential gözləyən: ${mcpResult.credentialsRequired.length} — ${chalk.cyan('ai-bootstrap mcp credentials')}`));
    }
  }

  // Scaffold folder structure + CLAUDE.md + README + .gitignore
  console.log('');
  console.log(chalk.dim('  Folder strukturu + CLAUDE.md yazılır...'));
  const scaffold = scaffoldPreset(presetId, { cwd, projectName, description });
  console.log(
    `  ${chalk.green('✓')} ${scaffold.foldersCreated.length} qovluq, ${scaffold.filesWritten.length} fayl yaradıldı` +
      (scaffold.filesSkipped.length > 0 ? chalk.dim(`, ${scaffold.filesSkipped.length} skip (mövcud)`) : ''),
  );

  // Save project state
  const projectStatePath = join(projectClaudeDir, 'ai-bootstrap-project.json');
  writeFileSync(
    projectStatePath,
    JSON.stringify(
      {
        version: '2.0',
        name: projectName,
        preset: presetId,
        description,
        createdAt: new Date().toISOString(),
      },
      null,
      2,
    ),
    'utf-8',
  );

  // Final summary
  console.log('');
  console.log(chalk.bold.green('🎉 Layihə hazırdır.\n'));
  console.log(chalk.dim('Növbəti:'));
  console.log(`  ${chalk.cyan('claude')}                            — sessiyanı başlat`);
  console.log(`  ${chalk.cyan('cat CLAUDE.md')}                      — preset qaydalarını yoxla`);
  console.log(`  ${chalk.cyan('ai-bootstrap list')}                  — quraşdırılanlar`);
  console.log(`  ${chalk.cyan('ai-bootstrap add <skill>')}           — əlavə skill əlavə et`);
  console.log(`  ${chalk.cyan('ai-bootstrap mcp credentials')}       — MCP token əlavə et`);
  console.log('');
}
