'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Search, Lightbulb } from 'lucide-react'

const problems = [
    { id: 'defect', label: 'High defect rates in manufacturing', solution: 'Computer Vision Defect Detection', slug: 'automotive-defect-detection', type: 'case' },
    { id: 'sorting', label: 'Manual sorting & bottlenecked logistics', solution: 'CV-Powered Sorting Systems', slug: 'logistics-smart-sorting', type: 'case' },
    { id: 'prediction', label: 'Inaccurate crop yield/health tracking', solution: 'Satellite & drone health mapping', slug: 'agriculture-crop-health', type: 'case' },
    { id: 'crowd', label: 'Retail foot traffic & occupancy analytics', solution: 'Edge-AI Occupancy Intelligence', slug: 'retail-occupancy-intelligence', type: 'case' },
    { id: 'infra', label: 'Lack of proper AI MLOps & Dashboards', solution: 'Supporting Tools & Infrastructure', slug: 'tools-infrastructure', type: 'service' },
]

export default function SolutionsHub() {
    const [selected, setSelected] = useState<string | null>(null)

    const activeProblem = problems.find(p => p.id === selected)

    return (
        <div className="pt-40 pb-24 bg-nm-bg">
            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center sm:items-start sm:text-left mb-24 max-w-3xl mx-auto sm:mx-0">
                    <h2 className="text-brand-orange font-bold uppercase tracking-[0.3em] mb-4 text-sm">Interactive Mapper</h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 text-nm-text">
                        Problem to <br /><span className="text-brand-orange">Solution.</span>
                    </h1>
                    <p className="text-xl text-nm-text-muted leading-relaxed">
                        Choose a challenge you are facing, and we will show you how we solve it with measurable evidence.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto sm:mr-auto sm:ml-0">
                    <div className="nm-flat-md p-8 sm:p-10 md:p-14 border border-nm-text/5 rounded-3xl relative overflow-hidden flex flex-col items-center sm:items-stretch">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -mr-32 -mt-32" />
                        
                        <label className="block text-xs font-black uppercase tracking-widest text-nm-text/30 mb-8 relative z-10 text-center sm:text-left">What is your primary bottleneck?</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 w-full">
                            {problems.map(prob => (
                                <button
                                    key={prob.id}
                                    onClick={() => setSelected(prob.id)}
                                    className={`p-6 text-left transition-all duration-300 rounded-2xl border ${selected === prob.id
                                        ? 'nm-inset-sm border-brand-orange/50 text-brand-orange'
                                        : 'nm-flat-sm border-nm-text/5 text-nm-text-muted hover:border-brand-orange/20'
                                        }`}
                                >
                                    <p className="font-bold leading-tight">{prob.label}</p>
                                </button>
                            ))}
                        </div>

                        {activeProblem && (
                            <div className="mt-12 p-10 bg-brand-orange text-white rounded-3xl transform transition-all animate-in slide-in-from-bottom-4 duration-500 shadow-[0_20px_40px_rgba(241,90,47,0.3)] flex flex-col items-center sm:items-start text-center sm:text-left">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                        <Lightbulb size={20} className="text-white" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest opacity-80">Recommended Solution</span>
                                </div>
                                <h3 className="text-3xl font-bold mb-8">{activeProblem.solution}</h3>
                                <Link
                                    href={activeProblem.type === 'service' ? `/services/${activeProblem.slug}` : `/case-studies/${activeProblem.slug}`}
                                    className="inline-flex items-center justify-center gap-3 py-4 px-8 bg-white text-brand-orange text-sm font-bold uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl w-full sm:w-auto"
                                >
                                    View Evidence <ArrowRight size={18} />
                                </Link>
                            </div>
                        )}

                        {!selected && (
                            <div className="mt-12 py-20 text-center nm-inset-xs rounded-3xl border-2 border-dashed border-nm-text/5 flex flex-col items-center justify-center text-nm-text/20 italic">
                                <Search size={48} className="mb-6 opacity-10" />
                                <p className="font-medium tracking-wide">Select a problem above to see our approach</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-24 flex flex-col items-center text-center sm:items-start sm:text-left max-w-2xl mx-auto sm:mx-0">
                    <div className="p-10 nm-flat-sm border border-nm-text/5 rounded-3xl italic relative overflow-hidden group w-full">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <p className="text-nm-text-muted mb-10 text-lg leading-relaxed relative z-10">
                            Need a more precise recommendation? Our discovery engine evaluates your throughput, cost constraints, and technical readiness to find the optimal path forward.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex w-full sm:w-auto items-center justify-center gap-4 py-5 px-10 nm-btn-accent text-white font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all text-xs rounded-xl relative z-10"
                        >
                            Contact Engineering <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
