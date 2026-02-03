import { blogPosts } from '@/data/blog-posts'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export default function FeaturedBlog() {
    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-nm-bg relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <div className="absolute bottom-0 right-10 h-[min(44vw,10rem)] w-[min(44vw,10rem)] rounded-full bg-brand-orange blur-[min(16vw,120px)] opacity-5" />
            </div>
            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center text-center md:flex-row md:items-end justify-between mb-14 gap-6">
                    <div className="space-y-3 flex flex-col items-center sm:items-start sm:text-left">
                            <h2 className="inline-flex items-center gap-3 rounded-full nm-flat-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-nm-text-muted">Knowledge Floor</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-nm-text leading-tight">Thought Leadership</h3>
                    </div>
                    <Link href="/blog" className="inline-flex items-center justify-center gap-2 rounded-full nm-flat-sm px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-nm-text hover:nm-flat-md hover:text-brand-orange transition-all duration-300 active:nm-pressed-sm w-full sm:w-auto">
                        Explore Full Library →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogPosts.slice(0, 3).map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col h-full overflow-hidden rounded-2xl nm-flat-md transition-all duration-300 hover:scale-[1.02] border border-nm-text/5"
                        >
                            <div className="aspect-video bg-nm-bg overflow-hidden relative">
                                {post.image && <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />}
                                <div className="absolute top-4 left-4 rounded-full nm-btn-accent text-[10px] font-black uppercase tracking-[0.22em] px-3 py-1 z-20">
                                    {post.category}
                                </div>
                            </div>

                            <div className="p-6 sm:p-7 lg:p-8 flex-1 flex flex-col justify-between gap-6">
                                <div className="space-y-3">
                                    <div className="flex gap-4 text-[10px] font-bold text-nm-text-muted uppercase tracking-[0.18em]">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.date).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime} Min</span>
                                    </div>
                                    <h4 className="text-xl font-bold text-nm-text group-hover:text-brand-orange transition-colors line-clamp-2">
                                        {post.title}
                                    </h4>
                                    <p className="text-sm text-nm-text-muted line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                </div>
                                <span className="text-xs font-bold text-brand-orange uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
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
