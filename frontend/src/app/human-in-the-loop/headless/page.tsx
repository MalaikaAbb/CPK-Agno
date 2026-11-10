import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DEMO = "frontend/src/app/human-in-the-loop/headless/_demo";

export default function Page() {
  return (
    <>
      <RouteHeader path="/human-in-the-loop/headless" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          An interrupt resolved with no <code>useInterrupt</code> render slot.
          The demo&apos;s <code>useHeadlessInterrupt</code> hook subscribes to
          the agent with <code>agent.subscribe</code>, keeps the pending{" "}
          <code>on_interrupt</code> payload in React state, and resumes with{" "}
          <code>copilotkit.runAgent</code> and{" "}
          <code>forwardedProps.command</code>. The time picker renders in the
          app pane, outside the chat.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={["Book an intro call with the sales team to discuss pricing."]}
            expect="Per the page: a time-picker popup appears in the left pane; picking a slot clears it and the agent confirms in the chat."
            fail="Expected on Agno: no popup ever appears. The agent answers in text or says it can't schedule, because nothing emits on_interrupt and no schedule_meeting tool is registered."
          />
        </div>
      </Panel>

      <Callout tone="warn" title="Broken as published on Agno">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            The demo waits for a LangGraph-style <code>on_interrupt</code>{" "}
            custom event (its own header comment names LangGraph&apos;s{" "}
            <code>interrupt()</code>). The Agno agent it is wired to (
            <code>interrupt-headless</code> → <code>/interrupt-adapted</code>,
            the same one as <code>gen-ui-interrupt</code>) has no tools and
            expects the browser to provide <code>schedule_meeting</code>.
            This page registers no such tool, so the model has nothing to
            call and no event is ever emitted.
          </li>
          <li>
            The page itself says headless interrupts are not available on
            this framework, then embeds this demo.
          </li>
        </ul>
      </Callout>

      <Callout tone="info" title="What was copied">
        <code>interrupt-headless/page.tsx</code> is the Code tab&apos;s demo
        (the Agno showcase&apos;s <code>src/app/demos/interrupt-headless</code>),
        verbatim. Its <code>../_shared/interrupt-fallback-slots</code> import
        is not in the doc bundle; the file here is{" "}
        <strong>borrowed from the CopilotKit showcase on GitHub</strong>{" "}
        (<code>showcase/integrations/agno/src/app/demos/_shared</code>).
      </Callout>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            { file: `${DEMO}/interrupt-headless/page.tsx` },
            { file: `${DEMO}/_shared/interrupt-fallback-slots.ts` },
            { file: "backend/agents/interrupt_agent.py" },
          ]}
        />
      </Panel>
    </>
  );
}
