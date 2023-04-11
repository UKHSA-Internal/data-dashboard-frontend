import { Fragment } from 'react'
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
import { ContentTypes, getStats, TopicName } from '@/api/requests/stats/getStats'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { PageType } from '@/api/requests/cms/getPages'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

const renderContentTypes = (item: ContentTypes) => (
  <Fragment key={item.heading}>
    {item.type === 'text' && <Statistic heading={item.heading} value={item.value} />}
    {item.type === 'trend' && (
      <Statistic heading={item.heading}>
        <Trend direction={item.direction} colour={item.colour} value={`${item.change} ${item.percentage}`} />
      </Statistic>
    )}
  </Fragment>
)

export default function Home({ title, body, relatedLinks, lastUpdated, statistics }: HomeProps) {
  if (!title) return null

  return (
    <Page heading={title} lastUpdated={lastUpdated}>
      <Paragraph>{body}</Paragraph>
      <Contents>
        {statistics.map(({ topic, summary, tiles }) => (
          <ContentsItem heading={topic} key={`content-item-${topic}`}>
            <p>The UKHSA dashboard for data and insights on {topic}.</p>
            <Card label={`${topic} Summary`} columnLimit={topic === 'Coronavirus'}>
              {summary.map(({ container, content }) => {
                return (
                  <CardColumn heading={container} key={container} data-testid={`column-${container.toLowerCase()}`}>
                    {content.map(renderContentTypes)}
                  </CardColumn>
                )
              })}
            </Card>
            <GridRow>
              {tiles.map(({ container, content }) => {
                return (
                  <GridCol setWidth="one-half" key={container}>
                    <Card label={`${topic} ${container}`}>
                      <CardColumn
                        heading={container}
                        sideContent={<DownloadLink href="/api/download">Download</DownloadLink>}
                        data-testid={`column-${container.toLowerCase()}`}
                      >
                        {content.map(renderContentTypes)}
                        <Topic
                          description="People tested positive in England up to and including 25th February 2023"
                          topic={topic}
                          category={container}
                          name={topic}
                          points={[]}
                        />
                      </CardColumn>
                    </Card>
                  </GridCol>
                )
              })}
            </GridRow>
          </ContentsItem>
        ))}
      </Contents>

      <RelatedLinks links={relatedLinks} />
    </Page>
  )
}

type StatisticsProps = Array<{ topic: TopicName } & Awaited<ReturnType<typeof getStats>>>

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

  const revalidate = Number(process.env.NEXT_REVALIDATE_TIME)

  try {
    const {
      title,
      body,
      last_published_at: lastUpdated,
      related_links: relatedLinks = [],
    } = await getPageBySlug('respiratory-viruses', PageType.Home)

    const coronavirusData = await getStats('COVID-19')
    const influenzaData = await getStats('Influenza')

    const statistics: StatisticsProps = [coronavirusData, influenzaData]

    return {
      props: {
        title,
        body,
        lastUpdated,
        relatedLinks,
        statistics,
      },
      revalidate,
    }
  } catch (error) {
    console.log(error)
    return { notFound: true, revalidate }
  }
}
