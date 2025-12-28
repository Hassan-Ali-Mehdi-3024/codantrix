'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react'
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

export default function ContactPage() {
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
        } catch (e: any) {
            console.error('Submission error:', e)
            setError('Something went wrong. Please try again or email us directly at hello@codantrix.com.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="pt-32 pb-24 bg-[#1c1e20] min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

                    {/* Left Side: Info */}
                    <div>
                        <h2 className="text-[#f15a2f] font-bold uppercase tracking-[0.3em] mb-4 text-sm">Get in Touch</h2>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8">
                            Let's solve <br /> something.
                        </h1>
                        <p className="text-xl text-[#fffdf2]/70 leading-relaxed mb-12">
                            Have a complex problem that standard software can't fix? Describe it to us, and we'll tell you if/how AI can actually help.
                        </p>

                        <div className="space-y-8 mt-16">
                            <div>
                                <h4 className="text-[#f15a2f] font-bold uppercase tracking-widest text-xs mb-2">Email</h4>
                                <p className="text-2xl font-bold">hello@codantrix.com</p>
                            </div>
                            <div>
                                <h4 className="text-[#f15a2f] font-bold uppercase tracking-widest text-xs mb-2">Response Time</h4>
                                <p className="text-lg text-[#fffdf2]/60">&lt; 24 Hours for qualified inquiries.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="bg-[#161819] p-8 md:p-12 border border-[#f15a2f]/10 rounded-sm relative">
                        {isSuccess ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <CheckCircle size={64} className="text-[#f15a2f] mb-6" />
                                <h3 className="text-3xl font-bold mb-4">Inquiry Received.</h3>
                                <p className="text-[#fffdf2]/60 mb-8 max-w-sm">
                                    Thank you. A lead architect will review your submission and reach out within 24 hours.
                                </p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="text-[#f15a2f] font-bold uppercase tracking-widest text-sm border-b border-[#f15a2f] pb-1"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {error && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3 text-sm font-bold">
                                        <AlertCircle size={18} /> {error}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-[#fffdf2]/40 mb-2">Your Name</label>
                                        <input
                                            {...register('name')}
                                            className={cn(
                                                "w-full bg-[#1c1e20] border border-[#fffdf2]/10 p-4 font-medium focus:border-[#f15a2f] outline-none transition-colors",
                                                errors.name && "border-red-500/50"
                                            )}
                                            placeholder="John Doe"
                                        />
                                        {errors.name && <p className="mt-1 text-[10px] text-red-500 font-bold uppercase">{errors.name.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-[#fffdf2]/40 mb-2">Company Email</label>
                                        <input
                                            {...register('email')}
                                            className={cn(
                                                "w-full bg-[#1c1e20] border border-[#fffdf2]/10 p-4 font-medium focus:border-[#f15a2f] outline-none transition-colors",
                                                errors.email && "border-red-500/50"
                                            )}
                                            placeholder="john@company.com"
                                        />
                                        {errors.email && <p className="mt-1 text-[10px] text-red-500 font-bold uppercase">{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-[#fffdf2]/40 mb-2">Company Name</label>
                                        <input
                                            {...register('company')}
                                            className="w-full bg-[#1c1e20] border border-[#fffdf2]/10 p-4 font-medium focus:border-[#f15a2f] outline-none transition-colors"
                                            placeholder="Acme Corp"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-[#fffdf2]/40 mb-2">Service of Interest</label>
                                        <select
                                            {...register('service')}
                                            className={cn(
                                                "w-full bg-[#1c1e20] border border-[#fffdf2]/10 p-4 font-medium focus:border-[#f15a2f] outline-none transition-colors appearance-none",
                                                errors.service && "border-red-500/50"
                                            )}
                                        >
                                            <option value="">Select a service...</option>
                                            {services.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                        {errors.service && <p className="mt-1 text-[10px] text-red-500 font-bold uppercase">{errors.service.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-[#fffdf2]/40 mb-2">Describe Your Challenge</label>
                                    <textarea
                                        {...register('message')}
                                        rows={5}
                                        className={cn(
                                            "w-full bg-[#1c1e20] border border-[#fffdf2]/10 p-4 font-medium focus:border-[#f15a2f] outline-none transition-colors resize-none",
                                            errors.message && "border-red-500/50"
                                        )}
                                        placeholder="Tell us about the problem you want to solve..."
                                    />
                                    {errors.message && <p className="mt-1 text-[10px] text-red-500 font-bold uppercase">{errors.message.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#f15a2f] text-[#fffdf2] py-5 font-black uppercase tracking-[0.2em] hover:bg-[#f15a2f]/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <>Submit Inquiry <ArrowRight size={20} /></>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
