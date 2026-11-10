import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DEMO = "frontend/src/app/generative-ui/state-rendering/_demo/shared-state-streaming";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/state-rendering" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A document panel driven only by <code>agent.state.document</code>.
          The page subscribes with <code>useAgent</code> to both state changes
          and run-status changes, so the panel re-renders as state arrives and
          a LIVE badge shows while the run is going. The page&apos;s point is
          that a backend mapping pushes a tool argument into state while the
          model is still generating it, so the text builds up token by token.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Write a short poem about autumn leaves.",
              "Draft a two-paragraph product announcement for a note-taking app.",
            ]}
            expect="The LIVE badge lights while the agent runs; once write_document finishes, the whole document appears in the panel. With this Agno backend it arrives in one piece, not token by token."
            fail="The panel stays empty and the text appears as a chat message instead: the tool was not called, or no state event reached the client."
          />
        </div>
      </Panel>

      <Callout tone="info" title="Frontend files are the Code tab's, verbatim">
        <code>page.tsx</code>, <code>demo-layout.tsx</code>,{" "}
        <code>document-view.tsx</code> and <code>suggestions.ts</code> are the
        page&apos;s <code>shared-state-streaming</code> demo for Agno,
        unchanged. The page shows the <code>useAgent</code> call from{" "}
        <code>page.tsx</code>.
      </Callout>

      <Callout tone="warn" title="No Agno backend is published — the agent here is borrowed">
        The page skips its backend setup and its middleware snippet for Agno,
        and leaves Agno out of its own integration grid. The Agno showcase
        runs the demo on its main agent, which has nothing that writes{" "}
        <code>document</code>. So <code>backend/agents/state_streaming_agent.py</code>{" "}
        is <strong>borrowed from the ms-agent-python showcase</strong> (its
        prompt and its <code>write_document</code> tool), with a{" "}
        <code>session_state</code> write as Agno glue.
      </Callout>

      <Callout tone="warn" title="Per-token streaming is not possible on the stock Agno router">
        Agno&apos;s AG-UI router emits a <code>STATE_DELTA</code> only after a
        tool has run. It has no way to stream a tool argument into state while
        it is being generated, which is what the page is about. So the
        document lands in one piece at the end of the tool call. That is why
        this route is <code>partial</code>.
      </Callout>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            { file: `${DEMO}/page.tsx` },
            { file: `${DEMO}/demo-layout.tsx` },
            { file: "backend/agents/state_streaming_agent.py" },
          ]}
        />
      </Panel>
    </>
  );
}
