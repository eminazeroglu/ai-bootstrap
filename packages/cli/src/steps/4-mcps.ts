// Step 4 — MCP server selection

import { checkbox, select } from '@inquirer/prompts';
import chalk from 'chalk';

const ESSENTIAL_MCPS = [
  { name: 'Filesystem (file əməliyyatları)', value: 'filesystem', checked: true },
  { name: 'GitHub (repo, PR, issue)', value: 'github', checked: true },
  { name: 'Brave Search (web axtarış)', value: 'brave-search', checked: true },
  { name: 'Context7 (docs/library lookup)', value: 'context7', checked: true },
  { name: 'Memory (cross-session yaddaş)', value: 'memory', checked: true },
];

const OPTIONAL_MCPS = [
  // Communication
  { name: 'Slack', value: 'slack' },
  { name: 'Telegram', value: 'telegram' },
  { name: 'Discord', value: 'discord' },
  // Databases
  { name: 'Postgres', value: 'postgres' },
  { name: 'Supabase', value: 'supabase' },
  { name: 'MongoDB', value: 'mongodb' },
  // Cloud
  { name: 'Vercel', value: 'vercel' },
  { name: 'Cloudflare', value: 'cloudflare' },
  // Payments
  { name: 'Stripe', value: 'stripe' },
  // Social Media
  { name: 'Meta (Instagram + Facebook)', value: 'meta' },
  { name: 'YouTube Data', value: 'youtube' },
  { name: 'LinkedIn', value: 'linkedin' },
  // AI Providers
  { name: 'OpenAI', value: 'openai' },
  { name: 'ElevenLabs', value: 'elevenlabs' },
  { name: 'Replicate', value: 'replicate' },
  // Productivity
  { name: 'Notion', value: 'notion' },
  { name: 'Linear', value: 'linear' },
  // Browser
  { name: 'Playwright (browser automation)', value: 'playwright' },
  { name: 'Firecrawl (web scraping)', value: 'firecrawl' },
  // Analytics
  { name: 'Google Analytics 4', value: 'ga4' },
  // Observability
  { name: 'Sentry', value: 'sentry' },
];

export async function mcpsStep(): Promise<{
  selected: string[];
}> {
  console.log('');
  console.log(chalk.bold.cyan('4/6  MCP server seçimi'));
  console.log(chalk.dim('     ≤10 MCP aktiv saxla (Totalum 2026: çoxu agent-i yavaşladır).\n'));

  const essential = await checkbox({
    message: 'Day-1 Essential (tövsiyə hamısı):',
    choices: ESSENTIAL_MCPS,
  });

  console.log('');

  const optional = await checkbox({
    message: 'Opsional MCP-lər (sənin işinə uyğun olanları seç):',
    choices: OPTIONAL_MCPS,
  });

  const selected = [...essential, ...optional];

  if (selected.length > 10) {
    console.log('');
    console.log(chalk.yellow(`⚠️  ${selected.length} MCP seçdin. Tövsiyə: ≤10.`));
    console.log(chalk.dim('   Çox MCP agent-i yavaşladır (Totalum 2026 araşdırması).'));
    const proceed = await select({
      message: 'Davam edək?',
      choices: [
        { name: 'Bəli, davam et', value: 'yes' },
        { name: 'Yox, geri qayıt + azalt', value: 'no' },
      ],
    });
    if (proceed === 'no') {
      // Recursive call to redo selection
      return mcpsStep();
    }
  }

  console.log('');
  console.log(chalk.green(`✓ ${selected.length} MCP seçildi`));
  console.log(chalk.dim('   Credential-lər wizard sonu fərdi soruşulacaq.'));

  return { selected };
}
