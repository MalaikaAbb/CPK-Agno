# Doc drift changelog

What the CopilotKit docs changed under this repo, written by each `/doc-sync`
run. Only pages that actually moved are recorded — a sync that finds
everything unchanged writes nothing here at all.

Holds the 3 most recent dated entries. When a change lands on a fourth
date, the oldest entry is dropped. Entries are counted, not aged, so a gap of
weeks between changes does not expire anything.

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

## 2026-09-25

### 07:48 UTC — 1 page, highest severity high · _npm run drift:sync_

**High — /agno/intelligence/learned-skills**

`/agno/intelligence/learned-skills` · route `/intelligence/learned-skills` · `agno__intelligence__learned-skills.md`

Code fence count changed. Hash e459e3d5 ➔ 98291e25.

````diff
- Skill delivery makes one Learning container's published skills available to an agent without another CLI download or process restart. A framework adapter adds an alphabetical catalog and two tools.
- <Image
- src="/images/cloud-hosted/cloud-hosted-skill-delivery.png"
- alt="The Skills tab of a Learning container in cloud-hosted Intelligence. The Skill delivery toggle is on, and skill candidates wait for review."
+ Skill delivery makes published skills from one or more Learning containers available to an agent without another CLI download or process restart. A framework adapter adds an alphabetical catalog and two tools.
+ <Image
+ src="/images/cloud-hosted/cloud-hosted-skill-delivery.png"
+ alt="The Skills tab of a Learning container in cloud-hosted Intelligence. The Skill delivery toggle is on, and skill candidates wait for review."
  … region truncated
````

---

---

---

## 2026-09-24

### 07:28 UTC — 2 pages, highest severity medium · _npm run drift:sync_

**Medium — /agno/intelligence/memories**

`/agno/intelligence/memories` · route `/intelligence/memories` · `agno__intelligence__memories.md`

Headings / Structure changed. Hash b4389f3c ➔ bd023c56.

````diff
- ## What is a memory?
- A memory is a short, durable statement about a user or a project, stored outside
- any single thread. "Prefers concise status updates" is a memory. The forty
- messages that revealed the preference are a thread.
+ ## Start with your coding agent
+ Copy this prompt into your coding agent to inspect your existing CopilotKit app and configure long-term memory for your users. Prefer to work through the setup yourself? Follow the manual steps below.
+ ### Copy this prompt into your coding agent
+ ```text
  … region truncated
````

**Medium — /agno/learning**

`/agno/learning` · route `/learning` · `agno__learning.md`

Headings / Structure changed. Hash 3d8ccd83 ➔ 73ebc660.

````diff
- ## How Automatic Learning works
- Learning starts with a container, which groups Threads from the same kind of work. Intelligence analyzes completed runs in that container and summarizes recurring patterns as Insights.
- When a pattern can be reused, Learning proposes a Skill. You review the supporting Threads and decide whether to publish it. A published Skill is a versioned set of instructions that you load into your agent; Learning does not change the model itself.
- Automatic Learning checks eligible containers on a daily schedule. After you approve a skill, [skill delivery](/agno/intelligence/learned-skills) makes it available to connected agents. A scheduled run does not approve skills. Turning on delivery does not connect your agent for you.
+ ## Start with your coding agent
+ Copy this prompt into your coding agent to inspect your existing app and configure Automatic Learning for one focused workflow. Prefer to work through the setup yourself? Follow the manual steps below.
+ #### Copy this prompt into your coding agent
+ ```text
  … region truncated
````

---

---
