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
import { ContentTypes, getStats } from '@/api/requests/stats/getStats'
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
        {statistics.map(({ name, summary, tiles }) => (
          <ContentsItem heading={name} key={`content-item-${name}`}>
            <p>The UKHSA dashboard for data and insights on {name}.</p>
            <Card label={`${name} Summary`}>
              {summary.map(({ container, content }) => {
                return (
                  <CardColumn heading={container} key={container}>
                    {content.map(renderContentTypes)}
                  </CardColumn>
                )
              })}
            </Card>
            <GridRow>
              {tiles.map(({ container, content }) => {
                return (
                  <GridCol setWidth="one-half" key={container}>
                    <Card label={`${name} ${container}`}>
                      <CardColumn
                        heading={container}
                        sideContent={<DownloadLink href="/api/download">Download</DownloadLink>}
                      >
                        {content.map(renderContentTypes)}
                        <Topic
                          name={name}
                          description="People tested positive in England up to and including 25th February 2023"
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

type StatisticsProps = Array<{ name: string } & Awaited<ReturnType<typeof getStats>>>

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

    const coronavirusData = await getStats('COVID-19')
    const influenzaData = await getStats('Influenza')

    const statistics: StatisticsProps = [
      {
        name: 'Coronavirus',
        ...coronavirusData,
      },
      {
        name: 'Influenza',
        ...influenzaData,
      },
    ]

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
