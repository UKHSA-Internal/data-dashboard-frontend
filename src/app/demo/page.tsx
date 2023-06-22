import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { Metadata } from 'next'
import { Headline } from '../components/Blocks/Headline/Headline'
import { Percentage } from '../components/Blocks/Percentage/Percentage'
import { Trend } from '../components/Blocks/Trend/Trend'
import { Chart } from '../components/Blocks/Chart/Chart'

export async function generateMetadata(): Promise<Metadata> {
  const {
    meta: { seo_title: title, search_description: description },
  } = await getPageBySlug('respiratory-viruses', PageType.Home)
  return {
    title,
    description,
  }
}

async function getPage() {
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
}

export default async function Page() {
  const page = await getPage()

  if (!page) return 'error!'

  const { title, description, relatedLinks, lastUpdated, body } = page

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <p className="mb-4 govuk-body-s">{lastUpdated}</p>
          <h1 className="govuk-heading-xl mb-4">{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>

      <div>
        {body.map(({ id, value }) => {
          return (
            <section aria-labelledby="coronavirus" className="mb-9" key={id}>
              {value.content.map((section) => {
                return (
                  <div key={section.id}>
                    {section.type === 'text_card' && <div dangerouslySetInnerHTML={{ __html: section.value.body }} />}

                    {section.type === 'headline_numbers_row_card' && (
                      <div
                        className="bg-grey-3 gap-6 py-3 grid-flow-col auto-cols-5 grid"
                        data-testid="summary-section"
                      >
                        {section.value.columns.map((column) => {
                          return (
                            <div className="px-3" key={column.id}>
                              <h3 className="govuk-heading-s font-normal mb-0">{column.value.title}</h3>
                              <div className="[&>*]:mt-4">
                                {column.value.rows.map((row) => {
                                  if (row.type === 'headline_number') {
                                    return <Headline key={row.id} heading={row.value.body} data={row.value} />
                                  }
                                  if (row.type === 'percentage_number') {
                                    return <Percentage key={row.id} heading={row.value.body} data={row.value} />
                                  }
                                  if (row.type === 'trend_number') {
                                    return <Trend key={row.id} data={row.value} />
                                  }
                                })}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {section.type === 'chart_row_card' && (
                      <div className="govuk-grid-row mt-6">
                        {section.value.columns.map((column) => {
                          const chartSize = section.value.columns.length === 1 ? 'wide' : 'narrow'

                          return (
                            <div key={section.id} className="govuk-grid-column-one-half">
                              <div className="bg-grey-3 p-3">
                                <h3 className="govuk-heading-s font-normal mb-0">{column.value.title}</h3>
                                <p className="govuk-body mt-2 mb-4">{column.value.body}</p>

                                <div key={section.id}>
                                  {column.type === 'chart_card' && <Chart data={column.value.chart} size={chartSize} />}

                                  {column.type === 'chart_with_headline_and_trend_card' && (
                                    <>
                                      <div className="govuk-grid-row">
                                        {column.value.headline_number_columns.map(({ type, value, id }) => (
                                          <div key={id} className="govuk-grid-column-one-third-from-desktop">
                                            {/* {type === 'headline_number' && (
                                              <Headline key={id} heading={value.body} data={value} />
                                            )}
                                            {type === 'percentage_number' && (
                                              <Percentage key={id} heading={value.body} data={value} />
                                            )}
                                            {type === 'trend_number' && <Trend key={id} data={value} />} */}
                                          </div>
                                        ))}
                                      </div>
                                      <Chart data={column.value.chart} size={chartSize} />
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </section>
          )
        })}
      </div>

      {relatedLinks && (
        <div className="mt-2 pt-2 pb-3 px-3 border-t-[10px] border-blue">
          <h2 className="govuk-heading-l">Related Links</h2>
          <ul>
            {relatedLinks.map(({ id, title, url, body }) => (
              <li key={id} className="govuk-body">
                <a href={url} rel="external" className="font-bold">
                  {title}
                </a>
                <div dangerouslySetInnerHTML={{ __html: body }} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
