import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'

import { getServerTranslation } from '@/app/i18n'

const NotFound = async () => {
  const { t } = await getServerTranslation('errors')  as any;

  return (
    <div className="govuk-width-container">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds-from-desktop">
          <h1 className="govuk-heading-xl govuk-!-margin-top-2 govuk-!-margin-bottom-4">{t('pageNotFound.heading')}</h1>
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
    </div>
  )
}

export default NotFound
