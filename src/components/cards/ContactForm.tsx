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
            <div className="h-full flex flex-col items-center justify-center py-20 text-center bg-gradient-to-br from-[#1c1e20] to-black rounded-[32px] border border-[#f15a2f]/20 shadow-[0_0_100px_rgba(241,90,47,0.1)] p-8">
                <div className="w-24 h-24 bg-[#f15a2f]/10 rounded-full flex items-center justify-center mb-8 animate-pulse">
                    <CheckCircle size={48} className="text-[#f15a2f]" />
                </div>
                <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Transmission Received.</h3>
                <p className="text-[#fffdf2]/60 mb-12 max-w-sm text-lg">
                    Your signal has been locked. Our lead architect will analyze your request and establish a secure link within 24 hours.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="group flex items-center gap-2 text-[#f15a2f] font-bold uppercase tracking-[0.2em] text-sm hover:text-white transition-colors"
                >
                    <Sparkles size={16} /> Send Another Signal
                </button>
            </div>
        )
    }

    return (
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#f15a2f] to-[#b83a0f] rounded-[32px] opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
            <div className="relative bg-[#161819] rounded-[32px] border border-white/5 p-8 md:p-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#f15a2f]/5 rounded-full blur-[100px] pointer-events-none" />
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3 text-sm font-bold rounded-lg">
                            <AlertCircle size={18} /> {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group/input">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#f15a2f] mb-3 group-focus-within/input:text-white transition-colors">Your Name</label>
                            <input
                                {...register('name')}
                                className={cn(
                                    "w-full h-14 bg-black/40 border border-white/10 rounded-xl px-4 font-medium text-[#fffdf2] focus:border-[#f15a2f] focus:bg-black/60 outline-none transition-all duration-300 placeholder:text-white/20",
                                    errors.name && "border-red-500/50"
                                )}
                                placeholder="John Doe"
                            />
                            {errors.name && <p className="mt-2 text-[10px] text-red-500 font-bold uppercase tracking-wider flex items-center gap-1"><AlertCircle size={10} /> {errors.name.message}</p>}
                        </div>
                        <div className="group/input">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#f15a2f] mb-3 group-focus-within/input:text-white transition-colors">Company Email</label>
                            <input
                                {...register('email')}
                                className={cn(
                                    "w-full h-14 bg-black/40 border border-white/10 rounded-xl px-4 font-medium text-[#fffdf2] focus:border-[#f15a2f] focus:bg-black/60 outline-none transition-all duration-300 placeholder:text-white/20",
                                    errors.email && "border-red-500/50"
                                )}
                                placeholder="john@company.com"
                            />
                            {errors.email && <p className="mt-2 text-[10px] text-red-500 font-bold uppercase tracking-wider flex items-center gap-1"><AlertCircle size={10} /> {errors.email.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group/input">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#f15a2f] mb-3 group-focus-within/input:text-white transition-colors">Company Name</label>
                            <input
                                {...register('company')}
                                className="w-full h-14 bg-black/40 border border-white/10 rounded-xl px-4 font-medium text-[#fffdf2] focus:border-[#f15a2f] focus:bg-black/60 outline-none transition-all duration-300 placeholder:text-white/20"
                                placeholder="Acme Corp"
                            />
                        </div>
                        <div className="group/input">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#f15a2f] mb-3 group-focus-within/input:text-white transition-colors">Service Interest</label>
                            <div className="relative">
                                <select
                                    {...register('service')}
                                    className={cn(
                                        "w-full h-14 bg-black/40 border border-white/10 rounded-xl px-4 font-medium text-[#fffdf2] focus:border-[#f15a2f] focus:bg-black/60 outline-none transition-all duration-300 appearance-none cursor-pointer",
                                        errors.service && "border-red-500/50"
                                    )}
                                >
                                    <option value="" className="bg-[#1c1e20]">Select a protocol...</option>
                                    {services.map(s => <option key={s} value={s} className="bg-[#1c1e20]">{s}</option>)}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#f15a2f] pointer-events-none" size={18} />
                            </div>
                            {errors.service && <p className="mt-2 text-[10px] text-red-500 font-bold uppercase tracking-wider flex items-center gap-1"><AlertCircle size={10} /> {errors.service.message}</p>}
                        </div>
                    </div>

                    <div className="group/input">
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#f15a2f] mb-3 group-focus-within/input:text-white transition-colors">Mission Parameters</label>
                        <textarea
                            {...register('message')}
                            rows={5}
                            className={cn(
                                "w-full bg-black/40 border border-white/10 rounded-xl p-4 font-medium text-[#fffdf2] focus:border-[#f15a2f] focus:bg-black/60 outline-none transition-all duration-300 resize-none placeholder:text-white/20",
                                errors.message && "border-red-500/50"
                            )}
                            placeholder="Describe the challenge. Be specific. We like hard problems..."
                        />
                        {errors.message && <p className="mt-2 text-[10px] text-red-500 font-bold uppercase tracking-wider flex items-center gap-1"><AlertCircle size={10} /> {errors.message.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full relative overflow-hidden group bg-gradient-to-r from-[#f15a2f] to-[#b83a0f] text-[#fffdf2] py-5 rounded-xl font-black uppercase tracking-[0.2em] transition-all disabled:opacity-50 hover:shadow-[0_0_40px_rgba(241,90,47,0.4)] hover:scale-[1.01]"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {isSubmitting ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>Initialize Uplink <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                            )}
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                </form>
            </div>
        </div>
    )
}
