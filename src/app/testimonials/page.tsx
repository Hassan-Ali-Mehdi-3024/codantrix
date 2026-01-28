import { Star, Building2, Quote, CheckCircle2, Trophy, BarChart3, Rocket } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const testimonials = [
    {
        id: '1',
        client_name: "Sarah Jenkins",
        client_role: "VP of Operations",
        client_company: "AeroLogistics Inc.",
        quote: "We were drowning in manual tracking data. Codantrix didn't just give us a dashboard; they built a neural nervous system for our fleet. Efficiency is up 40% across the board.",
        rating: 5,
        impact: "40% Efficiency Gain"
    },
    {
        id: '2',
        client_name: "Marcus Thorne",
        client_role: "Plant Manager",
        client_company: "HeavyMetal Corp",
        quote: "Predictive maintenance was a buzzword until we installed their edge nodes. Now, we know a bearing is failing 3 weeks before it actually breaks. It's like magic, but it's math.",
        rating: 5,
        impact: "$2M/yr Savings"
    },
    {
        id: '3',
        client_name: "Dr. Al-Fayed",
        client_role: "Director of Innovation",
        client_company: "FutureHealth Systems",
        quote: "Their computer vision models for quality control are detecting defects the human eye misses. Zero-tolerance quality assurance is finally a reality for us.",
        rating: 5,
        impact: "99.9% Accuracy"
    },
    {
        id: '4',
        client_name: "Elena Rodriguez",
        client_role: "CTO",
        client_company: "FinSecure Global",
        quote: "We needed an on-premise solution that respected data sovereignty. Codantrix delivered a secure, air-gapped inference engine that outperforms our cloud legacy systems.",
        rating: 5,
        impact: "100% Data Privacy"
    },
    {
        id: '5',
        client_name: "James Chen",
        client_role: "Head of Retail",
        client_company: "ShopSmart Malls",
        quote: "The foot traffic analytics gave us insights we didn't know existed. We optimized our staffing schedules and saw a 12% bump in conversions in the first month.",
        rating: 5,
        impact: "+12% Conversion"
    },
    {
        id: '6',
        client_name: "David Miller",
        client_role: "Operations Director",
        client_company: "AgriFuture Farms",
        quote: "Automating our irrigation with satellite imagery seemed like sci-fi. Codantrix made it practical, robust, and incredibly easy for our field teams to use.",
        rating: 5,
        impact: "-25% Water Usage"
    }
]

export default function TestimonialsPage() {
    return (
        <div className="pt-40 pb-24 bg-nm-bg">
            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Hero Section */}
                <div className="mb-24 text-left max-w-4xl">
                    <h2 className="text-brand-orange font-bold uppercase tracking-[0.3em] mb-4 text-sm">Validated Results</h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-nm-text mb-8">
                        Industrial <span className="text-brand-orange">Trust.</span>
                    </h1>
                    <p className="text-xl text-nm-text-muted leading-relaxed">
                        We don&apos;t trade in hype. We trade in uptime, accuracy, and ROI. Here is what happens when enterprise engineering meets real-world chaos.
                    </p>
                </div>

                {/* Impact Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24 pb-12 border-b border-nm-text/5">
                    <div className="nm-flat-sm p-8 rounded-3xl text-left border border-nm-text/5">
                        <CheckCircle2 className="text-brand-orange mb-6" size={32} />
                        <h3 className="text-3xl font-black text-nm-text mb-1">95%+</h3>
                        <p className="text-xs font-bold uppercase tracking-widest text-nm-text-muted">Client Retention</p>
                    </div>
                    <div className="nm-flat-sm p-8 rounded-3xl text-left border border-nm-text/5">
                        <BarChart3 className="text-brand-orange mb-6" size={32} />
                        <h3 className="text-3xl font-black text-nm-text mb-1">6 Mos</h3>
                        <p className="text-xs font-bold uppercase tracking-widest text-nm-text-muted">Avg ROI Timeline</p>
                    </div>
                    <div className="nm-flat-sm p-8 rounded-3xl text-left border border-nm-text/5">
                        <Rocket className="text-brand-orange mb-6" size={32} />
                        <h3 className="text-3xl font-black text-nm-text mb-1">100%</h3>
                        <p className="text-xs font-bold uppercase tracking-widest text-nm-text-muted">Uptime for Prod-ML</p>
                    </div>
                    <div className="nm-flat-sm p-8 rounded-3xl text-left border border-nm-text/5">
                        <Trophy className="text-brand-orange mb-6" size={32} />
                        <h3 className="text-3xl font-black text-nm-text mb-1">Elite</h3>
                        <p className="text-xs font-bold uppercase tracking-widest text-nm-text-muted">Engineering DNA</p>
                    </div>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {testimonials.map((t) => (
                        <div key={t.id} className="nm-flat-md p-8 sm:p-10 hover:scale-[1.02] transition-all rounded-3xl flex flex-col group relative overflow-hidden border border-nm-text/5">
                            {/* Decorative Quote */}
                            <Quote className="absolute top-6 right-6 text-brand-orange/10 group-hover:text-brand-orange/20 transition-colors transform scale-150" size={64} />
                            
                            <div className="flex gap-1 mb-8">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} size={14} className="fill-brand-orange text-brand-orange" />
                                ))}
                            </div>

                            <p className="text-nm-text-muted italic leading-relaxed text-lg mb-8 relative z-10">
                                &quot;{t.quote}&quot;
                            </p>

                            <div className="mt-auto pt-8 border-t border-nm-text/10">
                                <div className="flex flex-col gap-1 mb-6">
                                    <h4 className="font-bold text-nm-text text-lg">{t.client_name}</h4>
                                    <div className="flex items-center gap-2 text-xs text-nm-text-muted uppercase tracking-widest font-bold">
                                        <Building2 size={12} />
                                        {t.client_company}
                                    </div>
                                    <p className="text-xs text-brand-orange font-bold uppercase tracking-widest mt-1">
                                        {t.client_role}
                                    </p>
                                </div>
                                <div className="inline-block nm-inset-sm px-4 py-2 text-xs font-black text-brand-orange uppercase tracking-wider rounded-full">
                                    {t.impact}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-32 p-12 nm-flat-lg rounded-3xl text-center border border-nm-text/5 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -ml-32 -mb-32" />
                    
                    <h3 className="text-3xl md:text-4xl font-black text-nm-text mb-6 relative z-10">Ready to be our next success story?</h3>
                    <p className="text-lg text-nm-text-muted max-w-2xl mx-auto mb-10 relative z-10">
                        Stop guessing. Start measuring. Schedule a strategy session to see exactly how we can engineer ROI for your operations.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-10 py-5 nm-btn-accent text-white font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl rounded-full relative z-10"
                    >
                        Schedule Strategy Session
                    </Link>
                </div>
            </div>
        </div>
    )
}
