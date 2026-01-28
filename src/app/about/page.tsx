export default function AboutPage() {
    return (
        <div className="pt-40 pb-24 bg-nm-bg">
            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl text-left">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 text-nm-text">
                        The <span className="text-brand-orange">Code</span> of <br />Reliability.
                    </h1>
                    <p className="text-xl text-nm-text-muted leading-relaxed mb-12">
                        Codantrix Labs was founded with one mission: to strip away the academic abstraction of AI and deliver industrial-grade performance that companies can rely on for their core operations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20">
                    <div className="text-left">
                        <h2 className="text-2xl font-bold text-brand-orange mb-6 uppercase tracking-wider">Our Story</h2>
                        <p className="text-nm-text-muted mb-6 leading-relaxed">
                            Founded by Hassan Ali Mehdi, Codantrix Labs emerged from the realization that while AI models were getting &quot;smarter,&quot; they were becoming harder to scale in real-world environments. We focused on the &quot;ground-truth&quot;—the unpolished, messy data of actual production lines and farm fields.
                        </p>
                        <p className="text-nm-text-muted leading-relaxed">
                            Today, we serve as the pragmatic bridge between high-level AI research and the hard constraints of business ROI and physical-world reliability.
                        </p>
                    </div>
                    <div className="text-left">
                        <h2 className="text-2xl font-bold text-brand-orange mb-6 uppercase tracking-wider">Our Philosophy</h2>
                        <ul className="space-y-8">
                            <li className="flex flex-row items-start gap-6 text-left">
                                <div className="text-3xl font-black text-brand-orange/20 leading-none">01</div>
                                <div>
                                    <h4 className="text-lg font-bold text-nm-text">Ground-Truth First</h4>
                                    <p className="text-sm text-nm-text-muted mt-1">We don&apos;t trust synthetic data. We build models on the reality of your operations.</p>
                                </div>
                            </li>
                            <li className="flex flex-row items-start gap-6 text-left">
                                <div className="text-3xl font-black text-brand-orange/20 leading-none">02</div>
                                <div>
                                    <h4 className="text-lg font-bold text-nm-text">Pragmatic ROI</h4>
                                    <p className="text-sm text-nm-text-muted mt-1">If the AI doesn&apos;t save you more than it costs within 12 months, we don&apos;t build it.</p>
                                </div>
                            </li>
                            <li className="flex flex-row items-start gap-6 text-left">
                                <div className="text-3xl font-black text-brand-orange/20 leading-none">03</div>
                                <div>
                                    <h4 className="text-lg font-bold text-nm-text">Human-in-the-loop</h4>
                                    <p className="text-sm text-nm-text-muted mt-1">Our systems are designed to empower your operators, not replace the human edge.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Founder Section */}
                <div className="mt-32 p-8 sm:p-10 lg:p-14 nm-flat-md border border-nm-text/5 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-48 h-48 nm-inset-sm rounded-3xl flex items-center justify-center text-5xl font-black text-brand-orange">
                            HAM
                        </div>
                        <div className="text-left flex-1 relative z-10">
                            <h3 className="text-3xl font-bold mb-2 text-nm-text">Hassan Ali Mehdi</h3>
                            <p className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-6">Founder & Lead Architect</p>
                            <p className="text-nm-text-muted italic leading-relaxed max-w-2xl text-lg">
                                &quot;We aren&apos;t here to build the most aesthetically pleasing model. We are here to build the most resilient one. One that understands noise, variation, and the true cost of a single failure.&quot;
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
