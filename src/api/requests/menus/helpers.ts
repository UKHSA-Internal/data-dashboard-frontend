import { getPathSegments } from '@/app/utils/cms/slug'

import { getMenu } from './getMenu'

interface MenuLink {
  title: string
  slug: string
  children?: MenuLink[]
}

export function transformMenuResponse(response: Awaited<ReturnType<typeof getMenu>>): MenuLink[] {
  const result: MenuLink[] = []

  if (!response.success || !response.data?.active_menu) return []

  const {
    data: { active_menu: activeMenu },
  } = response

  activeMenu.forEach((row) => {
    row.value.columns.forEach((column) => {
      const primaryLink = column.value.links.primary_link
      const secondaryLinks = column.value.links.secondary_links

      const menuLink: MenuLink = {
        title: primaryLink.title,
        slug: `/${getPathSegments(primaryLink.html_url).join('/')}`,
        children: secondaryLinks.length
          ? secondaryLinks.map((link) => {
              return {
                title: link.value.title,
                slug: `/${getPathSegments(link.value.html_url).join('/')}`,
              }
            })
          : undefined,
      }

      result.push(menuLink)
    })
  })

  return result
}
