import Link from 'next/link'

export default function PrivacyPage() {
    return (
        <div className="pt-40 pb-24 bg-nm-bg">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 flex flex-col items-center text-center sm:items-start sm:text-left mx-auto sm:mx-0">
                    <h1 className="text-5xl font-bold mb-6 text-nm-text">Privacy <span className="text-brand-orange">Policy.</span></h1>
                    <p className="text-lg text-nm-text-muted italic">Last Updated: April 24, 2026</p>
                </div>

                <div className="space-y-12">
                    <section className="nm-flat-md p-8 sm:p-10 rounded-3xl border border-nm-text/5 flex flex-col items-center text-center sm:items-start sm:text-left">
                        <h2 className="text-2xl font-bold text-brand-orange mb-6 uppercase tracking-wider">1. Data Collection</h2>
                        <p className="text-nm-text-muted leading-relaxed text-lg">
                            At Codantrix Labs, we collect minimal data through our lead capture forms (Name, Email, Company, Message). This data is stored securely in our private infrastructure and is only used to respond to your inquiries.
                        </p>
                    </section>

                    <section className="nm-flat-md p-8 sm:p-10 rounded-3xl border border-nm-text/5 flex flex-col items-center text-center sm:items-start sm:text-left">
                        <h2 className="text-2xl font-bold text-brand-orange mb-6 uppercase tracking-wider">2. B2B Confidentiality</h2>
                        <p className="text-nm-text-muted leading-relaxed text-lg">
                            We understand the sensitivity of industrial data. We do not share, sell, or trade your information with third parties. Any project data shared during consultations is subject to strict NDAs.
                        </p>
                    </section>

                    <section className="nm-flat-md p-8 sm:p-10 rounded-3xl border border-nm-text/5 flex flex-col items-center text-center sm:items-start sm:text-left">
                        <h2 className="text-2xl font-bold text-brand-orange mb-6 uppercase tracking-wider">3. External Services</h2>
                        <p className="text-nm-text-muted leading-relaxed text-lg">
                            We use industry-standard tools for transactional emails and database storage. Both services are leaders in security and compliance, ensuring your data is protected at rest and in transit.
                        </p>
                    </section>
                </div>

                <div className="mt-20 p-10 nm-inset-sm rounded-3xl flex flex-col items-center text-center sm:items-start sm:text-left border-l-4 border-brand-orange">
                    <Link href="/contact" className="text-nm-text font-bold hover:text-brand-orange transition-colors text-lg flex items-center justify-center sm:justify-start gap-3 w-full sm:w-auto">
                        Contact us for specific privacy inquiries <span className="text-brand-orange">→</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
