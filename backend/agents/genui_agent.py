"""Agent behind every /generative-ui/components/* route.

https://docs.copilotkit.ai/agno/generative-ui/components

The Components and surfaces pages publish no Agno agent. Their runtime is a
TanStack `BuiltInAgent` factory (shown on the overview route, not run), and
the pages only require that the agent hand the run's tools and context to its
model. Agno's stock AG-UI router already does both:

- `render_ui` arrives in the run's `tools` and becomes a client tool
  (`parse_client_tools`), so the model can call it and the browser draws it;
- the catalog guide arrives as AG-UI `context`, which the router turns into
  run dependencies and adds to the prompt (`add_dependencies_to_context`).

So this agent has no tools of its own. Repo-authored: the module, the model
choice and the `db` (frontend-tool resume through the stock router needs one;
see AGENTS.md). The one instruction is the page's own system prompt from its
TanStack sample. Mounted at `/genui` and `/genui-shop` by `main.py`.
"""

from __future__ import annotations

from agno.agent import Agent
from agno.db.sqlite import SqliteDb
from agno.models.openai import OpenAIChat

# region agent
agent = Agent(
    model=OpenAIChat(id="gpt-4o", timeout=120),
    db=SqliteDb(db_file="tmp/agno.db"),
    # The page's own prompt (its TanStack factory's first system prompt).
    instructions=(
        "You are a helpful assistant. When a visual answer helps, render it "
        "with generative UI."
    ),
)

# A second, identical agent for the Transports page's `agentIds: ["shop"]`
# sample, so its demo has one agent inside that list and one outside it.
shop_agent = Agent(
    model=OpenAIChat(id="gpt-4o", timeout=120),
    db=SqliteDb(db_file="tmp/agno.db"),
    instructions=(
        "You are a helpful assistant. When a visual answer helps, render it "
        "with generative UI."
    ),
)
# endregion
