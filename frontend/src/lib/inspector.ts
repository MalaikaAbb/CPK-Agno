/**
 * Which provider owns the Inspector on a given route.
 *
 * Every `<CopilotKit>` / `<CopilotKitProvider>` mounts its own Inspector in
 * dev unless told not to, and each Inspector is bound to its own provider's
 * core. Two on one page is not just redundant: both are lit custom elements,
 * and mounting two can spin lit-html into an assert loop that hangs the tab
 * and the dev server. And a root Inspector on a page whose chat runs on a
 * nested provider shows an empty event list, which reads as a broken
 * Inspector.
 *
 * The doc demos below are published wrapped in their own `<CopilotKit>`, so on
 * these routes the root provider stands down and the nested one (left at its
 * package default) owns the Inspector.
 *
 * `showDevConsole`, which the root provider also passes, does not control this
 * in 1.77 — only `enableInspector` does.
 */
export const NESTED_PROVIDER_ROUTES: readonly string[] = [
  "/generative-ui/a2ui/dynamic-schema/demo-chat",
  "/generative-ui/a2ui/fixed-schema/demo-chat",
  "/generative-ui/open-generative-ui/demo-chat",
  "/shared-state/rendering-in-app/demo-chat",
  "/shared-state/agent-readonly/demo-chat",
  "/human-in-the-loop/overview/demo-chat",
  "/multi-agent/subagents/demo-chat",
];

/** `enableInspector` for the app-wide provider: off where a nested one owns it. */
export function rootInspectorSetting(pathname: string | null): false | undefined {
  return pathname && NESTED_PROVIDER_ROUTES.includes(pathname) ? false : undefined;
}
