"""Agent behind /generative-ui/state-rendering — NOT published for Agno.

https://docs.copilotkit.ai/agno/generative-ui/state-rendering

The page's backend half is skipped for Agno ("state-streaming-setup is not
bundled for agno", and the `state-streaming-middleware` region is missing for
agno). The Agno showcase runs the demo on its main agent, which has no tool
that writes `document`, so nothing on that agent ever fills the panel.

Everything below is borrowed from the ms-agent-python showcase
(`showcase/integrations/ms-agent-python/src/agents/shared_state_streaming.py`),
not from the Agno doc page:

- `SYSTEM_PROMPT`, verbatim;
- the `write_document` tool's name, argument and description.

What it cannot borrow: the per-token part. That showcase forwards each token
of the tool argument into `state.document` while the call is still streaming
(MAF `predict_state_config`; LangGraph `StateStreamingMiddleware`). Agno's
stock AG-UI router has nothing like it: it emits a STATE_DELTA only once the
tool has run, so here the document lands in one piece after the tool call,
not token by token. Mounted at `/shared-state-streaming` by `main.py`.
"""

from __future__ import annotations

from textwrap import dedent

from agno.agent import Agent
from agno.db.sqlite import SqliteDb
from agno.models.openai import OpenAIChat
from agno.run import RunContext

# region borrowed-from-ms-agent-python
SYSTEM_PROMPT = dedent(
    """
    You are a collaborative writing assistant. Whenever the user asks
    you to write, draft, or revise any piece of text, ALWAYS call the
    `write_document` tool with the full content as a single string in
    the `document` argument. Never paste the document into a chat
    message directly — the document belongs in shared state and the UI
    renders it live as you type.
    """
).strip()


def write_document(run_context: RunContext, document: str) -> str:
    """Write a document for the user. Always call this tool when the user asks
    you to write, draft, or revise any text. The `document` argument is
    streamed per-token into shared state under the `document` key so the UI
    renders the body live.

    Args:
        document (str): The full document content as a single string.
    """
    # Repo glue: Agno's equivalent of MAF's `state_update(state=...)`. The
    # stock AG-UI router diffs session_state after the tool and emits the
    # change as a STATE_DELTA.
    if run_context.session_state is None:
        run_context.session_state = {}
    run_context.session_state["document"] = document
    return "Document written to shared state."
# endregion


agent = Agent(
    # Repo choice, not published anywhere for Agno.
    model=OpenAIChat(id="gpt-4o-mini", timeout=120),
    db=SqliteDb(db_file="tmp/agno.db"),
    tools=[write_document],
    instructions=SYSTEM_PROMPT,
)
