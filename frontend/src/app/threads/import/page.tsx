import { RouteHeader } from "@/components/route-header";
import { Callout, CodeBlock, Panel } from "@/components/ui";

const DRY_RUN = `# Preview what would be imported — no writes.
npx copilotkit@latest import --source adk --dry-run
npx copilotkit@latest import --source langgraph --user-source metadata.user_id --dry-run
npx copilotkit@latest import --source mastra --dry-run`;

export default function Page() {
  return (
    <>
      <RouteHeader path="/threads/import" />

      <Callout tone="premium" title="Not runnable from this repo">
        Import moves existing conversations into a licensed Enterprise
        Intelligence project. No destination project or supported source store
        is configured here. The guide covers Google ADK, LangGraph, Mastra, and
        AWS Strands; Agno is not a documented import source. This route
        documents the operation rather than performing it.
      </Callout>

      <Panel title="What import is for">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Threads only start capturing conversations once an app is connected to
          the platform. Anything that happened before that — or in a framework&apos;s
          own session store — is invisible to the thread list. Import copies
          supported history into Intelligence so users can reopen old and new
          conversations through one UI. It does not recover past execution or
          keep the source database replicated.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Your agent framework remains responsible for execution state and
          durable persistence. Keep its native store configured and retain a
          stable mapping between Intelligence thread IDs and native conversation
          IDs so future runs continue the same conversation.
        </p>
      </Panel>

      <Panel title="Keep identity mappings stable">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Map each source agent key to the same <code>agentId</code> used by
          later runtime traffic. The imported application user ID must match
          the ID returned by the runtime&apos;s <code>identifyUser</code>. The
          LangGraph dry run above uses <code>metadata.user_id</code> as its
          source user ID.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          After importing, reopen a conversation as its assigned application
          user, then send a message to confirm the native framework continues
          the same conversation with its existing thread ID mapping.
        </p>
      </Panel>

      <Panel title="The commands">
        <CodeBlock filename="Terminal" language="bash" code={DRY_RUN} />
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Always start with <code>--dry-run</code>. It reports what would be
          imported without writing anything, which is the only safe way to check
          the scope before backfilling a real project.
        </p>
      </Panel>

      <Callout tone="warn" title="Half the env vars got renamed">
        This sync changed the importer&apos;s exported key to{" "}
        <code>CPK_INTELLIGENCE_API_KEY</code> but left{" "}
        <code>INTELLIGENCE_API_URL</code> on the line above it untouched, so the
        page now asks you to export one prefixed variable and one unprefixed one
        for the same credential pair. Nothing says whether the URL variable was
        missed or is deliberately unprefixed.
      </Callout>

      <Callout tone="warn" title="The example key changed shape without a word">
        The sample value went from <code>cpk_...</code> to <code>cpk-...</code>{" "}
        — underscore to hyphen. Elsewhere the docs describe &ldquo;a
        project-scoped <code>cpk</code> runtime key&rdquo; without pinning the
        separator. One of the two spellings is wrong and the page does not say
        which, so a reader hand-typing the key has a coin flip.
      </Callout>

      <Panel title="If you wanted to try it here">
        <ol className="list-decimal space-y-1.5 pl-5 text-sm text-slate-700 dark:text-slate-300">
          <li>
            Create a free developer account and run{" "}
            <code>npx copilotkit@latest login</code>.
          </li>
          <li>
            Select or create a project with{" "}
            <code>npx copilotkit@latest project select</code>. For a
            CLI-created app, it updates the generated <code>.env</code>. The
            importer does not load <code>.env</code> or
            <code>.copilotkit/project.json</code> automatically, so export the
            destination URL and project key in the shell or pass
            <code>--api-url</code> and <code>--api-key</code>.
          </li>
          <li>
            Point <code>--source</code> at a framework you actually have history
            in: Google ADK, LangGraph, Mastra, or AWS Strands. Agno is not
            currently a documented import source.
          </li>
        </ol>
      </Panel>
    </>
  );
}
