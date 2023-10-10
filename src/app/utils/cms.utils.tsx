import clsx from 'clsx'
import kebabCase from 'lodash/kebabCase'
import Link from 'next/link'
import { z } from 'zod'

import { Body, ContentTypes } from '@/api/models/cms/Page'
import { Blocks } from '@/api/models/cms/Page/Blocks'

import { Chart, Download, Headline, Percentage, Table, Timestamp, Trend } from '../components/cms'
import { Details } from '../components/ui/govuk'
import { Card } from '../components/ui/ukhsa'

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
      <div className="govuk-grid-row" data-testid="chart-row-cards">
        {value.columns.map((column) => {
          const size = value.columns.length === 1 ? 'wide' : 'narrow'
          return (
            <div
              key={column.id}
              className={clsx('govuk-!-margin-bottom-6 md:mb-0', {
                ['govuk-grid-column-full-from-desktop']: value.columns.length === 1,
                ['govuk-grid-column-one-half-from-desktop']: value.columns.length === 2,
              })}
              data-testid={`chart-row-card-${kebabCase(column.value.title)}`}
            >
              <Card
                as="article"
                aria-labelledby={`chart-row-card-heading-${column.id}`}
                className="govuk-!-margin-bottom-5"
              >
                <div className="md:min-h-[115px]">
                  <h3 id={`chart-row-card-heading-${column.id}`} className="govuk-body-m mb-2 text-dark-grey">
                    {column.value.title}
                  </h3>
                  <p className="govuk-heading-s govuk-!-margin-bottom-2 pt-0">{column.value.body}</p>
                  <Timestamp data={column.value} size={size} />
                </div>
                {column.type === 'chart_with_headline_and_trend_card' && (
                  <>
                    <div className="md:min-h-[54px]">
                      <div className="govuk-!-margin-top-4 flex items-end gap-2">
                        {column.value.headline_number_columns.map(renderBlock)}
                      </div>
                    </div>
                    <Chart data={column.value} size={size} />
                    <Download chart={column.value.chart} />
                    <Details label="View data in a tabular format">
                      <Table data={column.value} size={size} />
                    </Details>
                  </>
                )}
                {column.type === 'chart_card' && (
                  <>
                    <Chart data={column.value} size={size} />
                    <Download chart={column.value.chart} />
                    <Details label="View data in a tabular format">
                      <Table data={column.value} size={size} />
                    </Details>
                  </>
                )}
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
