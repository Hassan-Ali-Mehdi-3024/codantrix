/**
 * Knowledge base for the /book scope assistant.
 *
 * Source of truth for everything the LLM can claim: services, tier prices,
 * process timeline, work cards, contact, links, FAQs. Lives in code (not
 * D1) because:
 *   - Versioned with the site — content changes get a PR review
 *   - No production-edit footgun
 *   - The static home page is the canonical voice; this file mirrors it
 *
 * Update policy: when home (site/index.html) gains a new tier / process
 * step / work card / FAQ, mirror it here. Verify ranges against home
 * verbatim — never invent prices, durations, or outcomes.
 *
 * Last synced from home: commit a3c90be (2026-04-24 home rebuild).
 */

export interface Tier {
  id: "A" | "B";
  name: string;
  tagline: string;
  price_range: string;        // "$15 — 30K"
  duration_range: string;     // "6 — 10 weeks"
  description: string;
  includes: string[];
}

export interface ProcessPhase {
  num: string;                // "01"
  name: string;               // "Map"
  title: string;              // "Map the agent surface"
  description: string;
  duration: string;           // "3 — 5 days"
}

export interface WorkCard {
  vertical: string;           // "Real estate · Operations"
  duration: string;           // "8 weeks · Tier A"
  tier: "A" | "B";
  weeks: number;
  title: string;
  description: string;
  outcome: string;
  stack: string[];
}

export interface FAQ {
  q: string;
  a: string;
}

export interface KB {
  studio: {
    name: string;
    legal: string;
    founder: string;
    location: string;
    timezone: string;
    working_window: string;
    founded: string;
    pitch: string;
    manifesto: string;
  };
  tiers: Tier[];
  process: {
    duration_range: string;
    rev: string;
    phases: ProcessPhase[];
  };
  work: WorkCard[];
  build_vs_buy: {
    summary: string;
    when_us: string[];
    when_no_code: string[];
  };
  contact: {
    email: string;
    calendly_url: string;
    book_page: string;
    address: string;
  };
  links: {
    site: string;
    linkedin: string;
    github: string;
    personal_site: string;
  };
  faqs: FAQ[];
}

export const KB: KB = {
  studio: {
    name: "Codantrix Labs",
    legal: "SECP-registered in Pakistan",
    founder: "Hassan",
    location: "Lahore, Pakistan",
    timezone: "GMT+5 (PKT)",
    working_window: "US and EU business hours by default; daily async + one weekly sync",
    founded: "2023",
    pitch:
      "Production agentic systems studio. We design and build multi-agent production systems for SaaS, ops, and platform teams. Fixed scope, fixed price, six weeks to ship.",
    manifesto: "We end in a deploy, not a slide deck.",
  },

  tiers: [
    {
      id: "A",
      name: "Tier A — Production system",
      tagline: "Multi-agent platform, end-to-end.",
      price_range: "$15 — 30K",
      duration_range: "6 — 10 weeks",
      description:
        "For ops, sales, dispatch, and field teams who need autonomous workflows running reliably. Orchestration, observability, evals, and a client-facing surface.",
      includes: [
        "Multi-agent orchestration with hierarchical retrieval",
        "Client-facing dashboard or portal layer",
        "Production observability + agent eval suite",
        "Domain-specific RAG over your data",
        "30-day post-launch support included",
      ],
    },
    {
      id: "B",
      name: "Tier B — Agentic MVP",
      tagline: "From idea to working MVP in 6 weeks.",
      price_range: "$8 — 15K",
      duration_range: "4 — 6 weeks",
      description:
        "For founders validating an agentic product idea. Single-domain multi-agent system, owned codebase, real users.",
      includes: [
        "Multi-agent architecture, not chatbot wrappers",
        "Owned Next.js + FastAPI codebase",
        "Production deploy on day 30",
        "Two iteration rounds inside SOW",
      ],
    },
  ],

  process: {
    duration_range: "4 — 10 weeks",
    rev: "26-04",
    phases: [
      {
        num: "01",
        name: "Map",
        title: "Map the agent surface",
        description:
          "Two-day discovery on workflows, decision points, data sources. Output: agent architecture spec + scoped SOW.",
        duration: "3 — 5 days",
      },
      {
        num: "02",
        name: "Build",
        title: "Build the spine",
        description:
          "Orchestration, memory, retrieval, tool calls go in first. Stateless before stateful, deterministic before probabilistic.",
        duration: "2 — 3 weeks",
      },
      {
        num: "03",
        name: "Wire",
        title: "Wire the agents",
        description:
          "Domain agents wired into the spine with eval suite. Every agent has a fail mode and a rollback path.",
        duration: "2 — 3 weeks",
      },
      {
        num: "04",
        name: "Ship",
        title: "Ship to production",
        description:
          "Deployed to your infra or ours. Loom walkthrough, runbook, 30-day support. Code is yours.",
        duration: "1 week + 30d",
      },
    ],
  },

  work: [
    {
      vertical: "Real estate · Operations",
      duration: "8 weeks · Tier A",
      tier: "A",
      weeks: 8,
      title: "Tenant-ops copilot for a US property management platform.",
      description:
        "Multi-agent system handling lease ingest, maintenance triage, tenant comms. Three specialist agents wired through a routing orchestrator with eval gating before action.",
      outcome: "Ticket resolution: 38 hrs → 6 hrs (− 84%)",
      stack: ["Next.js", "Claude", "LangGraph", "pgvector", "AWS"],
    },
    {
      vertical: "Field ops · Dispatch",
      duration: "10 weeks · Tier A",
      tier: "A",
      weeks: 10,
      title: "Autonomous dispatch agent for a North American service network.",
      description:
        "Routing, scheduling, customer comms agents wired into existing CRM.",
      outcome: "24/7 coverage · 0 new hires",
      stack: ["FastAPI", "OpenAI", "Postgres"],
    },
    {
      vertical: "Construction · Estimation",
      duration: "6 weeks · Tier A",
      tier: "A",
      weeks: 6,
      title: "Quote-generation system for a regional contractor.",
      description:
        "Doc-aware agents reading drawings, pulling supplier prices, drafting client quotes.",
      outcome: "Turnaround: 3 days → 4 hrs",
      stack: ["Python", "Claude", "Milvus"],
    },
    {
      vertical: "EdTech · Learning",
      duration: "5 weeks · Tier B",
      tier: "B",
      weeks: 5,
      title: "AI exam-prep platform with PDF chat + MCQ generation.",
      description:
        "Conversational document agent over student coursework with auto-generated practice questions.",
      outcome: "MVP shipped on day 30",
      stack: ["Next.js", "OpenAI", "Supabase"],
    },
    {
      vertical: "Document AI · Arabic",
      duration: "7 weeks · Tier A",
      tier: "A",
      weeks: 7,
      title: "Arabic RAG pipeline over 100 regulatory PDFs.",
      description:
        "Open-source Arabic LLM stack with hierarchical retrieval over Milvus.",
      outcome: "100 PDFs · open-weight stack",
      stack: ["Milvus", "Llama", "Python"],
    },
  ],

  build_vs_buy: {
    summary:
      "No-code agent platforms (Lindy, Relevance) are good. For some teams they are the right answer. We will tell you which one you are on the scope call.",
    when_us: [
      "Custom logic the platform cannot express",
      "Owned source code in your repo",
      "VPC / on-prem deploy",
      "Agents that need to integrate with internal systems by code, not webhooks",
      "Compliance, audit, or eval requirements platforms cannot meet",
    ],
    when_no_code: [
      "Workflow fits inside the platform's primitives",
      "Internal-only use case with no compliance pressure",
      "Team has time to maintain the no-code config themselves",
      "Volume is low enough that platform pricing wins on cost",
    ],
  },

  contact: {
    email: "hassan@codantrix.com",
    calendly_url: "https://calendly.com/hassanalimehdi",
    book_page: "https://labs.codantrix.com/book/",
    address: "Lahore, Pakistan",
  },

  links: {
    site: "https://labs.codantrix.com",
    linkedin: "https://linkedin.com/in/hassan-ali-mehdi",
    github: "https://github.com/hassan-ali-mehdi-3024",
    personal_site: "https://hassanalimehdi.dev",
  },

  faqs: [
    {
      q: "How is pricing structured?",
      a: "Fixed-price per engagement. 50% upfront non-refundable retainer, 50% on delivery. No hourly billing. SOW signed before any work begins. Change requests get their own SOW.",
    },
    {
      q: "Who owns the IP and code?",
      a: "You do. IP transfers on final payment. Code lives in your repo from day one. We do not maintain a 'platform' you depend on after handoff. The studio takes nothing with it.",
    },
    {
      q: "How do you work across time zones?",
      a: "We operate on US and EU hours by default. Daily async updates plus one weekly sync. Lahore is GMT+5 — you ship a brief at end of your day, code is on your desk by morning.",
    },
    {
      q: "What if we should use Lindy or Relevance instead?",
      a: "Sometimes that is the right answer. We will tell you on the scope call. If your workflow fits inside a no-code platform, hire us only when you need custom logic, owned code, or VPC deploy that platforms cannot give you.",
    },
    {
      q: "What happens after handoff?",
      a: "30 days of post-launch support included. Beyond that, retainers for ongoing work or evolution. Most clients return for follow-up engagements rather than long retainers — that is a deliberate design choice.",
    },
    {
      q: "What should I prepare for the scope call?",
      a: "A rough description of the workflow, who runs it today, and what 'good' looks like at the end. If you have data volumes, system names, or a timeline pressure, bring those. If you don't, that's fine — we'll figure it out on the call.",
    },
    {
      q: "Can we bring our engineer to the call?",
      a: "Bring them. Two engineers in a 30-min call usually beats two non-technical stakeholders in 60. We'll go deeper on stack and architecture if there's an engineer in the room.",
    },
    {
      q: "What if we're not ready to commit yet?",
      a: "Then we won't ask you to. The 30 minutes are to figure out fit. If it's a 'later,' we'll say so and follow up when your timeline shifts.",
    },
    {
      q: "Do you do NDAs?",
      a: "Yes — mutual NDA before the call if you need it. Send yours or use ours. We sign before anything sensitive gets discussed.",
    },
  ],
};

/**
 * Lightweight keyword search across FAQs. Lowercase substring on q+a.
 * Used by the search_faq tool. Returns up to 3 best-effort matches.
 */
export function searchFaqs(query: string, limit = 3): FAQ[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter((t) => t.length > 2);
  if (tokens.length === 0) return [];

  const scored = KB.faqs.map((faq) => {
    const hay = (faq.q + " " + faq.a).toLowerCase();
    let score = 0;
    for (const tok of tokens) {
      if (hay.includes(tok)) score += 1;
    }
    return { faq, score };
  });

  return scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.faq);
}
