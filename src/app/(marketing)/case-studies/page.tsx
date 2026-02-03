import CaseStudyCard from '@/components/cards/CaseStudyCard'
import caseStudiesData from '@/data/case-studies.json'

export const dynamic = 'force-dynamic'

interface CaseStudy {
    id: string
    title: string
    slug: string
    industry: string
    client_name: string
    results: Record<string, string>
}

export default function CaseStudiesHub() {
    const studies = caseStudiesData as unknown as CaseStudy[]

    return (
        <div className="pt-40 pb-24 bg-nm-bg">
            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-16 flex flex-col items-center text-center sm:items-start sm:text-left mx-auto sm:mx-0">
                    <h2 className="text-brand-orange font-bold uppercase tracking-[0.3em] mb-4 text-sm">Proof of Performance</h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 text-nm-text">
                        Measured <br /> <span className="text-brand-orange">ROI.</span>
                    </h1>
                    <p className="text-xl text-nm-text-muted leading-relaxed">
                        We don&apos;t talk about theoretical accuracy. We deliver measurable business impact. Here is how we&apos;ve solved enterprise challenges in the last 12 months.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {studies.map((study) => (
                        <CaseStudyCard
                            key={study.id}
                            title={study.title}
                            slug={study.slug}
                            industry={study.industry}
                            client={study.client_name}
                            result={Object.entries(study.results).map(([k, v]) => `${k}: ${v}`).join(', ')}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
