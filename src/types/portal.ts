export type PortalProject = {
    id: string
    client_id: number
    name: string
    description: string | null
    status: 'not_started' | 'in_progress' | 'completed' | 'on_hold'
    progress_percentage: number
    created_at: string
    updated_at: string
}

export type PortalDocument = {
    id: string
    client_id: number
    project_id: string | null
    title: string
    type: string
    file_url: string
    created_at: string
    project_name?: string | null
}

