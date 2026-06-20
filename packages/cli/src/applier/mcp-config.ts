// Write MCP configuration to ~/.claude/mcp.json
// Credentials NOT collected here (privacy + secrets handled separately by user)
// User runs: ai-bootstrap mcp configure <id> — to add credentials interactively later

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { CLAUDE_DIR } from '../utils/paths.js';

interface McpEntry {
  id: string;
  enabled: boolean;
  needs_credential: boolean;
  configured_at: string;
}

interface McpFile {
  version: '1.0';
  servers: McpEntry[];
}

const MCPS_REQUIRING_CREDENTIAL = new Set([
  'github',
  'slack',
  'telegram',
  'discord',
  'postgres',
  'supabase',
  'mongodb',
  'vercel',
  'cloudflare',
  'stripe',
  'meta',
  'youtube',
  'linkedin',
  'openai',
  'elevenlabs',
  'replicate',
  'notion',
  'linear',
  'firecrawl',
  'ga4',
  'sentry',
]);

export function writeMcpConfig(selectedMcps: string[]): string {
  const path = join(CLAUDE_DIR, 'mcp.json');
  const today = new Date().toISOString();

  // Merge with existing if present (don't overwrite user customizations)
  let existing: McpFile = { version: '1.0', servers: [] };
  if (existsSync(path)) {
    try {
      const raw = readFileSync(path, 'utf-8');
      existing = JSON.parse(raw) as McpFile;
    } catch {
      // Corrupt file, replace
    }
  }

  const existingIds = new Set(existing.servers.map((s) => s.id));

  for (const id of selectedMcps) {
    if (existingIds.has(id)) continue;
    existing.servers.push({
      id,
      enabled: true,
      needs_credential: MCPS_REQUIRING_CREDENTIAL.has(id),
      configured_at: today,
    });
  }

  writeFileSync(path, JSON.stringify(existing, null, 2), 'utf-8');
  return path;
}
