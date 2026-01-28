'use client'

import { useState } from 'react'
import { Loader2, Upload, Send, CheckCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function ApplicationForm() {
    const searchParams = useSearchParams()
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const selectedRole = searchParams.get('role') ?? ''
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setStatus('loading')
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        setStatus('success')
    }

    if (status === 'success') {
        return (
            <div id="application-form" className="nm-flat-lg border border-nm-text/5 p-8 sm:p-12 text-center rounded-[32px] h-full flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="w-20 h-20 nm-inset-sm rounded-full flex items-center justify-center mx-auto mb-8 text-brand-orange animate-pulse">
                    <CheckCircle size={40} />
                </div>
                <h3 className="text-3xl font-bold text-nm-text mb-4 relative z-10">Application Received</h3>
                <p className="text-nm-text-muted mb-10 max-w-md text-lg relative z-10">
                    Thank you for your interest in joining Codantrix. Our recruitment team will review your profile and get back to you within 48 hours.
                </p>
                <button 
                    onClick={() => setStatus('idle')}
                    className="text-brand-orange font-black text-sm uppercase tracking-[0.2em] hover:text-nm-text transition-colors relative z-10"
                >
                    Submit another application
                </button>
            </div>
        )
    }

    return (
        <form id="application-form" onSubmit={handleSubmit} className="space-y-8 nm-flat-lg border border-nm-text/5 p-8 sm:p-12 rounded-[32px] h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-3">
                    <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        required
                        className="w-full nm-inset-sm border-transparent rounded-xl px-4 py-4 text-nm-text focus:border-brand-orange/30 focus:outline-none transition-all font-bold placeholder:text-nm-text-muted/30"
                        placeholder="e.g. Hassan Mehdi"
                    />
                </div>
                <div className="space-y-3">
                    <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        required
                        className="w-full nm-inset-sm border-transparent rounded-xl px-4 py-4 text-nm-text focus:border-brand-orange/30 focus:outline-none transition-all font-bold placeholder:text-nm-text-muted/30"
                        placeholder="name@example.com"
                    />
                </div>
            </div>

            <div className="space-y-3 relative z-10">
                <label htmlFor="position" className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange">Position Applied For</label>
                <div className="relative">
                    <select
                        id="position"
                        required
                        defaultValue={selectedRole}
                        className="w-full nm-inset-sm border-transparent rounded-xl px-4 py-4 text-nm-text focus:border-brand-orange/30 focus:outline-none transition-all font-bold appearance-none cursor-pointer"
                    >
                        <option value="" disabled className="bg-nm-bg">Select a role...</option>
                        <option value="ml-engineer" className="bg-nm-bg">Senior Machine Learning Engineer</option>
                        <option value="full-stack" className="bg-nm-bg">Full Stack Developer (Next.js)</option>
                        <option value="cv-engineer" className="bg-nm-bg">Computer Vision Specialist</option>
                        <option value="sales" className="bg-nm-bg">Enterprise Sales Manager</option>
                        <option value="marketing" className="bg-nm-bg">Product Marketing Manager</option>
                        <option value="design" className="bg-nm-bg">Product Designer (UI/UX)</option>
                        <option value="operations" className="bg-nm-bg">Operations Manager</option>
                        <option value="intern" className="bg-nm-bg">Engineering Intern</option>
                        <option value="other" className="bg-nm-bg">Other / General Application</option>
                    </select>
                </div>
            </div>

            <div className="space-y-3 relative z-10">
                <label htmlFor="portfolio" className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange">Portfolio / LinkedIn URL</label>
                <input
                    type="url"
                    id="portfolio"
                    className="w-full nm-inset-sm border-transparent rounded-xl px-4 py-4 text-nm-text focus:border-brand-orange/30 focus:outline-none transition-all font-bold placeholder:text-nm-text-muted/30"
                    placeholder="https://linkedin.com/in/username"
                />
            </div>

            <div className="space-y-3 relative z-10">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange">Resume / CV</label>
                <div className="nm-inset-sm border-2 border-dashed border-nm-text/10 rounded-2xl p-10 text-center hover:border-brand-orange/40 transition-all cursor-pointer group">
                    <Upload className="mx-auto h-10 w-10 text-brand-orange/20 group-hover:text-brand-orange transition-colors mb-4" />
                    <p className="text-base text-nm-text-muted font-bold group-hover:text-nm-text transition-colors">
                        Click to upload or drag and drop
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-nm-text-muted/30 mt-3">PDF, DOCX up to 5MB</p>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                </div>
            </div>

            <div className="space-y-3 relative z-10">
                <label htmlFor="cover-letter" className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange">Cover Letter (Optional)</label>
                <textarea
                    id="cover-letter"
                    rows={4}
                    className="w-full nm-inset-sm border-transparent rounded-xl p-4 text-nm-text focus:border-brand-orange/30 focus:outline-none transition-all font-bold resize-none placeholder:text-nm-text-muted/30"
                    placeholder="Tell us why you want to join Codantrix..."
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full nm-btn-accent text-white rounded-full py-5 font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative z-10 active:scale-95 shadow-xl"
            >
                {status === 'loading' ? (
                    <>
                        <Loader2 className="animate-spin" size={20} /> Processing...
                    </>
                ) : (
                    <>
                        Submit Application <Send size={20} />
                    </>
                )}
            </button>
        </form>
    )
}
