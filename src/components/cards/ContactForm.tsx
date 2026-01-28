'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, CheckCircle, ArrowRight, AlertCircle, ChevronDown, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/utils/supabase/client'

const contactSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    company: z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    service: z.string().min(1, 'Please select a service'),
})

type ContactFormData = z.infer<typeof contactSchema>

const services = [
    'AI/ML Solutions',
    'Computer Vision',
    'Industrial Automation',
    'ROI Validation / Audit',
    'Build vs Buy Analysis',
    'Quick Scoping Call',
    'Other / Custom Tooling'
]

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const supabase = createClient()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema)
    })

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true)
        setError(null)

        try {
            const { error: supabaseError } = await supabase
                .from('inquiries')
                .insert([{
                    name: data.name,
                    email: data.email,
                    company: data.company,
                    message: data.message,
                    service_interested: data.service,
                    status: 'new'
                }])

            if (supabaseError) throw supabaseError

            setIsSuccess(true)
            reset()
        } catch (e: unknown) {
            console.error('Submission error:', e)
            setError('Something went wrong. Please try again or email us directly at contact@codantrix.com.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="h-full flex flex-col items-center justify-center py-20 text-center nm-flat-lg rounded-[32px] border border-nm-text/5 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="w-24 h-24 nm-inset-sm rounded-full flex items-center justify-center mb-8 animate-pulse">
                    <CheckCircle size={48} className="text-brand-orange" />
                </div>
                <h3 className="text-4xl font-bold mb-4 text-nm-text relative z-10">Transmission Received.</h3>
                <p className="text-nm-text-muted mb-12 max-w-sm text-lg relative z-10">
                    Your signal has been locked. Our lead architect will analyze your request and establish a secure link within 24 hours.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="group flex items-center gap-2 text-brand-orange font-bold uppercase tracking-[0.2em] text-sm hover:text-nm-text transition-colors relative z-10"
                >
                    <Sparkles size={16} /> Send Another Signal
                </button>
            </div>
        )
    }

    return (
        <div className="relative group">
            <div className="relative nm-flat-lg rounded-[32px] p-8 md:p-12 overflow-hidden border border-nm-text/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                    {error && (
                        <div className="p-4 nm-inset-sm bg-red-500/5 border border-red-500/20 text-red-500 flex items-center gap-3 text-sm font-bold rounded-xl">
                            <AlertCircle size={18} /> {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group/input">
                            <label htmlFor="contact-name" className="block text-sm font-bold uppercase tracking-widest text-brand-orange mb-3 transition-colors">Full Name</label>
                            <input
                                id="contact-name"
                                {...register('name')}
                                type="text"
                                autoComplete="name"
                                aria-invalid={!!errors.name}
                                aria-describedby={errors.name ? "contact-name-error" : undefined}
                                className={cn(
                                    "w-full h-14 nm-inset-sm border-transparent rounded-xl px-4 font-bold text-nm-text focus:border-brand-orange/30 outline-none transition-all duration-300 placeholder:text-nm-text-muted/30",
                                    errors.name && "border-red-500/50"
                                )}
                                placeholder="e.g. Hassan Mehdi"
                            />
                            {errors.name && <p id="contact-name-error" className="mt-2 text-[10px] text-red-500 font-bold uppercase tracking-wider flex items-center gap-1"><AlertCircle size={10} /> {errors.name.message}</p>}
                        </div>
                        <div className="group/input">
                            <label htmlFor="contact-email" className="block text-sm font-bold uppercase tracking-widest text-brand-orange mb-3 transition-colors">Corporate Email</label>
                            <input
                                id="contact-email"
                                {...register('email')}
                                type="email"
                                inputMode="email"
                                autoComplete="email"
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? "contact-email-error" : undefined}
                                className={cn(
                                    "w-full h-14 nm-inset-sm border-transparent rounded-xl px-4 font-bold text-nm-text focus:border-brand-orange/30 outline-none transition-all duration-300 placeholder:text-nm-text-muted/30",
                                    errors.email && "border-red-500/50"
                                )}
                                placeholder="name@company.com"
                            />
                            {errors.email && <p id="contact-email-error" className="mt-2 text-[10px] text-red-500 font-bold uppercase tracking-wider flex items-center gap-1"><AlertCircle size={10} /> {errors.email.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group/input">
                            <label htmlFor="contact-company" className="block text-sm font-bold uppercase tracking-widest text-brand-orange mb-3 transition-colors">Organization</label>
                            <input
                                id="contact-company"
                                {...register('company')}
                                type="text"
                                autoComplete="organization"
                                className="w-full h-14 nm-inset-sm border-transparent rounded-xl px-4 font-bold text-nm-text focus:border-brand-orange/30 outline-none transition-all duration-300 placeholder:text-nm-text-muted/30"
                                placeholder="Company Name"
                            />
                        </div>
                        <div className="group/input">
                            <label htmlFor="contact-service" className="block text-sm font-bold uppercase tracking-widest text-brand-orange mb-3 transition-colors">Interest Area</label>
                            <div className="relative">
                                <select
                                    id="contact-service"
                                    {...register('service')}
                                    aria-invalid={!!errors.service}
                                    aria-describedby={errors.service ? "contact-service-error" : undefined}
                                    className={cn(
                                        "w-full h-14 nm-inset-sm border-transparent rounded-xl px-4 font-bold text-nm-text focus:border-brand-orange/30 outline-none transition-all duration-300 appearance-none cursor-pointer",
                                        errors.service && "border-red-500/50"
                                    )}
                                >
                                    <option value="" className="bg-nm-bg">Select Interest...</option>
                                    {services.map(s => <option key={s} value={s} className="bg-nm-bg">{s}</option>)}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-orange pointer-events-none" size={18} />
                            </div>
                            {errors.service && <p id="contact-service-error" className="mt-2 text-[10px] text-red-500 font-bold uppercase tracking-wider flex items-center gap-1"><AlertCircle size={10} /> {errors.service.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group/input">
                            <label htmlFor="contact-budget" className="block text-sm font-bold uppercase tracking-widest text-brand-orange mb-3 transition-colors">Project Budget</label>
                            <div className="relative">
                                <select
                                    id="contact-budget"
                                    className="w-full h-14 nm-inset-sm border-transparent rounded-xl px-4 font-bold text-nm-text focus:border-brand-orange/30 outline-none transition-all duration-300 appearance-none cursor-pointer"
                                >
                                    <option value="" className="bg-nm-bg">Select Range...</option>
                                    <option value="5-10k" className="bg-nm-bg">$5k - $10k</option>
                                    <option value="10-50k" className="bg-nm-bg">$10k - $50k</option>
                                    <option value="50-100k" className="bg-nm-bg">$50k - $100k</option>
                                    <option value="100k+" className="bg-nm-bg">$100k+</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-orange pointer-events-none" size={18} />
                            </div>
                        </div>
                        <div className="group/input">
                            <label htmlFor="contact-timeline" className="block text-sm font-bold uppercase tracking-widest text-brand-orange mb-3 transition-colors">Timeline</label>
                            <div className="relative">
                                <select
                                    id="contact-timeline"
                                    className="w-full h-14 nm-inset-sm border-transparent rounded-xl px-4 font-bold text-nm-text focus:border-brand-orange/30 outline-none transition-all duration-300 appearance-none cursor-pointer"
                                >
                                    <option value="" className="bg-nm-bg">Select Timeline...</option>
                                    <option value="immediate" className="bg-nm-bg">Immediate</option>
                                    <option value="1-3-months" className="bg-nm-bg">1-3 Months</option>
                                    <option value="3-6-months" className="bg-nm-bg">3-6 Months</option>
                                    <option value="planning" className="bg-nm-bg">Planning Stage</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-orange pointer-events-none" size={18} />
                            </div>
                        </div>
                    </div>

                    <div className="group/input">
                        <label htmlFor="contact-message" className="block text-sm font-bold uppercase tracking-widest text-brand-orange mb-3 transition-colors">Mission Parameters</label>
                        <textarea
                            id="contact-message"
                            {...register('message')}
                            rows={4}
                            aria-invalid={!!errors.message}
                            aria-describedby={errors.message ? "contact-message-error" : undefined}
                            className={cn(
                                "w-full nm-inset-sm border-transparent rounded-xl p-4 font-bold text-nm-text focus:border-brand-orange/30 outline-none transition-all duration-300 resize-none placeholder:text-nm-text-muted/30",
                                errors.message && "border-red-500/50"
                            )}
                            placeholder="Describe the challenge. Be specific. We like hard problems..."
                        />
                        {errors.message && <p id="contact-message-error" className="mt-2 text-[10px] text-red-500 font-bold uppercase tracking-wider flex items-center gap-1"><AlertCircle size={10} /> {errors.message.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full relative overflow-hidden group nm-btn-accent text-white py-5 rounded-full font-black uppercase tracking-[0.2em] transition-all disabled:opacity-50 hover:scale-[1.01] active:scale-[0.98]"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {isSubmitting ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>Initialize Uplink <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                            )}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    )
}
