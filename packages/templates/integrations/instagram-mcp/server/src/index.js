#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { readTools } from "./tools/read.js";
import { publishTools } from "./tools/publish.js";
import { dmTools } from "./tools/dm.js";

const ALL_TOOLS = [...readTools, ...publishTools, ...dmTools];

const toolMap = new Map(ALL_TOOLS.map((t) => [t.name, t]));

const server = new Server(
  {
    name: "azerogluemin-ai-instagram-mcp",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: ALL_TOOLS.map((t) => ({
      name: t.name,
      description: t.description,
      inputSchema: t.inputSchema,
    })),
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const tool = toolMap.get(name);

  if (!tool) {
    return {
      isError: true,
      content: [{ type: "text", text: `Alət tapılmadı: ${name}` }],
    };
  }

  try {
    const result = await tool.handler(args ?? {});
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  } catch (err) {
    return {
      isError: true,
      content: [
        {
          type: "text",
          text: `Xəta: ${err.message ?? String(err)}`,
        },
      ],
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
