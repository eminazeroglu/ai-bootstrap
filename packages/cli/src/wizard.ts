// ai-bootstrap wizard — single-step setup (v0.5.0 rewrite).
//
// Old v0.4.x: 6 steps with 15+ questions, lots of friction.
// v0.5.0 redesign (per user feedback):
//   - 1 step: profile (3 questions only — ad, dil, kim+nə)
//   - Bundle question REMOVED — auto-installs foundation user-scope
//   - Project scan REMOVED — `ai-bootstrap scan <path>` if needed later
//   - MCPs auto-installed (free, no-credential ones); `ai-bootstrap mcp add` for paid
//   - Memory always-on (no questions)
//   - GitHub backup deferred → `ai-bootstrap backup init` when ready
//
// Result: 30-second setup with no overwhelm.

import chalk from 'chalk';
import { input, select, confirm } from '@inquirer/prompts';
import type { WizardState } from './types.js';

const FREE_MCPS = ['filesystem', 'memory', 'git', 'fetch', 'time', 'arxiv', 'youtube-transcript', 'puppeteer', 'playwright'];

export async function runWizard(): Promise<WizardState> {
  console.log('');
  console.log(chalk.bold.cyan('🧠 ai-bootstrap'));
  console.log(chalk.dim('   Personal AI infrastructure for Claude Code'));
  console.log('');
  console.log(chalk.dim('   3 sual, 30 saniyə. Sonra hazırsan.'));
  console.log('');

  const proceed = await confirm({ message: 'Davam edək?', default: true });
  if (!proceed) {
    console.log(chalk.yellow('Ləğv edildi.'));
    process.exit(0);
  }

  console.log('');
  console.log(chalk.bold('1/3 — Adın?'));
  const name = await input({ message: 'Ad:', validate: (v) => v.trim().length > 0 || 'Boş ola bilməz' });

  console.log('');
  console.log(chalk.bold('2/3 — Əsas dilin?'));
  const primaryLanguage = await select({
    message: 'Dil:',
    choices: [
      { name: 'Azərbaycan', value: 'az' },
      { name: 'English', value: 'en' },
      { name: 'Русский', value: 'ru' },
      { name: 'Türkçe', value: 'tr' },
    ],
    default: 'az',
  });

  console.log('');
  console.log(chalk.bold('3/3 — Sən kimsən, nə edirsən?'));
  console.log(chalk.dim('     Misal: "Emin, AI creator + founder. SaaS qururam, IG-də komedi videolar paylaşıram."'));
  const bio = await input({
    message: 'Bio:',
    validate: (v) => v.trim().length >= 5 || 'Ən azı 5 hərf yaz',
  });

  const state: WizardState = {
    profile: {
      name: name.trim(),
      primaryLanguage,
      otherLanguages: [],
      role: bio.trim(),
      experience: 'expert',
      country: '',
      goals: { sixMonth: '', twelveMonth: '', twentyFourMonth: '' },
    },
    projectPaths: [],
    projects: [],
    selectedBundles: {
      // Always install foundation user-scope. Project bundles come from `ai-bootstrap new`.
      skills: 'foundation',
      agents: 'foundation',
      mcps: 'custom',
    },
    memoryConfig: {
      storage: 'markdown-only',
      autoLearn: true,
      syncToGithub: false,
    },
  };

  // Free MCPs auto-installed
  (state as { mcps?: string[] }).mcps = FREE_MCPS;

  console.log('');
  console.log(chalk.bold.green('✓ Profile yığıldı.'));
  console.log(chalk.dim('   Quraşdırılır...'));
  console.log('');

  return state;
}
