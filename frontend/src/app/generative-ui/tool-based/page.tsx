import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DEMO = "frontend/src/app/generative-ui/tool-based/_demo/gen-ui-tool-based";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/tool-based" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Two chart components are registered with <code>useComponent</code>,
          each with a zod schema for its props. The agent sees them as tools;
          when it calls one, the chart draws inline in the chat from the tool
          arguments. Nothing runs on the server for the call itself.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          New for Agno on this page: the backend declares a matching{" "}
          <code>@tool(external_execution=True)</code> stub with an empty body,
          and the agent gets a <code>SqliteDb</code> so the paused run can be
          resumed once the browser answers.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Show me a bar chart of quarterly sales for Q1, Q2, Q3, Q4.",
              "Show me a pie chart of website traffic by source.",
            ]}
            expect="Expected to fail today: the agent is not mounted (SYSTEM_PROMPT is missing from the page). If the page is fixed, a bar chart renders inline in the chat."
            fail="An agent-not-found / connection error from the runtime: the documented gap."
          />
        </div>
      </Panel>

      <Callout tone="info" title="What is doc code here">
        <code>page.tsx</code> is the page&apos;s Code tab, verbatim, except
        that its <code>useSuggestions</code> import and call are commented out
        (<code>// doc:</code>): the page never prints{" "}
        <code>suggestions.ts</code>. <code>bar-chart.tsx</code> and{" "}
        <code>pie-chart.tsx</code> are <strong>not from the doc page</strong>:
        the Code tab imports them without printing them, so they are minimal
        stand-ins (the showcase&apos;s zod schemas plus a plain Recharts
        chart). <code>backend/agents/chart_agent.py</code> is the page&apos;s
        two snippets, verbatim.
      </Callout>

      <Callout tone="warn" title="Broken: the page's backend cannot load">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <code>instructions=SYSTEM_PROMPT</code> is never defined on the
            page, so <code>chart_agent.py</code> raises <code>NameError</code>{" "}
            on import. Nothing fills it in, so the agent is not mounted and
            agent id <code>gen-ui-tool-based</code> is not registered in the
            runtime route. The demo fails to find its agent.
          </li>
          <li>
            The frontend registers <code>render_pie_chart</code>, but the
            backend snippet only declares <code>render_bar_chart</code>. Left
            as published.
          </li>
          <li>
            The model id is <code>gpt-6-luna</code>, as published. Every
            other agent in this repo runs <code>gpt-4o</code>/
            <code>gpt-5-mini</code>.
          </li>
          <li>
            The page&apos;s own Code-tab <code>route.ts</code> points this id
            at the showcase&apos;s main agent rather than at the chart agent
            the prose builds. That route file isn&apos;t used here.
          </li>
          <li>
            The page says Agno&apos;s AG-UI interface does not pass frontend
            tool definitions to the model. This repo found the opposite on
            agno 3.x (see{" "}
            <a className="underline" href="/generative-ui/your-components/display-only">
              Display-only
            </a>
            ).
          </li>
        </ul>
      </Callout>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            { file: `${DEMO}/page.tsx` },
            { file: `${DEMO}/bar-chart.tsx` },
            { file: "backend/agents/chart_agent.py" },
          ]}
        />
      </Panel>
    </>
  );
}
