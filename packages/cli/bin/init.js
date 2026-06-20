#!/usr/bin/env node
// ai-bootstrap CLI entry point
// Compiled TypeScript runs via tsx in dev, or dist/ in production

import { main } from '../dist/index.js';

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
