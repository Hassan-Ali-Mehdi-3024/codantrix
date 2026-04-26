-- Codantrix Labs — D1 schema, migration 0002
-- Adds per-IP rate-limit tracking for /api/chat and /api/lead.
-- Apply: wrangler d1 execute codantrix-labs-db --remote --file=./schema/0002_rate_limit.sql
-- Local: wrangler d1 execute codantrix-labs-db --local  --file=./schema/0002_rate_limit.sql

-- rate_limit: simple per-(key, minute-bucket) counter.
-- key is composite: '{route}:{ip}', e.g. 'chat:1.2.3.4'.
-- bucket is floor(unix_seconds / 60); we keep one row per (key, bucket).
-- count tracks requests in that minute. Old buckets are pruned opportunistically
-- on each insert (see worker/lib/db.ts).
CREATE TABLE IF NOT EXISTS rate_limit (
  key      TEXT    NOT NULL,
  bucket   INTEGER NOT NULL,                     -- floor(unix_s / 60)
  count    INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (key, bucket)
);

CREATE INDEX IF NOT EXISTS idx_rate_limit_bucket ON rate_limit(bucket);
