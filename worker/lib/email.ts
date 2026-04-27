/**
 * Resend client wrapper. Sends transactional email via api.resend.com.
 *
 * Used for:
 *   - magic-link sign-in for /admin/writing (Phase W1)
 *   - comment-email verification (Phase W4)
 *
 * Resend free tier: 3K/month, 100/day. More than enough for our volume —
 * a handful of admin sign-ins per week + occasional commenter verifications.
 *
 * Sender: noreply@codantrix.com (DNS verified per project_writing_system_spec.md).
 * Reply-to: contact@codantrix.com so any auto-replies route to the inbox.
 */

const RESEND_API = "https://api.resend.com/emails";

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;          // plaintext fallback (required by Resend for deliverability)
}

export interface SendEmailResult {
  ok: boolean;
  id?: string;           // Resend message id
  error?: string;
  status?: number;
}

/**
 * Send an email via Resend. Caller supplies html + text; we attach the
 * standard sender/reply-to. Returns ok=false (with error string) on any
 * non-200 — caller decides whether to surface or log silently.
 */
export async function sendEmail(
  apiKey: string,
  message: EmailMessage
): Promise<SendEmailResult> {
  const body = {
    from: "Codantrix Labs <noreply@codantrix.com>",
    reply_to: "contact@codantrix.com",
    to: [message.to],
    subject: message.subject,
    html: message.html,
    text: message.text,
  };

  let res: Response;
  try {
    res = await fetch(RESEND_API, {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    return { ok: false, error: `network: ${(e as Error).message}` };
  }

  // Resend returns 200 with { id } on success, 4xx/5xx with { message } on error.
  let json: unknown = null;
  try {
    json = await res.json();
  } catch {
    // empty body is acceptable on some 4xx — fall through
  }

  if (res.ok) {
    const id = typeof json === "object" && json && "id" in json ? String((json as { id: unknown }).id) : undefined;
    return { ok: true, id, status: res.status };
  }

  const error =
    typeof json === "object" && json && "message" in json
      ? String((json as { message: unknown }).message)
      : `http ${res.status}`;
  return { ok: false, error, status: res.status };
}

// ============ Templates ============

/**
 * Build the magic-link sign-in email. Plain wording — no marketing, no logo
 * (yet), no tracking pixels. Link is single-use, 15-min TTL on server side.
 */
export function buildMagicLinkEmail(opts: {
  toEmail: string;
  signInUrl: string;
  ttlMinutes: number;
  requestIpCountry?: string | null;
}): EmailMessage {
  const { toEmail, signInUrl, ttlMinutes, requestIpCountry } = opts;
  const safeUrl = signInUrl;          // built server-side, already absolute
  const ttl = `${ttlMinutes} minute${ttlMinutes === 1 ? "" : "s"}`;
  const fromCountry = requestIpCountry ? ` from ${requestIpCountry}` : "";

  const text = [
    `Sign in to Codantrix Labs admin.`,
    ``,
    `Click the link below within ${ttl} to sign in:`,
    safeUrl,
    ``,
    `If you didn't request this${fromCountry}, ignore this email — no account action`,
    `was taken. The link is single-use and will expire automatically.`,
    ``,
    `— Codantrix Labs`,
  ].join("\n");

  // Inline-styled HTML — many clients strip <style>. Keep it monochrome and
  // boring on purpose; this is auth, not marketing.
  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#f5f4ee;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Helvetica,Arial,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:48px 24px;color:#1a1a1a;">
    <p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b6b6b;margin:0 0 24px;">Codantrix Labs admin</p>
    <h1 style="font-size:24px;line-height:1.25;font-weight:600;margin:0 0 16px;">Sign in</h1>
    <p style="font-size:15px;line-height:1.55;margin:0 0 24px;">Click the button below within ${ttl} to sign in. The link is single-use.</p>
    <p style="margin:0 0 32px;">
      <a href="${safeUrl}" style="display:inline-block;padding:14px 22px;background:#1a1a1a;color:#fafaf6;text-decoration:none;font-size:14px;border-radius:2px;">Sign in to admin</a>
    </p>
    <p style="font-size:13px;line-height:1.55;color:#6b6b6b;margin:0 0 8px;">Or paste this URL into your browser:</p>
    <p style="font-size:12px;line-height:1.5;word-break:break-all;color:#3a3a3a;margin:0 0 32px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;">${safeUrl}</p>
    <p style="font-size:12px;line-height:1.55;color:#6b6b6b;margin:0;">If you didn't request this${fromCountry}, ignore this email. No account action was taken.</p>
  </div>
</body></html>`;

  return { to: toEmail, subject: "Sign in to Codantrix Labs admin", html, text };
}

/**
 * Build the comment-email-verification email. Sent the first time a fresh
 * email address posts a comment. Once clicked, the comment is promoted from
 * 'pending_unverified' to 'pending' (awaiting Hassan's moderation), and the
 * email is cached in verified_emails for 90 days.
 */
export function buildCommentVerifyEmail(opts: {
  toEmail: string;
  verifyUrl: string;
  postTitle: string;
  ttlHours: number;
}): EmailMessage {
  const { toEmail, verifyUrl, postTitle, ttlHours } = opts;
  const ttl = `${ttlHours} hour${ttlHours === 1 ? "" : "s"}`;

  const text = [
    `Confirm your comment on Codantrix Labs.`,
    ``,
    `You commented on: ${postTitle}`,
    ``,
    `Click the link below within ${ttl} to confirm your email and submit your`,
    `comment for moderation:`,
    verifyUrl,
    ``,
    `If you didn't post this, ignore this email — nothing was published.`,
    ``,
    `— Codantrix Labs`,
  ].join("\n");

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#f5f4ee;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Helvetica,Arial,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:48px 24px;color:#1a1a1a;">
    <p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b6b6b;margin:0 0 24px;">Codantrix Labs · Comment</p>
    <h1 style="font-size:22px;line-height:1.3;font-weight:600;margin:0 0 12px;">Confirm your comment</h1>
    <p style="font-size:14px;line-height:1.6;margin:0 0 8px;color:#3a3a3a;">You commented on:</p>
    <p style="font-size:15px;line-height:1.4;font-weight:600;margin:0 0 24px;">${escapeForEmail(postTitle)}</p>
    <p style="font-size:15px;line-height:1.55;margin:0 0 24px;">Click the button below within ${ttl} to confirm your email and submit your comment for moderation.</p>
    <p style="margin:0 0 32px;">
      <a href="${verifyUrl}" style="display:inline-block;padding:14px 22px;background:#1a1a1a;color:#fafaf6;text-decoration:none;font-size:14px;border-radius:2px;">Confirm comment</a>
    </p>
    <p style="font-size:13px;line-height:1.55;color:#6b6b6b;margin:0 0 8px;">Or paste this URL into your browser:</p>
    <p style="font-size:12px;line-height:1.5;word-break:break-all;color:#3a3a3a;margin:0 0 32px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;">${verifyUrl}</p>
    <p style="font-size:12px;line-height:1.55;color:#6b6b6b;margin:0;">If you didn't post this, ignore this email — nothing was published.</p>
  </div>
</body></html>`;

  return { to: toEmail, subject: "Confirm your comment on Codantrix Labs", html, text };
}

function escapeForEmail(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
