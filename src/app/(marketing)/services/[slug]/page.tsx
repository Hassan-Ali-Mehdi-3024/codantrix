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

            {/* Header */}
            <section className="pt-40 md:pt-48 pb-16">
                <div className="gutter">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-8 lg:col-start-2">
                            <Link href="/services" className="meta text-fg-45 hover:text-fg-70 transition-colors inline-flex items-center gap-1 mb-10">
                                ← Services
                            </Link>
                            <p className="meta text-fg-45 mb-6">
                                TIER {s.tier} &nbsp;·&nbsp; {s.duration.toUpperCase()}
                            </p>
                            <h1 className="mb-8 text-[48px] md:text-[72px]">{s.name}</h1>
                            <p className="font-mono text-[18px] text-accent mb-8">{s.priceLabel}</p>
                            <p className="body-lg measure">{s.summary}</p>
                        </div>
                    </div>
                </div>
            </section>

            <Block marker="01" label="Who this is for">
                <p className="body text-fg-70 measure">{s.forWho}</p>
            </Block>

            <Block marker="02" label="What's in scope">
                <ul className="space-y-3 measure">
                    {s.scope.map(line => (
                        <li key={line} className="flex gap-3 body text-fg-70">
                            <Check size={18} className="text-accent shrink-0 mt-1" />
                            <span>{line}</span>
                        </li>
                    ))}
                </ul>
            </Block>

            <Block marker="03" label="Not in scope">
                <ul className="space-y-3 measure">
                    {s.outOfScope.map(line => (
                        <li key={line} className="flex gap-3 body text-fg-45">
                            <X size={18} className="text-fg-35 shrink-0 mt-1" />
                            <span>{line}</span>
                        </li>
                    ))}
                </ul>
            </Block>

            {/* Quiet CTA */}
            <section className="py-24 md:py-32">
                <div className="gutter">
                    <div className="grid grid-cols-12 gap-6 items-end">
                        <div className="col-span-12 lg:col-span-6 lg:col-start-2">
                            <h3 className="text-[28px] md:text-[36px] font-display font-medium tracking-tight mb-3">
                                Ready to scope {s.name}?
                            </h3>
                            <p className="body text-fg-70 measure-narrow">
                                30-min call, free. You walk away with clarity either way.
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

function Block({ marker, label, children }: { marker: string; label: string; children: React.ReactNode }) {
    return (
        <section className="py-16 border-t border-hairline">
            <div className="gutter">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-10 lg:col-start-2">
                        <div className="flex items-baseline gap-6 mb-8">
                            <span className="section-marker">{marker}</span>
                            <span className="eyebrow">{label}</span>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}
