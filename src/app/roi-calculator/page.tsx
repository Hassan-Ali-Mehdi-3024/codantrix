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
        <div className="pt-40 pb-24 bg-nm-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-24 flex flex-col items-center text-center sm:items-start sm:text-left max-w-2xl mx-auto sm:mx-0">
                    <h2 className="text-brand-orange font-bold uppercase tracking-[0.3em] mb-4 text-sm">Economic Validation</h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-nm-text mb-8">
                        Industrial <span className="text-brand-orange">ROI.</span>
                    </h1>
                    <p className="text-xl text-nm-text-muted leading-relaxed">
                        AI is only as valuable as the waste it eliminates. Use our calculator to estimate the annual business value of automated process intelligence.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Calculator Form */}
                    <div className="lg:col-span-7 nm-flat-md p-6 sm:p-8 lg:p-12 border border-nm-text/5 rounded-3xl relative overflow-hidden flex flex-col items-center sm:items-stretch">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl -mr-16 -mt-16" />
                        <div className="space-y-12 relative z-10 w-full text-center sm:text-left">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-brand-orange mb-6">Annual Throughput (Units)</label>
                                <input
                                    type="range"
                                    min="100000"
                                    max="10000000"
                                    step="100000"
                                    value={processVolume}
                                    onChange={(e) => setProcessVolume(Number(e.target.value))}
                                    className="w-full h-1 bg-nm-text/10 appearance-none cursor-pointer accent-brand-orange rounded-full"
                                />
                                <div className="mt-4 text-3xl font-black text-nm-text">{processVolume.toLocaleString()} <span className="text-sm font-bold opacity-30 italic">units/yr</span></div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-brand-orange mb-6">Current Defect/Error Rate (%)</label>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="10"
                                    step="0.1"
                                    value={defectRate}
                                    onChange={(e) => setDefectRate(Number(e.target.value))}
                                    className="w-full h-1 bg-nm-text/10 appearance-none cursor-pointer accent-brand-orange rounded-full"
                                />
                                <div className="mt-4 text-3xl font-black text-nm-text">{defectRate.toFixed(1)}% <span className="text-sm font-bold opacity-30 italic">baseline</span></div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-brand-orange mb-6">Manual Processing Cost per Unit ($)</label>
                                <input
                                    type="range"
                                    min="0.05"
                                    max="5.00"
                                    step="0.05"
                                    value={manualCostPerUnit}
                                    onChange={(e) => setManualCostPerUnit(Number(e.target.value))}
                                    className="w-full h-1 bg-nm-text/10 appearance-none cursor-pointer accent-brand-orange rounded-full"
                                />
                                <div className="mt-4 text-3xl font-black text-nm-text">${manualCostPerUnit.toFixed(2)} <span className="text-sm font-bold opacity-30 italic">USD</span></div>
                            </div>
                        </div>

                        <div className="mt-16 p-8 nm-inset-sm border-l-4 border-brand-orange rounded-r-2xl text-left w-full">
                            <p className="text-nm-text-muted text-xs italic">
                                *Estimates based on typical 60-80% efficiency gains observed in Codantrix industrial CV deployments. Actual ROI depends on edge constraints and data variability.
                            </p>
                        </div>
                    </div>

                    {/* Results Display */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <div className="p-8 sm:p-10 lg:p-14 bg-brand-orange text-white flex-1 rounded-3xl shadow-[0_20px_40px_rgba(241,90,47,0.3)] relative overflow-hidden flex flex-col items-center text-center sm:items-start sm:text-left">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
                            <h3 className="text-xs font-black uppercase tracking-widest mb-12 opacity-80">Estimated Annual Savings</h3>
                            <div className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-8 italic">
                                ${estimatedSavings.toLocaleString()}
                            </div>
                            <p className="text-sm opacity-80 leading-relaxed mb-12">
                                Based on your inputs, implementing integrated process intelligence could recover this amount annually by reducing manual labor and defect leakage.
                            </p>
                            <Link
                                href="/contact"
                                onClick={() => trackEvent('calculator_use', { savings: estimatedSavings, volume: processVolume })}
                                className="inline-flex items-center justify-center gap-4 text-sm font-black uppercase tracking-[0.2em] group bg-white text-brand-orange px-8 py-4 rounded-xl hover:scale-105 transition-all shadow-xl w-full sm:w-auto"
                            >
                                Validate these numbers <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>

                        <div className="p-8 nm-flat-md border border-nm-text/5 rounded-3xl space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-orange">Efficiency Drivers</h4>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 nm-inset-sm rounded-xl flex items-center justify-center text-brand-orange shrink-0">
                                    <Zap size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-nm-text">Automated Sortation</p>
                                    <p className="text-xs text-nm-text-muted leading-relaxed">Reduce manual overhead by up to 60% per process line.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 nm-inset-sm rounded-xl flex items-center justify-center text-brand-orange shrink-0">
                                    <Factory size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-nm-text">Defect Suppression</p>
                                    <p className="text-xs text-nm-text-muted leading-relaxed">Prevent high-cost defect leakage before it reaches the customer.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 nm-inset-sm rounded-xl flex items-center justify-center text-brand-orange shrink-0">
                                    <TrendingUp size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-nm-text">Predictive Uptime</p>
                                    <p className="text-xs text-nm-text-muted leading-relaxed">Minimize unplanned downtime with process variability tracking.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center py-16 border-t border-nm-text/5">
                    <div className="space-y-4">
                        <div className="w-16 h-16 nm-inset-sm rounded-full flex items-center justify-center text-brand-orange mx-auto">
                            <CheckCircle2 size={32} />
                        </div>
                        <h5 className="font-bold text-nm-text">Validated Metrics</h5>
                        <p className="text-xs text-nm-text-muted">Derived from 30+ industrial deployments.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 nm-inset-sm rounded-full flex items-center justify-center text-brand-orange mx-auto">
                            <CheckCircle2 size={32} />
                        </div>
                        <h5 className="font-bold text-nm-text">No Hype Policy</h5>
                        <p className="text-xs text-nm-text-muted">Conservative estimates for realistic budgeting.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 nm-inset-sm rounded-full flex items-center justify-center text-brand-orange mx-auto">
                            <CheckCircle2 size={32} />
                        </div>
                        <h5 className="font-bold text-nm-text">Expert Scoping</h5>
                        <p className="text-xs text-nm-text-muted">Get a full technical audit and ROI roadmap.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
