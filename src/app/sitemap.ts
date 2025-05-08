import dayjs from 'dayjs'
import { MetadataRoute } from 'next'

import { getPages, PageType } from '@/api/requests/cms/getPages'
import { getHealthAlerts } from '@/api/requests/health-alerts/getHealthAlerts'
import { cachingEnabled } from '@/config/constants'
import { logger } from '@/lib/logger'

import { getSiteUrl, toSlug } from './utils/app.utils'

export const dynamic = cachingEnabled ? 'auto' : 'force-dynamic'

export const changeFrequencyMap: Record<number, MetadataRoute.Sitemap[number]['changeFrequency']> = {
  1: 'always',
  2: 'hourly',
  3: 'daily',
  4: 'weekly',
  5: 'monthly',
  6: 'yearly',
  7: 'never',
}

/**
 * Retrieves all CMS pages and generates a sitemap array.
 *
 * Fetches pages by type, constructs sitemap entries with URL, change frequency, priority, and last modified date.
 * Logs errors encountered during the fetch.
 *
 * @returns {Promise<MetadataRoute.Sitemap>} The generated sitemap.
 */
async function getAllCmsPages() {
  const sitemap: MetadataRoute.Sitemap = []
  const pageTypes = Object.keys(PageType) as (keyof typeof PageType)[]
  const pagesByType = await Promise.all(pageTypes.map((key) => getPages({ fields: '*', type: PageType[key] })))

  for (const pageByType of pagesByType) {
    if (pageByType.success) {
      for (const page of pageByType.data.items) {
        const url = page.meta.html_url ?? ''

        const { seo_change_frequency: changeFrequency, seo_priority: priority } = page

        sitemap.push({
          url,
          changeFrequency: changeFrequencyMap[changeFrequency],
          priority,
          lastModified: new Date(),
        })
      }
    }
    logger.error(pageByType.error)
  }

  return sitemap
}

/**
 * Retrieves weather health alert region pages and generates a sitemap array.
 *
 * Fetches heat and cold weather health alert pages. If successful, constructs sitemap entries with URLs based on geography names,
 * refresh dates, monthly change frequency, and a priority of 0.8.
 *
 * @returns {Promise<MetadataRoute.Sitemap>} The generated sitemap.
 */
async function getWeatherHealthAlertRegionPages() {
  const rootUrl = getSiteUrl()

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

/**
 * Generates a sitemap array for non-CMS pages.
 *
 * Constructs sitemap entries for static URLs such as feedback and browse pages,
 * setting their last modified date to the current date, monthly change frequency, and appropriate priority.
 *
 * @returns {MetadataRoute.Sitemap} The generated sitemap.
 */

function getNonCmsPages() {
  const rootUrl = getSiteUrl()

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

/**
 * Generates the complete sitemap for the application.
 *
 * Retrieves and combines CMS pages, non-CMS pages, and weather health alert region pages into a single sitemap array.
 *
 * @returns {Promise<MetadataRoute.Sitemap>} The generated sitemap.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = []

  // CMS Pages
  sitemap.push(...(await getAllCmsPages()))

  // Non-CMS Pages. TODO: Migrate these to be CMS delivered
  sitemap.push(...getNonCmsPages())
  sitemap.push(...(await getWeatherHealthAlertRegionPages()))

  return sitemap
}
