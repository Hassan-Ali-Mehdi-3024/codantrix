'use client'

import { useState } from 'react'
import type { ComponentType, SVGProps } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2, Factory, Package, Truck, ShoppingCart, Cpu, Brain, Laptop } from 'lucide-react'
import Link from 'next/link'
import { trackEvent } from '@/utils/analytics'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }
type IconComponent = ComponentType<IconProps>

type Step = {
    id: number
    title: string
    question: string
    options: { label: string, value: string, icon?: IconComponent }[]
}

const steps: Step[] = [
    {
        id: 1,
        title: "Industry Context",
        question: "What is your primary operational domain?",
        options: [
            { label: "Manufacturing / Production", value: "manufacturing", icon: Factory },
            { label: "Logistics / Supply Chain", value: "logistics", icon: Truck },
            { label: "Warehousing / Fullfilment", value: "warehousing", icon: Package },
            { label: "Retail / E-commerce", value: "retail", icon: ShoppingCart },
            { label: "Other Corporate", value: "other", icon: Laptop },
        ]
    },
    {
        id: 2,
        title: "Primary Pain Point",
        question: "What is the biggest bottleneck you are facing right now?",
        options: [
            { label: "Quality Control (Defects, Errors)", value: "quality", icon: CheckCircle2 },
            { label: "Manual Data Entry / Processing", value: "manual", icon: Cpu },
            { label: "Operational Inefficiency / Waste", value: "efficiency", icon: TrendingUp },
            { label: "Lack of Predictive Insights", value: "insights", icon: Brain },
        ]
    },
    {
        id: 3,
        title: "Data Availability",
        question: "How would you describe your current data maturity?",
        options: [
            { label: "We have clean, structured data", value: "ready" },
            { label: "We have raw data (Images/Logs)", value: "raw" },
            { label: "We are starting from zero", value: "zero" },
        ]
    },
    {
        id: 4,
        title: "Urgency",
        question: "What is your timeline for implementation?",
        options: [
            { label: "Immediate (Next 30 days)", value: "urgent" },
            { label: "Strategic (3-6 months)", value: "strategic" },
            { label: "Exploratory / Research", value: "exploratory" },
        ]
    }
]

// Recommendation logic helper
const getRecommendation = (answers: Record<number, string>) => {
    const industry = answers[1]
    const pain = answers[2]

    if (pain === 'quality' || (industry === 'manufacturing' && pain === 'efficiency')) {
        return {
            title: "Computer Vision Systems",
            description: "High-speed, edge-deployed CV models for real-time defect detection and quality assurance.",
            service: "computer-vision",
            roi: "Typically 6-8 months"
        }
    }

    if (pain === 'manual' || pain === 'insights') {
        return {
            title: "Custom AI/ML Solutions",
            description: "Deep learning models for predictive maintenance, demand forecasting, and automated data processing.",
            service: "ai-ml-solutions",
            roi: "Typically 4-6 months"
        }
    }

    return {
        title: "Industrial Automation",
        description: "End-to-end strategic automation integrating AI into your physical process flow.",
        service: "industrial-automation",
        roi: "Typically 12 months"
    }
}

function TrendingUp({ size = 24, ...props }: IconProps) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
        </svg>
    )
}

export default function SolutionQuiz() {
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [isFinished, setIsFinished] = useState(false)

    const handleOptionSelect = (value: string) => {
        setAnswers({ ...answers, [steps[currentStep].id]: value })
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        } else {
            setIsFinished(true)
            trackEvent('quiz_complete', { ...answers, [steps[currentStep].id]: value })
        }
    }

    const goBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1)
    }

    const recommendation = isFinished ? getRecommendation(answers) : null

    return (
        <div className="pt-40 pb-24 bg-nm-bg min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {!isFinished ? (
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-16 w-full flex flex-col items-center">
                            <div className="flex justify-between items-center mb-8 w-full">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange text-left">
                                    Requirement Discovery — Step {currentStep + 1} of {steps.length}
                                </span>
                                {currentStep > 0 && (
                                    <button
                                        onClick={goBack}
                                        className="text-nm-text-muted hover:text-brand-orange text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors shrink-0"
                                    >
                                        <ArrowLeft size={14} /> Back
                                    </button>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black text-nm-text leading-tight mb-4 text-center">
                                {steps[currentStep].question}
                            </h1>
                            <div className="w-full h-1 bg-nm-text/5 mt-8 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-brand-orange"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <AnimatePresence mode="wait">
                                {steps[currentStep].options.map((opt, i) => {
                                    const Icon = opt.icon
                                    return (
                                        <motion.button
                                            key={opt.value}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            onClick={() => handleOptionSelect(opt.value)}
                                            className="p-8 nm-flat-md border border-nm-text/5 hover:scale-[1.02] text-left group transition-all rounded-3xl flex flex-col items-center text-center sm:items-start sm:text-left"
                                        >
                                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                                {Icon && (
                                                    <div className="w-12 h-12 nm-inset-sm rounded-2xl flex items-center justify-center text-nm-text-muted group-hover:text-brand-orange transition-colors shrink-0">
                                                        <Icon size={24} />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-bold text-lg text-nm-text group-hover:text-brand-orange transition-colors">
                                                        {opt.label}
                                                    </p>
                                                    <span className="text-[10px] uppercase tracking-widest text-nm-text-muted/40 font-black">Select Option</span>
                                                </div>
                                            </div>
                                        </motion.button>
                                    )
                                })}
                            </AnimatePresence>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="nm-flat-lg p-6 sm:p-10 md:p-20 border-l-8 border-brand-orange rounded-3xl relative overflow-hidden flex flex-col items-center text-center sm:items-start sm:text-left"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -mr-32 -mt-32" />
                        
                        <h2 className="text-brand-orange font-black uppercase tracking-[0.3em] mb-8 text-sm">Recommended Path</h2>
                        <h3 className="text-4xl md:text-6xl font-black text-nm-text mb-8 leading-tight italic">
                            {recommendation?.title}
                        </h3>
                        <p className="text-xl text-nm-text-muted mb-12 leading-relaxed max-w-2xl">
                            {recommendation?.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 py-12 border-y border-nm-text/5 w-full">
                            <div className="flex flex-col items-center sm:items-start">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-nm-text-muted mb-2">Estimated ROI</h4>
                                <p className="text-3xl font-black text-brand-orange">{recommendation?.roi}</p>
                            </div>
                            <div className="flex flex-col items-center sm:items-start">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-nm-text-muted mb-2">Success Metric</h4>
                                <p className="text-3xl font-black text-brand-orange">Process Uptime</p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 relative z-10 w-full sm:w-auto">
                            <Link
                                href={`/services/${recommendation?.service}`}
                                className="w-full md:w-auto px-6 sm:px-10 py-5 nm-flat-md border border-nm-text/5 text-nm-text font-black uppercase tracking-widest text-xs hover:text-brand-orange transition-all text-center rounded-xl"
                            >
                                Explorer Service Profile
                            </Link>
                            <Link
                                href="/contact"
                                className="w-full md:w-auto px-6 sm:px-10 py-5 nm-btn-accent text-white font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-3 rounded-xl"
                            >
                                Schedule Scoping Call <ArrowRight size={14} />
                            </Link>
                        </div>

                        <button
                            onClick={() => { setIsFinished(false); setCurrentStep(0); setAnswers({}); }}
                            className="mt-12 text-nm-text-muted hover:text-brand-orange text-[10px] font-black uppercase tracking-widest transition-colors relative z-10"
                        >
                            Reset Discovery Quiz
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
