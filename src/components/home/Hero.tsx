import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import HeroTerminal from './HeroTerminal'

export default function Hero() {
    return (
        <section className="pt-32 md:pt-40 pb-24 md:pb-48">
            <div className="gutter">
                <div className="grid grid-cols-12 gap-x-6 items-start">
                    {/* H1 + subhead anchored col 2-8, right side intentionally empty on md, terminal on lg */}
                    <div className="col-span-12 lg:col-span-7 lg:col-start-2">
                        <p className="eyebrow mb-8">Codantrix Labs · Lahore, Pakistan</p>

                        <h1 className="mb-8">
                            I build production agentic AI systems for{' '}
                            <span className="text-accent">SaaS founders and seed–Series B teams</span>.
                        </h1>

                        <p className="body-lg measure mb-10">
                            Fixed price. Shipped weekly. Code you own, running on your infra. I&apos;m Hassan — solo operator, six years shipping production software, full-time on agentic AI since 2023.
                        </p>

                        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                            <Link href="/book" className="btn btn-primary">
                                Book a scoping call
                                <ArrowRight size={16} className="arrow-nudge" />
                            </Link>
                            <Link href="/work" className="link-arrow">
                                See past work <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* Terminal visual — desktop only per 11.10 mobile guidance */}
                    <div className="hidden lg:block lg:col-span-4 lg:col-start-9 mt-4">
                        <HeroTerminal />
                    </div>
                </div>
            </div>
        </section>
    )
}
