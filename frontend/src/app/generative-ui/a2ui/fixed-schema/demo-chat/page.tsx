"use client";

import { DemoFrame } from "@/components/demo-frame";
import { FitDemo } from "@/components/doc-demo";

import A2UIFixedSchemaDemo from "../_demo/a2ui-fixed-schema/page";

/**
 * The doc's demo, mounted as published. It brings its own `<CopilotKit>`, so
 * this route is in lib/inspector.ts and the root provider's Inspector stands
 * down here.
 */
export default function Page() {
  return (
    <DemoFrame parentPath="/generative-ui/a2ui/fixed-schema" subtitle="agent: a2ui-fixed-schema">
      <FitDemo>
        <A2UIFixedSchemaDemo />
      </FitDemo>
    </DemoFrame>
  );
}
