# Security policy

## Supported versions

Only the latest minor release receives security fixes.

| Version | Supported          |
| ------- | ------------------ |
| 0.2.x   | ✅                 |
| < 0.2   | ❌                 |

## Reporting a vulnerability

**Please do NOT open a public GitHub issue.** Instead use GitHub's private
security advisory flow:

→ [Report a vulnerability](https://github.com/eminazeroglu/ai-bootstrap/security/advisories/new)

What to include:

- ai-bootstrap version
- Node version + OS
- Minimal reproduction
- Impact assessment (read, write, escalation, exposure)
- Suggested fix if you have one

## Response timeline

- **Acknowledgement**: within 72 hours
- **Initial assessment**: within 7 days
- **Fix released**: within 30 days for high/critical; case-by-case for lower severity

If we go silent, escalate by emailing the maintainer via the GitHub profile
([eminazeroglu](https://github.com/eminazeroglu)) and mark the subject with
`[ai-bootstrap SECURITY]`.

## Threat model — what ai-bootstrap touches

ai-bootstrap writes to **only** these locations:

- `~/.claude/` — skills, agents, knowledge, settings, CLAUDE.md, mcp-tracking.json
- `~/.claude.json` — Claude Code's MCP server configuration
- `~/.ai-bootstrap.env` — MCP credentials (chmod 600, never tracked by backup)

It **does not**:

- Modify your shell startup files (.zshrc, .bashrc) — credential loading is
  documented but never auto-installed
- Touch any path outside `~/` without explicit user input
- Send any data anywhere by default (telemetry is strict opt-in + requires
  user-set endpoint env var; see `packages/cli/src/utils/telemetry.ts`)
- Store git tokens, NPM tokens, or any vendor API key inside the package

## Credential handling

- MCP credentials live in `~/.ai-bootstrap.env` with `chmod 600`
- The file format uses `KEY=value` lines; secret keys (`*TOKEN*`, `*KEY*`,
  `*SECRET*`, `*PASSWORD*`) are detected by name and prompted with masked input
- Credentials are referenced from `~/.claude.json` via `${VAR}` placeholders —
  they are not embedded into the JSON itself
- The backup `.gitignore` excludes `mcp-tracking.json` and similar files; the
  `~/.ai-bootstrap.env` file lives OUTSIDE `~/.claude/` and is never tracked

## Known considerations

- **Subprocess execution**: skill/agent installation copies template files;
  no template content is executed at install time
- **`mcp-server-time` / `mcp-server-filesystem`**: scoped to user-specified
  paths; review args before adding broad filesystem access
- **Docker-based MCPs** (e.g. `kubernetes`): pull official images by digest if
  paranoid; the catalog uses `:latest` for convenience but you can pin

## Out of scope

- Vulnerabilities in MCP server packages themselves — report to those projects
- Vulnerabilities in Claude Code — report to Anthropic
- Issues that require attacker access to a logged-in user's machine

Thank you for helping keep ai-bootstrap users safe.
