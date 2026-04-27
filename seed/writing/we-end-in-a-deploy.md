---
slug: we-end-in-a-deploy
title: We end in a deploy
tags: building, process, lessons
excerpt: A working condition we wrote down — every change ends in production behind a real URL, or it does not end at all.
status: published
cover_image_key: (set after upload via /admin/writing editor)
cover_alt: Production deploy log scrolling on a terminal
---

There is a rule on every project we run.

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

#building #process #lessons
