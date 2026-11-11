// Byte-exact copy of the "Backend" snippet on
// https://docs.copilotkit.ai/agno/generative-ui/a2ui (title
// app/api/copilotkit/route.ts). Type-checked, never served: `_doc` is a private
// folder, so Next does not route it, and nothing imports it.
// `myAgent` is a placeholder the page never defines.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";

const runtime = new CopilotRuntime({
  // @ts-expect-error verbatim doc code: `myAgent` is never defined on the page (TS2304)
  agents: { default: myAgent },
  a2ui: {},
});

// Single-route: only POST needed, no catch-all [...path] required
const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit",
  mode: "single-route",
});

export { handler as POST };
