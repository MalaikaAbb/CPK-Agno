import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DEMO = "frontend/src/app/human-in-the-loop/overview/_demo";

export default function Page() {
  return (
    <>
      <RouteHeader path="/human-in-the-loop/overview" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Two ways to stop a run and ask the user. In the first, the model
          chooses to call <code>book_call</code>, a tool registered in the
          browser with <code>useHumanInTheLoop</code>; a time picker renders in
          the chat and the user&apos;s pick becomes the tool result. The second
          is meant to be a pause the backend enforces with{" "}
          <code>interrupt()</code>. Agno has no such primitive, so the
          docs&apos; Agno demo fakes it with the same tool mechanism under
          another name, <code>schedule_meeting</code>. Both demos are tabs on
          the demo route.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Please book an intro call with the sales team to discuss pricing.",
              "Schedule a 1:1 with Alice next week to review Q2 goals.",
            ]}
            expect="hitl-in-chat tab: a picker with four slots; pick one and the agent confirms that time. gen-ui-interrupt tab: the picker appears, but after you pick, the run errors with “Frontend tool resume requires a database”. Both backend-checked."
            fail="On hitl-in-chat, the agent asks for a time in prose instead of showing the picker — `book_call` was not offered to it."
          />
        </div>
      </Panel>

      <Callout tone="warn" title="The interrupt demo cannot resume on the stock router">
        <p>
          The published <code>interrupt_agent.py</code> has no{" "}
          <code>db</code>, and says why: the docs&apos; custom route forwards
          the frontend&apos;s tool result straight back to the model. That
          route lives in their <code>agent_server.py</code>, which imports
          helpers agno 3.x removed (<code>agno.os.interfaces.agui.utils</code>
          ) plus private modules, so it cannot run here and the stock router is
          used. The stock router resumes the paused run from storage instead.
          Without a <code>db</code> the second leg fails with RUN_ERROR{" "}
          <code>Frontend tool resume requires a database</code>. The agent is
          left as published.
        </p>
      </Callout>

      <Callout tone="warn" title="What is not published">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <code>main.py</code>, which runs hitl-in-chat, imports an
            unpublished <code>tools</code> package. The agent here is its
            published prompt and session DB, without the tool list. Kept
            byte-exact at <code>backend/docs_verbatim/main.py</code>.
          </li>
          <li>
            <code>generateFallbackSlots</code>, imported by the gen-ui-interrupt
            page from <code>../_shared/interrupt-fallback-slots</code>, exists
            in no framework&apos;s bundle.{" "}
            <code>_demo/_shared/interrupt-fallback-slots.ts</code> is
            repo-authored: four upcoming weekday slots.
          </li>
          <li>The page&apos;s backend setup step is &ldquo;not bundled for agno&rdquo;.</li>
        </ul>
      </Callout>

      <Callout tone="info" title="Smaller mismatches">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            The frontend&apos;s <code>book_call</code> takes{" "}
            <code>topic</code> and <code>attendee</code>; the published{" "}
            <code>main.py</code> also declares a backend <code>book_call</code>{" "}
            taking <code>topic</code> and <code>name</code>. With that tool
            removed here, only the browser&apos;s schema reaches the model.
          </li>
          <li>
            The page prints the same <code>page.tsx</code> excerpt twice, the
            second time captioned as if it were only the slot list.
          </li>
          <li>
            The page frames pattern 2 around LangGraph&apos;s{" "}
            <code>interrupt()</code>; the Agno demo&apos;s own comment says{" "}
            <code>useInterrupt</code> is &ldquo;silently dead&rdquo; on Agno.
          </li>
        </ul>
      </Callout>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            { file: `${DEMO}/hitl-in-chat/page.tsx` },
            { file: `${DEMO}/gen-ui-interrupt/page.tsx` },
            { file: `${DEMO}/_shared/interrupt-fallback-slots.ts` },
            { file: "backend/agents/main.py" },
            { file: "backend/agents/interrupt_agent.py" },
          ]}
        />
      </Panel>

      <Panel title="The demo's page">
        <SourceCode file="frontend/src/app/human-in-the-loop/overview/demo-chat/page.tsx" />
      </Panel>
    </>
  );
}
