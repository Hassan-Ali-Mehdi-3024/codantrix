import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className="w-full pb-8 sm:pb-12 relative z-20">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="nm-flat-lg rounded-[32px] p-8 sm:p-12 lg:p-16 border border-nm-text/5">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-14 mb-12">
                        {/* Brand Col */}
                        <div className="md:col-span-2 space-y-6 flex flex-col items-center sm:items-start text-center sm:text-left">
                            <Link href="/" className="text-2xl font-bold tracking-tight inline-flex items-center gap-4 text-nm-text hover:text-brand-orange transition-colors">
                                <Image src="/logo.svg" alt="Codantrix Labs" width={40} height={40} className="h-10 w-auto" />
                                CODANTRIX <span className="text-brand-orange">LABS</span>
                            </Link>
                            <p className="text-sm md:text-base text-nm-text-muted leading-relaxed max-w-xl">
                                Pragmatic AI/ML partner for enterprises. Real solutions for real problems—built with accountable engineering and measurable ROI.
                            </p>
                        </div>

                        {/* Services Col */}
                        <div className="space-y-4 flex flex-col items-center sm:items-start text-center sm:text-left">
                            <h4 className="text-xs font-bold uppercase tracking-[0.28em] text-brand-orange">Services</h4>
                            <ul className="space-y-3 text-sm text-nm-text-muted w-full">
                                <li><Link href="/services/ai-ml-solutions" className="hover:text-nm-text transition-all hover:translate-x-1 block">AI/ML Solutions</Link></li>
                                <li><Link href="/services/computer-vision" className="hover:text-nm-text transition-all hover:translate-x-1 block">Computer Vision</Link></li>
                                <li><Link href="/services/industrial-automation" className="hover:text-nm-text transition-all hover:translate-x-1 block">Industrial Automation</Link></li>
                                <li><Link href="/services/web-development" className="hover:text-nm-text transition-all hover:translate-x-1 block">Web Development</Link></li>
                            </ul>
                        </div>

                        {/* Contact Col */}
                        <div className="space-y-4 flex flex-col items-center sm:items-start text-center sm:text-left">
                            <h4 className="text-xs font-bold uppercase tracking-[0.28em] text-brand-orange">Locate Us</h4>
                            <p className="text-sm text-nm-text-muted leading-relaxed">
                                Based in Lahore, Pakistan.<br />
                                Global AI Partner.
                            </p>
                            <div className="pt-2">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 text-sm font-bold border-b border-brand-orange pb-1 hover:border-nm-text hover:text-nm-text transition-all"
                                >
                                    Work with us →
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-nm-text/10 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs text-nm-text-muted">
                        <p>© {new Date().getFullYear()} Codantrix Labs. All rights reserved.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/privacy" className="hover:text-nm-text transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-nm-text transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
