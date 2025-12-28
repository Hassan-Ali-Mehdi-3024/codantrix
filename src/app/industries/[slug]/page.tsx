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
        <div className="pt-32 pb-24 bg-[#1c1e20]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/" className="text-[#f15a2f] font-bold text-sm uppercase tracking-widest mb-12 inline-block">
                    ← Back to Portfolio
                </Link>

                <div className="max-w-3xl mb-24">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 uppercase tracking-tight">
                        {industryName} <span className="text-[#f15a2f]">Sector.</span>
                    </h1>
                    <p className="text-xl text-[#fffdf2]/70 leading-relaxed">
                        Revolutionizing {slug} through pragmatic AI/ML deployment. We focus on {slug}-specific hurdles like data noise, edge constraints, and operational reliability.
                    </p>
                </div>

                {studies && studies.length > 0 && (
                    <div className="mb-24">
                        <h2 className="text-2xl font-bold text-[#f15a2f] mb-12 uppercase tracking-wider">Relevant Evidence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

                <div className="p-12 bg-[#161819] border border-[#f15a2f]/10 rounded-sm">
                    <h3 className="text-3xl font-bold mb-8">Ready to modernize your {slug} ops?</h3>
                    <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                        <p className="text-[#fffdf2]/60 max-w-xl">
                            We specialize in vertical-specific AI infrastructure. Let's discuss your specific ground-truth data.
                        </p>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-[#f15a2f] text-[#fffdf2] font-bold uppercase tracking-widest hover:scale-105 transition-all w-full md:w-auto text-center"
                        >
                            Consult with us <ArrowRight className="inline ml-2" size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
