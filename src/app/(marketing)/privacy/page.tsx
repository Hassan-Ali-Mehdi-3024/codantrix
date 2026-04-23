import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Privacy policy',
    description: 'How Codantrix Labs handles your data.',
}

export default function PrivacyPage() {
    return (
        <article className="pt-32 md:pt-40 pb-20">
            <div className="container-page max-w-2xl prose-content">
                <p className="text-sm text-accent font-medium mb-4">Legal</p>
                <h1 className="text-4xl md:text-5xl font-semibold leading-[1.1] mb-4 text-fg">Privacy policy</h1>
                <p className="text-sm text-fg-subtle mb-10">Last updated: April 2026</p>

                <Section title="Short version">
                    I keep what you send me, I don&apos;t sell it, and I don&apos;t track you across the internet. Site analytics are privacy-preserving and anonymous.
                </Section>

                <Section title="What I collect">
                    <ul>
                        <li><strong>Contact form:</strong> name, email, company, project details you submit. Stored in a Cloudflare D1 database and emailed to me via Resend.</li>
                        <li><strong>Analytics:</strong> anonymous page-view counts (route, referrer, country at the country level). No cookies, no fingerprinting, no cross-site tracking.</li>
                    </ul>
                </Section>

                <Section title="What I don&apos;t collect">
                    <ul>
                        <li>No Google Analytics, no Meta Pixel, no advertising trackers</li>
                        <li>No cookies beyond strictly necessary session cookies</li>
                        <li>No personal data from third-party services</li>
                    </ul>
                </Section>

                <Section title="How I use your data">
                    Only to reply to your inquiry and, if we end up working together, to run the engagement. I don&apos;t add you to a mailing list. I don&apos;t share your data with third parties except the infrastructure I use to deliver the service (Cloudflare, Resend, Stripe if applicable).
                </Section>

                <Section title="Your rights">
                    Email me at <a href="mailto:hassan@codantrix.com" className="text-accent hover:text-accent-hover">hassan@codantrix.com</a> to see, correct, or delete any data I hold about you. I&apos;ll action it within 7 days.
                </Section>

                <Section title="Contact">
                    Codantrix Labs · Lahore, Pakistan · <a href="mailto:hassan@codantrix.com" className="text-accent hover:text-accent-hover">hassan@codantrix.com</a>
                </Section>
            </div>
        </article>
    )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mb-10">
            <h2 className="text-xl font-semibold text-fg mb-3">{title}</h2>
            <div className="text-fg-muted leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-fg">{children}</div>
        </section>
    )
}
