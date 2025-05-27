# xcommit
Analyze and summarize AI conversations and run through a blueprint to compose tweets.

# blueprint

Check `blueprint.txt` and make it yours. It is focused on the indiehacker journey and tries to be authentic. I will tweak it myself some more for sure and you should too if you are using it.

# build it

Run `npm run i` and then `npm run build`.

This creates a version of the tool the AI can use. The compiled javascript version.

# Hook it up

Add the server to the MCP configuration in cursor (cursor settings > mcp):

```
{
  "mcpServers": {
    "xcommit": {
      "command": "node",
      "args": ["C:\\Users\\USERNAME\\Desktop\\xcommit\\mcp.js"]
    }
  }
}
```

# Cursorrule update (optional)
Add a rule to your cursor rules:

```
When I indicate something (finally) worked, call the MCP tool xcommit and provide it with a summary of the issue and our conversation about it, be sure to include challenges in particular. I am an indiehacker buildinginpublic and I want the people to get insights into the journey.
```

Or call it manually by telling it to use the xcommit mcp tool.

---













Another banger on the indiehacker journey!

Give us a follow!

https://x.com/christhebliss
