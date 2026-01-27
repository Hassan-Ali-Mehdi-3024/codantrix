import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Metadata } from 'next'
import JsonLd, { generateServiceSchema } from '@/components/seo/JsonLd'

type Props = {
    params: Promise<{ slug: string }>
}

type ServiceProcessStep = {
    title: string
    description: string
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const { slug } = await params
        const supabase = await createClient()
        const { data: service } = await supabase
            .from('services')
            .select('name, description')
            .eq('slug', slug)
            .single()

        if (!service) return { title: 'Service Not Found' }

        return {
            title: `${service.name} | Codantrix Labs`,
            description: service.description,
        }
    } catch {
        return { title: 'Service | Codantrix Labs' }
    }
}

export default async function ServiceDetailPage({ params }: Props) {
    const { slug } = await params
    const supabase = await createClient()
    const { data: service } = await supabase
        .from('services')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!service) notFound()

    const processSteps = Array.isArray(service.process) ? (service.process as ServiceProcessStep[]) : null

    return (
        <div className="pt-32 pb-24 bg-black">
            <JsonLd data={generateServiceSchema(service)} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/services" className="text-[#f15a2f] font-bold text-sm uppercase tracking-widest mb-12 block sm:inline-block w-full sm:w-auto text-center sm:text-left hover:text-[#fffdf2] transition-colors">
                    ← Back to Services
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h1 className="text-5xl md:text-7xl font-bold mb-8">{service.name}</h1>
                        <p className="text-xl text-[#fffdf2]/70 leading-relaxed mb-12">
                            {service.overview || service.description}
                        </p>

                        <div className="space-y-12 w-full">
                            <div className="flex flex-col items-center sm:items-start">
                                <h3 className="text-2xl font-bold text-[#f15a2f] mb-6 uppercase tracking-wider">Use Cases</h3>
                                <ul className="space-y-4 w-full">
                                    {service.use_cases?.map((useCase: string) => (
                                        <li key={useCase} className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-[#fffdf2]/60 text-center sm:text-left">
                                            <Check className="text-[#f15a2f] mt-1 shrink-0" size={18} />
                                            <span>{useCase}</span>
                                        </li>
                                    ))}
                                    {!service.use_cases && <li className="text-[#fffdf2]/40 italic text-center sm:text-left">Case-specific applications available on consultation.</li>}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-[#161819] p-8 md:p-12 border border-[#f15a2f]/10 rounded-sm text-center sm:text-left">
                            <h3 className="text-2xl font-bold mb-6">Our Process</h3>
                            <div className="space-y-8">
                                {processSteps?.map((step, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start text-center sm:text-left">
                                        <div className="text-3xl font-black text-[#f15a2f]/20 leading-none">{i + 1}</div>
                                        <div>
                                            <h4 className="font-bold text-[#fffdf2] mb-1">{step.title}</h4>
                                            <p className="text-sm text-[#fffdf2]/50">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                                {!processSteps && (
                                    <p className="text-[#fffdf2]/50 italic text-sm">Customized industrial methodology applied to every deployment.</p>
                                )}
                            </div>
                        </div>

                        <div className="bg-[#f15a2f] p-8 md:p-12 rounded-sm text-[#fffdf2] text-center sm:text-left">
                            <h3 className="text-2xl font-bold mb-4">Ready to automate?</h3>
                            <p className="mb-8 opacity-90">Schedule a 15-minute engineering review of your current challenges.</p>
                            <Link
                                href="/contact"
                                className="inline-block w-full py-4 bg-[#1c1e20] text-center font-bold uppercase tracking-widest text-sm hover:scale-[1.02] transition-all"
                            >
                                Book Review <ArrowRight className="inline ml-2" size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
