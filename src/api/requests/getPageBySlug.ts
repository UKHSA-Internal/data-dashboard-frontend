import { getPage, PageResponse } from './cms/getPage'
import { getPages, PageType } from './cms/getPages'

export const getPageBySlug = async <T extends PageType>(slug: string, type: T): Promise<PageResponse<T>> => {
  if (!type) {
    throw new Error('No Page Type provided')
  }

  if (!slug) {
    throw new Error('No slug provided')
  }

  // Fetch all of pages by type from the CMS
  const pages = await getPages(type).catch(() => {
    throw new Error(`Could not get pages with type ${type}`)
  })

  // Find the CMS page within the list that matches the provided slug
  const matchedPage = pages.items.find(({ meta }) => meta.slug === slug)

  if (matchedPage) {
    // Once we have a match, use the id to fetch the single page
    return await getPage<T>(matchedPage.id).catch(() => {
      throw new Error(`Failed to get page with slug: ${slug}`)
    })
  }

  throw new Error('No page found')
}
