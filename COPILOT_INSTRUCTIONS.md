# Copilot Design Guardrails

**Brand constants (immutable)**
- Primary: `#f15a2f` (orange)
- Backgrounds: dark `#1c1e20`, light `#fffdf2`
- Typeface: Poppins (via next/font). Keep weight contrast; avoid other families unless required icons.
- Text color defaults: light mode `#1c1e20` on `#fffdf2`; dark mode `#fffdf2` on `#1c1e20`.

**Layout and spacing**
- Prefer generous padding: base `p-8` on cards/sections; `py-16`+ for vertical rhythm.
- Use constrained widths (`max-w-6xl/7xl`) and responsive `gap-8/12` to create breathing room.
- Avoid generic grid boxes; use layered stacks, split layouts, asymmetric cards.

**Depth and surfaces**
- Layering: `border border-white/10` (or `border-[#fffdf2]/10`), `shadow-xl shadow-black/30`, and `backdrop-blur-md` for glass cards.
- Panels should have subtle gradients (`from-white/5 to-white/0` or `from-black/30 to-black/0`), rounded corners (`rounded-2xl`), and inner dividers using `divide-white/5`.

**Typography**
- Headings: large, tight tracking (`text-4xl md:text-5xl/6xl`, `font-bold`, `tracking-tight`).
- Meta/eyebrow text: `text-xs/SM`, `uppercase`, `tracking-[0.25em]`, `text-gray-400` or `text-[#fffdf2]/50`.
- Body: `text-base md:text-lg` with `leading-relaxed`.

**Interactivity**
- Micro-interactions: `hover:scale-[1.01]`, `hover:-translate-y-0.5`, `transition-all duration-300 ease-out`.
- Buttons: bold text, generous padding (`px-6 py-3`+), focus states with `ring-2 ring-[#f15a2f]/50`.

**Components**
- Nav: frosted bar (`backdrop-blur-md border-white/10`), pill links with hover fills, mobile sheet with soft borders.
- Cards: use layered backgrounds, icon badges with brand orange, stats rows separated by borders.
- CTAs: split hero blocks with glowing accents, orange primary buttons, dark secondary outlines.

**Do not change**
- Business logic, handlers, data fetching, or routing behavior.
- Preserve existing onClick, useState/useEffect logic; only adjust JSX structure and Tailwind classes for visuals.
