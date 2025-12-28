# Codantrix Labs – Enterprise AI/ML Solutions Platform

A modern B2B SaaS website and client engagement platform for **Codantrix Labs**, a boutique AI/ML consultancy delivering pragmatic, production-grade intelligence solutions for industrial and enterprise clients.

---

## 🎯 Project Overview

**Codantrix Labs** is building a world-class digital presence to:
- **Establish credibility** through case studies, thought leadership, and social proof
- **Capture high-intent leads** via optimized contact flows and industry-specific positioning
- **Engage clients** with a modern, glass-morphic design powered by cutting-edge web technologies
- **Scale to a platform** with authenticated client portals, analytics dashboards, and continuous engagement (Phase 3)

### Current Phase
**Phase 2: Web Platform & Lead Capture**  
Focus on a beautiful marketing site with form integration, lead tracking, and foundational architecture for Phase 3's client portal.

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: [Next.js 16.1.1](https://nextjs.org/) – React 19.2.3 with App Router
- **Language**: TypeScript 5 (strict mode)
- **Styling**: 
  - [Tailwind CSS 4](https://tailwindcss.com/) – Utility-first CSS
  - Custom design tokens in `globals.css` (Poppins font, brand colors)
- **UI Components**:
  - [Lucide React](https://lucide.dev/) – Icon library
  - Custom glass-morphic components with `backdrop-blur-md`, layered borders, shadows
- **Animations**: [Framer Motion](https://www.framer.com/motion/) – Smooth page transitions and micro-interactions
- **Forms**: [React Hook Form 7.69](https://react-hook-form.com/) + [Zod 4.2](https://zod.dev/) – Type-safe form validation

### Backend & Database
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL) – Serverless, real-time
- **Auth** (Phase 3 ready): Supabase Auth + NextAuth.js v5
- **API**: [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
  - `/api/inquiries` – Lead capture
  - `/api/contact` – Contact form submissions
  - `/api/newsletter` – Email subscription
  - `/api/analytics` – Event tracking
- **Email**: [Resend](https://resend.com/) – Transactional email delivery

### DevOps & Tools
- **Package Manager**: npm
- **Linting**: ESLint 9
- **Build**: Next.js built-in optimizations (image, font, code splitting)
- **Deployment**: Vercel-ready (or any Node.js host)

---

## 📁 Project Structure

```
codantrix/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── layout.tsx               # Root layout (Navbar, Footer, globals)
│   │   ├── globals.css              # Global styles, design tokens, animations
│   │   ├── page.tsx                 # Homepage
│   │   ├── sitemap.ts               # SEO sitemap generation
│   │   ├── api/                     # API routes
│   │   │   ├── analytics/           # Event tracking
│   │   │   ├── case-studies/        # Case study data API
│   │   │   ├── contact/             # Contact form submission
│   │   │   ├── content-index/       # Search index data
│   │   │   ├── industries/          # Industry vertical data
│   │   │   ├── inquiries/           # Lead capture
│   │   │   ├── newsletter/          # Email subscription
│   │   │   ├── services/            # Service catalog
│   │   │   └── team/                # Team member data
│   │   ├── about/                   # About page
│   │   ├── blog/                    # Blog listing & post detail
│   │   ├── case-studies/            # Case study listing & detail
│   │   ├── compare/                 # Build vs. Buy comparison tool
│   │   ├── contact/                 # Contact form page
│   │   ├── industries/              # Industry vertical pages
│   │   ├── our-approach/            # Methodology page
│   │   ├── privacy/                 # Privacy policy
│   │   ├── quiz/                    # Solution finder quiz
│   │   ├── resources/               # Knowledge base & library
│   │   ├── roi-calculator/          # ROI calculation tool
│   │   ├── services/                # Service detail pages
│   │   ├── solutions-hub/           # Integrated solutions hub
│   │   ├── team/                    # Team page
│   │   ├── terms/                   # Terms of service
│   │   └── testimonials/            # Client testimonials page
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Fixed navigation bar with gradient CTA
│   │   │   └── Footer.tsx          # Glassy footer with link groups
│   │   ├── home/
│   │   │   ├── Hero.tsx            # Hero section with split layout
│   │   │   ├── IndustrySection.tsx # Industry vertical cards
│   │   │   ├── SocialProof.tsx     # Stats grid (glass cards)
│   │   │   ├── LogoWall.tsx        # Animated client logo marquee
│   │   │   ├── FeaturedTestimonials.tsx # Client testimonial grid
│   │   │   └── FeaturedBlog.tsx    # Featured blog post cards
│   │   ├── cards/
│   │   │   ├── ServiceCard.tsx     # Service offering card (asymmetric grid)
│   │   │   └── CaseStudyCard.tsx   # Case study showcase card
│   │   └── seo/
│   │       └── JsonLd.tsx          # Structured data (Schema.org)
│   │
│   ├── lib/
│   │   ├── resend.ts               # Email service integration
│   │   ├── utils.ts                # Utility functions (cn, helpers)
│   │   └── supabase/
│   │       ├── client.ts           # Supabase client (browser)
│   │       └── server.ts           # Supabase server (RSC)
│   │
│   ├── types/
│   │   └── database.ts             # TypeScript types for DB models
│   │
│   └── utils/
│       ├── analytics.ts            # Event tracking helpers
│       └── supabase/               # Database utility functions
│
├── supabase/
│   ├── schema.sql                  # Database schema (Phase 1 & 2)
│   ├── schema_phase_2.sql          # Phase 2 extensions
│   ├── schema_phase_3.sql          # Phase 3 client portal schema
│   ├── seed.sql                    # Initial data seeding
│   └── seed_phase_2.sql            # Phase 2 data seeding
│
├── public/
│   └── robots.txt                  # SEO robots configuration
│
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
├── next.config.ts                  # Next.js configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.mjs              # PostCSS configuration
├── eslint.config.mjs               # ESLint configuration
├── COPILOT_INSTRUCTIONS.md         # Design system guardrails for AI assistance
└── README.md                       # Original setup guide
```

---

## 🎨 Design System

### Brand Constants
- **Primary Color**: `#f15a2f` (Orange) – CTA buttons, badges, accents
- **Dark Background**: `#0b0c0e` (Pitch Black) – Unified page base
- **Light Text**: `#fffdf2` (Off-White) – Primary text on dark
- **Font**: Poppins (via `next/font/google`) – Bold, modern sans-serif
- **Accent Colors**: Gradients from orange to `#ff8a5c` for depth

### Key Design Patterns

#### 1. **Glass Morphism**
```tsx
className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
```
- Frosted glass effect with subtle transparency and blur
- Borders use `white/10` or `white/15` for definition
- Shadows use black with 0.45+ opacity for depth

#### 2. **Gradient Badges & CTAs**
```tsx
className="bg-gradient-to-r from-[#f15a2f] via-[#ff6a3c] to-[#ff8a5c]"
```
- Soft-to-bright orange gradients for visual pop
- Paired with shadow: `shadow-[0_14px_60px_rgba(241,90,47,0.6)]`

#### 3. **Typography Hierarchy**
- **Headings**: `text-4xl md:text-5xl/6xl`, `font-bold`, `tracking-tight`
- **Subheadings**: `text-lg md:text-2xl`, `font-bold`
- **Meta/Labels**: `text-xs/sm`, `uppercase`, `tracking-[0.2em]`, `text-gray-400`
- **Body**: `text-base md:text-lg`, `leading-relaxed`, `text-[#fffdf2]/70`

#### 4. **Spacing & Layout**
- **Cards**: Minimum `p-8 sm:p-10` for breathing room
- **Sections**: `py-24` vertical, responsive horizontal padding
- **Gaps**: `gap-8 lg:gap-12` between grid items
- **Grids**: Asymmetric layouts with `auto-rows-[minmax(...)]` for uniform heights

#### 5. **Micro-Interactions**
- Hover lift: `hover:-translate-y-1`
- Scale: `hover:scale-[1.01]`
- Transitions: `transition-all duration-300`
- Focus states: `ring-2 ring-[#f15a2f]/50`

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ & npm 9+
- Supabase account (free tier available)
- Resend account for email (optional for development)
- Environment variables configured

### Installation

1. **Clone and install dependencies**:
```bash
cd codantrix
npm install
```

2. **Set up environment variables** (create `.env.local`):
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Email (Resend)
RESEND_API_KEY=your-resend-key
ADMIN_EMAIL=hello@codantrix.com

# Optional analytics
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

3. **Initialize Supabase**:
```bash
# Apply schema
npx supabase db push

# Seed initial data
npx supabase db seed
```

4. **Run development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
vercel deploy
```

---

## 📊 Database Schema (Phase 1 & 2)

### Core Tables

#### `team_members`
Stores founding team profiles for the team page.
```sql
id (UUID), name, role, bio, image_url, linkedin_url, expertise[], social_handles
```

#### `services`
Service offerings (AI/ML Solutions, Computer Vision, Industrial Automation, Web Dev).
```sql
id, name, slug, description, overview, use_cases[], process (JSON), icon, service_order
```

#### `case_studies`
Client success stories with measurable impact.
```sql
id, title, slug, industry, client_name, problem, solution, results (JSON), 
technologies[], image_url, featured, duration, team_size, unique_approach
```

#### `blog_posts` (Phase 2+)
Thought leadership content and process intelligence.
```sql
id, title, slug, excerpt, content, category, featured, published_at, 
read_time_minutes, image_url, author_id (FK to team_members)
```

#### `testimonials` (Phase 2+)
Client feedback and social proof.
```sql
id, quote, client_name, client_company, rating, featured, created_at
```

#### `inquiries`
Lead capture from contact forms.
```sql
id, name, email, company, role, message, service_interested, status, created_at
```

#### `industries` (Phase 2+)
Industry vertical pages and targeting.
```sql
id, name, slug, description, icon, solutions[]
```

#### `settings`
Global configuration (feature flags, metadata, etc.).
```sql
id, key, value (JSON), updated_at
```

### Row-Level Security (RLS)
- All tables have **public read** access
- `inquiries` allows **public insert** (form submissions)
- Write access restricted to authenticated admin users (Phase 3)

---

## 🔌 API Endpoints

All routes return JSON and support CORS for form submissions.

### Lead Capture
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/inquiries` | POST | Submit a lead inquiry (contact form) |
| `/api/newsletter` | POST | Email subscription |

**Example Request** (`/api/inquiries`):
```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "company": "Tech Corp",
  "role": "CTO",
  "message": "Interested in computer vision...",
  "service_interested": "computer-vision"
}
```

### Data APIs
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/services` | GET | List all services |
| `/api/services/[id]` | GET | Service detail |
| `/api/case-studies` | GET | Case study listing |
| `/api/case-studies/[slug]` | GET | Case study detail |
| `/api/team` | GET | Team member listing |
| `/api/industries` | GET | Industry verticals |
| `/api/industries/[slug]` | GET | Industry detail |

### Analytics
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/analytics` | POST | Track user events (page view, CTA click, form submit) |

---

## 🛠️ Development Workflow

### Running the Dev Server
```bash
npm run dev
```
- Hot reload on file changes
- TypeScript type checking
- ESLint warnings in terminal

### Linting
```bash
npm run lint
```
Check code style and import organization.

### Building for Production
```bash
npm run build
npm start
```

### Database Migrations (Supabase)
```bash
# Create a new migration
npx supabase migration new add_new_table

# Apply migrations locally
npx supabase db push

# Pull remote schema changes
npx supabase db pull
```

---

## 📝 Key Features

### Homepage
- **Hero Section**: Split layout with execution card on right
- **Social Proof Stats**: Grid of validated solutions, efficiency gains, ROI metrics
- **Logo Wall**: Animated marquee of client logos
- **Services Grid**: Asymmetric card layout with 4 service offerings
- **Industry Verticals**: 6 industry-specific cards with solutions
- **Featured Testimonials**: 2 client quotes with star ratings
- **Featured Blog Posts**: Latest thought leadership articles
- **CTA Section**: "Engage the founders" call-to-action

### Service Detail Pages
- Service overview and use cases
- Implementation process steps
- Related case studies
- Contact CTA

### Case Study Detail Pages
- Problem statement
- Solution overview
- Measurable results (JSON format)
- Technologies used
- Team composition
- Timeline and engagement model

### Blog
- Thought leadership articles
- Category-based filtering
- Read time estimation
- Featured post highlighting
- Author bio
- Related post suggestions

### Contact Forms
- Contact page form (full inquiry)
- Service page quick forms
- Newsletter subscription
- Real-time validation with Zod
- Email confirmation via Resend

### Resources
- Resource library (PDFs, guides)
- ROI calculator tool
- Build vs. Buy comparison
- Solution finder quiz

---

## 🔐 Security & Compliance

### Best Practices Implemented
- **HTTPS Only**: Enforced in production
- **CORS**: Configured for form submissions
- **XSS Protection**: React's built-in escaping + Content Security Policy
- **SQL Injection**: Supabase parameterized queries
- **Input Validation**: Zod schemas on all forms
- **Rate Limiting**: (Phase 3) API rate limiting via Supabase Edge Functions

### Privacy & Compliance
- GDPR-compliant privacy policy (`/privacy`)
- Terms of Service (`/terms`)
- Email opt-in tracking
- Data retention policies in database schema

---

## 📈 Performance & SEO

### SEO Optimizations
- **Sitemap**: Auto-generated at `/sitemap.ts`
- **Metadata**: Open Graph, Twitter Card, structured data
- **JSON-LD**: Organization schema and BreadcrumbList for navigation
- **Canonical URLs**: Prevent duplicate content
- **Mobile-First**: Responsive design for all breakpoints

### Performance
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Poppins loaded via `next/font`
- **Code Splitting**: Automatic route-based splitting
- **Caching**: Next.js ISR and Supabase query caching
- **Lighthouse Targets**: 
  - Performance: 85+
  - Accessibility: 95+
  - Best Practices: 95+
  - SEO: 100

---

## 🗺️ Roadmap (Phase 3+)

### Phase 3: Client Portal & Platform
- **Authentication**: NextAuth.js v5 + Supabase Auth
- **Client Dashboard**: Project progress, engagement tracking, analytics
- **Document Repository**: Secure file storage per client
- **Knowledge Base**: Searchable FAQ and implementation guides
- **Support Ticketing**: Lightweight support system
- **Client Analytics**: Usage metrics, ROI tracking, business impact
- **Exclusive Content**: Gated resources for authenticated clients
- **Team Collaboration**: Internal dashboards, project management

### Phase 4: Advanced Features
- **Integration Marketplace**: Third-party API connectors
- **Custom Reporting**: White-label dashboard for clients
- **AI Assistant**: Chatbot for common questions
- **Community Forum**: Peer-to-peer support
- **Mobile App**: Native iOS/Android client

---

## 💻 Contributing & Maintenance

### Code Style Guide
- **TypeScript**: Strict mode, explicit types
- **Components**: Functional, use React hooks
- **Styling**: Tailwind utilities, avoid inline styles
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Imports**: Path aliases (`@/`) for clean imports

### Adding New Pages
1. Create folder in `src/app/[page-name]/`
2. Add `page.tsx` (Server Component by default)
3. Update navigation in `Navbar.tsx` if needed
4. Add `layout.tsx` if custom layout required
5. Update `sitemap.ts` for SEO

### Adding New Components
1. Create in `src/components/[category]/`
2. Export as default functional component
3. Add TypeScript interface for props
4. Use Tailwind for styling (follow design system)
5. Add to component library in `components/index.tsx` if reusable

### Database Changes
1. Create migration: `npx supabase migration new migration_name`
2. Update schema in migration file
3. Test locally: `npx supabase db reset`
4. Push to staging: `npx supabase db push`
5. Deploy to production

---

## 🐛 Troubleshooting

### Common Issues

**Q: Supabase connection errors**
- Verify `.env.local` has correct keys
- Check Supabase project is running
- Test connection: `npx supabase status`

**Q: Styles not applying**
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`
- Check Tailwind config includes `src/**/*.tsx`

**Q: Forms not submitting**
- Verify API route exists in `/api`
- Check RESEND_API_KEY is valid
- Review browser console for validation errors

**Q: Images not loading**
- Ensure image URL is public-accessible
- Verify Next.js Image `src` is valid
- Check `next.config.ts` for domain allowlist

---

## 📞 Support & Contact

- **Email**: hello@codantrix.com
- **Website**: https://codantrix.com
- **LinkedIn**: [Codantrix Labs](https://linkedin.com/company/codantrix-labs)
- **GitHub Issues**: [Project Repo](https://github.com/codantrix/codantrix-web)

---

## 📄 License

© 2025 Codantrix Labs. All rights reserved.

---

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Supabase** for backend infrastructure
- **Tailwind CSS** for utility-first styling
- **Vercel** for hosting and edge computing
- **Framer Motion** for animations
- **Lucide Icons** for the icon library

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Guide](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React 19 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Design System Guardrails](./COPILOT_INSTRUCTIONS.md)

---

**Last Updated**: December 28, 2025  
**Version**: 2.0 (Phase 2 Complete)  
**Maintainer**: Codantrix Labs Engineering Team
