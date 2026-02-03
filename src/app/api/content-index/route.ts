import { NextResponse } from 'next/server'
import servicesData from '@/data/services.json'
import caseStudiesData from '@/data/case-studies.json'

export const dynamic = 'force-dynamic'

export async function GET() {
    const index = {
        company: "Codantrix Labs",
        mission: "Real Solutions for Real Problems",
        founder: "Hassan Ali Mehdi",
        core_pages: [
            { name: "About", url: "/about" },
            { name: "Approach", url: "/our-approach" },
            { name: "Solutions Hub", url: "/solutions-hub" },
            { name: "Contact", url: "/contact" }
        ],
        services: (servicesData as any[]).map(s => ({ name: s.name, slug: s.slug, description: s.description })),
        case_studies: (caseStudiesData as any[]).map(cs => ({ title: cs.title, slug: cs.slug, industry: cs.industry })),
        industries: [
            "Manufacturing", "Agriculture", "Logistics", "Real Estate", "Retail", "Warehousing"
        ]
    }

    return NextResponse.json(index)
}
