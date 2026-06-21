// ai-bootstrap add / remove / list — manage skills + agents incrementally
//
// Scope auto-detection:
//   - If cwd has CLAUDE.md OR .claude/ → project scope (cwd/.claude/)
//   - Else → user scope (~/.claude/)
//   - --user flag forces user scope
//   - --project flag forces project scope
//
// Add can take individual skill/agent names, or --bundle <name> to merge a whole bundle.
// Auto-detects skill vs. agent by checking templates.

import chalk from 'chalk';
import { existsSync, readdirSync, statSync, rmSync } from 'node:fs';
import { join, basename } from 'node:path';
import { CLAUDE_DIR, SKILLS_DIR, AGENTS_DIR } from '../utils/paths.js';
import { installSkills } from '../applier/skills-installer.js';
import { installAgents } from '../applier/agents-installer.js';
import { resolvePlan, SKILL_BUNDLES, AGENT_BUNDLES } from '../applier/bundle-definitions.js';

interface ScopeContext {
  scope: 'user' | 'project';
  skillsDir: string;
  agentsDir: string;
  label: string;
}

function detectScope(argv: string[]): ScopeContext {
  const forceUser = argv.includes('--user');
  const forceProject = argv.includes('--project');

  if (forceUser) {
    return {
      scope: 'user',
      skillsDir: SKILLS_DIR,
      agentsDir: AGENTS_DIR,
      label: '~/.claude/ (user scope, all projects)',
    };
  }

  if (forceProject) {
    const cwd = process.cwd();
    return {
      scope: 'project',
      skillsDir: join(cwd, '.claude', 'skills'),
      agentsDir: join(cwd, '.claude', 'agents'),
      label: `${cwd}/.claude/ (project scope, ONLY this folder)`,
    };
  }

  const cwd = process.cwd();
  const hasProjectClaudeMd = existsSync(join(cwd, 'CLAUDE.md'));
  const hasProjectClaudeDir = existsSync(join(cwd, '.claude'));

  if (hasProjectClaudeMd || hasProjectClaudeDir) {
    return {
      scope: 'project',
      skillsDir: join(cwd, '.claude', 'skills'),
      agentsDir: join(cwd, '.claude', 'agents'),
      label: `${cwd}/.claude/ (auto-detected project)`,
    };
  }

  return {
    scope: 'user',
    skillsDir: SKILLS_DIR,
    agentsDir: AGENTS_DIR,
    label: '~/.claude/ (user scope — no project detected)',
  };
}

function getTemplatesSkillsList(): Set<string> {
  // Same lookup as skills-installer; lazy-checked via SKILL_BUNDLES union
  const all = new Set<string>();
  for (const list of Object.values(SKILL_BUNDLES)) {
    for (const s of list) all.add(s);
  }
  return all;
}

function getTemplatesAgentsList(): Set<string> {
  const all = new Set<string>();
  for (const list of Object.values(AGENT_BUNDLES)) {
    for (const a of list) all.add(a);
  }
  return all;
}

function classify(names: string[]): { skills: string[]; agents: string[]; unknown: string[] } {
  const knownSkills = getTemplatesSkillsList();
  const knownAgents = getTemplatesAgentsList();
  const skills: string[] = [];
  const agents: string[] = [];
  const unknown: string[] = [];
  for (const n of names) {
    if (knownSkills.has(n) && knownAgents.has(n)) {
      // Both — install both (rare but possible if there's name overlap)
      skills.push(n);
      agents.push(n);
    } else if (knownSkills.has(n)) {
      skills.push(n);
    } else if (knownAgents.has(n)) {
      agents.push(n);
    } else {
      unknown.push(n);
    }
  }
  return { skills, agents, unknown };
}

function printHelp(action: 'add' | 'remove' | 'list'): void {
  if (action === 'add') {
    console.log(`
${chalk.bold('ai-bootstrap add')} — install additional skills, agents, or bundles

${chalk.bold('Usage:')}
  ${chalk.cyan('ai-bootstrap add <name1> <name2> ...')}      Auto-detects skill vs agent
  ${chalk.cyan('ai-bootstrap add --bundle <name>')}          Merge an entire bundle
  ${chalk.cyan('ai-bootstrap add ... --user')}                Force user scope (~/.claude/)
  ${chalk.cyan('ai-bootstrap add ... --project')}             Force project scope (./.claude/)

${chalk.bold('Default scope:')}
  Project if cwd has CLAUDE.md or .claude/; else user.

${chalk.bold('Examples:')}
  ${chalk.cyan('ai-bootstrap add showrunner character-designer')}     # add 2 skills
  ${chalk.cyan('ai-bootstrap add --bundle creator')}                  # add all 26 creator skills
  ${chalk.cyan('ai-bootstrap add seo-technical seo-content')}         # add 2 SEO agents
`);
  } else if (action === 'remove') {
    console.log(`
${chalk.bold('ai-bootstrap remove')} — uninstall skills or agents

${chalk.bold('Usage:')}
  ${chalk.cyan('ai-bootstrap remove <name1> <name2> ...')}
  ${chalk.cyan('ai-bootstrap remove ... --user')}     Force user scope
  ${chalk.cyan('ai-bootstrap remove ... --project')}   Force project scope

${chalk.bold('Default scope:')}
  Project if cwd has CLAUDE.md or .claude/; else user.
`);
  } else {
    console.log(`
${chalk.bold('ai-bootstrap list')} — list installed skills + agents

${chalk.bold('Usage:')}
  ${chalk.cyan('ai-bootstrap list')}              Auto-detect scope
  ${chalk.cyan('ai-bootstrap list --user')}        Force user scope
  ${chalk.cyan('ai-bootstrap list --project')}     Force project scope
  ${chalk.cyan('ai-bootstrap list --all')}         Both user + current project
`);
  }
}

function listInstalled(skillsDir: string, agentsDir: string): { skills: string[]; agents: string[] } {
  const skills = existsSync(skillsDir)
    ? readdirSync(skillsDir).filter((e) => {
        try {
          return statSync(join(skillsDir, e)).isDirectory();
        } catch {
          return false;
        }
      })
    : [];
  const agents = existsSync(agentsDir)
    ? readdirSync(agentsDir).filter((e) => {
        try {
          return statSync(join(agentsDir, e)).isDirectory();
        } catch {
          return false;
        }
      })
    : [];
  return { skills, agents };
}

export async function runAddCommand(args: string[]): Promise<void> {
  if (args.length === 0 || args[0] === 'help' || args[0] === '--help' || args[0] === '-h') {
    printHelp('add');
    return;
  }

  const ctx = detectScope(args);

  let names: string[];
  const bundleIdx = args.indexOf('--bundle');
  if (bundleIdx >= 0) {
    const bundleName = args[bundleIdx + 1];
    if (!bundleName || !(bundleName in SKILL_BUNDLES)) {
      console.error(chalk.red(`✗ Naməlum bundle: ${bundleName}. Bundle adları: ${Object.keys(SKILL_BUNDLES).join(', ')}`));
      process.exit(1);
    }
    const plan = resolvePlan(bundleName, bundleName);
    names = [...new Set([...plan.skills, ...plan.agents])];
    console.log(chalk.bold(`\nai-bootstrap add --bundle ${bundleName}\n`));
    console.log(chalk.dim(`  Scope: ${ctx.label}`));
    console.log(chalk.dim(`  Plan:  ${plan.skills.length} skills + ${plan.agents.length} agents (overlap dedupe)\n`));
  } else {
    names = args.filter((a) => !a.startsWith('--'));
    if (names.length === 0) {
      console.error(chalk.red('✗ Heç bir ad verilmədi. İstifadə: ai-bootstrap add <name1> <name2> ...'));
      process.exit(1);
    }
    console.log(chalk.bold(`\nai-bootstrap add (${names.length})\n`));
    console.log(chalk.dim(`  Scope: ${ctx.label}\n`));
  }

  const cls = classify(names);

  if (cls.unknown.length > 0) {
    console.log(chalk.yellow(`  ⚠ Naməlum: ${cls.unknown.join(', ')}`));
    console.log(chalk.dim('    (catalog-da yoxdur — yoxla: ai-bootstrap list --all yaxud ad düzgündürmü?)\n'));
  }

  if (cls.skills.length > 0) {
    console.log(chalk.dim(`  Skills (${cls.skills.length})...`));
    const r = installSkills(cls.skills, ctx.skillsDir);
    console.log(
      `  ${chalk.green('✓')} ${r.installed.length} installed` +
        (r.skipped.length > 0 ? `, ${chalk.dim(r.skipped.length + ' skipped')}` : '') +
        (r.errors.length > 0 ? `, ${chalk.red(r.errors.length + ' errors')}` : ''),
    );
  }

  if (cls.agents.length > 0) {
    console.log(chalk.dim(`  Agents (${cls.agents.length})...`));
    const r = installAgents(cls.agents, ctx.agentsDir);
    console.log(
      `  ${chalk.green('✓')} ${r.installed.length} installed` +
        (r.skipped.length > 0 ? `, ${chalk.dim(r.skipped.length + ' skipped')}` : '') +
        (r.errors.length > 0 ? `, ${chalk.red(r.errors.length + ' errors')}` : ''),
    );
  }

  console.log('');
}

export function runRemoveCommand(args: string[]): void {
  if (args.length === 0 || args[0] === 'help' || args[0] === '--help' || args[0] === '-h') {
    printHelp('remove');
    return;
  }

  const ctx = detectScope(args);
  const names = args.filter((a) => !a.startsWith('--'));

  if (names.length === 0) {
    console.error(chalk.red('✗ Heç bir ad verilmədi.'));
    process.exit(1);
  }

  console.log(chalk.bold(`\nai-bootstrap remove (${names.length})\n`));
  console.log(chalk.dim(`  Scope: ${ctx.label}\n`));

  let removed = 0;
  let notFound = 0;
  for (const name of names) {
    const skillPath = join(ctx.skillsDir, name);
    const agentPath = join(ctx.agentsDir, name);
    let didRemove = false;

    if (existsSync(skillPath)) {
      try {
        rmSync(skillPath, { recursive: true, force: true });
        console.log(`  ${chalk.green('✓')} skill: ${name}`);
        removed++;
        didRemove = true;
      } catch (err) {
        console.log(`  ${chalk.red('✗')} skill: ${name} — ${err instanceof Error ? err.message : err}`);
      }
    }

    if (existsSync(agentPath)) {
      try {
        rmSync(agentPath, { recursive: true, force: true });
        console.log(`  ${chalk.green('✓')} agent: ${name}`);
        removed++;
        didRemove = true;
      } catch (err) {
        console.log(`  ${chalk.red('✗')} agent: ${name} — ${err instanceof Error ? err.message : err}`);
      }
    }

    if (!didRemove) {
      console.log(`  ${chalk.dim('−')} ${name} — yoxdur bu scope-da`);
      notFound++;
    }
  }

  console.log(chalk.dim(`\n  ${removed} removed, ${notFound} not found\n`));
}

export function runListCommand(args: string[]): void {
  if (args[0] === 'help' || args[0] === '--help' || args[0] === '-h') {
    printHelp('list');
    return;
  }

  const showAll = args.includes('--all');

  if (showAll) {
    console.log(chalk.bold('\nUser scope (~/.claude/)\n'));
    const user = listInstalled(SKILLS_DIR, AGENTS_DIR);
    printList(user);

    const cwd = process.cwd();
    if (existsSync(join(cwd, 'CLAUDE.md')) || existsSync(join(cwd, '.claude'))) {
      console.log(chalk.bold(`\nProject scope (${cwd}/.claude/)\n`));
      const proj = listInstalled(join(cwd, '.claude', 'skills'), join(cwd, '.claude', 'agents'));
      printList(proj);
    }
    return;
  }

  const ctx = detectScope(args);
  console.log(chalk.bold(`\nInstalled — ${ctx.label}\n`));
  printList(listInstalled(ctx.skillsDir, ctx.agentsDir));
}

function printList({ skills, agents }: { skills: string[]; agents: string[] }): void {
  console.log(`  Skills (${skills.length}):`);
  if (skills.length === 0) {
    console.log(chalk.dim('    (none)'));
  } else {
    for (const s of skills.sort()) {
      console.log(`    ${chalk.cyan('•')} ${s}`);
    }
  }
  console.log(`\n  Agents (${agents.length}):`);
  if (agents.length === 0) {
    console.log(chalk.dim('    (none)'));
  } else {
    for (const a of agents.sort()) {
      console.log(`    ${chalk.cyan('•')} ${a}`);
    }
  }
  console.log('');
}
