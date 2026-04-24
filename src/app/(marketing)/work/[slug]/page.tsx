import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import workData from '@/data/work.json'
import DiagramPlaceholder from '@/components/work/DiagramPlaceholder'

type Props = { params: Promise<{ slug: string }> }

type Work = {
    slug: string
    title: string
    industryTag: string
    year: number
    oneLiner: string
    problem: string
    approach: string
    outcome: string
    stack: string[]
    role: string
}

export async function generateStaticParams() {
    return (workData as Work[]).map(w => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const w = (workData as Work[]).find(x => x.slug === slug)
    if (!w) return { title: 'Not found' }
    return {
        title: `${w.title} — ${w.industryTag}`,
        description: w.oneLiner,
    }
}

export default async function WorkDetailPage({ params }: Props) {
    const { slug } = await params
    const w = (workData as Work[]).find(x => x.slug === slug)
    if (!w) notFound()

    return (
        <>
            {/* Header */}
            <section className="pt-40 md:pt-48 pb-12">
                <div className="gutter">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-8 lg:col-start-2">
                            <Link href="/work" className="meta text-fg-45 hover:text-fg-70 transition-colors inline-flex items-center gap-1 mb-10">
                                ← All work
                            </Link>
                            <div className="flex items-baseline gap-4 mb-6 font-mono text-[13px] uppercase tracking-widest">
                                <span className="text-accent">{w.industryTag}</span>
                                <span className="text-fg-35">·</span>
                                <span className="text-fg-45">{w.year}</span>
                            </div>
                            <h1 className="mb-8 text-[48px] md:text-[72px]">{w.title}</h1>
                            <p className="body-lg measure">{w.oneLiner}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Diagram placeholder */}
            <section className="py-12">
                <div className="gutter">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-10 lg:col-start-2">
                            <DiagramPlaceholder />
                        </div>
                    </div>
                </div>
            </section>

            <Block marker="01" label="Problem">{w.problem}</Block>
            <Block marker="02" label="Approach">{w.approach}</Block>
            <Block marker="03" label="Outcome">{w.outcome}</Block>

            {/* Stack + role */}
            <section className="py-16 border-t border-hairline">
                <div className="gutter">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 md:col-span-5 lg:col-start-2 mb-10 md:mb-0">
                            <div className="flex items-baseline gap-6 mb-6">
                                <span className="section-marker">04</span>
                                <span className="eyebrow">Stack</span>
                            </div>
                            <p className="meta text-fg-70">
                                {w.stack.join(' · ')}
                            </p>
                        </div>
                        <div className="col-span-12 md:col-span-5 md:col-start-7">
                            <div className="flex items-baseline gap-6 mb-6">
                                <span className="section-marker">05</span>
                                <span className="eyebrow">Role</span>
                            </div>
                            <p className="body text-fg-70">{w.role}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quiet CTA */}
            <section className="py-24 md:py-32">
                <div className="gutter">
                    <div className="grid grid-cols-12 gap-6 items-end">
                        <div className="col-span-12 lg:col-span-6 lg:col-start-2">
                            <h3 className="text-[28px] md:text-[36px] font-display font-medium tracking-tight mb-3">
                                Building something similar?
                            </h3>
                            <p className="body text-fg-70 measure-narrow">
                                Under NDA I can walk through this system and talk specifics about yours.
                            </p>
                        </div>
                        <div className="col-span-12 lg:col-span-4 lg:col-start-8 lg:justify-self-end">
                            <Link href="/book" className="btn btn-primary">
                                Book a call
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
                    <div className="col-span-12 lg:col-span-8 lg:col-start-2">
                        <div className="flex items-baseline gap-6 mb-8">
                            <span className="section-marker">{marker}</span>
                            <span className="eyebrow">{label}</span>
                        </div>
                        <p className="body text-fg-70 measure">{children}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
