// Write MCP configuration — TWO outputs:
//   1) ~/.claude.json mcpServers section (real Claude Code MCP config with command+args+env)
//   2) ~/.claude/mcp-tracking.json (ai-bootstrap metadata: which MCPs were selected, what credentials are needed)
//
// Credentials are NOT collected during install — env vars use ${VAR_NAME} placeholders that
// Claude Code resolves at runtime from the user's shell environment.
// User runs: ai-bootstrap mcp credentials — to fill in .env file interactively later.

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { CLAUDE_DIR, HOME, ensureDir } from '../utils/paths.js';
import { MCP_CATALOG, getMcpEntry } from './mcp-catalog.js';

interface McpServerStdioConfig {
  command: string;
  args: string[];
  env?: Record<string, string>;
}

interface McpServerHttpConfig {
  serverUrl: string;
  oauth?: { clientId: string; clientSecret: string };
}

type McpServerConfig = McpServerStdioConfig | McpServerHttpConfig;

interface ClaudeJson {
  mcpServers?: Record<string, McpServerConfig>;
  [key: string]: unknown;
}

interface McpTrackingEntry {
  id: string;
  enabled: boolean;
  needs_credential: boolean;
  credential_keys: string[];
  credential_help?: string;
  configured_at: string;
}

interface McpTrackingFile {
  version: '1.0';
  servers: McpTrackingEntry[];
}

export interface McpWriteResult {
  claudeJsonPath: string;
  trackingPath: string;
  installed: string[];
  skipped: string[];
  missingFromCatalog: string[];
  credentialsRequired: { id: string; keys: string[]; help?: string }[];
}

const CLAUDE_JSON_PATH = join(HOME, '.claude.json');

function readClaudeJson(): ClaudeJson {
  if (!existsSync(CLAUDE_JSON_PATH)) return {};
  try {
    return JSON.parse(readFileSync(CLAUDE_JSON_PATH, 'utf-8')) as ClaudeJson;
  } catch {
    return {};
  }
}

function readTracking(path: string): McpTrackingFile {
  if (!existsSync(path)) return { version: '1.0', servers: [] };
  try {
    return JSON.parse(readFileSync(path, 'utf-8')) as McpTrackingFile;
  } catch {
    return { version: '1.0', servers: [] };
  }
}

export function writeMcpConfig(selectedMcps: string[]): McpWriteResult {
  ensureDir(CLAUDE_DIR);
  const trackingPath = join(CLAUDE_DIR, 'mcp-tracking.json');
  const today = new Date().toISOString();

  const claudeJson = readClaudeJson();
  claudeJson.mcpServers = claudeJson.mcpServers ?? {};

  const tracking = readTracking(trackingPath);
  const existingTrackingIds = new Set(tracking.servers.map((s) => s.id));

  const installed: string[] = [];
  const skipped: string[] = [];
  const missingFromCatalog: string[] = [];
  const credentialsRequired: McpWriteResult['credentialsRequired'] = [];

  for (const id of selectedMcps) {
    const entry = getMcpEntry(id);

    if (!entry) {
      missingFromCatalog.push(id);
      continue;
    }

    if (claudeJson.mcpServers[id]) {
      skipped.push(id);
      continue;
    }

    let serverConfig: McpServerConfig;
    if (entry.transport === 'http' && entry.serverUrl) {
      const httpCfg: McpServerHttpConfig = { serverUrl: entry.serverUrl };
      if (entry.oauth) {
        httpCfg.oauth = {
          clientId: `\${${entry.oauth.clientIdEnv}}`,
          clientSecret: `\${${entry.oauth.clientSecretEnv}}`,
        };
      }
      serverConfig = httpCfg;
    } else if (entry.command) {
      const stdioCfg: McpServerStdioConfig = {
        command: entry.command,
        args: entry.args ?? [],
      };
      if (entry.env && Object.keys(entry.env).length > 0) {
        stdioCfg.env = entry.env;
      }
      serverConfig = stdioCfg;
    } else {
      missingFromCatalog.push(id);
      continue;
    }
    claudeJson.mcpServers[id] = serverConfig;
    installed.push(id);

    if (entry.credentialKeys.length > 0) {
      credentialsRequired.push({
        id,
        keys: entry.credentialKeys,
        help: entry.credentialHelp,
      });
    }

    if (!existingTrackingIds.has(id)) {
      tracking.servers.push({
        id,
        enabled: true,
        needs_credential: entry.credentialKeys.length > 0,
        credential_keys: entry.credentialKeys,
        credential_help: entry.credentialHelp,
        configured_at: today,
      });
    }
  }

  writeFileSync(CLAUDE_JSON_PATH, JSON.stringify(claudeJson, null, 2), 'utf-8');
  writeFileSync(trackingPath, JSON.stringify(tracking, null, 2), 'utf-8');

  return {
    claudeJsonPath: CLAUDE_JSON_PATH,
    trackingPath,
    installed,
    skipped,
    missingFromCatalog,
    credentialsRequired,
  };
}

export function listInstalledMcps(): McpTrackingEntry[] {
  const trackingPath = join(CLAUDE_DIR, 'mcp-tracking.json');
  return readTracking(trackingPath).servers;
}

export function listAvailableMcps(): { id: string; name: string; category: string; description: string }[] {
  return Object.values(MCP_CATALOG).map((m) => ({
    id: m.id,
    name: m.name,
    category: m.category,
    description: m.description,
  }));
}
