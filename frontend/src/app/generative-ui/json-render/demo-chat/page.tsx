"use client";

import { DemoFrame } from "@/components/demo-frame";
import { FitDemo } from "@/components/doc-demo";

import ByocJsonRenderDemo from "../_demo/declarative-json-render/page";

/**
 * The doc's demo, mounted as published. It brings its own `<CopilotKit>`
 * (runtime `/api/copilotkit-declarative-json-render`), so this route is in
 * lib/inspector.ts and the root provider's Inspector stands down here.
 */
export default function Page() {
  return (
    <DemoFrame parentPath="/generative-ui/json-render" subtitle="agent: byoc_json_render">
      <FitDemo>
        <ByocJsonRenderDemo />
      </FitDemo>
    </DemoFrame>
  );
}
