# Cloudflare Deployment (WAF + Access)

## WAF: Lock Down /admin
1. Cloudflare Dashboard → Security → WAF → Custom rules → Create rule.
2. Expression (example):
   - `(http.request.uri.path starts_with "/admin") and (ip.src ne <YOUR_IP>)`
3. Action: Block (or Managed Challenge).
4. Repeat for `/team` if you want IP allowlisting there too:
   - `(http.request.uri.path starts_with "/team") and (ip.src ne <YOUR_IP>)`

## Cloudflare Access: Put Login Wall On /admin And /team
1. Cloudflare Zero Trust Dashboard → Access → Applications → Add an application.
2. Application type: Self-hosted.
3. Application domain: your production hostname (for example `codantrix.com`).
4. Path rules:
   - `/admin*`
   - `/team*`
5. Policies:
   - Allow → Include → add your identity provider (Google) or One-time PIN (OTP).
6. Save and validate:
   - Unauthenticated requests to `/admin` and `/team` should be blocked by Access before your Next.js app runs.

## Notes
- Access (identity) and WAF (network rules) are complementary. A common setup is:
  - Access for `/admin*` and `/team*`
  - WAF IP allowlist for `/admin*` as an extra safety layer
- The app routes are designed so `/team` is internal, while the public marketing team page is `/our-team`.

## Environment Variables / Secrets
Set these in Cloudflare (Workers → Settings → Variables) or via Wrangler secrets for the deployed Worker.

**Required for the agent**
- `GROQ_API_KEY` (secret)

**Optional for the agent**
- `GROQ_MODEL` (defaults to `llama-3.3-70b-versatile`)

**If you want inquiry emails**
- `RESEND_API_KEY` (secret)
- `ADMIN_EMAIL` (optional; defaults to `hello@codantrix.com`)
- `EMAIL_PROVIDER` (optional; `resend` or `zoho`)

**Client portal setup**
- `SETUP_KEY` (secret) is required to create the first client via `/api/admin/create-client` (header `x-setup-key`).

## D1 Migrations (Required Once Per Environment)
Bindings give you `env.DB`, but your tables only exist after migrations are applied.

With the configured D1 name `codantrix-db`:
- Local: `wrangler d1 migrations apply codantrix-db --local`
- Remote (production): `wrangler d1 migrations apply codantrix-db --remote`

## Local Preview (Workers Runtime)
- Use `npm run preview` to run the app in the Workers runtime via Wrangler.
- OpenNext and Wrangler can be unreliable on Windows. If preview fails locally on Windows, run the same command under WSL or in Linux CI.

## Zoho Email Note
- Cloudflare Workers cannot use raw SMTP (no TCP sockets), so an “email + password” SMTP login won’t work here.
- If you want Zoho, use Zoho’s Mail API / ZeptoMail via HTTPS with OAuth/API keys and keep those as Worker secrets.
- Configure Zoho Mail API domains for your region if needed (examples in `.env.example`).
