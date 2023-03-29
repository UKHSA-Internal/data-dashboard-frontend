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

export const Coronavirus = () => {
  return (
    <Page heading={'Coronavirus'} lastUpdated={'2023-03-21T10:25:34.452098Z'}>
      {/* <Paragraph>Data and insights from the UKHSA on Coronavirus. See the simple summary for England</Paragraph> */}
      <Contents>
        <ContentsItem heading="Cases">
          <p>Coronavirus cases text</p>
          <GridRow>
            <GridCol setWidth="one-half">
              <Card label="7-day case rates" theme={'secondary'}>
                <CardColumn heading="7-day case rates by specimin date" theme="secondary">
                  <Paragraph supportingText>
                    Rate of cases per 100,000 people in the rolling 7-day period ending on the dates shown
                  </Paragraph>
                  <Topic
                    name="Coronavirus"
                    description="People tested positive in England up to and including 25th February 2023"
                    image="/temp-covid1.png"
                    points={[]}
                  />
                </CardColumn>
              </Card>
            </GridCol>
            <GridCol setWidth="one-half">
              <Card label="Cases by specimin date" theme={'secondary'}>
                <CardColumn heading="Cases by specimin date" theme="secondary">
                  <Paragraph supportingText>
                    Number of cases by specimin date. Data for the last 5 days, highlighted in grey, are incomplete.
                  </Paragraph>
                  <Topic
                    name="Coronavirus"
                    description="People tested positive in England up to and including 25th February 2023"
                    image="/temp-covid2.png"
                    points={[]}
                  />
                </CardColumn>
              </Card>
            </GridCol>
          </GridRow>
          <GridRow>
            <GridCol setWidth="one-half">
              <Card label="Cases by specimin date age" theme={'secondary'}>
                <CardColumn heading="Case rates by specimin date age demographics" theme="secondary">
                  <Paragraph supportingText>
                    Rate of cases per 100,000 people in the rolling 7-day period ending on the dates shown, by age.
                  </Paragraph>
                  <Topic
                    name="Coronavirus"
                    description="People tested positive in England up to and including 25th February 2023"
                    image="/temp-covid3.png"
                    points={[]}
                  />
                </CardColumn>
              </Card>
            </GridCol>
            <GridCol setWidth="one-half">
              <Card label="Case rates by age and sex" theme={'secondary'}>
                <CardColumn heading="Rates by age and sex" theme="secondary">
                  <Paragraph supportingText>
                    Rates per 100,000 people of the total number of cases since the start of the pandemic, by age and
                    sex.
                  </Paragraph>
                  <Topic
                    name="Coronavirus"
                    description="People tested positive in England up to and including 25th February 2023"
                    image="/temp-covid4.png"
                    points={[]}
                  />
                </CardColumn>
              </Card>
            </GridCol>
          </GridRow>
        </ContentsItem>

        <ContentsItem heading="Deaths">
          <p>Coronavirus deaths text</p>
          <GridRow>
            <GridCol setWidth="one-half">
              <Card label="Deaths with COVID-19 on the death certificate" theme={'secondary'}>
                <CardColumn heading="Deaths with COVID-19 on the death certificate">
                  <Statistic heading="Weekly" value="393" />
                </CardColumn>
              </Card>
            </GridCol>
            <GridCol setWidth="one-half">
              <Card label="Change from previous 7 days" theme={'secondary'}>
                <CardColumn heading="Change from previous 7 days">
                  <Statistic heading="Number" value="-31" />
                  <Statistic heading="Percentage" value="-7" />
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
              <Topic name="Deaths" description="" image="/temp-covid-deaths.png" points={[]} />
            </CardColumn>
          </GridRow>
        </ContentsItem>

        <ContentsItem heading="Healthcare">
          <p>Coronavirus healthcare text</p>
          <GridRow>
            <GridCol setWidth="one-half">
              <Card label="Patients admitted" theme={'secondary'}>
                <CardColumn heading="Patients admitted">
                  <Statistic heading="Latest 7 days" value="5,911" />
                </CardColumn>
              </Card>
            </GridCol>
            <GridCol setWidth="one-half">
              <Card label="Change from previous 7 days" theme={'secondary'}>
                <CardColumn heading="Change from previous 7 days">
                  <Statistic heading="Number" value="-397" />
                  <Statistic heading="Percentage" value="-6" />
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
              <Topic name="Deaths" description="" image="/temp-covid-healthcare.png" points={[]} />
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
              <Topic name="Deaths" description="" image="/temp-covid-vaccinations.png" points={[]} />
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
              <Topic name="Deaths" description="" image="/temp-covid-testing.png" points={[]} />
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
    </Page>
  )
}

export default Coronavirus
