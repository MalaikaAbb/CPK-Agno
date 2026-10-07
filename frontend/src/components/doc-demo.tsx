"use client";

import { useState, type ComponentType } from "react";

/**
 * Hosts a doc demo inside `DemoFrame` without editing it.
 *
 * The demos in the docs' Code tabs are whole pages: they size themselves with
 * `h-screen`, which inside DemoFrame would push the chat input below the
 * fold by the height of the frame's bar. The arbitrary variant here remaps
 * any `h-screen` inside to the frame's height instead, so the published
 * markup stays byte-exact.
 */
export function FitDemo({ children }: { children: React.ReactNode }) {
  return <div className="h-full [&_.h-screen]:h-full!">{children}</div>;
}

/**
 * For doc pages that embed more than one demo. Only the selected one is
 * mounted — each brings its own `<CopilotKit>`, and two providers on a page
 * would mean two Inspectors (see lib/inspector.ts).
 */
export function DemoTabs({
  demos,
}: {
  demos: { id: string; label: string; Demo: ComponentType }[];
}) {
  const [active, setActive] = useState(demos[0].id);
  const current = demos.find((d) => d.id === active) ?? demos[0];

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 gap-1 border-b border-slate-200 px-3 py-1.5 dark:border-slate-800">
        {demos.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setActive(d.id)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium ${
              d.id === current.id
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1">
        <FitDemo>
          <current.Demo key={current.id} />
        </FitDemo>
      </div>
    </div>
  );
}
