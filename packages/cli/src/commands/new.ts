// ai-bootstrap new — bootstrap a project folder with project-scope skills + agents.
//
// v0.5.0 changes (per user feedback):
//   - 3 questions only (was 5)
//   - MULTI-SELECT bundles (was single-select + override)
//   - No custom rules question (placeholder in CLAUDE.md instead)
//
// Flow:
//   1) Project name (default: folder basename)
//   2) Bundles (multi-select checkbox)
//   3) Description (1-2 sentences for CLAUDE.md)
//
// Installation uses Pool+Symlink: skills/agents are symlinked from
// ~/.claude/skills-pool/ — no per-project duplication on disk.

import chalk from 'chalk';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import { input, confirm, checkbox } from '@inquirer/prompts';
import { installSkills } from '../applier/skills-installer.js';
import { installAgents } from '../applier/agents-installer.js';
import { resolvePlan, SKILL_BUNDLES, AGENT_BUNDLES } from '../applier/bundle-definitions.js';

const BUNDLES_INFO: { id: keyof typeof SKILL_BUNDLES; label: string; description: string }[] = [
  { id: 'foundation', label: 'Foundation', description: '10 universal skill (artıq qlobalda var)' },
  { id: 'developer', label: 'Developer', description: 'SaaS, fullstack, mobile, data (21 skill, 18 agent)' },
  { id: 'creator', label: 'Creator', description: 'Video, Reel, sosial, brand (26 skill, 13 agent)' },
  { id: 'marketer', label: 'Marketer', description: 'SEO, SMM, copy, ads (24 skill, 29 agent)' },
  { id: 'founder', label: 'Founder', description: 'C-Level + product + marketing + coaching (35, 38)' },
  { id: 'full-stack', label: 'Full Stack', description: 'HƏR ŞEY — 85 skill, 78 agent' },
];

function projectClaudeMd(name: string, description: string, bundles: string[]): string {
  return `# CLAUDE.md — ${name}

Bu fayl bu layihə üçün xüsusi instruksiyalardır. Hər söhbətdə avtomatik yüklənir.

## Layihə haqqında

${description || '(təsvir verilməyib — buraya yaz)'}

## Bundle(lər)

${bundles.map((b) => '- `' + b + '`').join('\n')}

Skill + agent siyahısı: \`.claude/skills/\` və \`.claude/agents/\` qovluqlarında (symlinks).
Pool: \`~/.claude/skills-pool/\` — bütün skill-lər bir dəfə saxlanır, hər layihə link verir.

Əlavə skill/bundle əlavə etmək:
\`\`\`
ai-bootstrap add showrunner       # tək skill
ai-bootstrap add --bundle marketer # bütün bundle
ai-bootstrap add                  # interaktiv siyahı
\`\`\`

## Custom rules (bu layihəyə xas)

<!-- Buraya layihə-spesifik qaydalar yaz. Misal:
1. AZ-də danış, RU sözləri qarışdırma
2. Bu layihədə Tailwind v4 istifadə olunur
3. Müştəri "Restoran X" şirkətidir, terminlərinə hörmət et
-->
`;
}

function projectGitignore(): string {
  return [
    '# ai-bootstrap project-scope installations',
    '# Skills + agents qovluqlarını git-ə salmaq istəyirsənsə commentdə qoy:',
    '# skills/',
    '# agents/',
    '',
    '# Həmişə xaric:',
    '*.log',
    '.DS_Store',
    '',
  ].join('\n');
}

export async function runNewCommand(_args: string[]): Promise<void> {
  const cwd = process.cwd();
  const folderName = basename(cwd);

  console.log(chalk.bold(`\nai-bootstrap new — layihə skill + agent quraşdırması\n`));
  console.log(chalk.dim(`  Qovluq:  ${cwd}\n`));

  // Step 1: project name
  const projectName = await input({
    message: '1/3 — Layihə adı?',
    default: folderName,
  });

  // Step 2: multi-select bundles
  const bundleIds = await checkbox({
    message: '2/3 — Hansı bundle(ləri) istəyirsən? (Space = seç, Enter = bitir)',
    choices: BUNDLES_INFO.map((b) => ({
      name: `${b.label} — ${chalk.dim(b.description)}`,
      value: b.id,
      disabled: b.id === 'foundation' ? '(artıq qlobalda)' : false,
    })),
    required: true,
  });

  // Step 3: description
  const description = await input({
    message: '3/3 — Qısa təsvir (1-2 cümlə) — CLAUDE.md-yə yazılacaq:',
    default: '',
  });

  // Install
  const projectClaudeDir = join(cwd, '.claude');
  const projectSkillsDir = join(projectClaudeDir, 'skills');
  const projectAgentsDir = join(projectClaudeDir, 'agents');

  if (!existsSync(projectClaudeDir)) {
    mkdirSync(projectClaudeDir, { recursive: true });
  }

  console.log('');
  console.log(chalk.bold(`Quraşdırılır → ${chalk.cyan(projectClaudeDir)}`));
  console.log(chalk.dim(`  Pool: ~/.claude/skills-pool/ + ~/.claude/agents-pool/ (symlinks)\n`));

  // Aggregate skills + agents from all selected bundles (dedupe)
  const allSkills = new Set<string>();
  const allAgents = new Set<string>();
  for (const id of bundleIds) {
    const plan = resolvePlan(id, id);
    for (const s of plan.skills) allSkills.add(s);
    for (const a of plan.agents) allAgents.add(a);
  }

  console.log(chalk.dim(`  Skills (${allSkills.size})...`));
  const skillResult = installSkills([...allSkills], projectSkillsDir);
  console.log(
    `  ${chalk.green('✓')} ${skillResult.installed.length} installed` +
      (skillResult.skipped.length > 0 ? `, ${chalk.dim(skillResult.skipped.length + ' skipped')}` : '') +
      (skillResult.errors.length > 0 ? `, ${chalk.red(skillResult.errors.length + ' errors')}` : '') +
      (skillResult.linkMode ? chalk.dim(`  [${skillResult.linkMode}]`) : ''),
  );

  console.log(chalk.dim(`  Agents (${allAgents.size})...`));
  const agentResult = installAgents([...allAgents], projectAgentsDir);
  console.log(
    `  ${chalk.green('✓')} ${agentResult.installed.length} installed` +
      (agentResult.skipped.length > 0 ? `, ${chalk.dim(agentResult.skipped.length + ' skipped')}` : '') +
      (agentResult.errors.length > 0 ? `, ${chalk.red(agentResult.errors.length + ' errors')}` : ''),
  );

  // Write CLAUDE.md
  const claudeMdPath = join(cwd, 'CLAUDE.md');
  if (existsSync(claudeMdPath)) {
    const overwrite = await confirm({
      message: 'CLAUDE.md artıq var. Üstünə yazaq?',
      default: false,
    });
    if (overwrite) {
      writeFileSync(claudeMdPath, projectClaudeMd(projectName, description, bundleIds), 'utf-8');
      console.log(`  ${chalk.green('✓')} CLAUDE.md yenilədi`);
    } else {
      console.log(`  ${chalk.dim('−')} CLAUDE.md saxlandı (üstünə yazılmadı)`);
    }
  } else {
    writeFileSync(claudeMdPath, projectClaudeMd(projectName, description, bundleIds), 'utf-8');
    console.log(`  ${chalk.green('✓')} CLAUDE.md yazıldı`);
  }

  // Project gitignore (in .claude/)
  const gitignorePath = join(projectClaudeDir, '.gitignore');
  if (!existsSync(gitignorePath)) {
    writeFileSync(gitignorePath, projectGitignore(), 'utf-8');
  }

  // Project state
  const projectStatePath = join(projectClaudeDir, 'ai-bootstrap-project.json');
  writeFileSync(
    projectStatePath,
    JSON.stringify(
      {
        version: '1.0',
        name: projectName,
        bundles: bundleIds,
        description,
        createdAt: new Date().toISOString(),
      },
      null,
      2,
    ),
    'utf-8',
  );

  console.log('');
  console.log(chalk.bold.green('🎉 Layihə hazırdır.\n'));
  console.log(chalk.dim('Növbəti:'));
  console.log(`  ${chalk.cyan('claude')}                          — sessiyanı başlat`);
  console.log(`  ${chalk.cyan('cat CLAUDE.md')}                    — layihə qaydalarını yoxla`);
  console.log(`  ${chalk.cyan('ai-bootstrap list')}                — quraşdırılanlar`);
  console.log(`  ${chalk.cyan('ai-bootstrap add <skill>')}         — əlavə skill əlavə`);
  console.log('');
}
