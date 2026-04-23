import { Resend } from 'resend'
import { getCloudflareContext } from '@opennextjs/cloudflare'

function getEnv(name: string) {
    const fromProcess = process.env[name]
    if (typeof fromProcess === 'string' && fromProcess.length > 0) return fromProcess
    const { env } = getCloudflareContext()
    const fromCf = (env as unknown as Record<string, string | undefined>)?.[name]
    if (typeof fromCf === 'string' && fromCf.length > 0) return fromCf
    return null
}

async function sendWithResend(params: { to: string; subject: string; html: string }) {
    const apiKey = getEnv('RESEND_API_KEY')
    if (!apiKey || apiKey === 'YOUR_RESEND_KEY') {
        return { ok: false as const, error: 'Missing RESEND_API_KEY' }
    }

    const resend = new Resend(apiKey)
    const to = params.to
    const from = `Codantrix Labs <${getEnv('ADMIN_EMAIL') || 'onboarding@resend.dev'}>`

    await resend.emails.send({
        from,
        to,
        subject: params.subject,
        html: params.html,
    })

    return { ok: true as const }
}

async function getZohoAccessToken() {
    const clientId = getEnv('ZOHO_OAUTH_CLIENT_ID')
    const clientSecret = getEnv('ZOHO_OAUTH_CLIENT_SECRET')
    const refreshToken = getEnv('ZOHO_OAUTH_REFRESH_TOKEN')
    const accountsDomain = getEnv('ZOHO_ACCOUNTS_DOMAIN') || 'accounts.zoho.com'

    if (!clientId || !clientSecret || !refreshToken) return null

    const url = new URL(`https://${accountsDomain}/oauth/v2/token`)
    url.searchParams.set('refresh_token', refreshToken)
    url.searchParams.set('client_id', clientId)
    url.searchParams.set('client_secret', clientSecret)
    url.searchParams.set('grant_type', 'refresh_token')

    const res = await fetch(url.toString(), { method: 'POST' })
    if (!res.ok) return null
    const data = (await res.json()) as { access_token?: string }
    if (typeof data?.access_token !== 'string' || data.access_token.length === 0) return null
    return data.access_token
}

async function sendWithZoho(params: { to: string; subject: string; html: string }) {
    const accountId = getEnv('ZOHO_MAIL_ACCOUNT_ID')
    const fromAddress = getEnv('ZOHO_MAIL_FROM')
    const mailDomain = getEnv('ZOHO_MAIL_DOMAIN') || 'mail.zoho.com'

    if (!accountId || !fromAddress) {
        return { ok: false as const, error: 'Missing Zoho mail config' }
    }

    const token = await getZohoAccessToken()
    if (!token) return { ok: false as const, error: 'Missing Zoho OAuth token config' }

    const res = await fetch(`https://${mailDomain}/api/accounts/${accountId}/messages`, {
        method: 'POST',
        headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fromAddress,
            toAddress: params.to,
            subject: params.subject,
            content: params.html,
            mailFormat: 'html',
        }),
    })

    if (!res.ok) {
        const text = await res.text().catch(() => '')
        return { ok: false as const, error: 'Zoho send failed', detail: text.slice(0, 500) }
    }

    return { ok: true as const }
}

export async function sendEmail(params: { to: string; subject: string; html: string }) {
    const prefer = (getEnv('EMAIL_PROVIDER') || '').toLowerCase()

    if (prefer === 'zoho') {
        const zoho = await sendWithZoho(params)
        if (zoho.ok) return zoho
        return zoho
    }

    if (prefer === 'resend') {
        return sendWithResend(params)
    }

    const zohoPossible = getEnv('ZOHO_MAIL_ACCOUNT_ID') && getEnv('ZOHO_MAIL_FROM')
    if (zohoPossible) {
        const zoho = await sendWithZoho(params)
        if (zoho.ok) return zoho
    }

    return sendWithResend(params)
}

