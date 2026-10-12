"""⚠ REPO-AUTHORED — not from the CopilotKit docs.

Agent behind /generative-ui/open-generative-ui.

https://docs.copilotkit.ai/agno/generative-ui/open-generative-ui

The page's demo Code tab publishes the runtime route (`copilotkit-ogui`) and
both frontends, and the published `agent_server.py` imports
`from agents.open_gen_ui_agent import agent` and mounts it at
`/open-gen-ui/agui`. The module itself is never published. All the server
says about it is: "No-tools agent for the Open Generative UI cells. The
runtime's `openGenerativeUI` middleware injects the `generateSandboxedUi`
tool the LLM uses to author HTML+CSS for the sandboxed iframe."

So this is a no-tools agent and nothing more. Its shape — model, timeout,
empty `tools` — copies the one published no-tools agent in the same server,
`mcp_apps_agent.py`. The description is ours, and says only what the server
comment says. The design guidance the model works from reaches it from the
browser, as `openGenerativeUI.designSkill` context on the minimal demo.
"""

from agno.agent.agent import Agent
from agno.models.openai import OpenAIChat
from dotenv import load_dotenv
from agno.agent import Agent
from agno.db.sqlite import SqliteDb
db = SqliteDb(db_file="tmp/agno.db")

load_dotenv()


agent = Agent(
    model=OpenAIChat(id="gpt-4o", timeout=120),
    db=db,
    tools=[],
    description=(
        "You are a helpful assistant. The host runtime injects a "
        "`generateSandboxedUi` tool at request time; use it to build the "
        "interface the user asks for."
    ),
)
