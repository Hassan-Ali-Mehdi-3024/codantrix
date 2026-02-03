import { NextResponse } from 'next/server'
import servicesData from '@/data/services.json'

export const dynamic = 'force-dynamic'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const service = (servicesData as any[]).find(s => s.id === id || s.slug === id)

    if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    return NextResponse.json(service)
}
