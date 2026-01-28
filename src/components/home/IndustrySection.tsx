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
        <section className="py-16 sm:py-20 lg:py-32 bg-nm-bg relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <div className="absolute -left-16 top-10 h-[min(56vw,16rem)] w-[min(56vw,16rem)] rounded-full bg-brand-orange blur-[min(16vw,120px)] opacity-5" />
                <div className="absolute right-0 bottom-0 h-[min(52vw,14rem)] w-[min(52vw,14rem)] rounded-full bg-brand-orange blur-[min(14vw,110px)] opacity-5" />
            </div>
            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="mb-14 flex flex-col items-center sm:items-start text-center sm:text-left lg:flex-row lg:items-end lg:justify-between gap-6">
                    <div className="space-y-3 flex flex-col items-center sm:items-start">
                        <h2 className="inline-flex items-center gap-3 rounded-full nm-flat-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-nm-text-muted">Target Verticals</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-nm-text leading-tight">Industries We Perfect</h3>
                        <p className="text-base md:text-lg text-nm-text-muted max-w-2xl">Domain-specific pods tuned for manufacturing, logistics, ag, retail, warehousing, and the built world.</p>
                    </div>
                    <div className="rounded-2xl nm-inset-sm px-6 py-4 text-sm text-nm-text-muted">Ops-grade reliability, not prototypes.</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {industries.map((ind) => (
                        <Link
                            key={ind.slug}
                            href={`/industries/${ind.slug}`}
                            className="group relative overflow-hidden rounded-2xl nm-flat-md p-6 sm:p-7 lg:p-8 transition-all duration-300 hover:scale-[1.02] border border-nm-text/5"
                        >
                            <div className="flex justify-between items-start mb-10 sm:mb-12">
                                <div className="p-3 rounded-xl nm-inset-sm text-brand-orange">
                                    <ind.icon size={28} className="sm:hidden" />
                                    <ind.icon size={32} className="hidden sm:block" />
                                </div>
                                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-brand-orange">
                                    {ind.count}
                                </span>
                            </div>
                            <h4 className="text-xl font-bold text-nm-text mb-2">{ind.name}</h4>
                            <p className="text-xs text-brand-orange font-black uppercase tracking-[0.24em] group-hover:translate-x-1 transition-transform">Explore Solutions →</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
