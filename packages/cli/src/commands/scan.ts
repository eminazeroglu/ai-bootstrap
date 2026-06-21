// ai-bootstrap scan <path1> <path2> ...
// Scans paths for existing projects (CLAUDE.md / .claude/ markers)
// and writes a manifest to ~/.claude/knowledge/projects.md
//
// Replaces the removed "Step 2" of the v0.4.x wizard.

import chalk from 'chalk';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { scanFolder } from '../utils/scanner.js';
import { writeProjectManifest } from '../applier/projects-writer.js';

export async function runScanCommand(args: string[]): Promise<void> {
  if (args.length === 0 || args[0] === 'help' || args[0] === '--help' || args[0] === '-h') {
    console.log(`
${chalk.bold('ai-bootstrap scan')} — scan paths for existing projects

${chalk.bold('Usage:')}
  ${chalk.cyan('ai-bootstrap scan ~/Projects ~/MyJobs')}

Detects folders containing CLAUDE.md or .claude/ — writes
manifest to ~/.claude/knowledge/projects.md for Claude Code context.
`);
    return;
  }

  const paths = args.filter((a) => !a.startsWith('--')).map((p) => resolve(p));
  const valid = paths.filter((p) => existsSync(p));
  if (valid.length === 0) {
    console.error(chalk.red('✗ Heç bir yol tapılmadı.'));
    process.exit(1);
  }

  console.log(chalk.bold(`\nai-bootstrap scan — ${valid.length} yol\n`));
  for (const p of valid) console.log(chalk.dim(`  ${p}`));

  const projects = valid.flatMap((p) => scanFolder(p));
  console.log('');
  console.log(`${chalk.green('✓')} ${projects.length} layihə tapıldı`);

  if (projects.length > 0) {
    const written = writeProjectManifest(projects);
    console.log(chalk.dim(`  Manifest: ${written[0]}`));
  }
  console.log('');
}
