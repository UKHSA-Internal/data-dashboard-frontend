import { Metadata } from 'next'

import { getMenu } from '@/api/requests/menus/getMenu'
import { BrowseCard } from '@/app/components/ui/ukhsa'

export const metadata: Metadata = {
  title: 'Browse | UKHSA data dashboard',
}

export default async function Browse() {
  const menu = await getMenu()
  const links = menu.success ? menu.data.active_menu : []

  return (
    <>
      <h1 className="govuk-heading-xl govuk-!-margin-bottom-4">Browse</h1>
      <nav aria-label="Browse all pages" className="govuk-!-margin-bottom-6">
        <div className="govuk-grid-row">
          {links.map(({ id, value: { title, html_url } }) => (
            <div key={id} className="govuk-grid-column-one-third-from-desktop">
              <BrowseCard href={html_url} name={title} />
            </div>
          ))}
        </div>
      </nav>
    </>
  )
}
