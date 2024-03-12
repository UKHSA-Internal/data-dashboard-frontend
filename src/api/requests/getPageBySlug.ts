import { notFound } from 'next/navigation'

import { logger } from '@/lib/logger'

import { getPage, PageResponse } from './cms/getPage'
import { getPages, PageType } from './cms/getPages'

export const getPageBySlug = async <T extends PageType>(slug: string, additionalParams?: Record<string, string>) => {
  try {
    // Fetch all of pages by type from the CMS
    const pages = await getPages(additionalParams)

    // Find the CMS page within the list that matches the provided slug
    if (pages.success) {
      const { items } = pages.data

      const matchedPage = items.find(({ meta }) => meta.slug === slug)

      if (matchedPage) {
        // Once we have a match, use the id to fetch the single page
        const page = await getPage<T>(matchedPage.id)

        if (page.success) {
          return page.data as PageResponse<T>
        }

        logger.error(page.error)
        throw new Error(`CMS page with slug ${slug} and id ${matchedPage.id} does not match expected response schema`)
      }

      throw new Error(`No page found for slug ${slug}`)
    }

    throw new Error(`Could not get cms pages`)
  } catch (e) {
    logger.info(e)
    notFound()
  }
}
