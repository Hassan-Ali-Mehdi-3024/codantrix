-- Codantrix Labs — D1 schema, migration 0004
-- Magic-link auth for /admin/writing. Passwordless: only email addresses in
-- admin_emails can request a sign-in link; tokens are single-use, 15-min TTL;
-- sessions are 30-day rolling cookies.
-- Apply: wrangler d1 execute codantrix-labs-db --remote --file=./schema/0004_writing_auth.sql
-- Local: wrangler d1 execute codantrix-labs-db --local  --file=./schema/0004_writing_auth.sql

-- admin_emails: allowlist. /api/auth/request silently ignores submissions for
-- emails NOT in this table (avoids leaking which addresses are admins via
-- timing/error-shape).
CREATE TABLE IF NOT EXISTS admin_emails (
  email      TEXT    PRIMARY KEY,
  added_at   INTEGER NOT NULL                 -- unix ms
);

-- magic_link_tokens: opaque 32-byte hex tokens emailed to admin candidates.
-- Single-use (consumed_at gets stamped on /api/auth/verify); 15-min TTL.
-- request_ip is stored only as cf-ipcountry, never the raw IP.
CREATE TABLE IF NOT EXISTS magic_link_tokens (
  token        TEXT    PRIMARY KEY,           -- 64 hex chars (32 bytes)
  email        TEXT    NOT NULL REFERENCES admin_emails(email),
  expires_at   INTEGER NOT NULL,              -- unix ms
  consumed_at  INTEGER,                       -- unix ms; NULL until verified
  created_at   INTEGER NOT NULL,
  request_ip   TEXT                           -- 2-letter cf-ipcountry
);

-- admin_sessions: cookie-backed sessions. session_id is the cookie value.
-- 30-day rolling expiry: every authenticated request bumps last_seen_at and
-- (if within 7 days of expiry) extends expires_at.
CREATE TABLE IF NOT EXISTS admin_sessions (
  session_id    TEXT    PRIMARY KEY,          -- 64 hex chars (32 bytes)
  email         TEXT    NOT NULL,
  created_at    INTEGER NOT NULL,
  last_seen_at  INTEGER NOT NULL,
  expires_at    INTEGER NOT NULL,             -- unix ms; rolling
  user_agent    TEXT,
  ip_country    TEXT
);

CREATE INDEX IF NOT EXISTS idx_magic_tokens_email   ON magic_link_tokens(email);
CREATE INDEX IF NOT EXISTS idx_magic_tokens_expires ON magic_link_tokens(expires_at);
CREATE INDEX IF NOT EXISTS idx_sessions_expires     ON admin_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_sessions_email       ON admin_sessions(email);

-- Seed: Hassan as the only admin. INSERT OR IGNORE so re-running is idempotent.
INSERT OR IGNORE INTO admin_emails (email, added_at)
VALUES ('contact@codantrix.com', strftime('%s', 'now') * 1000);
