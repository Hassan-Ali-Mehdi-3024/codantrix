import { NextResponse } from 'next/server'
import caseStudiesData from '@/data/case-studies.json'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const industry = searchParams.get('industry')

    const studies = caseStudiesData as unknown as { industry?: string }[]
    const filtered = industry ? studies.filter((s) => s.industry === industry) : studies

    return NextResponse.json(filtered)
}
