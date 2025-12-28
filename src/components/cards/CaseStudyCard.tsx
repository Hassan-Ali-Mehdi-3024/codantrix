import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CaseStudyCardProps {
    title: string
    slug: string
    industry: string
    client: string
    result: string
}

export default function CaseStudyCard({ title, slug, industry, client, result }: CaseStudyCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1c1e20] via-[#151719] to-[#0f1113] shadow-[0_20px_80px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden>
                <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-[#f15a2f]/20 via-[#ff7a50]/25 to-transparent blur-3xl" />
            </div>
            <div className="p-10 space-y-6 relative z-10">
                <div className="flex justify-between items-start gap-3">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#fffdf2] font-bold px-3 py-1 rounded-full bg-gradient-to-r from-[#f15a2f]/90 via-[#f15a2f] to-[#ff7a50] shadow-[0_10px_35px_rgba(241,90,47,0.35)]">
                        {industry}
                    </span>
                    <span className="text-xs text-[#fffdf2]/55 font-medium whitespace-nowrap">{client}</span>
                </div>
                <h3 className="text-2xl font-bold leading-snug text-[#fffdf2] group-hover:text-[#f15a2f] transition-colors">
                    {title}
                </h3>
                <p className="text-[#fffdf2]/70 italic mb-4 line-clamp-2">
                    "{result}"
                </p>
                <Link
                    href={`/case-studies/${slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-[#fffdf2] rounded-full px-4 py-2 bg-white/[0.04] border border-white/10 hover:border-[#f15a2f]/60 hover:text-[#f15a2f] transition-all duration-300 group-hover:translate-x-1"
                >
                    View Analysis <ArrowRight size={16} className="text-[#f15a2f]" />
                </Link>
            </div>
        </div>
    )
}
