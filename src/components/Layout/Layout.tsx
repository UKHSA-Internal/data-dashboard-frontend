import { Page, PhaseBanner } from 'govuk-react'
import Link from 'next/link'
import { Trans, useTranslation } from 'next-i18next'
import { PropsWithChildren, ReactNode, useEffect } from 'react'

import { SideNav, SideNavLink, SideNavSubMenu, SideNavSubMenuLink } from '@/app/components/ui/ukhsa/SideNav/SideNav'

import { Footer } from '../Footer'
import { ScrollToTop } from '../ScrollToTop'
import { Main, TopNav, TopNavLink } from './Layout.styles'

const Container = ({ children }: { children: ReactNode }) => <div className="govuk-width-container">{children}</div>

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
                  <Link href="/feedback" className="govuk-link--no-visited-state"></Link>
                </span>
              </Trans>
            </PhaseBanner>
            {backLink && (
              <Link href={backLink} className="govuk-back-link govuk-!-margin-bottom-1">
                Back
              </Link>
            )}
          </>
        }
        header={<TopNav serviceTitle={<TopNavLink href="/">{t('serviceTitle')}</TopNavLink>} />}
        main={Main}
        container={Container}
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-7">
          <SideNav>
            <SideNavLink
              href="/"
              subMenu={
                <SideNavSubMenu>
                  <SideNavSubMenuLink href="/topics/coronavirus">COVID-19</SideNavSubMenuLink>
                  <SideNavSubMenuLink href="/topics/influenza">Influenza</SideNavSubMenuLink>
                  <SideNavSubMenuLink href="/topics/other-respiratory-viruses">
                    Other respiratory viruses
                  </SideNavSubMenuLink>
                </SideNavSubMenu>
              }
            >
              Dashboard
            </SideNavLink>
            <SideNavLink href={`${process.env.PUBLIC_API_URL}/api/public/timeseries`}>API</SideNavLink>
            <SideNavLink href="/about">About</SideNavLink>
            <SideNavLink href="/whats-new">What&apos;s new</SideNavLink>
          </SideNav>
          <div className="w-full">
            {children}
            {scrollToTop && <ScrollToTop />}
          </div>
        </div>
      </Page>
      <Footer />
    </>
  )
}
