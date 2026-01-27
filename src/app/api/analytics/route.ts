import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { event_type, page_url, metadata, user_id } = await req.json()

        const supabase = await createClient()

        const { error } = await supabase
            .from('analytics_events')
            .insert([{
                event_type,
                page_url,
                metadata,
                user_id: user_id || 'anonymous'
            }])

        if (error) throw error

        return NextResponse.json({ success: true })
    } catch (e: unknown) {
        // Fail silently for analytics to avoid UX disruption
        console.error('Analytics tracking error:', e)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}
