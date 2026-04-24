import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Terms of service',
    description: 'Terms of using the Codantrix Labs website.',
}

export default function TermsPage() {
    return (
        <article className="pt-40 md:pt-48 pb-24">
            <div className="gutter">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-8 lg:col-start-2">
                        <p className="eyebrow mb-8">Legal</p>
                        <h1 className="mb-4">Terms of service</h1>
                        <p className="meta mb-16">Last updated: April 2026</p>

                        <Section title="Short version">
                            <p>These terms cover using the website. Paid engagements run under a separate written SOW that I send after the scoping call — that SOW is the binding contract.</p>
                        </Section>

                        <Section title="Website use">
                            <p>The content on labs.codantrix.com is provided as-is. Nothing on the public site is a binding offer or guarantee — prices and scopes are reference points. The binding document for any engagement is the signed SOW.</p>
                        </Section>

                        <Section title="Intellectual property">
                            <p>Content, copy, code samples, and case-study writeups on this site are mine. If you&apos;d like to quote them, credit &ldquo;Codantrix Labs&rdquo; and link back. Don&apos;t repost wholesale.</p>
                        </Section>

                        <Section title="Liability">
                            <p>I maintain this site carefully but make no warranty that it&apos;s error-free or always available. To the fullest extent permitted under Pakistani law, Codantrix Labs is not liable for any damages arising from your use of the site.</p>
                        </Section>

                        <Section title="Engagements">
                            <p>Paid work is governed by the SOW we sign, not these terms. The SOW covers scope, price, timeline, deliverables, IP, confidentiality, and termination.</p>
                        </Section>

                        <Section title="Governing law">
                            <p>These terms are governed by the laws of the Islamic Republic of Pakistan.</p>
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
