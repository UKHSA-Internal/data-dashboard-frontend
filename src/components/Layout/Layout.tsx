import clsx from 'clsx'
import { Page, PhaseBanner, TopNav } from 'govuk-react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { PropsWithChildren, useEffect } from 'react'

import { Footer } from '../Footer'
import { Navigation } from '../Navigation'
import { ScrollToTop } from '../ScrollToTop'
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
            <PhaseBanner level="beta">{t('feedbackBanner')}</PhaseBanner>
            {backLink && (
              <Link href={backLink} className="govuk-back-link govuk-!-margin-bottom-1">
                Back
              </Link>
            )}
            <Navigation
              className={clsx({
                'govuk-!-margin-top-7': !backLink,
              })}
            />
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
