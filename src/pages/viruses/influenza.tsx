import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from '@/components/Accordion'
import { Card, CardColumn } from '@/components/Card'
import { Contents, ContentsItem } from '@/components/Contents'
import { Statistic } from '@/components/Statistic'
import Topic from '@/components/Topic/Topic'
import { GridCol, GridRow, Paragraph } from 'govuk-react'
import { Page } from '@/components/Page'
import RelatedLinks from '@/components/RelatedLinks/RelatedLinks'
import { relatedLinksMock } from '@/api/mocks/cms/data/elements'

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
                  <Topic
                    name="Influenza"
                    description="People tested positive in England up to and including 25th February 2023"
                    image="/temp-influenza1.png"
                    points={[]}
                  />
                </CardColumn>
              </Card>
            </GridCol>
            <GridCol setWidth="one-half">
              <Card label="Weekly hospital admission rate" theme={'secondary'}>
                <CardColumn
                  heading="Weekly hospital admission rate by UKHSA centre for new influenza reported through SARI Watch"
                  theme="secondary"
                >
                  <Topic
                    name="Influenza"
                    description="People tested positive in England up to and including 25th February 2023"
                    image="/temp-influenza2.png"
                    points={[]}
                  />
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
                  <Topic
                    name="Influenza"
                    description="People tested positive in England up to and including 25th February 2023"
                    image="/temp-influenza3.png"
                    points={[]}
                  />
                </CardColumn>
              </Card>
            </GridCol>
            <GridCol setWidth="one-half">
              <Card label="Weekly hospital admission rate" theme={'secondary'}>
                <CardColumn
                  heading="Weekly overall influenza ICU or HDU admission rates per 100,000 trust catchment population with MEM threasholds, SARI Watch, England"
                  theme="secondary"
                >
                  <Topic
                    name="Influenza"
                    description="People tested positive in England up to and including 25th February 2023"
                    image="/temp-influenza4.png"
                    points={[]}
                  />
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
                  <Topic
                    name="Influenza"
                    description="People tested positive in England up to and including 25th February 2023"
                    image="/temp-influenza5.png"
                    points={[]}
                  />
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
              <Topic name="Deaths" description="" image="/temp-influenza-testing.png" points={[]} />
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
