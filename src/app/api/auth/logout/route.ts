import { NextResponse } from 'next/server'
import { clearSessionCookie, deleteClientSession } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST() {
    const cookieStore = await cookies()
    const token = cookieStore.get('ct_session')?.value
    if (token) {
        await deleteClientSession(token)
    }
    await clearSessionCookie()
    return NextResponse.json({ success: true })
}

