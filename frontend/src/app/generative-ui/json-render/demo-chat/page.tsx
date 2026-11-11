"use client";

import { DemoFrame } from "@/components/demo-frame";
import { FitDemo } from "@/components/doc-demo";

import { Chat } from "../_demo/declarative-json-render/chat";

/**
 * The page's printed `chat.tsx`, mounted under the app's root provider. The
 * page doesn't print the demo's `page.tsx` (its own `<CopilotKit>` wrapper)
 * or any Agno runtime route or agent, so agent `byoc_json_render` is not
 * registered anywhere and the chat can't run. That gap is deliberate (broken).
 */
export default function Page() {
  return (
    <DemoFrame parentPath="/generative-ui/json-render" subtitle="agent: byoc_json_render (not registered)">
      <FitDemo>
        <div className="flex justify-center items-center h-screen w-full">
          <div className="h-full w-full max-w-4xl">
            <Chat />
          </div>
        </div>
      </FitDemo>
    </DemoFrame>
  );
}
