// Project folder scanner

import { readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import type { ProjectInfo, ProjectType } from '../types.js';
import { expandHome } from './paths.js';

/**
 * Scan a folder for projects.
 * A "project" is a subfolder containing CLAUDE.md, package.json, or .git.
 */
export function scanFolder(folderPath: string): ProjectInfo[] {
  const expanded = expandHome(folderPath);
  if (!existsSync(expanded)) {
    return [];
  }

  const projects: ProjectInfo[] = [];
  let entries: string[];
  try {
    entries = readdirSync(expanded);
  } catch {
    return [];
  }

  for (const entry of entries) {
    const fullPath = join(expanded, entry);
    try {
      const stat = statSync(fullPath);
      if (!stat.isDirectory()) continue;
      if (entry.startsWith('.')) continue;
      if (entry === 'node_modules') continue;

      const info = inspectFolder(fullPath, entry, stat.mtime);
      if (info) {
        projects.push(info);
      }
    } catch {
      continue;
    }
  }

  // Sort by most recently modified
  return projects.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());
}

/**
 * Inspect a single folder, returning ProjectInfo if it looks like a project.
 */
function inspectFolder(path: string, name: string, mtime: Date): ProjectInfo | null {
  const hasClaudeMd = existsSync(join(path, 'CLAUDE.md'));
  const hasPackageJson = existsSync(join(path, 'package.json'));
  const hasGit = existsSync(join(path, '.git'));
  const hasDocsFolder = existsSync(join(path, 'docs'));

  // Skip if doesn't look like a project
  if (!hasClaudeMd && !hasPackageJson && !hasGit) {
    return null;
  }

  const type = detectProjectType(path, name, hasClaudeMd, hasPackageJson);

  return {
    name,
    path,
    type,
    hasClaudeMd,
    hasDocsFolder,
    lastModified: mtime,
  };
}

/**
 * Detect project type from folder structure and contents.
 */
function detectProjectType(
  path: string,
  name: string,
  hasClaudeMd: boolean,
  hasPackageJson: boolean,
): ProjectType {
  // AI Studio: has services/ folder (polyglot pattern)
  if (existsSync(join(path, 'services'))) {
    return 'ai-studio';
  }

  // Brand site: Astro
  if (existsSync(join(path, 'astro.config.mjs')) || existsSync(join(path, 'astro.config.ts'))) {
    return 'brand-site';
  }

  // SaaS: monorepo with apps/ + packages/
  if (existsSync(join(path, 'apps')) && existsSync(join(path, 'packages'))) {
    // Check for AI markers (pgvector, embeddings, RAG)
    const hasAiMarkers =
      existsSync(join(path, 'apps', 'api')) &&
      (existsSync(join(path, 'packages', 'embeddings')) ||
        name.toLowerCase().includes('ai'));
    return hasAiMarkers ? 'saas-ai-pro' : 'saas-fullstack-pro';
  }

  // Data platform: has memory/ folder + ETL focus
  if (existsSync(join(path, 'memory')) || existsSync(join(path, 'etl'))) {
    return 'data-platform';
  }

  // Social ops: content-management folder structure
  if (
    existsSync(join(path, 'platforms')) ||
    (existsSync(join(path, 'projects')) && existsSync(join(path, 'docs', 'journal')))
  ) {
    return 'social-ops';
  }

  return 'unknown';
}

/**
 * Parse comma-separated folder paths from user input.
 * Example: "~/MyJobs, ~/Projects" → ["/Users/.../MyJobs", "/Users/.../Projects"]
 */
export function parseFolderList(input: string): string[] {
  return input
    .split(',')
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    .map(expandHome);
}
