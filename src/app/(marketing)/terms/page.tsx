import Link from 'next/link'

export default function TermsPage() {
    return (
        <div className="pt-40 pb-24 bg-nm-bg">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 flex flex-col items-center text-center sm:items-start sm:text-left mx-auto sm:mx-0">
                    <h1 className="text-5xl font-bold mb-6 text-nm-text">Terms of <span className="text-brand-orange">Service.</span></h1>
                    <p className="text-lg text-nm-text-muted italic">Last Updated: December 28, 2025</p>
                </div>

                <div className="space-y-12">
                    <section className="nm-flat-md p-8 sm:p-10 rounded-3xl border border-nm-text/5 flex flex-col items-center text-center sm:items-start sm:text-left">
                        <h2 className="text-2xl font-bold text-brand-orange mb-6 uppercase tracking-wider">1. Consulting Services</h2>
                        <p className="text-nm-text-muted leading-relaxed text-lg">
                            Codantrix Labs provides B2B AI/ML consulting and development services. All project timelines, deliverables, and costs are finalized via individual Master Service Agreements (MSAs) tailored to your specific operational needs.
                        </p>
                    </section>

                    <section className="nm-flat-md p-8 sm:p-10 rounded-3xl border border-nm-text/5 flex flex-col items-center text-center sm:items-start sm:text-left">
                        <h2 className="text-2xl font-bold text-brand-orange mb-6 uppercase tracking-wider">2. Intellectual Property</h2>
                        <p className="text-nm-text-muted leading-relaxed text-lg">
                            Unless otherwise agreed in writing, intellectual property for custom models, algorithms, and software developed specifically for your project by Codantrix Labs is transferred to the client upon receipt of full payment.
                        </p>
                    </section>

                    <section className="nm-flat-md p-8 sm:p-10 rounded-3xl border border-nm-text/5 flex flex-col items-center text-center sm:items-start sm:text-left">
                        <h2 className="text-2xl font-bold text-brand-orange mb-6 uppercase tracking-wider">3. Performance Disclaimer</h2>
                        <p className="text-nm-text-muted leading-relaxed text-lg">
                            While our models achieve high technical accuracy, real-world deployment outcomes are subject to ground-truth data quality and edge-case noise inherent in industrial environments. We guarantee architectural reliability, but success depends on continuous data integrity.
                        </p>
                    </section>
                </div>

                <div className="mt-20 p-10 nm-inset-sm rounded-3xl flex flex-col items-center text-center sm:items-start sm:text-left border-l-4 border-brand-orange">
                    <Link href="/contact" className="text-nm-text font-bold hover:text-brand-orange transition-colors text-lg flex items-center justify-center sm:justify-start gap-3 w-full sm:w-auto">
                        Questions about our terms? Get in touch <span className="text-brand-orange">→</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
