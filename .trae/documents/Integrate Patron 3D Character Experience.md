## Decision Locked
- Use **Spline** for Patron 3D.
- Use **brand orange #F15A2F** for emissive visor/glow and highlight accents.

## What We’re Building
- Patron becomes a **3D character embedded into the homepage Hero** (primary experience), with optional “mini dock” behavior for continuity.
- Patron guides visitors mainly via **visual cues** (scan/tilt/direct), with a tiny link strip as backup—not a chatbot.

## Spline Scene Plan (Patron Design + Interactivity)
### Scene Requirements
- Single Patron drone in a clean, dark “data center / lab” context (minimal background).
- Materials:
  - Body: matte charcoal/black + subtle off-white/silver accents.
  - Visor/sensor bar: emissive #F15A2F (primary expression).
- Animations (loop + triggers):
  - `idle_hover` (default loop): slow weighted hover + micro-tilt.
  - `scan` (trigger): visor sweep/pulse.
  - `direct_left` / `direct_right` (trigger): body tilt toward CTA region.
  - `sleep` (trigger): compress segments + fade visor.

### Spline Variables / Events
- Add Spline variables or event triggers that can be controlled from the website:
  - `state` (string or number) OR individual booleans: `scan`, `direct`, `sleep`.
- Optional: separate objects (visor glow object) whose visibility/intensity can be tweaked.

## Website Integration Plan (Next.js)
### Rendering
- Add dependency: `@splinetool/react-spline`.
- Add component: `PatronSpline.tsx` that loads a local `public/patron.splinecode`.
- Mount it inside [Hero.tsx](file:///f:/Projects/codantrix/src/components/home/Hero.tsx) as the right-side visual anchor.

### Performance 
- Lazy-load the Spline component (dynamic import) so initial page loads fast.
- Pause / reduce work when off-screen:
  - Use IntersectionObserver to unmount or stop interactions when not visible.
- Mobile fallback:
  - Use a static poster image if device is low-power or small screen.
- Respect `prefers-reduced-motion`:
  - Default to idle only; disable scan pulses.

### Interaction Wiring (Making It Feel Alive)
- Scroll triggers:
  - When Services section enters view → trigger `scan` once.
  - When Case Studies enters view → trigger `direct` toward “View All Case Studies”.
  - When CTA section enters view → trigger `direct` toward “Book a Call”.
- Hover triggers:
  - Hover CTA button → short `direct` toward that CTA.
- Dismiss:
  - If user closes Patron → trigger `sleep` and remember in localStorage.

## Minimal UI Layer (Optional, Not Chat)
- A small “Patron suggestion strip” appears only after a trigger (e.g., after scan):
  - 2–3 buttons: “See Services”, “View Case Studies”, “Book a Call”.
- No free-text chat unless you explicitly want it.

## What I Need From You (External Tooling Inputs)
- Provide **one** of these:
  1) The exported `patron.splinecode` file, OR
  2) A share link + permission to export from Spline.
- Confirm the naming inside the Spline scene for triggers/variables (e.g., variable `state` or events `scan/direct/sleep`).

## Implementation Steps (After You Accept This Plan)
1. Add Spline React dependency and create `PatronSpline` loader component.
2. Place Patron 3D into the Hero and tune layout/responsiveness.
3. Implement scroll/hover triggers + localStorage dismissal.
4. Add mobile + reduced-motion fallback.
5. QA on desktop/mobile and ensure no performance regressions.

## Files Likely To Change
- `src/components/home/Hero.tsx` (embed Patron 3D)
- `src/components/patron/PatronSpline.tsx` (new)
- `src/components/patron/usePatronTriggers.ts` (new)
- `public/patron.splinecode` + `public/patron-poster.webp` (new)
- `package.json` (add Spline dependency)