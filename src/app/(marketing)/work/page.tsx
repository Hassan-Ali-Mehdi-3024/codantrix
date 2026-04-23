import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import workData from '@/data/work.json'

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
}

export default function WorkPage() {
    const work = (workData as Work[]).slice().sort((a, b) => b.year - a.year)

    return (
        <>
            <section className="pt-32 md:pt-40 pb-16">
                <div className="container-page max-w-3xl">
                    <p className="text-sm text-accent font-medium mb-4">Work</p>
                    <h1 className="text-4xl md:text-6xl font-semibold leading-[1.1] mb-6 text-fg">
                        Five agentic systems, shipped to production.
                    </h1>
                    <p className="text-lg text-fg-muted leading-relaxed">
                        Client names are kept private by default — most of these are running inside products where the AI isn&apos;t something the team wants to advertise. Industry, approach, and outcome are public. Specifics are open on a scoping call under NDA.
                    </p>
                </div>
            </section>

            <section className="py-12 border-t border-border">
                <div className="container-page">
                    <div className="grid md:grid-cols-2 gap-4">
                        {work.map(w => (
                            <Link
                                key={w.slug}
                                href={`/work/${w.slug}`}
                                className="card p-6 md:p-8 block hover:border-border-strong transition-colors group"
                            >
                                <div className="flex items-baseline justify-between gap-4 mb-4">
                                    <p className="text-xs uppercase tracking-wider text-fg-subtle">{w.industryTag}</p>
                                    <p className="text-xs text-fg-subtle font-mono">{w.year}</p>
                                </div>
                                <h2 className="text-xl md:text-2xl font-medium text-fg group-hover:text-accent transition-colors mb-3 leading-tight">
                                    {w.title}
                                </h2>
                                <p className="text-fg-muted leading-relaxed mb-5">{w.oneLiner}</p>
                                <span className="text-sm text-accent inline-flex items-center gap-1.5 font-medium">
                                    Read full writeup <ArrowRight size={14} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-24 border-t border-border">
                <div className="container-page">
                    <div className="card p-8 md:p-12 max-w-3xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h2 className="text-xl md:text-2xl font-semibold text-fg mb-2">Want references or specifics?</h2>
                            <p className="text-fg-muted text-sm">Book a scoping call. Under NDA I can share client names, code walkthroughs, and introductions where permitted.</p>
                        </div>
                        <Link href="/contact" className="btn btn-primary whitespace-nowrap">
                            Book a call
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
