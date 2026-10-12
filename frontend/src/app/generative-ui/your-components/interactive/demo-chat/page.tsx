"use client";

import { CopilotChat, useHumanInTheLoop } from "@copilotkit/react-core/v2";
import { z } from "zod";

import { DemoFrame } from "@/components/demo-frame";

/**
 * Frontend human-in-the-loop interactive component for Agno.
 *
 * Simulates an "approval" flow for executing a command using `useHumanInTheLoop`.
 * The run pauses here until the user clicks Approve or Deny.
 */
export default function Page() {
  useHumanInTheLoop({
    name: "humanApprovedCommand",
    description: "Ask human for approval to run a command.",
    parameters: z.object({
      command: z.string().describe("The command to run"),
    }),
    render: ({ args, respond, status }) => {
      if (status !== "executing") {
        return (
          <div className="my-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Command status: <code className="font-mono font-semibold">{args.command}</code> evaluated.
          </div>
        );
      }

      return (
        <div className="my-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Approval Required
          </p>
          <pre className="mt-2 overflow-x-auto rounded bg-slate-100 p-2.5 font-mono text-xs text-slate-800 dark:bg-slate-800 dark:text-slate-100">
            {args.command}
          </pre>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => respond?.(`Tell the user the command ran`)}
              className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
            >
              Approve
            </button>
            <button
              type="button"
              onClick={() => respond?.(`Tell the user the command wasn't run`)}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Deny
            </button>
          </div>
        </div>
      );
    },
  });

  return (
    <DemoFrame
      parentPath="/generative-ui/your-components/interactive"
      subtitle="useHumanInTheLoop — interactive approval flow"
    >
      <CopilotChat
        labels={{
          welcomeMessageText:
            'Ask me to execute a command (e.g. "Run npm test" or "Execute rm -rf /tmp/cache"). I will pause and request your approval.',
        }}
      />
    </DemoFrame>
  );
}

