import { Fragment } from 'react'
import { GridCol, GridRow, Paragraph } from 'govuk-react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Chart } from '@/components/Chart'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import RelatedLinks from '@/components/RelatedLinks/RelatedLinks'
import { Contents, ContentsItem } from '@/components/Contents'
import { Card, CardColumn } from '@/components/Card'
import { Page } from '@/components/Page'
import { RelatedLink } from '@/api/requests/cms/getPage'
import { initMocks } from '@/api/msw'
import { DownloadLink } from '@/components/Links'
import { ContentTypes, getStats, TopicName } from '@/api/requests/stats/getStats'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { PageType } from '@/api/requests/cms/getPages'
import { getAllDashboardCharts } from '@/api/requests/charts/getAllDashboardCharts'
import { useTranslation } from 'next-i18next'
import { HeadlineTrend, HeadlineValue, Metric } from '@/components/Metrics'
import { GridLimiter } from '@/components/GridLimiter'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

const renderContentTypes = (item: ContentTypes) => (
  <Fragment key={item.heading}>
    {item.type === 'text' && (
      <Metric>
        <HeadlineValue heading={item.heading} value={item.value} />
      </Metric>
    )}
    {item.type === 'trend' && (
      <Metric>
        <HeadlineTrend
          heading={item.heading}
          direction={item.direction}
          colour={item.colour}
          value={`${item.change} ${item.percentage}`}
        />
      </Metric>
    )}
  </Fragment>
)

export default function Home({ title, body, relatedLinks, lastUpdated, statistics, charts }: HomeProps) {
  const { t } = useTranslation()

  if (!title) return null

  return (
    <Page heading={title} lastUpdated={lastUpdated}>
      <Paragraph>{body}</Paragraph>
      <Contents heading={t<string>('contentsHeading')}>
        {statistics.map(({ topic, summary, tiles }) => (
          <ContentsItem heading={topic} key={`content-item-${topic}`}>
            <p>The UKHSA dashboard for data and insights on {topic}.</p>
            <Card data-testid="summary-section">
              <GridLimiter>
                {summary.map(({ container, content }) => {
                  return (
                    <CardColumn heading={container} key={container} data-testid={`column-${container.toLowerCase()}`}>
                      {content.map(renderContentTypes)}
                    </CardColumn>
                  )
                })}
              </GridLimiter>
            </Card>
            <GridRow>
              {tiles.map(({ container, content }) => {
                return (
                  <GridCol setWidth="one-half" key={container}>
                    <Card data-testid={`${container.toLowerCase()}-section`}>
                      <CardColumn
                        heading={container}
                        sideContent={<DownloadLink href="/api/download">{t('downloadBtn')}</DownloadLink>}
                        data-testid={`column-${container.toLowerCase()}`}
                      >
                        {content.map(renderContentTypes)}
                        <Chart
                          src={`data:image/svg+xml;utf8,${encodeURIComponent(charts[topic][container])}`}
                          fallback={`/img/${topic}_${container}.svg`}
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
type ChartsProps = Record<TopicName, Record<string, string>>

export const getStaticProps: GetStaticProps<{
  title: string
  body: string
  lastUpdated: string
  relatedLinks: Array<RelatedLink>
  statistics: StatisticsProps
  charts: ChartsProps
}> = async (req) => {
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

    const charts = await getAllDashboardCharts()

    return {
      props: {
        title,
        body,
        lastUpdated,
        relatedLinks,
        statistics,
        charts,
        ...(await serverSideTranslations(req.locale as string, ['common'])),
      },
      revalidate,
    }
  } catch (error) {
    console.log(error)
    return { notFound: true, revalidate }
  }
}
