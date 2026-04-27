/**
 * HTML templates for /admin/writing/* admin UI.
 *
 * Utility-first styling — these surfaces are not customer-facing. Layout is
 * a simple two-column shell with a sidebar listing posts and a main content
 * area for the editor. No framework; one inline <script> handles save +
 * preview + image upload via fetch.
 *
 * All dynamic data is HTML-escaped at the template boundary. The body_md
 * preview is rendered server-side through worker/lib/markdown.ts (whitelist
 * tokenizer) so we can trust it inside innerHTML.
 */

import { escapeHtml } from "./markdown";
import type { PostListItem, PostWithTags } from "./posts";

// ============ Shared shell ============

function shell(opts: {
  title: string;
  email: string;
  pendingComments?: number;
  body: string;
  bodyClass?: string;
  /** Inline script appended just before </body>. */
  scripts?: string;
}): string {
  const pending = opts.pendingComments ?? 0;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${escapeHtml(opts.title)} · Codantrix admin</title>
<style>
  :root{--paper:#f5f4ee;--ink:#1a1a1a;--muted:#6b6b6b;--accent:#c2410c;--line:rgba(26,26,26,.12);--paper-2:#fff;--err:#b91c1c;}
  *{box-sizing:border-box}
  html,body{margin:0;padding:0}
  body{font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif;background:var(--paper);color:var(--ink);font-size:14px;line-height:1.5;-webkit-font-smoothing:antialiased}
  a{color:var(--ink)}
  .topbar{display:flex;align-items:center;gap:24px;padding:12px 24px;background:var(--paper-2);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:10}
  .topbar .brand{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:500}
  .topbar nav{display:flex;gap:18px}
  .topbar nav a{font-size:13px;text-decoration:none;color:var(--ink);padding:6px 0;border-bottom:2px solid transparent}
  .topbar nav a.active{border-bottom-color:var(--accent)}
  .topbar nav a .badge{display:inline-block;margin-left:6px;padding:1px 6px;background:var(--accent);color:var(--paper);border-radius:8px;font-size:11px;font-weight:600;line-height:1.4}
  .topbar .spacer{flex:1}
  .topbar .me{font-size:12px;color:var(--muted)}
  .topbar form{margin:0}
  .topbar button{padding:6px 12px;font-size:12px;background:transparent;border:1px solid var(--line);color:var(--ink);cursor:pointer;border-radius:2px;font-family:inherit}
  .topbar button:hover{background:var(--paper)}
  .layout{padding:24px;max-width:1200px;margin:0 auto}
  .row{display:flex;gap:18px;align-items:center;justify-content:space-between;margin-bottom:18px}
  h1{font-size:22px;line-height:1.25;margin:0;font-weight:600;letter-spacing:-.01em}
  .btn{display:inline-block;padding:9px 14px;background:var(--ink);color:var(--paper);text-decoration:none;border:0;border-radius:2px;font-size:13px;font-family:inherit;cursor:pointer;font-weight:500}
  .btn:hover{background:#2a2a2a}
  .btn--ghost{background:transparent;color:var(--ink);border:1px solid var(--line)}
  .btn--ghost:hover{background:var(--paper-2)}
  .btn--danger{background:transparent;color:var(--err);border:1px solid rgba(185,28,28,.3)}
  .btn--danger:hover{background:rgba(185,28,28,.05)}
  .table{width:100%;border-collapse:collapse;background:var(--paper-2);border:1px solid var(--line);border-radius:2px}
  .table th,.table td{text-align:left;padding:11px 14px;border-bottom:1px solid var(--line);vertical-align:middle}
  .table th{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:500}
  .table tr:last-child td{border-bottom:0}
  .table .row-actions{display:flex;gap:8px;justify-content:flex-end}
  .table form{margin:0;display:inline}
  .pill{display:inline-block;padding:2px 8px;font-size:11px;letter-spacing:.04em;text-transform:uppercase;border-radius:2px;font-weight:500}
  .pill--draft{background:rgba(107,107,107,.15);color:var(--muted)}
  .pill--published{background:rgba(194,65,12,.12);color:var(--accent)}
  .pill--pending{background:rgba(202,138,4,.12);color:#a16207}
  .pill--rejected{background:rgba(185,28,28,.1);color:var(--err)}
  .pill--approved{background:rgba(22,101,52,.12);color:#166534}
  .empty{padding:48px 24px;text-align:center;color:var(--muted);background:var(--paper-2);border:1px dashed var(--line);border-radius:2px}

  /* Editor */
  .editor{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:18px}
  @media (max-width:1000px){.editor{grid-template-columns:1fr}}
  .pane{background:var(--paper-2);border:1px solid var(--line);border-radius:2px;padding:18px}
  .field{margin-bottom:16px}
  .field label{display:block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:6px;font-weight:500}
  .field input[type="text"], .field textarea, .field select{width:100%;padding:10px 12px;background:var(--paper);border:1px solid var(--line);border-radius:2px;font-size:14px;font-family:inherit;color:var(--ink)}
  .field input[type="text"]:focus, .field textarea:focus, .field select:focus{outline:none;border-color:var(--ink)}
  .field textarea{min-height:240px;resize:vertical;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:13px;line-height:1.6}
  .field .hint{font-size:12px;color:var(--muted);margin-top:6px}
  .editor-toolbar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px}
  .editor-toolbar button{padding:6px 10px;font-size:12px;background:var(--paper);border:1px solid var(--line);color:var(--ink);cursor:pointer;border-radius:2px;font-family:inherit}
  .editor-toolbar button:hover{background:#ece8d6}
  .preview{font-size:14px;line-height:1.7;color:var(--ink);max-height:70vh;overflow:auto}
  .preview h1{font-size:24px;margin:18px 0 10px}
  .preview h2{font-size:19px;margin:18px 0 10px}
  .preview h3{font-size:16px;margin:18px 0 10px}
  .preview p{margin:0 0 14px}
  .preview pre{background:var(--paper);border:1px solid var(--line);padding:12px;border-radius:2px;overflow-x:auto;font-size:12px}
  .preview code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .preview blockquote{margin:0 0 14px;padding-left:14px;border-left:2px solid var(--accent);color:var(--ink)}
  .preview .callout{background:var(--paper);border-left:2px solid var(--accent);padding:10px 14px;margin:0 0 14px;border-radius:2px}
  .preview .callout--warning{border-left-color:#a16207;background:#faf6e8}
  .preview .pullquote blockquote{font-size:18px;line-height:1.4;font-weight:500;border-left:0;padding:8px 0;margin:0}
  .preview .pullquote .pullquote__source{font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em}
  .preview img{max-width:100%;height:auto}
  .preview .post-img--narrow img{max-width:540px}
  .preview a{color:var(--accent)}
  .preview .tag-link{background:rgba(194,65,12,.1);padding:1px 6px;border-radius:2px;text-decoration:none}
  .preview hr.post-hr{border:0;height:1px;background:var(--line);margin:24px 0}

  .actions-row{display:flex;gap:8px;align-items:center;margin-top:18px;flex-wrap:wrap}
  .actions-row .spacer{flex:1}
  .upload-zone{padding:14px;border:1px dashed var(--line);border-radius:2px;background:var(--paper);text-align:center;cursor:pointer;font-size:13px;color:var(--muted)}
  .upload-zone.drag{background:#ece8d6}
  .upload-zone input{display:none}
  .upload-result{font-size:12px;color:var(--muted);margin-top:6px;font-family:ui-monospace,Menlo,Consolas,monospace;word-break:break-all}
  .flash{padding:10px 14px;background:var(--paper-2);border-left:2px solid var(--accent);margin:0 0 18px;font-size:13px;border-radius:2px}
  .flash.error{border-left-color:var(--err)}
</style>
</head>
<body class="${escapeHtml(opts.bodyClass ?? "")}">
<header class="topbar">
  <span class="brand">Codantrix · admin</span>
  <nav>
    <a class="${opts.title.toLowerCase().includes("post") || opts.title.toLowerCase().includes("edit") || opts.title.toLowerCase().includes("new") ? "active" : ""}" href="/admin/writing/">Posts</a>
    <a class="${opts.title.toLowerCase().includes("comment") ? "active" : ""}" href="/admin/writing/comments/">Comments${pending > 0 ? `<span class="badge">${pending}</span>` : ""}</a>
  </nav>
  <span class="spacer"></span>
  <span class="me">${escapeHtml(opts.email)}</span>
  <form method="post" action="/api/auth/logout">
    <button type="submit">Sign out</button>
  </form>
</header>
<main class="layout">
${opts.body}
</main>
${opts.scripts ?? ""}
</body>
</html>`;
}

// ============ Pages ============

export function renderPostsListPage(opts: {
  email: string;
  posts: PostListItem[];
  pendingComments: number;
  flash?: { kind: "ok" | "error"; text: string };
}): string {
  const flash = opts.flash
    ? `<div class="flash ${opts.flash.kind === "error" ? "error" : ""}">${escapeHtml(opts.flash.text)}</div>`
    : "";
  const rows =
    opts.posts.length === 0
      ? `<div class="empty">No posts yet. <a href="/admin/writing/new">Create your first one →</a></div>`
      : `<table class="table">
  <thead><tr><th>Title</th><th>Status</th><th>Tags</th><th>Updated</th><th></th></tr></thead>
  <tbody>${opts.posts.map((p) => postsRow(p)).join("")}</tbody>
</table>`;

  return shell({
    title: "Posts",
    email: opts.email,
    pendingComments: opts.pendingComments,
    body: `${flash}
<div class="row">
  <h1>Posts</h1>
  <a class="btn" href="/admin/writing/new">New post</a>
</div>
${rows}`,
  });
}

function postsRow(p: PostListItem): string {
  const updated = formatDateShort(p.updated_at);
  const tags = p.tags.length > 0 ? p.tags.map((t) => `<span class="pill pill--draft">#${escapeHtml(t)}</span>`).join(" ") : `<span style="color:var(--muted)">—</span>`;
  const statusPill = p.status === "published"
    ? `<span class="pill pill--published">Published</span>`
    : `<span class="pill pill--draft">Draft</span>`;
  return `<tr>
  <td><strong>${escapeHtml(p.title)}</strong><br><span style="color:var(--muted);font-size:12px">/${escapeHtml(p.slug)}/</span></td>
  <td>${statusPill}</td>
  <td>${tags}</td>
  <td style="color:var(--muted)">${updated}</td>
  <td class="row-actions">
    <a class="btn btn--ghost" href="/admin/writing/edit/${escapeHtml(p.slug)}">Edit</a>
    <form method="post" action="/admin/writing/delete/${escapeHtml(p.slug)}" onsubmit="return confirm('Delete this post? This cannot be undone.')">
      <button class="btn btn--danger" type="submit">Delete</button>
    </form>
  </td>
</tr>`;
}

export function renderEditorPage(opts: {
  email: string;
  pendingComments: number;
  mode: "new" | "edit";
  post?: PostWithTags;
  flash?: { kind: "ok" | "error"; text: string };
}): string {
  const isEdit = opts.mode === "edit";
  const post = opts.post;
  const slug = post?.slug ?? "";
  const title = post?.title ?? "";
  const excerpt = post?.excerpt ?? "";
  const body = post?.body_md ?? "";
  const tags = (post?.tags ?? []).join(", ");
  const status = post?.status ?? "draft";
  const coverKey = post?.cover_image_key ?? "";
  const coverAlt = post?.cover_alt ?? "";

  const action = isEdit ? `/admin/writing/edit/${escapeHtml(slug)}` : `/admin/writing/new`;

  const flash = opts.flash
    ? `<div class="flash ${opts.flash.kind === "error" ? "error" : ""}">${escapeHtml(opts.flash.text)}</div>`
    : "";

  const pageTitle = isEdit ? `Edit · ${title}` : "New post";
  return shell({
    title: pageTitle,
    email: opts.email,
    pendingComments: opts.pendingComments,
    body: `${flash}
<div class="row">
  <h1>${escapeHtml(pageTitle)}</h1>
  <a class="btn btn--ghost" href="/admin/writing/">← All posts</a>
</div>

<form method="post" action="${action}" id="post-form" autocomplete="off">
  <div class="editor">
    <section class="pane">
      <div class="field">
        <label for="f-title">Title</label>
        <input id="f-title" name="title" type="text" required maxlength="200" value="${escapeHtml(title)}">
      </div>
      <div class="field">
        <label for="f-slug">Slug</label>
        <input id="f-slug" name="slug" type="text" required maxlength="80" value="${escapeHtml(slug)}" placeholder="kebab-case-from-title">
        <div class="hint">Lowercase letters, numbers, hyphens. Will be normalized on save.</div>
      </div>
      <div class="field">
        <label for="f-excerpt">Excerpt</label>
        <input id="f-excerpt" name="excerpt" type="text" maxlength="280" value="${escapeHtml(excerpt)}" placeholder="One-line teaser shown in the index">
      </div>
      <div class="field">
        <label for="f-tags">Tags</label>
        <input id="f-tags" name="tags" type="text" maxlength="300" value="${escapeHtml(tags)}" placeholder="agentic-systems, lessons">
        <div class="hint">Comma-separated. Lowercase-kebab.</div>
      </div>
      <div class="field">
        <label>Cover image (1600 × 900, JPEG/WebP/PNG, ≤ 500 KB)</label>
        <label class="upload-zone" id="upload-zone">
          <input type="file" id="cover-file" accept="image/jpeg,image/png,image/webp">
          <span id="upload-zone-text">Click or drop an image here</span>
        </label>
        <div class="upload-result" id="upload-result">${coverKey ? `Current key: ${escapeHtml(coverKey)}` : ""}</div>
        <input type="hidden" id="f-cover-key" name="cover_image_key" value="${escapeHtml(coverKey)}">
        <input type="text" name="cover_alt" maxlength="200" value="${escapeHtml(coverAlt)}" placeholder="Alt text for the cover image" style="margin-top:8px">
      </div>

      <div class="editor-toolbar">
        <button type="button" data-md="**" data-md-suffix="**">Bold</button>
        <button type="button" data-md="*"  data-md-suffix="*">Italic</button>
        <button type="button" data-md="\`" data-md-suffix="\`">Code</button>
        <button type="button" data-block="\n\n## ">H2</button>
        <button type="button" data-block="\n\n> ">Quote</button>
        <button type="button" data-block="\n\n:::note\n">:::note Note ::: </button>
      </div>

      <div class="field">
        <label for="f-body">Body (markdown-plus)</label>
        <textarea id="f-body" name="body_md" required>${escapeHtml(body)}</textarea>
      </div>

      <div class="field">
        <label for="f-status">Status</label>
        <select id="f-status" name="status">
          <option value="draft" ${status === "draft" ? "selected" : ""}>Draft</option>
          <option value="published" ${status === "published" ? "selected" : ""}>Published</option>
        </select>
      </div>

      <div class="actions-row">
        <button class="btn" type="submit">${isEdit ? "Save" : "Create"}</button>
        <button class="btn btn--ghost" type="button" id="preview-btn">Refresh preview</button>
        <span class="spacer"></span>
        ${isEdit ? `<a class="btn btn--ghost" target="_blank" href="/writing/${escapeHtml(slug)}/">View →</a>` : ""}
      </div>
    </section>

    <section class="pane">
      <h3 style="margin-top:0">Preview</h3>
      <div class="preview" id="preview"><p style="color:var(--muted)">Click "Refresh preview" to render markdown.</p></div>
    </section>
  </div>
</form>`,
    scripts: editorScript(),
  });
}

function editorScript(): string {
  return `<script>
(function(){
  'use strict';

  // ---- Slug auto-generation while title is fresh (only when slug empty) ----
  var titleEl = document.getElementById('f-title');
  var slugEl = document.getElementById('f-slug');
  var slugManuallyTouched = slugEl.value.length > 0;
  slugEl.addEventListener('input', function(){ slugManuallyTouched = true; });
  titleEl.addEventListener('input', function(){
    if (slugManuallyTouched) return;
    slugEl.value = (titleEl.value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0,80);
  });

  // ---- Toolbar buttons wrap selection ----
  var bodyEl = document.getElementById('f-body');
  document.querySelectorAll('.editor-toolbar button').forEach(function(btn){
    btn.addEventListener('click', function(){
      var pre = btn.dataset.md;
      var suf = btn.dataset.mdSuffix;
      var block = btn.dataset.block;
      var s = bodyEl.selectionStart, e = bodyEl.selectionEnd;
      var v = bodyEl.value;
      if (block){
        bodyEl.value = v.slice(0,s) + block + v.slice(e);
        bodyEl.selectionStart = bodyEl.selectionEnd = s + block.length;
      } else if (pre && suf){
        bodyEl.value = v.slice(0,s) + pre + v.slice(s,e) + suf + v.slice(e);
        bodyEl.selectionStart = s + pre.length;
        bodyEl.selectionEnd = e + pre.length;
      }
      bodyEl.focus();
    });
  });

  // ---- Preview via /api/writing/preview ----
  var previewEl = document.getElementById('preview');
  var previewBtn = document.getElementById('preview-btn');
  function refreshPreview(){
    previewBtn.disabled = true;
    previewBtn.textContent = 'Rendering…';
    fetch('/api/writing/preview', {
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify({ body_md: bodyEl.value })
    }).then(function(r){ return r.json(); })
    .then(function(j){
      previewEl.innerHTML = j && j.ok ? j.html : '<p style="color:var(--err)">Preview failed.</p>';
    }).catch(function(){
      previewEl.innerHTML = '<p style="color:var(--err)">Preview error.</p>';
    }).then(function(){
      previewBtn.disabled = false;
      previewBtn.textContent = 'Refresh preview';
    });
  }
  previewBtn.addEventListener('click', refreshPreview);

  // ---- Image upload ----
  var fileInput = document.getElementById('cover-file');
  var zone = document.getElementById('upload-zone');
  var zoneText = document.getElementById('upload-zone-text');
  var resultEl = document.getElementById('upload-result');
  var keyEl = document.getElementById('f-cover-key');

  function uploadFile(file){
    if (!file) return;
    if (file.size > 500 * 1024){
      resultEl.textContent = 'Too large: ' + Math.round(file.size/1024) + ' KB. Max 500 KB.';
      resultEl.style.color = 'var(--err)';
      return;
    }
    zoneText.textContent = 'Uploading…';
    var fd = new FormData();
    fd.append('file', file);
    fetch('/api/writing/upload-image', { method: 'POST', body: fd })
      .then(function(r){ return r.json(); })
      .then(function(j){
        if (j && j.ok && j.key){
          keyEl.value = j.key;
          resultEl.textContent = 'Stored as: ' + j.key + (j.url ? '  ('+ j.url +')' : '');
          resultEl.style.color = 'var(--muted)';
          zoneText.textContent = 'Replace image';
        } else {
          resultEl.textContent = 'Upload failed: ' + ((j && j.error) || 'unknown');
          resultEl.style.color = 'var(--err)';
          zoneText.textContent = 'Click or drop an image here';
        }
      })
      .catch(function(){
        resultEl.textContent = 'Upload network error.';
        resultEl.style.color = 'var(--err)';
        zoneText.textContent = 'Click or drop an image here';
      });
  }

  fileInput.addEventListener('change', function(){ uploadFile(fileInput.files[0]); });
  zone.addEventListener('dragover', function(e){ e.preventDefault(); zone.classList.add('drag'); });
  zone.addEventListener('dragleave', function(){ zone.classList.remove('drag'); });
  zone.addEventListener('drop', function(e){
    e.preventDefault(); zone.classList.remove('drag');
    var f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) uploadFile(f);
  });
})();
</script>`;
}

export function renderCommentsPage(opts: {
  email: string;
  pendingComments: number;
  flash?: { kind: "ok" | "error"; text: string };
  comments: Array<{
    id: number;
    post_slug: string;
    post_title: string;
    author_name: string;
    author_email: string;
    body: string;
    status: "pending_unverified" | "pending" | "approved" | "rejected";
    created_at: number;
  }>;
  filter: "pending" | "approved" | "rejected" | "all";
}): string {
  const flash = opts.flash
    ? `<div class="flash ${opts.flash.kind === "error" ? "error" : ""}">${escapeHtml(opts.flash.text)}</div>`
    : "";

  const filterLinks = (["pending", "approved", "rejected", "all"] as const)
    .map(
      (f) =>
        `<a class="btn btn--ghost" style="${opts.filter === f ? "background:var(--ink);color:var(--paper);" : ""}" href="/admin/writing/comments/?filter=${f}">${(f.charAt(0).toUpperCase() + f.slice(1))}</a>`
    )
    .join(" ");

  const items =
    opts.comments.length === 0
      ? `<div class="empty">No comments in this view.</div>`
      : opts.comments.map(commentRow).join("");

  return shell({
    title: "Comments",
    email: opts.email,
    pendingComments: opts.pendingComments,
    body: `${flash}
<div class="row">
  <h1>Comments</h1>
  <div style="display:flex;gap:8px;flex-wrap:wrap">${filterLinks}</div>
</div>
${items}`,
  });
}

function commentRow(c: {
  id: number;
  post_slug: string;
  post_title: string;
  author_name: string;
  author_email: string;
  body: string;
  status: "pending_unverified" | "pending" | "approved" | "rejected";
  created_at: number;
}): string {
  const statusPill =
    c.status === "approved"
      ? `<span class="pill pill--approved">Approved</span>`
      : c.status === "rejected"
      ? `<span class="pill pill--rejected">Rejected</span>`
      : c.status === "pending_unverified"
      ? `<span class="pill pill--draft">Email unverified</span>`
      : `<span class="pill pill--pending">Pending</span>`;
  return `<div class="pane" style="margin-bottom:14px">
  <div style="display:flex;justify-content:space-between;gap:18px;flex-wrap:wrap;margin-bottom:10px">
    <div>
      <strong>${escapeHtml(c.author_name)}</strong>
      <span style="color:var(--muted);font-size:12px"> · ${escapeHtml(c.author_email)} · on
        <a href="/writing/${escapeHtml(c.post_slug)}/" target="_blank">${escapeHtml(c.post_title)}</a>
      </span>
    </div>
    <div style="display:flex;gap:8px;align-items:center">${statusPill}<span style="color:var(--muted);font-size:12px">${formatDateShort(c.created_at)}</span></div>
  </div>
  <p style="margin:0 0 12px;white-space:pre-wrap">${escapeHtml(c.body)}</p>
  <div class="row-actions" style="justify-content:flex-end;gap:8px;display:flex">
    ${c.status !== "approved" ? `<form method="post" action="/admin/writing/comments/${c.id}/approve" style="display:inline"><button class="btn" type="submit">Approve</button></form>` : ""}
    ${c.status !== "rejected" ? `<form method="post" action="/admin/writing/comments/${c.id}/reject" style="display:inline"><button class="btn btn--ghost" type="submit">Reject</button></form>` : ""}
    <form method="post" action="/admin/writing/comments/${c.id}/delete" style="display:inline" onsubmit="return confirm('Delete this comment permanently?')"><button class="btn btn--danger" type="submit">Delete</button></form>
  </div>
</div>`;
}

// ============ Helpers ============

function formatDateShort(ms: number): string {
  if (!ms) return "—";
  const d = new Date(ms);
  const month = d.toLocaleString("en", { month: "short", timeZone: "UTC" });
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}
