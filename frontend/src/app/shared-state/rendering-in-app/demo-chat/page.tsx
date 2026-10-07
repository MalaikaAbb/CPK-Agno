"use client";

import { DemoFrame } from "@/components/demo-frame";
import { FitDemo } from "@/components/doc-demo";

import RenderingInAppPage from "../_demo/app/page";

/**
 * The doc's demo, mounted as published. It brings its own `<CopilotKit>`, so
 * this route is in lib/inspector.ts and the root provider's Inspector stands
 * down here.
 */
export default function Page() {
  return (
    <DemoFrame parentPath="/shared-state/rendering-in-app" subtitle="agent: default">
      <FitDemo>
        <RenderingInAppPage />
      </FitDemo>
    </DemoFrame>
  );
}
