import Link from 'next/link'
import { ArrowRight, Factory, Leaf, Truck, ShoppingCart, Zap, Package } from 'lucide-react'
import industriesData from '@/data/industries.json'

export const dynamic = 'force-dynamic'

const iconMap: Record<string, any> = {
    factory: Factory,
    leaf: Leaf,
    truck: Truck,
    'shopping-cart': ShoppingCart,
    zap: Zap,
    package: Package,
}

interface Industry {
    name: string
    slug: string
    description: string
    icon: string
    hurdles: string[]
}

export default function IndustriesHub() {
    const industries = industriesData as Industry[]

    return (
        <div className="pt-40 pb-24 bg-nm-bg">
            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-20 text-left">
                    <h2 className="text-brand-orange font-bold uppercase tracking-[0.3em] mb-4 text-sm">Target Verticals</h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 text-nm-text">
                        Industry <br /> <span className="text-brand-orange">Pragmatism.</span>
                    </h1>
                    <p className="text-xl text-nm-text-muted leading-relaxed">
                        We don&apos;t build generic AI. We build vertical-specific solutions that understand the unique hurdles, data constraints, and operational realities of your sector.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {industries.map((industry, i) => {
                        const Icon = iconMap[industry.icon] || Factory
                        return (
                            <Link
                                key={industry.slug}
                                href={`/industries/${industry.slug}`}
                                className="group p-8 sm:p-10 nm-flat-md border border-nm-text/5 rounded-3xl hover:scale-[1.02] transition-all duration-300 flex flex-col items-start text-left relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-brand-orange/10 transition-colors" />
                                
                                <div className="w-14 h-14 nm-inset-sm rounded-2xl flex items-center justify-center mb-8 text-brand-orange group-hover:nm-flat-sm transition-all">
                                    <Icon size={28} />
                                </div>

                                <h3 className="text-2xl font-bold mb-4 text-nm-text group-hover:text-brand-orange transition-colors">
                                    {industry.name}
                                </h3>
                                
                                <p className="text-nm-text-muted mb-8 line-clamp-3">
                                    {industry.description}
                                </p>

                                <div className="mt-auto pt-6 border-t border-nm-text/5 w-full">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-nm-text/30 mb-4">Core Hurdles</p>
                                    <div className="flex flex-wrap gap-2">
                                        {industry.hurdles.slice(0, 2).map((hurdle) => (
                                            <span key={hurdle} className="text-[10px] px-2 py-1 bg-nm-bg nm-inset-xs rounded-md text-nm-text-muted font-medium">
                                                {hurdle}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-6 flex items-center gap-2 text-brand-orange font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                                        Explore Vertical <ArrowRight size={16} />
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
