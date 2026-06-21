// ai-bootstrap CLI — main entry
//
// Commands:
//   ai-bootstrap                 — interactive 6-step wizard (default)
//   ai-bootstrap mcp list        — list available MCPs in catalog
//   ai-bootstrap mcp installed   — list MCPs installed via ai-bootstrap
//   ai-bootstrap mcp credentials — interactively fill credentials into ~/.ai-bootstrap.env

import chalk from 'chalk';
import { runWizard } from './wizard.js';
import { applyState } from './applier/index.js';
import { runMcpCommand } from './commands/mcp.js';
import { runDoctor } from './commands/doctor.js';
import { runUpdate, saveState } from './commands/update.js';
import { runBackupCommand } from './commands/backup.js';
import { runTelemetryCommand } from './commands/telemetry.js';
import { runNewCommand } from './commands/new.js';
import { trackEvent } from './utils/telemetry.js';

async function runDefaultWizard(): Promise<void> {
  try {
    const state = await runWizard();
    const result = await applyState(state);
    saveState(state);
    void trackEvent({
      event: 'install',
      properties: {
        skillBundle: state.selectedBundles.skills,
        agentBundle: state.selectedBundles.agents,
        memoryStorage: state.memoryConfig.storage,
        projectsCount: state.projects.length,
      },
    });

    console.log('');
    console.log(chalk.bold.green('🎉 ai-bootstrap setup tamamlandı!'));
    console.log('');
    console.log(chalk.bold('Yazılan fayllar:'));
    for (const f of result.filesWritten) {
      console.log(`  ${chalk.dim('✓')} ${f}`);
    }
    console.log('');
    console.log(chalk.dim('Sənaye standartına uyğun setup. Növbəti:'));
    console.log(`  ${chalk.cyan('claude')}                                — sessiyanı başlat`);
    console.log(`  ${chalk.cyan('cat ~/.claude/CLAUDE.md | head -30')}     — qaydaları yoxla`);
    console.log(`  ${chalk.cyan('ai-bootstrap mcp credentials')}           — MCP credential-ları əlavə et`);
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

function printHelp(): void {
  console.log(`
${chalk.bold('ai-bootstrap')} — Claude Code personal AI infrastructure

${chalk.bold('Usage:')}
  ${chalk.cyan('ai-bootstrap')}                  Interactive 6-step user-scope setup wizard
  ${chalk.cyan('ai-bootstrap new')}               Bootstrap THIS folder (project-scope skills+agents)
  ${chalk.cyan('ai-bootstrap update')}            Re-sync skills + agents from template bundle
  ${chalk.cyan('ai-bootstrap doctor')}            Diagnose install health (symlinks, MCPs, creds)
  ${chalk.cyan('ai-bootstrap mcp <sub>')}         MCP management — list, installed, credentials
  ${chalk.cyan('ai-bootstrap backup <sub>')}      ~/.claude/ git backup — init, sync, pull, status
  ${chalk.cyan('ai-bootstrap telemetry <sub>')}   Anonymous telemetry opt-in/out (status, on, off)
  ${chalk.cyan('ai-bootstrap --version')}         Print version
  ${chalk.cyan('ai-bootstrap --help')}            This help
`);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    return runDefaultWizard();
  }

  const cmd = args[0];

  if (cmd === '--help' || cmd === '-h' || cmd === 'help') {
    printHelp();
    return;
  }

  if (cmd === '--version' || cmd === '-v' || cmd === 'version') {
    const pkg = await import('../package.json', { with: { type: 'json' } });
    console.log(pkg.default.version);
    return;
  }

  if (cmd === 'mcp') {
    return runMcpCommand(args.slice(1));
  }

  if (cmd === 'doctor') {
    runDoctor();
    void trackEvent({ event: 'doctor' });
    return;
  }

  if (cmd === 'update') {
    runUpdate();
    void trackEvent({ event: 'update' });
    return;
  }

  if (cmd === 'backup') {
    void trackEvent({ event: 'backup', properties: { sub: args[1] ?? 'help' } });
    return runBackupCommand(args.slice(1));
  }

  if (cmd === 'new') {
    void trackEvent({ event: 'new' });
    return runNewCommand(args.slice(1));
  }

  if (cmd === 'telemetry') {
    return runTelemetryCommand(args.slice(1));
  }

  console.error(chalk.red(`Unknown command: ${cmd}`));
  printHelp();
  process.exit(1);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  void main();
}

export { main };
