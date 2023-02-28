import { Footer, H1, Main, Page, PhaseBanner, TopNav } from 'govuk-react'

export default function Home() {
  return (
    <>
      <Page
        beforeChildren={
          <PhaseBanner level="alpha">
            This is a new service – your feedback will help us to improve it.
          </PhaseBanner>
        }
        header={<TopNav serviceTitle={'UKHSA Dashboard'} />}
      >
        <Main>
          <H1>Respiratory viruses in England</H1>
        </Main>
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
