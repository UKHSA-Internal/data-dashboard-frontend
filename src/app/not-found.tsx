import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'

import { getServerTranslation } from '@/app/i18n'

import { Announcement } from './components/ui/ukhsa'
import { getGlobalBanner } from './hooks/getGlobalBanner'

export async function generateMetadata() {
  return {
    title: 'Page not found | UKHSA data dashboard',
    description: 'Error - Page not found',
  }
}

export default async function NotFoundPage() {
  const { t } = await getServerTranslation('errors')

  const globalBanner = await getGlobalBanner()

  return (
    <>
      {/* Previous Version: */}
      {/* <LayoutBlackBanner>
            <NotFound />
          </LayoutBlackBanner> */}

      {/* <LayoutHeader /> */}

      {globalBanner ? (
        <div className="govuk-width-container">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-three-quarters">
              <Announcement
                heading={globalBanner.heading}
                variant={globalBanner.variant}
                className="govuk-!-margin-top-4 govuk-!-margin-bottom-1"
              >
                {globalBanner.body}
              </Announcement>
            </div>
          </div>
        </div>
      ) : null}

      <div className="govuk-width-container">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds-from-desktop">
            <h1 className="govuk-heading-xl govuk-!-margin-top-2 govuk-!-margin-bottom-4">
              {t('pageNotFound.heading')}
            </h1>
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
    </>
  )
}
