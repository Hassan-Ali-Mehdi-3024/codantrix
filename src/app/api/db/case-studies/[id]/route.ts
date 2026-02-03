import { NextResponse } from 'next/server'
import caseStudiesData from '@/data/case-studies.json'

export const dynamic = 'force-dynamic'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const studies = caseStudiesData as unknown as { id?: string; slug?: string }[]
    const found = studies.find((s) => s.id === id || s.slug === id)

    if (!found) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(found)
}
