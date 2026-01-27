import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export default async function FeaturedBlog() {
    const supabase = await createClient()
    const { data: posts } = await supabase
        .from('blog_posts')
        .select(`*, team_members(name)`)
        .eq('featured', true)
        .limit(3)

    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-black relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/6 via-transparent to-transparent" />
                <div className="absolute bottom-0 right-10 h-[min(44vw,10rem)] w-[min(44vw,10rem)] rounded-full bg-gradient-to-br from-[#f15a2f]/18 via-[#ff7a50]/18 to-transparent blur-[min(16vw,120px)]" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left md:flex-row md:items-end justify-between mb-14 gap-6">
                    <div className="space-y-3 flex flex-col items-center sm:items-start">
                            <h2 className="inline-flex items-center gap-3 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">Knowledge Floor</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-[#fffdf2] leading-tight">Thought Leadership</h3>
                    </div>
                    <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#fffdf2] hover:border-[#f15a2f]/60 hover:text-[#f15a2f] transition-all duration-300">
                        Explore Full Library →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {posts?.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col h-full overflow-hidden rounded-2xl glass-card transition-transform duration-300 hover:-translate-y-1"
                        >
                            <div className="aspect-video bg-black overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-b from-[#f15a2f]/20 via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity z-10" />
                                {post.image_url && <Image src={post.image_url} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />}
                                <div className="absolute top-4 left-4 rounded-full bg-gradient-to-r from-[#c43d1a] to-[#f15a2f] text-[#fffdf2] text-[10px] font-black uppercase tracking-[0.22em] px-3 py-1 shadow-[0_10px_30px_rgba(196,61,26,0.4)] edge-shine z-20">
                                    {post.category}
                                </div>
                            </div>

                            <div className="p-6 sm:p-7 lg:p-8 flex-1 flex flex-col justify-between gap-6">
                                <div className="space-y-3">
                                    <div className="flex gap-4 text-[10px] font-bold text-[#fffdf2]/40 uppercase tracking-[0.18em]">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.published_at!).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {post.read_time_minutes} Min</span>
                                    </div>
                                    <h4 className="text-xl font-bold text-[#fffdf2] group-hover:text-[#f15a2f] transition-colors line-clamp-2">
                                        {post.title}
                                    </h4>
                                    <p className="text-sm text-[#fffdf2]/60 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                </div>
                                <span className="text-xs font-bold text-[#f15a2f] uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                                    Process Intelligence <ArrowRight size={14} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
