// ai-bootstrap backup — push ~/.claude/ to a private git repo
//
// Subcommands:
//   init  — initialize ~/.claude/.git, set remote, first push
//   sync  — commit + push current state
//   pull  — pull from remote (for restoring on a new machine)
//   status — show backup config + last sync time
//
// Auth: uses the system git config (gh auth login, SSH keys, or credential helper).
// We don't store tokens — the user's git already knows how to auth to their remote.

import chalk from 'chalk';
import { execa } from 'execa';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { input, confirm } from '@inquirer/prompts';
import { CLAUDE_DIR, ensureDir } from '../utils/paths.js';

const BACKUP_CONFIG = join(CLAUDE_DIR, 'backup.json');
const GITIGNORE_PATH = join(CLAUDE_DIR, '.gitignore');

interface BackupConfig {
  version: '1.0';
  remoteUrl: string;
  branch: string;
  privateRepo: boolean;
  lastSync?: string;
  lastSyncCommit?: string;
}

function loadBackupConfig(): BackupConfig | null {
  if (!existsSync(BACKUP_CONFIG)) return null;
  try {
    return JSON.parse(readFileSync(BACKUP_CONFIG, 'utf-8')) as BackupConfig;
  } catch {
    return null;
  }
}

function saveBackupConfig(cfg: BackupConfig): void {
  ensureDir(CLAUDE_DIR);
  writeFileSync(BACKUP_CONFIG, JSON.stringify(cfg, null, 2), 'utf-8');
}

async function git(args: string[], cwd: string = CLAUDE_DIR): Promise<{ stdout: string; stderr: string }> {
  const res = await execa('git', args, { cwd, reject: false });
  if (res.exitCode !== 0) {
    throw new Error(`git ${args.join(' ')} failed (exit ${res.exitCode}):\n${res.stderr}`);
  }
  return { stdout: res.stdout, stderr: res.stderr };
}

async function isGitRepo(): Promise<boolean> {
  if (!existsSync(join(CLAUDE_DIR, '.git'))) return false;
  try {
    await git(['rev-parse', '--is-inside-work-tree']);
    return true;
  } catch {
    return false;
  }
}

function ensureGitignore(): void {
  // Never commit MCP credentials or runtime caches
  const lines = [
    '# ai-bootstrap backup .gitignore',
    '# Never commit:',
    'mcp-tracking.json',
    'ai-bootstrap-state.json',
    'backup.json',
    '.DS_Store',
    'node_modules/',
    '*.log',
    '',
  ];
  if (!existsSync(GITIGNORE_PATH)) {
    writeFileSync(GITIGNORE_PATH, lines.join('\n'), 'utf-8');
    return;
  }
  // Append missing entries
  const existing = readFileSync(GITIGNORE_PATH, 'utf-8');
  const missing = lines.filter((l) => l && !existing.includes(l));
  if (missing.length > 0) {
    writeFileSync(GITIGNORE_PATH, existing.trimEnd() + '\n' + missing.join('\n') + '\n', 'utf-8');
  }
}

function printBackupHelp(): void {
  console.log(`
${chalk.bold('ai-bootstrap backup')} — sync ~/.claude/ to a private git repo

${chalk.bold('Subcommands:')}
  ${chalk.cyan('init')}    Initialize git repo + set remote + first push
  ${chalk.cyan('sync')}    Commit + push current state (run after changes)
  ${chalk.cyan('pull')}    Pull from remote (use on a new machine to restore)
  ${chalk.cyan('status')}  Show backup config + last sync time

${chalk.bold('Auth:')}
  Backup uses your system git auth — either ${chalk.cyan('gh auth login')},
  SSH keys, or git's credential helper. ai-bootstrap does NOT store tokens.

${chalk.bold('Privacy:')}
  Always use a PRIVATE repo. The .gitignore excludes MCP credentials
  (mcp-tracking.json) but ${chalk.yellow('~/.ai-bootstrap.env stays outside ~/.claude/')}
  and is never tracked by this backup.
`);
}

async function initBackup(): Promise<void> {
  console.log(chalk.bold('\nai-bootstrap backup init\n'));

  ensureDir(CLAUDE_DIR);

  if (await isGitRepo()) {
    console.log(chalk.yellow('⚠ ~/.claude/ artıq git repo-dur. Yenidən init etmək üçün əvvəlcə .git silin.'));
    const existing = loadBackupConfig();
    if (existing) {
      console.log(chalk.dim(`   Cari remote: ${existing.remoteUrl}`));
    }
    return;
  }

  const remoteUrl = await input({
    message: 'GitHub repo URL? (SSH: git@github.com:user/claude-config.git, HTTPS: https://github.com/user/claude-config.git)',
    validate: (v) =>
      /^(git@github\.com:|https?:\/\/github\.com\/)[\w.-]+\/[\w.-]+(\.git)?$/.test(v.trim()) ||
      'GitHub SSH yaxud HTTPS URL olmalıdır',
  });

  const isPrivate = await confirm({
    message: 'Repo private-dir? (private tövsiyə olunur — ~/.claude/-da şəxsi data var)',
    default: true,
  });
  if (!isPrivate) {
    console.log(chalk.yellow('⚠ Public repo: ~/.claude/ məlumatın görünür olacaq. Davam edirsən, sənin qərarındır.'));
    const proceedPublic = await confirm({ message: 'Yenə də davam edək?', default: false });
    if (!proceedPublic) {
      console.log(chalk.dim('   Backup dayandırıldı. Sonra yenidən: ai-bootstrap backup init'));
      return;
    }
  }

  const branch = 'main';

  console.log(chalk.dim('\n  Git init...'));
  await git(['init', '--initial-branch', branch]);

  ensureGitignore();

  console.log(chalk.dim('  Adding files...'));
  await git(['add', '.']);

  console.log(chalk.dim('  Initial commit...'));
  try {
    await git(['commit', '-m', 'ai-bootstrap: initial backup']);
  } catch (err) {
    console.log(chalk.yellow(`  ⚠ ${err instanceof Error ? err.message : err}`));
    console.log(chalk.dim('  (commit may have failed if no files staged; continuing)'));
  }

  console.log(chalk.dim('  Adding remote...'));
  await git(['remote', 'add', 'origin', remoteUrl.trim()]);

  console.log(chalk.dim('  Pushing to remote...'));
  try {
    await git(['push', '-u', 'origin', branch]);
  } catch (err) {
    console.error(chalk.red(`\n✗ Push failed: ${err instanceof Error ? err.message : err}`));
    console.log(chalk.dim('\nƏlavə düzəlişlər:'));
    console.log(chalk.dim('  - gh auth login (GitHub CLI)'));
    console.log(chalk.dim('  - SSH key add: github.com/settings/keys'));
    console.log(chalk.dim('  - PAT: git config --global credential.helper store'));
    return;
  }

  const { stdout: head } = await git(['rev-parse', 'HEAD']);
  saveBackupConfig({
    version: '1.0',
    remoteUrl: remoteUrl.trim(),
    branch,
    privateRepo: true,
    lastSync: new Date().toISOString(),
    lastSyncCommit: head.trim(),
  });

  console.log(chalk.green('\n✓ Backup initialized + first push complete'));
  console.log(chalk.dim(`  Remote: ${remoteUrl}`));
  console.log(chalk.dim(`  Branch: ${branch}`));
  console.log(chalk.dim(`  Next time: ${chalk.cyan('ai-bootstrap backup sync')}`));
}

async function syncBackup(): Promise<void> {
  console.log(chalk.bold('\nai-bootstrap backup sync\n'));

  const cfg = loadBackupConfig();
  if (!cfg) {
    console.error(chalk.red('✗ Backup configured deyil. Run: ai-bootstrap backup init'));
    process.exit(1);
  }

  if (!(await isGitRepo())) {
    console.error(chalk.red('✗ ~/.claude/ git repo deyil. Run: ai-bootstrap backup init'));
    process.exit(1);
  }

  ensureGitignore();

  console.log(chalk.dim('  Staging changes...'));
  await git(['add', '.']);

  const { stdout: status } = await git(['status', '--porcelain']);
  if (!status.trim()) {
    console.log(chalk.dim('  ⚠ Heç bir dəyişiklik yoxdur. Skipping commit.'));
    return;
  }

  const lines = status.trim().split('\n');
  const msg = `ai-bootstrap sync: ${lines.length} file${lines.length === 1 ? '' : 's'}`;

  console.log(chalk.dim(`  Committing (${lines.length} files)...`));
  await git(['commit', '-m', msg]);

  console.log(chalk.dim('  Pushing...'));
  try {
    await git(['push', 'origin', cfg.branch]);
  } catch (err) {
    console.error(chalk.red(`\n✗ Push failed: ${err instanceof Error ? err.message : err}`));
    process.exit(1);
  }

  const { stdout: head } = await git(['rev-parse', 'HEAD']);
  saveBackupConfig({
    ...cfg,
    lastSync: new Date().toISOString(),
    lastSyncCommit: head.trim(),
  });

  console.log(chalk.green(`\n✓ Synced: ${lines.length} files`));
  console.log(chalk.dim(`  Commit: ${head.trim().slice(0, 7)}`));
}

async function pullBackup(): Promise<void> {
  console.log(chalk.bold('\nai-bootstrap backup pull\n'));

  if (await isGitRepo()) {
    const cfg = loadBackupConfig();
    if (!cfg) {
      console.error(chalk.red('✗ Git repo var amma backup.json yoxdur — manual git pull edin'));
      process.exit(1);
    }
    console.log(chalk.dim(`  Pulling from ${cfg.remoteUrl}...`));
    await git(['pull', 'origin', cfg.branch]);
    console.log(chalk.green('✓ Pulled latest from remote'));
    return;
  }

  const remoteUrl = await input({
    message: 'GitHub repo URL to restore from?',
    validate: (v) =>
      /^(git@github\.com:|https?:\/\/github\.com\/)[\w.-]+\/[\w.-]+(\.git)?$/.test(v.trim()) ||
      'GitHub SSH yaxud HTTPS URL olmalıdır',
  });

  ensureDir(CLAUDE_DIR);

  // Clone into a temp dir, then move .git into CLAUDE_DIR (preserves any existing files)
  console.log(chalk.dim('  Cloning + merging into ~/.claude/...'));
  const tmpDir = `/tmp/ab-restore-${Date.now()}`;
  mkdirSync(tmpDir, { recursive: true });
  await execa('git', ['clone', remoteUrl.trim(), tmpDir], { reject: true });
  await execa('cp', ['-rn', `${tmpDir}/.git`, CLAUDE_DIR], { reject: true });
  await execa('cp', ['-rn', `${tmpDir}/.`, CLAUDE_DIR], { reject: true });
  await execa('rm', ['-rf', tmpDir], { reject: false });

  saveBackupConfig({
    version: '1.0',
    remoteUrl: remoteUrl.trim(),
    branch: 'main',
    privateRepo: true,
    lastSync: new Date().toISOString(),
  });

  console.log(chalk.green('\n✓ Restored ~/.claude/ from backup'));
  console.log(chalk.dim('  Run: ai-bootstrap doctor — to verify'));
}

function statusBackup(): void {
  const cfg = loadBackupConfig();
  if (!cfg) {
    console.log(chalk.dim('\nBackup configured deyil. Run: ai-bootstrap backup init\n'));
    return;
  }
  console.log(chalk.bold('\nai-bootstrap backup status\n'));
  console.log(`  Remote:        ${chalk.cyan(cfg.remoteUrl)}`);
  console.log(`  Branch:        ${cfg.branch}`);
  console.log(`  Private:       ${cfg.privateRepo ? chalk.green('yes') : chalk.red('NO (risky)')}`);
  console.log(`  Last sync:     ${cfg.lastSync ?? chalk.dim('never')}`);
  console.log(`  Last commit:   ${cfg.lastSyncCommit?.slice(0, 7) ?? chalk.dim('—')}`);
  console.log('');
}

export async function runBackupCommand(args: string[]): Promise<void> {
  const sub = args[0];

  if (!sub || sub === 'help' || sub === '--help' || sub === '-h') {
    printBackupHelp();
    return;
  }

  if (sub === 'init') return initBackup();
  if (sub === 'sync') return syncBackup();
  if (sub === 'pull') return pullBackup();
  if (sub === 'status') {
    statusBackup();
    return;
  }

  console.error(chalk.red(`Unknown backup subcommand: ${sub}`));
  printBackupHelp();
  process.exit(1);
}
