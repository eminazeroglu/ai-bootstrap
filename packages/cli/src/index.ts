// ai-bootstrap CLI — main entry

import chalk from 'chalk';
import { runWizard } from './wizard.js';

async function main(): Promise<void> {
  try {
    const state = await runWizard();
    // TODO (C-3): apply state to disk
    // - Write profile to ~/.claude/knowledge/user-profile.md
    // - Write project manifest to ~/.claude/knowledge/projects/
    // - Install selected skills/agents
    // - Configure MCPs (collect credentials)
    // - Initialize GitHub backup if enabled
    console.log(chalk.dim('\n(C-3+ implementation: apply state to disk)\n'));
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
