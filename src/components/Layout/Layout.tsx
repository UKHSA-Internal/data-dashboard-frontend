import { Page, PhaseBanner, TopNav } from 'govuk-react'
import { PropsWithChildren, useEffect } from 'react'
import { Navigation } from '../Navigation'
import RouterLink from 'next/link'
import { useTranslation } from 'next-i18next'
import { ScrollToTop } from '../ScrollToTop'
import { Footer } from '../Footer'

import { TopNavLink, Main } from './Layout.styles'

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
            <PhaseBanner level="beta">{t('feedbackBanner')}</PhaseBanner>
            <Navigation />
          </>
        }
        header={
          <TopNav
            serviceTitle={
              <RouterLink href="/" passHref legacyBehavior>
                <TopNavLink>{t('serviceTitle')}</TopNavLink>
              </RouterLink>
            }
          />
        }
        main={Main}
      >
        {children}
        {scrollToTop && <ScrollToTop />}
      </Page>
      <Footer />
    </>
  )
}
