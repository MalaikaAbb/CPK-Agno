# Doc drift changelog

What the CopilotKit docs changed under this repo, written by the sync on
`/doc-sync`. Only pages that actually moved are recorded — a sync that finds
everything unchanged writes nothing here at all.

Holds the 3 most recent dated entries. When a change lands on a fourth
date, the oldest entry is dropped. Entries are counted, not aged, so a gap of
weeks between changes does not expire anything.

## 2026-08-26

### 09:21 UTC — 9 pages, highest severity high

**High — Quickstart**

`/agno/quickstart` · route `/quickstart` · under “Quickstart”

15 code lines, 26 prose lines changed. The number of fenced code blocks changed.

````diff
- body="Add persistent threads and the inspector with the Enterprise Intelligence Platform."
+ body="Add persistent threads and the inspector with CopilotKit Intelligence."
- <SignupLink surface="docs_agno_quickstart_step1">Sign up for a free developer account</SignupLink> on our Enterprise Intelligence Platform to get a license key. You'll use it later to enable persistent threads and the inspector.
+ <SignupLink surface="docs_agno_quickstart_step1">Sign up for a free developer account</SignupLink> for CopilotKit Intelligence to get a license key. You'll use it later to enable persistent threads and the inspector.
- - **Enterprise Intelligence Platform** — persistent threads and the inspector. Choose **Yes** to scaffold a project pre-wired for the platform (the CLI walks you through sign-up, or you can [create an account](https://dashboard.operations.copilotkit.ai/?utm_source=docs&utm_medium=cta&utm_campaign=intelligence&utm_content=docs_cli_prompt) first), or **No** for a standard Agno setup.
+ - **CopilotKit Intelligence** — persistent threads and the inspector. Choose **Yes** to scaffold a project pre-wired for the platform (the CLI walks you through sign-up, or you can [create an account](https://dashboard.operations.copilotkit.ai/?utm_source=docs&utm_medium=cta&utm_campaign=intelligence&utm_content=docs_cli_prompt) first), or **No** for a standard Agno setup.
+ CopilotKitIntelligence,
- InMemoryAgentRunner,
````

**High — Overview**

`/agno/threads` · route `/threads` · under “Get started”

6 code lines, 2 headings, 24 prose lines changed.

````diff
- Create a new CopilotKit app connected to cloud-hosted Enterprise Intelligence. Your application and CopilotKit Runtime run locally while Enterprise Intelligence stores and synchronizes Rich Threads.
+ Create a new CopilotKit app connected to cloud-hosted CopilotKit Intelligence. Your application and CopilotKit Runtime run locally while CopilotKit Intelligence stores and synchronizes Rich Threads.
- Enterprise Intelligence.
+ CopilotKit Intelligence.
- sign-in and Enterprise Intelligence project selection when needed. Use the
+ sign-in and CopilotKit Intelligence project selection when needed. Use the
- manual Enterprise Intelligence environment configuration. Do not set up a local
+ manual CopilotKit Intelligence environment configuration. Do not set up a local
````

**Medium — Copilot Runtime**

`/agno/copilot-runtime` · route `/backend/copilot-runtime` · under “Enterprise Intelligence Platform”

2 headings, 2 prose lines changed.

````diff
- ### Enterprise Intelligence Platform
+ ### CopilotKit Intelligence
- Features like [threads](/agno/threads) and the [inspector](/agno/inspector) are provided through the runtime and the Enterprise Intelligence Platform. These give you conversation persistence and debugging capabilities out of the box.
+ Features like [threads](/agno/threads) and the [inspector](/agno/inspector) are provided through the runtime and CopilotKit Intelligence. These give you conversation persistence and debugging capabilities out of the box.
````

**Medium — Headless Threads**

`/agno/headless-threads` · route `/threads/headless` · under “What is this?”

2 headings, 14 prose lines changed.

````diff
- CopilotKit Rich Threads enable persistent, resumable multi-turn conversations. The `useThreads` hook lists, creates, renames, archives, and deletes Enterprise Intelligence Platform threads with realtime synchronization via WebSocket. Threads work with any agent framework — the Enterprise Intelligence Platform stores conversation history server-side, so users can close their browser and pick up where they left off. It does not list or mutate native LangGraph, ADK, or other framework stores unless your backend explicitly bridges those systems. Thread metadata updates (renames, archives, new threads) appear on connected clients without polling.
+ CopilotKit Rich Threads enable persistent, resumable multi-turn conversations. The `useThreads` hook lists, creates, renames, archives, and deletes CopilotKit Intelligence threads with realtime synchronization via WebSocket. Threads work with any agent framework — CopilotKit Intelligence stores conversation history server-side, so users can close their browser and pick up where they left off. It does not list or mutate native LangGraph, ADK, or other framework stores unless your backend explicitly bridges those systems. Thread metadata updates (renames, archives, new threads) appear on connected clients without polling.
- title="Threads run on the Enterprise Intelligence Platform"
+ title="Threads run in CopilotKit Intelligence"
- - A CopilotKit application connected to Enterprise Intelligence
+ - A CopilotKit application connected to CopilotKit Intelligence
- Enterprise Intelligence. To move historical Google ADK or LangGraph
+ CopilotKit Intelligence. To move historical Google ADK or LangGraph
````

**Medium — Synchronize Thread History**

`/agno/threads-import` · route `/threads/import` · under “Import & Synchronize Thread History”

2 headings, 18 prose lines changed.

````diff
- > Import historical conversations into Enterprise Intelligence, then keep future CopilotKit runs synchronized with Rich Threads.
+ > Import historical conversations into CopilotKit Intelligence, then keep future CopilotKit runs synchronized with Rich Threads.
- Import and synchronization bring existing conversations into Enterprise Intelligence as Rich Threads without replacing the native storage or analytics you already use. Import supported history once, then continue running those conversations through CopilotKit so users can resume them through the same thread UI as new conversations.
+ Import and synchronization bring existing conversations into CopilotKit Intelligence as Rich Threads without replacing the native storage or analytics you already use. Import supported history once, then continue running those conversations through CopilotKit so users can resume them through the same thread UI as new conversations.
- Built-in import currently supports Google ADK and LangGraph, with more sources coming soon. You can keep LangSmith, LangGraph, or ADK storage and analytics in place. For future CopilotKit-mediated runs, Enterprise Intelligence persists the Rich Thread event history. When your agent remains connected to a durable LangGraph checkpointer or durable ADK session service with appropriate retention, those future runs continue through the native persistence path as well.
+ Built-in import currently supports Google ADK and LangGraph, with more sources coming soon. You can keep LangSmith, LangGraph, or ADK storage and analytics in place. For future CopilotKit-mediated runs, CopilotKit Intelligence persists the Rich Thread event history. When your agent remains connected to a durable LangGraph checkpointer or durable ADK session service with appropriate retention, those future runs continue through the native persistence path as well.
- By default, the importer targets the Enterprise Intelligence project selected when you created the app with the CopilotKit CLI. If that is the project that should receive the imported threads, continue to the dry run.
+ By default, the importer targets the CopilotKit Intelligence project selected when you created the app with the CopilotKit CLI. If that is the project that should receive the imported threads, continue to the dry run.
````

**Low — AG-UI**

`/agno/ag-ui` · route `/backend/ag-ui` · under “The proxy pattern”

2 prose lines changed.

````diff
- routing, and CopilotKit Enterprise Intelligence without changing how the
+ routing, and CopilotKit Intelligence without changing how the
````

**Low — Threads Drawer**

`/agno/prebuilt-components/copilot-threads-drawer` · route `/threads/drawer` · under “When should I use this?”

4 prose lines changed.

````diff
- It requires the Enterprise Intelligence Platform (threads are stored and synced
+ It requires CopilotKit Intelligence (threads are stored and synced
- title="Threads run on the Enterprise Intelligence Platform"
+ title="Threads run in CopilotKit Intelligence"
````

**Low — Threads & Persistence Architecture**

`/agno/premium/threads-explained` · route `/threads/architecture` · under “Threads & Persistence Architecture”

10 prose lines changed.

````diff
- body="Persistent threads ship with the Enterprise Intelligence Platform on the free Developer tier."
+ body="Persistent threads ship with CopilotKit Intelligence on the free Developer tier."
- | `CopilotRuntime` | Server-side layer that executes agents, stores thread data on the Enterprise Intelligence Platform, and relays events to connected clients. |
+ | `CopilotRuntime` | Server-side layer that executes agents, stores thread data in CopilotKit Intelligence, and relays events to connected clients. |
- As an agent runs, the runtime writes each event (messages, tool calls, and state updates) to the thread on the Enterprise Intelligence Platform. It stores the raw event stream rather than a snapshot of the final message list, so a returning client can be restored to the exact state it left, and can fetch only the events it missed rather than reloading the whole history.
+ As an agent runs, the runtime writes each event (messages, tool calls, and state updates) to the thread in CopilotKit Intelligence. It stores the raw event stream rather than a snapshot of the final message list, so a returning client can be restored to the exact state it left, and can fetch only the events it missed rather than reloading the whole history.
- that run through CopilotKit are persisted to Enterprise Intelligence. When the
+ that run through CopilotKit are persisted to CopilotKit Intelligence. When the
````

**Low — Thread & History Lifecycle**

`/agno/threads-lifecycle` · route `/threads/lifecycle` · under “The lifecycle at a glance”

12 prose lines changed.

````diff
- 2. **Run.** Messages and tool calls stream under that `threadId`. If a server-side store is configured (the Enterprise Intelligence Platform, or a persisting `AgentRunner`), they are persisted as they happen so the thread can be replayed later. A runtime with no persistence layer keeps nothing server-side. See [Threads & Persistence Architecture](/agno/premium/threads-explained) for the full server-side model.
+ 2. **Run.** Messages and tool calls stream under that `threadId`. If a server-side store is configured (CopilotKit Intelligence, or a persisting `AgentRunner`), they are persisted as they happen so the thread can be replayed later. A runtime with no persistence layer keeps nothing server-side. See [Threads & Persistence Architecture](/agno/premium/threads-explained) for the full server-side model.
- Replay requires a **server-side store to replay from**: the Enterprise Intelligence Platform, or a persisting `AgentRunner` (e.g. the SQLite runner). A self-hosted runtime with no persistence layer has nothing to replay, so `connectAgent()` returns an empty stream and the conversation starts blank. If history isn't restoring, check that a store is configured, not the client code. The [Persistence Architecture](/agno/premium/threads-explained) page covers how replay works server-side.
+ Replay requires a **server-side store to replay from**: CopilotKit Intelligence, or a persisting `AgentRunner` (e.g. the SQLite runner). A self-hosted runtime with no persistence layer has nothing to replay, so `connectAgent()` returns an empty stream and the conversation starts blank. If history isn't restoring, check that a store is configured, not the client code. The [Persistence Architecture](/agno/premium/threads-explained) page covers how replay works server-side.
- Enterprise Intelligence combines that application user identity with the
+ CopilotKit Intelligence combines that application user identity with the
- | **CopilotKit threads** | Conversation list + full AG-UI event history (messages, tool calls, state), with realtime sync | The Enterprise Intelligence Platform, via `useThreads` |
+ | **CopilotKit threads** | Conversation list + full AG-UI event history (messages, tool calls, state), with realtime sync | CopilotKit Intelligence, via `useThreads` |
````

---

## 2026-08-24

### 09:24 UTC — 5 pages, highest severity high

**High — Copilot Runtime**

`/agno/copilot-runtime` · route `/backend/copilot-runtime` · under “Setting Up the Runtime”

41 code lines, 13 prose lines changed. The number of fenced code blocks changed.

````diff
- The runtime is a lightweight server endpoint that you add to your backend. Here's a minimal example using Next.js:
+ The runtime is a lightweight server endpoint that you add to your backend:
- ```ts title="app/api/copilotkit/route.ts"
+ ```npm
+ npm install @copilotkit/runtime
+ ```
+ 
+ Here's a minimal example using Next.js. `createCopilotRuntimeHandler` returns a
````

**High — Headless Threads** · _local snapshot edit, not an upstream change_

`/agno/headless-threads` · route `/threads/headless` · under “Configure your Runtime with Enterprise Intelligence”

18 code lines, 2 prose lines changed.

````diff
- Your `CopilotRuntime` must be connected to Enterprise Intelligence before the thread UI can list and resume conversations. If your app came from a CLI starter, this Runtime configuration is generated for you. Otherwise, keep your existing Enterprise Intelligence Runtime configuration while adding the headless UI. Thread names are automatically generated by the LLM after the first message — you can disable this with `generateThreadNames: false`.
+ Your `CopilotRuntime` must be connected to Enterprise Intelligence before the thread UI can list and resume conversations. That connection is the `intelligence` option below — a `CopilotKitIntelligence` instance. If your app came from a CLI starter, this Runtime configuration is generated for you. Otherwise, follow [Connect your runtime to Intelligence](/agno/premium/connect-your-runtime) for the full constructor, then return here to add the headless UI. Thread names are automatically generated by the LLM after the first message — you can disable this with `generateThreadNames: false`.
- import { CopilotRuntime } from "@copilotkit/runtime";
+ import {
+ CopilotKitIntelligence,
+ CopilotRuntime,
+ } from "@copilotkit/runtime/v2";
+ },
````

**High — Quickstart** · _local snapshot edit, not an upstream change_

`/agno/quickstart` · route `/quickstart` · under “Setup Copilot Runtime” · in a `tsx` block

30 code lines changed.

````diff
- ```tsx title="app/api/copilotkit/route.ts"
+ ```tsx title="app/api/copilotkit/[[...slug]]/route.ts" doctest="component"
- ExperimentalEmptyAdapter,
- copilotRuntimeNextJSAppRouterEndpoint,
- } from "@copilotkit/runtime";
+ createCopilotRuntimeHandler,
+ InMemoryAgentRunner,
+ } from "@copilotkit/runtime/v2";
````

**High — Thread & History Lifecycle**

`/agno/threads-lifecycle` · route `/threads/lifecycle` · under “Scope Rich Threads to the signed-in user” · in a `ts` block

8 code lines, 5 prose lines changed.

````diff
+ import { CopilotKitIntelligence, CopilotRuntime } from "@copilotkit/runtime/v2";
+ 
+ // `apiKey` is the only required field. The key scopes the project, so there is
+ // no separate project or organization id to pass. See Connect your runtime.
+ const intelligence = new CopilotKitIntelligence({
+ apiKey: process.env.INTELLIGENCE_API_KEY!,
+ });
+ 
````

**Low — Inspector** · _local snapshot edit, not an upstream change_

`/agno/inspector` · route `/custom-look-and-feel/inspector` · under “What it shows”

14 prose lines changed.

````diff
- The CopilotKit Inspector is a built-in debugging tool that overlays on your app, giving you full visibility into what's happening between your frontend and your agents in real time.
+ The CopilotKit Inspector is a built-in debugging tool that overlays on your app.
+ The first open lands on **Home**. Later opens return to the last pane you used.
+ | **Home** | Project, runtime, services, and CopilotKit news. |
+ | **Memory** | Inspect long-term memory when Intelligence exposes it. |
- The primary navigation groups the Inspector into **Threads**, **Agents**, and
- **Learning**. Threads is the default. Open a real Thread to inspect its
+ The sidebar has three groups: **Home**, **Workbench** (Threads, Memory), and
````

---

---

## 2026-08-21

### 13:15 UTC — 4 pages, highest severity medium

**Medium — Headless Threads**

`/agno/headless-threads` · route `/threads/headless` · under “Manage threads headlessly”

Simplified thread pagination and removed obsolete framework flags.

**Medium — Inspector**

`/agno/inspector` · route `/custom-look-and-feel/inspector` · under “Enable the inspector”

Added key distinction documentation for publishable vs server-side API keys.

**Medium — Quickstart**

`/agno/quickstart` · route `/quickstart` · under “Getting started”

Updated CLI scaffolding step formatting and instructions.

**Medium — Overview**

`/agno/threads` · route `/threads` · under “Get started”

Added inspector callout guidance to overview page.

---
