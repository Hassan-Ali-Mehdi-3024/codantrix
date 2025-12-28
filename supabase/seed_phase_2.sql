-- Phase 2 Seed Data

-- 1. Update Existing Team Member
UPDATE team_members 
SET 
  linkedin_url = 'https://linkedin.com/in/hassan-ali-mehdi',
  expertise = ARRAY['AI/ML Strategy', 'Computer Vision', 'Industrial Automation', 'Product Architecture'],
  social_handles = '{"twitter": "@hassan_ai", "github": "hassan-mehdi"}'
WHERE name = 'Hassan Ali Mehdi';

-- 2. Seed Initial Testimonials
INSERT INTO testimonials (client_name, client_role, client_company, quote, rating, featured) VALUES
('Sarah J.', 'Operations Director', 'Precision Dynamics Ltd.', 'Codantrix Labs didn''t just deliver a model; they delivered a factory-wide efficiency gain. Their ground-truth approach is exactly what heavy industry needs.', 5, true),
('Ahmed Khan', 'CTO', 'FastShip Logistics', 'The transition from manual sorting to their CV-powered system saved us 20% in operational costs within the first quarter.', 5, true),
('Elena M.', 'Data Strategy Lead', 'Global Retail Corp', 'Hassan and his team understand enterprise constraints. They focus on ROI and reliability rather than chasing academic hype.', 5, true);

-- 3. Seed Starter Blog Posts
INSERT INTO blog_posts (title, slug, content, excerpt, category, featured, published_at, read_time_minutes, seo_keywords) VALUES
('Manufacturing in 2024: Why AI-Ready Factories Win', 'manufacturing-ai-future-2024', 'Full content for the manufacturing deep dive...', 'Why modernizing your data floor is the prerequisite for AI-driven competitiveness.', 'Industry Deep-Dive', true, NOW(), 8, ARRAY['Manufacturing AI', 'Industrial 4.0', 'Factory Optimization']),
('The Accuracy Trap: Why Most AI Projects Disappoint', 'accuracy-trap-ai-failure', 'Full content for the accuracy trap article...', 'Academic accuracy vs. Real-world reliability: Why 99% isn''t always enough.', 'Thought Leadership', true, NOW(), 6, ARRAY['AI Reliability', 'Ground-Truth', 'ML Ops']),
('Computer Vision in Production: A Practical Implementation Guide', 'cv-production-guide', 'Full content for CV guide...', 'A step-by-step technical guide for deploying computer vision models in industrial environments.', 'Technical Guide', true, NOW(), 12, ARRAY['Computer Vision', 'YOLOv8', 'Edge Deployment']);

-- 4. Seed Resources
INSERT INTO resources (title, type, description, lead_capture) VALUES
('AI ROI Calculator Spreadsheet', 'calculator', 'Automated tool to estimate the annual savings of your AI implementation.', true),
('Industrial CV Implementation Checklist', 'checklist', '30-point technical checklist for factory floor CV deployments.', true);
