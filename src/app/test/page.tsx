import Image from 'next/image'
import { PageType } from '@/api/requests/cms/getPages'
import { extractAndFetchPageData } from '@/api/requests/cms/extractAndFetchPageData'
import { getCharts } from '@/api/requests/charts/getCharts'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { initMocks } from '@/api/msw'
import { getHeadlines } from '@/api/requests/headlines/getHeadlines'
import { getTrends } from '@/api/requests/trends/getTrends'

async function getPage() {
  // if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  //   await initMocks()
  // }

  try {
    const {
      title,
      body,
      page_description: description,
      last_published_at: lastUpdated,
      related_links: relatedLinks = [],
      meta,
    } = await getPageBySlug('respiratory-viruses', PageType.Home)

    return {
      title,
      body,
      description,
      lastUpdated,
      relatedLinks,
      meta,
    }
  } catch (error) {
    console.log('naw dawg')
  }
}

async function Chart({ data }: any) {
  const res = await getCharts(
    data.map((plots: any) => plots.value),
    'narrow'
  )

  if (res.success) {
    return (
      <div>
        <Image
          priority
          unoptimized
          alt=""
          width={300}
          height={200}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(res.data)}`}
        />
      </div>
    )
  }

  return <>chart error</>
}

async function Headline({ data }: any) {
  const res = await getHeadlines(data)

  if (res.success) {
    return <div>{res.data.value}</div>
  }

  return <>headline error</>
}

async function Percentage({ data }: any) {
  const res = await getHeadlines(data)

  if (res.success) {
    return <div>{res.data.value}%</div>
  }

  return <>headline error</>
}

async function Trend({ data }: any) {
  const res = await getTrends(data)

  if (res.success) {
    return <div>{res.data.metric_value}</div>
  }

  return <>headline error</>
}

export default async function Page() {
  const page = await getPage()

  if (!page) return 'error!'

  const { title, description, relatedLinks, lastUpdated, body, meta } = page

  return (
    <>
      {lastUpdated}
      <h1>{title}</h1>

      <p dangerouslySetInnerHTML={{ __html: description }} />
      <div>
        {body.map(({ id, value }) => {
          return (
            <div key={id}>
              {value.content.map((section) => {
                if (section.type === 'text_card') {
                  return <p key={section.id} dangerouslySetInnerHTML={{ __html: section.value.body }} />
                }

                if (section.type === 'headline_numbers_row_card') {
                  return (
                    <div key={section.id}>
                      {section.value.columns.map((column) => {
                        return (
                          <div key={column.id}>
                            <h3>{column.value.title}</h3>
                            <ul>
                              {column.value.rows.map((row) => {
                                if (row.type === 'headline_number') {
                                  return (
                                    <Headline
                                      key={row.id}
                                      data={{ topic: row.value.topic, metric: row.value.metric }}
                                    />
                                  )
                                }
                                if (row.type === 'percentage_number') {
                                  return (
                                    <Percentage
                                      key={row.id}
                                      data={{
                                        topic: row.value.topic,
                                        metric: row.value.metric,
                                      }}
                                    />
                                  )
                                }
                                if (row.type === 'trend_number') {
                                  return <Trend key={row.id} data={row.value} />
                                }
                              })}
                            </ul>
                          </div>
                        )
                        // if (column.type === 'chart_with_headline_and_trend_card') {
                        //   return <Chart key={section.id} chartData={column.value.chart} />
                        // }

                        // if (column.type === 'chart_card') {
                        //   return <Chart key={section.id} chartData={column.value.chart} />
                        // }
                      })}
                    </div>
                  )
                }

                if (section.type === 'chart_row_card') {
                  return (
                    <div key={section.id}>
                      {section.value.columns.map((column) => {
                        if (column.type === 'chart_with_headline_and_trend_card') {
                          return <Chart key={section.id} data={column.value.chart} />
                        }

                        if (column.type === 'chart_card') {
                          return <Chart key={section.id} data={column.value.chart} />
                        }
                      })}
                    </div>
                  )
                }
              })}
            </div>
          )
        })}
      </div>
      <ul>
        {relatedLinks.map(({ id, title, url, body }) => (
          <li key={id}>
            <a href={url} rel="external">
              {title}
            </a>
            <p dangerouslySetInnerHTML={{ __html: body }} />
          </li>
        ))}
      </ul>
    </>
  )
}
