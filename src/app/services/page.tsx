import { createClient } from '@/utils/supabase/server'
import ServiceCard from '@/components/cards/ServiceCard'

export const dynamic = 'force-dynamic'

export default async function ServicesHub() {
    const supabase = await createClient()
    const { data: services } = await supabase
        .from('services')
        .select('*')
        .order('service_order', { ascending: true })

    return (
        <div className="pt-32 pb-24 bg-[#1c1e20]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-16">
                    <h2 className="text-[#f15a2f] font-bold uppercase tracking-[0.3em] mb-4 text-sm">Our Capabilities</h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8">
                        Expertise in <br /> <span className="text-[#f15a2f]">Complex AI.</span>
                    </h1>
                    <p className="text-xl text-[#fffdf2]/70 leading-relaxed">
                        From industrial vision to enterprise-scale machine learning, we build the infrastructure that powers intelligent decision making.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services?.map((service, i) => (
                        <ServiceCard
                            key={service.id}
                            name={service.name}
                            slug={service.slug}
                            description={service.description}
                            icon={service.icon || 'brain'}
                            index={i}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
