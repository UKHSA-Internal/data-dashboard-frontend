import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'

import { RichText } from '@/app/components/cms'
import { useTranslation } from '@/app/i18n'

interface PageProps {
  heading?: string
  showWelcome?: ReactNode
  description?: string
  children: ReactNode
  lastUpdated?: string
  backLink?: string
  breadcrumbs?: Array<{ name: string; link: string }>
}

export async function View({
  heading,
  showWelcome,
  children,
  description,
  lastUpdated,
  backLink,
  breadcrumbs,
}: PageProps) {
  const { t } = await useTranslation('common')

  return (
    <div className="w-full">
      {backLink && (
        <Link href={backLink} className="govuk-back-link">
          {t('backLink')}
        </Link>
      )}

      {breadcrumbs && (
        <div className="govuk-breadcrumbs govuk-!-margin-top-2">
          <ol className="govuk-breadcrumbs__list" aria-label="breadcrumbs">
            {breadcrumbs.map(({ name, link }, key) => (
              <li key={key} className="govuk-breadcrumbs__list-item">
                <Link className="govuk-breadcrumbs__link" href={link}>
                  {name}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}

      {showWelcome && <p className="govuk-body-l govuk-!-margin-bottom-1 text-dark-grey">{t('welcome')}</p>}

      {heading && (
        <h1
          className={clsx('govuk-heading-xl', {
            'govuk-!-margin-bottom-4': !lastUpdated,
            'govuk-!-margin-bottom-2': lastUpdated,
          })}
        >
          {heading}
        </h1>
      )}

      {lastUpdated && (
        <p className="govuk-!-margin-bottom-6 govuk-body-s">{t('lastUpdated', { value: new Date(lastUpdated) })}</p>
      )}

      {description && <RichText>{description}</RichText>}

      {children}
    </div>
  )
}
