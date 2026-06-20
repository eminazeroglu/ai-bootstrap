// Step 5 — Memory configuration

import { confirm, select } from '@inquirer/prompts';
import chalk from 'chalk';

export async function memoryStep(): Promise<{
  storage: 'markdown-only' | 'markdown-sqlite' | 'markdown-mem0';
  autoLearn: boolean;
  saveMistakes: boolean;
  saveVerifiedFacts: boolean;
}> {
  console.log('');
  console.log(chalk.bold.cyan('5/6  Yaddaş konfiqurasiyası'));
  console.log(chalk.dim('     Hər söhbətdə öyrəndiklərimi necə saxlayım?\n'));

  const storage = await select({
    message: 'Yaddaş arxitekturu?',
    choices: [
      {
        name: 'Sadə fayllar (markdown + git)',
        value: 'markdown-only',
        description: 'Default. Sürətli (<10K qeyd), human-readable, git-portable.',
      },
      {
        name: 'Fayllar + SQLite indeks',
        value: 'markdown-sqlite',
        description: '10K+ qeydlər üçün. Sürət axtarış üçün.',
      },
      {
        name: 'Fayllar + Mem0 vector layer',
        value: 'markdown-mem0',
        description: '100K+ qeydlər üçün. Semantic search.',
      },
    ],
    default: 'markdown-only',
  });

  console.log('');

  const autoLearn = await confirm({
    message: 'Səhvlərdən avtomatik öyrən? (learning-keeper aktiv olsun)',
    default: true,
  });

  const saveMistakes = await confirm({
    message: 'Səhv tarixçəsi saxla? (mistakes-log.md)',
    default: true,
  });

  const saveVerifiedFacts = await confirm({
    message: 'Araşdırma faktları saxla? (verified-facts.md)',
    default: true,
  });

  console.log('');
  console.log(chalk.green('✓ Yaddaş konfiqurasiyası tamamlandı'));

  return {
    storage: storage as 'markdown-only' | 'markdown-sqlite' | 'markdown-mem0',
    autoLearn,
    saveMistakes,
    saveVerifiedFacts,
  };
}
