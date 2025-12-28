import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-[#1c1e20] via-[#151719] to-[#0f1113] text-[#fffdf2] pt-20 pb-10 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-10 sm:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-14 mb-12">
                        {/* Brand Col */}
                        <div className="md:col-span-2 space-y-4">
                            <Link href="/" className="text-2xl font-bold tracking-tight inline-flex items-center gap-3 hover:text-[#f15a2f] transition-colors">
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg font-extrabold text-[#f15a2f] shadow-inner shadow-black/30">C</span>
                                CODANTRIX <span className="text-[#f15a2f]">LABS</span>
                            </Link>
                            <p className="text-sm md:text-base text-[#fffdf2]/70 leading-relaxed max-w-xl">
                                Pragmatic AI/ML partner for enterprises. Real solutions for real problems—built with accountable engineering and measurable ROI.
                            </p>
                            <Link href="/about" className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#f15a2f] hover:text-[#fffdf2] transition-all hover:translate-x-1">
                                Our Story →
                            </Link>
                        </div>

                        {/* Links Col 1 */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-[0.28em] text-[#f15a2f]">Services</h4>
                            <ul className="space-y-3 text-sm text-[#fffdf2]/70">
                                <li><Link href="/services/ai-ml-solutions" className="hover:text-[#fffdf2] transition-all hover:translate-x-1 block">AI/ML Solutions</Link></li>
                                <li><Link href="/services/computer-vision" className="hover:text-[#fffdf2] transition-all hover:translate-x-1 block">Computer Vision</Link></li>
                                <li><Link href="/services/industrial-automation" className="hover:text-[#fffdf2] transition-all hover:translate-x-1 block">Industrial Automation</Link></li>
                                <li><Link href="/services/web-development" className="hover:text-[#fffdf2] transition-all hover:translate-x-1 block">Web Development</Link></li>
                            </ul>
                        </div>

                        {/* Links Col 2 */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-[0.28em] text-[#f15a2f]">Expertise</h4>
                            <ul className="space-y-3 text-sm text-[#fffdf2]/70">
                                <li><Link href="/team" className="hover:text-[#fffdf2] transition-all hover:translate-x-1 block">Elite DNA (Team)</Link></li>
                                <li><Link href="/testimonials" className="hover:text-[#fffdf2] transition-all hover:translate-x-1 block">Proof (Testimonials)</Link></li>
                                <li><Link href="/case-studies" className="hover:text-[#fffdf2] transition-all hover:translate-x-1 block">Portfolio</Link></li>
                                <li><Link href="/our-approach" className="hover:text-[#fffdf2] transition-all hover:translate-x-1 block">Our Methodology</Link></li>
                            </ul>
                        </div>

                        {/* Links Col 3 */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-[0.28em] text-[#f15a2f]">Intel & Tools</h4>
                            <ul className="space-y-3 text-sm text-[#fffdf2]/70">
                                <li><Link href="/blog" className="hover:text-[#fffdf2] transition-all hover:translate-x-1 block">Process Intelligence (Blog)</Link></li>
                                <li><Link href="/roi-calculator" className="hover:text-[#fffdf2] transition-all hover:translate-x-1 block">ROI Calculator</Link></li>
                                <li><Link href="/quiz" className="hover:text-[#fffdf2] transition-all hover:translate-x-1 block">Solution Quiz</Link></li>
                                <li><Link href="/compare" className="hover:text-[#fffdf2] transition-all hover:translate-x-1 block">Build vs. Buy</Link></li>
                                <li><Link href="/resources/library" className="hover:text-[#fffdf2] transition-all hover:translate-x-1 block">Resource Library</Link></li>
                            </ul>
                        </div>

                        {/* Contact Col */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-[0.28em] text-[#f15a2f]">Locate Us</h4>
                            <p className="text-sm text-[#fffdf2]/70 leading-relaxed">
                                Based in Pakistan.<br />
                                Global AI Partner.
                            </p>
                            <div className="pt-2">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 text-sm font-bold border-b border-[#f15a2f] pb-1 hover:border-[#fffdf2] hover:text-[#fffdf2] transition-all"
                                >
                                    Work with us →
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 text-xs text-[#fffdf2]/60">
                        <p>© {new Date().getFullYear()} Codantrix Labs. All rights reserved.</p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/privacy" className="hover:text-[#fffdf2] transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-[#fffdf2] transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
