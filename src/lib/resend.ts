import { sendEmail } from '@/lib/email'

export async function sendInquiryEmail(data: { name: string, email: string, company?: string, message: string, service: string }) {
    try {
        const to = process.env.ADMIN_EMAIL || 'hello@codantrix.com'
        await sendEmail({
            to,
            subject: `New Inquiry: ${data.service} - ${data.name}`,
            html: `
                <h1>New Lead Capture</h1>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
                <p><strong>Service:</strong> ${data.service}</p>
                <p><strong>Message:</strong></p>
                <p>${data.message}</p>
            `,
        })
    } catch (error) {
        console.error('Failed to send email:', error)
    }
}
