'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import servicesData from '@/data/services.json'

const contactSchema = z.object({
    name: z.string().min(2, 'Your name'),
    email: z.string().email('A working email'),
    company: z.string().optional(),
    service: z.string().min(1, 'Pick the closest fit — or "Not sure yet"'),
    budget: z.string().optional(),
    timeline: z.string().optional(),
    message: z.string().min(20, 'Give me at least a couple of sentences about the problem'),
})

type ContactFormData = z.infer<typeof contactSchema>

const services = (servicesData as { name: string; slug: string }[]).map(s => s.name)

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    })

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true)
        setError(null)
        try {
            const res = await fetch('/api/db/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!res.ok) throw new Error('Submit failed')
            setIsSuccess(true)
            reset()
        } catch {
            setError('Something went wrong. Email me directly at hassan@codantrix.com.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="card p-10 text-center">
                <CheckCircle size={36} className="text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-fg mb-2">Got it — I&apos;ll reply within 24 hours.</h3>
                <p className="text-fg-muted">Usually sooner. If you don&apos;t hear back, email me at <a href="mailto:hassan@codantrix.com" className="text-accent hover:text-accent-hover">hassan@codantrix.com</a>.</p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 text-sm text-fg-muted hover:text-fg"
                >
                    Send another
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card p-6 md:p-8 space-y-5" noValidate>
            {error && (
                <div className="flex items-center gap-2 text-sm text-red-400 border border-red-500/30 rounded-md px-3 py-2">
                    <AlertCircle size={16} /> {error}
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-5">
                <Field label="Name" error={errors.name?.message}>
                    <input
                        {...register('name')}
                        type="text"
                        autoComplete="name"
                        className={inputCn(errors.name)}
                        placeholder="First and last"
                    />
                </Field>
                <Field label="Email" error={errors.email?.message}>
                    <input
                        {...register('email')}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        className={inputCn(errors.email)}
                        placeholder="you@company.com"
                    />
                </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                <Field label="Company (optional)">
                    <input
                        {...register('company')}
                        type="text"
                        autoComplete="organization"
                        className={inputCn()}
                        placeholder="Company or product name"
                    />
                </Field>
                <Field label="Which service?" error={errors.service?.message}>
                    <select {...register('service')} className={inputCn(errors.service)} defaultValue="">
                        <option value="" disabled>Pick one</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                        <option value="Not sure yet">Not sure yet</option>
                    </select>
                </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                <Field label="Budget (optional)">
                    <select {...register('budget')} className={inputCn()} defaultValue="">
                        <option value="">No preference</option>
                        <option value="8-15k">$8K – $15K (Tier B)</option>
                        <option value="15-30k">$15K – $30K (Tier A)</option>
                        <option value="30k+">$30K+</option>
                    </select>
                </Field>
                <Field label="Timeline (optional)">
                    <select {...register('timeline')} className={inputCn()} defaultValue="">
                        <option value="">Flexible</option>
                        <option value="asap">Starting ASAP</option>
                        <option value="1-2mo">Next 1–2 months</option>
                        <option value="3mo+">3+ months out</option>
                    </select>
                </Field>
            </div>

            <Field label="What's the problem?" error={errors.message?.message}>
                <textarea
                    {...register('message')}
                    rows={5}
                    className={inputCn(errors.message)}
                    placeholder="What are you trying to build or fix? The more specific, the better — current stack, what you've tried, what's stuck."
                />
            </Field>

            <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Send <ArrowRight size={16} /></>}
            </button>
            <p className="text-xs text-fg-subtle">Replies within 24 hours. No auto-responders — it&apos;s me.</p>
        </form>
    )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <label className="block">
            <span className="block text-sm font-medium text-fg mb-2">{label}</span>
            {children}
            {error && <span className="mt-1 flex items-center gap-1 text-xs text-red-400"><AlertCircle size={12} /> {error}</span>}
        </label>
    )
}

function inputCn(error?: unknown) {
    return cn(
        "w-full h-11 px-3 text-sm bg-bg-subtle border border-border rounded-md text-fg placeholder:text-fg-subtle",
        "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
        "transition-colors",
        Boolean(error) && "border-red-500/60"
    )
}
