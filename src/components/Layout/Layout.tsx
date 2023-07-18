import { Page, PhaseBanner, TopNav } from 'govuk-react'
import Link from 'next/link'
import { Trans, useTranslation } from 'next-i18next'
import { PropsWithChildren, useEffect } from 'react'

import { Footer } from '../Footer'
import { ScrollToTop } from '../ScrollToTop'
import { SideNav } from '../SideNav/SideNav'
import { Main, TopNavLink } from './Layout.styles'

export const Layout = ({
  children,
  scrollToTop,
  backLink,
}: PropsWithChildren & { scrollToTop?: boolean; backLink?: string }) => {
  const { t } = useTranslation('common')

  useEffect(() => {
    document.body.classList.add('js-enabled')
  }, [])

  return (
    <>
      <Page
        beforeChildren={
          <>
            <PhaseBanner level="alpha" data-testid="phase-banner-content">
              <Trans t={t} i18nKey="feedbackBanner">
                <span>
                  <Link href="/feedback"></Link>
                </span>
              </Trans>
            </PhaseBanner>
            {backLink && (
              <Link href={backLink} className="govuk-back-link govuk-!-margin-bottom-1">
                Back
              </Link>
            )}
            {/* <Navigation /> */}
          </>
        }
        header={<TopNav serviceTitle={<TopNavLink href="/">{t('serviceTitle')}</TopNavLink>} />}
        main={Main}
      >
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-quarter ukhsa-sidebar">
            <SideNav
              links={[
                { name: 'Dashboard', href: '/' },
                { name: 'API', href: '/api' },
                { name: 'Maps', href: '/maps' },
                { name: 'About', href: '/about' },
                { name: "What's new", href: '/whats-new' },
              ]}
            />
          </div>
          <div className="govuk-grid-column-three-quarters">
            {children}
            {scrollToTop && <ScrollToTop />}
          </div>
        </div>
      </Page>
      <Footer />
    </>
  )
}
