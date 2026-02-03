export default function ApproachPage() {
    return (
        <div className="pt-40 pb-24 bg-nm-bg">
            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-24 flex flex-col items-center text-center sm:items-start sm:text-left">
                    <h2 className="text-brand-orange font-bold uppercase tracking-[0.3em] mb-4 text-sm">Our Methodology</h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 text-nm-text">
                        Built for the <br /> <span className="text-brand-orange">Real World.</span>
                    </h1>
                    <p className="text-xl text-nm-text-muted leading-relaxed">
                        Most AI fails because it&apos;s trained for perfect conditions. Codantrix Labs builds for the 10% of cases that actually break your business.
                    </p>
                </div>

                <div className="space-y-32">
                    {/* Step 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                            <span className="text-8xl font-black text-brand-orange/5 block mb-4">01</span>
                            <h3 className="text-3xl font-bold mb-6 text-nm-text">Discovery & Ground-Truth Profiling</h3>
                            <p className="text-nm-text-muted leading-relaxed mb-8 text-lg">
                                Before writing a single line of code, we spend time on the floor. We profile the noise, the lighting variations, the sensor drift, and the human exceptions.
                            </p>
                            <div className="p-6 nm-inset-sm border-l-4 border-brand-orange rounded-r-2xl text-left w-full">
                                <p className="text-xs font-black text-brand-orange uppercase tracking-widest mb-2">Critical Step</p>
                                <p className="text-nm-text-muted font-medium">Identifying &apos;Failure Modes&apos; that academic benchmarks ignore.</p>
                            </div>
                        </div>
                        <div className="nm-flat-md p-8 md:p-12 border border-nm-text/5 rounded-3xl overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-brand-orange/10 transition-colors" />
                            <pre className="text-xs text-brand-orange/60 font-mono leading-relaxed bg-nm-bg nm-inset-xs p-6 rounded-xl">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="order-2 md:order-1 nm-flat-lg p-12 md:p-16 rounded-3xl border border-nm-text/5 flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="h-full w-full border-2 border-dashed border-brand-orange/20 rounded-2xl flex items-center justify-center text-brand-orange/30 font-bold uppercase tracking-[0.2em] text-center text-sm p-8">
                                Validation Environment <br /> (Real-World Twin)
                            </div>
                        </div>
                        <div className="order-1 md:order-2 flex flex-col items-center text-center sm:items-start sm:text-left">
                            <span className="text-8xl font-black text-brand-orange/5 block mb-4">02</span>
                            <h3 className="text-3xl font-bold mb-6 text-nm-text">Architectural Optimization</h3>
                            <p className="text-nm-text-muted leading-relaxed text-lg">
                                We design the model architecture specifically for your deployment environment. Whether it&apos;s edge-based latency or cloud-based massive parallel processing, we strike the balance between accuracy and operational cost.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                            <span className="text-8xl font-black text-brand-orange/5 block mb-4">03</span>
                            <h3 className="text-3xl font-bold mb-6 text-nm-text">Industrial Hardening</h3>
                            <p className="text-nm-text-muted leading-relaxed mb-8 text-lg">
                                Deployment is only the beginning. We wrap every model in monitoring layers that detect drift, bias, and performance degradation in real-time.
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                                {[
                                    'DRIFT DETECTION',
                                    'FALLBACK LOGIC',
                                    'ALERT PIPELINES',
                                    'AUTO-LOGGING'
                                ].map((item) => (
                                    <li key={item} className="text-[10px] font-black text-nm-text/40 nm-inset-xs p-4 flex items-center justify-center sm:justify-start gap-3 rounded-xl tracking-widest">
                                        <div className="w-2 h-2 bg-brand-orange rounded-full shadow-[0_0_10px_rgba(241,90,47,0.5)]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="nm-flat-md p-10 md:p-14 rounded-3xl border border-nm-text/5 flex flex-col items-center text-center sm:items-start sm:text-left relative overflow-hidden">
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-orange/10 rounded-full blur-3xl" />
                            <h4 className="text-3xl font-bold mb-6 text-brand-orange">Continuous ROI</h4>
                            <p className="text-nm-text-muted leading-relaxed text-lg">
                                Our approach ensures that as your business evolves, the AI adapts. We don&apos;t just deliver a static file; we deliver an evolving asset that maintains its value over time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
