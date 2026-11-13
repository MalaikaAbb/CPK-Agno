# Doc drift changelog

What the CopilotKit docs changed under this repo, written by each `/doc-sync`
run. Only pages that actually moved are recorded — a sync that finds
everything unchanged writes nothing here at all.

Holds the 3 most recent dated entries. When a change lands on a fourth
date, the oldest entry is dropped. Entries are counted, not aged, so a gap of
weeks between changes does not expire anything.

## 2026-11-13

### 11:08 UTC — 16 pages, highest severity high

**High — A2UI · Dynamic Schema**

`/agno/generative-ui/a2ui/dynamic-schema` · route `/generative-ui/a2ui/dynamic-schema` · under “Implement the React renderers” · in a `typescript` block

4 code lines changed.

````diff
- ? "text-emerald-600"
+ ? "text-emerald-600 dark:text-emerald-400"
- ? "text-rose-600"
+ ? "text-rose-600 dark:text-rose-400"
````

**High — A2UI · Fixed Schema**

`/agno/generative-ui/a2ui/fixed-schema` · route `/generative-ui/a2ui/fixed-schema` · under “Implement the React renderers” · in a `typescript` block

16 code lines changed.

````diff
- <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500">
+ <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500 dark:text-muted-foreground">
- <h3 className="text-base font-semibold leading-none tracking-tight text-neutral-900">
+ <h3 className="text-base font-semibold leading-none tracking-tight text-neutral-900 dark:text-foreground">
- <span className="font-mono text-2xl font-semibold tracking-wider text-neutral-900">
+ <span className="font-mono text-2xl font-semibold tracking-wider text-neutral-900 dark:text-foreground">
- <Separator className="flex-1 bg-neutral-200" />
+ <Separator className="flex-1 bg-neutral-200 dark:bg-border" />
````

**High — Sub-agents**

`/agno/multi-agent/subagents` · route `/multi-agent/subagents` · under “Rendering a live delegation log” · in a `typescript` block

30 code lines changed.

````diff
- className="w-full h-full flex flex-col bg-white rounded-2xl shadow-sm border border-[#DBDBE5] overflow-hidden"
+ className="w-full h-full flex flex-col bg-white rounded-2xl shadow-sm border border-[#DBDBE5] overflow-hidden dark:bg-card dark:border-border"
- <div className="flex items-center justify-between px-6 py-3 border-b border-[#E9E9EF] bg-[#FAFAFC]">
+ <div className="flex items-center justify-between px-6 py-3 border-b border-[#E9E9EF] bg-[#FAFAFC] dark:border-border dark:bg-muted">
- <span className="text-lg font-semibold text-[#010507]">
+ <span className="text-lg font-semibold text-[#010507] dark:text-foreground">
- className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-[#BEC2FF] bg-[#BEC2FF1A] text-[#010507] text-[10px] font-semibold uppercase tracking-[0.12em]"
+ className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-[#BEC2FF] bg-[#BEC2FF1A] text-[#010507] text-[10px] font-semibold uppercase tracking-[0.12em] dark:text-foreground"
````

**Info — Declarative · A2UI**

`/agno/generative-ui/a2ui` · route `/generative-ui/a2ui`

Now tracked for the first time.

**Info — Components and surfaces**

`/agno/generative-ui/components` · route `/generative-ui/components`

Now tracked for the first time.

**Info — Components · Catalogs**

`/agno/generative-ui/components/catalogs` · route `/generative-ui/components/catalogs`

Now tracked for the first time.

**Info — Components · Markdown mode**

`/agno/generative-ui/components/markdown-mode` · route `/generative-ui/components/markdown-mode`

Now tracked for the first time.

**Info — Components · Standard catalog**

`/agno/generative-ui/components/standard-catalog` · route `/generative-ui/components/standard-catalog`

Now tracked for the first time.

**Info — Components · State and actions**

`/agno/generative-ui/components/state-and-actions` · route `/generative-ui/components/state-and-actions`

Now tracked for the first time.

**Info — Components · Surfaces**

`/agno/generative-ui/components/surfaces` · route `/generative-ui/components/surfaces`

Now tracked for the first time.

**Info — Components · Theming**

`/agno/generative-ui/components/theming` · route `/generative-ui/components/theming`

Now tracked for the first time.

**Info — Components · Transports**

`/agno/generative-ui/components/transports` · route `/generative-ui/components/transports`

Now tracked for the first time.

**Info — Controlled · State Rendering**

`/agno/generative-ui/state-rendering` · route `/generative-ui/state-rendering`

Now tracked for the first time.

**Info — Controlled · Components as Tools**

`/agno/generative-ui/tool-based` · route `/generative-ui/tool-based`

Now tracked for the first time.

**Info — Shared State**

`/agno/shared-state` · route `/shared-state`

Now tracked for the first time.

**Info — State Streaming**

`/agno/shared-state/streaming` · route `/shared-state/streaming`

Now tracked for the first time.

---

## 2026-11-09

### 10:47 UTC — 21 pages, highest severity high

**High — Jev: fast generative UI**

`/agno/cookbook/jev-generative-ui` · route `/cookbook/jev-generative-ui` · under “Before you start” · in a `dotenv` block

8 code lines changed.

````diff
- OPENAI_MODEL=gpt-5.4
+ OPENAI_MODEL=gpt-6-luna
- const model = new ChatOpenAI({ model: process.env.OPENAI_MODEL || "gpt-5.4" });
+ const model = new ChatOpenAI({
+ model: process.env.OPENAI_MODEL || "gpt-6-luna",
+ modelKwargs: (process.env.OPENAI_MODEL || "gpt-6-luna") === "gpt-6-luna"
+ ? { reasoning_effort: "none" } : {},
+ });
````

**High — Frontend Tools**

`/agno/frontend-tools` · route `/frontend-tools` · under “Define the frontend tool in your Agno agent” · in a `python` block

2 code lines changed.

````diff
- model=OpenAIChat(id="gpt-5.4"),
+ model=OpenAIChat(reasoning_effort="none", id="gpt-6-luna"),
````

**High — A2UI · Dynamic Schema**

`/agno/generative-ui/a2ui/dynamic-schema` · route `/generative-ui/a2ui/dynamic-schema` · under “The A2UI agent tool” · in a `python` block

2 code lines changed.

````diff
- "model": ChatOpenAI(model="gpt-4o"),
+ "model": ChatOpenAI(model="gpt-6-luna", reasoning_effort="none"),
````

**High — MCP Apps**

`/agno/generative-ui/mcp-apps` · route `/generative-ui/mcp-apps` · under “Add the dependencies” · in a `npm` block

6 code lines, 14 prose lines changed.

````diff
- npm install @copilotkit/react-core @copilotkit/runtime @ag-ui/mcp-apps-middleware
+ npm install @copilotkit/react-core @copilotkit/runtime
+ Use `@copilotkit/runtime` 1.76.0 or later. The runtime includes the MCP Apps
+ middleware, so the `mcpApps` option below needs no other package. Install
+ `@ag-ui/mcp-apps-middleware` only if you attach the middleware to an agent
+ yourself with `.use()`. Its current release needs `@ag-ui/client` 1.x, which
+ runtime 1.76.0 and later use.
+ 
````

**High — Tool Rendering**

`/agno/generative-ui/tool-rendering` · route `/generative-ui/tool-rendering` · under “Give your agent a tool to call” · in a `python` block

2 code lines changed.

````diff
- model=OpenAIChat(id="gpt-5.4"),
+ model=OpenAIChat(reasoning_effort="none", id="gpt-6-luna"),
````

**High — Human in the Loop**

`/agno/human-in-the-loop` · route `/human-in-the-loop` · under “Define the frontend tool in your Agno agent” · in a `python` block

2 code lines changed.

````diff
- model=OpenAIChat(id="gpt-5.4"),
+ model=OpenAIChat(reasoning_effort="none", id="gpt-6-luna"),
````

**High — Skill delivery**

`/agno/intelligence/learned-skills` · route `/intelligence/learned-skills` · under “BuiltInAgent” · in a `typescript` block

8 code lines changed.

````diff
- model: "openai/gpt-4o",
+ model: "openai/gpt-6-luna",
- model: openai("gpt-4o"),
+ model: openai("gpt-6-luna"),
- model: "openai/gpt-4.1",
+ model: "openai/gpt-6-luna",
- model: "openai/gpt-4o",
+ model: "openai/gpt-6-luna",
````

**High — Automatic Learning**

`/agno/learning` · route `/learning` · under “Overview”

54 code lines, 4 headings, 48 prose lines changed. The number of fenced code blocks changed.

````diff
- Automatic Learning turns patterns from real agent runs into skills you can publish. It reads completed conversations in [AG-UI Streams](/agno/threads), writes insights, and proposes instructions you review before you publish them.
+ Automatic Learning turns patterns from real agent runs into skills you can publish. It reads completed conversations in [AG-UI Streams](/agno/AG-UI-Streams), writes insights, and proposes instructions you review before you publish them.
+ To record what people do in your app around the agent, such as clicks in a tool's UI and page changes, see [Capture interactions](/agno/intelligence/capture-interactions).
+ 
+ | Browser activity to Automatic Learning | `CopilotKitIntelligence.getTrajectoryLearningContainerIds` | Assigns captured Trajectories to existing Learning Spaces. |
+ ## Assign browser activity to a Learning Space
+ 
+ For capture connected to Intelligence, select existing Learning Spaces in your Runtime's server configuration:
````

**High — Sub-agents**

`/agno/multi-agent/subagents` · route `/multi-agent/subagents` · under “Setting up sub-agents” · in a `python` block

16 code lines changed.

````diff
- _SUB_MODEL_ID = "gpt-4o-mini"
+ _SUB_MODEL_ID = "gpt-6-luna"
- model=OpenAIChat(id=_SUB_MODEL_ID, timeout=120),
+ model=OpenAIChat(reasoning_effort="none", id=_SUB_MODEL_ID, timeout=120),
- model=OpenAIChat(id=_SUB_MODEL_ID, timeout=120),
+ model=OpenAIChat(reasoning_effort="none", id=_SUB_MODEL_ID, timeout=120),
- model=OpenAIChat(id=_SUB_MODEL_ID, timeout=120),
+ model=OpenAIChat(reasoning_effort="none", id=_SUB_MODEL_ID, timeout=120),
````

**High — Threads Drawer**

`/agno/prebuilt-components/copilot-threads-drawer` · route `/threads/drawer` · under “Add your own "New conversation" button”

41 code lines, 1 heading, 19 prose lines changed. The number of fenced code blocks changed.

````diff
+ ## Add your own "New conversation" button
+ 
+ The Drawer has its own "New Conversation" row. Your app can also keep its own
+ button, for example in a toolbar or a page header. To start a new conversation
+ from that button, call `startNewThread()` from
+ [`useCopilotChatConfiguration`](/reference/hooks/useCopilotChatConfiguration).
+ This is the same function the Drawer calls for its own row.
+ 
````

**High — Quickstart**

`/agno/quickstart` · route `/quickstart` · under “Configure your environment”

2 code lines, 4 prose lines changed.

````diff
- The starter template is configured to use OpenAI's GPT-4o by default, but you can modify it to use any language model supported by Agno.
+ The starter template is configured to use OpenAI's GPT-6 Luna by default, but you can modify it to use any language model supported by Agno.
- This example uses OpenAI's GPT-4o, but you can modify it to use any language model supported by Agno.
+ This example uses OpenAI's GPT-6 Luna, but you can modify it to use any language model supported by Agno.
- model=OpenAIChat(id="gpt-5.4"),
+ model=OpenAIChat(reasoning_effort="none", id="gpt-6-luna"),
````

**High — Synchronize Thread History**

`/agno/threads-import` · route `/threads/import` · under “Add Intelligence to your existing app”

2 code lines, 21 prose lines changed.

````diff
+ For a concrete example without historical import, see [keep an existing LangGraph conversation](/agno/intelligence/bring-your-own-thread-system#example-keep-an-existing-langgraph-conversation).
+ 
- If you also want users to reopen history recorded before Intelligence was connected, copy supported history into Intelligence using the steps below. The importer currently supports Google ADK, LangGraph, and Mastra stores. It copies historical content; it does not enable live delivery, recover past execution, or establish ongoing database replication.
+ If you also want users to reopen history recorded before Intelligence was connected, copy supported history into Intelligence using the steps below. This guide covers Google ADK, LangGraph, Mastra, and AWS Strands stores. It copies historical content; it does not enable live delivery, recover past execution, or establish ongoing database replication.
- | LangGraph | [Add AG-UI streams to LangGraph threads](/langgraph-python/threads-import) | LangGraph Server, LangGraph Platform, or LangSmith Deployment threads exposed through the LangGraph SDK thread/run APIs. |
+ | LangGraph | [Add AG-UI streams to LangGraph threads](/langgraph-python/threads-import) | Saved conversations from LangGraph Server / LangSmith deployments or Python FastAPI apps with durable persistence. |
+ | AWS Strands | [Python](/strands/threads-import) · [TypeScript](/strands-typescript/threads-import) | Saved single-agent conversations from local session files or S3; Python also supports AgentCore Memory native sessions. |
- By default, the importer targets the CopilotKit Intelligence project selected when you created the app with the CopilotKit CLI. If that is the project that should receive the imported threads, continue to the dry run.
````

**Medium — Slots** · _local snapshot edit, not an upstream change_

`/agno/custom-look-and-feel/slots` · route `/custom-look-and-feel/slots` · under “`messageView` sub-slots”

1 heading, 10 prose lines changed.

````diff
+ | `workSummary`      | The "Working… / Worked for 9s" line when `toolCallDisplay` is `"turn"`.     |
- | `toolCallsView`    | Tool call visualization.           |
+ | `toolCallsView`    | Tool call visualization. Has its own sub-slot (see below). |
+ 
+ ### `toolCallsView` sub-slots
+ 
+ Available via `messageView={{ assistantMessage: { toolCallsView: { ... } } }}`:
+ 
````

**Medium — Overview**

`/agno/threads` · route `/threads` · under “AG-UI Streams”

4 headings, 80 prose lines changed.

````diff
- > Let users reconnect, catch up on missed events, and resume conversations across devices with Intelligence’s AG-UI streams.
+ > Complement any existing thread system with AG-UI Streams. Add the full spectrum of generative UI, multimodal inputs and file uploads, plus reconnection and catch-up after network interruptions and across tabs and devices.
- Intelligence’s AG-UI streams store and deliver the interaction to your users. Your framework threads manage the agent’s conversation and model context.
+ CopilotKit Intelligence’s AG-UI Streams complement your existing thread system, whether you use LangGraph, Google ADK, Mastra, or a custom backend. Your framework keeps managing the conversation and agent state while Intelligence records the interactions delivered through CopilotKit.
- Use Threads Drawer for a ready-made conversation list, or build your own with `useThreads`. Pass the selected `threadId` to your chat to load its history and receive new events.
+ That includes messages, thinking traces, tool calls, generative UI, uploaded files (such as images, PDFs, and Excel files), and application state. You can also use CopilotKit Intelligence as your standalone thread store.
- <Accordion title="Already using LangGraph or ADK persistence?">
- Keep it. Your framework stores agent context and execution state; Intelligence adds AG-UI event history, reconnection, and delivery to your users.
````

**Medium — Thread & History Lifecycle**

`/agno/threads-lifecycle` · route `/threads/lifecycle` · under “Future runs can remain durable in both places”

1 heading, 7 prose lines changed.

````diff
- After historical import, future conversations that run through CopilotKit are
- written to CopilotKit Intelligence as threads. If your LangGraph agent
+ Once Intelligence is connected, conversations that run through that runtime are
+ recorded automatically in Intelligence. Historical import is optional. If your LangGraph agent
+ 
+ ## Example: keep an existing LangGraph conversation
+ 
+ Follow [Bring your own thread system](/agno/intelligence/bring-your-own-thread-system#example-keep-an-existing-langgraph-conversation) for an example that keeps native persistence and continues the same conversation.
````

**Low — Copilot Runtime**

`/agno/copilot-runtime` · route `/backend/copilot-runtime` · under “CopilotKit Intelligence”

4 prose lines changed.

````diff
- Features like [threads](/agno/threads) and the [inspector](/agno/inspector) are provided through the runtime and CopilotKit Intelligence. These give you conversation persistence and debugging capabilities out of the box.
+ Features like [threads](/agno/AG-UI-Streams) and the [inspector](/agno/inspector) are provided through the runtime and CopilotKit Intelligence. These give you conversation persistence and debugging capabilities out of the box.
- 2. **Many ecosystem features won't work.** The AG-UI protocol supports a middleware layer designed to run on the backend. Many features in the CopilotKit ecosystem depend on this server-side middleware. Without the runtime, these features — including [threads](/agno/threads) and other capabilities — will not be available.
+ 2. **Many ecosystem features won't work.** The AG-UI protocol supports a middleware layer designed to run on the backend. Many features in the CopilotKit ecosystem depend on this server-side middleware. Without the runtime, these features — including [threads](/agno/AG-UI-Streams) and other capabilities — will not be available.
````

**Low — Open Generative UI**

`/agno/generative-ui/open-generative-ui` · route `/generative-ui/open-generative-ui` · under “Minimal setup”

24 prose lines changed.

````diff
- auto-registered by `CopilotKit`, so no extra wiring is needed.
+ auto-registered by `CopilotKit`, so no extra frontend wiring is needed. Your
+ agent must still give the run's frontend tools to its model (see the warning
+ below).
+ 
+ <Callout type="warn" title="Your agent must pass frontend tools to its model">
+ `generateSandboxedUi` reaches the agent as a frontend tool in the run input.
+ The agent calls it only if it gives the run's frontend tools to its model.
````

**Low — Inspector**

`/agno/inspector` · route `/custom-look-and-feel/inspector` · under “Follow and reproduce a run”

2 prose lines changed.

````diff
- [Thread](/agno/threads) and choose **Try from here**. Inspector copies its
+ [Thread](/agno/AG-UI-Streams) and choose **Try from here**. Inspector copies its
````

**Low — Threads & Persistence Architecture**

`/agno/intelligence/threads-explained` · route `/threads/architecture` · under “Overview”

10 prose lines changed.

````diff
- Start with the [AG-UI Streams overview](/agno/threads) to understand what AG-UI Streams provide
+ Start with the [AG-UI Streams overview](/agno/AG-UI-Streams) to understand what AG-UI Streams provide
- Already using framework persistence? Keep it configured. [LangGraph threads](https://docs.langchain.com/oss/python/langgraph/persistence) retain graph state and checkpoints; [Google ADK sessions](https://google.github.io/adk-docs/sessions/session/) retain conversation events and state. Intelligence adds the event history and synchronization used to restore the user's interactive conversation. Replaying that history is distinct from resuming framework execution from a checkpoint; framework-specific execution recovery remains with the framework.
+ Keep your existing thread system when you connect Intelligence. As conversations run through your connected CopilotKit runtime, Intelligence automatically records its own copy of the supported AG-UI interaction history. Your framework continues managing the original conversation and agent state. Keep your [durable LangGraph checkpointer or deployment](https://docs.langchain.com/oss/python/langgraph/persistence) configured. For ADK, keep your [durable session service](https://google.github.io/adk-docs/sessions/session/) configured. Replaying recorded AG-UI history does not resume framework execution from a checkpoint. Your framework still handles that recovery.
- For runs through CopilotKit, Intelligence records the thread history while the agent continues using its configured durable LangGraph checkpointer, LangGraph deployment, or ADK agent with a durable session service. Keep a stable mapping between the CopilotKit `threadId` and the native thread or session identifier so subsequent runs use the same conversation in both systems.
+ Keep the same thread ID, or a stable mapping to the native thread or session ID, when you continue a conversation. [Bring your own thread system](/agno/intelligence/bring-your-own-thread-system) explains what Intelligence records and shows an existing LangGraph app example.
- [Import supported LangGraph, ADK, or Mastra history](/agno/threads-import) to make existing conversations available through Intelligence’s AG-UI streams. Importing is a one-time adoption step, not a general replication link between databases. Frontend rename, archive, and delete operations change only the Intelligence thread; they do not mutate native framework records.
+ Historical import is optional. It copies supported history and does not create a general replication link between databases. Intelligence rename, archive, and delete actions affect only its own records.
````

**Low — Programmatic Control**

`/agno/programmatic-control` · route `/custom-look-and-feel/programmatic-control` · under “`copilotkit.runAgent()` vs `agent.runAgent()`”

2 prose lines changed.

````diff
- - **`agent.runAgent()`** — Low-level method on the agent instance. Sends the request to the runtime but does **not** execute frontend tools or handle follow-ups. Use this only when you need direct control over the agent execution (e.g., resuming from an interrupt with `forwardedProps`).
+ - **`agent.runAgent()`** — Low-level method on the agent instance. Sends the request to the runtime but does **not** execute frontend tools or handle follow-ups. Use this only when you need direct control over the agent execution. To resume from an interrupt, use `copilotkit.runAgent({ agent, resume })` for standard AG-UI interrupts, or `copilotkit.runAgent({ agent, forwardedProps: { command: { resume, interruptEvent } } })` for legacy `on_interrupt` custom events, so that the subscriber lifecycle still wraps the resumed run.
````

**Info — User Memories**

`/agno/intelligence/memories` · route `/intelligence/memories`

Content changed.

---

---

## 2026-10-07

### 14:21 UTC — 8 pages, highest severity none

**Info — A2UI · Dynamic Schema**

`/agno/generative-ui/a2ui/dynamic-schema` · route `/generative-ui/a2ui/dynamic-schema`

Now tracked for the first time.

**Info — A2UI · Fixed Schema**

`/agno/generative-ui/a2ui/fixed-schema` · route `/generative-ui/a2ui/fixed-schema`

Now tracked for the first time.

**Info — MCP Apps**

`/agno/generative-ui/mcp-apps` · route `/generative-ui/mcp-apps`

Now tracked for the first time.

**Info — Open Generative UI**

`/agno/generative-ui/open-generative-ui` · route `/generative-ui/open-generative-ui`

Now tracked for the first time.

**Info — HITL Overview**

`/agno/human-in-the-loop/index` · route `/human-in-the-loop/overview`

Now tracked for the first time.

**Info — Sub-agents**

`/agno/multi-agent/subagents` · route `/multi-agent/subagents`

Now tracked for the first time.

**Info — Agent Read-Only Context**

`/agno/shared-state/agent-readonly` · route `/shared-state/agent-readonly`

Now tracked for the first time.

**Info — Render state in your app**

`/agno/shared-state/rendering-in-app` · route `/shared-state/rendering-in-app`

Now tracked for the first time.

### 13:33 UTC — 14 pages, highest severity high

**High — Jev: fast generative UI**

`/agno/cookbook/jev-generative-ui` · route `/cookbook/jev-generative-ui` · under “Before you start” · in a `bash` block

2 code lines changed.

````diff
- npm install @copilotkit/core@1.73.0 @copilotkit/react-core@1.73.0 @copilotkit/runtime@1.73.0 @ag-ui/client@0.0.59 @ag-ui/core@0.0.59 @typesafe-ai/sdk@0.6.0 rxjs@7.8.1 zod@4.6.5 @langchain/openai@1.5.13 @langchain/core@1.2.11
+ npm install @copilotkit/core@1.73.0 @copilotkit/react-core@1.73.0 @copilotkit/runtime@1.73.0 @ag-ui/client@1.0.1 @ag-ui/core@1.0.1 @typesafe-ai/sdk@0.6.0 rxjs@7.8.1 zod@4.6.5 @langchain/openai@1.5.13 @langchain/core@1.2.11
````

**High — Slots**

`/agno/custom-look-and-feel/slots` · route `/custom-look-and-feel/slots` · under “Reshaping the Message List”

14 code lines, 1 heading, 13 prose lines changed. The number of fenced code blocks changed.

````diff
+ ## Reshaping the Message List
+ 
+ Slots change how each message renders. To change _which_ messages render — hide some, replace them, reorder them — pass `transformMessages` to the message view. It receives the whole list and returns the list to render.
+ 
+ ```tsx title="page.tsx"
+ import { useCallback } from "react";
+ import { CopilotChat, type Message } from "@copilotkit/react-core/v2";
+ 
````

**High — Inspector**

`/agno/inspector` · route `/custom-look-and-feel/inspector` · under “Control when Inspector appears”

4 code lines, 18 prose lines changed. The number of fenced code blocks changed.

````diff
- | Goal                                      | Action                                                                                                    |
- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------- |
- | Close the current view                    | Use the close control; reopen it from the Inspector button                                                |
- | See your application without an overlay   | Use the pop-out control in the Inspector header                                                           |
- | Hide Inspector temporarily on this domain | Choose **Hide Inspector for a day** from the launcher HUD, or **Hide Inspector for one week** in settings |
- | Disable Inspector for the development app | Set `enableInspector` to `false`                                                                          |
+ | Goal                                       | Action                                                                                                    |
+ | ------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
````

**High — User Memories**

`/agno/intelligence/memories` · route `/intelligence/memories` · under “Overview”

17 code lines, 2 headings, 51 prose lines changed. The number of fenced code blocks changed.

````diff
- Rich Threads remember a conversation. User Memory remembers a person. This page explains
+ AG-UI Streams remember a conversation. User Memory remembers a person. This page explains
- conversation, read [Threads & Persistence Architecture](/agno/intelligence/threads-explained)
+ conversation, read [AG-UI Streams & Framework Threads](/agno/intelligence/threads-explained)
+ ## Limiting access per request
+ 
+ The runtime configuration in this section uses the TypeScript API. Python, Go, Ruby, and C#/.NET have different policy callbacks; see [Memory policies in other runtime languages](#memory-policies-in-other-runtime-languages).
+ 
````

**High — Overview**

`/agno/threads` · route `/threads` · under “Rich Threads”

2 code lines, 11 headings, 52 prose lines changed.

````diff
- # Rich Threads
+ # AG-UI Streams
- > Build rich, persistent agent conversations that restore messages, generative UI, multimodal inputs, and live runs across sessions and devices.
+ > Let users reconnect, catch up on missed events, and resume conversations across devices with Intelligence’s AG-UI streams.
- ## Overview
+ <span id="overview" />
- Rich Threads are the persistence and conversation layer behind your agent's conversations. Users get rich history, continuity across devices, reconnection to active runs, and ready-made thread controls.
+ Intelligence’s AG-UI streams store and deliver the interaction to your users. Your framework threads manage the agent’s conversation and model context.
````

**High — Synchronize Thread History**

`/agno/threads-import` · route `/threads/import` · under “Import & Synchronize Thread History”

3 code lines, 5 headings, 36 prose lines changed. The number of fenced code blocks changed.

````diff
- # Import & Synchronize Thread History
+ # Add AG-UI Streams to Existing Threads
- > Import historical conversations into CopilotKit Intelligence, then keep future CopilotKit runs synchronized with Rich Threads.
+ > Add Intelligence’s AG-UI streams to your existing agent conversations, with optional historical import for supported stores.
- ## What is this?
+ <span id="what-is-this" />
- Import brings existing conversations into CopilotKit Intelligence as Rich Threads while you keep the native storage or analytics you already use. Import supported history once, then continue running those conversations through CopilotKit so users can resume them through the same thread UI as new conversations.
+ ## Add Intelligence to your existing app
````

**Medium — Copilot Runtime**

`/agno/copilot-runtime` · route `/backend/copilot-runtime` · under “Runtime languages”

1 heading, 24 prose lines changed.

````diff
+ ## Runtime languages
+ 
+ **TypeScript is the default and most fully featured runtime. It is the only runtime that can run without CopilotKit Intelligence.** Use it for an open-source setup, or connect it to Intelligence when you need its services.
+ 
+ Python, Go, Ruby, and C#/.NET runtimes require an Intelligence project and server-side API key. They work with both [cloud-hosted](/agno/intelligence/managed-intelligence-platform) and [self-hosted](/agno/intelligence/self-hosting) Intelligence; they do not provide an in-memory or SQLite runner.
+ 
+ | Language | Host | Without Intelligence |
+ | --- | --- | --- |
````

**Medium — Threads & Persistence Architecture**

`/agno/intelligence/threads-explained` · route `/threads/architecture` · under “Threads & Persistence Architecture”

3 headings, 35 prose lines changed.

````diff
- # Threads & Persistence Architecture
+ # AG-UI Streams & Framework Threads
- > Architecture and mental model behind CopilotKit threads: how persistent conversations work, how reconnection replays history, and what to expect from thread lifecycle operations.
+ > Understand how Intelligence’s AG-UI streams deliver conversation history, catch-up, and reconnection alongside framework-managed agent context.
- Start with the [Rich Threads overview](/agno/threads) to understand what Rich Threads provide
+ Start with the [AG-UI Streams overview](/agno/threads) to understand what AG-UI Streams provide
- A thread is a persistent, server-side container for a multi-turn conversation between a user and an agent. Unlike ephemeral chat sessions that disappear when the page reloads, threads store the full event history (every message, tool call, and state change), so conversations can be paused, resumed, and replayed across sessions and devices.
+ Framework threads manage an agent’s conversation and model context. Intelligence’s **AG-UI streams** record and deliver the interaction to your users.
````

**Medium — Thread & History Lifecycle**

`/agno/threads-lifecycle` · route `/threads/lifecycle` · under “The lifecycle at a glance”

2 headings, 10 prose lines changed.

````diff
- 2. **Run.** Messages and tool calls stream under that `threadId`. If a server-side store is configured (CopilotKit Intelligence, or a persisting `AgentRunner`), they are persisted as they happen so the thread can be replayed later. A runtime with no persistence layer keeps nothing server-side. See [Threads & Persistence Architecture](/agno/intelligence/threads-explained) for the full server-side model.
+ 2. **Run.** Messages and tool calls stream under that `threadId`. If a server-side store is configured (CopilotKit Intelligence, or a persisting `AgentRunner`), they are persisted as they happen so the thread can be replayed later. A runtime with no persistence layer keeps nothing server-side. See [AG-UI Streams & Framework Threads](/agno/intelligence/threads-explained) for the full server-side model.
- ## Scope Rich Threads to the signed-in user
+ <span id="scope-rich-threads-to-the-signed-in-user" />
+ ## Scope AG-UI Streams to the signed-in user
+ 
- verified application user to Rich Threads.
+ verified application user to threads.
````

**Low — AG-UI**

`/agno/ag-ui` · route `/backend/ag-ui` · under “How agents slot into the runtime”

3 prose lines changed.

````diff
+ To write the custom implementation yourself, and keep its own fields through
+ the clone in step 2, see [Write your own AG-UI agent](/agno/backend/custom-ag-ui-agent).
+ 
````

**Low — Your Components · Interactive**

`/agno/generative-ui/your-components/interactive` · route `/generative-ui/your-components/interactive` · under “Interactive”

2 prose lines changed.

````diff
- <SharedContent framework="agno" />
+ <Interactive components={props.components} framework="agno" />
````

**Low — Headless Threads**

`/agno/headless-threads` · route `/threads/headless` · under “Headless Threads”

22 prose lines changed.

````diff
+ Intelligence’s AG-UI streams power the history and delivery behind this custom UI. Use `useThreads` to list and manage conversations, and pass their `threadId` to your chat.
+ 
- CopilotKit Rich Threads enable persistent, resumable multi-turn conversations. The `useThreads` hook lists, creates, renames, archives, and deletes CopilotKit Intelligence threads with realtime synchronization via WebSocket. Threads work with any agent framework — CopilotKit Intelligence stores conversation history server-side, so users can close their browser and pick up where they left off. It does not list or mutate native LangGraph, ADK, or other framework stores unless your backend explicitly bridges those systems. Thread metadata updates (renames, archives, new threads) appear on connected clients without polling.
+ The `useThreads` hook lists, creates, renames, archives, and deletes CopilotKit Intelligence threads with realtime synchronization via WebSocket. Threads work with any agent framework — CopilotKit Intelligence stores conversation history server-side, so users can close their browser and pick up where they left off. It does not list or mutate native LangGraph, ADK, or other framework stores unless your backend explicitly bridges those systems. Thread metadata updates (renames, archives, new threads) appear on connected clients without polling.
- [scope Rich Threads to the signed-in user](/agno/threads-lifecycle#scope-rich-threads-to-the-signed-in-user)
+ [scope AG-UI Streams to the signed-in user](/agno/threads-lifecycle#scope-rich-threads-to-the-signed-in-user)
- <Callout type="info" title="Migrating existing history?">
- Threads capture new CopilotKit conversations once your app is connected to
````

**Low — Automatic Learning**

`/agno/learning` · route `/learning` · under “Overview”

8 prose lines changed.

````diff
- Automatic Learning turns patterns from real agent runs into skills you can publish. It reads completed conversations in [Rich Threads](/agno/threads), writes insights, and proposes instructions you review before you publish them.
+ Automatic Learning turns patterns from real agent runs into skills you can publish. It reads completed conversations in [AG-UI Streams](/agno/threads), writes insights, and proposes instructions you review before you publish them.
- Complete the [Intelligence quickstart](/agno/intelligence/quickstart). That page signs you in with the CLI and selects the project. Then send a message and make sure that it appears in [Rich Threads](/agno/threads). Open your project in [CopilotKit Intelligence](https://dashboard.operations.copilotkit.ai/) and make sure that Learning is available.
+ Complete the [Intelligence quickstart](/agno/intelligence/quickstart). That page signs you in with the CLI and selects the project. Then send a message and make sure that it appears in [AG-UI Streams](/agno/threads). Open your project in [CopilotKit Intelligence](https://dashboard.operations.copilotkit.ai/) and make sure that Learning is available.
- - [Rich Threads](/agno/threads)
- - [Threads & Persistence Architecture](/agno/intelligence/threads-explained)
+ - [AG-UI Streams](/agno/threads)
+ - [AG-UI Streams & Framework Threads](/agno/intelligence/threads-explained)
````

**Low — Threads Drawer**

`/agno/prebuilt-components/copilot-threads-drawer` · route `/threads/drawer` · under “When should I use this?”

4 prose lines changed.

````diff
- [scope Rich Threads to the signed-in user](/agno/threads-lifecycle#scope-rich-threads-to-the-signed-in-user).
+ [scope AG-UI Streams to the signed-in user](/agno/threads-lifecycle#scope-rich-threads-to-the-signed-in-user).
- - [Rich Threads overview](/agno/threads): compare thread UI and deployment paths
+ - [AG-UI Streams overview](/agno/threads): compare thread UI and deployment paths
````

---

---

---
