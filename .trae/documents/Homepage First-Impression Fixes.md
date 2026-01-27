## Patron Concept (Aligned With Your Spec)
- Character: “Patron” = premium, high‑tech B2B lab companion drone (solutions concierge).
- Non-cartoon: no eyes/mouth, no limbs/propellers; expression is visor glow + body tilt.
- Form factor: 2–3 floating interlocking geometric segments (mag-lev aesthetic) with weighted hover.
- Palette: matte charcoal/black body, off‑white/silver accents, emissive Brand Orange highlights (we’ll standardize to your chosen hex across CSS + Rive).

## Quick Critique Of The Provided Mock (So We Don’t Ship The Wrong Vibe)
- The mock reads “cute robot toy” (eyes, arms, jets) which risks reducing executive trust.
- We’ll keep the “floating assistant + glass UI” idea, but redesign Patron as a visor/sensor-bar drone with industrial materials and subtle motion.

## Character Production Plan (Rive State Machine)
### Deliverables
- `patron.riv` file containing:
  - Artboard(s): Patron icon + optional “directional tilt” variants.
  - One state machine: `PatronMachine`.
  - Inputs:
    - `active` (bool) – user opened widget
    - `scanning` (bool) – user is choosing options
    - `directing` (bool) – highlighting CTA actions
    - `dismissed` (bool) – sleep/dock animation
    - `intensity` (number 0–1) – visor glow strength

### Animation States (Mapped 1:1 to your checklist)
- Idle/Hover: slow vertical breathing + micro-tilt.
- Scanning: visor sweep/pulse synced to interaction.
- Directing: body tilts toward CTA cluster.
- Power Down: segments compress + visor fades.

### How We’ll Create The Art
- Source design: high-fidelity vector (Figma/Illustrator) in layers (segments, visor, glow mask).
- Import to Rive and rig:
  - Separate bones/constraints for segment float/tilt.
  - Visor glow as a masked shape with animated gradient/sweep.

### What I Need From You / External Tooling
- Preferred Brand Orange for emissive parts:
  - Choose one: #F15A2F (site) or #FFA500 (your note). We should unify to one.
- If you want to own design:
  - Use Figma to draw the 2–3 segment drone + visor bar.
  - Export SVG layers; I’ll integrate into Rive.
- If you want me to draft an initial vector:
  - Share 2–3 references of “industrial minimal drone / sensor bar” aesthetics (not cute robots).

## Website Widget UX (Concierge, Not Chatbot)
### Core Behavior
- Docked Patron button bottom-right; expands into a glass panel on click.
- First message (your copy):
  - “Hello, I am Patron—the Codantrix lab companion. How can I direct your inquiry today?”
- 1-step intent selection (buttons) + optional 1 follow-up question.
- Outputs always show 2–3 clear actions (deep links), never freeform AI.

### Conversation Flow (Conversion-Oriented)
- Q1: “What are you trying to improve?”
  - Reduce defects / quality (CV)
  - Cut cycle time / throughput (automation)
  - Forecast / optimization (AI/ML)
  - Build product / platform (web)
  - Not sure
- Optional Q2: “Where will this run?” (Cloud / Edge / On‑prem / Not sure)
- Results:
  - Primary: View relevant case studies
  - Secondary: See services
  - Conversion: Book a call

### Dismissal + Respect
- Large, high-contrast close button.
- Remember dismissal in localStorage; no re-appearing nag.

## Performance Plan (Your Rive-Lite Requirements)
- Use Rive-lite runtime.
- Use Intersection Observer:
  - If widget is off-screen/minimized, set state machine to inactive and/or pause rendering.
  - Respect `prefers-reduced-motion` (no pulse, minimal transitions).

## Accessibility Plan
- Dock button: aria-label, visible focus ring, large tap target.
- Panel: behaves like a dialog (role/aria), keyboard navigation, escape to close.
- Close button: always reachable, always visible.

## Homepage Trust Polish (In Parallel)
- CTA consistency: unify wording across Navbar, Hero, and CTA section (one primary verb).
- Copy fixes:
  - Replace awkward headings (“Knowledge Floor”, “Industries We Perfect”, punctuation).
- Interaction polish:
  - Remove double hover-lift (wrapper + card) to stop janky jumps.
- Footer:
  - Fix duplicate “Expertise” heading and reduce large-screen margin weirdness.
- Reliability:
  - Add empty-state fallbacks if Supabase returns no featured testimonials/posts.
- Caching:
  - Reassess `force-dynamic` homepage; keep dynamic only where necessary.

## Implementation Steps (After You Confirm This Plan)
1. Add Patron widget component and mount it (home-only or site-wide).
2. Add Rive-lite dependency + load `patron.riv` from `/public`.
3. Implement state machine wiring (active/scanning/directing/dismissed) + IntersectionObserver pausing.
4. Implement concierge flow UI + link routing.
5. Apply homepage polish changes (CTA/copy/hover/footer/empty-states/caching).
6. QA: mobile/tablet/desktop, keyboard, reduced-motion, empty Supabase content.

## Files Expected To Change
- Add: `PatronConciergeWidget` component, `patron.riv` asset.
- Update: layout mount (or homepage), plus targeted home components and footer/navbar for polish.