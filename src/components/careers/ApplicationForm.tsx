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
            <div id="application-form" className="bg-[#161819] border border-[#f15a2f]/20 p-8 sm:p-12 text-center rounded-sm h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-[#f15a2f]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#f15a2f]">
                    <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#fffdf2] mb-4">Application Received</h3>
                <p className="text-[#fffdf2]/60 mb-8">
                    Thank you for your interest in joining Codantrix. Our recruitment team will review your profile and get back to you within 48 hours.
                </p>
                <button 
                    onClick={() => setStatus('idle')}
                    className="text-[#f15a2f] font-bold text-sm uppercase tracking-widest hover:text-[#fffdf2] transition-colors"
                >
                    Submit another application
                </button>
            </div>
        )
    }

    return (
        <form id="application-form" onSubmit={handleSubmit} className="space-y-6 bg-[#161819] border border-[#fffdf2]/5 p-8 sm:p-12 rounded-sm h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-[#fffdf2]/40">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        required
                        className="w-full bg-black border border-[#fffdf2]/10 px-4 py-3 text-[#fffdf2] focus:border-[#f15a2f] focus:outline-none transition-colors"
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-[#fffdf2]/40">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        required
                        className="w-full bg-black border border-[#fffdf2]/10 px-4 py-3 text-[#fffdf2] focus:border-[#f15a2f] focus:outline-none transition-colors"
                        placeholder="john@example.com"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="position" className="text-xs font-bold uppercase tracking-widest text-[#fffdf2]/40">Position Applied For</label>
                <select
                    id="position"
                    required
                    defaultValue={selectedRole}
                    className="w-full bg-black border border-[#fffdf2]/10 px-4 py-3 text-[#fffdf2] focus:border-[#f15a2f] focus:outline-none transition-colors appearance-none"
                >
                    <option value="" disabled>Select a role</option>
                    <option value="ml-engineer">Senior Machine Learning Engineer</option>
                    <option value="full-stack">Full Stack Developer (Next.js)</option>
                    <option value="cv-engineer">Computer Vision Specialist</option>
                    <option value="sales">Enterprise Sales Manager</option>
                    <option value="marketing">Product Marketing Manager</option>
                    <option value="design">Product Designer (UI/UX)</option>
                    <option value="operations">Operations Manager</option>
                    <option value="intern">Engineering Intern</option>
                    <option value="other">Other / General Application</option>
                </select>
            </div>

            <div className="space-y-2">
                <label htmlFor="portfolio" className="text-xs font-bold uppercase tracking-widest text-[#fffdf2]/40">Portfolio / LinkedIn URL</label>
                <input
                    type="url"
                    id="portfolio"
                    className="w-full bg-black border border-[#fffdf2]/10 px-4 py-3 text-[#fffdf2] focus:border-[#f15a2f] focus:outline-none transition-colors"
                    placeholder="https://linkedin.com/in/johndoe"
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#fffdf2]/40">Resume / CV</label>
                <div className="border-2 border-dashed border-[#fffdf2]/10 rounded-sm p-8 text-center hover:border-[#f15a2f]/40 transition-colors cursor-pointer group">
                    <Upload className="mx-auto h-8 w-8 text-[#fffdf2]/20 group-hover:text-[#f15a2f] transition-colors mb-4" />
                    <p className="text-sm text-[#fffdf2]/60 font-medium group-hover:text-[#fffdf2] transition-colors">
                        Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-[#fffdf2]/30 mt-2">PDF, DOCX up to 5MB</p>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="cover-letter" className="text-xs font-bold uppercase tracking-widest text-[#fffdf2]/40">Cover Letter (Optional)</label>
                <textarea
                    id="cover-letter"
                    rows={4}
                    className="w-full bg-black border border-[#fffdf2]/10 px-4 py-3 text-[#fffdf2] focus:border-[#f15a2f] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us why you want to join Codantrix..."
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#f15a2f] text-[#fffdf2] font-black uppercase tracking-widest py-4 hover:bg-[#fffdf2] hover:text-[#1c1e20] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
