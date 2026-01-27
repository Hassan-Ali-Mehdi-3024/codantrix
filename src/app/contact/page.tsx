'use client'

import { Mail, Clock, MapPin, Phone } from 'lucide-react'
import ContactForm from '@/components/cards/ContactForm'

export default function ContactPage() {
    return (
        <div className="pt-32 pb-24 bg-black min-h-screen relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#f15a2f]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#f15a2f]/30 bg-[#f15a2f]/10 text-[#f15a2f] text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                        <span className="w-2 h-2 rounded-full bg-[#f15a2f] animate-pulse" />
                        Status: Online
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 text-[#fffdf2] tracking-tight">
                        Let&apos;s Solve <br /> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f15a2f] to-[#ff8c69]">The Impossible.</span>
                    </h1>
                    
                    <p className="text-xl text-[#fffdf2]/60 leading-relaxed max-w-2xl mx-auto">
                        Have a complex industrial problem? Describe it. If we can&apos;t engineer a measurable ROI, we won&apos;t take the project.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Side: Form */}
                    <div className="lg:col-span-8">
                        <ContactForm />
                    </div>

                    {/* Right Side: Cards */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#161819] border border-white/5 p-6 rounded-2xl hover:border-[#f15a2f]/30 transition-colors group">
                            <div className="w-10 h-10 bg-[#f15a2f]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#f15a2f] transition-colors">
                                <Mail size={20} className="text-[#f15a2f] group-hover:text-white transition-colors" />
                            </div>
                            <h4 className="text-[#fffdf2]/40 font-bold uppercase tracking-widest text-[10px] mb-1">Direct Line</h4>
                            <a href="mailto:contact@codantrix.com" className="text-lg font-bold text-[#fffdf2] hover:text-[#f15a2f] transition-colors">
                                contact@codantrix.com
                            </a>
                        </div>

                        <div className="bg-[#161819] border border-white/5 p-6 rounded-2xl hover:border-[#f15a2f]/30 transition-colors group">
                            <div className="w-10 h-10 bg-[#f15a2f]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#f15a2f] transition-colors">
                                <Clock size={20} className="text-[#f15a2f] group-hover:text-white transition-colors" />
                            </div>
                            <h4 className="text-[#fffdf2]/40 font-bold uppercase tracking-widest text-[10px] mb-1">Response Velocity</h4>
                            <p className="text-lg font-bold text-[#fffdf2]">&lt; 24 Hours</p>
                        </div>

                        <div className="bg-[#161819] border border-white/5 p-6 rounded-2xl hover:border-[#f15a2f]/30 transition-colors group">
                            <div className="w-10 h-10 bg-[#f15a2f]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#f15a2f] transition-colors">
                                <Phone size={20} className="text-[#f15a2f] group-hover:text-white transition-colors" />
                            </div>
                            <h4 className="text-[#fffdf2]/40 font-bold uppercase tracking-widest text-[10px] mb-1">Emergency Ops</h4>
                            <a href="tel:+923274320706" className="text-lg font-bold text-[#fffdf2] hover:text-[#f15a2f] transition-colors">
                                +92-327-4320706
                            </a>
                        </div>

                        <div className="bg-[#161819] border border-white/5 p-6 rounded-2xl hover:border-[#f15a2f]/30 transition-colors group">
                            <div className="w-10 h-10 bg-[#f15a2f]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#f15a2f] transition-colors">
                                <MapPin size={20} className="text-[#f15a2f] group-hover:text-white transition-colors" />
                            </div>
                            <h4 className="text-[#fffdf2]/40 font-bold uppercase tracking-widest text-[10px] mb-1">Global HQ</h4>
                            <p className="text-lg font-bold text-[#fffdf2]">Lahore, PK</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
