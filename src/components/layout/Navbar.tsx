'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/case-studies' },
    { name: 'Blog', href: '/blog' },
    { name: 'Team', href: '/team' },
    { name: 'Proof', href: '/testimonials' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="fixed inset-x-0 top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-4 flex min-h-[4.5rem] items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-r from-[#0b0c0e]/90 via-[#111317]/85 to-[#0b0c0e]/90 backdrop-blur-xl shadow-[0_20px_90px_rgba(0,0,0,0.55)] px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full border border-white/10 bg-gradient-to-br from-[#f15a2f] via-[#ff6a3c] to-[#ff8a5c] flex items-center justify-center shadow-[0_12px_40px_rgba(241,90,47,0.45)]">
                            <span className="text-lg font-extrabold text-[#fffdf2]">C</span>
                        </div>
                        <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tight text-[#fffdf2] hover:text-[#f15a2f] transition-colors">
                            CODANTRIX <span className="text-[#f15a2f]">LABS</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#fffdf2]/85 rounded-full border border-transparent hover:border-white/15 hover:bg-white/5 hover:text-[#fffdf2] transition-all duration-300 hover:-translate-y-0.5"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="ml-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f15a2f] via-[#ff6a3c] to-[#ff8a5c] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#fffdf2] shadow-[0_14px_60px_rgba(241,90,47,0.6)] transition-all duration-300 hover:shadow-[0_18px_80px_rgba(241,90,47,0.75)] hover:-translate-y-0.5"
                        >
                            Schedule Consultation
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="rounded-full border border-white/10 bg-white/5 p-2 text-[#fffdf2] transition-all duration-300 hover:border-[#f15a2f]/40 hover:text-[#f15a2f]"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={cn(
                "md:hidden absolute w-full bg-[#0b0c0e]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_20px_90px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out",
                isOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0 overflow-hidden"
            )}>
                <div className="px-6 space-y-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="block rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-[#fffdf2] text-lg font-semibold tracking-[0.08em] hover:border-[#f15a2f]/50 hover:bg-white/[0.08] hover:text-[#f15a2f] transition-all duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="block w-full rounded-xl bg-gradient-to-r from-[#f15a2f] via-[#ff6a3c] to-[#ff8a5c] text-center text-[#fffdf2] py-4 font-bold uppercase tracking-[0.14em] shadow-[0_12px_60px_rgba(241,90,47,0.6)] hover:shadow-[0_14px_72px_rgba(241,90,47,0.75)] transition-all duration-300"
                        onClick={() => setIsOpen(false)}
                    >
                        Schedule Consultation
                    </Link>
                </div>
            </div>
        </nav>
    )
}
