'use client'

import { Mail, Clock, MapPin, Phone } from 'lucide-react'
import ContactForm from '@/components/cards/ContactForm'

export default function ContactPage() {
    return (
        <div className="pt-40 pb-32 bg-nm-bg relative">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center text-center sm:items-start sm:text-left mb-16 mx-auto sm:mx-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full nm-inset-sm text-brand-orange text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                        <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                        Status: Online
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 text-nm-text tracking-tight">
                        Let&apos;s Solve <br /> 
                        <span className="text-brand-orange">The Impossible.</span>
                    </h1>
                    
                    <p className="text-xl text-nm-text-muted leading-relaxed max-w-2xl">
                        Have a complex industrial problem? Describe it. If we can&apos;t engineer a measurable ROI, we won&apos;t take the project.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Left Side: Form */}
                    <div className="lg:col-span-8 w-full">
                        <ContactForm />
                    </div>

                    {/* Right Side: Cards */}
                    <div className="lg:col-span-4 space-y-8 w-full">
                        <div className="nm-flat-md p-8 rounded-3xl hover:scale-[1.02] transition-all group border border-nm-text/5 flex flex-col items-center text-center sm:items-start sm:text-left">
                            <div className="w-12 h-12 nm-inset-sm rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-colors">
                                <Mail size={24} className="text-brand-orange group-hover:text-white transition-colors" />
                            </div>
                            <h4 className="text-brand-orange font-bold uppercase tracking-widest text-[10px] mb-2">Direct Line</h4>
                            <a href="mailto:contact@codantrix.com" className="text-xl font-bold text-nm-text hover:text-brand-orange transition-colors">
                                contact@codantrix.com
                            </a>
                        </div>

                        <div className="nm-flat-md p-8 rounded-3xl hover:scale-[1.02] transition-all group border border-nm-text/5 flex flex-col items-center text-center sm:items-start sm:text-left">
                            <div className="w-12 h-12 nm-inset-sm rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-colors">
                                <Clock size={24} className="text-brand-orange group-hover:text-white transition-colors" />
                            </div>
                            <h4 className="text-brand-orange font-bold uppercase tracking-widest text-[10px] mb-2">Response Velocity</h4>
                            <p className="text-xl font-bold text-nm-text">&lt; 24 Hours</p>
                        </div>

                        <div className="nm-flat-md p-8 rounded-3xl hover:scale-[1.02] transition-all group border border-nm-text/5 flex flex-col items-center text-center sm:items-start sm:text-left">
                            <div className="w-12 h-12 nm-inset-sm rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-colors">
                                <Phone size={24} className="text-brand-orange group-hover:text-white transition-colors" />
                            </div>
                            <h4 className="text-brand-orange font-bold uppercase tracking-widest text-[10px] mb-2">Emergency Ops</h4>
                            <a href="tel:+923274320706" className="text-xl font-bold text-nm-text hover:text-brand-orange transition-colors">
                                +92-327-4320706
                            </a>
                        </div>

                        <div className="nm-flat-md p-8 rounded-3xl hover:scale-[1.02] transition-all group border border-nm-text/5 flex flex-col items-center text-center sm:items-start sm:text-left">
                            <div className="w-12 h-12 nm-inset-sm rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-colors">
                                <MapPin size={24} className="text-brand-orange group-hover:text-white transition-colors" />
                            </div>
                            <h4 className="text-brand-orange font-bold uppercase tracking-widest text-[10px] mb-2">Global HQ</h4>
                            <p className="text-xl font-bold text-nm-text">Lahore, PK</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
