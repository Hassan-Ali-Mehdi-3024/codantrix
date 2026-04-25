import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import PortraitPlaceholder from '@/components/hassan/PortraitPlaceholder'
import Object3D from '@/components/objects/Object3D'

export const metadata: Metadata = {
    title: 'Hassan Ali Mehdi — Codantrix Labs',
    description:
        "I'm Hassan. I run Codantrix Labs, a one-person agentic AI studio based in Lahore, Pakistan. Six years shipping production software, full-time on agentic AI since 2023.",
    alternates: {
        canonical: '/hassan',
    },
}

export default function HassanPage() {
    return (
        <>
            {/* Hero — photo right, headline left */}
            <section className="pt-40 md:pt-48 pb-24 md:pb-32">
                <div className="gutter">
                    <div className="grid grid-cols-12 gap-x-6 gap-y-10 items-start">
                        <div className="col-span-12 lg:col-span-6 lg:col-start-2">
                            <p className="eyebrow mb-8">About</p>
                            <h1 className="mb-10">
                                I&apos;m Hassan. Codantrix Labs is me.
                            </h1>
                            <p className="body-lg measure">
                                Shipping production software for six years. Full-time on agentic AI since 2023. Lahore, Pakistan. US and EU hours. USD via Wise and Payoneer.
                            </p>
                        </div>
                        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
                            <PortraitPlaceholder />
                        </div>
                    </div>
                </div>
            </section>

            <Block marker="01" label="What Codantrix Labs is">
                <p className="body text-fg-70">
                    A one-person studio, registered with SECP Pakistan as Codantrix Labs (operating as Technologistics.pk from 2023). The entity is the legal and invoicing wrapper — I&apos;m the operator on every engagement.
                </p>
                <p className="body text-fg-70 mt-4">
                    I work solo on core code. When a project genuinely needs a specialist for ML research, devops, or design, I bring in a vetted contractor. I don&apos;t pretend to be a team I&apos;m not.
                </p>
            </Block>

            {/* Background — mug accent inline */}
            <section className="py-16 border-t border-hairline">
                <div className="gutter">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-8 lg:col-start-2">
                            <div className="flex items-baseline gap-6 mb-8">
                                <span className="section-marker">02</span>
                                <span className="eyebrow">Background</span>
                            </div>
                            <ul className="space-y-3 font-mono text-[14px] text-fg-70 leading-relaxed measure">
                                <li>— BSCS at The Superior University, Lahore · graduating 2026</li>
                                <li>— Former President of the AI Society at Superior</li>
                                <li>— Six years shipping production software</li>
                                <li>— Full-time on agentic AI since 2023</li>
                                <li>— Five agentic systems shipped to production before founding Codantrix Labs</li>
                            </ul>

                            {/* Timeline + mug accent side-by-side */}
                            <div className="mt-12 pt-8 border-t border-hairline grid grid-cols-12 gap-6 items-start">
                                <div className="col-span-12 sm:col-span-8">
                                    <p className="eyebrow mb-6">Timeline</p>
                                    <ul className="space-y-3 font-mono text-[14px]">
                                        <li className="flex gap-6">
                                            <span className="text-fg-35 shrink-0 w-12">2023</span>
                                            <span className="text-fg-70">Founded studio (as Technologistics.pk)</span>
                                        </li>
                                        <li className="flex gap-6">
                                            <span className="text-fg-35 shrink-0 w-12">2025</span>
                                            <span className="text-fg-70">Re-registered with SECP as Codantrix Labs</span>
                                        </li>
                                        <li className="flex gap-6">
                                            <span className="text-fg-35 shrink-0 w-12">2026</span>
                                            <span className="text-fg-70">Full-time on agentic AI engagements</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Mug accent — small, humanizing */}
                                <div className="col-span-12 sm:col-span-3 sm:col-start-10 flex flex-col items-start gap-3">
                                    <div className="w-20 md:w-24">
                                        <Object3D slug="mug" />
                                    </div>
                                    <p className="meta text-fg-45 italic">I run engagements from this desk.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Block marker="03" label="What I work on">
                <p className="body text-fg-70">
                    Agentic AI systems that run in production and handle real user traffic. Not demos. Not prototypes that sit in a notebook. The kind of work on{' '}
                    <Link href="/services" className="text-accent hover:opacity-80 transition-opacity">/services</Link>
                    {' '}— fixed-price engagements with weekly shipped demos and code you own on day one.
                </p>
                <p className="body text-fg-70 mt-4">
                    Most of my clients are SaaS founders and seed–Series B teams. They have a product, have revenue, and have a specific agentic capability they want shipped without hiring a three-person AI team.
                </p>
            </Block>

            <Block marker="04" label="Why solo">
                <p className="body text-fg-70">
                    Because it&apos;s honest. A one-person studio charging $8–30K with weekly shipped demos beats a ten-person agency charging the same, taking ten weeks, and handing you a Jira board. I don&apos;t have overhead to protect, so I don&apos;t need to pad scopes.
                </p>
                <p className="body text-fg-70 mt-4">
                    If the work outgrows solo, I&apos;ll tell you — and usually help you hire.
                </p>
            </Block>

            {/* Quiet CTA */}
            <section className="py-24 md:py-32">
                <div className="gutter">
                    <div className="grid grid-cols-12 gap-6 items-end">
                        <div className="col-span-12 lg:col-span-6 lg:col-start-2">
                            <h3 className="text-[28px] md:text-[36px] font-display font-medium tracking-tight mb-3">
                                Want to work together?
                            </h3>
                            <p className="body text-fg-70 measure-narrow">
                                Start with a 30-minute call.
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

function Block({ marker, label, children }: { marker: string; label: string; children: React.ReactNode }) {
    return (
        <section className="py-16 border-t border-hairline">
            <div className="gutter">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-8 lg:col-start-2">
                        <div className="flex items-baseline gap-6 mb-8">
                            <span className="section-marker">{marker}</span>
                            <span className="eyebrow">{label}</span>
                        </div>
                        <div className="measure">{children}</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
