import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className="glass-strong text-foreground p-6 sm:p-10 lg:p-14 lg:m-20 m-4 sm:m-6 border-t border-black/10">
            <div className="max-w-6xl mx-auto px-4 ">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-14 mb-12">
                        {/* Brand Col */}
                        <div className="md:col-span-2 space-y-4 flex flex-col items-center sm:items-start text-center sm:text-left">
                            <Link href="/" className="text-2xl font-bold tracking-tight inline-flex items-center gap-3 hover:text-brand-orange transition-colors">
                                <Image src="/logo.svg" alt="Codantrix Labs" width={32} height={32} className="h-8 w-auto" />
                                CODANTRIX <span className="text-brand-orange">LABS</span>
                            </Link>
                            <p className="text-sm md:text-base text-foreground/70 leading-relaxed max-w-xl">
                                Pragmatic AI/ML partner for enterprises. Real solutions for real problems—built with accountable engineering and measurable ROI.
                            </p>
                            <Link href="/about" className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-brand-orange hover:text-foreground transition-all hover:translate-x-1">
                                Our Story →
                            </Link>
                        </div>

                        {/* Links Col 3 */}
                        <div className="space-y-4 flex flex-col items-center sm:items-start text-center sm:text-left">
                            <h4 className="text-xs font-bold uppercase tracking-[0.28em] text-brand-orange">Intel & Tools</h4>
                            <ul className="space-y-3 text-sm text-foreground/70 w-full">
                                <li><Link href="/services/ai-ml-solutions" className="hover:text-foreground transition-all hover:translate-x-1 block">AI/ML Solutions</Link></li>
                                <li><Link href="/services/computer-vision" className="hover:text-foreground transition-all hover:translate-x-1 block">Computer Vision</Link></li>
                                <li><Link href="/services/industrial-automation" className="hover:text-foreground transition-all hover:translate-x-1 block">Industrial Automation</Link></li>
                                <li><Link href="/services/web-development" className="hover:text-foreground transition-all hover:translate-x-1 block">Web Development</Link></li>
                            </ul>
                        </div>

                        {/* Links Col 2 */}
                        <div className="space-y-4 flex flex-col items-center sm:items-start text-center sm:text-left">
                            <h4 className="text-xs font-bold uppercase tracking-[0.28em] text-brand-orange">Company</h4>
                            <ul className="space-y-3 text-sm text-foreground/70 w-full">
                                <li><Link href="/careers" className="hover:text-foreground transition-all hover:translate-x-1 block">Careers</Link></li>
                                <li><Link href="/testimonials" className="hover:text-foreground transition-all hover:translate-x-1 block">Proof (Testimonials)</Link></li>
                                <li><Link href="/case-studies" className="hover:text-foreground transition-all hover:translate-x-1 block">Portfolio</Link></li>
                                <li><Link href="/our-approach" className="hover:text-foreground transition-all hover:translate-x-1 block">Our Methodology</Link></li>
                            </ul>
                        </div>

                        {/* Links Col 2 */}
                        <div className="space-y-4 flex flex-col items-center sm:items-start text-center sm:text-left">
                            <h4 className="text-xs font-bold uppercase tracking-[0.28em] text-brand-orange">Expertise</h4>
                            <ul className="space-y-3 text-sm text-foreground/70 w-full">
                                <li><Link href="/blog" className="hover:text-foreground transition-all hover:translate-x-1 block">Process Intelligence (Blog)</Link></li>
                                <li><Link href="/roi-calculator" className="hover:text-foreground transition-all hover:translate-x-1 block">ROI Calculator</Link></li>
                                <li><Link href="/quiz" className="hover:text-foreground transition-all hover:translate-x-1 block">Solution Quiz</Link></li>
                                <li><Link href="/compare" className="hover:text-foreground transition-all hover:translate-x-1 block">Build vs. Buy</Link></li>
                                <li><Link href="/resources/library" className="hover:text-foreground transition-all hover:translate-x-1 block">Resource Library</Link></li>
                            </ul>
                        </div>

                        {/* Contact Col */}
                        <div className="space-y-4 flex flex-col items-center sm:items-start text-center sm:text-left">
                            <h4 className="text-xs font-bold uppercase tracking-[0.28em] text-brand-orange">Locate Us</h4>
                            <p className="text-sm text-foreground/70 leading-relaxed">
                                Based in Pakistan.<br />
                                Global AI Partner.
                            </p>
                            <div className="pt-2">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 text-sm font-bold border-b border-brand-orange pb-1 hover:border-foreground hover:text-foreground transition-all"
                                >
                                    Work with us →
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs text-foreground/60">
                        <p>© {new Date().getFullYear()} Codantrix Labs. All rights reserved.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
        </footer>
    )
}
