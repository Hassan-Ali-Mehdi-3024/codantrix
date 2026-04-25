-- Codantrix Labs — D1 schema, migration 0001
-- Apply: wrangler d1 execute codantrix-labs-db --remote --file=./schema/0001_init.sql
-- Local: wrangler d1 execute codantrix-labs-db --local  --file=./schema/0001_init.sql

-- conversations: one row per chat session on /book.
-- ip_country comes from the cf-ipcountry header, never the raw IP.
-- ended_at and message_count are filled on session close (best-effort).
CREATE TABLE IF NOT EXISTS conversations (
  id              TEXT    PRIMARY KEY,                  -- uuid
  created_at      INTEGER NOT NULL,                     -- unix ms
  page            TEXT    NOT NULL,                     -- e.g. '/book/'
  ip_country      TEXT,                                 -- 2-letter from cf-ipcountry
  user_agent      TEXT,
  ended_at        INTEGER,
  message_count   INTEGER NOT NULL DEFAULT 0
);

-- messages: one row per turn (user, assistant, or tool result).
-- tool_name + tool_args are NULL for role IN ('user','assistant').
CREATE TABLE IF NOT EXISTS messages (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id   TEXT    NOT NULL REFERENCES conversations(id),
  role              TEXT    NOT NULL,                   -- 'user' | 'assistant' | 'tool'
  content           TEXT    NOT NULL,
  tool_name         TEXT,
  tool_args         TEXT,                               -- JSON
  created_at        INTEGER NOT NULL
);

-- leads: visitor opted into email follow-up (separate from booking via Calendly).
-- conversation_id is nullable so the form works for visitors who never opened
-- the chat assistant.
CREATE TABLE IF NOT EXISTS leads (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id   TEXT    REFERENCES conversations(id),
  email             TEXT    NOT NULL,
  name              TEXT,
  context           TEXT,
  created_at        INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_messages_conv        ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created ON conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_created         ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email           ON leads(email);
