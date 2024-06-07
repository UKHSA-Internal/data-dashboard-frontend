import { flag } from '@unleash/nextjs'

import { getPages, PageType } from '@/api/requests/cms/getPages'
import { logger } from '@/lib/logger'

import { flags } from '../constants/flags.constants'

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
  // Create a homepage link manually since it's not provided by the CMS.
  const homeLink: MenuLink = {
    title: 'Homepage',
    slug: '/',
    children: [],
  }

  try {
    // Fetch pages with show_in_menus:true filter.
    const pages = await getPages({ show_in_menus: 'true' })

    const { enabled: weatherHealthAlertEnabled } = await flag(flags.weatherHealthAlert)

    const links: MenuLink[] = []

    if (!pages.success) throw pages.error

    const topics: MenuLink[] = []

    links.push({ ...homeLink, children: topics })

    if (weatherHealthAlertEnabled) {
      links.push({ title: 'Weather health alerts', slug: '/weather-health-alerts' })
    }

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
  } catch (error) {
    logger.error(error)
    // Fallback for unexpected errors.
    return [homeLink]
  }
}
