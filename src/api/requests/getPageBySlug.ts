import { notFound } from 'next/navigation'

import { SearchParams, Slug } from '@/app/types'
import { logger } from '@/lib/logger'

import { getPage, PageResponse } from './cms/getPage'
import { getPages, PageType } from './cms/getPages'

// TODO: Move this to @app/utils/cms/index.ts
export const getPageBySlug = async <T extends PageType>(slugParam: string | Slug, additionalParams?: SearchParams) => {
  try {
    // TODO: Once all pages are migrated to dynamic catch all route, remove non-array slug type
    const slug = Array.isArray(slugParam) ? slugParam[slugParam.length - 1] : slugParam

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

    throw new Error(`Failed to parse CMS pages from API - There is likely an issue with the API response`)
  } catch (e) {
    logger.info(e)
    notFound()
  }
}
