export default function AboutPage() {
    return (
        <div className="pt-32 pb-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto sm:mx-0 text-center sm:text-left">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8">
                        The <span className="text-[#f15a2f]">Code</span> of <br />Reliability.
                    </h1>
                    <p className="text-xl text-[#fffdf2]/70 leading-relaxed mb-12">
                        Codantrix Labs was founded with one mission: to strip away the academic abstraction of AI and deliver industrial-grade performance that companies can rely on for their core operations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20">
                    <div className="text-center sm:text-left">
                        <h2 className="text-2xl font-bold text-[#f15a2f] mb-6 uppercase tracking-wider">Our Story</h2>
                        <p className="text-[#fffdf2]/60 mb-6 leading-relaxed">
                            Founded by Hassan Ali Mehdi, Codantrix Labs emerged from the realization that while AI models were getting &quot;smarter,&quot; they were becoming harder to scale in real-world environments. We focused on the &quot;ground-truth&quot;—the unpolished, messy data of actual production lines and farm fields.
                        </p>
                        <p className="text-[#fffdf2]/60 leading-relaxed">
                            Today, we serve as the pragmatic bridge between high-level AI research and the hard constraints of business ROI and physical-world reliability.
                        </p>
                    </div>
                    <div className="text-center sm:text-left">
                        <h2 className="text-2xl font-bold text-[#f15a2f] mb-6 uppercase tracking-wider">Our Philosophy</h2>
                        <ul className="space-y-6">
                            <li className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                                <div className="text-2xl font-bold text-[#fffdf2]/20">01</div>
                                <div>
                                    <h4 className="text-lg font-bold">Ground-Truth First</h4>
                                    <p className="text-sm text-[#fffdf2]/50 mt-1">We don&apos;t trust synthetic data. We build models on the reality of your operations.</p>
                                </div>
                            </li>
                            <li className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                                <div className="text-2xl font-bold text-[#fffdf2]/20">02</div>
                                <div>
                                    <h4 className="text-lg font-bold">Pragmatic ROI</h4>
                                    <p className="text-sm text-[#fffdf2]/50 mt-1">If the AI doesn&apos;t save you more than it costs within 12 months, we don&apos;t build it.</p>
                                </div>
                            </li>
                            <li className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                                <div className="text-2xl font-bold text-[#fffdf2]/20">03</div>
                                <div>
                                    <h4 className="text-lg font-bold">Human-in-the-loop</h4>
                                    <p className="text-sm text-[#fffdf2]/50 mt-1">Our systems are designed to empower your operators, not replace the human edge.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Founder Section */}
                <div className="mt-32 p-6 sm:p-8 lg:p-12 bg-[#161819] border border-[#f15a2f]/10 rounded-sm">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-48 h-48 bg-[#f15a2f]/10 rounded-sm flex items-center justify-center text-5xl font-bold text-[#f15a2f]">
                            HAM
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-3xl font-bold mb-2">Hassan Ali Mehdi</h3>
                            <p className="text-[#f15a2f] font-bold text-sm uppercase tracking-widest mb-6">Founder & Lead Architect</p>
                            <p className="text-[#fffdf2]/70 italic leading-relaxed max-w-2xl">
                                &quot;We aren&apos;t here to build the most aesthetically pleasing model. We are here to build the most resilient one. One that understands noise, variation, and the true cost of a single failure.&quot;
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
