---
slug: the-6k-tpm-rule-of-free-llm-stacks
title: The 6K TPM rule of free LLM stacks
tags: cost, architecture, lessons
excerpt: There is exactly one number that controls what is possible inside a free LLM stack. Internalize it before you write any code.
status: published
cover_image_key: (set after upload via /admin/writing editor)
cover_alt: Token-budget worksheet on a yellow legal pad
---

We shipped a chat assistant on this site last week. It runs on the free tier of Groq, behind a Cloudflare Worker. There is exactly one number that controls what is possible inside that stack: **6,000 tokens per minute**.

If you are evaluating free LLM tiers for production traffic, this is the constraint that decides your entire architecture. It deserves to be understood before you write any code.

## What 6K TPM means in practice

TPM is “tokens per minute” — the rolling 60-second budget the provider lets you consume. On Groq’s free tier (as of April 2026), that budget is 6,000 tokens for both `llama-3.1-8b-instant` and `llama-3.3-70b-versatile`.

It sounds like a lot until you do the arithmetic. A typical assistant turn looks like:

```text
system prompt          ≈ 700 tokens
conversation history   ≈ 400 tokens (3 turns)
user message           ≈ 100 tokens
tool definitions       ≈ 600 tokens
---------------------------------------
input subtotal         ≈ 1800 tokens
model response         ≈ 200 tokens
---------------------------------------
total per turn         ≈ 2000 tokens
```

A turn that uses a tool counts twice — first the model decides to call the tool, then it sees the tool result and produces the user-facing reply. Two model calls, around 2,000 tokens each.

That means **a single tool-using exchange burns roughly 4,000 of your 6,000 TPM**. You get one and a half exchanges per minute per visitor before you 429.

> The 6K TPM rule: every byte you can trim from the system prompt, the tool definitions, or the message history pays back at the rate of `1 / (turns_per_minute × tools_per_turn)`.

## Three places where bytes hide

When we hit the cap, we found three places hiding bytes:

### 1. The system prompt, unloved and growing

We started at 1,500 tokens. After a week of adjustments — “say more about pricing,” “be more concise on objections,” “explain the deploy ladder” — we were at 2,400. A diet brought it back to 700 by:

- Replacing in-prompt examples with a tool that returns structured info (`get_info`).
- Removing all hedging language (“if appropriate,” “where relevant”).
- Compressing twelve voice rules into three sentences.

### 2. Tool definitions, copy-pasted from JSON Schema

OpenAI-compatible APIs require tool schemas inline in every request. A four-tool config with verbose `description` fields was 1,100 tokens. Trimmed to 400 by:

- Cutting `description` to one sentence per tool.
- Inlining enum values as comma-separated lists in the description rather than as `enum` arrays.
- Removing optional parameters that we never used.

### 3. Conversation history, accidentally infinite

We kept all turns. After eight messages, we were spending 2,000 tokens per request just on history. We capped at the last six messages with a sliding window and a summary placeholder for “earlier conversation.”

After all three diets, a tool-using turn is around 2,000 tokens (was 4,500). We get three turns per minute now, comfortably inside the cap.

## The model trial we do not want to repeat

Before we settled on `llama-3.1-8b-instant`, we tried four other free models in one day. The history is worth recording so nobody repeats it:

- **Morning** — `llama-3.1-8b-instant` (Groq). TPM-rate-limited under burst test traffic. Looked broken. Was actually correct, just throttled.
- **Noon** — `google/gemma-4-31b-it:free` via OpenRouter. Google AI Studio’s shared free pool returned upstream 429s. Outside our control.
- **Afternoon** — `meta-llama/llama-3.3-70b-instruct:free` via OpenRouter. Venice’s shared pool also 429ed. Same upstream-pool problem, different provider.
- **Evening** — `llama-3.3-70b-versatile` (Groq direct). On our exact tool-calling prompt, the model emitted *zero content and zero tool_calls* on tier-detail questions. The chat appeared frozen. Reproducible.
- **Late evening** — `llama-3.1-8b-instant` (Groq direct). Same provider and quota as the morning, but the smaller model handles our trimmed prompt much more reliably. Tool routing is deterministic.

:::warning
Free OpenRouter pools return upstream 429s without telling you which upstream is failing. If you depend on `:free` models in production, you are at the mercy of a shared bucket you cannot see. Use Groq direct, or pay.
:::

## What the architecture looks like in code

Here is the budget-aware request shape we ended up with. Note the explicit history truncation and the lean tool definition:

```typescript
const MAX_HISTORY_TURNS = 6;

async function chatTurn(env: Env, conv: Conversation, userMsg: string) {
  const history = conv.messages.slice(-MAX_HISTORY_TURNS);

  const body = {
    model: env.LLM_MODEL, // "llama-3.1-8b-instant"
    messages: [
      { role: "system", content: SYSTEM_PROMPT_700_TOKENS },
      ...history,
      { role: "user", content: userMsg },
    ],
    tools: TOOLS_400_TOKENS, // 4 tools, lean descriptions
    max_tokens: 256,
  };

  return fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.LLM_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
```

That request, including the tool round-trip, fits in roughly 4,000 tokens. We can serve a real conversation per minute, per visitor, with budget left for retries.

## What we would do differently

If we were starting again with the 6K TPM constraint baked in:

1. Budget tokens per turn before writing the prompt. Decide “I will spend at most 1,800 input tokens per request” and design backwards.
2. Push as much knowledge into tools as possible. A tool that returns structured info is cheaper than the same info inlined into the prompt every request.
3. Default to the 8B model, not the 70B. The smaller model is more reliable on a small, specific tool-calling prompt — and you can fit twice as much per minute.
4. Cap conversation history aggressively. The seventh turn is rarely worth what it costs.

Free tiers are not free. They are paid in tokens-per-minute. Once you internalize that, the design choices stop feeling arbitrary and start feeling forced.

For more on the working conditions behind this build, see [[/writing/we-end-in-a-deploy]] — same studio, different constraint.

#cost #architecture #lessons
