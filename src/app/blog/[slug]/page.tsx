import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, User, Share2, BookOpen } from 'lucide-react'
import { Metadata } from 'next'
import { blogPosts } from '@/data/blog-posts'

export const dynamic = 'force-dynamic'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = blogPosts.find(p => p.slug === slug)

    if (!post) return { title: 'Article Not Found' }

    return {
        title: `${post.title} | Codantrix Blog`,
        description: post.excerpt,
    }
}

export default async function BlogArticlePage({ params }: Props) {
    const { slug } = await params
    
    // Find post in static data
    const post = blogPosts.find(p => p.slug === slug)

    if (!post) notFound()

    // Find related posts (same category, excluding current)
    const related = blogPosts
        .filter(p => p.category === post.category && p.id !== post.id)
        .slice(0, 3)

    return (
        <div className="pt-40 pb-24 bg-nm-bg">
            <article className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Main Content Area */}
                    <div className="lg:col-span-8">
                        <Link href="/blog" className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-12 inline-flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
                            <ArrowLeft size={16} /> Back to Library
                        </Link>

                        <div className="mb-12 text-left">
                            <span className="text-brand-orange font-black uppercase tracking-[0.2em] text-[10px] px-3 py-1 nm-inset-sm mb-6 inline-block">
                                {post.category}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-nm-text">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap gap-6 text-nm-text-muted text-xs font-bold uppercase tracking-widest pb-8 border-b border-nm-text/5">
                                <span className="flex items-center gap-2"><User size={14} className="text-brand-orange" /> {post.author}</span>
                                <span className="flex items-center gap-2"><Calendar size={14} /> {new Date(post.date).toLocaleDateString()}</span>
                                <span className="flex items-center gap-2"><Clock size={14} /> {post.readTime} Min Read</span>
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <div className="text-xl text-nm-text-muted leading-relaxed space-y-8 whitespace-pre-wrap font-medium">
                                {post.content || post.excerpt + "\n\n(Full article content is being migrated to the new platform...)"}
                            </div>
                        </div>

                        {/* Author Bio Box */}
                        <div className="mt-24 p-6 sm:p-8 lg:p-12 nm-flat-md border border-nm-text/5 rounded-3xl flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-24 h-24 nm-inset-sm rounded-2xl flex items-center justify-center">
                                <span className="text-4xl font-black text-brand-orange">{post.author?.charAt(0)}</span>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h4 className="text-xl font-bold mb-2 text-nm-text">Written by {post.author}</h4>
                                <p className="text-nm-text-muted text-sm leading-relaxed mb-4">
                                    {post.role} at Codantrix Labs.
                                </p>
                                <div className="flex gap-4 justify-center md:justify-start">
                                    <Link href="/team" className="text-[10px] font-black uppercase tracking-widest text-brand-orange hover:text-nm-text transition-colors">
                                        View Profile →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-12">

                            {/* Lead Magnet CTA */}
                            <div className="p-8 nm-flat-lg border border-nm-text/5 text-nm-text rounded-3xl text-left relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl -mr-16 -mt-16" />
                                <h3 className="text-2xl font-black mb-4 italic leading-tight">Master Industrial AI.</h3>
                                <p className="text-sm text-nm-text-muted mb-8 font-medium">Download our &quot;Ground-Truth Checklist&quot; used by enterprise teams to validate high-stakes ML models.</p>
                                <Link
                                    href="/resources/library"
                                    className="block w-full py-4 nm-btn-accent text-white rounded-xl text-center text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Get the Checklist →
                                </Link>
                            </div>

                            {/* Related Posts */}
                            {related && related.length > 0 && (
                                <div className="p-8 nm-flat-md border border-nm-text/5 rounded-3xl">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-brand-orange mb-8 pb-4 border-b border-nm-text/10 flex items-center justify-start gap-2">
                                        <BookOpen size={14} /> Related Briefs
                                    </h4>
                                    <div className="space-y-8 text-left">
                                        {related.map(r => (
                                            <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-nm-text-muted/40 group-hover:text-brand-orange transition-colors mb-2">
                                                    {r.category}
                                                </p>
                                                <h5 className="font-bold text-nm-text group-hover:text-brand-orange transition-colors leading-tight">
                                                    {r.title}
                                                </h5>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Share CTA */}
                            <div className="text-center">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-nm-text-muted/20 mb-4">Share Intelligence</p>
                                <div className="flex justify-center gap-4">
                                    <button className="w-10 h-10 rounded-full nm-flat-sm flex items-center justify-center text-nm-text-muted/40 hover:text-brand-orange transition-all">
                                        <Share2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}
