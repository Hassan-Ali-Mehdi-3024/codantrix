'use client'

import { useState } from 'react'
import { Mail, Loader2, CheckCircle2 } from 'lucide-react'

export default function NewsletterForm() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })

            if (res.ok) {
                setStatus('success')
                setEmail('')
            } else {
                setStatus('error')
            }
        } catch (err) {
            setStatus('error')
        }
    }

    if (status === 'success') {
        return (
            <div className="mt-32 p-12 md:p-20 bg-[#161819] border-l-8 border-[#f15a2f] text-[#fffdf2] flex flex-col items-center text-center">
                <CheckCircle2 size={48} className="text-[#f15a2f] mb-6" />
                <h2 className="text-3xl font-bold mb-4 italic">You're in.</h2>
                <p className="text-xl text-[#fffdf2]/60">Welcome to the inner circle of industrial AI architecture.</p>
            </div>
        )
    }

    return (
        <div className="mt-32 p-12 md:p-20 bg-[#f15a2f] text-[#fffdf2] rounded-sm relative overflow-hidden">
            <div className="max-w-2xl relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 italic leading-tight">Get the "Ground-Truth" in your inbox.</h2>
                <p className="text-xl opacity-80 mb-12">Weekly insights on scaling industrial AI, bypassing the hype, and measuring true ROI.</p>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enterprise Email"
                        className="flex-1 bg-white/10 border border-white/20 px-6 py-4 placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-all font-bold"
                        required
                        disabled={status === 'loading'}
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="px-10 py-4 bg-[#1c1e20] text-[#fffdf2] font-black uppercase tracking-widest text-sm hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                        {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : 'Subscribe'}
                    </button>
                </form>
                {status === 'error' && <p className="mt-4 text-xs font-bold uppercase tracking-widest opacity-80">Something went wrong. Please try again.</p>}
            </div>
            <Mail className="absolute -bottom-10 -right-10 text-white/5 w-64 h-64 -rotate-12" />
        </div>
    )
}
