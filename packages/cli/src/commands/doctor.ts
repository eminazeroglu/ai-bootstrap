// ai-bootstrap doctor — diagnose install health
// Checks: CLAUDE.md, knowledge files, skills/agents symlinks, settings.json,
//         MCP config validity, missing credentials, broken symlinks.

import chalk from 'chalk';
import { existsSync, readdirSync, readFileSync, lstatSync, realpathSync } from 'node:fs';
import { join } from 'node:path';
import { HOME, CLAUDE_DIR, KNOWLEDGE_DIR, SKILLS_DIR, AGENTS_DIR, SETTINGS_FILE } from '../utils/paths.js';
import { getMcpEntry } from '../applier/mcp-catalog.js';

interface Check {
  name: string;
  status: 'pass' | 'warn' | 'fail';
  detail?: string;
}

function checkExists(path: string, label: string): Check {
  if (existsSync(path)) return { name: label, status: 'pass', detail: path };
  return { name: label, status: 'fail', detail: `Missing: ${path}` };
}

function checkClaudeMd(): Check[] {
  const checks: Check[] = [];
  const claudeMd = join(CLAUDE_DIR, 'CLAUDE.md');
  if (!existsSync(claudeMd)) {
    checks.push({ name: 'CLAUDE.md', status: 'fail', detail: 'Missing — run: ai-bootstrap' });
    return checks;
  }
  const content = readFileSync(claudeMd, 'utf-8');
  const hasFoundationRules = content.includes('Foundation Rule') || content.includes('docs-first');
  checks.push({
    name: 'CLAUDE.md',
    status: hasFoundationRules ? 'pass' : 'warn',
    detail: hasFoundationRules ? `${content.length} chars` : 'Found but no foundation rules detected',
  });
  return checks;
}

function checkKnowledge(): Check[] {
  if (!existsSync(KNOWLEDGE_DIR)) {
    return [{ name: 'knowledge/', status: 'fail', detail: 'Missing — run: ai-bootstrap' }];
  }
  const expected = ['user-profile.md', 'mistakes-log.md', 'verified-facts.md', 'user-rules.md'];
  const found = readdirSync(KNOWLEDGE_DIR);
  const missing = expected.filter((f) => !found.includes(f));
  if (missing.length > 0) {
    return [{ name: 'knowledge/', status: 'warn', detail: `Missing files: ${missing.join(', ')}` }];
  }
  return [{ name: 'knowledge/', status: 'pass', detail: `${found.length} files` }];
}

function checkSymlinks(dir: string, label: string): Check[] {
  if (!existsSync(dir)) return [{ name: label, status: 'fail', detail: 'Directory missing' }];

  const checks: Check[] = [];
  const entries = readdirSync(dir);
  let broken = 0;
  let realFiles = 0;
  let symlinks = 0;

  for (const e of entries) {
    const full = join(dir, e);
    try {
      const stat = lstatSync(full);
      if (stat.isSymbolicLink()) {
        symlinks++;
        try {
          realpathSync(full);
        } catch {
          broken++;
        }
      } else if (stat.isDirectory() || stat.isFile()) {
        realFiles++;
      }
    } catch {
      broken++;
    }
  }

  checks.push({
    name: label,
    status: broken > 0 ? 'fail' : symlinks > 0 ? 'pass' : realFiles > 0 ? 'warn' : 'warn',
    detail: `${symlinks} symlinks, ${realFiles} files${broken > 0 ? `, ${broken} BROKEN` : ''}`,
  });

  return checks;
}

function checkSettings(): Check[] {
  if (!existsSync(SETTINGS_FILE)) {
    return [{ name: 'settings.json', status: 'fail', detail: 'Missing — run: ai-bootstrap' }];
  }
  try {
    const settings = JSON.parse(readFileSync(SETTINGS_FILE, 'utf-8'));
    if (typeof settings.permissions !== 'object') {
      return [{ name: 'settings.json', status: 'warn', detail: 'No permissions block' }];
    }
    return [{ name: 'settings.json', status: 'pass', detail: `model=${settings.model ?? 'default'}` }];
  } catch (err) {
    return [{ name: 'settings.json', status: 'fail', detail: `Parse error: ${err}` }];
  }
}

function checkMcps(): Check[] {
  const checks: Check[] = [];
  const trackingPath = join(CLAUDE_DIR, 'mcp-tracking.json');
  const claudeJsonPath = join(HOME, '.claude.json');
  const envFile = join(HOME, '.ai-bootstrap.env');

  if (!existsSync(trackingPath)) {
    checks.push({ name: 'MCPs', status: 'warn', detail: 'No MCPs configured (optional)' });
    return checks;
  }

  let tracked: { servers: Array<{ id: string; needs_credential: boolean; credential_keys?: string[] }> };
  try {
    tracked = JSON.parse(readFileSync(trackingPath, 'utf-8'));
  } catch {
    return [{ name: 'MCPs', status: 'fail', detail: 'mcp-tracking.json corrupt' }];
  }

  if (!existsSync(claudeJsonPath)) {
    checks.push({ name: 'MCPs', status: 'fail', detail: '~/.claude.json missing — MCPs not wired to Claude Code' });
    return checks;
  }

  let claudeJson: { mcpServers?: Record<string, unknown> } = {};
  try {
    claudeJson = JSON.parse(readFileSync(claudeJsonPath, 'utf-8'));
  } catch {
    return [{ name: 'MCPs', status: 'fail', detail: '~/.claude.json parse error' }];
  }

  const mcpServers = claudeJson.mcpServers ?? {};
  const trackedIds = tracked.servers.map((s) => s.id);
  const wired = trackedIds.filter((id) => mcpServers[id]);
  const orphans = trackedIds.filter((id) => !mcpServers[id]);

  checks.push({
    name: 'MCPs wired',
    status: orphans.length === 0 ? 'pass' : 'warn',
    detail: `${wired.length}/${trackedIds.length} in ~/.claude.json${orphans.length > 0 ? ` (orphans: ${orphans.join(', ')})` : ''}`,
  });

  // Credentials check
  const envContent = existsSync(envFile) ? readFileSync(envFile, 'utf-8') : '';
  const needCreds = tracked.servers.filter((s) => s.needs_credential);
  const missingCreds: string[] = [];
  for (const s of needCreds) {
    const entry = getMcpEntry(s.id);
    if (!entry) continue;
    for (const key of entry.credentialKeys) {
      const re = new RegExp(`^${key}=.+`, 'm');
      if (!re.test(envContent)) {
        missingCreds.push(`${s.id}.${key}`);
      }
    }
  }

  if (missingCreds.length > 0) {
    checks.push({
      name: 'MCP credentials',
      status: 'warn',
      detail: `${missingCreds.length} missing — run: ai-bootstrap mcp credentials`,
    });
  } else if (needCreds.length > 0) {
    checks.push({ name: 'MCP credentials', status: 'pass', detail: `All ${needCreds.length} configured` });
  }

  return checks;
}

function printCheck(c: Check): void {
  const icon = c.status === 'pass' ? chalk.green('✓') : c.status === 'warn' ? chalk.yellow('⚠') : chalk.red('✗');
  const name = c.name.padEnd(22);
  const detail = c.detail ? chalk.dim(c.detail) : '';
  console.log(`  ${icon} ${name} ${detail}`);
}

export function runDoctor(): void {
  console.log(chalk.bold('\nai-bootstrap doctor\n'));

  const allChecks: Check[] = [
    checkExists(CLAUDE_DIR, '~/.claude/'),
    ...checkClaudeMd(),
    ...checkKnowledge(),
    ...checkSymlinks(SKILLS_DIR, 'skills/'),
    ...checkSymlinks(AGENTS_DIR, 'agents/'),
    ...checkSettings(),
    ...checkMcps(),
  ].flat();

  for (const c of allChecks) {
    printCheck(c);
  }

  const passed = allChecks.filter((c) => c.status === 'pass').length;
  const warned = allChecks.filter((c) => c.status === 'warn').length;
  const failed = allChecks.filter((c) => c.status === 'fail').length;

  console.log('');
  console.log(
    `${chalk.green(`${passed} passed`)} · ${chalk.yellow(`${warned} warnings`)} · ${chalk.red(`${failed} failures`)}\n`,
  );

  if (failed > 0) {
    process.exit(1);
  }
}
