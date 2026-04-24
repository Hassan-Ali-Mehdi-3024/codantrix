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
            {/* Header */}
            <section className="pt-40 md:pt-48 pb-16">
                <div className="gutter">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-8 lg:col-start-2">
                            <p className="eyebrow mb-8">Services</p>
                            <h1 className="mb-8 measure-wide">Six engagements. All fixed price.</h1>
                            <p className="body-lg measure">
                                Every scope is written down in an SOW before work starts. Weekly Loom demos every Friday. Code in your repo, running on your infra. No retainer trap, no surprise overages.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tier B — Agentic MVPs */}
            <section className="pt-16 md:pt-24 pb-8">
                <div className="gutter">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-10 lg:col-start-2">
                            <div className="flex items-baseline gap-6 mb-8 pb-4 border-b border-hairline">
                                <span className="section-marker">01</span>
                                <h2 className="text-[28px] md:text-[32px] font-display font-medium tracking-tight flex-1">
                                    Agentic MVPs
                                </h2>
                                <span className="meta">$8–15K · 2–6 WEEKS</span>
                            </div>
                            <ul>
                                {tierB.map((s, i) => <ServiceRowFull key={s.slug} service={s} index={i + 1} />)}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tier A — Production Systems */}
            <section className="pt-16 md:pt-24 pb-16">
                <div className="gutter">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-10 lg:col-start-2">
                            <div className="flex items-baseline gap-6 mb-8 pb-4 border-b border-hairline">
                                <span className="section-marker">02</span>
                                <h2 className="text-[28px] md:text-[32px] font-display font-medium tracking-tight flex-1">
                                    Agentic Production Systems
                                </h2>
                                <span className="meta">$15–30K+ · 6–10 WEEKS</span>
                            </div>
                            <ul>
                                {tierA.map((s, i) => <ServiceRowFull key={s.slug} service={s} index={i + 1} />)}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* How every engagement runs */}
            <section className="pt-24 md:pt-32 pb-32">
                <div className="gutter">
                    <header className="mb-12 md:mb-16 grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-8 lg:col-start-2">
                            <div className="flex items-baseline gap-6 mb-6">
                                <span className="section-marker">03</span>
                                <span className="eyebrow">How every engagement runs</span>
                            </div>
                            <h2 className="measure-wide">Same four steps, every project.</h2>
                        </div>
                    </header>

                    <div className="grid grid-cols-12 gap-x-6 gap-y-12">
                        {process.map(p => (
                            <div key={p.step} className="col-span-12 md:col-span-6 lg:col-span-3 lg:[&:first-child]:col-start-2">
                                <p
                                    aria-hidden="true"
                                    className="font-mono text-[72px] leading-none text-fg-35 mb-6"
                                >
                                    0{p.step}
                                </p>
                                <h3 className="text-[20px] mb-2">{p.title}</h3>
                                <p className="meta mb-4">{p.duration}</p>
                                <p className="body text-fg-70">{p.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quiet CTA */}
            <section className="pb-32">
                <div className="gutter">
                    <div className="grid grid-cols-12 gap-6 items-end">
                        <div className="col-span-12 lg:col-span-6 lg:col-start-2">
                            <h3 className="text-[28px] md:text-[36px] font-display font-medium tracking-tight mb-3">
                                Not sure which tier fits?
                            </h3>
                            <p className="body text-fg-70 measure-narrow">
                                Book the call. We&apos;ll figure it out together. Free, 30 minutes.
                            </p>
                        </div>
                        <div className="col-span-12 lg:col-span-4 lg:col-start-8 lg:justify-self-end">
                            <Link href="/book" className="btn btn-primary">
                                Book a scoping call
                                <ArrowRight size={16} className="arrow-nudge" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

function ServiceRowFull({ service, index }: { service: Service; index: number }) {
    return (
        <li className="py-10 border-b border-hairline">
            <div className="grid grid-cols-12 gap-x-6">
                {/* Left: marker + name */}
                <div className="col-span-12 md:col-span-4 flex items-baseline gap-4 mb-6 md:mb-0">
                    <span className="font-mono text-[13px] text-fg-35 shrink-0 w-6">0{index}</span>
                    <div>
                        <h3 className="text-[22px] md:text-[26px] font-display font-medium tracking-tight leading-tight">
                            {service.name}
                        </h3>
                        <p className="meta mt-2">
                            <span className="text-accent">{service.priceLabel}</span> &nbsp;·&nbsp; {service.duration}
                        </p>
                    </div>
                </div>

                {/* Right: summary + scope + link */}
                <div className="col-span-12 md:col-span-8 md:pl-6">
                    <p className="body text-fg-70 mb-6 measure">{service.summary}</p>
                    <ul className="space-y-2 mb-6">
                        {service.scope.slice(0, 3).map(line => (
                            <li key={line} className="flex gap-3 text-[15px] text-fg-70">
                                <Check size={16} className="text-fg-45 shrink-0 mt-1" />
                                <span>{line}</span>
                            </li>
                        ))}
                    </ul>
                    <Link href={`/services/${service.slug}`} className="link-arrow">
                        Full scope <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </li>
    )
}
