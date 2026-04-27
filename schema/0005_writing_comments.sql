-- Codantrix Labs — D1 schema, migration 0005
-- /writing comments + commenter email-verification cache.
-- Apply: wrangler d1 execute codantrix-labs-db --remote --file=./schema/0005_writing_comments.sql
-- Local: wrangler d1 execute codantrix-labs-db --local  --file=./schema/0005_writing_comments.sql

-- comments: name + email + body, tied to a post. Email is collected for
-- verification + moderation contact only; never displayed publicly.
-- status flow: pending_unverified → pending → approved | rejected.
--   pending_unverified: comment was submitted by a fresh email address; a
--                       magic-link verification email was sent. Waiting on click.
--   pending          : email verified, waiting on Hassan's moderation.
--   approved         : visible publicly under the post.
--   rejected         : kept in DB for audit but never shown.
CREATE TABLE IF NOT EXISTS comments (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id       INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  parent_id     INTEGER REFERENCES comments(id) ON DELETE CASCADE,   -- null = top-level
  author_name   TEXT    NOT NULL,
  author_email  TEXT    NOT NULL,                                    -- never displayed
  body          TEXT    NOT NULL,
  status        TEXT    NOT NULL DEFAULT 'pending_unverified',
                                          -- 'pending_unverified' | 'pending' | 'approved' | 'rejected'
  created_at    INTEGER NOT NULL,
  approved_at   INTEGER,
  ip_country    TEXT,
  user_agent    TEXT
);

-- verified_emails: once an email has been verified once via magic-link
-- comment confirmation, subsequent comments from the same address skip the
-- verification step for 90 days.
CREATE TABLE IF NOT EXISTS verified_emails (
  email        TEXT    PRIMARY KEY,
  verified_at  INTEGER NOT NULL,
  expires_at   INTEGER NOT NULL                                      -- now + 90 days
);

-- comment_verify_tokens: separate from auth magic-link tokens (different
-- audience, different scope). Each token corresponds to ONE pending_unverified
-- comment id. 24-hour TTL (longer than admin link because commenters may not
-- be at their email immediately).
CREATE TABLE IF NOT EXISTS comment_verify_tokens (
  token        TEXT    PRIMARY KEY,                                  -- 64 hex chars
  comment_id   INTEGER NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  email        TEXT    NOT NULL,
  expires_at   INTEGER NOT NULL,
  consumed_at  INTEGER,
  created_at   INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_comments_post_status      ON comments(post_id, status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_status_created   ON comments(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_verified_emails_expires   ON verified_emails(expires_at);
CREATE INDEX IF NOT EXISTS idx_comment_tokens_comment    ON comment_verify_tokens(comment_id);
CREATE INDEX IF NOT EXISTS idx_comment_tokens_expires    ON comment_verify_tokens(expires_at);
