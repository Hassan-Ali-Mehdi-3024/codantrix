import { NextResponse } from 'next/server'
import { sendInquiryEmail } from '@/lib/resend'
import { getD1 } from '@/lib/d1'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const db = getD1()

        const name = body?.name
        const email = body?.email
        const company = body?.company
        const message = body?.message
        const service = body?.service

        if (!name || !email || !message || !service) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        await db
            .prepare(
                'INSERT INTO inquiries (name, email, company, message, service_interested, status) VALUES (?, ?, ?, ?, ?, ?)'
            )
            .bind(name, email, company ?? null, message, service, 'new')
            .run()

        // Send transactional email
        await sendInquiryEmail({
            name,
            email,
            company: company || '',
            message,
            service,
        })

        return NextResponse.json({ success: true })
    } catch (error: unknown) {
        console.error('API Error:', error)
        let errorMessage = 'An unexpected error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ error: errorMessage }, { status: 500 })
    }
}
