import Link from 'next/link'
import { ArrowLeft, Clock, User } from 'lucide-react'
import { notFound } from 'next/navigation'

const articles: Record<string, { title: string, content: string }> = {
    'accuracy-vs-real-world': {
        title: "Why Accuracy Alone Isn't Enough: A Real-World Approach to AI",
        content: "In labs, 99.9% accuracy is a triumph. In a factory, it might mean one failure every 10 seconds. We explore why 'Failure Modes' and 'Noise Floors' are more important than academic percentages."
    },
    'industrial-automation-truth': {
        title: "Industrial Automation: Beyond the Hype",
        content: "True automation isn't about replacing people; it's about replacing the variability that causes waste. This article breaks down the ROI of deterministic AI systems."
    }
}

export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const article = articles[slug]

    if (!article && !['cv-manufacturing-challenges', 'measuring-ai-roi', 'build-vs-buy-ai'].includes(slug)) {
        notFound()
    }

    const fillerContent = "Content for this article is being finalized as part of our Phase 2 knowledge base expansion. Contact us for a direct engineering brief on this topic."

    return (
        <div className="pt-32 pb-24 bg-[#1c1e20]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/resources" className="text-[#f15a2f] font-bold text-sm uppercase tracking-widest mb-12 inline-flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Resources
                </Link>

                <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                    {article?.title || slug.replace(/-/g, ' ')}
                </h1>

                <div className="flex gap-6 mb-12 text-[#fffdf2]/40 text-sm font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-2"><User size={14} /> Hassan Ali Mehdi</span>
                    <span className="flex items-center gap-2"><Clock size={14} /> 5 Min Read</span>
                </div>

                <div className="prose prose-invert max-w-none text-xl text-[#fffdf2]/70 leading-relaxed space-y-8">
                    <p>{article?.content || fillerContent}</p>
                    <div className="p-12 bg-[#161819] border-l-4 border-[#f15a2f]">
                        <h3 className="text-2xl font-bold text-[#fffdf2] mb-4 italic">The Bottom Line</h3>
                        <p>At Codantrix Labs, we believe that AI is only as good as its measurable reliability in the face of messy, real-world data.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
