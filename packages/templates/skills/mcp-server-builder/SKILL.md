---
name: mcp-server-builder
description: MCP (Model Context Protocol) server builder. Designs + implements MCP servers per Anthropic spec — tools, resources, prompts. Activates on requests to build MCP server, integrate API with Claude, expose internal API as MCP, MCP standards.
---

# MCP Server Builder

You build MCP servers — the bridge between LLMs and external systems. Anthropic's official protocol, evolving fast in 2026.

## When to activate
AZ: "MCP server quraq", "Claude-a API qoş", "MCP tool yarat"
EN: "MCP server", "Model Context Protocol", "expose API to Claude", "MCP integration"

## MCP basics

MCP servers expose 3 capabilities:
- **Tools** — actions (write file, send email)
- **Resources** — data (file contents, DB rows)
- **Prompts** — reusable templates

Built on JSON-RPC 2.0 over stdio or HTTP.

## Server structure (TypeScript)

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server(
  { name: 'my-mcp-server', version: '1.0.0' },
  { capabilities: { tools: {}, resources: {}, prompts: {} } },
);

// Register tools
server.setRequestHandler(/* ListToolsRequestSchema */, async () => ({
  tools: [
    {
      name: 'send_email',
      description: 'Send email via SMTP',
      inputSchema: {
        type: 'object',
        properties: {
          to: { type: 'string' },
          subject: { type: 'string' },
          body: { type: 'string' },
        },
        required: ['to', 'subject', 'body'],
      },
    },
  ],
}));

server.setRequestHandler(/* CallToolRequestSchema */, async (req) => {
  if (req.params.name === 'send_email') {
    // implementation
    return { content: [{ type: 'text', text: 'Email sent' }] };
  }
});

await server.connect(new StdioServerTransport());
```

## Tool design principles

### Atomic
One tool = one action. Not "manage_user" but `create_user`, `update_user`, `delete_user`.

### Idempotent where possible
`set_status` better than `toggle_status`.

### Clear schema
```json
{
  "name": "create_issue",
  "description": "Create a Linear issue",
  "inputSchema": {
    "type": "object",
    "properties": {
      "team": { "type": "string", "description": "Team identifier" },
      "title": { "type": "string", "maxLength": 200 },
      "description": { "type": "string" },
      "priority": { "type": "integer", "minimum": 0, "maximum": 4 }
    },
    "required": ["team", "title"]
  }
}
```

### Error responses
```json
{
  "isError": true,
  "content": [{ "type": "text", "text": "Team 'X' not found" }]
}
```

## Resource design

Resources = read-only data. URI-based addressing:

```
resource://github/repos/{owner}/{repo}/issues
resource://supabase/tables/{table}/rows?limit=100
```

Server returns:
```json
{
  "contents": [
    { "uri": "...", "mimeType": "application/json", "text": "..." }
  ]
}
```

## Prompt design

Reusable templates:
```json
{
  "name": "summarize_pr",
  "description": "Summarize a PR by ID",
  "arguments": [
    { "name": "pr_id", "required": true }
  ]
}
```

## Transport: stdio vs HTTP

| Transport | Use case |
|---|---|
| **stdio** | Local CLI, Claude Desktop config |
| **HTTP (SSE)** | Remote, multi-user, cloud |

stdio = simpler. HTTP = scalable.

## Distribution

### As npm package
```json
{
  "name": "@org/mcp-my-server",
  "bin": "./dist/index.js",
  "files": ["dist/"]
}
```

User config:
```json
{
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["@org/mcp-my-server"]
    }
  }
}
```

### As Docker image
For HTTP transport, deploy to Vercel/Cloudflare Workers/Fly.io.

## Authentication patterns

| Method | When |
|---|---|
| Env vars | Local stdio |
| OAuth 2.0 | Multi-user HTTP |
| API keys | Service-to-service |
| Bearer tokens | HTTP with user identity |

## Anti-patterns

- ❌ Tool that does 10 things ("manage_x")
- ❌ Missing input validation (LLM passes garbage)
- ❌ No error messages (LLM doesn't know what failed)
- ❌ Sync I/O blocking event loop
- ❌ Logging sensitive data
- ❌ Hard-coding paths (not portable)

## Testing

```bash
# Inspector mode (Anthropic tool)
npx @modelcontextprotocol/inspector node dist/index.js

# Direct via Claude Desktop config
```

## Output format

```markdown
## MCP Server spec — <name>

### Tools (N)
| Name | Action | Required params |

### Resources (M)
| URI pattern | Returns |

### Prompts (K)
| Name | Purpose |

### Transport
<stdio / HTTP>

### Distribution
<npm / Docker / direct>

### Auth
<approach>

### Implementation order
1. Stdio MVP
2. Tool A, B, C
3. Resource expose
4. HTTP transport (if needed)
5. Auth + production hardening
```

## Integration
- `architect` for system context
- `doc-writer` for MCP documentation
- `test-writer` for MCP testing

Version: 1.0.0 (Mərhələ C-10, 2026-06-20)
