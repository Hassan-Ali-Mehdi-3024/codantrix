import { NextResponse } from 'next/server'
import { getD1 } from '@/lib/d1'

export async function POST(req: Request) {
    try {
        const { event_type, page_url, metadata, user_id } = await req.json()

        const db = getD1()

        if (!event_type) {
            return NextResponse.json({ success: false }, { status: 400 })
        }

        const metaString = metadata == null ? null : JSON.stringify(metadata)

        await db
            .prepare(
                'INSERT INTO analytics_events (event_type, page_url, metadata, user_id) VALUES (?, ?, ?, ?)'
            )
            .bind(event_type, page_url ?? null, metaString, user_id || 'anonymous')
            .run()

        return NextResponse.json({ success: true })
    } catch (e: unknown) {
        // Fail silently for analytics to avoid UX disruption
        console.error('Analytics tracking error:', e)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}
