// ai-bootstrap integration — manage LOCAL MCP server installations.
//
// Some MCPs (Instagram custom, future ones) require a local Node server
// instead of a public npm package. This command:
//   - install <name> — checks/sets up the integration folder under ~/.claude/integrations/
//   - status         — lists what integrations are present and their state
//   - doctor <name>  — verify a specific integration (npm deps, .env, server boots)

import chalk from 'chalk';
import { existsSync, statSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { execa } from 'execa';
import { HOME, ensureDir } from '../utils/paths.js';

const INTEGRATIONS_DIR = join(HOME, '.claude', 'integrations');

interface IntegrationInfo {
  id: string;
  name: string;
  serverPath: string;       // path to index.js
  packageJsonPath: string;
  envPath: string;
  requiredEnvKeys: string[];
}

const INTEGRATIONS: Record<string, IntegrationInfo> = {
  instagram: {
    id: 'instagram',
    name: 'Instagram (15-tool local MCP server)',
    serverPath: join(INTEGRATIONS_DIR, 'instagram-mcp', 'server', 'src', 'index.js'),
    packageJsonPath: join(INTEGRATIONS_DIR, 'instagram-mcp', 'server', 'package.json'),
    envPath: join(INTEGRATIONS_DIR, 'instagram-mcp', '.env'),
    requiredEnvKeys: [
      'META_APP_ID',
      'META_APP_SECRET',
      'IG_ACCESS_TOKEN',
      'IG_BUSINESS_ACCOUNT_ID',
      'IG_USERNAME',
    ],
  },
};

function printHelp(): void {
  console.log(`
${chalk.bold('ai-bootstrap integration')} — local MCP server idarəsi

${chalk.bold('Subcommands:')}
  ${chalk.cyan('status')}              Mövcud integration-ları siyahıla
  ${chalk.cyan('install <name>')}       Setup integration (folder + deps yoxla)
  ${chalk.cyan('doctor <name>')}        Detallı sağlamlıq yoxlaması

${chalk.bold('Available integrations:')}
${Object.values(INTEGRATIONS).map((i) => `  ${chalk.cyan(i.id.padEnd(14))} ${i.name}`).join('\n')}

${chalk.bold('Why local?')}
  Bəzi MCP server-lər public npm paket kimi mövcud deyil (məs. custom Instagram
  Graph API client 15 alət ilə). ai-bootstrap onları ~/.claude/integrations/-də
  saxlayır, MCP catalog-dan onlara absolute path-lə bağlanır.
`);
}

function statusList(): void {
  ensureDir(INTEGRATIONS_DIR);
  console.log(chalk.bold(`\nIntegrations directory: ${INTEGRATIONS_DIR}\n`));

  for (const info of Object.values(INTEGRATIONS)) {
    const installed = existsSync(info.serverPath);
    const hasDeps = installed && existsSync(join(info.serverPath, '..', '..', 'node_modules'));
    const hasEnv = existsSync(info.envPath);
    const icon = installed && hasDeps && hasEnv ? chalk.green('✓') : installed ? chalk.yellow('⚠') : chalk.red('✗');
    console.log(`  ${icon} ${chalk.cyan(info.id.padEnd(14))} ${info.name}`);
    if (!installed) {
      console.log(chalk.dim(`     yox — ${chalk.cyan('ai-bootstrap integration install ' + info.id)} qaçır`));
    } else {
      console.log(chalk.dim(`     server: ${info.serverPath}`));
      console.log(chalk.dim(`     deps:   ${hasDeps ? 'OK' : chalk.yellow('npm install lazımdır')}`));
      console.log(chalk.dim(`     .env:   ${hasEnv ? 'OK' : chalk.yellow('təyin edilməyib')}`));
    }
    console.log('');
  }
}

async function installIntegration(id: string): Promise<void> {
  const info = INTEGRATIONS[id];
  if (!info) {
    console.error(chalk.red(`✗ Naməlum integration: ${id}`));
    console.log(chalk.dim(`Mövcud: ${Object.keys(INTEGRATIONS).join(', ')}`));
    process.exit(1);
  }

  ensureDir(INTEGRATIONS_DIR);

  if (!existsSync(info.serverPath)) {
    console.log(chalk.yellow(`⚠ Server faylı yoxdur: ${info.serverPath}`));
    console.log('');
    console.log(chalk.bold('Necə qurulur (Instagram MCP misalı):'));
    console.log(`  1. Server kodu hazır (məs. ${chalk.cyan('azerogluemin.az/projects/azerogluemin-ai/instagram-mcp')})`);
    console.log(`  2. Kopyala: ${chalk.cyan('cp -R <source>/instagram-mcp ~/.claude/integrations/')}`);
    console.log(`  3. Yenidən qaçır: ${chalk.cyan('ai-bootstrap integration install ' + id)}`);
    console.log('');
    console.log(chalk.dim(`Future: gələcəkdə ai-bootstrap özü standartlaşdırılmış integration-ları yükləyəcək.`));
    process.exit(1);
  }

  console.log(chalk.bold(`\nIntegration: ${chalk.cyan(info.name)}\n`));
  console.log(chalk.dim(`  Server: ${info.serverPath}`));

  // Install npm deps
  const serverDir = join(info.serverPath, '..', '..');
  console.log(chalk.dim('  npm install...'));
  try {
    await execa('npm', ['install'], { cwd: serverDir, stdio: 'pipe' });
    console.log(chalk.green('  ✓ Dependencies installed'));
  } catch (err) {
    console.log(chalk.red(`  ✗ npm install failed: ${err instanceof Error ? err.message : err}`));
    process.exit(1);
  }

  // Check .env
  if (!existsSync(info.envPath)) {
    console.log(chalk.yellow(`  ⚠ .env yoxdur: ${info.envPath}`));
    const examplePath = join(info.envPath, '..', '.env.example');
    if (existsSync(examplePath)) {
      console.log(chalk.dim(`     Şablon: ${examplePath} — kopyala + doldur`));
    }
  } else {
    console.log(chalk.green(`  ✓ .env mövcuddur`));
  }

  console.log('');
  console.log(chalk.green(`✓ Integration hazırdır: ${id}`));
  console.log(chalk.dim(`  Növbəti: ${chalk.cyan('ai-bootstrap mcp add ' + id)} → MCP catalog-a əlavə`));
  console.log('');
}

async function doctorIntegration(id: string): Promise<void> {
  const info = INTEGRATIONS[id];
  if (!info) {
    console.error(chalk.red(`✗ Naməlum integration: ${id}`));
    process.exit(1);
  }

  console.log(chalk.bold(`\nDoctor: ${chalk.cyan(info.name)}\n`));

  // 1. Server file
  if (!existsSync(info.serverPath)) {
    console.log(chalk.red(`✗ Server faylı yoxdur: ${info.serverPath}`));
    process.exit(1);
  }
  console.log(chalk.green(`✓ Server faylı mövcuddur`));

  // 2. package.json
  const pkg = JSON.parse(readFileSync(info.packageJsonPath, 'utf-8'));
  console.log(chalk.dim(`  Package: ${pkg.name}@${pkg.version}`));

  // 3. node_modules
  const serverDir = join(info.serverPath, '..', '..');
  const nodeModulesPath = join(serverDir, 'node_modules');
  if (!existsSync(nodeModulesPath)) {
    console.log(chalk.red(`✗ node_modules yoxdur — qaçır: ai-bootstrap integration install ${id}`));
    process.exit(1);
  }
  const depCount = readdirSync(nodeModulesPath).filter((d) => !d.startsWith('.')).length;
  console.log(chalk.green(`✓ Dependencies (${depCount} package)`));

  // 4. .env
  if (!existsSync(info.envPath)) {
    console.log(chalk.yellow(`⚠ .env yoxdur: ${info.envPath}`));
  } else {
    const envContent = readFileSync(info.envPath, 'utf-8');
    const missing: string[] = [];
    for (const key of info.requiredEnvKeys) {
      if (!new RegExp(`^${key}=.+`, 'm').test(envContent)) missing.push(key);
    }
    if (missing.length > 0) {
      console.log(chalk.yellow(`⚠ .env-də çatışmır: ${missing.join(', ')}`));
    } else {
      console.log(chalk.green(`✓ .env tam (${info.requiredEnvKeys.length} key)`));
    }
  }

  // 5. Boot test
  console.log(chalk.dim('  Boot test...'));
  try {
    const res = await execa('node', ['-e', `
      import('${info.serverPath}').then(() => {
        setTimeout(() => process.exit(0), 500);
      }).catch(e => { console.error(e.message); process.exit(1); });
    `], { timeout: 5000, reject: false });
    if (res.exitCode === 0) {
      console.log(chalk.green(`✓ Server boots without errors`));
    } else {
      console.log(chalk.yellow(`⚠ Boot exit ${res.exitCode}: ${res.stderr.slice(0, 200)}`));
    }
  } catch (err) {
    console.log(chalk.yellow(`⚠ Boot test inconclusive: ${err instanceof Error ? err.message : err}`));
  }

  console.log('');
}

export async function runIntegrationCommand(args: string[]): Promise<void> {
  const sub = args[0];

  if (!sub || sub === 'help' || sub === '--help' || sub === '-h') {
    printHelp();
    return;
  }

  if (sub === 'status' || sub === 'list') {
    statusList();
    return;
  }

  if (sub === 'install') {
    if (!args[1]) {
      console.error(chalk.red('✗ Integration adı ver. Misal: ai-bootstrap integration install instagram'));
      process.exit(1);
    }
    await installIntegration(args[1]);
    return;
  }

  if (sub === 'doctor') {
    if (!args[1]) {
      console.error(chalk.red('✗ Integration adı ver. Misal: ai-bootstrap integration doctor instagram'));
      process.exit(1);
    }
    await doctorIntegration(args[1]);
    return;
  }

  console.error(chalk.red(`Unknown integration subcommand: ${sub}`));
  printHelp();
  process.exit(1);
}
