"""Agent behind /human-in-the-loop/overview and /shared-state/agent-readonly.

https://docs.copilotkit.ai/agno/human-in-the-loop/index
https://docs.copilotkit.ai/agno/shared-state/agent-readonly

Both pages' demos (`hitl-in-chat`, `readonly-state-agent-context`) run on the
Code tab's `src/agents/main.py`. That file cannot run here: its first import
is `from tools import (RENDER_A2UI_TOOL_SCHEMA, ..., search_flights_impl)`
and `from tools.types import Flight`, a package the docs never publish for
Agno. It is kept byte-exact, never imported, at
`backend/docs_verbatim/main.py`.

What runs is the published session DB and `Agent(...)` literal — model,
description and instructions verbatim — with the `tools=[...]` list removed.
The two demos need no backend tool: `book_call` is registered in the browser
by `useHumanInTheLoop` and reaches the model through the stock Agno AG-UI
router (`parse_client_tools`), and `useAgentContext` values arrive as AG-UI
`context`, which that router adds to the prompt as dependencies.

The instructions still describe every removed tool (weather, flights,
sales todos, ...). They are left as published, so the model may say it can do
things it cannot do here.
"""

from agno.agent.agent import Agent
from agno.models.openai import OpenAIChat
from dotenv import load_dotenv

load_dotenv()


def _create_session_db():
    # Keep this import outside the public weather-tool region above.
    from agno.db.sqlite import SqliteDb

    # The production container runs as an unprivileged user with a read-only
    # application directory, so its SQLite file belongs in writable /tmp.
    return SqliteDb(db_file="/tmp/agno.db")


agent = Agent(
    # Raise the HTTP timeout so requests routed through aimock don't time out
    # under normal load.  The default httpx timeout is too short when aimock
    # is proxying to the upstream LLM — observed "Request timed out" errors
    # that crash the agent run and trigger watchdog restarts.
    model=OpenAIChat(id="gpt-5-mini", timeout=120),
    # Frontend and HITL tools pause the run before the browser responds.
    # Keep the session in a writable location so Agno can resume that run.
    db=_create_session_db(),
    # Published: tools=[get_weather, query_data, ...] — removed, see the module
    # docstring. Frontend tools (book_call) arrive from the browser instead.
    # Prevent runaway tool-call loops — same guard as the ag2 package.
    tool_call_limit=15,
    description="You are a helpful sales assistant for the CopilotKit showcase demos.",
    instructions="""
        SALES PIPELINE:
        When a user asks you to do anything regarding sales todos or the pipeline,
        use the manage_sales_todos tool. Always pass the COMPLETE LIST of todos.
        Be helpful in managing sales pipeline items.
        After using the tool, provide a brief summary of what you created, removed, or changed.

        WEATHER:
        Only call the get_weather tool if the user asks about the weather.
        If the user does not specify a location, use "Everywhere ever in the whole wide world".

        QUERY DATA:
        Use the query_data tool when the user asks for financial data, charts, or analytics.

        SCHEDULE MEETING:
        Use the schedule_meeting tool when the user wants to schedule a meeting.

        BACKGROUND:
        Only call change_background when the user explicitly asks to change colors/background.

        BOOK CALL (HITL):
        When the user asks to book a call / schedule an intro / 1:1, call
        book_call with the topic and the person's name. The frontend renders a
        time picker; the user's choice is returned as the tool result.

        TASK STEPS (HITL):
        When asked to plan something, use the generate_task_steps tool with a list of steps.
        Each step should have a description and status of "enabled".

        FLIGHT SEARCH:
        Use search_flights when the user asks about flights. Generate 2 realistic flights.

        STOCK PRICES:
        Use get_stock_price when the user asks about a ticker. Consider
        fetching a second related ticker for comparison when helpful.

        DICE:
        Use roll_dice when the user asks to roll a die. Consider rolling a
        second time with a different number of sides for contrast.

        DYNAMIC A2UI:
        Use generate_a2ui when the user asks for a dashboard or dynamic UI.

        USER APPROVAL (HITL):
        When asked to take any action that affects a customer — for example
        issuing a refund, updating a plan, cancelling a subscription,
        escalating a ticket, or sending a credit — call request_user_approval
        FIRST with a short summary and optional context. Follow the tool
        result: if approved, confirm in one short sentence; if rejected,
        acknowledge and do not retry.
    """,
)
