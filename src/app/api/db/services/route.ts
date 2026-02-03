import { NextResponse } from 'next/server'
import servicesData from '@/data/services.json'

export const dynamic = 'force-dynamic'

export async function GET() {
    return NextResponse.json(servicesData)
}
