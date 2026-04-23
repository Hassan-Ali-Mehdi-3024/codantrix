import { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog-posts'
import servicesData from '@/data/services.json'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://labs.codantrix.com'

    const staticRoutes = [
        '',
        '/services',
        '/case-studies',
        '/contact',
        '/blog',
        '/privacy',
        '/terms',
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

    const serviceRoutes = (servicesData as { slug: string }[]).map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [...staticRoutes, ...blogRoutes, ...serviceRoutes]
}
