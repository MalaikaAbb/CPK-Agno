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
            expect="Expected to fail today: the runtime route /api/copilotkit-declarative-hashbrown and its agent are not published for Agno. If they are, components appear one by one while the reply streams."
            fail="Raw JSON or nothing in the assistant bubble: the envelope didn't match the kit schema, or the parser never produced a value."
          />
        </div>
      </Panel>

      <Callout tone="info" title="What is doc code here">
        <code>page.tsx</code>, <code>chat.tsx</code> and{" "}
        <code>hashbrown-renderer.tsx</code> are the page&apos;s printed files,
        verbatim, except for two things. The <code>useByocHashbrownSuggestions</code>{" "}
        import and call in <code>chat.tsx</code> are commented out (
        <code>// doc:</code>) because <code>suggestions.ts</code> isn&apos;t
        printed. The renderer also carries one <code>@ts-expect-error</code> for
        its verbatim type error. <code>metric-card.tsx</code>,{" "}
        <code>charts/bar-chart.tsx</code>, <code>charts/pie-chart.tsx</code>{" "}
        and <code>types.ts</code> are <strong>not from the doc page</strong>.
        The renderer imports them, so they are minimal labelled stand-ins.
        Hashbrown is pinned to <code>0.5.0-beta.4</code>, the version the page
        names.
      </Callout>

      <Callout tone="warn" title="Broken: not supported on Agno, no backend published">
        The rendered Agno page says &ldquo;Not available for Agno yet / Not
        supported on Agno&rdquo;. It prints no Agno agent and no runtime route.
        Nothing is filled in from the showcase. The printed{" "}
        <code>page.tsx</code> points at{" "}
        <code>/api/copilotkit-declarative-hashbrown</code>, which doesn&apos;t
        exist here, so the demo chat cannot run.
      </Callout>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            { file: `${DEMO}/page.tsx` },
            { file: `${DEMO}/chat.tsx` },
            { file: `${DEMO}/hashbrown-renderer.tsx` },
          ]}
        />
      </Panel>
    </>
  );
}
