export default function JsonLd({ data }: { data: Record<string, unknown> }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    )
}

export function generateOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Codantrix Labs",
        "url": "https://labs.codantrix.com",
        "logo": "https://labs.codantrix.com/logo.png",
        "founder": {
            "@type": "Person",
            "name": "Hassan Ali Mehdi",
        },
        "description":
            "One-person agentic AI studio. Production agentic systems for SaaS founders and seed–Series B teams, built on fixed-price engagements with weekly shipped demos.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lahore",
            "addressCountry": "Pakistan",
        },
        "sameAs": [
            "https://www.linkedin.com/in/hassanmehdi",
            "https://www.linkedin.com/company/codantrix-labs",
        ],
    }
}

export function generateServiceSchema(service: { name: string; description: string }) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": service.name,
        "provider": {
            "@type": "Organization",
            "name": "Codantrix Labs",
        },
        "description": service.description,
    }
}
