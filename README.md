# CopilotKit + Agno Test Suite

A navigable, working test harness covering every page of the CopilotKit Agno documentation — each doc page is a route that actually runs the thing it describes.

|                         |                                                                                                                                                                       |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Doc sync date**       | Machine-maintained — `doc-snapshot/manifest.json` → `syncedAt`, rewritten on every sync                                                                               |
| **CopilotKit packages** | `@copilotkit/react-core` 1.73.3 · `@copilotkit/runtime` 1.73.3 · `@copilotkit/web-inspector` 1.73.3 (transitive) — declared `^1.73.3` since 2026-09-23 |
| **AG-UI packages**      | `@ag-ui/agno` 0.0.6 · `@ag-ui/client` 0.0.59                                                                                                                          |
| **Frontend**            | Next.js 16.3.0 (App Router) · React 19.2 · TypeScript · Tailwind 4                                                                                                    |
| **Backend**             | Python 3.12 · Agno 2.8.6 · FastAPI/AgentOS                                                                                                                            |
| **Build status**        | Locally verified: 24 doc routes + 17 demo routes, live agent run ✅, rendered source byte-matches disk ✅. Typecheck (`npx tsc --noEmit`) passing on 1.73.3, 2026-09-23. |

---

## 2. Overview

[Agno](https://docs.agno.com) is a Python agent framework. Its `AgentOS` server can expose an agent over [AG-UI](https://ag-ui.com), the event protocol CopilotKit speaks, which is what lets a React app drive an Agno agent with streaming, tool calls, and generative UI.

This repo is a **living test harness** for that integration. Each route implements what its doc page teaches — not a restatement of it. It covers a deliberately scoped subset of `https://docs.copilotkit.ai/agno`: the CLI, Build-with-agents, MCP Apps, A2UI, Intelligence Platform, Common Issues, and Migration-guide sections are intentionally out of scope and have no route. Routes that cannot work locally (licensed features, or ones needing a service this repo doesn't ship) are clearly labelled and explain exactly what's missing, rather than being faked.

Tracks: **<https://docs.copilotkit.ai/agno>**

---

## 3. Architecture

```
Browser (React 19)
  │  @copilotkit/react-core/v2 — CopilotKitProvider, CopilotChat, hooks
  │  POST /api/copilotkit
  ▼
Next.js 16 App Router  ·  localhost:3010
  │  Copilot Runtime  (@copilotkit/runtime)
  │  agents: { default, agno_agent } → new AgnoAgent({ url })
  │  POST http://localhost:8010/agui   ← AG-UI over SSE
  ▼
Agno AgentOS  ·  localhost:8010        ← Python / FastAPI
  │  AgentOS(agents=[agent], interfaces=[AGUI(agent=agent)])
  ▼
OpenAI  (gpt-6-luna by default)
```

Three points worth noting:

- **The backend for this framework is Python.** Agno is a Python library; the agent runs under `uvicorn`, not Node.
- **The runtime lives inside the Next app**, at `frontend/src/app/api/copilotkit/[[...slug]]/route.ts`. There is no third server.
- **The model key never reaches the browser.** Only the Agno process holds it, and the browser never talks to Agno directly.

---

## 4. Prerequisites

| Requirement                        | Version                | Notes                                               |
| ---------------------------------- | ---------------------- | --------------------------------------------------- |
| Node.js                            | 20+ (built on 24.16.0) | Next.js 16 requires 20+.                            |
| npm                                | 10+ (built on 12.0.1)  | Or pnpm/yarn/bun.                                   |
| Python                             | 3.9+ (built on 3.12.3) | Per the Agno quickstart.                            |
| [`uv`](https://docs.astral.sh/uv/) | 0.11+                  | Used for the backend. `pip` works too.              |
| OpenAI API key                     | —                      | Required.                                           |
| CopilotKit license key             | —                      | **Optional.** Only unlocks the Rich Threads routes. |

No framework-specific CLI is required. The CopilotKit CLI (`npx copilotkit@latest`) scaffolds new projects and signs into the licensed platform; this repo is already scaffolded, so you don't need it.

---

## 5. Setup

**1. Clone**

```bash
git clone <this-repo> agno && cd agno
```

**2. Install frontend deps**

```bash
cd frontend && npm install && cd ..
```

**3. Install backend deps**

```bash
cd backend && uv sync && cd ..
```

**4. Configure the environment**

```bash
cp .env.example backend/.env
```

Then edit `backend/.env`:

| Variable                             | Where                 | What it does                                                                 |
| ------------------------------------ | --------------------- | ---------------------------------------------------------------------------- |
| `OPENAI_API_KEY`                     | `backend/.env`        | **Required.** The model key. The backend refuses to start without it.        |
| `OPENAI_MODEL`                       | `backend/.env`        | Model id. Defaults to `gpt-6-luna`, as in the Human in the Loop sample.      |
| `AGENT_PORT`                         | `backend/.env`        | Agno's port. Defaults to `8000` in code; set to `8010` in `backend/.env`.                                             |
| `AGENT_CORS_ORIGINS`                 | `backend/.env`        | Origins allowed to hit the agent directly. Not needed on the normal path.    |
| `AGNO_AGENT_URL`                     | `frontend/.env.local` | Where the runtime finds the agent. Defaults to `http://localhost:8010/agui`. |
| `AGENT_URL`                          | `frontend/.env.local` | Agent server root for the routes copied from the docs' demo Code tabs (A2UI, Open Generative UI, Shared State, HITL overview, Sub-agents). Published default is `http://localhost:8000`, so **set it to `http://localhost:8010`** with the ports above, or those demos cannot reach the agent. |
| `CPK_INTELLIGENCE_API_KEY`           | `frontend/.env.local` | Server-side managed-project key. Unlocks Rich Threads. Optional.             |
| `COPILOTKIT_LICENSE_TOKEN`           | `frontend/.env.local` | Self-hosted/OSS license token only. Not issued for managed projects.         |

> Next.js does not read the repo-root `.env`. Frontend variables belong in `frontend/.env.local`. The defaults are correct for a standard local run except `AGENT_URL`, so in practice you need `OPENAI_API_KEY` in `backend/.env` and `AGENT_URL=http://localhost:8010` in `frontend/.env.local`.

**Default ports:** frontend **3010**, backend **8010**.

**5. Updating packages to latest versions (optional)**

To update dependencies to their latest versions:

- **Frontend (`frontend/`)**:

  ```bash
  cd frontend

  # Option A: Update all dependencies to latest major/minor versions
  npx npm-check-updates -u && npm install

  ```

  > **Note:** If `@ag-ui/*` packages are updated, verify the versions in the `overrides` section in `frontend/package.json` match to prevent version mismatches.

- **Backend (`backend/`)**:

  ```bash
  cd backend
  # Using uv (recommended) — upgrade uv.lock and sync:
  uv lock --upgrade ; uv sync

  ```

---

## 6. Running the project

Two processes, two terminals.

**Terminal 1 — the agent:**

```bash
cd backend
uv run main.py
```

Success looks like:

```
INFO:     Uvicorn running on http://0.0.0.0:8010 (Press CTRL+C to quit)
INFO:     Application startup complete.
```

If `OPENAI_API_KEY` is missing it exits immediately with a message telling you so — deliberately, rather than starting and failing on the first message.

**Terminal 2 — the app:**

```bash
cd frontend
npm run dev
```

Success looks like:

```
▲ Next.js 16.3.0 (Turbopack)
- Local:   http://localhost:3010
✓ Ready in 1.2s
```

Open **<http://localhost:3010>**. The home page probes the agent server-side and shows a connection panel — check it first if anything misbehaves.

---

## 7. What to expect — walkthrough per section

Every route shows a status badge and a link to the doc page it tests. "Pass" and "Fail" below are what a tester should look for.

### How each route is split

Routes with a live feature are split in two:

|                         |                                                                                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`<route>`**           | Notes, pass/fail criteria, and **the exact source** of the implementation, read off disk at render time. No live chat here.                        |
| **`<route>/demo-chat`** | Just the running feature, with no sidebar or page chrome — built for screen recording. Reached via the **Open demo ↗** button in the route header. |

Two consequences worth knowing:

- **The code on a page is never a re-typed approximation.** Each page reads real files from the repo (`frontend/src/lib/source.ts`), so what you compare against the doc is what actually runs. Some excerpts use `#region` markers, which stay visible in the source file and are labelled with their line numbers.
- **Demo routes share the app-wide provider**, so a conversation started in a demo continues on any other route. That's deliberate — `/custom-look-and-feel/headless-ui/demo-chat` and `/custom-look-and-feel/programmatic-control/demo-chat` show the _same_ conversation through two completely different UIs.

22 of the 28 doc routes have a demo: quickstart, prebuilt-components, the three interactive thread routes, all five Custom Look and Feel routes, display-only, tool-rendering, frontend-cards, frontend-tools, governed-actions, human-in-the-loop, both Backend routes, error-debugging, intelligence/memories, learning, and cookbook/jev-generative-ui. The other 6 have nothing to run: `/`, `/threads`, `/threads/import` and `/threads/architecture` are reference pages; `/generative-ui/your-components/interactive` is a doc page with nothing in it; `/webmcp` is tracked for drift with the demo deliberately not built (see below).

### Getting Started

**`/` — Introduction**
Orientation plus a live connection check. **Try:** load the page. **Pass:** "Agno agent" shows a green dot and `200 from http://localhost:8010/status`. **Fail:** a red dot and "unreachable" — the agent isn't running.

**`/quickstart` — Quickstart**
The minimum viable path: provider, runtime route, one chat. **Try:** `Can you tell me a joke?` **Pass:** tokens stream in one at a time and render as markdown. **Fail:** nothing streams, or an error banner appears.

### Basics

**`/prebuilt-components` — Prebuilt Components**
`CopilotChat`, `CopilotSidebar`, and `CopilotPopup` in tabs — only one mounts at a time, since the sidebar and popup both use fixed positioning. **Try:** `What is CopilotKit?`, then switch tabs. **Pass:** all three drive the same agent, and the conversation survives tab switches (one shared provider). **Fail:** a component renders blank, or the sidebar/popup never appears.

### Rich Threads — all require a license key

**`/threads` — Overview.** Reference: what threads persist and why it's an event log, not a transcript.

**`/threads/drawer` — Threads Drawer.** `CopilotThreadsDrawer` beside either `CopilotChat` or `CopilotSidebar`, plus a header button that calls `startNewThread()` through the shared `CopilotChatConfigurationProvider`; both hosts select the registered `agno_agent`. A third tab demonstrates the documented controlled `threadId`, `onThreadSelect`, and `onNewThread` callbacks. **Try:** press the header's “New conversation” button, then try the `Controlled threadId` tab. **Pass (licensed):** it starts a fresh conversation, and selecting a row replays that conversation; in controlled mode the app updates the thread id from either Drawer callback. **Pass (unlicensed):** a _locked panel_ — that's the correct result, and proves the component mounted and detected the missing license. **Fail:** a blank area with no locked state.

**`/threads/headless` — Headless Threads.** A thread list built by hand on `useThreads`, including **rename**, which the prebuilt drawer doesn't expose. **Pass (licensed):** threads list, and rename/archive/delete take effect. **Pass (unlicensed):** an empty list with an explanatory note.

**`/threads/lifecycle` — Thread & History Lifecycle.** One button per lifecycle claim on the page, with the chat's resolved state read back from its `CopilotChatConfigurationProvider`, so the readouts are the chat's own. **Try:** send a message, press "Remount chat", then "Open conversation", "New chat", "Pin a threadId prop" and "New chat" again. **Pass:** the remount gives a new id and an empty chat; "Open conversation" returns to the first id with its messages replayed from the runtime's `InMemoryAgentRunner`; with the id pinned, "New chat" changes nothing and the amber line shows the `Ignoring startNewThread()` warning; the pinned id survives a remount. **Fail:** the re-opened thread shows 0 messages (nothing replayed). The ledger lists every id the chat has been on. See [FINDINGS.md](FINDINGS.md) #28.

**`/threads/import` — Synchronize Thread History.** Reference. The guide covers ADK, LangGraph, Mastra, and AWS Strands history, with a LangGraph user ID mapping example; Agno isn't a documented source.

**`/threads/architecture` — Persistence Architecture.** Reference: replay, reconnection, auto-naming, locks.

### Custom Look and Feel

**`/custom-look-and-feel/programmatic-control`**
Drives the agent with no chat component. **Try:** type a message, press Run. **Pass:** status flips to Running, the message count climbs, tokens stream into the transcript; Stop halts it mid-stream. **Fail:** Run does nothing.

**`/custom-look-and-feel/inspector`**
The debugging overlay, mounted by the provider (never by hand — see [FINDINGS.md](FINDINGS.md)). **Try:** send a message, open the inspector docked at the window edge. **Pass:** the event list fills, and Frontend Tools lists all four browser tools with schemas. **Fail:** no inspector at all — it is force-disabled in production builds, so confirm you're on `npm run dev`. If it appears but says _"CopilotKit core not attached"_, something is rendering `<CopilotKitInspector />` without a `core` prop.

**`/custom-look-and-feel/slots`**
Three override levels against one chat, with a reference to the documented `workSummary` and `assistantMessage.toolCallsView.group` slots. **Pass:** level 1 tints the message area; level 2 auto-focuses the input; level 3 shows a custom header, custom layout, and a custom streaming cursor. **Fail:** all three tabs look identical. The grouped-tool-call example is partial because its published helper exports are missing from the installed package; see [FINDINGS.md](FINDINGS.md) #40.

**`/custom-look-and-feel/headless-ui`** _(live but absent from the sidebar)_
A chat with zero CopilotKit chrome. **Try:** `What's the weather in London?` **Pass:** messages stream into hand-written bubbles and tool calls still render through the registry. **Fail:** Send does nothing.

**`/custom-look-and-feel/markdown` — Markdown Rendering.** New upstream, tracked 2026-09-21. The `markdownRenderer` slot three ways, all verbatim: a Streamdown `components` map, a class string, and a bare component that replaces the renderer. **Try:** `Reply in markdown with an '## Overview' heading and a link to https://docs.copilotkit.ai.` on each tab. **Pass:** the probe row under the chat shows level 1's anchor carrying `class="my-link"`, `href`, `target="_blank"` and `rel="noopener noreferrer"` and **no** `node` attribute; level 2 restyles the block with Streamdown's own `data-streamdown` markup intact; level 3 shows a `pre` of raw markdown with no `a` or `h2` at all. **Fail:** a `node="[object Object]"` attribute anywhere, level 1 losing `target`/`rel`, or three identical tabs. All three snippets typecheck as published — including the bare component that [FINDINGS.md](FINDINGS.md) #3 says most slots reject. See [FINDINGS.md](FINDINGS.md) #26.

### Generative UI

**`/generative-ui/tool-based`** — ❌ Broken
Controlled generative UI: `useComponent` registers bar- and pie-chart components, and the page's Agno backend declares an empty `@tool(external_execution=True)` stub plus a `SqliteDb` so the paused run can resume. Page code only: the Code-tab `page.tsx` (its unprinted `useSuggestions` call commented out), minimal labelled stand-ins for the unprinted `bar-chart.tsx`/`pie-chart.tsx`, and `backend/agents/chart_agent.py` with the page's two snippets verbatim. The page never defines `SYSTEM_PROMPT`, so that module raises `NameError` and is not mounted; agent id `gen-ui-tool-based` is unregistered. Also no backend stub for `render_pie_chart`, model id `gpt-6-luna`. **Try:** `Show me a bar chart of quarterly sales for Q1, Q2, Q3, Q4.` **Expected today:** the runtime can't find agent `gen-ui-tool-based` (the documented gap). **Would pass:** a bar chart renders inline once the page publishes a working backend.

**`/generative-ui/state-rendering`** — ❌ Broken (reference only)
The rendered Agno page says "Not supported on Agno" and prints no Agno code: no demo files, no backend. The route shows the one `useAgent` snippet from the page's `.md` export for reference; no demo or agent is filled in. **Pass:** the page renders with the gap callout. There is nothing to run.

**`/generative-ui/your-components/display-only`**
Registering a React component as a tool the agent can render — `useComponent`, no handler, no interaction. **Try:** `Show the weather card for Tokyo: 77 degrees, clear`. **Pass:** a bordered weather card renders inline in the chat with the agent's values. **Fail:** a plain-text answer with no card — the tool wasn't called.

**`/generative-ui/your-components/interactive`** — 🚧 **Intentionally empty.** The upstream doc page is a stub (its whole body is a `<SharedContent />` placeholder), so there's nothing to implement. The route exists to keep the nav and status table complete.

**`/generative-ui/tool-rendering`**
A named renderer for `get_weather` plus a wildcard fallback. **Try:** `What's the weather in Tokyo?` then `What's the price of NVDA?` **Pass:** weather renders the bordered card, transitioning "Checking…" → result; the stock call renders the plain monospace fallback. **Fail:** raw JSON, or nothing.

**`/generative-ui/frontend-cards`** — ✅ **Working**, with a silent-loss finding. New upstream 2026-09-11. A card pushed into the transcript from frontend code as a `role: "activity"` message, which is stripped from every run. **Try:** click **Simulate: deployment finished**, then ask `Have you been shown any deployment card?` **Pass:** the card renders; the probe row reads `agent.messages = activity, user, assistant` and `run payload = user` (read off the request that left the browser); the agent says it saw no card. **Fail:** no card, or `activity` in the payload row. The three snippets are verbatim; step 3's `<DeploymentWatcher />` is mounted inside step 2's provider, which the page never says to do, and its `wss://example.com` socket never delivers, so the button fires the same `addMessage`. See [FINDINGS.md](FINDINGS.md) #15.

The A2UI, Open Generative UI, Shared State, HITL overview and Sub-agents routes (added 2026-10-07) run the docs' demo **Code tab** code, copied byte-exact into `<route>/_demo/<demo-id>/` (the bundle's `src/app/demos/<demo-id>/`). Each demo wraps itself in its own `<CopilotKit>`, so the root provider's Inspector stands down on those routes (`lib/inspector.ts`). None has been checked in a browser yet; "backend-checked" means the AG-UI endpoint was driven directly with `curl`.

**`/generative-ui/a2ui`** — 📖 Reference
The A2UI overview page: `a2ui: {}` on `CopilotRuntime` (optionally scoped with `a2ui.agents`), and an optional `a2ui={{ theme }}` prop on `<CopilotKit>`. No demo. Both snippets are kept byte-for-byte in `frontend/src/app/generative-ui/a2ui/_doc/` and type-checked but never served. `myAgent` and `children` are undefined on the page and suppressed with `@ts-expect-error`. **Try:** nothing to run here; use the Fixed / Dynamic Schema routes below. **Note:** with `a2ui: {}` and no provider catalog, runtime 1.77 injects no A2UI tool. The page's "any A2UI output renders automatically" only holds if the agent's own tools return A2UI operations.

**`/generative-ui/a2ui/dynamic-schema`** — ⚠️ Partial
A catalog of eight branded components handed to the provider; a secondary LLM designs each surface from it. The published agent's own `generate_a2ui` needs an unpublished `tools` package, so the agent is the published prompt only and the runtime takes the page's auto-inject path (its `a2ui` block is commented out). **Try:** `Show me my sales dashboard for this quarter.` **Pass:** a surface of Metric tiles, a table and a chart. **Fail:** prose (tool not injected) or raw JSON (middleware not running). Backend-checked: the agent calls an injected `generate_a2ui`.

**`/generative-ui/a2ui/fixed-schema`** — ⚠️ Partial
A flight card whose component tree is a JSON file on the backend; `display_flight` supplies only the data. Everything verbatim from the Code tab. **Try:** `Find me a flight from SFO to JFK on United for $289.` **Pass:** card with SFO → JFK, a UNITED badge, Total $289 and a Book button that does nothing (published as inert). **Fail:** blank bound fields — the zod 4 symptom; this repo pins zod 3.25.76. Backend-checked: the tool returns the operations container.

**`/generative-ui/mcp-apps`** — 🚧 **Tracked, not implemented.** The runtime examples use `BuiltInAgent` and show both built-in and optional middleware setup, but the page publishes no Agno integration code or embedded demo.

**`/generative-ui/open-generative-ui`** — ⚠️ Partial
The agent writes HTML/CSS/JS into a sandboxed iframe; the demo route has the page's minimal and advanced (host sandbox functions) demos as tabs. Runtime route and frontends verbatim; the Agno agent is never published, so `backend/agents/open_gen_ui_agent.py` is repo-authored (no tools). **Try:** `How a neural network works`; on the Advanced tab, `Calculator (calls evaluateExpression)`. **Pass:** an iframe that builds itself live; the calculator logs `evaluateExpression` in the browser console. **Fail:** a prose answer — which is what the agent gave when offered a stand-in tool outside the runtime, so this one is unverified.

### Generative UI › Components and surfaces

All nine routes are new as of 2026-11-10 and were ported from the CPK-LangGraph-TS harness (the agno pages are byte-identical to the langgraph-typescript ones). They need `@copilotkit/*` 1.85 (`/v2/generative-ui` doesn't exist in 1.77), so this repo was bumped. Every demo talks to `/api/copilotkit-genui` (or `/api/copilotkit-genui-transports`) → the Agno `genui` agent in `backend/agents/genui_agent.py`: a plain agent with no tools and the page's own default prompt (the section prints only a TanStack agent). It needs no tools because Agno's stock AG-UI router forwards the run's `render_ui` tool and catalog guide. Typecheck only; none of them has been run in a browser.

**`/generative-ui/components`** — ⚠️ Partial
`standardUI` on the provider; the runtime adds `render_ui` and the agent streams real components. Served by the Agno `genui` agent (the page's runtime is a TanStack `BuiltInAgent`). **Try:** "Compare the Starter, Team, and Enterprise plans in a table", then "add a column for support". **Pass:** a table streams in and the follow-up edits it in place. **Fail:** plain markdown → `render_ui` never reached the model.

**`/generative-ui/components/surfaces`** — ⚠️ Partial
`GenerativeUISurface` page targets the chat fills, limits, scrolls to and replaces; every Components route talks to the `genui` agent through `/api/copilotkit-genui`. **Try:** "Show me cheap running shoes in the featured row." then "Show the featured products again.". **Pass:** the page's own row is replaced by a ProductGrid, and the second prompt brings the row back. **Fail:** the grid lands in the chat, so the target's description never reached the agent.

**`/generative-ui/components/catalogs`** — ⚠️ Partial
`createGenerativeUI` catalogs: typed props, zod and Valibot, `extends`, `parameterOrder`, `exportA2UICatalog`. **Try:** "Show me three running shoes as product cards.". **Pass:** ProductCards with a name, price and image each (model-invented values); the Export tab lists `component, title, children, color`. **Fail:** standard components such as Table appear on `shopUI`.

**`/generative-ui/components/standard-catalog`** — ⚠️ Partial
`standardUI` as is, extended, with `omit`, and with a `Card` override. **Try:** "Show the Eiffel Tower and the Louvre on a map.". **Pass:** a MapLibre map on `standardUI`, and no map on the omit variant. **Fail:** a plain list on `standardUI`, so `maplibre-gl` did not load.

**`/generative-ui/components/state-and-actions`** — ⚠️ Partial
`bind` from app state, functions on click, writable props. The page's catalogs are used without a layout wrapper, and "Send a click to the agent" isn't exercised because it names no component. **Try:** "Show a product card for p1 Trail Runner." on the App state tab. **Pass:** the card shows "In cart: 0", which comes from app state (nothing on the page adds to the cart). **Fail:** no "In cart" line, so `bind` didn't run. Asking for two cards may fail: the catalogs have no container.

**`/generative-ui/components/theming`** — ⚠️ Partial
`theme` variables, a typed theme file, dark overrides, map styles, `.a2ui-surface` CSS. **Try:** "Show a card with a primary button, a slider, and a bar chart of three months.". **Pass:** amber `#d97706` accent on the button and slider. **Fail:** the default accent on the Provider theme variant. The Map variant's basemap is blank by design (the page's URLs are placeholders).

**`/generative-ui/components/transports`** — ⚠️ Partial
The `render_ui` tool transport vs `a2ui` fences in markdown, with `generativeUI: true` and `agentIds`. **Try:** "Compare the Starter, Team, and Enterprise plans in a table.". **Pass:** a table component (tool), a table inside the reply (markdown), and plain text under `agentIds: ["shop"]`, since `default` isn't listed. The page never builds a `shop` agent, so none is registered. **Fail:** UI under `agentIds: ["shop"]`, so `agentIds` was ignored.

**`/generative-ui/components/markdown-mode`** — ⚠️ Partial
The agent writes A2UI operations in `a2ui` code blocks in its reply. **Try:** "Give me a seat-count slider that shows the monthly price at $29 per seat.". **Pass:** prose with a live slider card in the middle. **Fail:** raw JSON in a code block. The `sendContext: false` variant shows no UI by design.

**`/generative-ui/components/from-a2ui`** — ⚠️ Partial
The A2UI 1.0 "After" catalog (`Airport`, `Arrow`) on the new engine. **Try:** "Show a flight card from SFO (San Francisco) to JFK (New York) with a Book button.". **Pass:** two Airport components with an Arrow and a Button. **Fail:** a rejection naming a v0.9 shape.

### Shared State

**`/shared-state`** — ❌ Broken
The shared-state overview (Interactivity › Shared state): `useAgent` with `OnStateChanged` reads agent state, and `agent.setState` writes it back. The page has no demo and prints no Agno backend (setup skipped for agno), and none is filled in, so agent `shared-state-read-write` is unregistered. Page code only: the printed `useAgent` / `handlePreferencesChange` fragments and `notes-card.tsx` verbatim, inside minimal labelled glue, plus minimal stand-ins for the imported `Card`/`Button`. Nothing calls `handlePreferencesChange`, because the page prints no preferences UI. **Try:** any prompt. **Expected today:** agent `shared-state-read-write` not found.

**`/shared-state/streaming`** — ❌ Broken (reference only)
State streaming: a tool argument mapped into a state key while it streams. The rendered Agno page says "Not supported on Agno" and prints no Agno code. The route shows the `.md` export's `useAgent` snippet for reference; no demo or agent is filled in. **Pass:** the page renders with the gap callout. There is nothing to run.

**`/shared-state/rendering-in-app`** — ⚠️ Partial
`useAgent()` in a main-view `Canvas` beside a `CopilotSidebar`. Both snippets verbatim, on this repo's default agent; the page has no demo or backend half. **Try:** load the demo. **Pass:** "Project launch" with two items appears as soon as the agent connects. **Fail:** "Untitled" and an empty list.

**`/shared-state/agent-readonly`** — ⚠️ Partial
`useAgentContext` publishing a name, timezone and activity list to the agent, read-only. Frontend verbatim except a simplified layout and default name `Sarah` (published: `Atai`); the agent is the published `main.py` prompt without its tools (its `tools` package is unpublished). **Try:** `What do you know about me from my context?`, then change the name and ask again. **Pass:** the answer names the current values. **Fail:** the agent says it knows nothing about you. Backend-checked: all three values come back.

### App Control

**`/human-in-the-loop/overview`** — ⚠️ Partial
The HITL overview's two demos as tabs. **hitl-in-chat:** `useHumanInTheLoop` registers `book_call`; a picker renders and the pick is the tool result. **gen-ui-interrupt:** the docs' Agno stand-in for `interrupt()` — the same mechanism as `schedule_meeting`, with a repo-authored `generateFallbackSlots`. **Try:** `Please book an intro call with the sales team to discuss pricing.` on each tab. **Pass:** on hitl-in-chat, pick a slot and the agent confirms that time. **Expected failure:** on gen-ui-interrupt, the pick ends in RUN_ERROR `Frontend tool resume requires a database` — the published agent has no `db` and relied on the docs' custom server route, which cannot import on agno 3.x. Both legs backend-checked.

**`/frontend-tools` — Frontend Tools**
Three tools that run in the browser and change this page. **Try:** `Say hello to Malaika`, `Change the theme to violet`, `Bookmark the CopilotKit docs at https://docs.copilotkit.ai`. **Pass:** each panel updates the moment the call completes; the theme change follows you across every route. **Fail:** the agent claims success but nothing changes — the tool names have drifted apart.

**`/human-in-the-loop/governed-actions` — Governed Action Approval**
An approval checkpoint in front of a side-effecting action, showing the policy verdict and the exact arguments before anything runs. **Try:** `Send an invoice reminder to acme@example.com. Ask me to approve it first.` **Pass:** a card renders with the verdict and the JSON arguments, and the run holds until Approve or Reject. **Fail:** the agent reports the reminder sent with no card.

**`/human-in-the-loop`** _(live but absent from the sidebar)_
**Try:** `Can you show me two good options for a restaurant name?` **Pass:** two buttons render in the message stream and **nothing further streams until you click one**. **Fail:** two options as plain text, or the agent continues without waiting.

**`/webmcp`** — 🚧 **Tracked, not implemented.** The doc adds a `webmcp` flag to a frontend tool so browser agents can discover it. Its own test procedure needs Chrome 149+ with the WebMCP origin trial (or `chrome://flags/#enable-webmcp-testing`) and Chrome's Model Context Tool Inspector; CopilotKit no-ops where `document.modelContext` is absent, so a demo here would register nothing and still look green.

### Multi-Agent

**`/multi-agent/subagents`** — ⚠️ Partial
A supervisor whose tools are research, writing and critique Agno agents; all four use the current Code tab's `gpt-6-luna` model configuration. A delegation log renders `delegations` from shared state. Agent and frontend verbatim. **Try:** `Write a short blog post about why cats purr.` **Pass:** three inline activity cards in order, then the log fills with three entries **at the end of the run**. **Fail:** the log stays empty after the run. It never shows a `running` entry: the stock router's per-tool state deltas need `jsonpatch` (`agno[agui]`), which the Quickstart's install line leaves out. Backend-checked: the final snapshot carries all three, `completed`.

### Backend

**`/backend/copilot-runtime`**
Live agent routing between two ids (`default` and `agno_agent`) that resolve to the same process. **Pass:** both stream, and each id keeps its own conversation. **Fail:** one errors with agent-not-found.

**`/backend/ag-ui`**
A live capture of the raw AG-UI event stream, with pause and clear. **Try:** `What's the weather in Tokyo?` **Pass:** `RUN_STARTED` → `TEXT_MESSAGE_CONTENT` burst → `TOOL_CALL_START`/`END` → `TOOL_CALL_RESULT` → `RUN_FINISHED`. **Fail:** the log stays empty while the chat streams.

### Troubleshooting

**`/troubleshooting/error-debugging`** — A **live error log** fed by the provider-level `onError`. **Try:** stop the Agno process, send a message. **Pass:** an entry appears with an `agent_run_failed`-style code. **Fail:** silent failure with nothing logged.

**`/status`** — Every route and its status in one table.

### Intelligence

**`/intelligence/memories`** — ❌ **Broken as documented.** New upstream 2026-09-11. **Try:** `Please remember that I prefer concise status updates.`, then **Save**, then switch to the second runtime and **Save** again. **What happens:** on the documented runtime the list reads "Memory is not available for this runtime." and the save 404s — at this repo's runtime, not the platform, because memory routes are off unless the runtime is built with `memory: { access }`, which the page never mentions. On the second runtime (the same one plus that option) the platform answers `403 MEMORY_NOT_ENTITLED`, the hook reports `isAvailable: true`, and the page's `MemoryList` renders an empty list. The page's React snippet itself does not compile — see [FINDINGS.md](FINDINGS.md) #16.

**`/learning`** — ⚠️ **Partial.** New upstream 2026-09-11. The page's Thread-assignment runtime snippet is mounted on its own route at `/api/copilotkit-learning`. **Try:** on `expense-agent`, `Review this expense: $42 team lunch, receipt attached.`; then on `default`, `Say hello in five words.` **What happens:** `expense-agent` never answers — its Thread is assigned to the page's example container `expense-review`, which does not exist in this project, and the run fails with "Failed to initialize thread" while the chat shows nothing. `default` answers. The page now also documents browser Trajectory assignment, CLI container management, and experimental server APIs for runs and Skill reviews; those flows are not exercised here. See [FINDINGS.md](FINDINGS.md) #17.

**`/intelligence/learned-skills`** — ❌ **Broken for Agno.** The route keeps the page's two BuiltInAgent examples as unimported references; their model IDs now match upstream (`gpt-6-luna`). **Try:** `Please follow the refund policy for a refund.` **Expected failure:** the Agno agent answers without either skill tool because the page provides no Agno adapter, and using BuiltInAgent would replace this backend agent.

### Cookbook

**`/cookbook/jev-generative-ui` — Jev: fast generative UI.** ⚠️ **Partial**, and deliberately so. New upstream, tracked 2026-09-21. The recipe has two halves and only one can exist here. **What runs:** the published `lib/workspaces.ts` schemas and the published `app/page.tsx` picker — its form, its panel markup and its two button message formats — all verbatim. **What cannot:** the Jev decision. `lib/choose-panel.ts` needs `@typesafe-ai/sdk` (absent) and a `TYPESAFE_API_KEY` from TypeSafe, a third-party vendor; `lib/picker-agent.ts` needs that plus `@langchain/openai` (absent). Both ship verbatim, imported by nothing, with the unresolvable imports acknowledged in place. **Try:** press **Show the clarification panel**, then **Show the comparison panel**. **Pass:** the published panel markup draws both prepared controls out of `PanelSchema.parse`, the probe row reads `isReady: false` for `useAgent({ agentId: "picker" })`, and pressing **Find options** does nothing — the published `send` returns early on `!isReady`. **Fail:** any panel that claims a Jev decision was made, or a picker that answers a typed request. Nothing here can produce either, and if it did, something would be standing in for the vendor. See [FINDINGS.md](FINDINGS.md) #27.

---

## 8. Testing checklist / current status

Verified 2026-08-05 against a live stack (real OpenAI key, no license key, no MCP server). Doc snapshot synced 2026-08-30; `/frontend-tools` and `/generative-ui/your-components/display-only` re-recorded 2026-08-31 after the session-storage fix (#12).

| Doc page                                           | Route                                         | Status         | Notes                                                                                  |
| -------------------------------------------------- | --------------------------------------------- | -------------- | -------------------------------------------------------------------------------------- |
| `/agno`                                            | `/`                                           | ✅ Working     | Server-side agent probe.                                                               |
| `/agno/quickstart`                                 | `/quickstart`                                 | ✅ Working     | Last verified end-to-end with gpt-4o; the backend now defaults to the doc's gpt-6-luna. |
| `/agno/prebuilt-components`                        | `/prebuilt-components`                        | ✅ Working     | All three components. Doc page itself is a component stub (142 bytes of raw markdown). |
| `/agno/threads`                                    | `/threads`                                    | ⚠️ Partial     | Premium.                                                                               |
| `/agno/prebuilt-components/copilot-threads-drawer` | `/threads/drawer`                             | ⚠️ Partial     | Premium; renders the locked view without Intelligence access. Custom and controlled new-conversation flows plus shared `agno_agent` selection are implemented. |
| `/agno/headless-threads`                           | `/threads/headless`                           | ⚠️ Partial     | Premium; `useThreads` returns empty. UI incl. rename fully implemented.                |
| `/agno/threads-lifecycle`                          | `/threads/lifecycle`                          | ⚠️ Partial     | Mint, remount, replay, switch, pin all observed; `existingId` undefined — [FINDINGS.md](FINDINGS.md) #28.      |
| `/agno/threads-import`                             | `/threads/import`                             | 📖 Reference   | Premium; supports ADK, LangGraph, Mastra, and AWS Strands; Agno is not a documented import source. |
| `/agno/intelligence/threads-explained`             | `/threads/architecture`                       | 📖 Reference   | Premium.                                                                               |
| `/agno/programmatic-control`                       | `/custom-look-and-feel/programmatic-control`  | ✅ Working     | run/stop/state/messages.                                                               |
| `/agno/inspector`                                  | `/custom-look-and-feel/inspector`             | ✅ Working     | Dev-only by design.                                                                    |
| `/agno/custom-look-and-feel/slots`                 | `/custom-look-and-feel/slots`                 | ⚠️ Partial     | The page documents `workSummary` and grouped tool calls; installed package lacks exports used by the published grouping example — [FINDINGS.md](FINDINGS.md) #40. |
| `/agno/custom-look-and-feel/headless-ui`           | `/custom-look-and-feel/headless-ui`           | ✅ Working     | **Not in the doc sidebar**; resolves.                                                  |
| `/agno/custom-look-and-feel/markdown`              | `/custom-look-and-feel/markdown`              | ✅ Working     | New upstream, tracked 2026-09-21. All three snippets verbatim and all three typecheck; the bare-component slot that [FINDINGS.md](FINDINGS.md) #3 rules out elsewhere is accepted here — [FINDINGS.md](FINDINGS.md) #26. |
| `/agno/generative-ui/components` | `/generative-ui/components` | ⚠️ Partial | New 2026-11-10. Page runtime is a TanStack `BuiltInAgent` (shown, not run); served by a repo-authored Agno `genui` agent at `/genui`. Needs @copilotkit 1.85 (bumped here). Typecheck only. |
| `/agno/generative-ui/components/surfaces` | `/generative-ui/components/surfaces` | ⚠️ Partial | New 2026-11-10. Ported from CPK-LangGraph-TS; Product/ProductRow scaffolding; no products tool, so the model invents products. Typecheck only. |
| `/agno/generative-ui/components/catalogs` | `/generative-ui/components/catalogs` | ⚠️ Partial | New 2026-11-10. Ported from CPK-LangGraph-TS; Hero/Panel/cartUI scaffolding; `valibot` added for the schema-library sample. Typecheck only. |
| `/agno/generative-ui/components/standard-catalog` | `/generative-ui/components/standard-catalog` | ⚠️ Partial | New 2026-11-10. Ported from CPK-LangGraph-TS; ProductCard/productSchema scaffolding; `maplibre-gl` added as the page says. Typecheck only. |
| `/agno/generative-ui/components/state-and-actions` | `/generative-ui/components/state-and-actions` | ⚠️ Partial | New 2026-11-10. Ported from CPK-LangGraph-TS; cart scaffolding around the fragment snippets. Typecheck only. |
| `/agno/generative-ui/components/theming` | `/generative-ui/components/theming` | ⚠️ Partial | New 2026-11-10. Ported from CPK-LangGraph-TS; the page's placeholder mapStyle URLs draw no basemap. Typecheck only. |
| `/agno/generative-ui/components/transports` | `/generative-ui/components/transports` | ⚠️ Partial | New 2026-11-10. Ported from CPK-LangGraph-TS; the runtime's undefined `agent` is the Agno `genui` agent; the `shop` agent in `agentIds` isn't printed, so it isn't registered. Typecheck only. |
| `/agno/generative-ui/components/markdown-mode` | `/generative-ui/components/markdown-mode` | ⚠️ Partial | New 2026-11-10. Ported from CPK-LangGraph-TS; `sendContext: false` renders no UI (its only backend is Python reading `forwarded_props`, which the stock Agno router doesn't pass on). Typecheck only. |
| `/agno/generative-ui/components/from-a2ui` | `/generative-ui/components/from-a2ui` | ⚠️ Partial | New 2026-11-10. Ported from CPK-LangGraph-TS; Airport/Arrow scaffolding. Typecheck only. Nav entry restored 2026-11-13 (lost in the #22 merge). The 1.0 a2ui-renderer snippets are text only: 1.85.0 lacks `basicCatalogV1`/`DynamicStringSchemaV1` (FINDINGS #41). |
| `/agno/generative-ui/tool-based`                   | `/generative-ui/tool-based`                   | ❌ Broken      | New 2026-11-10. Page code only. `SYSTEM_PROMPT` undefined on the page → `chart_agent.py` NameError, agent not mounted; no pie-chart stub; model `gpt-6-luna`. Chart files are labelled stand-ins; `suggestions.ts` not printed (call commented out). |
| `/agno/generative-ui/state-rendering`              | `/generative-ui/state-rendering`              | ❌ Broken      | New 2026-11-10. Rendered page: "Not supported on Agno", no Agno code printed. Reference-only (the `.md` `useAgent` snippet); no demo, no agent. |
| `/agno/generative-ui/your-components/display-only` | `/generative-ui/your-components/display-only` | ✅ Working     | `useComponent`; needs no backend declaration. Same resume failure as frontend-tools until `db` was configured (#12); re-recorded clean.            |
| `/agno/generative-ui/your-components/interactive`  | `/generative-ui/your-components/interactive`  | 🚧 Not started | Upstream doc page is still a stub; its only content is the 30 Aug session-storage callout (#12), which this route mirrors.            |
| `/agno/generative-ui/tool-rendering`               | `/generative-ui/tool-rendering`               | ✅ Working     | Named + wildcard renderers; tool call verified over the wire.                          |
| `/agno/generative-ui/frontend-cards`               | `/generative-ui/frontend-cards`               | ✅ Working     | New 2026-09-11. Card renders; run payload carries no `activity`. A card added before the runtime connects is silently lost — [FINDINGS.md](FINDINGS.md) #15. |
| `/agno/generative-ui/a2ui`                         | `/generative-ui/a2ui`                         | 📖 Reference   | New 2026-11-10. Overview, no demo; snippets type-checked verbatim (`myAgent`, `children` undefined). |
| `/agno/generative-ui/a2ui/dynamic-schema`          | `/generative-ui/a2ui/dynamic-schema`          | ⚠️ Partial     | New 2026-10-07. Code-tab frontend verbatim; published agent needs an unpublished `tools` package, so prompt-only agent + auto-inject runtime. Backend-checked; not browser-checked. |
| `/agno/generative-ui/a2ui/fixed-schema`            | `/generative-ui/a2ui/fixed-schema`            | ⚠️ Partial     | New 2026-10-07. All Code-tab code verbatim; page's own backend snippets are skipped for Agno. Backend-checked; not browser-checked. |
| `/agno/generative-ui/mcp-apps`                     | `/generative-ui/mcp-apps`                     | 🚧 Not started | New 2026-10-07. Runtime examples use `BuiltInAgent` with built-in or optional MCP middleware; no Agno integration code or embedded demo. Tracked for drift. |
| `/agno/generative-ui/open-generative-ui`           | `/generative-ui/open-generative-ui`           | ⚠️ Partial     | New 2026-10-07. Route + both frontends verbatim; agent unpublished, repo-authored. Unverified: answered in prose to a stand-in tool outside the runtime. |
| `/agno/shared-state`                               | `/shared-state`                               | ❌ Broken      | New 2026-11-10. No demo or Agno backend on the page, none filled in. Printed fragments and `notes-card.tsx` verbatim in minimal glue; Card/Button stand-ins. |
| `/agno/shared-state/streaming`                     | `/shared-state/streaming`                     | ❌ Broken      | New 2026-11-10. Page: "Not supported on Agno", no Agno code printed. Reference only. |
| `/agno/shared-state/rendering-in-app`              | `/shared-state/rendering-in-app`              | ⚠️ Partial     | New 2026-10-07. Both snippets verbatim on the default agent; page has no backend half. Not browser-checked. |
| `/agno/shared-state/agent-readonly`                | `/shared-state/agent-readonly`                | ⚠️ Partial     | New 2026-10-07. Frontend verbatim; `main.py` prompt without its unpublished tools. Backend-checked: context read back. |
| `/agno/human-in-the-loop/index`                    | `/human-in-the-loop/overview`                 | ⚠️ Partial     | New 2026-10-07. hitl-in-chat pauses and resumes (backend-checked). gen-ui-interrupt fails to resume: “Frontend tool resume requires a database”. |
| `/agno/multi-agent/subagents`                      | `/multi-agent/subagents`                      | ⚠️ Partial     | Model config synced to the current Code tab. Delegations still arrive only in the end-of-run snapshot (no `jsonpatch`), so nothing is ever seen `running`. |
| `/agno/frontend-tools`                             | `/frontend-tools`                             | ✅ Working     | Was dying at the resume with "requires a database"; fixed by configuring `db` (#12) and re-recorded clean.            |
| `/agno/human-in-the-loop/governed-actions`         | `/human-in-the-loop/governed-actions`         | ✅ Working     | Approval card with the policy verdict. Its `z.record` call had to be translated for zod 4 — see [FINDINGS.md](FINDINGS.md) #14.            |
| `/agno/human-in-the-loop`                          | `/human-in-the-loop`                          | ✅ Working     | **Not in the doc sidebar**; linked from Quickstart and resolves. Covered by the shared `db` (#12).            |
| `/agno/webmcp`                                     | `/webmcp`                                     | 🚧 Not started | Tracked for drift. Needs Chrome 149+ and the WebMCP origin trial.                       |
| `/agno/copilot-runtime`                            | `/backend/copilot-runtime`                    | ✅ Working     | Two agent ids verified via the runtime's `info` method.                                |
| `/agno/ag-ui`                                      | `/backend/ag-ui`                              | ✅ Working     | Live event panel.                                                                      |
| `/agno/troubleshooting/error-debugging`            | `/troubleshooting/error-debugging`            | ✅ Working     | Live error log.                                                                        |
| `/agno/intelligence/memories`                     | `/intelligence/memories`                     | ❌ Broken      | New 2026-09-11. Import path wrong; routes 404 without an undocumented runtime option; unentitled shows as an empty list — [FINDINGS.md](FINDINGS.md) #16. |
| `/agno/learning`                                  | `/learning`                                  | ⚠️ Partial     | Thread assignment only; the updated browser Trajectory callback and experimental server management APIs are not exercised. A missing container makes the assigned agent fail silently — [FINDINGS.md](FINDINGS.md) #17. |
| `/agno/intelligence/learned-skills`               | `/intelligence/learned-skills`               | ❌ Broken      | Agno is absent from the adapter table; the BuiltInAgent examples replace the Agno agent. Their model IDs now match upstream (`gpt-6-luna`). |
| `/agno/cookbook/jev-generative-ui`                 | `/cookbook/jev-generative-ui`                 | ⚠️ Partial     | New upstream, tracked 2026-09-21. Prepared controls and schemas run verbatim; the Jev decision layer needs an uninstalled vendor SDK and a TypeSafe key — [FINDINGS.md](FINDINGS.md) #27. |

**Legend:** ✅ Working · ⚠️ Partial (blocked by something outside this repo) · 📖 Reference (intentionally not a live feature) · ❌ Broken · 🚧 Not started

Not implemented as routes: `/agno/(other)/telemetry` (a config note, covered by `COPILOTKIT_TELEMETRY_DISABLED` in `.env.example`).

**Tracked without a demo.** `/agno/webmcp` carries a route, a nav entry and a snapshot so drift is watched, but nothing is implemented behind it and the recorder does not touch it. The reason is on the route’s page and in §7. The rest of `/agno/intelligence/` (including `/agno/intelligence/quickstart`, whose route was removed on 2026-09-17) is the old `/agno/premium/` set under a new prefix and stays in `doc-snapshot/manifest.json`’s `knownUnmapped` list.

---

## 9. Known issues / doc-vs-implementation discrepancies

Moved to [FINDINGS.md](FINDINGS.md).

## 10. Troubleshooting

| Symptom                                                | Cause                                                                                 | Fix                                                                                                                                                                                                     |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chat sends, nothing streams back                       | Agno process down, or `AGNO_AGENT_URL` wrong                                          | Check the home page connection panel; run `uv run main.py`.                                                                                                                                             |
| A run starts, then hangs forever                       | The agent called a browser tool with no registered handler, so no result ever returns | Every `external_execution=True` tool in `backend/tools/frontend_tools.py` needs a matching `useFrontendTool`/`useHumanInTheLoop`. This repo registers all four at the app root for exactly this reason. |
| Tool runs but custom UI doesn't render                 | Renderer name ≠ tool name                                                             | `useRenderTool({ name })` must equal the Python function name exactly, including case. That's why the Python frontend tools are camelCase.                                                              |
| Connection errors mentioning `localhost`               | DNS resolving to IPv6 while the server binds IPv4                                     | Use `127.0.0.1` in `AGNO_AGENT_URL`.                                                                                                                                                                    |
| Thread list empty, drawer shows a lock                 | The Runtime reports no active entitlement                                             | Expected — not a bug. Set `CPK_INTELLIGENCE_API_KEY` (managed), or `COPILOTKIT_LICENSE_TOKEN` if self-hosted. It is server-side config, not a provider prop.                                             |
| Backend exits: `Form data requires "python-multipart"` | Missing transitive dep                                                                | `uv add python-multipart` (already in this repo).                                                                                                                                                       |
| Backend exits: `OPENAI_API_KEY is not set`             | No key                                                                                | Copy `.env.example` → `backend/.env`. Failing fast is intentional.                                                                                                                                      |
| Inspector never appears                                | Production build                                                                      | It is disabled unconditionally in production. Use `npm run dev`.                                                                                                                                        |

---

## Doc drift detection

`/doc-sync` keeps this repo honest about the docs it mirrors. Press **Sync docs now** (on the landing page or on `/doc-sync`) and it fetches the markdown source behind all 29 tracked doc pages, diffs each against the copy stored in `doc-snapshot/`, replaces that copy, and reports what moved — ranked by whether the change can actually break an implementation.

Doc pages are fetched by appending `.md` to their URL, which returns the authored MDX rather than 250 KB of rendered HTML. Every response is checked for `text/markdown` before it is allowed near the snapshot: a URL that misses the markdown handler still answers `200` with the HTML app shell, and writing that in would destroy the baseline and report the whole corpus as rewritten on the next run. A run commits all pages or none.

**Severity is decided by where the edit landed**, not how big it was:

| Level      | Trigger                                                                                                                |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| **High**   | a changed line inside a fenced code block, a changed fence count, or a page that now 404s and is gone from the sitemap |
| **Medium** | a changed heading, changed frontmatter `title`/`description`, or prose in the same section as changed code             |
| **Low**    | other prose                                                                                                            |

**Sections checked** lists every tracked page in nav order with a mark — `✓` unchanged, `!` changed, `+` stored, `✗` 404, `~` unstable, `·` not checked. Expanding a row shows the comparison: for a changed page the diff (`−` existing snapshot, `+` newly fetched), and for an unchanged one the two matching hashes, which is the evidence the check ran.

**`doc-snapshot/CHANGELOG.md`** is the record that survives a re-sync. Because syncing replaces the copy it just compared against, the run _after_ a change reports nothing — so the changelog is written at the moment of discovery and never rewritten later. Only changed pages are recorded; a clean run does not touch the file. It keeps the three most recent dated entries, counted rather than aged, so a change from six weeks ago still shows if nothing has happened since.

**One sync date.** `syncedAt` in `doc-snapshot/manifest.json`, rewritten on every run and shown on `/`, `/status` and `/doc-sync`. There is no hand-maintained date to keep in step with it.

**To test it**, edit any `doc-snapshot/pages/*.md` file and press the button — a line inside a code fence for High, a `##` heading for Medium, a sentence for Low. The comparison reads the stored file itself, so nothing else needs changing. Both `/doc-sync` and the changelog label the result as a local snapshot edit rather than upstream drift.

Commit `doc-snapshot/` — `pages/`, `manifest.json` and `CHANGELOG.md` are the baseline every diff is taken against. `reports/` is gitignored derived data.

---

## 11. Project structure

```
agno/
├── CLAUDE.md                  # build instructions this repo was produced from
├── README.md
├── .env.example               # every variable, with what it does
├── .gitignore
│
├── autorecorder/              # screen-recording suite — one demo video per doc page
│   ├── ADAPT.md               # the porting contract; read before editing
│   ├── cli.ts
│   ├── config/                # ★ the only framework-specific files
│   ├── actions/               # ★ what to do on each demo page
│   ├── core/                  # frozen — shared across framework repos
│   └── videos/                # output; gitignored
│
├── frontend/                  # Next.js 16 app — also hosts the Copilot Runtime
│   ├── AGENTS.md              # auto-generated by next dev; points at bundled docs
│   └── src/
│       ├── app/
│       │   ├── layout.tsx             # providers + chrome; imports v2 styles
│       │   ├── page.tsx               # / — intro + connection check
│       │   ├── status/page.tsx        # status overview table
│       │   ├── api/copilotkit/[[...slug]]/route.ts # ★ CopilotRuntime + AgnoAgent binding (+ doc demo agent ids)
│       │   ├── api/copilotkit-{declarative-gen-ui,a2ui-fixed-schema,ogui}/route.ts # Code-tab runtime routes
│       │   └── <doc route>/
│       │       ├── page.tsx           # notes + exact source (server component)
│       │       ├── _demo/<demo-id>/   # Code-tab demo files, byte-exact (private folder, not a route)
│       │       └── demo-chat/page.tsx # ★ the running feature, chrome-free
│       ├── components/
│       │   ├── providers.tsx          # ★ CopilotKitProvider, onError → error log
│       │   ├── global-frontend-tools.tsx  # ★ all 4 browser-executed tools
│       │   ├── harness-state.tsx      # accent/greeting/bookmarks/error log
│       │   ├── app-chrome.tsx         # sidebar layout, skipped on /demo-chat
│       │   ├── demo-frame.tsx         # thin bar + back link for demo routes
│       │   ├── source-code.tsx        # ★ renders a repo file verbatim
│       │   ├── nav-sidebar.tsx        # nav built from nav-config
│       │   ├── route-header.tsx       # title + status badge + doc + demo link
│       │   ├── backend-health.tsx     # server component; probes the agent
│       │   └── ui.tsx                 # Panel, Callout, CodeBlock, TryIt
│       └── lib/
│           ├── nav-config.ts          # ★ single source of truth: routes, docs, status
│           ├── inspector.ts           # routes whose nested <CopilotKit> owns the Inspector
│           ├── source.ts              # ★ server-only reader behind SourceCode
│           └── health.ts              # server-only agent probe
│
└── backend/                   # Python agent — Agno AgentOS over AG-UI
    ├── pyproject.toml
    ├── main.py                # ★ AgentOS + AGUI interfaces → POST /agui (+ demo prefixes) on :8010
    ├── agent.py               # model, instructions, tool registration
    ├── agents/                # doc demo agents from the Code tabs, one AGUI prefix each
    │   ├── a2ui_fixed_agent.py, a2ui_schemas/, interrupt_agent.py, subagents.py  # verbatim
    │   ├── a2ui_dynamic_agent.py, main.py   # published prompt, unpublished tools removed
    │   └── open_gen_ui_agent.py             # ⚠ repo-authored (module never published)
    ├── docs_verbatim/         # published files that cannot run here — byte-exact, never imported
    └── tools/
        ├── backend_tools.py   # executed server-side (get_weather, …)
        └── frontend_tools.py  # external_execution=True — executed in the browser
```

The nav, every route header, the demo links, and the status table above all derive from `frontend/src/lib/nav-config.ts`, so a route's status is stated once.

### Autorecorder

`autorecorder/` produces one demo video per doc page: it opens the live doc page
and scrolls it, switches to a simulated VS Code showing **this repo's own source**
for that feature, then switches to the browser and drives the real demo route.
It is a portable folder shared across CopilotKit framework repos and is adapted
here for Agno — `autorecorder/config/` and `autorecorder/actions/` hold everything
Agno-specific; `autorecorder/core/` is shared and must not be edited.

Both services must be running first, because a video of a dead page is worse than
no video — the recorder refuses to start otherwise.

```bash
cd autorecorder
npm install && npx playwright install chromium

npm run doctor            # static: config, files, line ranges, handlers
npm run doctor:online     # also probes every demo route, doc URL, and selector
npm run record -- --list  # what will be recorded
npm run record            # all 18, in nav order
npm run manifest          # record what was produced — run this after every recording
```

Output lands in `autorecorder/videos/` as `AGNO-react-<NN>-<Name>.webm`, numbered
in nav order. **The clips are gitignored on purpose** (by `autorecorder/videos/.gitignore`)
— recordings are build output, reproducible from the folder, and committing them
bloats history badly. Publish them as release assets instead.

`npm run doctor` exiting 0 is the definition of a working configuration; it is
what catches an IDE line range that drifted after someone edited a demo page.

**Tracking which clips are current.** Since the videos are not versioned and each
run overwrites the same filenames, `npm run manifest` writes
`autorecorder/videos/manifest.json` and `MANIFEST.md` — ~12KB of committed text
recording, per clip, when it was made and whether the source it demonstrates has
changed since. Those two files are the QA record for the recordings, the way the
table in §8 is for the routes: commit them, and the diff shows what each run
changed. `npm run manifest:check` exits 1 if any clip is stale or missing. Note it
tracks freshness, not correctness — a failed run still writes a video.

**Only the 16 routes with a `demo-chat` page are recorded.** The five reference
routes — `/`, `/threads`, `/threads/import`, `/threads/architecture`, and
`/generative-ui/your-components/interactive` — have nothing to drive, and the
recorder has no way to register a page without a demo URL. See
[`autorecorder/README.md`](autorecorder/README.md#scope-in-this-repo).

Two cold-start effects, one handled and one not. The **frontend** kind is
absorbed: a dev server compiles page chunks lazily and API routes on first
request, so the recorder waits for the demo route to settle and warms
`/api/copilotkit` before typing anything — without that, a prompt goes into an
input nothing is wired to yet. The **agent** kind is not: the first model call
after starting the backend can take ~60s, longer than the recorder's 30s response
window, so it fails that page. Send one message in the app by hand — or record a
single page first — before running the full suite.

---

## 12. References

**Getting Started** — [Introduction](https://docs.copilotkit.ai/agno) · [Quickstart](https://docs.copilotkit.ai/agno/quickstart)

**Basics** — [Prebuilt Components](https://docs.copilotkit.ai/agno/prebuilt-components)

**Rich Threads** — [Overview](https://docs.copilotkit.ai/agno/threads) · [Threads Drawer](https://docs.copilotkit.ai/agno/prebuilt-components/copilot-threads-drawer) · [Headless Threads](https://docs.copilotkit.ai/agno/headless-threads) · [Thread & History Lifecycle](https://docs.copilotkit.ai/agno/threads-lifecycle) · [Synchronize Thread History](https://docs.copilotkit.ai/agno/threads-import) · [Threads & Persistence Architecture](https://docs.copilotkit.ai/agno/intelligence/threads-explained)

**Custom Look and Feel** — [Programmatic Control](https://docs.copilotkit.ai/agno/programmatic-control) · [Inspector](https://docs.copilotkit.ai/agno/inspector) · [Slots](https://docs.copilotkit.ai/agno/custom-look-and-feel/slots) · [Headless UI](https://docs.copilotkit.ai/agno/custom-look-and-feel/headless-ui) † · [Markdown Rendering](https://docs.copilotkit.ai/agno/custom-look-and-feel/markdown)

**Generative UI** — [Your Components · Display-only](https://docs.copilotkit.ai/agno/generative-ui/your-components/display-only) · [Your Components · Interactive](https://docs.copilotkit.ai/agno/generative-ui/your-components/interactive) † · [Tool Rendering](https://docs.copilotkit.ai/agno/generative-ui/tool-rendering) · [A2UI](https://docs.copilotkit.ai/agno/generative-ui/a2ui) · [A2UI · Dynamic Schema](https://docs.copilotkit.ai/agno/generative-ui/a2ui/dynamic-schema) · [A2UI · Fixed Schema](https://docs.copilotkit.ai/agno/generative-ui/a2ui/fixed-schema) · [MCP Apps](https://docs.copilotkit.ai/agno/generative-ui/mcp-apps) ‡ · [Open Generative UI](https://docs.copilotkit.ai/agno/generative-ui/open-generative-ui)
**Generative UI** — [Components as Tools](https://docs.copilotkit.ai/agno/generative-ui/tool-based) · [State Rendering](https://docs.copilotkit.ai/agno/generative-ui/state-rendering) · [Your Components · Display-only](https://docs.copilotkit.ai/agno/generative-ui/your-components/display-only) · [Your Components · Interactive](https://docs.copilotkit.ai/agno/generative-ui/your-components/interactive) † · [Tool Rendering](https://docs.copilotkit.ai/agno/generative-ui/tool-rendering) · [A2UI · Dynamic Schema](https://docs.copilotkit.ai/agno/generative-ui/a2ui/dynamic-schema) · [A2UI · Fixed Schema](https://docs.copilotkit.ai/agno/generative-ui/a2ui/fixed-schema) · [MCP Apps](https://docs.copilotkit.ai/agno/generative-ui/mcp-apps) ‡ · [Open Generative UI](https://docs.copilotkit.ai/agno/generative-ui/open-generative-ui)

**Generative UI › Components and surfaces** — [Components and surfaces](https://docs.copilotkit.ai/agno/generative-ui/components) · [Surfaces](https://docs.copilotkit.ai/agno/generative-ui/components/surfaces) · [Catalogs](https://docs.copilotkit.ai/agno/generative-ui/components/catalogs) · [Standard catalog](https://docs.copilotkit.ai/agno/generative-ui/components/standard-catalog) · [State and actions](https://docs.copilotkit.ai/agno/generative-ui/components/state-and-actions) · [Theming](https://docs.copilotkit.ai/agno/generative-ui/components/theming) · [Transports](https://docs.copilotkit.ai/agno/generative-ui/components/transports) · [Markdown mode](https://docs.copilotkit.ai/agno/generative-ui/components/markdown-mode) · [Adopt from A2UI](https://docs.copilotkit.ai/agno/generative-ui/components/from-a2ui)

**Shared State** — [Shared State](https://docs.copilotkit.ai/agno/shared-state) · [State Streaming](https://docs.copilotkit.ai/agno/shared-state/streaming) · [Render state in your app](https://docs.copilotkit.ai/agno/shared-state/rendering-in-app) · [Agent Read-Only Context](https://docs.copilotkit.ai/agno/shared-state/agent-readonly)

**Multi-Agent** — [Sub-agents](https://docs.copilotkit.ai/agno/multi-agent/subagents)

**App Control** — [Frontend Tools](https://docs.copilotkit.ai/agno/frontend-tools) · [HITL Overview](https://docs.copilotkit.ai/agno/human-in-the-loop/index) · [Governed Actions](https://docs.copilotkit.ai/agno/human-in-the-loop/governed-actions) · [Human in the Loop](https://docs.copilotkit.ai/agno/human-in-the-loop) † · [WebMCP](https://docs.copilotkit.ai/agno/webmcp) ‡

**Backend** — [Copilot Runtime](https://docs.copilotkit.ai/agno/copilot-runtime) · [AG-UI](https://docs.copilotkit.ai/agno/ag-ui)

**Troubleshooting** — [Error Debugging & Observability](https://docs.copilotkit.ai/agno/troubleshooting/error-debugging)

**Cookbook** — [Jev: fast generative UI](https://docs.copilotkit.ai/agno/cookbook/jev-generative-ui)

**External** — [Agno docs](https://docs.agno.com) · [AG-UI protocol](https://ag-ui.com) · [AG-UI event types](https://docs.ag-ui.com/concepts/events)

† Resolves but is absent from the doc sidebar as of the sync date.

‡ Tracked for drift only — a route and a snapshot exist, the demo does not.
