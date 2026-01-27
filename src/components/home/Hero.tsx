'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
    return (
        <section className="relative min-h-[100svh] w-full bg-background-deep overflow-hidden selection:bg-brand-orange selection:text-white">
            <div className="relative w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-40 pb-8 sm:pb-12">
                <div className="relative w-full rounded-[28px] border border-white/5 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent backdrop-blur-2xl overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-[-10%] right-[-10%] sm:right-[-10%] h-[min(40vw,24rem)] sm:h-[min(50vw,30rem)] w-[min(40vw,24rem)] sm:w-[min(50vw,30rem)] rounded-full bg-brand-orange blur-[min(20vw,160px)] opacity-15" />
                        <div className="absolute bottom-[-10%] left-[-10%] sm:left-[-10%] h-[min(35vw,20rem)] sm:h-[min(45vw,25rem)] w-[min(35vw,20rem)] sm:w-[min(45vw,25rem)] rounded-full bg-brand-orange blur-[min(18vw,140px)] opacity-15" />
                    </div>

                    <div className="relative z-10 grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-20 p-6 sm:p-10 lg:p-14 items-stretch">
                        <div className="flex flex-col justify-center space-y-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 w-fit backdrop-blur-sm"
                            >
                                Enterprise AI Built for Reality
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                            >
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] drop-shadow-[0_15px_60px_rgba(0,0,0,0.45)]">
                                    Real Solutions for <span className="text-brand-orange">Real Problems</span>
                                </h1>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl"
                            >
                                AI/ML that works in the real world. Not hype. Not averages. Pragmatic intelligence built for measurable industrial and enterprise ROI with accountable engineering.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.32 }}
                                className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-1"
                            >
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 rounded-[28px] bg-gradient-to-r from-[#b83a0f] via-[#f15a2f] to-[#b83a0f] bg-[length:200%_100%] hover:bg-[position:100%_0] px-7 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold uppercase tracking-[0.14em] text-[#fffdf2] shadow-[0_4px_16px_rgba(241,90,47,0.4)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(241,90,47,0.5)] active:scale-95"
                                >
                                    Start Your Project
                                </Link>
                                <Link
                                    href="/case-studies"
                                    className="inline-flex items-center justify-center gap-2 rounded-[28px] border border-white/15 glass-btn px-7 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold uppercase tracking-[0.14em] text-[#fffdf2] transition-all duration-300 hover:border-white/30 hover:-translate-y-0.5"
                                >
                                    View Case Studies
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.9, delay: 0.5 }}
                                className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 glass-stats p-6 sm:p-7 lg:p-8 rounded-3xl bg-white/[0.03]"
                            >
                                <div className="space-y-1">
                                    <p className="text-3xl font-bold text-[#fffdf2]">97.8%</p>
                                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Accuracy</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-3xl font-bold text-[#f15a2f] drop-shadow-[0_2px_8px_rgba(241,90,47,0.4)]">80%+</p>
                                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Efficiency Gain</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-3xl font-bold text-[#fffdf2]">ROI</p>
                                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">First 12 Months</p>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.25 }}
                            className="relative w-full h-full"
                        >
                            <div className="relative h-full flex flex-col justify-between rounded-[32px] glass-card p-7 sm:p-9 lg:p-10 space-y-8 edge-shine bg-white/[0.02]">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Execution</p>
                                    <span className="rounded-full bg-brand-orange/20 px-3 py-1 text-xs font-semibold text-brand-orange border border-brand-orange/30">Enterprise-grade</span>
                                </div>
                                <p className="text-2xl sm:text-3xl font-semibold leading-snug text-foreground">
                                    Built with production rigor: hardened MLOps, observability, and ROI-first delivery.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="rounded-2xl glass-card p-5 bg-black/20">
                                        <p className="text-sm text-gray-400">Engagement Model</p>
                                        <p className="text-lg font-semibold text-foreground">Pods of senior ICs</p>
                                    </div>
                                    <div className="rounded-2xl glass-card p-5 bg-black/20">
                                        <p className="text-sm text-gray-400">Deployment</p>
                                        <p className="text-lg font-semibold text-foreground">Cloud, Edge, On-prem</p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-white/10 bg-brand-orange/10 px-6 py-5 text-foreground w-full">
                                    <div className="text-center sm:text-left">
                                        <p className="text-sm uppercase tracking-[0.2em] text-gray-300">Engage the founders</p>
                                        <p className="text-lg font-semibold">Zero fluff. All signal.</p>
                                    </div>
                                    <Link href="/contact" className="rounded-full bg-gradient-to-r from-brand-orange-dark via-brand-orange to-brand-orange-dark bg-[length:200%_100%] hover:bg-[position:100%_0] px-4 py-2 text-sm font-bold uppercase tracking-[0.14em] text-foreground shadow-[0_10px_40px_rgba(184,58,15,0.55),0_0_60px_rgba(241,90,47,0.15)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_14px_55px_rgba(184,58,15,0.75),0_0_80px_rgba(241,90,47,0.25)] text-center">
                                        Book a Call
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
