"""Code printed on /generative-ui/tool-based, nothing else.

https://docs.copilotkit.ai/agno/generative-ui/tool-based

Both of the page's `src/agents/chart_agent.py` snippets, verbatim, in the
order a module needs them (step 2's `db` before step 1's `Agent(...)`, which
reads it).

Gaps left as published (route is broken):

- `SYSTEM_PROMPT` — step 1 passes `instructions=SYSTEM_PROMPT` and the page
  never defines it, so importing this module raises `NameError`. It is not
  filled in, and for that reason `main.py` does not import or mount this
  agent (an import error would take the whole backend down).
- `render_pie_chart` — the page's frontend registers two components
  (`render_bar_chart`, `render_pie_chart`) but its backend declares only the
  bar chart. No pie-chart stub is added.
"""

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
