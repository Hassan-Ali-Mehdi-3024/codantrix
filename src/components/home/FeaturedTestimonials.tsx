import { createClient } from '@/utils/supabase/server'
import { Star, Quote } from 'lucide-react'
import Link from 'next/link'

export default async function FeaturedTestimonials() {
    const supabase = await createClient()
    const { data: testimonials } = await supabase
        .from('testimonials')
        .select('*')
        .eq('featured', true)
        .limit(3)

    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-black relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-[#000000]/18 via-[#000000]/8 to-transparent blur-[min(18vw,140px)] pointer-events-none" aria-hidden />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start lg:items-center">
                    <div className="lg:col-span-4 space-y-6 flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h2 className="inline-flex items-center gap-3 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">Social Proof</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-[#fffdf2] leading-tight">What Partners <span className="text-[#f15a2f]">Say.</span></h3>
                        <p className="text-[#fffdf2]/70 text-base md:text-lg">We focus on high-impact deployment. Our results are measured by industrial uptime and bottom-line savings.</p>
                        <Link href="/testimonials" className="inline-flex items-center justify-center rounded-full glass-btn px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#fffdf2] hover:border-[#f15a2f]/60 hover:text-[#f15a2f] transition-all duration-300">
                            View All Proof
                        </Link>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            {testimonials?.slice(0, 2).map((t) => (
                                <div key={t.id} className="relative overflow-hidden rounded-2xl glass-card p-7 sm:p-8 lg:p-10 transition-transform duration-300">
                                    <Quote className="text-[#f15a2f]/12 absolute top-6 right-6" size={56} />
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Star key={i} size={14} className="fill-[#f15a2f] text-[#f15a2f]" />
                                        ))}
                                    </div>
                                    <p className="text-[#fffdf2]/80 italic mb-8 relative z-10 leading-relaxed">&quot;{t.quote}&quot;</p>
                                    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-[#fffdf2]">{t.client_name}</h4>
                                            <p className="text-[10px] text-[#f15a2f] font-black uppercase tracking-[0.24em]">{t.client_company}</p>
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.22em] text-[#fffdf2]/50">Partner</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
