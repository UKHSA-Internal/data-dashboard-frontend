import { MetadataRoute } from 'next'

import { SITE_URL } from './constants/app.constants'

const rootUrl = `https://${SITE_URL}`

const getSitemapObject =
  (
    priority: MetadataRoute.Sitemap[number]['priority'],
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  ) =>
  (path: string): MetadataRoute.Sitemap[number] => ({
    url: `${rootUrl}/${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  })

const highestPriority: MetadataRoute.Sitemap = [''].map(getSitemapObject(1, 'weekly'))

const highPriority: MetadataRoute.Sitemap = [
  'topics/covid-19',
  'topics/influenza',
  'topics/other-respiratory-viruses',
].map(getSitemapObject(0.8, 'weekly'))

const mediumPriority: MetadataRoute.Sitemap = [
  'about',
  'whats-new',
  'whats-coming',
  'feedback',
  'metrics-documentation',
].map(getSitemapObject(0.7, 'weekly'))

const lowPriority: MetadataRoute.Sitemap = ['cookies', 'accessibility-statement', 'compliance', 'bulk-downloads'].map(
  getSitemapObject(0.5, 'monthly')
)

const lowestPriority: MetadataRoute.Sitemap = ['browse'].map(getSitemapObject(0.2, 'monthly'))

export default function sitemap(): MetadataRoute.Sitemap {
  return [...highestPriority, ...highPriority, ...mediumPriority, ...lowPriority, ...lowestPriority]
}
