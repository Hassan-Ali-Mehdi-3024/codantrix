'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
    return (
        <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-transparent pb-24 pt-36 mt-24">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-15%] right-[-10%] h-[480px] w-[480px] rounded-full bg-[#f15a2f] blur-[140px] opacity-40" />
                <div className="absolute bottom-[-10%] left-[-8%] h-[360px] w-[360px] rounded-full bg-[#f15a2f] blur-[120px] opacity-35" />
                <div className="absolute inset-12 rounded-[32px] border border-white/5 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent backdrop-blur-sm" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#fffdf2]/70"
                        >
                            Enterprise AI Built for Reality
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#fffdf2] leading-[1.05] drop-shadow-[0_15px_60px_rgba(0,0,0,0.45)]">
                                Real Solutions for <span className="text-[#f15a2f]">Real Problems</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-lg sm:text-xl text-[#fffdf2]/70 leading-relaxed max-w-2xl"
                        >
                            AI/ML that works in the real world. Not hype. Not averages. Pragmatic intelligence built for measurable industrial and enterprise ROI with accountable engineering.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.32 }}
                            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
                        >
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#f15a2f] px-8 py-4 text-lg font-bold uppercase tracking-[0.14em] text-[#fffdf2] shadow-[0_16px_60px_rgba(241,90,47,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_80px_rgba(241,90,47,0.65)] active:scale-95"
                            >
                                Start Your Project
                            </Link>
                            <Link
                                href="/case-studies"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-8 py-4 text-lg font-bold uppercase tracking-[0.14em] text-[#fffdf2] transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:-translate-y-0.5"
                            >
                                View Case Studies
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.9, delay: 0.5 }}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-[#0b0c0e]/75 p-6 backdrop-blur-md shadow-[0_18px_70px_rgba(0,0,0,0.35)]"
                        >
                            <div className="space-y-1">
                                <p className="text-3xl font-bold text-[#fffdf2]">97.8%</p>
                                <p className="text-xs uppercase tracking-[0.2em] text-[#fffdf2]/50">Accuracy</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl font-bold text-[#f15a2f]">80%+</p>
                                <p className="text-xs uppercase tracking-[0.2em] text-[#fffdf2]/50">Efficiency Gain</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl font-bold text-[#fffdf2]">ROI</p>
                                <p className="text-xs uppercase tracking-[0.2em] text-[#fffdf2]/50">First 12 Months</p>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.25 }}
                        className="relative"
                    >
                        <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-[#f15a2f]/20 via-transparent to-white/5 blur-3xl" />
                        <div className="relative rounded-[28px] border border-white/10 bg-[#0b0c0e]/85 backdrop-blur-lg p-8 shadow-[0_20px_90px_rgba(0,0,0,0.55)] space-y-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm uppercase tracking-[0.3em] text-[#fffdf2]/60">Execution</p>
                                <span className="rounded-full bg-[#f15a2f]/20 px-3 py-1 text-xs font-semibold text-[#f15a2f] border border-[#f15a2f]/30">Enterprise-grade</span>
                            </div>
                            <p className="text-2xl sm:text-3xl font-semibold leading-snug text-[#fffdf2]">
                                Built with production rigor: hardened MLOps, observability, and ROI-first delivery.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                    <p className="text-sm text-[#fffdf2]/60">Engagement Model</p>
                                    <p className="text-lg font-semibold text-[#fffdf2]">Pods of senior ICs</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                    <p className="text-sm text-[#fffdf2]/60">Deployment</p>
                                    <p className="text-lg font-semibold text-[#fffdf2]">Cloud, Edge, On-prem</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#f15a2f]/10 px-5 py-4 text-[#fffdf2]">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.2em] text-[#fffdf2]/70">Engage the founders</p>
                                    <p className="text-lg font-semibold">Zero fluff. All signal.</p>
                                </div>
                                <Link href="/contact" className="rounded-full bg-[#f15a2f] px-4 py-2 text-sm font-bold uppercase tracking-[0.14em] text-[#fffdf2] shadow-[0_10px_40px_rgba(241,90,47,0.5)] transition-transform duration-300 hover:-translate-y-0.5">
                                    Book a Call
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
