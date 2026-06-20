#!/usr/bin/env node
// Smoke tests for ai-bootstrap CLI applier
// Tests run without TTY — pure function calls with mock HOME
// Usage: HOME=/tmp/ab-test node tests/smoke.test.mjs

import { mkdtempSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// ANSI colors for output
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

// Setup mock HOME for entire test run
const mockHome = mkdtempSync(join(tmpdir(), 'ab-test-'));
process.env.HOME = mockHome;
console.log(`Mock HOME: ${mockHome}\n`);

// Import after env is set
const { writeUserProfile } = await import('../dist/applier/profile-writer.js');
const { writeProjectManifest } = await import('../dist/applier/projects-writer.js');
const { writeSettings } = await import('../dist/applier/settings-writer.js');
const { writeMcpConfig } = await import('../dist/applier/mcp-config.js');
const { installSkills } = await import('../dist/applier/skills-installer.js');
const { installAgents } = await import('../dist/applier/agents-installer.js');
const { resolvePlan, SKILL_BUNDLES, AGENT_BUNDLES } = await import('../dist/applier/bundle-definitions.js');

// ════ Test 1: profile-writer ════
describe('profile-writer', () => {
  const profile = {
    name: 'Emin',
    primaryLanguage: 'az',
    otherLanguages: ['en', 'ru'],
    role: 'AI creator + founder',
    experience: 'expert',
    country: 'Azerbaijan',
    goals: {
      sixMonth: 'Ship ai-bootstrap v1',
      twelveMonth: '1K users',
      twentyFourMonth: '10K users',
    },
  };

  const path = writeUserProfile(profile);
  assert('returns path', typeof path === 'string' && path.length > 0);
  assert('file exists', existsSync(path));

  const content = readFileSync(path, 'utf-8');
  assert('contains name', content.includes('Emin'));
  assert('contains language', content.includes('az'));
  assert('contains role', content.includes('AI creator + founder'));
  assert('contains goals', content.includes('Ship ai-bootstrap v1'));
  assert('has frontmatter-like header', content.startsWith('# User Profile'));
});

// ════ Test 2: projects-writer ════
describe('projects-writer', () => {
  const projects = [
    {
      name: 'restoran-crm',
      path: '/tmp/fake/restoran-crm',
      type: 'saas-fullstack-pro',
      hasClaudeMd: true,
      hasDocsFolder: true,
      lastModified: new Date('2026-06-19'),
    },
    {
      name: 'cavably',
      path: '/tmp/fake/cavably',
      type: 'saas-ai-pro',
      hasClaudeMd: true,
      hasDocsFolder: true,
      lastModified: new Date('2026-06-20'),
    },
  ];

  const paths = writeProjectManifest(projects);
  assert('returns array of paths', Array.isArray(paths));
  assert('writes 3 files (index + 2 projects)', paths.length === 3);

  for (const p of paths) {
    assert(`exists: ${p.split('/').pop()}`, existsSync(p));
  }

  const indexContent = readFileSync(paths[0], 'utf-8');
  assert('index references both projects', indexContent.includes('restoran-crm') && indexContent.includes('cavably'));
  assert('index has stats', indexContent.includes('Total projects: 2'));
});

// ════ Test 3: settings-writer ════
describe('settings-writer', () => {
  const state = {
    profile: {
      name: 'Emin',
      primaryLanguage: 'az',
      otherLanguages: [],
      role: 'tester',
      experience: 'expert',
      country: 'AZ',
      goals: { sixMonth: '', twelveMonth: '', twentyFourMonth: '' },
    },
    projectPaths: [],
    projects: [],
    selectedBundles: { skills: 'foundation', agents: 'foundation', mcps: 'custom' },
    memoryConfig: { storage: 'markdown-only', autoLearn: true, syncToGithub: false },
  };

  const path = writeSettings(state);
  assert('returns path', typeof path === 'string');
  assert('file exists', existsSync(path));

  const settings = JSON.parse(readFileSync(path, 'utf-8'));
  assert('has permissions', typeof settings.permissions === 'object');
  assert('has allow list', Array.isArray(settings.permissions.allow));
  assert('has deny list', Array.isArray(settings.permissions.deny));
  assert('model is opus', settings.model === 'opus');
  assert('AI_BOOTSTRAP_PRIMARY_LANG set', settings.env.AI_BOOTSTRAP_PRIMARY_LANG === 'az');
});

// ════ Test 4: mcp-config ════
describe('mcp-config', () => {
  const mcps = ['github', 'postgres', 'notion', 'brave-search'];
  const path = writeMcpConfig(mcps);

  assert('returns path', typeof path === 'string');
  assert('file exists', existsSync(path));

  const config = JSON.parse(readFileSync(path, 'utf-8'));
  assert('version is 1.0', config.version === '1.0');
  assert('has 4 servers', config.servers.length === 4);
  assert('github needs credential', config.servers.find((s) => s.id === 'github')?.needs_credential === true);
  assert('brave-search does NOT need credential', config.servers.find((s) => s.id === 'brave-search')?.needs_credential === false);

  // Test merge — running again with overlap
  const path2 = writeMcpConfig(['github', 'slack']);
  const config2 = JSON.parse(readFileSync(path2, 'utf-8'));
  assert('merge: no duplicate github', config2.servers.filter((s) => s.id === 'github').length === 1);
  assert('merge: slack added', config2.servers.find((s) => s.id === 'slack') !== undefined);
  assert('merge: total 5 servers', config2.servers.length === 5);
});

// ════ Test 5: bundle resolution ════
describe('bundle-definitions', () => {
  assert('foundation has 10 skills', SKILL_BUNDLES.foundation.length === 10);
  assert('full-stack has 52+ skills (C-9 + all tiers)', SKILL_BUNDLES['full-stack'].length >= 52);
  assert('founder has 30+ skills', SKILL_BUNDLES.founder.length >= 30);
  assert('creator includes showrunner', SKILL_BUNDLES.creator.includes('showrunner'));
  assert('creator includes brand-identity-designer', SKILL_BUNDLES.creator.includes('brand-identity-designer'));
  assert('founder includes business-coach', SKILL_BUNDLES.founder.includes('business-coach'));
  assert('founder includes journal-keeper', SKILL_BUNDLES.founder.includes('journal-keeper'));
  assert('founder includes decision-maker', SKILL_BUNDLES.founder.includes('decision-maker'));
  assert('marketer includes seo-optimizer', SKILL_BUNDLES.marketer.includes('seo-optimizer'));
  assert('foundation has 2 agents', AGENT_BUNDLES.foundation.length === 2);
  assert('developer has 16 agents (C-13 expanded)', AGENT_BUNDLES.developer.length === 16);
  assert('full-stack has 21 agents', AGENT_BUNDLES['full-stack'].length === 21);

  const plan = resolvePlan('founder', 'founder');
  assert('founder plan has 30+ skills', plan.skills.length >= 30);
  assert('plan includes business-coach', plan.skills.includes('business-coach'));
  assert('plan includes psychologist', plan.skills.includes('psychologist'));

  const fullPlan = resolvePlan('full-stack', 'full-stack');
  assert('full-stack has typography-system-designer', fullPlan.skills.includes('typography-system-designer'));
  assert('full-stack has knowledge-base-builder', fullPlan.skills.includes('knowledge-base-builder'));
  assert('full-stack has 52+ unique skills', new Set(fullPlan.skills).size === fullPlan.skills.length);

  // Unknown bundle fallback
  const fallback = resolvePlan('nonexistent', 'nonexistent');
  assert('unknown bundle falls back to foundation (10 skills)', fallback.skills.length === 10);
});

// ════ Test 6: skills-installer (real symlink creation) ════
describe('skills-installer', () => {
  const result = installSkills(['learning-keeper', 'architect', 'nonexistent-skill']);
  assert('returns result object', typeof result === 'object');
  assert('has installed array', Array.isArray(result.installed));
  assert('has skipped array', Array.isArray(result.skipped));
  assert('has errors array', Array.isArray(result.errors));

  assert('installed 2 real skills', result.installed.length === 2);
  assert('learning-keeper installed', result.installed.includes('learning-keeper'));
  assert('architect installed', result.installed.includes('architect'));

  assert('skipped nonexistent', result.skipped.length === 1);
  assert('skipped reason contains "Mənbə yoxdur"', result.skipped[0].reason.includes('Mənbə yoxdur'));

  // Verify actual symlinks exist
  const skillsDir = join(mockHome, '.claude', 'skills');
  assert('learning-keeper symlink exists', existsSync(join(skillsDir, 'learning-keeper')));
  assert('architect symlink exists', existsSync(join(skillsDir, 'architect')));
});

// ════ Test 7: agents-installer ════
describe('agents-installer', () => {
  const result = installAgents(['code-reviewer', 'nonexistent-agent']);
  assert('returns result object', typeof result === 'object');
  assert('installed 1 real agent', result.installed.length === 1);
  assert('code-reviewer installed', result.installed.includes('code-reviewer'));
  assert('skipped nonexistent', result.skipped.length === 1);

  const agentsDir = join(mockHome, '.claude', 'agents');
  assert('code-reviewer symlink exists', existsSync(join(agentsDir, 'code-reviewer')));
});

// ════ Cleanup ════
rmSync(mockHome, { recursive: true, force: true });
console.log(`\n${YELLOW}Cleanup:${RESET} Mock HOME silindi`);

// ════ Final report ════
console.log(`\n${'═'.repeat(50)}`);
if (failed === 0) {
  console.log(`${GREEN}✓ ALL TESTS PASSED${RESET} (${passed}/${passed})`);
  process.exit(0);
} else {
  console.log(`${RED}✗ FAILURES${RESET}: ${failed} of ${passed + failed}`);
  console.log(`Failed tests:`);
  for (const f of failures) {
    console.log(`  - ${f}`);
  }
  process.exit(1);
}
