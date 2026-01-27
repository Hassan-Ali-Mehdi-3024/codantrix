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
        <div className="group relative overflow-hidden rounded-2xl glass-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/50 hover:shadow-[0_0_30px_rgba(241,90,47,0.15)] text-center sm:text-left">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden>
                <div className="absolute -right-12 -top-16 h-[min(44vw,12rem)] w-[min(44vw,12rem)] rounded-full bg-gradient-to-br from-brand-orange/20 via-brand-orange-light/25 to-transparent blur-3xl" />
            </div>
            <div className="p-6 sm:p-8 space-y-6 relative z-10 flex flex-col items-center sm:items-stretch">
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-3 min-w-0 w-full">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-foreground font-bold px-3 py-1 rounded-full bg-gradient-to-r from-brand-orange-dark to-brand-orange shadow-[0_10px_35px_rgba(196,61,26,0.4)]">
                        {industry}
                    </span>
                    <span className="text-xs text-gray-500 font-medium max-w-[10rem] truncate sm:max-w-none sm:truncate-none sm:whitespace-nowrap">{client}</span>
                </div>
                <h3 className="text-2xl font-bold leading-snug text-foreground group-hover:text-brand-orange transition-colors">
                    {title}
                </h3>
                <p className="text-gray-400 italic mb-4 line-clamp-2">
                    &quot;{result}&quot;
                </p>
                <Link
                    href={`/case-studies/${slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-foreground glass-btn px-4 py-2 hover:border-brand-orange/60 hover:text-brand-orange transition-all duration-300 group-hover:translate-x-1 mx-auto sm:mx-0"
                >
                    View Analysis <ArrowRight size={16} className="text-brand-orange" />
                </Link>
            </div>
        </div>
    )
}
