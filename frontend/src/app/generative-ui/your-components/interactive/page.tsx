import { RouteHeader } from "@/components/route-header";
import { SessionStorageCallout } from "@/components/session-storage-callout";
import { SourceCode } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/your-components/interactive" />

      <SessionStorageCallout />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Frontend tools enable you to define client-side functions that your agent can
          invoke, with execution happening entirely in the user&apos;s browser. When your agent
          calls a frontend tool, the logic runs on the client side, giving you direct access to
          the frontend environment.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          This can be utilized for UI control, generative UI, or Human-in-the-loop interactions.
          In this guide, we cover the use of frontend tools for Human-in-the-loop by simulating
          an &ldquo;approval&rdquo; flow for executing a command. We use the{" "}
          <code>useHumanInTheLoop</code> hook to create a tool that prompts the user for approval
          before proceeding.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Run command 'npm run build'",
              "Execute command 'rm -rf /tmp/cache' with approval",
            ]}
            expect="An approval prompt renders inline in the chat showing the command with Approve and Deny buttons. The agent run pauses until you click one of the buttons."
            fail="The agent responds in plain text without rendering the approval buttons, or continues without waiting for your response."
          />
        </div>
      </Panel>

      <Panel title="When should I use this?">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Use frontend tools when you need your agent to interact with client-side primitives such as:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
          <li>Reading or modifying React component state</li>
          <li>Accessing browser APIs like localStorage, sessionStorage, or cookies</li>
          <li>Triggering UI updates or animations</li>
          <li>Interacting with third-party frontend libraries</li>
          <li>Performing actions that require the user&apos;s immediate browser context</li>
        </ul>
      </Panel>

      <Panel
        title="Source"
        description="Read from this repo — the file the demo route runs."
      >
        <SourceCode file="frontend/src/app/generative-ui/your-components/interactive/demo-chat/page.tsx" />
      </Panel>

      <Callout tone="info" title="Session storage prerequisite">
        Agno must store the paused run before a frontend tool can return its result.
        Configure a database on the Agent that owns the external tool (configured via{" "}
        <code>SqliteDb(db_file=&quot;tmp/agno.db&quot;)</code> in <code>backend/agent.py</code>).
      </Callout>
    </>
  );
}
