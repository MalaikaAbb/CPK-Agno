import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DEMO = "frontend/src/app/generative-ui/open-generative-ui/_demo";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/open-generative-ui" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Instead of choosing from components, the agent writes the interface
          itself — CSS, then HTML, then JavaScript — through a{" "}
          <code>generateSandboxedUi</code> tool the runtime injects. The
          middleware turns that streaming tool call into activity events, and
          a built-in renderer mounts the result in a sandboxed iframe as it
          arrives. The demo route has both of the page&apos;s demos as tabs:
          the minimal one, and an advanced one where the iframe can call two
          host-page functions through <code>Websandbox.connection.remote</code>.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "How a neural network works",
              "Calculator (calls evaluateExpression)",
            ]}
            expect="An iframe in the chat that fills in live: styles, then markup, then scripts. On the Advanced tab, the calculator's results come from the host — evaluateExpression logs to the browser console."
            fail="A prose answer and no iframe. That is what the agent did when offered a stand-in tool outside the runtime, so this may be the repo-authored agent rather than the wiring — check whether `generateSandboxedUi` appears among the run's tools in the Inspector."
          />
        </div>
      </Panel>

      <Callout tone="warn" title="The Agno agent is never published — this one is repo-authored">
        The Code tab publishes the runtime route and both frontends. The
        docs&apos; <code>agent_server.py</code> imports{" "}
        <code>agents.open_gen_ui_agent</code> and mounts it at{" "}
        <code>/open-gen-ui/agui</code>, but the module is not in the bundle.
        All the server says is that it is a no-tools agent.{" "}
        <code>backend/agents/open_gen_ui_agent.py</code> is written to that
        description and copies the shape of the published no-tools{" "}
        <code>mcp_apps_agent.py</code>; its one-line description is ours.
      </Callout>

      <Callout tone="warn" title="The page's snippets are fragments">
        The runtime snippet starts mid-object, at an indented{" "}
        <code>runtime: new CopilotRuntime({"{"}</code>. The advanced page
        snippet stops before its <code>Chat</code> component and closing
        braces, and runs straight on into <code>sandbox-functions.ts</code> in
        the same block. The minimal page imports{" "}
        <code>VISUALIZATION_DESIGN_SKILL</code> from{" "}
        <code>./design-skill</code>, which no tab shows. All of these are
        complete in the demo bundle and used from there.
      </Callout>

      <Callout tone="info" title="Why a separate runtime route">
        The published route&apos;s own comment: enabling{" "}
        <code>openGenerativeUI</code> on a runtime makes the provider wipe
        per-demo <code>useFrontendTool</code> registrations, so it gets its
        own endpoint, <code>/api/copilotkit-ogui</code>. The page itself does
        not mention this.
      </Callout>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/api/copilotkit-ogui/route.ts" },
            { file: `${DEMO}/open-gen-ui/page.tsx` },
            { file: `${DEMO}/open-gen-ui/design-skill.ts` },
            { file: `${DEMO}/open-gen-ui-advanced/page.tsx` },
            { file: `${DEMO}/open-gen-ui-advanced/sandbox-functions.ts` },
            { file: "backend/agents/open_gen_ui_agent.py" },
          ]}
        />
      </Panel>

      <Panel title="The demo's page">
        <SourceCode file="frontend/src/app/generative-ui/open-generative-ui/demo-chat/page.tsx" />
      </Panel>
    </>
  );
}
