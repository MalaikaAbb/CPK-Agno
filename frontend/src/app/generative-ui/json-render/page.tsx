import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DEMO = "frontend/src/app/generative-ui/json-render/_demo/declarative-json-render";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/json-render" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Bring-your-own-components generative UI. The agent answers with one
          JSON object, <code>{"{ root, elements }"}</code>, and a custom
          assistant-message slot hands it to <code>@json-render/react</code>,
          which draws it with a registry of three components: a metric card, a
          bar chart and a pie chart. Until the text parses as a spec, the
          normal message bubble shows.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The catalog is defined with zod 4 (imported as <code>zod4</code>),
          and the renderer only allow-lists component types; it does not
          check props against the schemas.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Show me a sales dashboard with total revenue and revenue by region.",
              "Break down website traffic by source as a pie chart.",
            ]}
            expect="Once the JSON finishes streaming, a metric card renders with a bar or pie chart under it instead of raw JSON."
            fail="Raw JSON stays visible in the chat (the spec failed to parse or used a type outside the allowlist), or the chart area is empty."
          />
        </div>
      </Panel>

      <Callout tone="info" title="All published code, verbatim">
        The frontend is the page&apos;s <code>declarative-json-render</code>{" "}
        demo for Agno. <code>catalog.ts</code> is taken from the page itself,
        which imports <code>zod4</code>; the showcase copy imports{" "}
        <code>zod</code>. The dedicated runtime route{" "}
        <code>/api/copilotkit-declarative-json-render</code> and{" "}
        <code>backend/agents/byoc_json_render_agent.py</code> come from the
        Code tab, and the agent is mounted at <code>/byoc-json-render</code>.
        Packages: <code>@json-render/core</code> and{" "}
        <code>@json-render/react</code> at <code>0.18.0</code> (the version
        the page names), plus <code>zod4</code> as an alias for zod 4 next to
        this repo&apos;s zod 3.
      </Callout>

      <Callout tone="warn" title="Unverified model settings">
        The published agent runs{" "}
        <code>OpenAIChat(reasoning_effort=&quot;none&quot;, id=&quot;gpt-6-luna&quot;)</code>.
        Both are kept as published. Neither was checked against the OpenAI
        API in this change.
      </Callout>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            { file: `${DEMO}/chat.tsx` },
            { file: `${DEMO}/json-render-renderer.tsx` },
            { file: `${DEMO}/catalog.ts` },
            { file: `${DEMO}/registry.tsx` },
            { file: "frontend/src/app/api/copilotkit-declarative-json-render/route.ts" },
            { file: "backend/agents/byoc_json_render_agent.py" },
          ]}
        />
      </Panel>
    </>
  );
}
