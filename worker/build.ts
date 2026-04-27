/**
 * Build / version metadata for the Worker.
 *
 * Bumped manually by the developer on each commit that should be visible
 * via /api/health. Convention: <YYYY-MM-DD>-<short-name>. Useful for
 * verifying the deploy currently serving traffic matches the intended
 * commit (Cloudflare Workers don't expose a built-in version SHA via
 * the runtime API without `version_metadata` config + extra binding).
 *
 * Bump this whenever shipping non-trivial changes you want to verify
 * post-deploy. Trivial cleanups can leave it as-is.
 */

export const BUILD_REV = "2026-04-28-phase1-seo+writing-kb";
