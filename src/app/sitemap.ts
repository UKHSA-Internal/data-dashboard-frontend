import dayjs from 'dayjs'
import { MetadataRoute } from 'next'

import { getPages } from '@/api/requests/cms/getPages'
import { getHealthAlerts } from '@/api/requests/health-alerts/getHealthAlerts'
import { logger } from '@/lib/logger'

import { SITE_URL } from './constants/app.constants'
import { toSlug } from './utils/app.utils'

const rootUrl = `https://${SITE_URL}`

type ChangeFrequency = MetadataRoute.Sitemap[number]['changeFrequency']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getPages()

  if (pages.error) {
    logger.error('Failed to generate sitemap.xml')
    logger.error(pages.error)
  }

  const sitemap: MetadataRoute.Sitemap = []

  if (pages.success) {
    for (const page of pages.data.items) {
      const url = page.meta.html_url ?? ''

      const {
        meta: { seo_change_frequency: changeFrequency, seo_priority: priority },
      } = page

      sitemap.push({
        url,
        changeFrequency: changeFrequency.toLowerCase() as ChangeFrequency,
        priority,
        lastModified: new Date(),
      })
    }
  }

  // Non-CMS pages. TODO: Migrate these to be CMS delivered
  // Feedback
  sitemap.push({
    url: `${rootUrl}/feedback`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  })

  // Brwose
  sitemap.push({
    url: `${rootUrl}/browse`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.2,
  })

  // Weather Health Alert Regions
  const [weatherHealthAlertHeatPages, weatherHealthAlertColdPages] = await Promise.all([
    getHealthAlerts('heat'),
    getHealthAlerts('cold'),
  ])

  if (weatherHealthAlertHeatPages.success && weatherHealthAlertColdPages.success) {
    for (const page of weatherHealthAlertHeatPages.data) {
      sitemap.push({
        url: `${rootUrl}/weather-health-alerts/heat/${toSlug(page.geography_name)}`,
        lastModified: dayjs(page.refresh_date).toDate(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }

    for (const page of weatherHealthAlertHeatPages.data) {
      sitemap.push({
        url: `${rootUrl}/weather-health-alerts/cold/${toSlug(page.geography_name)}`,
        lastModified: dayjs(page.refresh_date).toDate(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }
  }

  return sitemap
}
