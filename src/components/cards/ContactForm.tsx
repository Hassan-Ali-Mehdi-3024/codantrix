'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// 6-field form per spec 11.4. Dropped "Which service?"; reframed Budget default.
const contactSchema = z.object({
    name: z.string().min(2, 'Your name'),
    email: z.string().email('A working email'),
    company: z.string().optional(),
    budget: z.string().optional(),
    timeline: z.string().optional(),
    message: z.string().min(20, 'Give me at least a couple of sentences'),
})

type ContactFormData = z.infer<typeof contactSchema>

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
                body: JSON.stringify({
                    ...data,
                    // API still expects a service field — send "Not sure yet" to keep the row valid
                    service: 'Not sure yet',
                }),
            })
            if (!res.ok) throw new Error('Submit failed')
            setIsSuccess(true)
            reset()
        } catch {
            setError('Something broke. Email me directly at hassan@codantrix.com.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="py-10">
                <div className="flex items-start gap-4 mb-6">
                    <CheckCircle size={24} className="text-accent shrink-0 mt-1" />
                    <div>
                        <h3 className="text-[24px] font-display font-medium tracking-tight mb-2">
                            Got it. I&apos;ll reply within 24 hours.
                        </h3>
                        <p className="body text-fg-70">
                            Usually sooner. If you don&apos;t hear back, email me at{' '}
                            <a href="mailto:hassan@codantrix.com" className="text-accent hover:opacity-80 transition-opacity">
                                hassan@codantrix.com
                            </a>.
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="meta text-fg-45 hover:text-fg-70 transition-colors"
                >
                    Send another →
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-0" noValidate>
            {error && (
                <div className="mb-8 flex items-center gap-2 text-[14px] text-red-400">
                    <AlertCircle size={16} /> {error}
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-0">
                <Field label="Name" error={errors.name?.message} required>
                    <input
                        {...register('name')}
                        type="text"
                        autoComplete="name"
                        className={inputCn(errors.name)}
                        placeholder="First and last"
                    />
                </Field>
                <Field label="Email" error={errors.email?.message} required>
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

            <Field label="Company" optional>
                <input
                    {...register('company')}
                    type="text"
                    autoComplete="organization"
                    className={inputCn()}
                    placeholder="Company or product name"
                />
            </Field>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-0">
                <Field label="Budget" optional>
                    <select {...register('budget')} className={inputCn()} defaultValue="">
                        <option value="">Not sure — let&apos;s figure it out on the call</option>
                        <option value="8-15k">$8K – $15K (Tier B)</option>
                        <option value="15-30k">$15K – $30K (Tier A)</option>
                        <option value="30k+">$30K+</option>
                    </select>
                </Field>
                <Field label="Timeline" optional>
                    <select {...register('timeline')} className={inputCn()} defaultValue="">
                        <option value="">Flexible</option>
                        <option value="asap">Starting ASAP</option>
                        <option value="1-2mo">Next 1–2 months</option>
                        <option value="3mo+">3+ months out</option>
                    </select>
                </Field>
            </div>

            <Field label="What are you trying to build?" error={errors.message?.message} required>
                <textarea
                    {...register('message')}
                    rows={5}
                    className={inputCn(errors.message, true)}
                    placeholder="Current stack, what you've tried, what's stuck."
                />
            </Field>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 size={16} className="animate-spin" /> Sending…
                        </>
                    ) : (
                        <>
                            Send <ArrowRight size={16} className="arrow-nudge" />
                        </>
                    )}
                </button>
                <p className="meta text-fg-35">Replies within 24 hours. No auto-responders.</p>
            </div>
        </form>
    )
}

function Field({
    label,
    error,
    required,
    optional,
    children,
}: {
    label: string
    error?: string
    required?: boolean
    optional?: boolean
    children: React.ReactNode
}) {
    return (
        <label className="block pt-6 pb-2 border-b border-hairline group focus-within:border-hairline-strong transition-colors">
            <span className="meta text-fg-35 mb-2 flex items-baseline gap-2">
                {label}
                {required && <span className="text-accent">*</span>}
                {optional && <span className="text-fg-35 normal-case tracking-normal">(optional)</span>}
            </span>
            {children}
            {error && (
                <span className="mt-2 flex items-center gap-1 text-[12px] text-red-400">
                    <AlertCircle size={12} /> {error}
                </span>
            )}
        </label>
    )
}

function inputCn(error?: unknown, isTextarea?: boolean) {
    return cn(
        'w-full bg-transparent border-0 outline-none p-0 text-fg text-[17px] placeholder:text-fg-35',
        isTextarea ? 'py-2 resize-none leading-relaxed' : 'h-10',
        Boolean(error) && 'text-red-400',
    )
}
