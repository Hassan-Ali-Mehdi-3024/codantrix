-- Seed Team
INSERT INTO team_members (name, role, bio) VALUES 
('Hassan Ali Mehdi', 'Founder', 'Visionary founder of Codantrix Labs with deep expertise in AI/ML systems and ground-truth validation methodologies.');

-- Seed Services
INSERT INTO services (name, slug, description, service_order, icon) VALUES
('AI/ML Solutions', 'ai-ml-solutions', 'Custom machine learning for enterprise problems', 1, 'brain'),
('Computer Vision Models', 'computer-vision', 'Real-time CV systems for industrial applications', 2, 'camera'),
('Industrial Automation', 'industrial-automation', 'End-to-end automation systems', 3, 'cpu'),
('Web Development', 'web-development', 'Full-stack web solutions supporting AI backends', 4, 'code'),
('Supporting Tools & Infrastructure', 'tools-infrastructure', 'APIs, dashboards, deployment infrastructure', 5, 'settings');

-- Seed Case Studies
INSERT INTO case_studies (title, slug, industry, client_name, client_location, problem, solution, results, technologies, duration, team_size, unique_approach, featured) VALUES
('Automotive Defect Detection', 'automotive-defect-detection', 'Manufacturing', 'Precision Dynamics Ltd.', 'Sindh, Pakistan', 
'2-3% defect rate, manual inspection missed 15-20% of defects', 
'CV model trained on 50,000+ images, 97.8% accuracy, 200ms per part', 
'{"defect_detection_improvement": "80% to 97.8%", "inspection_time_reduction": "8 seconds to 0.2 seconds", "cost_savings": "$180,000 annually", "customer_returns": "2.5% to 0.1%", "roi_timeline": "8 months"}', 
ARRAY['YOLOv8', 'Python', 'OpenCV', 'NVIDIA Jetson'], '4 months', '2 engineers, 1 PM', 'Validated against real production data over 90 days before deployment', true),

('Agriculture Crop Health Monitoring', 'agriculture-crop-health', 'Agriculture', 'Green Valley Farms Co.', 'Punjab, Pakistan', 
'5,000 acres, 8-15% annual crop loss, detected issues 1-2 weeks late', 
'Satellite + drone imagery + ML models for disease detection, yield prediction', 
'{"early_detection": "10-14 days earlier", "crop_loss": "8-15% to 2-3%", "water_savings": "20%", "yield_accuracy": "92% 6 weeks out", "annual_value": "$380,000"}', 
ARRAY['Sentinel-2', 'Drone Integration', 'TensorFlow', 'Random Forest', 'Python'], '5 months', '1 ML engineer, 1 data engineer, 1 ag specialist', 'Human-in-the-loop: farmers can override suggestions', true),

('Logistics Smart Sorting', 'logistics-smart-sorting', 'Logistics & Warehousing', 'FastShip Logistics Pakistan', 'Karachi', 
'50,000 parcels/day, 3-4 hour sort time, manual route planning, $1.50 cost per parcel', 
'CV-based package sorting (99.2% accuracy) + route optimization algorithm', 
'{"sorting_efficiency": "3.5 hours to 45 minutes", "delivery_time": "48h to 36h", "cost_reduction": "$1.50 to $1.18 (21%)", "fuel_savings": "12%", "annual_savings": "$420,000"}', 
ARRAY['YOLOv8', 'Google Maps API', 'Python', 'PostgreSQL', 'React Dashboard'], '6 months', '2 engineers, 1 systems architect, 1 logistics consultant', 'Optimized for real-world constraints (traffic, delivery windows, driver fatigue)', true),

('Retail Occupancy Intelligence', 'retail-occupancy-intelligence', 'Real Estate & Retail', 'Metro Shopping Centers', 'Islamabad/Lahore/Karachi', 
'1.2M sq ft, 8-10% vacancy, limited foot traffic visibility, peak hour bottlenecks', 
'Edge-based AI cameras (privacy-compliant) for real-time occupancy, heatmaps, dwell time analysis', 
'{"occupancy_visibility": "99.2% counting accuracy", "vacancy_reduction": "8-10% to 3-4%", "checkout_wait_time": "35% reduction", "annual_impact": "$250,000+ in optimized leases"}', 
ARRAY['YOLO', 'Python', 'PostgreSQL', 'React Dashboard', 'Edge Deployment'], '4 months', '2 engineers, 1 retail consultant', 'Privacy-first, GDPR-compliant, designed to improve customer experience not surveil', true);
