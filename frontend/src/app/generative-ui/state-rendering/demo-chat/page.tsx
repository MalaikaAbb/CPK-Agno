"use client";

import { DemoFrame } from "@/components/demo-frame";
import { FitDemo } from "@/components/doc-demo";

import SharedStateStreamingDemo from "../_demo/shared-state-streaming/page";

/**
 * The doc's demo, mounted as published. It brings its own `<CopilotKit>`, so
 * this route is in lib/inspector.ts and the root provider's Inspector stands
 * down here.
 */
export default function Page() {
  return (
    <DemoFrame parentPath="/generative-ui/state-rendering" subtitle="agent: shared-state-streaming">
      <FitDemo>
        <SharedStateStreamingDemo />
      </FitDemo>
    </DemoFrame>
  );
}
