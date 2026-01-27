import Link from 'next/link'
import { Settings, Leaf, Truck, Building2, ShoppingCart, Warehouse } from 'lucide-react'

const industries = [
    { name: 'Manufacturing', slug: 'manufacturing', icon: Settings, count: '12+ Solutions' },
    { name: 'Agriculture', slug: 'agriculture', icon: Leaf, count: '5,000+ Acres' },
    { name: 'Logistics', slug: 'logistics', icon: Truck, count: '50k parcels/day' },
    { name: 'Real Estate', slug: 'real-estate', icon: Building2, count: '1.2M sq ft' },
    { name: 'Retail', slug: 'retail', icon: ShoppingCart, count: '35% efficiency' },
    { name: 'Warehousing', slug: 'warehousing', icon: Warehouse, count: 'Bespoke AI' },
]

export default function IndustrySection() {
    return (
        <section className="py-16 sm:py-20 lg:py-32 bg-black relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <div className="absolute -left-16 top-10 h-[min(56vw,16rem)] w-[min(56vw,16rem)] rounded-full bg-gradient-to-br from-[#f15a2f]/18 via-[#f15a2f]/10 to-transparent blur-[min(16vw,120px)]" />
                <div className="absolute right-0 bottom-0 h-[min(52vw,14rem)] w-[min(52vw,14rem)] rounded-full bg-gradient-to-br from-[#ff7a50]/18 via-[#f15a2f]/10 to-transparent blur-[min(14vw,110px)]" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="mb-14 flex flex-col items-center sm:items-start text-center sm:text-left lg:flex-row lg:items-end lg:justify-between gap-6">
                    <div className="space-y-3 flex flex-col items-center sm:items-start">
                        <h2 className="inline-flex items-center gap-3 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">Target Verticals</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-[#fffdf2] leading-tight">Industries We Perfect</h3>
                        <p className="text-base md:text-lg text-gray-400 max-w-2xl">Domain-specific pods tuned for manufacturing, logistics, ag, retail, warehousing, and the built world.</p>
                    </div>
                    <div className="rounded-2xl glass-card px-6 py-4 text-sm text-gray-400">Ops-grade reliability, not prototypes.</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {industries.map((ind) => (
                        <Link
                            key={ind.slug}
                            href={`/industries/${ind.slug}`}
                            className="group relative overflow-hidden rounded-2xl glass-card p-6 sm:p-7 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#f15a2f]/50 hover:shadow-[0_0_30px_rgba(241,90,47,0.15)]"
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden>
                                <div className="absolute -top-10 -right-8 h-40 w-40 rounded-full bg-gradient-to-br from-[#f15a2f]/18 via-[#ff7a50]/15 to-transparent blur-2xl" />
                            </div>
                            <div className="flex justify-between items-start mb-10 sm:mb-12">
                                <ind.icon size={28} className="text-gray-600 group-hover:text-[#f15a2f] transition-colors sm:hidden" />
                                <ind.icon size={32} className="text-gray-600 group-hover:text-[#f15a2f] transition-colors hidden sm:block" />
                                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 group-hover:text-[#f15a2f] transition-colors">
                                    {ind.count}
                                </span>
                            </div>
                            <h4 className="text-xl font-bold text-[#fffdf2] mb-2">{ind.name}</h4>
                            <p className="text-xs text-gray-500 group-hover:translate-x-1 transition-transform">Explore Solutions →</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
