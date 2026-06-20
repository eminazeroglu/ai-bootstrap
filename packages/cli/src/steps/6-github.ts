// Step 6 — Optional GitHub backup setup

import { confirm, input } from '@inquirer/prompts';
import chalk from 'chalk';

export async function githubStep(): Promise<{
  enabled: boolean;
  repoUrl?: string;
  privateRepo?: boolean;
}> {
  console.log('');
  console.log(chalk.bold.cyan('6/6  GitHub backup (opsional)'));
  console.log(chalk.dim('     ~/.claude/-i GitHub-da saxlayım — başqa kompüterə köçəndə bərpa.\n'));

  const enabled = await confirm({
    message: 'GitHub backup quraq?',
    default: false,
  });

  if (!enabled) {
    console.log(chalk.dim('   GitHub backup atlandı. Sonra `ai-bootstrap backup` ilə əlavə edə bilərsən.'));
    return { enabled: false };
  }

  const repoUrl = await input({
    message: 'GitHub repo URL? (məs. https://github.com/eminazeroglu/claude-config)',
    validate: (v) => /^https?:\/\/github\.com\//.test(v) || 'GitHub URL olmalıdır',
  });

  const privateRepo = await confirm({
    message: 'Private repo olmalıdır?',
    default: true,
  });

  console.log('');
  console.log(chalk.green('✓ GitHub backup konfiqurasiya edildi'));
  console.log(chalk.dim(`   Repo: ${repoUrl}`));
  console.log(chalk.dim(`   Private: ${privateRepo ? 'bəli' : 'xeyr'}`));

  return {
    enabled: true,
    repoUrl,
    privateRepo,
  };
}
