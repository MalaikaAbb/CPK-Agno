// Byte-exact copy of a snippet on
// https://docs.copilotkit.ai/agno/human-in-the-loop/useInterrupt
// ("Multi-interrupt behavior"; the page prints it as a bare top-level call). Type-checked, never rendered: nothing imports it, and Agno's
// stock AG-UI router emits no AG-UI interrupt outcome for it to receive.
import { useInterrupt } from "@copilotkit/react-core/v2";

useInterrupt({
  render: ({ interrupts, resolve, cancel }) => (
    <ul>
      {interrupts.map((i) => (
        <li key={i.id}>
          {i.message}
          <button onClick={() => resolve({ ok: true }, i.id)}>Approve</button>
          <button onClick={() => cancel(i.id)}>Cancel</button>
        </li>
      ))}
    </ul>
  ),
});
