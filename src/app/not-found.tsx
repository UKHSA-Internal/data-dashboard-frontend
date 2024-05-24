import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'

import { useTranslation } from './i18n'

export async function generateMetadata() {
  return {
    title: 'Page not found | UKHSA data dashboard',
    description: 'Error - Page not found',
  }
}

export default async function NotFoundPage() {
  const { t } = await useTranslation('errors')
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds-from-desktop">
        <h1 className="govuk-heading-xl mb-4">{t('pageNotFound.heading')}</h1>
        <Trans
          i18nKey="pageNotFound.body"
          t={t}
          components={[
            <p key={0} />,
            <p key={1}>
              <a key={0} href="https://www.gov.uk/government/organisations/uk-health-security-agency">
                UKHSA webpage
              </a>
            </p>,
          ]}
        />
        <Link href="/" className="govuk-link--no-visited-state govuk-!-margin-top-2 govuk-body inline-block">
          {t('backText')}
        </Link>
      </div>
    </div>
  )
}
