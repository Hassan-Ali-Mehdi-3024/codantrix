import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { blogPosts } from '@/data/blog-posts'

export const metadata: Metadata = {
    title: 'Blog — Agentic AI engineering',
    description: 'Notes on building production agentic AI systems: evals, tool design, deployment, cost, and the gnarly parts nobody writes about.',
}

export default function BlogIndex() {
    const posts = blogPosts.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
        <>
            <section className="pt-32 md:pt-40 pb-16">
                <div className="container-page max-w-3xl">
                    <p className="text-sm text-accent font-medium mb-4">Blog</p>
                    <h1 className="text-4xl md:text-6xl font-semibold leading-[1.1] mb-6 text-fg">
                        Notes on building agentic AI in production.
                    </h1>
                    <p className="text-lg text-fg-muted leading-relaxed">
                        Evals, tool design, deployment, cost, and the gnarly parts nobody writes about. Short posts from the engagements I&apos;m running.
                    </p>
                </div>
            </section>

            <section className="py-12 border-t border-border">
                <div className="container-page max-w-3xl">
                    {posts.length === 0 ? (
                        <div className="card p-10 text-center">
                            <h2 className="text-xl font-semibold text-fg mb-3">First post coming soon.</h2>
                            <p className="text-fg-muted mb-6">
                                I don&apos;t publish filler. Posts will show up here as I have something worth writing down from real client work.
                            </p>
                            <Link href="/contact" className="text-accent hover:text-accent-hover inline-flex items-center gap-1.5 font-medium">
                                Subscribe by emailing me <ArrowRight size={14} />
                            </Link>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {posts.map(p => (
                                <li key={p.slug}>
                                    <Link
                                        href={`/blog/${p.slug}`}
                                        className="card p-6 block hover:border-border-strong transition-colors group"
                                    >
                                        <div className="flex items-baseline justify-between gap-4 mb-3">
                                            <p className="text-xs uppercase tracking-wider text-fg-subtle">{p.category}</p>
                                            <p className="text-xs text-fg-subtle font-mono">{new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                        </div>
                                        <h2 className="text-xl font-medium text-fg group-hover:text-accent transition-colors mb-2">{p.title}</h2>
                                        <p className="text-fg-muted leading-relaxed">{p.excerpt}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
        </>
    )
}
