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

// ════ Test 4: mcp-config (real Claude Code mcpServers config) ════
describe('mcp-config', () => {
  const mcps = ['github', 'postgres', 'notion', 'brave-search'];
  const result = writeMcpConfig(mcps);

  assert('returns result object', typeof result === 'object');
  assert('claudeJsonPath is set', typeof result.claudeJsonPath === 'string');
  assert('trackingPath is set', typeof result.trackingPath === 'string');
  assert('claudeJson written', existsSync(result.claudeJsonPath));
  assert('tracking written', existsSync(result.trackingPath));
  assert('installed 4', result.installed.length === 4);
  assert('skipped 0', result.skipped.length === 0);
  assert('no missing from catalog', result.missingFromCatalog.length === 0);

  const claudeJson = JSON.parse(readFileSync(result.claudeJsonPath, 'utf-8'));
  assert('claudeJson has mcpServers', typeof claudeJson.mcpServers === 'object');
  assert('github mcpServer has command', claudeJson.mcpServers.github?.command === 'npx');
  assert('github mcpServer has args', Array.isArray(claudeJson.mcpServers.github?.args));
  assert('github mcpServer has env with placeholder', claudeJson.mcpServers.github?.env?.GITHUB_PERSONAL_ACCESS_TOKEN === '${GITHUB_PERSONAL_ACCESS_TOKEN}');
  assert('brave-search mcpServer no env required (only API key)', claudeJson.mcpServers['brave-search']?.command === 'npx');

  assert('credentialsRequired tracks github', result.credentialsRequired.find((c) => c.id === 'github') !== undefined);
  assert('brave-search credentials tracked (BRAVE_API_KEY)', result.credentialsRequired.find((c) => c.id === 'brave-search')?.keys.includes('BRAVE_API_KEY') === true);

  // Merge run
  const result2 = writeMcpConfig(['github', 'slack', 'unknown-mcp-xxx']);
  assert('merge: github skipped (already)', result2.skipped.includes('github'));
  assert('merge: slack installed', result2.installed.includes('slack'));
  assert('merge: unknown reported missing', result2.missingFromCatalog.includes('unknown-mcp-xxx'));

  const claudeJson2 = JSON.parse(readFileSync(result2.claudeJsonPath, 'utf-8'));
  assert('merge: slack now in mcpServers', claudeJson2.mcpServers.slack?.command === 'npx');
  assert('merge: total 5 servers in claudeJson', Object.keys(claudeJson2.mcpServers).length === 5);
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
  assert('developer has 16 agents', AGENT_BUNDLES.developer.length === 16);
  assert('full-stack has 75+ agents (C-15 final)', AGENT_BUNDLES['full-stack'].length >= 75);
  assert('marketer includes SEO agents', AGENT_BUNDLES.marketer.includes('seo-technical'));
  assert('creator includes video-pipeline', AGENT_BUNDLES.creator.includes('video-pipeline'));

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

  // Verify actual copies exist (not symlinks since C-20)
  const skillsDir = join(mockHome, '.claude', 'skills');
  assert('learning-keeper dir exists', existsSync(join(skillsDir, 'learning-keeper')));
  assert('learning-keeper SKILL.md copied', existsSync(join(skillsDir, 'learning-keeper', 'SKILL.md')));
  assert('architect dir exists', existsSync(join(skillsDir, 'architect')));
  assert('architect SKILL.md copied', existsSync(join(skillsDir, 'architect', 'SKILL.md')));
});

// ════ Test 7: agents-installer ════
describe('agents-installer', () => {
  const result = installAgents(['code-reviewer', 'nonexistent-agent']);
  assert('returns result object', typeof result === 'object');
  assert('installed 1 real agent', result.installed.length === 1);
  assert('code-reviewer installed', result.installed.includes('code-reviewer'));
  assert('skipped nonexistent', result.skipped.length === 1);

  const agentsDir = join(mockHome, '.claude', 'agents');
  assert('code-reviewer dir exists', existsSync(join(agentsDir, 'code-reviewer')));
  assert('code-reviewer AGENT.md copied', existsSync(join(agentsDir, 'code-reviewer', 'AGENT.md')));
});

// ════ Test 8: project-scope install (v0.3.0) ════
describe('project-scope install', () => {
  const projectDir = join(mockHome, 'test-project');
  const projectSkillsDir = join(projectDir, '.claude', 'skills');
  const projectAgentsDir = join(projectDir, '.claude', 'agents');

  const skillRes = installSkills(['simplify', 'verify'], projectSkillsDir);
  assert('installs to project skills dir', skillRes.installed.length === 2);
  assert('simplify in project scope', existsSync(join(projectSkillsDir, 'simplify', 'SKILL.md')));
  assert('verify in project scope', existsSync(join(projectSkillsDir, 'verify', 'SKILL.md')));

  const agentRes = installAgents(['researcher'], projectAgentsDir);
  assert('agents install to project scope', agentRes.installed.length === 1);
  assert('researcher in project scope', existsSync(join(projectAgentsDir, 'researcher', 'AGENT.md')));

  // User-scope NOT affected by project-scope install
  const userSkillsDir = join(mockHome, '.claude', 'skills');
  assert('user-scope skills/simplify not created by project install', !existsSync(join(userSkillsDir, 'simplify')));
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
