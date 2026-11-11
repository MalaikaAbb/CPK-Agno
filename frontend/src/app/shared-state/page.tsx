import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DEMO = "frontend/src/app/shared-state/_demo/shared-state-read-write";

export default function Page() {
  return (
    <>
      <RouteHeader path="/shared-state" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Two-way shared state. The UI reads <code>agent.state</code> through{" "}
          <code>useAgent</code> with <code>OnStateChanged</code>, and writes
          back with <code>agent.setState</code>. The agent is meant to write a
          notes list that a card renders.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={["Remember that I prefer short answers and I'm learning Spanish."]}
            expect="Expected to fail today: agent shared-state-read-write is not registered (the page prints no Agno backend). If one is published, the notes card fills from agent state."
            fail="An agent-not-found error from the runtime: the documented gap."
          />
        </div>
      </Panel>

      <Callout tone="info" title="What is doc code here">
        The page has no demo. It prints three snippets: the{" "}
        <code>useAgent</code> read and the <code>handlePreferencesChange</code>{" "}
        write from <code>page.tsx</code>, and the whole of{" "}
        <code>notes-card.tsx</code>. Those are verbatim. The rest of{" "}
        <code>page.tsx</code> is minimal glue (provider, the types the
        fragments name, the <code>notes</code> value, mounting{" "}
        <code>NotesCard</code>). <code>_components/card.tsx</code> and{" "}
        <code>button.tsx</code> are <strong>minimal stand-ins, not from the
        doc page</strong>: <code>notes-card.tsx</code> imports them without
        printing them.
      </Callout>

      <Callout tone="warn" title="Broken: no Agno backend, no preferences UI">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            The page&apos;s backend setup is skipped for Agno (&ldquo;not
            bundled for agno&rdquo;), and it prints no agent. Nothing is filled
            in from the showcase, so agent <code>shared-state-read-write</code>{" "}
            is not registered and the demo can&apos;t run.
          </li>
          <li>
            The page prints <code>handlePreferencesChange</code> but not the
            preferences card that calls it, so nothing in the demo calls it. It
            also prints no clear handler for <code>NotesCard</code>&apos;s{" "}
            <code>onClear</code>.
          </li>
          <li>
            The write snippet&apos;s comment names{" "}
            <code>PreferencesInjectorMiddleware</code>, which is LangGraph&apos;s
            mechanism.
          </li>
          <li>
            The streaming section has no Agno snippet; see{" "}
            <a className="underline" href="/shared-state/streaming">
              State Streaming
            </a>
            .
          </li>
        </ul>
      </Callout>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            { file: `${DEMO}/page.tsx` },
            { file: `${DEMO}/notes-card.tsx` },
          ]}
        />
      </Panel>
    </>
  );
}
