export default function SocialProof() {
    const stats = [
        { label: 'Validated Solutions', value: '12+', sub: 'Enterprise Scale' },
        { label: 'Avg Efficiency Gain', value: '80%', sub: 'Industrial Ops' },
        { label: 'Annual ROI', value: '$1.2M+', sub: 'Client Savings' },
        { label: 'Team Size', value: 'Founding', sub: 'Elite DNA' },
    ]

    return (
        <section className="py-20 bg-transparent border-y border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/5 via-white/0 to-transparent" />
            </div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 text-center md:text-left">
                    {stats.map((stat) => (
                        <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-lg p-6 shadow-[0_16px_60px_rgba(0,0,0,0.35)]">
                            <p className="text-4xl md:text-5xl font-black text-[#f15a2f] mb-2 tracking-tight drop-shadow-[0_10px_30px_rgba(241,90,47,0.25)]">
                                {stat.value}
                            </p>
                            <p className="text-xs font-bold text-[#fffdf2] uppercase tracking-[0.22em]">
                                {stat.label}
                            </p>
                            <p className="text-[11px] text-[#fffdf2]/50 mt-2 uppercase tracking-[0.12em]">
                                {stat.sub}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
