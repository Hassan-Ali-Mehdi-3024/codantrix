import { 
    LucideIcon, 
    Brain, 
    Camera, 
    Cpu, 
    Code, 
    Settings,
    Bot,
    ScanEye,
    LineChart,
    Search,
    Workflow,
    Globe,
    Smartphone,
    Activity,
    ShoppingBag,
    Users,
    AppWindow,
    Box,
    UserCog,
    DollarSign,
    LifeBuoy,
    ShieldCheck,
    FileJson,
    Zap,
    Server,
    Database
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const icons: Record<string, LucideIcon> = {
    brain: Brain,
    camera: Camera,
    cpu: Cpu,
    code: Code,
    settings: Settings,
    bot: Bot,
    'scan-eye': ScanEye,
    'line-chart': LineChart,
    search: Search,
    workflow: Workflow,
    globe: Globe,
    smartphone: Smartphone,
    activity: Activity,
    'shopping-bag': ShoppingBag,
    users: Users,
    'app-window': AppWindow,
    box: Box,
    'user-cog': UserCog,
    'dollar-sign': DollarSign,
    'life-buoy': LifeBuoy,
    'shield-check': ShieldCheck,
    'file-json': FileJson,
    zap: Zap,
    server: Server,
    database: Database
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
    const isWebDev = slug === 'web-development'

    return (
        <div className={cn(
            "group relative flex h-full flex-col overflow-hidden rounded-2xl glass-card p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1",
            isWebDev && "glass-strong",
            className
        )}>
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden>
                <div className="absolute -top-8 -right-10 h-[min(44vw,12rem)] w-[min(44vw,12rem)] rounded-full bg-gradient-to-br from-brand-orange/15 via-brand-orange/5 to-transparent blur-3xl" />
            </div>
            <div className="mb-6 inline-flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br from-brand-orange-dark to-brand-orange text-foreground shadow-[0_12px_45px_rgba(196,61,26,0.5)]">
                <Icon size={28} className="sm:hidden" />
                <Icon size={32} className="hidden sm:block" />
            </div>
            <h3 className="text-2xl font-bold mb-3 tracking-tight text-foreground">{name}</h3>
            <p className="text-gray-400 mb-8 leading-relaxed text-base flex-1">
                {description}
            </p>
            <Link
                href={`/services/${slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-foreground glass-btn px-4 py-2 hover:border-brand-orange/60 hover:text-brand-orange transition-all duration-300 mt-auto w-fit mx-auto sm:mx-0 after:absolute after:inset-0 after:z-10"
            >
                Learn More →
            </Link>
        </div>
    )
}
