import { Footer, Main, Page, PhaseBanner, TopNav } from 'govuk-react'
import { PropsWithChildren, useEffect } from 'react'
import { Navigation } from '../Navigation'

export const Layout = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    document.body.classList.add('js-enabled')
  }, [])

  return (
    <>
      <Page
        beforeChildren={
          <>
            <PhaseBanner level="alpha" data-testid="ukhsa-banner">
              This is a new service – your feedback will help us to improve it.
            </PhaseBanner>
            <Navigation />
          </>
        }
        header={
          <TopNav serviceTitle={'UKHSA Dashboard'} data-testid="ukhsa-header" />
        }
      >
        <Main>{children}</Main>
      </Page>
      <Footer
        data-testid="ukhsa-footer"
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
