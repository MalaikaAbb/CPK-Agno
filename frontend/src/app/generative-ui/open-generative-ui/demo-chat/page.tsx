"use client";

import { DemoFrame } from "@/components/demo-frame";
import { DemoTabs } from "@/components/doc-demo";

import OpenGenUiDemo from "../_demo/open-gen-ui/page";
import OpenGenUiAdvancedDemo from "../_demo/open-gen-ui-advanced/page";

/**
 * The doc page embeds two demos; both are mounted as published, one at a
 * time. Each brings its own `<CopilotKit>`, so this route is in
 * lib/inspector.ts and the root provider's Inspector stands down here.
 */
export default function Page() {
  return (
    <DemoFrame parentPath="/generative-ui/open-generative-ui" subtitle="two demos from the page">
      <DemoTabs
        demos={[
          { id: "open-gen-ui", label: "Minimal (open-gen-ui)", Demo: OpenGenUiDemo },
          { id: "open-gen-ui-advanced", label: "Advanced — sandbox functions", Demo: OpenGenUiAdvancedDemo },
        ]}
      />
    </DemoFrame>
  );
}
