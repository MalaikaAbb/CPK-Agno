"use client";

import { DemoFrame } from "@/components/demo-frame";
import { FitDemo } from "@/components/doc-demo";

import ControlledGenUiDemo from "../_demo/gen-ui-tool-based/page";

/**
 * The doc's demo, mounted as published. It brings its own `<CopilotKit>`, so
 * this route is in lib/inspector.ts and the root provider's Inspector stands
 * down here.
 */
export default function Page() {
  return (
    <DemoFrame parentPath="/generative-ui/tool-based" subtitle="agent: gen-ui-tool-based">
      <FitDemo>
        <ControlledGenUiDemo />
      </FitDemo>
    </DemoFrame>
  );
}
