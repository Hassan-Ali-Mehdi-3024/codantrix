export async function trackEvent(
    type: 'page_view' | 'cta_click' | 'download' | 'quiz_complete' | 'calculator_use',
    metadata: Record<string, unknown> = {}
) {
    try {
        await fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event_type: type,
                page_url: typeof window !== 'undefined' ? window.location.pathname : '',
                metadata,
                user_id: localStorage.getItem('cl_session_id') || 'anonymous'
            })
        })
    } catch (_) {
        console.warn('Analytics tracking failed')
    }
}
