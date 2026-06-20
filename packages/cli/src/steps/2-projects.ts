// Step 2 — Project folder scan + selection

import { input, checkbox, confirm } from '@inquirer/prompts';
import chalk from 'chalk';
import ora from 'ora';
import { parseFolderList, scanFolder } from '../utils/scanner.js';
import { askPermission } from '../utils/permissions.js';
import type { ProjectInfo } from '../types.js';

export async function projectsStep(): Promise<{
  paths: string[];
  selected: ProjectInfo[];
}> {
  console.log('');
  console.log(chalk.bold.cyan('2/6  Layihələrin haradadır?'));
  console.log(chalk.dim('     Vergüllə bir necə qovluq yaza bilərsən.\n'));

  // Ask for folder paths
  const folderInput = await input({
    message: 'Qovluq yolu (vergüllə ayır):',
    default: '~/MyJobs, ~/Projects, ~/Code',
    validate: (v) => v.length > 0 || 'Ən az 1 qovluq lazımdır',
  });

  const paths = parseFolderList(folderInput);

  if (paths.length === 0) {
    console.log(chalk.yellow('✗ Heç bir qovluq yolu verilmədi. Layihə əlavə edilmir.'));
    return { paths: [], selected: [] };
  }

  // Permission gate
  const allowed = await askPermission({
    action: 'Layihələri taramaq',
    description: `Bu qovluqları skan edirəm: ${paths.join(', ')}`,
    scope: 'oxuma (read-only)',
    reversible: true,
  });

  if (!allowed) {
    console.log(chalk.yellow('İcazə verilmədi — layihələr əlavə edilmir.'));
    return { paths, selected: [] };
  }

  // Scan
  const spinner = ora('Tarayıram...').start();
  const allProjects: ProjectInfo[] = [];

  for (const path of paths) {
    const projects = scanFolder(path);
    allProjects.push(...projects);
  }

  spinner.succeed(`${allProjects.length} layihə tapdım`);

  if (allProjects.length === 0) {
    console.log(chalk.yellow('Heç layihə tapılmadı.'));
    return { paths, selected: [] };
  }

  // Display detected projects
  console.log('');
  console.log(chalk.bold('Tapdıqlarım:'));
  for (const p of allProjects.slice(0, 10)) {
    const typeBadge = p.type === 'unknown' ? chalk.dim('?') : chalk.cyan(p.type);
    const claudeBadge = p.hasClaudeMd ? chalk.green('✓ CLAUDE.md') : '';
    console.log(`  ${chalk.bold(p.name)}  ${typeBadge}  ${claudeBadge}`);
  }
  if (allProjects.length > 10) {
    console.log(chalk.dim(`  ... və daha ${allProjects.length - 10} layihə`));
  }
  console.log('');

  // Let user select which to add to memory
  const selectAll = await confirm({
    message: 'Hamısını yaddaşa əlavə edək?',
    default: true,
  });

  let selected: ProjectInfo[] = [];

  if (selectAll) {
    selected = allProjects;
  } else {
    const selectedNames = await checkbox({
      message: 'Hansı layihələri əlavə edək?',
      choices: allProjects.map((p) => ({
        name: `${p.name} (${p.type})`,
        value: p.name,
        checked: p.hasClaudeMd, // pre-check projects that already have CLAUDE.md
      })),
    });
    selected = allProjects.filter((p) => selectedNames.includes(p.name));
  }

  console.log('');
  console.log(chalk.green(`✓ ${selected.length} layihə əlavə edildi`));

  return { paths, selected };
}
