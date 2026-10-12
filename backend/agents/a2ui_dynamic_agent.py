"""Agent behind /generative-ui/a2ui/dynamic-schema — prompt only.

https://docs.copilotkit.ai/agno/generative-ui/a2ui/dynamic-schema

The demo Code tab publishes `src/agents/a2ui_dynamic_agent.py` with its own
`generate_a2ui` tool. That tool cannot run here: it imports
`RENDER_A2UI_TOOL_SCHEMA` and `build_a2ui_operations_from_tool_call` from a
`tools` package, and `get_forwarded_headers` from `agents._header_forwarding`,
none of which the docs publish for Agno. The file is kept byte-exact, never
imported, at `backend/docs_verbatim/a2ui_dynamic_agent.py`.

This repo takes the page's default path instead: the frontend passes
`a2ui={{ catalog }}`, which auto-enables A2UI and auto-injects the
`generate_a2ui` tool, so the runtime route carries no `a2ui` block and the
agent only needs a prompt. The stock Agno AG-UI router hands that injected
client tool to the model (`parse_client_tools`).

Below, `SYSTEM_PROMPT` and the `Agent(...)` literal are the published ones,
with `tools=[generate_a2ui]` removed. Nothing else is changed. The prompt
still says the tool "takes a single `context` argument", which describes the
published tool rather than the injected one; it is left as published.
"""

from __future__ import annotations

from agno.agent.agent import Agent
from agno.models.openai import OpenAIChat
from dotenv import load_dotenv

load_dotenv()


SYSTEM_PROMPT = (
    "You are a sales analyst for Vantage Threads, a fictional B2B apparel "
    "company. Answer every business question by calling `generate_a2ui` to "
    "draw a rich visual surface — a sales dashboard, a rep-performance table, "
    "an at-risk-accounts summary, or an account detail view — rather than "
    "replying in plain prose. The registered catalog includes `Card`, "
    "`StatusBadge`, `Metric`, `InfoRow`, `DataTable`, `PrimaryButton`, "
    "`PieChart`, and `BarChart` (in addition to the basic A2UI primitives "
    "`Row`, `Column`, and `Text`). Pick the component that matches the shape "
    "of the answer: `Metric` tiles for KPIs, `DataTable` for per-rep or "
    "per-deal rankings, `InfoRow` for a stack of account facts, `StatusBadge` "
    "for risk severity, `PieChart` for part-of-whole breakdowns (revenue by "
    "region, revenue by product line), and `BarChart` for comparisons across "
    "categories or time (monthly revenue, quota attainment by rep). Never ask "
    "the user which chart they want. `generate_a2ui` takes a single `context` "
    "argument summarising what to draw. Keep chat replies to one short "
    "sentence; let the UI do the talking."
)


agent = Agent(
    model=OpenAIChat(id="gpt-5-mini", timeout=120),
    # Published: tools=[generate_a2ui] — removed, see the module docstring.
    tool_call_limit=4,
    description=SYSTEM_PROMPT,
)
