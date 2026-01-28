import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CaseStudyCard from '@/components/cards/CaseStudyCard'
import { ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const supabase = await createClient()

    const industryName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')

    const { data: studies } = await supabase
        .from('case_studies')
        .select('*')
        .ilike('industry', `%${slug}%`) // More flexible matching for slugs like 'logistics' vs 'Logistics & Warehousing'

    const validIndustries = ['manufacturing', 'agriculture', 'logistics', 'real-estate', 'retail', 'warehousing']
    if (!validIndustries.includes(slug)) notFound()

    return (
        <div className="pt-40 pb-24 bg-nm-bg">
            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/" className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-12 inline-block hover:text-nm-text transition-colors">
                    ← Back to Portfolio
                </Link>

                <div className="max-w-3xl mb-24 text-left">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 uppercase tracking-tight text-nm-text">
                        {industryName} <span className="text-brand-orange">Sector.</span>
                    </h1>
                    <p className="text-xl text-nm-text-muted leading-relaxed">
                        Revolutionizing {slug} through pragmatic AI/ML deployment. We focus on {slug}-specific hurdles like data noise, edge constraints, and operational reliability.
                    </p>
                </div>

                {studies && studies.length > 0 && (
                    <div className="mb-24">
                        <h2 className="text-2xl font-bold text-brand-orange mb-12 uppercase tracking-wider">Relevant Evidence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {studies.map((study) => (
                                <CaseStudyCard
                                    key={study.id}
                                    title={study.title}
                                    slug={study.slug}
                                    industry={study.industry || industryName}
                                    client={study.client_name || 'Partner'}
                                    result={study.results ? (Object.values(study.results)[0] as string) : 'High ROI'}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="p-8 sm:p-10 lg:p-14 nm-flat-md border border-nm-text/5 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -mr-32 -mt-32" />
                    <h3 className="text-3xl font-bold mb-8 text-nm-text">Ready to modernize your {slug} ops?</h3>
                    <div className="flex flex-col md:flex-row gap-8 items-center justify-between relative z-10">
                        <p className="text-nm-text-muted max-w-xl text-lg">
                            We specialize in vertical-specific AI infrastructure. Let&apos;s discuss your specific ground-truth data.
                        </p>
                        <Link
                            href="/contact"
                            className="px-8 py-4 nm-btn-accent text-white font-bold uppercase tracking-widest hover:scale-105 active:scale-[0.98] transition-all w-full md:w-auto text-center rounded-xl"
                        >
                            Consult with us <ArrowRight className="inline ml-2" size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
