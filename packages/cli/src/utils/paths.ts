// Cross-platform path utilities

import { homedir, platform } from 'node:os';
import { join } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';

export const HOME = homedir();
export const CLAUDE_DIR = join(HOME, '.claude');
export const KNOWLEDGE_DIR = join(CLAUDE_DIR, 'knowledge');
export const SKILLS_DIR = join(CLAUDE_DIR, 'skills');
export const AGENTS_DIR = join(CLAUDE_DIR, 'agents');
export const SETTINGS_FILE = join(CLAUDE_DIR, 'settings.json');

// Pool: single source of truth for all skill/agent templates.
// Skills/agents in user-scope + projects are symlinks (or junctions/copies on Windows)
// pointing here. Updates to a skill propagate to every project automatically.
// One copy on disk, many references.
export const SKILLS_POOL_DIR = join(CLAUDE_DIR, 'skills-pool');
export const AGENTS_POOL_DIR = join(CLAUDE_DIR, 'agents-pool');

export const IS_WINDOWS = platform() === 'win32';

export function ensureDir(path: string): void {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

export function knowledgeFile(name: string): string {
  return join(KNOWLEDGE_DIR, name);
}

export function isPathSafe(p: string): boolean {
  // Disallow absolute paths outside home or root drives
  if (p.includes('..')) return false;
  if (!p.startsWith(HOME) && !p.startsWith('/Users') && !p.startsWith('/home') && !p.startsWith('/Volumes')) {
    return false;
  }
  return true;
}

export function expandHome(p: string): string {
  if (p.startsWith('~/')) return join(HOME, p.slice(2));
  if (p === '~') return HOME;
  return p;
}
