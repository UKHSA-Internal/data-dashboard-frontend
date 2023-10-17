import clsx from 'clsx'
import kebabCase from 'lodash/kebabCase'
import Link from 'next/link'
import { z } from 'zod'

import { Body, ContentTypes } from '@/api/models/cms/Page'
import { Blocks } from '@/api/models/cms/Page/Blocks'
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/ukhsa'

import { Chart, Download, Headline, Percentage, Table, Timestamp, Trend } from '../components/cms'

export const renderSection = ({ id, value: { heading, content } }: z.infer<typeof Body>[number]) => (
  <div key={id} className="govuk-!-margin-bottom-9" data-testid={`section-${kebabCase(heading)}`}>
    <h2 className="govuk-heading-l govuk-!-margin-bottom-4">
      <Link href={`/topics/${kebabCase(heading)}`} className="govuk-link--no-visited-state">
        {heading}
      </Link>
    </h2>
    {content.map(renderCard)}
  </div>
)

export const renderCard = ({ id, type, value }: z.infer<typeof ContentTypes>) => (
  <div key={id}>
    {type === 'text_card' && <div dangerouslySetInnerHTML={{ __html: value.body }} />}

    {type === 'headline_numbers_row_card' && (
      <Card className="govuk-!-margin-bottom-6" data-testid="headline-row">
        <div
          className={clsx(`grid grid-cols-2 gap-y-6 sm:grid-cols-3 md:gap-x-5`, {
            [`md:grid-cols-5`]: value.columns.length === 5,
          })}
        >
          {value.columns.map((column) => (
            <div key={column.id} data-testid={`headline-column-${kebabCase(column.value.title)}`}>
              <h3 className="govuk-body-m mb-2 text-dark-grey md:mb-3">{column.value.title}</h3>
              <div className="flex flex-col gap-y-2 md:gap-y-4">{column.value.rows.map(renderBlock)}</div>
            </div>
          ))}
        </div>
      </Card>
    )}

    {type === 'chart_row_card' && (
      <div className="govuk-!-margin-bottom-6 lg:flex lg:gap-6" data-testid="chart-row-cards">
        {value.columns.map((column) => {
          const size = value.columns.length === 1 ? 'wide' : 'narrow'
          return (
            <div
              key={column.id}
              className={clsx('govuk-!-margin-bottom-6', {
                'lg:w-full': value.columns.length === 1,
                'lg:w-1/2': value.columns.length === 2,
              })}
              data-testid={`chart-row-card-${kebabCase(column.value.title)}`}
            >
              <Card
                as="article"
                aria-labelledby={`chart-row-card-heading-${column.id}`}
                className="flex h-full flex-col gap-6"
              >
                <div
                  className={clsx({
                    'md:min-h-[115px]': value.columns.length === 2,
                  })}
                >
                  <h3 id={`chart-row-card-heading-${column.id}`} className="govuk-body-m mb-2 text-dark-grey">
                    {column.value.title}
                  </h3>
                  <p className="govuk-heading-s govuk-!-margin-bottom-2 pt-0">{column.value.body}</p>
                  <Timestamp data={column.value} size={size} />
                </div>
                <Tabs defaultValue="chart" className="govuk-!-margin-bottom-0">
                  <TabsList>
                    <TabsTrigger asChild value="chart">
                      <Link href={`#chart-${kebabCase(column.value.title)}`}>
                        <span>Chart</span>
                      </Link>
                    </TabsTrigger>
                    <TabsTrigger asChild value="table">
                      <Link href={`#table-${kebabCase(column.value.title)}`}>
                        <span>
                          Tabular <span className="hidden lg:inline">data</span>
                        </span>
                      </Link>
                    </TabsTrigger>
                    <TabsTrigger asChild value="download">
                      <Link href={`#download-${kebabCase(column.value.title)}`}>
                        <span>Download</span>
                      </Link>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="chart" className="no-js:mb-7">
                    <span
                      className="govuk-heading-m govuk-!-margin-top-3 js:hidden"
                      id={`chart-${kebabCase(column.value.title)}`}
                    >
                      Chart
                    </span>
                    {column.type === 'chart_with_headline_and_trend_card' && (
                      <>
                        <div className="govuk-!-margin-bottom-4 md:min-h-[54px]">
                          <div className="flex items-end gap-2">
                            {column.value.headline_number_columns.map(renderBlock)}
                          </div>
                        </div>
                      </>
                    )}
                    <Chart data={column.value} size={size} />
                  </TabsContent>
                  <TabsContent value="table" className="no-js:mb-4">
                    <span
                      className="govuk-heading-m govuk-!-margin-top-3 js:hidden"
                      id={`table-${kebabCase(column.value.title)}`}
                    >
                      Tabular data
                    </span>
                    <div className="govuk-!-margin-top-3 max-h-[var(--ukhsa-chart-card-table-scroll-height)] overflow-y-auto">
                      <Table data={column.value} size={size} />
                    </div>
                  </TabsContent>
                  <TabsContent value="download">
                    <span
                      className="govuk-heading-m govuk-!-margin-top-3 js:hidden"
                      id={`download-${kebabCase(column.value.title)}`}
                    >
                      Download
                    </span>
                    <Download chart={column.value.chart} />
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          )
        })}
      </div>
    )}
  </div>
)

export const renderBlock = ({ id, type, value }: z.infer<typeof Blocks>[number]) => (
  <div key={id}>
    {type === 'percentage_number' && <Percentage data={value} />}
    {type === 'headline_number' && <Headline data={value} />}
    {type === 'trend_number' && <Trend data={value} />}
  </div>
)
