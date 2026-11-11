// Byte-exact copy of the "Frontend" snippet on
// https://docs.copilotkit.ai/agno/generative-ui/a2ui. Type-checked, never
// rendered: nothing imports it. The snippet is a bare JSX expression whose
// `children` is not defined on the page.
import { CopilotKit, type A2UITheme } from "@copilotkit/react-core/v2";

// Your own theme object — the renderer reads the keys it understands.
// Leave the `a2ui` prop off entirely to keep the built-in theme.
const myCustomTheme: A2UITheme = {
  // ...your theme keys
};

<CopilotKit runtimeUrl="/api/copilotkit" a2ui={{ theme: myCustomTheme }}>
  {/* @ts-expect-error verbatim doc code: `children` is never defined on the page (TS2304) */}
  {children}
</CopilotKit>;
