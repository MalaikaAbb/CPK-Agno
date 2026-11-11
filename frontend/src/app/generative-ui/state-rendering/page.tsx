import { RouteHeader } from "@/components/route-header";
import { Callout, CodeBlock, Panel } from "@/components/ui";

// The only code the page prints (its `.md` export). The rendered Agno page
// replaces even this with a "Not supported on Agno" notice.
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
      <RouteHeader path="/generative-ui/state-rendering" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A UI that re-renders from agent state as it changes: the frontend
          subscribes with <code>useAgent</code> to state and run-status
          updates, and a backend mapping is supposed to push a tool argument
          into state while the model is still generating it.
        </p>
      </Panel>

      <Callout tone="warn" title="Broken: the page prints no Agno code">
        The rendered Agno page shows &ldquo;Not supported on Agno&rdquo; in
        place of every code block, skips its backend setup and middleware
        snippet for Agno, and leaves Agno out of its integration grid. Nothing
        is filled in from the showcase or a sibling repo, so there is no demo
        and no backend agent here. The one snippet the page&apos;s{" "}
        <code>.md</code> export carries is shown below for reference; the
        components it lives in (<code>page.tsx</code>,{" "}
        <code>document-view.tsx</code>) are not printed.
      </Callout>

      <Panel title="Snippet from the page's .md export (reference only)">
        <CodeBlock code={USE_AGENT_SNIPPET} language="tsx" />
      </Panel>
    </>
  );
}
