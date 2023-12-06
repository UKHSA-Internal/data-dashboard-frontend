import { getPages, PageType } from '@/api/requests/cms/getPages'

interface MenuLink {
  title: string
  slug: string
  children?: MenuLink[]
}

export const useMenu = async () => {
  const pages = await getPages()

  if (pages.success) {
    const links: MenuLink[] = []
    const topics: MenuLink[] = []

    for (const page of pages.data.items) {
      const {
        title,
        meta: { show_in_menus: show, slug, type },
      } = page
      if (show && type === PageType.Topic) {
        topics.push({ title, slug: `/topics/${slug}` })
      }

      if (show && [PageType.MetricsParent, PageType.WhatsNewParent, PageType.Common].includes(type as PageType)) {
        links.push({ title, slug: `/${slug}` })
      }
    }

    return [
      // The CMS pages endpoint cannot provide a homepage type with nested
      // topics so it must be formed manually.
      {
        title: 'Homepage',
        slug: '/',
        children: topics,
      },
      // The API url (and external urls in general) are not supported in the CMS
      // It is hardcoded to point to the environment variable for now.
      {
        title: 'API',
        slug: process.env.NEXT_PUBLIC_PUBLIC_API_URL,
      },
      ...links,
    ]
  }

  return []
}
