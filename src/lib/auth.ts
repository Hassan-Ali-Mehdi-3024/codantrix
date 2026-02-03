import { cookies } from 'next/headers'
import { getD1 } from '@/lib/d1'

const SESSION_COOKIE_NAME = 'ct_session'
const SESSION_DAYS = 30

function base64UrlEncode(bytes: Uint8Array) {
    return Buffer.from(bytes)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/g, '')
}

function base64UrlDecode(text: string) {
    const pad = text.length % 4 === 0 ? '' : '='.repeat(4 - (text.length % 4))
    const b64 = text.replace(/-/g, '+').replace(/_/g, '/') + pad
    return Uint8Array.from(Buffer.from(b64, 'base64'))
}

async function pbkdf2Hash(password: string, salt: Uint8Array) {
    const enc = new TextEncoder()
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, [
        'deriveBits',
    ])
    const bits = await crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: salt as unknown as BufferSource,
            iterations: 120_000,
            hash: 'SHA-256',
        },
        keyMaterial,
        256
    )
    return new Uint8Array(bits)
}

export async function hashPassword(password: string) {
    const salt = crypto.getRandomValues(new Uint8Array(16))
    const hash = await pbkdf2Hash(password, salt)
    return {
        password_salt: base64UrlEncode(salt),
        password_hash: base64UrlEncode(hash),
    }
}

export async function verifyPassword(params: {
    password: string
    password_salt: string
    password_hash: string
}) {
    const salt = base64UrlDecode(params.password_salt)
    const expected = base64UrlDecode(params.password_hash)
    const actual = await pbkdf2Hash(params.password, salt)
    if (expected.length !== actual.length) return false
    let diff = 0
    for (let i = 0; i < expected.length; i++) diff |= expected[i] ^ actual[i]
    return diff === 0
}

export type ClientUser = {
    id: number
    name: string
    email: string
    role: string
}

export async function createClientSession(clientId: number) {
    const tokenBytes = crypto.getRandomValues(new Uint8Array(32))
    const token = base64UrlEncode(tokenBytes)
    const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString()

    const db = getD1()
    await db
        .prepare('INSERT INTO client_sessions (token, client_id, expires_at) VALUES (?, ?, ?)')
        .bind(token, clientId, expiresAt)
        .run()

    return { token, expiresAt }
}

export async function deleteClientSession(token: string) {
    const db = getD1()
    await db.prepare('DELETE FROM client_sessions WHERE token = ?').bind(token).run()
}

export async function getCurrentClient() {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
    if (!token) return null

    const db = getD1()
    const row = await db
        .prepare(
            `SELECT c.id as id, c.name as name, c.email as email, c.role as role
             FROM client_sessions s
             JOIN clients c ON c.id = s.client_id
             WHERE s.token = ? AND s.expires_at > ? AND c.disabled = 0
             LIMIT 1`
        )
        .bind(token, new Date().toISOString())
        .first()

    if (!row) return null
    return row as unknown as ClientUser
}

export async function setSessionCookie(token: string, expiresAt: string) {
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV !== 'development',
        path: '/',
        expires: new Date(expiresAt),
    })
}

export async function clearSessionCookie() {
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE_NAME, '', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV !== 'development',
        path: '/',
        expires: new Date(0),
    })
}
