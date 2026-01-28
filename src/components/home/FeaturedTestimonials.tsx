import { testimonials } from '@/app/testimonials/page'
import { Star, Quote } from 'lucide-react'
import Link from 'next/link'

export default function FeaturedTestimonials() {
    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-nm-bg relative overflow-hidden">
            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
                    <div className="lg:col-span-4 space-y-6 flex flex-col items-start text-left">
                        <h2 className="inline-flex items-center gap-3 rounded-full nm-flat-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-nm-text-muted">Social Proof</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-nm-text leading-tight">What Partners <span className="text-brand-orange">Say.</span></h3>
                        <p className="text-nm-text-muted text-base md:text-lg">We focus on high-impact deployment. Our results are measured by industrial uptime and bottom-line savings.</p>
                        <Link href="/testimonials" className="inline-flex items-center justify-center rounded-full nm-flat-sm px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-nm-text hover:nm-flat-md hover:text-brand-orange transition-all duration-300 active:nm-pressed-sm">
                            View All Proof
                        </Link>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {testimonials.slice(0, 2).map((t) => (
                                <div key={t.id} className="relative overflow-hidden rounded-2xl nm-flat-md p-7 sm:p-8 lg:p-10 transition-transform duration-300 border border-nm-text/5">
                                    <Quote className="text-brand-orange/10 absolute top-6 right-6" size={56} />
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Star key={i} size={14} className="fill-brand-orange text-brand-orange" />
                                        ))}
                                    </div>
                                    <p className="text-nm-text-muted italic mb-8 relative z-10 leading-relaxed">&quot;{t.quote}&quot;</p>
                                    <div className="pt-6 border-t border-nm-text/10 flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-nm-text">{t.client_name}</h4>
                                            <p className="text-[10px] text-brand-orange font-black uppercase tracking-[0.24em]">{t.client_company}</p>
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.22em] text-nm-text-muted">Partner</span>
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
