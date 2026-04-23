import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
    return (
        <section className="pt-32 md:pt-40 pb-16 md:pb-24">
            <div className="container-page">
                <div className="max-w-3xl">
                    <p className="text-sm text-accent font-medium mb-6">Codantrix Labs · Lahore, Pakistan</p>
                    <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] mb-6 text-fg">
                        I build production agentic AI systems for <span className="text-accent">SaaS founders and seed–Series B teams</span>.
                    </h1>
                    <p className="text-lg md:text-xl text-fg-muted leading-relaxed mb-10 max-w-2xl">
                        Fixed price. Shipped weekly. Code you own, running on your infra. I&apos;m Hassan — solo operator, six years shipping production software, full-time on agentic AI since 2023.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/contact" className="btn btn-primary">
                            Book a scoping call
                            <ArrowRight size={16} />
                        </Link>
                        <Link href="/work" className="btn btn-ghost">
                            See past work
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
