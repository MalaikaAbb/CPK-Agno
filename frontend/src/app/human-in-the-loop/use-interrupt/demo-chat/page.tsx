"use client";

import { DemoFrame } from "@/components/demo-frame";
import { FitDemo } from "@/components/doc-demo";

// The page embeds the same `gen-ui-interrupt` demo as the HITL overview, so
// the copy already in this repo is mounted rather than duplicated.
import GenUiInterruptDemo from "../../overview/_demo/gen-ui-interrupt/page";

/**
 * The doc's demo, mounted as published. It brings its own `<CopilotKit>`, so
 * this route is in lib/inspector.ts and the root provider's Inspector stands
 * down here.
 */
export default function Page() {
  return (
    <DemoFrame parentPath="/human-in-the-loop/use-interrupt" subtitle="agent: gen-ui-interrupt">
      <FitDemo>
        <GenUiInterruptDemo />
      </FitDemo>
    </DemoFrame>
  );
}
