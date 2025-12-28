export default function JsonLd({ data }: { data: any }) {
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
        "url": "https://codantrix.com",
        "logo": "https://codantrix.com/logo.png",
        "founder": {
            "@type": "Person",
            "name": "Hassan Ali Mehdi"
        },
        "description": "B2B AI/ML partner for enterprises specializing in industrial-grade reliability.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Karachi",
            "addressCountry": "Pakistan"
        }
    }
}

export function generateServiceSchema(service: any) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": service.name,
        "provider": {
            "@type": "Organization",
            "name": "Codantrix Labs"
        },
        "description": service.description
    }
}
