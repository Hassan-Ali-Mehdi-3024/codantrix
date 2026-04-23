import { getCloudflareContext } from '@opennextjs/cloudflare'

// Minimal D1 shape we use. Full types live in @cloudflare/workers-types
// but we avoid the dep since only a handful of methods are touched.
export type D1Client = {
    prepare(query: string): {
        bind(...values: unknown[]): {
            run(): Promise<unknown>
            first<T = unknown>(): Promise<T | null>
            all<T = unknown>(): Promise<{ results: T[] }>
        }
    }
}

type EnvWithDB = { DB?: D1Client }

export function getD1(): D1Client {
    const { env } = getCloudflareContext()
    const db = (env as unknown as EnvWithDB).DB
    if (!db) {
        throw new Error('Missing D1 binding: DB')
    }
    return db
}
