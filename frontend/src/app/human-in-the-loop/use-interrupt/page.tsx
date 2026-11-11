import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel } from "@/components/ui";

export default function Page() {
  return (
    <>
      <RouteHeader path="/human-in-the-loop/use-interrupt" />

      <Panel title="What it covers">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <code>useInterrupt</code> pauses a run and hands it to a React
          component, then resumes with whatever the user picked. The page
          explains the AG-UI standard flow (<code>RUN_FINISHED</code> with an
          interrupt outcome, answered with <code>resolve</code> /{" "}
          <code>cancel</code>), the legacy <code>on_interrupt</code> custom
          event, and multi-interrupt runs.
        </p>
      </Panel>

      <Callout tone="warn" title="Broken: not supported on Agno">
        The rendered Agno page shows &ldquo;Not supported on Agno&rdquo; where
        the demo would be, and a callout saying <code>useInterrupt</code> is
        not available on this framework. It embeds no Agno demo and prints no
        Agno backend. Only its two generic <code>useInterrupt</code> snippets
        are kept, byte-for-byte and type-checked. They aren&apos;t run,
        because Agno&apos;s stock AG-UI router emits no interrupt outcome for
        them to receive. Nothing is filled in from the showcase or the HITL
        overview route.
      </Callout>

      <Panel title="The page's snippets, verbatim">
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/human-in-the-loop/use-interrupt/_doc/approve-cancel.tsx" },
            { file: "frontend/src/app/human-in-the-loop/use-interrupt/_doc/multi-interrupt.tsx" },
          ]}
        />
      </Panel>
    </>
  );
}
