// ai-bootstrap new — bootstrap a NEW project folder with project-scope skills + agents
//
// Flow:
//   1. Detect cwd as the project folder
//   2. Ask: what is this project? (intent → bundle suggestion)
//   3. Confirm bundle (or override)
//   4. Ask: 1-line project description (goes into CLAUDE.md)
//   5. Install skills to <cwd>/.claude/skills/ (PROJECT scope)
//   6. Install agents to <cwd>/.claude/agents/ (PROJECT scope)
//   7. Write <cwd>/CLAUDE.md with description + bundle reference
//   8. Write <cwd>/.claude/.gitignore (excludes installed templates if desired)
//
// Why project-scope: Claude Code loads project-scope skills ONLY when the user
// is inside that project. This lets you have different skill sets per project
// (developer for SaaS, creator for content, marketer for SMM) without polluting
// every session with irrelevant skills.

import chalk from 'chalk';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import { select, input, confirm } from '@inquirer/prompts';
import { installSkills } from '../applier/skills-installer.js';
import { installAgents } from '../applier/agents-installer.js';
import { resolvePlan, SKILL_BUNDLES, AGENT_BUNDLES } from '../applier/bundle-definitions.js';

interface ProjectIntent {
  id: string;
  label: string;
  bundle: keyof typeof SKILL_BUNDLES;
  description: string;
}

const INTENTS: ProjectIntent[] = [
  { id: 'saas', label: 'SaaS / Fullstack web app', bundle: 'developer', description: 'Backend + frontend + DB + DevOps' },
  { id: 'creator', label: 'AI Creator content (video, Reels, story, music)', bundle: 'creator', description: 'Video pipeline + character + storyboard + audio' },
  { id: 'marketing', label: 'Marketing / SMM campaign', bundle: 'marketer', description: 'SEO + social orchestrators + copywriting + ads' },
  { id: 'mobile', label: 'Mobile app', bundle: 'developer', description: 'Same developer bundle as web (architect/test/refactor/security)' },
  { id: 'data', label: 'Data analysis / dashboard', bundle: 'developer', description: 'Architect + analyst patterns; consider founder bundle for biz metrics' },
  { id: 'agency', label: 'Client agency work (multi-service)', bundle: 'full-stack', description: 'Everything — heaviest install (75+ agents)' },
  { id: 'founder', label: 'Startup / founder work', bundle: 'founder', description: 'C-Level advisors + product + marketing + coaching' },
  { id: 'opensource', label: 'Open source library / tool', bundle: 'developer', description: 'Engineering bundle + docs' },
  { id: 'foundation', label: 'Just the basics (minimal)', bundle: 'foundation', description: '10 essential skills, 2 agents' },
];

function projectClaudeMd(name: string, description: string, intent: ProjectIntent, customRules: string): string {
  return `# CLAUDE.md — ${name}

Bu fayl bu layihə üçün xüsusi instruksiyalardır. Hər söhbətdə avtomatik yüklənir.

## Layihə haqqında

${description}

## Növ + bundle

- **Növ**: ${intent.label}
- **Bundle**: \`${intent.bundle}\` (${intent.description})
- **Bootstrap**: ai-bootstrap v$(npm view @azerogluemin/ai-bootstrap version 2>/dev/null || echo 'unknown')

## Layihə skill + agent-ləri

Bu layihənin \`.claude/skills/\` və \`.claude/agents/\` qovluqlarında **project-scope** olaraq quraşdırılıb.
Yalnız bu layihədə işləyəndə Claude Code onları yükləyir.

Yenidən install:

\`\`\`bash
ai-bootstrap new   # bu qovluqda yenidən qaçırsan, mövcudları skip edir
\`\`\`

Layihə-spesifik skill yaratmaq üçün: \`.claude/skills/<my-skill>/SKILL.md\`

## Custom rules (bu layihəyə xas)

${customRules || '(buraya layihə-spesifik qaydalar yaz — məcburi yox)'}
`;
}

function projectGitignore(): string {
  return [
    '# ai-bootstrap project-scope installations',
    '# Uncomment to track installed skills/agents in git (default: tracked):',
    '#skills/',
    '#agents/',
    '',
    '# Always exclude:',
    '*.log',
    '.DS_Store',
    '',
  ].join('\n');
}

export async function runNewCommand(_args: string[]): Promise<void> {
  const cwd = process.cwd();
  const folderName = basename(cwd);

  console.log(chalk.bold(`\nai-bootstrap new — bootstrap project skills + agents\n`));
  console.log(chalk.dim(`  Project folder: ${cwd}`));
  console.log(chalk.dim(`  Detected name:  ${folderName}\n`));

  // Step 1: project name
  const projectName = await input({
    message: 'Layihə adı?',
    default: folderName,
  });

  // Step 2: intent (open-ended would also be valid; we offer choices for speed)
  const intentId = await select({
    message: 'Bu qovluqda nə etmək istəyirsən?',
    choices: INTENTS.map((i) => ({
      name: `${i.label} ${chalk.dim('(' + i.bundle + ')')}`,
      value: i.id,
      description: i.description,
    })),
  });

  const intent = INTENTS.find((i) => i.id === intentId)!;

  // Step 3: bundle override
  const useCustomBundle = await confirm({
    message: `Bundle: ${chalk.cyan(intent.bundle)} (${SKILL_BUNDLES[intent.bundle].length} skill, ${AGENT_BUNDLES[intent.bundle].length} agent). Dəyişdirək?`,
    default: false,
  });

  let bundleKey: keyof typeof SKILL_BUNDLES = intent.bundle;
  if (useCustomBundle) {
    const picked = await select({
      message: 'Bundle seç:',
      choices: Object.keys(SKILL_BUNDLES).map((b) => ({
        name: `${b} ${chalk.dim(`(${SKILL_BUNDLES[b].length} skill, ${AGENT_BUNDLES[b].length} agent)`)}`,
        value: b,
      })),
      default: intent.bundle,
    });
    bundleKey = picked as keyof typeof SKILL_BUNDLES;
  }

  // Step 4: description
  const description = await input({
    message: 'Layihə təsviri (1-2 cümlə) — CLAUDE.md-yə yazılacaq:',
    default: '',
  });

  // Step 5: custom rules (optional)
  const wantsRules = await confirm({
    message: 'Layihə-spesifik qayda(lar) əlavə edək? (sonra əl ilə də əlavə oluna bilər)',
    default: false,
  });
  let customRules = '';
  if (wantsRules) {
    customRules = await input({
      message: 'Qaydalar (çoxsətirli — Enter ilə bitir):',
      default: '',
    });
  }

  // Step 6: install
  const projectClaudeDir = join(cwd, '.claude');
  const projectSkillsDir = join(projectClaudeDir, 'skills');
  const projectAgentsDir = join(projectClaudeDir, 'agents');

  if (!existsSync(projectClaudeDir)) {
    mkdirSync(projectClaudeDir, { recursive: true });
  }

  console.log('');
  console.log(chalk.bold(`Quraşdırılır → ${chalk.cyan(projectClaudeDir)}\n`));

  const plan = resolvePlan(bundleKey, bundleKey);

  console.log(chalk.dim(`  Skills (${plan.skills.length})...`));
  const skillResult = installSkills(plan.skills, projectSkillsDir);
  console.log(
    `  ${chalk.green('✓')} ${skillResult.installed.length} installed` +
      (skillResult.skipped.length > 0 ? `, ${chalk.dim(skillResult.skipped.length + ' skipped (already present)')}` : '') +
      (skillResult.errors.length > 0 ? `, ${chalk.red(skillResult.errors.length + ' errors')}` : ''),
  );

  console.log(chalk.dim(`  Agents (${plan.agents.length})...`));
  const agentResult = installAgents(plan.agents, projectAgentsDir);
  console.log(
    `  ${chalk.green('✓')} ${agentResult.installed.length} installed` +
      (agentResult.skipped.length > 0 ? `, ${chalk.dim(agentResult.skipped.length + ' skipped (already present)')}` : '') +
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
      writeFileSync(claudeMdPath, projectClaudeMd(projectName, description || '(təsvir verilməyib)', intent, customRules), 'utf-8');
      console.log(`  ${chalk.green('✓')} CLAUDE.md yenilədi`);
    } else {
      console.log(`  ${chalk.dim('−')} CLAUDE.md saxlandı (üstünə yazılmadı)`);
    }
  } else {
    writeFileSync(claudeMdPath, projectClaudeMd(projectName, description || '(təsvir verilməyib)', intent, customRules), 'utf-8');
    console.log(`  ${chalk.green('✓')} CLAUDE.md yazıldı`);
  }

  // Write .claude/.gitignore if not present
  const gitignorePath = join(projectClaudeDir, '.gitignore');
  if (!existsSync(gitignorePath)) {
    writeFileSync(gitignorePath, projectGitignore(), 'utf-8');
  }

  // Write project state for `ai-bootstrap update` inside the project
  const projectStatePath = join(projectClaudeDir, 'ai-bootstrap-project.json');
  writeFileSync(
    projectStatePath,
    JSON.stringify(
      {
        version: '1.0',
        name: projectName,
        intent: intent.id,
        bundle: bundleKey,
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
  console.log(`  ${chalk.cyan('claude')}                        — sessiyanı başlat`);
  console.log(`  ${chalk.cyan('cat CLAUDE.md')}                  — layihə qaydalarını yoxla`);
  console.log(`  ${chalk.cyan('ls .claude/skills | head')}        — quraşdırılan skill-ləri gör`);
  console.log('');
}
