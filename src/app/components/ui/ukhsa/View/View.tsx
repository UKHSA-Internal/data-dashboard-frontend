import { ReactNode } from 'react'

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

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-one-quarter ukhsa-sidebar">
        <SideNav
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'API', href: '/api' },
            { name: 'Maps', href: '/maps' },
            { name: 'About', href: '/about' },
            { name: "What's new", href: '/whats-new' },
          ]}
        />
      </div>
      <div className="govuk-grid-column-three-quarters">
        {lastUpdated && (
          <p className="govuk-!-margin-bottom-4 govuk-body-s">{t('lastUpdated', { value: new Date(lastUpdated) })}</p>
        )}

        {showWelcome && <p className="govuk-body-l govuk-!-margin-bottom-1 text-dark-grey">Welcome</p>}

        <h1 className="govuk-heading-xl govuk-!-margin-bottom-4">{heading}</h1>

        {description && <div dangerouslySetInnerHTML={{ __html: description }} />}

        {children}
      </div>
    </div>
  )
}
