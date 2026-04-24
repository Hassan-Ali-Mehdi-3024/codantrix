import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Hero from '@/components/home/Hero'
import servicesData from '@/data/services.json'
import processData from '@/data/process.json'
import workData from '@/data/work.json'

type Service = {
    tier: string
    name: string
    slug: string
    priceLabel: string
    duration: string
    summary: string
    order: number
}
type Process = { step: number; title: string; duration: string; description: string }
type Work = { slug: string; title: string; industryTag: string; year: number; oneLiner: string }

export default function Home() {
    const services = (servicesData as Service[]).slice().sort((a, b) => a.order - b.order)
    const tierA = services.filter(s => s.tier === 'A')
    const tierB = services.filter(s => s.tier === 'B')
    const process = processData as Process[]
    const featured = (workData as Work[]).slice(0, 3)

    return (
        <>
            <Hero />

            {/* ───────── Services — editorial two-column ───────── */}
            <section className="pb-24 md:pb-32">
                <div className="gutter">
                    <header className="mb-12 md:mb-16 grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-8 lg:col-start-2">
                            <div className="flex items-baseline gap-6 mb-6">
                                <span className="section-marker">01</span>
                                <span className="eyebrow">Services</span>
                            </div>
                            <h2 className="measure-wide">Six fixed-price engagements.</h2>
                            <p className="body-lg measure mt-6">
                                All prices on the site. All scopes written down before work starts. Weekly shipped demos throughout.
                            </p>
                        </div>
                    </header>

                    <div className="grid grid-cols-12 gap-x-6 gap-y-16">
                        {/* Tier B — left column, primary focus */}
                        <div className="col-span-12 lg:col-span-6 lg:col-start-2">
                            <p className="meta text-fg-45 mb-8 pb-2 border-b border-hairline">
                                AGENTIC MVPS &nbsp;·&nbsp; $8–15K &nbsp;·&nbsp; 2–6 WEEKS
                            </p>
                            <ul className="space-y-1">
                                {tierB.map((s, i) => (
                                    <ServiceRow key={s.slug} service={s} index={i + 1} />
                                ))}
                            </ul>
                        </div>

                        {/* Tier A — right column */}
                        <div className="col-span-12 lg:col-span-5">
                            <p className="meta text-fg-45 mb-8 pb-2 border-b border-hairline">
                                PRODUCTION SYSTEMS &nbsp;·&nbsp; $15–30K+ &nbsp;·&nbsp; 6–10 WEEKS
                            </p>
                            <ul className="space-y-1">
                                {tierA.map((s, i) => (
                                    <ServiceRow key={s.slug} service={s} index={i + 1} />
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-start-2 lg:col-span-10">
                            <Link href="/services" className="link-arrow">
                                Full pricing &amp; scopes <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───────── Past work — staggered ───────── */}
            <section className="pb-24 md:pb-24">
                <div className="gutter">
                    <header className="mb-12 md:mb-16 grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-8 lg:col-start-2">
                            <div className="flex items-baseline gap-6 mb-6">
                                <span className="section-marker">02</span>
                                <span className="eyebrow">Past work</span>
                            </div>
                            <h2 className="measure-wide">Five agentic systems, shipped to production.</h2>
                            <p className="body-lg measure mt-6">
                                Client names stay private by default. Industry and shape of the work are public. Specifics on a scoping call under NDA.
                            </p>
                        </div>
                    </header>

                    <div className="grid grid-cols-12 gap-x-6">
                        {featured.map((w, i) => (
                            <Link
                                key={w.slug}
                                href={`/work/${w.slug}`}
                                className={
                                    i === 0
                                        ? 'col-span-12 lg:col-span-6 lg:col-start-2 py-10 border-b border-hairline group'
                                        : i === 1
                                        ? 'col-span-12 lg:col-span-5 lg:col-start-8 py-10 lg:mt-16 border-b border-hairline group'
                                        : 'col-span-12 lg:col-span-10 lg:col-start-2 py-10 border-b border-hairline group'
                                }
                            >
                                <div className="flex items-baseline justify-between mb-4">
                                    <span className="meta uppercase tracking-wider text-accent">{w.industryTag}</span>
                                    <span className="meta">{w.year}</span>
                                </div>
                                <h3 className="mb-3 group-hover:opacity-80 transition-opacity">{w.title}</h3>
                                <p className="body measure-narrow">{w.oneLiner}</p>
                                <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] text-fg-70 group-hover:text-fg">
                                    Read full writeup <ArrowRight size={14} />
                                </span>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-start-2 lg:col-span-10">
                            <Link href="/work" className="link-arrow">
                                All work <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───────── How I work ───────── */}
            <section className="pb-40">
                <div className="gutter">
                    <header className="mb-12 md:mb-16 grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-8 lg:col-start-2">
                            <div className="flex items-baseline gap-6 mb-6">
                                <span className="section-marker">03</span>
                                <span className="eyebrow">How I work</span>
                            </div>
                            <h2 className="measure-wide">Four steps, zero surprises.</h2>
                        </div>
                    </header>

                    <div className="grid grid-cols-12 gap-x-6 gap-y-12">
                        {process.map(p => (
                            <div key={p.step} className="col-span-12 md:col-span-6 lg:col-span-3 lg:[&:first-child]:col-start-2">
                                <p
                                    aria-hidden="true"
                                    className="font-mono text-[72px] leading-none text-fg-35 mb-6"
                                >
                                    0{p.step}
                                </p>
                                <h3 className="text-[20px] mb-2">{p.title}</h3>
                                <p className="meta mb-4">{p.duration}</p>
                                <p className="body text-fg-70">{p.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ───────── Final CTA — quiet ───────── */}
            <section className="pb-32">
                <div className="gutter">
                    <div className="grid grid-cols-12 gap-6 items-end">
                        <div className="col-span-12 lg:col-span-6 lg:col-start-2">
                            <h3 className="text-[32px] md:text-[40px] font-display font-medium tracking-tight mb-3">
                                Ready to talk?
                            </h3>
                            <p className="body text-fg-70 measure-narrow">
                                30-minute scoping call. If it&apos;s not a fit, I&apos;ll tell you.
                            </p>
                        </div>
                        <div className="col-span-12 lg:col-span-4 lg:col-start-8 lg:justify-self-end">
                            <Link href="/book" className="btn btn-primary">
                                Book a scoping call
                                <ArrowRight size={16} className="arrow-nudge" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

function ServiceRow({ service, index }: { service: Service; index: number }) {
    return (
        <li>
            <Link
                href={`/services/${service.slug}`}
                className="group block py-6 border-b border-hairline hover:border-hairline-strong transition-colors"
            >
                <div className="flex items-baseline gap-4 mb-3">
                    <span className="font-mono text-[13px] text-fg-35 shrink-0 w-6">0{index}</span>
                    <h3 className="text-[20px] font-display font-medium tracking-tight flex-1 group-hover:opacity-80 transition-opacity">
                        {service.name}
                    </h3>
                    <span className="font-mono text-[14px] text-fg-70 shrink-0 tabular-nums">{service.priceLabel}</span>
                </div>
                <p className="body text-fg-70 pl-10 pr-0">{service.summary}</p>
                <p className="meta mt-2 pl-10">{service.duration}</p>
            </Link>
        </li>
    )
}
