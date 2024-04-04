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
}

export async function View({ heading, showWelcome, children, description, lastUpdated, backLink }: PageProps) {
  const { t } = await useTranslation('common')

  return (
    <div className="w-full">
      {backLink && (
        <Link href={backLink} className="govuk-back-link">
          {t('backLink')}
        </Link>
      )}

      {lastUpdated && (
        <p className="govuk-!-margin-bottom-4 govuk-body-s">{t('lastUpdated', { value: new Date(lastUpdated) })}</p>
      )}

      {showWelcome && <p className="govuk-body-l govuk-!-margin-bottom-1 text-dark-grey">{t('welcome')}</p>}

      {heading && <h1 className="govuk-heading-xl govuk-!-margin-bottom-4">{heading}</h1>}

      {description && <RichText>{description}</RichText>}

      {children}
    </div>
  )
}
