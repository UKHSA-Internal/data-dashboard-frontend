import dayjs from 'dayjs'
import { MetadataRoute } from 'next'

import { getPages } from '@/api/requests/cms/getPages'
import { getHealthAlerts } from '@/api/requests/health-alerts/getHealthAlerts'

import { getSiteUrl, toSlug } from './utils/app.utils'

const rootUrl = getSiteUrl()

type ChangeFrequency = MetadataRoute.Sitemap[number]['changeFrequency']

async function getAllCmsPages() {
  const sitemap: MetadataRoute.Sitemap = []

  const pages = await getPages({ fields: '*' })

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

  return sitemap
}

async function getWeatherHealthAlertRegionPages() {
  const sitemap: MetadataRoute.Sitemap = []

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

function getNonCmsPages() {
  const sitemap: MetadataRoute.Sitemap = []

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

  return sitemap
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = []

  // CMS Pages
  sitemap.push(...(await getAllCmsPages()))

  // Non-CMS Pages. TODO: Migrate these to be CMS delivered
  sitemap.push(...getNonCmsPages())
  sitemap.push(...(await getWeatherHealthAlertRegionPages()))

  return sitemap
}
