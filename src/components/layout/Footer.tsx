import Link from 'next/link'

// Build-log footer — signature detail (spec Section 7.4 + 11.14)
// Deploy timestamp baked at build time; readable by humans, ignored by buyers on mobile.
const BUILD_ISO = new Date().toISOString().slice(0, 10)

export default function Footer() {
    return (
        <footer className="mt-32 border-t border-hairline">
            <div className="gutter py-12">
                {/* Build log — mono, muted, left-aligned */}
                <div className="meta mb-10 space-y-0.5">
                    <p>
                        <span className="text-fg-35">last deploy</span> <span className="text-fg-70">{BUILD_ISO}</span>
                    </p>
                    <p>
                        <span className="text-fg-35">built in</span> <span className="text-fg-70">Lahore, Pakistan</span>
                    </p>
                    <p>
                        <span className="text-fg-35">shipped from</span> <span className="text-fg-70">a one-person studio</span>
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
                    <div>
                        <Link href="/" className="font-display text-[15px] font-medium tracking-tight hover:opacity-80 transition-opacity">
                            Codantrix Labs
                        </Link>
                        <p className="mt-2 text-[13px] text-fg-45 max-w-xs">
                            Registered with SECP Pakistan. labs.codantrix.com
                        </p>
                    </div>

                    <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[13px]" aria-label="Footer">
                        <Link href="/services" className="text-fg-70 hover:text-fg">Services</Link>
                        <Link href="/work" className="text-fg-70 hover:text-fg">Work</Link>
                        <Link href="/hassan" className="text-fg-70 hover:text-fg">Hassan</Link>
                        <Link href="/notes" className="text-fg-70 hover:text-fg">Notes</Link>
                        <Link href="/book" className="text-fg-70 hover:text-fg">Book a call</Link>
                        <Link href="/privacy" className="text-fg-45 hover:text-fg">Privacy</Link>
                        <Link href="/terms" className="text-fg-45 hover:text-fg">Terms</Link>
                    </nav>
                </div>

                <p className="mt-8 meta text-fg-35">
                    © {new Date().getFullYear()} Codantrix Labs
                </p>
            </div>
        </footer>
    )
}
