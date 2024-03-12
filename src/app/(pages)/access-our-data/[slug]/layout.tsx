import { ReactNode } from 'react'

import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { BackToTop, View } from '@/app/components/ui/ukhsa'
import { useTranslation } from '@/app/i18n'
export const dynamic = 'auto'

export default async function Layout({
  children,
  parent,
  sidebar,
  pagination,
}: {
  children: ReactNode
  parent: ReactNode
  sidebar: ReactNode
  pagination: ReactNode
}) {
  const { t } = await useTranslation('common')

  const { title } = await getPageBySlug('access-our-data')

  return (
    <>
      <View heading={title}>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-three-quarters-from-desktop">{parent}</div>
        </div>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-three-quarters-from-desktop">
            <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
            {children}
            {pagination}
          </div>

          <div className="govuk-grid-column-one-quarter-from-desktop govuk-!-margin-top-6 sticky top-2">{sidebar}</div>
        </div>
      </View>
      <BackToTop label={t('backToTop')} />
    </>
  )
}
