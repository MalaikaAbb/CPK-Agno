"use client";

import { DemoFrame } from "@/components/demo-frame";
import { FitDemo } from "@/components/doc-demo";

import ByocHashbrownDemoPage from "../_demo/declarative-hashbrown/page";

/**
 * The doc's demo, mounted as published. It brings its own `<CopilotKit>`
 * (runtime `/api/copilotkit-declarative-hashbrown`), so this route is in
 * lib/inspector.ts and the root provider's Inspector stands down here. The
 * page prints no Agno runtime route or agent, so that runtime URL doesn't
 * exist and the chat can't run (broken, deliberately).
 */
export default function Page() {
  return (
    <DemoFrame parentPath="/generative-ui/hashbrown" subtitle="agent: declarative-hashbrown-demo">
      <FitDemo>
        <ByocHashbrownDemoPage />
      </FitDemo>
    </DemoFrame>
  );
}
