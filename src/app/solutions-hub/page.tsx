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
        <div className="pt-32 pb-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24">
                    <h2 className="text-[#f15a2f] font-bold uppercase tracking-[0.3em] mb-4 text-sm">Interactive Mapper</h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8">
                        Problem to <span className="text-[#f15a2f]">Solution.</span>
                    </h1>
                    <p className="text-xl text-[#fffdf2]/70 leading-relaxed max-w-2xl mx-auto">
                        Choose a challenge you are facing, and we will show you how we solve it.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-[#161819] p-6 sm:p-8 md:p-12 border border-[#f15a2f]/10 rounded-sm">
                        <label className="block text-xs font-black uppercase tracking-widest text-[#fffdf2]/40 mb-6">What is your primary bottleneck?</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {problems.map(prob => (
                                <button
                                    key={prob.id}
                                    onClick={() => setSelected(prob.id)}
                                    className={`p-6 text-left border transition-all duration-300 ${selected === prob.id
                                        ? 'bg-[#f15a2f] border-[#f15a2f] text-[#fffdf2]'
                                        : 'bg-[#1c1e20] border-[#fffdf2]/10 text-[#fffdf2]/60 hover:border-[#f15a2f]/40'
                                        }`}
                                >
                                    <p className="font-bold leading-tight">{prob.label}</p>
                                </button>
                            ))}
                        </div>

                        {activeProblem && (
                            <div className="mt-12 p-8 bg-[#f15a2f] text-[#fffdf2] rounded-sm transform transition-all animate-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-3 mb-4">
                                    <Lightbulb size={24} className="opacity-80" />
                                    <span className="text-xs font-black uppercase tracking-widest opacity-80">Recommended Solution</span>
                                </div>
                                <h3 className="text-3xl font-bold mb-6">{activeProblem.solution}</h3>
                                <Link
                                    href={activeProblem.type === 'service' ? `/services/${activeProblem.slug}` : `/case-studies/${activeProblem.slug}`}
                                    className="inline-flex items-center gap-3 py-3 px-6 bg-[#1c1e20] text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all"
                                >
                                    View Evidence <ArrowRight size={18} />
                                </Link>
                            </div>
                        )}

                        {!selected && (
                            <div className="mt-12 py-12 text-center border-2 border-dashed border-[#fffdf2]/5 flex flex-col items-center justify-center text-[#fffdf2]/20 italic">
                                <Search size={48} className="mb-4 opacity-20" />
                                Select a problem above to see our approach
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-24 text-center">
                    <div className="p-6 sm:p-8 lg:p-12 border border-[#fffdf2]/5 bg-[#161819] max-w-2xl mx-auto italic">
                        <p className="text-[#fffdf2]/60 mb-8">Need a more precise recommendation? Our discovery engine evaluates your throughput, cost constraints, and technical readiness.</p>
                        <Link
                            href="/quiz"
                            className="inline-flex w-full sm:w-auto items-center justify-center gap-3 py-4 px-6 sm:px-10 bg-[#f15a2f] text-[#fffdf2] font-black uppercase tracking-widest hover:translate-y-[-2px] transition-all text-xs"
                        >
                            Start Deeper Discovery <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
