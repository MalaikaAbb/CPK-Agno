# Sub-Agents

> Decompose work across multiple specialized agents with a visible delegation log.


<!-- interactive demo: subagents -->


## What is this?

Sub-agents are the canonical multi-agent pattern: a top-level
**supervisor** LLM orchestrates one or more specialized **sub-agents**
by exposing each of them as a tool. The supervisor decides what to
delegate, the sub-agents do their narrow job, and their results flow
back up to the supervisor's next step.

This is fundamentally the same shape as tool-calling, but each "tool"
is itself a full-blown agent with its own system prompt and (often) its
own tools, memory, and model.

## When should I use this?

Reach for sub-agents when a task has distinct specialized sub-tasks
that each benefit from their own focus:

- **Research → Write → Critique** pipelines, where each stage needs a
  different system prompt and temperature.
- **Router + specialists**, where one agent classifies the request and
  dispatches to the right expert.
- **Divide-and-conquer** — any problem that fits cleanly into parallel
  or sequential sub-problems.

The example below uses the Research → Write → Critique shape as the
canonical example.

## Setting up sub-agents

<!-- setup skipped: subagents-setup is not bundled for agno -->

Each sub-agent is an isolated agent call with its own model, system
prompt, and optional tools. They don't share memory or tools with the
supervisor; the supervisor only ever sees what the sub-agent returns.

```python
# src/agents/subagents.py
from __future__ import annotations

import logging
import uuid
from typing import Any

import dotenv
from agno.agent.agent import Agent
from agno.models.openai import OpenAIChat
from agno.run import RunContext

dotenv.load_dotenv()

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Sub-agents (real Agno agents under the hood)
# ---------------------------------------------------------------------------

_SUB_MODEL_ID = "gpt-4o-mini"


# Each sub-agent is a full Agno `Agent(...)` with its own system prompt.
# They don't share memory or tools with the supervisor — the supervisor
# only sees their final text response, which is returned via the
# delegation tool below.
_research_agent = Agent(
    model=OpenAIChat(id=_SUB_MODEL_ID, timeout=120),
    description="Research sub-agent.",
    instructions=(
        "You are a research sub-agent. Given a topic, produce a concise "
        "bulleted list of 3-5 key facts. No preamble, no closing."
    ),
)

_writing_agent = Agent(
    model=OpenAIChat(id=_SUB_MODEL_ID, timeout=120),
    description="Writing sub-agent.",
    instructions=(
        "You are a writing sub-agent. Given a brief and optional source "
        "facts, produce a polished 1-paragraph draft. Be clear and "
        "concrete. No preamble."
    ),
)

_critique_agent = Agent(
    model=OpenAIChat(id=_SUB_MODEL_ID, timeout=120),
    description="Critique sub-agent.",
    instructions=(
        "You are an editorial critique sub-agent. Given a draft, give "
        "2-3 crisp, actionable critiques. No preamble."
    ),
)
```

Keep sub-agent system prompts narrow and focused. The point of this pattern
is that each one does one thing well. If a sub-agent needs to know
the whole user context to do its job, that's a signal the boundary is
wrong.

## Exposing sub-agents as tools

The supervisor delegates by calling tools. Each delegation tool is a thin
wrapper around a specialized agent call that:

1. Runs the sub-agent on the supplied `task` string.
2. Records the delegation into a `delegations` slot in shared agent
   state (so the UI can render a live log).
3. Returns the sub-agent's final message as the tool result, which the
   supervisor sees on its next turn.

```python
# src/agents/subagents.py
from __future__ import annotations

import logging
import uuid
from typing import Any

import dotenv
from agno.agent.agent import Agent
from agno.models.openai import OpenAIChat
from agno.run import RunContext

dotenv.load_dotenv()

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Sub-agents (real Agno agents under the hood)
# ---------------------------------------------------------------------------

_SUB_MODEL_ID = "gpt-4o-mini"


# Each sub-agent is a full Agno `Agent(...)` with its own system prompt.
# They don't share memory or tools with the supervisor — the supervisor
# only sees their final text response, which is returned via the
# delegation tool below.
_research_agent = Agent(
    model=OpenAIChat(id=_SUB_MODEL_ID, timeout=120),
    description="Research sub-agent.",
    instructions=(
        "You are a research sub-agent. Given a topic, produce a concise "
        "bulleted list of 3-5 key facts. No preamble, no closing."
    ),
)

_writing_agent = Agent(
    model=OpenAIChat(id=_SUB_MODEL_ID, timeout=120),
    description="Writing sub-agent.",
    instructions=(
        "You are a writing sub-agent. Given a brief and optional source "
        "facts, produce a polished 1-paragraph draft. Be clear and "
        "concrete. No preamble."
    ),
)

_critique_agent = Agent(
    model=OpenAIChat(id=_SUB_MODEL_ID, timeout=120),
    description="Critique sub-agent.",
    instructions=(
        "You are an editorial critique sub-agent. Given a draft, give "
        "2-3 crisp, actionable critiques. No preamble."
    ),
)


def _invoke_sub_agent(sub_agent: Agent, task: str) -> str:
    """Run a sub-agent on `task` and return its final message content."""
    result = sub_agent.run(input=task)
    content = getattr(result, "content", None)
    if isinstance(content, str):
        return content.strip()
    if content is None:
        return ""
    return str(content).strip()


# ---------------------------------------------------------------------------
# Shared-state helpers
# ---------------------------------------------------------------------------


def _append_delegation(
    run_context: RunContext,
    *,
    sub_agent: str,
    task: str,
    status: str,
    result: str,
) -> str:
    """Append a delegation entry and return its id."""
    if run_context.session_state is None:
        run_context.session_state = {}
    delegations = list(run_context.session_state.get("delegations") or [])
    entry_id = str(uuid.uuid4())
    delegations.append(
        {
            "id": entry_id,
            "sub_agent": sub_agent,
            "task": task,
            "status": status,
            "result": result,
        }
    )
    run_context.session_state["delegations"] = delegations
    return entry_id


def _update_delegation(
    run_context: RunContext,
    *,
    entry_id: str,
    status: str,
    result: str,
) -> None:
    """Mutate the delegation entry with `entry_id` in shared state.

    If the entry has gone missing (another part of the system replaced
    `session_state["delegations"]`), log loudly and skip rather than
    appending a synthetic entry. Mirrors the conservative behavior used
    in the google-adk reference.
    """
    if run_context.session_state is None:
        run_context.session_state = {}
    delegations = list(run_context.session_state.get("delegations") or [])
    for entry in delegations:
        if entry.get("id") == entry_id:
            entry["status"] = status
            entry["result"] = result
            run_context.session_state["delegations"] = delegations
            return
    logger.warning(
        "subagents: delegation entry %s missing on update — final %s "
        "state (result_length=%d) will not be rendered",
        entry_id,
        status,
        len(result),
    )


def _delegate(
    run_context: RunContext,
    *,
    sub_agent_name: str,
    sub_agent: Agent,
    task: str,
) -> dict[str, Any]:
    """Common delegation flow: append running entry → invoke → update final."""
    entry_id = _append_delegation(
        run_context,
        sub_agent=sub_agent_name,
        task=task,
        status="running",
        result="",
    )
    try:
        result = _invoke_sub_agent(sub_agent, task)
    except Exception as exc:  # noqa: BLE001 — sub-agent transport can fail anywhere
        logger.exception("subagents: sub-agent %s failed", sub_agent_name)
        # Surface only the exception class to the supervisor / frontend —
        # provider error strings can carry URLs / request IDs / partial
        # credentials. The full traceback stays in server logs.
        message = (
            f"sub-agent call failed: {exc.__class__.__name__} "
            "(see server logs for details)"
        )
        _update_delegation(
            run_context, entry_id=entry_id, status="failed", result=message
        )
        return {"status": "failed", "error": message}

    _update_delegation(
        run_context, entry_id=entry_id, status="completed", result=result
    )
    return {"status": "completed", "result": result}


# ---------------------------------------------------------------------------
# Supervisor tools (each tool delegates to one sub-agent)
# ---------------------------------------------------------------------------


# Each function is a tool exposed to the supervisor agent. The supervisor
# LLM "calls" these to delegate work; each call synchronously runs the
# matching sub-agent, records the delegation into shared state, and
# returns the sub-agent's output as the tool result the supervisor reads
# on its next step.
def research_agent(run_context: RunContext, task: str) -> dict[str, Any]:
    """Delegate a research task to the research sub-agent.

    Use for: gathering facts, background, definitions, statistics.
    Returns {status, result} on success or {status: "failed", error} on
    sub-agent failure.
    """
    return _delegate(
        run_context,
        sub_agent_name="research_agent",
        sub_agent=_research_agent,
        task=task,
    )


def writing_agent(run_context: RunContext, task: str) -> dict[str, Any]:
    """Delegate a drafting task to the writing sub-agent.

    Use for: producing a polished paragraph, draft, or summary. Pass
    relevant facts from prior research inside `task`. Same return shape
    as research_agent.
    """
    return _delegate(
        run_context,
        sub_agent_name="writing_agent",
        sub_agent=_writing_agent,
        task=task,
    )


def critique_agent(run_context: RunContext, task: str) -> dict[str, Any]:
    """Delegate a critique task to the critique sub-agent.

    Use for: reviewing a draft and suggesting concrete improvements.
    Same return shape as research_agent.
    """
    return _delegate(
        run_context,
        sub_agent_name="critique_agent",
        sub_agent=_critique_agent,
        task=task,
    )


```

This is where CopilotKit's shared-state channel earns its keep: the
supervisor's tool calls mutate `delegations` as they happen, and the
frontend renders every new entry live.

<Callout type="warn">
  Give every delegation a stable `id` and merge new entries by that `id`. The
  client sends its copy of shared state back as run input on every run, so a
  slot that blindly appends whatever it receives — a LangGraph
  `Annotated[list, operator.add]` reducer, for example — concatenates the
  entries the client just echoed onto the ones the agent already has, and the
  log doubles when a thread is continued.
</Callout>

## Rendering a live delegation log

On the frontend, the delegation log is a reactive render of the
`delegations` slot.


Subscribe with `useAgent({ updates:
[UseAgentUpdate.OnStateChanged, UseAgentUpdate.OnRunStatusChanged] })`,
read `agent.state.delegations`, and render one card per entry.

```typescript
// src/app/demos/subagents/delegation-log.tsx
/**
 * Live delegation log — renders the `delegations` slot of agent state.
 *
 * Each entry corresponds to one invocation of a sub-agent. The list
 * grows in real time as the supervisor fans work out to its children.
 * The parent header shows how many sub-agents have been called and
 * whether the supervisor is still running.
 */
// Fixed list of the three sub-agent roles the supervisor can call.
// Rendered as always-visible indicator chips at the top of the log
// (regardless of whether the supervisor has delegated yet) so the user
// — and the e2e suite — can see at a glance which sub-agents exist and
// which are currently active.
const INDICATOR_ROLES: ReadonlyArray<{
  role: "researcher" | "writer" | "critic";
  subAgent: SubAgentName;
}> = [
  { role: "researcher", subAgent: "research_agent" },
  { role: "writer", subAgent: "writing_agent" },
  { role: "critic", subAgent: "critique_agent" },
];

export function DelegationLog({ delegations, isRunning }: DelegationLogProps) {
  const calledRoles = new Set<SubAgentName>(
    delegations.map((d) => d.sub_agent),
  );

  return (
    <div
      data-testid="delegation-log"
      className="w-full h-full flex flex-col bg-white rounded-2xl shadow-sm border border-[#DBDBE5] overflow-hidden"
    >
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#E9E9EF] bg-[#FAFAFC]">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-[#010507]">
            Sub-agent delegations
          </span>
          {isRunning && (
            <span
              data-testid="supervisor-running"
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-[#BEC2FF] bg-[#BEC2FF1A] text-[#010507] text-[10px] font-semibold uppercase tracking-[0.12em]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#010507] animate-pulse" />
              Supervisor running
            </span>
          )}
        </div>
        <span
          data-testid="delegation-count"
          className="text-xs font-mono text-[#838389]"
        >
          {delegations.length} calls
        </span>
      </div>

      <div
        data-testid="subagent-indicators"
        className="flex items-center gap-2 border-b border-[#E9E9EF] bg-white px-6 py-2"
      >
        {INDICATOR_ROLES.map(({ role, subAgent }) => {
          const style = SUB_AGENT_STYLE[subAgent];
          const fired = calledRoles.has(subAgent);
          return (
            <span
              key={role}
              data-testid={`subagent-indicator-${role}`}
              data-role={role}
              data-fired={fired ? "true" : "false"}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.1em] border ${style.color} ${
                fired ? "" : "opacity-60"
              }`}
            >
              <span aria-hidden>{style.emoji}</span>
              <span>{style.label}</span>
            </span>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {delegations.length === 0 ? (
          <p className="text-[#838389] italic text-sm">
            Ask the supervisor to complete a task. Every sub-agent it calls will
            appear here.
          </p>
        ) : (
          delegations.map((d, idx) => {
            const style = SUB_AGENT_STYLE[d.sub_agent];
            return (
              <div
                key={d.id}
                data-testid="delegation-entry"
                className="border border-[#E9E9EF] rounded-xl p-3 bg-[#FAFAFC]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#AFAFB7]">
                      #{idx + 1}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.1em] border ${style.color}`}
                    >
                      <span>{style.emoji}</span>
                      <span>{style.label}</span>
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[#189370]">
                    {d.status}
                  </span>
                </div>
                <div className="text-xs text-[#57575B] mb-2">
                  <span className="font-semibold text-[#010507]">Task: </span>
                  {d.task}
                </div>
                <div className="text-sm text-[#010507] whitespace-pre-wrap bg-white rounded-lg p-2.5 border border-[#E9E9EF]">
                  {d.result}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
```




The result: as the supervisor fans work out to its sub-agents, the log
grows in real time, giving the user visibility into a process that
would otherwise be a long opaque spinner.

## Related

- **[Shared State](/agno/shared-state)** — the channel that makes the
  delegation log live.
- **[State streaming](/agno/shared-state/streaming)** — stream
  *individual* sub-agent outputs token-by-token inside each log entry.
