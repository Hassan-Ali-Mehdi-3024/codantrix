import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { blogPosts } from '@/data/blog-posts'

export const metadata: Metadata = {
    title: 'Notes — Agentic AI engineering',
    description:
        'Notes on building production agentic AI systems: evals, tool design, deployment, cost, and the gnarly parts nobody writes about.',
    alternates: {
        canonical: '/notes',
    },
}

export default function NotesIndex() {
    const posts = blogPosts
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
        <>
            {/* Header */}
            <section className="pt-40 md:pt-48 pb-16">
                <div className="gutter">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-8 lg:col-start-2">
                            <p className="eyebrow mb-8">Notes</p>
                            <h1 className="mb-8 measure-wide">
                                Notes on building agentic AI in production.
                            </h1>
                            <p className="body-lg measure">
                                Evals, tool design, deployment, cost, and the gnarly parts nobody writes about. Short posts from engagements I&apos;m running.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Divider, then honest line or list */}
            <section className="pt-8 pb-40 border-t border-hairline">
                <div className="gutter">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-8 lg:col-start-2">
                            {posts.length === 0 ? (
                                <p className="body text-fg-70 pt-12 measure">
                                    First post ships when the first engagement under the new model wraps. Until then,{' '}
                                    <Link href="mailto:hassan@codantrix.com" className="text-accent hover:opacity-80 transition-opacity inline-flex items-center gap-1">
                                        subscribe by emailing me <ArrowRight size={14} />
                                    </Link>
                                    .
                                </p>
                            ) : (
                                <ul>
                                    {posts.map(p => (
                                        <li key={p.slug}>
                                            <Link
                                                href={`/notes/${p.slug}`}
                                                className="group block py-8 border-b border-hairline"
                                            >
                                                <div className="flex items-baseline gap-4 mb-4 font-mono text-[13px]">
                                                    <span className="text-fg-35">
                                                        {new Date(p.date).toISOString().slice(0, 10).replace(/-/g, '.')}
                                                    </span>
                                                    <span className="text-fg-35">·</span>
                                                    <span className="text-accent uppercase tracking-widest">{p.category}</span>
                                                </div>
                                                <h3 className="text-[24px] md:text-[28px] font-display font-medium tracking-tight mb-3 group-hover:opacity-80 transition-opacity">
                                                    {p.title}
                                                </h3>
                                                <p className="body-lg text-fg-70 measure">{p.excerpt}</p>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
