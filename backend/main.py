"""Serves the Agno agent over AG-UI.

`AgentOS` + the `AGUI` interface produce an ASGI app whose AG-UI endpoint lives
at `/agui`. The Next.js runtime route (`frontend/src/app/api/copilotkit/[[...slug]]/route.ts`)
is what actually talks to it; the browser never calls this service directly
except on the AG-UI debug route, which is why CORS is opened for the dev origin.
"""

import os
from pathlib import Path

from dotenv import load_dotenv

# Prefer backend/.env (what the Agno quickstart describes), then fall back to a
# repo-root .env so a single file at the top level also works.
_BACKEND_ENV = Path(__file__).parent / ".env"
_ROOT_ENV = Path(__file__).parent.parent / ".env"
load_dotenv(_BACKEND_ENV)
load_dotenv(_ROOT_ENV, override=False)

from agno.os import AgentOS  # noqa: E402 - must follow load_dotenv
from agno.os.interfaces.agui import AGUI  # noqa: E402

from agent import build_agent  # noqa: E402
from agents.a2ui_dynamic_agent import agent as a2ui_dynamic_agent  # noqa: E402
from agents.a2ui_fixed_agent import agent as a2ui_fixed_agent  # noqa: E402
from agents.interrupt_agent import agent as interrupt_agent  # noqa: E402
from agents.main import agent as demo_main_agent  # noqa: E402
from agents.open_gen_ui_agent import agent as open_gen_ui_agent  # noqa: E402
from agents.subagents import agent as subagents_supervisor  # noqa: E402

PORT = int(os.getenv("AGENT_PORT", "8000"))

_ALLOWED_ORIGINS = [
    o.strip()
    for o in os.getenv(
        "AGENT_CORS_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if o.strip()
]

# `.strip()` so a key pasted into an env file with a stray newline is caught
# here, where the message names it, rather than much later as an illegal HTTP
# header value reported as a generic connection error.
if not (os.getenv("OPENAI_API_KEY") or "").strip():
    raise SystemExit(
        "OPENAI_API_KEY is not set.\n"
        f"Create {_BACKEND_ENV} (or a repo-root .env) from .env.example and add your key."
    )

agent = build_agent()

# The demo agents from the docs' Code tabs (backend/agents/). The docs serve
# them from a custom `agent_server.py` (kept at backend/docs_verbatim/) whose
# hand-written routes emit STATE_SNAPSHOT and forward HITL tool results. That
# file cannot import on agno 3.x, and its routes are no longer needed: the
# stock AG-UI router now does both. So each agent gets a plain `AGUI` mount at
# the prefix the published runtime routes expect — except `/demo-main`, which
# the docs serve at `/agui`, where this repo's own agent already lives.
_DEMO_INTERFACES = [
    AGUI(agent=a2ui_dynamic_agent, prefix="/declarative-gen-ui"),
    AGUI(agent=a2ui_fixed_agent, prefix="/a2ui-fixed-schema"),
    AGUI(agent=open_gen_ui_agent, prefix="/open-gen-ui"),
    AGUI(agent=demo_main_agent, prefix="/demo-main"),
    AGUI(agent=interrupt_agent, prefix="/interrupt-adapted"),
    AGUI(agent=subagents_supervisor, prefix="/subagents"),
]

agent_os = AgentOS(
    name="CopilotKit Agno Test Harness",
    agents=[
        agent,
        a2ui_dynamic_agent,
        a2ui_fixed_agent,
        open_gen_ui_agent,
        demo_main_agent,
        interrupt_agent,
        subagents_supervisor,
    ],
    # [4] AG-UI: expose the Agno agent to CopilotKit
    # [!code highlight]
    interfaces=[AGUI(agent=agent), *_DEMO_INTERFACES],
    cors_allowed_origins=_ALLOWED_ORIGINS,
    telemetry=False,
)

app = agent_os.get_app()

if __name__ == "__main__":
    agent_os.serve(app="main:app", port=PORT, reload=True)
