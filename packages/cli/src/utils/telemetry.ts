// Telemetry — OPT-IN only.
//
// What we collect (if user consents):
//   - ai-bootstrap version
//   - Node version + platform
//   - Anonymous install ID (random UUID generated once)
//   - Event name (install / update / doctor / mcp-list / backup-sync)
//   - Bundle selections (foundation/dev/marketer/etc.) — no PII
//   - MCP IDs selected (no credentials, no usernames)
//
// What we NEVER collect:
//   - User profile data (name, role, country, goals)
//   - Project paths or names
//   - Knowledge file contents
//   - MCP credentials
//   - Anything that identifies the user beyond the random UUID
//
// Storage: ~/.claude/telemetry.json controls opt-in + install ID.
// Endpoint: AI_BOOTSTRAP_TELEMETRY_URL env var (default: disabled).
// If endpoint not set, telemetry is no-op even if user opted in.

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { randomUUID, randomBytes } from 'node:crypto';
import { join } from 'node:path';
import { CLAUDE_DIR, ensureDir } from './paths.js';

const TELEMETRY_FILE = join(CLAUDE_DIR, 'telemetry.json');
const DEFAULT_ENDPOINT_ENV = 'AI_BOOTSTRAP_TELEMETRY_URL';

interface TelemetryConfig {
  version: '1.0';
  enabled: boolean;
  installId: string;
  decidedAt: string;
  events: number;
}

function generateInstallId(): string {
  try {
    return randomUUID();
  } catch {
    return randomBytes(16).toString('hex');
  }
}

function readConfig(): TelemetryConfig | null {
  if (!existsSync(TELEMETRY_FILE)) return null;
  try {
    return JSON.parse(readFileSync(TELEMETRY_FILE, 'utf-8')) as TelemetryConfig;
  } catch {
    return null;
  }
}

function writeConfig(cfg: TelemetryConfig): void {
  ensureDir(CLAUDE_DIR);
  writeFileSync(TELEMETRY_FILE, JSON.stringify(cfg, null, 2), 'utf-8');
}

export function setTelemetryConsent(enabled: boolean): TelemetryConfig {
  const existing = readConfig();
  const cfg: TelemetryConfig = {
    version: '1.0',
    enabled,
    installId: existing?.installId ?? generateInstallId(),
    decidedAt: new Date().toISOString(),
    events: existing?.events ?? 0,
  };
  writeConfig(cfg);
  return cfg;
}

export function getTelemetryStatus(): { configured: boolean; enabled: boolean; installId?: string; events?: number } {
  const cfg = readConfig();
  if (!cfg) return { configured: false, enabled: false };
  return { configured: true, enabled: cfg.enabled, installId: cfg.installId, events: cfg.events };
}

export interface TelemetryEvent {
  event: string;
  properties?: Record<string, string | number | boolean | null>;
}

/**
 * Send a telemetry event — only if user opted in AND endpoint URL is set.
 * Failures are silently ignored (never break the user's CLI).
 * Times out after 2 seconds.
 */
export async function trackEvent(evt: TelemetryEvent): Promise<void> {
  const cfg = readConfig();
  if (!cfg || !cfg.enabled) return;

  const endpoint = process.env[DEFAULT_ENDPOINT_ENV];
  if (!endpoint) return;

  const payload = {
    installId: cfg.installId,
    version: process.env.npm_package_version ?? 'unknown',
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    timestamp: new Date().toISOString(),
    event: evt.event,
    properties: evt.properties ?? {},
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    writeConfig({ ...cfg, events: cfg.events + 1 });
  } catch {
    // Silently ignore — telemetry must never break the CLI
  }
}

export function getEndpointEnvVar(): string {
  return DEFAULT_ENDPOINT_ENV;
}
