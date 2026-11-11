import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
  InMemoryAgentRunner,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

// Harness glue: the runtime every Components and surfaces demo points at.
//
// The pages give the provider `runtimeUrl="/api/copilotkit"` and leave the
// runtime alone. When a run carries a catalog, the runtime adds `render_ui` and
// the guide itself. This route is kept apart from `/api/copilotkit` so the
// catalog never reaches the other routes' agents (the CPK-LangGraph-TS /
// aws-strands-ts pattern). The agent is this repo's Agno `genui` agent
// (backend/agents/genui_agent.py), registered as `default` because the pages'
// providers name no agent.
const AGENT_URL = process.env.AGENT_URL || "http://localhost:8000";

const runtime = new CopilotRuntime({
  agents: { default: new HttpAgent({ url: `${AGENT_URL}/genui/agui` }) },
  runner: new InMemoryAgentRunner(),
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit-genui",
});

export { handler as GET, handler as POST, handler as PATCH, handler as DELETE };
