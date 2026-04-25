import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Object3D from '@/components/objects/Object3D'

export default function Hero() {
    return (
        <section className="pt-32 md:pt-40 pb-24 md:pb-48">
            <div className="gutter">
                <div className="grid grid-cols-12 gap-x-6 items-start">
                    {/* Headline left */}
                    <div className="col-span-12 lg:col-span-7 lg:col-start-2">
                        <p className="eyebrow mb-8">Codantrix Labs · Lahore</p>

                        <h1 className="mb-8">
                            Agentic systems for{' '}
                            <span className="text-accent">founders who ship</span>.
                        </h1>

                        <p className="body-lg measure mb-10">
                            Fixed price. Weekly demos. Code you own. I&apos;m Hassan — solo, six years shipping production software, full-time on agents since 2023.
                        </p>

                        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                            <Link href="/book" className="btn btn-primary">
                                Book a call
                                <ArrowRight size={16} className="arrow-nudge" />
                            </Link>
                            <Link href="/work" className="link-arrow">
                                See past work <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* Laptop right (~400px on desktop, hidden on mobile) */}
                    <div className="hidden lg:block lg:col-span-4 lg:col-start-9 mt-2">
                        <Object3D slug="laptop" priority />
                    </div>
                </div>
            </div>
        </section>
    )
}
