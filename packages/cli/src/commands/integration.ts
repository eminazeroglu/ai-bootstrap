// ai-bootstrap integration — manage LOCAL MCP server installations.
//
// Some MCPs (Instagram custom, future ones) require a local Node server
// instead of a public npm package. This command:
//   - install <name> — checks/sets up the integration folder under ~/.claude/integrations/
//   - status         — lists what integrations are present and their state
//   - doctor <name>  — verify a specific integration (npm deps, .env, server boots)

import chalk from 'chalk';
import { existsSync, statSync, readdirSync, readFileSync, cpSync, copyFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execa } from 'execa';
import { HOME, ensureDir } from '../utils/paths.js';

/**
 * Resolve absolute path to the bundled integrations folder.
 * Lookup order:
 *   1) <cli-root>/templates/integrations/  — published npm pkg (via prepack)
 *   2) ../templates/integrations/          — monorepo dev sibling
 */
function bundledIntegrationsRoot(): string {
  const here = fileURLToPath(import.meta.url);
  const cliRoot = resolve(here, '..', '..', '..');
  const candidates = [
    join(cliRoot, 'templates', 'integrations'),
    resolve(cliRoot, '..', 'templates', 'integrations'),
  ];
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  return candidates[0];
}

const INTEGRATIONS_DIR = join(HOME, '.claude', 'integrations');

interface IntegrationInfo {
  id: string;
  /** Folder name under both bundled templates and ~/.claude/integrations/ */
  folderName: string;
  name: string;
  /** Relative path within the integration folder to the server entry */
  serverRelPath: string;
  /** Required env vars (loaded by server's own dotenv from <folder>/.env) */
  requiredEnvKeys: string[];
}

const INTEGRATIONS: Record<string, IntegrationInfo> = {
  instagram: {
    id: 'instagram',
    folderName: 'instagram-mcp',
    name: 'Instagram (15-tool local MCP server)',
    serverRelPath: 'server/src/index.js',
    requiredEnvKeys: [
      'META_APP_ID',
      'META_APP_SECRET',
      'IG_ACCESS_TOKEN',
      'IG_BUSINESS_ACCOUNT_ID',
      'IG_USERNAME',
    ],
  },
};

/** Resolved per-install paths. */
function paths(info: IntegrationInfo) {
  const installedFolder = join(INTEGRATIONS_DIR, info.folderName);
  return {
    installedFolder,
    serverPath: join(installedFolder, info.serverRelPath),
    serverDir: join(installedFolder, 'server'),
    packageJsonPath: join(installedFolder, 'server', 'package.json'),
    envPath: join(installedFolder, '.env'),
    envExamplePath: join(installedFolder, '.env.example'),
  };
}

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
    const p = paths(info);
    const installed = existsSync(p.serverPath);
    const hasDeps = installed && existsSync(join(p.serverDir, 'node_modules'));
    const hasEnv = existsSync(p.envPath);
    const icon = installed && hasDeps && hasEnv ? chalk.green('✓') : installed ? chalk.yellow('⚠') : chalk.red('✗');
    console.log(`  ${icon} ${chalk.cyan(info.id.padEnd(14))} ${info.name}`);
    if (!installed) {
      console.log(chalk.dim(`     yox — ${chalk.cyan('ai-bootstrap integration install ' + info.id)} qaçır`));
    } else {
      console.log(chalk.dim(`     server: ${p.serverPath}`));
      console.log(chalk.dim(`     deps:   ${hasDeps ? 'OK' : chalk.yellow('npm install lazımdır')}`));
      console.log(chalk.dim(`     .env:   ${hasEnv ? 'OK' : chalk.yellow('yaradılmayıb (.env.example-dan kopyala + doldur)')}`));
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
  const p = paths(info);

  console.log(chalk.bold(`\nIntegration: ${chalk.cyan(info.name)}\n`));

  // Step 1: Copy bundled source from ai-bootstrap package if not already installed
  if (!existsSync(p.serverPath)) {
    const bundledRoot = bundledIntegrationsRoot();
    const bundledFolder = join(bundledRoot, info.folderName);
    if (!existsSync(bundledFolder)) {
      console.log(chalk.red(`✗ Bundled source tapılmadı: ${bundledFolder}`));
      console.log(chalk.dim('   ai-bootstrap paketinə düzgün bundle edilməyib (prepack sınadı?)'));
      process.exit(1);
    }
    console.log(chalk.dim(`  Bundled mənbədən kopyalanır: ${bundledFolder}`));
    cpSync(bundledFolder, p.installedFolder, { recursive: true, dereference: true });
    console.log(chalk.green(`  ✓ Server kodu yazıldı: ${p.installedFolder}`));
  } else {
    console.log(chalk.dim(`  Server artıq quraşdırılıb: ${p.serverPath}`));
  }

  // Step 2: Install npm dependencies
  console.log(chalk.dim('  npm install...'));
  try {
    await execa('npm', ['install'], { cwd: p.serverDir, stdio: 'pipe' });
    console.log(chalk.green('  ✓ Dependencies installed'));
  } catch (err) {
    console.log(chalk.red(`  ✗ npm install failed: ${err instanceof Error ? err.message : err}`));
    process.exit(1);
  }

  // Step 3: Seed .env from .env.example if missing
  if (!existsSync(p.envPath)) {
    if (existsSync(p.envExamplePath)) {
      copyFileSync(p.envExamplePath, p.envPath);
      console.log(chalk.green(`  ✓ .env yaradıldı .env.example-dan (credential-ları doldur!)`));
    } else {
      console.log(chalk.yellow(`  ⚠ .env yoxdur və .env.example tapılmadı`));
    }
  } else {
    console.log(chalk.green(`  ✓ .env mövcuddur (toxunulmadı)`));
  }

  console.log('');
  console.log(chalk.green(`✓ Integration hazırdır: ${id}`));
  console.log(chalk.dim(`  1. ${chalk.cyan('nano ' + p.envPath)} — credential-ları doldur`));
  console.log(chalk.dim(`  2. ${chalk.cyan('ai-bootstrap integration doctor ' + id)} — sağlamlıq yoxla`));
  console.log(chalk.dim(`  3. ${chalk.cyan('ai-bootstrap mcp add ' + id)} — Claude Code-a bağla`));
  console.log('');
}

async function doctorIntegration(id: string): Promise<void> {
  const info = INTEGRATIONS[id];
  if (!info) {
    console.error(chalk.red(`✗ Naməlum integration: ${id}`));
    process.exit(1);
  }

  const p = paths(info);
  console.log(chalk.bold(`\nDoctor: ${chalk.cyan(info.name)}\n`));

  // 1. Server file
  if (!existsSync(p.serverPath)) {
    console.log(chalk.red(`✗ Server faylı yoxdur: ${p.serverPath}`));
    console.log(chalk.dim(`   Qaçır: ${chalk.cyan('ai-bootstrap integration install ' + id)}`));
    process.exit(1);
  }
  console.log(chalk.green(`✓ Server faylı mövcuddur`));

  // 2. package.json
  const pkg = JSON.parse(readFileSync(p.packageJsonPath, 'utf-8'));
  console.log(chalk.dim(`  Package: ${pkg.name}@${pkg.version}`));

  // 3. node_modules
  const nodeModulesPath = join(p.serverDir, 'node_modules');
  if (!existsSync(nodeModulesPath)) {
    console.log(chalk.red(`✗ node_modules yoxdur — qaçır: ai-bootstrap integration install ${id}`));
    process.exit(1);
  }
  const depCount = readdirSync(nodeModulesPath).filter((d) => !d.startsWith('.')).length;
  console.log(chalk.green(`✓ Dependencies (${depCount} package)`));

  // 4. .env
  if (!existsSync(p.envPath)) {
    console.log(chalk.yellow(`⚠ .env yoxdur: ${p.envPath}`));
    if (existsSync(p.envExamplePath)) {
      console.log(chalk.dim(`   Şablon: ${p.envExamplePath} — kopyala + doldur`));
    }
  } else {
    const envContent = readFileSync(p.envPath, 'utf-8');
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
      import('${p.serverPath}').then(() => {
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
