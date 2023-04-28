import { GridCol } from 'govuk-react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { RelatedLinks } from '@/components/RelatedLinks'
import { CardColumn } from '@/components/Card'
import { Page } from '@/components/Page'
import { initMocks } from '@/api/msw'
import { DownloadLink } from '@/components/DownloadLink'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { PageType } from '@/api/requests/cms/getPages'
import { useTranslation } from 'next-i18next'

import type {
  RelatedLinks as Links,
  Body,
  WithHeadlineNumbersRowCard,
  WithChartHeadlineAndTrendCard,
} from '@/api/models/cms/Page'
import { extractAndFetchPageData } from '@/api/requests/cms/extractAndFetchPageData'
import { FormattedContent } from '@/components/FormattedContent'
import { z } from 'zod'
import { Chart, ChartWithHeadlineAndTrend, Headline, HeadlineNumbersRow, Trend } from '@/components/CMS'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

const getCmsRenderUtils = ({
  headlines,
  trends,
}: {
  headlines: HomeProps['headlines']
  trends: HomeProps['trends']
}) => {
  const renderHeadlineRowColumn = ({
    type,
    value,
    id,
  }: z.infer<typeof WithHeadlineNumbersRowCard>['columns'][number]) => {
    if (type === 'headline_and_trend_component') {
      const {
        title,
        headline_number: { body: headlineHeading },
        trend_number: { body: trendHeading },
      } = value

      return (
        <CardColumn heading={title} key={id}>
          <Headline heading={headlineHeading} headlineData={headlines[`${id}-headlines`]} />
          <Trend heading={trendHeading} trendData={trends[`${id}-trends`]} />
        </CardColumn>
      )
    }

    if (type === 'dual_headline_component') {
      const {
        title,
        top_headline_number: { body: topHeading },
        bottom_headline_number: { body: bottomHeading },
      } = value

      return (
        <CardColumn heading={title} key={id}>
          <Headline heading={topHeading} headlineData={headlines[`${id}-headlines-top`]} />
          <Headline heading={bottomHeading} headlineData={headlines[`${id}-headlines-bottom`]} />
        </CardColumn>
      )
    }

    if (type === 'single_headline_component') {
      const {
        title,
        headline_number: { body: heading },
      } = value

      return (
        <CardColumn heading={title} key={id}>
          <Headline heading={heading} headlineData={headlines[`${id}-headlines`]} />
        </CardColumn>
      )
    }
  }

  const renderChartCardColumn = ({
    type,
    value,
    id,
  }: z.infer<typeof WithChartHeadlineAndTrendCard>['headline_number_columns'][number]) => {
    if (type === 'headline_number') {
      return (
        <GridCol key={id} setDesktopWidth={'one-third'}>
          <Headline heading={value.body} headlineData={headlines[`${id}-headlines`]} />
        </GridCol>
      )
    }
    if (type === 'trend_number') {
      return (
        <GridCol key={id} setDesktopWidth={'one-third'}>
          <Trend heading={value.body} trendData={trends[`${id}-trends`]} />
        </GridCol>
      )
    }
  }

  return {
    renderChartCardColumn,
    renderHeadlineRowColumn,
  }
}

export default function Home({ title, relatedLinks, lastUpdated, body, charts, headlines, trends }: HomeProps) {
  const { t } = useTranslation()

  const { renderHeadlineRowColumn, renderChartCardColumn } = getCmsRenderUtils({ headlines, trends })

  if (!title) return null

  return (
    <Page heading={title} lastUpdated={lastUpdated}>
      {body.map(({ type, value, id }) => {
        if (type === 'text') {
          return <FormattedContent key={id}>{value.body}</FormattedContent>
        }

        if (type === 'headline_numbers_row_card') {
          return (
            <HeadlineNumbersRow
              key={id}
              columns={value.columns.map(renderHeadlineRowColumn)}
              cardProps={{
                'data-testid': 'summary-section',
              }}
            />
          )
        }

        if (type === 'chart_with_headline_and_trend_card') {
          const { title: heading, body: description, headline_number_columns: columns } = value

          return (
            <ChartWithHeadlineAndTrend
              key={id}
              heading={heading}
              chart={<Chart chartData={charts[`${id}-charts`]} />}
              columns={columns.map(renderChartCardColumn)}
              description={description}
              sideContent={<DownloadLink href="/api/download">{t('downloadBtn')}</DownloadLink>}
              cardProps={{
                'data-testid': `${heading.toLowerCase()}-section`,
              }}
            />
          )
        }
      })}
      <RelatedLinks links={relatedLinks} />
    </Page>
  )
}

type PageData = Awaited<ReturnType<typeof extractAndFetchPageData>>

export const getStaticProps: GetStaticProps<{
  title: string
  body: Body[]
  charts: PageData['charts']
  headlines: PageData['headlines']
  trends: PageData['trends']
  lastUpdated: string
  relatedLinks: Links
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

    const { charts, headlines, trends } = await extractAndFetchPageData(body)

    return {
      props: {
        title,
        body,
        lastUpdated,
        relatedLinks,
        headlines,
        trends,
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
