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
            "group relative flex h-full flex-col overflow-hidden rounded-3xl nm-flat-md p-6 sm:p-8 transition-all duration-300 border border-nm-text/5 hover:scale-[1.01]",
            className
        )}>
            <div className="mb-6 inline-flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-2xl nm-inset-sm text-brand-orange">
                <Icon size={28} className="sm:hidden" />
                <Icon size={32} className="hidden sm:block" />
            </div>
            <h3 className="text-2xl font-bold mb-3 tracking-tight text-nm-text">{name}</h3>
            <p className="text-nm-text-muted mb-8 leading-relaxed text-base flex-1">
                {description}
            </p>
            <Link
                href={`/services/${slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-nm-text nm-flat-sm px-8 py-3 rounded-full hover:nm-flat-md hover:text-brand-orange transition-all duration-300 mt-auto w-fit mx-auto sm:mx-0 active:nm-pressed-sm after:absolute after:inset-0 after:z-10"
            >
                Learn More →
            </Link>
        </div>
    )
}
