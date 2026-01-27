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
        <div className="pt-32 pb-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Hero Section */}
                <div className="max-w-3xl mb-24 mx-auto text-center">
                    <h2 className="text-[#f15a2f] font-bold uppercase tracking-[0.3em] mb-4 text-sm">Join the Vanguard</h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-[#fffdf2] mb-8">
                        Build the <br /> <span className="text-[#f15a2f]">Impossible.</span>
                    </h1>
                    <p className="text-xl text-[#fffdf2]/70 leading-relaxed">
                        Codantrix is a collective of obsessive engineers and researchers. We don&apos;t just build software; we build the intelligence that powers the physical world.
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                    {benefits.map((benefit) => (
                        <div key={benefit.title} className="bg-[#161819] border border-[#fffdf2]/5 p-8 hover:border-[#f15a2f]/40 transition-all rounded-sm group">
                            <div className="w-12 h-12 bg-[#black] border border-[#f15a2f] flex items-center justify-center mb-6">
                                <benefit.icon className="text-[#f15a2f]" size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-[#fffdf2] mb-3">{benefit.title}</h3>
                            <p className="text-sm text-[#fffdf2]/70 leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Open Roles */}
                <div className="mb-32">
                    <div className="flex items-center gap-6 mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            Open Positions
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    </div>

                    <div className="space-y-4">
                        {openRoles.map((role) => (
                            <Link 
                                href={`/careers?role=${role.slug}#application-form`}
                                key={role.id} 
                                className="group bg-[#161819] border border-[#fffdf2]/5 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#f15a2f]/40 transition-all cursor-pointer block"
                            >
                                <div>
                                    <h3 className="text-xl font-bold text-[#fffdf2] group-hover:text-[#f15a2f] transition-colors mb-2">{role.title}</h3>
                                    <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-[#fffdf2]/60">
                                        <span className="text-[#f15a2f]">{role.department}</span>
                                        <span className="w-1 h-1 bg-[#f15a2f] rounded-full self-center" />
                                        <span>{role.location}</span>
                                        <span className="w-1 h-1 bg-[#f15a2f] rounded-full self-center" />
                                        <span>{role.type}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                    <span className="w-10 h-10 border border-[#f15a2f] bg-[#f15a2f]/10 flex items-center justify-center text-[#f15a2f] group-hover:bg-[#f15a2f] group-hover:text-[#fffdf2] transition-all">
                                        <ArrowRight size={20} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Application & Contact Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative">
                    {/* Centered Title Row */}
                    <div className="lg:col-span-12 text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-4">Apply Now</h2>
                        <p className="text-[#fffdf2]/60 max-w-2xl mx-auto">
                            Don&apos;t see a perfect fit? We are always hiring exceptional talent. Send us your resume and tell us what you can build.
                        </p>
                    </div>

                    {/* Application Form */}
                    <div className="lg:col-span-8">
                        <ApplicationForm />
                    </div>

                    {/* Contact Sidebar */}
                    <div className="lg:col-span-4 h-full">
                        <div className="bg-[#161819] border border-[#fffdf2]/5 p-8 sm:p-10 h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-[#fffdf2] mb-8">Contact HR</h3>
                                
                                <div className="space-y-8">
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-[#f15a2f] mb-2">Email Us</p>
                                        <a href="mailto:contact@codantrix.com" className="flex items-center gap-3 text-[#fffdf2] hover:text-[#f15a2f] transition-colors font-medium">
                                            <Mail size={18} className="text-[#f15a2f]" />
                                            contact@codantrix.com
                                        </a>
                                    </div>

                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-[#f15a2f] mb-2">Call Us</p>
                                        <a href="tel:+923274320706" className="flex items-center gap-3 text-[#fffdf2] hover:text-[#f15a2f] transition-colors font-medium">
                                            <Phone size={18} className="text-[#f15a2f]" />
                                            +92-327-4320706
                                        </a>
                                    </div>

                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-[#f15a2f] mb-2">Global HQ</p>
                                        <div className="flex items-start gap-3 text-[#fffdf2] font-medium">
                                            <MapPin size={18} className="mt-1 shrink-0 text-[#f15a2f]" />
                                            <p>
                                                Codantrix Labs<br />
                                                Technology Park,<br />
                                                Lahore, Pakistan
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-[#fffdf2]/5">
                                <p className="text-sm text-[#fffdf2]/40 italic">
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
