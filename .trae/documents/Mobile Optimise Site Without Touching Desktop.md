## Goals
- Add consistent phone “safe padding” so content never touches the screen edges.
- Prevent horizontal scroll and any content leaking outside cards/sections.
- Remove overlap issues on mobile while keeping desktop unchanged.

## Global Guardrails (Safe, Desktop-Neutral)
- Add a global horizontal overflow clamp on `html, body` (prefer `overflow-x: clip` with a fallback) to eliminate accidental scroll-x from decorative blobs.
- Add a small “mobile-only container rule” where needed: default `px-4` and scale up via `sm:px-6 lg:px-8`.

## Layout Audit (All Pages)
- Sweep all `src/app/**/page.tsx` and key components for sections missing a container (`mx-auto px-* max-w-*`) and add one only where content currently reaches the edges on phones.
- Normalize oversized base paddings like `p-12/p-16/px-10` to mobile-first values (e.g. `p-6 sm:p-10 lg:p-16`, `px-6 sm:px-10`) so spacing is comfortable on phone but identical on desktop.

## Targeted Fixes (Known Hot Spots)
- Footer
  - Fix the current `sm:p-1` (it reduces padding on small screens) to a mobile-first padding that keeps breathing room (base + `lg:` preserved).
- Hero + decorative blobs
  - Reduce negative offsets at the base breakpoint and/or scale blob sizes down at mobile; keep existing desktop values at `lg:`.
  - Ensure every section using absolute blobs has `relative` + `overflow-hidden` on the same wrapper.
- Login page
  - Make the 500px background blobs responsive (`w/h` and offsets adjusted for mobile) to prevent spill/scroll.
- Cards/text overflow
  - Replace risky `whitespace-nowrap` usages (e.g. case study client name) with truncation at mobile (`truncate`, `min-w-0`, sensible `max-w-*`) so long strings can’t force overflow.
- Compare table + CTA
  - Keep `overflow-x-auto` for the table, but reduce cell paddings on mobile.
  - Make CTA buttons `w-full` on mobile and shrink padding so they don’t overflow.

## Overlap Checks
- Verify fixed navbar + mobile dropdown stacking:
  - Ensure the mobile menu is anchored below the navbar (e.g. `top-full`) and doesn’t overlap the rounded nav bar.
- Confirm any `sticky`/`fixed` elements are disabled or adjusted under `lg:` as needed.

## Verification
- Run the dev site and check at 320/375/390/414 widths:
  - No horizontal scrolling.
  - No content touching screen edges.
  - No text/images spilling outside cards.
  - No overlaps (nav/menu/sections).

If you confirm, I’ll apply these changes file-by-file using `sm:` and `lg:` so desktop stays exactly as-is.