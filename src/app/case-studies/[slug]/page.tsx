import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Zap, Target, BarChart3 } from 'lucide-react'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const { slug } = await params
        const supabase = await createClient()
        const { data: study } = await supabase
            .from('case_studies')
            .select('title, industry')
            .eq('slug', slug)
            .single()

        if (!study) return { title: 'Case Study Not Found' }

        return {
            title: `${study.title} | ${study.industry} Case Study | Codantrix Labs`,
            description: `Detailed technical overview of our ${study.industry} solution: ${study.title}.`,
        }
    } catch {
        return { title: 'Case Study | Codantrix Labs' }
    }
}

export default async function CaseStudyDetailPage({ params }: Props) {
    const { slug } = await params
    const supabase = await createClient()
    const { data: study } = await supabase
        .from('case_studies')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!study) notFound()

    return (
        <div className="pt-32 pb-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/case-studies" className="text-[#f15a2f] font-bold text-sm uppercase tracking-widest mb-12 block sm:inline-block w-full sm:w-auto text-center sm:text-left hover:text-[#fffdf2] transition-colors">
                    ← Back to Portfolio
                </Link>

                <div className="max-w-4xl mx-auto sm:mx-0 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-4 mb-6">
                        <span className="text-[#f15a2f] font-bold uppercase tracking-[0.2em] text-xs px-3 py-1 bg-[#f15a2f]/10 rounded-sm">
                            {study.industry}
                        </span>
                        <span className="text-[#fffdf2]/40 text-sm">{study.client_name}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-12 leading-tight">{study.title}</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 border-y border-[#fffdf2]/10 py-12 text-center sm:text-left">
                    <div>
                        <h4 className="text-[#f15a2f] font-bold uppercase tracking-widest text-xs mb-2">Duration</h4>
                        <p className="text-xl font-bold text-[#fffdf2]">{study.duration}</p>
                    </div>
                    <div>
                        <h4 className="text-[#f15a2f] font-bold uppercase tracking-widest text-xs mb-2">Team Size</h4>
                        <p className="text-xl font-bold text-[#fffdf2]">{study.team_size}</p>
                    </div>
                    <div>
                        <h4 className="text-[#f15a2f] font-bold uppercase tracking-widest text-xs mb-2">Technology</h4>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                            {study.technologies?.map((tech: string) => (
                                <span key={tech} className="text-[10px] px-2 py-0.5 bg-[#fffdf2]/5 border border-[#fffdf2]/10 text-[#fffdf2]/60 font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <div className="lg:col-span-8 space-y-20 text-center sm:text-left">
                        <section>
                            <h3 className="text-2xl font-bold mb-6 flex items-center justify-center sm:justify-start gap-3">
                                <Target className="text-[#f15a2f]" size={24} /> The Problem
                            </h3>
                            <p className="text-xl text-[#fffdf2]/70 leading-relaxed font-medium italic">
                                &quot;{study.problem}&quot;
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold mb-6 flex items-center justify-center sm:justify-start gap-3">
                                <Zap className="text-[#f15a2f]" size={24} /> The Solution Architecture
                            </h3>
                            <p className="text-[#fffdf2]/60 leading-relaxed text-lg">
                                {study.solution}
                            </p>
                            <div className="mt-8 p-8 bg-[#161819] border border-[#f15a2f]/10 rounded-sm text-center sm:text-left">
                                <h4 className="text-[#f15a2f] font-bold uppercase tracking-widest text-xs mb-4">Unique Approach</h4>
                                <p className="text-sm italic text-[#fffdf2]/70 leading-relaxed">
                                    {study.unique_approach}
                                </p>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-32 p-8 bg-[#fffdf2] text-[#1c1e20] rounded-sm shadow-2xl text-center sm:text-left">
                            <h3 className="text-2xl font-black mb-8 flex items-center justify-center sm:justify-start gap-3 uppercase tracking-tight">
                                <BarChart3 size={24} /> Key Results
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
                                        <div key={key}>
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1 leading-tight">
                                                {key.replace(/_/g, ' ')}
                                            </p>
                                            <p className="text-2xl font-black tracking-tight leading-none">{displayValue}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="mt-12 pt-8 border-t border-[#1c1e20]/10">
                                <Link
                                    href="/contact"
                                    className="inline-block w-full py-4 bg-[#f15a2f] text-[#fffdf2] text-center font-bold uppercase tracking-widest text-sm hover:translate-y-[-2px] transition-all"
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
