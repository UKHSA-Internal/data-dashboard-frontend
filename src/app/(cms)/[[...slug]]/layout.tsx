import Link from 'next/link'
import { ReactNode } from 'react'
import { Trans } from 'react-i18next/TransWithoutContext'

import { Announcement, BackToTop } from '@/app/components/ui/ukhsa'
import { GovukHeader } from '@/app/components/ui/ukhsa/GovukHeader/GovukHeader'
import { MegaMenu } from '@/app/components/ui/ukhsa/MegaMenu/MegaMenu'
import { PhaseBanner } from '@/app/components/ui/ukhsa/PhaseBanner/PhaseBanner'
import { TopNav } from '@/app/components/ui/ukhsa/TopNav/TopNav'
import UserAvatar from '@/app/components/ui/ukhsa/UserAvatar/UserAvatar'
import { getGlobalBanner } from '@/app/hooks/getGlobalBanner'
import { getServerTranslation } from '@/app/i18n'
import { authEnabled } from '@/config/constants'

interface LayoutProps {
  children: ReactNode
}

export function generateMetadata() {
  return {
    robots: authEnabled ? 'noindex, nofollow' : undefined,
  }
}

export default async function Layout({ children }: LayoutProps) {
  const [{ t }, globalBanners] = await Promise.all([getServerTranslation('common'), getGlobalBanner()])

  return (
    <>
      <GovukHeader serviceTitle={t('serviceTitle')} />

      <TopNav avatar={authEnabled ? <UserAvatar /> : null}>
        <MegaMenu />
      </TopNav>

      <div className="govuk-width-container bg-blue" />

      <div className="govuk-width-container print:hidden">
        <PhaseBanner tag={t('feedbackBannerPhase')}>
          <Trans i18nKey="feedbackBanner" t={t}>
            <span className="govuk-phase-banner__text">
              <Link className="govuk-link govuk-link--no-visited-state" href="/feedback" />
            </span>
          </Trans>
        </PhaseBanner>
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

      <div className="govuk-width-container">
        <div className="govuk-!-padding-top-4 flex flex-col gap-0 xl:gap-7">
          <main className="govuk-main-wrapper govuk-!-padding-top-0" id="main-content">
            {children}
          </main>
        </div>
        <BackToTop className="govuk-!-margin-bottom-4" />
      </div>
    </>
  )
}
