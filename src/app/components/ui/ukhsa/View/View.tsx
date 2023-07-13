import { ReactNode } from 'react'

import { useTranslation } from '../../../../i18n'

interface PageProps {
  heading: string
  description?: string
  children: ReactNode
  lastUpdated?: string
}

export async function View({ heading, children, description, lastUpdated }: PageProps) {
  const { t } = await useTranslation('common')

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          {lastUpdated && (
            <p className="govuk-!-margin-bottom-4 govuk-body-s">{t('lastUpdated', { value: new Date(lastUpdated) })}</p>
          )}
          <h1 className="govuk-heading-xl govuk-!-margin-bottom-4">{heading}</h1>
          {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
        </div>
      </div>

      {children}
    </>
  )
}
