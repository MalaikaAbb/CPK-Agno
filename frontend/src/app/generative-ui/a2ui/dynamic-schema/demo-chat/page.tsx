"use client";

import { DemoFrame } from "@/components/demo-frame";
import { FitDemo } from "@/components/doc-demo";

import DeclarativeGenUIDemo from "../_demo/declarative-gen-ui/page";

/**
 * The doc's demo, mounted as published. It brings its own `<CopilotKit>`, so
 * this route is in lib/inspector.ts and the root provider's Inspector stands
 * down here.
 */
export default function Page() {
  return (
    <DemoFrame parentPath="/generative-ui/a2ui/dynamic-schema" subtitle="agent: declarative-gen-ui">
      <FitDemo>
        <DeclarativeGenUIDemo />
      </FitDemo>
    </DemoFrame>
  );
}
