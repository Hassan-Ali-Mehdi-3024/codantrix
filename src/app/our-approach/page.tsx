export default function ApproachPage() {
    return (
        <div className="pt-32 pb-24 bg-[#1c1e20]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-24">
                    <h2 className="text-[#f15a2f] font-bold uppercase tracking-[0.3em] mb-4 text-sm">Our Methodology</h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8">
                        Built for the <br /> <span className="text-[#f15a2f]">Real World.</span>
                    </h1>
                    <p className="text-xl text-[#fffdf2]/70 leading-relaxed">
                        Most AI fails because it's trained for perfect conditions. Codantrix Labs builds for the 10% of cases that actually break your business.
                    </p>
                </div>

                <div className="space-y-32">
                    {/* Step 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-8xl font-black text-[#fffdf2]/5 block mb-4">01</span>
                            <h3 className="text-3xl font-bold mb-6">Discovery & Ground-Truth Profiling</h3>
                            <p className="text-[#fffdf2]/60 leading-relaxed mb-6">
                                Before writing a single line of code, we spend time on the floor. We profile the noise, the lighting variations, the sensor drift, and the human exceptions.
                            </p>
                            <div className="p-4 bg-[#f15a2f]/5 border-l-4 border-[#f15a2f]">
                                <p className="text-sm font-bold text-[#f15a2f]">CRITICAL STEP</p>
                                <p className="text-sm text-[#fffdf2]/70">Identifying 'Failure Modes' that academic benchmarks ignore.</p>
                            </div>
                        </div>
                        <div className="bg-[#161819] aspect-video border border-[#fffdf2]/10 rounded-sm flex items-center justify-center p-8">
                            <pre className="text-[10px] text-[#f15a2f]/40 leading-tight">
                                {`{
  "operational_constraints": {
    "latency_max": "200ms",
    "lighting_variation": "400-1200 lux",
    "sensor_noise_floor": "-82dB",
    "edge_device": "Jetson Orin Nano"
  }
}`}
                            </pre>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1 bg-[#161819] aspect-video border border-[#fffdf2]/10 rounded-sm p-12">
                            <div className="h-full border border-dashed border-[#f15a2f]/20 flex items-center justify-center text-[#f15a2f]/20 font-bold uppercase tracking-widest text-center">
                                Validation Environment <br /> (Real-World Twin)
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <span className="text-8xl font-black text-[#fffdf2]/5 block mb-4">02</span>
                            <h3 className="text-3xl font-bold mb-6">Architectural Optimization</h3>
                            <p className="text-[#fffdf2]/60 leading-relaxed">
                                We design the model architecture specifically for your deployment environment. Whether it's edge-based latency or cloud-based massive parallel processing, we strike the balance between accuracy and operational cost.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-8xl font-black text-[#fffdf2]/5 block mb-4">03</span>
                            <h3 className="text-3xl font-bold mb-6">Industrial Hardening</h3>
                            <p className="text-[#fffdf2]/60 leading-relaxed mb-8">
                                Deployment is only the beginning. We wrap every model in monitoring layers that detect drift, bias, and performance degradation in real-time.
                            </p>
                            <ul className="grid grid-cols-2 gap-4">
                                <li className="text-xs font-bold text-[#fffdf2]/40 border border-[#fffdf2]/10 p-3 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#f15a2f] rounded-full" /> DRIFT DETECTION
                                </li>
                                <li className="text-xs font-bold text-[#fffdf2]/40 border border-[#fffdf2]/10 p-3 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#f15a2f] rounded-full" /> FALLBACK LOGIC
                                </li>
                                <li className="text-xs font-bold text-[#fffdf2]/40 border border-[#fffdf2]/10 p-3 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#f15a2f] rounded-full" /> ALERT PIPELINES
                                </li>
                                <li className="text-xs font-bold text-[#fffdf2]/40 border border-[#fffdf2]/10 p-3 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#f15a2f] rounded-full" /> AUTO-LOGGING
                                </li>
                            </ul>
                        </div>
                        <div className="p-8 bg-[#f15a2f] text-[#fffdf2]">
                            <h4 className="text-2xl font-bold mb-4">Continuous ROI</h4>
                            <p className="text-sm opacity-90 leading-relaxed">
                                Our approach ensures that as your business evolves, the AI adapts. We don't just deliver a static file; we deliver an evolving asset.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
