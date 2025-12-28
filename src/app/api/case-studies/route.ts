import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const industry = searchParams.get('industry')

    const supabase = await createClient()
    let query = supabase.from('case_studies').select('*')

    if (industry) {
        query = query.eq('industry', industry)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
}
