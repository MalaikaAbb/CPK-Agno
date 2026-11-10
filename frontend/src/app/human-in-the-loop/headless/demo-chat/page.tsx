"use client";

import { DemoFrame } from "@/components/demo-frame";
import { FitDemo } from "@/components/doc-demo";

import InterruptHeadlessDemo from "../_demo/interrupt-headless/page";

/**
 * The doc's demo, mounted as published. It brings its own `<CopilotKit>`, so
 * this route is in lib/inspector.ts and the root provider's Inspector stands
 * down here.
 */
export default function Page() {
  return (
    <DemoFrame parentPath="/human-in-the-loop/headless" subtitle="agent: interrupt-headless">
      <FitDemo>
        <InterruptHeadlessDemo />
      </FitDemo>
    </DemoFrame>
  );
}
