import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Terms of service',
    description: 'Terms of using the Codantrix Labs website.',
}

export default function TermsPage() {
    return (
        <article className="pt-32 md:pt-40 pb-20">
            <div className="container-page max-w-2xl prose-content">
                <p className="text-sm text-accent font-medium mb-4">Legal</p>
                <h1 className="text-4xl md:text-5xl font-semibold leading-[1.1] mb-4 text-fg">Terms of service</h1>
                <p className="text-sm text-fg-subtle mb-10">Last updated: April 2026</p>

                <Section title="Short version">
                    These terms cover using the website. Paid engagements run under a separate written SOW that I send after the scoping call — that SOW is the binding contract.
                </Section>

                <Section title="Website use">
                    The content on labs.codantrix.com is provided as-is. Nothing on the public site is a binding offer or guarantee — prices and scopes are reference points. The binding document for any engagement is the signed SOW.
                </Section>

                <Section title="Intellectual property">
                    Content, copy, code samples, and case-study writeups on this site are mine. If you&apos;d like to quote them, credit &ldquo;Codantrix Labs&rdquo; and link back. Don&apos;t repost wholesale.
                </Section>

                <Section title="Liability">
                    I maintain this site carefully but make no warranty that it&apos;s error-free or always available. To the fullest extent permitted under Pakistani law, Codantrix Labs is not liable for any damages arising from your use of the site.
                </Section>

                <Section title="Engagements">
                    Paid work is governed by the SOW we sign, not these terms. The SOW covers scope, price, timeline, deliverables, IP, confidentiality, and termination.
                </Section>

                <Section title="Governing law">
                    These terms are governed by the laws of the Islamic Republic of Pakistan.
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
            <div className="text-fg-muted leading-relaxed space-y-3">{children}</div>
        </section>
    )
}
