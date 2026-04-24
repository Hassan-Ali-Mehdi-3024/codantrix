import type { Metadata } from 'next'
import ContactForm from '@/components/cards/ContactForm'

export const metadata: Metadata = {
    title: 'Book a scoping call',
    description:
        "Book a 30-minute scoping call with Hassan. Free. If it's not a fit, I'll tell you on the call.",
    alternates: {
        canonical: '/book',
    },
}

export default function BookPage() {
    return (
        <>
            {/* Header */}
            <section className="pt-40 md:pt-48 pb-16">
                <div className="gutter">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-8 lg:col-start-2">
                            <p className="eyebrow mb-8">Book a call</p>
                            <h1 className="mb-8 measure-wide">Book a scoping call.</h1>
                            <p className="body-lg measure">
                                30 minutes, free. You describe the problem. I ask hard questions. We decide together whether this is a fit — and if it&apos;s not, I&apos;ll usually point you to someone better.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form + meta side-by-side */}
            <section className="pb-24 md:pb-32">
                <div className="gutter">
                    <div className="grid grid-cols-12 gap-x-6 gap-y-16">
                        <div className="col-span-12 lg:col-span-7 lg:col-start-2">
                            <div className="flex items-baseline gap-6 mb-10">
                                <span className="section-marker">01</span>
                                <span className="eyebrow">The form</span>
                            </div>
                            <ContactForm />
                        </div>

                        <aside className="col-span-12 lg:col-span-3 lg:col-start-10">
                            <div className="flex items-baseline gap-6 mb-10">
                                <span className="section-marker">02</span>
                                <span className="eyebrow">Or directly</span>
                            </div>
                            <div className="space-y-8">
                                <InfoItem label="Email">
                                    <a href="mailto:hassan@codantrix.com" className="text-fg hover:text-accent transition-colors">
                                        hassan@codantrix.com
                                    </a>
                                </InfoItem>
                                <InfoItem label="Response time">
                                    <span className="text-fg">Within 24 hours, usually sooner.</span>
                                    <br />
                                    <span className="text-fg-70 text-[14px]">I&apos;m in Lahore, working US &amp; EU hours.</span>
                                </InfoItem>
                                <InfoItem label="Based">
                                    <span className="text-fg">Lahore, Pakistan</span>
                                    <br />
                                    <span className="text-fg-70 text-[14px]">GMT+5</span>
                                </InfoItem>
                                <InfoItem label="LinkedIn">
                                    <a
                                        href="https://www.linkedin.com/in/hassanmehdi"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-fg hover:text-accent transition-colors"
                                    >
                                        /in/hassanmehdi
                                    </a>
                                </InfoItem>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    )
}

function InfoItem({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <p className="meta text-fg-35 uppercase tracking-widest mb-2">{label}</p>
            <div className="body leading-relaxed">{children}</div>
        </div>
    )
}
