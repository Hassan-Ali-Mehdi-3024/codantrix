import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { email, name, company, source, segment } = await req.json()

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 })
        }

        const supabase = await createClient()

        // 1. Check for existing subscriber
        const { data: existing } = await supabase
            .from('email_subscribers')
            .select('id')
            .eq('email', email)
            .single()

        if (existing) {
            return NextResponse.json({ message: 'Already subscribed' }, { status: 200 })
        }

        // 2. Insert new subscriber
        const { error } = await supabase
            .from('email_subscribers')
            .insert([{
                email,
                name,
                company,
                source: source || 'newsletter_form',
                segment: segment || 'newsletter'
            }])

        if (error) throw error

        // 3. Optional: Trigger Resend Welcome Sequence (Phase 2C)
        // This is where we'd call the Resend API to send a welcome email.

        return NextResponse.json({ success: true, message: 'Successfully subscribed' })

    } catch (e: unknown) {
        console.error('Newsletter error:', e)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
