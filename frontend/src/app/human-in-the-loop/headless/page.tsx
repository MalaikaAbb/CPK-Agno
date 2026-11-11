import { RouteHeader } from "@/components/route-header";
import { Callout, Panel } from "@/components/ui";

export default function Page() {
  return (
    <>
      <RouteHeader path="/human-in-the-loop/headless" />

      <Panel title="What it covers">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Resolving an interrupt with no <code>useInterrupt</code> render slot:
          a hook built on <code>agent.subscribe</code> keeps the pending
          interrupt in React state, and the app resumes the run itself, so the
          picker can live anywhere in the tree.
        </p>
      </Panel>

      <Callout tone="warn" title="Broken (reference only): the page prints no Agno code">
        The rendered Agno page says &ldquo;Not supported on Agno&rdquo; and
        that headless interrupts aren&apos;t available on this framework. It
        has no Code tab and no code blocks for Agno. Nothing is filled in from
        the showcase, so this route has no demo and no backend.
      </Callout>
    </>
  );
}
