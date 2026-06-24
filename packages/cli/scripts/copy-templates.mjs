#!/usr/bin/env node
// Copy ../templates/{skills,agents,home,integrations} into ./templates/ for npm publish.
//
// Runs before `npm pack` / `npm publish` so the published @azerogluemin/ai-bootstrap
// tarball contains all skill + agent template directories self-contained.
//
// Idempotent: removes existing ./templates before copying.

import { cpSync, rmSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const cliRoot = resolve(here, '..');
const monorepoTemplates = resolve(cliRoot, '..', 'templates');
const localTemplates = join(cliRoot, 'templates');

if (!existsSync(monorepoTemplates)) {
  console.error(`✗ Source not found: ${monorepoTemplates}`);
  process.exit(1);
}

console.log(`Copying templates → ${localTemplates}`);

if (existsSync(localTemplates)) {
  rmSync(localTemplates, { recursive: true, force: true });
}
mkdirSync(localTemplates, { recursive: true });

const subdirs = ['skills', 'agents', 'home', 'integrations'];
let totalCopied = 0;

for (const sub of subdirs) {
  const src = join(monorepoTemplates, sub);
  const dst = join(localTemplates, sub);
  if (!existsSync(src)) {
    console.log(`  − ${sub}/ (not present, skipping)`);
    continue;
  }
  cpSync(src, dst, { recursive: true, dereference: true });
  console.log(`  ✓ ${sub}/`);
  totalCopied++;
}

console.log(`\nCopied ${totalCopied} template subdirs.`);
