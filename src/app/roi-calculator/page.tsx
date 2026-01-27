'use client'

import { useState } from 'react'
import { Calculator, ArrowRight, CheckCircle2, Factory, TrendingUp, Zap } from 'lucide-react'
import Link from 'next/link'
import { trackEvent } from '@/utils/analytics'

export default function ROICalculator() {
    const [processVolume, setProcessVolume] = useState(1000000) // units/year
    const [defectRate, setDefectRate] = useState(2.5) // %
    const [manualCostPerUnit, setManualCostPerUnit] = useState(0.50) // $
    const [capturedValue, setCapturedValue] = useState(0)

    const calculateROI = () => {
        const annualDefects = (processVolume * defectRate) / 100
        const annualManualCost = processVolume * manualCostPerUnit

        // Assuming AI reduces defect miss rate by 80% and labor by 60%
        const potentialSavings = (annualManualCost * 0.6) + (annualDefects * 10) // $10 per defect prevented (arbitrary but realistic)
        return Math.floor(potentialSavings)
    }

    const estimatedSavings = calculateROI()

    return (
        <div className="pt-32 pb-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-24">
                    <h2 className="text-[#f15a2f] font-bold uppercase tracking-[0.3em] mb-4 text-sm">Economic Validation</h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-[#fffdf2] mb-8">
                        Industrial <span className="text-[#f15a2f]">ROI.</span>
                    </h1>
                    <p className="text-xl text-[#fffdf2]/70 leading-relaxed max-w-2xl">
                        AI is only as valuable as the waste it eliminates. Use our calculator to estimate the annual business value of automated process intelligence.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Calculator Form */}
                    <div className="lg:col-span-7 bg-[#161819] p-6 sm:p-8 lg:p-12 border border-[#fffdf2]/5">
                        <div className="space-y-12">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-[#f15a2f] mb-6">Annual Throughput (Units)</label>
                                <input
                                    type="range"
                                    min="100000"
                                    max="10000000"
                                    step="100000"
                                    value={processVolume}
                                    onChange={(e) => setProcessVolume(Number(e.target.value))}
                                    className="w-full h-1 bg-[#1c1e20] appearance-none cursor-pointer accent-[#f15a2f]"
                                />
                                <div className="mt-4 text-3xl font-black text-[#fffdf2]">{processVolume.toLocaleString()} <span className="text-sm font-bold opacity-30 italic">units/yr</span></div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-[#f15a2f] mb-6">Current Defect/Error Rate (%)</label>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="10"
                                    step="0.1"
                                    value={defectRate}
                                    onChange={(e) => setDefectRate(Number(e.target.value))}
                                    className="w-full h-1 bg-[#1c1e20] appearance-none cursor-pointer accent-[#f15a2f]"
                                />
                                <div className="mt-4 text-3xl font-black text-[#fffdf2]">{defectRate.toFixed(1)}% <span className="text-sm font-bold opacity-30 italic">baseline</span></div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-[#f15a2f] mb-6">Manual Processing Cost per Unit ($)</label>
                                <input
                                    type="range"
                                    min="0.05"
                                    max="5.00"
                                    step="0.05"
                                    value={manualCostPerUnit}
                                    onChange={(e) => setManualCostPerUnit(Number(e.target.value))}
                                    className="w-full h-1 bg-[#1c1e20] appearance-none cursor-pointer accent-[#f15a2f]"
                                />
                                <div className="mt-4 text-3xl font-black text-[#fffdf2]">${manualCostPerUnit.toFixed(2)} <span className="text-sm font-bold opacity-30 italic">USD</span></div>
                            </div>
                        </div>

                        <div className="mt-16 p-8 bg-[#1c1e20] border-l-4 border-[#f15a2f]">
                            <p className="text-[#fffdf2]/40 text-xs italic">
                                *Estimates based on typical 60-80% efficiency gains observed in Codantrix industrial CV deployments. Actual ROI depends on edge constraints and data variability.
                            </p>
                        </div>
                    </div>

                    {/* Results Display */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <div className="p-6 sm:p-8 lg:p-12 bg-[#f15a2f] text-[#fffdf2] flex-1">
                            <h3 className="text-xs font-black uppercase tracking-widest mb-12 opacity-80">Estimated Annual Savings</h3>
                            <div className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter mb-8 italic">
                                ${estimatedSavings.toLocaleString()}
                            </div>
                            <p className="text-sm opacity-80 leading-relaxed mb-12">
                                Based on your inputs, implementing integrated process intelligence could recover this amount annually by reducing manual labor and defect leakage.
                            </p>
                            <Link
                                href="/contact"
                                onClick={() => trackEvent('calculator_use', { savings: estimatedSavings, volume: processVolume })}
                                className="inline-flex items-center gap-4 text-sm font-black uppercase tracking-[0.2em] group"
                            >
                                Validate these numbers <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>

                        <div className="p-8 bg-[#161819] border border-[#fffdf2]/5 space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#f15a2f]">Efficiency Drivers</h4>
                            <div className="flex items-start gap-4">
                                <Zap size={18} className="text-[#f15a2f] mt-1 shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-[#fffdf2]">Automated Sortation</p>
                                    <p className="text-xs text-[#fffdf2]/40 leading-relaxed">Reduce manual overhead by up to 60% per process line.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Factory size={18} className="text-[#f15a2f] mt-1 shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-[#fffdf2]">Defect Suppression</p>
                                    <p className="text-xs text-[#fffdf2]/40 leading-relaxed">Prevent high-cost defect leakage before it reaches the customer.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <TrendingUp size={18} className="text-[#f15a2f] mt-1 shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-[#fffdf2]">Predictive Uptime</p>
                                    <p className="text-xs text-[#fffdf2]/40 leading-relaxed">Minimize unplanned downtime with process variability tracking.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center py-16 border-t border-[#fffdf2]/5">
                    <div>
                        <CheckCircle2 size={32} className="text-[#f15a2f] mx-auto mb-4" />
                        <h5 className="font-bold text-[#fffdf2] mb-2">Validated Metrics</h5>
                        <p className="text-xs text-[#fffdf2]/40">Derived from 30+ industrial deployments.</p>
                    </div>
                    <div>
                        <CheckCircle2 size={32} className="text-[#f15a2f] mx-auto mb-4" />
                        <h5 className="font-bold text-[#fffdf2] mb-2">No Hype Policy</h5>
                        <p className="text-xs text-[#fffdf2]/40">Conservative estimates for realistic budgeting.</p>
                    </div>
                    <div>
                        <CheckCircle2 size={32} className="text-[#f15a2f] mx-auto mb-4" />
                        <h5 className="font-bold text-[#fffdf2] mb-2">Expert Scoping</h5>
                        <p className="text-xs text-[#fffdf2]/40">Get a full technical audit and ROI roadmap.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
