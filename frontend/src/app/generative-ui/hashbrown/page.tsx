import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DEMO = "frontend/src/app/generative-ui/hashbrown/_demo/declarative-hashbrown";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/hashbrown" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The same dashboard scenario as JSON Render, built with{" "}
          <code>@hashbrownai/react</code> instead. A{" "}
          <code>HashBrownDashboard</code> provider builds a UI kit once (metric,
          pie chart, bar chart, deal card, Markdown). The assistant-message slot
          streams the agent&apos;s <code>{"{ ui: [...] }"}</code> envelope
          through <code>useJsonParser</code> and calls{" "}
          <code>kit.render</code>, so finished components show up while the
          rest of the JSON is still arriving.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Chart <code>data</code> travels as a JSON-encoded string, which the
          chart wrappers parse before drawing.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Show me a sales dashboard with total revenue and revenue by segment.",
              "Show our top open deals and pipeline by stage.",
            ]}
            expect="Components appear one after another while the reply streams: a metric first, then charts or deal cards."
            fail="Raw JSON or nothing in the assistant bubble: the envelope didn't match the kit schema, or the parser never produced a value."
          />
        </div>
      </Panel>

      <Callout tone="info" title="All published code, verbatim">
        The frontend is the page&apos;s <code>declarative-hashbrown</code>{" "}
        demo for Agno (<code>page.tsx</code>, <code>chat.tsx</code> and{" "}
        <code>hashbrown-renderer.tsx</code> match the page byte for byte). The
        dedicated runtime route <code>/api/copilotkit-declarative-hashbrown</code>{" "}
        and <code>backend/agents/byoc_hashbrown_agent.py</code> come from the
        Code tab, and the agent is mounted at <code>/byoc-hashbrown</code>.
        Hashbrown is pinned to the showcase&apos;s{" "}
        <code>0.5.0-beta.4</code>, since the page names no version.
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
            { file: `${DEMO}/page.tsx` },
            { file: `${DEMO}/chat.tsx` },
            { file: `${DEMO}/hashbrown-renderer.tsx` },
            { file: "frontend/src/app/api/copilotkit-declarative-hashbrown/route.ts" },
            { file: "backend/agents/byoc_hashbrown_agent.py" },
          ]}
        />
      </Panel>
    </>
  );
}
