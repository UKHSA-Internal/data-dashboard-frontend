import {
  getRelatedLinks,
  RelatedLinksResponse,
} from '@/api/requests/getRelatedLinks'
import {
  getVirusesSummary,
  VirusesResponse,
} from '@/api/requests/getVirusesSummary'
import { initMocks } from '@/api/msw'
import { GridCol, GridRow, Paragraph } from 'govuk-react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Topic from '@/components/Topic/Topic'
import RelatedLinks from '@/components/RelatedLinks/RelatedLinks'
import { Contents, ContentsItem } from '@/components/Contents'
import { Card, CardColumn } from '@/components/Card'
import { Statistic } from '@/components/Statistic'
import { Page } from '@/components/Page'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({ relatedLinks }: HomeProps) {
  return (
    <Page heading="Respiratory viruses">
      <Paragraph>
        Data and insights from the UKHSA on respiratory viruses.
      </Paragraph>
      <Contents label="Respiratory viruses in this dashboard">
        <ContentsItem heading="Coronavirus">
          <Paragraph>
            The UKHSA dashboard for data and insights on Coronavirus.
          </Paragraph>
          <Card label="Coronavirus summary">
            <CardColumn heading="Cases">
              <Statistic heading="Weekly" value="20,629,892" />
              <Statistic heading="Last 7 days">tbc</Statistic>
            </CardColumn>
            <CardColumn heading="Deaths">
              <Statistic heading="Weekly" value="393" />
              <Statistic heading="Last 7 days">tbc</Statistic>
            </CardColumn>
            <CardColumn heading="Healthcare">
              <Statistic heading="Patients admitted" value="981,596" />
              <Statistic heading="Last 7 days">tbc</Statistic>
            </CardColumn>
            <CardColumn heading="Vaccines">
              <Statistic heading="Spring booster" value="45,410,567" />
              <Statistic heading="Summer booster" value="42,939,917" />
            </CardColumn>
            <CardColumn heading="Testing">
              <Statistic heading="Virus tests positivity (%)" value="10.9%" />
              <Statistic heading="Last 7 days">tbc</Statistic>
            </CardColumn>
          </Card>
          <GridRow>
            <GridCol setWidth="one-half">
              <Card label="Coronavirus cases">
                <CardColumn heading="Cases">
                  <Statistic heading="People tested positive in England">
                    <Paragraph supportingText>
                      Up to and including 25th February 2023
                    </Paragraph>
                  </Statistic>
                  <GridRow>
                    <GridCol setWidth="columnOneThird">
                      <Statistic heading="Last 7 days" value="24,568" />
                    </GridCol>
                    <GridCol>trend tbc</GridCol>
                  </GridRow>
                  <Topic
                    name="Coronavirus"
                    description="People tested positive in England up to and including 25th February 2023"
                    points={[]}
                  />
                </CardColumn>
              </Card>
            </GridCol>
            <GridCol setWidth="one-half">
              <Card label="Coronavirus deaths">
                <CardColumn heading="Deaths">
                  <Statistic heading="Deaths with COVID-19 on the death certificate in England">
                    <Paragraph supportingText>
                      Up to and including 3rd February 2023
                    </Paragraph>
                  </Statistic>
                  <GridRow>
                    <GridCol setWidth="columnOneThird">
                      <Statistic heading="Last 7 days" value="393" />
                    </GridCol>
                    <GridCol>trend tbc</GridCol>
                  </GridRow>
                  <Topic
                    name="Coronavirus"
                    description="Deaths with COVID-19 on the death certificate in England up to and including 3rd February 2023"
                    points={[]}
                  />
                </CardColumn>
              </Card>
            </GridCol>
          </GridRow>
        </ContentsItem>
        <ContentsItem heading="Influenza">
          <Paragraph>
            The UKHSA dashboard for data and insights on Influenza.
          </Paragraph>
          <Card label="Influenza summary">
            <CardColumn heading="Healthcare">
              <Statistic heading="Patients admitted" value="981,596" />
              <Statistic heading="Last 7 days">tbc</Statistic>
            </CardColumn>
            <CardColumn heading="Vaccines">
              <Statistic heading="Spring booster" value="45,410,567" />
              <Statistic heading="Summer booster" value="42,939,917" />
            </CardColumn>
            <CardColumn heading="Testing">
              <Statistic heading="Virus tests positivity (%)" value="10.9%" />
              <Statistic heading="Last 7 days">tbc</Statistic>
            </CardColumn>
          </Card>
          <GridRow>
            <GridCol setWidth="one-half">
              <Card label="Influenza healthcare">
                <CardColumn heading="Healthcare">
                  <Statistic heading="Weekly hospital admission rates for Influenza">
                    <Paragraph supportingText>
                      Up to and including 25th February 2023
                    </Paragraph>
                  </Statistic>
                  <GridRow>
                    <GridCol setWidth="columnOneThird">
                      <Statistic heading="Last 7 days" value="24,568" />
                    </GridCol>
                    <GridCol>trend tbc</GridCol>
                  </GridRow>
                  <Topic
                    name="Influenza"
                    description="Weekly hospital admission rates for Influenza up to and including 25th February 2023"
                    points={[]}
                  />
                </CardColumn>
              </Card>
            </GridCol>
            <GridCol setWidth="one-half">
              <Card label="Influenza testing">
                <CardColumn heading="Testing">
                  <Statistic heading="Weekly positivity by age">
                    <Paragraph supportingText>
                      Up to and including 3rd February 2023
                    </Paragraph>
                  </Statistic>
                  <GridRow>
                    <GridCol setWidth="columnOneThird">
                      <Statistic heading="Last 7 days" value="393" />
                    </GridCol>
                    <GridCol>trend tbc</GridCol>
                  </GridRow>
                  <Topic
                    name="Influenza"
                    description="Weekly positivity by age up to and including 3rd February 2023"
                    points={[]}
                  />
                </CardColumn>
              </Card>
            </GridCol>
          </GridRow>
        </ContentsItem>
      </Contents>

      <RelatedLinks data={relatedLinks} />
    </Page>
  )
}

export const getStaticProps: GetStaticProps<{
  viruses: VirusesResponse
  relatedLinks: RelatedLinksResponse
}> = async () => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    await initMocks()
  }

  const [viruses, relatedLinks] = await Promise.all([
    await getVirusesSummary({ searchTerm: '' }),
    await getRelatedLinks(),
  ])

  return {
    props: {
      viruses,
      relatedLinks,
    },
  }
}
