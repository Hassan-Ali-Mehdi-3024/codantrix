import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    const supabase = await createClient()

    const [services, studies] = await Promise.all([
        supabase.from('services').select('name, slug, description'),
        supabase.from('case_studies').select('title, slug, industry')
    ])

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
        services: services.data || [],
        case_studies: studies.data || [],
        industries: [
            "Manufacturing", "Agriculture", "Logistics", "Real Estate", "Retail", "Warehousing"
        ]
    }

    return NextResponse.json(index)
}
