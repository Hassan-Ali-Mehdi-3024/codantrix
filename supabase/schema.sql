-- team_members
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- services
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  overview TEXT,
  use_cases TEXT[],
  process JSONB,
  icon TEXT,
  service_order INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- case_studies
CREATE TABLE case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  industry TEXT,
  client_name TEXT,
  client_location TEXT,
  problem TEXT,
  solution TEXT,
  results JSONB,
  technologies TEXT[],
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  duration TEXT,
  team_size TEXT,
  unique_approach TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- inquiries (Lead Capture)
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  role TEXT,
  message TEXT,
  service_interested TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- settings
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE,
  value JSONB,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public Read" ON services FOR SELECT USING (true);
CREATE POLICY "Public Read" ON case_studies FOR SELECT USING (true);
CREATE POLICY "Public Read" ON settings FOR SELECT USING (true);

CREATE POLICY "Public Insert" ON inquiries FOR INSERT WITH CHECK (true);
