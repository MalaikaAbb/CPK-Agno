"use client";

import { DemoFrame } from "@/components/demo-frame";
import { FitDemo } from "@/components/doc-demo";

import SharedStateReadWriteDemo from "../_demo/shared-state-read-write/page";

/**
 * The demo the page's snippets come from, mounted as published. It brings its
 * own `<CopilotKit>`, so this route is in lib/inspector.ts and the root
 * provider's Inspector stands down here.
 */
export default function Page() {
  return (
    <DemoFrame parentPath="/shared-state" subtitle="agent: shared-state-read-write">
      <FitDemo>
        <SharedStateReadWriteDemo />
      </FitDemo>
    </DemoFrame>
  );
}
