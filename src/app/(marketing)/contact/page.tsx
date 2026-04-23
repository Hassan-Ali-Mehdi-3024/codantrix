import type { Metadata } from 'next'
import { Mail, Clock, MapPin, Linkedin } from 'lucide-react'
import ContactForm from '@/components/cards/ContactForm'

export const metadata: Metadata = {
    title: 'Book a scoping call',
    description: 'Book a 30-minute scoping call with Hassan. Free. If it\'s not a fit, I\'ll tell you on the call.',
}

export default function ContactPage() {
    return (
        <>
            <section className="pt-32 md:pt-40 pb-12">
                <div className="container-page max-w-3xl">
                    <p className="text-sm text-accent font-medium mb-4">Contact</p>
                    <h1 className="text-4xl md:text-6xl font-semibold leading-[1.1] mb-6 text-fg">Book a scoping call.</h1>
                    <p className="text-lg text-fg-muted leading-relaxed">
                        30 minutes, free. You describe the problem. I ask hard questions. We decide together whether this is a fit — and if it&apos;s not, I&apos;ll usually point you to someone better.
                    </p>
                </div>
            </section>

            <section className="pb-20 md:pb-28">
                <div className="container-page">
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-2">
                            <ContactForm />
                        </div>

                        <aside className="space-y-4">
                            <InfoRow icon={Mail} label="Email">
                                <a href="mailto:hassan@codantrix.com" className="hover:text-accent transition-colors">hassan@codantrix.com</a>
                            </InfoRow>
                            <InfoRow icon={Clock} label="Response time">
                                Within 24 hours, usually sooner. I&apos;m in Lahore, working US &amp; EU hours.
                            </InfoRow>
                            <InfoRow icon={MapPin} label="Based">
                                Lahore, Pakistan (GMT+5)
                            </InfoRow>
                            <InfoRow icon={Linkedin} label="LinkedIn">
                                <a href="https://www.linkedin.com/in/hassanmehdi" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                                    /in/hassanmehdi
                                </a>
                            </InfoRow>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    )
}

function InfoRow({
    icon: Icon,
    label,
    children,
}: {
    icon: React.ComponentType<{ size?: number; className?: string }>
    label: string
    children: React.ReactNode
}) {
    return (
        <div className="card p-5">
            <div className="flex items-center gap-2 mb-1.5">
                <Icon size={14} className="text-accent" />
                <span className="text-xs uppercase tracking-wider text-fg-subtle">{label}</span>
            </div>
            <div className="text-fg-muted">{children}</div>
        </div>
    )
}
