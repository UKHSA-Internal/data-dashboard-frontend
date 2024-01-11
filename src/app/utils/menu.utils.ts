import { getPages, PageType } from '@/api/requests/cms/getPages'
import { logger } from '@/lib/logger'

/**
 * Represents a menu link with title and slug.
 */
interface MenuLink {
  title: string
  slug: string
  children?: MenuLink[]
}

/**
 * Fetches and constructs the menu links.
 * @returns An array of MenuLink objects representing the menu.
 */
export const useMenu = async (): Promise<MenuLink[]> => {
  try {
    // Fetch pages with show_in_menus:true filter.
    const pages = await getPages(undefined, { show_in_menus: 'true' })

    const links: MenuLink[] = []

    // Create a homepage link manually since it's not provided by the CMS.
    const homeLink: MenuLink = {
      title: 'Homepage',
      slug: '/',
      children: [],
    }

    // Create an API link with the URL from environment variables.
    const apiLink: MenuLink = {
      title: 'API',
      slug: process.env.PUBLIC_API_URL || '',
    }

    if (pages.success) {
      const topics: MenuLink[] = []

      links.push({ ...homeLink, children: topics })
      links.push(apiLink)

      for (const page of pages.data.items) {
        const {
          title,
          meta: { slug, type },
        } = page

        if (type === PageType.Topic) {
          topics.push({ title, slug: `/topics/${slug}` })
        }

        if (type !== PageType.Home && type !== PageType.Topic) {
          links.push({ title, slug: `/${slug}` })
        }
      }

      return links
    }

    // Fallback in case of error.
    logger.error(pages.error)
    return [homeLink, apiLink]
  } catch (error) {
    logger.error(error)
    // Fallback for unexpected errors.
    return []
  }
}
