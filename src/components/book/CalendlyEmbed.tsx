'use client'

import { useEffect, useRef } from 'react'

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || ''

/**
 * Inline Calendly embed. Loads only when NEXT_PUBLIC_CALENDLY_URL is set.
 * If unset, falls back to a quiet card pointing at email.
 */
export default function CalendlyEmbed() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!CALENDLY_URL || !ref.current) return

        // Load Calendly script once
        const existing = document.querySelector('script[data-calendly]')
        if (!existing) {
            const script = document.createElement('script')
            script.src = 'https://assets.calendly.com/assets/external/widget.js'
            script.async = true
            script.dataset.calendly = 'true'
            document.body.appendChild(script)
        }
    }, [])

    if (!CALENDLY_URL) {
        return (
            <div className="border border-hairline p-8 md:p-10">
                <p className="meta text-fg-45 mb-4">SCOPING CALL</p>
                <p className="body text-fg-70 mb-6 measure">
                    Calendar will live here once the booking URL is wired. For now, email me directly to book a 30-minute call.
                </p>
                <a
                    href="mailto:hassan@codantrix.com?subject=Scoping%20call"
                    className="btn btn-primary"
                >
                    Email to book →
                </a>
            </div>
        )
    }

    return (
        <div
            ref={ref}
            className="calendly-inline-widget border border-hairline"
            data-url={CALENDLY_URL}
            style={{ minWidth: '320px', height: '700px' }}
        />
    )
}
