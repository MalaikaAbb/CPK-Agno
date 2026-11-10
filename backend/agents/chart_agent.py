"""Agent behind /generative-ui/tool-based.

https://docs.copilotkit.ai/agno/generative-ui/tool-based

Both of the page's `src/agents/chart_agent.py` snippets, verbatim, in the
order a module needs them (step 2's `db` before step 1's `Agent(...)`, which
reads it). Mounted at `/gen-ui-tool-based` by `main.py`.

Not published on the page, and filled in here:

- `SYSTEM_PROMPT` — step 1 passes `instructions=SYSTEM_PROMPT` and never
  defines it. The prompt below is borrowed from the ms-agent-framework-py
  harness's version of this same page (that framework's page publishes one);
  it is not Agno doc code.
- `render_pie_chart` — the page's frontend registers two components
  (`render_bar_chart`, `render_pie_chart`) but its backend declares only the
  bar chart. Left as published: no pie-chart stub is added.
"""

# region borrowed-system-prompt
# Borrowed from ms-agent-framework-py (backend/doc_agents/chart_agent.py),
# not from the Agno doc page, which never defines SYSTEM_PROMPT.
SYSTEM_PROMPT = """
You are a data visualization assistant.

When the user asks for a chart, call `render_bar_chart` with a concise
title and a `data` array of `{label, value}` items.
"""
# endregion

# region doc-step-2
from agno.db.sqlite import SqliteDb

db = SqliteDb(db_file="tmp/agno.db")
# endregion

# region doc-step-1
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools import tool


@tool(external_execution=True)
def render_bar_chart(title: str, data: list[dict]):
    """
    Render a bar chart in the chat.

    Call this whenever the user asks for a chart or a comparison.

    Args:
        title (str): A concise chart title.
        data (list[dict]): Items shaped `{label, value}`.
    """


agent = Agent(
    model=OpenAIChat(id="gpt-6-luna"),
    db=db,
    tools=[render_bar_chart],
    instructions=SYSTEM_PROMPT,
)
# endregion
