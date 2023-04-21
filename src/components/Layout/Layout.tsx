import { Footer, Page, PhaseBanner, TopNav } from 'govuk-react'
import { PropsWithChildren, useEffect } from 'react'
import { Navigation } from '../Navigation'
import RouterLink from 'next/link'
import { useTranslation } from 'next-i18next'
import { TopNavLink, Main } from './Layout.styles'

export const Layout = ({ children }: PropsWithChildren) => {
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
      </Page>
      <Footer
        copyright={{
          image: {
            height: 102,
            src: 'govuk-crest-2x.png',
            width: 125,
          },
          link: 'https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/',
          text: 'Crown copyright',
        }}
      />
    </>
  )
}
