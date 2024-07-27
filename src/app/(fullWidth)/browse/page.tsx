import chunk from 'lodash/chunk'
import { Metadata } from 'next'

import { getMenu } from '@/api/requests/menus/getMenu'
import { transformMenuResponse } from '@/api/requests/menus/helpers'
import { BrowseCard } from '@/app/components/ui/ukhsa'

export const metadata: Metadata = {
  title: 'Browse | UKHSA data dashboard',
}

export default async function Browse() {
  const menu = transformMenuResponse(await getMenu())

  const groupedMenu = chunk(
    menu.flatMap((link) => {
      if (link.children) return [link, ...link.children]
      return link
    }),
    3
  )

  return (
    <>
      <h1 className="govuk-heading-xl govuk-!-margin-bottom-4">Browse</h1>
      <nav aria-label="Menu" className="govuk-!-margin-bottom-6">
        {groupedMenu.map((group, key) => (
          <div key={key} className="govuk-grid-row">
            {group.map((link) => (
              <div key={link.slug} className="govuk-grid-column-one-third-from-desktop">
                <BrowseCard
                  href={link.slug}
                  name={link.title}
                  description="" // TODO: No description available yet from API
                />
              </div>
            ))}
          </div>
        ))}
      </nav>
    </>
  )
}
