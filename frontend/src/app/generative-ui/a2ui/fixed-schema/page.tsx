import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DEMO = "frontend/src/app/generative-ui/a2ui/fixed-schema/_demo/a2ui-fixed-schema";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/a2ui/fixed-schema" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The opposite trade from dynamic schema: the component tree is a JSON
          file on the backend, written once. The agent&apos;s{" "}
          <code>display_flight</code> tool only supplies four values — origin,
          destination, airline, price — and returns them with that tree as an
          A2UI operations container. No second LLM call, so the card appears
          as soon as the tool returns. Bound props like an airport code
          reference the data model by path and are resolved before the React
          renderer sees them.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={["Find me a flight from SFO to JFK on United for $289."]}
            expect="A flight card: “Flight Details”, SFO → JFK, a UNITED badge, Total $289, and a “Book flight” button. Clicking the button does nothing — that is the published renderer, not a fault."
            fail="Blank airport, airline or price fields with no error — the symptom of zod 4, whose binder treats every prop as static. This repo pins zod 3.25.76 for that reason."
          />
        </div>
      </Panel>

      <Callout tone="warn" title="The page shows no Agno backend code">
        The two backend steps render as empty: the page source carries{" "}
        <code>region &apos;backend-schema-json-load&apos; missing in agno::a2ui-fixed-schema</code>{" "}
        and the same for <code>backend-render-operations</code>, and the setup
        section is &ldquo;not bundled for agno&rdquo;. The agent, both schema
        files and the runtime route used here come from the demo&apos;s Code
        tab, unchanged.
      </Callout>

      <Callout tone="warn" title="Page and Code tab disagree on the runtime config">
        The page&apos;s runtime snippet passes{" "}
        <code>a2ui: {"{ injectA2UITool: false, agents: [\"a2ui-fixed-schema\"] }"}</code>
        . The Code tab&apos;s route, used here, passes only{" "}
        <code>injectA2UITool: false</code>. The page calls the catalog
        &ldquo;5-component&rdquo;; its definitions declare seven, because{" "}
        <code>Card</code> and <code>Button</code> are overridden too.
      </Callout>

      <Callout tone="info" title="The Book button is inert, and booked_schema.json is unused">
        The schema gives the button a <code>book_flight</code> action, and the
        definition declares it as an action binding, but the published{" "}
        <code>Button</code> renderer has no click handler. Its comment blames
        the Python SDK&apos;s <code>a2ui.render</code> lacking{" "}
        <code>action_handlers</code> — yet the Agno agent never calls{" "}
        <code>a2ui.render</code>; it builds the operations by hand. The agent
        loads <code>booked_schema.json</code> into <code>BOOKED_SCHEMA</code>{" "}
        and never uses it.
      </Callout>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            { file: "backend/agents/a2ui_fixed_agent.py" },
            { file: "backend/agents/a2ui_schemas/flight_schema.json" },
            { file: `${DEMO}/a2ui/definitions.ts` },
            { file: `${DEMO}/a2ui/renderers.tsx` },
            { file: `${DEMO}/a2ui/catalog.ts` },
            { file: `${DEMO}/page.tsx` },
            { file: "frontend/src/app/api/copilotkit-a2ui-fixed-schema/route.ts" },
          ]}
        />
      </Panel>

      <Panel title="The demo's page">
        <SourceCode file="frontend/src/app/generative-ui/a2ui/fixed-schema/demo-chat/page.tsx" />
      </Panel>
    </>
  );
}
