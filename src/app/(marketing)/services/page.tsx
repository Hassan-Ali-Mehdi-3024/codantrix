import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, Check } from 'lucide-react'
import servicesData from '@/data/services.json'
import processData from '@/data/process.json'

export const metadata: Metadata = {
    title: 'Services — Agentic AI, fixed price',
    description: 'Six fixed-price engagements from $8K to $30K+. Agentic MVPs, production workflows, and platforms. All prices on the site, all scopes written before work starts.',
}

type Service = {
    tier: string
    name: string
    slug: string
    priceLabel: string
    duration: string
    summary: string
    forWho: string
    scope: string[]
    order: number
}

type Process = { step: number; title: string; duration: string; description: string }

export default function ServicesHub() {
    const services = (servicesData as Service[]).slice().sort((a, b) => a.order - b.order)
    const tierA = services.filter(s => s.tier === 'A')
    const tierB = services.filter(s => s.tier === 'B')
    const process = processData as Process[]

    return (
        <>
            <section className="pt-32 md:pt-40 pb-16">
                <div className="container-page max-w-3xl">
                    <p className="text-sm text-accent font-medium mb-4">Services</p>
                    <h1 className="text-4xl md:text-6xl font-semibold leading-[1.1] mb-6 text-fg">Six engagements. All fixed price.</h1>
                    <p className="text-lg text-fg-muted leading-relaxed">
                        Every scope is written down in an SOW before work starts. Weekly Loom demos every Friday. Code in your repo, running on your infra. No retainer trap, no surprise overages.
                    </p>
                </div>
            </section>

            <section className="py-12 border-t border-border">
                <div className="container-page">
                    <div className="flex items-baseline gap-4 mb-8">
                        <h2 className="text-2xl md:text-3xl font-semibold text-fg">Agentic MVPs</h2>
                        <p className="text-sm text-fg-muted font-mono">$8–15K · 2–6 weeks · Tier B</p>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-6">
                        {tierB.map(s => <ServiceCard key={s.slug} service={s} />)}
                    </div>
                </div>
            </section>

            <section className="py-12 border-t border-border">
                <div className="container-page">
                    <div className="flex items-baseline gap-4 mb-8">
                        <h2 className="text-2xl md:text-3xl font-semibold text-fg">Agentic Production Systems</h2>
                        <p className="text-sm text-fg-muted font-mono">$15–30K+ · 6–10 weeks · Tier A</p>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-6">
                        {tierA.map(s => <ServiceCard key={s.slug} service={s} />)}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28 border-t border-border">
                <div className="container-page">
                    <div className="max-w-2xl mb-12">
                        <p className="text-sm text-accent font-medium mb-3">How every engagement runs</p>
                        <h2 className="text-3xl md:text-4xl font-semibold text-fg">Same four steps, every project.</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {process.map(p => (
                            <div key={p.step} className="card p-6">
                                <div className="flex items-baseline gap-3 mb-3">
                                    <span className="text-accent font-mono text-sm">0{p.step}</span>
                                    <h3 className="font-medium text-fg">{p.title}</h3>
                                </div>
                                <p className="text-xs text-fg-subtle mb-3 font-mono">{p.duration}</p>
                                <p className="text-sm text-fg-muted leading-relaxed">{p.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28 border-t border-border">
                <div className="container-page">
                    <div className="card p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="max-w-xl">
                            <h2 className="text-2xl md:text-3xl font-semibold text-fg mb-3">Not sure which tier fits?</h2>
                            <p className="text-fg-muted">Book the call. We&apos;ll figure it out together. Free, 30 minutes.</p>
                        </div>
                        <Link href="/contact" className="btn btn-primary whitespace-nowrap">
                            Book a scoping call
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

function ServiceCard({ service }: { service: Service }) {
    return (
        <Link href={`/services/${service.slug}`} className="card p-6 block hover:border-border-strong transition-colors group">
            <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-medium text-fg group-hover:text-accent transition-colors">{service.name}</h3>
                <span className="text-sm text-fg-muted tabular-nums whitespace-nowrap">{service.priceLabel}</span>
            </div>
            <p className="text-xs text-fg-subtle font-mono mb-4">{service.duration}</p>
            <p className="text-sm text-fg-muted leading-relaxed mb-5">{service.summary}</p>
            <ul className="space-y-2">
                {service.scope.slice(0, 3).map(line => (
                    <li key={line} className="flex gap-2 text-sm text-fg-muted">
                        <Check size={16} className="text-accent shrink-0 mt-0.5" />
                        <span>{line}</span>
                    </li>
                ))}
            </ul>
            <div className="mt-5 text-sm text-accent inline-flex items-center gap-1.5 font-medium">
                Full scope <ArrowRight size={14} />
            </div>
        </Link>
    )
}
