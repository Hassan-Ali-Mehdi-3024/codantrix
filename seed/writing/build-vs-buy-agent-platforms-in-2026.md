---
slug: build-vs-buy-agent-platforms-in-2026
title: Build vs buy — agent platforms in 2026
tags: building, architecture, lessons
excerpt: Most teams asking "build versus buy" actually mean "rent versus buy." Here is how we decide on every engagement.
status: published
cover_image_key: (set after upload via /admin/writing editor)
cover_alt: Whiteboard sketch comparing graph orchestrator boxes against vendor logos
---

The question comes up on every scope call: should we build our own agent orchestrator, or use LangGraph, Agno, Bedrock Agents, or one of the framework-of-the-month vendors?

Most of the time, the question is framed wrong. Teams ask “build versus buy,” but in 2026 they actually mean “rent versus buy.” The vendor options are mostly hosted services with proprietary state stores and per-token pricing — not libraries you own. That changes the calculus completely.

Here is how we decide on every engagement.

## What “build” actually means in 2026

“Building your own agent platform” sounds intimidating until you draw the diagram.

For a typical Tier B engagement, the orchestrator we ship is around **200 to 300 lines of code**. It does four things:

1. Take a user message + conversation history.
2. Send it to an LLM with a tool list.
3. If the model calls a tool, execute it and feed the result back.
4. Stream the final reply.

That is the loop. There is no graph DSL, no checkpointer abstraction, no state machine library. There is a `Conversation` row in Postgres, a `Message` row per turn, and a `for` loop. The model providers ship streaming + tool-calling protocols that are mature enough that the orchestrator stays small.

```typescript
// The shape of every agent loop we have shipped in the last year.
async function step(msg: Message, conv: Conversation, env: Env) {
  conv.messages.push(msg);
  while (conv.turns_remaining > 0) {
    const out = await llm.chat({
      model: env.MODEL,
      messages: trim(conv.messages, MAX_TURNS),
      tools: TOOLS,
    });
    conv.messages.push(out);
    if (!out.tool_calls) return out;     // model produced final reply
    for (const tc of out.tool_calls) {
      const result = await runTool(tc, env);
      conv.messages.push({ role: "tool", content: result, id: tc.id });
    }
    conv.turns_remaining--;
  }
}
```

That is the entire orchestrator for a four-tool assistant. We ship it on Cloudflare Workers, behind D1. Total runtime cost: zero on the free tier, in our /book chat assistant on this site.

## What “buy” actually gives you

The platforms (LangGraph Cloud, Agno, AWS Bedrock Agents, Crew, Vertex Agent Builder, n8n with AI nodes) are not just orchestration libraries. They are *hosted services* that wrap orchestration with:

- **Graph DSL.** Define agents as nodes, edges as transitions. Useful when you have ten or more agents and conditional routing gets gnarly.
- **Persistence layer.** Conversations, checkpoints, and replay — managed for you.
- **Built-in observability.** Trace viewer, replay, span attribution.
- **Eval harness.** Run dataset against any version of the graph.
- **Distribution channel.** Some vendors give you a hosted endpoint or chat UI for free.

These are real features. The question is whether they are features *you currently need*, and whether they are worth the lock-in cost.

> The vendor pitch is always “focus on your domain, not infrastructure.” The vendor reality is always “your conversation state, eval data, and tool definitions live in our database, in our format, behind our auth.”

## The three decision rules

Here is the rubric we use on engagements. It correctly routes about 90% of decisions in our experience.

### 1. Number of agents in the system

- **1 to 5 agents.** Build. The graph DSL is overhead; a `for` loop with a router function is fine. Every framework adds 10x more abstraction than you actually need.
- **6 to 15 agents.** Borderline. Build if your team has strong TypeScript or Python fluency; buy if the team is mostly LLM-side rather than software-side.
- **16+ agents.** Buy, almost always. The graph really does help at this size, and you do not want to maintain your own visualization tools, replay infrastructure, or graph traversal optimizer.

### 2. Eval and replay maturity

- **No eval suite yet.** Build. You will burn the first month of a vendor relationship learning their eval DSL and import format anyway. Spend that month building a tiny in-house eval (a JSON file of inputs + an LLM-as-judge rubric is enough to start) and you will own it forever.
- **Active eval cadence.** Buy. Vendors invest serious engineering in eval ergonomics, and replicating that on your own takes 200+ hours.

### 3. Observability requirement

- **You do not need to debug agent runs in production.** Build. Console.log to D1. Browse with SQL.
- **You need a trace viewer with span attribution.** Buy. Or buy the trace viewer alone (Langfuse, Helicone, Phoenix) and keep your orchestrator yours.

:::note
Notice that observability is the only category where “buy the tool, not the platform” is a real third option. Vendors hate this carve-out because the tool-only path keeps your orchestration code yours, and they make no money on tool calls. But it works.
:::

## What we shipped on the last five engagements

Five engagements, five decisions, all routed cleanly through the rubric:

- **Tenant-ops copilot (3 agents).** Built. ~250 LOC orchestrator over Claude + Postgres. No platform.
- **Dispatch agent (4 agents).** Built. Same shape, FastAPI instead of Workers.
- **Estimation copilot (2 agents).** Built. Trivial — barely qualifies as a graph.
- **Bilingual doc pipeline (1 agent + 8 retrievers).** Built. Retrievers are not agents; they are functions. Calling them a graph would be performance art.
- **One enterprise discovery (12 agents, hard observability requirement).** **Bought.** LangGraph Cloud + Langfuse for traces. Engagement scope explicitly included migration-off-platform option in the SOW, so the lock-in cost was bounded.

Five for five through the rubric. Four built, one bought. The bought engagement was also the one with the largest team and the most existing in-house ML maturity — the buyers were already comfortable with vendor-shaped systems.

## What we tell clients up front

When a buyer arrives convinced they need LangGraph because their CTO read about it on a podcast, we ask three questions:

1. How many agents in the v1 system?
2. Do you have an existing eval cadence we would migrate, or do we need to start from zero?
3. Will anyone other than the build team need to debug a failed run in production?

If the answers are “three or fewer,” “starting from zero,” and “probably not in v1” — and they almost always are — we explain the rubric, point at our `for` loop, and ship.

If the answers are “fifteen,” “yes, migrate from a current Phoenix setup,” and “the support team needs replay” — we route to a platform engagement, scope it differently, and price the integration accordingly.

The honest answer is: **most teams are asking the wrong question.** They are asking “build versus buy” when they should be asking “do we currently need a graph at all.” In 2026, the answer is usually no.

For more on the working conditions behind these decisions, see [[/writing/we-end-in-a-deploy]] and [[/writing/the-6k-tpm-rule-of-free-llm-stacks]].

#building #architecture #lessons
