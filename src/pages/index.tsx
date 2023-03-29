import { GridCol, GridRow, Paragraph } from 'govuk-react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Topic from '@/components/Topic/Topic'
import RelatedLinks from '@/components/RelatedLinks/RelatedLinks'
import { Contents, ContentsItem } from '@/components/Contents'
import { Card, CardColumn } from '@/components/Card'
import { Statistic } from '@/components/Statistic'
import { Page } from '@/components/Page'
import { RelatedLink } from '@/api/requests/cms/getPage'
import { initMocks } from '@/api/msw'
import { DownloadLink } from '@/components/Links'
import Trend from '@/components/Trend/Trend'
import { getStats } from '@/api/requests/stats/getStats'
import { Fragment } from 'react'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { PageType } from '@/api/requests/cms/getPages'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({ title, body, relatedLinks, lastUpdated, statistics }: HomeProps) {
  if (!title) return null

  console.log('summary', statistics)
  return (
    <Page heading={title} lastUpdated={lastUpdated}>
      <Paragraph>{body}</Paragraph>
      <Contents>
        <ContentsItem heading="Coronavirus">
          <Paragraph>The UKHSA dashboard for data and insights on Coronavirus.</Paragraph>
          <Card label="Coronavirus summary">
            {statistics.coronavirus.summary.map(({ container, content }) => {
              return (
                <CardColumn heading={container} key={container}>
                  {content.map((item) => {
                    return (
                      <>
                        {item.type === 'text' && <Statistic heading={item.heading} value={item.value} />}
                        {item.type === 'trend' && (
                          <Statistic heading={item.heading}>
                            <Trend
                              direction={item.direction}
                              colour={item.colour}
                              value={`${item.change} ${item.percentage}`}
                            />
                          </Statistic>
                        )}
                      </>
                    )
                  })}
                </CardColumn>
              )
            })}
          </Card>
          <GridRow>
            {statistics.coronavirus.tiles.map(({ container, content }) => {
              return (
                <GridCol setWidth="one-half" key={container}>
                  <Card label={`Coronavirus cases`}>
                    <CardColumn
                      heading={container}
                      sideContent={<DownloadLink href="/api/download">Download</DownloadLink>}
                    >
                      {content.map((item) => {
                        return (
                          <Fragment key={item.heading}>
                            {item.type === 'text' && <Statistic heading={item.heading} value={item.value} />}
                            {item.type === 'trend' && (
                              <Statistic heading={item.heading}>
                                <Trend
                                  direction={item.direction}
                                  colour={item.colour}
                                  value={`${item.change} ${item.percentage}`}
                                />
                              </Statistic>
                            )}
                            {/*                             
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
                            </GridRow> */}
                          </Fragment>
                        )
                      })}
                      <Topic
                        name="Coronavirus"
                        description="People tested positive in England up to and including 25th February 2023"
                        points={[]}
                      />
                    </CardColumn>
                  </Card>
                </GridCol>
              )
            })}

            {/* <GridCol setWidth="one-half">
              <Card label="Coronavirus cases">
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
              <Card label="Coronavirus deaths">
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
            </GridCol> */}
          </GridRow>
        </ContentsItem>
        <ContentsItem heading="Influenza">
          <Paragraph>The UKHSA dashboard for data and insights on Influenza.</Paragraph>

          <Card label="Influenza summary">
            {statistics.influenza.summary.map(({ container, content }) => {
              return (
                <CardColumn heading={container} key={container}>
                  {content.map((item) => {
                    return (
                      <Fragment key={item.heading}>
                        {item.type === 'text' && <Statistic heading={item.heading} value={item.value} />}
                        {item.type === 'trend' && (
                          <Statistic heading={item.heading}>
                            <Trend
                              direction={item.direction}
                              colour={item.colour}
                              value={`${item.change} ${item.percentage}`}
                            />
                          </Statistic>
                        )}
                      </Fragment>
                    )
                  })}
                </CardColumn>
              )
            })}

            {/* <CardColumn heading="Healthcare">
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
            </CardColumn> */}
          </Card>
          <GridRow>
            {statistics.influenza.tiles.map(({ container, content }) => {
              return (
                <GridCol setWidth="one-half" key={container}>
                  <Card label={`Coronavirus cases`}>
                    <CardColumn
                      heading={container}
                      sideContent={<DownloadLink href="/api/download">Download</DownloadLink>}
                    >
                      {content.map((item) => {
                        return (
                          <Fragment key={item.heading}>
                            {item.type === 'text' && <Statistic heading={item.heading} value={item.value} />}
                            {item.type === 'trend' && (
                              <Statistic heading={item.heading}>
                                <Trend
                                  direction={item.direction}
                                  colour={item.colour}
                                  value={`${item.change} ${item.percentage}`}
                                />
                              </Statistic>
                            )}
                            {/*                             
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
                            </GridRow> */}
                          </Fragment>
                        )
                      })}
                      <Topic
                        name="Influenza"
                        description="Weekly hospital admission rates for Influenza up to and including 25th February 2023"
                        points={[]}
                      />
                    </CardColumn>
                  </Card>
                </GridCol>
              )
            })}

            {/* <GridCol setWidth="one-half">
              <Card label="Influenza healthcare">
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
              <Card label="Influenza testing">
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
            </GridCol> */}
          </GridRow>
        </ContentsItem>
      </Contents>

      <RelatedLinks links={relatedLinks} />
    </Page>
  )
}

type StatisticsProps = Record<'coronavirus' | 'influenza', Awaited<ReturnType<typeof getStats>>>

export const getStaticProps: GetStaticProps<{
  title: string
  body: string
  lastUpdated: string
  relatedLinks: Array<RelatedLink>
  statistics: StatisticsProps
}> = async () => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    await initMocks()
  }

  try {
    const {
      title,
      body,
      last_published_at: lastUpdated,
      related_links: relatedLinks = [],
    } = await getPageBySlug('respiratory-viruses', PageType.Home)

    const coronavirus = await getStats('coronavirus')
    const influenza = await getStats('influenza')

    const statistics: StatisticsProps = {
      coronavirus,
      influenza,
    }

    return {
      props: {
        title,
        body,
        lastUpdated,
        relatedLinks,
        statistics,
      },
      revalidate: 10,
    }
  } catch (error) {
    console.log(error)
    return { notFound: true, revalidate: 10 }
  }
}
