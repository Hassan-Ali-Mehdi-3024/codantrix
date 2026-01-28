import { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog-posts'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://codantrix.com'

    const staticRoutes = [
        '',
        '/about',
        '/services',
        '/case-studies',
        '/our-approach',
        '/solutions-hub',
        '/contact',
        '/blog',
        '/careers',
        '/compare',
        '/industries',
        '/privacy',
        '/terms',
        '/quiz',
        '/roi-calculator',
        '/resources',
        '/resources/library',
        '/testimonials',
        '/team',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    const blogRoutes = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [...staticRoutes, ...blogRoutes]
}
