import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'

interface PageProps {
  heading: string
  description?: string
  children: ReactNode
  lastUpdated?: string
}

export function Wrapper({ heading, children, description, lastUpdated }: PageProps) {
  const t = useTranslations('Common')

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          {lastUpdated && (
            <p className="govuk-!-margin-bottom-4 govuk-body-s">
              {t('lastUpdated', {
                date: dayjs(new Date(lastUpdated)).format('dddd, D MMMM YYYY').toString(),
                time: dayjs(new Date(lastUpdated)).format('hh:mma').toString(),
              })}
            </p>
          )}
          <h1 className="govuk-heading-xl govuk-!-margin-bottom-4">{heading}</h1>
          {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
        </div>
      </div>

      {children}
    </>
  )
}
