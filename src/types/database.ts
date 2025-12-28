export type TeamMember = {
    id: string
    name: string
    role: string
    bio: string | null
    image_url: string | null
    linkedin_url?: string | null
    expertise?: string[] | null
    social_handles?: any | null
    published_articles?: number
    created_at: string
}

export type Service = {
    id: string
    name: string
    slug: string
    description: string | null
    overview: string | null
    use_cases: string[] | null
    process: any | null
    icon: string | null
    service_order: number | null
    created_at: string
}

export type CaseStudy = {
    id: string
    title: string
    slug: string
    industry: string | null
    client_name: string | null
    client_location: string | null
    problem: string | null
    solution: string | null
    results: Record<string, string> | null
    technologies: string[] | null
    image_url: string | null
    featured: boolean
    duration: string | null
    team_size: string | null
    unique_approach: string | null
    created_at: string
}

export type Testimonial = {
    id: string
    client_name: string
    client_role: string | null
    client_company: string | null
    client_logo_url: string | null
    quote: string
    video_url: string | null
    rating: number
    featured: boolean
    created_at: string
}

export type BlogPost = {
    id: string
    title: string
    slug: string
    content: string | null
    excerpt: string | null
    author_id: string | null
    category: string | null
    featured: boolean
    published_at: string | null
    updated_at: string
    image_url: string | null
    read_time_minutes: number | null
    seo_keywords: string[] | null
    created_at: string
}

export type Resource = {
    id: string
    title: string
    type: 'whitepaper' | 'checklist' | 'template' | 'calculator'
    file_url: string | null
    description: string | null
    lead_capture: boolean
    downloads: number
    created_at: string
}

export type EmailSubscriber = {
    id: string
    email: string
    name: string | null
    company: string | null
    segment: 'leads' | 'newsletter' | 'customers'
    source: string | null
    subscribed_at: string
    unsubscribed_at: string | null
}

export type Inquiry = {
    id: string
    name: string
    email: string
    company: string | null
    role: string | null
    message: string | null
    service_interested: string | null
    status: 'new' | 'contacted' | 'qualified' | 'closed'
    created_at: string
    updated_at: string
}

// Phase 3: Platform Types
export type Organization = {
    id: string
    name: string
    slug: string | null
    logo_url: string | null
    subscription_tier: 'free' | 'starter' | 'professional' | 'enterprise'
    created_at: string
}

export type UserProfile = {
    id: string
    organization_id: string | null
    first_name: string | null
    last_name: string | null
    role: 'admin' | 'manager' | 'collaborator' | 'viewer'
    phone: string | null
    profile_photo_url: string | null
    preferences: any
    created_at: string
}

export type Project = {
    id: string
    organization_id: string
    name: string
    slug: string | null
    service_type: string | null
    status: 'not_started' | 'in_progress' | 'completed' | 'on_hold'
    description: string | null
    progress_percentage: number
    start_date: string | null
    expected_end_date: string | null
    created_at: string
    updated_at: string
}

export type Document = {
    id: string
    project_id: string
    title: string
    description: string | null
    type: 'case_study' | 'implementation_guide' | 'contract' | 'api_spec'
    file_url: string
    file_size: number | null
    uploaded_by: string | null
    uploaded_at: string
}

export type SupportTicket = {
    id: string
    organization_id: string
    user_id: string | null
    title: string
    description: string | null
    priority: 'urgent' | 'high' | 'medium' | 'low'
    status: 'open' | 'in_progress' | 'resolved' | 'closed'
    created_at: string
    updated_at: string
}
