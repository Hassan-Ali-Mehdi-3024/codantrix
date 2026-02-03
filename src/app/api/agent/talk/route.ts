import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getD1 } from '@/lib/d1'
import { getCloudflareContext } from '@opennextjs/cloudflare'

const requestSchema = z.object({
    systemPrompt: z.string().min(1),
    userInput: z.string().min(1),
    availableTools: z.array(z.unknown()),
    crux: z.string().min(1),
    sessionId: z.string().min(1).optional(),
})

const responseSchema = z.object({
    responseToUser: z.string().min(1),
    chosenTool: z
        .object({
            name: z.string().min(1),
            arguments: z.record(z.string(), z.unknown()).optional(),
        })
        .nullable()
        .optional(),
    updatedCrux: z.string().min(1),
})

function extractJsonObject(text: string) {
    const first = text.indexOf('{')
    const last = text.lastIndexOf('}')
    if (first === -1 || last === -1 || last <= first) return null
    return text.slice(first, last + 1)
}

function getGroqApiKey() {
    const fromProcess = process.env.GROQ_API_KEY
    if (fromProcess) return fromProcess
    const { env } = getCloudflareContext()
    const fromEnv = (env as any)?.GROQ_API_KEY
    if (typeof fromEnv === 'string' && fromEnv.length > 0) return fromEnv
    return null
}

async function callGroqChatCompletion(params: {
    systemPrompt: string
    userInput: string
    availableTools: unknown[]
    crux: string
}) {
    const apiKey = getGroqApiKey()
    if (!apiKey) {
        return { ok: false as const, error: 'Missing GROQ_API_KEY' }
    }

    const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'

    const system = `${params.systemPrompt}\n\nReturn a single JSON object with these keys: responseToUser (string), chosenTool (object or null), updatedCrux (string). Do not return any extra text. If no tool should be used, set chosenTool to null.`

    const user = [
        `User Input:\n${params.userInput}`,
        `Available Tools (JSON):\n${JSON.stringify(params.availableTools)}`,
        `Conversation Crux:\n${params.crux}`,
    ].join('\n\n')

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model,
            temperature: 0.2,
            messages: [
                { role: 'system', content: system },
                { role: 'user', content: user },
            ],
        }),
    })

    if (!res.ok) {
        const text = await res.text().catch(() => '')
        return {
            ok: false as const,
            error: `Groq error (${res.status})`,
            detail: text.slice(0, 1000),
        }
    }

    const data = (await res.json()) as any
    const content = data?.choices?.[0]?.message?.content
    if (typeof content !== 'string' || content.trim().length === 0) {
        return { ok: false as const, error: 'Groq returned empty content' }
    }

    const raw = content.trim()
    const direct = (() => {
        try {
            return JSON.parse(raw)
        } catch {
            return null
        }
    })()
    if (direct) return { ok: true as const, value: direct }

    const extracted = extractJsonObject(raw)
    if (!extracted) return { ok: false as const, error: 'Invalid JSON from Groq' }
    try {
        return { ok: true as const, value: JSON.parse(extracted) }
    } catch {
        return { ok: false as const, error: 'Invalid JSON from Groq' }
    }
}

async function upsertSessionCrux(sessionId: string, crux: string) {
    const db = getD1()
    const now = new Date().toISOString()
    await db
        .prepare(
            'INSERT INTO agent_sessions (session_id, crux, updated_at) VALUES (?, ?, ?) ON CONFLICT(session_id) DO UPDATE SET crux = excluded.crux, updated_at = excluded.updated_at'
        )
        .bind(sessionId, crux, now)
        .run()
}

async function insertMessage(sessionId: string, role: string, content: string) {
    const db = getD1()
    const now = new Date().toISOString()
    await db
        .prepare('INSERT INTO agent_messages (session_id, role, content, created_at) VALUES (?, ?, ?, ?)')
        .bind(sessionId, role, content, now)
        .run()
}

export async function POST(request: Request) {
    const parsed = requestSchema.safeParse(await request.json().catch(() => null))
    if (!parsed.success) {
        return NextResponse.json(
            { error: 'Invalid request', issues: parsed.error.issues },
            { status: 400 }
        )
    }

    const { systemPrompt, userInput, availableTools, crux, sessionId } = parsed.data

    const completion = await callGroqChatCompletion({ systemPrompt, userInput, availableTools, crux })
    if (!completion.ok) {
        return NextResponse.json(
            { error: completion.error, detail: (completion as any).detail },
            { status: 502 }
        )
    }

    const validated = responseSchema.safeParse(completion.value)
    if (!validated.success) {
        return NextResponse.json(
            { error: 'Invalid model response', issues: validated.error.issues },
            { status: 502 }
        )
    }

    const result = {
        responseToUser: validated.data.responseToUser,
        chosenTool: validated.data.chosenTool ?? null,
        updatedCrux: validated.data.updatedCrux,
    }

    if (sessionId) {
        await upsertSessionCrux(sessionId, result.updatedCrux)
        await insertMessage(sessionId, 'user', userInput)
        await insertMessage(sessionId, 'assistant', result.responseToUser)
    }

    return NextResponse.json(result)
}
