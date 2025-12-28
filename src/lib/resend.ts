import { Resend } from 'resend'

export async function sendInquiryEmail(data: { name: string, email: string, company?: string, message: string, service: string }) {
    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey || apiKey === 'YOUR_RESEND_KEY') {
        console.warn('RESEND_API_KEY missing. Email not sent.')
        return
    }

    try {
        const resend = new Resend(apiKey)
        await resend.emails.send({
            from: 'Codantrix Labs <onboarding@resend.dev>',
            to: process.env.ADMIN_EMAIL || 'hello@codantrix.com',
            subject: `New Inquiry: ${data.service} - ${data.name}`,
            html: `
        <h1>New Lead Capture</h1>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `
        })
    } catch (error) {
        console.error('Failed to send email:', error)
    }
}
