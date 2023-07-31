import { Metadata } from 'next'
import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'

import { useTranslation } from '../../i18n'

export const metadata: Metadata = {
  title: 'Feedback Confirmation | UKHSA data dashboard',
}

export default async function FeedbackConfirmation() {
  const { t } = await useTranslation('common')

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <div className="govuk-panel govuk-panel--confirmation govuk-!-margin-bottom-6">
          <h1 className="govuk-panel__title">{t('feedback.confirmation.title')}</h1>
          <div className="govuk-panel__body">{t('feedback.confirmation.subtitle')}</div>
        </div>
        <Trans i18nKey="feedback.confirmation.message" t={t}>
          <p></p>
          <p>
            <a className="govuk-link--no-visited-state" href="mailto:researchteam.dpd@ukhsa.gov.uk"></a>
          </p>
        </Trans>
        <Link href="/" className="govuk-link--no-visited-state govuk-!-margin-top-2 govuk-body inline-block">
          {t('returnToHomeBtn')}
        </Link>
      </div>
    </div>
  )
}
