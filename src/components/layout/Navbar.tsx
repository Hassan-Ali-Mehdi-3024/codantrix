'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/case-studies' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Proof', href: '/testimonials' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <nav className="fixed inset-x-0 top-0 z-50">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-2 sm:mt-4 flex h-20 items-center justify-between rounded-2xl glass px-6 sm:px-8 lg:px-10">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="inline-flex items-center">
                            <Image src="/logo.svg" alt="Codantrix Labs" width={40} height={40} className="h-10 w-10" />
                        </Link>
                        <Link href="/" className="inline-flex items-center text-xl sm:text-2xl font-bold tracking-tight leading-none text-[#fffdf2] hover:text-[#f15a2f] transition-colors">
                            CODANTRIX <span className="text-[#f15a2f]">LABS</span>
                        </Link>
                    </div>

                    {/* Tier 1: Full Desktop (2xl+) */}
                    <div className="hidden 2xl:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="inline-flex h-12 items-center justify-center rounded-full border border-transparent px-5 text-base font-medium tracking-wide text-[#fffdf2]/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/5 hover:text-[#fffdf2]"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#b83a0f] via-[#f15a2f] to-[#b83a0f] bg-[length:200%_100%] px-8 text-base font-bold tracking-wide text-[#fffdf2] shadow-[0_4px_16px_rgba(241,90,47,0.4)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-[position:100%_0] hover:shadow-[0_6px_20px_rgba(241,90,47,0.5)] whitespace-nowrap"
                        >
                            Schedule Consultation
                        </Link>
                        <Link
                            href="/login"
                            className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 px-8 text-base font-medium tracking-wide text-[#fffdf2]/85 transition-all duration-300 hover:border-[#f15a2f]/50 hover:bg-white/5 hover:text-[#f15a2f]"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Tier 2: Intermediate (lg to 2xl) - Dropdown + CTA */}
                    <div className="hidden lg:flex 2xl:hidden items-center gap-4">
                        {/* Dropdown for Links */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 px-5 text-base font-medium tracking-wide text-[#fffdf2]/85 transition-all duration-300 hover:border-[#f15a2f]/40 hover:text-[#f15a2f] hover:bg-white/5"
                            >
                                Menu <ChevronDown size={18} className={cn("transition-transform duration-300", isDropdownOpen && "rotate-180")} />
                            </button>

                            {/* Dropdown Content */}
                            <div className={cn(
                                "absolute top-full right-0 mt-2 w-56 rounded-xl bg-[#0f1113] border border-white/10 shadow-2xl overflow-hidden transition-all duration-200 origin-top-right",
                                isDropdownOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                            )}>
                                <div className="py-2">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="block px-4 py-3 text-sm font-medium text-[#fffdf2]/80 hover:text-[#f15a2f] hover:bg-white/5 transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                    <div className="h-px bg-white/10 my-1 mx-4" />
                                    <Link
                                        href="/login"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="block px-4 py-3 text-sm font-medium text-[#fffdf2]/80 hover:text-[#f15a2f] hover:bg-white/5 transition-colors"
                                    >
                                        Client Login
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/contact"
                            className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#b83a0f] via-[#f15a2f] to-[#b83a0f] bg-[length:200%_100%] px-6 text-base font-bold tracking-wide text-[#fffdf2] shadow-[0_4px_16px_rgba(241,90,47,0.4)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-[position:100%_0] hover:shadow-[0_6px_20px_rgba(241,90,47,0.5)] whitespace-nowrap"
                        >
                            Schedule Consultation
                        </Link>
                    </div>

                    {/* Tier 3: Mobile (< lg) - Hamburger */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-transparent text-[#fffdf2] transition-all duration-300 hover:border-[#f15a2f]/40 hover:text-[#f15a2f]"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={cn(
                "lg:hidden absolute left-0 right-0 top-full bg-[#0f1113] border-b border-white/10 transition-all duration-300 ease-in-out overflow-y-auto shadow-2xl",
                isOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0 overflow-hidden"
            )}>
                <div className="px-6 space-y-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="block rounded-xl glass-card px-4 py-3 text-foreground text-lg font-semibold tracking-[0.08em] hover:border-brand-orange/50 hover:text-brand-orange transition-all duration-300 text-center"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="block w-full rounded-xl bg-gradient-to-r from-brand-orange-dark via-brand-orange to-brand-orange-dark bg-[length:200%_100%] text-center text-foreground py-4 font-bold uppercase tracking-[0.14em] shadow-[0_12px_60px_rgba(184,58,15,0.65),0_0_70px_rgba(241,90,47,0.2)] hover:shadow-[0_14px_72px_rgba(184,58,15,0.8),0_0_80px_rgba(241,90,47,0.25)] transition-all duration-500"
                        onClick={() => setIsOpen(false)}
                    >
                        Schedule Consultation
                    </Link>
                    <Link
                        href="/login"
                        className="block w-full rounded-xl border border-white/10 bg-white/5 text-center text-foreground py-3 font-bold uppercase tracking-[0.14em] hover:bg-white/10 transition-all duration-300"
                        onClick={() => setIsOpen(false)}
                    >
                        Client Login
                    </Link>
                </div>
            </div>
        </nav>
    )
}
