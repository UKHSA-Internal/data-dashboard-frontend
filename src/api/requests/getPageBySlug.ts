import { logger } from '@/lib/logger'
import { getPage, PageResponse } from './cms/getPage'
import { getPages, PageType } from './cms/getPages'

export const getPageBySlug = async <T extends PageType>(slug: string, type: T) => {
  if (!type) {
    throw new Error('No Page Type provided')
  }

  if (!slug) {
    throw new Error('No slug provided')
  }

  // Fetch all of pages by type from the CMS
  const pages = await getPages(type).catch((err) => {
    logger.error(err)
    throw new Error(`Could not get pages with type ${type}`)
  })

  // Find the CMS page within the list that matches the provided slug
  const matchedPage = pages.items.find(({ meta }) => meta.slug === slug)

  if (matchedPage) {
    // Once we have a match, use the id to fetch the single page
    const page = await getPage<T>(matchedPage.id).catch((err) => {
      throw new Error(err)
    })

    if (page.success) {
      return page.data as PageResponse<T>
    }

    throw new Error(`CMS page with slug ${slug} and id ${matchedPage.id} does not match expected response schema`)
  }

  throw new Error('No page found')
}
