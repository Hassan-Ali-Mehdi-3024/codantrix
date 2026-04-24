import { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog-posts'
import servicesData from '@/data/services.json'
import workData from '@/data/work.json'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://labs.codantrix.com'

    const staticRoutes = [
        '',
        '/services',
        '/work',
        '/hassan',
        '/book',
        '/notes',
        '/privacy',
        '/terms',
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    const serviceRoutes = (servicesData as { slug: string }[]).map(s => ({
        url: `${baseUrl}/services/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const workRoutes = (workData as { slug: string }[]).map(w => ({
        url: `${baseUrl}/work/${w.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const notesRoutes = blogPosts.map(p => ({
        url: `${baseUrl}/notes/${p.slug}`,
        lastModified: new Date(p.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [...staticRoutes, ...serviceRoutes, ...workRoutes, ...notesRoutes]
}
