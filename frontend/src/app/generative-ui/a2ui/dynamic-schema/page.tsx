import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DEMO = "frontend/src/app/generative-ui/a2ui/dynamic-schema/_demo/declarative-gen-ui";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/a2ui/dynamic-schema" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          No layout is fixed in advance. The frontend hands the provider a
          catalog — eight branded components, each a Zod prop schema plus a
          description — and the runtime serialises it into the agent&apos;s
          context. When the agent calls <code>generate_a2ui</code>, a
          secondary LLM picks components from that catalog and fills them with
          data, and the surface renders in the chat.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Show me my sales dashboard for this quarter.",
              "How are our sales reps performing against quota?",
            ]}
            expect="A progress indicator, then a surface built from the catalog: Metric tiles, a DataTable, a PieChart or BarChart — laid out differently per prompt. Backend-checked only: the agent does call `generate_a2ui`."
            fail="Prose instead of a surface (the tool was not injected), or a raw JSON tool result in the chat (the A2UI middleware did not run)."
          />
        </div>
      </Panel>

      <Callout tone="warn" title="The published agent cannot run; this one is prompt-only">
        <p>
          The Code tab&apos;s <code>src/agents/a2ui_dynamic_agent.py</code>{" "}
          owns its own <code>generate_a2ui</code> tool and imports three things
          the docs never publish for Agno:{" "}
          <code>RENDER_A2UI_TOOL_SCHEMA</code> and{" "}
          <code>build_a2ui_operations_from_tool_call</code> from a{" "}
          <code>tools</code> package, and <code>get_forwarded_headers</code>{" "}
          from <code>agents._header_forwarding</code>. It is kept byte-exact at{" "}
          <code>backend/docs_verbatim/a2ui_dynamic_agent.py</code> and never
          imported.
        </p>
        <p className="mt-2">
          The agent here is the published <code>SYSTEM_PROMPT</code> and{" "}
          <code>Agent(...)</code> literal with <code>tools=[generate_a2ui]</code>{" "}
          removed. To match, the runtime route drops the published{" "}
          <code>a2ui: {"{ injectA2UITool: false, defaultCatalogId }"}</code>{" "}
          block (left commented in the file) and takes the page&apos;s default
          path, where the catalog alone auto-injects the tool. The prompt still
          says the tool &ldquo;takes a single <code>context</code>
          argument&rdquo;, which describes the published tool, not the injected
          one.
        </p>
      </Callout>

      <Callout tone="warn" title="The page's backend snippets are for LangGraph">
        Its opt-out section builds the tool with{" "}
        <code>from ag_ui_langgraph import get_a2ui_tools</code> and{" "}
        <code>ChatOpenAI</code>, and its streaming section describes the tool
        call streaming &ldquo;through LangGraph&rdquo;. Nothing on the page is
        Agno. The Code tab also names the agent file inconsistently: the page
        comment says <code>src/agents/a2ui_dynamic.py</code>, the file is{" "}
        <code>a2ui_dynamic_agent.py</code>.
      </Callout>

      <Callout tone="info" title="Leaf components come from the demo bundle">
        <code>renderers.tsx</code> imports <code>Card</code>,{" "}
        <code>Badge</code>, <code>Button</code> and <code>Separator</code> from{" "}
        <code>../_components/</code>. Those files are in the docs&apos; demo
        bundle though not shown as tabs, and are copied unchanged. They need{" "}
        <code>recharts</code> and <code>@radix-ui/react-separator</code>,
        neither of which the page tells you to install.
      </Callout>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            { file: `${DEMO}/a2ui/definitions.ts` },
            { file: `${DEMO}/a2ui/renderers.tsx` },
            { file: `${DEMO}/a2ui/catalog.ts` },
            { file: `${DEMO}/page.tsx` },
            { file: "frontend/src/app/api/copilotkit-declarative-gen-ui/route.ts" },
            { file: "backend/agents/a2ui_dynamic_agent.py" },
          ]}
        />
      </Panel>

      <Panel title="The demo's page">
        <SourceCode file="frontend/src/app/generative-ui/a2ui/dynamic-schema/demo-chat/page.tsx" />
      </Panel>
    </>
  );
}
