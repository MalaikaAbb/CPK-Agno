import { RouteHeader } from "@/components/route-header";
import { Callout } from "@/components/ui";

/**
 * Nothing is implemented here on purpose.
 *
 * The Agno MCP Apps page has no Agno code. Its only setup is a runtime built
 * around `BuiltInAgent`, pointing at an MCP server on :3108, and it embeds no
 * demo. The docs' bundle does carry an `agno::mcp-apps` demo (a no-tools Agno
 * agent and a runtime pointed at the public Excalidraw MCP app), but the page
 * neither shows nor links it. Decided 2026-10-07: track for drift, build
 * nothing.
 */
export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/mcp-apps" />
      <Callout tone="info" title="Not implemented — the page publishes no Agno code">
        Every code sample on the page uses <code>BuiltInAgent</code> from{" "}
        <code>@copilotkit/runtime/v2</code>; none touches Agno. The page also
        embeds no interactive demo, so there is no Code tab to fall back on.
        This route exists so doc-sync notices when that changes.
      </Callout>
    </>
  );
}
