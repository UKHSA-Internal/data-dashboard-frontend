import { Metadata } from 'next'

import { Menu } from '@/app/components/ui/ukhsa/Menu/Menu'

export const metadata: Metadata = {
  title: 'Browse | UKHSA data dashboard',
}

export default async function Browse() {
  return (
    <>
      <h1 className="govuk-heading-xl govuk-!-margin-bottom-4">Browse</h1>
      <nav aria-label="Menu" className="govuk-!-margin-bottom-6">
        <Menu />
      </nav>
    </>
  )
}
