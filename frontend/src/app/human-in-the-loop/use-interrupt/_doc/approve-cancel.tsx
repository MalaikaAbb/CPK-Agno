// Byte-exact copy of a snippet on
// https://docs.copilotkit.ai/agno/human-in-the-loop/useInterrupt
// ("Approve / Cancel example"). Type-checked, never rendered: nothing imports it, and Agno's
// stock AG-UI router emits no AG-UI interrupt outcome for it to receive.
import { useInterrupt } from "@copilotkit/react-core/v2";

function ApprovalInterrupt() {
  useInterrupt({
    render: ({ interrupt, resolve, cancel }) => (
      <div className="p-3 border rounded">
        <p>{interrupt?.message ?? "Approve this action?"}</p>
        <div className="mt-2 flex gap-2">
          <button onClick={() => resolve({ approved: true })}>Approve</button>
          <button onClick={() => cancel()}>Cancel</button>
        </div>
      </div>
    ),
  });
  return null;
}
