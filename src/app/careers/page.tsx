import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Briefcase, Zap, Heart, Globe, ArrowRight, Mail, Phone, MapPin } from 'lucide-react'
import ApplicationForm from '@/components/careers/ApplicationForm'

export const dynamic = 'force-dynamic'

const benefits = [
    {
        title: "Remote-First & Asynchronous",
        description: "Work from anywhere. We care about output, not hours. Deep work is respected.",
        icon: Globe
    },
    {
        title: "Top 1% Compensation",
        description: "We pay above market rates to attract the best talent. Equity options available for early engineers.",
        icon: Briefcase
    },
    {
        title: "Bleeding Edge Tech",
        description: "Work with the latest stack: Next.js 14, Rust, Wasm, PyTorch, and proprietary LLMs.",
        icon: Zap
    },
    {
        title: "Health & Wellness",
        description: "Comprehensive health insurance, mental health support, and unlimited PTO policy.",
        icon: Heart
    }
]

const openRoles = [
    {
        id: '1',
        title: "Senior Machine Learning Engineer",
        slug: "ml-engineer",
        department: "AI Research",
        location: "Remote",
        type: "Full-time",
        description: "Architect and deploy large-scale computer vision models for industrial clients."
    },
    {
        id: '2',
        title: "Full Stack Engineer (Next.js)",
        slug: "full-stack",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        description: "Build high-performance, real-time dashboards using Next.js, React Server Components, and Supabase."
    },
    {
        id: '3',
        title: "Enterprise Sales Manager",
        slug: "sales",
        department: "Growth",
        location: "Hybrid (Dubai/Remote)",
        type: "Full-time",
        description: "Lead our expansion into the MENA manufacturing sector."
    },
    {
        id: '4',
        title: "Product Marketing Manager",
        slug: "marketing",
        department: "Marketing",
        location: "Remote",
        type: "Full-time",
        description: "Own the messaging, positioning, and go-to-market strategy for our enterprise AI products."
    }
]

export default function CareersPage() {
    return (
        <div className="pt-40 pb-24 bg-nm-bg">
            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Hero Section */}
                <div className="max-w-3xl mb-24 text-left">
                    <h2 className="text-brand-orange font-bold uppercase tracking-[0.3em] mb-4 text-sm">Join the Vanguard</h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-nm-text mb-8">
                        Build the <br /> <span className="text-brand-orange">Impossible.</span>
                    </h1>
                    <p className="text-xl text-nm-text-muted leading-relaxed">
                        Codantrix is a collective of obsessive engineers and researchers. We don&apos;t just build software; we build the intelligence that powers the physical world.
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                    {benefits.map((benefit) => (
                        <div key={benefit.title} className="nm-flat-md p-8 rounded-3xl border border-nm-text/5 hover:scale-[1.02] transition-all group">
                            <div className="w-12 h-12 nm-inset-sm rounded-2xl flex items-center justify-center mb-6 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
                                <benefit.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-nm-text mb-3">{benefit.title}</h3>
                            <p className="text-sm text-nm-text-muted leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Open Roles */}
                <div className="mb-32">
                    <div className="flex items-center gap-6 mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-nm-text tracking-tight">
                            Open Positions
                        </h2>
                        <div className="h-px flex-1 bg-nm-text/10" />
                    </div>

                    <div className="space-y-6">
                        {openRoles.map((role) => (
                            <Link 
                                href={`/careers?role=${role.slug}#application-form`}
                                key={role.id} 
                                className="group nm-flat-sm p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 hover:nm-flat-md border border-nm-text/5 transition-all cursor-pointer block"
                            >
                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl font-bold text-nm-text group-hover:text-brand-orange transition-colors mb-2">{role.title}</h3>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-nm-text-muted">
                                        <span className="text-brand-orange">{role.department}</span>
                                        <span className="w-1 h-1 bg-brand-orange rounded-full self-center" />
                                        <span>{role.location}</span>
                                        <span className="w-1 h-1 bg-brand-orange rounded-full self-center" />
                                        <span>{role.type}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8 w-full md:w-auto justify-center md:justify-end">
                                    <span className="w-12 h-12 nm-inset-sm rounded-full flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all">
                                        <ArrowRight size={24} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Application & Contact Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative">
                    {/* Centered Title Row */}
                    <div className="lg:col-span-12 text-left mb-8">
                        <h2 className="text-4xl font-bold text-nm-text mb-4">Apply Now</h2>
                        <p className="text-nm-text-muted text-lg max-w-2xl">
                            Don&apos;t see a perfect fit? We are always hiring exceptional talent. Send us your resume and tell us what you can build.
                        </p>
                    </div>

                    {/* Application Form */}
                    <div className="lg:col-span-8">
                        <ApplicationForm />
                    </div>

                    {/* Contact Sidebar */}
                    <div className="lg:col-span-4 h-full">
                        <div className="nm-flat-lg p-8 sm:p-10 lg:p-12 rounded-[32px] border border-nm-text/5 h-full flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl -mr-16 -mt-16" />
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-nm-text mb-10">Contact HR</h3>
                                
                                <div className="space-y-10">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange mb-3">Email Us</p>
                                        <a href="mailto:contact@codantrix.com" className="flex items-center gap-4 text-nm-text hover:text-brand-orange transition-colors font-bold text-lg">
                                            <div className="w-10 h-10 nm-inset-sm rounded-xl flex items-center justify-center text-brand-orange">
                                                <Mail size={20} />
                                            </div>
                                            contact@codantrix.com
                                        </a>
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange mb-3">Call Us</p>
                                        <a href="tel:+923274320706" className="flex items-center gap-4 text-nm-text hover:text-brand-orange transition-colors font-bold text-lg">
                                            <div className="w-10 h-10 nm-inset-sm rounded-xl flex items-center justify-center text-brand-orange">
                                                <Phone size={20} />
                                            </div>
                                            +92-327-4320706
                                        </a>
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange mb-3">Global HQ</p>
                                        <div className="flex items-start gap-4 text-nm-text font-bold text-lg leading-relaxed">
                                            <div className="w-10 h-10 nm-inset-sm rounded-xl flex items-center justify-center shrink-0 text-brand-orange">
                                                <MapPin size={20} />
                                            </div>
                                            <p>
                                                Technology Park,<br />
                                                Lahore, Pakistan
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 pt-8 border-t border-nm-text/10 relative z-10">
                                <p className="text-sm text-nm-text-muted italic leading-relaxed">
                                    &quot;We hire for slope, not intercept.&quot;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
