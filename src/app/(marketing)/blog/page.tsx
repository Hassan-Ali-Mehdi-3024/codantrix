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
        <div className="pt-40 pb-24 bg-nm-bg">
            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-24 text-left">
                    <h2 className="text-brand-orange font-bold uppercase tracking-[0.3em] mb-4 text-sm">Industrial Intelligence</h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-nm-text mb-8">
                        Process <span className="text-brand-orange">Intelligence.</span>
                    </h1>
                    <p className="text-xl text-nm-text-muted leading-relaxed max-w-2xl">
                        Deep dives into industrial AI, ground-truth validation, and the measurable ROI of algorithmic scale.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap justify-start gap-4 mb-16 pb-8 border-b border-nm-text/5">
                    {categories.map((cat) => (
                        <Link
                            key={cat}
                            href={cat === 'All' ? '/blog' : `/blog?category=${cat}`}
                            className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${(category === cat || (!category && cat === 'All'))
                                ? 'nm-btn-accent'
                                : 'nm-flat-sm text-nm-text-muted hover:text-brand-orange'
                                }`}
                        >
                            {cat}
                        </Link>
                    ))}
                </div>

                {posts && posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col h-full nm-flat-md rounded-3xl overflow-hidden transition-all text-left hover:scale-[1.02] border border-nm-text/5"
                            >
                                <div className="aspect-video bg-nm-bg overflow-hidden relative">
                                    <div className="absolute inset-0 bg-brand-orange/5 group-hover:bg-transparent transition-colors z-10" />
                                    {post.image && <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />}
                                    <div className="absolute top-4 left-4 nm-btn-accent text-[10px] font-black uppercase tracking-widest px-3 py-1 z-20">
                                        {post.category}
                                    </div>
                                </div>

                                <div className="p-8 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-start gap-4 text-[10px] font-bold text-nm-text-muted uppercase tracking-widest mb-4">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.date).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime} Min Read</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-nm-text group-hover:text-brand-orange transition-colors mb-4 leading-tight">
                                            {post.title}
                                        </h3>
                                        <p className="text-nm-text-muted text-sm leading-relaxed mb-8 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {post.tags?.slice(0, 3).map(tag => (
                                                <span key={tag} className="text-[9px] uppercase tracking-wider text-nm-text-muted/40 border border-nm-text/10 px-2 py-1 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-nm-text/10 gap-2 sm:gap-0">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-nm-text-muted/40">By {post.author}</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                            Read Brief <ArrowRight size={12} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center nm-inset-md rounded-3xl">
                        <Search size={48} className="mx-auto mb-4 text-nm-text-muted/20" />
                        <p className="text-nm-text-muted/40 uppercase tracking-widest font-bold">No articles found in this category</p>
                    </div>
                )}

                <NewsletterForm />
            </div>
        </div>
    )
}
