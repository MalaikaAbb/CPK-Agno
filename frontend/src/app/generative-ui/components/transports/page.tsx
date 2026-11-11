// Ported from the CPK-LangGraph-TS harness (itself ported from aws-strands-ts).
// The agno doc page is byte-identical to the langgraph-typescript one (diffed
// 2026-11-10). Harness glue points at this repo's Agno `genui` agent.

import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const BASE = "frontend/src/app/generative-ui/components/transports/demo-chat";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/components/transports" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The same catalog can reach the browser two ways: the agent calls a{" "}
          <code>render_ui</code> tool the runtime adds (checked server-side as
          it streams), or it writes <code>a2ui</code> code blocks inside its
          reply (checked in the browser). <code>agentIds</code> limits which
          agents get any of it, and the runtime&apos;s{" "}
          <code>generativeUI</code> option controls when the tool is added.
        </p>
        <div className="mt-4 space-y-3">
          <TryIt
            prompts={["Compare the Starter, Team, and Enterprise plans in a table"]}
            expect="Tool: a table component in its own message. Markdown: prose with the table embedded in the same reply. agentIds [shop]: a plain-text or markdown answer, because default is not in the list (and no shop agent exists to compare against)."
            fail="The 'as default' variant renders a component — agentIds was ignored."
          />
        </div>
      </Panel>

      <Panel title="The runtime" description="The page's CopilotRuntime sample; its undefined agent is this repo's genui agent.">
        <SourceCode file="frontend/src/app/api/copilotkit-genui-transports/[[...slug]]/route.ts" />
      </Panel>

      <Panel title="The provider configs and demo">
        <SourceCodeGroup files={[{ file: `${BASE}/configs.ts` }, { file: `${BASE}/page.tsx` }]} />
      </Panel>

      <Callout tone="warn" title="Gaps and harness changes">
        <ul className="space-y-1.5">
          <li>
            · The runtime sample references an <code>agent</code> it never
            builds; this repo&apos;s Agno <code>genui</code> agent is used
            through <code>HttpAgent</code> (<code>/genui</code>).
          </li>
          <li>
            · The &ldquo;Only some agents&rdquo; sample lists a{" "}
            <code>shop</code> agent in <code>agentIds</code> that no page
            builds. None is registered, so only the &ldquo;outside the
            list&rdquo; half can be tested.
          </li>
          <li>
            · The runtime sample sets no <code>runner</code>; it gets the
            runtime&apos;s default in-memory runner.
          </li>
        </ul>
      </Callout>
    </>
  );
}
