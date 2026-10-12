# AG-UI Streams

> Let users reconnect, catch up on missed events, and resume conversations across devices with Intelligence’s AG-UI streams.



<span id="overview" />

Intelligence’s AG-UI streams store and deliver the interaction to your users. Your framework threads manage the agent’s conversation and model context.

Use Threads Drawer for a ready-made conversation list, or build your own with `useThreads`. Pass the selected `threadId` to your chat to load its history and receive new events.

<div
  aria-label="A support workspace using Threads Drawer to move between customer conversations while CopilotChat renders the selected case details."
  className="shell-docs-radius-surface relative mb-4 overflow-hidden border border-[var(--border)] bg-[var(--bg-surface)] shadow-[0px_16px_24px_-8px_rgba(1,5,7,0.12)] ring-1 ring-inset ring-white/70 dark:shadow-[0px_16px_32px_-10px_rgba(0,0,0,0.45)] dark:ring-white/10"
>
  <img
    src="/images/threads/support-desk-threads.png"
    alt="A support desk application with a Threads Drawer listing customer conversations beside CopilotChat case details for Northstar Analytics"
    className="block w-full !my-0"
  />
</div>

<Accordions>
  <Accordion title="Starting fresh?">
    Intelligence stores your conversation history and restores messages, generative UI, tool interactions, and multimodal inputs when users return.
  </Accordion>
  <Accordion title="Already using LangGraph or ADK persistence?">
    Keep it. Your framework stores agent context and execution state; Intelligence adds AG-UI event history, reconnection, and delivery to your users.
  </Accordion>
</Accordions>

## Start with your coding agent

Copy this prompt into your coding agent to inspect your existing CopilotKit app and configure AG-UI Streams with CopilotKit Intelligence. Prefer to work through the setup yourself? Follow the manual steps below.

### Copy this prompt into your coding agent

```text
Set up AG-UI streams, formerly known as Rich Threads, while keeping my framework threads and existing SDK APIs. Help me set this up in my CopilotKit app. Run this command and follow the instructions:

npx --yes copilotkit@latest onboard start --intent add-rich-threads

If it requires a CopilotKit CLI session check, you have permission to run it. Never reveal credentials.
```

<span id="set-up-rich-threads-manually" />

## Set up AG-UI Streams manually

Create a new CopilotKit app connected to cloud-hosted CopilotKit Intelligence. Your application and CopilotKit Runtime run locally while CopilotKit Intelligence records AG-UI events and delivers them to connected clients. If you already have a working app, follow the [Intelligence quickstart](/agno/intelligence/quickstart#set-it-up-manually) to connect it instead.

<Steps>
  <Step>
    ### Create your app

    Run the interactive starter command:

    <DocsTrackedCopy surface="docs_threads_managed_setup">

    ```bash title="Terminal"
    npx copilotkit@latest init
    ```

    </DocsTrackedCopy>
  </Step>

  <Step>
    ### Connect CopilotKit Intelligence

    Complete browser sign-in, then create or select a CopilotKit Intelligence project when the CLI asks.
  </Step>

  <Step>
    ### Start your app and Runtime

    Start the generated application and Runtime with the command printed by the CLI. For the standard npm setup:

    ```bash title="Terminal"
    cd <project-directory>
    npm run dev
    ```
  </Step>

  <Step>
    ### Verify your first thread

    Use the included Threads Drawer to create a conversation. Reload the page or reopen the conversation and confirm that its complete history returns.
  </Step>

  <Step>
    ### See it in Inspector

    Open Inspector on localhost and inspect your conversation under the **Rich Threads** pane.
Real threads appear when Intelligence is on. Enable Intelligence appears when it is off.
Open a real thread and use **Try from here** to copy it into a Playground scratch session. The stored thread does not change.

More detail: [Inspector](/agno/inspector).

  </Step>
</Steps>

Threads-capable CLI starters already include [Threads Drawer](/agno/prebuilt-components/copilot-threads-drawer). Use its guide when you are ready to customize the drawer. Choose [Headless Threads](/agno/headless-threads) later if your product needs a fully custom thread UI.

### Production self-hosting: Run CopilotKit Intelligence in your own infrastructure

Production self-hosting keeps AG-UI Streams, durable event history, identity, storage, and operations inside your network, giving your organization control over data residency, security, and infrastructure. CopilotKit Engineering helps your team deploy CopilotKit Intelligence in your Kubernetes environment. <DocsTrackedLink href="https://copilotkit.ai/talk-to-an-engineer" surface="docs_threads_self_hosting_contact">Book time with a CopilotKit engineer</DocsTrackedLink> to get started.

<span id="why-use-copilotkit-rich-threads" />

## Why use CopilotKit AG-UI Streams?

Intelligence’s AG-UI streams add delivery capabilities around your existing agent and framework threads:

- **Reconnect and catch up.** Reopen a conversation to replay recorded events and reconnect to an active run.
- **Continue in the background.** An agent run can continue after the browser disconnects while your Runtime and agent remain running. This is not execution recovery after a server failure.
- **Deliver across devices.** Users can reopen the same conversation on another device. Intelligence synchronizes thread metadata for connected clients; your application supplies a stable user identity.
- **Separate user history from model context.** Intelligence records the AG-UI events delivered through it. Your framework’s model-context compaction and Intelligence’s event replay serve different purposes.
- **Restore the interactive conversation.** Replay includes supported messages, generative UI, tool interactions, state, and multimodal inputs.

These are capabilities of CopilotKit Intelligence, not guarantees provided by the AG-UI protocol alone. Reopening or switching back to a conversation triggers replay and reconnection; see [connection behavior](/agno/intelligence/threads-explained#websocket-disconnection).

<span id="how-threads-work" />

## How AG-UI Streams work

Both UI paths use Intelligence’s AG-UI streams. A stable `threadId` connects the visible conversation to the runtime and its durable event history.

<Image
  src="/images/threads/threads-diagram-light.png"
  alt="A user starts a conversation on a laptop, leaves or switches devices, and returns to the same conversation on a phone."
  width={1774}
  height={919}
  className="block dark:hidden my-6 w-full mx-auto"
/>
<Image
  src="/images/threads/threads-diagram-dark.png"
  alt="A user starts a conversation on a laptop, leaves or switches devices, and returns to the same conversation on a phone."
  width={1775}
  height={918}
  className="hidden dark:block my-6 w-full mx-auto"
/>

1. Your UI opens a conversation with a stable `threadId`.
2. `CopilotRuntime` runs your agent and sends conversation events to CopilotKit Intelligence.
3. When users return, CopilotKit Intelligence replays the stored history, reconnects any live run, and synchronizes thread metadata.

<Callout type="info" title="How are threads scoped to each user?">
  Your application authenticates its users, and `CopilotRuntime` resolves that
  verified identity on the server with `identifyUser`. CopilotKit Intelligence
  uses the stable user ID to scope thread lists and lifecycle actions. See
  [Scope AG-UI Streams to the signed-in user](/agno/threads-lifecycle#scope-rich-threads-to-the-signed-in-user)
  for the Runtime contract and an implementation pattern.
</Callout>

### What CopilotKit handles

| CopilotKit handles | You control |
|---|---|
| Durable event storage and replay | Your agent's behavior and tools |
| Replay-to-live stream reconnection | The conversation experience and layout |
| Realtime thread metadata synchronization | Which thread actions your users can access |
| Naming, pagination, archive, and delete semantics | Application authorization and permissions |
| Runtime-to-platform event plumbing and thread locks | Mapping to native framework sessions when needed |
| Cloud-hosted or self-hosted platform infrastructure | The deployment model that fits your organization |

<Callout type="info" title="Headless means custom UI, not custom infrastructure">
  Threads Drawer and Headless Threads use the same persistence, replay, synchronization, and locking infrastructure. Choose Headless Threads when you want to build the interface yourself, not when you want to rebuild the Threads backend.
</Callout>

## Choose how to build the UI

<CTACards
  columns={2}
  cards={[
    {
      iconKey: "panelLeft",
      title: "Threads Drawer",
      description:
        "Ship a mobile-friendly conversation sidebar with switching, new conversations, archive, delete, and pagination already wired to your chat.",
      href: "/prebuilt-components/copilot-threads-drawer",
    },
    {
      iconKey: "code",
      title: "Headless Threads",
      description:
        "Build a custom layout, workflow, permission model, or thread action UI while CopilotKit continues to handle the backend.",
      href: "/headless-threads",
    },
  ]}
/>

For how Intelligence and framework persistence work together, see [AG-UI Streams & Framework Threads](/agno/intelligence/threads-explained#how-threads-work-with-framework-storage).

<span id="sync-existing-conversations" />

## Add AG-UI Streams to existing threads

Connect your existing CopilotKit app through the [Intelligence quickstart](/agno/intelligence/quickstart) to add AG-UI delivery to future runs while your framework continues managing agent context and persistence. To include earlier conversations too, follow <DocsTrackedLink href="/agno/threads-import" surface="docs_threads_history_sync">Add AG-UI Streams to Existing Threads</DocsTrackedLink> for the optional historical steps supported for ADK and LangGraph.

CopilotKit Threads are separate from native framework session or checkpoint stores. Your backend can keep a stable mapping when the agent framework also needs its own conversation identifier.





## Next steps

<Accordions>
  <Accordion title="Understand the architecture">
    [AG-UI Streams & Framework Threads](/agno/intelligence/threads-explained) covers event replay, live reconnection, synchronization, locking, and lifecycle behavior.
  </Accordion>
  <Accordion title="Use the cloud-hosted deployment">
    [Cloud-hosted CopilotKit Intelligence](/agno/intelligence/managed-intelligence-platform) is where you create the project that stores your app's threads and runtime credentials.
  </Accordion>
  <Accordion title="Plan production self-hosting">
    [Self-host CopilotKit Intelligence](/agno/intelligence/self-hosting) with CopilotKit Engineering to run the Threads platform in your Kubernetes environment.
  </Accordion>
  <Accordion title="Look up the API">
    The [useThreads reference](/reference/hooks/useThreads) lists parameters, lifecycle methods, pagination, and return types.
  </Accordion>
</Accordions>
