'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import ThemeToggle from './ThemeToggle'

const navItems = [
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

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

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key !== 'Escape') return
            setIsOpen(false)
            setIsDropdownOpen(false)
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <nav className="fixed inset-x-0 top-0 z-50" aria-label="Primary">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-2 sm:mt-4 flex h-20 items-center justify-between rounded-2xl nm-flat-md px-4 sm:px-8 lg:px-10 border border-nm-text/5">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <Link href="/" className="inline-flex items-center shrink-0">
                            <Image src="/logo.svg" alt="Codantrix Labs" width={48} height={48} className="h-10 w-10 sm:h-12 sm:w-12" />
                        </Link>
                        <Link href="/" className="inline-flex items-center text-xl sm:text-2xl font-bold tracking-tight leading-none text-nm-text hover:text-brand-orange transition-colors whitespace-nowrap">
                            CODANTRIX <span className="text-brand-orange ml-2">LABS</span>
                        </Link>
                    </div>

                    {/* Tier 1: Full Desktop (2xl+) */}
                    <div className="hidden xl:flex items-center justify-end flex-1 gap-[1.5%]">
                        <div className="flex items-center gap-[1%]">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="inline-flex h-12 items-center justify-center rounded-full border border-transparent px-4 text-base font-medium tracking-wide text-nm-text/85 transition-all duration-300 hover:nm-flat-sm hover:text-brand-orange active:nm-pressed-sm whitespace-nowrap"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="h-8 w-px bg-nm-text/10 mx-[0.5%]" />
                        <ThemeToggle />
                        <Link
                            href="/contact"
                            className="inline-flex h-12 items-center justify-center rounded-full nm-btn-accent px-6 text-base font-bold tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(241,90,47,0.4)] active:scale-[0.98] whitespace-nowrap"
                        >
                            Schedule Consultation
                        </Link>
                    </div>

                    <div className="hidden lg:flex xl:hidden items-center justify-end flex-1 gap-[1%]">
                        <ThemeToggle />
                        {/* Dropdown for Links */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                aria-haspopup="menu"
                                aria-expanded={isDropdownOpen}
                                aria-controls="navbar-links-menu"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-nm-text/10 px-5 text-base font-medium tracking-wide text-nm-text/85 transition-all duration-300 hover:nm-flat-sm hover:text-brand-orange active:nm-pressed-sm"
                            >
                                Menu <ChevronDown size={18} className={cn("transition-transform duration-300", isDropdownOpen && "rotate-180")} />
                            </button>

                            {/* Dropdown Content */}
                            <div className={cn(
                                "absolute top-full right-0 mt-2 w-56 rounded-xl nm-flat-lg border border-nm-text/5 shadow-2xl overflow-hidden transition-all duration-200 origin-top-right",
                                isDropdownOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                            )} id="navbar-links-menu" role="menu" aria-label="Primary links">
                                <div className="py-2">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setIsDropdownOpen(false)}
                                            role="menuitem"
                                            className="block px-4 py-3 text-sm font-medium text-nm-text/80 hover:text-brand-orange hover:nm-flat-sm transition-all duration-200"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/contact"
                            className="inline-flex h-12 items-center justify-center rounded-full nm-btn-accent px-6 text-base font-bold tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(241,90,47,0.4)] active:scale-[0.98] whitespace-nowrap"
                        >
                            Schedule Consultation
                        </Link>
                    </div>

                    {/* Tier 3: Mobile (< lg) - Hamburger */}
                    <div className="lg:hidden flex items-center gap-6">
                        <ThemeToggle variant="round" />
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isOpen}
                            aria-controls="mobile-nav"
                            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-nm-text/10 bg-transparent text-nm-text transition-all duration-300 hover:nm-flat-sm hover:text-brand-orange active:nm-pressed-sm"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={cn(
                "lg:hidden absolute left-0 right-0 top-full nm-flat-md border-b border-nm-text/10 transition-all duration-300 ease-in-out overflow-y-auto shadow-2xl",
                isOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0 overflow-hidden"
            )} id="mobile-nav" aria-hidden={!isOpen} aria-label="Mobile menu">
                <div className="px-6 space-y-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="block rounded-xl nm-flat-sm px-4 py-3 text-nm-text text-lg font-semibold tracking-[0.08em] hover:text-brand-orange transition-all duration-300 text-center active:nm-pressed-sm"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="block w-full rounded-xl nm-btn-accent text-center py-4 font-bold uppercase tracking-[0.14em] hover:scale-[1.01] transition-all duration-300 active:scale-[0.98]"
                        onClick={() => setIsOpen(false)}
                    >
                        Schedule Consultation
                    </Link>
                </div>
            </div>
        </nav>
    )
}
