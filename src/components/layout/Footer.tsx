import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="border-t border-border mt-24 py-12 text-sm text-fg-muted">
            <div className="container-page">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 md:items-start justify-between">
                    <div className="max-w-sm">
                        <Link href="/" className="font-semibold text-fg hover:text-accent transition-colors">
                            Codantrix Labs
                        </Link>
                        <p className="mt-3 leading-relaxed">
                            I&apos;m Hassan. I build production agentic AI systems for SaaS founders and seed–Series B teams. Based in Lahore, Pakistan. Working US &amp; EU hours.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12">
                        <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-fg mb-3">Work</h4>
                            <ul className="space-y-2">
                                <li><Link href="/services" className="hover:text-fg transition-colors">Services</Link></li>
                                <li><Link href="/work" className="hover:text-fg transition-colors">Past work</Link></li>
                                <li><Link href="/contact" className="hover:text-fg transition-colors">Scoping call</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-fg mb-3">Studio</h4>
                            <ul className="space-y-2">
                                <li><Link href="/about" className="hover:text-fg transition-colors">About</Link></li>
                                <li><Link href="/blog" className="hover:text-fg transition-colors">Blog</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-fg mb-3">Legal</h4>
                            <ul className="space-y-2">
                                <li><Link href="/privacy" className="hover:text-fg transition-colors">Privacy</Link></li>
                                <li><Link href="/terms" className="hover:text-fg transition-colors">Terms</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row gap-2 justify-between text-xs text-fg-subtle">
                    <p>© {new Date().getFullYear()} Codantrix Labs. Registered with SECP Pakistan.</p>
                    <p>labs.codantrix.com</p>
                </div>
            </div>
        </footer>
    )
}
