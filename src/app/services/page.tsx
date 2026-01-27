import { createClient } from '@/utils/supabase/server'
import ServiceCard from '@/components/cards/ServiceCard'

export const dynamic = 'force-dynamic'

const serviceCategories = [
    {
        title: "Automate Operations",
        services: [
            {
                name: "Autonomous Neural Agents",
                slug: "autonomous-neural-agents",
                description: "Self-healing RAG bots that answer complex queries instantly using your proprietary data.",
                icon: "bot"
            },
            {
                name: "Industrial Computer Vision",
                slug: "industrial-computer-vision",
                description: "Custom YOLOv8 models that detect defects in milliseconds on the assembly line.",
                icon: "scan-eye"
            },
            {
                name: "Predictive Analytics Engines",
                slug: "predictive-analytics",
                description: "Forecasting models (Prophet/ARIMA) that process historical data to predict inventory & demand.",
                icon: "line-chart"
            },
            {
                name: "Proprietary LLM Fine-Tuning",
                slug: "llm-fine-tuning",
                description: "Open-source models (Llama 3, Mistral) trained specifically on your brand voice and jargon.",
                icon: "brain"
            },
            {
                name: "Semantic Search Architecture",
                slug: "semantic-search",
                description: "Vector-embedded search systems that understand context, synonyms, and user nuance.",
                icon: "search"
            },
            {
                name: "Automated Data Pipelines",
                slug: "automated-pipelines",
                description: "Airflow/Prefect orchestrators that clean, normalize, and feed data to your warehouse automatically.",
                icon: "workflow"
            }
        ]
    },
    {
        title: "Customer Acquisition",
        services: [
            {
                name: "Next.js Edge Platforms",
                slug: "nextjs-edge",
                description: "Server-side rendered React apps deployed to the Edge. 99/100 Core Web Vitals guaranteed.",
                icon: "globe"
            },
            {
                name: "Cross-Platform Mobile Apps",
                slug: "mobile-apps",
                description: "High-fidelity React Native apps. Single codebase, native performance (60fps).",
                icon: "smartphone"
            },
            {
                name: "High-Frequency Dashboards",
                slug: "high-freq-dashboards",
                description: "WebSocket/gRPC pipelines feeding React frontends for sub-millisecond data visualization.",
                icon: "activity"
            },
            {
                name: "Headless E-Commerce",
                slug: "headless-commerce",
                description: "Composable commerce architectures (Sanity + Stripe) for absolute design freedom.",
                icon: "shopping-bag"
            },
            {
                name: "SaaS Multi-Tenant Platforms",
                slug: "saas-platforms",
                description: "Architecture designed for tenant isolation, subscription handling, and infinite horizontal scale.",
                icon: "users"
            },
            {
                name: "Progressive Web Apps (PWA)",
                slug: "pwa",
                description: "Installable web apps with offline capabilities and push notifications. Bypass the store.",
                icon: "app-window"
            }
        ]
    },
    {
        title: "Scalable Foundations",
        services: [
            {
                name: "Immutable Infrastructure",
                slug: "immutable-infrastructure",
                description: "Dockerized CI/CD pipelines that scale to zero when idle and infinity when viral.",
                icon: "box"
            },
            {
                name: "CTO-as-a-Service",
                slug: "cto-as-a-service",
                description: "Fractional executive guidance to map roadmaps, hire teams, and select tech stacks.",
                icon: "user-cog"
            },
            {
                name: "Cloud Cost Optimization",
                slug: "cloud-optimization",
                description: "Resource auditing and serverless migration to slash infrastructure costs by 30-50%.",
                icon: "dollar-sign"
            },
            {
                name: "Legacy Code Rescue",
                slug: "legacy-rescue",
                description: "Deep dive audits, refactoring roadmaps, and strangler-pattern migrations.",
                icon: "life-buoy"
            },
            {
                name: "Security & Compliance",
                slug: "security-compliance",
                description: "Penetration testing, automated security scanning, and SOC2 preparation.",
                icon: "shield-check"
            },
            {
                name: "API Interface Design",
                slug: "api-design",
                description: "Swagger/OpenAPI spec-first development for clean, documented, and versioned APIs",
                icon: "file-json"
            }
        ]
    }
]

export default function ServicesHub() {
    return (
        <div className="pt-32 pb-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-20 mx-auto text-center">
                    <h2 className="text-[#f15a2f] font-bold uppercase tracking-[0.3em] mb-4 text-sm">Our Capabilities</h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8">
                        Expertise in <br /> <span className="text-[#f15a2f]">Complex AI.</span>
                    </h1>
                    <p className="text-xl text-[#fffdf2]/70 leading-relaxed">
                        From industrial vision to enterprise-scale machine learning, we build the infrastructure that powers intelligent decision making.
                    </p>
                </div>

                <div className="space-y-32">
                    {serviceCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="relative">
                            {/* Section Header */}
                            <div className="mb-12 flex items-center gap-6">
                                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                    {category.title}
                                </h2>
                                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                            </div>

                            {/* Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {category.services.map((service, i) => (
                                    <ServiceCard
                                        key={service.slug}
                                        name={service.name}
                                        slug={service.slug}
                                        description={service.description}
                                        icon={service.icon}
                                        index={i}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
