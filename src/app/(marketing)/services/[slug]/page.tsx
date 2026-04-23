import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, Check, X } from 'lucide-react'
import JsonLd, { generateServiceSchema } from '@/components/seo/JsonLd'
import servicesData from '@/data/services.json'

type Props = { params: Promise<{ slug: string }> }

type Service = {
    tier: string
    name: string
    slug: string
    priceLabel: string
    price: number
    duration: string
    summary: string
    forWho: string
    scope: string[]
    outOfScope: string[]
}

export async function generateStaticParams() {
    return (servicesData as Service[]).map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const s = (servicesData as Service[]).find(x => x.slug === slug)
    if (!s) return { title: 'Service not found' }
    return {
        title: `${s.name} — ${s.priceLabel}`,
        description: s.summary,
    }
}

export default async function ServiceDetailPage({ params }: Props) {
    const { slug } = await params
    const s = (servicesData as Service[]).find(x => x.slug === slug)
    if (!s) notFound()

    return (
        <>
            <JsonLd data={generateServiceSchema({ name: s.name, description: s.summary })} />

            <section className="pt-32 md:pt-40 pb-12">
                <div className="container-page max-w-3xl">
                    <Link href="/services" className="text-sm text-fg-muted hover:text-fg inline-flex items-center gap-1.5 mb-8">
                        ← All services
                    </Link>
                    <p className="text-xs uppercase tracking-wider text-fg-subtle mb-4 font-mono">
                        Tier {s.tier} · {s.duration}
                    </p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                        <h1 className="text-4xl md:text-5xl font-semibold text-fg leading-[1.1]">{s.name}</h1>
                        <p className="text-2xl text-accent font-mono">{s.priceLabel}</p>
                    </div>
                    <p className="text-lg text-fg-muted leading-relaxed">{s.summary}</p>
                </div>
            </section>

            <section className="py-12 border-t border-border">
                <div className="container-page max-w-3xl">
                    <h2 className="text-xs uppercase tracking-wider text-fg-subtle mb-3">Who this is for</h2>
                    <p className="text-fg leading-relaxed">{s.forWho}</p>
                </div>
            </section>

            <section className="py-12 border-t border-border">
                <div className="container-page max-w-3xl">
                    <h2 className="text-xs uppercase tracking-wider text-fg-subtle mb-4">What&apos;s in scope</h2>
                    <ul className="space-y-3">
                        {s.scope.map(line => (
                            <li key={line} className="flex gap-3 text-fg">
                                <Check size={18} className="text-accent shrink-0 mt-1" />
                                <span>{line}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="py-12 border-t border-border">
                <div className="container-page max-w-3xl">
                    <h2 className="text-xs uppercase tracking-wider text-fg-subtle mb-4">Not in scope</h2>
                    <ul className="space-y-3">
                        {s.outOfScope.map(line => (
                            <li key={line} className="flex gap-3 text-fg-muted">
                                <X size={18} className="text-fg-subtle shrink-0 mt-1" />
                                <span>{line}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="py-20 md:py-24 border-t border-border">
                <div className="container-page">
                    <div className="card p-8 md:p-12 max-w-3xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h2 className="text-xl md:text-2xl font-semibold text-fg mb-2">Ready to scope {s.name}?</h2>
                            <p className="text-fg-muted text-sm">30-min call, free. You walk away with clarity either way.</p>
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
