import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Zap, Target, BarChart3 } from 'lucide-react'
import { Metadata } from 'next'
import caseStudiesData from '@/data/case-studies.json'

export const dynamic = 'force-dynamic'

type Props = {
    params: Promise<{ slug: string }>
}

interface CaseStudy {
    id: string
    title: string
    slug: string
    industry: string
    client_name: string
    client_location?: string
    problem: string
    solution: string
    results: Record<string, string>
    technologies: string[]
    duration: string
    team_size: string
    unique_approach: string
    featured: boolean
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const study = (caseStudiesData as unknown as CaseStudy[]).find(s => s.slug === slug)

    if (!study) return { title: 'Case Study Not Found' }

    return {
        title: `${study.title} | ${study.industry} Case Study | Codantrix Labs`,
        description: `Detailed technical overview of our ${study.industry} solution: ${study.title}.`,
    }
}

export default async function CaseStudyDetailPage({ params }: Props) {
    const { slug } = await params
    const study = (caseStudiesData as unknown as CaseStudy[]).find(s => s.slug === slug)

    if (!study) notFound()

    return (
        <div className="pt-40 pb-24 bg-nm-bg">
            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/case-studies" className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-12 flex items-center justify-center sm:justify-start w-full sm:w-auto hover:text-nm-text transition-colors">
                    ← Back to Portfolio
                </Link>

                <div className="max-w-4xl mx-auto sm:mx-0 flex flex-col items-center text-center sm:items-start sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-4 mb-6">
                        <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs px-3 py-1 nm-inset-xs rounded-md">
                            {study.industry}
                        </span>
                        <span className="text-nm-text-muted text-sm">{study.client_name}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-12 leading-tight text-nm-text">{study.title}</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-24 border-y border-nm-text/5 py-12 flex flex-col items-center text-center sm:items-start sm:text-left">
                    <div>
                        <h4 className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-2">Duration</h4>
                        <p className="text-xl font-bold text-nm-text">{study.duration}</p>
                    </div>
                    <div>
                        <h4 className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-2">Team Size</h4>
                        <p className="text-xl font-bold text-nm-text">{study.team_size}</p>
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                        <h4 className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-2">Technology</h4>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                            {study.technologies?.map((tech: string) => (
                                <span key={tech} className="text-[10px] px-2 py-1 bg-nm-bg nm-inset-xs rounded-md text-nm-text-muted font-bold tracking-tight">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <div className="lg:col-span-8 space-y-20 flex flex-col items-center text-center sm:items-start sm:text-left">
                        <section className="w-full">
                            <h3 className="text-2xl font-bold mb-6 flex items-center justify-center sm:justify-start gap-3 text-nm-text">
                                <Target className="text-brand-orange" size={24} /> The Problem
                            </h3>
                            <p className="text-xl text-nm-text-muted leading-relaxed font-medium italic nm-inset-sm p-8 rounded-3xl border-l-4 border-brand-orange">
                                &quot;{study.problem}&quot;
                            </p>
                        </section>

                        <section className="w-full">
                            <h3 className="text-2xl font-bold mb-6 flex items-center justify-center sm:justify-start gap-3 text-nm-text">
                                <Zap className="text-brand-orange" size={24} /> The Solution Architecture
                            </h3>
                            <p className="text-nm-text-muted leading-relaxed text-lg mb-8">
                                {study.solution}
                            </p>
                            <div className="p-8 nm-flat-sm border border-nm-text/5 rounded-3xl text-center sm:text-left relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl -mr-16 -mt-16" />
                                <h4 className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-4 relative z-10">Unique Approach</h4>
                                <p className="text-sm italic text-nm-text-muted leading-relaxed relative z-10">
                                    {study.unique_approach}
                                </p>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-4 w-full">
                        <div className="sticky top-32 p-8 nm-flat-lg border border-nm-text/5 rounded-3xl text-center sm:text-left relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl -mr-16 -mt-16" />
                            <h3 className="text-2xl font-black mb-8 flex items-center justify-center sm:justify-start gap-3 uppercase tracking-tight text-nm-text">
                                <BarChart3 className="text-brand-orange" size={24} /> Key Results
                            </h3>
                            <div className="space-y-8">
                                {Object.entries((study.results ?? {}) as Record<string, unknown>).map(([key, value]) => {
                                    const displayValue =
                                        typeof value === 'string' || typeof value === 'number'
                                            ? String(value)
                                            : value == null
                                                ? ''
                                                : JSON.stringify(value)

                                    return (
                                        <div key={key} className="flex flex-col items-center sm:items-start">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-nm-text-muted/40 mb-1 leading-tight">
                                                {key.replace(/_/g, ' ')}
                                            </p>
                                            <p className="text-3xl font-black tracking-tight leading-none text-brand-orange italic">{displayValue}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="mt-12 pt-8 border-t border-nm-text/5">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center w-full py-4 nm-btn-accent text-white font-bold uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all rounded-xl"
                                >
                                    Consult on this →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
