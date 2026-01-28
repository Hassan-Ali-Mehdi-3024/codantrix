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
            <div className="mt-32 p-12 md:p-20 nm-flat-md rounded-[32px] border border-nm-text/5 text-nm-text flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -mr-32 -mt-32" />
                <CheckCircle2 size={48} className="text-brand-orange mb-6 relative z-10" />
                <h2 className="text-3xl font-bold mb-4 italic relative z-10">You&apos;re in.</h2>
                <p className="text-xl text-nm-text-muted relative z-10">Welcome to the inner circle of industrial AI architecture.</p>
            </div>
        )
    }

    return (
        <div className="mt-32 p-12 md:p-20 nm-flat-lg rounded-[32px] border border-nm-text/5 text-nm-text relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="max-w-2xl relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 italic leading-tight">Get the &quot;Ground-Truth&quot; in your inbox.</h2>
                <p className="text-xl text-nm-text-muted mb-12">Weekly insights on scaling industrial AI, bypassing the hype, and measuring true ROI.</p>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enterprise Email"
                        className="flex-1 nm-inset-sm border-transparent rounded-2xl px-6 py-4 placeholder:text-nm-text-muted/30 focus:outline-none transition-all font-bold text-nm-text"
                        required
                        disabled={status === 'loading'}
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="px-10 py-4 nm-btn-accent text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                        {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : 'Subscribe'}
                    </button>
                </form>
                {status === 'error' && <p className="mt-6 text-xs font-bold uppercase tracking-widest text-red-500">Something went wrong. Please try again.</p>}
            </div>
            <Mail className="absolute -bottom-10 -right-10 text-brand-orange/5 w-64 h-64 -rotate-12" />
        </div>
    )
}
