'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    { name: 'Services', href: '/services' },
    { name: 'Work', href: '/work' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md" aria-label="Primary">
            <div className="container-page">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="font-semibold tracking-tight text-fg hover:text-accent transition-colors">
                        Codantrix Labs
                    </Link>

                    <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="px-3 py-2 text-sm text-fg-muted hover:text-fg transition-colors rounded-md"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="btn btn-primary ml-3 h-10 text-sm"
                        >
                            Book a scoping call
                        </Link>
                    </nav>

                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isOpen}
                        aria-controls="mobile-nav"
                        className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-fg hover:border-border-strong transition-colors"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            <div
                id="mobile-nav"
                className={cn(
                    "md:hidden border-t border-border bg-bg transition-[max-height,opacity] duration-200 overflow-hidden",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
                aria-hidden={!isOpen}
            >
                <div className="container-page py-4 flex flex-col gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="px-3 py-3 text-base text-fg-muted hover:text-fg transition-colors rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="btn btn-primary mt-2 h-11"
                        onClick={() => setIsOpen(false)}
                    >
                        Book a scoping call
                    </Link>
                </div>
            </div>
        </header>
    )
}
