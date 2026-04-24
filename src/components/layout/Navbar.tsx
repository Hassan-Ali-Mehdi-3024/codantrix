'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    { name: 'Services', href: '/services' },
    { name: 'Work', href: '/work' },
    { name: 'Hassan', href: '/hassan' },
    { name: 'Notes', href: '/notes' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 96)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-50 transition-colors duration-200',
                scrolled ? 'border-b border-hairline bg-bg/90 backdrop-blur-md' : 'bg-transparent',
            )}
            aria-label="Primary"
        >
            <div className="gutter">
                <div className="flex h-16 items-center justify-between">
                    <Link
                        href="/"
                        className="font-display text-[15px] font-medium tracking-tight hover:opacity-80 transition-opacity"
                    >
                        Codantrix Labs
                    </Link>

                    <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-[14px] text-fg-70 hover:text-fg transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Sticky CTA appears once past hero */}
                        <Link
                            href="/book"
                            className={cn(
                                'btn btn-primary h-10 text-[14px] transition-all duration-300',
                                scrolled ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none',
                            )}
                        >
                            Book a call <ArrowRight size={14} />
                        </Link>
                    </nav>

                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isOpen}
                        aria-controls="mobile-nav"
                        className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-fg hover:opacity-80 transition-opacity"
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            <div
                id="mobile-nav"
                className={cn(
                    'md:hidden border-t border-hairline bg-bg overflow-hidden transition-[max-height] duration-200',
                    isOpen ? 'max-h-[60vh]' : 'max-h-0',
                )}
                aria-hidden={!isOpen}
            >
                <div className="gutter py-6 flex flex-col gap-1">
                    <Link
                        href="/book"
                        className="btn btn-primary mb-4"
                        onClick={() => setIsOpen(false)}
                    >
                        Book a scoping call <ArrowRight size={14} />
                    </Link>
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="px-1 py-3 text-[16px] text-fg-70 hover:text-fg border-b border-hairline"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    )
}
