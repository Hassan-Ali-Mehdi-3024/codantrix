import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Hero from '@/components/home/Hero'
import Object3D from '@/components/objects/Object3D'
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
    const work = (workData as Work[]).slice(0, 5)

    return (
        <>
            <Hero />

            {/* ───────── Services — two equal columns, each anchored by its 3D object ───────── */}
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
                                Prices public. Scopes written. Demos weekly.
                            </p>
                        </div>
                    </header>

                    <div className="grid grid-cols-12 gap-x-6 gap-y-16">
                        {/* Tier B — paper plane */}
                        <div className="col-span-12 lg:col-span-5 lg:col-start-2">
                            <div className="w-32 mb-6">
                                <Object3D slug="plane" />
                            </div>
                            <p className="meta text-fg-45 mb-2">AGENTIC MVPS</p>
                            <p className="meta text-fg-70 mb-8 pb-4 border-b border-hairline">
                                $8–15K &nbsp;·&nbsp; 2–6 WEEKS
                            </p>
                            <ul>
                                {tierB.map((s, i) => <ServiceRow key={s.slug} service={s} index={i + 1} />)}
                            </ul>
                            <Link href="/services" className="link-arrow mt-6">
                                Full scope <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* Tier A — stack */}
                        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
                            <div className="w-32 mb-6">
                                <Object3D slug="stack" />
                            </div>
                            <p className="meta text-fg-45 mb-2">AGENTIC PRODUCTION</p>
                            <p className="meta text-fg-70 mb-8 pb-4 border-b border-hairline">
                                $15–30K+ &nbsp;·&nbsp; 6–10 WEEKS
                            </p>
                            <ul>
                                {tierA.map((s, i) => <ServiceRow key={s.slug} service={s} index={i + 1} />)}
                            </ul>
                            <Link href="/services" className="link-arrow mt-6">
                                Full scope <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───────── Past work — 2×2 + 1 full-width row ───────── */}
            <section className="pb-24 md:pb-24">
                <div className="gutter">
                    <header className="mb-12 md:mb-16 grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-8 lg:col-start-2">
                            <div className="flex items-baseline gap-6 mb-6">
                                <span className="section-marker">02</span>
                                <span className="eyebrow">Past work</span>
                            </div>
                            <h2 className="measure-wide">Five agentic systems, shipped.</h2>
                            <p className="body-lg measure mt-6">
                                Client names stay private. Industry and shape are public.
                            </p>
                        </div>
                    </header>

                    {/* 2x2 grid */}
                    <div className="grid grid-cols-12 gap-x-6 gap-y-0 mb-0">
                        {work.slice(0, 4).map((w, i) => (
                            <Link
                                key={w.slug}
                                href={`/work/${w.slug}`}
                                className={cn4(i)}
                            >
                                <div className="flex items-baseline justify-between mb-4">
                                    <span className="meta uppercase tracking-widest text-accent">{w.industryTag}</span>
                                    <span className="meta">{w.year}</span>
                                </div>
                                <h3 className="mb-3 group-hover:opacity-80 transition-opacity">{w.title}</h3>
                                <p className="body text-fg-70">{w.oneLiner}</p>
                                <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] text-fg-70 group-hover:text-fg">
                                    Read full writeup <ArrowRight size={14} />
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* 5th — full-width row */}
                    {work[4] && (
                        <Link
                            href={`/work/${work[4].slug}`}
                            className="grid grid-cols-12 gap-6 py-10 border-t border-hairline group"
                        >
                            <div className="col-span-12 lg:col-span-10 lg:col-start-2">
                                <div className="flex items-baseline justify-between mb-4">
                                    <span className="meta uppercase tracking-widest text-accent">{work[4].industryTag}</span>
                                    <span className="meta">{work[4].year}</span>
                                </div>
                                <h3 className="mb-3 group-hover:opacity-80 transition-opacity">{work[4].title}</h3>
                                <p className="body text-fg-70 measure">{work[4].oneLiner}</p>
                                <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] text-fg-70 group-hover:text-fg">
                                    Read full writeup <ArrowRight size={14} />
                                </span>
                            </div>
                        </Link>
                    )}

                    <div className="mt-12 grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-start-2 lg:col-span-10">
                            <Link href="/work" className="link-arrow">
                                All work <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───────── How I work — ribbon above 4 steps ───────── */}
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

                    {/* Ribbon — desktop only, spans across the four step columns below */}
                    <div className="hidden lg:block mb-12">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-10 col-start-2">
                                <Object3D slug="ribbon" aspect="900 / 200" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-x-6 gap-y-12">
                        {process.map(p => (
                            <div key={p.step} className="col-span-12 md:col-span-6 lg:col-span-3 lg:[&:first-child]:col-start-2">
                                <p
                                    aria-hidden="true"
                                    className="font-mono text-[64px] leading-none text-fg-35 mb-6"
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
                                Book a call
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
                className="group block py-5 border-b border-hairline hover:border-hairline-strong transition-colors"
            >
                <div className="flex items-baseline gap-4 mb-2">
                    <span className="font-mono text-[13px] text-fg-35 shrink-0 w-6">0{index}</span>
                    <h3 className="text-[18px] font-display font-medium tracking-tight flex-1 group-hover:opacity-80 transition-opacity">
                        {service.name}
                    </h3>
                    <span className="font-mono text-[13px] text-fg-70 shrink-0 tabular-nums">{service.priceLabel}</span>
                </div>
                <p className="text-[14px] text-fg-70 pl-10 leading-snug">{service.summary}</p>
            </Link>
        </li>
    )
}

// Past-work card grid classes — alternating columns + border discipline for the 2x2.
function cn4(i: number): string {
    // grid is 12-col, grid-cols-12 wrapper. Each card spans col 2-6 or 8-12 (5 wide).
    // First two share a top border via section divider; bottom two get top border.
    const base = 'col-span-12 lg:col-span-5 py-10 border-t border-hairline group'
    const start = [
        'lg:col-start-2',  // 0 — top-left
        'lg:col-start-8',  // 1 — top-right
        'lg:col-start-2',  // 2 — bottom-left
        'lg:col-start-8',  // 3 — bottom-right
    ][i]
    return `${base} ${start}`
}
