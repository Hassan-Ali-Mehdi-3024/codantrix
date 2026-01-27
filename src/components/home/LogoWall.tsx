export default function LogoWall() {
    const logos = [
        'Leading Automotive PLC',
        'Global Ag-Tech Group',
        'Karachi Logistics Port',
        'Middle East Retail Mall',
        'South Asia Textile Mill',
        'Punjab Crop Systems',
    ]

    return (
        <section className="py-12 sm:py-14 lg:py-16 bg-black overflow-hidden border-b border-black/5 relative">
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <div className="absolute top-0 inset-x-0 h-20"/>
            </div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#fffdf2]/85 text-center">
                    Trusted for industrial-grade reliability by
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl border border-white/14 bg-white/[0.07] backdrop-blur-2xl shadow-[0_18px_70px_rgba(0,0,0,0.55)] px-6 py-6 overflow-hidden">
                    <div className="flex gap-8 sm:gap-12 lg:gap-14 animate-marquee items-center whitespace-nowrap">
                        {[...logos, ...logos].map((logo, i) => (
                            <div key={i} className="flex items-center gap-4 group">
                                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#f15a2f] via-[#ff6a3c] to-[#ff9a70] text-[#fffdf2] font-extrabold italic flex items-center justify-center shadow-[0_14px_50px_rgba(241,90,47,0.6)]">
                                    CL
                                </div>
                                <span className="text-base sm:text-lg md:text-2xl font-bold uppercase tracking-tight text-[#fffdf2]/85 group-hover:text-[#fffdf2] transition-colors drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
                                    {logo}
                                </span>
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#f15a2f]/70 ml-6 sm:ml-10" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
