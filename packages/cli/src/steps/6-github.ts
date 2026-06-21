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
    message: 'GitHub repo URL? (boş burax — sonra `ai-bootstrap backup init` ilə əlavə edərsən)',
    validate: (v) => {
      const trimmed = v.trim();
      if (trimmed === '') return true;
      return (
        /^(git@github\.com:|https?:\/\/github\.com\/)[\w.-]+\/[\w.-]+(\.git)?$/.test(trimmed) ||
        'GitHub SSH (git@github.com:user/repo) yaxud HTTPS (https://github.com/user/repo) URL olmalıdır'
      );
    },
  });

  if (repoUrl.trim() === '') {
    console.log(chalk.dim('   URL sonradan veriləcək. Sonra: ai-bootstrap backup init'));
    return { enabled: true };
  }

  const privateRepo = await confirm({
    message: 'Private repo? (private tövsiyə olunur — ~/.claude/-da şəxsi data var)',
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
