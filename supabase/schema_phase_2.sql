-- Phase 2: Credibility & Thought Leadership Schema

-- 1. Enhance team_members
ALTER TABLE team_members ADD COLUMN linkedin_url TEXT;
ALTER TABLE team_members ADD COLUMN expertise TEXT[];
ALTER TABLE team_members ADD COLUMN social_handles JSONB;
ALTER TABLE team_members ADD COLUMN published_articles INT DEFAULT 0;

-- 2. Testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_role TEXT,
  client_company TEXT,
  client_logo_url TEXT,
  quote TEXT NOT NULL,
  video_url TEXT,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Blog Posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  author_id UUID REFERENCES team_members(id),
  category TEXT,
  featured BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  image_url TEXT,
  read_time_minutes INT,
  seo_keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Lead Magnets / Resources
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL, -- whitepaper, checklist, template, calculator
  file_url TEXT,
  description TEXT,
  lead_capture BOOLEAN DEFAULT TRUE,
  downloads INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Email Subscribers (Lead Nurturing)
CREATE TABLE email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  company TEXT,
  segment TEXT DEFAULT 'newsletter', -- leads, newsletter, customers
  source TEXT, -- form, newsletter, download
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- 6. Analytics Events (Privacy-conscious tracking)
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL, -- page_view, cta_click, download
  user_id TEXT, -- anonymous session id
  page_url TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB
);

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public Read Testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public Read Blog Posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public Read Resources" ON resources FOR SELECT USING (true);

-- Lead Capture Policies (Public Insert)
CREATE POLICY "Public Insert Subscribers" ON email_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Analytics" ON analytics_events FOR INSERT WITH CHECK (true);
