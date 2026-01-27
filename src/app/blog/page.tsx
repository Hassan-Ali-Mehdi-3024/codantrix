import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react'
import NewsletterForm from '@/components/blog/NewsletterForm'
import { blogPosts } from '@/data/blog-posts'

export const dynamic = 'force-dynamic'

export default async function BlogHubPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const { category } = await searchParams
    
    // Filter posts based on category
    let posts = blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    if (category && category !== 'All') {
        posts = posts.filter(post => post.category === category)
    }

    const categories = [
        'All',
        'Industry Deep-Dive',
        'Technical Guide',
        'Thought Leadership',
        'Success Stories'
    ]

    return (
        <div className="pt-32 pb-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-24 text-center mx-auto">
                    <h2 className="text-[#f15a2f] font-bold uppercase tracking-[0.3em] mb-4 text-sm">Industrial Intelligence</h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-[#fffdf2] mb-8">
                        Process <span className="text-[#f15a2f]">Intelligence.</span>
                    </h1>
                    <p className="text-xl text-[#fffdf2]/70 leading-relaxed max-w-2xl mx-auto">
                        Deep dives into industrial AI, ground-truth validation, and the measurable ROI of algorithmic scale.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap justify-center gap-4 mb-16 pb-8 border-b border-[#fffdf2]/5">
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
                                className="group flex flex-col h-full bg-[#161819] border border-[#fffdf2]/5 hover:border-[#f15a2f]/40 transition-all text-center sm:text-left"
                            >
                                <div className="aspect-video bg-black overflow-hidden relative">
                                    <div className="absolute inset-0 bg-[#f15a2f]/5 group-hover:bg-transparent transition-colors z-10" />
                                    {/* Placeholder for image if null, or use a generated gradient pattern */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#1c1e20] to-black opacity-50" />
                                    <div className="absolute top-4 left-4 bg-[#f15a2f] text-[#fffdf2] text-[10px] font-black uppercase tracking-widest px-3 py-1 z-20">
                                        {post.category}
                                    </div>
                                </div>

                                <div className="p-8 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-center sm:justify-start gap-4 text-[10px] font-bold text-[#fffdf2]/30 uppercase tracking-widest mb-4">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.date).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime} Min Read</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#fffdf2] group-hover:text-[#f15a2f] transition-colors mb-4 leading-tight">
                                            {post.title}
                                        </h3>
                                        <p className="text-[#fffdf2]/50 text-sm leading-relaxed mb-8 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {post.tags?.slice(0, 3).map(tag => (
                                                <span key={tag} className="text-[9px] uppercase tracking-wider text-[#fffdf2]/20 border border-[#fffdf2]/10 px-2 py-1">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-[#fffdf2]/5 gap-2 sm:gap-0">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#fffdf2]/20">By {post.author}</span>
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
