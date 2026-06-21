#!/usr/bin/env node
// End-to-end CLI tests — exercise compiled bin/init.js as a subprocess.
// Tests subcommands that don't require interactive TTY input.
//
// Usage: HOME=/tmp/ab-e2e node tests/e2e.test.mjs

import { mkdtempSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

let passed = 0;
let failed = 0;
const failures = [];

function assert(name, condition, details = '') {
  if (condition) {
    console.log(`  ${GREEN}✓${RESET} ${name}`);
    passed++;
  } else {
    console.log(`  ${RED}✗${RESET} ${name}${details ? ' — ' + details : ''}`);
    failed++;
    failures.push(name);
  }
}

function describe(name, fn) {
  console.log(`\n${YELLOW}${name}${RESET}`);
  fn();
}

const mockHome = mkdtempSync(join(tmpdir(), 'ab-e2e-'));
const CLI_PATH = join(import.meta.dirname ?? new URL('.', import.meta.url).pathname, '..', 'bin', 'init.js');

console.log(`Mock HOME:  ${mockHome}`);
console.log(`CLI path:   ${CLI_PATH}\n`);

function runCli(args, { stdin = '', env = {} } = {}) {
  const result = spawnSync('node', [CLI_PATH, ...args], {
    cwd: mockHome,
    input: stdin,
    env: {
      ...process.env,
      HOME: mockHome,
      // Disable network for telemetry
      AI_BOOTSTRAP_TELEMETRY_URL: '',
      ...env,
    },
    encoding: 'utf-8',
    timeout: 10000,
  });
  return {
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    exitCode: result.status ?? -1,
    signal: result.signal,
  };
}

// ════ Test 1: --version ════
describe('--version', () => {
  const r = runCli(['--version']);
  assert('exit 0', r.exitCode === 0);
  assert('prints semver', /^\d+\.\d+\.\d+/.test(r.stdout.trim()));
});

// ════ Test 2: --help ════
describe('--help', () => {
  const r = runCli(['--help']);
  assert('exit 0', r.exitCode === 0);
  assert('lists default wizard', r.stdout.includes('Interactive 6-step user-scope setup wizard'));
  assert('lists new (project-scope)', r.stdout.includes('ai-bootstrap new'));
  assert('lists update', r.stdout.includes('ai-bootstrap update'));
  assert('lists doctor', r.stdout.includes('ai-bootstrap doctor'));
  assert('lists mcp', r.stdout.includes('ai-bootstrap mcp'));
  assert('lists backup', r.stdout.includes('ai-bootstrap backup'));
  assert('lists telemetry', r.stdout.includes('ai-bootstrap telemetry'));
});

// ════ Test 3: doctor on empty HOME ════
describe('doctor (empty HOME)', () => {
  const r = runCli(['doctor']);
  assert('exit non-zero (failures present)', r.exitCode !== 0);
  assert('reports missing ~/.claude/', r.stdout.includes('~/.claude/'));
  assert('reports missing CLAUDE.md', r.stdout.includes('CLAUDE.md'));
  assert('reports missing knowledge', r.stdout.includes('knowledge/'));
  assert('reports missing skills', r.stdout.includes('skills/'));
  assert('reports failure count', /\d+ failures?/.test(r.stdout));
});

// ════ Test 4: mcp list ════
describe('mcp list', () => {
  const r = runCli(['mcp', 'list']);
  assert('exit 0', r.exitCode === 0);
  assert('shows MCP count', /\d+ MCP servers available/.test(r.stdout));
  assert('shows DEV category', r.stdout.includes('DEV'));
  assert('lists github', r.stdout.includes('github'));
  assert('lists supabase', r.stdout.includes('supabase'));
  assert('lists atlassian (new in C-21)', r.stdout.includes('atlassian'));
  assert('lists gmail (new in C-21)', r.stdout.includes('gmail'));
  assert('credential icon for github', r.stdout.includes('🔑'));
});

// ════ Test 5: mcp installed (none configured) ════
describe('mcp installed (none configured)', () => {
  const r = runCli(['mcp', 'installed']);
  assert('exit 0', r.exitCode === 0);
  assert('says none installed', r.stdout.includes('Hələ heç bir MCP qurulmayıb'));
});

// ════ Test 6: update with no saved state ════
describe('update (no state)', () => {
  const r = runCli(['update']);
  assert('exit non-zero', r.exitCode !== 0);
  assert('reports no saved state', r.stderr.includes('No saved state') || r.stdout.includes('No saved state'));
});

// ════ Test 7: telemetry status (not configured) ════
describe('telemetry status', () => {
  const r = runCli(['telemetry', 'status']);
  assert('exit 0', r.exitCode === 0);
  assert('reports default opt-out', r.stdout.includes('Configured deyil') || r.stdout.includes('Default: opt-out'));
});

// ════ Test 8: telemetry off (no consent needed) ════
describe('telemetry off', () => {
  const r = runCli(['telemetry', 'off']);
  assert('exit 0', r.exitCode === 0);
  assert('reports disabled', r.stdout.includes('Telemetry disabled'));
  assert('writes telemetry.json', existsSync(join(mockHome, '.claude', 'telemetry.json')));
  const cfg = JSON.parse(readFileSync(join(mockHome, '.claude', 'telemetry.json'), 'utf-8'));
  assert('enabled=false', cfg.enabled === false);
  assert('installId present', typeof cfg.installId === 'string' && cfg.installId.length > 8);
});

// ════ Test 9: telemetry status after opt-out ════
describe('telemetry status (after opt-out)', () => {
  const r = runCli(['telemetry', 'status']);
  assert('exit 0', r.exitCode === 0);
  assert('shows install ID', r.stdout.includes('Install ID'));
  assert('enabled = no', /Enabled:.*no/.test(r.stdout));
});

// ════ Test 10: backup status (not configured) ════
describe('backup status', () => {
  const r = runCli(['backup', 'status']);
  assert('exit 0', r.exitCode === 0);
  assert('reports not configured', /configured deyil/i.test(r.stdout));
});

// ════ Test 11: unknown command ════
describe('unknown command', () => {
  const r = runCli(['nonsense-command']);
  assert('exit non-zero', r.exitCode !== 0);
  assert('reports unknown', r.stderr.includes('Unknown command') || r.stdout.includes('Unknown command'));
});

// ════ Test 12: unknown mcp subcommand ════
describe('unknown mcp subcommand', () => {
  const r = runCli(['mcp', 'fake-sub']);
  assert('exit non-zero', r.exitCode !== 0);
  assert('reports unknown', r.stderr.includes('Unknown mcp subcommand') || r.stdout.includes('Unknown mcp subcommand'));
});

// ════ Cleanup ════
rmSync(mockHome, { recursive: true, force: true });
console.log(`\n${YELLOW}Cleanup:${RESET} Mock HOME silindi`);

console.log(`\n${'═'.repeat(50)}`);
if (failed === 0) {
  console.log(`${GREEN}✓ ALL E2E TESTS PASSED${RESET} (${passed}/${passed})`);
  process.exit(0);
} else {
  console.log(`${RED}✗ E2E FAILURES${RESET}: ${failed} of ${passed + failed}`);
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}
