import Link from 'next/link'

export default function PrivacyPage() {
    return (
        <div className="pt-32 pb-24 bg-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-invert">
                <h1 className="text-5xl font-bold mb-12 text-[#f15a2f]">Privacy Policy</h1>
                <p className="text-xl text-[#fffdf2]/70 mb-8">Last Updated: December 28, 2025</p>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#fffdf2] mb-4">1. Data Collection</h2>
                    <p className="text-[#fffdf2]/60 leading-relaxed">
                        At Codantrix Labs, we collect minimal data through our lead capture forms (Name, Email, Company, Message). This data is stored securely in our private Supabase database and is only used to respond to your inquiries.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#fffdf2] mb-4">2. B2B Confidentiality</h2>
                    <p className="text-[#fffdf2]/60 leading-relaxed">
                        We understand the sensitivity of industrial data. We do not share, sell, or trade your information with third parties. Any project data shared during consultations is subject to strict NDAs.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#fffdf2] mb-4">3. External Services</h2>
                    <p className="text-[#fffdf2]/60 leading-relaxed">
                        We use Resend for transactional emails and Supabase for database storage. Both services are industry leaders in security and compliance.
                    </p>
                </section>

                <div className="mt-12 pt-8 border-t border-[#fffdf2]/10">
                    <Link href="/contact" className="text-[#f15a2f] font-bold hover:text-[#fffdf2] transition-colors">
                        Contact us for specific privacy inquiries →
                    </Link>
                </div>
            </div>
        </div>
    )
}
