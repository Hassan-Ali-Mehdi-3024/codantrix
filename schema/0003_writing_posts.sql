-- Codantrix Labs — D1 schema, migration 0003
-- /writing system: posts + post_tags. Phase W1 of the blog buildout.
-- Apply: wrangler d1 execute codantrix-labs-db --remote --file=./schema/0003_writing_posts.sql
-- Local: wrangler d1 execute codantrix-labs-db --local  --file=./schema/0003_writing_posts.sql

-- posts: one row per blog post. body_md is the markdown source; the rendered
-- HTML is generated on read (with optional CF cache in front). cover_image_key
-- references an R2 object in bucket codantrix-writing-images. published_at is
-- NULL for drafts; status = 'published' implies a non-null published_at.
CREATE TABLE IF NOT EXISTS posts (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  slug              TEXT    NOT NULL UNIQUE,                  -- kebab-case, URL segment
  title             TEXT    NOT NULL,
  excerpt           TEXT,
  cover_image_key   TEXT,                                     -- R2 key e.g. 'cover-12-abc.webp'
  cover_alt         TEXT,
  body_md           TEXT    NOT NULL,
  status            TEXT    NOT NULL DEFAULT 'draft',         -- 'draft' | 'published'
  published_at      INTEGER,                                  -- unix ms; NULL for drafts
  created_at        INTEGER NOT NULL,                         -- unix ms
  updated_at        INTEGER NOT NULL,                         -- unix ms
  reading_time_min  INTEGER,                                  -- ceil(word_count / 220)
  word_count        INTEGER
);

-- post_tags: tag membership join. Tags are free-form strings, normalized to
-- lowercase-kebab on save. ON DELETE CASCADE keeps junk rows from accumulating
-- when a post is deleted from the admin UI.
CREATE TABLE IF NOT EXISTS post_tags (
  post_id  INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag      TEXT    NOT NULL,
  PRIMARY KEY (post_id, tag)
);

CREATE INDEX IF NOT EXISTS idx_posts_status_pub  ON posts(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug        ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_post_tags_tag     ON post_tags(tag);
