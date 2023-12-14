import { getPages, PageType } from '@/api/requests/cms/getPages'

interface MenuLink {
  title: string
  slug: string
  children?: MenuLink[]
}

export const useMenu = async () => {
  // https://docs.wagtail.org/en/stable/advanced_topics/api/v2/usage.html#filtering-by-tree-position-pages-only
  const pages = await getPages(undefined, { show_in_menus: 'true' })

  if (pages.success) {
    const links: MenuLink[] = []
    const topics: MenuLink[] = []

    // The CMS pages endpoint cannot provide a homepage type with nested topics so it must be formed manually.
    links.push({
      title: 'Homepage',
      slug: '/',
      children: topics,
    })

    // The API url (and external urls in general) are not supported in the CMS
    // It is hardcoded to point to the environment variable for now.
    links.push({
      title: 'API',
      slug: process.env.NEXT_PUBLIC_PUBLIC_API_URL,
    })

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

  return []
}
