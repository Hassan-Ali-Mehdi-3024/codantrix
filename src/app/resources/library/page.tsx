import { createClient } from '@/utils/supabase/server'
import { FileText, Download, Lock, CheckCircle2, Calculator } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ResourceLibraryPage() {
    const supabase = await createClient()
    const { data: resources } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false })

    const typeIcons: Record<string, any> = {
        'whitepaper': FileText,
        'checklist': CheckCircle2,
        'template': FileText,
        'calculator': Calculator
    }

    return (
        <div className="pt-32 pb-24 bg-[#1c1e20]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-24">
                    <h2 className="text-[#f15a2f] font-bold uppercase tracking-[0.3em] mb-4 text-sm">Actionable Intelligence</h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-[#fffdf2] mb-8">
                        The <span className="text-[#f15a2f]">Library.</span>
                    </h1>
                    <p className="text-xl text-[#fffdf2]/70 leading-relaxed max-w-2xl">
                        Frameworks, checklists, and technical whitepapers designed to help enterprise teams navigate the transition to AI-driven industrial operations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resources?.map((res) => {
                        const Icon = typeIcons[res.type] || FileText
                        return (
                            <div key={res.id} className="p-10 bg-[#161819] border border-[#fffdf2]/5 group hover:border-[#f15a2f]/40 transition-all">
                                <div className="w-12 h-12 bg-[#f15a2f]/10 flex items-center justify-center text-[#f15a2f] mb-8">
                                    <Icon size={24} />
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-[#f15a2f] mb-2">
                                    {res.type}
                                </div>
                                <h3 className="text-2xl font-bold text-[#fffdf2] mb-4 leading-tight">
                                    {res.title}
                                </h3>
                                <p className="text-[#fffdf2]/50 text-sm leading-relaxed mb-12">
                                    {res.description}
                                </p>

                                <button className="w-full py-4 border border-[#f15a2f] text-[#f15a2f] text-xs font-black uppercase tracking-widest hover:bg-[#f15a2f] hover:text-[#fffdf2] transition-all flex items-center justify-center gap-3">
                                    {res.lead_capture ? <Lock size={14} /> : <Download size={14} />}
                                    {res.lead_capture ? 'Unlock Resource' : 'Download Now'}
                                </button>
                            </div>
                        )
                    })}

                    {/* Industrial ROI Calculator Teaser */}
                    <div className="p-10 bg-[#1c1e20] border-2 border-dashed border-[#fffdf2]/10 flex flex-col items-center justify-center text-center">
                        <Calculator size={40} className="text-[#fffdf2]/20 mb-6" />
                        <h3 className="text-xl font-bold text-[#fffdf2]/40 mb-2">Live ROI Calculator</h3>
                        <p className="text-xs text-[#fffdf2]/30 uppercase tracking-widest font-bold">Deploying in Phase 2B</p>
                    </div>
                </div>

                <div className="mt-32 p-16 border border-[#fffdf2]/5 bg-[#161819] text-center">
                    <h3 className="text-3xl font-bold text-[#fffdf2] mb-6">Need a custom implementation guide?</h3>
                    <p className="text-[#fffdf2]/60 mb-12 max-w-xl mx-auto">Our engineering team creates bespoke technical roadmaps for complex industrial environments.</p>
                    <a href="/contact" className="inline-block px-12 py-5 bg-[#f15a2f] text-[#fffdf2] font-black uppercase tracking-widest hover:scale-105 transition-all text-sm">
                        Request Engineering Brief
                    </a>
                </div>
            </div>
        </div>
    )
}
