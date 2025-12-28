import { createClient } from '@/utils/supabase/server'
import { Star, Building2, Quote } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function TestimonialsPage() {
    const supabase = await createClient()
    const { data: testimonials } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="pt-32 pb-24 bg-[#1c1e20]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-24">
                    <h2 className="text-[#f15a2f] font-bold uppercase tracking-[0.3em] mb-4 text-sm">Proof of Performance</h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-[#fffdf2] mb-8">
                        Enterprise <span className="text-[#f15a2f]">Trust.</span>
                    </h1>
                    <p className="text-xl text-[#fffdf2]/70 leading-relaxed max-w-2xl">
                        We don't just build models; we build industrial reliable systems. Hear from the partners who have integrated Codantrix into their core operations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials?.map((t) => (
                        <div key={t.id} className="p-8 bg-[#161819] border border-[#fffdf2]/5 hover:border-[#f15a2f]/40 transition-all group flex flex-col justify-between">
                            <div>
                                <div className="flex gap-1 mb-8">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-[#f15a2f] text-[#f15a2f]" />
                                    ))}
                                </div>
                                <Quote className="text-[#f15a2f]/20 mb-4" size={40} />
                                <p className="text-[#fffdf2]/80 italic leading-relaxed text-lg mb-8">
                                    "{t.quote}"
                                </p>
                            </div>
                            <div className="pt-8 border-t border-[#fffdf2]/5 mt-auto">
                                <h4 className="font-bold text-[#fffdf2]">{t.client_name}</h4>
                                <div className="flex items-center gap-2 text-xs text-[#fffdf2]/40 uppercase tracking-widest font-bold mt-1">
                                    <Building2 size={12} />
                                    {t.client_role}, {t.client_company}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Indicators Section */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-4 gap-12 py-16 border-y border-[#fffdf2]/5">
                    <div className="text-center md:text-left">
                        <p className="text-4xl font-black text-[#f15a2f] mb-2 tracking-tighter">95%+</p>
                        <p className="text-xs font-bold text-[#fffdf2]/40 uppercase tracking-widest leading-tight">Client Retention</p>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-4xl font-black text-[#f15a2f] mb-2 tracking-tighter">6 Mos</p>
                        <p className="text-xs font-bold text-[#fffdf2]/40 uppercase tracking-widest leading-tight">Avg ROI Timeline</p>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-4xl font-black text-[#f15a2f] mb-2 tracking-tighter">100%</p>
                        <p className="text-xs font-bold text-[#fffdf2]/40 uppercase tracking-widest leading-tight">Uptime for Prod-ML</p>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-4xl font-black text-[#f15a2f] mb-2 tracking-tighter">Elite</p>
                        <p className="text-xs font-bold text-[#fffdf2]/40 uppercase tracking-widest leading-tight">Engineering DNA</p>
                    </div>
                </div>

                <div className="mt-24 text-center">
                    <h3 className="text-3xl font-bold mb-8">Ready to be our next success story?</h3>
                    <Link
                        href="/contact"
                        className="inline-block px-12 py-5 bg-[#f15a2f] text-[#fffdf2] text-xl font-bold hover:scale-[1.05] transition-all"
                    >
                        Schedule a Strategy Session
                    </Link>
                </div>
            </div>
        </div>
    )
}
