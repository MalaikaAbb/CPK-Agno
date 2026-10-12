# docs_verbatim — published code that cannot run here

Byte-exact copies of Agno files from the docs' demo **Code tabs**, extracted
from the docs bundle on 2026-10-07. Nothing imports them. They are kept so
each finding can point at exactly what the docs ship.

| File | Shown on | Why it cannot run here | What runs instead |
| --- | --- | --- | --- |
| `agent_server.py` | Sub-agents Code tab | Imports private `_shared.cvdiag_bootstrap`, `agents._cvdiag_backend` and `agents._header_forwarding` (none published). Also imports `async_stream_agno_response_as_agui_events`, `extract_agui_user_input` and `validate_agui_state` from `agno.os.interfaces.agui.utils`, which agno 3.1.1 no longer has (the file's own `TODO: migrate to agno 2.6.20+`). It imports fourteen agent modules; four of them (`byoc_hashbrown_agent`, `byoc_json_render_agent`, `gen_ui_agent`, `open_gen_ui_agent`) are not in the bundle. | `backend/main.py` mounts each demo agent with the stock `AGUI(agent=..., prefix=...)`. The stock 3.1.1 router emits state snapshots and resumes paused tool calls itself. That resume needs a `db`, which `interrupt_agent.py` does not have. |
| `main.py` | HITL overview and Agent Read-Only Context Code tabs | `from tools import (RENDER_A2UI_TOOL_SCHEMA, build_a2ui_operations_from_tool_call, get_weather_impl, query_data_impl, schedule_meeting_impl, search_flights_impl)` and `from tools.types import Flight`. The bundle publishes only `tools/get_weather.py`, `query_data.py`, `schedule_meeting.py` and `search_flights.py` (Tool Rendering tab), with no `__init__.py`, no `types.py` and no A2UI helpers. | `backend/agents/main.py`: the same session DB and `Agent(...)` literal with `tools=[...]` removed. |
| `a2ui_dynamic_agent.py` | A2UI Dynamic Schema Code tab | Same `tools` import for its `generate_a2ui`, plus `get_forwarded_headers` from `agents._header_forwarding`, defined nowhere in the bundle. | `backend/agents/a2ui_dynamic_agent.py`: the published prompt and `Agent(...)` without the tool; the runtime auto-injects `generate_a2ui` from the frontend catalog. |
