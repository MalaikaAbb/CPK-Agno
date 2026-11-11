import { RouteHeader } from "@/components/route-header";
import { Callout, CodeBlock, Panel } from "@/components/ui";

// The only code the page prints (its `.md` export). The rendered Agno page
// shows a "Not supported on Agno" notice instead.
const USE_AGENT_SNIPPET = `// src/app/demos/shared-state-streaming/page.tsx
  // Subscribe to BOTH state changes and run-status changes. The former
  // drives the per-token document rerender; the latter toggles the
  // "LIVE" badge when the agent starts / stops.
  const { agent } = useAgent({
    agentId: "shared-state-streaming",
    updates: [UseAgentUpdate.OnStateChanged, UseAgentUpdate.OnRunStatusChanged],
  });`;

export default function Page() {
  return (
    <>
      <RouteHeader path="/shared-state/streaming" />

      <Panel title="What it covers">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          State streaming: a backend mapping pushes a streaming tool argument
          into a state key while the model is still generating it, and the UI
          follows along through an ordinary <code>useAgent</code> subscription.
        </p>
      </Panel>

      <Callout tone="warn" title="Broken (reference only): the page prints no Agno code">
        The rendered Agno page says &ldquo;Not supported on Agno&rdquo;. Its
        backend setup and middleware snippet are skipped for Agno, and the
        demo isn&apos;t embedded. Nothing is filled in from the showcase or a
        sibling repo, so there is no demo and no agent here. The one frontend
        snippet the <code>.md</code> export carries is shown below.
      </Callout>

      <Panel title="Snippet from the page's .md export (reference only)">
        <CodeBlock code={USE_AGENT_SNIPPET} language="tsx" />
      </Panel>
    </>
  );
}
