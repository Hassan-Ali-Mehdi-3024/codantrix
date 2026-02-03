import { notFound } from 'next/navigation'
import Link from 'next/link'
import CaseStudyCard from '@/components/cards/CaseStudyCard'
import { ArrowRight, Check } from 'lucide-react'
import industriesData from '@/data/industries.json'
import caseStudiesData from '@/data/case-studies.json'

export const dynamic = 'force-dynamic'

interface Industry {
    name: string
    slug: string
    description: string
    problem: string
    how_it_works: string
    expectations: string
    icon: string
    hurdles: string[]
}

interface CaseStudy {
    id: string
    title: string
    slug: string
    industry: string
    client_name: string
    results: Record<string, string>
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const industry = (industriesData as Industry[]).find(i => i.slug === slug)

    if (!industry) notFound()

    const studies = (caseStudiesData as unknown as CaseStudy[]).filter(study => 
        study.industry.toLowerCase().includes(slug.toLowerCase()) || 
        slug.toLowerCase().includes(study.industry.toLowerCase())
    )

    return (
        <div className="pt-40 pb-24 bg-nm-bg">
            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/industries" className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-12 inline-flex items-center justify-center sm:justify-start w-full sm:w-auto hover:text-nm-text transition-colors">
                    ← Back to Industries
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-nm-text">
                            {industry.name} <span className="text-brand-orange">Sector.</span>
                        </h1>
                        <p className="text-xl text-nm-text-muted leading-relaxed mb-12">
                            {industry.description}
                        </p>

                        <div className="space-y-12 w-full">
                            <div className="flex flex-col items-center sm:items-start">
                                <h3 className="text-2xl font-bold text-brand-orange mb-4 uppercase tracking-wider">The Vertical Hurdle</h3>
                                <p className="text-lg text-nm-text-muted leading-relaxed">
                                    {industry.problem}
                                </p>
                            </div>

                            <div className="flex flex-col items-center sm:items-start">
                                <h3 className="text-2xl font-bold text-brand-orange mb-4 uppercase tracking-wider">Our Approach</h3>
                                <p className="text-lg text-nm-text-muted leading-relaxed">
                                    {industry.how_it_works}
                                </p>
                            </div>

                            <div className="flex flex-col items-center sm:items-start">
                                <h3 className="text-2xl font-bold text-brand-orange mb-4 uppercase tracking-wider">The Business Impact</h3>
                                <p className="text-lg text-nm-text-muted leading-relaxed">
                                    {industry.expectations}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="nm-flat-md p-8 md:p-12 border border-nm-text/5 rounded-3xl flex flex-col items-center text-center sm:items-start sm:text-left">
                            <h3 className="text-2xl font-bold mb-8 text-nm-text">Specific Challenges</h3>
                            <div className="space-y-4 w-full">
                                {industry.hurdles.map((hurdle, i) => (
                                    <div key={i} className="flex flex-row items-center gap-4 text-nm-text-muted">
                                        <Check className="text-brand-orange shrink-0" size={18} />
                                        <span className="font-medium text-left">{hurdle}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {studies && studies.length > 0 && (
                            <div className="space-y-8 flex flex-col items-center sm:items-start">
                                <h3 className="text-2xl font-bold text-nm-text px-4">Relevant Evidence</h3>
                                <div className="grid grid-cols-1 gap-6 w-full">
                                    {studies.map((study) => (
                                        <CaseStudyCard
                                            key={study.id}
                                            title={study.title}
                                            slug={study.slug}
                                            industry={study.industry}
                                            client={study.client_name}
                                            result={Object.values(study.results)[0] as string}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-24 p-8 sm:p-10 lg:p-14 nm-flat-md border border-nm-text/5 rounded-3xl relative overflow-hidden flex flex-col items-center sm:items-stretch text-center sm:text-left">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -mr-32 -mt-32" />
                    <h3 className="text-3xl font-bold mb-8 text-nm-text">Ready to modernize your {industry.name} ops?</h3>
                    <div className="flex flex-col md:flex-row gap-8 items-center justify-between relative z-10 w-full">
                        <p className="text-nm-text-muted max-w-xl text-lg">
                            We specialize in vertical-specific AI infrastructure. Let&apos;s discuss your specific ground-truth data challenges.
                        </p>
                        <Link
                            href="/contact"
                            className="px-8 py-4 nm-btn-accent text-white font-bold uppercase tracking-widest hover:scale-105 active:scale-[0.98] transition-all w-full md:w-auto text-center rounded-xl"
                        >
                            Book a Consultation <ArrowRight className="inline ml-2" size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
