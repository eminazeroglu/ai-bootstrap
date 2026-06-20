// ai-bootstrap CLI — main entry

import chalk from 'chalk';
import { runWizard } from './wizard.js';
import { applyState } from './applier/index.js';

async function main(): Promise<void> {
  try {
    // Step 1: Run interactive wizard, collect state
    const state = await runWizard();

    // Step 2: Apply state to disk
    const result = await applyState(state);

    // Step 3: Final report
    console.log('');
    console.log(chalk.bold.green('🎉 ai-bootstrap setup tamamlandı!'));
    console.log('');
    console.log(chalk.bold('Yazılan fayllar:'));
    for (const f of result.filesWritten) {
      console.log(`  ${chalk.dim('✓')} ${f}`);
    }
    console.log('');
    console.log(chalk.dim('Sənaye standartına uyğun setup. Növbəti:'));
    console.log(`  ${chalk.cyan('claude')}                — sessiyanı başlat`);
    console.log(`  ${chalk.cyan('cat ~/.claude/CLAUDE.md | head -30')}  — qaydaları yoxla`);
    console.log('');
  } catch (err) {
    if (err instanceof Error) {
      console.error(chalk.red(`\n✗ Setup failed: ${err.message}`));
    } else {
      console.error(chalk.red('\n✗ Setup failed (unknown error)'));
    }
    process.exit(1);
  }
}

// Run if invoked directly
if (import.meta.url === `file://${process.argv[1]}`) {
  void main();
}

export { main };
