import clsx from 'clsx'
import kebabCase from 'lodash/kebabCase'
import Link from 'next/link'
import { Fragment } from 'react'
import { z } from 'zod'

import { Body, CardTypes, CompositeBody } from '@/api/models/cms/Page'
import { Blocks } from '@/api/models/cms/Page/Blocks'
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/ukhsa'

import {
  AreaSelectorLoader,
  Chart,
  ChartRowCard,
  ChartRowCardHeader,
  CodeBlock,
  Download,
  DownloadButton,
  DownloadButtonExternal,
  Headline,
  Percentage,
  RichText,
  Table,
  Timestamp,
  Trend,
} from '../components/cms'

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

export const renderCard = ({ id, type, value }: z.infer<typeof CardTypes>) => (
  <div key={id}>
    {type === 'text_card' && <div dangerouslySetInnerHTML={{ __html: value.body }} />}

    {type === 'headline_numbers_row_card' && (
      <Card className="ukhsa-headline-numbers-row-card govuk-!-margin-bottom-6" data-testid="headline-row">
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
      <ChartRowCard>
        {value.columns.map((column) => {
          const size = value.columns.length === 1 ? 'wide' : 'narrow'
          return (
            <div
              key={column.id}
              className={clsx('mb-3 sm:mb-6 lg:mb-0', {
                'lg:w-full': value.columns.length === 1,
                'lg:w-1/2': value.columns.length === 2,
              })}
              data-testid={`chart-row-card-${kebabCase(column.value.title)}`}
            >
              <Card
                as="article"
                aria-labelledby={`chart-row-card-heading-${column.id}`}
                className="flex flex-col gap-6"
              >
                <ChartRowCardHeader id={column.id} title={column.value.title} description={column.value.body}>
                  <Timestamp data={column.value} size={size} />
                </ChartRowCardHeader>
                <Tabs defaultValue="chart" className="govuk-!-margin-bottom-0">
                  <TabsList>
                    <TabsTrigger asChild value="chart">
                      <Link href={`#chart-${kebabCase(column.value.title)}`}>
                        <span>Chart</span>
                      </Link>
                    </TabsTrigger>
                    <TabsTrigger asChild value="table">
                      <Link href={`#table-${kebabCase(column.value.title)}`}>
                        <span className="govuk-visually-hidden">Tabular data</span>
                        <span aria-hidden>
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
                  <TabsContent
                    value="chart"
                    className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
                    data-type="chart"
                  >
                    <span
                      className="govuk-heading-m govuk-!-margin-top-3 js:hidden"
                      id={`chart-${kebabCase(column.value.title)}`}
                    >
                      Chart
                    </span>
                    {column.type === 'chart_with_headline_and_trend_card' && (
                      <>
                        <div className="ukhsa-headline govuk-!-margin-bottom-4 md:min-h-[54px]">
                          <div className="flex items-end gap-2">
                            {column.value.headline_number_columns.map(renderBlock)}
                          </div>
                        </div>
                      </>
                    )}
                    <AreaSelectorLoader>
                      <Chart data={column.value} size={size} />
                    </AreaSelectorLoader>
                  </TabsContent>
                  <TabsContent
                    value="table"
                    className="max-h-[var(--ukhsa-chart-card-table-scroll-height)] min-h-[var(--ukhsa-chart-card-tab-min-height)] overflow-y-auto no-js:mb-4"
                  >
                    <span
                      className="govuk-heading-m govuk-!-margin-top-3 js:hidden"
                      id={`table-${kebabCase(column.value.title)}`}
                    >
                      Tabular data
                    </span>
                    <Table data={column.value} size={size} />
                  </TabsContent>
                  <TabsContent value="download" className="min-h-[var(--ukhsa-chart-card-tab-min-height)]">
                    <span
                      className="govuk-heading-m govuk-!-margin-top-3 js:hidden"
                      id={`download-${kebabCase(column.value.title)}`}
                    >
                      Download
                    </span>
                    <Download data={column.value} />
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          )
        })}
      </ChartRowCard>
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

export const renderCompositeBlock = ({ id, type, value }: CompositeBody[number]) => (
  <Fragment key={id}>
    {type === 'text' && <RichText>{value}</RichText>}

    {type === 'button' && (
      <DownloadButton
        label={value.text}
        endpoint={value.endpoint}
        method={value.method}
        id={id}
        formats={['csv', 'json']}
        aria-label={value.text}
      />
    )}

    {type === 'external_button' && (
      <DownloadButtonExternal label={value.text} href={value.url} icon={value.icon} type={value.button_type} />
    )}

    {type === 'code_block' && (
      <CodeBlock language={value.content[0].value.language}>{value.content[0].value.code}</CodeBlock>
    )}
  </Fragment>
)
