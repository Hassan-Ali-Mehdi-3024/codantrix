import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import teamData from '@/data/team.json'

export const dynamic = 'force-dynamic'

interface TeamMember {
    id: string
    name: string
    role: string
    bio: string
    specialties: string[]
    initials: string
    order: number
}

export default function OurTeamPage() {
    const team = (teamData as TeamMember[]).sort((a, b) => a.order - b.order)

    return (
        <div className="pt-40 pb-24 bg-nm-bg">
            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-20 flex flex-col items-center text-center sm:items-start sm:text-left mx-auto sm:mx-0">
                    <h2 className="text-brand-orange font-bold uppercase tracking-[0.3em] mb-4 text-sm">Our People</h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 text-nm-text">
                        The <span className="text-brand-orange">Founding</span> Team.
                    </h1>
                    <p className="text-xl text-nm-text-muted leading-relaxed">
                        A multidisciplinary group of engineers, data scientists, and strategists obsessed with making AI work in the messy, unpolished reality of production.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {team.map((member) => (
                        <div
                            key={member.id}
                            className="nm-flat-md p-8 sm:p-10 md:p-12 border border-nm-text/5 rounded-3xl flex flex-col sm:flex-row gap-10 items-center sm:items-start text-center sm:text-left relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-brand-orange/10 transition-colors" />

                            <div className="w-32 h-32 shrink-0 nm-inset-sm rounded-3xl flex items-center justify-center text-3xl font-black text-brand-orange group-hover:nm-flat-sm transition-all">
                                {member.initials}
                            </div>

                            <div className="flex-1 relative z-10 flex flex-col items-center sm:items-start">
                                <h3 className="text-2xl font-bold text-nm-text mb-1 group-hover:text-brand-orange transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-brand-orange font-bold text-xs uppercase tracking-[0.2em] mb-6">
                                    {member.role}
                                </p>

                                <p className="text-nm-text-muted mb-8 leading-relaxed">
                                    {member.bio}
                                </p>

                                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-8">
                                    {member.specialties.map((spec) => (
                                        <span key={spec} className="text-[10px] px-2 py-1 nm-inset-xs bg-nm-bg rounded-md text-nm-text-muted/60 font-bold tracking-tight">
                                            {spec}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4 pt-6 border-t border-nm-text/5">
                                    <button className="text-nm-text-muted/40 hover:text-brand-orange transition-colors">
                                        <Linkedin size={18} />
                                    </button>
                                    <button className="text-nm-text-muted/40 hover:text-brand-orange transition-colors">
                                        <Github size={18} />
                                    </button>
                                    <button className="text-nm-text-muted/40 hover:text-brand-orange transition-colors">
                                        <Mail size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 p-8 sm:p-10 lg:p-14 nm-flat-md border border-nm-text/5 rounded-3xl relative overflow-hidden flex flex-col items-center sm:items-stretch text-center sm:text-left">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -mr-32 -mt-32" />
                    <h3 className="text-3xl font-bold mb-8 text-nm-text">Join the mission?</h3>
                    <div className="flex flex-col md:flex-row gap-8 items-center justify-between relative z-10 w-full">
                        <p className="text-nm-text-muted max-w-xl text-lg">
                            We are always looking for pragmatic engineers who care more about zero-latency than academic benchmarks.
                        </p>
                        <Link
                            href="/careers"
                            className="px-8 py-4 nm-btn-accent text-white font-bold uppercase tracking-widest hover:scale-105 active:scale-[0.98] transition-all w-full md:w-auto text-center rounded-xl"
                        >
                            View Open Roles <ArrowRight className="inline ml-2" size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

