import { Star, Building2, Quote, CheckCircle2, Trophy, BarChart3, Rocket } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const testimonials = [
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
        <div className="pt-32 pb-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Hero Section */}
                <div className="mb-24 text-center mx-auto max-w-4xl">
                    <h2 className="text-[#f15a2f] font-bold uppercase tracking-[0.3em] mb-4 text-sm">Validated Results</h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-[#fffdf2] mb-8">
                        Industrial <span className="text-[#f15a2f]">Trust.</span>
                    </h1>
                    <p className="text-xl text-[#fffdf2]/70 leading-relaxed">
                        We don&apos;t trade in hype. We trade in uptime, accuracy, and ROI. Here is what happens when enterprise engineering meets real-world chaos.
                    </p>
                </div>

                {/* Impact Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24 pb-12 border-b border-[#fffdf2]/5">
                    <div className="bg-[#161819] border border-[#f15a2f]/20 p-6 rounded-sm text-center md:text-left">
                        <CheckCircle2 className="text-[#f15a2f] mb-4 mx-auto md:mx-0" size={32} />
                        <h3 className="text-3xl font-black text-[#fffdf2] mb-1">95%+</h3>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#fffdf2]/40">Client Retention</p>
                    </div>
                    <div className="bg-[#161819] border border-[#f15a2f]/20 p-6 rounded-sm text-center md:text-left">
                        <BarChart3 className="text-[#f15a2f] mb-4 mx-auto md:mx-0" size={32} />
                        <h3 className="text-3xl font-black text-[#fffdf2] mb-1">6 Mos</h3>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#fffdf2]/40">Avg ROI Timeline</p>
                    </div>
                    <div className="bg-[#161819] border border-[#f15a2f]/20 p-6 rounded-sm text-center md:text-left">
                        <Rocket className="text-[#f15a2f] mb-4 mx-auto md:mx-0" size={32} />
                        <h3 className="text-3xl font-black text-[#fffdf2] mb-1">100%</h3>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#fffdf2]/40">Uptime for Prod-ML</p>
                    </div>
                    <div className="bg-[#161819] border border-[#f15a2f]/20 p-6 rounded-sm text-center md:text-left">
                        <Trophy className="text-[#f15a2f] mb-4 mx-auto md:mx-0" size={32} />
                        <h3 className="text-3xl font-black text-[#fffdf2] mb-1">Elite</h3>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#fffdf2]/40">Engineering DNA</p>
                    </div>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div key={t.id} className="bg-[#161819] border border-[#fffdf2]/5 p-8 sm:p-10 hover:border-[#f15a2f]/40 transition-all rounded-sm flex flex-col group relative overflow-hidden">
                            {/* Decorative Quote */}
                            <Quote className="absolute top-6 right-6 text-[#fffdf2]/5 group-hover:text-[#f15a2f]/10 transition-colors transform scale-150" size={64} />
                            
                            <div className="flex gap-1 mb-8">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} size={14} className="fill-[#f15a2f] text-[#f15a2f]" />
                                ))}
                            </div>

                            <p className="text-[#fffdf2]/80 italic leading-relaxed text-lg mb-8 relative z-10">
                                &quot;{t.quote}&quot;
                            </p>

                            <div className="mt-auto pt-8 border-t border-[#fffdf2]/5">
                                <div className="flex flex-col gap-1 mb-4">
                                    <h4 className="font-bold text-[#fffdf2] text-lg">{t.client_name}</h4>
                                    <div className="flex items-center gap-2 text-xs text-[#fffdf2]/40 uppercase tracking-widest font-bold">
                                        <Building2 size={12} />
                                        {t.client_company}
                                    </div>
                                    <p className="text-xs text-[#f15a2f] font-bold uppercase tracking-widest mt-1">
                                        {t.client_role}
                                    </p>
                                </div>
                                <div className="inline-block bg-[#f15a2f]/10 border border-[#f15a2f]/20 px-3 py-1 text-xs font-black text-[#f15a2f] uppercase tracking-wider rounded-sm">
                                    {t.impact}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-32 p-12 bg-[#f15a2f] text-[#fffdf2] rounded-sm text-center">
                    <h3 className="text-3xl md:text-4xl font-black mb-6">Ready to be our next success story?</h3>
                    <p className="text-lg opacity-90 max-w-2xl mx-auto mb-10">
                        Stop guessing. Start measuring. Schedule a strategy session to see exactly how we can engineer ROI for your operations.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-10 py-5 bg-[#1c1e20] text-[#fffdf2] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                    >
                        Schedule Strategy Session
                    </Link>
                </div>
            </div>
        </div>
    )
}
