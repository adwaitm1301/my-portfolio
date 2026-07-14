import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/skills', '/impact', '/case-studies'].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
    })
  )

  const workPages = projects.map((project) => ({
    url: `${siteUrl}/work/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...workPages]
}
