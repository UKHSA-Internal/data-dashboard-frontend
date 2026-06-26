import Link from 'next/link'
import { ReactNode } from 'react'
import { Trans } from 'react-i18next/TransWithoutContext'

import { Announcement } from '@/app/components/ui/ukhsa'
import { GovukHeader } from '@/app/components/ui/ukhsa/GovukHeader/GovukHeader'
import { MegaMenu } from '@/app/components/ui/ukhsa/MegaMenu/MegaMenu'
import { TopNav } from '@/app/components/ui/ukhsa/TopNav/TopNav'
import UserAvatar from '@/app/components/ui/ukhsa/UserAvatar/UserAvatar'
import { getGlobalBanner } from '@/app/hooks/getGlobalBanner'
import { getServerTranslation } from '@/app/i18n'
import { authEnabled } from '@/config/constants'

export async function LayoutBlackBanner({ children }: { children: ReactNode }) {
  const { t } = await getServerTranslation('common')

  const globalBanners = await getGlobalBanner()

  return (
    <>
      <GovukHeader serviceTitle={t('serviceTitle')} />

      <TopNav avatar={authEnabled ? <UserAvatar /> : null}>
        <MegaMenu />
      </TopNav>

      <div className="govuk-width-container bg-blue" />

      <div className="govuk-width-container print:hidden">
        <div className="govuk-phase-banner" data-testid="ukhsa-phase-banner">
          <p className="govuk-phase-banner__content">
            <strong className="govuk-tag govuk-phase-banner__content__tag">{t('feedbackBannerPhase')}</strong>
            <Trans i18nKey="feedbackBanner" t={t}>
              <span className="govuk-phase-banner__text">
                <Link className="govuk-link govuk-link--no-visited-state" href="/feedback" />
              </span>
            </Trans>
          </p>
        </div>
      </div>

      {!globalBanners || globalBanners.length <= 0
        ? null
        : globalBanners.map(({ title: heading, banner_type: variant, body }, index) => (
            <div key={index} className="govuk-width-container">
              <div className="govuk-grid-row">
                <div className="govuk-grid-column-three-quarters">
                  <Announcement
                    heading={heading}
                    variant={variant}
                    className="govuk-!-margin-top-4 govuk-!-margin-bottom-1"
                  >
                    {body}
                  </Announcement>
                </div>
              </div>
            </div>
          ))}

      <div className="govuk-width-container">{children}</div>
    </>
  )
}

export default LayoutBlackBanner
