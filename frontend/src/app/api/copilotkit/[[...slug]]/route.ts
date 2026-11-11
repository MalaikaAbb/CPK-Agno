import {
  CopilotKitIntelligence,
  CopilotRuntime,
  createCopilotRuntimeHandler,
  InMemoryAgentRunner,
} from "@copilotkit/runtime/v2";
import { AgnoAgent } from "@ag-ui/agno";
import { HttpAgent } from "@ag-ui/client";

// Where the Agno AgentOS AG-UI interface is listening. `main.py` mounts it at
// POST /agui on port 8000.
const AGNO_URL = process.env.AGNO_AGENT_URL ?? "http://localhost:8000/agui";

// Quickstart step 1's project key. Present -> the doc's Intelligence wiring;
// absent -> the doc's documented fallback (SSE + in-memory runner).
//
// The Quickstart renamed this to CPK_INTELLIGENCE_API_KEY and stopped calling
// it a license key. The old name is still read, because the page renamed the
// variable without saying it had stopped working.
const INTELLIGENCE_API_KEY =
  process.env.CPK_INTELLIGENCE_API_KEY ?? process.env.INTELLIGENCE_API_KEY;

// Doc demos whose published page uses `runtimeUrl="/api/copilotkit"` and a
// named agent. The docs' own main route registers these names (as `HttpAgent`s
// against `AGENT_URL`); here they are added beside this repo's two ids so the
// published pages run unchanged. Backend prefixes are mounted in
// backend/main.py. `/demo-main` stands in for the docs' `/agui`, which this
// repo's own agent already occupies.
const AGENT_URL = process.env.AGENT_URL || "http://localhost:8000";
const DOC_DEMO_AGENTS = {
  "readonly-state-agent-context": new HttpAgent({ url: `${AGENT_URL}/demo-main/agui` }),
  "hitl-in-chat": new HttpAgent({ url: `${AGENT_URL}/demo-main/agui` }),
  "gen-ui-interrupt": new HttpAgent({ url: `${AGENT_URL}/interrupt-adapted/agui` }),
  subagents: new HttpAgent({ url: `${AGENT_URL}/subagents/agui` }),
};

// Two ids, one backend. `default` is what every prebuilt component picks up with
// no configuration; `agno_agent` is the same agent under an explicit id, which
// is what the Copilot Runtime route uses to show agent routing working.
const runtime = new CopilotRuntime({
  // [2] Copilot Runtime: register the Agno agent
  // [!code highlight]
  agents: {
    default: new AgnoAgent({ url: AGNO_URL }),
    agno_agent: new AgnoAgent({ url: AGNO_URL }),
    ...DOC_DEMO_AGENTS,
  },

  ...(INTELLIGENCE_API_KEY
    ? {
        intelligence: new CopilotKitIntelligence({
          apiKey: INTELLIGENCE_API_KEY,
        }),
        // Threads are per-user. Without this, every visitor shares one history.
        identifyUser: (request: Request) => ({
          id: request.headers.get("x-user-id") ?? "anonymous",
          name: request.headers.get("x-user-name") ?? "Anonymous",
        }),
      }
    : { runner: new InMemoryAgentRunner() }),
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit",
});

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const DELETE = handler;
