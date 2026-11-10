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
          back with <code>agent.setState</code>. A preferences card (name,
          tone, language, interests) writes into state, the agent reads it on
          its next turn, and the agent&apos;s <code>set_notes</code> tool
          writes a notes list that a card renders, with a Clear button that
          writes back again.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Remember that I prefer short answers and I'm learning Spanish.",
              "What do you know about my preferences?",
            ]}
            expect="After the first prompt the Agent Scratch pad fills with notes. After you change the name or tone in the preferences card, the next answer follows it. Clear empties the notes."
            fail="The notes card stays empty even though the agent says it saved notes (no state event reached the client), or the answer ignores the edited preferences (the setState write didn't reach session_state)."
          />
        </div>
      </Panel>

      <Callout tone="info" title="Where the code comes from">
        The page has no embedded demo, but its three snippets are cut from
        the <code>shared-state-read-write</code> demo files (the
        page&apos;s <code>useAgent</code> and <code>setState</code> regions
        from <code>page.tsx</code>, and <code>notes-card.tsx</code>). That
        demo is the Agno showcase&apos;s, copied whole and verbatim, together
        with its agent <code>backend/agents/shared_state_read_write.py</code>,
        mounted at its published prefix <code>/shared-state-rw</code>.
      </Callout>

      <Callout tone="warn" title="Doc gaps">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            The page&apos;s backend setup is skipped for Agno (&ldquo;not
            bundled for agno&rdquo;), and its integration grid leaves Agno out.
            The agent here comes from the showcase, not from the page.
          </li>
          <li>
            The write snippet&apos;s comment says{" "}
            <code>PreferencesInjectorMiddleware</code> reads the preferences
            back. That&apos;s LangGraph&apos;s mechanism; the Agno agent does
            it with a dynamic <code>instructions</code> function over{" "}
            <code>session_state</code>.
          </li>
          <li>
            The showcase agent relies on its custom <code>agent_server.py</code>{" "}
            route to emit state, which can&apos;t import on agno 3. On the
            stock router the notes arrive in the run&apos;s closing{" "}
            <code>STATE_SNAPSHOT</code>. A per-tool <code>STATE_DELTA</code>{" "}
            would also need <code>jsonpatch</code>, which this backend
            doesn&apos;t install.
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
            { file: "backend/agents/shared_state_read_write.py" },
          ]}
        />
      </Panel>
    </>
  );
}
