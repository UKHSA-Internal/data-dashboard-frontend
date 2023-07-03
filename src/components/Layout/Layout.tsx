import { Page, PhaseBanner, TopNav } from 'govuk-react'
import Link from 'next/link'
import { Trans, useTranslation } from 'next-i18next'
import { PropsWithChildren, useEffect } from 'react'

import { Footer } from '../Footer'
import { Navigation } from '../Navigation'
import { ScrollToTop } from '../ScrollToTop'
import { Main, TopNavLink } from './Layout.styles'

export const Layout = ({ children, scrollToTop }: PropsWithChildren & { scrollToTop?: boolean }) => {
  const { t } = useTranslation('common')

  useEffect(() => {
    document.body.classList.add('js-enabled')
  }, [])

  return (
    <>
      <Page
        beforeChildren={
          <>
            <PhaseBanner level="beta" data-testid="phase-banner-content">
              <Trans t={t} i18nKey="feedbackBanner">
                <span>
                  <Link href="/feedback"></Link>
                </span>
              </Trans>
            </PhaseBanner>
            <Navigation />
          </>
        }
        header={<TopNav serviceTitle={<TopNavLink href="/">{t('serviceTitle')}</TopNavLink>} />}
        main={Main}
      >
        {children}
        {scrollToTop && <ScrollToTop />}
      </Page>
      <Footer />
    </>
  )
}
