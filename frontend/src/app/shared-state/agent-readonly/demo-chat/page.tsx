"use client";

import { DemoFrame } from "@/components/demo-frame";
import { FitDemo } from "@/components/doc-demo";

import ReadonlyStateAgentContextDemo from "../_demo/readonly-state-agent-context/page";

/**
 * The doc's demo, mounted as published. It brings its own `<CopilotKit>`, so
 * this route is in lib/inspector.ts and the root provider's Inspector stands
 * down here.
 */
export default function Page() {
  return (
    <DemoFrame parentPath="/shared-state/agent-readonly" subtitle="agent: readonly-state-agent-context">
      <FitDemo>
        <ReadonlyStateAgentContextDemo />
      </FitDemo>
    </DemoFrame>
  );
}
