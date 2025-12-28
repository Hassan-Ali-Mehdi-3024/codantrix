import { createClient } from '@/utils/supabase/server'
import CaseStudyCard from '@/components/cards/CaseStudyCard'

export const dynamic = 'force-dynamic'

export default async function CaseStudiesHub() {
    const supabase = await createClient()
    const { data: caseStudies } = await supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="pt-32 pb-24 bg-[#1c1e20]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-16">
                    <h2 className="text-[#f15a2f] font-bold uppercase tracking-[0.3em] mb-4 text-sm">Proof of Performance</h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8">
                        Measured <br /> <span className="text-[#f15a2f]">ROI.</span>
                    </h1>
                    <p className="text-xl text-[#fffdf2]/70 leading-relaxed">
                        We don't talk about theoretical accuracy. We deliver measurable business impact. Here is how we've solved enterprise challenges in the last 12 months.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {caseStudies?.map((study) => (
                        <CaseStudyCard
                            key={study.id}
                            title={study.title}
                            slug={study.slug}
                            industry={study.industry || 'General AI'}
                            client={study.client_name || 'Confidential'}
                            result={study.results ? (Object.values(study.results)[0] as string) : 'High impact results'}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
