import { getPath } from '@/app/utils/cms/slug'

import { getMenu } from './getMenu'

interface MenuLink {
  title: string
  slug: string
  children?: MenuLink[]
}

type MenuResponse = Awaited<ReturnType<typeof getMenu>>

const checkResponse = (response: MenuResponse) => {
  try {
    if (!response.success || !response.data.active_menu) {
      throw new Error()
    }
    return response.data.active_menu
  } catch (_error) {
    return []
  }
}

/**
 * Transforms the CMS menu snippet response into a structure usable within the Side Navigation UI
 */
export function transformMenuSnippetToSideMenu(response: MenuResponse): MenuLink[] {
  const result: MenuLink[] = []

  const activeMenu = checkResponse(response)

  for (const row of activeMenu) {
    for (const column of row.value.columns) {
      const primaryLink = column.value.links.primary_link
      const secondaryLinks = column.value.links.secondary_links

      const menuLink: MenuLink = {
        title: primaryLink.title,
        slug: getPath(primaryLink.html_url),
        children: secondaryLinks.map((link) => ({
          title: link.value.title,
          slug: getPath(link.value.html_url),
        })),
      }

      result.push(menuLink)
    }
  }

  return result
}

/**
 * Transformations for the CMS menu snippet response into a GOV.UK Mega Menu UI
 */
type UnparsedLink = {
  title: string
  body: string
  page: number
  html_url: string
}

type MegaMenuLink = {
  title: string
  slug: string
  description: string | null
}

type MegaMenuColumn = {
  heading: string
  links: MegaMenuLink[]
}

const parseLink = (link: UnparsedLink) => {
  const { title, html_url: url, body } = link
  return {
    title: title,
    slug: getPath(url),
    description: body,
  }
}

export function transformMenuSnippetToMegaMenu(response: MenuResponse) {
  const activeMenu = checkResponse(response)

  const rows = []

  for (const row of activeMenu) {
    const columns = []

    for (const column of row.value.columns) {
      const newColumn: MegaMenuColumn = { heading: column.value.heading, links: [] }

      const primaryLink = column.value.links.primary_link
      const secondaryLinks = column.value.links.secondary_links

      newColumn.links.push(parseLink(primaryLink))
      newColumn.links.push(...secondaryLinks.map((link) => parseLink(link.value)))

      columns.push(newColumn)
    }

    rows.push(columns)
  }

  return rows
}
