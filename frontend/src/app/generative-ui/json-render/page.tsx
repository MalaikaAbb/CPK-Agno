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
            expect="Expected to fail today: agent byoc_json_render is not registered (no Agno backend on the page). If one is published, a metric card and chart render instead of raw JSON."
            fail="Raw JSON stays visible in the chat (the spec failed to parse or used a type outside the allowlist), or the chart area is empty."
          />
        </div>
      </Panel>

      <Callout tone="info" title="What is doc code here">
        <code>chat.tsx</code>, <code>json-render-renderer.tsx</code>,{" "}
        <code>catalog.ts</code> and <code>registry.tsx</code> are the
        page&apos;s printed files, verbatim, except that the{" "}
        <code>useByocJsonRenderSuggestions</code> import and call in{" "}
        <code>chat.tsx</code> are commented out (<code>// doc:</code>):{" "}
        <code>suggestions.ts</code> isn&apos;t printed.{" "}
        <code>metric-card.tsx</code>, <code>charts/bar-chart.tsx</code>,{" "}
        <code>charts/pie-chart.tsx</code> and <code>types.ts</code> are{" "}
        <strong>not from the doc page</strong>. The printed registry and
        renderer import them, so they are minimal labelled stand-ins.
        Packages: <code>@json-render/core</code>/<code>react</code>{" "}
        <code>0.18.0</code> and a <code>zod4</code> alias, as the page names.
      </Callout>

      <Callout tone="warn" title="Broken: not supported on Agno, no backend published">
        The rendered Agno page says &ldquo;Not available for Agno yet / Not
        supported on Agno&rdquo;. It prints no Agno agent, no runtime route and
        no demo <code>page.tsx</code>. Nothing is filled in from the showcase,
        so agent <code>byoc_json_render</code> is not registered and the demo
        chat cannot run.
      </Callout>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            { file: `${DEMO}/chat.tsx` },
            { file: `${DEMO}/json-render-renderer.tsx` },
            { file: `${DEMO}/catalog.ts` },
            { file: `${DEMO}/registry.tsx` },
          ]}
        />
      </Panel>
    </>
  );
}
