-- Phase 3: Client Portal & Platform Features Schema

-- 1. Organizations (Companies)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  logo_url TEXT,
  subscription_tier TEXT DEFAULT 'starter', -- starter, professional, enterprise
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. User Profiles (Extended from Auth)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id),
  first_name TEXT,
  last_name TEXT,
  role TEXT DEFAULT 'viewer', -- admin, manager, collaborator, viewer
  phone TEXT,
  profile_photo_url TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  service_type TEXT, -- ai_solutions, computer_vision, automation
  status TEXT DEFAULT 'not_started', -- not_started, in_progress, completed, on_hold
  description TEXT,
  progress_percentage INT DEFAULT 0,
  start_date DATE,
  expected_end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Documents
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT, -- case_study, implementation_guide, contract, api_spec
  file_url TEXT NOT NULL,
  file_size INT,
  uploaded_by UUID REFERENCES auth.users(id),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Support Tickets
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium', -- urgent, high, medium, low
  status TEXT DEFAULT 'open', -- open, in_progress, resolved, closed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS POLICIES (Example: Users can only see their own organization's data)
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Note: Specific policies for SELECT/INSERT will be added based on the auth provider integration.
