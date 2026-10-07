import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DEMO = "frontend/src/app/shared-state/agent-readonly/_demo/readonly-state-agent-context";

export default function Page() {
  return (
    <>
      <RouteHeader path="/shared-state/agent-readonly" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <code>useAgentContext</code> publishes a value plus a short label to
          the agent on every turn, with no setter and no tool to change it —
          inputs, not shared state. The demo publishes three: a display name, a
          timezone, and a checklist of recent activity. Edit any of them and
          the next answer in the popup reflects it.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "What do you know about me from my context?",
              "Based on my recent activity, what should I try next?",
            ]}
            expect="The answer names Sarah, America/Los_Angeles and the ticked activities; change the name and ask again, and the new name comes back. Backend-checked: sent the three entries directly, the agent read all three back."
            fail="The agent says it knows nothing about you — the context never reached the prompt."
          />
        </div>
      </Panel>

      <Callout tone="info" title="Demo UI simplified here — not the published layout">
        The Code tab&apos;s <code>demo-layout.tsx</code> is a three-card
        dashboard: an identity card with an avatar, a grid of activity
        toggles, and a stats row over a JSON viewer. This repo replaces it with
        one panel holding the same three inputs and the JSON the agent
        receives, and changes the default name from <code>Atai</code> to{" "}
        <code>Sarah</code>. The <code>useAgentContext</code> calls, their
        descriptions, and every other prop are as published.
      </Callout>

      <Callout tone="warn" title="The published agent cannot run; this one keeps its prompt only">
        The Code tab runs the demo on <code>src/agents/main.py</code>, whose
        first import is a <code>tools</code> package the docs never publish
        for Agno. It is kept byte-exact at{" "}
        <code>backend/docs_verbatim/main.py</code>. The agent here is its
        published session DB and <code>Agent(...)</code> literal with the{" "}
        <code>tools=[...]</code> list removed — this demo needs no tool. Its
        instructions still describe weather, flights and a sales pipeline it
        can no longer reach.
      </Callout>

      <Callout tone="warn" title="The page describes a middleware Agno does not have">
        It says context reaches the model through the backend&apos;s{" "}
        <code>CopilotKitMiddleware</code>, and its backend setup step is
        &ldquo;not bundled for agno&rdquo;. Nothing of the kind is needed:
        Agno&apos;s own AG-UI router turns AG-UI <code>context</code> into run
        dependencies and adds them to the prompt. On agno 3.1.1 each entry
        arrives keyed by its <code>description</code>.
      </Callout>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            { file: `${DEMO}/page.tsx` },
            { file: `${DEMO}/demo-layout.tsx` },
            { file: "backend/agents/main.py" },
          ]}
        />
      </Panel>

      <Panel title="The demo's page">
        <SourceCode file="frontend/src/app/shared-state/agent-readonly/demo-chat/page.tsx" />
      </Panel>
    </>
  );
}
