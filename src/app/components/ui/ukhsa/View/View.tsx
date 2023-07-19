import { ReactNode } from 'react'

import { getPages } from '@/api/requests/cms/getPages'
import { SideNav } from '@/components/SideNav/SideNav'

import { useTranslation } from '../../../../i18n'

interface PageProps {
  heading: string
  showWelcome?: ReactNode
  description?: string
  children: ReactNode
  lastUpdated?: string
}

export async function View({ heading, showWelcome, children, description, lastUpdated }: PageProps) {
  const { t } = await useTranslation('common')

  const pages = await getPages()
  const links: Array<{
    name: string
    href: string
    children: Array<{
      name: string
      href: string
    }>
  }> =
    (pages.success &&
      pages.data.items.map(({ title, meta: { slug } }) => {
        return {
          name: title,
          href: slug,
          children: [
            {
              name: 'Test',
              href: '/',
            },
          ],
        }
      })) ||
    []

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-one-quarter ukhsa-sidebar">
        <SideNav links={[{ name: 'Dashboard', href: '/', children: [{ name: 'Test', href: '/' }] }, ...links]} />
      </div>
      <div className="govuk-grid-column-three-quarters">
        {lastUpdated && (
          <p className="govuk-!-margin-bottom-4 govuk-body-s">{t('lastUpdated', { value: new Date(lastUpdated) })}</p>
        )}

        {showWelcome && <p className="govuk-body-l govuk-!-margin-bottom-1 text-dark-grey">{t('welcome')}</p>}

        <h1 className="govuk-heading-xl govuk-!-margin-bottom-4">{heading}</h1>

        {description && <div dangerouslySetInnerHTML={{ __html: description }} />}

        {children}
      </div>
    </div>
  )
}
