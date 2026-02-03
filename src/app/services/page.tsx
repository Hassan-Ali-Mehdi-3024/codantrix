import ServiceCard from '@/components/cards/ServiceCard'
import servicesData from '@/data/services.json'

export const dynamic = 'force-dynamic'

interface Service {
    name: string
    slug: string
    description: string
    category: string
    icon: string
    service_order: number
}

export default async function ServicesHub() {
    // Sort and group services by category from local JSON
    const services = (servicesData as Service[]).sort((a, b) => a.service_order - b.service_order)

    const categories = services.reduce((acc: any[], service) => {
        const categoryTitle = service.category || 'Other'
        let category = acc.find(c => c.title === categoryTitle)
        if (!category) {
            category = { title: categoryTitle, services: [] }
            acc.push(category)
        }
        category.services.push(service)
        return acc
    }, [])

    return (
        <div className="pt-40 pb-24 bg-nm-bg">
            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-20 flex flex-col items-center text-center sm:items-start sm:text-left">
                    <h2 className="text-brand-orange font-bold uppercase tracking-[0.3em] mb-4 text-sm">Our Capabilities</h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 text-nm-text">
                        Expertise in <br /> <span className="text-brand-orange">Complex AI.</span>
                    </h1>
                    <p className="text-xl text-nm-text-muted leading-relaxed">
                        From industrial vision to enterprise-scale machine learning, we build the infrastructure that powers intelligent decision making.
                    </p>
                </div>

                <div className="space-y-32">
                    {categories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="relative">
                            {/* Section Header */}
                            <div className="mb-12 flex flex-col sm:flex-row items-center gap-6">
                                <h2 className="text-3xl md:text-4xl font-bold text-nm-text tracking-tight text-center sm:text-left">
                                    {category.title}
                                </h2>
                                <div className="h-px flex-1 bg-nm-text/10 w-full sm:w-auto" />
                            </div>

                            {/* Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {category.services.map((service: any, i: number) => (
                                    <ServiceCard
                                        key={service.slug}
                                        name={service.name}
                                        slug={service.slug}
                                        description={service.description}
                                        icon={service.icon}
                                        index={i}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
