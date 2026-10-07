import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, CodeBlock, Panel, TryIt } from "@/components/ui";

const DEMO = "frontend/src/app/shared-state/rendering-in-app/_demo";

// The page's third snippet, as printed. It has no file and no surrounding
// component, so it is shown here rather than placed anywhere.
const TOGGLE_ITEM = `function toggleItem(id: string) {
  agent.setState({
    ...agent.state,
    items: (agent.state?.items ?? []).map((it) =>
      it.id === id ? { ...it, done: !it.done } : it,
    ),
  });
}`;

export default function Page() {
  return (
    <>
      <RouteHeader path="/shared-state/rendering-in-app" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <code>agent.state</code> is ordinary React data, so a component
          nowhere near the chat can subscribe with <code>useAgent()</code> and
          render it. The page&apos;s <code>Canvas</code> does that, seeding a
          title and two checklist items into any fields the agent has not set
          yet. A <code>CopilotSidebar</code> beside it runs on the same agent.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={["What's on my checklist?"]}
            expect="The canvas shows “Project launch” with two items as soon as the agent connects, before any message. What the agent says about the checklist depends on whether this repo's default agent reads state into its prompt — the page does not say how to make it do so for Agno."
            fail="“Untitled” and an empty list — the effect never ran, which means `isReady` never went true."
          />
        </div>
      </Panel>

      <Callout tone="warn" title="No demo and no backend half">
        The page embeds no demo and has no Code tab. Both its snippets are
        frontend-only and run here verbatim, on this repo&apos;s default agent.
        Nothing on the page shows an Agno agent writing <code>title</code> or{" "}
        <code>items</code>, or reading them, so the canvas only ever shows its
        UI-owned initial state and whatever the browser writes.
      </Callout>

      <Callout tone="info" title="The write-back snippet has nowhere to go">
        <p>
          The page&apos;s <code>toggleItem</code> example uses an{" "}
          <code>agent</code> from an enclosing scope and is not wired to any
          element in <code>Canvas</code>, so it is not mounted here:
        </p>
        <div className="mt-2">
          <CodeBlock code={TOGGLE_ITEM} language="tsx" />
        </div>
      </Callout>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            { file: `${DEMO}/components/Canvas.tsx` },
            { file: `${DEMO}/app/page.tsx` },
          ]}
        />
      </Panel>

      <Panel title="The demo's page">
        <SourceCode file="frontend/src/app/shared-state/rendering-in-app/demo-chat/page.tsx" />
      </Panel>
    </>
  );
}
