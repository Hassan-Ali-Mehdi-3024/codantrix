import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
    title: 'About — Hassan Ali Mehdi, Codantrix Labs',
    description: 'I\'m Hassan. I run Codantrix Labs, a one-person agentic AI studio based in Lahore, Pakistan. Six years shipping production software, full-time on agentic AI since 2023.',
}

export default function AboutPage() {
    return (
        <>
            <section className="pt-32 md:pt-40 pb-16">
                <div className="container-page max-w-3xl">
                    <p className="text-sm text-accent font-medium mb-4">About</p>
                    <h1 className="text-4xl md:text-6xl font-semibold leading-[1.1] mb-8 text-fg">
                        I&apos;m Hassan. Codantrix Labs is me.
                    </h1>
                    <p className="text-lg text-fg-muted leading-relaxed">
                        I&apos;ve been shipping production software for six years, and full-time on agentic AI systems since 2023. Based in Lahore, Pakistan. Working US and EU hours. I invoice USD through Wise and Payoneer.
                    </p>
                </div>
            </section>

            <Block label="What Codantrix Labs is">
                <p>
                    A one-person studio, registered with SECP Pakistan as Codantrix Labs (operating as Technologistics.pk from 2023). The entity is the legal and invoicing wrapper — I&apos;m the operator on every engagement.
                </p>
                <p>
                    I work solo on core code. When a project genuinely needs a specialist for ML research, devops, or design, I bring in a vetted contractor. I don&apos;t pretend to be a team I&apos;m not.
                </p>
            </Block>

            <Block label="Background">
                <ul className="space-y-3">
                    <li>BSCS at The Superior University, Lahore — graduating 2026</li>
                    <li>Former President of the AI Society at Superior</li>
                    <li>Six years shipping production software</li>
                    <li>Full-time on agentic AI since 2023</li>
                    <li>Five agentic systems shipped to production before founding Codantrix Labs — all listed (anonymized) under <Link href="/work" className="text-accent hover:text-accent-hover">/work</Link></li>
                </ul>
            </Block>

            <Block label="What I work on">
                <p>
                    Agentic AI systems that run in production and handle real user traffic. Not demos. Not prototypes that sit in a notebook. The kind of work on <Link href="/services" className="text-accent hover:text-accent-hover">/services</Link> — fixed-price engagements with weekly shipped demos and code you own on day one.
                </p>
                <p>
                    Most of my clients are SaaS founders and seed–Series B teams. They have a product, have revenue, and have a specific agentic capability they want shipped without hiring a three-person AI team.
                </p>
            </Block>

            <Block label="Why solo">
                <p>
                    Because it&apos;s honest. A one-person studio charging $8–30K with weekly shipped demos beats a ten-person agency charging the same, taking ten weeks, and handing you a Jira board. I don&apos;t have overhead to protect, so I don&apos;t need to pad scopes.
                </p>
                <p>
                    If the work outgrows solo, I&apos;ll tell you — and usually help you hire.
                </p>
            </Block>

            <section className="py-20 md:py-24 border-t border-border">
                <div className="container-page">
                    <div className="card p-8 md:p-12 max-w-3xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h2 className="text-xl md:text-2xl font-semibold text-fg mb-2">Want to work together?</h2>
                            <p className="text-fg-muted text-sm">Start with a 30-minute call. If it&apos;s not a fit, I&apos;ll tell you on the call.</p>
                        </div>
                        <Link href="/contact" className="btn btn-primary whitespace-nowrap">
                            Book a scoping call
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <section className="py-12 border-t border-border">
            <div className="container-page max-w-3xl">
                <h2 className="text-xs uppercase tracking-wider text-fg-subtle mb-6">{label}</h2>
                <div className="text-fg-muted leading-relaxed space-y-4 text-lg">{children}</div>
            </div>
        </section>
    )
}
