-- Codantrix Labs — /writing seed posts (2 starter pieces).
--
-- Inserts the first two locked starter posts directly into D1 so Hassan can
-- see /writing/ working immediately after deploy. Idempotent: re-running this
-- file deletes existing seed posts by slug and re-inserts. ON DELETE CASCADE
-- on post_tags handles the tag rows.
--
-- The full markdown source for both posts also lives at:
--   seed/writing/we-end-in-a-deploy.md
--   seed/writing/the-6k-tpm-rule-of-free-llm-stacks.md
-- so Hassan can paste them into the editor at /admin/writing/edit/<slug> to
-- see the editor flow with real content.
--
-- Apply: wrangler d1 execute codantrix-labs-db --remote --file=./schema/seed_writing_posts.sql
-- Local: wrangler d1 execute codantrix-labs-db --local  --file=./schema/seed_writing_posts.sql

-- ============================================================
-- POST 1 — "We end in a deploy"
-- ============================================================

DELETE FROM posts WHERE slug = 'we-end-in-a-deploy';

INSERT INTO posts (
  slug, title, excerpt, cover_image_key, cover_alt, body_md,
  status, published_at, created_at, updated_at, reading_time_min, word_count
) VALUES (
  'we-end-in-a-deploy',
  'We end in a deploy',
  'A working condition we wrote down — every change ends in production behind a real URL, or it does not end at all.',
  NULL,
  NULL,
  'There is a rule on every project we run.

Every change ends in a deploy. Not in a working tree. Not in a passing local test. Not in “ready when you give us a green light.” Every change, big or small, ends with the code running in production behind a real URL — or it does not end at all.

This is not a slogan. It is a working condition. It changes how we estimate, how we scope, and how we negotiate with stakeholders. It also changes what we say no to.

## Why we wrote it down

Shipping discipline is one of those phrases that gets nodded at and then ignored. We watched ourselves do it for years. A feature would be 95% done — branched, tested, demoed to the client — and then sit. The deploy step would be “next week.” Then “next sprint.” Then it would atrophy and the work was done a third time before it ever ran in front of a customer.

We finally wrote the rule down because the cost of that cycle was not 5%. It was about 2x. Code that did not end in a deploy in week N had to be rewritten in week N+3. Context was gone, requirements had drifted, the integration target had changed.

> Code that does not ship in the same week it was built rots in three.

## What it actually rules out

The rule has consequences. Some of them are uncomfortable:

- No long-running feature branches. If a branch cannot merge to `main` and ship within a week, the scope is wrong. Cut the scope, not the deploy cadence.
- No “we will deploy after the demo.” The demo is the deploy. We show the production URL. If it is not safe to show production, we have a feature flag, not a hidden branch.
- No “the customer will tell us when to deploy.” We deploy. They use it. They tell us what to fix. The order matters.
- No partial migrations sitting in PRs for two weeks. Migrations either go now, with a rollback plan, or they get split.

This means we sometimes look slow. A team that ships every Friday looks slower than a team that does five sprints in parallel and shows demos every two weeks. But after three months, the first team has thirteen deployed features and the second has zero.

:::note
We do not ship code we are ashamed of. The rule is about discipline, not recklessness. Feature flags, staged rollouts, and revert paths are part of the deploy. The requirement is that the code is behind a URL, not that every user sees it.
:::

## The three-tier deploy ladder

When we kick off a Tier A engagement, we agree on a deploy ladder before any code is written:

1. Internal preview — every PR auto-deploys to a preview URL. Reviewers see it running before they review the diff.
2. Staging on `main` — `main` auto-deploys to a staging URL with real data fixtures. If `main` is broken, staging is broken, and someone is on it.
3. Production behind flags — production deploys are continuous, but customer-visible behavior is gated by feature flags we own jointly with the client.

Three URLs, three audiences, one branch policy. No flag = no merge.

## What changes for the customer

Customers usually expect a release. Big email, training session, “the new version is live.” We tell them on day one that there will be no big release, because there will be a hundred small ones, starting next week.

This changes the relationship. Instead of negotiating a launch date six weeks out, we negotiate the *first* feature flag flip — usually within ten days. After that, we negotiate the second one. And the third. Customers who are used to release cycles take a few weeks to adjust. The ones who have lived through a slipped launch get it immediately.

:::quote — Hamilton Helmer, on operating tempo
The faster the loop, the harder it is for a competitor to read your moves before they are already in production.
:::

## The cost we accept

This rule is expensive in one place: it forces us to design for reversibility. Every deploy has to be safe to revert. Every migration has to be safe to roll back. Every external API call has to assume the version on the other end will change tomorrow.

```bash
# A typical "end-of-change" sequence on a Friday afternoon.
git push origin feature/copilot-router
gh pr merge --squash --auto
# Preview URL → staging → production-behind-flag, all in under 4 minutes.
# The change "ended" the moment the flag flipped to "internal-only".
```

That cost is real. But it is paid up front, not in week ten when something breaks at midnight and nobody can remember what the deploy plan was.

The flip side: when you build for reversibility from the first commit, the team’s emotional relationship to production changes. Production is no longer a sacred place that you visit once a quarter. It is a place you push to before lunch.

That is the rule. Every change ends in a deploy. Or it does not end at all.

#building #process #lessons',
  'published',
  strftime('%s', '2026-04-26 12:00:00') * 1000,
  strftime('%s', '2026-04-26 12:00:00') * 1000,
  strftime('%s', '2026-04-26 12:00:00') * 1000,
  4,
  810
);

INSERT INTO post_tags (post_id, tag)
  SELECT id, 'building' FROM posts WHERE slug = 'we-end-in-a-deploy';
INSERT INTO post_tags (post_id, tag)
  SELECT id, 'process'  FROM posts WHERE slug = 'we-end-in-a-deploy';
INSERT INTO post_tags (post_id, tag)
  SELECT id, 'lessons'  FROM posts WHERE slug = 'we-end-in-a-deploy';

-- ============================================================
-- POST 2 — "The 6K TPM rule of free LLM stacks"
-- ============================================================

DELETE FROM posts WHERE slug = 'the-6k-tpm-rule-of-free-llm-stacks';

INSERT INTO posts (
  slug, title, excerpt, cover_image_key, cover_alt, body_md,
  status, published_at, created_at, updated_at, reading_time_min, word_count
) VALUES (
  'the-6k-tpm-rule-of-free-llm-stacks',
  'The 6K TPM rule of free LLM stacks',
  'There is exactly one number that controls what is possible inside a free LLM stack. Internalize it before you write any code.',
  NULL,
  NULL,
  'We shipped a chat assistant on this site last week. It runs on the free tier of Groq, behind a Cloudflare Worker. There is exactly one number that controls what is possible inside that stack: **6,000 tokens per minute**.

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
- **Noon** — `google/gemma-4-31b-it:free` via OpenRouter. Google AI Studio shared free pool returned upstream 429s. Outside our control.
- **Afternoon** — `meta-llama/llama-3.3-70b-instruct:free` via OpenRouter. Venice shared pool also 429ed. Same upstream-pool problem, different provider.
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
    model: env.LLM_MODEL,
    messages: [
      { role: "system", content: SYSTEM_PROMPT_700_TOKENS },
      ...history,
      { role: "user", content: userMsg },
    ],
    tools: TOOLS_400_TOKENS,
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

#cost #architecture #lessons',
  'published',
  strftime('%s', '2026-04-27 12:00:00') * 1000,
  strftime('%s', '2026-04-27 12:00:00') * 1000,
  strftime('%s', '2026-04-27 12:00:00') * 1000,
  4,
  880
);

INSERT INTO post_tags (post_id, tag)
  SELECT id, 'cost'         FROM posts WHERE slug = 'the-6k-tpm-rule-of-free-llm-stacks';
INSERT INTO post_tags (post_id, tag)
  SELECT id, 'architecture' FROM posts WHERE slug = 'the-6k-tpm-rule-of-free-llm-stacks';
INSERT INTO post_tags (post_id, tag)
  SELECT id, 'lessons'      FROM posts WHERE slug = 'the-6k-tpm-rule-of-free-llm-stacks';
