import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Privacy policy',
    description: 'How Codantrix Labs handles your data.',
}

export default function PrivacyPage() {
    return (
        <article className="pt-40 md:pt-48 pb-24">
            <div className="gutter">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-8 lg:col-start-2">
                        <p className="eyebrow mb-8">Legal</p>
                        <h1 className="mb-4">Privacy policy</h1>
                        <p className="meta mb-16">Last updated: April 2026</p>

                        <Section title="Short version">
                            <p>I keep what you send me, I don&apos;t sell it, and I don&apos;t track you across the internet. Site analytics are privacy-preserving and anonymous.</p>
                        </Section>

                        <Section title="What I collect">
                            <ul className="list-none pl-0 space-y-3">
                                <li><span className="text-fg">Contact form:</span> name, email, company, project details you submit. Stored in a Cloudflare D1 database and emailed to me via Resend.</li>
                                <li><span className="text-fg">Analytics:</span> anonymous page-view counts (route, referrer, country at the country level). No cookies, no fingerprinting, no cross-site tracking.</li>
                            </ul>
                        </Section>

                        <Section title="What I don't collect">
                            <ul className="list-none pl-0 space-y-3">
                                <li>— No Google Analytics, no Meta Pixel, no advertising trackers</li>
                                <li>— No cookies beyond strictly necessary session cookies</li>
                                <li>— No personal data from third-party services</li>
                            </ul>
                        </Section>

                        <Section title="How I use your data">
                            <p>Only to reply to your inquiry and, if we end up working together, to run the engagement. I don&apos;t add you to a mailing list. I don&apos;t share your data with third parties except the infrastructure I use to deliver the service (Cloudflare, Resend, Stripe if applicable).</p>
                        </Section>

                        <Section title="Your rights">
                            <p>Email me at <a href="mailto:hassan@codantrix.com" className="text-accent hover:opacity-80 transition-opacity">hassan@codantrix.com</a> to see, correct, or delete any data I hold about you. I&apos;ll action it within 7 days.</p>
                        </Section>

                        <Section title="Contact">
                            <p>Codantrix Labs · Lahore, Pakistan · <a href="mailto:hassan@codantrix.com" className="text-accent hover:opacity-80 transition-opacity">hassan@codantrix.com</a></p>
                        </Section>
                    </div>
                </div>
            </div>
        </article>
    )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="py-10 border-t border-hairline first:border-0 first:pt-0">
            <h2 className="text-[22px] md:text-[26px] font-display font-medium tracking-tight mb-5">{title}</h2>
            <div className="body text-fg-70 leading-relaxed measure">{children}</div>
        </section>
    )
}
