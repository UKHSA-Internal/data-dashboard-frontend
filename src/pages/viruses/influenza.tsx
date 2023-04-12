import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from '@/components/Accordion'
import { Card, CardColumn } from '@/components/Card'
import { Contents, ContentsItem } from '@/components/Contents'
import { Chart } from '@/components/Chart'
import { GridCol, GridRow } from 'govuk-react'
import { Page } from '@/components/Page'
import RelatedLinks from '@/components/RelatedLinks/RelatedLinks'
import { relatedLinksMock } from '@/api/mocks/cms/data/elements'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'

export const Influenza = () => {
  return (
    <Page heading={'Influenza'} lastUpdated={'2023-03-21T10:25:34.452098Z'}>
      <Contents>
        <ContentsItem heading="Healthcare">
          <p>Influenza healthcare text</p>
          <GridRow>
            <GridCol setWidth="one-half">
              <Card label="Weekly hospital admission rate" theme={'secondary'}>
                <CardColumn
                  heading="Weekly hospital admission rate by UKHSA centre for new influenza reported through SARI Watch"
                  theme="secondary"
                >
                  <Chart src="" fallback="/img/temp-influenza1.png" />
                </CardColumn>
              </Card>
            </GridCol>
            <GridCol setWidth="one-half">
              <Card label="Weekly hospital admission rate" theme={'secondary'}>
                <CardColumn
                  heading="Weekly hospital admission rate by UKHSA centre for new influenza reported through SARI Watch"
                  theme="secondary"
                >
                  <Chart src="" fallback="/img/temp-influenza2.png" />
                </CardColumn>
              </Card>
            </GridCol>
          </GridRow>
          <GridRow>
            <GridCol setWidth="one-half">
              <Card label="Weekly hospital admission rate" theme={'secondary'}>
                <CardColumn
                  heading="Weekly overall ICU or HDU admission rates for new influenza positive cases per 100,000 population reporteed through SARI Watch"
                  theme="secondary"
                >
                  <Chart src="" fallback="/img/temp-influenza3.png" />
                </CardColumn>
              </Card>
            </GridCol>
            <GridCol setWidth="one-half">
              <Card label="Weekly hospital admission rate" theme={'secondary'}>
                <CardColumn
                  heading="Weekly overall influenza ICU or HDU admission rates per 100,000 trust catchment population with MEM threasholds, SARI Watch, England"
                  theme="secondary"
                >
                  <Chart src="" fallback="/img/temp-influenza4.png" />
                </CardColumn>
              </Card>
            </GridCol>
          </GridRow>
          <GridRow>
            <GridCol setWidth="one-half">
              <Card label="Weekly hospital admission rate" theme={'secondary'}>
                <CardColumn
                  heading="Weekly overall ICU or HDU admission rates for new influenza positive cases per 100,000 population reporteed through SARI Watch"
                  theme="secondary"
                >
                  <Chart src="" fallback="/img/temp-influenza5.png" />
                </CardColumn>
              </Card>
            </GridCol>
          </GridRow>
        </ContentsItem>

        <ContentsItem heading="Testing">
          <GridRow>
            <CardColumn
              heading="Respiratory DataMart weeklyu positive (%) for influenza by age, England"
              theme="secondary"
            >
              <Chart src="" fallback="/img/temp-influenza-testing.png" />
            </CardColumn>
          </GridRow>
        </ContentsItem>

        <ContentsItem heading="About">
          <Accordion>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>Symptoms</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>Runny nose</AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>Transmission</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>Airborne</AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>Treatment</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>Rest</AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>Prevention</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>Vaccines</AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>Surveillance and reporting</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>Hospitalizations only</AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </ContentsItem>
      </Contents>

      <RelatedLinks links={relatedLinksMock} />
    </Page>
  )
}

export default Influenza

export const getStaticProps: GetStaticProps = async (req) => {
  return {
    props: {
      ...(await serverSideTranslations(req.locale as string, ['common'])),
    },
  }
}
