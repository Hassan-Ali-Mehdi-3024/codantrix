import { LucideIcon, Brain, Camera, Cpu, Code, Settings } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const icons: Record<string, LucideIcon> = {
    brain: Brain,
    camera: Camera,
    cpu: Cpu,
    code: Code,
    settings: Settings,
}

interface ServiceCardProps {
    name: string
    slug: string
    description: string
    icon: string
    index: number
    className?: string
}

export default function ServiceCard({ name, slug, description, icon, index, className }: ServiceCardProps) {
    const Icon = icons[icon] || Brain

    return (
        <div className={cn("group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-lg p-8 sm:p-10 shadow-[0_18px_60px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1", className)}>
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden>
                <div className="absolute -top-8 -right-10 h-48 w-48 rounded-full bg-gradient-to-br from-[#f15a2f]/15 via-[#f15a2f]/5 to-transparent blur-3xl" />
            </div>
            <div className="mb-6 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-[#f15a2f]/90 via-[#f15a2f] to-[#ff7a50] text-[#fffdf2] shadow-[0_12px_45px_rgba(241,90,47,0.45)]">
                <Icon size={26} />
            </div>
            <h3 className="text-2xl font-bold mb-3 tracking-tight text-[#fffdf2]">{name}</h3>
            <p className="text-[#fffdf2]/70 mb-8 leading-relaxed text-base flex-1">
                {description}
            </p>
            <Link
                href={`/services/${slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-[#fffdf2] rounded-full px-4 py-2 bg-white/[0.04] border border-white/10 hover:border-[#f15a2f]/60 hover:text-[#f15a2f] transition-all duration-300"
            >
                Learn More →
            </Link>
        </div>
    )
}
