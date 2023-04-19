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
import { GridCol, GridRow, Paragraph } from 'govuk-react'
import { Page } from '@/components/Page'
import RelatedLinks from '@/components/RelatedLinks/RelatedLinks'
import { relatedLinksMock } from '@/api/mocks/cms/data/elements'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { HeadlineValue, Metric } from '@/components/Metrics'

export const Coronavirus = () => {
  return (
    <Page heading={'Coronavirus'} lastUpdated={'2023-03-21T10:25:34.452098Z'}>
      {/* <Paragraph>Data and insights from the UKHSA on Coronavirus. See the simple summary for England</Paragraph> */}
      <Contents>
        <ContentsItem heading="Cases">
          <p>Coronavirus cases text</p>
          <GridRow>
            <GridCol setWidth="one-half">
              <Card theme={'secondary'}>
                <CardColumn heading="7-day case rates by specimin date" theme="secondary">
                  <Paragraph supportingText>
                    Rate of cases per 100,000 people in the rolling 7-day period ending on the dates shown
                  </Paragraph>
                  <Chart src="" fallback="/img/temp-covid1.png" />
                </CardColumn>
              </Card>
            </GridCol>
            <GridCol setWidth="one-half">
              <Card theme={'secondary'}>
                <CardColumn heading="Cases by specimin date" theme="secondary">
                  <Paragraph supportingText>
                    Number of cases by specimin date. Data for the last 5 days, highlighted in grey, are incomplete.
                  </Paragraph>
                  <Chart src="" fallback="/img/temp-covid2.png" />
                </CardColumn>
              </Card>
            </GridCol>
          </GridRow>
          <GridRow>
            <GridCol setWidth="one-half">
              <Card theme={'secondary'}>
                <CardColumn heading="Case rates by specimin date age demographics" theme="secondary">
                  <Paragraph supportingText>
                    Rate of cases per 100,000 people in the rolling 7-day period ending on the dates shown, by age.
                  </Paragraph>
                  <Chart src="" fallback="/img/temp-covid3.png" />
                </CardColumn>
              </Card>
            </GridCol>
            <GridCol setWidth="one-half">
              <Card theme={'secondary'}>
                <CardColumn heading="Rates by age and sex" theme="secondary">
                  <Paragraph supportingText>
                    Rates per 100,000 people of the total number of cases since the start of the pandemic, by age and
                    sex.
                  </Paragraph>
                  <Chart src="" fallback="/img/temp-covid4.png" />
                </CardColumn>
              </Card>
            </GridCol>
          </GridRow>
        </ContentsItem>

        <ContentsItem heading="Deaths">
          <p>Coronavirus deaths text</p>
          <GridRow>
            <GridCol setWidth="one-half">
              <Card theme={'secondary'}>
                <CardColumn heading="Deaths with COVID-19 on the death certificate">
                  <Metric>
                    <HeadlineValue heading="Weekly" value="393" />
                  </Metric>
                </CardColumn>
              </Card>
            </GridCol>
            <GridCol setWidth="one-half">
              <Card theme={'secondary'}>
                <CardColumn heading="Change from previous 7 days">
                  <GridRow style={{ marginTop: '20px' }}>
                    <GridCol setWidth="one-half">
                      <Metric>
                        <HeadlineValue heading="Number" value="-31" />
                      </Metric>
                    </GridCol>
                    <GridCol setWidth="one-half">
                      <Metric>
                        <HeadlineValue heading="Percentage" value="-7" />
                      </Metric>
                    </GridCol>
                  </GridRow>
                </CardColumn>
              </Card>
            </GridCol>
          </GridRow>
          <GridRow>
            <CardColumn
              heading="Daily deaths with COVID-19 on the death certificate by date of death"
              theme="secondary"
            >
              <Paragraph supportingText>
                Daily numbers of deaths whose death vertificate mentioned COVID-19 as one of the causes, and 7-day
                rolling average. Because of the time it takes for deaths to be registered, there is a lag in reporting
                of at least 11 days, and daa are not shown for the 14 days before the most recent reported date as they
                are consideredx incomplete. Data are shown by date of death.
              </Paragraph>
              <Chart src="" fallback="/img/temp-covid-deaths.png" />
            </CardColumn>
          </GridRow>
        </ContentsItem>

        <ContentsItem heading="Healthcare">
          <p>Coronavirus healthcare text</p>
          <GridRow>
            <GridCol setWidth="one-half">
              <Card theme={'secondary'}>
                <CardColumn heading="Patients admitted">
                  <Metric>
                    <HeadlineValue heading="Latest 7 days" value="5,911" />
                  </Metric>
                </CardColumn>
              </Card>
            </GridCol>
            <GridCol setWidth="one-half">
              <Card theme={'secondary'}>
                <CardColumn heading="Change from previous 7 days">
                  <GridRow style={{ marginTop: '20px' }}>
                    <GridCol setWidth="one-half">
                      <Metric>
                        <HeadlineValue heading="Number" value="-397" />
                      </Metric>
                    </GridCol>
                    <GridCol setWidth="one-half">
                      <Metric>
                        <HeadlineValue heading="Percentage" value="-6" />
                      </Metric>
                    </GridCol>
                  </GridRow>
                </CardColumn>
              </Card>
            </GridCol>
          </GridRow>
          <GridRow>
            <CardColumn heading="Patients admitted to hospital" theme="secondary">
              <Paragraph supportingText>
                Patients admitted to hospital. Daily and total numbers of COVID-19 patients admitted to hospital. Daily
                numbers are presented for England, Northern Ireland and Scotland but may not be updated every day for
                all 3 nations, and numbers for Wales are updated weekly. Figures are not comparable as Wales incvlues
                suspected COVID-19 patients while the other nations include only confirmed cases.
              </Paragraph>
              <Chart src="" fallback="/img/temp-covid-healthcare.png" />
            </CardColumn>
          </GridRow>
        </ContentsItem>

        <ContentsItem heading="Vaccinations">
          <GridRow>
            <CardColumn heading="Vaccine uptake, by vaccination date age demographics" theme="secondary">
              <Paragraph supportingText>
                Total percentage of people who received a COVID-19 vaccination, by dose. For English areas, the
                denominator is the number of people aged 12 and over on the National Immunisation Management Service
                (NIMS) database. For Scottish areas, the denominator is the mid-2020 population estimate for those aged
                12 and over. This means comparisons between local areas in different nations should be made with
                caution. England local area uptake is also not comparable to England national uptake by report date as
                that uses a different denominator - see the About tab for more information.
              </Paragraph>
              <Chart src="" fallback="/img/temp-covid-vaccinations.png" />
            </CardColumn>
          </GridRow>
        </ContentsItem>

        <ContentsItem heading="Testing">
          <GridRow>
            <CardColumn heading="Weekly number of people receiving a PCR test and positivity" theme="secondary">
              <Paragraph supportingText>
                Total percentage of people who received a COVID-19 vaccination, by dose. For English areas, the
                denominator is the number of people aged 12 and over on the National Immunisation Management Service
                (NIMS) database. For Scottish areas, the denominator is the mid-2020 population estimate for those aged
                12 and over. This means comparisons between local areas in different nations should be made with
                caution. England local area uptake is also not comparable to England national uptake by report date as
                that uses a different denominator - see the About tab for more information.
              </Paragraph>
              <Chart src="" fallback="/img/temp-covid-testing.png" />
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

export default Coronavirus

export const getStaticProps: GetStaticProps = async (req) => {
  return {
    props: {
      ...(await serverSideTranslations(req.locale as string, ['common'])),
    },
  }
}
