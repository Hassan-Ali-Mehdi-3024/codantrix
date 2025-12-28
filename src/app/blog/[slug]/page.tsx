import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, User, Share2, BookOpen } from 'lucide-react'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const { slug } = await params
        const supabase = await createClient()
        const { data: post } = await supabase
            .from('blog_posts')
            .select('title, excerpt')
            .eq('slug', slug)
            .single()

        if (!post) return { title: 'Article Not Found' }

        return {
            title: `${post.title} | Codantrix Blog`,
            description: post.excerpt,
        }
    } catch (e) {
        return { title: 'Blog | Codantrix Labs' }
    }
}

export default async function BlogArticlePage({ params }: Props) {
    const { slug } = await params
    const supabase = await createClient()

    const { data: post } = await supabase
        .from('blog_posts')
        .select(`*, team_members(*)`)
        .eq('slug', slug)
        .single()

    if (!post) notFound()

    // Fetch related articles
    const { data: related } = await supabase
        .from('blog_posts')
        .select('title, slug, category')
        .neq('id', post.id)
        .eq('category', post.category)
        .limit(3)

    return (
        <div className="pt-32 pb-24 bg-[#1c1e20]">
            <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Main Content Area */}
                    <div className="lg:col-span-8">
                        <Link href="/blog" className="text-[#f15a2f] font-bold text-sm uppercase tracking-widest mb-12 inline-flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
                            <ArrowLeft size={16} /> Back to Library
                        </Link>

                        <div className="mb-12">
                            <span className="text-[#f15a2f] font-black uppercase tracking-[0.2em] text-[10px] px-3 py-1 bg-[#f15a2f]/10 mb-6 inline-block">
                                {post.category}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-[#fffdf2]">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap gap-6 text-[#fffdf2]/40 text-xs font-bold uppercase tracking-widest pb-8 border-b border-[#fffdf2]/5">
                                <span className="flex items-center gap-2"><User size={14} className="text-[#f15a2f]" /> {post.team_members?.name}</span>
                                <span className="flex items-center gap-2"><Calendar size={14} /> {new Date(post.published_at!).toLocaleDateString()}</span>
                                <span className="flex items-center gap-2"><Clock size={14} /> {post.read_time_minutes} Min Read</span>
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <div className="text-xl text-[#fffdf2]/70 leading-relaxed space-y-8 whitespace-pre-wrap font-medium">
                                {post.content}
                            </div>
                        </div>

                        {/* Author Bio Box */}
                        <div className="mt-24 p-12 bg-[#161819] border border-[#fffdf2]/5 flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-24 h-24 bg-[#1c1e20] flex items-center justify-center border border-[#f15a2f]/20">
                                <span className="text-4xl font-black text-[#f15a2f]">{post.team_members?.name?.charAt(0)}</span>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h4 className="text-xl font-bold mb-2">Written by {post.team_members?.name}</h4>
                                <p className="text-[#fffdf2]/50 text-sm leading-relaxed mb-4">
                                    {post.team_members?.bio}
                                </p>
                                <div className="flex gap-4 justify-center md:justify-start">
                                    <Link href="/team" className="text-[10px] font-black uppercase tracking-widest text-[#f15a2f] hover:text-[#fffdf2] transition-colors">
                                        View Profile →
                                    </Link>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#fffdf2]/20">
                                        {post.team_members?.expertise?.join(' • ')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-12">

                            {/* Lead Magnet CTA */}
                            <div className="p-8 bg-[#f15a2f] text-[#fffdf2] rounded-sm shadow-xl">
                                <h3 className="text-2xl font-black mb-4 italic leading-tight">Master Industrial AI.</h3>
                                <p className="text-sm opacity-90 mb-8 font-medium">Download our "Ground-Truth Checklist" used by enterprise teams to validate high-stakes ML models.</p>
                                <Link
                                    href="/resources/library"
                                    className="block w-full py-4 bg-[#1c1e20] text-center text-xs font-black uppercase tracking-widest hover:translate-y-[-2px] transition-all"
                                >
                                    Get the Checklist →
                                </Link>
                            </div>

                            {/* Related Posts */}
                            {related && related.length > 0 && (
                                <div className="p-8 bg-[#161819] border border-[#fffdf2]/5">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-[#f15a2f] mb-8 pb-4 border-b border-[#fffdf2]/5 flex items-center gap-2">
                                        <BookOpen size={14} /> Related Briefs
                                    </h4>
                                    <div className="space-y-8">
                                        {related.map(r => (
                                            <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#fffdf2]/30 group-hover:text-[#f15a2f] transition-colors mb-2">
                                                    {r.category}
                                                </p>
                                                <h5 className="font-bold text-[#fffdf2] group-hover:text-[#f15a2f] transition-colors leading-tight">
                                                    {r.title}
                                                </h5>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Share CTA */}
                            <div className="text-center">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fffdf2]/20 mb-4">Share Intelligence</p>
                                <div className="flex justify-center gap-4">
                                    <button className="w-10 h-10 rounded-full border border-[#fffdf2]/5 flex items-center justify-center text-[#fffdf2]/40 hover:text-[#f15a2f] hover:border-[#f15a2f] transition-all">
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
