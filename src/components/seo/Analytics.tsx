import Script from 'next/script'

/**
 * Plausible analytics — privacy-preserving, no cookies, GDPR-safe.
 * Only loads if NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set (so local dev + CI don't ping).
 * Per blueprint: no Google Analytics.
 */
export default function Analytics() {
    const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
    if (!domain) return null
    return (
        <Script
            strategy="afterInteractive"
            data-domain={domain}
            src="https://plausible.io/js/script.js"
        />
    )
}
