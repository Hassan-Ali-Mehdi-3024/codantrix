/**
 * HTML templates for /writing/* public pages.
 *
 * Renders index, single-post, and tag pages on the Worker. Shares
 * design tokens + components with the rest of the site via
 * /assets/css/writing.css (documented exception, paralleling work-case.css).
 *
 * All dynamic content is HTML-escaped at the template boundary. Body HTML
 * comes pre-rendered from worker/lib/markdown.ts (whitelist tokenizer) so
 * we can safely embed it inside .prose.
 *
 * Comments markup in renderPostPage() is wired to /api/comments/* in W4.
 */

import { escapeHtml } from "./markdown";
import type { PostListItem, PostWithTags } from "./posts";

// ============ Shared chrome ============

interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: number;
  noindex?: boolean;
}

function head(meta: PageMeta): string {
  const ogImage = meta.ogImage ?? "https://labs.codantrix.com/og.png";
  const robots = meta.noindex ? "noindex,nofollow" : "index,follow";
  const article = meta.publishedTime
    ? `<meta property="article:published_time" content="${escapeHtml(new Date(meta.publishedTime).toISOString())}">`
    : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(meta.title)}</title>
<meta name="description" content="${escapeHtml(meta.description)}">
<meta property="og:title" content="${escapeHtml(meta.title)}">
<meta property="og:description" content="${escapeHtml(meta.description)}">
<meta property="og:url" content="${escapeHtml(meta.canonical)}">
<meta property="og:image" content="${escapeHtml(ogImage)}">
<meta property="og:type" content="${meta.ogType ?? "website"}">
<meta name="twitter:card" content="summary_large_image">
<meta name="robots" content="${robots}">
<link rel="canonical" href="${escapeHtml(meta.canonical)}">
<link rel="icon" href="/assets/img/favicon.ico">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/writing.css">
${article}
</head>
<body>`;
}

function logoSprite(): string {
  return `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<defs>
  <symbol id="i-logo" viewBox="0 0 2552.94 1200">
    <path fill="currentColor" d="M284.95,86.06c211.74-136.1,510.58-107.03,696.75,60.72,37.29,34.43,75.02,68.41,109.45,105.78,28.88,30.4,63.22,55.98,85.93,91.83-47.39,50.34-94.07,103.19-151.39,142.44-68.67-61.88-127.87-134.04-200.92-191.18-83.7-64.38-196.01-94.34-299.91-71.71-153.89,23.16-283.1,154.87-307.24,307.87-4.38,65.01-7.69,132.43,13.59,195.02,38.99,120.54,144.23,219.17,268.7,245.54,113.47,28.79,239.2-8.05,323.7-88.17,59.2-56.96,116.69-115.8,175.44-173.2,14.31-13.59,27-28.79,37.56-45.51-107.12-7.78-214.07,4.83-321.01,4.65-21.91,11.71-33,38.27-56.33,49.09-46.41,22.18-109.09,14.66-143.79-25.13-44.53-47.39-46.05-132.61,3.04-177.32,33-30.67,83.61-44.89,125.99-25.66,35.14,10.82,59.11,40.33,77.88,70.46,131.09,2.24,262.18,2.41,393.26,2.32,35.77,4.74,55.44-30.4,79.23-50.61,111.59-105.96,213.89-221.13,323.7-328.97,65.1-66.8,145.4-118.12,232.76-150.4,160.51-53.29,345.51-46.14,493.86,39.08,133.95,71.27,232.22,200.03,280.86,342.38,34.43,112.04,34.96,233.65,6.35,347.03-18.96,66.53-50.43,129.21-88.61,186.71-92.28,125.81-232.76,218.81-388.44,241.61-148.97,28.61-306.08-10.91-431.8-93.53-65.99-42.74-118.66-101.94-174.55-156.57-26.11-27.45-55.71-51.86-79.05-82-7.24-17.88,9.12-31.48,19.67-43.37,39.43-39.88,77.88-80.92,122.68-114.9,31.48,33.44,62.5,67.42,95.95,98.99,59.64,57.23,115.8,122.77,193.95,155.41,64.2,30.76,136.63,35.95,206.65,28.97,134.58-21.01,258.06-114.99,305.72-243.93,25.66-61.97,26.02-130.64,20.57-196.54-10.55-93.62-65.63-176.33-134.4-238.21-73.68-59.55-168.55-92.1-263.25-89.51-74.04,6.71-148.26,27.45-208.61,72.16-57.05,43.55-106.05,96.48-157.02,146.74-33.08,34.25-69.03,65.72-99.34,102.56,123.4.8,246.89,2.59,370.28-.36,21.37-38.54,57.14-74.49,104.35-73.95,55.89-7.06,107.93,32.28,127.33,83.07,7.33,40.15,7.15,86.65-22.89,118.12-41.76,57.76-136.18,62.06-184.29,10.37-10.91-10.91-19.67-23.79-28.79-36.21-139.85-3.67-279.52,5.45-419.37,2.32-24.41-.18-52.94-3.13-69.03,19.4-80.39,86.47-166.86,166.86-248.32,252.43-71.09,69.03-137.62,144.86-222.12,198.24-65.19,37.56-136.1,67.87-211.12,77.79-53.65,4.2-107.57,3.93-161.22,1.25C240.78,1161.95,18.22,922.93,1.41,656.91c-1.52-50.52-2.95-101.4,2.24-151.83C26.53,332.05,135.71,174.94,284.95,86.06Z"/>
  </symbol>
</defs>
</svg>`;
}

function sysbar(): string {
  return `<div class="sysbar"><div class="wrap"><div class="row">
  <div class="seg accent"><span class="pulse"></span><span>CODANTRIX LABS · WRITING</span></div>
  <div class="seg optional"><span>Lahore · UTC+5</span></div>
  <div class="seg"><span class="pulse green"></span><span>OPEN FOR JUNE 2026</span></div>
</div></div></div>`;
}

function nav(active: "writing" | "none" = "writing"): string {
  return `<nav class="top"><div class="wrap"><div class="row">
  <a href="/" class="wordmark">
    <span class="logo-mark"><svg width="38" height="18" viewBox="0 0 2552.94 1200" aria-hidden="true"><use href="#i-logo"/></svg></span>
    <span>CODANTRIX <span class="sep">·</span> LABS</span>
  </a>
  <div class="nav-links">
    <a href="/studio/">Studio</a>
    <a href="/work/">Work</a>
    <a href="/writing/" class="${active === "writing" ? "active" : ""}">Writing</a>
    <a href="/founder/">Founder</a>
  </div>
  <a href="/book/" class="nav-cta">Book a call →</a>
</div></div></nav>`;
}

function footer(): string {
  return `<footer><div class="wrap">
  <div class="footer-grid">
    <div class="col about">
      <a href="/" class="wordmark">
        <span class="logo-mark"><svg width="38" height="18" viewBox="0 0 2552.94 1200" aria-hidden="true"><use href="#i-logo"/></svg></span>
        <span>CODANTRIX <span class="sep">·</span> LABS</span>
      </a>
      <p>Production agentic systems studio. Founded 2023 in Lahore. Working with teams across US and EU time zones.</p>
    </div>
    <div class="col">
      <h5>Studio</h5>
      <a href="/studio/">About</a>
      <a href="/#services">Services</a>
      <a href="/#how">Process</a>
      <a href="/work/">Work</a>
    </div>
    <div class="col">
      <h5>Founder</h5>
      <a href="/founder/">Bio</a>
      <a href="https://www.linkedin.com/in/hassan-ali-mehdi/" target="_blank" rel="noopener">LinkedIn</a>
      <a href="https://github.com/hassan-ali-mehdi-3024" target="_blank" rel="noopener">GitHub</a>
      <a href="https://hassanalimehdi.dev" target="_blank" rel="noopener">Personal site</a>
    </div>
    <div class="col">
      <h5>Contact</h5>
      <a href="mailto:contact@codantrix.com">contact@codantrix.com</a>
      <a href="/book/">Book a call</a>
      <a href="/studio/">Lahore, Pakistan</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 Codantrix Labs · SECP-registered in Pakistan</span>
    <span><a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a></span>
  </div>
  <div class="colophon">Set in Outfit &amp; Poppins. Hand-built. Hosted on Cloudflare.</div>
</div></footer>`;
}

function tail(extraScripts = ""): string {
  return `${extraScripts}\n</body>\n</html>`;
}

// ============ Public pages ============

export function renderWritingIndex(opts: {
  posts: PostListItem[];
  tags: { tag: string; count: number }[];
  activeTag?: string;
  r2PublicUrl: string;
}): string {
  const meta: PageMeta = {
    title: "Writing — Codantrix Labs",
    description:
      "Lessons from shipping production agentic systems. Field notes on AI architecture, evaluation, cost, and shipping.",
    canonical: "https://labs.codantrix.com/writing/",
  };

  const tagChips = renderTagStrip(opts.tags, opts.activeTag);
  const grid =
    opts.posts.length === 0
      ? `<div class="empty-state">No published writing yet. Soon.</div>`
      : `<div class="cards">${opts.posts.map((p) => renderCard(p, opts.r2PublicUrl)).join("")}</div>`;

  return `${head(meta)}
${logoSprite()}
${sysbar()}
${nav()}

<section class="writing-hero"><div class="wrap">
  <div class="hero-eyebrow">
    <span class="num">01</span>
    <span class="bar"></span>
    <span class="name">Writing</span>
  </div>
  <h1 class="hero-title">Writing<span class="muted">.</span></h1>
  <p class="hero-lede">Field notes from shipping production agentic systems. Architecture, evaluation, cost, and the parts that don't fit a tweet.</p>
  ${tagChips}
</div></section>

<section class="writing-grid"><div class="wrap">
  ${grid}
</div></section>

${footer()}
${tail()}`;
}

function renderTagStrip(tags: { tag: string; count: number }[], active?: string): string {
  if (tags.length === 0) return "";
  const chips: string[] = [];
  chips.push(
    `<a class="chip ${!active ? "active" : ""}" href="/writing/">All</a>`
  );
  for (const t of tags) {
    const isActive = active === t.tag;
    chips.push(
      `<a class="chip ${isActive ? "active" : ""}" href="/writing/tag/${escapeHtml(t.tag)}/">#${escapeHtml(t.tag)}<span class="count">${t.count}</span></a>`
    );
  }
  return `<div class="tag-strip"><span class="label">Filter</span>${chips.join("")}</div>`;
}

function renderCard(p: PostListItem, r2: string): string {
  const cover = p.cover_image_key && r2
    ? `<div class="cover"><img src="${escapeHtml(r2.replace(/\/$/, ""))}/${escapeHtml(p.cover_image_key)}" alt="${escapeHtml(p.cover_alt ?? p.title)}" loading="lazy" decoding="async" width="1600" height="900"></div>`
    : `<div class="cover empty">${escapeHtml(p.tags[0] ?? "writing")}</div>`;
  const date = p.published_at ? formatDate(p.published_at) : "";
  const readTime = p.reading_time_min ? `${p.reading_time_min} min read` : "";
  const meta = [readTime, date, p.tags[0] ? `<span class="pri-tag">#${escapeHtml(p.tags[0])}</span>` : ""]
    .filter(Boolean)
    .join(" · ");
  const excerpt = p.excerpt ? `<p class="excerpt">${escapeHtml(p.excerpt)}</p>` : "";

  return `<a href="/writing/${escapeHtml(p.slug)}/" class="card">
  ${cover}
  <div class="body">
    <div class="meta">${meta}</div>
    <h3>${escapeHtml(p.title)}</h3>
    ${excerpt}
    <span class="read">Read →</span>
  </div>
</a>`;
}

export function renderPostPage(opts: {
  post: PostWithTags;
  bodyHtml: string;
  siblings: PostListItem[];
  approvedComments: Array<{
    id: number;
    author_name: string;
    body: string;
    created_at: number;
  }>;
  r2PublicUrl: string;
}): string {
  const { post, bodyHtml, siblings, approvedComments, r2PublicUrl } = opts;
  const meta: PageMeta = {
    title: `${post.title} — Codantrix Labs`,
    description: post.excerpt ?? `${post.title}. Field notes from Codantrix Labs.`,
    canonical: `https://labs.codantrix.com/writing/${post.slug}/`,
    ogType: "article",
    publishedTime: post.published_at ?? undefined,
    ogImage:
      post.cover_image_key && r2PublicUrl
        ? `${r2PublicUrl.replace(/\/$/, "")}/${post.cover_image_key}`
        : undefined,
  };

  const date = post.published_at ? formatDate(post.published_at) : "Draft";
  const readTime = post.reading_time_min ? `${post.reading_time_min} min read` : "";
  const tagsHtml = post.tags
    .map((t) => `<a class="tag-link" href="/writing/tag/${escapeHtml(t)}/">#${escapeHtml(t)}</a>`)
    .join("");

  const cover =
    post.cover_image_key && r2PublicUrl
      ? `<section class="post-cover"><div class="frame"><img src="${escapeHtml(r2PublicUrl.replace(/\/$/, ""))}/${escapeHtml(post.cover_image_key)}" alt="${escapeHtml(post.cover_alt ?? post.title)}" width="1600" height="900" decoding="async"></div></section>`
      : "";

  const siblingsBlock =
    siblings.length === 0
      ? ""
      : `<section class="sibling-section"><div class="wrap">
  <h3>More writing</h3>
  <div class="cards">${siblings.map((s) => renderCard(s, r2PublicUrl)).join("")}</div>
</div></section>`;

  const commentsBlock = renderCommentsBlock(post.id, post.slug, approvedComments);

  return `${head(meta)}
${logoSprite()}
${sysbar()}
${nav()}

<section class="post-hero"><div class="wrap wrap--prose">
  <div class="hero-eyebrow">
    <span class="num">Writing</span>
    <span class="bar"></span>
    <span class="name">${escapeHtml(date)}</span>
  </div>
  <h1 class="post-title">${escapeHtml(post.title)}</h1>
  <div class="post-meta">
    ${readTime ? `<span>${escapeHtml(readTime)}</span><span class="dot"></span>` : ""}
    <span>${escapeHtml(date)}</span>
    ${tagsHtml ? `<span class="dot"></span>${tagsHtml}` : ""}
  </div>
</div></section>

${cover}

<section class="post-body"><div class="wrap wrap--prose">
  <div class="prose">
${bodyHtml}
  </div>
</div></section>

${siblingsBlock}

${commentsBlock}

${footer()}
${tail(commentsScript(post.slug))}`;
}

function renderCommentsBlock(
  postId: number,
  postSlug: string,
  comments: Array<{ id: number; author_name: string; body: string; created_at: number }>
): string {
  const list =
    comments.length === 0
      ? `<div class="comment-empty">Be the first to comment.</div>`
      : `<div class="comment-list">${comments
          .map(
            (c) => `<div class="comment">
  <div class="head">
    <span class="name">${escapeHtml(c.author_name)}</span>
    <span class="time">${escapeHtml(formatDate(c.created_at))}</span>
  </div>
  <div class="body">${escapeHtml(c.body)}</div>
</div>`
          )
          .join("")}</div>`;

  return `<section class="comments-section"><div class="wrap">
  <h3>Comments</h3>
  ${list}
  <form class="comment-form" id="comment-form" data-post-id="${postId}" data-post-slug="${escapeHtml(postSlug)}">
    <h4>Leave a comment</h4>
    <div class="flash" id="comment-flash" hidden></div>
    <div class="row">
      <div class="field">
        <label for="cf-name">Name</label>
        <input id="cf-name" name="author_name" type="text" required maxlength="80" autocomplete="name">
      </div>
      <div class="field">
        <label for="cf-email">Email <span style="color:var(--ink-faint)">(never displayed)</span></label>
        <input id="cf-email" name="author_email" type="email" required maxlength="200" autocomplete="email">
      </div>
    </div>
    <div class="field">
      <label for="cf-body">Comment</label>
      <textarea id="cf-body" name="body" required maxlength="3000" placeholder="Be kind, specific, and on-topic."></textarea>
    </div>
    <div class="actions">
      <button type="submit" id="cf-submit">Post comment</button>
      <span class="hint">First-time commenters confirm via email. Comments are moderated.</span>
    </div>
  </form>
</div></section>`;
}

function commentsScript(postSlug: string): string {
  return `<script>
(function(){
  'use strict';
  var API_BASE = 'https://codantrix-labs.hassanalimehdi30.workers.dev';
  var form = document.getElementById('comment-form');
  if (!form) return;
  var flashEl = document.getElementById('comment-flash');
  var btn = document.getElementById('cf-submit');
  function flash(text, kind){
    flashEl.hidden = false;
    flashEl.textContent = text;
    flashEl.classList.toggle('error', kind === 'error');
  }
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var fd = new FormData(form);
    var payload = {
      post_slug: ${JSON.stringify(postSlug)},
      author_name: fd.get('author_name'),
      author_email: fd.get('author_email'),
      body: fd.get('body')
    };
    btn.disabled = true; btn.textContent = 'Posting…';
    fetch(API_BASE + '/api/comments/post', {
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify(payload)
    }).then(function(r){ return r.json().then(function(j){ return { status:r.status, body:j }; }); })
    .then(function(r){
      if (r.status === 200 && r.body && r.body.ok){
        if (r.body.requires_verification){
          flash('Thanks. We sent a verification link to your email — click it to publish your comment.', 'ok');
        } else {
          flash('Comment submitted. It will appear after moderation.', 'ok');
        }
        form.reset();
      } else if (r.status === 429){
        flash('You\\u2019re posting too fast. Wait a minute and try again.', 'error');
      } else {
        flash((r.body && r.body.error) ? ('Could not post: ' + r.body.error) : 'Could not post comment. Try again.', 'error');
      }
      btn.disabled = false; btn.textContent = 'Post comment';
    }).catch(function(){
      flash('Network error. Check your connection.', 'error');
      btn.disabled = false; btn.textContent = 'Post comment';
    });
  });
})();
</script>`;
}

export function renderTagPage(opts: {
  tag: string;
  posts: PostListItem[];
  totalCount: number;
  r2PublicUrl: string;
}): string {
  const meta: PageMeta = {
    title: `#${opts.tag} — Writing — Codantrix Labs`,
    description: `Writing tagged #${opts.tag} from Codantrix Labs.`,
    canonical: `https://labs.codantrix.com/writing/tag/${opts.tag}/`,
  };

  const grid =
    opts.posts.length === 0
      ? `<div class="empty-state">No published writing under this tag yet.</div>`
      : `<div class="cards">${opts.posts.map((p) => renderCard(p, opts.r2PublicUrl)).join("")}</div>`;

  return `${head(meta)}
${logoSprite()}
${sysbar()}
${nav()}

<section class="writing-hero"><div class="wrap">
  <div class="hero-eyebrow">
    <span class="num">Tag</span>
    <span class="bar"></span>
    <span class="name">${escapeHtml(opts.totalCount + (opts.totalCount === 1 ? " post" : " posts"))}</span>
  </div>
  <h1 class="hero-title">#${escapeHtml(opts.tag)}<span class="muted">.</span></h1>
  <p class="hero-lede">Posts tagged <strong>#${escapeHtml(opts.tag)}</strong>. <a href="/writing/" style="color:var(--accent);">All writing →</a></p>
</div></section>

<section class="writing-grid"><div class="wrap">
  ${grid}
</div></section>

${footer()}
${tail()}`;
}

export function renderWritingNotFound(): string {
  const meta: PageMeta = {
    title: "Not found — Writing — Codantrix Labs",
    description: "That post couldn't be found.",
    canonical: "https://labs.codantrix.com/writing/",
    noindex: true,
  };
  return `${head(meta)}
${logoSprite()}
${sysbar()}
${nav()}

<section class="writing-hero"><div class="wrap">
  <div class="hero-eyebrow"><span class="num">404</span><span class="bar"></span><span class="name">Not found</span></div>
  <h1 class="hero-title">No post here<span class="muted">.</span></h1>
  <p class="hero-lede">That URL doesn't match a published post. <a href="/writing/" style="color:var(--accent);">Back to writing →</a></p>
</div></section>

${footer()}
${tail()}`;
}

// ============ Helpers ============

function formatDate(ms: number): string {
  if (!ms) return "";
  const d = new Date(ms);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[d.getUTCMonth()];
  return `${month} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}
