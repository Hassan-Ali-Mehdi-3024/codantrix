import { NextResponse } from 'next/server'
import { getD1 } from '@/lib/d1'

export async function POST(req: Request) {
    try {
        const { email, name, company, source, segment } = await req.json()

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 })
        }

        const db = getD1()

        // 1. Check for existing subscriber
        const existing = await db
            .prepare('SELECT id FROM email_subscribers WHERE email = ? LIMIT 1')
            .bind(email)
            .first()

        if (existing) {
            return NextResponse.json({ message: 'Already subscribed' }, { status: 200 })
        }

        // 2. Insert new subscriber
        await db
            .prepare(
                'INSERT INTO email_subscribers (email, name, company, source, segment) VALUES (?, ?, ?, ?, ?)'
            )
            .bind(
                email,
                name ?? null,
                company ?? null,
                source || 'newsletter_form',
                segment || 'newsletter'
            )
            .run()

        // 3. Optional: Trigger Resend Welcome Sequence (Phase 2C)
        // This is where we'd call the Resend API to send a welcome email.

        return NextResponse.json({ success: true, message: 'Successfully subscribed' })

    } catch (e: unknown) {
        console.error('Newsletter error:', e)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
