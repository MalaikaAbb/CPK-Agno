import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DEMO = "frontend/src/app/multi-agent/subagents/_demo/subagents";

export default function Page() {
  return (
    <>
      <RouteHeader path="/multi-agent/subagents" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A supervisor Agno agent whose three tools are themselves Agno agents
          — research, writing, critique — each with its own narrow prompt.
          Every delegation is recorded in a <code>delegations</code> list in
          session state, which the left panel renders. Per-tool renderers also
          show each call inline in the chat as it runs.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={["Write a short blog post about why cats purr."]}
            expect="Three activity cards in the chat in order (research, writing, critique), then a summary. The log on the left fills with three entries — all at once, when the run ends. Backend-checked: the final STATE_SNAPSHOT carries all three, each `completed`."
            fail="An empty log after the run finishes — the state snapshot did not reach the frontend."
          />
        </div>
      </Panel>

      <Callout tone="warn" title="The log is not live: no entry is ever seen “running”">
        <p>
          The supervisor tools write a <code>running</code> entry, call the
          sub-agent, then update it. The docs serve this agent from a custom
          route that sends one state snapshot just before the run ends. That
          route cannot import on agno 3.x (it uses{" "}
          <code>agno.os.interfaces.agui.utils</code> helpers that no longer
          exist), so the stock AG-UI router is used.
        </p>
        <p className="mt-2">
          The stock router could send a state delta after every tool call, but
          only when <code>jsonpatch</code> is installed. That comes with the{" "}
          <code>agno[agui]</code> extra, and the Quickstart&apos;s install line
          (<code>uv add agno fastapi uvicorn openai ag-ui-protocol</code>)
          leaves it out. The backend logs{" "}
          <code>Failed to compute state delta: No module named &apos;jsonpatch&apos;</code>{" "}
          and only the end-of-run snapshot arrives. The inline chat cards are
          what show progress.
        </p>
      </Callout>

      <Callout tone="warn" title="Smaller mismatches">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <code>Delegation.status</code> is typed as the single literal{" "}
            <code>&quot;completed&quot;</code>, but the backend also writes{" "}
            <code>running</code> and <code>failed</code>.
          </li>
          <li>
            The page prints <code>subagents.py</code> twice, the second copy
            repeating the first in full before adding the tools. The
            supervisor <code>Agent(...)</code> itself, the page component and{" "}
            <code>SUB_AGENT_STYLE</code> appear only in the Code tab.
          </li>
          <li>The page&apos;s setup step is &ldquo;not bundled for agno&rdquo;.</li>
        </ul>
      </Callout>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            { file: "backend/agents/subagents.py" },
            { file: `${DEMO}/page.tsx` },
            { file: `${DEMO}/delegation-log.tsx` },
            { file: "backend/main.py" },
          ]}
        />
      </Panel>

      <Panel title="The demo's page">
        <SourceCode file="frontend/src/app/multi-agent/subagents/demo-chat/page.tsx" />
      </Panel>
    </>
  );
}
