"use client";

import { DemoFrame } from "@/components/demo-frame";
import { DemoTabs } from "@/components/doc-demo";

import HitlInChatDemo from "../_demo/hitl-in-chat/page";
import GenUiInterruptDemo from "../_demo/gen-ui-interrupt/page";

/**
 * The doc page embeds two demos; both are mounted as published, one at a
 * time. Each brings its own `<CopilotKit>`, so this route is in
 * lib/inspector.ts and the root provider's Inspector stands down here.
 */
export default function Page() {
  return (
    <DemoFrame parentPath="/human-in-the-loop/overview" subtitle="two demos from the page">
      <DemoTabs
        demos={[
          { id: "hitl-in-chat", label: "useHumanInTheLoop (hitl-in-chat)", Demo: HitlInChatDemo },
          { id: "gen-ui-interrupt", label: "Interrupt-adapted (gen-ui-interrupt)", Demo: GenUiInterruptDemo },
        ]}
      />
    </DemoFrame>
  );
}
