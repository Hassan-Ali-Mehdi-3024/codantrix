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
        <div className="group relative overflow-hidden rounded-3xl nm-flat-md border border-nm-text/5 transition-all duration-300 text-center sm:text-left hover:scale-[1.01]">
            <div className="p-6 sm:p-8 space-y-6 relative z-10 flex flex-col items-center sm:items-stretch h-full">
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-3 min-w-0 w-full">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white font-black px-4 py-1.5 rounded-full nm-btn-accent">
                        {industry}
                    </span>
                    <span className="text-xs text-nm-text-muted font-bold max-w-[10rem] truncate sm:max-w-none sm:truncate-none sm:whitespace-nowrap uppercase tracking-widest">{client}</span>
                </div>
                <h3 className="text-2xl font-bold leading-snug text-nm-text group-hover:text-brand-orange transition-colors">
                    {title}
                </h3>
                <p className="text-nm-text-muted italic mb-4 line-clamp-2 leading-relaxed">
                    &quot;{result}&quot;
                </p>
                <div className="mt-auto pt-4">
                    <Link
                        href={`/case-studies/${slug}`}
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-nm-text nm-flat-sm px-8 py-3 rounded-full hover:nm-flat-md hover:text-brand-orange transition-all duration-300 mx-auto sm:mx-0 active:nm-pressed-sm"
                    >
                        View Analysis <ArrowRight size={16} className="text-brand-orange" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
