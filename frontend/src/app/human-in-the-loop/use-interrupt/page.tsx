import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DEMO = "frontend/src/app/human-in-the-loop/overview/_demo/gen-ui-interrupt";

export default function Page() {
  return (
    <>
      <RouteHeader path="/human-in-the-loop/use-interrupt" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <code>useInterrupt</code> pauses a run and hands it to a React
          component, then resumes with whatever the user picked. The page
          explains the AG-UI standard flow (<code>RUN_FINISHED</code> with an
          interrupt outcome, answered with <code>resolve</code> /{" "}
          <code>cancel</code>), the legacy <code>on_interrupt</code> custom
          event, and multi-interrupt runs.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The embedded demo for Agno is <code>gen-ui-interrupt</code>. Agno has
          no <code>interrupt()</code> primitive, so the demo uses the
          documented fallback: an async <code>useFrontendTool</code> named{" "}
          <code>schedule_meeting</code> whose promise resolves only when a time
          is picked.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={["Please book an intro call with the sales team to discuss pricing."]}
            expect="A time-picker card appears in the chat; picking a slot resumes the run and the agent confirms the time."
            fail="Expected on this stack: the pick ends in RUN_ERROR 'Frontend tool resume requires a database'. The published interrupt agent has no db (same as the HITL overview route)."
          />
        </div>
      </Panel>

      <Callout tone="warn" title="The page says this isn't available on Agno, then embeds an Agno demo">
        A callout on the page says <code>useInterrupt</code> is not available
        on this framework and points to <code>useHumanInTheLoop</code>. Its
        own condition, though, includes &ldquo;a Promise-resolving frontend
        tool path&rdquo;, which is exactly what the embedded Agno demo uses.
        Both are kept: the demo runs as published, and the page&apos;s two
        generic <code>useInterrupt</code> snippets are kept byte-for-byte and
        type-checked, but not run, because Agno&apos;s stock AG-UI router
        emits no interrupt outcome for them to receive.
      </Callout>

      <Callout tone="info" title="Demo reused from the HITL overview route">
        The demo&apos;s files already live in this repo under{" "}
        <code>/human-in-the-loop/overview</code> (same Code tab, same{" "}
        <code>gen-ui-interrupt</code> agent at <code>/interrupt-adapted</code>),
        so this route mounts that copy. Its <code>generateFallbackSlots</code>{" "}
        helper there is repo-authored.
      </Callout>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            { file: `${DEMO}/page.tsx` },
            { file: "frontend/src/app/human-in-the-loop/use-interrupt/_doc/approve-cancel.tsx" },
            { file: "frontend/src/app/human-in-the-loop/use-interrupt/_doc/multi-interrupt.tsx" },
            { file: "backend/agents/interrupt_agent.py" },
          ]}
        />
      </Panel>
    </>
  );
}
