import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import workData from '@/data/work.json'
import DiagramPlaceholder from '@/components/work/DiagramPlaceholder'

export const metadata: Metadata = {
    title: 'Work — Agentic systems shipped to production',
    description: 'Five agentic AI systems I shipped to production between 2023 and 2024. Client names are private; industry and approach are public.',
}

type Work = {
    slug: string
    title: string
    industryTag: string
    year: number
    oneLiner: string
    stack: string[]
}

export default function WorkPage() {
    const work = (workData as Work[]).slice().sort((a, b) => b.year - a.year)

    return (
        <>
            {/* Header */}
            <section className="pt-40 md:pt-48 pb-16">
                <div className="gutter">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-8 lg:col-start-2">
                            <p className="eyebrow mb-8">Work</p>
                            <h1 className="mb-8 measure-wide">
                                Five agentic systems, shipped to production.
                            </h1>
                            <p className="body-lg measure">
                                Client names are kept private by default — most of these are running inside products where the AI isn&apos;t something the team wants to advertise. Industry, approach, and outcome are public. Specifics on a scoping call under NDA.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Case studies — each a standalone section with staggered diagram */}
            {work.map((w, i) => (
                <section key={w.slug} className="py-16 md:py-20 border-t border-hairline">
                    <div className="gutter">
                        <div className="grid grid-cols-12 gap-x-6 gap-y-10 items-start">
                            {/* Text block — alternates side per i % 2 */}
                            <div
                                className={
                                    i % 2 === 0
                                        ? 'col-span-12 lg:col-span-5 lg:col-start-2 order-1'
                                        : 'col-span-12 lg:col-span-5 lg:col-start-7 order-1 lg:order-2'
                                }
                            >
                                <div className="flex items-baseline justify-between mb-6">
                                    <span className="meta uppercase tracking-widest text-accent">{w.industryTag}</span>
                                    <span className="meta">{w.year}</span>
                                </div>
                                <h2 className="text-[36px] md:text-[48px] font-display font-medium tracking-tight leading-[1.05] mb-6">
                                    {w.title}
                                </h2>
                                <p className="body text-fg-70 mb-8">{w.oneLiner}</p>

                                <p className="meta mb-8">
                                    {w.stack.join(' · ')}
                                </p>

                                <Link href={`/work/${w.slug}`} className="link-arrow">
                                    Request walkthrough <ArrowRight size={14} />
                                </Link>
                            </div>

                            {/* Diagram placeholder — opposite side */}
                            <div
                                className={
                                    i % 2 === 0
                                        ? 'col-span-12 lg:col-span-5 lg:col-start-7 order-2'
                                        : 'col-span-12 lg:col-span-5 lg:col-start-2 order-2 lg:order-1'
                                }
                            >
                                <DiagramPlaceholder />
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* Bottom line — single hairline, single line of copy per spec */}
            <section className="py-16 border-t border-hairline">
                <div className="gutter">
                    <div className="grid grid-cols-12 gap-6 items-baseline">
                        <div className="col-span-12 lg:col-span-10 lg:col-start-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4">
                            <p className="body text-fg-70">
                                All case studies — book a call for the full walkthrough.
                            </p>
                            <Link href="/book" className="link-arrow">
                                Book a call <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
