import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { getD1 } from '@/lib/d1'
import { hashPassword } from '@/lib/auth'

const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
})

function getSetupKey() {
    const fromProcess = process.env.SETUP_KEY
    if (fromProcess) return fromProcess
    const { env } = getCloudflareContext()
    const fromEnv = (env as any)?.SETUP_KEY
    if (typeof fromEnv === 'string' && fromEnv.length > 0) return fromEnv
    return null
}

export async function POST(req: Request) {
    const setupKey = getSetupKey()
    const provided = req.headers.get('x-setup-key') || ''

    if (!setupKey || provided !== setupKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const parsed = schema.safeParse(await req.json().catch(() => null))
    if (!parsed.success) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const { password_hash, password_salt } = await hashPassword(parsed.data.password)
    const db = getD1()

    const existing = await db
        .prepare('SELECT id FROM clients WHERE email = ? LIMIT 1')
        .bind(parsed.data.email)
        .first()

    if (existing) {
        return NextResponse.json({ error: 'Client already exists' }, { status: 409 })
    }

    const result = await db
        .prepare(
            'INSERT INTO clients (name, email, password_hash, password_salt, role, disabled) VALUES (?, ?, ?, ?, ?, ?)'
        )
        .bind(parsed.data.name, parsed.data.email, password_hash, password_salt, 'client', 0)
        .run()

    return NextResponse.json({ success: true, id: result.meta.last_row_id })
}

