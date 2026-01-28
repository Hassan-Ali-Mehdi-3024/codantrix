'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const isDarkMode = document.documentElement.classList.contains('dark')
        setIsDark(isDarkMode)
    }, [])

    const toggleTheme = () => {
        const newDark = !isDark
        setIsDark(newDark)
        if (newDark) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }

    if (!mounted) return <div className="w-16 h-8 rounded-full bg-transparent border border-nm-text/5" />

    return (
        <button
            onClick={toggleTheme}
            className="group relative w-16 h-8 rounded-full nm-inset-md p-1 transition-all duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-brand-orange/50"
            aria-label="Toggle Theme"
        >
            <div
                className={cn(
                    "absolute w-6 h-6 rounded-full nm-btn-accent transition-all duration-500 transform flex items-center justify-center nm-flat-sm",
                    isDark ? "translate-x-8" : "translate-x-0"
                )}
            >
                {isDark ? (
                    <Moon size={12} className="text-nm-accent-text fill-nm-accent-text" />
                ) : (
                    <Sun size={12} className="text-nm-accent-text fill-nm-accent-text" />
                )}
            </div>
            
            {/* Background Icons */}
            <div className="flex w-full justify-between px-1.5 opacity-30 group-hover:opacity-50 transition-opacity">
                <Sun size={12} className={cn("text-nm-text", !isDark && "opacity-0")} />
                <Moon size={12} className={cn("text-nm-text", isDark && "opacity-0")} />
            </div>
        </button>
    )
}
