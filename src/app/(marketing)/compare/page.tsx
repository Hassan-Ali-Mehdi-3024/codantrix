import { Check, X, Shield, Clock, Zap, TrendingDown } from 'lucide-react'
import Link from 'next/link'

export default function BuildVsBuyPage() {
    const tableData = [
        {
            feature: "Time to Market",
            inHouse: "12-18 Months (Hiring + Training)",
            saas: "1 Month (Low Customization)",
            codantrix: "3-4 Months (Custom & Production-Ready)",
            winner: 'codantrix'
        },
        {
            feature: "Customization",
            inHouse: "High (Maintenance Intensive)",
            saas: "Low (Black-box models)",
            codantrix: "High (Domain-specific & Tunable)",
            winner: 'codantrix'
        },
        {
            feature: "Total Cost of Ownership",
            inHouse: "$300k+ (Salary + Infrastructure)",
            saas: "$50k+/year (Recurring Fees)",
            codantrix: "Fixed Project Cost (High ROI)",
            winner: 'codantrix'
        },
        {
            feature: "Accuracy / Reliability",
            inHouse: "Variable (Depends on talent)",
            saas: "Generic (Not site-specific)",
            codantrix: "Industrial Guarantee (Ground-Truth)",
            winner: 'codantrix'
        },
        {
            feature: "Edge Deployment",
            inHouse: "High Complexity",
            saas: "Rarely Available",
            codantrix: "Native Edge Support",
            winner: 'codantrix'
        }
    ]

    return (
        <div className="pt-40 pb-24 bg-nm-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-24 flex flex-col items-center text-center sm:items-start sm:text-left max-w-2xl mx-auto sm:mx-0">
                    <h2 className="text-brand-orange font-bold uppercase tracking-[0.3em] mb-4 text-sm">Decision Framework</h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-nm-text mb-8 italic">
                        Build <span className="opacity-20 text-nm-text">vs</span> Buy <span className="opacity-20 text-nm-text">vs</span> <span className="text-brand-orange">Codantrix.</span>
                    </h1>
                    <p className="text-xl text-nm-text-muted leading-relaxed">
                        In-house AI teams are expensive. Generic SaaS is inflexible. Codantrix Labs provides the agility of a startup with the reliability of an enterprise partner.
                    </p>
                </div>

                {/* Comparison Grid */}
                <div className="overflow-x-auto nm-flat-md rounded-3xl p-4 sm:p-8 border border-nm-text/5">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="border-b border-nm-text/10">
                                <th className="py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 text-[10px] font-black uppercase tracking-[0.2em] text-nm-text-muted">Strategic Metric</th>
                                <th className="py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 text-[10px] font-black uppercase tracking-[0.2em] text-nm-text-muted">In-House Build</th>
                                <th className="py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 text-[10px] font-black uppercase tracking-[0.2em] text-nm-text-muted">Generic SaaS Tool</th>
                                <th className="py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange">Codantrix Labs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, idx) => (
                                <tr key={idx} className="border-b border-nm-text/5 group hover:nm-inset-sm transition-all duration-300">
                                    <td className="py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 font-bold text-nm-text/80">{row.feature}</td>
                                    <td className="py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 text-sm text-nm-text-muted">{row.inHouse}</td>
                                    <td className="py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 text-sm text-nm-text-muted">{row.saas}</td>
                                    <td className="py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 font-black text-brand-orange italic">{row.codantrix}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Risk Analysis Cards */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 sm:p-10 lg:p-12 nm-flat-md border border-nm-text/5 hover:scale-[1.02] transition-all rounded-3xl group flex flex-col items-center text-center sm:items-start sm:text-left">
                        <div className="w-14 h-14 nm-inset-sm rounded-2xl flex items-center justify-center mb-8 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
                            <Clock size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-nm-text">The Talent Gap</h3>
                        <p className="text-sm text-nm-text-muted leading-relaxed">
                            Hiring senior ML engineers takes 4-6 months. We deploy in half that time with a team that has already shipped 30+ industrial models.
                        </p>
                    </div>
                    <div className="p-8 sm:p-10 lg:p-12 nm-flat-md border border-nm-text/5 hover:scale-[1.02] transition-all rounded-3xl group flex flex-col items-center text-center sm:items-start sm:text-left">
                        <div className="w-14 h-14 nm-inset-sm rounded-2xl flex items-center justify-center mb-8 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
                            <Shield size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-nm-text">The Maintenance Trap</h3>
                        <p className="text-sm text-nm-text-muted leading-relaxed">
                            80% of AI cost is post-deployment. We provide fully managed model lifecycle support, so your IT team doesn&apos;t have to become ML experts.
                        </p>
                    </div>
                    <div className="p-8 sm:p-10 lg:p-12 nm-flat-md border border-nm-text/5 hover:scale-[1.02] transition-all rounded-3xl group flex flex-col items-center text-center sm:items-start sm:text-left">
                        <div className="w-14 h-14 nm-inset-sm rounded-2xl flex items-center justify-center mb-8 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
                            <TrendingDown size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-nm-text">The Generic Fail</h3>
                        <p className="text-sm text-nm-text-muted leading-relaxed">
                            Off-the-shelf AI fails in messy industrial environments (lighting changes, dust, vibration). We optimize for your specific factory floor.
                        </p>
                    </div>
                </div>

                <div className="mt-32 p-8 sm:p-12 lg:p-16 bg-brand-orange text-white rounded-3xl flex flex-col items-center text-center sm:items-start sm:text-left relative overflow-hidden shadow-[0_20px_40px_rgba(241,90,47,0.3)]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <h2 className="text-4xl font-bold mb-6 italic relative z-10">Save 60% on Time-to-Market</h2>
                    <p className="text-xl opacity-80 mb-12 max-w-2xl relative z-10">
                        Schedule a feasibility audit where we compare your current buildup strategy against our accelerated deployment path.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 relative z-10 w-full sm:w-auto">
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-white text-brand-orange font-black uppercase tracking-widest text-xs hover:scale-105 transition-all text-center rounded-xl shadow-xl w-full sm:w-auto"
                        >
                            Request Case Comparison
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
