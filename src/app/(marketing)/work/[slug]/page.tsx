import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import workData from '@/data/work.json'

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
            <section className="pt-32 md:pt-40 pb-12">
                <div className="container-page max-w-3xl">
                    <Link href="/work" className="text-sm text-fg-muted hover:text-fg inline-flex items-center gap-1.5 mb-8">
                        ← All work
                    </Link>
                    <div className="flex items-baseline gap-4 mb-4 font-mono text-xs uppercase tracking-wider text-fg-subtle">
                        <span>{w.industryTag}</span>
                        <span>·</span>
                        <span>{w.year}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-semibold text-fg leading-[1.1] mb-6">{w.title}</h1>
                    <p className="text-lg text-fg-muted leading-relaxed">{w.oneLiner}</p>
                </div>
            </section>

            <Block label="Problem">{w.problem}</Block>
            <Block label="Approach">{w.approach}</Block>
            <Block label="Outcome">{w.outcome}</Block>

            <section className="py-12 border-t border-border">
                <div className="container-page max-w-3xl grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-xs uppercase tracking-wider text-fg-subtle mb-4">Stack</h2>
                        <div className="flex flex-wrap gap-2">
                            {w.stack.map(tech => (
                                <span key={tech} className="text-xs font-mono px-2.5 py-1 border border-border rounded-md text-fg-muted">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xs uppercase tracking-wider text-fg-subtle mb-4">Role</h2>
                        <p className="text-fg-muted leading-relaxed">{w.role}</p>
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-24 border-t border-border">
                <div className="container-page">
                    <div className="card p-8 md:p-12 max-w-3xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h2 className="text-xl md:text-2xl font-semibold text-fg mb-2">Building something similar?</h2>
                            <p className="text-fg-muted text-sm">Book a scoping call — under NDA I can walk through this system and talk specifics about yours.</p>
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

function Block({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <section className="py-12 border-t border-border">
            <div className="container-page max-w-3xl">
                <h2 className="text-xs uppercase tracking-wider text-fg-subtle mb-4">{label}</h2>
                <p className="text-fg leading-relaxed text-lg">{children}</p>
            </div>
        </section>
    )
}
