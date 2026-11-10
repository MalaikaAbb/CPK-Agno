import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DEMO = "frontend/src/app/shared-state/streaming/_demo/shared-state-streaming";

export default function Page() {
  return (
    <>
      <RouteHeader path="/shared-state/streaming" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          State streaming: a backend mapping pushes one streaming tool argument
          (<code>write_document.document</code>) into one state key (
          <code>document</code>) while the model is still generating it. The
          frontend is an ordinary <code>useAgent</code> subscription with{" "}
          <code>OnStateChanged</code>, plus <code>OnRunStatusChanged</code> for
          the LIVE badge.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={["Write a short poem about autumn leaves."]}
            expect="The LIVE badge lights while the agent runs; once write_document finishes, the whole document appears in the panel. On Agno it arrives in one piece, not token by token."
            fail="The panel stays empty and the text appears in the chat instead."
          />
        </div>
      </Panel>

      <Callout tone="warn" title="The page's whole backend half is missing for Agno">
        The backend section is the page&apos;s core, and for Agno both its
        setup and its middleware snippet are skipped (&ldquo;not bundled for
        agno&rdquo;). The integration grid excludes Agno too. The agent here,{" "}
        <code>backend/agents/state_streaming_agent.py</code>, is{" "}
        <strong>borrowed from the ms-agent-python showcase</strong> (prompt
        and <code>write_document</code> tool). Agno&apos;s stock AG-UI router
        can&apos;t stream a tool argument into state, so the document lands
        whole when the tool finishes. The page&apos;s three requirements (the
        key exists, the names match, the final value lands in the same key)
        are met. The per-token part isn&apos;t.
      </Callout>

      <Callout tone="info" title="Same demo as Generative UI › State Rendering">
        The page embeds the same <code>shared-state-streaming</code> demo as
        the State Rendering page. The frontend here is the Code tab&apos;s,
        verbatim, and the borrowed agent file, backend prefix and runtime id
        are identical to that route&apos;s.
      </Callout>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            { file: `${DEMO}/page.tsx` },
            { file: `${DEMO}/document-view.tsx` },
            { file: "backend/agents/state_streaming_agent.py" },
          ]}
        />
      </Panel>
    </>
  );
}
