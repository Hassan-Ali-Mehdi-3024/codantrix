---
name: codantrix-site
description: Build pages for labs.codantrix.com that match the locked design system, voice, and architecture. USE WHENEVER creating a new page in site/, adding a new section to the home, modifying existing components (sysbar, nav, wordmark, cards, hero, services, process, work, compare table, FAQ, CTA, footer), wiring deploy config (wrangler.jsonc, package.json), or being asked anything ambiguous about Codantrix Labs site structure, copy voice, palette, typography, spacing, or icon system. The home page (site/index.html, commit a3c90be) is the canonical reference — match it.
---

# Codantrix Labs — site skill

Locked design system, voice, and architecture for `labs.codantrix.com`. The site is a single-file static HTML page at `site/index.html`, served by Cloudflare Workers Static Assets. **The home page is the canonical reference. Match it.**

---

## 1. Project architecture

| Concern | Reality |
|---|---|
| Stack | Pure static HTML + inline `<style>` for pages. Worker (TypeScript) for `/api/*` only. No Next.js, no React, no Tailwind, no bundler beyond wrangler's. |
| Hosting | Cloudflare Worker with `main: worker/index.ts` + `assets` binding fall-through. Worker dispatches `/api/*` and falls through to ASSETS for everything else. |
| Deploy | `npm run deploy` (= `wrangler deploy`). |
| Routes | Folder-based: `site/index.html`, `site/book/index.html`, `site/privacy/index.html`, etc. `html_handling: auto-trailing-slash`. |
| 404 | `site/404.html`, served by `not_found_handling: 404-page`. |
| Assets | Only `site/assets/img/favicon.ico`. No PNGs. All visuals are inline SVG. |
| Fonts | Outfit (display) + Poppins (body), via Google Fonts preconnect + stylesheet link. |
| Worker code | `worker/index.ts` (dispatcher), `worker/routes/{chat,lead,health}.ts`, `worker/lib/{groq,tools,kb,db}.ts`, `worker/system-prompt.ts`, `worker/types.ts`. TypeScript, strict, `@cloudflare/workers-types`. |
| Storage | D1 binding `DB` for runtime data (conversations, messages, leads). Schema in `schema/0001_init.sql`. Knowledge base (services, tiers, FAQ, contact) lives in `worker/lib/kb.ts`, NOT D1. |
| Secrets | `GROQ_API_KEY`, `CALENDLY_TOKEN` — set via `wrangler secret put`. Never in `wrangler.jsonc`, never in code, never in chat. |

**Do not** add: Next.js, React, Tailwind, separate stylesheets, image files, frontend bundlers, or runtime JS in static pages beyond the chat-widget script that lives only on `/book`.

### Stack history note (chatbot exception)
The `feedback_never_ship.md` "no chatbot widgets" rule was lifted on **2026-04-26** for the contextual scope-call assistant on `/book` only — Worker + D1 + Groq backend, agentic-studio-eats-its-own-dogfood. Ban still applies to: floating widgets on any non-/book page, vendor-supplied bubbles (Intercom, Drift, Crisp), and any widget that hides Hassan's email or Calendly behind it. See plan `replicated-questing-alpaca.md`.

---

## 2. Voice rules (LOCKED — see `project_content_ia.md` v1.0)

**Corporate site = first person plural "we".** Reserved exception: `/founder` page bio paragraphs use "I" (Hassan speaking).

### Pronouns
| Speaker | Use |
|---|---|
| The studio | "we", "us", "our" |
| The founder | named only ("Hassan") — never "I" except on `/founder` bio |
| The reader | "you", "your" — never "the client" |

### Sound like
- Plain, direct, declarative. Short sentences. Real verbs.
- Engineer's voice. Pricing, timelines, IP, scope are stated, not hedged.
- Honest about size: "Small on purpose."
- Manifesto: **"We end in a deploy, not a slide deck."**

### Banned
- "Transform", "leverage", "synergy", "AI-powered", "best-in-class", "cutting-edge", "industry-leading", "passion for innovation"
- Fake urgency, fake "trusted by", trillion-dollar rhetoric
- Smiley feature lists ("Lightning-fast! Robust!")
- Stock photos, fake logos, fake testimonials, fake metrics
- Chatbot widgets, commodity service pages

### Headings
- Sentence case, full sentences. **Never Title Case.**
- The `.muted` span trick: `<h2>Two engagements. <span class="muted">Both fixed-scope, fixed-price.</span></h2>` — bold start + dimmer continuation.

### Microcopy
- Buttons: verb-led sentence case. "Book a 30-min scope" never "BOOK NOW".
- Errors: "Email looks invalid." never "Oops!".
- Empty states: "No case studies yet. Day 60 they'll be here."
- Numbers: `$15K — 30K`, `4 — 10 weeks` (em-dash with spaces), `30-day support` (hyphen for compound modifier).

---

## 3. Design tokens (CSS custom properties at `:root`)

```
/* Surfaces — warm-dark, not pure black */
--bg:        #0b0a08
--bg-deep:   #080705
--bg-elev:   #131210
--surface-1: #14110d
--surface-2: #181510
--surface-3: #1c1813

/* Ink (foreground) */
--ink:       #ede5d6   (full)
--ink-soft:  #a39d8e   (secondary)
--ink-faint: #5e584d   (tertiary, eyebrows, meta)

/* Hairlines — translucent ink */
--line:        rgba(237, 229, 214, 0.07)
--line-strong: rgba(237, 229, 214, 0.13)

/* Accent — orange (the only chromatic color) */
--accent:      #ff6b35
--accent-deep: #c44a1f
--accent-glow: rgba(255, 107, 53, 0.16)
--accent-tint: rgba(255, 107, 53, 0.06)

/* Depth shadows — DEPTH-ONLY DESIGN, no borders on cards */
--depth-md, --depth-lg, --depth-featured, --depth-hover
  (multi-layer inset highlight + drop-shadow stacks)

/* Radii */
--r-sm: 10px,  --r-md: 14px,  --r-lg: 18px,  --r-xl: 22px

/* Type */
--display: 'Outfit', system-ui, sans-serif        (h1-h4, prices, big numbers)
--body:    'Poppins', system-ui, sans-serif       (everything else)

/* Layout */
--max: 1240px
--pad: clamp(20px, 4vw, 56px)
```

**Hierarchy is via opacity (ink → ink-soft → ink-faint), not via different colors.** One accent color only. Hairlines are ink at low opacity, never solid grays.

---

## 4. Type scale

| Class | Size | Use |
|---|---|---|
| `h1` / `.hero h1` | `clamp(44px, 6.5vw, 84px)` weight 600 | Hero headline |
| `h2` / `.sec-title` | `clamp(32px, 4.4vw, 52px)` weight 500 | Section titles |
| `.final h2` | `clamp(44px, 7vw, 96px)` weight 600 | Closing CTA giant headline |
| `h3` | `clamp(22px, 2.4vw, 30px)` | Subsection |
| `h4` | `clamp(18px, 1.6vw, 22px)` | Card heading |
| `.lede` / `.body-lg` | 18px | Hero supporting paragraph |
| body | 15px line-height 1.65 | Default |
| `.meta` / `.eyebrow` | 11–12px uppercase, letter-spacing 0.04–0.18em | Section labels, tier tags |

Letter-spacing on display sizes is **negative** (`-0.02em` to `-0.035em`). On uppercase meta/eyebrow text it's **positive** (`+0.04em` to `+0.18em`).

---

## 5. Layout primitives

```html
<div class="wrap">  <!-- max-width 1240px, padding clamp(20,4vw,56px), margin auto -->
  <section class="section">  <!-- vertical padding clamp(80, 10vw, 140px) -->
    <div class="sec-head">  <!-- section header with hairline divider underneath -->
      <div class="sec-eyebrow">
        <span class="num">01</span>
        <span class="bar"></span>
        <span class="name">Services</span>
      </div>
      <h2 class="sec-title">
        Title primary. <span class="muted">Title continuation in faded ink.</span>
      </h2>
    </div>
    <!-- content -->
  </section>
</div>
```

**Section numbering is canonical**: 01 Services, 02 Process, 03 Work, 04 Build vs buy, 05 Studio, 06 FAQ. Never skip or renumber without updating all sections.

---

## 6. Component vocabulary

Every component below exists in `site/index.html` — copy from there, don't reinvent.

### Sysbar (top of every page)
```html
<div class="sysbar">
  <div class="wrap"><div class="row">
    <div class="seg"><div class="pulse green"></div><span>System online · Lahore</span></div>
    <div class="seg optional"><span>5 production deploys · Booking window: ...</span></div>
    <div class="seg accent"><div class="pulse"></div><span>2 slots left this quarter</span></div>
  </div></div>
</div>
```
Update slots/deploys manually as state changes. The middle segment hides on `<720px` (`.seg.optional`).

### Nav
Sticky, blurred, hairline-bottomed. Three flex children: wordmark, nav-links, nav-cta pill.
- v1 nav links: `Services · Process · Work · Studio` + `Book a call →`
- v2 (day 60) drop "Services" — covered by home page
- v3 (month 4) restore "Services" + add "Writing"

### Wordmark (LOCKED)
```html
<a href="#" class="wordmark">
  <span class="logo-mark"><svg width="38" height="18" viewBox="0 0 2552.94 1200" aria-hidden="true"><use href="#i-logo"/></svg></span>
  <span>CODANTRIX <span class="sep">·</span> LABS</span>
</a>
```
Uppercase, letter-spacing 0.12em, font-size 14px, white-space: nowrap. The `·` is wrapped in `.sep` for accent color. Logo SVG **must** have explicit `width="38" height="18" viewBox="0 0 2552.94 1200"` attrs to avoid browser intrinsic-ratio fallback.

### Cards — DEPTH ONLY
Codantrix cards have **no borders**. They're warm-dark gradient surfaces with multi-layer shadow stacks.
- `.card` — base depth-md
- `.card.featured` — accent radial glow + depth-featured shadow (orange-tinted)
- Hover: `transform: translateY(-3px)` + `var(--depth-hover)`

### Buttons
- `.btn.primary` — accent fill, dark text, glowing shadow, hover lifts -1px
- `.btn.ghost` — surface gradient, ink text, depth-md shadow, hover turns text accent + lifts
- `.nav-cta` — pill (border-radius 999px), 11px 22px padding, accent
- `.tier-cta` / `.tier-cta.ghost` — service card CTAs

### Hero
- 60/40 grid (text left, diagram right). Stacks on `<920px`.
- `.hero::before` radial-glow pseudo (1300×700px, blur 80px, opacity 0.55) hangs above the headline.
- Diagram lives in `.hero-diagram` (aspect-ratio 1/0.85, surface gradient, depth-lg, four `.corner-label` overlays) with an inline SVG topology inside.
- Pill above headline: `.hero-pill` with `<span class="badge">v3.2</span>` + descriptor.
- Headline structure: word + `<span class="highlight">accent word</span>` + `<span class="strike">strike-through-word</span>`.

### Stack strip
Full-width band between hero and Services. `.stack-strip` with bg-elev. Label + comma-separated items in monospace-feeling 13px.

### Services (bento)
2-col grid, `.bento-services` (1.4fr 1fr). Tier A is `.card.featured`; Tier B is plain `.card`. Each tier: tag, name, price-block (right-aligned), description, `.features` list with `.check` rounded-tinted icons, CTA.

### Process (4-phase strip)
`.process-frame` with metadata header (`.process-meta` row), then 4-col `.process-flow` of `.process-step`. Each step has `.ph-icon-row` (icon + 01 · Map label), h4, description, `.duration-tag`. `→` arrow between steps via `::after`. Stacks 1-col on `<920px`.

### Work (bento)
3-col grid (`.bento-work`). First card is `.work-card.span-2.diagram-card` (spans 2 cols, contains an inline `.system-diag` SVG). Each card: `.meta` (vertical/duration), h4, paragraph, `.outcome` accent strip, `.stack` chips. Five cards total per spec.

### Compare table (Build vs buy)
Semantic `<table class="compare">` with `<colgroup>`, `<thead>`, `<tbody>`. Featured column class `.us-cell` / `.th-us` gets accent treatment: tinted bg, accent text, rounded top on `.th-us`, rounded bottom on last-row `.us-cell`, accent-toned hairlines inside the column. **Do NOT** rebuild as CSS grid with absolute-positioned overlay — that bug already happened (see §11).

### FAQ
`.faq-list` of `.faq-item`s. Each is a card: 70px col for `Q.0X` numbering + content. Cards lift on hover.

### Final CTA
`.final` with bottom-anchored radial glow (`::before`), giant 96px headline with `<span class="highlight">accent word</span>`, lede paragraph, two buttons (primary + ghost mailto).

### Footer
4-col grid (2fr 1fr 1fr 1fr). Cols: about (wordmark + description), studio links, founder links, contact links. `.footer-bottom` legal strip + `.colophon` ("Set in Outfit & Poppins. Hand-built. Hosted on Cloudflare.").
**Important:** the footer link rule is scoped via `:not(.wordmark)` so the wordmark anchor keeps its inline-flex layout.

---

## 7. Icon sprite

All icons live as `<symbol id="i-*">` in a single `<svg width="0" height="0" style="position:absolute" aria-hidden="true">` block right after `<body>`. Reference with `<svg><use href="#i-arrow"/></svg>`.

Existing symbols:
- `i-logo` — Codantrix brand (viewBox 2552.94×1200)
- `i-arrow`, `i-check`, `i-x`, `i-tilde` — UI primitives
- `i-compass`, `i-circuit`, `i-wire`, `i-ship` — process phases
- `i-target`, `i-building`, `i-route`, `i-tools`, `i-cap`, `i-doc` — work card verticals
- `i-linkedin`, `i-github`, `i-ext` — social/external

**Always** give outer `<svg>` referencing a symbol explicit `width="…" height="…"` attributes (and `viewBox` for the logo). Without them, browsers fall back to 300×150 default ratio and sizes go wrong.

---

## 8. SVG diagrams

Custom diagrams (hero topology, work-card system diagram) follow this pattern:
- Outer `<svg viewBox="…" preserveAspectRatio="xMidYMid meet">` so it scales cleanly inside its container
- Use `currentColor` or hex fills/strokes
- Two `<marker>`s (`#arrow` neutral grey, `#arrowAccent` orange) for arrowheads
- Rectangles for nodes, accent-orange highlights only on critical nodes (orchestrator, eval gate)
- Mono font (`Poppins`/`Outfit`) for labels at 9–11px
- Always include a frame rect with hairline stroke + a top-row label band

The "diagram language" is consistent across hero, work cards, and (eventually) case-study pages.

---

## 9. Responsive breakpoints

| Breakpoint | What changes |
|---|---|
| `<= 720px` | Footer 1fr 1fr; sysbar `.optional` hides; FAQ stacks; compare table collapses to label + Codantrix only |
| `<= 760px` | Nav links hide |
| `<= 860px` | Studio grid stacks |
| `<= 920px` | Hero grid stacks; bento-services 1-col; process-flow 1-col with row hairlines; bento-work 1-col; compare-wrap padding shrinks |

No 1024px or 1280px breakpoints — the layout fluidly scales between them via `clamp()` and `fr` units.

---

## 10. File and naming conventions

- **HTML files**: kebab-case folders, `index.html` inside (folder-based routing)
- **CSS classes**: kebab-case, BEM-ish for variants (`.tier-cta.ghost`, `.card.featured`, `.btn.primary`)
- **IDs**: `i-*` for icon symbols only. Avoid IDs on regular elements (use classes).
- **Section numbering** in headers (`01`, `02`, …) is canonical — see §5.

When adding a new top-level page (e.g., `/work`, `/studio`, `/founder` per IA spec):
1. Create `site/<route>/index.html`
2. Inline the same `<head>` boilerplate (Outfit + Poppins, favicon, OG tags, canonical)
3. Inline a copy of the design tokens + the components you use
4. Reuse the same icon sprite block
5. Reuse the same sysbar/nav/footer markup verbatim

Yes, this duplicates CSS across pages. **That's intentional** — single-file pages, no build step. If duplication grows painful, the user will explicitly ask to extract a shared stylesheet.

---

## 11. Anti-patterns (DO NOT REPEAT)

These bugs all happened during the home rebuild. Do not regress.

1. **`grid-row: 1 / -1` without explicit `grid-template-rows`** — `-1` resolves to the explicit grid edge, which is line 1 when no rows are declared. The element collapses to one cell. Use `<table>` instead, or `grid-row: 1 / span N` with explicit count.
2. **Absolute-positioned overlay sized with hardcoded percentage** — drifts the moment grid ratios change. If you must use absolute positioning, be explicit about why and add a CSS comment with the math.
3. **`.col a` rule overriding `.wordmark`** — the footer link rule must be `.footer-grid .col a:not(.wordmark)` so wordmark's `display: inline-flex` survives. The wordmark also gets a `.footer-grid .col .wordmark` reset for font-size.
4. **`<span class="logo-mark">` with inline default + SVG `width: 100%`** — the SVG balloons to fill the column. `.logo-mark` must be `display: inline-flex` so it always honors its dimensions.
5. **`<svg><use href="#symbol">` with no width/height/viewBox on the outer element** — browsers fall back to the default 300×150 intrinsic ratio. Always give the outer SVG explicit dimensions.
6. **3D-rendered PNG objects (laptop, mug, plane, ribbon, stack)** — banned. Inline SVG diagrams only.
7. **Tailwind / utility-class CSS** — banned. Custom classes with the established naming.
8. **Title Case headings** — banned. Sentence case full sentences.
9. **First-person "I" on the corporate site** — banned everywhere except `/founder` bio paragraphs.

---

## 12. Phasing (LOCKED — see `project_content_ia.md` §7)

| Phase | Trigger | Pages |
|---|---|---|
| **v1** (now) | Live | `/`, `/book`, `/privacy`, `/terms`, `/llms.txt`, `/404` |
| **v2** | Day 60 (after 2 Tier B clients delivered) | Add `/work` + 5 case studies, `/studio`, `/founder`, `/writing` index, first 3 posts |
| **v3** | Month 4 (after first Tier A signed) | Add `/services/tier-a`, `/services/tier-b`, deeper `/process`, restructure nav |

**Do not** ship v2 or v3 pages early. The phasing is a quality gate.

---

## 13. Workflow rules

- Every meaningful change ends with a commit. Commit messages follow conventional-commits style (`feat:`, `fix:`, `refactor:`, etc.) with a scope (`feat(home):`, `fix(brand):`).
- Push to `main` after each commit unless the user asks otherwise. CF Pages auto-deploys on push.
- When fixing a layout bug, find the root cause (specificity, intrinsic sizing, grid placement) — don't paper over it with `!important` or hardcoded pixel values.
- When the user pastes a complete file, replace verbatim and only fix obvious markdown-link artifacts (`[selector](http://...)` → `selector`, `[email](mailto:email)` button text → `email`). Don't second-guess copy or layout.
- Before adding any feature or page, re-read the matching section of this skill and `project_content_ia.md`. The spec is the source of truth.

---

## 14. Quick reference: where things live

| Want to | Look at |
|---|---|
| Copy a component | `site/index.html` (~1100 lines, all components present) |
| See current voice | `site/index.html` — every visible string |
| See content & IA spec | User's auto-memory `project_content_ia.md` |
| See visual redesign spec | `project_visual_redesign.md` |
| See full site map | `project_content_ia.md` §1 |
| See the never-ship list | `feedback_never_ship.md` |
| See voice rules layered | `feedback_voice.md` |
| See deploy config | `wrangler.jsonc`, `package.json` |
