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
        <div className="pt-32 pb-24 bg-[#1c1e20]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-24 text-center">
                    <h2 className="text-[#f15a2f] font-bold uppercase tracking-[0.3em] mb-4 text-sm">Decision Framework</h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-[#fffdf2] mb-8 italic">
                        Build <span className="opacity-20 text-[#fffdf2]">vs</span> Buy <span className="opacity-20 text-[#fffdf2]">vs</span> <span className="text-[#f15a2f]">Codantrix.</span>
                    </h1>
                    <p className="text-xl text-[#fffdf2]/40 max-w-2xl mx-auto">
                        In-house AI teams are expensive. Generic SaaS is inflexible. Codantrix Labs provides the agility of a startup with the reliability of an enterprise partner.
                    </p>
                </div>

                {/* Comparison Grid */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#fffdf2]/10">
                                <th className="py-8 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#fffdf2]/40">Strategic Metric</th>
                                <th className="py-8 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#fffdf2]/40">In-House Build</th>
                                <th className="py-8 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#fffdf2]/40">Generic SaaS Tool</th>
                                <th className="py-8 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#f15a2f]">Codantrix Labs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, idx) => (
                                <tr key={idx} className="border-b border-[#fffdf2]/5 group hover:bg-[#161819] transition-colors">
                                    <td className="py-8 px-6 font-bold text-[#fffdf2]/80">{row.feature}</td>
                                    <td className="py-8 px-6 text-sm text-[#fffdf2]/40">{row.inHouse}</td>
                                    <td className="py-8 px-6 text-sm text-[#fffdf2]/40">{row.saas}</td>
                                    <td className="py-8 px-6 font-black text-[#f15a2f] italic">{row.codantrix}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Risk Analysis Cards */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-12 bg-[#161819] border border-[#fffdf2]/5 hover:border-[#f15a2f]/20 transition-all">
                        <Clock className="text-[#f15a2f] mb-8" size={32} />
                        <h3 className="text-xl font-bold mb-4">The Talent Gap</h3>
                        <p className="text-sm text-[#fffdf2]/50 leading-relaxed">
                            Hiring senior ML engineers takes 4-6 months. We deploy in half that time with a team that has already shipped 30+ industrial models.
                        </p>
                    </div>
                    <div className="p-12 bg-[#161819] border border-[#fffdf2]/5 hover:border-[#f15a2f]/20 transition-all">
                        <Shield className="text-[#f15a2f] mb-8" size={32} />
                        <h3 className="text-xl font-bold mb-4">The Maintenance Trap</h3>
                        <p className="text-sm text-[#fffdf2]/50 leading-relaxed">
                            80% of AI cost is post-deployment. We provide fully managed model lifecycle support, so your IT team doesn't have to become ML experts.
                        </p>
                    </div>
                    <div className="p-12 bg-[#161819] border border-[#fffdf2]/5 hover:border-[#f15a2f]/20 transition-all">
                        <TrendingDown className="text-[#f15a2f] mb-8" size={32} />
                        <h3 className="text-xl font-bold mb-4">The Generic Fail</h3>
                        <p className="text-sm text-[#fffdf2]/50 leading-relaxed">
                            Off-the-shelf AI fails in messy industrial environments (lighting changes, dust, vibration). We optimize for your specific factory floor.
                        </p>
                    </div>
                </div>

                <div className="mt-32 p-16 bg-[#f15a2f] text-[#fffdf2] rounded-sm flex flex-col items-center text-center">
                    <h2 className="text-4xl font-bold mb-6 italic">Save 60% on Time-to-Market</h2>
                    <p className="text-xl opacity-80 mb-12 max-w-2xl">
                        Schedule a feasibility audit where we compare your current buildup strategy against our accelerated deployment path.
                    </p>
                    <div className="flex flex-col md:flex-row gap-6">
                        <Link
                            href="/contact"
                            className="px-10 py-4 bg-[#1c1e20] text-[#fffdf2] font-black uppercase tracking-widest text-xs hover:bg-[#fffdf2] hover:text-[#1c1e20] transition-all"
                        >
                            Request Case Comparison
                        </Link>
                        <Link
                            href="/roi-calculator"
                            className="px-10 py-4 bg-transparent border-2 border-[#fffdf2] text-[#fffdf2] font-black uppercase tracking-widest text-xs hover:bg-[#fffdf2] hover:text-[#f15a2f] transition-all"
                        >
                            Run the Numbers
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
