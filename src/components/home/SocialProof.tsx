export default function SocialProof() {
    const stats = [
        { label: 'Validated Solutions', value: '08+', sub: 'Enterprise Scale' },
        { label: 'Avg Efficiency Gain', value: '60-80%', sub: 'Industrial Ops' },
        { label: 'Annual ROI', value: '120K+', sub: 'Client Savings' },
        { label: 'Funding Raised', value: '250K', sub: 'Elite DNA' },
    ]

    return (
        <section className="py-14 sm:py-16 lg:py-20 bg-black relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <div className="absolute inset-x-0 top-0 h-32" />
            </div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 text-center md:text-left">
                    {stats.map((stat) => (
                        <div key={stat.label} className="rounded-2xl glass-card p-5 sm:p-6">
                            <p className="text-4xl md:text-5xl font-black text-[#f15a2f] mb-2 tracking-tight drop-shadow-[0_10px_30px_rgba(241,90,47,0.25)]">
                                {stat.value}
                            </p>
                            <p className="text-xs font-bold text-[#fffdf2] uppercase tracking-[0.22em]">
                                {stat.label}
                            </p>
                            <p className="text-[11px] text-gray-400 mt-2 uppercase tracking-[0.12em]">
                                {stat.sub}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
