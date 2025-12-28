import { createClient } from '@/utils/supabase/server'
import { Linkedin, Mail, Github, Award } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function TeamPage() {
    const supabase = await createClient()
    const { data: team } = await supabase
        .from('team_members')
        .select('*')
        .order('published_articles', { ascending: false })

    return (
        <div className="pt-32 pb-24 bg-[#1c1e20]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-24">
                    <h2 className="text-[#f15a2f] font-bold uppercase tracking-[0.3em] mb-4 text-sm">The Minds Behind</h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-[#fffdf2] mb-8">
                        Elite <span className="text-[#f15a2f]">DNA.</span>
                    </h1>
                    <p className="text-xl text-[#fffdf2]/70 leading-relaxed max-w-2xl">
                        Codantrix is led by engineers and strategic architects who prioritize ground-truth results over academic metrics.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {team?.map((member) => (
                        <div key={member.id} className="bg-[#161819] border border-[#fffdf2]/5 p-12 hover:border-[#f15a2f]/40 transition-all rounded-sm flex flex-col md:flex-row gap-12">
                            <div className="w-full md:w-1/3 aspect-square bg-[#1c1e20] border border-[#fffdf2]/10 flex items-center justify-center relative overflow-hidden group">
                                <span className="text-8xl font-black text-[#fffdf2]/5 select-none">{member.name.charAt(0)}</span>
                                {member.image_url && (
                                    <img src={member.image_url} alt={member.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-3xl font-bold text-[#fffdf2] mb-1">{member.name}</h3>
                                        <p className="text-[#f15a2f] font-bold uppercase tracking-widest text-sm">{member.role}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        {member.linkedin_url && (
                                            <a href={member.linkedin_url} target="_blank" className="text-[#fffdf2]/40 hover:text-[#f15a2f] transition-colors">
                                                <Linkedin size={20} />
                                            </a>
                                        )}
                                        {member.social_handles?.github && (
                                            <a href={`https://github.com/${member.social_handles.github}`} target="_blank" className="text-[#fffdf2]/40 hover:text-[#f15a2f] transition-colors">
                                                <Github size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <p className="text-[#fffdf2]/60 leading-relaxed mb-8">
                                    {member.bio}
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f15a2f] mb-3 flex items-center gap-2">
                                            <Award size={12} /> Core Expertise
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {member.expertise?.map((exp: string) => (
                                                <span key={exp} className="px-3 py-1 bg-[#1c1e20] border border-[#fffdf2]/5 text-[#fffdf2]/50 text-xs font-bold">
                                                    {exp}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-[#fffdf2]/5 flex justify-between items-center">
                                        <span className="text-[#fffdf2]/20 text-[10px] font-black uppercase tracking-widest">
                                            {member.published_articles || 0} Published Articles
                                        </span>
                                        <Link href="/contact" className="text-xs font-bold text-[#f15a2f] hover:translate-x-1 transition-transform">
                                            Engineering brief →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-32 p-16 bg-[#f15a2f] text-[#fffdf2] rounded-sm flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-bold mb-4">Want to join the elite?</h2>
                        <p className="text-lg opacity-80">We are always looking for engineers who can solve messy, real-world industrial problems with elegant AI solutions.</p>
                    </div>
                    <Link
                        href="/contact"
                        className="px-8 py-4 bg-[#1c1e20] text-[#fffdf2] font-bold uppercase tracking-widest hover:scale-105 transition-all text-sm"
                    >
                        View Open Roles
                    </Link>
                </div>
            </div>
        </div>
    )
}
