import { getCloudflareContext } from '@opennextjs/cloudflare'

export function getD1() {
    const { env } = getCloudflareContext()
    const db = (env as any)?.DB
    if (!db) {
        throw new Error('Missing D1 binding: DB')
    }
    return db as any
}

