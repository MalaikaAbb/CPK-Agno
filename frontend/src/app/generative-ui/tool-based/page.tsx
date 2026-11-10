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
            expect="A bar chart card renders inline in the chat with the title and bars the agent supplied, and the run finishes with a short reply."
            fail="Plain text or a markdown table instead of a chart (the tool was not called), or a RUN_ERROR after the chart draws (the resume failed)."
          />
        </div>
      </Panel>

      <Callout tone="info" title="Frontend files are the Code tab's, verbatim">
        <code>page.tsx</code>, <code>bar-chart.tsx</code>,{" "}
        <code>pie-chart.tsx</code> and <code>suggestions.ts</code> are copied
        unchanged from the page&apos;s demo (the <code>gen-ui-tool-based</code>{" "}
        showcase demo for Agno). The demo registers agent id{" "}
        <code>gen-ui-tool-based</code>, which the runtime route here points at{" "}
        <code>backend/agents/chart_agent.py</code>.
      </Callout>

      <Callout tone="warn" title="Gaps in the page's backend code">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <code>instructions=SYSTEM_PROMPT</code> is never defined on the
            page. The prompt here is <strong>borrowed from the
            ms-agent-framework-py harness</strong>, not from the Agno doc.
          </li>
          <li>
            The frontend registers <code>render_pie_chart</code>, but the
            backend snippet only declares <code>render_bar_chart</code>. Left
            as published, so pie-chart prompts may get a text answer.
          </li>
          <li>
            The model id is <code>gpt-6-luna</code>, as published. Every
            other agent in this repo runs <code>gpt-4o</code>/
            <code>gpt-5-mini</code>. If OpenAI rejects the id, the run fails
            with a model error.
          </li>
          <li>
            The page says Agno&apos;s AG-UI interface does not pass frontend
            tool definitions to the model. This repo found the opposite on
            agno 3.x (see{" "}
            <a className="underline" href="/generative-ui/your-components/display-only">
              Display-only
            </a>
            ). The backend stub is kept anyway, because the page asks for it.
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
