import dotenv from "dotenv"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { Anthropic } from '@anthropic-ai/sdk';
import { z } from "zod"
import fs from 'fs/promises'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, 'local.env') })

const server = new McpServer({
  name: "xcommit",
  version: "1.0.0"
})

server.tool(
  "describe_tools",
  {},
  async (args, extra) => {
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          describe_tools: {
            description: "Describe all available MCP tools and their usage.",
            example: {}
          },
          xcommit: {
            description: "Analyze a conversation and produce ready-to-share tweets.",
            example: { summary: "In depth summary of the conversation for tweet production." }
          }
        })
      }]
    }
  }
)

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_KEY
});

server.tool(
  "xcommit",
  {
    summary: z.string()
  },
  async (args, extra) => {
    const { summary } = args;
    const blueprintPath = path.resolve(__dirname, 'blueprint.txt');
    const blueprint = await fs.readFile(blueprintPath, 'utf8');
    const msg = await anthropic.messages.create({
      model: 'claude-opus-4-20250514',
      max_tokens: 8192,
      messages: [{ role: "user", content: blueprint + summary }],
    });
    if (msg.content[0].type === 'text') {
      return {
        content: [{
          type: "text" as const,
          text: msg.content[0].text
        }]
      }
    }
    return {
      content: [{
        type: "text" as const,
        text: "No text content returned from Anthropic."
      }]
    }
  }
)

async function main(): Promise<void> {
  const transport = new StdioServerTransport()
  try {
    await server.connect(transport)
  } catch (error) {
    console.error("Failed to connect MCP Server:", error)
    throw error
  }
}

void main().catch((error: unknown) => {
  console.error("Fatal error:", error)
  process.exit(1)
}) 