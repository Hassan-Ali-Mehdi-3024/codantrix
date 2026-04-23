import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Hero from '@/components/home/Hero'
import servicesData from '@/data/services.json'
import processData from '@/data/process.json'
import workData from '@/data/work.json'

type Service = { tier: string; name: string; slug: string; priceLabel: string; duration: string; summary: string; order: number }
type Process = { step: number; title: string; duration: string; description: string }
type Work = { slug: string; title: string; industryTag: string; oneLiner: string }

export default function Home() {
    const services = (servicesData as Service[]).slice().sort((a, b) => a.order - b.order)
    const tierA = services.filter(s => s.tier === 'A')
    const tierB = services.filter(s => s.tier === 'B')
    const process = processData as Process[]
    const featured = (workData as Work[]).slice(0, 3)

    return (
        <>
            <Hero />

            {/* Services — tier A/B */}
            <section className="py-20 md:py-28 border-t border-border">
                <div className="container-page">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div className="max-w-2xl">
                            <p className="text-sm text-accent font-medium mb-3">Services</p>
                            <h2 className="text-3xl md:text-5xl font-semibold text-fg leading-tight">Six fixed-price engagements.</h2>
                            <p className="mt-4 text-fg-muted text-lg">
                                All prices on the site. All scopes written down before work starts. Weekly shipped demos throughout.
                            </p>
                        </div>
                        <Link href="/services" className="text-accent hover:text-accent-hover inline-flex items-center gap-1.5 text-sm font-medium">
                            Full pricing <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xs uppercase tracking-wider text-fg-subtle mb-4">Agentic MVPs · $8–15K · 2–6 weeks</h3>
                            <div className="space-y-3">
                                {tierB.map(s => (
                                    <Link
                                        key={s.slug}
                                        href={`/services/${s.slug}`}
                                        className="card block p-5 hover:border-border-strong transition-colors group"
                                    >
                                        <div className="flex items-center justify-between gap-4 mb-2">
                                            <h4 className="font-medium text-fg group-hover:text-accent transition-colors">{s.name}</h4>
                                            <span className="text-sm text-fg-muted tabular-nums">{s.priceLabel}</span>
                                        </div>
                                        <p className="text-sm text-fg-muted leading-relaxed">{s.summary}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xs uppercase tracking-wider text-fg-subtle mb-4">Agentic Production Systems · $15–30K+ · 6–10 weeks</h3>
                            <div className="space-y-3">
                                {tierA.map(s => (
                                    <Link
                                        key={s.slug}
                                        href={`/services/${s.slug}`}
                                        className="card block p-5 hover:border-border-strong transition-colors group"
                                    >
                                        <div className="flex items-center justify-between gap-4 mb-2">
                                            <h4 className="font-medium text-fg group-hover:text-accent transition-colors">{s.name}</h4>
                                            <span className="text-sm text-fg-muted tabular-nums">{s.priceLabel}</span>
                                        </div>
                                        <p className="text-sm text-fg-muted leading-relaxed">{s.summary}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Work */}
            <section className="py-20 md:py-28 border-t border-border">
                <div className="container-page">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div className="max-w-2xl">
                            <p className="text-sm text-accent font-medium mb-3">Past work</p>
                            <h2 className="text-3xl md:text-5xl font-semibold text-fg leading-tight">Five agentic systems, shipped to production.</h2>
                            <p className="mt-4 text-fg-muted text-lg">
                                Client names are kept private by default. Industry and shape of the work are public. Happy to talk specifics on a scoping call under NDA.
                            </p>
                        </div>
                        <Link href="/work" className="text-accent hover:text-accent-hover inline-flex items-center gap-1.5 text-sm font-medium">
                            All work <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        {featured.map(w => (
                            <Link key={w.slug} href={`/work/${w.slug}`} className="card p-6 block hover:border-border-strong transition-colors group">
                                <p className="text-xs uppercase tracking-wider text-fg-subtle mb-3">{w.industryTag}</p>
                                <h3 className="text-lg font-medium text-fg group-hover:text-accent transition-colors mb-3">{w.title}</h3>
                                <p className="text-sm text-fg-muted leading-relaxed">{w.oneLiner}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-20 md:py-28 border-t border-border">
                <div className="container-page">
                    <div className="max-w-2xl mb-12">
                        <p className="text-sm text-accent font-medium mb-3">How I work</p>
                        <h2 className="text-3xl md:text-5xl font-semibold text-fg leading-tight">Four steps, zero surprises.</h2>
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

            {/* CTA */}
            <section className="py-20 md:py-28 border-t border-border">
                <div className="container-page">
                    <div className="card p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="max-w-xl">
                            <h2 className="text-2xl md:text-3xl font-semibold text-fg mb-3">Got an agentic AI problem worth $8K+ to solve?</h2>
                            <p className="text-fg-muted">30-minute scoping call, free. If it&apos;s not a fit, I&apos;ll tell you.</p>
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
