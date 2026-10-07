"use client";

import { DemoFrame } from "@/components/demo-frame";
import { FitDemo } from "@/components/doc-demo";

import SubagentsDemo from "../_demo/subagents/page";

/**
 * The doc's demo, mounted as published. It brings its own `<CopilotKit>`, so
 * this route is in lib/inspector.ts and the root provider's Inspector stands
 * down here.
 */
export default function Page() {
  return (
    <DemoFrame parentPath="/multi-agent/subagents" subtitle="agent: subagents">
      <FitDemo>
        <SubagentsDemo />
      </FitDemo>
    </DemoFrame>
  );
}
