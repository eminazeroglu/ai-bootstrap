// Step 3 — Skill + Agent bundle selection

import { select } from '@inquirer/prompts';
import chalk from 'chalk';

const SKILL_BUNDLES = [
  {
    name: 'Foundation only — 12 skill (sadə start)',
    value: 'foundation',
    description: 'Yalnız əsas skill-lər: code-review, simplify, verify, deep-research, və s.',
  },
  {
    name: 'Developer — ~28 skill (engineering focus)',
    value: 'developer',
    description: 'Foundation + advanced engineering + DevOps + testing',
  },
  {
    name: 'Marketer — ~32 skill (marketing focus)',
    value: 'marketer',
    description: 'Foundation + SEO + content + social media + analytics',
  },
  {
    name: 'Creator (AI) — ~30 skill (content creation)',
    value: 'creator',
    description: 'Foundation + creator suite (image/video/sound) + social',
  },
  {
    name: 'Founder — ~35 skill (solo entrepreneur)',
    value: 'founder',
    description: 'Foundation + product + marketing + coaching + business',
  },
  {
    name: 'Full Stack — ~85 skill (BÜTÜN)',
    value: 'full-stack',
    description: 'Hər tier-dən hər şey — maksimal yığım',
  },
] as const;

const AGENT_BUNDLES = [
  {
    name: 'Foundation only — 5 agent (sadə)',
    value: 'foundation',
    description: 'Explore, Plan, code-reviewer, researcher, general-purpose',
  },
  {
    name: 'Developer — 23 agent',
    value: 'developer',
    description: 'Foundation + engineering core + role specialists',
  },
  {
    name: 'Marketer — 31 agent (full SEO + marketing)',
    value: 'marketer',
    description: '18 SEO sub-agent + marketing + per-platform',
  },
  {
    name: 'Creator — 24 agent',
    value: 'creator',
    description: 'Content orchestrators + social per-platform',
  },
  {
    name: 'Founder — 35 agent (full business)',
    value: 'founder',
    description: 'Foundation + product + C-Level advisory + operations',
  },
  {
    name: 'Full Stack — ~75 agent (BÜTÜN)',
    value: 'full-stack',
    description: 'Hər tier — maksimal yığım',
  },
] as const;

export async function bundlesStep(): Promise<{
  skills: string;
  agents: string;
}> {
  console.log('');
  console.log(chalk.bold.cyan('3/6  Skill və agent bundle seçimi'));
  console.log(chalk.dim('     Sənin işinə görə hansı yığım uyğundur?\n'));

  const skills = await select({
    message: 'Skill bundle?',
    choices: SKILL_BUNDLES.map((b) => ({
      name: b.name,
      value: b.value,
      description: b.description,
    })),
    default: 'founder',
  });

  console.log('');

  const agents = await select({
    message: 'Agent bundle?',
    choices: AGENT_BUNDLES.map((b) => ({
      name: b.name,
      value: b.value,
      description: b.description,
    })),
    default: 'founder',
  });

  console.log('');
  console.log(chalk.green(`✓ Bundle-lər seçildi: skills=${skills}, agents=${agents}`));

  return { skills, agents };
}
