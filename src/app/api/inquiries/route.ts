import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { sendInquiryEmail } from '@/lib/resend'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const supabase = await createClient()

        const { data, error } = await supabase
            .from('inquiries')
            .insert([{
                name: body.name,
                email: body.email,
                company: body.company,
                message: body.message,
                service_interested: body.service,
                status: 'new'
            }])
            .select()

        if (error) throw error

        // Send transactional email
        await sendInquiryEmail({
            name: body.name,
            email: body.email,
            company: body.company || '',
            message: body.message,
            service: body.service
        })

        return NextResponse.json({ success: true, data })
    } catch (error: any) {
        console.error('API Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
