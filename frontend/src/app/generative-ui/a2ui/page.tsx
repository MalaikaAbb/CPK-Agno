import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel } from "@/components/ui";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/a2ui" />

      <Panel title="What it covers">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The A2UI overview: what the spec is, and the two switches CopilotKit
          gives you. On the server, <code>a2ui: {"{}"}</code> on{" "}
          <code>CopilotRuntime</code> wraps every registered agent (or only
          those listed in <code>a2ui.agents</code>) in the A2UI middleware. In
          the browser, an optional <code>a2ui={"{{ theme }}"}</code> prop on{" "}
          <code>&lt;CopilotKit&gt;</code> overrides the built-in theme. There
          is no demo on the page.
        </p>
      </Panel>

      <Callout tone="info" title="Where this is exercised in the harness">
        The runtime half runs in the two A2UI routes: the{" "}
        <a className="underline" href="/generative-ui/a2ui/fixed-schema">
          Fixed Schema
        </a>{" "}
        route passes an <code>a2ui</code> block to its runtime, and{" "}
        <a className="underline" href="/generative-ui/a2ui/dynamic-schema">
          Dynamic Schema
        </a>{" "}
        relies on the catalog auto-enabling it. This page&apos;s snippets are
        kept byte-for-byte below and type-checked with the rest of the app,
        but never run.
      </Callout>

      <Callout tone="warn" title="Gaps in the published snippets">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            The runtime snippet registers <code>{"{ default: myAgent }"}</code>{" "}
            and never defines <code>myAgent</code>.
          </li>
          <li>
            The theme snippet is a bare JSX expression around an undefined{" "}
            <code>children</code>.
          </li>
          <li>
            The page says any A2UI output from the agent then renders with no
            other code. With <code>a2ui: {"{}"}</code> and no catalog on the
            provider, the installed runtime (1.77) does not inject an A2UI
            tool (<code>injectA2UITool</code> stays undefined). So a plain Agno
            agent has no way to produce A2UI unless its own tools return A2UI
            operations, as the Fixed Schema agent does.
          </li>
        </ul>
        Both undefined names are suppressed with{" "}
        <code>@ts-expect-error</code>, and the expressions are unchanged.
      </Callout>

      <Panel title="The page's snippets, verbatim">
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/generative-ui/a2ui/_doc/route.ts" },
            { file: "frontend/src/app/generative-ui/a2ui/_doc/theme.tsx" },
          ]}
        />
      </Panel>
    </>
  );
}
