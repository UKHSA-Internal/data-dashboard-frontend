import { Metadata } from 'next'
import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'

import { View } from '@/app/components/ui/ukhsa'
import { useTranslation } from '@/app/i18n'

export const metadata: Metadata = {
  title: 'Feedback Confirmation | UKHSA data dashboard',
}

export default async function FeedbackConfirmation() {
  const { t } = await useTranslation('common')

  return (
    <View>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <div className="govuk-panel govuk-panel--confirmation govuk-!-margin-bottom-6" id="main-content">
            <h1 className="govuk-panel__title">Form submitted</h1>
            <div className="govuk-panel__body">Thank you for your feedback</div>
          </div>
          <Trans i18nKey="feedback.confirmation.message" t={t}>
            <p></p>
            <p>
              <a
                className="govuk-link--no-visited-state"
                href="https://www.gov.uk/government/organisations/uk-health-security-agency"
              >
                UKHSA webpage
              </a>
            </p>
          </Trans>
          <Link href="/" className="govuk-link--no-visited-state govuk-!-margin-top-2 govuk-body inline-block">
            Return to home page
          </Link>
        </div>
      </div>
    </View>
  )
}
