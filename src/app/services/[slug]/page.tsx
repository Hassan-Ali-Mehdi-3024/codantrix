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
        <div className="pt-40 pb-24 bg-nm-bg">
            <JsonLd data={generateServiceSchema(service)} />
            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/services" className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-12 block sm:inline-block w-full sm:w-auto text-left hover:text-nm-text transition-colors">
                    ← Back to Services
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div className="flex flex-col items-start text-left">
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-nm-text">{service.name}</h1>
                        <p className="text-xl text-nm-text-muted leading-relaxed mb-12">
                            {service.overview || service.description}
                        </p>

                        <div className="space-y-12 w-full">
                            <div className="flex flex-col items-start">
                                <h3 className="text-2xl font-bold text-brand-orange mb-6 uppercase tracking-wider">Use Cases</h3>
                                <ul className="space-y-4 w-full">
                                    {service.use_cases?.map((useCase: string) => (
                                        <li key={useCase} className="flex flex-row items-start gap-3 text-nm-text-muted text-left">
                                            <Check className="text-brand-orange mt-1 shrink-0" size={18} />
                                            <span>{useCase}</span>
                                        </li>
                                    ))}
                                    {!service.use_cases && <li className="text-nm-text-muted/40 italic text-left">Case-specific applications available on consultation.</li>}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="nm-flat-md p-8 md:p-12 border border-nm-text/5 rounded-3xl text-left">
                            <h3 className="text-2xl font-bold mb-8 text-nm-text">Our Process</h3>
                            <div className="space-y-8">
                                {processSteps?.map((step, i) => (
                                    <div key={i} className="flex flex-row gap-6 items-start text-left">
                                        <div className="text-3xl font-black text-brand-orange/20 leading-none">{i + 1}</div>
                                        <div>
                                            <h4 className="font-bold text-nm-text mb-1">{step.title}</h4>
                                            <p className="text-sm text-nm-text-muted">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                                {!processSteps && (
                                    <p className="text-nm-text-muted/50 italic text-sm">Customized industrial methodology applied to every deployment.</p>
                                )}
                            </div>
                        </div>

                        <div className="nm-flat-lg p-8 md:p-12 rounded-3xl text-left border border-nm-text/5 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl -mr-16 -mt-16" />
                            <h3 className="text-2xl font-bold mb-4 text-nm-text relative z-10">Ready to automate?</h3>
                            <p className="mb-8 text-nm-text-muted relative z-10">Schedule a 15-minute engineering review of your current challenges.</p>
                            <Link
                                href="/contact"
                                className="inline-block w-full py-4 nm-btn-accent text-white text-center font-bold uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all rounded-xl relative z-10"
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
