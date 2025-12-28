import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Search, Mail } from 'lucide-react'
import NewsletterForm from '@/components/blog/NewsletterForm'

export const dynamic = 'force-dynamic'

export default async function BlogHubPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const { category } = await searchParams
    const supabase = await createClient()

    let query = supabase
        .from('blog_posts')
        .select(`*, team_members(name)`)
        .order('published_at', { ascending: false })

    if (category) {
        query = query.eq('category', category)
    }

    const { data: posts } = await query

    const categories = [
        'All',
        'Industry Deep-Dive',
        'Technical Guide',
        'Thought Leadership',
        'Success Stories'
    ]

    return (
        <div className="pt-32 pb-24 bg-[#1c1e20]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-24">
                    <h2 className="text-[#f15a2f] font-bold uppercase tracking-[0.3em] mb-4 text-sm">Industrial Intelligence</h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-[#fffdf2] mb-8">
                        Process <span className="text-[#f15a2f]">Intelligence.</span>
                    </h1>
                    <p className="text-xl text-[#fffdf2]/70 leading-relaxed max-w-2xl">
                        Deep dives into industrial AI, ground-truth validation, and the measurable ROI of algorithmic scale.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap gap-4 mb-16 pb-8 border-b border-[#fffdf2]/5">
                    {categories.map((cat) => (
                        <Link
                            key={cat}
                            href={cat === 'All' ? '/blog' : `/blog?category=${cat}`}
                            className={`px-6 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${(category === cat || (!category && cat === 'All'))
                                ? 'bg-[#f15a2f] border-[#f15a2f] text-[#fffdf2]'
                                : 'bg-[#161819] border-[#fffdf2]/10 text-[#fffdf2]/40 hover:border-[#f15a2f]/40'
                                }`}
                        >
                            {cat}
                        </Link>
                    ))}
                </div>

                {posts && posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col h-full bg-[#161819] border border-[#fffdf2]/5 hover:border-[#f15a2f]/40 transition-all"
                            >
                                <div className="aspect-video bg-[#1c1e20] overflow-hidden relative">
                                    <div className="absolute inset-0 bg-[#f15a2f]/5 group-hover:bg-transparent transition-colors" />
                                    {post.image_url && <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                                    <div className="absolute top-4 left-4 bg-[#f15a2f] text-[#fffdf2] text-[10px] font-black uppercase tracking-widest px-3 py-1">
                                        {post.category}
                                    </div>
                                </div>

                                <div className="p-8 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex gap-4 text-[10px] font-bold text-[#fffdf2]/30 uppercase tracking-widest mb-4">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.published_at!).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1"><Clock size={12} /> {post.read_time_minutes} Min Read</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#fffdf2] group-hover:text-[#f15a2f] transition-colors mb-4 leading-tight">
                                            {post.title}
                                        </h3>
                                        <p className="text-[#fffdf2]/50 text-sm leading-relaxed mb-8 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between pt-6 border-t border-[#fffdf2]/5">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#fffdf2]/20">By {post.team_members?.name}</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#f15a2f] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                            Read Brief <ArrowRight size={12} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center border-2 border-dashed border-[#fffdf2]/5">
                        <Search size={48} className="mx-auto mb-4 text-[#fffdf2]/10" />
                        <p className="text-[#fffdf2]/30 uppercase tracking-widest font-bold">No articles found in this category</p>
                    </div>
                )}

                <NewsletterForm />
            </div>
        </div>
    )
}
