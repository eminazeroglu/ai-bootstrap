// ai-bootstrap telemetry — control opt-in / opt-out / status

import chalk from 'chalk';
import { confirm } from '@inquirer/prompts';
import { setTelemetryConsent, getTelemetryStatus, getEndpointEnvVar } from '../utils/telemetry.js';

function printTelemetryHelp(): void {
  console.log(`
${chalk.bold('ai-bootstrap telemetry')} — anonymous usage data (OPT-IN)

${chalk.bold('Subcommands:')}
  ${chalk.cyan('status')}  Show current setting + install ID + event count
  ${chalk.cyan('on')}      Opt in to telemetry
  ${chalk.cyan('off')}     Opt out

${chalk.bold('What we collect (only if you opt in):')}
  - ai-bootstrap version, Node version, OS platform
  - Anonymous random install ID
  - Event name (install / update / doctor / mcp-list)
  - Bundle selections + MCP IDs (no credentials)

${chalk.bold('What we NEVER collect:')}
  - User profile, project names/paths, knowledge contents
  - MCP credentials, GitHub tokens
  - Anything that identifies you beyond a random UUID

${chalk.bold('Endpoint:')}
  Set ${chalk.cyan(getEndpointEnvVar())} to your collector URL. If unset,
  telemetry is no-op even if opted in. ai-bootstrap ships with no default
  endpoint — you choose where (or whether) data goes.
`);
}

function printStatus(): void {
  const status = getTelemetryStatus();
  console.log(chalk.bold('\nai-bootstrap telemetry status\n'));
  if (!status.configured) {
    console.log(chalk.dim('  Configured deyil. Default: opt-out.'));
    console.log(chalk.dim(`  Set up: ${chalk.cyan('ai-bootstrap telemetry on')}\n`));
    return;
  }
  console.log(`  Enabled:     ${status.enabled ? chalk.green('yes') : chalk.dim('no')}`);
  console.log(`  Install ID:  ${status.installId}`);
  console.log(`  Events sent: ${status.events ?? 0}`);
  const endpoint = process.env[getEndpointEnvVar()];
  console.log(`  Endpoint:    ${endpoint ? chalk.cyan(endpoint) : chalk.dim('not set (no-op)')}\n`);
}

async function optIn(): Promise<void> {
  console.log(chalk.bold('\nai-bootstrap telemetry — opt-in\n'));
  console.log(chalk.dim('Telemetry helps improve ai-bootstrap. Strictly anonymous.\n'));
  console.log('  We collect: version, platform, bundle choices, MCP IDs, event names.');
  console.log('  We DO NOT collect: profile, paths, credentials, knowledge files.\n');

  const ok = await confirm({ message: 'Opt in to anonymous telemetry?', default: false });
  if (!ok) {
    setTelemetryConsent(false);
    console.log(chalk.dim('\n  Stayed opted out.\n'));
    return;
  }
  const cfg = setTelemetryConsent(true);
  console.log(chalk.green(`\n✓ Telemetry enabled (install ID: ${cfg.installId})`));
  console.log(chalk.dim(`  Set ${getEndpointEnvVar()} env var so events have somewhere to go.`));
  console.log(chalk.dim('  Change anytime: ai-bootstrap telemetry off\n'));
}

function optOut(): void {
  setTelemetryConsent(false);
  console.log(chalk.green('\n✓ Telemetry disabled\n'));
}

export async function runTelemetryCommand(args: string[]): Promise<void> {
  const sub = args[0];
  if (!sub || sub === 'help' || sub === '--help' || sub === '-h') {
    printTelemetryHelp();
    return;
  }
  if (sub === 'status') {
    printStatus();
    return;
  }
  if (sub === 'on' || sub === 'enable') return optIn();
  if (sub === 'off' || sub === 'disable') {
    optOut();
    return;
  }
  console.error(chalk.red(`Unknown telemetry subcommand: ${sub}`));
  printTelemetryHelp();
  process.exit(1);
}
