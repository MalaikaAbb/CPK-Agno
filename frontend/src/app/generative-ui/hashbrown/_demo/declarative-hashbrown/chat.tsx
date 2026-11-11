"use client";

import {
  CopilotChat,
  CopilotChatAssistantMessage,
} from "@copilotkit/react-core/v2";
import { HashBrownRenderMessage } from "./hashbrown-renderer";
// doc: import { useByocHashbrownSuggestions } from "./suggestions";  (suggestions.ts is not printed on the page; removed)

export function Chat() {
  // doc: useByocHashbrownSuggestions();

  return (
    <CopilotChat
      className="h-full"
      messageView={{
        // The renderer reads only `message` from the slot props; cast to the
        // wider CopilotChatAssistantMessage signature to satisfy the slot type.
        assistantMessage:
          HashBrownRenderMessage as unknown as typeof CopilotChatAssistantMessage,
      }}
    />
  );
}
