import { GridCol, GridRow, Paragraph } from 'govuk-react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Topic from '@/components/Topic/Topic'
import RelatedLinks from '@/components/RelatedLinks/RelatedLinks'
import { Contents, ContentsItem } from '@/components/Contents'
import { Card, CardColumn } from '@/components/Card'
import { Statistic } from '@/components/Statistic'
import { Page } from '@/components/Page'
import { DashboardPage, getPage, PageResponse } from '@/api/requests/cms/getPage'
import { initMocks } from '@/api/msw'
import { DownloadLink } from '@/components/Links'
import Trend from '@/components/Trend/Trend'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({ title, body, relatedLinks, lastUpdated }: HomeProps) {
  return (
    <Page heading={title} lastUpdated={lastUpdated}>
      <Paragraph>{body}</Paragraph>
      <Contents label="Respiratory viruses in this dashboard">
        <ContentsItem heading="Coronavirus">
          <Paragraph>The UKHSA dashboard for data and insights on Coronavirus.</Paragraph>
          <Card label="Coronavirus summary" theme={'primary'}>
            <CardColumn heading="Cases">
              <Statistic heading="Weekly" value="20,629,892" />
              <Statistic heading="Last 7 days">
                <Trend positive value={'24,568 (-0.1%)'} />
              </Statistic>
            </CardColumn>
            <CardColumn heading="Deaths">
              <Statistic heading="Weekly" value="393" />
              <Statistic heading="Last 7 days">
                <Trend positive value={'185,707 (-1.9%)'} />
              </Statistic>
            </CardColumn>
            <CardColumn heading="Healthcare">
              <Statistic heading="Patients admitted" value="981,596" />
              <Statistic heading="Last 7 days">
                <Trend positive={false} value={'4,807 (0.2%)'} />
              </Statistic>
            </CardColumn>
            <CardColumn heading="Vaccines">
              <Statistic heading="Spring booster" value="45,410,567" />
              <Statistic heading="Summer booster" value="42,939,917" />
            </CardColumn>
            <CardColumn heading="Testing">
              <Statistic heading="Virus tests positivity (%)" value="10.9%" />
              <Statistic heading="Last 7 days">
                <Trend positive={false} value={'5,425 (0.4%)'} />
              </Statistic>
            </CardColumn>
          </Card>
          <GridRow>
            <GridCol setWidth="one-half">
              <Card label="Coronavirus cases" theme={'primary'}>
                <CardColumn heading="Cases" sideContent={<DownloadLink href="/api/download">Download</DownloadLink>}>
                  <Statistic heading="People tested positive in England">
                    <Paragraph supportingText>Up to and including 25th February 2023</Paragraph>
                  </Statistic>
                  <GridRow>
                    <GridCol setWidth="columnOneThird">
                      <Statistic heading="Last 7 days" value="24,568" />
                    </GridCol>
                    <GridCol>
                      <Trend positive value={'-1,600 (-6.1%)'} />
                    </GridCol>
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
              <Card label="Coronavirus deaths" theme={'primary'}>
                <CardColumn heading="Deaths" sideContent={<DownloadLink href="/api/download">Download</DownloadLink>}>
                  <Statistic heading="Deaths with COVID-19 on the death certificate in England">
                    <Paragraph supportingText>Up to and including 3rd February 2023</Paragraph>
                  </Statistic>
                  <GridRow>
                    <GridCol setWidth="columnOneThird">
                      <Statistic heading="Last 7 days" value="393" />
                    </GridCol>
                    <GridCol>
                      <Trend positive value={'-31 (-7.3%)'} />
                    </GridCol>
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
          <Paragraph>The UKHSA dashboard for data and insights on Influenza.</Paragraph>
          <Card label="Influenza summary" theme={'primary'}>
            <CardColumn heading="Healthcare">
              <Statistic heading="Patients admitted" value="981,596" />
              <Statistic heading="Last 7 days">
                <Trend positive value={'5,788 (0.3%)'} />
              </Statistic>
            </CardColumn>
            <CardColumn heading="Vaccines">
              <Statistic heading="Spring booster" value="45,410,567" />
              <Statistic heading="Summer booster" value="42,939,917" />
            </CardColumn>
            <CardColumn heading="Testing">
              <Statistic heading="Virus tests positivity (%)" value="10.9%" />
              <Statistic heading="Last 7 days">
                <Trend positive={false} value={'16,109 (2.3%)'} />
              </Statistic>
            </CardColumn>
          </Card>
          <GridRow>
            <GridCol setWidth="one-half">
              <Card label="Influenza healthcare" theme={'primary'}>
                <CardColumn
                  heading="Healthcare"
                  sideContent={<DownloadLink href="/api/download">Download</DownloadLink>}
                >
                  <Statistic heading="Weekly hospital admission rates for Influenza">
                    <Paragraph supportingText>Up to and including 25th February 2023</Paragraph>
                  </Statistic>
                  <GridRow>
                    <GridCol setWidth="columnOneThird">
                      <Statistic heading="Last 7 days" value="24,568" />
                    </GridCol>
                    <GridCol>
                      <Trend positive value={'-1,600 (-6.1%)'} />
                    </GridCol>
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
              <Card label="Influenza testing" theme={'primary'}>
                <CardColumn heading="Testing" sideContent={<DownloadLink href="/api/download">Download</DownloadLink>}>
                  <Statistic heading="Weekly positivity by age">
                    <Paragraph supportingText>Up to and including 3rd February 2023</Paragraph>
                  </Statistic>
                  <GridRow>
                    <GridCol setWidth="columnOneThird">
                      <Statistic heading="Last 7 days" value="393" />
                    </GridCol>
                    <GridCol>
                      <Trend positive value={'-31 (-7.3%)'} />
                    </GridCol>
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

      <RelatedLinks links={relatedLinks} />
    </Page>
  )
}

export const getStaticProps: GetStaticProps<{
  title: PageResponse<DashboardPage>['title']
  body: PageResponse<DashboardPage>['body']
  lastUpdated: PageResponse<DashboardPage>['latest_revision_created_at']
  relatedLinks: PageResponse<DashboardPage>['related_links']
}> = async () => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    await initMocks()
  }

  const {
    title,
    body,
    related_links: relatedLinks,
    latest_revision_created_at: lastUpdated,
  } = await getPage<DashboardPage>(1)

  return {
    props: {
      title,
      body,
      relatedLinks,
      lastUpdated,
    },
  }
}
