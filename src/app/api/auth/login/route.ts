import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getD1 } from '@/lib/d1'
import { createClientSession, setSessionCookie, verifyPassword } from '@/lib/auth'

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
})

export async function POST(req: Request) {
    const parsed = schema.safeParse(await req.json().catch(() => null))
    if (!parsed.success) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const db = getD1()
    const row = await db
        .prepare(
            'SELECT id, name, email, password_hash, password_salt, disabled FROM clients WHERE email = ? LIMIT 1'
        )
        .bind(parsed.data.email)
        .first()

    if (!row || (row as any).disabled === 1) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const ok = await verifyPassword({
        password: parsed.data.password,
        password_hash: (row as any).password_hash,
        password_salt: (row as any).password_salt,
    })

    if (!ok) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const session = await createClientSession((row as any).id)
    await setSessionCookie(session.token, session.expiresAt)

    return NextResponse.json({ success: true })
}

