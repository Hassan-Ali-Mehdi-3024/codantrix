import { FileText, Download, Lock, CheckCircle2, Calculator, ArrowRight } from 'lucide-react'
import type { ElementType } from 'react'
import Link from 'next/link'
import resourcesData from '@/data/resources.json'

export const dynamic = 'force-dynamic'

interface Resource {
    id: string
    title: string
    description: string
    type: string
    lead_capture: boolean
}

export default async function ResourceLibraryPage() {
    const resources = resourcesData as Resource[]

    const typeIcons: Record<string, ElementType> = {
        'whitepaper': FileText,
        'checklist': CheckCircle2,
        'template': FileText,
        'calculator': Calculator
    }

    return (
        <div className="pt-40 pb-24 bg-nm-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-24 flex flex-col items-center text-center sm:items-start sm:text-left max-w-2xl mx-auto sm:mx-0">
                    <h2 className="text-brand-orange font-bold uppercase tracking-[0.3em] mb-4 text-sm">Actionable Intelligence</h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-nm-text mb-8">
                        The <span className="text-brand-orange">Library.</span>
                    </h1>
                    <p className="text-xl text-nm-text-muted leading-relaxed">
                        Frameworks, checklists, and technical whitepapers designed to help enterprise teams navigate the transition to AI-driven industrial operations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {resources?.map((res) => {
                        const Icon = typeIcons[res.type] || FileText
                        return (
                            <div key={res.id} className="p-8 sm:p-10 nm-flat-md border border-nm-text/5 rounded-3xl group hover:scale-[1.02] transition-all flex flex-col items-center text-center sm:items-start sm:text-left justify-between">
                                <div className="w-full">
                                    <div className="w-14 h-14 nm-inset-sm rounded-2xl flex items-center justify-center text-brand-orange mb-8 group-hover:bg-brand-orange group-hover:text-white transition-colors mx-auto sm:mx-0">
                                        <Icon size={28} />
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-brand-orange mb-3">
                                        {res.type}
                                    </div>
                                    <h3 className="text-2xl font-bold text-nm-text mb-4 leading-tight group-hover:text-brand-orange transition-colors">
                                        {res.title}
                                    </h3>
                                    <p className="text-nm-text-muted text-sm leading-relaxed mb-12 line-clamp-3">
                                        {res.description}
                                    </p>
                                </div>

                                <button className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                                    res.lead_capture 
                                    ? 'nm-btn-accent text-white shadow-lg' 
                                    : 'nm-flat-sm text-brand-orange hover:text-nm-text'
                                }`}>
                                    {res.lead_capture ? <Lock size={14} /> : <Download size={14} />}
                                    {res.lead_capture ? 'Unlock Resource' : 'Download Now'}
                                </button>
                            </div>
                        )
                    })}

                    {/* Industrial ROI Calculator Teaser */}
                    <div className="p-8 sm:p-10 nm-inset-md border-2 border-dashed border-nm-text/5 rounded-3xl flex flex-col items-center justify-center text-center">
                        <Calculator size={48} className="text-nm-text/10 mb-6" />
                        <h3 className="text-xl font-bold text-nm-text/20 mb-2 tracking-tight">Custom ROI Models</h3>
                        <p className="text-xs text-nm-text/10 uppercase tracking-widest font-black">Deploying in Phase 2B</p>
                    </div>
                </div>

                <div className="mt-32 p-8 sm:p-12 lg:p-16 nm-flat-lg border border-nm-text/5 bg-nm-bg rounded-[40px] flex flex-col items-center text-center sm:items-start sm:text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -mr-32 -mt-32" />
                    <h3 className="text-3xl font-bold text-nm-text mb-6 relative z-10">Need a custom implementation guide?</h3>
                    <p className="text-nm-text-muted mb-12 max-w-xl text-lg leading-relaxed relative z-10">Our engineering team creates bespoke technical roadmaps for complex industrial environments.</p>
                    <Link href="/contact" className="inline-flex items-center justify-center gap-3 px-10 py-5 nm-btn-accent text-white font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all text-xs rounded-xl relative z-10 w-full sm:w-auto">
                        Request Engineering Brief <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    )
}
