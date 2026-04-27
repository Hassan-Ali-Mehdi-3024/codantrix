/**
 * Markdown-plus tokenizer + renderer for the /writing system.
 *
 * Implements a strict whitelist of CommonMark + 6 custom block types per
 * project_writing_system_spec.md. Anything outside the whitelist is rendered
 * as plain text. No <script>, no <iframe>, no inline event handlers — every
 * dynamic token has its content HTML-escaped before output.
 *
 * Supported block-level syntax:
 *   # / ## / ###      — headings (h4+ flattened to h3)
 *   ```lang ... ```    — fenced code with `lang` class for client-side Prism
 *   > line             — blockquote
 *   - / 1.             — single-level list (mixed lines start a new list)
 *   ![alt](url){.X}    — image, X ∈ { full, narrow }
 *   :::note ... :::    — note callout
 *   :::warning ... ::: — warning callout
 *   :::quote — Src ... :::  — pull-quote with attribution
 *   ---                — horizontal rule (accent dot row)
 *   (otherwise)        — paragraph
 *
 * Supported inline syntax:
 *   **bold**, *italic*, `code`
 *   [text](url)                 — auto target=_blank rel for external http(s)
 *   [[/writing/slug]]           — internal link, resolved via hooks
 *   #tag-name                   — auto-link to /writing/tag/<tag>/
 *
 * No image conversion / scaling — that's the upload-route's job.
 */

// ============ Public API ============

export interface RenderHooks {
  /** Resolve an internal post slug to its title; return null if unknown. */
  resolveInternalLink?: (slug: string) => string | null;
}

export interface RenderResult {
  html: string;
  hashtags: string[];        // unique, normalized; useful for sidebar/RSS
  internalLinks: string[];   // unique; useful for backlinks
}

export function renderMarkdown(source: string, hooks: RenderHooks = {}): RenderResult {
  const blocks = tokenizeBlocks(source);
  const ctx: RenderCtx = {
    hooks,
    hashtags: new Set<string>(),
    internalLinks: new Set<string>(),
  };
  const html = blocks.map((b) => renderBlock(b, ctx)).join("\n");
  return {
    html,
    hashtags: [...ctx.hashtags],
    internalLinks: [...ctx.internalLinks],
  };
}

// ============ Block tokens ============

type Block =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; lang: string; content: string }
  | { type: "blockquote"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "callout"; kind: "note" | "warning"; text: string }
  | { type: "pullquote"; source: string; text: string }
  | { type: "image"; alt: string; src: string; variant: "full" | "narrow" }
  | { type: "hr" };

interface RenderCtx {
  hooks: RenderHooks;
  hashtags: Set<string>;
  internalLinks: Set<string>;
}

const RX = {
  heading: /^(#{1,6})\s+(.+?)\s*$/,
  fenceOpen: /^```\s*([a-zA-Z0-9_+-]*)\s*$/,
  fenceClose: /^```\s*$/,
  blockquote: /^>\s?(.*)$/,
  ulItem: /^[-*]\s+(.+)$/,
  olItem: /^\d+\.\s+(.+)$/,
  hr: /^-{3,}\s*$/,
  imageBlock: /^!\[([^\]]*)\]\(([^)\s]+)\)\{\.(full|narrow)\}\s*$/,
  calloutOpen: /^:::(note|warning)\s*$/,
  pullquoteOpen: /^:::quote(?:\s+[—-]\s+(.+))?\s*$/,
  calloutClose: /^:::\s*$/,
};

function tokenizeBlocks(source: string): Block[] {
  // Normalize line endings; keep blank lines as empty strings.
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i] ?? "";

    // Skip blank lines between blocks.
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Fenced code
    const fence = RX.fenceOpen.exec(line);
    if (fence) {
      const lang = (fence[1] ?? "").toLowerCase();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !RX.fenceClose.test(lines[i] ?? "")) {
        buf.push(lines[i] ?? "");
        i++;
      }
      i++; // consume closing fence (or EOF)
      blocks.push({ type: "code", lang, content: buf.join("\n") });
      continue;
    }

    // Callouts (note / warning) — opens with ::: , closes with :::
    const callout = RX.calloutOpen.exec(line);
    if (callout) {
      const kind = callout[1] as "note" | "warning";
      const buf: string[] = [];
      i++;
      while (i < lines.length && !RX.calloutClose.test(lines[i] ?? "")) {
        buf.push(lines[i] ?? "");
        i++;
      }
      i++;
      blocks.push({ type: "callout", kind, text: buf.join("\n") });
      continue;
    }

    // Pull-quote :::quote — Source ... :::
    const pull = RX.pullquoteOpen.exec(line);
    if (pull) {
      const source = (pull[1] ?? "").trim();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !RX.calloutClose.test(lines[i] ?? "")) {
        buf.push(lines[i] ?? "");
        i++;
      }
      i++;
      blocks.push({ type: "pullquote", source, text: buf.join("\n") });
      continue;
    }

    // Headings
    const h = RX.heading.exec(line);
    if (h) {
      const rawLevel = (h[1] ?? "").length;
      const level = (rawLevel <= 3 ? rawLevel : 3) as 1 | 2 | 3;
      blocks.push({ type: "heading", level, text: (h[2] ?? "").trim() });
      i++;
      continue;
    }

    // Block image
    const img = RX.imageBlock.exec(line);
    if (img) {
      blocks.push({
        type: "image",
        alt: img[1] ?? "",
        src: img[2] ?? "",
        variant: (img[3] as "full" | "narrow") ?? "full",
      });
      i++;
      continue;
    }

    // Blockquote (consume contiguous > lines)
    if (RX.blockquote.test(line)) {
      const buf: string[] = [];
      while (i < lines.length) {
        const m = RX.blockquote.exec(lines[i] ?? "");
        if (!m) break;
        buf.push(m[1] ?? "");
        i++;
      }
      blocks.push({ type: "blockquote", text: buf.join("\n") });
      continue;
    }

    // Horizontal rule
    if (RX.hr.test(line)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // List (single-level). Mixed ordered/unordered start → split into separate lists.
    const ulMatch = RX.ulItem.exec(line);
    const olMatch = RX.olItem.exec(line);
    if (ulMatch || olMatch) {
      const ordered = !!olMatch;
      const items: string[] = [];
      while (i < lines.length) {
        const ln = lines[i] ?? "";
        const m = ordered ? RX.olItem.exec(ln) : RX.ulItem.exec(ln);
        if (!m) break;
        items.push(m[1] ?? "");
        i++;
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }

    // Paragraph (consume until blank line / new block)
    const buf: string[] = [line];
    i++;
    while (i < lines.length) {
      const ln = lines[i] ?? "";
      if (ln.trim() === "") break;
      if (
        RX.heading.test(ln) ||
        RX.fenceOpen.test(ln) ||
        RX.blockquote.test(ln) ||
        RX.ulItem.test(ln) ||
        RX.olItem.test(ln) ||
        RX.hr.test(ln) ||
        RX.imageBlock.test(ln) ||
        RX.calloutOpen.test(ln) ||
        RX.pullquoteOpen.test(ln)
      )
        break;
      buf.push(ln);
      i++;
    }
    blocks.push({ type: "paragraph", text: buf.join("\n") });
  }

  return blocks;
}

// ============ Block renderers ============

function renderBlock(b: Block, ctx: RenderCtx): string {
  switch (b.type) {
    case "heading":
      return `<h${b.level}>${renderInline(b.text, ctx)}</h${b.level}>`;
    case "paragraph":
      return `<p>${renderInline(b.text, ctx)}</p>`;
    case "code":
      return renderCode(b.lang, b.content);
    case "blockquote":
      return `<blockquote><p>${renderInline(b.text, ctx)}</p></blockquote>`;
    case "list": {
      const tag = b.ordered ? "ol" : "ul";
      const items = b.items.map((t) => `<li>${renderInline(t, ctx)}</li>`).join("");
      return `<${tag}>${items}</${tag}>`;
    }
    case "callout": {
      const cls = b.kind === "note" ? "callout callout--note" : "callout callout--warning";
      return `<aside class="${cls}"><p>${renderInline(b.text, ctx)}</p></aside>`;
    }
    case "pullquote": {
      const inner = renderInline(b.text, ctx);
      const attribution =
        b.source.length > 0
          ? `<footer class="pullquote__source">— ${escapeHtml(b.source)}</footer>`
          : "";
      return `<figure class="pullquote"><blockquote>${inner}</blockquote>${attribution}</figure>`;
    }
    case "image": {
      const alt = escapeAttr(b.alt);
      const src = escapeAttr(b.src);
      const cls = b.variant === "narrow" ? "post-img post-img--narrow" : "post-img post-img--full";
      // 1600x900 dims declared so CLS = 0; CSS handles responsive sizing.
      return `<figure class="${cls}"><img src="${src}" alt="${alt}" loading="lazy" decoding="async" width="1600" height="900"></figure>`;
    }
    case "hr":
      return `<hr class="post-hr">`;
  }
}

function renderCode(lang: string, content: string): string {
  const safeLang = /^[a-z0-9_+-]{1,32}$/i.test(lang) ? lang.toLowerCase() : "";
  const cls = safeLang ? ` class="language-${safeLang}"` : "";
  return `<pre><code${cls}>${escapeHtml(content)}</code></pre>`;
}

// ============ Inline renderer ============
// Strategy: walk the text once, recognizing inline tokens by priority order:
//   1. backtick code spans  (highest — protects content from other patterns)
//   2. internal links [[/writing/slug]]
//   3. links [text](url)
//   4. **bold**, *italic*  (emphasis)
//   5. #hashtags
// Anything else → escaped text.

function renderInline(input: string, ctx: RenderCtx): string {
  let s = input;
  let out = "";
  while (s.length > 0) {
    // 1. inline code
    if (s.startsWith("`")) {
      const end = s.indexOf("`", 1);
      if (end > 0) {
        const code = s.slice(1, end);
        out += `<code>${escapeHtml(code)}</code>`;
        s = s.slice(end + 1);
        continue;
      }
    }
    // 2. internal link [[/writing/slug]]
    if (s.startsWith("[[")) {
      const end = s.indexOf("]]");
      if (end > 1) {
        const inner = s.slice(2, end).trim();
        // Accept either a /writing/<slug> or just <slug>.
        const slug = inner.replace(/^\/?writing\//, "").replace(/^\//, "").replace(/\/$/, "");
        if (/^[a-z0-9-]{1,80}$/.test(slug)) {
          ctx.internalLinks.add(slug);
          const title = ctx.hooks.resolveInternalLink?.(slug) ?? slug;
          out += `<a class="internal-link" href="/writing/${escapeAttr(slug)}/">${escapeHtml(title)}</a>`;
          s = s.slice(end + 2);
          continue;
        }
      }
    }
    // 3. external link [text](url)
    if (s.startsWith("[")) {
      const m = /^\[([^\]]*)\]\(([^)\s]+)\)/.exec(s);
      if (m) {
        const text = m[1] ?? "";
        const url = m[2] ?? "";
        out += renderLink(text, url, ctx);
        s = s.slice(m[0].length);
        continue;
      }
    }
    // 4a. bold **...**
    if (s.startsWith("**")) {
      const end = s.indexOf("**", 2);
      if (end > 2) {
        const inner = s.slice(2, end);
        out += `<strong>${renderInline(inner, ctx)}</strong>`;
        s = s.slice(end + 2);
        continue;
      }
    }
    // 4b. italic *...*  (require non-space after opening * to avoid matching " * " etc.)
    if (s.startsWith("*") && !s.startsWith("**")) {
      const m = /^\*([^*\s][^*]*?)\*/.exec(s);
      if (m && m[1]) {
        out += `<em>${renderInline(m[1], ctx)}</em>`;
        s = s.slice(m[0].length);
        continue;
      }
    }
    // 5. #hashtag (must be at start or after non-word char; word starts with letter)
    if (s.startsWith("#")) {
      const prevChar = out.length > 0 ? out.charAt(out.length - 1) : "";
      const atBoundary = out.length === 0 || /[\s>(]/.test(prevChar);
      if (atBoundary) {
        const m = /^#([a-z][a-z0-9-]{0,40})/.exec(s);
        if (m && m[1]) {
          const tag = m[1].toLowerCase();
          ctx.hashtags.add(tag);
          out += `<a class="tag-link" href="/writing/tag/${escapeAttr(tag)}/">#${escapeHtml(tag)}</a>`;
          s = s.slice(m[0].length);
          continue;
        }
      }
    }
    // Newline within paragraph → soft break.
    if (s.startsWith("\n")) {
      out += "<br>";
      s = s.slice(1);
      continue;
    }
    // Default: escape one char and continue.
    out += escapeHtml(s.charAt(0));
    s = s.slice(1);
  }
  return out;
}

function renderLink(text: string, url: string, ctx: RenderCtx): string {
  const safeUrl = sanitizeUrl(url);
  if (!safeUrl) return escapeHtml(text || url);
  const isExternal = /^https?:\/\//i.test(safeUrl);
  const safeText = renderInline(text, ctx);
  if (isExternal) {
    return `<a href="${escapeAttr(safeUrl)}" target="_blank" rel="noopener noreferrer">${safeText}</a>`;
  }
  return `<a href="${escapeAttr(safeUrl)}">${safeText}</a>`;
}

/** Allow http(s), root-relative, and #fragment links. Reject javascript:/data: */
function sanitizeUrl(url: string): string | null {
  const u = url.trim();
  if (u.length === 0 || u.length > 2048) return null;
  if (/^(https?:|mailto:|#|\/)/i.test(u)) {
    if (/^javascript:/i.test(u) || /^data:/i.test(u) || /^vbscript:/i.test(u)) return null;
    return u;
  }
  return null;
}

// ============ HTML escaping ============

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(s: string): string {
  return escapeHtml(s);
}
