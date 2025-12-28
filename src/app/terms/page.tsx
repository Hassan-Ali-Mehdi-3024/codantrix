import Link from 'next/link'

export default function TermsPage() {
    return (
        <div className="pt-32 pb-24 bg-[#1c1e20]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-invert">
                <h1 className="text-5xl font-bold mb-12 text-[#f15a2f]">Terms of Service</h1>
                <p className="text-xl text-[#fffdf2]/70 mb-8">Last Updated: December 28, 2025</p>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#fffdf2] mb-4">1. Consulting Services</h2>
                    <p className="text-[#fffdf2]/60 leading-relaxed">
                        Codantrix Labs provides B2B AI/ML consulting and development services. All project timelines, deliverables, and costs are finalized via individual Master Service Agreements (MSAs).
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#fffdf2] mb-4">2. Intellectual Property</h2>
                    <p className="text-[#fffdf2]/60 leading-relaxed">
                        Unless otherwise agreed, intellectual property for custom models and software developed by Codantrix Labs is transferred to the client upon full payment.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#fffdf2] mb-4">3. Disclaimer</h2>
                    <p className="text-[#fffdf2]/60 leading-relaxed">
                        While our models achieve high academic accuracy, real-world deployment outcomes are subject to ground-truth data quality and edge-case noise inherent in industrial environments.
                    </p>
                </section>

                <div className="mt-12 pt-8 border-t border-[#fffdf2]/10">
                    <Link href="/contact" className="text-[#f15a2f] font-bold hover:text-[#fffdf2] transition-colors">
                        Questions about our terms? Get in touch →
                    </Link>
                </div>
            </div>
        </div>
    )
}
